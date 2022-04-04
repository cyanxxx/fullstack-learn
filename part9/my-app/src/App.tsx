import React from 'react';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

// new types
type CoursePartDescribeBase = CoursePartBase & {description: string;}

interface CourseNormalPart extends CoursePartDescribeBase {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescribeBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescribeBase {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]
/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props: {courseName: string}) => {
  return (
    <h1>{props.courseName}</h1>
  )
}
const Content = (props: {courseParts: CoursePart[]}) => {
  return (
    <div>
      { props.courseParts.map(coursePart => 
        (
          <Part key={coursePart.name} part={coursePart}></Part>
        )
      )}
    </div>  
  )
}
const Part = (props: {part: CoursePart}) => {
  const coursePart = props.part
  switch (coursePart.type) {
    case 'normal': {
      return (
        <div key={coursePart.name}>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <div>{coursePart.description}</div>
        </div>
      )
    }
    case 'groupProject': {
      return (
        <div key={coursePart.name}>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <div>project exercise {coursePart.groupProjectCount}</div>
        </div>
      )
    }
    case 'submission': {
      return (
        <div key={coursePart.name}>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <div>{coursePart.description}</div>
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
        </div>
      )
    }
    case 'special': {
      return (
        <div key={coursePart.name}>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <div>{coursePart.description}</div>
          <div>required skils: {coursePart.requirements.join(',')}</div>
        </div>
      )
    }
    default: {
      return assertNever(coursePart);
    }
  }
}
const Total = (props: {courseParts: CoursePart[]}) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}
const App: React.FC = () => {
  const courseName = "Half Stack application development";
  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total courseParts={courseParts}></Total>
    </div>
  );
};

export default App;
