const categoryRouter = require('./category-router');

// Création du router "parent"
const router = require('express').Router();


// localhost:8080/category

// Paramétrer toutes les routes
// (.category => categoryRouter);
// (.tasks => categoryTasks);

// Nous indiquons qu'à l'arrivée sur me segment /category, nous devons charger le routeur enfant categor-routeur
// router.use('path', 'handler');
router.use('/category', categoryRouter);
router.use('/task', (req, res) => res.sendStatus(501));
router.use('/user', (req, res) => res.sendStatus(501));
router.use('/auth', (req, res) => res.sendStatus(501));




// On exporte notre router parent
module.exports = router;

