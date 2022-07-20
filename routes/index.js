const categoryRouter = require('./category-router');
const userRouter = require('./user-router');
const authRouter = require('./auth-router');
const taskRouter = require('./task-router');

// Création du router "parent"
// ---------------------------
const router = require('express').Router();


// localhost:8080/category

// Paramétrer toutes les routes
// (.category => categoryRouter);
// (.tasks => categoryTasks);

// Nous indiquons qu'à l'arrivée sur le segment /category, nous devons charger le routeur "enfant" category-router ou autre...
// router.use('path', 'handler');
router.use('/category', categoryRouter);
// Tant qu'on n'a pas implémenté les fonctionnalités liées à notre route, on envoie une erreur 501
// router.use('/task', (req, res) => { res.sendStatus(501); });
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);




// On exporte notre router "parent"
module.exports = router;

