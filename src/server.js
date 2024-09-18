import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import jwt from "jsonwebtoken";
import analyticsService from "./services/analyticsService.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin")
      return next(new Error("Admin authorization required"));
    socket.user = decoded;
    next();
  });
});

io.on("connection", (socket) => {
  console.log(`Admin connected: ${socket.user.id}`);

  const emitAnalyticsData = async () => {
    try {
      const data = await analyticsService.getAnalyticsData();
      console.log("Emitting Data!");
      socket.emit("analyticsData", data);
    } catch (error) {
      console.error("Error emitting analytics data:", error);
    }
  };

  emitAnalyticsData();

  const intervalId = setInterval(emitAnalyticsData, 1000);

  socket.on("disconnect", () => {
    clearInterval(intervalId);
    console.log(`Admin disconnected: ${socket.user.id}`);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
