const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    console.log(`Message -> ${data.user} : ${data.message}`);
    socket.broadcast.emit("receive-message", data);
  })
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
