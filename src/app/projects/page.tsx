import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profile, resume, socialLinks } from "@/data/portfolio";
import { ProjectArchive } from "@/components/ProjectArchive";
import styles from "./ProjectsPage.module.css";

export const metadata: Metadata = {
  title: "Projects | Mohammad Bilal",
  description: "Explore Mohammad Bilal’s AI, computer vision, full-stack, automation, and learning platform projects, with live demos and source code.",
};

function ProjectSocials() {
  return (
    <div className={styles.socials}>
      {socialLinks.filter((link) => link.label === "GitHub" || link.label === "LinkedIn").map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label + " (opens in a new tab)"}>
          {link.label === "GitHub" ? <SiGithub size={19} aria-hidden="true" /> : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>}
        </a>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.headerInner} aria-label="Project page navigation">
          <Link href="/#projects" className={styles.backLink}><ArrowLeft size={18} aria-hidden="true" /><span>Back to portfolio</span></Link>
          <Link href="/" className={styles.brand}>{profile.name}</Link>
          <ProjectSocials />
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.hero}><h1 className={styles.title}>Projects<span>.</span></h1></div>
        <ProjectArchive />
      </main>
      <footer className={styles.footer}>
        <div className={styles.contact}>
          <h2>Have something<br /><span>in mind?</span></h2>
          <div className={styles.contactActions}>
            <a className={styles.contactLink} href={"mailto:" + profile.email}>Let’s build it together<span><ArrowUpRight size={22} aria-hidden="true" /></span></a>
            <a className={styles.resumeLink} href={resume.href} download="Mohammad-Bilal-CV.pdf"><ArrowDownToLine size={16} aria-hidden="true" />Download CV</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div><Link href="/" className={styles.footerName}>{profile.name}</Link><p>{profile.role}</p></div>
          <a className={styles.email} href={"mailto:" + profile.email}>{profile.email}</a>
          <ProjectSocials />
        </div>
      </footer>
    </div>
  );
}
