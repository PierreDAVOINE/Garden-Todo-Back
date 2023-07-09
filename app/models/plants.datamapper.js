// Connexion à la base de données
const client = require('./pg.client');

const datamapper = {
  //Va chercher toutes les plantes triées par ordre alphabétique
  getPlants: async () => {
    const plants = await client.query(
      'SELECT * FROM plant ORDER BY plant_name;'
    );
    return plants.rows;
  },

  // Va chercher une plante selon son slug_name
  getOnePlant: async (plantSlug) => {
    // On utilise le slug_name pour récupérer la plante
    const plant = await client.query(
      'SELECT * FROM plant WHERE slug_name =$1;',
      [plantSlug]
    );
    // Si la plante n'existe pas on renvoie null
    if (plant.rowCount === 0) {
      return null;
    }
    // Sinon on renvoie la plante
    return plant.rows[0];
  },

  //Va chercher une plante selon son nom
  // LIKE '%' || $1 || '%' permet de chercher un nom de plante même si on ne le connait pas en entier
  getNamePlant: async (plantName) => {
    const plant = await client.query(
      "SELECT * FROM plant WHERE LOWER(plant_name) LIKE '%' || $1 || '%'",
      [plantName.toLowerCase()]
    );

    if (plant.rowCount === 0) {
      return null;
    }
    return plant.rows;
  },
};

// Export pour utiliser les données
module.exports = datamapper;
