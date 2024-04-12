const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: API operations related to authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Register a new user
 *    description: Register a new user with the provided credentials.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/User"
 *            properties:
 *              firstname:
 *                type: string
 *                description: First name of the user
 *                example: Admin
 *              lastname:
 *                type: string
 *                description: Last name of the user
 *                example: Admin
 *              email:
 *                type: string
 *                description: Email of the user
 *                example: admin@example.com
 *              password:
 *                type: string
 *                description: Password of the user
 *                example: "password"
 *            required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *    responses:
 *      201:
 *        description: User successfully registered
 *        content:
 *          application/json:
 *            example:
 *              success: true
 *              message: User successfully registered
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            example:
 *              success: false
 *              message: User already exists with this email
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example:
 *              success: false
 *              message: Internal Server Error
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    summary: Sign in a user
 *    description: Sign in a user with the provided credentials.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            email:
 *              type: string
 *              description: Email of the user
 *              example:
 *                test@gmail.com
 *            password:
 *              type: string
 *              description: Password of the user
 *              example:
 *                "password"
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *                example: user@example.com
 *              password:
 *                type: string
 *                description: Password of the user
 *                example: "password"
 *            required:
 *              - email
 *              - password
 *    responses:
 *      200:
 *        description: User successfully signed in
 *        content:
 *          application/json:
 *            example:
 *              success: true
 *              message: User successfully signed in
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            example:
 *              success: false
 *              message: "Email and password are required"
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            example:
 *              success: false
 *              message: "Invalid email or password"
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example:
 *              success: false
 *              message: Internal Server Error
 */
router.post("/signin", authController.signin);

/**
 * @swagger
 * /api/auth/session:
 *  get:
 *    summary: Check if user token is valid
 *    description: Check if the user token is valid and return the user information.
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: User token is valid
 *        content:
 *          application/json:
 *            example:
 *              success: true
 *              message: User token is valid
 *              data: {
 *                token: "Bearer Zsjhbxjhsbchjbsjchbjs",
 *              }
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            example:
 *              success: false
 *              message: Invalid token
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example:
 *              success: false
 *              message: Internal Server Error
 */
router.get("/session", isAdminMiddleware, authController.session);

module.exports = router;
