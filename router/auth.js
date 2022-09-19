const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncError");
router.get("/", (req, res) => {
  res.send(`hellow world from server router.js`);
});

module.exports = router;
