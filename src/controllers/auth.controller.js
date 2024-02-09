const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");

// Fonction pour générer un jeton JWT contenant l'ID de l'utilisateur
function generateAuthToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = {
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Vérifiez si l'utilisateur existe dans la base de données
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password.",
                });
            }

            // Vérifiez si le mot de passe est correct
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password.",
                });
            }

            // Si les informations d'identification sont valides, générez un jeton JWT
            const token = generateAuthToken(user.id);

            // Retournez le jeton JWT dans la réponse
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
