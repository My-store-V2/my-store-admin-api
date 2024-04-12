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
            const existingAdmin = await db.User.findOne({
                where: { admin: true },
            });
            if (existingAdmin) {
                return res.status(400).json({
                    success: false,
                    message: "An admin already exists.",
                });
            }

            // Définir les données de l'admin directement dans la fonction
            const adminData = {
                firstname: "Admin",
                lastname: "Admin",
                email: "admin@mystore.com",
                password: "adminpassword",
                address: "123 Admin Street",
                zipcode: "12345",
                city: "AdminCity",
                phone: "1234567890",
            };

            // Hasher le mot de passe
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminData.password, salt);

            // Créer un nouvel utilisateur admin
            await db.User.create({
                ...adminData,
                password: hashedPassword,
                admin: true, // Définir admin sur true
            });

            res.status(201).json({
                success: true,
                message: "Admin successfully registered",
            });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, message: err.message });
        }
    },

    session: async (req, res, next) => {
        // Récupérer le token du header Authorization
        const token = req.headers.authorization;

        // Vérifier si le token est présent
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token d'authentification manquant.",
            });
        }

        try {
            // Vérifier et décoder le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Récupérer l'utilisateur à partir de l'ID du token
            const user = await db.User.findByPk(decoded.userId);

            // Vérifier si l'utilisateur existe
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Utilisateur non trouvé.",
                });
            }

            // Ajouter l'utilisateur au corps de la requête pour l'utiliser dans d'autres middleware ou routes
            req.user = user;

            // Renvoyer le token
            return res.status(200).json({
                success: true,
                message: "Token d'authentification valide.",
                token,
            });
        } catch (err) {
            // Erreur de token, renvoyer une erreur 401
            return res.status(401).json({
                success: false,
                message: "Token d'authentification invalide.",
            });
        }
    },
};
