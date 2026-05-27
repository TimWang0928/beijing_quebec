"use client";

import { useEffect } from "react";

import { renderIcon } from "@/components/Icons";
import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";

export default function EventsPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];
  const pageTitle = lang === "fr" ? "活动资讯" : c.evPageTitle;

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main.page");

    if (!root) {
      return;
    }

    root
      .querySelectorAll<HTMLElement>(".card,.event-card,.board-card,.sponsor-card,.spec-card,.member-type-pill")
      .forEach((element, index) => {
        element.style.transitionDelay = `${index * 70}ms`;
      });

    const revealVisible = () => {
      root.querySelectorAll<HTMLElement>(".fade:not(.on)").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          element.classList.add("on");
        }
      });
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("on");
                  observer!.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
          )
        : null;

    root.querySelectorAll<HTMLElement>(".fade:not(.on)").forEach((element) => {
      observer?.observe(element);
    });

    revealVisible();

    window.addEventListener("scroll", revealVisible, { passive: true });
    window.addEventListener("resize", revealVisible);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", revealVisible);
      window.removeEventListener("resize", revealVisible);
    };
  }, [lang]);

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
          <div className="fade" style={{ marginBottom: "40px" }}>
            <div className="sec-label">{c.evUpLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.evUpTitle}</h2>
          </div>
          <div className="grid-3 fade">
            {c.events.map((event, index) => (
              <div
                key={event.title}
                className="event-card fade"
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
          <div className="fade" style={{ marginBottom: "40px" }}>
            <div className="sec-label">{c.evBrandLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.evBrandTitle}</h2>
            <p className="sec-sub">{c.evBrandDesc}</p>
          </div>
          <div className="grid-4 fade">
            {c.evBrand.map((brand, index) => (
              <div
                key={brand.title}
                className="card fade"
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
