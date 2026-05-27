import type { Metadata } from "next";
import { Playfair_Display, Noto_Serif_SC, DM_Sans } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToastProvider } from "@/context/ToastContext";
import Toaster from "@/components/ui/Toaster";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const notoSerifSc = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Association de Beijing du Québec · 魁北克北京同乡会",
  description: "Communauté pékinoise au cœur de Montréal — culture, réseautage et entraide depuis 2013.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${notoSerifSc.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <Navigation />
              {children}
              <Footer />
              <Toaster />
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
