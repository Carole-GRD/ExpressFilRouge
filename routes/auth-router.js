const authController = require('../controllers/auth-controller');

const authRouter = require('express').Router();

authRouter.route('/login')
    .post((req, res) => { res.sendStatus(501); });

authRouter.route('/register')
    .post(authController.register);


    // OU BIEN
// authRouter.post('/login', (req, res) => { res.sendStatus(501); });
// authRouter.post('/register', (req, res) => { res.sendStatus(501); });

module.exports = authRouter;