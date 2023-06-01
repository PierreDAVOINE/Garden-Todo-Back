const Joi = require("joi");

module.exports = Joi.object({
  // Cette validation permet de vérifier que newTasks comprends un string de 1 à 255 caractères
  newTask: Joi.string().min(1).max(255),

  // Cette validation permet de vérifier que newPosition comprends un nombre entier supérieur à 1
  position: Joi.number().integer().min(1),

  // Cette validation permet de vérifier que updateTask comprends un string de 1 à 255 caractères
  updateTask: Joi.string().min(1).max(255),

  // Cette validation permet de vérifier que updateStatut comprends un boolean
  updateStatut: Joi.boolean(),

  // Cette validation permet de vérifier que updatePosition comprends un nombre entier supérieur à 1
  updatePosition: Joi.number().integer().min(1),
});
