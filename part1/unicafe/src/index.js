import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({value}) => <h1>{value}</h1>

const Button = (props) => 
  <button onClick={props.handleClick}>
    {props.text}
  </button>

const Statistic = ({text,value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)

const Statistics = ({stat}) => {

  if (stat.all === 0)
    return (<p>No feedback given</p>)
  
  return (
    <table>
      <tbody>
      <Statistic text="good" value={stat.good} />
      <Statistic text="neutral" value={stat.neutral} />
      <Statistic text="bad" value={stat.bad} />
      <Statistic text="all" value={stat.all} />
      <Statistic text="average" value={(stat.good*1 + stat.neutral*0 + stat.bad*-1) / stat.all} />
      <Statistic text="positive" value={(stat.good / stat.all * 100) + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const allStats = {good,neutral,bad,all}

  return (
    <div>
      <Display value="give feedback"></Display>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Display value="statistics"></Display>
      <Statistics stat={allStats}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)