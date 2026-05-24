"use client";

import { renderIcon } from "@/components/Icons";
import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  return (
    <main className="page">
      <section className="page-header">
        <div className="container">
          <div className="sec-label">{c.abPageLabel}</div>
          <h1 className="sec-title-zh">{c.abPageTitle}</h1>
          <p className="sec-sub">{c.abPageDesc}</p>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <div className="grid-2">
            <div className="fade on">
              <div className="sec-label">{c.abIntroLabel}</div>
              <div className="gold-line"></div>
              <h2 className="sec-title-zh">{c.abIntroTitle}</h2>
              <p className="sec-sub">{c.abIntroDesc}</p>
              <div className="about-badges">
                {c.abBadges.map((badge) => (
                  <div key={badge} className="about-badge">
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            <div className="fade on" style={{ transitionDelay: ".15s" }}>
              <div className="about-box">
                <img src="/images/beijing_logo.png" alt="QBA" />
                <div className="about-quote">{c.abQuote}</div>
                <div className="about-quote-sub">{c.abQuoteSub}</div>
                <div className="about-founded">{c.abFounded}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="fade on" style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="sec-label">{c.missionLabel}</div>
            <div className="gold-line" style={{ margin: "0 auto 20px" }}></div>
            <h2 className="sec-title-zh" style={{ textAlign: "center" }}>
              {c.missionTitle}
            </h2>
          </div>
          <div className="grid-3 fade on">
            {c.missions.map((mission) => (
              <div key={mission.title} className="card">
                <div className="card-icon">{renderIcon(mission.icon, { size: 28 })}</div>
                <h4>{mission.title}</h4>
                <p>{mission.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <div className="fade on">
            <div className="sec-label">{c.presLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.presTitle}</h2>
          </div>
          <div className="fade on" style={{ marginTop: "32px", transitionDelay: ".15s" }}>
            <div className="pres-card">
              <span className="pres-quote-mark">"</span>
              <p className="pres-text">{c.presText}</p>
              <div className="pres-sig">
                <div className="pres-name-main">{c.presName}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}