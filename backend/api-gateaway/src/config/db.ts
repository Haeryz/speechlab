import { MongoClient, Db, ServerApiVersion } from 'mongodb';

// Connection URI - Check if we have a MongoDB Atlas URI
const uri = process.env.MONGOURI || 'mongodb://localhost:27017';
// Database Name
const dbName = process.env.MONGODB_DB_NAME || 'SpeechlabDB';

// Create a new MongoClient with improved options for Atlas
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    connectTimeoutMS: 10000, // 10 seconds timeout
    // Retry mechanism for transient errors
    retryWrites: true,
    retryReads: true,
});

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
            // Log the connection attempt
            console.log(`Attempting to connect to MongoDB at: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
            
            await client.connect();
            console.log('Connected successfully to MongoDB server');
            
            // Ping to confirm connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. Connection confirmed!");
            
            db = client.db(dbName);
            console.log('Connected successfully to MongoDB database:', dbName);
        }
        return db;
    } catch (error) {
        console.error('MongoDB connection error details:', error);
        
        // Provide more helpful error messages based on error type
        if (uri === 'mongodb://localhost:27017') {
            console.error('Error: Using default local MongoDB connection. Please set the MONGOURI environment variable.');
            console.error('Create or update your .env.local file with: MONGOURI=your_mongodb_atlas_connection_string');
        }
        
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