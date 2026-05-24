"use client";

import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Intro() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  return (
    <section style={{ background: "var(--offwhite)" }}>
      <div className="container">
        <div className="grid-2">
          <div className="fade on">
            <div className="sec-label">{c.introLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.introTitle}</h2>
            <p className="sec-sub">{c.introDesc}</p>
            <Link href="/about" className="btn-outline">
              {c.introBtn}
            </Link>
          </div>
          <div className="fade on" style={{ transitionDelay: ".15s" }}>
            <div className="about-box">
              <img src="/images/beijing_logo.png" alt="QBA Logo" />
              <div className="about-quote">{c.homeQuote}</div>
              <div className="about-quote-sub">{c.homeQuoteSub}</div>
              <div className="about-founded">{c.homeFounded}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
