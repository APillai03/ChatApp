import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generatewebtoken from "../utils/generatejwttoken.js";
export const login =async (req, res) => {

    try {
    const {username,password}=req.body;
    const user= await User.findOne({username})
    const ispasswordcorrect= await bcrypt.compare(password,user?.password)
    if(!user || !ispasswordcorrect)
    {
        res.status(400).json({error:"password or username incorrect"})
    }
    res.status(200).json({message:"login successfully"})
        
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
        
    }
};

export const signup = async (req, res) => {
    try {
        console.log("Received signup request");
        
        const { fullname, username, password, confirmpassword, gender } = req.body;
        console.log("Request body:", { fullname, username, password, confirmpassword, gender });

        if (!fullname || !username || !password || !confirmpassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        console.log("Checking if user already exists");
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }



        const salt = await bcrypt.genSalt(10)
        const hashpassword=await bcrypt.hash(password,salt)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        console.log("Profile pic URLs:", { boyProfilePic, girlProfilePic });

        const newUser = new User({
            fullname,
            username,
            password:hashpassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

      if(newUser)
        {
         generatewebtoken(newUser._id,res)
        await newUser.save();
        
        res.status(200).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic,
        });
    }



    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async(req, res) => {
    try {
        res.cookie('jwt','',{maxage:0})
        res.status(200).json({ message: "Logout successfully" });
        
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }


};
