import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // { userId: Set<socketId> }

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined" && userId) {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = new Set();
    }
    userSocketMap[userId].add(socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    for (const [id, socketSet] of Object.entries(userSocketMap)) {
      if (socketSet.has(socket.id)) {
        socketSet.delete(socket.id);
        if (socketSet.size === 0) {
          delete userSocketMap[id];
        }
        console.log(`User ${id} with socket ID ${socket.id} has been removed`);
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    }
  });
});

export const getReceiverSocketId = (receiverId) => {
	console.log(receiverId)
  return Array.from(userSocketMap[receiverId] || []);
};

export { app, io, server };
