const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  const images = req.files?.map(f => f.path) || [];

  const product = await Product.create({
    ...req.body,
    productId: "PRD-" + Date.now(),
    images
  });

  res.json(product);
};

exports.getProducts = async (req, res) => {
  res.json(
    await Product.find()
      .populate("category")
      .populate("subCategory")
  );
};

exports.updateProduct = async (req, res) => {
  res.json(
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};
