-- Revert Garden-Todo-Back:init from pg

BEGIN;

-- Suppression des clés étrangères 

-- ALTER TABLE task DROP CONSTRAINT IF EXISTS user_id_user_id_fkey;
-- ALTER TABLE task DROP CONSTRAINT IF EXISTS plant_id_plant_id_fkey;
-- ALTER TABLE own DROP CONSTRAINT IF EXISTS user_id_user_id_fkey;
-- ALTER TABLE own DROP CONSTRAINT IF EXISTS plant_id_plant_id_fkey;

DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS own CASCADE; 

-- Suppression de la table plant
DROP TABLE IF EXISTS plant;

-- Suppression de la table user
DROP TABLE IF EXISTS utilisateur;

-- Suppression de la table task (plus besoin étant donné la cascade plus haut)
-- DROP TABLE IF EXISTS "task";

-- Suppression de la table own (plus besoin étant donné la cascade plus haut)
-- DROP TABLE IF EXISTS "own";
COMMIT;
