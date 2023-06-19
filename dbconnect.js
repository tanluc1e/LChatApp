const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB error: ", err));
