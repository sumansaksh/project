const express = require("express");
const Product = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary").v2;
const uuid = require("uuid");

const { productSort } = require("./productSort");
// create a new product --Admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
  let image = req.body.image;

  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  let imageUrls = [];

  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "products",
    });
    imageUrls.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imageUrls;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);


  res.status(201).json({ success: true, product });
});

/////get all
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  //return next(new ErrorHandler("this idmy testing for front end",500))
  let resultPerPage = 8;

  // const uniqueList = ["all", "my", "done"];
  const producstCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;
  let sort = productSort(req.query.sort);

  apiFeature.pagination(resultPerPage, sort);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    producstCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//update product --- Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 500));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
    productCount,
    resultPerPage,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 500));
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product Deleted successfully" });
});

/// get single product details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }

  res.status(200).json({ success: true, product });
});

// create product review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviewes.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviewes.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviewes.push(review);
    product.numOfReviews = product.reviewes.length;
  }

  let avg = 0;
  product.reviewes.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviewes.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

//get all reviews of a product

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, reviews: product.reviewes });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviewes.filter((rev) => {
    return rev._id.toString() !== req.query.id.toString();
  });

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviewes: reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
