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