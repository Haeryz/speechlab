import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './config/db';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectToDatabase()
    .then(() => console.log('Database connected'))
    .catch(err => {
        console.error('Database connection error:', err);
        console.log('If using Cloudflare WARP, try disabling it or add your IP to MongoDB Atlas whitelist');
    });

// Routes
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
