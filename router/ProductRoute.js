const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controlers/productControler");
const { authorizeRoles } = require("../middleware/auth");
const { isAuthenticatedUser } = require("../middleware/auth");
//router.route("/products").get(getAllProducts)
//router.route('product/new').post(createProduct)
router.get("/products", (req, res, next) => {
  getAllProducts(req, res, next);
});

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    createProduct(req, res, next);
  }
);

router.put(
  "admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    updateProduct(req, res, next);
  }
);

router.delete(
  "admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  (req, res, next) => {
    deleteProduct(req, res, next);
  }
);

router.get("/product/:id", (req, res, next) => {
  getProductDetails(req, res, next);
});

router.put("/review", isAuthenticatedUser, (req, res, next) => {
  createProductReview(req, res, next);
});

router.get("/reviews", (req, res, next) => {
  getProductReviews(req, res, next);
});

router.delete("/reviews", isAuthenticatedUser, (req, res, next) => {
  deleteReview(req, res, next);
});

// get single product

module.exports = router;
