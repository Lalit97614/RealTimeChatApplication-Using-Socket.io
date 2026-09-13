import jwt from'jsonwebtoken'
import { ENV } from './env.js';
export const  generateToken =(userId,resp)=>{
    const token= jwt.sign(
        { userId },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
    )
    
    resp.cookie("jwt", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return token ;
}