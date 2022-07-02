const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());

// generate server
const server = http.createServer(app);

server.listen(3001, () => {
  console.log("Server Running!");
});
