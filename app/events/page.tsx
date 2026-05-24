"use client";

import { renderIcon } from "@/components/Icons";
import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";

export default function EventsPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];
  const pageTitle = lang === "fr" ? "活动资讯" : c.evPageTitle;

  return (
    <main className="page">
      <section className="page-header">
        <div className="container">
          <div className="sec-label">{c.evPageLabel}</div>
          <h1 className="sec-title-zh">{pageTitle}</h1>
          <p className="sec-sub">{c.evPageDesc}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="fade on" style={{ marginBottom: "40px" }}>
            <div className="sec-label">{c.evUpLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.evUpTitle}</h2>
          </div>
          <div className="grid-3 fade on">
            {c.events.map((event, index) => (
              <div
                key={event.title}
                className="event-card fade on"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className={`event-top ev-${event.evColor}`}>
                  <div className="event-icon-wrap">{renderIcon(event.emoji, { size: 26 })}</div>
                  <span className="event-tag">{event.tag}</span>
                </div>
                <div className="event-body">
                  <h4>{event.title}</h4>
                  <p>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <div className="fade on" style={{ marginBottom: "40px" }}>
            <div className="sec-label">{c.evBrandLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.evBrandTitle}</h2>
            <p className="sec-sub">{c.evBrandDesc}</p>
          </div>
          <div className="grid-4 fade on">
            {c.evBrand.map((brand, index) => (
              <div
                key={brand.title}
                className="card fade on"
                style={{ textAlign: "center", transitionDelay: `${index * 0.08}s` }}
              >
                <div className="brand-icon-wrap" style={{ margin: "0 auto" }}>
                  {renderIcon(brand.icon, { size: 28 })}
                </div>
                <h4>{brand.title}</h4>
                <p>{brand.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
