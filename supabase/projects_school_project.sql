-- Ajoute la case "projet scolaire" aux projets. À exécuter une fois dans le SQL Editor Supabase.

ALTER TABLE projects ADD COLUMN IF NOT EXISTS school_project boolean NOT NULL DEFAULT false;
