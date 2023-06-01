-- Revert Garden-Todo-Back:seeding from pg

BEGIN;
DELETE FROM own WHERE plant_id IN (SELECT id FROM plant);


DELETE FROM plant WHERE plant_name = 'Carotte' AND slug_name = 'carotte' AND latin_plant_name = 'Daucus carota';
DELETE FROM plant WHERE plant_name = 'Thym' AND slug_name = 'thym' AND latin_plant_name = 'Thymus vulgaris';
DELETE FROM plant WHERE plant_name = 'Pilea' AND slug_name = 'pilea' AND latin_plant_name = 'Pilea peperomioides';
DELETE FROM plant WHERE plant_name = 'Cosmos' AND slug_name = 'cosmos' AND latin_plant_name = 'Cosmos bipinnatus';
DELETE FROM plant WHERE plant_name = 'Lavande' AND slug_name = 'lavande' AND latin_plant_name = 'Lavandula';
DELETE FROM plant WHERE plant_name = 'Tulipe' AND slug_name = 'tulipe' AND latin_plant_name = 'Tulipa';
DELETE FROM plant WHERE plant_name = 'Philodendron' AND slug_name = 'philodendron' AND latin_plant_name = 'Philodendron';



COMMIT;
