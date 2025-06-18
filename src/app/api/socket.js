// /pages/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket already running");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
  });

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", socket.id);
    });

    socket.on("signal", ({ to, from, signal }) => {
      io.to(to).emit("signal", { from, signal });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  res.end();
}
