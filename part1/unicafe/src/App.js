import React, { useState } from 'react'
const StatisticLine = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>)
const Statistics = ({data}) => {
  const { good, neutral, bad } = data
  const all = good  + neutral + bad
  const isData = all > 0 
  const point = good * 1 + neutral * 0 + bad * -1
  const average = (point / all).toFixed(1)
  const positive = (good / all * 100).toFixed(1) + ' %'
  return (
    <div>
      <h1>statistics</h1>
      {isData? (
        <table>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={all}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="positive" value={positive}></StatisticLine>
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </div>  
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const data = {
    good,
    neutral,
    bad,
  }
  const addOne = (action, record) => () => action(record + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addOne(setGood, good)}>good</button>
      <button onClick={addOne(setNeutral, neutral)}>neutral</button>
      <button onClick={addOne(setBad, bad)}>bad</button>
      <Statistics data={data}></Statistics>
    </div>
  )
}

export default App
