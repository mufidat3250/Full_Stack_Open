import { createSlice} from "@reduxjs/toolkit";
import AnecdoteServices from '../services'



const anecdoteSlice = createSlice({
    name:'anecdote',
    initialState: [],
    reducers:{
      createAnecdote (state, action) {
        return [...state, action.payload]
      },
      updateAnecdote (state, action) {
        const id = action.payload.id
        return state.map((anc)=> anc.id !== id ? anc : action.payload)
      }, 
      setAnecdote (state, action) {
        return action.payload
      }

    }
})


export const { createAnecdote, updateAnecdote, setAnecdote} = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async (dispatch) => {
      const anecdotes = await AnecdoteServices.getAllAnecdote()
      console.log({anecdotes})
    dispatch(setAnecdote(anecdotes))
  }
}

export const handleCreateAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await AnecdoteServices.createNew({content, vote: 0})
    dispatch(createAnecdote(anecdote))
  }
}

export const handleUpdateAnecdote = (anecdoteObj) => {
  return async (dispatch) => {
    const AnecdoteVotings = await AnecdoteServices.updateVote(anecdoteObj)
    dispatch(updateAnecdote(AnecdoteVotings))
  }
}


export default anecdoteSlice.reducer
