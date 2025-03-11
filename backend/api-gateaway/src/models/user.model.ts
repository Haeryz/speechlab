import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    apikey: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        default: 0
    },
    voiceProfile: [{
        type: Schema.Types.ObjectId,
        ref: 'VoiceProfile'
    }]
});

export default model('User', userSchema);