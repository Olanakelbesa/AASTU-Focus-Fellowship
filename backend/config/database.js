import mongoose from "mongoose"
import config from "./environment.js"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGODB_URI);

        console.log('MongoDB connected');

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        })

        return conn;

    } catch (error) {
        console.log('Error connecting MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;