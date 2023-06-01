const express = require("express");

//Importe le controller api
const controller = require("../controllers/api.controller");
//Importe le middleware d'authentification et de validation
const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation.middleware");

const router = express.Router();

/*= ===========================
 * Définitions des routes utilisateurs
 *============================== */

//Créer un compte
router.post("/signup", validation.validateUser, controller.users.createUser);

//Se connecter
router.post("/login", validation.validateLogin, controller.users.login);

//Modifier son compte
router.patch(
  "/:userId",
  auth.isLogged,
  validation.validateUpdateUser,
  controller.users.updateUser
);

//Récupérer les informations de son compte
router.get("/:userId", auth.isLogged, controller.users.getOneUser);

//Supprimer son compte
router.delete("/:userId", auth.isLogged, controller.users.deleteUser);

module.exports = router;
