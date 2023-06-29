const datamapper = require('../models/plants.datamapper');

const controller = {
  //!Affiche la liste des plantes dans notre BDD
  getPlants: async (req, res) => {
    const plants = await datamapper.getPlants();
    res.json(plants);
  },

  //!Affiche une plante de la BDD en fonction de son slug_name
  getOnePlant: async (req, res) => {
    const { plantSlug } = req.params;

    try {
      //Appel et envoi des données
      const plant = await datamapper.getOnePlant(plantSlug);

      // Gestion de la 404
      if (!plant) {
        return res.status(404).json({
          message: "Cette plante n'éxiste pas dans notre base de données.",
        });
      }
      return res.json(plant);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Un problème est survenue lors de la recherche de la plante.',
      });
    }
  },

  //!Affiche une plante de la BDD en fonction de son nom
  getNamePlant: async (req, res) => {
    const { plantName } = req.params;

    try {
      //Appel et envoi des donneés
      const plant = await datamapper.getNamePlant(plantName);

      if (!plant) {
        return res.status(404).json({
          message: "Cette plante n'éxiste pas dans notre base de données.",
        });
      }

      return res.json(plant);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Un problème est survenue lors de la recherche de la plante.',
      });
    }
  },
};

module.exports = controller;
