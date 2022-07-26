// on importe notre module jsonwebtoken
const jwt = require('jsonwebtoken');

const { JWT_AUDIENCE, JWT_ISSUER, JWT_SECRET } = process.env;

const jwtUtils = {
    // Fonction pour générer un token
    generate : ({ id, pseudo, role }) => {
        // Notre fonction generate doit renvoyer une promesse
        // pour qu'on puisse vérifier par la suite si notre génération à réussie
        return new Promise((resolve, reject) => {
            // on récupère nos données pour créer le paylaod
            const payload = { id, pseudo, role };

            // création des options (du header)
            const options = {
                algorithm : 'HS512',    // HS256   
                expiresIn : '12h',
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER,
            }
            // Pour générer un token, nous aurons toujours besoin 
                // D'un header/options qui contient toues les infos sur le token (types, algo, expiration...)
                // d'un payload : les données de l'utilisateur qu'on veut stocker dans le jeton //  ATTENTION : JAMAIS DE PASSWORD
                // le secret : Signature secrète détenue par l'api qui va nous permettre de générer et décoder notre token
                    // Cette information ne doit jamais être mise en clair dans le code ni push sur un git
                    // sinon n'importe qui peut décoder notre jeton

            // jwt.sign('payload', 'secret', 'options/header', (error, token) =>{})
            jwt.sign(payload, JWT_SECRET, options, (error, token) =>{
                if (error) {
                    // si notre génération de token a produit une erreur, on passe notre promesse en rejetée
                    return reject(error);
                }
                // si la génération de notre token a fonctionnée, on résoud la requête en fournissant le token généré
                resolve(token);
            })
        })
    },

    // Fonction pour décoder un token
    decode : (token) => {
        // dans le cas où on n'a pas de token 
        if (!token) {
            return Promise.reject(new Error('No Token'));
        }
        // sinon on renvoie une promesse
        return new Promise((resolve, reject) => {
            // on crée les options pour faire notre décodage
            const options = {
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER,
            }

            // jwt.verify('token', 'secret', 'options/header', (error, payload) => {});
            // payload = data
            jwt.verify(token, JWT_SECRET, options, (error, payload) => {
                // sin on n'a pas réussi à décoder
                if (error) {
                    return reject(error);
                }
                // si on a réussi à décoder, on résoud la promesse en renvoyant le payload/les data
                resolve(payload);
            });
        })
    }
}

module.exports = jwtUtils;