// ✅ Change this to your Render URL after deploying backend
// Example: "https://your-app-name.onrender.com"
const API_URL = "https://weatherapi-backend-5s5s.onrender.com";

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    document.getElementById("result").innerHTML = "Please enter a city name";
    return;
  }

  const url = `${API_URL}/weather?city=${city}`;

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
      <img src="${data.icon_url}" alt="${data.weather}" />
      <p><b>${data.city}</b></p>
      <p>🌡️ Temp: ${data.temp} °C</p>
      <p>🌤️ Weather: ${data.weather}</p>
      <p>💧 Humidity: ${data.humidity}%</p>
      <p>🌬️ Wind: ${data.wind} m/s</p>
    `;
  } catch (error) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("result").innerHTML = "Unable to connect to server";
    console.error(error);
  }
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});