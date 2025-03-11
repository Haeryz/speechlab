import os
import aiofiles
from pathlib import Path
from fastapi import UploadFile

async def save_uploaded_file(file: UploadFile) -> str:
    """Save uploaded file to temporary storage"""
    temp_dir = Path("tmp")
    temp_dir.mkdir(exist_ok=True)
    
    file_path = temp_dir / file.filename
    
    async with aiofiles.open(file_path, 'wb') as f:
        while chunk := await file.read(1024):
            await f.write(chunk)
    
    return str(file_path)

async def cleanup_temp_files(path: str):
    """Cleanup temporary files"""
    try:
        os.remove(path)
    except Exception as e:
        print(f"Error cleaning up file {path}: {str(e)}")