const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    organizerName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Price must be a positive number.",
      },
    },
    eventImage: {
      type: String,
      default: null,
    },
    eventFile: {
      type: String,
      default: null,
    },
    profileImage: {
  type: String,
  default: null,
},
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
