const apiKey = "411c234a8293bbe7e886cee90e987b55";

function selectCity() {
  let city = document.getElementById("pakCities").value.trim();
  if (city) {
    document.getElementById("cityInput").value = city;

    getWeather(true);
  }
}

function getWeather(skipEmptyAlert = false) {
  let cityInput = document.getElementById("cityInput");
  let city = cityInput.value.trim();

  if (city === "") {
    if (!skipEmptyAlert) {
      Swal.fire({
        icon: "error",
        title: "Empty Field",
        text: "Please enter a city name",
        confirmButtonColor: "#ff9800"
      });
    }
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},PK&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      document.getElementById("weatherInfo").style.display = "block";
      document.getElementById("city").innerText = `${data.name}, Pakistan`;
      document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
      document.getElementById("description").innerText = data.weather[0].description;
      document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").innerText = `💨 Wind: ${data.wind.speed} km/h`;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      let isNight = data.weather[0].icon.includes("n");
      document.body.className = isNight ? "night" : "day";

      cityInput.value = "";
    })
    .catch(() => {
      Swal.fire({
        icon: "warning",
        title: "City Not Found",
        text: "Please enter a valid Pakistan city 🇵🇰",
        confirmButtonColor: "#ff9800"
      });
    });
}
