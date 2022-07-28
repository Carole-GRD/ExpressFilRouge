// auth -> raccourci pour authentication  -> identification

const User = require("../models/user-model");

// on importe notre utilitaire pour pouvoir générer un token
const jwtUtils = require('../utils/jwt-utils');

// on importe argon2
const argon2 = require('argon2');


const authController = {
    login : async (req, res) => {
        // Pour se loger, on va recevoir un identifiant et un mdp et on va devoir vérifier si un utilsateur correspond à ces données
        // req.body va contenir un objet qui ressemble à ceci
        // {
        //     "credential": "monIdentifiant",    //monIdentifiant pourra être soit un pseudo, soit un email
        //     "password": "monPassword"
        // }
        const { credential, password } = req.body;
        // On construit notre filtre : on recherche l'utilisateur dont l'email correspond à la valeur dans credential ou son pseudo correspond à la valeur dans credential
        const credentialFilter = { $or : [ {email : credential} , {pseudo : credential} ] };
        const user = await User.findOne(credentialFilter);
        // on vérifie si on a récupéré un utilisateur
        if ( !user ) {
            // si pas
            return res.status(401).json( { error : 'Bad credentials' } );  // 401 -> Unauthorized -> pas les bonnes infos de login
        }
        // console.log(user);
        // console.log(password);
        // console.log(user.password);
    
        // si on a un utilisateur, on doit vérifier si son mdp présent dans le req.body correspond au mdp hashé en bdd
        const isPassWordValid = await argon2.verify(user.password, password);
        // si le mot de passe de la requête et celui en bdd ne correspondent pas
        if (!isPassWordValid)
        {
            // Erreur
            return res.status(401).json({ error : 'Bad credentials' });
        }
        // TODO : générer et renvoyer un token
        const token = await jwtUtils.generate(user);
        return res.json({token});   // -> accolades pour avoir un objet token et pas juste sa valeur
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
        const token = await jwtUtils.generate(userToInsert);
        res.status(200).json({token});
    }
}

module.exports = authController;