import express from "express";


const router = express.Router();



router.get("/signup",(req,resp)=>{
  resp.send("register auth");
})
router.get("/login",(req,resp)=>{
    resp.send("login ");
})
router.get("/logout",(req,resp)=>{
    resp.send("logout")
})


export default router;