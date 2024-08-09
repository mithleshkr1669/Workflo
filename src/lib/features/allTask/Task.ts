import { createSlice } from "@reduxjs/toolkit";


let initialState: Array<any> = []


const task = createSlice({
    name: "task",
    initialState,
    reducers: {
        getAllTask: (state, action) => {
            return [...action.payload]
        }
    }
})

export const { getAllTask } = task.actions;
export default task.reducer;