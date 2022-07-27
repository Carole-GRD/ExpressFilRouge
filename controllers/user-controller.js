const User = require("../models/user-model");
const UserDTO = require('../dto/user-dto');

// Fonction de mappage d'un user de DB en user DTO afin de retirer le password et le role
// comme nous avons à faire plusieurs fois cette action, pour ne pas faire de répétition, on vient le faire dans une fonction
const userMapperToDTO = user => new UserDTO(user.id, user.email, user.pseudo, user.firstname, user.lastname);


const userController = {
    getAll : async (req, res) => {
        const users = await User.find();
        // On a récupéré les utilisateurs de la bdd MAIS on récupère aussi tous les password hashé
        // ATTENTION : pas TOP le password !

        // on va transformer les utilisateurs de la db avec password en USerDTO qui est un User sans password (et role)
        // const userAvecLastNameEnMaj = users.map(user => user.lastname.toUpperCase());
        // ...user -> outil de décomposition d'un objet (fonctionne aussi sur les tableaux)
        // ne fonctionne pas pour le moment (mise à jour)
        
        const userDTO = users.map(userMapperToDTO);
        res.status(200).json(userDTO);

        // res.status(200).json(users);
    },
    getById : async (req, res) => {
        // on récupère dans la requête, l'id dans les paramètres
        const id = req.params.id;
        // on fait la requête pour récupérer l'utilisateur avec cet id
        const user = await User.findById(id);
        // on vérifie qu'on a bien récupéré un utilisateur
        // si pas trouvé, erreur 404
        if (!user) {
            return res.sendStatus(404);   // Not Found -> élément non trouvé
        }
        //Si trouvé : On doit le transformer en userDTO avant de le renvoyer
        const userDTO = userMapperToDTO(user);
        res.status(200).json(userDTO);
    },
    update : async (req, res) => {
        // On a besoin de récupérer l'id de l'utilisateur qu'on veut modifier
        const id = req.params.id;

        const { pseudo, email, firstname, lastname } = req.body;
        // on appelle la fonction qui permet de trouver l'élément via son id et de le modifier
        // La fonction findByIdAndUpdate prend :
            // en 1er paramètre : l'id à trouver
            // en 2e paramètre : un objet qui contient les propriétés qu'on souhaite modifier
            // en 3e paramètre : un objet qui contient les options qu'on souhaite ajouter
        // l'option returnDocument: 'after ' nous permet de récupérer l'utilisateur APRES sa modification et non avant (ce qui est le comportement par défaut)
        const userUpdated = await User.findByIdAndUpdate(id, {
            pseudo,
            email,
            firstname,
            lastname,
        }, { returnDocument: 'after' });

        // On vérifie si notre id était existant
        if (!userUpdated) {
            return res.sendStatus(404);
        }
        // Deux choix : 
            // soit en envoie juste un status 200   ->   res.status(200)
            // soit, on doit transformer notre userUpdated (qui contient le password + le role) en userDTO (qui ne les contient pas)
        const userDTO = userMapperToDTO(userUpdated) 
        res.status(200).json(userDTO);
    },
    delete : async (req, res) => {
        // on a besoin de récupérer l'id de l'élément à supprimer
        const id = req.params.id;

        // on essaie de récupérer l'élément en DB et de la supprimer
        // La fonction findByIdAndDelete renvoie l'utilisaeur trouvé si id ok, sinon renvoie null
        const userToDelete = await User.findByIdAndDelete(id);

        // On vérifie si on a bien récupérer un userToDelete 
        if (!userToDelete) {
            return res.sendStatus(404);    // Not Found -> id ?
        }
        res.sendStatus(204); // Tout s'est bien passé, id trouvé, plus suppression faite
    },
}

module.exports = userController;