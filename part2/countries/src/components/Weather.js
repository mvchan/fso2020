import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY || null;

const getWindCompassDirection = (degrees) => {

    const direction = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]

    return direction[Math.floor((degrees % 360) / 22.5)]
}

const Weather = ({city}) => {

    //must set up a minimum default state in order to avoid "undefined" error due to promise
    const [ weather, setWeather ] = useState(
                                                {
                                                    weather:[{icon:null}],
                                                    main:{temp:null},
                                                    wind:{speed:null,deg:null}
                                                }
                                            )

    useEffect(() => {
        console.log('weather effect')
        console.log('api key: ',api_key)
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${city}`)
            .then(response => {
            console.log('weather promise fulfilled')
            console.log(response.data)
            setWeather(response.data)
            })
    },[city])

    return (
        <>
            <h3>Weather in {city}</h3>
            <b>temperature: </b>{weather.main.temp}
            <br/>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt='weather icon'></img>
            <br/>
            <b>wind: </b>{weather.wind.speed} mph {weather.wind.deg} {getWindCompassDirection(weather.wind.deg)}
        </>
    )
}

export default Weather
