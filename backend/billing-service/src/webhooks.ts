import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Note: Make sure to use express.raw middleware for the webhook route:
// app.use('/webhook', express.raw({ type: 'application/json' }));

export const handleWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature']!;
    const event = stripe.webhooks.constructEvent(
        req.body as Buffer,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle event (e.g., update user credits)
};