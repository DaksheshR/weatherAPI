import os

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Load environment variables
load_dotenv()
API_KEY = os.getenv("API_KEY")

# Create FastAPI app
app = FastAPI()

# Allow frontend to communicate with backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    """Health check endpoint — Render pings this to verify the server is alive."""
    return {"status": "ok"}


@app.get("/weather")
async def get_weather(city: str):
    """Fetch weather data for a given city from OpenWeatherMap."""

    if not city.strip():
        return JSONResponse(
            status_code=400,
            content={"error": "City name cannot be empty"},
        )

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()

    if data.get("cod") != 200:
        return JSONResponse(
            status_code=404,
            content={"error": "City not found"},
        )

    return {
        "city": city,
        "temp": data["main"]["temp"],
        "weather": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "icon_url": f"https://openweathermap.org/img/wn/{data['weather'][0]['icon']}@2x.png",
    }
