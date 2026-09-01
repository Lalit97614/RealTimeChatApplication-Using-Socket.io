import mongooes from "mongoose";


export const connectDB=async()=>{
    try {
        const conn=await mongooes.connect(process.env.MONGO_URL);
        console.log("MONGO CONNECTED:-",conn.connection.host);
    } catch (error) {
       console.error("Error connection to MongoDB", error) 
       process.exit(0);
    }
} 