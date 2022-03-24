import React from 'react'
const Header = ({course}) =>  <h2>{course}</h2>
const Part = ({partNo, exercises}) => <p>{partNo} {exercises}</p>
const Content = ({parts}) =>  {
  return (
    <div>
      {parts.map(part => <Part partNo={part.name}  exercises={part.exercises} />)}
    </div>
  )
}
const Total = ({parts}) => <b>Total of exercises {parts.reduce((pre, cur) => pre + cur.exercises, 0)} </b>
const Course = ({course}) => (
  <>
    <Header course={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
  </>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => <Course course={course} />)} 

      </div>
    )
}

export default App
