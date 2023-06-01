const Joi = require("joi");

// Joi passe les information dans les regex et renvoie une erreur si les informations ne sont pas correctes
module.exports = Joi.object({
  // Cette regex permet de vérifier que le slug ne contient que des lettres minuscules et des tirets du bas
  plantSlug: Joi.string().pattern(/^[a-z_]+$/),
  // Cette regex permet de vérifier que le nom de la plante ne contient que des lettres (accents compris) et des espaces
  plantName: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/),
});
