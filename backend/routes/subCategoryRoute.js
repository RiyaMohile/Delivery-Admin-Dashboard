const express = require("express");
const router = express.Router();

const { adminAuth } = require("../middleware/authMiddleware");
const controller = require("../controllers/subCategoryController");

router.post("/", adminAuth, controller.createSubCategory);
router.get("/", adminAuth, controller.getSubCategories);
router.put("/:id", adminAuth, controller.updateSubCategory);
router.delete("/:id", adminAuth, controller.deleteSubCategory);

module.exports = router;
