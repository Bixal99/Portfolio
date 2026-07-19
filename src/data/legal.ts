import { profile } from "@/data/portfolio";

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
};

export type LegalDocument = {
  slug: "privacy" | "terms";
  kicker: string;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
};

export const privacyDocument: LegalDocument = {
  slug: "privacy",
  kicker: "Privacy",
  title: "Privacy Policy",
  summary:
    "What this portfolio collects, what it does not, and how you stay in control.",
  updated: "July 18, 2026",
  sections: [
    {
      id: "overview",
      title: "Overview",
      body: [
        "This portfolio site is a personal presentation of my work, skills, and contact details. It is designed to share projects and make it easy to reach me.",
        "I aim to collect as little information as possible. This policy explains what may be processed when you visit or contact me through this website.",
      ],
    },
    {
      id: "data-you-share",
      title: "Data you share",
      body: [
        "If you use the contact form, you may send your name, email address, subject, and message. That content is used only to understand and respond to your inquiry.",
        "If you email or call me directly using the details on this site, normal communication records may exist in those channels (email inbox, phone history) under your provider's terms.",
      ],
    },
    {
      id: "resume",
      title: "Resume downloads",
      body: [
        "Downloading my CV is optional. The file is provided for evaluation and hiring conversations. Please do not redistribute it without permission.",
      ],
    },
    {
      id: "technical-data",
      title: "Technical data",
      body: [
        "Like most websites, hosting and delivery providers may automatically process basic technical data such as IP address, browser type, device information, and pages requested. This supports security, performance, and reliable delivery of the site.",
        "I do not run advertising trackers on this portfolio, and I do not sell personal information.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      body: [
        "This site may use essential storage needed for the experience to function (for example, remembering UI preferences in your browser). It is not used to build marketing profiles.",
        "You can clear cookies and site data anytime through your browser settings.",
      ],
    },
    {
      id: "third-parties",
      title: "Third parties",
      body: [
        "The site may load fonts, icons, analytics-free hosting infrastructure, or embedded project demos hosted elsewhere. Those services process requests under their own privacy policies.",
        "External project links (GitHub, live demos, LinkedIn) open third-party platforms. Their privacy practices apply once you leave this site.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      body: [
        "Contact messages are kept only as long as needed to reply and follow up. Technical logs retained by hosting providers follow their own retention schedules.",
        "You can choose not to use the contact form and reach me by email instead. You can also ask me to delete a message you previously sent, and I will do so when reasonably possible.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`Questions about this policy: ${profile.email}`],
    },
  ],
};

export const termsDocument: LegalDocument = {
  slug: "terms",
  kicker: "Terms",
  title: "Terms of Use",
  summary:
    "How this portfolio may be used, what stays mine, and the boundaries that keep the site useful.",
  updated: "July 18, 2026",
  sections: [
    {
      id: "using-this-site",
      title: "Using this site",
      body: [
        "By using this website, you agree to these terms. If you do not agree, please do not use the site.",
        "This website is a personal portfolio for presenting projects, skills, and contact information. It is provided as-is for informational and professional networking purposes.",
      ],
    },
    {
      id: "ownership",
      title: "Ownership",
      body: [
        "Unless otherwise noted, the design, writing, branding, and original project materials on this site belong to me. You may view and share links to public pages, but you may not copy, republish, or reuse substantial content without permission.",
        "Project demos and repositories may include open-source licenses. Follow those licenses when using that code.",
      ],
    },
    {
      id: "materials",
      title: "Materials",
      body: [
        "Any resume or portfolio materials you download are for evaluation related to roles, collaborations, or interviews. Do not redistribute them publicly without consent.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      body: [
        "Do not misuse the contact form (spam, harassment, or malicious content). Do not attempt to disrupt the site, probe it without authorization, or abuse third-party services linked from here.",
      ],
    },
    {
      id: "external-links",
      title: "External links",
      body: [
        "Links to GitHub, demos, social profiles, and other sites are provided for convenience. I am not responsible for third-party content, availability, or policies.",
      ],
    },
    {
      id: "availability",
      title: "Availability",
      body: [
        "I may update, pause, or remove pages, demos, or downloads at any time. The site may be temporarily unavailable for maintenance or hosting issues.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      body: [
        "The site is provided without warranties of any kind. Project descriptions reflect my work to the best of my knowledge and may evolve over time.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`Questions about these terms: ${profile.email}`],
    },
  ],
};
