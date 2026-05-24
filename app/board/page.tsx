"use client";

import { renderIcon } from "@/components/Icons";
import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";

export default function BoardPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  return (
    <main className="page">
      <section className="page-header dark-section">
        <div className="container">
          <div className="sec-label">{c.bdPageLabel}</div>
          <h1 className="sec-title-zh">{c.bdPageTitle}</h1>
          <p className="sec-sub">{c.bdPageDesc}</p>
        </div>
      </section>

      <section className="dark-section">
        <div className="container">
          <div className="fade on">
            <div className="sec-label">{c.bdCoreLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh" style={{ color: "#fff" }}>
              {c.bdCoreTitle}
            </h2>
          </div>

          <div className="board-core fade on">
            {c.boardCore.map((member) => (
              <div key={member.name} className="board-card">
                <div className="board-av">{member.init}</div>
                <div className="board-name">{member.name}</div>
                <div className="board-role-txt">{member.role}</div>
              </div>
            ))}
          </div>

          <div className="fade on" style={{ marginTop: "40px" }}>
            <div className="sec-label" style={{ marginBottom: "16px" }}>
              {c.bdSpecLabel}
            </div>
            <div className="spec-grid">
              {c.boardSpec.map((member) => (
                <div key={`${member.name}-${member.role}`} className="spec-card">
                  <div className="spec-name">{member.name}</div>
                  <div className="spec-role">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="fade on" style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="sec-label">{c.bdPrinLabel}</div>
            <div className="gold-line" style={{ margin: "0 auto 16px" }}></div>
            <h2 className="sec-title-zh" style={{ textAlign: "center" }}>
              {c.bdPrinTitle}
            </h2>
          </div>

          <div className="grid-4 fade on">
            {c.principles.map((principle) => (
              <div key={principle.title} className="card fade on">
                <div className="card-icon">{renderIcon(principle.icon, { size: 28 })}</div>
                <h4>{principle.title}</h4>
                <p>{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
