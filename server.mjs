// server.js (Standalone backend for Socket.IO)
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://finsphere-gamma.vercel.app/", // your frontend port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

// For testing:
app.post("/trigger", express.json(), (req, res) => {
  const { userId, amount } = req.body;
  io.emit("balance:update", { userId, newBalance: amount });
  res.send("Notification sent");
});

server.listen(3001, () => {
  console.log("Socket.IO server running on http://localhost:3001");
});
