import express from "express"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { fileURLToPath } from "url";
import path from "path"
import {connectDB} from "./lib/db.js"

import cookieParser from "cookie-parser"

import { ENV } from "./lib/env.js";
const app=express();
app.use(express.json())
app.use(cookieParser())



const PORT = ENV.PORT||5000;
const __filename=fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
console.log(__dirname)
console.log(__filename)



app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

//Ready to Production ....
if(ENV.NODE_ENV==="production"){
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