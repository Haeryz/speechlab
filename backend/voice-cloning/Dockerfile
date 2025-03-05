# backend/voice-cloning/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (if needed)
RUN apt-get update && apt-get install -y ffmpeg

# Copy only requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest
COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]