import jwt from "jsonwebtoken"
import { ENV } from "../lib/env.js"
import User from "../models/User.js"

export const protectedRoute =async(req,resp,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return resp.status(401).json({
                success:false ,
                message:"Unauthorized - No token provided"
            })
        }
        const decodedToken =  jwt.verify(token,ENV.JWT_SECRET);
        if(!decodedToken){
           return resp.status(401).json({
                success:false ,
                message:"Unauthorized - Invalid token"
            }) 
        }

        const user = await User.findById(decodedToken.userId).select("-password")
        if(!user){
            return resp.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        req.user=user
        next();
    } catch (error) {
      console.error("Error in protectedRoute middleware",error)  
      return resp.status(500).json({
        success:false,
        message:"Internal server error"

      }) 
    }
}