// auth -> raccourci pour authentication  -> identification

const User = require("../models/user-model");

// on importe argon2
const argon2 = require('argon2');


const authController = {
    login : async (req, res) => {
        // Pour se loger, on va recevoir un identifiant et un mdp et on va devoir vérifier si un utilsateur correspond à ces données
    },
    register : async (req, res) => {
        // Pour enregistrer un nouvel utilisateur, on ne va pas stocker son mot de passe en clair dans la base de données
        // on va donc devoir le hash à l'aide d'un petit module fort pratique

        // On récupère dans le body toutes les informations qui nous intéressent pour faire un nouvel utilisateur
        const { pseudo, email, lastname, firstname, password } = req.body;

        // Hashage du password
        const hashedPassword = await argon2.hash(password);

        // on crée un nouvel utilsateur à rentrer en db à partir des infos sur req.body
        // SAUF LE PASSWORD qu'on ne stocke jamais en clair, on va stocker le password hashé
        const userToInsert = User({
            pseudo,
            email,
            lastname,
            firstname,
            password : hashedPassword,    // Pour le password de notre user à insérer en db, on fournit le password une fois hashé
        });
        await userToInsert.save();
        res.status(200).json(userToInsert);
    }
}

module.exports = authController;