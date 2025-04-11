const inputValue = document.querySelector(".input-location");

// Add loading class to body
document.body.classList.add("loading");

function updateWeatherDisplay(weatherData) {
  const currentLocation = document.querySelector(".location");
  currentLocation.textContent = weatherData.resolvedAddress;

  inputValue.value = weatherData.resolvedAddress;

  const currentConditions = document.querySelector(".current-conditions");
  currentConditions.innerHTML = ""; // Clear existing content

  const emojiSpan = document.createElement("span");
  emojiSpan.className = "weather-emoji";

  if (weatherData.currentConditions.conditions === "Clear") {
    emojiSpan.textContent = "☀️";
  } else if (weatherData.currentConditions.conditions === "Rain") {
    emojiSpan.textContent = "🌧️";
  } else if (weatherData.currentConditions.conditions === "Overcast") {
    emojiSpan.textContent = "☁️";
  } else if (weatherData.currentConditions.conditions === "Snow") {
    emojiSpan.textContent = "❄️";
  } else if (weatherData.currentConditions.conditions === "Partially cloudy") {
    emojiSpan.textContent = "⛅";
  } else if (weatherData.currentConditions.conditions === "Thunderstorm") {
    emojiSpan.textContent = "⚡";
  } else if (weatherData.currentConditions.conditions === "Fog") {
    emojiSpan.textContent = "🌫️";
  }

  currentConditions.appendChild(emojiSpan);
  currentConditions.appendChild(
    document.createTextNode(" " + weatherData.currentConditions.conditions)
  );

  const currentTemperature = document.querySelector(".temperature");
  currentTemperature.textContent = weatherData.currentConditions.temp + "°";

  const currentFeelsLike = document.querySelector(".feels-like");
  currentFeelsLike.textContent = weatherData.currentConditions.feelslike + "°";

  const currentWind = document.querySelector(".wind");
  emojiSpan.textContent = "💨";
  currentWind.innerHTML = "";
  currentWind.appendChild(emojiSpan);
  currentWind.appendChild(
    document.createTextNode(weatherData.currentConditions.windspeed + "km/h")
  );

  const currentHumidity = document.querySelector(".humidity");
  emojiSpan.textContent = "💧";
  currentHumidity.innerHTML = "";
  currentHumidity.appendChild(emojiSpan.cloneNode(true));
  currentHumidity.appendChild(
    document.createTextNode(weatherData.currentConditions.humidity + "%")
  );

  const currentRain = document.querySelector(".rain");
  emojiSpan.textContent = "🌧️";
  currentRain.innerHTML = "";
  currentRain.appendChild(emojiSpan.cloneNode(true));
  currentRain.appendChild(
    document.createTextNode(weatherData.currentConditions.precip + "mm")
  );

  const currentUV = document.querySelector(".uv-index");
  emojiSpan.textContent = "☀️";
  currentUV.innerHTML = "";
  currentUV.appendChild(emojiSpan.cloneNode(true));
  currentUV.appendChild(
    document.createTextNode(weatherData.currentConditions.uvindex)
  );

  const currentSunrise = document.querySelector(".sunrise");
  emojiSpan.textContent = "🌅";
  currentSunrise.innerHTML = "";
  currentSunrise.appendChild(emojiSpan.cloneNode(true));
  currentSunrise.appendChild(
    document.createTextNode(
      weatherData.currentConditions.sunrise.split(":")[0] +
        ":" +
        weatherData.currentConditions.sunrise.split(":")[1]
    )
  );

  const currentSunset = document.querySelector(".sunset");
  emojiSpan.textContent = "🌇";
  currentSunset.innerHTML = "";
  currentSunset.appendChild(emojiSpan.cloneNode(true));
  currentSunset.appendChild(
    document.createTextNode(
      weatherData.currentConditions.sunset.split(":")[0] +
        ":" +
        weatherData.currentConditions.sunset.split(":")[1]
    )
  );
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
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  getWeather();
});
