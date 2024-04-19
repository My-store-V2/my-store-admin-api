const db = require("../models");
const path = require("path");
const fs = require("fs");

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
            const { name, description, active, price } = req.body;
            const activeBool = active === "true"; // convert to boolean
            const priceNum = parseFloat(price); // ensure price is a floating point number
            if (!name || isNaN(priceNum)) {
                return res.status(400).json({
                    success: false,
                    message: "Name and price are required fields",
                });
            }

            const existingProduct = await db.Product.findOne({
                where: { name },
            });
            if (existingProduct) {
                return res.status(400).json({
                    success: false,
                    message: "Product already exists",
                });
            }

            let thumbnailUrl = null,
                packshotUrl = null;
            if (req.files) {
                if (req.files.thumbnail) {
                    thumbnailUrl = await processFile(req.files.thumbnail[0]);
                }
                if (req.files.packshot) {
                    packshotUrl = await processFile(req.files.packshot[0]);
                }
            }

            const newProduct = await db.Product.create({
                name,
                description,
                active: activeBool,
                price: priceNum,
                thumbnail: thumbnailUrl,
                packshot: packshotUrl,
            });

            clearUploadsDirectory();

            res.status(201).json({
                success: true,
                results: newProduct,
                message: `Product ${newProduct.id} successfully created`,
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    putProduct: async (req, res) => {
        try {
            const { name, description, active, price } = req.body;
            const productId = parseInt(req.params.id);

            if (isNaN(productId)) {
                return res.status(400).json({
                    success: false,
                    message: "Product ID is required",
                });
            }

            const product = await db.Product.findByPk(productId);
            if (!product) {
                return res
                    .status(404)
                    .json({ success: false, message: "Product not found" });
            }

            let thumbnailUrl = null,
                packshotUrl = null;
            if (req.files) {
                if (req.files.thumbnail) {
                    thumbnailUrl = await processFile(req.files.thumbnail[0]);
                }
                if (req.files.packshot) {
                    packshotUrl = await processFile(req.files.packshot[0]);
                }
            }

            const newProduct = {
                name,
                price: parseFloat(price),
                description,
                active: active === "true",
                thumbnail: thumbnailUrl,
                packshot: packshotUrl,
            };

            await product.update(newProduct);
            clearUploadsDirectory();
            return res.status(200).json({
                success: true,
                results: product,
                message: `Product ${productId} successfully updated`,
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
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

//

async function processFile(file) {
    const base64 = await convertImageToBase64(file.path);
    return await uploadImage(`${base64}`, file.filename);
}

async function uploadImage(base64, name) {
    const response = await fetch(process.env.FILE_UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_name: name, file_content_base64: base64 }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to upload image");
    return data.url;
}

function convertImageToBase64(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            else resolve(data.toString("base64"));
        });
    });
}

function clearUploadsDirectory() {
    const directory = path.join(__dirname, "../../public/uploads");

    fs.readdir(directory, (err, files) => {
        if (err) throw new Error(err);

        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw new Error(err);
            });
        }
    });
}
