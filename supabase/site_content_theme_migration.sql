-- Migration : palette de base supprimée, couleurs du site stockées dans content.theme
-- 1. retire content.palette (palette de base, plus utilisée)
-- 2. retire content.siteColors (ancien format fond/texte, remplacé par theme)
-- 3. complète content.theme avec les valeurs d'origine (tokens de app/globals.css)
--    en gardant les valeurs déjà enregistrées : défauts < siteColors < theme
-- Sans effet si la ligne 'main' n'existe pas encore.

update site_content
set content = (content - 'palette' - 'siteColors')
  || jsonb_build_object(
    'theme',
    jsonb_build_object(
      'blue', '#092E67',
      'peach', '#FCE4D8',
      'purple', '#A17CC1',
      'navy', '#111453',
      'rafale-dark', '#020618',
      'rafale-light', '#ECFEFF',
      'rafale-mid', '#053345',
      'rafale-accent', '#0092B8',
      'rafale-pale', '#CEFAFE',
      'jumio-dark', '#323132',
      'jumio-cyan', '#13DFCE',
      'jumio-green', '#5ACC29',
      'ms-orange', '#EA9230',
      'ms-red', '#EC5930',
      'ms-pink', '#ED739A',
      'ms-purple', '#890B51',
      'ms-dark', '#1C1D3B',
      'ms-teal', '#008F9F'
    )
    || jsonb_strip_nulls(jsonb_build_object(
      'blue', content->'siteColors'->>'bg',
      'peach', content->'siteColors'->>'text'
    ))
    || coalesce(content->'theme', '{}'::jsonb)
  )
where id = 'main';

-- Vérification : doit lister les 18 clés de theme et aucune clé palette / siteColors
-- select content->'theme' as theme, content ? 'palette' as has_palette, content ? 'siteColors' as has_legacy
-- from site_content where id = 'main';
