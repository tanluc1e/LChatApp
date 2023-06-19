// ====================== IMPORT ======================
const express = require("express");
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");

// ====================== SETUP SERVER ======================
const app = express();
const http = require("http").Server(app);
const io = require("socket.io");
const port = 5000;

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//bodyparser middleware
app.use(bodyParser.json());

//integrating socketio
socket = io(http);

const connect = require("./dbconnect");

// ====================== ROUTES ======================

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
