const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const Chats = require("./../models/Chat");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const messages = await Chats.find();
    res.json(messages);
    res.status({ status: "GET request received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
