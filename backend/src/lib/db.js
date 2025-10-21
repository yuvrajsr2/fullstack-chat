import mongoose from 'mongoose';

// Function to connect to mongodb database and show on console if we are connected or not
export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        
    }
};
