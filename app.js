// // Pour utiliser dotenv, on doit l'importer
// let dotenv = require("dotenv-flow");

// // Pour charger tous nos fichiers .env.*
// dotenv.config();

// pas nécessaire de le stocker dans une variable car on ne va plus l'utiliser par la suite
// ATTENTION -> la config de l'envirronement doit être faite en tout début de projet pour charger les variables d'environnement
require('dotenv-flow').config();

// console.log(process.env);
// on extrait de process.env, les variables d'environnement dont on aura besoin par la suite
// (DB_CONNECTION pour se connecter à la base de donnée "MongoDB Compass")
// au début car on va utiliser ces variables
const { NODE_ENV, MESSAGE, PORT, DB_CONNECTION } = process.env;
console.log( 'Lancé en', NODE_ENV, ':', MESSAGE);

// Import du module mongoose
const mongoose = require('mongoose');


// Création d'un serveur Express
// ------------------------------
// doit se faire au dessus du code
    // 1) Toujours faire en premier : importer le module express et le stocker dans une variable
const express = require('express');
    // 2) On crée le serveur et on le stocke dans une variable
    // on crée une instance du module Express ????
const app = express();
// On importe notre module router présent dans index.js en important tout le dossier routes
const router = require('./routes');
// on importe la librairie aui gère les erreurs async await
require('express-async-errors');



// Mise en place d'une route temporaire
// ------------------------------------
// app.get('/users', (req,res) => {
//     console.log(req.url);
//     const data = {
//         msg : 'Coucou'
//     }
//     res.json(data);
// });

// Ajout d'un middelware pour permettre à notre serveur de lire des objets json en post
// ATTENTION : à mettre en premier middelware
app.use(express.json());

// on indique à notre app que pour chaque requête, elle doit l'intercepter
// On doit récupérer la requête avant d'utiliser le middelware qui dispatch vers nos routes :
    // Elle doit se trouver avant !
app.use(async(req, res, next) => {
    // On attend que la connection soit correctement établie
    await mongoose.connect(DB_CONNECTION);
    console.log('Connection réussie !');
    // une fois qu'elle est correctment établie, on passe à la suite de la requête
    next();
});

// #region route temporaire
// ------------------------
// On indique à notre serveur, qu'à l'arrivée sur la route /api, il doit utiliser notre module router
app.use('/api', router);



// On met le serveur sur "écoute" sur le port précisé dans la variable d'environnement "PORT"
// ------------------------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server up on port : ${PORT} [${NODE_ENV}]`);
});






