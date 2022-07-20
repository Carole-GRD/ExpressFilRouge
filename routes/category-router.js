// // On importe le module express
// const express = require('express');
// //  A partir de la méthode Router(), on construit un nouveau router qu'on appelle categoryRouter
// const categoryRouter = express.Router();

// Ou plus rapide en une ligne vu que l'import d'express nous sert à appeler la méthode Router() qui construit notre route
const categoryRouter = require('express').Router();

// Configuration des différentes routes
// ------------------------------------
// 2 Méthodes
// -----------
// localhost:8080/category/1

// // 1ere méthode
// // ------------
// // Méthode GET : Récupération de donées
// categoryRouter.get('/', (req, res) => {
//     console.log('Liste de toutes les catégories');
//     res.sendStatus(501);    // Erreur que l'on renvoie lorsque la fonctionnalité n'est pas enore implémentée
// });

// categoryRouter.get('/:id', (req, res) => {
//     console.log(`Récupération de la catégorie dont l'id est : ${req.params.id}`);
//     res.sendStatus(501);    // Erreur que l'on renvoie lorsque la fonctionnalité n'est pas enore implémentée
// });

// // Méthode POST : Ajout d'un nouvel élément
// categoryRouter.post('/', (req, res) => {
//     console.log('Envoie d\'une nouvelle catégorie');
//     res.sendStatus(501);    // Erreur que l'on renvoie lorsque la fonctionnalité n'est pas enore implémentée
// });

// // Méthode PUT : Modifier d'un élément en particulier
// categoryRouter.put('/:id', (req, res) => {
//     console.log(`Modification de la catégorie dont l'id est : ${req.params.id}`);
//     res.sendStatus(501);    // Erreur que l'on renvoie lorsque la fonctionnalité n'est pas enore implémentée
// });

// // Méthode DELETE : Supprimer d'un élément en particulier
// categoryRouter.delete('/:id', (req, res) => {
//     console.log(`Suppression de la catégorie dont l'id est : ${req.params.id}`);
//     res.sendStatus(501);    // Erreur que l'on renvoie lorsque la fonctionnalité n'est pas enore implémentée
// });

//////////////////////////  VERSUS  //////////////////////////

// 2e méthode
// ----------

// On peut remarquer que les routes '/' et '/:id' se répètent mais avec différentes méthodes (get, put, post, delete)
// Il existe une écriture raccourcie pour définir les routes
categoryRouter.route('/')
    .get((req, res) => { res.sendStatus(501); })      // Récupération de toutes les données
    .post((req, res) => { res.sendStatus(501); });    // Ajout d'une nouvelle catégorie

categoryRouter.route('/:id')
    .get((req, res) => { res.sendStatus(501); })      // Récupération d'une catégorie en particulier
    .put((req, res) => { res.sendStatus(501); })      // Modification d'une catégorie
    .delete((req, res) => { res.sendStatus(501); });  // Suppresion d'une catégorie   


// On exporte notre router ainsi créé et configuré
module.exports = categoryRouter;
