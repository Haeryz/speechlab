import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ success: false, message: "Invalid user id" });
            }
            const user = await User.findOne({ _id: { $eq: req.params.id } });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            return res.status(200).json({ success: true, user });
        }
        const users = await User.find().limit(200);
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, password, apikey, credits, voiceProfile } = req.body;
        if (!name || !password || !apikey || !credits || !voiceProfile) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        if (!mongoose.Types.ObjectId.isValid(voiceProfile)) {
            return res.status(400).json({ success: false, message: "Invalid voice profile id" });
        }
        const newUser = new User({
            name,
            password,
            apikey,
            credits,
            voiceProfile
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};