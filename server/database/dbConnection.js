import mongoose from "mongoose";

let cachedConnection = null;
let cachedPromise = null;

const dbConnection = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables.");
    }

    if (cachedConnection) {
        return cachedConnection;
    }

    if (!cachedPromise) {
        cachedPromise = mongoose.connect(process.env.MONGO_URI.trim(), {
            dbName: "NEW_PORTFOLIO",
            serverSelectionTimeoutMS: 10000,
        });
    }

    cachedConnection = await cachedPromise;
    console.log("connected to database.");
    return cachedConnection;
};

export default dbConnection;
