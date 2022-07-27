const User = require('../models/user-model');
const jwtUtils = require('../utils/jwt-utils');

// "roles" sera un tableau qui contient tous les roles qui ont accès à la route
// options = droit d'accès (ex.:majeur?)
const authentication = ( roles /*options*/) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        // console.log(authHeader);
        // console.log(req.header);
        // console.log(req.header['Authorization']);
        // console.log(req.header['Content-Type']);
        // On récupère dans le header, la valeur de la propriété authorization
            // On récupère une chaîne de caractère qui contient "Bearer letokenrestlongavecpleindechiffresetdelettresetc"
            // Si on veut récupérer seulement le token, on va devoir utiliser le split pour récup seulement lui  (et pas avec le type du token qui est "Bearer")
            // authHeader contient : "Bearer letokenrestlongavecpleindechiffresetdelettresetc"
            // [0] -> Bearer et [1] -> letokenrestlongavecpleindechiffresetdelettresetc

        // authHeader, si pas de token passé dans le header, sera null
        // On doit donc vérifier qu'il n'est pas null avant de faire le split ou non dessus
        const token = authHeader ? authHeader.split(' ')[1] : false;  
        // const token = authHeader && authHeader.split(' ')[1];   // idem avec syntaxe différente
        

        // Si nous n'avons pas récupéré de token
        //     (!token)    correspond à   (token == false)    
        //     ->   et cela c'est "true" donc on renvoie une erreur
        if (!token) {    
            return res.sendStatus(401);  // Unauthorized (-> nous ne sommes pas autorisés à accéder à cette route)
        }

        // Si on a un token, on va devoir le décoder
        let decodedToken;
        // dans jwt-utils.js -> on a une Promesse  
        // -> on utilise "try-catch" pour vérifier si la Promesse est "resolve"
        try{
            decodedToken = await jwtUtils.decode(token);
            // console.log(decodedToken);
            // si le décodage fonction, decodedToken ressemble à ceci :
            // decodedToken = {
            //     id : "51dsf52s4dffd",
            //     pseudo : "Oui-oui",
            //     role : "User"
            // }
        }
        catch (error){
            return res.sendStatus(403);  // Forbidden  
        }

        // Si on a réussi à le décoder, on valide les éventuelles options passées en paramètre
        // on vérifie si on a reçu un tableau de "roles"
        if (roles) {
            // On va vérifier en base de données si l'utilisateur à un des roles présents dans notre tableau
            // On vérifie toujours en DB et pas dans le decodedToken au cas où le rôle de la personne a été changé depuis la dernière connection
            // On récupère l'utilisateur connecté dans la bdd
            const userDB = await User.findById(decodedToken.id);
            // on récupère son rôle
            const userDBRole = userDB.role;
            // const userDBRole = await User.findById(decodedToken.id).role;

            if (!roles.includes(userDBRole)) {
                return res.sendStatus(403); // Forbidden (nous n'avons pas les droits)
            }
        }

        req.user = decodedToken;

        next();
}
}

module.exports = authentication;