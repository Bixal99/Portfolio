import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyDocument } from "@/data/legal";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Privacy Policy | ${profile.name}`,
  description:
    "How Mohammad Bilal's portfolio website handles information, contact messages, and third-party services.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyDocument} />;
}
