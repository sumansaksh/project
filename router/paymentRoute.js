const express = require("express");
const router = express.Router();
const {
  processPayment,
  sendStripeApiKey,
} = require("../controlers/paymentControlers");
const { isAuthenticatedUser } = require("../middleware/auth");

// router.route("/payment/process").post(isAuthenticatedUser, processPayment);


router.post("/payment/process", isAuthenticatedUser, (req, res, next) => {
  processPayment(req, res, next);
});
// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
router.get("/stripeapikey", (req, res, next) => {
  sendStripeApiKey(req, res, next);
});

module.exports = router;
