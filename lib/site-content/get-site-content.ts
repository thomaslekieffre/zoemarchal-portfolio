import { createClient } from "@/lib/supabase/server";
import { defaultSiteContent } from "./defaults";
import { mergeTheme } from "./theme";
import type { LocaleContent, SiteContent } from "./types";

function mergeLocale(stored: Partial<LocaleContent> | undefined, fallback: LocaleContent): LocaleContent {
  if (!stored) return fallback;
  return {
    greeting: stored.greeting ?? fallback.greeting,
    bio1: stored.bio1 ?? fallback.bio1,
    bio2: stored.bio2 ?? fallback.bio2,
    bio3: stored.bio3 ?? fallback.bio3,
    experiences: stored.experiences?.length ? stored.experiences : fallback.experiences,
    education: stored.education?.length ? stored.education : fallback.education,
    interests: stored.interests?.length ? stored.interests : fallback.interests,
    contacts: stored.contacts?.length ? stored.contacts : fallback.contacts,
    testimonials: stored.testimonials ?? fallback.testimonials,
  };
}

// Format intermédiaire (couleurs fond/texte seulement) : on le convertit vers theme
type LegacySiteColors = { siteColors?: { bg?: string; text?: string } };

export function mergeSiteContent(
  stored: (Partial<SiteContent> & LegacySiteColors) | null | undefined,
): SiteContent {
  const legacy = stored?.siteColors;
  const fromLegacy = legacy ? { blue: legacy.bg, peach: legacy.text } : undefined;
  return {
    fr: mergeLocale(stored?.fr, defaultSiteContent.fr),
    en: mergeLocale(stored?.en, defaultSiteContent.en),
    theme: mergeTheme({ ...fromLegacy, ...stored?.theme }),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("site_content")
      .select("content")
      .eq("id", "main")
      .maybeSingle();

    if (error || !data?.content) return defaultSiteContent;
    return mergeSiteContent(data.content as SiteContent);
  } catch {
    return defaultSiteContent;
  }
}
