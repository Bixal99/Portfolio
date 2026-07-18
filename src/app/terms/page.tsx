import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsDocument } from "@/data/legal";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Terms of Use | ${profile.name}`,
  description:
    "Terms for using Mohammad Bilal's portfolio website, projects, and shared materials.",
};

export default function TermsPage() {
  return <LegalPage doc={termsDocument} />;
}
