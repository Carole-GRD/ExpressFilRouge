const Task = require("../models/task-model");

const taskController = {
    // Tous les getter
    getAll : () => {

    },
    getById : () => {

    },
    getByCategory : () => {

    },
    getByUser : () => {

    },

    // Creation
    create : async (req, res) => {
        const taskToAdd = Task(req.body);
        await taskToAdd.save();
        res.status(200).json(taskToAdd);
    },

    // Modification
    update : async (req, res) => {
        const id = req.params.id;
        const { name, description, categoryId, receiverUserId, status, expectedEndingDate} = req.body;
        const taskUpdated = await Task.findByIdAndUpdate(id, {
            name,
            categoryId,
            receiverUserId,
            status,
            description : description ? description : null,
            expectedEndingDate : expectedEndingDate ? expectedEndingDate : null,
        }, { returnDocument : 'after' });
        if (!taskUpdated) {
            return res.sendStatus(404);    // Not Found
        }
        res.sendStatus(204);
    },

    // Suppression
    delete : async (req, res) => {
        const id = req.params.id;
        const taskToDelete = await Task.findByIdAndDelete(id);
        if (!taskToDelete) {
            return res.sendStatus(404); // Not Found
        }
        res.sendStatus(204);
    },
}

module.exports = taskController;