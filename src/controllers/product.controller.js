const db = require("../models");

module.exports = {
    // controller to get all products
    getProducts: async (req, res) => {
        try {
            // retrieve all products using Sequelize's findAll() method
            const products = await db.Product.findAll();

            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found",
                });
            }

            // return the products in JSON format
            return res.status(200).json({
                results: products,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // controller to get a specific product by id
    getProduct: async (req, res) => {
        try {
            if (isNaN(req.params.id)) {
                return res.status(400).json({
                    success: false,
                    message: "Bad request. No id provided",
                });
            }

            // retrieve the product with Sequelize's findByPk() method
            const product = await db.Product.findByPk(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // return the product in JSON format
            return res.status(200).json({
                results: product,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({ message: err.message });
        }
    },

    postProduct: async (req, res) => {
        try {
            // Extract product data from the request body
            const { name, description, active, thumbnail, packshot, price } =
                req.body;

            // Validate the required fields
            if (!name || !price) {
                return res.status(400).json({
                    success: false,
                    message: "Name and price are required fields",
                });
            }

            // Create a new product using Sequelize's create() method
            const newProduct = await db.Product.create({
                name,
                description,
                active,
                thumbnail,
                packshot,
                price,
            });

            // Return the newly created product in JSON format
            return res.status(201).json({
                success: true,
                results: newProduct,
                message: `Product ${newProduct.id} successfully created`,
            });
        } catch (err) {
            // If an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    putProduct: async (req, res) => {
        try {
            // Extract product data from the request body
            const { name, description, active, thumbnail, packshot, price } =
                req.body;
            const productId = req.params.id;

            // Check if the product with the given ID exists
            const existingProduct = await db.Product.findByPk(productId);

            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // Update the existing product using Sequelize's update() method
            await existingProduct.update({
                name,
                description,
                active,
                thumbnail,
                packshot,
                price,
            });

            // Return the updated product in JSON format
            return res.status(200).json({
                success: true,
                results: existingProduct,
                message: `Product ${productId} has been successfully updated`,
            });
        } catch (err) {
            // If an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;

            // Validate if the product ID is provided
            if (!productId) {
                return res.status(400).json({
                    success: false,
                    message: "Product ID is required",
                });
            }

            // Check if the product with the given ID exists
            const existingProduct = await db.Product.findByPk(productId);

            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // Delete the existing product using Sequelize's destroy() method
            await existingProduct.destroy();

            // Return a success message
            return res.status(200).json({
                success: true,
                message: `Product ${productId} successfully deleted`,
            });
        } catch (err) {
            // If an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
};
