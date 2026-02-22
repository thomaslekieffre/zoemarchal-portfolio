import Hero from "@/components/Hero";
import About from "@/components/About";
import ScallopDivider from "@/components/ScallopDivider";
import Footer from "@/components/Footer";
import ProjectRenderer from "@/components/projects/ProjectRenderer";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";

const SCALLOP_COLORS: Record<string, { top: string; bottom: string }> = {
  identity: { top: "#a17cc1", bottom: "#fce4d8" },
  ui: { top: "#fce4d8", bottom: "#092E67" },
  print: { top: "#092E67", bottom: "#fce4d8" },
};

function getBgColor(project: Project) {
  if (project.layout === "identity") return "#a17cc1";
  if (project.layout === "ui") return "#fce4d8";
  return project.bg_color;
}

export default async function Home() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  const published = (projects ?? []) as Project[];

  // Scallop color before first project
  const firstBg = published[0] ? getBgColor(published[0]) : "#a17cc1";

  return (
    <main>
      <Hero />
      <About />

      {published.length > 0 && (
        <>
          <ScallopDivider topColor="#fce4d8" bottomColor={firstBg} size={80} variant="down" />

          {published.map((project, idx) => {
            const isLast = idx === published.length - 1;
            const nextBg = isLast ? "#fce4d8" : getBgColor(published[idx + 1]);
            const currentBg = getBgColor(project);
            const reverse = idx % 2 === 1;

            return (
              <div key={project.id}>
                <ProjectRenderer project={project} showHeader={idx === 0} />
                <ScallopDivider
                  topColor={currentBg}
                  bottomColor={nextBg}
                  size={80}
                  variant="down"
                  reverse={reverse}
                />
              </div>
            );
          })}
        </>
      )}

      <Footer />
    </main>
  );
}
