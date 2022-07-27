const taskController = require('../controllers/task-controller');


const taskRouter = require('express').Router();

taskRouter.route('/')
    .get(taskController.getAll)
    .post(taskController.create);

taskRouter.route('/:id')
    .get(taskController.getById)
    .put(taskController.update)
    .delete(taskController.delete);

taskRouter.route('/category/:categoryname')
    .get(taskController.getByCategory);

taskRouter.route('/user/:username')
    .get(taskController.getByUser);

module.exports = taskRouter;