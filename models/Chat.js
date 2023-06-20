const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String,
    },
    username: {
      type: String,
    },
    userphoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Chat = mongoose.model("LChatApp-Logs", chatSchema);

module.exports = Chat;
