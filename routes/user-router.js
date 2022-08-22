const userController = require('../controllers/user-controller');
const idValidator = require('../middlewares/idValidator');
const userValidator = require('../validators/user-validator');
const bodyValidation = require('../middlewares/body-validation');
const authentication = require('../middlewares/auth-jwt-middleware');


const userRouter = require('express').Router();

userRouter.route('/')
    .get(authentication(), userController.getAll);
    // .get(userController.getAll);

userRouter.route('/:id')
    .get(authentication(), idValidator(), userController.getById)
    .put(authentication(['Admin']), idValidator(), bodyValidation(userValidator), userController.update)
    .delete(authentication(['Admin']), idValidator(), userController.delete);

module.exports = userRouter;