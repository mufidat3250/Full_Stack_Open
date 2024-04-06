
import {configureStore} from '@reduxjs/toolkit'
import  FilterReducers  from './reducers/filterReducers'
import AnecdoteReducer from './reducers/anecdoteReducer'
import Notification from './reducers/notification' 


const store = configureStore({
    reducer:{
        Anecdotes: AnecdoteReducer,
        Filter: FilterReducers,
        notification: Notification
    }
})
store.subscribe(()=>{
    console.log(store.getState())
})

export default store