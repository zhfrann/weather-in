/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import SearchBar from "../Elements/SearchBar"
import { useEffect, useState } from "react";

const WeatherImage = ({ images, selectedPlace }) => {
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {images.map((image, index) => (
                <img
                    key={index}
                    className={`absolute w-screen h-screen object-cover opacity-0 z-0 transition-[opacity] duration-[0.5s]  ${selectedPlace === index ? "opacity-100 z-[1]" : ""}`}
                    src={`/weather-in/${image}`}
                    alt={`Weather ${index}`}
                />
            ))}
        </div>
    );
}

const SearchCountry = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const selectedPlace = useSelector((state) => state.selectedPlace)
    const weather = useSelector((state) => state.weather)
    const forecast = useSelector((state) => state.forecast)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const weatherImages = [
        "/weathers/clear-weather.jpg"
    ]

    return (
        <>
            {/* <img
                className="w-screen h-screen object-cover relative backdrop-blur-md transition-all"
                src={selectedPlace.length === 0 ? `/weathers/river.jpg` : `/weathers/clear-weather.jpg`} /> */}

            <WeatherImage images={weatherImages} selectedPlace={0} />

            <div className="overflow-auto absolute left-0 right-0 bottom-0 top-0 grid place-items-center gap-5 z-[2]">
                <div className={`container ${(selectedPlace && 'mt-14') || (!selectedPlace && 'mt-4')} w-[92%] md:-4/5 lg:w-3/5 pt-2.5 pb-5 px-5 border-white/30 border-[1.4px] bg-white/30 backdrop-blur-lg shadow-xl rounded-md flex flex-col gap-5`}>
                    <h1 className="text-2xl lg:text-4xl font-extrabold text-white text-center">Find Your City</h1>
                    <SearchBar />
                </div>
                {selectedPlace.length > 0 && (
                    <>
                        <div className="container text-white w-[92%] md:-4/5 lg:w-3/5 pt-2.5 pb-5 px-5 border-white/30 border-[1.4px] bg-white/30 backdrop-blur-lg shadow-xl rounded-md flex flex-col gap-5">
                            <div className="flex flex-row gap-2">
                                <div className="w-3/5 lg:w-3/4">
                                    <h2 className="text-xl lg:text-2xl font-bold">{`${selectedPlace[0].name}, ${selectedPlace[0]?.state}, ${selectedPlace[0]?.country}`}</h2>
                                    <p className="">{`${currentTime.toDateString()}`}</p>
                                    <p className="mt-4 mb-5 text-3xl font-semibold">
                                        {
                                            weather[0]?.weather[0]?.description
                                                .split(" ")
                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(" ")
                                        }
                                    </p>
                                    <p>{currentTime.toLocaleTimeString()}</p>
                                    <p className="flex flex-row gap-2 w-full">
                                        <span className="">Latitude</span>
                                        <span className="">{weather[0]?.coord?.lat}</span>
                                    </p>
                                    <p className="flex flex-row gap-2 w-full">
                                        <span className="">Longitude</span>
                                        <span className="">{weather[0]?.coord?.lon}</span>
                                    </p>
                                </div>
                                <div className="w-2/5 lg:w-1/4 flex flex-col items-center">
                                    <img src={`https://openweathermap.org/img/wn/${weather[0]?.weather[0]?.icon}@2x.png`} alt="weather icon" />
                                    <p className="font-semibold text-2xl">
                                        <span className="">{(weather[0]?.main?.temp - 273).toFixed(1)}</span> °C
                                    </p>
                                    <p className="flex flex-row justify-between gap-2 w-full my-[2px]">
                                        <span className="lg:text-[16px]">Wind Speed</span>
                                        <span className="lg:text-[16px]">{weather[0]?.wind?.speed} m/s</span>
                                    </p>
                                    <p className="flex flex-row justify-between gap-2 w-full my-[2px]">
                                        <span className="lg:text-[16px]">Humidity</span>
                                        <span className="lg:text-[16px]">{weather[0]?.main?.humidity}%</span>
                                    </p>
                                    <p className="flex flex-row justify-between gap-2 w-full my-[2px]">
                                        <span className="lg:text-[16px]">Visibility</span>
                                        <span className="lg:text-[16px]">{weather[0]?.visibility / 1000} km</span>
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="container text-white w-[92%] md:-4/5 lg:w-3/5 pt-2.5 pb-2.5 px-2.5 border-white/30 border-[1.4px] bg-white/30 backdrop-blur-lg shadow-xl rounded-md flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                {forecast[0]?.list.slice(0, 12).map((item, idx) => {
                                    return (
                                        <div key={idx} className="p-2 lg:text-lg bg-gray-50/25 rounded-md flex flex-row justify-between">
                                            <span className="w-fit">
                                                {new Date(item?.dt_txt).getDate()}/{new Date(item?.dt_txt).getMonth() + 1} {new Date(item?.dt_txt).toLocaleTimeString()}
                                            </span>
                                            <span className="w-fit">
                                                {(item?.main?.temp - 273).toFixed(1)} °C, {item?.weather[0]?.description}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="container text-center text-white w-[92%] md:-4/5 lg:w-3/5 pt-4 pb-5 px-5 border-white/30 border-[1.4px] bg-white/30 backdrop-blur-lg shadow-xl rounded-md">
                            <span className="mr-5">created by :</span>
                            <a className="inline text-white bg-slate-900 hover:bg-black rounded-lg px-3 py-2 font-mono"
                                href="https://github.com/zhfrann" target="_blank" rel="noreferrer">zhfrann</a>
                            <p className="mt-2">
                                <a className="underline" href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeather</a> is used for weather data
                            </p>
                        </div>
                        <div></div>
                        <div></div>

                    </>
                )}
            </div >

        </>
    )
}

export default SearchCountry