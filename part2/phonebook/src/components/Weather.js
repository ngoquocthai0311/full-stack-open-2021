import React from "react";

const Weather = ({weather})  => {
    return (
        // documentation for weather api https://weatherstack.com/documentation
        <>
            <h1>Weather in {weather.location.name}</h1>
            <p>temperature {weather.current.temperature}</p>
            <img src={weather.current.weather_icons[0]} alt="weather icon"/>
            <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </>
    )
}

export default Weather