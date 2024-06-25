import express from "express"
import protectedroutes from "../Middlewares/protectedroutes.js";
import { getusersidebar } from "../controllers/getusersidebar.js";

const router =express.Router();

router.get("/",protectedroutes,getusersidebar)

export default router;