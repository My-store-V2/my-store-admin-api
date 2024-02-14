const jwt = require("jsonwebtoken");
const db = require("../models"); // Supposons que vous ayez déjà configuré Sequelize et importé le modèle User

const isAdminMiddleware = async (req, res, next) => {
    // Récupérer le token d'authentification depuis les en-têtes de la requête
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMWZiNjY5NS1jYjQzLTExZWUtODM3MC00MjAxMGE0MDAwMDUiLCJpYXQiOjE3MDc5MjAyMzUsImV4cCI6MTcwNzkyMzgzNX0.LvrIiS1qu6beoTxMgImTPQ5A6Czr0ju9jx12XtagCQg";

    if (!token) {
        return res.status(401).json({ message: "Token non fourni" });
    }

    try {
        // Vérifier si le token est valide et obtenir les informations utilisateur
        const decoded = jwt.verify(token, "secretOrKey");

        // Recherchez l'utilisateur dans la base de données en utilisant l'ID décodé
        const user = await db.User.findByPk(decoded.userId);
        console.log(decoded);
        console.log(user.admin);
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier si l'utilisateur est un administrateur

        if (!user.admin) {
            return res.status(403).json({
                message: "Accès interdit - Vous devez être administrateur",
            });
        }

        // Stocker les informations utilisateur dans l'objet de requête pour une utilisation ultérieure
        req.user = user;

        // Continuer vers la prochaine étape du middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = isAdminMiddleware;
