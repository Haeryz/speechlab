import { MongoClient, Db } from 'mongodb';

// Connection URI
const uri = process.env.MONGOURI || 'mongodb://localhost:27017';
// Database Name
const dbName = process.env.MONGODB_DB_NAME || 'SpeechlabDB';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connection variable
let db: Db | null = null;

/**
 * Connects to MongoDB
 * @returns Promise<Db> - MongoDB database instance
 */
export async function connectToDatabase(): Promise<Db> {
    try {
        // Connect the client to the server if not already connected
        if (!db) {
            await client.connect();
            console.log('Connected successfully to MongoDB server');
            db = client.db(dbName);
        }
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

/**
 * Closes the MongoDB connection
 */
export async function closeDatabaseConnection(): Promise<void> {
    try {
        if (client) {
            await client.close();
            console.log('MongoDB connection closed');
            db = null;
        }
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
    }
}