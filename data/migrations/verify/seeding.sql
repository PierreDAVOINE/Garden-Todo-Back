-- Verify Garden-Todo-Back:seeding on pg

BEGIN;

SELECT COUNT(*) FROM plant WHERE plant_name = 'Carotte' AND slug_name = 'carotte' AND latin_plant_name = 'Daucus carota';
SELECT COUNT(*) FROM plant WHERE plant_name = 'Thym' AND slug_name = 'thym' AND latin_plant_name = 'Thymus vulgaris';
SELECT COUNT(*) FROM plant WHERE plant_name = 'Pilea' AND slug_name = 'pilea' AND latin_plant_name = 'Pilea peperomioides';
SELECT COUNT(*) FROM plant WHERE plant_name = 'Cosmos' AND slug_name = 'cosmos' AND latin_plant_name = 'Cosmos bipinnatus';
SELECT COUNT(*) FROM plant WHERE plant_name = 'Lavande' AND slug_name = 'lavande' AND latin_plant_name = 'Lavandula';
SELECT COUNT(*) FROM plant WHERE plant_name = 'Tulipe' AND slug_name = 'tulipe' AND latin_plant_name = 'Tulipa';
SELECT COUNT(*) FROM plant WHERE plant_name = 'Philodendron' AND slug_name = 'philodendron' AND latin_plant_name = 'Philodendron';






ROLLBACK;
