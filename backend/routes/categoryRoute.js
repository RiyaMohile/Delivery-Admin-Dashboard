const express = require("express");
const router = express.Router();

const { adminAuth } = require("../middleware/authMiddleware");
const controller = require("../controllers/categoryController");

router.post("/", adminAuth, controller.createCategory);
router.get("/", adminAuth, controller.getCategories);
router.put("/:id", adminAuth, controller.updateCategory);
router.delete("/:id", adminAuth, controller.deleteCategory);

module.exports = router;
