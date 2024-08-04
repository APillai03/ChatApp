import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/messageroutes.js';
import userRoutes from './routes/usersroutes.js';
import { app,server } from './socket/socket.js';
import connectmongodb from './db/connectmongodb.js';

const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with the actual origin of your frontend
  credentials: true,  // Allow cookies and authorization headers
};

app.use(cors(corsOptions));


dotenv.config();

// CORS configuration to allow credentials



app.use(express.json()); 
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  connectmongodb();
  console.log(`Server Running on port ${PORT}`);
});
 