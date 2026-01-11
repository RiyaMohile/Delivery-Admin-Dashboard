const express = require("express");
const router = express.Router();

const { adminAuth } = require("../middleware/authMiddleware");
const controller = require("../controllers/productController");

router.post("/", adminAuth, controller.createProduct);
router.get("/", adminAuth, controller.getProducts);
router.put("/:id", adminAuth, controller.updateProduct);
router.delete("/:id", adminAuth, controller.deleteProduct);

module.exports = router;
