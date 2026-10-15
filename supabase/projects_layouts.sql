-- Ajoute les layouts "grid" (grille photo) et "mosaic" (mosaïque photo)
-- à la contrainte de la table projects. À exécuter une fois dans le SQL Editor Supabase.

ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_layout_check;

ALTER TABLE projects ADD CONSTRAINT projects_layout_check
  CHECK (layout IN ('identity', 'ui', 'print', 'gallery', 'motion', 'editorial', 'grid', 'mosaic'));
