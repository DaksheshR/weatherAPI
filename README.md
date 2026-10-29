# 🌤️ Weather App

A fullstack weather application that fetches real-time weather data for any city using the [OpenWeatherMap API](https://openweathermap.org/api).

**Frontend** — HTML, CSS, JavaScript  
**Backend** — Python, FastAPI

## Project Structure

```
weatherAPI/
├── backend/
│   ├── main.py             # FastAPI server with /weather endpoint
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # API key (not committed)
│   └── .env.example        # Template for required env vars
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js           # Calls backend API
└── README.md
```

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/weatherAPI.git
cd weatherAPI
```

### 2. Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate        # Windows
# source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Create a `.env` file (use `.env.example` as reference):

```
API_KEY=your_openweathermap_api_key_here
```

Start the server:

```bash
uvicorn main:app --reload
```

API will be running at `http://localhost:8000`

### 3. Frontend

Open `frontend/index.html` in your browser.

## Deployment

- **Backend** → [Render](https://render.com) (Web Service)
  - Root Directory: `backend`
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
  - Add `API_KEY` in Render's Environment Variables settings

- **Frontend** → [Vercel](https://vercel.com) (Static Site)
  - Root Directory: `frontend`
  - Update `API_URL` in `script.js` to your Render backend URL

## API Endpoints

| Method | Endpoint | Description |
| :----- | :------- | :---------- |
| GET | `/` | Health check |
| GET | `/weather?city={city}` | Get weather data for a city |

https://weatherapi-frontend.vercel.app/