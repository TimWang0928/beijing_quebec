"use client";

import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const content = CONTENT[lang as keyof typeof CONTENT];
  const navPages = ["/", "/about", "/board", "/events", "/membership", "/partners", "/contact"];
  const navItems = content.nav.map((label, index) => ({ label, href: navPages[index] ?? "/" }));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/images/beijing_logo.png" alt="QBA" />
          <div className="nav-logo-text">
            <span className="nav-logo-zh">魁北克北京同乡会</span>
            <span className="nav-logo-fr">L'Association de Beijing du Québec</span>
          </div>
        </Link>

        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <button
            className={`lang-btn ${lang === "fr" ? "active" : ""}`}
            onClick={() => setLang("fr")}
          >
            FR
          </button>
          <button
            className={`lang-btn ${lang === "zh" ? "active" : ""}`}
            onClick={() => setLang("zh")}
          >
            中文
          </button>
          <button
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="mobile-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
    </>
  );
}
