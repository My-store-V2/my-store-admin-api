const express = require("express");

const router = express.Router();
const productController = require("../controllers/product.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         active:
 *           type: boolean
 *           description: Whether the product is active or not
 *         thumbnail:
 *           type: string
 *           description: URL or path to the product's thumbnail image
 *         packshot:
 *           type: string
 *           description: URL or path to the product's packshot image
 *         price:
 *           type: number
 *           format: int
 *           description: The price of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was added
 *       example:
 *         id: 1
 *         name: "Sample Product"
 *         description: "This is a sample product description."
 *         active: true
 *         thumbnail: "https://example.com/thumbnail.jpg"
 *         packshot: "https://example.com/packshot.jpg"
 *         price: 19.99
 *         createdAt: "2022-02-02T12:34:56.789Z"
 */

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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "W simple pant"
 *             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ..."
 *             active: 1
 *             thumbnail: "uploads/product1.webp"
 *             packshot: "/uploads/product1_packshot.jpeg"
 *             price: 123
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Product successfully created
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Name and price are required fields"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.post("/", productController.postProduct);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product with the provided information based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the product to update.
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Product"
 *             description: "Updated description"
 *             active: true
 *             thumbnail: "uploads/product2.webp"
 *             packshot: "/uploads/product2_packshot.jpeg"
 *             price: 150
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Product successfully updated
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product ID, name, and price are required fields"
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

router.put("/:id", productController.putProduct);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the product to delete.
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Product successfully deleted
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product ID is required"
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

router.delete("/:id", productController.deleteProduct);

module.exports = router;
