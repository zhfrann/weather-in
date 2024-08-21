import axios from "axios"

const apiKey = import.meta.env.VITE_GEOCODING_KEY

const getPlace = (placeName) => {
    const request = axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${placeName}`, {
        headers: {
            'X-API-KEY': apiKey
        }
    })
    return request
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            throw err
        })
}

export { getPlace }