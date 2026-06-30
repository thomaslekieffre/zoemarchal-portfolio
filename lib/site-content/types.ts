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

export type LocaleContent = {
  greeting: string;
  bio1: string;
  bio2: string;
  bio3: string;
  experiences: SiteExperience[];
  education: SiteEducation[];
  interests: string[];
  contacts: SiteContact[];
};

export type SiteContent = {
  fr: LocaleContent;
  en: LocaleContent;
};

export type SiteContentRow = {
  id: string;
  content: SiteContent;
  updated_at: string;
};
