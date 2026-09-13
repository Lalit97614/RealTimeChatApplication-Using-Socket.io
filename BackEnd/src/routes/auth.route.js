import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


//signup
router.post("/signup",signup)

//login
router.post("/login",login)

//logout
router.post("/logout",logout)

//update-profile
router.post("/update-profile",protectedRoute,updateProfile)


router.get("/checkout",protectedRoute,async(req,resp)=>{
   return resp.status(400).json(req.user)
})
export default router;