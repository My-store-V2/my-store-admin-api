const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

router.get("/", orderController.getOrders);

// router.get("/:user_id", orderController.getOrder);

module.exports = router;