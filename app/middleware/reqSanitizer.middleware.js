const sanitizer = require('sanitizer');

const reqSanitizer = (req, res, next) => {
  // Si on a des données dans le body
  if (req.body) {
    // On parcours les données du body
    for (let key in req.body) {
      // Si la donnée est un tableau
      if (Array.isArray(req.body[key])) {
        // On parcours les données du tableau (le seule tableau que le front envoie est un tableau d'objet)
        for (let key2 in req.body[key]) {
          // On vérifie quand même qu'il s'agit bien d'un objet
          if (typeof req.body[key][key2] === 'object') {
            // On parcours les données de l'objet
            for (let key3 in req.body[key][key2]) {
              // On sanitize les données
              req.body[key][key2][key3] = sanitizer.escape(
                req.body[key][key2][key3]
              );
            }
          } else {
            // Si ce n'est pas un objet, on sanitize les données du tableau
            req.body[key][key2] = sanitizer.escape(req.body[key][key2]);
          }
        }
      } else {
        // Si ce n'est pas un tableau, on sanitize les données directement
        req.body[key] = sanitizer.escape(req.body[key]);
      }
    }
    // Même chose avec les données des paramètres de l'url
    if (req.params) {
      for (let key in req.params) {
        req.params[key] = sanitizer.escape(req.params[key]);
      }
    }
    next();
  }
};

module.exports = reqSanitizer;
