const express = require("express");
const {
  newOder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrders,
  deleteOrders,
} = require("../controlers/OderControlers");
const router = express.Router();
const { authorizeRoles } = require("../middleware/auth");
const { isAuthenticatedUser } = require("../middleware/auth");
const User = require("../models/userSchema");

//router.route('/order/new').post(isAuthenticatedUser,newOder)

router.post("/order/new", isAuthenticatedUser, (req, res, next) => {
 
  newOder(req, res, next);
});

router.get("/order/:id", isAuthenticatedUser, (req, res, next) => {
  getSingleOrder(req, res, next);
});

router.get("/orders/me", isAuthenticatedUser, (req, res, next) => {
  myOrders(req, res, next);
});

router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    getAllOrders(req, res, next);
  }
);

router.put(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    updateOrders(req, res, next);
  }
);

router.delete(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    deleteOrders(req, res, next);
  }
);
module.exports = router;
