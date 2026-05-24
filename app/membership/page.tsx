"use client";

import Link from "next/link";
import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";

export default function MembershipPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  return (
    <main className="page">
      <section className="page-header">
        <div className="container">
          <div className="sec-label">{c.mbPageLabel}</div>
          <h1 className="sec-title-zh">{c.mbPageTitle}</h1>
          <p className="sec-sub">{c.mbPageDesc}</p>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <div className="grid-2">
            <div className="fade on">
              <div className="sec-label">{c.mbBenLabel}</div>
              <div className="gold-line"></div>
              <h2 className="sec-title-zh">{c.mbBenTitle}</h2>
              <div style={{ marginTop: "24px" }}>
                {c.benefits.map((benefit, index) => (
                  <div key={benefit} className="member-benefit">
                    <div className="benefit-num">{index + 1}</div>
                    <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: "1.6" }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade on" style={{ transitionDelay: ".15s" }}>
              <div className="sec-label">{c.mbTypLabel}</div>
              <div className="gold-line"></div>
              <h2 className="sec-title-zh">{c.mbTypTitle}</h2>
              <div style={{ marginTop: "24px", display: "grid", gap: "10px" }}>
                {c.memberTypes.map((memberType) => (
                  <div key={memberType} className="member-type-pill">
                    {memberType}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="fade on">
            <div className="sec-label" style={{ color: "var(--gold)" }}>
              {c.mbJoinLabel}
            </div>
            <div
              className="gold-line"
              style={{ background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 20px" }}
            ></div>
            <h2 className="sec-title-zh" style={{ color: "#fff", textAlign: "center" }}>
              {c.mbJoinTitle}
            </h2>
            <p className="sec-sub" style={{ maxWidth: "540px", margin: "0 auto 32px" }}>
              {c.mbJoinDesc}
            </p>
            <Link href="/contact" className="btn-gold">
              {c.mbJoinBtn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
