const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// generate server
const server = http.createServer(app);

const io = new Server(server, {
  // passing a cors object to help deal with issues in socket.io server
  cors: {
    origin: "http://localhost:3000", // Accept this url as this is where the react app will be running
    methods: ["GET", "POST"], // These methods will be accepted
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
}); // io.on will listen for the "connection" event

server.listen(3001, () => {
  console.log("Server Running!");
});
