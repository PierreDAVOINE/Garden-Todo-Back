// Connexion à la base de données
const client = require("./pg.client");

const datamapper = {
  //Récupère la liste des plantes dans le jardin de l'utilisateur
  getGarden: async (userId) => {
    const garden = await client.query(
      "SELECT * FROM plant INNER JOIN own ON plant.id = own.plant_id WHERE own.user_id = $1;",
      [userId]
    );
    return garden.rows;
  },

  //Récupère une plante via son id
  findPlant: async (plantId) => {
    const plant = await client.query("SELECT * FROM plant WHERE id = $1;", [
      plantId,
    ]);
    return plant.rows[0] || null;
  },

  //Vérifie si la plante est déjà dans le jardin de l'utilisateur
  plantExist: async (userId, plantId) => {
    const plantExist = await client.query(
      "SELECT * FROM own WHERE user_id = $1 AND plant_id = $2;",
      [userId, plantId]
    );
    return plantExist.rows[0] || null;
  },

  //Ajoute la plante dans le jardin de l'utilisateur
  addPlant: async (userId, plant) => {
    // Ajoute la plante dans la table own
    await client.query(
      "INSERT INTO own (user_id, plant_id) VALUES ($1, $2) RETURNING *;",
      [userId, plant.id]
    );
    // Récupère les informations de la plante par rapport a la table own
    const garden = await client.query(
      "SELECT * FROM plant JOIN own ON own.plant_id = $1 AND own.plant_id = plant.id WHERE own.user_id = $2;",
      [plant.id, userId]
    );
    return garden.rows[0];
  },

  //Supprime la plante du jardin de l'utilisateur
  deletePlant: async (userId, plantId) => {
    await client.query(
      "DELETE FROM own WHERE user_id = $1 AND plant_id = $2;",
      [userId, plantId]
    );
  },

  //Met à jour le dernier arrosage de la plante
  updateLastWatering: async (userId, plantId) => {
    await client.query(
      "UPDATE own SET last_watering = NOW() WHERE user_id = $1 AND plant_id = $2;",
      [userId, plantId]
    );
  },
};

// Export pour utiliser les données
module.exports = datamapper;
