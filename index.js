// ====================== IMPORT ======================
const express = require("express");
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");

// ====================== SETUP SERVER ======================
const app = express();
const server = require("http").Server(app);
const io = socketIO(server);
const port = 5000;

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//bodyparser middleware
app.use(bodyParser.json());

const connect = require("./dbconnect");

// ====================== SOCKET LISTENERS ======================
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// ====================== ROUTES ======================

server.listen(port, () => {
  console.log("Running on Port: " + port);
});
