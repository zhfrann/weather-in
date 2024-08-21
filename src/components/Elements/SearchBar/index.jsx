/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import { getPlace } from "../../../services/geocoding"
import { useDispatch, useSelector } from "react-redux"
import { setSearch } from "../../../redux/slices/searchSlice"
import { setSelectedPlace } from "../../../redux/slices/selectedPlaceSlice"
import { setWeather } from "../../../redux/slices/weatherSlice"
import { getCurrentWeather, getWeatherForecast } from "../../../services/openweather"
import store from "../../../redux/store"
import { setForecast } from "../../../redux/slices/forecastSlice"

const SearchBar = () => {
    const [places, setPlaces] = useState([])
    // const selectedPlace = useSelector((state) => state.selectedPlace)
    const search = useSelector((state) => state.search)
    const dispatch = useDispatch()
    const debounceTimeout = useRef(null)

    // set search state while input search bar onChange
    const searchKeywordHandler = (event) => {
        dispatch(setSearch(event.target.value))

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            getPlace(event.target.value)
                .then((data) => {
                    const dataFiltered = data.filter((place) => {
                        return place.name.toLowerCase().includes(search.toLowerCase())
                    })
                    setPlaces(dataFiltered)
                })
                .catch((err) => {
                    console.error(err)
                })
        }, 200)
    }

    // handle action when datalist is clicked
    const placesListHandler = (place) => {
        dispatch(setSelectedPlace(place))

        const updatedSelectedPlace = store.getState().selectedPlace

        getCurrentWeather(updatedSelectedPlace[0].latitude, updatedSelectedPlace[0].longitude)
            .then((data) => {
                dispatch(setWeather(data))
            })
            .catch((err) => {
                console.error(err)
            })

        getWeatherForecast(updatedSelectedPlace[0].latitude, updatedSelectedPlace[0].longitude)
            .then((data) => {
                dispatch(setForecast(data))
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        alert('use search autocomplete')
        // dispatch(setSelectedPlace(selectedPlace[0]))

        // getCurrentWeather(selectedPlace[0].latitude, selectedPlace[0].longitude)
        //     .then((data) => {
        //         dispatch(setWeather(data))
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //     })

        // getWeatherForecast(selectedPlace[0].latitude, selectedPlace[0].longitude)
        //     .then((data) => {
        //         dispatch(setWeather(data))
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //     })
    }

    return (
        <div className="flex flex-col gap-2">
            <form className="w-full mx-auto" onSubmit={submitHandler}>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        name="search"
                        id="search"
                        list="searchCountry"
                        type="search"
                        placeholder="Bojongsoang, West Java, ID"
                        value={search}
                        onChange={searchKeywordHandler}
                        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
            </form>
            <div className="h-fit max-h-64 overflow-auto bg-white rounded-md">
                {
                    places.length > 0 && places.map((place, index) => {
                        const name = `${place.name}, ${place?.state}, ${place?.country}`
                        return (
                            <p
                                key={index}
                                className="bg-white py-2 px-4 transition-all hover:bg-gray-100 hover:cursor-pointer"
                                onClick={() => placesListHandler(place)}>{name}</p>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default SearchBar