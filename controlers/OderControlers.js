const Order = require("../models/orderSchema");

const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.newOder = catchAsyncError(async (req, res, next) => {
  const {
    adressInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippinPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    adressInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippinPrice,
    totalPrice,
    paidAt: Date.now(),

    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// get log in Single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update order status

exports.updateOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (orders.orderStatus === "Delivered") {
    return next(new ErrorHandler("you have already delevered this order", 400));
  }

  orders.orderItems.forEach(async (order) => {
    
    await updateStock(order.product, order.quantity);
  });

  orders.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    orders.deliveredAt = Date.now();
  }

  await orders.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity, order) {

  const product = await Product.findById(id);

  product.stock = product.stock - quantity;



  await product.save({ validateBeforeSave: false });
}

exports.deleteOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler("order not found", 400));
  }

  await orders.remove();

  res.status(200).json({
    success: true,
  });
});
