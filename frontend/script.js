async function getWeather() {
  const city = document.getElementById("city").value;
  
  const url = `http://localhost:8000/weather?city=${city}`;

  document.getElementById("loader").style.display = "block";
  document.getElementById("result").innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("loader").style.display = "none";

     if (data.error) {
      document.getElementById("result").innerHTML = data.error;
      return;
    }

    document.getElementById("result").innerHTML = `
      <img src="${data.icon_url}" />
      <p><b>${data.city}</b></p>
      <p>🌡️ Temp: ${data.temp} °C</p>
      <p>🌤️ Weather: ${data.weather}</p>
      <p>💧 Humidity: ${data.humidity}%</p>
      <p>🌬️ Wind: ${data.wind} m/s</p>
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