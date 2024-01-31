// Name of the course
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
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
  return (
    <p>Number of exercises {props.totalExercises}</p>
  )
}

// Main component
const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]
  const totalExercises = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

// const App = () => {
//   const friends = [
//     { name: 'Peter', age: 4 },
//     { name: 'Maya', age: 10 },
//   ]

//   return (
//     <div>
//       <p>{friends[0]}</p>
//       <p>{friends[1]}</p>
//     </div>
//   )
// }

// export default App

export default App