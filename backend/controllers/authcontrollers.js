import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Username not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    

   

    res.status(200).send({
      success: true,
      message: 'Login successfully',
      user: {
        username: user.username,
        _id: user._id, 
        password:user.password
      
        
  
      },
      token
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const signup = async (req, res) => {
  try {
   
    console.log(JWT_SECRET)

    const { fullname, username, password, confirmpassword, gender } = req.body;
    console.log("Request body:", { fullname, username, password, confirmpassword, gender });

    if (!fullname || !username || !password || !confirmpassword || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ success: false, message: "Passwords don't match" });
    }

    console.log("Checking if user already exists");
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const profilePicUrl = gender === "male"
      ? `https://avatar.iran.liara.run/public/boy?username=${username}`
      : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    console.log("Profile pic URLs:", profilePicUrl);

    const newUser = new User({
      fullname,
      username,
      password: hashPassword,
      gender,
      profilepic: profilePicUrl,
    });

    if (newUser) {
			// Generate JWT token here
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
      


			await newUser.save();


    // Generate JWT token
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilepic: newUser.profilepic,
      },token

    });
  }
  else{
    res.status(400).json({ error: "Invalid user data" });
  }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", details: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
