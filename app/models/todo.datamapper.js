// Connexion à la base de données
const client = require("./pg.client");

const datamapper = {
  // Récupération des tâches par rapport a un user_id
  getTasks: async (userId) => {
    const tasks = await client.query("SELECT * FROM task WHERE user_id = $1;", [
      userId,
    ]);
    return tasks.rows;
  },

  // Récupération d'une tâche via son ID
  getOneTaskById: async (taskId) => {
    const task = await client.query("SELECT * FROM task WHERE id = $1;", [
      taskId,
    ]);
    return task.rows[0];
  },

  // Création d'une tache en BDD
  addOneTask: async (newTask, position, userId) => {
    // Par défaut une tâche qui vient d'être créée n'est pas exécutée donc sont status est a false
    const statut = false;
    const task = await client.query(
      "INSERT INTO task (task_description, statut, position, user_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [newTask, statut, position, userId]
    );
    return task.rows[0];
  },

  // Suppresion d'une tâche en fonction de son ID
  deleteOneTask: async (taskId) => {
    await client.query("DELETE FROM task WHERE id = $1;", [taskId]);
    return true;
  },

  // Modification d'une tâche par rapport à son ID
  updateOneTask: async (updateTask, updateStatut, updatePosition, taskId) => {
    const updatedTask = await client.query(
      "UPDATE task SET task_description = $1, statut = $2, position = $3 WHERE id = $4 RETURNING *;",
      [updateTask, updateStatut, updatePosition, taskId]
    );
    return updatedTask.rows[0];
  },
};

module.exports = datamapper;
