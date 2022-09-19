const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });

  res.status(200).json({ success: true, client_secret: payment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, stripeApiKey: process.env.STRIPE_API_KEY });
});
