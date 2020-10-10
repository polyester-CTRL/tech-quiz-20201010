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
  useEffect(() => {
    fetchQuiz();
    return;
  }, []);
 
 const fetchQuiz = () => {
    // 情報を取得
    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        alert("エラーだよ。コンソールを見てね");
        console.error(e);
      })
      .finally(() => {
        console.log("done!");
      });
  };
  return (
    <div>
		<h2>クイズだよ！</h2>
		<Link to="/quiz">quizをやる</Link>
    </div>
  );
};

export default Quiz;
