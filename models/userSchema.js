const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Your Name"],
    maxlength: [30, "Name cannot be more than 30 characters"],
    minlength: [4, "Name Should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "please Enter Your Email"],
  },
  phone: {
    type: Number,
    required: [true, "please Enter Your Phone Number"],
  },
  password: {
    type: String,
    required: [true, "please Enter valid Password"],
    minlength: [8, "password must be at least 8 characters"],
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  Cpassword: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = bcrypt.hash(this.password, 12);
      this.Cpassword = bcrypt.hash(this.Cpassword, 12);
    }
    next();
  } catch (err) {
    console.log(err, "err");
  }
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
/// generating pasword reset token

userSchema.methods.getResetPasswordToken = function () {
  // generate tokens
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding to user Schema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
