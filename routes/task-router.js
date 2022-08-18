const taskController = require('../controllers/task-controller');
const bodyValidation = require('../middlewares/body-validation');
const idValidator = require('../middlewares/idValidator');
const { insertTaskValidator, updateTaskValidator } = require('../validators/task-validator');
const authentication = require('../middlewares/auth-jwt-middleware');


const taskRouter = require('express').Router();

taskRouter.route('/')
    .get(authentication(), taskController.getAll)      // Etre connecté
    .post(authentication(), bodyValidation(insertTaskValidator), taskController.create);     // Etre connecté      

taskRouter.route('/:id')
    .get(authentication(), idValidator(), taskController.getById)
    .put(authentication(), idValidator(), bodyValidation(updateTaskValidator), taskController.update)
    .delete(authentication(['Admin']), idValidator(), taskController.delete);    // Etre connecté + Admin

taskRouter.route('/category/:id')
    .get(authentication(), idValidator(), taskController.getByCategory);

taskRouter.route('/user/:id')
    .get(authentication(), idValidator(), taskController.getByUser);

module.exports = taskRouter;