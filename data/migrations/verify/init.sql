-- Verify Garden-Todo-Back:init on pg

BEGIN;

SELECT "id", "plant_name","slug_name", "latin_plant_name", "plant_type", "is_plant_ext", "origin","is_perennial","is_rustic","sunshine","toxicity","is_edible","seed_month_planting", "harvest_time","fertilizer_frequency","repotting_interval","watering_interval","watering_frequency","color","soil_type","humidity","plant_description","min_temp","max_temp","max_height","url_image" FROM plant WHERE false;

SELECT "id", "user_name", "email", "user_password","city" FROM utilisateur WHERE false;

SELECT "id", "title", "task_description", "creation_date","statut","task_priority","user_id","plant_id" FROM task WHERE false;

SELECT "id","user_id","plant_id", "last_watering" FROM own WHERE false;

ROLLBACK;
