import express from "express"
import { sendmessage } from "../db/sendmessage.js"
import protectedRoutes from "../Middlewares/protectedroutes.js"
import { getmessage } from "../db/sendmessage.js"
const router=express.Router()

router.get("/get/:id",protectedRoutes,getmessage)
router.post("/send/:id",protectedRoutes,sendmessage)

export default router 