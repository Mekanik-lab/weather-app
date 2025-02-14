const apiKey = "940234054c0a42ead1bc96247a15d14f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404 || searchBox.value === '')
    {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        document.querySelector('.error').style.display = 'none';

        let data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = './assets/cloud.png';
            weatherIcon.alt = 'cloud';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = './assets/clear.png';
            weatherIcon.alt = 'clear';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = './assets/rain.png';
            weatherIcon.alt = 'rain';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = './assets/drizzle.png';
            weatherIcon.alt = 'drizzle';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = './assets/mist.png';
            weatherIcon.alt = 'mist';
        }

        document.querySelector('.weather').style.display = 'block';
    }
};

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});