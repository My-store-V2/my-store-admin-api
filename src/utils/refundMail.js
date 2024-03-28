const nodemailer = require("nodemailer");
const config = require("../config");

async function refundMail(res, email, orderId) {
    try {
        // Créer un transporteur SMTP
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: config.gmail,
                pass: config.gpwd,
            },
        });

        // Définir le contenu de l'e-mail
        let mailOptions = {
            from: config.gmail,
            to: email,
            subject: "Demande de remboursement",
            text: `La commande ${orderId} vient d'être remboursé`,
        };

        // Envoyer l'e-mail
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        // Répondre avec une erreur si une erreur se produit lors de l'envoi de l'e-mail
        res.status(500).json({
            success: false,
            message:
                "Erreur lors de l'envoi de l'e-mail de demande de remboursement",
            error: error.message,
        });
    }
}

module.exports = { refundMail };
