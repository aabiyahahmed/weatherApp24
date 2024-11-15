const cityInput= document.querySelector("#search-bar");
const card= document.querySelector(".card");
const apiKey="b427ac8bc25f2aedf62d5887394334e3";
const searchBtn = document.querySelector("#search-btn")
const weatherinfo1 = document.querySelector("#weather-info-1")
const weatherinfo2 = document.querySelector("#weather-info-2")
/*const city = document.querySelector("#city")
const weatheremoji = document.querySelector("#weather-emoji")
const weatherdesc = document.querySelector("#weather-desc")
const temp = document.querySelector("#temp")
const humidity = document.querySelector("#humidity")*/

searchBtn.addEventListener("click", async event =>{
    console.log(cityInput.value)
    event.preventDefault();
    let city= cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            console.log(weatherData)
        }
        catch(error){
            console.error(error);
            //displayError(error);
        }
    }
    else{
        //displayError("Please Enter a city");

    }

})

async function getWeatherData(city){

    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response= await fetch(apiUrl);
    
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    else{
        return await response.json();
    }
}

function displayWeatherInfo(data){
    const {name:city, main:{temp, temp_max, temp_min, humidity, feels_like}, visibility, wind:{speed}, weather: [{id, description}]} = data;

    weatherinfo1.textContent= "";
    weatherinfo2.textContent= "";
    //card.style.display="flex";
    //card.innerHTML += `<p>${temp}</p>`

    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("p");
    const weatherdesc = document.createElement("p");
    const weatheremoji = document.createElement("p");

    const feelsLike = document.createElement("p");
    const maxmin = document.createElement("p");
    const visibilityDisplay = document.createElement("p");
    const windSpeed = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp} °C`;
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    weatherdesc.textContent = `${description}`;
    weatheremoji.textContent = getWeatherEmoji(id);

    feelsLike.textContent = `Feels Like: ${feels_like}`;
    maxmin.textContent = `${temp_max}°C/ ${temp_min}°C`
    visibilityDisplay.textContent = `Visibility: ${visibility}m`
    windSpeed.textContent = `Wind Speed: ${speed}kmph`
    

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    weatherdesc.classList.add("descDisplay");
    weatheremoji.classList.add("weatherEmoji");

    weatherinfo1.appendChild(weatheremoji);
    weatherinfo1.appendChild(cityDisplay);
    weatherinfo1.appendChild(tempDisplay);
    weatherinfo1.appendChild(humidityDisplay);    
    weatherinfo1.appendChild(weatherdesc);
   
    weatherinfo2.appendChild(feelsLike);
    weatherinfo2.appendChild(maxmin);
    weatherinfo2.appendChild(visibilityDisplay);
    weatherinfo2.appendChild(windSpeed);


}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId <300):
            return "⛈️";
        case (weatherId >= 300 && weatherId <400):
            return "🌧️";
        case (weatherId >= 500 && weatherId <600):
            return "🌧️";
        case (weatherId >= 600 && weatherId <700):
            return "❄️";
        case (weatherId >= 700 && weatherId <800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId <810):
            return "☁️";
        default:
            return "❓"

        

    }

}