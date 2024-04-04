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

export default notificationSlice.reducer
export const { setNotification , removeNotification} = notificationSlice.actions