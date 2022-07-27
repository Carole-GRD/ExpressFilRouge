const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    // Schema en db
    
}, {
    // Les options
    collection : 'Task',
    timestamps : true,
});

const Task = ('Task', taskSchema);

module.exports = Task;