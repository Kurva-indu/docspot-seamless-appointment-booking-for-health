const express = require("express");
const { registerController, loginController } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
