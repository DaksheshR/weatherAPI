async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "API-KEY"; // 🔑 replace this with your API key

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  document.getElementById("loader").style.display = "block";
  document.getElementById("result").innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("loader").style.display = "none";

    if (data.cod === "404") {
      document.getElementById("result").innerHTML = "City not found";
      return;
    }

    const temp = data.main.temp;
    const weather = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("result").innerHTML = `
      <img src="${iconUrl}" />
      <p><b>${city}</b></p>
      <p>🌡️ Temp: ${temp} °C</p>
      <p>🌤️ Weather: ${weather}</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬️ Wind: ${wind} m/s</p>
    `;
  } catch (error) {
    document.getElementById("loader").style.display = "none";
    console.log(error);
  }
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});