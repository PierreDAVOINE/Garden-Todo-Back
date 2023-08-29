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
      // On appelle la méthode getOnePlant du datamapper en lui passant le slug_name de la plante
      // On stocke le résultat dans une constante "plant"
      const plant = await datamapper.getOnePlant(plantSlug);

      // Si pas de plante trouvée on renvoi un code 404
      if (!plant) {
        return res.status(404).json({
          message: "Cette plante n'éxiste pas dans notre base de données.",
        });
      }
      // Sinon on renvoie la plante en JSON
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
    // On récupère le nom de la plante dans l'url de la requête
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
