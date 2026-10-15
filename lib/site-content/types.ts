export type ContactType = "instagram" | "discord" | "x" | "phone" | "email";

export type SiteContact = {
  type: ContactType;
  label: string;
  href: string;
};

export type SiteExperience = {
  label: string;
  description: string;
};

export type SiteEducation = {
  degree: string;
  subjects: string;
};

export type SiteTestimonial = {
  name: string;
  role: string;
  quote: string;
};

/** Couleur de la palette de base, réutilisable dans les projets */
export type BasePaletteColor = {
  hex: string;
  label: string;
};

export type LocaleContent = {
  greeting: string;
  bio1: string;
  bio2: string;
  bio3: string;
  experiences: SiteExperience[];
  education: SiteEducation[];
  interests: string[];
  contacts: SiteContact[];
  testimonials: SiteTestimonial[];
};

export type SiteContent = {
  fr: LocaleContent;
  en: LocaleContent;
  palette: BasePaletteColor[];
};

export type SiteContentRow = {
  id: string;
  content: SiteContent;
  updated_at: string;
};
