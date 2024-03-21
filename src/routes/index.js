const express = require("express");
const productRoute = require("./product.route");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const router = express.Router();

router.use("/products", productRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;
