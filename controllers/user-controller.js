const User = require("../models/user-model");
const UserDTO = require('../dto/user-dto');

const userController = {
    getAll : async (req, res) => {
        const users = await User.find();
        // On a récupéré les utilisateurs de la bdd MAIS on récupère aussi tous les password hashé
        // ATTENTION : pas TOP le password !

        // on va transformer les utilisateurs de la db avec password en USerDTO qui est un User sans password (et role)
        // const userAvecLastNameEnMaj = users.map(user => user.lastname.toUpperCase());
        // ...user -> outil de décomposition d'un objet (fonctionne aussi sur les tableaux)
        
        // const userDTO = users.map(user => new UserDTO(...user));
        // res.status(200).json(userDTO);

        res.status(200).json(users);
    },
    getById : async (req, res) => {

    },
    update : async (req, res) => {

    },
    delete : async (req, res) => {

    },
}

module.exports = userController;