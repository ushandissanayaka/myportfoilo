import mongoose from "mongoose";

const dbConnection = ()=>{
    if (!process.env.MONGO_URI) {
        console.error("CRITICAL ERROR: MONGO_URI is not defined in environment variables!");
        return; // Prevents the fatal crash
    }
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "NEW_PORTFOLIO"
    }).then(()=>{
        console.log("connected to database.")
    }).catch((error)=>{
        console.log(`Some Error Occured While Connecting To Database:  ${error}`)
    })
};

export default dbConnection;