import mongooes from "mongoose";
import { ENV } from "./env.js";

export const connectDB=async()=>{
    try {
        const conn=await mongooes.connect(ENV.MONGO_URI);
        console.log("MONGO CONNECTED:-",conn.connection.host);
    } catch (error) {
       console.error("Error connection to MongoDB", error) 
       process.exit(0);
    }
} 