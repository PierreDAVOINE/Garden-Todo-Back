const express = require('express');

//Importe le controller api
const controller = require('../controllers/api.controller');
//Importe le middleware d'authentification
const auth = require('../middleware/auth.middleware');

const router = express.Router();

/*= ======================================
 * Définitions des routes Garden (jardin)
 *========================================*/

//Récupérer les plantes du jardin selon l'utilisateur
router.get('/:userId',auth.isLogged, controller.garden.getGarden);

//Ajouter une plante au jardin
router.post('/:userId',auth.isLogged, controller.garden.addPlant);

//Supprimer une plante du jardin
router.delete('/:userId/:plantId',auth.isLogged, controller.garden.deletePlant);

// Mettre à jour le dernier arrosage d'une plante
router.patch('/:userId/:plantId',auth.isLogged, controller.garden.updateLastWatering);



module.exports = router;