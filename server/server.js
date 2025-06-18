// server/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId, user) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", user);
  });

  socket.on("send-message", ({ roomId, message, sender }) => {
    io.to(roomId).emit("receive-message", { message, sender });
  });

  socket.on("end-session", (roomId) => {
    io.to(roomId).emit("session-ended");
    io.in(roomId).socketsLeave(roomId); // Optional: remove all users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Socket server listening on port 3001");
});
