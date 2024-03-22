const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API operations related to orders
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders.
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 6
 *                       user_id:
 *                         type: string
 *                         example: "495ac5c1-d7bb-11ee-9a02-42010a400006"
 *                       order_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-21T15:41:02.000Z"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       delivery_mode:
 *                         type: string
 *                         example: "delivery"
 *                       delivery_address:
 *                         type: string
 *                         example: "rue de test"
 *                       delivery_city:
 *                         type: string
 *                         example: "Nanterre"
 *                       delivery_zipcode:
 *                         type: integer
 *                         example: 92000
 *                       total_price:
 *                         type: integer
 *                         example: 457
 *             example:
 *               success: true
 *               results:
 *                 - id: 6
 *                   user_id: "495ac5c1-d7bb-11ee-9a02-42010a400006"
 *                   order_date: "2024-03-21T15:41:02.000Z"
 *                   status: "pending"
 *                   delivery_mode: "delivery"
 *                   delivery_address: "rue de test"
 *                   delivery_city: "Nanterre"
 *                   delivery_zipcode: 92000
 *                   total_price: 457
 *                 - id: 7
 *                   user_id: "495ac5c1-d7bb-11ee-9a02-42010a400006"
 *                   order_date: "2024-03-21T15:42:15.000Z"
 *                   status: "pending"
 *                   delivery_mode: "delivery"
 *                   delivery_address: "rue de test"
 *                   delivery_city: "Nanterre"
 *                   delivery_zipcode: 92000
 *                   total_price: 457
 *       '404':
 *         description: No orders found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No orders found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.get("/", isAdminMiddleware, orderController.getOrders);

/**
 * @swagger
 * paths:
 *   /api/orders/{id}:
 *     get:
 *       summary: Get an order details by ID
 *       description: Retrieve details of a specific order by its ID.
 *       tags: [Orders]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the order to retrieve
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Details of the requested order
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Order_Details'
 *         '404':
 *           description: Order not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Order not found
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error
 */


router.get("/:id", isAdminMiddleware, orderController.getOrderDetail);

/**
 * @swagger
 * paths:
 *   /api/orders/user/{id}:
 *     get:
 *       summary: Get orders of a user by ID
 *       description: Retrieve orders associated with a specific user by user ID.
 *       tags: [Orders]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the user to retrieve orders for
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Orders of the requested user
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Orders'
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: User not found 
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error
 */


router.get("/user/:id", isAdminMiddleware, orderController.getOrderOfUser);

module.exports = router;