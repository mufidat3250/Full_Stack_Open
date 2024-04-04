import { useSelector, useDispatch } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'
const Anecdotes = () => {
    const anecdotes = useSelector(state => state.sort((a,b)=> b.votes - a.votes))
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(voting(id))
    }
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes
