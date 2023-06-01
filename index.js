require("dotenv").config();
// Initialisation d'express et de ses dépendances
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialisation des routes
const router = require("./app/routers/router.js");

const port = process.env.PORT || 3000;

// Initialisation d'express
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Utilisation des routers
app.use("/plants", router.plants);
app.use("/users", router.users);
app.use("/garden", router.garden);
app.use("/tasks", router.todo);

app.listen(port, () => {
  console.log(`Garden app listening on port ${port}`);
});
