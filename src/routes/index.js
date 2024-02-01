/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully retrieved all products
 *
 */

const express = require("express");
const productRoute = require("./product.route");

const router = express.Router();

router.use("/products", productRoute);

module.exports = router;
