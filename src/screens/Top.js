import React from "react";
import { Link } from "react-router-dom";

const Top = () => {
  const [diffVal, setDiffVal] = React.useState("Medium");
  const handleChange = (e) => setDiffVal(e.target.value);

  return (
    <div className="top-container center-align">
      <h4 className="top-header">
        クイズを解いて
        <br />
        圧倒的成長！
      </h4>
      <div>
        {/* <Link to="/quiz" className="btn-large green"> */}
        <Link to={{pathname: '/quiz', props: diffVal}} className="btn-large green">
          クイズをやる
        </Link>
      </div>
        <div className="top-diff-label">
        難易度を選択：
          <input
            type="radio"
            value="Easy"
            onChange={handleChange}
            checked={diffVal === "Easy"}
            id="diff-easy"
          />
          <label htmlFor="diff-easy" className="top-diff-input">やさしい</label>
        
          <input
            type="radio"
            value="Medium"
            onChange={handleChange}
            checked={diffVal === "Medium"}
            id="diff-medium"
          />
          <label htmlFor="diff-medium" className="top-diff-input">ふつう</label>
          <input
            type="radio"
            value="Hard"
            onChange={handleChange}
            checked={diffVal === "Hard"}
            id="diff-hard"
          />
          <label htmlFor="diff-hard" className="top-diff-input">むずかしい</label>
        </div>
      {/* <p>選択された難易度：{diffVal}</p> */}
    </div>
  );
};

export default Top;
