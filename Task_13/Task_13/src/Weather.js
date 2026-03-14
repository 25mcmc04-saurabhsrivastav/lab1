import React from "react";

function Weather({ data }) {
    return (
        <div className="weather-box">
            <h2>{data.name}</h2>
            <p>Temperature: {data.main.temp} °C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Condition: {data.weather[0].main}</p>
        </div>
    );
}

export default Weather;