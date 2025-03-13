import mongoose from "mongoose";
import { Request, Response } from "express";
import Billing from "../models/bililng.model";

const getBilling = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ success: false, message: "Invalid billing id" });
            }
            const billing = await Billing.findOne({ _id: {$eq: req.params.id} });
            if (!billing){
                return res.status(404).json({ success: false, message: "Billing not found" });
            }
            return res.status(200).json({ success: true, billing });
        }
        const billings = await Billing.find().limit(200);
        return res.status(200).json({ success: true, billings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};