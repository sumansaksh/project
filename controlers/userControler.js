const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary").v2;

const User = require("../models/userSchema");
const sendToken = require("../utils/jwtToken");

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
  
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;
  user.cpassword = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
 
  if (req.body.email == undefined || req.body.name == undefined) {
    return next(new ErrorHandler("please enter the data", 200));
  }
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);
    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
    userindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users for admim

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single users for admim

exports.getsingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user doesnot exits with id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user role
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  if (
    req.body.email == undefined ||
    req.body.name == undefined ||
    req.body.role == undefined
  ) {
    return next(new ErrorHandler("please enter the data", 200));
  }
  const newUserDetails = {
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidators: true,
    userindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler("user does not exist with id${req.params.id}")
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    Message: `user deleted sucessfully`,
  });
});
