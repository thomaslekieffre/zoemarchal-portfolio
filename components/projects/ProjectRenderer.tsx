import type { Project } from "@/lib/supabase/types";
import IdentityTemplate from "./templates/IdentityTemplate";
import UiTemplate from "./templates/UiTemplate";
import PrintTemplate from "./templates/PrintTemplate";
import GalleryTemplate from "./templates/GalleryTemplate";
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
      default:
        return null;
    }
  })();

  return (
    <>
      <FontInjector fonts={project.fonts} />
      {template}
    </>
  );
}
