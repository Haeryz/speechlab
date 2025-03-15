import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'learner'
    },
    subscriptionTier: {
        type: String,
        required: true,
        default: 'free'
    },
    lastlogin: {
        type: Date,
        default: Date.now
    },
    oauthProvider: {
        type: String,
        default: null
    },
    oauthId: {
        type: String,
        default: null
    },
}, {timestamps: true});

export default model('User', userSchema);