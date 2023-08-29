const loginService = require('../services/login.service');

const authMiddleware = {
  // isLogged permet de vérifier si l'utilisateur est connecté
  isLogged: (req, res, next) => {
    // On récupère le id de l'utilisateur dans l'url
    const userId = req.params.userId;

    // Récupération du token dans le header de la requête s'il y en a un
    const token = req.headers.authorization?.replace('Bearer ', '');
    // Si pas de token :  error 401
    if (!token)
      return res.status(401).json({
        message: "Veuillez vous connecter afin d'accéder a ces informations.",
      });

    // On traduit le token
    const verifiedToken = loginService.getUser(token);

    // On calcule le timestamp de la date et heure actuelle
    // On divise par 1000 car le timestamp est en millisecondes et on le veux en secondes
    const now = Math.floor(Date.now() / 1000);

    //On vérifie si userId === verifiedToken.userId
    const verifiedUserId = verifiedToken.id;

    //Si le token est expiré :  error 401
    if (now >= verifiedToken.exp || userId != verifiedUserId)
      return res.status(401).json({
        message: "Veuillez vous connecter afin d'accéder a ces informations.",
      });

    // Si tout est ok, on passe au middleware suivant
    next();
  },
};

module.exports = authMiddleware;
