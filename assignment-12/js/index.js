"use strict";
async function getData(city){
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=814d6790e1a64d13baa164006241906&q=${city}&days=3`);
    let resultObject = await result.json();
    assignWeather(resultObject);
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const currentElement = document.getElementById('today');
const tomorrowElement = document.getElementById('tomorrow');
const afterTomorrowElement = document.getElementById('after-tomorrow');
const locationInput = document.getElementById('location-city');
const regex = /[a-zA-Z]{3,}$/

function assignWeather(resultObject){
    const location = resultObject.location;
    const city = location.name;
    const date = new Date(location.localtime_epoch * 1000);
    const current = resultObject.current;
    const currentTemp = current.temp_c;
    const currentCondition = current.condition;
    const currentPercipation = current.precip_mm;
    const currentWindSpeed = current.wind_kph;
    const currentWindDirection = current.wind_dir;

    const forcastTomorrow = resultObject.forecast.forecastday[1];
    const forcastAfterTomorrow = resultObject.forecast.forecastday[2];
    
    currentElement.innerHTML = `
        <div class="pri-head d-flex justify-content-between px-3 py-2 w-100 head">
                        <p class="m-0">${DAYS[date.getDay()]}</p>
                        <p class="m-0">${date.getDate() + ' ' + MONTHS[date.getMonth()]}</p>
                    </div>
                    <div class="p-3 text-start">
                        <p class="location text-white-50">${city}</p>
                        <h5 class="main-deg text-white">${currentTemp}<sup>o</sup>C</h5>
                        <img src="${currentCondition.icon}" class="w-25">
                        <p class="weather-desc text-primary">${currentCondition.text}</p>
                        <div class="w-75 d-flex text-white-50 justify-content-between info">
                            <div class="d-flex justify-content-center align-items-baseline">
                                <i class="fa-solid fa-umbrella mx-1"></i>
                                <p class="text-white">${currentPercipation} mm</p>
                            </div>
                            <div class="d-flex justify-content-center align-items-baseline">
                                <i class="fa-solid fa-wind mx-1"></i>
                                <p class="text-white">${currentWindSpeed} kph</p>
                            </div>
                            <div class="d-flex justify-content-center align-items-baseline">
                                <i class="fa-solid fa-compass mx-1"></i>
                                <p class="text-white">${currentWindDirection}</p>
                            </div>
                        </div>
                    </div>
    `
    const tomorrowDate = new Date(forcastTomorrow.date_epoch * 1000);
    tomorrowElement.innerHTML = `
        <div class="sec-head d-flex justify-content-center px-1 py-2 w-100 head">
            <p class="m-0">${DAYS[tomorrowDate.getDay()]}</p>
        </div>
        <div class="p-3 text-start d-flex align-items-center flex-column">
            <img src="https:${forcastTomorrow.day.condition.icon}" class="w-25">
            <h4 class="fw-bolder">${forcastTomorrow.day.maxtemp_c}<sup>o</sup>C</h4>
            <p class="text-white-50">${forcastTomorrow.day.mintemp_c}<sup>o</sup>C</p>
            <p class="text-primary">${forcastTomorrow.day.condition.text}</p>
        </div>
    `

    const afterTomorrowDate = new Date(forcastAfterTomorrow.date_epoch * 1000);
    afterTomorrowElement.innerHTML = `
        <div class="sec-head d-flex justify-content-center px-1 py-2 w-100 head">
            <p class="m-0">${DAYS[afterTomorrowDate.getDay()]}</p>
        </div>
        <div class="p-3 text-start d-flex align-items-center flex-column">
            <img src="https:${forcastAfterTomorrow.day.condition.icon}" class="w-25">
            <h4 class="fw-bolder">${forcastAfterTomorrow.day.maxtemp_c}<sup>o</sup>C</h4>
            <p class="text-white-50">${forcastAfterTomorrow.day.mintemp_c}<sup>o</sup>C</p>
            <p class="text-primary">${forcastAfterTomorrow.day.condition.text}</p>
        </div>
    `
}

let city = 'Cairo';

function loadFromStorage(){
    if (localStorage.getItem('city-location')){
        city = localStorage.getItem('city-location');
    }
}
loadFromStorage();
getData(city);

function saveToStorage(){
    const savecity = currentElement.querySelector('.location').innerHTML;
    localStorage.setItem('city-location', savecity);
}

locationInput.addEventListener('input',function(){
    const text = locationInput.value;
    if (regex.test(text)){
        getData(text);
    }
})


