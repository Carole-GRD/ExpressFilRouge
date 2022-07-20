const { Schema, model } = require('mongoose');

// On crée le schema d'une catégorie, c'est-à-dire, ce à quoi une catégorie devrait ressembler en DB
    // le nom de catégorie est une chaîne de caracrère, unique, requise et nettoyé des espaces blancs à gauche et à droit
// new Schema() -> 2 paramètres
// 1er paramètre : schema
// 2e paramètre : options
// new Schema({description des champs, leurs types, etc}, {options sur l'entièreté de la catégorie})
const categorySchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    icon : {
        type : String,
        require : true,
        trim : true,
    }
}, {
    // Pour indiquer en BDD dans quelle collection on retrouve les catégories
    collection : 'Category',
    // Sauvegarde la date de création et dernière date de modification en bdd
    timestamps : true,
});

// On génère un model à partir du schemo qu'on a créé au desssus
const Category = model('Category', categorySchema);
model.exports = Category;

