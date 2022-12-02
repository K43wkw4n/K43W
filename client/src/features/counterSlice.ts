import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        num: 12
    },
    reducers:{
        increment:(state) => {
            state.num += 1
        },
        decrement: (state) => {
            state.num -= 1
        },
    }
})

export const { increment , decrement } = counterSlice.actions;

export default counterSlice.reducer;