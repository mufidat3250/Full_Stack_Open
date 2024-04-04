import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'Filter',
    initialState: '',
    reducers: {
        setFilter (state, action) {
            return state = action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer