import os
from fastapi import FastAPI, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from elevenlabs import clone, set_api_key
from dotenv import load_dotenv
from utils.audio_utils import save_uploaded_file, cleanup_temp_files
from utils.exceptions import VoiceCloneException

# Load environment variables
load_dotenv()

app = FastAPI(title="Voice Cloning Service", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten this in production!
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Initialize ElevenLabs
set_api_key(os.getenv("ELEVENLABS_API_KEY"))

@app.post("/clone-voice", summary="Clone voice from audio sample")
async def clone_voice(file: UploadFile):
    try:
        # Validate file type
        if not file.filename.endswith((".wav", ".mp3")):
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail="Only WAV/MP3 files allowed"
            )

        # Save to temporary storage
        temp_path = await save_uploaded_file(file)
        
        # Clone voice using ElevenLabs API
        voice = clone(
            file_path=temp_path,
            voice_name=f"clone_{file.filename.split('.')[0]}"
        )
        
        # Cleanup temp files
        await cleanup_temp_files(temp_path)
        
        return {
            "voice_id": voice.voice_id,
            "message": "Voice cloned successfully"
        }
        
    except VoiceCloneException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        await cleanup_temp_files(temp_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))