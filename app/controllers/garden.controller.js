const datamapper = require('../models/garden.datamapper');

const controller = {
  //!Affiche la liste des plantes présentes dans le jardin de l'utilisateur
  getGarden: async (req, res) => {
    // On récupère l'id de l'utilisateur dans l'URL
    const { userId } = req.params;

    try {
      //Appel et envoi des donneés
      const garden = await datamapper.getGarden(userId);

      return res.json(garden);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Une erreur est survenue lors de la recherche des plantes.',
      });
    }
  },

  //!Ajoute une plante au jardin de l'utilisateur
  addPlant: async (req, res) => {
    const { userId } = req.params;
    // On récupère l'id de la plante dans le body
    const plantId = req.body.plantId;

    try {
      //Récupération de l'ensemble de la plante
      const plant = await datamapper.findPlant(plantId);

      // Vérification de l'existence de la plante dans le jardi pour pas de doublon
      const plantExist = await datamapper.plantExist(userId, plantId);

      //Gestion de l'erreur si la plante est déjà dans le jardin
      if (plantExist) {
        return res
          .status(208)
          .json({ message: 'Cette plante est déjà dans votre jardin !' });
      }

      // Ajout de la plante dans le jardin
      const newPlant = await datamapper.addPlant(userId, plant);
      return res.json(newPlant);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Une erreur est survenue lors de l'ajout de plante.",
      });
    }
  },

  //!Supprime une plante du jardin de l'utilisateur
  deletePlant: async (req, res) => {
    const { userId, plantId } = req.params;

    try {
      //Vérification de l'existence de la plante dans le jardin
      const plantExist = await datamapper.plantExist(userId, plantId);

      if (!plantExist) {
        return res.status(404).json({
          message:
            'Impossible de trouver la plante, si le problème persiste, actualisez votre page.',
        });
      }

      //Suppression de la plante du jardin si la plante est bien dans le jardin
      await datamapper.deletePlant(userId, plantId);
      return res.json({
        message: 'La plante a bien été supprimée de votre jardin.',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Une erreur est survenue lors de la suppression de plante.',
      });
    }
  },

  //! Met à jour le dernier arrosage d'une plante par l'utilisateur
  updateLastWatering: async (req, res) => {
    const { userId, plantId } = req.params;

    try {
      //Vérification de l'existence de la plante dans le jardin
      const plantExist = await datamapper.plantExist(userId, plantId);

      if (!plantExist) {
        return res.status(404).json({
          message:
            'Impossible de trouver la plante, si le problème persiste, actualisez votre page.',
        });
      }

      //Mise à jour du dernier arrosage de la plante
      await datamapper.updateLastWatering(userId, plantId);
      return res.json({
        message: 'La plante a bien été arrosée.',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: `Un probleme est survenu.` });
    }
  },
};

module.exports = controller;
