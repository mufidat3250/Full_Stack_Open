import { useSelector, useDispatch } from 'react-redux'
import { handleUpdateAnecdote} from '../reducers/anecdoteReducer'
import { notification} from '../reducers/notification'
const Anecdotes = () => {
    const anecdotes = useSelector(state => state.Anecdotes)
    const input =  useSelector((state)=> state.Filter)
    const sortedAnecdote = [...anecdotes].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    const vote = async (anecdote) => {
      dispatch(handleUpdateAnecdote(anecdote))
      dispatch(notification(`You voted ${anecdote.content}`, 3000))
    }
    const filteredAnecdote = sortedAnecdote.filter((anecdote)=> anecdote.content.toLowerCase().includes(input.toLowerCase()))
return (
    <div>
      {filteredAnecdote.map(anecdote =>
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
