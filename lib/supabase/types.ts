export type ProjectLayout = "identity" | "ui" | "print" | "gallery" | "motion" | "editorial";

export type ProjectColor = {
  hex: string;
  label: string;
  gradient?: boolean;
  radius?: string;
};

export type ProjectFont = {
  name: string;
  cssClass: string;
  /** URL vers un fichier de police uploadé dans Supabase Storage */
  fontUrl?: string;
};

export type ProjectImage = {
  url: string;
  /** hero | mockup | grid | portrait */
  role: string;
  index?: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  bg_color: string;
  text_color: string;
  layout: ProjectLayout;
  colors: ProjectColor[];
  fonts: ProjectFont[];
  images: ProjectImage[];
  display_order: number;
  published: boolean;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at">;
        Update: Partial<Omit<Project, "id" | "created_at">>;
      };
    };
  };
};
