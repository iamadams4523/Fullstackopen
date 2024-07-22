import { useState } from 'react';

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <>
        <h3>No feedback given</h3>
      </>
    );
  }
  return (
    <>
      <h2>Statistics</h2>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + neutral + bad) / 3}</p>
      <p>positive {(good + neutral) / 3}</p>
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    console.log(good);
    const newgood = good + 1;
    setGood(newgood);
  };
  const handleNeutral = () => {
    console.log(neutral);
    const newneutral = neutral + 1;
    setNeutral(newneutral);
  };
  const handleBad = () => {
    console.log(bad);
    const newbad = bad + 1;
    setBad(newbad);
  };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
