const Course = ({course}) => {
const totalExercises = course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)

return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
    )}
    <p><strong>total of {totalExercises} exercises</strong></p>
    </div>
)
}

export default Course