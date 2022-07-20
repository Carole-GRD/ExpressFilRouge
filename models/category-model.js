const { Schema, model } = require('mongoose');

// On crée le schema d'une catégorie, c'est-à-dire, ce à quoi une catégorie devrait ressembler en DB
// new Schema() prend 2 paramètres :
// 1er paramètre : Schema
// 2e paramètre : options
// new Schema({description des champs, leurs types, etc}, {options sur l'entièreté de la catégorie})
const categorySchema = new Schema({
    // Le nom de catégorie est une chaîne de caractère, unique, requise et nettoyée des espaces blancs à gauche et à droite
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    // L'icon de catégorie est une chaine de caractère, requise et nettoyée des espaces blancs à gauche et à droite
    icon : {
        type : String,
        require : true,
        trim : true,
    }
}, {
    // Pour indiquer en BDD dans quelle collection on retrouve les catégories
    collection : 'Category',
    // Sauvegarde la date de création et la dernière date de modification en bdd
    timestamps : true,
});

// On génère un model à partir du schema qu'on a créé au desssus
const Category = model('Category', categorySchema);
module.exports = Category;

