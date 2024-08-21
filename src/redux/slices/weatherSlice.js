import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name: "weather",
    initialState: [],
    reducers: {
        setWeather: (state, action) => {
            state.splice(0, state.length, action.payload)
        }
    }
})

export const { setWeather } = weatherSlice.actions
export default weatherSlice.reducer