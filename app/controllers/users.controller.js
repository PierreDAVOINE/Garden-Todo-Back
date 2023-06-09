const datamapper = require('../models/users.datamapper');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const loginService = require('../services/login.service');

const controller = {
  //!Créer un compte
  createUser: async (req, res) => {
    //Récupération des données du formulaire
    const { user_name, email, user_password, city } = req.body;
    try {
      // Vérification de l'existence de l'adresse mail de l'utilisateur dans la BDD pour pas de doublon
      const userExists = await datamapper.findByEmail(email);
      if (userExists) {
        return res.status(401).json({ message: 'Cet email est déjà utilisé.' });
      }

      // Si données correctes, cryptage du mot de passe à l'aide du package bcrypt
      const cryptedPassword = await bcrypt.hash(user_password, saltRounds);

      // Création d'un nouvel utilisateur dans la BDD
      const newUser = await datamapper.create({
        user_name,
        email,
        cryptedPassword,
        city,
      });
      return res.json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la création de l'utilisateur.",
      });
    }
  },

  //!Supprimer son compte
  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await datamapper.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Aucun compte trouvé avec cette adresse.' });
      }
      await datamapper.deleteUser(userId);
      return res.send('Utilisateur supprimé.');
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la suppression de l'utilisateur.",
      });
    }
  },

  //!Modifier son compte
  updateUser: async (req, res) => {
    const { userId } = req.params;

    // Récupération des données du formulaire
    const { user_name, email, user_password, city } = req.body;
    console.log(req.body);
    try {
      // Va chercher le bon utilisateur dans la BDD
      const user = await datamapper.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      // Vérification de l'existence de l'adresse mail de l'utilisateur dans la BDD pour pas de doublon
      const userExists = await datamapper.findByEmailAndId(email, userId);
      console.log('exists? : ', userExists);
      if (userExists) {
        return res
          .status(401)
          .json({ message: "Impossible d'utiliser cet email." });
      }

      //Système pour que les champs non remplis ne soient pas modifiés
      let userName = user_name;
      if (!user_name) userName = user.user_name;

      let userEmail = email;
      if (!email) userEmail = user.email;

      let cryptedPassword = '';
      if (user_password) {
        cryptedPassword = await bcrypt.hash(user_password, saltRounds);
      }
      let userPassword = cryptedPassword;
      if (!user_password) userPassword = user.user_password;

      let userCity = city;
      if (!city) userCity = user.city;

      //Modification de l'utilisateur dans la BDD
      const updatedUser = await datamapper.updateUser({
        userName,
        userEmail,
        userPassword,
        userCity,
        userId,
      });

      // Gestion des erreurs
      if (!updatedUser) {
        return res.status(401).json({
          message:
            "Une erreur est survenue lors de la modification de l'utilisateur.",
        });
      }
      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la modification de l'utilisateur.",
      });
    }
  },

  //!Récupérer les infos de son compte
  getOneUser: async (req, res) => {
    // Récupération de l'id de l'utilisateur
    const { userId } = req.params;

    try {
      const user = await datamapper.getOneUser(userId);

      if (!user) {
        return res.status(401).json({
          message: "Veuillez vous connecter afin d'accéder à ces informations.",
        });
      }

      return res.json(user);
    } catch (error) {
      console.error('User not found :', error);
      return res.status(500).json({
        message: "Veuillez vous connecter afin d'accéder à ces informations.",
      });
    }
  },

  //!Se connecter
  login: async (req, res) => {
    //Récupération des données du formulaire
    const { email, user_password } = req.body;

    try {
      //Va chercher le bon utilisateur dans la BDD
      const user = await datamapper.findByEmail(email);

      //Vérification du mot de passe crypté
      let isPasswordValid = false;
      if (user) {
        isPasswordValid = await bcrypt.compare(
          user_password,
          user.user_password
        );
      }

      //Erreur si email ou mot de passe incorrects
      if (!user || !isPasswordValid) {
        return res.status(401).json({
          message: 'Identifiant ou mot de passe incorrects.',
        });
      }

      // Si les identifiants sont correctes on génére un JWT pour l'utilisateur
      const token = await loginService.authentify(user.id);

      if (!token) {
        return res.status(500).json({
          message: "Une erreur est survenue lors de l'authentification.",
        });
      }

      // On prépare le token et le pseudo de l'utilisateur
      const response = {
        logged: true,
        pseudo: user.user_name,
        token: token,
      };

      // On renvoie le token et le pseudo de l'utilisateur
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Une erreur est survenue lors de l'authentification.",
      });
    }
  },
};

module.exports = controller;
