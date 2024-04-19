const multer = require("multer");
const path = require("path"); // Assurez-vous d'inclure le module 'path' pour une meilleure manipulation des chemins de fichiers

// Configuration du stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public", "uploads")); // Spécifier le dossier de destination pour les fichiers téléchargés
    },
    filename: function (req, file, cb) {
        // Générer un suffixe unique basé sur le temps actuel et un nombre aléatoire
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // Construction du nom de fichier final
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(
                file.originalname
            )}`
        );
    },
});

// Filtre pour spécifier les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true); // Accepter le fichier si son mimetype est JPEG ou PNG
    } else {
        cb(new Error("Unsupported file format"), false); // Rejeter les fichiers d'autres formats
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limite de taille de fichier à 5 MB pour prévenir de l'usage excessif de la bande passante
    },
});

module.exports = upload;
