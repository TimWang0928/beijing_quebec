import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import HomeEventsPreview from "@/components/sections/HomeEventsPreview";
import HomeCta from "@/components/sections/HomeCta";

export const metadata: Metadata = {
  title: "Association de Beijing du Québec · 魁北克北京同乡会",
  description: "Communauté pékinoise au cœur de Montréal — culture, réseautage et entraide depuis 2013.",
  openGraph: {
    type: "website",
    url: "https://association-beijing-quebec.ca",
    title: "Association de Beijing du Québec · 魁北克北京同乡会",
    description: "Communauté pékinoise au cœur de Montréal — culture, réseautage et entraide depuis 2013.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <HomeEventsPreview />
      <HomeCta />
    </main>
  );
}
