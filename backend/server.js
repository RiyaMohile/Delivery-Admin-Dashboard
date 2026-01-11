const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { adminAuth } = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", require("./routes/authRoute"));

app.use("/api/category", adminAuth, require("./routes/categoryRoute"));
app.use("/api/sub-category", adminAuth, require("./routes/subCategoryRoute"));
app.use("/api/product", adminAuth, require("./routes/productRoute"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
