const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               results:
 *                 - id: "3a8c1430-c66d-11ee-8370-42010a400005"
 *                   firstname: "Doe"
 *                   lastname: "John"
 *                   email: "john.doe123@example.com"
 *                   address: "123 Main St"
 *                   zipcode: 12345
 *                   city: "Cityville"
 *                   phone: "+1234567890"
 *                   admin: false
 *                 - id: "a38edd6b-c662-11ee-8370-42010a400005"
 *                   firstname: "string"
 *                   lastname: "string"
 *                   email: "string"
 *                   address: null
 *                   zipcode: null
 *                   city: null
 *                   phone: null
 *                   admin: null
 *       '404':
 *         description: No users found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No users found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.get("/", isAdminMiddleware, userController.getUsers);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               user:
 *                 id: "a38edd6b-c662-11ee-8370-42010a400005"
 *                 firstname: "john"
 *                 lastname: "doe"
 *                 email: "test@gmail.com"
 *                 address: "22 rue des fleurs"
 *                 zipcode: 75001
 *                 city: "Paris"
 *                 phone: "0123456789"
 *                 admin: false
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.get("/:id", isAdminMiddleware, userController.getUser);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: New user created
 *         content:
 *           application/json:
 *             example:
 *               id : "a38edd6b-c662-11ee-8370-42010a400005"
 *               success: true
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
router.post("/", isAdminMiddleware, userController.createUser);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *     responses:
 *       '200':
 *         description: User updated
 *         content:
 *           application/json:
 *             example:
 *               id: "a38edd6b-c662-11ee-8370-42010a400005"
 *               success: true
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad request. No id provided
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
router.put("/:id", isAdminMiddleware, userController.updateUser);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *             example:
 *               success: true
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad request. No id provided
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
router.delete("/:id", isAdminMiddleware, userController.deleteUser);

module.exports = router;
