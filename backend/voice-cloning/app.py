# backend/voice-cloning/app.py
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from elevenlabs import clone, generate, set_api_key
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

app = FastAPI()

# CORS setup (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten this in production!
    allow_methods=["*"],
    allow_headers=["*"],
)

set_api_key(os.getenv("ELEVENLABS_API_KEY"))

@app.post("/clone-voice")
async def clone_voice(file: UploadFile):
    try:
        # Save uploaded file temporarily
        file_path = f"tmp/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # Clone voice using ElevenLabs API
        voice = clone(file_path)
        return {"voice_id": voice.voice_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))