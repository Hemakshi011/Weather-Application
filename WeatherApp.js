import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import wind_icon from '../Assets/wind.png';
import weather_icon from '../Assets/weather.png';
import humidity_icon from '../Assets/humidity.png';
import rainy_icon from '../Assets/rainy.png';
import cloudy_icon from '../Assets/cloudy.png';
import drizzle_icon from '../Assets/drizzle.png';
import clear_icon from '../Assets/sunny.png';

const WeatherApp = () => {
    const [wicon, setWicon] = useState(cloudy_icon);
    const api_key = "469caa66cf902fb25736bf9c95002bd5";

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloudy_icon);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n" ||
            data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n" ||
            data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rainy_icon);
        } else {
            setWicon(weather_icon);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt=" " />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt=" " />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind-Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
