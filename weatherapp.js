const apiKey = "37139491eaf70491e0470d1850c44f18"; 

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const currentWeatherDiv = document.getElementById("current-weather");
const weatherCardsDiv = document.getElementById("weather-cards");

//  Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

//  Function to display current weather
function displayCurrentWeather(data) {
    currentWeatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}

// Function to fetch weather by geolocation
function fetchWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error => alert("Error fetching weather"));
}

// Get user location
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByLocation(lat, lon);
            },
            (error) => {
                alert("Location access denied.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

//  Search weather by city
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

//  Search weather on Enter key press
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
