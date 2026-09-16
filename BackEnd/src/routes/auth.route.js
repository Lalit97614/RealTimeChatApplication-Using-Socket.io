import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { arecjetProtection } from "../middleware/arcjet.middleware.js";



const router = express.Router();



//testing only 
// router.get("/test", arecjetProtection, async (req, resp) => {
//    resp.status(200).json({
//       message: "arcjet working properly"
//    })
// })

router.use(arecjetProtection)


//signup
router.post("/signup", signup)

//login
router.post("/login",login)

//logout
router.post("/logout", logout)

//update-profile
router.post("/update-profile", protectedRoute, updateProfile)


router.get("/checkout", protectedRoute, async (req, resp) => {
   return resp.status(400).json(req.user)
})
export default router;