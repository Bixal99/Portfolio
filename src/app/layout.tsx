import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { InteractionFeedback } from "@/components/InteractionFeedback";
import { PageProgress } from "@/components/PageProgress";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  // No above-the-fold element uses this optional monospace family.
  preload: false,
});

export const metadata: Metadata = {
  title: "Mohammad Bilal | Software Engineer & AI Engineer",
  description:
    "Mohammad Bilal portfolio: AI engineering, computer vision, machine learning, full-stack development, and software systems projects.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#080b12" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        <InteractionFeedback />
        <PageProgress />
        {children}
      </body>
    </html>
  );
}


