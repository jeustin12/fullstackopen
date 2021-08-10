import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0,0,0,0,0,0])
  const randomNumber=()=>{
    setSelected(Math.round(Math.random() * (5 - 0) + 0))
  }
  const votes =()=>{
  const copy = [...vote ]  
    copy[selected] += 1
    setVote(copy)
  }
  return (
    <div>
      <h1>{props.anecdotes[selected]}</h1>
      <h1>has {vote[selected]} votes</h1>
      <button onClick={votes}>Vote</button>
      <button onClick={randomNumber} >Next anecdote</button>
      <h1>Anecdote wiht most votes</h1>
      <h2>{props.anecdotes[vote.indexOf(Math.max(...vote))]} <br />
      has {Math.max(...vote)} votes
      </h2>

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