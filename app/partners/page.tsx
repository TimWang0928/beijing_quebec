"use client";

import Link from "next/link";
import { renderIcon } from "@/components/Icons";
import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";

export default function PartnersPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  return (
    <main className="page">
      <section className="page-header">
        <div className="container">
          <div className="sec-label">{c.ptPageLabel}</div>
          <h1 className="sec-title-zh">{c.ptPageTitle}</h1>
          <p className="sec-sub">{c.ptPageDesc}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="fade on" style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="sec-label">{c.ptLvlLabel}</div>
            <div className="gold-line" style={{ margin: "0 auto 16px" }}></div>
            <h2 className="sec-title-zh" style={{ textAlign: "center" }}>
              {c.ptLvlTitle}
            </h2>
          </div>
          <div className="grid-4 fade on">
            {c.sponsors.map((sponsor, index) => (
              <div
                key={sponsor.name}
                className={`sponsor-card ${sponsor.cls} fade on`}
                style={{ transitionDelay: `${index * 0.06}s` }}
              >
                <div className="sponsor-gem">{renderIcon(sponsor.gem, { size: 30 })}</div>
                <div className="sponsor-name">{sponsor.name}</div>
                <div className="sponsor-desc">{sponsor.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="fade on">
            <h2 className="sec-title-zh" style={{ textAlign: "center" }}>
              {c.ptCtaTitle}
            </h2>
            <p className="sec-sub" style={{ maxWidth: "560px", margin: "0 auto 28px" }}>
              {c.ptCtaDesc}
            </p>
            <Link href="/contact" className="btn-red">
              {c.ptCtaBtn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
