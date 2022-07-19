const categoryRouter = require('./category-router');
const userRouter = require('./user-router');
const authRouter = require('./auth-router');
const taskRouter = require('./task-router');

// Création du router "parent"
const router = require('express').Router();


// localhost:8080/category

// Paramétrer toutes les routes
// (.category => categoryRouter);
// (.tasks => categoryTasks);

// Nous indiquons qu'à l'arrivée sur le segment /category, nous devons charger le routeur "enfant" category-router ou autre...
// router.use('path', 'handler');
router.use('/category', categoryRouter);
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);




// On exporte notre router parent
module.exports = router;

