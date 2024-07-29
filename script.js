const apiKey = '3e13c7390b5c8c59944120220a7500f3'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        displayError('Please enter a city name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        toggleLoading(true);
        const response = await fetch(url);
        toggleLoading(false);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const { name, main, weather, wind, sys } = data;
    const weatherDescription = weather[0].main.toLowerCase(); // Get weather description and convert to lowercase

    // Set background image based on weather description
    setBackgroundByWeather(weatherDescription);

    // Update weather information display
    weatherInfo.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels Like: ${main.feels_like}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Pressure: ${main.pressure} hPa</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Wind Direction: ${wind.deg}°</p>
    `;
    weatherInfo.style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
}

function setBackgroundByWeather(weatherDescription) {
    const body = document.body;
    let backgroundImageUrl = '';

    switch (weatherDescription) {
        case 'clear':
            backgroundImageUrl = 'url("https://s7d2.scene7.com/is/image/TWCNews/img_3214_jpg-2")';
            break;
        case 'clouds':
            backgroundImageUrl = 'url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg")';
            break;
        case 'rain':
        case 'drizzle':
            backgroundImageUrl = 'url("https://static.vecteezy.com/system/resources/previews/029/772/197/large_2x/human-daily-life-on-rainy-day-enjoying-rainfall-and-happy-life-lively-rainy-season-concept-generative-ai-free-photo.jpeg")';
            break;
        case 'thunderstorm':
            backgroundImageUrl = 'url("https://static.independent.co.uk/2021/06/16/15/newFile-5.jpg")';
            break;
        case 'snow':
            backgroundImageUrl = 'url("https://i.cbc.ca/1.6691747.1671496038!/cumulusImage/httpImage/snow-weather.jpg")';
            break;
        default:
            backgroundImageUrl = 'url("https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg")';
            break;
    }

    body.style.backgroundImage = backgroundImageUrl;
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    document.getElementById('weather-info').style.display = 'none';
}

function toggleLoading(show) {
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.style.display = show ? 'block' : 'none';
}