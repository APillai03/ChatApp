import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectmongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log("connected to mongodb");
    } catch (error) {
        console.log(error);
    }
};

export default connectmongodb;
