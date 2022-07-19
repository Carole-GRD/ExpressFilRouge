// // Pour utiliser dotenv, on doit l'importer
// let dotenv = require("dotenv-flow");

// // Pour charger tous nos fichiers .env.*
// dotenv.config();

// pas nécessaire de le stocker dans une variable car on ne va plus l'utiliser par la suite
// ATTENTION -> la config de l'envirronement doit être faite en tout début de projet
require('dotenv-flow').config();

// console.log(process.env);
// on extrait de process.env, les variables d'environnement dont on aura besoin par la suite
const { NODE_ENV, MESSAGE, PORT } = process.env;
console.log( 'Lancé en', NODE_ENV, ':', MESSAGE);

// Création d'un serveur Express
// doit se faire au dessus du code
    // 1) Toujours faire en premier : importer le module express et le stocker dans une variable
const express = require('express');
    // 2) On crée le serveur et on le stocke dans une variable
    // On importe notre module router présent dans index.js en important tout le dossier routes
const router = require('./routes');
    // on crée une instance du module Express ????
const app = express();

// Mise en place d'une route temporaire
// app.get('/users', (req,res) => {
//     console.log(req.url);
//     const data = {
//         msg : 'Coucou'
//     }
//     res.json(data);
// });


// #region route temporaire

// On indique à notre serveur, qu'à l'arrivée sur la route /api, il doit utiliser notre module router
app.use('/api', router);


// On met le serveur sur "écoute" sur le port précisé dans la variable d'environnement "PORT"
app.listen(PORT, () => {
    console.log(`Server up on port : ${PORT} [${NODE_ENV}]`);
});






