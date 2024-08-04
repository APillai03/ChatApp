import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import dotenv from "dotenv"
dotenv.config();



const protectedroutes = async (req, res, next) => {
   
    const authHeader = req.headers.authorization;
    console.log(process.env.JWT_SECRET)
    
if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - No Token Provided" });
}

const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
         // Set decoded token payload to request object if needed

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Unauthorized - Token Expired" });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export default protectedroutes;
