import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Specialties from "@/components/sections/Specialties";
import TechOrbit from "@/components/sections/TechOrbit";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import GithubStats from "@/components/sections/GithubStats";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Specialties />
        <TechOrbit />
        <Work />
        <Skills />
        <Experience />
        <GithubStats />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
