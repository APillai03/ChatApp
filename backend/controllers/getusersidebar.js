import User from "../models/usermodel.js"

export const getusersidebar= async (req,res)=>
{
    try {
        const loggeduserid=req.body
        const allusers=await User.find().select("-password")
        res.status(200).json(allusers)
        
    } 
    catch (error)
    {
        console.log("Error in getdiebar controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
        
    }
}