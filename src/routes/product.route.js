const express = require("express");

const router = express.Router();
const productController = require("../controllers/product.controller");

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
 *               results:
 *                 - id: 1
 *                   name: "W simple pant"
 *                   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
 *                   active: true
 *                   thumbnail: "uploads/product1.webp"
 *                   packshot: "/uploads/product1_packshot.jpeg"
 *                   price: 123
 *                 - id: 2
 *                   name: "Bib Overall Straight"
 *                   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
 *                   active: true
 *                   thumbnail: "uploads/product2.webp"
 *                   packshot: "/uploads/product2_packshot.jpeg"
 *                   price: 136
 *               success: true
 *               message: Successfully retrieved all products
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No products found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.get("/", productController.getProducts);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the product to retrieve.
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               results:
 *                 id: 1
 *                 name: "W simple pant"
 *                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
 *                 active: true
 *                 thumbnail: "uploads/product1.webp"
 *                 packshot: "/uploads/product1_packshot.jpeg"
 *                 price: 123
 *               success: true
 *               message: Successfully retrieved the product
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Bad request. No id provided"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.get("/:id", productController.getProduct);

module.exports = router;
