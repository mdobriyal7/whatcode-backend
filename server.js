const dotnev = require("dotenv");
const cors = require("cors");
const express = require("express");
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const app = express();

dotnev.config({ path: "./config.env" });
require("./config/conn");

const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use("/auth", require("./router/authRoutes"));
app.use("/user", require("./router/userRoutes"));
app.use("/cart", require("./router/cartRoutes"));
const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is running");
});
