import express from "express";
import authroutes from "./routes/auth.routes.js";
import connectmongodb from "./db/connectmongodb.js";
import messageroutes from "./routes/messageroutes.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import usersroutes from "./routes/usersroutes.js"

import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

// Example route to set a cookie for testing

app.use("/api/auth", authroutes);
app.use("/api/messages", messageroutes);
app.use("/api/users", usersroutes);

app.listen(PORT, () => {
    connectmongodb();
    console.log(`server is listening on ${PORT}`);
});
