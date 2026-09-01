import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { generateToken } from "../lib/util.js";

export const signup = async (req, resp) => {
    const { fullname, email, password } = req.body;


    try {
        if (!fullname || !email || !password) {
            return resp.status(400).json({
                success: false,
                message: "All feilds are required"

            })
        }

        if (password.length < 6) {
            return resp.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        //check email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return resp.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        //user already exist
        const existUser = await User.findOne({ email })
        if (existUser) {
            return resp.status(409).json({
                success: false,
                message: "Email is already registered"
            })
        }



        const hashPassword=await bcrypt.hash(password,10);

        const user = await User.create({fullname,email,password:hashPassword});

        const token = generateToken(user._id,resp);

        return resp.status(201).json({
            success:true,
            message:"User is successfully registered",
            user:{
                id:user._id,
               email:user.email,
               fullname :user.fullname
            }
        })

    } catch (error) {   
    console.log(error);
    resp.status(500).json({
        success:false ,
        message:"Internal Server Error"
    })
    }
}