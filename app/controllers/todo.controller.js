const datamapper = require("../models/todo.datamapper");

const controller = {
  //! Affiche la liste des tâches dans la todo list d'un utilisateur
  getTasks: async (req, res) => {
    const { userId } = req.params;

    try {
      //On va chercher les taches en BDD
      const tasks = await datamapper.getTasks(userId);

      if (!tasks) {
        throw new Error(
          "Une erreur est survenue lors de la recherche des tâches."
        );
      }

      return res.json(tasks);
    } catch (err) {
      //Gestion de l'erreur
      console.error(err);
      return res
        .status(500)
        .send("Une erreur est survenue lors de la recherche des tâches.");
    }
  },

  //! Ajouter une tâche dans la todo list d'un utilisateur
  addOneTask: async (req, res) => {
    const { userId } = req.params;

    //Récupération des données du formulaire
    const { newTask, position } = req.body;

    try {
      //on ajoute la tâche en BDD
      const task = await datamapper.addOneTask(newTask, position, userId);

      if (!task) {
        throw new Error(
          "Une erreur est survenue lors de l'enregistrement de la tâche."
        );
      }

      return res.json(task);
    } catch (err) {
      //Gestion de l'erreur
      console.error(err);
      return res
        .status(500)
        .send("Une erreur est survenue lors de l'enregistrement de la tâche.");
    }
  },

  //! Supprimer  une tâche dans la todo list d'un utilisateur
  deleteOneTask: async (req, res) => {
    const { taskId } = req.params;

    try {
      //on supprime la tâche de la BDD
      const isDeleted = await datamapper.deleteOneTask(taskId);
      if (isDeleted) {
        res.json("Tâche supprimée.");
      } else {
        throw new Error(
          "Une erreur est survenue lors de la suppression de la tâche."
        );
      }
    } catch (err) {
      //Gestion de l'erreur
      console.error(err);
      return res
        .status(500)
        .send("Une erreur est survenue lors de la suppression de la tâche.");
    }
  },

  //! Modifier  une tâche dans la todo list d'un utilisateur
  updateOneTask: async (req, res) => {
    const { taskId } = req.params;

    //Récupération des données du formulaire
    let { updateTask, updateStatut, updatePosition } = req.body;

    try {
      //On modifie la tâche
      const task = await datamapper.getOneTaskById(taskId);

      if (!task) {
        throw new Error("La tâche que vous souhaitez modifier n'existe pas.");
      }

      //Modification de l'utilisateur dans la BDD
      const updatedTask = await datamapper.updateOneTask(
        updateTask,
        updateStatut,
        updatePosition,
        taskId
      );

      if (!updatedTask) {
        throw new Error(
          "Une erreur est survenue lors de la modification de la tâche."
        );
      }

      return res.json(updatedTask);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send("Une erreur est survenue lors de la modification de la tâche.");
    }
  },

  //! Modifier toutes les tâches appartenant à un même utilisateur (principalement pour update la position)
  updateTasks: async (req, res) => {
    const { newTasks } = req.body;

    try {
      //On parcoure la list de tâche newTasks et modifie chaque tâche en BDD
      for (const task of newTasks) {
        const checkTask = await datamapper.getOneTaskById(task.id);
        if (!checkTask) {
          throw new Error("La tâche que vous souhaitez modifier n'existe pas.");
        }

        //Modification de l'utilisateur dans la BDD
        let updatedTask = await datamapper.updateOneTask(
          task.task_description,
          task.statut,
          task.position,
          task.id
        );

        if (!updatedTask) {
          throw new Error(
            "Une erreur est survenue lors de la modification de la tâche."
          );
        }
      }
      return res.json(true);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Une erreur est survenue lors de la modification de la tâche.");
    }
  },
};

module.exports = controller;
