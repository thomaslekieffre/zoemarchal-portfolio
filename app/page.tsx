import Hero from "@/components/Hero";
import About from "@/components/About";
import ScallopDivider from "@/components/ScallopDivider";
import RafaleProject from "@/components/projects/RafaleProject";
import JumioProject from "@/components/projects/JumioProject";
import MainsquareProject from "@/components/projects/MainsquareProject";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ScallopDivider topColor="#fce4d8" bottomColor="#a17cc1" size={80} variant="down" />
      <RafaleProject />
      <ScallopDivider topColor="#a17cc1" bottomColor="#fce4d8" size={80} variant="down" reverse />
      <JumioProject />
      <ScallopDivider topColor="#fce4d8" bottomColor="#092E67" size={80} variant="down" />
      <MainsquareProject />
      <ScallopDivider topColor="#092E67" bottomColor="#fce4d8" size={80} variant="down" reverse />
      <Footer />
    </main>
  );
}
