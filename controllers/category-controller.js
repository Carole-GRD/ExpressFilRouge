// On crée notre categoryController, qui va contenir toues les fonctions appelées par chaque route
const categoryController = {
    getAll : (req, res) => {console.log('Récupération de toutes les catégories'); },
    getById : (req, res) => { console.log(`Récupération de la catégorie dont l'id est [${req.params.id}]`); },
    create : (req, res ) => {console.log('Création d\'une nouvelle catégorie'); },
    update : (req, res) => { console.log(`Modification de la catégorie dont l'id est [${req.params.id}]`); },
    delete : (req, res) => { console.log(`Suppression de la catégorie dont l'id est [${req.params.id}]`); },
    // Opérations CRUD
    // C -> Create
    // R -> Read
    // U -> Update
    // D -> Delete
};

// On exporte notre controller
module.exports = categoryController;