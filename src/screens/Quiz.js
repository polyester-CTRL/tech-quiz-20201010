import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Choice from "../components/Choice";

const url = "https://quizapi.io/api/v1/questions";
const translate_url = process.env.REACT_APP_TRANSLATION_URL;

const Quiz = (e) => {
  const [quizzes, setQuizzes] = useState(null);
  const [translations, setTranslations] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isCorrect, setCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
  const diff = e.location.props;
  let tried = 0;
  let success = 0;
  useEffect(() => {
    fetchQuiz();
    return;
  }, []);
  const fetchQuiz = () => {
    setAnswered(false);
    setLoading(true);
    setSelectedAnswers([]);
    console.log(diff);
    axios
      .get(url, {
        params: {
          limit: 1,
          difficulty: diff,
        },
        headers: {
          "X-Api-Key": process.env.REACT_APP_QUIZAPI_KEY,
        },
      })
      .then((res) => {
        // console.log(res)
        if (res.data) {
          setQuizzes(res.data[0]);
          translateQuiz(res.data[0].question);
        }
      })
      .catch((e) => {
        alert("エラーだよ。コンソールを見てね");
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
    tried++;
  };
  const translateQuiz = (e) => {
    console.log(e);
    axios
      .get(translate_url, {
        params: {
          text: e,
          sources: "en",
          target: "ja",
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setTranslations(res.data);
        }
      })
      .catch((e) => {
        alert(
          "translateエラーです。拡張機能を使っている場合はOFFにしてみてください。"
        );
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const checkAnswer = () => {
    // 処理しやすい形に変換
    const realAnswer = quizList
      .map((item, index) => ({
        index: index,
        isCorrect: item.isCorrect,
      }))
      .filter((item) => item.isCorrect)
      .map((item) => item.index)
      .sort();
    setCorrect(
      JSON.stringify(realAnswer) === JSON.stringify(selectedAnswers.sort())
    );
    setAnswered(true);
  };

  const updateAnswer = (id, append) => {
    if (append) {
      setSelectedAnswers([...selectedAnswers, id]);
    } else {
      setSelectedAnswers([...selectedAnswers].filter((item) => item !== id));
    }
  };

  // JSONは真偽値も表せるはずなのにstringで渡してきやがるからparseする
  const correctAnswers =
    quizzes &&
    Object.values(quizzes.correct_answers).map((item) => JSON.parse(item));

  // 処理しやすい形にしておく
  const quizList =
    quizzes &&
    Object.values(quizzes.answers)
      .filter((choice) => !!choice)
      .map((question, index) => ({
        choice: question,
        isCorrect: correctAnswers[index],
      }));
  if (isLoading) {
    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "5em" }}>
      <div style={{ margin: "3em 0" }}>
        <p className="grey-text">
          <span>{quizzes?.category || "no category"}</span>
          <span> - {quizzes?.tags.map((i) => i.name + " ") || "no tags"}</span>
          <span> - {quizzes?.difficulty}</span>
        </p>
        <h5 className="container question">{translations?.text}</h5>
        <h5 className="container question">{quizzes?.question}</h5>
      </div>
      <div className="row">
        {quizList?.map((choice, index) => {
          return (
            <Choice
              key={index}
              choice={choice.choice}
              isCorrect={choice.isCorrect}
              answered={answered}
              updateAnswer={updateAnswer}
              id={index}
            />
          );
        })}
      </div>
      {answered && (
        <div className="correctness">
          <h3 className="center-align">{isCorrect ? "正解！😁" : "不正解"}</h3>
          <p className="center-align tips">{quizzes?.tip}</p>
        </div>
      )}
      <div className="center-align">
        <button
          className="btn-large green"
          onClick={() => {
            answered ? fetchQuiz() : checkAnswer();
            if (answered && isCorrect) {
              success++;
            }
          }}
        >
          {answered ? "次へ" : "答え合わせ"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
