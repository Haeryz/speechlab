import { Schema, model } from "mongoose";

const voiceProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voiceId: {
        type: String,
        required: true          
    },
    sampleUrl: {
        type: String
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});
export default model('VoiceProfile', voiceProfileSchema);