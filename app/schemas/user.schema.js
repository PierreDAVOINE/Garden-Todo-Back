const Joi = require("joi");

module.exports = Joi.object({
  // Cette regex permet d'accepter les caractères spéciaux comme les accents, la validation accepte les champs vides
  user_name: Joi.string()
    .regex(/^[\p{L}\p{M}'-]+$/u)
    .allow("")
    .optional(),

  // Cette validation permet de vérifier que le mot de passe comprends au moins 6 caractères, la validation accepte les champs vides
  user_password: Joi.string()
    .min(6)
    .allow("")
    .optional()
    .custom((value, helpers) => {
      if (value === "") {
        return helpers.error("any.empty");
      }
      return value;
    }),

  // Cette regex permet d'accepter les caractères spéciaux comme les accents, la validation accepte les champs vides et les tirets
  city: Joi.string()
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]*$/u)
    .allow("")
    .optional(),
});
