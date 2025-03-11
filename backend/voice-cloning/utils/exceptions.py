class VoiceCloneException(Exception):
    """Base exception for voice cloning errors"""
    pass

class AudioProcessingException(VoiceCloneException):
    """Raised when audio processing fails"""
    pass