const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    const nom = `${firstName} ${lastName}`;

    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

     // Vérifier la connexion
    transporter.verify((error, success) => {
        if (error) {
            console.error("Erreur Nodemailer :", error);
        } else {
            console.log("Nodemailer est prêt");
        }
    });
    // Options de l'email
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Nouveau message de ${nom}`,
        text: `
            Nom: ${nom}
            Email: ${email}
            Message: ${message}
        `
    };

    // Envoi de l'email
     try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé :", info.messageId);
        res.status(200).json({ message: 'Message envoyé avec succès !' });
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' });
    }
};

module.exports = { sendContactEmail };
