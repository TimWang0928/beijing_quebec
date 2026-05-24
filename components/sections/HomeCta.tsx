"use client";

import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function HomeCta() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  return (
    <section className="dark-section" style={{ background: "var(--navy)" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="fade on">
          <div className="sec-label">{c.ctaLabel}</div>
          <div className="gold-line" style={{ background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 20px" }}></div>
          <h2 className="sec-title-zh" style={{ color: "#fff", textAlign: "center" }}>
            {c.ctaTitle}
          </h2>
          <p className="sec-sub" style={{ maxWidth: "560px", margin: "0 auto 32px" }}>
            {c.ctaDesc}
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/membership" className="btn-gold">
              {c.ctaBtn1}
            </Link>
            <Link href="/contact" className="btn-outline-gold">
              {c.ctaBtn2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}