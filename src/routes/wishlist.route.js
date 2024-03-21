const express = require("express");
// const verifyToken = require('../middlewares/verifiyToken');
// const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");

/**
 * @swagger
 * paths:
 *   /api/wishlist:
 *     post:
 *       summary: Add a product to the wishlist
 *       tags:
 *         - Wishlist
 *       requestBody:
 *         description: Wishlist item to add
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       responses:
 *         '200':
 *           description: Wishlist item added successfully
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 id_client: 1
 *                 id_product: 2
 *         '400':
 *           description: Bad request. Ensure the request body is valid.
 *         '404':
 *           description: Not found. User or product not found.
 *         '500':
 *           description: Internal Server Error. Something went wrong.
 */

// router.post("/", verifyToken, verifyIsAdmin, wishlistController.addWishlist);
router.post("/", wishlistController.addWishlist);

// router.put("/admin/user/:id", verifyToken, verifyIsAdmin, userController.putUser);
// router.delete("/admin/user/:id", verifyToken, verifyIsAdmin, userController.deleteUser);

module.exports = router;