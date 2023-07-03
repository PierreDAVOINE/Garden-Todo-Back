require('dotenv').config();
// Initialisation d'express et de ses dépendances
const express = require('express');
const cors = require('cors');

// Initialisation des routes
const router = require('./app/routers/router.js');

const port = process.env.PORT || 3000;

// Initialisation d'express
const app = express();

// On paramètre les cors de facon à ce que l'api soit accessible depuis le front
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

// Utilisation des routers
app.use('/plants', router.plants);
app.use('/users', router.users);
app.use('/garden', router.garden);
app.use('/tasks', router.todo);

app.listen(port, () => {
  console.log(`Garden app listening on port ${port}`);
});
