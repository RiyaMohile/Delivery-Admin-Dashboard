const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  name: { 
    type: String, 
    required: true },
    status: { 
      type: String, 
      default: "Active" 
    }
}, { timestamps: true });

module.exports = mongoose.model("SubCategory", subCategorySchema);
