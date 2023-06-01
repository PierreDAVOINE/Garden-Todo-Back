const schema = require("../schemas/api.schema");
const emailValidator = require("email-validator");

// validateMiddleware permet de valider les données reçues par l'API via des foprmulaires
const validateMiddleware = {
  //!Validation du slug_name de la plante
  validatePlantSlug: async (req, res, next) => {
    const { plantSlug } = req.params;

    try {
      if (plantSlug) {
        //On valide les données
        const validateData = schema.plants.validate({
          plantSlug,
        });

        //Gestion de l'erreur
        if (validateData.error) {
          throw new Error(validateData.error);
        }
      }
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la recherche de la plante.");
    }
  },

  //!Validation du nom de la plante
  validatePlantName: async (req, res, next) => {
    const { plantName } = req.params;
    try {
      if (plantName) {
        const validateData = schema.plants.validate({
          plantName,
        });
        if (validateData.error) {
          throw new Error(validateData.error);
        }
      }
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la recherche de la plante.");
    }
  },

  //!Validation de l'inscription de l'utilisateur
  validateUser: async (req, res, next) => {
    const { user_name, email, user_password, city } = req.body;
    try {
      if (user_name || email || user_password) {
        let validateData = {};
        if (!city) {
          validateData = schema.users.validate({
            user_name,
            user_password,
          });
        } else {
          validateData = schema.users.validate({
            user_name,
            user_password,
            city,
          });
        }
        // On utilise le package emailValidator pour valider l'email
        const emailValid = emailValidator.validate(email);
        if (validateData.error || !emailValid) {
          throw new Error(validateData.error || "Email invalide.");
        }
      }
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la recherche de la plante.");
    }
  },

  //!Validation de la modification du compte de l'utilisateur

  validateUpdateUser: async (req, res, next) => {
    const { user_name, email, user_password, city } = req.body;

    try {
      if (user_name || email || user_password || city) {
        let validateData = {};
        if (!city) {
          validateData = schema.users.validate({
            user_name,
            user_password,
          });
        } else {
          validateData = schema.users.validate({
            user_name,
            user_password,
            city,
          });
        }
        const emailValid = emailValidator.validate(email);
        if (validateData.error || !emailValid) {
          throw new Error(validateData.error || "Email invalide.");
        }
      }
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(
          "Une erreur est survenue lors de la modification de l'utilisateur."
        );
    }
  },

  //!Validation de la connexion de l'utilisateur
  validateLogin: async (req, res, next) => {
    const { email, user_password } = req.body;
    try {
      if (email && user_password) {
        const validateData = schema.users.validate({
          user_password,
        });
        const emailValid = emailValidator.validate(email);
        if (validateData.error || !emailValid) {
          throw new Error(validateData.error || "Email invalide.");
        }
      }
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la connexion de l'utilisateur.");
    }
  },

  //!Validation de la création d'une tâche
  validateTask: async (req, res, next) => {
    const { newTask, position } = req.body;
    try {
      if (newTask && position) {
        const validateData = schema.todo.validate({
          newTask,
          position,
        });
        if (validateData.error) {
          throw new Error(validateData.error);
        }
      }
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la connexion de l'utilisateur.");
    }
  },

  //!Validation de la modification d'une tâche
  validateUpdateTask: async (req, res, next) => {
    let { updateTask, updateStatut, updatePosition } = req.body;
    try {
      if (updateTask || updateStatut || updatePosition) {
        const validateData = schema.todo.validate({
          updateTask,
          updateStatut,
          updatePosition,
        });
        if (validateData.error) {
          throw new Error(validateData.error);
        }
      }
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la connexion de l'utilisateur.");
    }
  },
};

module.exports = validateMiddleware;
