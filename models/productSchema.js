const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter Description"],
  },
  price: {
    type: Number,
    required: [true, "please enter Price"],
    maxlength: [8, "price can not exceed 8 char"],
  },

  gender: {
    type: String,
    required: [true, "please enter Gender"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "please enter category"],
  },

  stock: {
    type: Number,
    required: [true, "please enter number of stock"],
    maxlength: [4, "stock cannot be more then 4 characters"],
    default: 1,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviewes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
