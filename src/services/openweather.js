import axios from "axios"

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY

const getCurrentWeather = (latitude, longitude) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    return request
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            throw err
        })
}

const getWeatherForecast = (latitude, longitude) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    return request
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            throw err
        })
}

export { getCurrentWeather, getWeatherForecast }