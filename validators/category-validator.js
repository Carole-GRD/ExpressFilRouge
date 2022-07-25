const yup = require('yup');

const categoryValidator = yup.object({
    name : yup.string().required().trim().max(50),
    // on ne met pas "unique" car on n'a pas de moyen de vérifier en base de données à ce moment où l'utilisateur entre une requête
    icon: yup.string().required().trim(),
})

module.exports = categoryValidator;