import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Stack from "@/components/sections/Stack";
import Work from "@/components/sections/Work";
import Writing from "@/components/sections/Writing";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Stack />
      <Experience />
      <About />
      <Writing />
      <Contact />
    </main>
  );
}
