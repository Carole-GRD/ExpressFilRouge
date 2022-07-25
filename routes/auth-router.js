const authController = require('../controllers/auth-controller');
const bodyValidation = require('../middelwares/body-validation');
const { registerValidator } = require('../validators/auth-validator');

const authRouter = require('express').Router();

authRouter.route('/login')
    .post(authController.login);

authRouter.route('/register')
    .post(bodyValidation(registerValidator) ,authController.register);


    // OU BIEN
// authRouter.post('/login', authController.login);
// authRouter.post('/register', authController.register);

module.exports = authRouter;