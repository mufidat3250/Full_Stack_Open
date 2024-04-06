import { useDispatch } from "react-redux"
import { handleCreateAnecdote } from "../reducers/anecdoteReducer"
import {notification} from "../reducers/notification"

const Anecdote = () => {
  const dispatch = useDispatch()
const addAnecdote = async(e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(handleCreateAnecdote(content))
     dispatch(notification(`${content} was created`), 3000)
  
}

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default Anecdote
