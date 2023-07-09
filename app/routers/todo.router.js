const express = require('express');

//Importe le controller api
const controller = require('../controllers/api.controller');
//Importe le middleware d'authentification et de validation
const auth = require('../middleware/auth.middleware');
const validation = require('../middleware/validation.middleware');

const router = express.Router();

/*=============================
 * Définitions des routes todos
 *============================== */

//Récupérer de toutes les tâches
router.get('/:userId', auth.isLogged, controller.todo.getTasks);

//Ajouter une tâche
router.post(
  '/:userId',
  auth.isLogged,
  validation.validateTask,
  controller.todo.addOneTask
);

//Supprimer une tâche
router.delete('/:userId/:taskId', auth.isLogged, controller.todo.deleteOneTask);

//Modifier une tâche
router.patch(
  '/:userId/:taskId',
  auth.isLogged,
  validation.validateUpdateTask,
  controller.todo.updateOneTask
);

//Modifier l'ordre des tâches
router.patch('/:userId', auth.isLogged, controller.todo.updateTasks);

module.exports = router;
