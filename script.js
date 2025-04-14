const inputValue = document.querySelector(".input-location");

// Add loading class to body
document.body.classList.add("loading");

function updateWeatherDisplay(weatherData) {
  const currentLocation = document.querySelector(".location");
  currentLocation.textContent = weatherData.resolvedAddress;

  inputValue.value = weatherData.resolvedAddress;

  const currentConditions = document.querySelector(".weather-card");
  const weatherIcon = currentConditions.querySelector(".weather-icon-left-big");
  weatherIcon.innerHTML = "";
  const conditionsData = currentConditions.querySelector(".conditions-data");

  const weatherImg = document.createElement("img");
  weatherImg.className = "weather-info-icon-big";

  if (weatherData.currentConditions.conditions === "Clear") {
    weatherImg.src = "./weather-icons-master/production/fill/all/clear-day.svg";
  } else if (weatherData.currentConditions.conditions === "Partially cloudy") {
    weatherImg.src =
      "./weather-icons-master/production/fill/all/partly-cloudy-day.svg";
  } else if (weatherData.currentConditions.conditions === "Cloudy") {
    weatherImg.src = "./weather-icons-master/production/fill/all/cloudy.svg";
  } else if (weatherData.currentConditions.conditions === "Overcast") {
    weatherImg.src =
      "./weather-icons-master/production/fill/all/overcast-day.svg";
  } else if (weatherData.currentConditions.conditions === "Rain") {
    weatherImg.src = "./weather-icons-master/production/fill/all/rain.svg";
  } else if (weatherData.currentConditions.conditions === "Snow") {
    weatherImg.src = "./weather-icons-master/production/fill/all/snow.svg";
  } else if (weatherData.currentConditions.conditions === "Thunderstorm") {
    weatherImg.src =
      "./weather-icons-master/production/fill/all/thunderstorms.svg";
  } else if (weatherData.currentConditions.conditions === "Fog") {
    weatherImg.src = "./weather-icons-master/production/fill/all/fog.svg";
  }

  weatherIcon.appendChild(weatherImg);
  conditionsData.textContent = weatherData.currentConditions.conditions;

  const currentTemperature = document.querySelector(".temperature");
  const tempNumber = document.querySelector(".temp-number");
  tempNumber.textContent = weatherData.currentConditions.temp + "°";

  const currentFeelsLike = document.querySelector(".feels-like");
  currentFeelsLike.textContent =
    "Feels like:" + " " + weatherData.currentConditions.feelslike + "°";

  const minTemperatur = document.querySelector(".min");
  const minTemperaturIcon = document.createElement("img");
  minTemperaturIcon.className = "min-temp-icon";
  minTemperaturIcon.src =
    "./weather-icons-master/production/fill/all/pressure-low.svg";
  minTemperatur.innerHTML = "";
  minTemperatur.appendChild(minTemperaturIcon);
  minTemperatur.appendChild(
    document.createTextNode("Min: " + weatherData.days[0].tempmin + "°")
  );

  const maxTemperatur = document.querySelector(".max");
  const maxTemperaturIcon = document.createElement("img");
  maxTemperaturIcon.className = "max-temp-icon";
  maxTemperaturIcon.src =
    "./weather-icons-master/production/fill/all/pressure-high.svg";
  maxTemperatur.innerHTML = "";
  maxTemperatur.appendChild(maxTemperaturIcon);
  maxTemperatur.appendChild(
    document.createTextNode("Max: " + weatherData.days[0].tempmax + "°")
  );

  const currentWind = document.querySelector(".wind");
  const windIcon = currentWind.querySelector(".weather-icon-left");
  windIcon.innerHTML = "";
  const windData = currentWind.querySelector(".wind-data");

  const icon = document.createElement("img");
  icon.className = "weather-info-icon";
  icon.src = "./weather-icons-master/production/fill/all/wind.svg";
  windIcon.appendChild(icon);

  windData.textContent = weatherData.currentConditions.windspeed + "km/h";

  // Humidity
  const currentHumidity = document.querySelector(".humidity");
  const humidityIcon = currentHumidity.querySelector(".weather-icon-left");
  humidityIcon.innerHTML = "";
  const humidityData = currentHumidity.querySelector(".humidity-data");

  const humidityImg = document.createElement("img");
  humidityImg.className = "weather-info-icon";
  humidityImg.src = "./weather-icons-master/production/fill/all/raindrop.svg";
  humidityIcon.appendChild(humidityImg);

  humidityData.textContent = weatherData.currentConditions.humidity + "%";

  // Rain
  const currentRain = document.querySelector(".rain");
  const rainIcon = currentRain.querySelector(".weather-icon-left");
  rainIcon.innerHTML = "";
  const rainData = currentRain.querySelector(".rain-data");

  const rainImg = document.createElement("img");
  rainImg.className = "weather-info-icon";
  rainImg.src = "./weather-icons-master/production/fill/all/rain.svg";
  rainIcon.appendChild(rainImg);

  rainData.textContent = weatherData.currentConditions.precip + "mm";

  // UV Index
  const currentUV = document.querySelector(".uv-index");
  const uvIcon = currentUV.querySelector(".weather-icon-left");
  uvIcon.innerHTML = "";
  const uvData = currentUV.querySelector(".uv-data");

  const uvImg = document.createElement("img");
  uvImg.className = "weather-info-icon";
  uvImg.src = "./weather-icons-master/production/fill/all/uv-index-4.svg";
  uvIcon.appendChild(uvImg);

  uvData.textContent = weatherData.currentConditions.uvindex;

  // Sunrise
  const currentSunrise = document.querySelector(".sunrise");
  const sunriseIcon = currentSunrise.querySelector(".weather-icon-left");
  sunriseIcon.innerHTML = "";
  const sunriseData = currentSunrise.querySelector(".sunrise-data");

  const sunriseImg = document.createElement("img");
  sunriseImg.className = "weather-info-icon";
  sunriseImg.src = "./weather-icons-master/production/fill/all/sunrise.svg";
  sunriseIcon.appendChild(sunriseImg);

  sunriseData.textContent =
    weatherData.currentConditions.sunrise.split(":")[0] +
    ":" +
    weatherData.currentConditions.sunrise.split(":")[1];

  // Sunset
  const currentSunset = document.querySelector(".sunset");
  const sunsetIcon = currentSunset.querySelector(".weather-icon-left");
  sunsetIcon.innerHTML = "";
  const sunsetData = currentSunset.querySelector(".sunset-data");

  const sunsetImg = document.createElement("img");
  sunsetImg.className = "weather-info-icon";
  sunsetImg.src = "./weather-icons-master/production/fill/all/sunset.svg";
  sunsetIcon.appendChild(sunsetImg);

  sunsetData.textContent =
    weatherData.currentConditions.sunset.split(":")[0] +
    ":" +
    weatherData.currentConditions.sunset.split(":")[1];
}

