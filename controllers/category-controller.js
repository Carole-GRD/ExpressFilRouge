const Category = require('../models/category-model');


// On crée notre categoryController, qui va contenir toues les fonctions appelées par chaque route
const categoryController = {
    // Toutes ces fonctions devront être asynchrones, on veut pouvoir lancer plusieurs requêtes en même temps 
    // et ne traiter le résultat qu'une fois récupéré ou non de la DB
    getAll : async (req, res) => {
        // console.log('Récupération de toutes les catégories.'); 
        // res.sendStatus(501); 
        const categories = await Category.find();
        res.status(200).json(categories);
    },
    getById : async (req, res) => {
        // console.log(`Récupération de la catégorie dont l'id est [${req.params.id}]`);
        // res.sendStatus(501);
        // 1) on récupère l'id placé en paramètre
        const id = req.params.id;
        // 2) on effectue la requête en base de données, en fournissant l'id de la catégorie recherchée
        // 2.5) on stocke le résultat de cette requête dans une constante category
        const category = await Category.findById(id);
        // 3) on teste si on a effectivement reçu une catégroie
        console.log(category);   // -> renvoie null si pas de catégorie
        // res.sendStatus(200);   // pour tester la requête
        if(category){
            // Si catégorie n'est pas null, on renvoie un status 200 et la catégorie obtenue
            res.status(200).json(category);
        }
        else{
            // Si la catégorie est null, on renvoie une erreur 404 -> Ressource not found
            return res.sendStatus(404);
        }
    },
    create : async (req, res ) => {
        // console.log('Création d\'une nouvelle catégorie');
        // res.sendStatus(501);
        const categoryToAdd = Category(req.body);
        // console.log(req.body);               // "req.body" ou bien "categoryToAdd"
        console.log(categoryToAdd);     
        await categoryToAdd.save();
        res.status(200).json(categoryToAdd);
    },
    update : async (req, res) => {
        // console.log(`Modification de la catégorie dont l'id est [${req.params.id}]`);
        // res.sendStatus(501);
        // 1) on récupère l'id placé en paramètre
        const id = req.params.id;
        // findByIdAndUpdate(id, {}, {})
        // 1er paramètre : id 
        // 2e paramètre : object avec les éléments à remplacer
        // 3e paramètre : les options
        const category = await Category.findByIdAndUpdate(id, {
            name: req.body.name,
            icon: req.body.icon,
        }, {returnDocument: 'after'});
        // Le comportement par défaut du findByIdAndUpdate renvoie l'élément avant qu'il ne soit modifié
        // Si on veut récupérer
        if (category){
            res.status(200).json(category);
        }
        else{
            return res.sendStatus(404);
        }
    },
    delete : async (req, res) => {
        // console.log(`Suppression de la catégorie dont l'id est [${req.params.id}]`);
        // res.sendStatus(501);
        // 1) on récupère l'id placé en paramètre
        const id = req.params.id;
        // 2) La fonction findByIdAndDelete renvoie l'élément qui a été delete si trouvé, sinon, renvoie null
        const categoryToDelete = await Category.findByIdAndDelete(id);
        // on doit vérifier si categoryToDelete n'est pas null
        if (categoryToDelete){
            res.sendStatus(204);   // la requête a réussie mais l'appli client n'a pas besoin de quitter la page
            // res.sendStatus(200);   // Fonctionne aussi, ce sera soit l'une soit l'autre
        }
        else{
            return res.sendStatus(404);    // -> Si categoryToDelete est null, c'est que l'id recherché n'existe pas : Not found
        }
    },
};

    // Opérations CRUD
    // C -> Create
    // R -> Read
    // U -> Update
    // D -> Delete

// On exporte notre controller
module.exports = categoryController;