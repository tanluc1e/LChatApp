const mongoose = require("mongoose");
const config = require("./config");

const connect = mongoose.connect(config.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = connect;
