import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        setNotification (state, action){
            return state = action.payload
        },
        removeNotification (state, action) {
            return state = action.payload
        }
    }
})




export const { setNotification , removeNotification} = notificationSlice.actions


export const clearNotification  = () => {
    return async dispatch => {
        dispatch(removeNotification(''))
    }
}

export const notification = ( desc, time = 2000) => {
    return async(dispatch) => {
        dispatch(setNotification(desc))

        setTimeout(() => {
            dispatch(clearNotification())
        }, time)
        
    }
}

export default notificationSlice.reducer