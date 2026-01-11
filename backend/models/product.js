const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { 
    type: String, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
  brand: String,
  sku: String,
  unit: {
    type: String,
    enum: ["kg", "gm", "liter", "pcs"]
  },
  images: [String],
  description: String,

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
