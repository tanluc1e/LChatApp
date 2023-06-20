// ====================== IMPORT ======================
const express = require("express");
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const Chat = require("./models/Chat");

function checkTime(e) {
  return e < 10 && (e = "0" + e), e;
}
const tm = new Date();
var timeParse =
  checkTime(tm.getDate()) +
  "/" +
  checkTime(tm.getMonth() + 1) +
  " - " +
  checkTime(tm.getHours()) +
  ":" +
  checkTime(tm.getMinutes());

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
connect.then(() => {
  console.log("MongoDB connected!");
});

// ====================== SOCKET LISTENERS ======================
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("username", (username) => {
    socket.username = username;
  });

  socket.on("chat message", function (message) {
    const username = socket.username;
    console.log("[" + timeParse + "]" + " User " + username + ": " + message);
    socket.broadcast.emit("received", { message: message, username: username });

    // SAVE TO MONGODB
    connect.then((db) => {
      let chatMessage = new Chat({ message: message, username: username });
      chatMessage.save();
    });
  });
});

// ====================== ROUTES ======================
const getChat = require("./routes/index");
app.use("/chats", getChat);

server.listen(port, () => {
  console.log("Running on Port: " + port);
});
