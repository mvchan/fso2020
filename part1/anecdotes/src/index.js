import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({value}) => <h1>{value}</h1>

const Anecdote = ({details}) => 
  <>
  {anecdotes[details.index]}<br/>
  has {details.votes[details.index]} votes<br/>
  </>

const Button = (props) => 
  <button onClick={props.handleClick}>
    {props.text}
  </button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [mostVoted, setMostVoted] = useState(0)

  const getRandomInt = (max) => (
    Math.floor(Math.random() * Math.floor(max))
  )

  // this must return a function in order to avoid re-render error when used for handleClick
  const increaseVote = (votes,selected) => {

    return () => {
      const copy = {...votes}
      copy[selected] += 1
      setVotes(copy)

      if (copy[selected] > copy[mostVoted])
        setMostVoted(selected)
    }
  }

  return (
    <div>
      <Display value="Anecdote of the day"></Display>
      <Anecdote details={{index:selected,votes:votes}} />
      <Button handleClick={increaseVote(votes,selected)} text="vote" />
      <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text="next anecdote" />
      <Display value="Anecdote with the most votes"></Display>
      <Anecdote details={{index:mostVoted,votes:votes}} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)