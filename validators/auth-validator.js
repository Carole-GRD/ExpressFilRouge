const yup = require('yup');

// Regex qui vérifie que le mdp contient au moins un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).+$/;

// on crée le model de validation pour le body du register
// Ex.: 
// {
// 	"pseudo": "Carole-GRD",
// 	"email": "gerard.carole@skynet.be",
// 	"firstname": "Carole",
// 	"lastname": "Gérard",
// 	"password": "1234test"
// }
const registerValidator = yup.object({
    pseudo : yup.string().trim().required().min(3).max(50),
    email : yup.string().trim(). email().required().max(255),
    firstname : yup.string().trim().required().max(150),
    lastname : yup.string().trim().required().max(150),
    password : yup.string().required().min(8).max(64).matches(pwdRegex),
});


// on crée le model de validation pour le body du login
// Ex.:
// {
// 	"credential": "Carole-GRD",
// 	"password": "1234test"
// }
const loginValidator = yup.object({

});




module.exports = { registerValidator, loginValidator };
