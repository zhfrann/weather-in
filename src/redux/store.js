import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice"
import selectedPlaceReducer from "./slices/selectedPlaceSlice"
import weatherReducer from "./slices/weatherSlice"
import forecastReducer from "./slices/forecastSlice"

const store = configureStore({
    reducer: {
        search: searchReducer,
        selectedPlace: selectedPlaceReducer,
        weather: weatherReducer,
        forecast: forecastReducer
    }
})

export default store