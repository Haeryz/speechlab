import dotenv from 'dotenv';

// Load environment variables first, before other imports
dotenv.config({ path: '.env.local' });

import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/db';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Debug MongoDB connection settings
console.log('MongoDB Connection Info:');
console.log(`- URI defined: ${process.env.MONGOURI ? 'Yes' : 'No'}`);
console.log(`- DB Name: ${process.env.MONGODB_DB_NAME || 'SpeechlabDB'}`);

// Connect to database
connectToDatabase()
    .then(() => console.log('Database connected'))
    .catch(err => {
        console.error('Database connection error:', err);
        console.log('If using Cloudflare WARP, try disabling it or add your IP to MongoDB Atlas whitelist');
        console.log('Also check that your MONGOURI environment variable is correctly set in .env.local file');
    });

// Routes
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
