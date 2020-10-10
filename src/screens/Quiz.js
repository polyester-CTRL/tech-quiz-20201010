import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const url = "https://quizapi.io/api/v1/questions";

// config for axios
const config = {
  params: {
    limit: 1,
  },
  headers: {
    "X-Api-Key": process.env.REACT_APP_QUIZAPI_KEY,
  },
};

const Quiz = () => {
  const [quizzes, setquizzes] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isCorrect, setCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
  useEffect(() => {
    fetchQuiz();
    return;
  }, []);
  const fetchQuiz = () => {
    setAnswered(false);
    setLoading(true);
    setSelectedAnswers([]);
    axios
      .get(url, config)
      .then((res) => {
        // console.log(res)
        if (res.data) {
          setquizzes(res.data[0]);
        }
      })
      .catch((e) => {
        alert("エラーだよ。コンソールを見てね");
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
  return (
    <div>
		<h2>クイズだよ！</h2>
		<Link to="/quiz">quizをやる</Link>
    </div>
  );
};

export default Quiz;
