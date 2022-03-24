import React, { useState } from 'react'
const Anecdote = ({text, score}) => (<div>
  <div>{text}</div>
  <div>has {score} votes</div>
</div>)
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const initialPoints = new Array(anecdotes.length).fill(0)
  const [points, setPoint] = useState(initialPoints)
  const [maxPointIndex, setMaxPointIndex] = useState(0)
  const handleVote = (selected) => () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoint(newPoints)
    const mostVotes = newPoints.reduce((pre, cur, index) => cur > pre.vote ? {vote: cur, index} : pre, {vote: 0, index: 0})
    setMaxPointIndex(mostVotes.index)
  }
  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} score={points[selected]}></Anecdote>
      <button onClick={handleVote(selected)}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <br />
      <h1>Anecdote with the most votes</h1>
      <Anecdote text={anecdotes[maxPointIndex]} score={points[maxPointIndex]}></Anecdote>
    </div>
  )
}

export default App
