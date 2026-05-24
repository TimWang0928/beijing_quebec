"use client";

import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";
import { renderIcon } from "@/components/Icons";
import Link from "next/link";

export default function HomeEventsPreview() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  return (
    <section>
      <div className="container">
        <div
          className="fade on"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}
        >
          <div>
            <div className="sec-label">{c.evPreLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.evPreTitle}</h2>
          </div>
          <Link href="/events" className="btn-outline">
            {c.evPreBtn}
          </Link>
        </div>

        <div className="grid-3 fade on">
          {c.events.slice(0, 3).map((event, index) => (
            <div key={event.title} className="event-card fade on" style={{ transitionDelay: `${index * 0.08}s` }}>
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
  );
}