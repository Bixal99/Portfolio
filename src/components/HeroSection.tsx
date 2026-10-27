import { ArrowRight } from "lucide-react";
import { profile, resume } from "@/data/portfolio";
import { InteractiveGridBackground } from "./InteractiveGridBackground";
import { ResumeDownloadButton } from "./ResumeDownloadButton";
import { TypewriterLine } from "./TypewriterLine";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section id="home" className={styles.section}>
      <InteractiveGridBackground />
      <div className={styles.ambient} aria-hidden="true" />
      <div data-hero-copy className={styles.content}>
        <p data-hero-animate className={styles.intro}>Hi, I am</p>
        <h1 data-hero-animate data-hero-name className={styles.name}><span data-hero-name-word>{profile.name}</span></h1>
        <div data-hero-animate className={styles.role}>
          <span className={styles.roleLabel}>Inspired to be</span>
          <TypewriterLine />
        </div>
        <div data-hero-animate className={styles.actions}>
          <a href="#projects" className={styles.projectButton}><span className={styles.buttonIcon}><ArrowRight size={20} strokeWidth={1.7} aria-hidden="true" /></span><span>View projects</span></a>
          <ResumeDownloadButton href={resume.href} label={resume.label} placement="inline" />
        </div>
      </div>
    </section>
  );
}
