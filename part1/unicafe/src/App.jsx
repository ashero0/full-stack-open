import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({field, value}) => {
  return (
    <tr>
      <td>{field}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  if (!total) return <p>No feedback given</p>
  
  // good: 1, neutral: 0, bad: -1
  const average = (good - bad) / total

  // percentage of positive feedback
  const positive = (good / total) *100

  return (
    <div>
      <StatisticLine field="good" value={good} />
      <StatisticLine field="neutral" value={neutral} />
      <StatisticLine field="bad" value={bad} />
      <StatisticLine field="average" value={average} />
      <StatisticLine field="positive" value={positive + '%'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App