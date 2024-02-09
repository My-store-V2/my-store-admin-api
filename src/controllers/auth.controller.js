const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");

// Function to generate a JWT token containing the user ID
function generateAuthToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = {
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the user exists in the database
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password.",
                });
            }

            // Check if the password is correct
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password.",
                });
            }

            // If the credentials are valid, generate a JWT token
            const token = generateAuthToken(user.id);

            // Return the JWT token in the response
            return res.status(200).json({ success: true, token });
        } catch (err) {
            // Gérer les erreurs
            return res
                .status(500)
                .json({ success: false, message: err.message });
        }
    },

    signup: async (req, res) => {
        try {
            const {
                firstname,
                lastname,
                email,
                password,
                address,
                zipcode,
                city,
                phone,
            } = req.body;

            // Check if the user already exists in the database
            const userExists = await db.User.findOne({ where: { email } });
            if (userExists) {
                return res
                    .status(400)
                    .json({ success: false, message: "User already exists." });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user
            await db.User.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                address,
                zipcode,
                city,
                phone,
            });

            // Return the new user in the response
            return res.status(201).json({
                success: true,
                message: "User successfully registered",
            });
        } catch (err) {
            // Handle errors
            return res
                .status(500)
                .json({ success: false, message: err.message });
        }
    },
};
