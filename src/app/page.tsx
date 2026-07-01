import { CreativeCodeWindow } from "@/components/CreativeCodeWindow";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { InteractiveGridBackground } from "@/components/InteractiveGridBackground";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { Navbar } from "@/components/Navbar";
import { PageLoader } from "@/components/PageLoader";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TechStack } from "@/components/TechStack";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-black text-white">
      <PageLoader />
      <ScrollAnimator />
      <InteractiveGridBackground />
      <Navbar />
      <ScrollProgress />
      <ThemeToggle />

      <main className="relative isolate">
        <div aria-hidden="true" className="grid-backdrop" />
        <div aria-hidden="true" className="subtle-vignette" />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <HeroSection />
          <CreativeCodeWindow />
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
