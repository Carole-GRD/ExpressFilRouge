const taskRouter = require('express').Router();

taskRouter.route('/')
    .get((req, res) => { res.sendStatus(501); })
    .post((req, res) => { res.sendStatus(501); });

taskRouter.route('/:id')
    .get((req, res) => { res.sendStatus(501); })
    .put((req, res) => { res.sendStatus(501); })
    .delete((req, res) => { res.sendStatus(501); });

taskRouter.route('/:categoryname')
    .get((req, res) => { res.sendStatus(501); });

taskRouter.route('/:username')
    .get((req, res) => { res.sendStatus(501); });

module.exports = taskRouter;