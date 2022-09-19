const express = require("express");
// const registerUser = require('./auth')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
//const comparePassword = require("../models/userSchema");

//const registerUser = require('./auth')

const sendToken = require("../utils/jwtToken");
const {
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getsingleUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controlers/userControler");

const registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password, Cpassword, phone } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    //return res.status(422).json({ err: "email exist" });
    return next(new ErrorHandler("Email exist", 422));
  } else if (password !== Cpassword) {
    return next(
      new ErrorHandler("password and confirm password are not matching", 422)
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    Cpassword,
    phone,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  /// cheking if user has password and email

  if (!email || !password) {
    return next(new ErrorHandler("please Enter Email and Password", 400));
  }

  //const user = await User.findOne({email}).select("+password");
  const userLogin = await User.findOne({ email: email });

  if (!userLogin) {
    return next(new ErrorHandler("invalid credentials"));
  }

  const isMatch = await bcrypt.compare(password, userLogin.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  sendToken(userLogin, 200, res);
});

//log out function

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Succesfully",
  });
});

//forgot password

const forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  /// get Reset pasword token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset${resetToken}`;
  const message = `your password reset token is :- \n\n ${resetPasswordUrl}\n\n if you have not requested it then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Fashion Hub password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `email sent successfully to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password

const resetPassword = catchAsyncError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired from line 162",
        404
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.password;
  user.Cpassword = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  user.save();

  sendToken(user, 200, res);
});

//
//Compare password

router.post("/register", (req, res, next) => {
  registerUser(req, res, next);
});

router.post("/login", (req, res, next) => {
  // registerUser(req,res,next)

  loginUser(req, res, next);
});

//    router.post("/product/new", (req, res,next) => {
//     createProduct(req,res,next)

//    });

router.post("/password/forgot", (req, res, next) => {
  forgetPassword(req, res, next);
});

router.put("/password/reset/:token", (req, res, next) => {
  resetPassword(req, res, next);
});

router.get("/logout", (req, res, next) => {
  logout(req, res, next);
});

router.get("/me", isAuthenticatedUser, (req, res, next) => {
  getUserDetails(req, res, next);
});

router.put("/password/update", isAuthenticatedUser, (req, res, next) => {
  updatePassword(req, res, next);
});

router.put("/me/update", isAuthenticatedUser, (req, res, next) => {
  updateUserProfile(req, res, next);
});

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    getAllUsers(req, res, next);
  }
);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    getsingleUser(req, res, next);
  }
);

router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    updateUserRole(req, res, next);
  }
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    deleteUser(req, res, next);
  }
);

module.exports = router;
