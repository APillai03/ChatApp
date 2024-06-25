import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const protectedroutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Token received: ", token);

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token: ", decoded);
        } catch (error) {
            console.error("JWT verification error: ", error.message);
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Corrected to match the property name in the decoded token
        if (!decoded || !decoded.userId) {
            console.error("Decoded token missing userId");
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        try {
            const user = await User.findById(decoded.userId).select("-password");
            console.log("User found: ", user);

            if (!user) {
                console.error("User not found for userId: ", decoded.userId);
                return res.status(404).json({ error: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Error fetching user from database: ", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    } catch (error) {
        console.error("Error in protectRoute middleware: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default protectedroutes;
