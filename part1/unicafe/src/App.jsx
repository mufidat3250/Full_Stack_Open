import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;

const Statistics = ({ good, bad, neutral, all }) => {
  let positive = (6 / all) * 100;

  const average = function (good, neutral = 0, bad = -1) {
    return (good + neutral + bad) / 3;
  };
  if (all === 0) {
    return <p>No Feedback given</p>;
  }
  return (
    <div>
      <h1>Statistics</h1>
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"All"} value={all} />
        <StatisticLine text={"Average"} value={(good + neutral + bad) / 3} />
        <StatisticLine
          text={"Positive"}
          value={`${positive === Infinity ? 0 : positive}%`}
        />
    
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
     <table>
        <tbody>
        <tr>
          <td style={{ width: "4rem" }}>{text}</td>
          <td>{value}</td>
        </tr>
        </tbody>
      </table>
  );
};
