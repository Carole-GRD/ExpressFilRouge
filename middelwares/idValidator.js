const mongoose = require("mongoose");

const idValidator = () => {
    return (req, res, next) => {
        // On récupère l'id de la requête
        const id = req.params.id;
        // Si l'id nest pas un Object valide..
        if ( !mongoose.isValidObjectId(id)) 
        {
            // On envoie une erreur 404
            res.sendStatus(400);    // Bad Request => La requête n'est pas bonne
        }
        // Sinon, on continue la requête grâce au next
        next();
    }
}

module.exports = idValidator;