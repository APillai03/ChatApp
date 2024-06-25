import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Corrected typo here
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilepic: {
        type: String,
        default: "",
    },
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;
