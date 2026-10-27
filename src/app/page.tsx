import { AboutSection } from "@/components/AboutSection";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { Navbar } from "@/components/Navbar";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="relative isolate min-h-dvh overflow-x-clip bg-[var(--background)] text-[var(--foreground)]">
      <ScrollAnimator />
      <Navbar />
      <BackToTopButton />

      <main className="relative isolate">
        <HeroSection />
        <div data-site-content className="mx-auto w-full max-w-7xl bg-[var(--background)] px-5 sm:px-8 lg:px-12">
          <AboutSection />
          <ProjectGrid />
          <TechStack />
          <JourneyTimeline />
          <Certifications />
        </div>
      </main>

      <Footer />
    </div>
  );
}
