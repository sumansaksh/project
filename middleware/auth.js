const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;



  if (!token) {
    return next(new ErrorHandler("please log in to access this product", 401));
  }

  const decodedData = jwt.verify(token, process.env.SECRET_KEY);

  await User.findById(decodedData.id);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
      
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not alowed to acces this resource`,
          403
        )
      );
    }
    next();
  };
};
