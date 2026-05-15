import Navbar from "./components/navbar";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import ProjectsSection from "./components/projects";
import ContactSection from "./components/contact";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
