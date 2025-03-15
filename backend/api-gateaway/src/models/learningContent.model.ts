import { Schema, model } from "mongoose";

const userProgressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    progressPercentage: {
        type: Number,
        required: true,
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    }
});

const learningContentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    clonedVoiceId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'VoiceSample'
    },
    textScript: {
        type: String,
        required: true
    },
    dificulty: {
        type: String,
        required: true
    },
    userProgress: [userProgressSchema]
},{timestamps: true});
export default model('LearningContent', learningContentSchema);