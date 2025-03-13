import mongoose from "mongoose";
import { Request, Response } from "express";
import VoiceProfile from "../models/voiceProfile.model";

const getVoiceProfile = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ success: false, message: "Invalid voice profile id" });
            }
            const voiceProfile = await VoiceProfile.findOne({ _id: {$eq: req.params.id} });
            if (!voiceProfile){
                return res.status(404).json({ success: false, message: "Voice profile not found" });
            }
            return res.status(200).json({ success: true, voiceProfile });
        }
        const voiceProfiles = await VoiceProfile.find().limit(200);
        return res.status(200).json({ success: true, voiceProfiles });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};