import React from 'react'
const Header = ({course}) =>  <h1>{course}</h1>
const Part = ({partNo, exercises}) => <p>{partNo} {exercises}</p>
const Content = ({parts}) =>  {
  return (
    <div>
      {parts.map(part => <Part partNo={part.name}  exercises={part.exercises} />)}
    </div>
  )
}
const Total = ({parts}) => <p>Number of exercises {parts.reduce((pre, cur) => pre + cur.exercises, 0)} </p>
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const { name, parts } = course
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
