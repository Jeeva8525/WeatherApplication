city = document.getElementById("city")
api_weather = "72cd256738253a0dc659d5f79cde58ad"

temperature = document.getElementById("temperature")
city_name = document.getElementById("city-name")
humidity_percent = document.getElementById("humidity-percent")
wind_Speed = document.getElementById("windSpeed-percent")
dpImage = document.querySelector(".main_info img")

errorThrower=document.getElementById("errorThrower")
function finder() {
    if (!city.value.trim()) {
        alert("Please enter a city")
        console.log("Please enter a city")
        return
    }
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&APPID=" + api_weather + "&units=metric"

    fetch(apiUrl)
        .then(response => response.json() /* {
            if (!response.ok) {
                throw new Error("You have entered incorrect city name , Recheck it")
            }
            else {
                return response.json()
            }
        } */)
        .then(data => {
            if (String(data.cod) === "404") {
                errorThrower.style.visibility="visible"
                errorThrower.style.transform="translateY(50px)"
                errorThrower.style.transition="1s"
                console.log("Please enter the correct city name")
                return 0
            } 
            else { 
                errorThrower.style.visibility="hidden"
                errorThrower.style.transform="translateY(-70px)"
                errorThrower.style.transition="2s"
                console.log(data)
                temperature.textContent = Math.round(data.main.temp) + "°c"
                city_name.textContent = data.name
                humidity_percent.textContent = data.main.humidity + "%"
                wind_Speed.textContent = data.wind.speed + " km/h"

                icon_code = data.weather[0].icon
                imageUrl = "https://openweathermap.org/img/wn/" + icon_code + "@2x.png"
                dpImage.src = imageUrl
             } 
        })
        .catch(error => {
            console.log(error.message)
        })
}