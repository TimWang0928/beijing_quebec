"use client";

import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLanguage();
  const content = CONTENT[lang as keyof typeof CONTENT];
  const footerPaths = ["/", "/about", "/events", "/membership", "/contact"];
  const footerLinks = content.footerLinks.map((label, index) => ({
    label,
    href: footerPaths[index] ?? "/",
  }));

  return (
    <footer className="footer" id="mainFooter">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-zh">魁北克北京同乡会</div>
            <div className="footer-fr">L'Association de Beijing du Québec · QBA</div>
          </div>
          <div className="footer-links">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">{content.footerCopy}</div>
          <div className="footer-copy">aqcbeijing@gmail.com · 514-566-6826</div>
        </div>
      </div>
    </footer>
  );
}
