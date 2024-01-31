// Name of the course
const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

// Parts and their num of exercises
const Part = (props) => {
  const {part} = props
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
const Content = (props) => {
  const {parts} = props
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

// Total num of exercises
const Total = (props) => {
  const totalExercises = props.parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

// Main component
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App