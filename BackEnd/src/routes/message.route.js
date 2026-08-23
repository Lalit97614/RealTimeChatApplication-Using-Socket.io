import express from "express"

const router = express.Router();

router.get("/send",(req,resp)=>{
     resp.send("This is message EndPiont")
})
export default router;