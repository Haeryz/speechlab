import { Schema, model } from "mongoose";

const billingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stripePaymentIntentId: {
        type: String
    },
    amount: {
        type: Number
    },
    creditPurchased: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'succeeded', 'failed'],
    }
}, { timestamps: true });
export default model('Billing', billingSchema);