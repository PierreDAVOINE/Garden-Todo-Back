const datamapper = require("../models/plants.datamapper");

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
        throw new Error("La plante n'existe pas.");
      }
      return res.json(plant);
    } catch (err) {
      console.error(err);
      res.status(404).send("La plante n'existe pas.");
    }
  },

  //!Affiche une plante de la BDD en fonction de son nom
  getNamePlant: async (req, res) => {
    const { plantName } = req.params;
    //Gestion de l'erreur

    try {
      //Appel et envoi des donneés
      const plant = await datamapper.getNamePlant(plantName);

      if (!plant) {
        throw new Error(
          "Une erreur est survenue lors de la recherche de la plante."
        );
      }

      return res.json(plant);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .send("Une erreur est survenue lors de la recherche de la plante.");
    }
  },
};

module.exports = controller;
