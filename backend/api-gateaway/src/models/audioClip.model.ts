import { Schema, model } from "mongoose";

const audioClipSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voiceProfileId: {
        type: Schema.Types.ObjectId,
        ref: 'VoiceProfile',
    },
    text: {
        type: String,
    },
    audioUrl: {
        type: String,
        required: true
    },
    costinCredits: {
        type: Number,
        default: 1
    }
}, { timestamps: true });
export default model('AudioClip', audioClipSchema);