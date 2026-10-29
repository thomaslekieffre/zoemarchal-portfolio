export const translations = {
  fr: {
    // Hero
    hero: {
      subtitle: "Graphic Designer",
    },
    // Scroll indicator
    scroll: "SCROLL",
    // About
    about: {
      greeting: "Salut !",
      bio1: "Je m'appelle Zoé Marchal, j'ai 17 ans. Pendant mes années de lycée, je me suis formée au design en autodidacte. Je travaille aussi bien l'identité visuelle que l'affiche, l'édition, l'UI ou l'expérimentation typographique. J'aime explorer des univers colorés, tout en sachant m'adapter à des projets plus sobres et structurés.",
      bio2: "Chaque projet est pour moi un équilibre entre concept et esthétique. Je recherche une direction forte, une cohérence visuelle et une intention claire derrière chaque choix visuel.",
      bio3: "Dès septembre prochain, je rejoindrai l'ESAAT de Roubaix pour suivre le cursus du DNMADE Graphisme, spécialité supports connectés, afin d'approfondir ma pratique et de faire évoluer cette démarche créative vers un cadre professionnel.",
      experiences: "Expériences professionnelles",
      exp1_label: "Février 2026 – Affinity",
      exp1_desc: "Stage en design produit et branding\n• Contribution à la mise en place d'un Design System\n• Approfondissement de supports marketing pour la marque",
      exp2_label: "Juillet 2025 – Jumio",
      exp2_desc: "Stage en communication visuelle\n• Conception d'un support PDF présentant les capacités du produit\n• Structuration de l'information et hiérarchisation graphique",
      exp3_label: "Juin 2024 – Agence Keeo",
      exp3_desc: "Stage en design digital\n• Conception d'une maquette de site web\n• Création d'un logo et déclinaisons visuelles\n• Approfondissement des outils UI sur Figma",
      education: "Scolarité",
      edu_degree: "Baccalauréat Général (2023 - 2026)",
      edu_subjects: "Mathématiques & Numériques et Sciences Informatiques (NSI)",
      edu_degree2: "DN MADE Graphisme (2026 - 2029)",
      edu_subjects2: "spécialité supports connectés",
      interests: "Centres d'intérêts",
      interest_drawing: "Dessin",
      interest_basketball: "Basket-ball",
      interest_music: "Musique",
      contact: "Contact",
    },
    // Projects
    projects: {
      my_projects: "Mes projets",
      presentation: "Présentation du projet",
      colors: "Palette de couleurs",
      typography: "Typographie",
      typographies: "Typographies",
      school_project: "Projet scolaire",
    },
    // Footer
    footer: {
      credit_dev: "developed with ♥ by",
      credit_design: "from a design by",
    },
  },

  en: {
    // Hero
    hero: {
      subtitle: "Graphic Designer",
    },
    // Scroll indicator
    scroll: "SCROLL",
    // About
    about: {
      greeting: "Hey there!",
      bio1: "My name is Zoé Marchal, I'm 17 years old. Throughout high school, I've been a self-taught graphic designer. I work across brand identity, poster design, editorial, UI, and typographic experimentation. I love exploring vibrant, colorful worlds while also knowing how to adapt to more minimal and structured projects.",
      bio2: "For me, every project is a balance between concept and aesthetics. I look for a strong direction, visual consistency, and a clear intention behind every design choice.",
      bio3: "Starting next September, I'll be joining ESAAT Roubaix to pursue a DNMADE in Graphic Design, specializing in connected media, to deepen my practice and bring this creative approach into a professional context.",
      experiences: "Work Experience",
      exp1_label: "February 2026 – Affinity",
      exp1_desc: "Product design & branding internship\n• Contributed to building a Design System\n• Developed marketing materials for the brand",
      exp2_label: "July 2025 – Jumio",
      exp2_desc: "Visual communication internship\n• Designed a PDF showcasing the product's capabilities\n• Structured information and established visual hierarchy",
      exp3_label: "June 2024 – Keeo Agency",
      exp3_desc: "Digital design internship\n• Designed a website mockup\n• Created a logo and visual identity\n• Deepened UI skills using Figma",
      education: "Education",
      edu_degree: "French Baccalauréat (General) (2023 - 2026)",
      edu_subjects: "Mathematics & Digital and Computer Science (NSI)",
      edu_degree2: "DN MADE Graphic Design (2026 - 2029)",
      edu_subjects2: "connected media specialization",
      interests: "Interests",
      interest_drawing: "Drawing",
      interest_basketball: "Basketball",
      interest_music: "Music",
      contact: "Contact",
    },
    // Projects
    projects: {
      my_projects: "My projects",
      presentation: "About this project",
      colors: "Color palette",
      typography: "Typography",
      typographies: "Typographies",
      school_project: "School project",
    },
    // Footer
    footer: {
      credit_dev: "developed with ♥ by",
      credit_design: "from a design by",
    },
  },
} as const;

export type Language = keyof typeof translations;

// Structure commune aux deux langues
export type Translations = {
  hero: { subtitle: string };
  scroll: string;
  about: {
    greeting: string; bio1: string; bio2: string; bio3: string;
    experiences: string;
    exp1_label: string; exp1_desc: string;
    exp2_label: string; exp2_desc: string;
    exp3_label: string; exp3_desc: string;
    education: string; edu_degree: string; edu_subjects: string; edu_degree2: string; edu_subjects2: string;
    interests: string;
    interest_drawing: string; interest_basketball: string; interest_music: string;
    contact: string;
  };
  projects: {
    my_projects: string; presentation: string;
    colors: string; typography: string; typographies: string;
    school_project: string;
  };
  footer: { credit_dev: string; credit_design: string };
};
