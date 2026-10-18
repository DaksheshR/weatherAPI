from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv
load_dotenv()                          # reads .env file
API_KEY = os.getenv("API_KEY")         # grabs your key

app = FastAPI()                        # creates the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],               # allows all origins (fine for dev)
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/weather")
async def get_weather(city: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()

    if data.get("cod") != 200:
        return {"error": "City not found"}

    return {
        "city": city,
        "temp": data["main"]["temp"],
        "weather": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "icon_url": f"https://openweathermap.org/img/wn/{data['weather'][0]['icon']}@2x.png",
    }
