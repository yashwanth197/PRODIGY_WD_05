document.getElementById('searchButton').addEventListener('click', fetchWeather);

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeatherData(location);
    } else {
        alert('Enter a location');
    }
}

function getWeatherData(location) {
    const apiKey = '2f265de23e8b4abb9c494dc9b40fce39';
    const url = `https://api.weatherbit.io/v2.0/current?city=${location}&key=${apiKey}&units=M`; // changed units to 'M' for Celsius

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            changeBackground(data.data[0].weather.code);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayCurrentWeather(data) {
    if (data && data.data && data.data.length > 0) {
        const weatherData = data.data[0];
        const weatherSection = document.getElementById('currentWeather');
        weatherSection.innerHTML = `
            <h2>Current Weather in ${weatherData.city_name}</h2>
            <div class="weather-info">
                <img src="https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png" alt="Weather icon">
                <div>
                    <div class="weather-temp">${Math.round(weatherData.temp)}°C</div> <!-- changed temperature to Celsius -->
                    <div>${weatherData.weather.description}</div>
                </div>
            </div>
        `;
    } else {
        alert('Weather data not found for the specified location.');
    }
}

function changeBackground(weatherCode) {
    let backgroundUrl;
    switch (weatherCode) {
        case 800:
            backgroundUrl = 'url(images/clear_sky.jpg)'; // Example for clear sky
            break;
       
        case 804:
            backgroundUrl = 'url(images/cloudy.jpg)'; // Example for cloudy
            break;
       
        case 504:
            backgroundUrl = 'url(images/rain.jpg)'; // Example for rain
            break;
        case 600:
        case 601:
        case 602:
            backgroundUrl = 'url(images/snow.jpg)'; // Example for snow
            break;
        default:
            backgroundUrl = 'url(images/default.jpg)'; // Default background
            break;
    }
    document.body.style.backgroundImage = backgroundUrl;
}