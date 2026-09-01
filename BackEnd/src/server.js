import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { fileURLToPath } from "url";
import path from "path"
import {connectDB} from "./lib/db.js"

const app=express();
app.use(express.json())
dotenv.config();



const PORT = process.env.PORT||5000;
const __filename=fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
console.log(__dirname)
console.log(__filename)



app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

//Ready to Production ....
if(process.env.NODE_ENV==="production"){
     const frontendPath = path.join(
        __dirname,
        "../../FrontEnd/dist"
    );
    console.log("FrontEndPath--->" ,frontendPath)

    app.use(express.static(frontendPath))

    app.use("*",(req,resp)=>{
      resp.sendFile(path.join(frontendPath,"index.html"))
    })
}



app.listen(PORT,()=>{

    console.log(`Server is running on port ${PORT}`)
    connectDB();
})