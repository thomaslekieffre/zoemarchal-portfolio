import type { Project } from "@/lib/supabase/types";
import IdentityTemplate from "./templates/IdentityTemplate";
import UiTemplate from "./templates/UiTemplate";
import PrintTemplate from "./templates/PrintTemplate";
import GalleryTemplate from "./templates/GalleryTemplate";
import GridTemplate from "./templates/GridTemplate";
import FontInjector from "../FontInjector";

export default function ProjectRenderer({
  project,
  showHeader = false,
}: {
  project: Project;
  showHeader?: boolean;
}) {
  const template = (() => {
    switch (project.layout) {
      case "identity":
        return <IdentityTemplate project={project} showHeader={showHeader} />;
      case "ui":
        return <UiTemplate project={project} />;
      case "print":
        return <PrintTemplate project={project} />;
      case "gallery":
      case "motion":
      case "editorial":
        return <GalleryTemplate project={project} />;
      case "grid":
        return <GridTemplate project={project} variant="grid" />;
      case "mosaic":
        return <GridTemplate project={project} variant="mosaic" />;
      default:
        return null;
    }
  })();

  return (
    <>
      <FontInjector fonts={project.fonts} />
      <div className="relative">
        {template}
        {/* Grain brique discret : casse l'aplat de couleur sans gêner la lecture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: "url(/Texturelabs_Brick_124XL.jpg)", backgroundSize: "420px" }}
        />
      </div>
    </>
  );
}
