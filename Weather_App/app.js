const cityInput = document.getElementById('cityInput');
const dropdownMenu = document.getElementById('dropdownMenu');
const submitBtn = document.getElementById('submitBtn');
const weatherInfo = document.getElementById('weatherInfo');

cityInput.addEventListener('input', handleInput);

async function handleInput() {
    const query = cityInput.value.toLowerCase();
    const filteredCities = cities.filter(city => city.name.toLowerCase().startsWith(query));
    displayDropdown(filteredCities);
}

function displayDropdown(cities) {
    if (cities.length === 0 || cityInput.value.trim() === '') {
        dropdownMenu.style.display = 'none';
        return;
    }

    dropdownMenu.innerHTML = '';
    cities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city.name;
        listItem.addEventListener('click', () => {
            cityInput.value = city.name;
            dropdownMenu.style.display = 'none';
        });
        dropdownMenu.appendChild(listItem);
    });

    dropdownMenu.style.display = 'block';
}

submitBtn.addEventListener('click', getWeather);

async function getWeather() {
    const city = cityInput.value;
    if (city.trim() === '') {
        weatherInfo.innerHTML = '<p>Please enter a city name</p>';
        return;
    }

    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(weatherData) {
    if (weatherData.error) {
        weatherInfo.innerHTML = `<p>${weatherData.error}</p>`;
    } else {
        weatherInfo.innerHTML = `
            <p>Location: ${weatherData.location}</p>
            <p>Temperature: ${weatherData.temperature}°C</p>
            <p>Humidity: ${weatherData.humidity}%</p>
            <p>Wind Speed: ${weatherData.wind_speed} km/h</p>
            <p>Clouds: ${weatherData.cloud} km</p>
        `;
    }
}
