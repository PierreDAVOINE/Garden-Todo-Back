// Connexion à la base de données
const client = require('./pg.client');

const datamapper = {
  //Va créer un compte utilisateur
  create: async (user) => {
    const { user_name, email, cryptedPassword, city } = user;
    const newUser = await client.query(
      'INSERT INTO utilisateur (user_name, email, user_password, city) VALUES ($1, $2, $3, $4) RETURNING *;',
      [user_name, email, cryptedPassword, city]
    );
    return newUser.rows[0];
  },

  //Recherche s'il y a déjà un compte existant pour ce mail (pour l'inscription)
  findByEmail: async (email) => {
    const findEmail = await client.query(
      'SELECT * FROM utilisateur WHERE email = $1;',
      [email]
    );
    return findEmail.rows[0] || null;
  },

  // Recherche s'il y a déjà un compte existant pour ce mail en excluant l'id de l'utilisateur (pour la modification)
  findByEmailAndId: async (email, userId) => {
    const findEmail = await client.query(
      'SELECT * FROM utilisateur WHERE email = $1 AND id != $2;',
      [email, userId]
    );
    return findEmail.rows[0] || null;
  },

  //Va supprimer un compte utilisateur
  deleteUser: async (userId) => {
    await client.query('DELETE FROM utilisateur WHERE id = $1;', [userId]);
  },
  //Recherche un utilisateur par son id
  findById: async (userId) => {
    const user = await client.query(
      'SELECT * FROM utilisateur WHERE id = $1;',
      [userId]
    );
    return user.rows[0] || null;
  },

  //Va modifier un compte utilisateur
  updateUser: async (user) => {
    const { userName, userEmail, userPassword, userCity, userId } = user;
    await client.query(
      'UPDATE utilisateur SET user_name = $1, email = $2, user_password = $3, city = $4 WHERE id = $5;',
      [userName, userEmail, userPassword, userCity, userId]
    );
    const updatedUser = await client.query(
      'SELECT * FROM utilisateur WHERE id = $1;',
      [userId]
    );
    return updatedUser.rows[0];
  },

  //Va récupérer les infos d'un utilisateur via son id
  getOneUser: async (userId) => {
    const user = await client.query(
      'SELECT * FROM utilisateur WHERE id = $1;',
      [userId]
    );
    return user.rows || null;
  },

  //Récupère l'utilisateur via son email et son mot passe, permet la connexion
  loginUser: async (user) => {
    const { userEmail, userPassword } = user;
    const loggedUser = await client.query(
      'SELECT * FROM utilisateur WHERE email = $1 AND user_password = $2;',
      [userEmail, userPassword]
    );
    return loggedUser.rows[0] || null;
  },
};

module.exports = datamapper;
