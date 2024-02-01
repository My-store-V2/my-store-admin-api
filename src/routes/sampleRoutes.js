/**
 * @swagger
 * /api/sample:
 *   get:
 *     summary: Get sample data
 *     description: Retrieve sample data
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: GET
 *   post:
 *     summary: Create a new sample
 *     description: Create a new sample with the given ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the sample to be created
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: OK
 */
const express = require("express");
const router = express.Router();

router.get("/sample", (req, res) => {
    res.send("GET");
});

router.post("/sample/:id", (req, res) => {
    res.send("OK");
});

module.exports = router;
