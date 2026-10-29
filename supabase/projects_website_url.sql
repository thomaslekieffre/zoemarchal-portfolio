-- Ajoute le lien du site à un projet (titre cliquable). À exécuter une fois dans le SQL Editor Supabase.

ALTER TABLE projects ADD COLUMN IF NOT EXISTS website_url text;
