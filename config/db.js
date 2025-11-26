import mongoose from 'mongoose';

/**
 * Connect to MongoDB using Mongoose
 */
export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        const dbName = process.env.MONGODB_DBNAME;

        const conn = await mongoose.connect(mongoURI, {
            dbName: dbName
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});