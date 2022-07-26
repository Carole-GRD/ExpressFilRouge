// // On importe le module express
// const express = require('express');
// //  A partir de la méthode Router(), on construit un nouveau router qu'on appelle categoryRouter
// const categoryRouter = express.Router();

// Ou plus rapide en une ligne vu que l'import d'express nous sert à appeler la méthode Router() qui construit notre route
const categoryRouter = require('express').Router();

// Import du controller category 
const categoryController = require('../controllers/category-controller');
const idValidator = require('../middlewares/idValidator');
const bodyValidation = require('../middlewares/body-validation');
const categoryValidator = require('../validators/category-validator');
const authentication = require('../middlewares/auth-jwt-middleware');


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
// categoryRouter.use(idValidator());   // -> on va plutôt l'appeler pour chaque route où on a besoin de l'id   (voir categoryRouter.route('/:id'))  

categoryRouter.route('/')
    .get(authentication(), categoryController.getAll)       // Récupération de toutes les données
    .post(authentication(['Admin', 'Moderator']), bodyValidation(categoryValidator), categoryController.create);     // Ajout d'une nouvelle catégorie

// On rajoute notre middelware de validation de format de l'Id pour chaque route où on a besoin de valider l'id
categoryRouter.route('/:id')
    .get(authentication(), idValidator(), categoryController.getById)      // Récupération d'une catégorie en particulier
    .put(authentication(['Admin', 'Moderator']), idValidator(),bodyValidation(categoryValidator), categoryController.update)       // Modification d'une catégorie
    .delete(authentication(['Admin']), idValidator(), categoryController.delete);   // Suppresion d'une catégorie   


// On exporte notre router ainsi créé et configuré
module.exports = categoryRouter;
