import { Schema, model } from 'mongoose';

const voiceSampleSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    audioFile: {
        type: String,
        required: true
    },
    accent: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
}, {timestamps: true});

export default model('VoiceSample', voiceSampleSchema);