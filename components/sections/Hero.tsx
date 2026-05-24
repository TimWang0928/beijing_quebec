"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useCounter } from "@/hooks/useCounter";
import Link from "next/link";

export default function Hero() {
  const { lang } = useLanguage();
  const { count: count500, ref: ref500 } = useCounter(500, { duration: 2000, start: 0 });
  const { count: count30, ref: ref30 } = useCounter(30, { duration: 2000, start: 0 });
  const { count: count11, ref: ref11 } = useCounter(11, { duration: 2000, start: 0 });

  const content = {
    fr: {
      badge: "Montréal, Québec · Canada · Est. 2013",
      title: "L'Association de Beijing du Québec",
      subtitle: "Quebec Beijing Association · QBA",
      description:
        "Organisation à but non lucratif enregistrée au Québec, l'Association de Beijing du Québec rassemble les Pékinois, favorise les échanges culturels et renforce les liens communautaires.",
      cta1: "Devenir membre",
      cta2: "En savoir plus",
      stat1: "Participants",
      stat2: "Événements",
      stat3: "Années",
      stat4: "Fondation",
    },
    zh: {
      badge: "蒙特利尔，魁北克 · 加拿大 · 成立于 2013",
      title: "魁北克北京同乡会",
      subtitle: "L'Association de Beijing du Québec",
      description:
        "魁北克北京同乡会是在魁北克省依法注册的非营利组织，致力于联络乡情、传承文化、服务社区、促进交流。",
      cta1: "加入我们",
      cta2: "了解更多",
      stat1: "活动参与人次",
      stat2: "已举办活动",
      stat3: "年份",
      stat4: "成立于",
    },
    en: {
      badge: "Montreal, Quebec · Canada · Est. 2013",
      title: "Quebec Beijing Association",
      subtitle: "L'Association de Beijing du Québec",
      description:
        "The Quebec Beijing Association (QBA) is a registered non-profit in Quebec, dedicated to connecting Beijing natives, preserving culture, and promoting cross-cultural exchange.",
      cta1: "Become a Member",
      cta2: "Learn More",
      stat1: "Event Participants",
      stat2: "Events Organized",
      stat3: "Years",
      stat4: "Founded in",
    },
  };

  const c = content[lang as keyof typeof content];

  return (
    <section className="hero">
      <div className="hero-pattern"></div>
      <div className="hero-overlay"></div>
      <div className="hero-decor-zh">京</div>
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge">{c.badge}</div>
          <h1 className="hero-zh">{c.title}</h1>
          <h2 className="hero-fr">{c.subtitle}</h2>
          <div className="hero-divider"></div>
          <p className="hero-desc">{c.description}</p>

          <div className="btn-row">
            <Link href="/membership" className="btn-gold">
              {c.cta1}
            </Link>
            <Link href="/about" className="btn-outline-gold">
              {c.cta2}
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat" ref={ref500}>
              <div className="hero-stat-n">{count500}+</div>
              <div className="hero-stat-l">{c.stat1}</div>
            </div>
            <div className="hero-stat" ref={ref30}>
              <div className="hero-stat-n">{count30}+</div>
              <div className="hero-stat-l">{c.stat2}</div>
            </div>
            <div className="hero-stat" ref={ref11}>
              <div className="hero-stat-n">{count11}</div>
              <div className="hero-stat-l">{c.stat3}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-n">2013</div>
              <div className="hero-stat-l">{c.stat4}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
