const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeather = async (city) => {
    const geoRes = await fetch(`${GEO_URL}?name=${city}&count=1`);
    const geoData = await geoRes.json();

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    const weatherRes = await fetch(
        `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const weatherData = await weatherRes.json();

    return {
        name: city,
        main: {
            temp: weatherData.current_weather.temperature,
            humidity: "-"
        },
        weather: [
            {
                main: weatherData.current_weather.weathercode
            }
        ]
    };
};

export const getForecast = async (city) => {
    const geoRes = await fetch(`${GEO_URL}?name=${city}&count=1`);
    const geoData = await geoRes.json();

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    const weatherRes = await fetch(
        `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    const weatherData = await weatherRes.json();

    return {
        list: weatherData.daily.time.map((date, i) => ({
            dt_txt: date,
            main: { temp: weatherData.daily.temperature_2m_max[i] },
            weather: [{ main: "Forecast" }]
        }))
    };
};