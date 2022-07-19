// // Pour utiliser dotenv, on doit l'importer
// let dotenv = require("dotenv-flow");

// // Pour charger tous nos fichiers .env.*
// dotenv.config();

// pas nécessaire de le stocker dans une variable car on ne va plus l'utiliser par la suite
// ATTENTION -> la config de l'envirronement doit être faite en tout début de projet
require('dotenv-flow').config();

// console.log(process.env);
// on extrait de process.env, les variables d'environnement dont on aura besoin par la suite
const { MESSAGE, NODE_ENV } = process.env;
console.log( 'Lancé en', NODE_ENV, ':', MESSAGE);


