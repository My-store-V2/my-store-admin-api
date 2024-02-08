const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               results: []
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
router.get("/", userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: User details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user: {}
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
router.get("/:id", userController.getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user by their ID.
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
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               admin:
 *                  type: boolean
 *     responses:
 *       '200':
 *         description: User updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user: {}
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
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID.
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
router.delete("/:id", userController.deleteUser);

module.exports = router;
