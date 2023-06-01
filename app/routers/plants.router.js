const express = require('express');

//Importe le controller api
const controller = require('../controllers/api.controller');
const plantController = require('../controllers/plants.controller');
//Importe le middleware de validation de données 
const validation = require('../middleware/validation.middleware');

const router = express.Router();

/*= ===========================
 * Définitions des routes plantes
 *============================== */

//Récupérer toutes les plantes et filtre possible par nom
router.get('/', plantController.getPlants);

//Récupérer une plante selon son slug name
router.get('/:plantSlug', validation.validatePlantSlug, controller.plants.getOnePlant);

//Récupérer une plante selon son nom
router.get('/search/:plantName',validation.validatePlantName, controller.plants.getNamePlant);



module.exports = router;