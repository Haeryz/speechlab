// backend/api-gateway/src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'] as string;
    if (!apiKey) return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findOne({ apikey: apiKey }); // Changed to match model field name
    if (!user) return res.status(401).json({ error: 'Invalid API key' });

    req.user = user;
    next();
};