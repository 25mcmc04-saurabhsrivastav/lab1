import React from "react";

function Forecast({ data }) {
    return (
        <div className="weather-box">
            <h3>5 Day Forecast</h3>
            {data.list.slice(0, 5).map((item, index) => (
                <div key={index}>
                    <p>{item.dt_txt}</p>
                    <p>{item.main.temp} °C</p>
                    <p>{item.weather[0].main}</p>
                </div>
            ))}
        </div>
    );
}

export default Forecast;