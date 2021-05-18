import React, {useState} from 'react'

const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Button = ({name, handleClick}) => {
  return (
    <>
      <button onClick={handleClick}>{name}</button>
    </>
  )
}

const Display = ({anecdote, vote}) => {
  return (
    <>
      {anecdote} <br/>
      has {vote} votes <br/>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))

  const setValueVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }
  const nextAnecdote = () => {
    const value = selected + 1
    if (value >= votes.length) {
      setSelected(0)
    } else {
      setSelected(value)
    }
  }

  const getHighVotedAnecdote = () => {
    let highVoted = {
      vote: 0,
      index: 0
    }
    votes.forEach((element, index) => {
      if (element > highVoted.vote) {
        highVoted.vote = element
        highVoted.index = index
      } 
    });
    console.log('value of high voted anecdote', highVoted)
    return highVoted
  }
  const highVotedAnecdote = getHighVotedAnecdote()

  return (
    <div>
      <Header name='Anecdote of the day'/>
      <Display anecdote={anecdotes[selected]} vote={votes[selected]}/>
      <Button name='vote' handleClick={setValueVote}/>
      <Button name='next anecdote' handleClick={nextAnecdote}/>

      <Header name='Anecdote with most votes'/>
      <Display anecdote={anecdotes[highVotedAnecdote.index]} vote={highVotedAnecdote.vote}/>     
    </div>
  )
}


export default App