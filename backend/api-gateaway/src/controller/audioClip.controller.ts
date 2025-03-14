import mongoose from "mongoose";
import { Request, Response } from "express";
import AudioClip from "../models/audioClip.model";

export const getAudioClip = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ success: false, message: "Invalid audio clip id" });
            }
            const audioClip = await AudioClip.findOne({ _id: {$eq: req.params.id} });
            if (!audioClip){
                return res.status(404).json({ success: false, message: "Audio clip not found" });
            }
            return res.status(200).json({ success: true, audioClip });
        }
        const audioClips = await AudioClip.find().limit(200);
        return res.status(200).json({ success: true, audioClips });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createAudioClip = async (req: Request, res: Response) => {
    try {
        const { title, description, audioUrl, duration, userId } = req.body;
        if (!title || !description || !audioUrl || !duration || !userId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }
        const newAudioClip = new AudioClip({
            title,
            description,
            audioUrl,
            duration,
            userId
        });
        await newAudioClip.save();
        return res.status(201).json({ success: true, message: "Audio clip created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};