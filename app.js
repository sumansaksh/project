const express = require("express");
const app = express();
const mongoose = require("mongoose");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config.env" });
}

const errorMiddleware = require("./middleware/error");

const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const path = require("path");

//conecting db
require("./DB/conection");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Order = require("./models/orderSchema");

const User = require("./models/userSchema");

const payment = require("./router/paymentRoute");
const cookieParser = require("cookie-parser");
//to conver in json format
app.use(express.json());
app.use(cookieParser());

////scheema

const port = process.env.PORT;

//link router file
app.use(require("./router/productRoute"));
app.use(require("./router/UserRoute"));
app.use(require("./router/orderRoute"));
app.use(require("./router/paymentRoute"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

//handling unCauth resolution

process.on("uncaughtException", (err) => {
  process.exit(1);
});

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});

app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
// unhandelled promise resolution

process.on("unhandelledRejection", (err) => {
  console.log(`sutting down the server due to unhandelled promise rejection`);
  console.log(`Error:${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
