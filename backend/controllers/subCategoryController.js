const SubCategory = require("../models/subCategory");

exports.createSubCategory = async (req, res) => {
  const subCategory = await SubCategory.create(req.body);
  res.json(subCategory);
};

exports.getSubCategories = async (req, res) => {
  const subCategories = await SubCategory.find().populate("category");
  res.json(subCategories);
};

exports.updateSubCategory = async (req, res) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(subCategory);
};

exports.deleteSubCategory = async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "SubCategory Deleted" });
};
