import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
const randomAnecdoteIdex = () => Math.floor(Math.random() * anecdotes.length-1 + 1)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const handleAddVote = () => {
      setVotes((prevState)=> {
        let copy = [...prevState]
        copy[selected] += 1
        return copy
      })
}

const higestVote = (votes) => {
  return  votes.reduce((acc, cur)=> {
    if(acc >= cur) {
      return acc
    }else return cur
  } , 0)
}
// alternative to the higestVote
  // let indexOfHigerVote = votes.indexOf(Math.max(...votes))
  console.log(higestVote(votes))
  return (
    <div>
      <p style={{padding:'0', margin:'0'}}>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={()=> setSelected(randomAnecdoteIdex)}>next anecdote</button>
      <button onClick={handleAddVote}>Vote</button>

      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[indexOfHigerVote]}</p>
        <p>has {votes[votes.indexOf(higestVote(votes))]} Votes</p>
      </div>
    </div>
  )
}

export default App