const pg = require("pg");

const { Client } = pg;
require("dotenv").config();

const client = new Client(process.env.DATABASE_URL);

// On se connecte au client PG et on vérifie si il y a une erreur
client.connect((error) => {
  if (error) {
    console.error(
      "Une erreur a lieu à la connexion avec notre BDD : ",
      error.message
    );
  } else {
    console.log("Connection à la BDD réussie !");
  }
});

module.exports = client;
