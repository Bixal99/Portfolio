import { AboutSection } from "@/components/AboutSection";
import { BackToTopButton } from "@/components/BackToTopButton";
import { CodingSection } from "@/components/CodingSection";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { InteractiveGridBackground } from "@/components/InteractiveGridBackground";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { Navbar } from "@/components/Navbar";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="relative isolate min-h-dvh overflow-x-hidden bg-black text-white">
      <ScrollAnimator />
      <InteractiveGridBackground />
      <Navbar />
      <ScrollProgress />
      <BackToTopButton />

      <main className="relative isolate">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <HeroSection />
          <AboutSection />
          <CodingSection />
          <JourneyTimeline />
          <TechStack />
          <Education />
          <ProjectGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
