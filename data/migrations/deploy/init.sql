-- Deploy Garden-Todo-Back:init to pg

BEGIN;

-- Bascule l'encodage en UTF-8
set client_encoding to 'utf-8';

-- Création de la table "plant"
CREATE TABLE plant (
  	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 	plant_name VARCHAR(255) NOT NULL,
    slug_name VARCHAR(255) NOT NULL,
    latin_plant_name VARCHAR(255) NOT NULL,
    plant_type VARCHAR(255) NOT NULL, 
    is_plant_ext BOOLEAN, 
    origin VARCHAR(255) NOT NULL, 
    is_perennial BOOLEAN NOT NULL,
    is_rustic BOOLEAN NOT NULL,
    sunshine VARCHAR(255) NOT NULL, 
    toxicity VARCHAR(255) NOT NULL, 
    is_edible BOOLEAN NOT NULL,
    seed_month_planting VARCHAR(255) NOT NULL,
    harvest_time VARCHAR(255), 
    fertilizer_frequency VARCHAR(255) NOT NULL, 
    repotting_interval VARCHAR(255) NOT NULL, 
    watering_interval INT NOT NULL, 
    watering_frequency VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL, 
    soil_type VARCHAR(255) NOT NULL, 
    humidity VARCHAR(255) NOT NULL, 
    plant_description TEXT NOT NULL, 
    min_temp INT NOT NULL, 
    max_temp INT NOT NULL, 
    max_height INT NOT NULL,
    url_image VARCHAR(255) NOT NULL
);

-- Création de la table "user"
CREATE TABLE utilisateur (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    city VARCHAR(255)
);

-- Création de la table "task"
CREATE TABLE task (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    task_description TEXT NOT NULL,
    statut  BOOLEAN NOT NULL,
    position INT NOT NULL,
    user_id INT NOT NULL REFERENCES "utilisateur"("id") ON DELETE CASCADE
);

-- Création de la table de liaison "own"
CREATE TABLE own (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "utilisateur"("id") ON DELETE CASCADE,
    plant_id INT REFERENCES "plant"("id"),
    last_watering TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
