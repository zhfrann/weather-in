import { createSlice } from "@reduxjs/toolkit";

const selectedPlaceSlice = createSlice({
    name: "selectedPlace",
    initialState: [],
    reducers: {
        setSelectedPlace: (state, action) => {
            state.splice(0, state.length, action.payload)
        }
    }
})

export const { setSelectedPlace } = selectedPlaceSlice.actions
export default selectedPlaceSlice.reducer