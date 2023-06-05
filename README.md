# Garden-Todo-Back

Garden-todo-back est l'API du projet réalisé avec mes 3 autres collègues lors du dernier mois de formation chez O'Clock.

##  Présentation du projet

Garden Todo back est l'API du projet Garden Todo. Réalisé à l'aide de NodeJS, express, PostgreSQL, JWT, sqitch et JOI.

Ce projet à été démarré en fin de formation chez O'clock avec trois autres apprenants. L'objectif était de réaliser le cahier des charges et le MVP en 1 mois, ce qui a été chose faite.

Il à pour but d'être présenté lors de mon passage du titre professionnel prévu cet été, c'est pourquoi nous avons pris la décisions de ne pas utiliser d'ORM et de réaliser les requête SQL nous même afin de valider une des compétences du titre pro à ce sujet.

Garden Todo est une application web déstinnée aux jardiniers, amateurs ou plus expérimentés afin de les aider à :

- Récolter des informations sur des plantes
- Tenir à jour un "jadin virtuel" qui rappel l'utilisateur des arrosages à effectuer ou autre.
- Tenir à jour, via une todo liste, des tâches liées au jaridn (ou pas) à réaliser.

## Installation

Installation des node_modules :

```bash
npm i
```

Initialisation des Datas :
Dans le dossier data se trouve les fichier init.sql pour créer les tables et seeding.sql pour ajouter quelques données en BDD.
Il est possible d'utiliser Sqitch pour la mise en place.

Démarrage de l'API

```bash
node index
```

## Routes

Actuellement le projet comporte les routes "users", "plants", "todo" et "garden".
