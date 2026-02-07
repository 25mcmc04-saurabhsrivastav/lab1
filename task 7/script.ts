// ---------- Types ----------

// Successful weather response
type WeatherSuccess = {
    temperature: number;
    humidity: number;
    condition: string;
};

// Error response
type WeatherError = {
    error: string;
};

// Union type
type WeatherResult = WeatherSuccess | WeatherError;


// ---------- DOM Elements ----------

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const weatherBox = document.getElementById("weatherBox") as HTMLDivElement;
const errorBox = document.getElementById("errorBox") as HTMLDivElement;

const tempText = document.getElementById("temp") as HTMLParagraphElement;
const humidityText = document.getElementById("humidity") as HTMLParagraphElement;
const conditionText = document.getElementById("condition") as HTMLParagraphElement;


// ---------- Weather Code Mapping ----------

function getWeatherCondition(code: number): string {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    return "Unknown";
}


// ---------- Fetch Weather ----------

async function fetchWeather(city: string): Promise<WeatherResult> {
    try {
        // Step 1: Convert city name → coordinates
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            return { error: "City not found" };
        }

        const { latitude, longitude } = geoData.results[0];

        // Step 2: Fetch weather
        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current_weather.temperature;
        const code = weatherData.current_weather.weathercode;
        const humidity = weatherData.hourly.relativehumidity_2m[0];

        return {
            temperature,
            humidity,
            condition: getWeatherCondition(code)
        };

    } catch {
        return { error: "Network error" };
    }
}


// ---------- UI Update ----------

function updateUI(result: WeatherResult) {
    if ("error" in result) {
        weatherBox.style.display = "none";
        errorBox.style.display = "block";
        errorBox.textContent = result.error;
        return;
    }

    errorBox.style.display = "none";
    weatherBox.style.display = "block";

    tempText.textContent = `Temperature: ${result.temperature} °C`;
    humidityText.textContent = `Humidity: ${result.humidity} %`;
    conditionText.textContent = `Condition: ${result.condition}`;
}


// ---------- Event Handling ----------

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (!city) {
        updateUI({ error: "Please enter a city" });
        return;
    }

    const result = await fetchWeather(city);
    updateUI(result);
});
