import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notification'
const Anecdotes = () => {
    const anecdotes = useSelector(state => state.Anecdotes)
    const input =  useSelector((state)=> state.Filter)
    const copiedAnecdote = [...anecdotes].sort((a, b) => b.votes - a.votes).filter((anecdote)=> anecdote.content.toLowerCase().includes(input.toLowerCase()))
   
    const dispatch = useDispatch()
    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`You voted ${anecdote.content}`))
      setTimeout(() => {
      dispatch(removeNotification(''))
    }, 3000);
}

  return (
    <div>
      {copiedAnecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes
