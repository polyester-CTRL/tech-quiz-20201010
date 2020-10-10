import React from "react";
import { Link } from "react-router-dom";


const Top = () => {
  return (
    <div>
		<h2>topだよ！</h2>
		<Link to="/quiz">quizをやる</Link>
    </div>
  );
};

export default Top;