/// HOURLY

function hourlyWeatherDisplay(weatherData) {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();

  for (let i = 0; i < weatherData.days[0].hours.length; i++) {
    if (Number(weatherData.days[0].hours[i].datetime.split(":")[0]) === hour) {
      const hourArraySliced = weatherData.days[0].hours.slice(i, i + 8);

      for (let j = 0; j < hourArraySliced.length; j++) {
        const hourlyTime = document.querySelector(
          `.hourly-item-${j} .hourly-time`
        );
        const hourlyTemp = document.querySelector(
          `.hourly-item-${j} .hourly-temp`
        );

        const timeParts = hourArraySliced[j].datetime.split(":");
        const formattedTime = timeParts[0] + ":" + timeParts[1];

        hourlyTime.textContent = formattedTime;
        hourlyTemp.textContent = hourArraySliced[j].temp + "°";

        const hourlyItem = document.querySelector(`.hourly-item-${j}`);
        const hourlyWeatherIcon = hourlyItem.querySelector(".hourly-icon");
        hourlyWeatherIcon.innerHTML = "";

        const hourlyWeatherImg = document.createElement("img");
        hourlyWeatherImg.className = "hourly-img";

        if (hourArraySliced[j].conditions === "Clear") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/clear-day.svg";
        } else if (hourArraySliced[j].conditions === "Partially cloudy") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/partly-cloudy-day.svg";
        } else if (hourArraySliced[j].conditions === "Cloudy") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/cloudy.svg";
        } else if (hourArraySliced[j].conditions === "Overcast") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/overcast-day.svg";
        } else if (hourArraySliced[j].conditions === "Rain") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/rain.svg";
        } else if (hourArraySliced[j].conditions === "Snow") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/snow.svg";
        } else if (hourArraySliced[j].conditions === "Thunderstorm") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/thunderstorms.svg";
        } else if (hourArraySliced[j].conditions === "Fog") {
          hourlyWeatherImg.src =
            "./weather-icons-master/production/fill/all/fog.svg";
        }

        hourlyWeatherIcon.appendChild(hourlyWeatherImg);
      }
    }
  }
}

// Define the default function
async function loadDefaultWeather() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Stockholm?unitGroup=metric&key=TJHLNNLGHK8YHUMPX353CSEAT`,
      { mode: "cors" }
    );
    const data = await response.json();
    weatherData = data;
    console.log(
      "Current conditions:",
      weatherData.currentConditions.conditions
    );
    updateWeatherDisplay(weatherData);
    hourlyWeatherDisplay(weatherData);
    document.body.classList.remove("loading");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.body.classList.remove("loading");
  }
}

// Set up event listener
document.addEventListener("DOMContentLoaded", function () {
  loadDefaultWeather();
});

const formSubmitted = document.querySelector("form");

formSubmitted.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!inputValue.value) return console.log("Location is empty");

  async function getWeather() {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue.value}?unitGroup=metric&key=TJHLNNLGHK8YHUMPX353CSEAT`,
        { mode: "cors" }
      );
      const data = await response.json();
      weatherData = data;
      updateWeatherDisplay(weatherData);
      hourlyWeatherDisplay(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  getWeather();
});
