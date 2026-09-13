import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { generateToken } from "../lib/util.js";
import { ENV } from "../lib/env.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";


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



        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ fullname, email, password: hashPassword });

        const token = generateToken(user._id, resp);


        // Send welcome email
        try {
            await sendWelcomeEmail(
                user.email,
                user.fullname,
                ENV.CLIENT_URL
            );
        } catch (error) {
            console.log("Welcome email error:", error);
        }

        return resp.status(201).json({
            success: true,
            message: "User is successfully registered",
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname
            }
        })



    } catch (error) {
        console.log(error);
        resp.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export const login = async (req, resp) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return resp.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return resp.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return resp.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = generateToken(user._id, resp);
        return resp.status(200).json({
            success: true,
            message: "User is successfully LogedIn",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePic: user.profilePic
            }
        })


    } catch (error) {
        console.error("Error in Login Controller", error);
        resp.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const logout = async (_, resp) => {
    resp.cookie("jwt", "", { maxAge: 0 });
    return resp.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}