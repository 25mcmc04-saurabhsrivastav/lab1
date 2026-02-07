// ---------- Types ----------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// ---------- DOM Elements ----------
var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var weatherBox = document.getElementById("weatherBox");
var errorBox = document.getElementById("errorBox");
var tempText = document.getElementById("temp");
var humidityText = document.getElementById("humidity");
var conditionText = document.getElementById("condition");
// ---------- Weather Code Mapping ----------
function getWeatherCondition(code) {
    if (code === 0)
        return "Clear Sky";
    if (code <= 3)
        return "Partly Cloudy";
    if (code <= 48)
        return "Foggy";
    if (code <= 67)
        return "Rain";
    if (code <= 77)
        return "Snow";
    return "Unknown";
}
// ---------- Fetch Weather ----------
function fetchWeather(city) {
    return __awaiter(this, void 0, void 0, function () {
        var geoUrl, geoResponse, geoData, _a, latitude, longitude, weatherUrl, weatherResponse, weatherData, temperature, code, humidity, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=".concat(city, "&count=1");
                    return [4 /*yield*/, fetch(geoUrl)];
                case 1:
                    geoResponse = _c.sent();
                    return [4 /*yield*/, geoResponse.json()];
                case 2:
                    geoData = _c.sent();
                    if (!geoData.results || geoData.results.length === 0) {
                        return [2 /*return*/, { error: "City not found" }];
                    }
                    _a = geoData.results[0], latitude = _a.latitude, longitude = _a.longitude;
                    weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=".concat(latitude, "&longitude=").concat(longitude, "&current_weather=true&hourly=relativehumidity_2m");
                    return [4 /*yield*/, fetch(weatherUrl)];
                case 3:
                    weatherResponse = _c.sent();
                    return [4 /*yield*/, weatherResponse.json()];
                case 4:
                    weatherData = _c.sent();
                    temperature = weatherData.current_weather.temperature;
                    code = weatherData.current_weather.weathercode;
                    humidity = weatherData.hourly.relativehumidity_2m[0];
                    return [2 /*return*/, {
                            temperature: temperature,
                            humidity: humidity,
                            condition: getWeatherCondition(code)
                        }];
                case 5:
                    _b = _c.sent();
                    return [2 /*return*/, { error: "Network error" }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// ---------- UI Update ----------
function updateUI(result) {
    if ("error" in result) {
        weatherBox.style.display = "none";
        errorBox.style.display = "block";
        errorBox.textContent = result.error;
        return;
    }
    errorBox.style.display = "none";
    weatherBox.style.display = "block";
    tempText.textContent = "Temperature: ".concat(result.temperature, " \u00B0C");
    humidityText.textContent = "Humidity: ".concat(result.humidity, " %");
    conditionText.textContent = "Condition: ".concat(result.condition);
}
// ---------- Event Handling ----------
searchBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var city, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = cityInput.value.trim();
                if (!city) {
                    updateUI({ error: "Please enter a city" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetchWeather(city)];
            case 1:
                result = _a.sent();
                updateUI(result);
                return [2 /*return*/];
        }
    });
}); });
