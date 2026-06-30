-- Contenu éditable du portfolio (intro, expériences, scolarité, intérêts, contacts)
CREATE TABLE IF NOT EXISTS site_content (
  id text PRIMARY KEY DEFAULT 'main',
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_content_public_read" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "site_content_anon_write" ON site_content
  FOR ALL USING (true) WITH CHECK (true);
