const jwt = require("jsonwebtoken");
const db = require("../models");

const isAdminMiddleware = async (req, res, next) => {
    // Récupérer le token d'authentification depuis les en-têtes de la requête
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token non fourni" });
    }

    try {
        // Vérifier si le token est valide et obtenir les informations utilisateur
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Recherchez l'utilisateur dans la base de données en utilisant l'ID décodé
        const user = await db.User.findByPk(decoded.userId);

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
