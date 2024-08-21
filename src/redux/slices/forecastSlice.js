import { createSlice } from "@reduxjs/toolkit";

const forecastSlice = createSlice({
    name: "forecast",
    initialState: [],
    reducers: {
        setForecast: (state, action) => {
            state.splice(0, state.length, action.payload)
        }
    }
})

export const { setForecast } = forecastSlice.actions
export default forecastSlice.reducer