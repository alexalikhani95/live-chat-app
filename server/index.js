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
  // io.on will listen for the "connection" event
  console.log(`User Connected ${socket.id}`); // The socket.id of user that just connected

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () => {
    // this will run when someone tries to disconnect from the server
    console.log("User Disconnected", socket.id); // The socket id of user that disconnected
  });
});

server.listen(3001, () => {
  console.log("Server Running!");
});
