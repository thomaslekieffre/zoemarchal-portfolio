import type { Project } from "@/lib/supabase/types";
import IdentityTemplate from "./templates/IdentityTemplate";
import UiTemplate from "./templates/UiTemplate";
import PrintTemplate from "./templates/PrintTemplate";

export default function ProjectRenderer({
  project,
  showHeader = false,
}: {
  project: Project;
  showHeader?: boolean;
}) {
  switch (project.layout) {
    case "identity":
      return <IdentityTemplate project={project} showHeader={showHeader} />;
    case "ui":
      return <UiTemplate project={project} />;
    case "print":
      return <PrintTemplate project={project} />;
    default:
      return null;
  }
}
