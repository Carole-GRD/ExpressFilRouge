const { Schema, model } = require('mongoose');

// Création du Schema
const userSchema = new Schema({
    pseudo : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    password : {
        type : String,        // '1234test' -> hash : 'kvjxok545dsf655sdfkslkf545464sdfn'
        required : true,
    },
    firstname : {
        type : String,
        required : true,
        trim : true,
    },
    lastname : {
        type : String,
        required : true,
        trim : true,
    }, 
    role : {
        type : String,
        enum : ['User', 'Moderator', 'Admin'],
        required : true,
        default : 'User',
    },
}, {
    collection : 'User',
    timestamps : true,
});




// Création d'un model User à parti du Schema
const User = model('User', userSchema);

// On export le model
module.exports = User;
