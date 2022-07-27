const userController = require('../controllers/user-controller');
const idValidator = require('../middlewares/idValidator');

const userRouter = require('express').Router();

userRouter.route('/')
    .get(userController.getAll);

userRouter.route('/:id')
    .get( idValidator(), userController.getById)
    .put( idValidator(), userController.update)
    .delete( idValidator(), userController.delete);

module.exports = userRouter;