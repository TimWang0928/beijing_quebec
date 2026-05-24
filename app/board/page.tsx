"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function BoardPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      pageLabel: "Conseil",
      pageTitle: "Conseil d'administration",
      pageDesc: "Rencontrez les dirigeants de notre association.",
      coreLabel: "Direction",
      coreTitle: "Membres du cœur",
      coreMember: [
        { name: "李林黛", title: "Présidente", desc: "Fondatrice et présidente depuis 2013." },
        { name: "张明远", title: "Vice-président", desc: "Responsable des événements et initiatives." },
        { name: "王小红", title: "Trésorière", desc: "Gestion financière et budgétaire." },
        { name: "陈思芸", title: "Secrétaire", desc: "Communications et archives." },
        { name: "林大卫", title: "Directeur culture", desc: "Programme culturel et patrimonial." },
        { name: "蒙志强", title: "Directeur partenariats", desc: "Collaborations et sponsorships." },
      ],
      specLabel: "Spécialistes",
      specTitle: "Comités spécialisés",
      specMembers: [
        { area: "Éducation", members: "4 membres" },
        { area: "Jeunesse", members: "3 membres" },
        { area: "Culture", members: "5 membres" },
        { area: "Ressources", members: "2 membres" },
      ],
      prinLabel: "Principes",
      prinTitle: "Nos principes directeurs",
      principles: [
        { title: "Transparence", desc: "Gouvernance ouverte et honnêteté envers nos membres." },
        { title: "Inclusivité", desc: "Bienvenue à tous, indépendamment de l'origine." },
        { title: "Durabilité", desc: "Construire pour l'avenir à long terme." },
        { title: "Excellence", desc: "Poursuivre l'excellence dans tous nos efforts." },
      ],
    },
    zh: {
      pageLabel: "理事会",
      pageTitle: "理事会",
      pageDesc: "认识我们协会的领导。",
      coreLabel: "领导",
      coreTitle: "核心成员",
      coreMember: [
        { name: "李林黛", title: "主席", desc: "自 2013 年以来的创始人兼主席。" },
        { name: "张明远", title: "副主席", desc: "负责活动和倡议。" },
        { name: "王小红", title: "财务主管", desc: "财务和预算管理。" },
        { name: "陈思芸", title: "秘书", desc: "通讯和档案。" },
        { name: "林大卫", title: "文化主任", desc: "文化和遗产计划。" },
        { name: "蒙志强", title: "合作伙伴主任", desc: "合作和赞助。" },
      ],
      specLabel: "专家",
      specTitle: "专业委员会",
      specMembers: [
        { area: "教育", members: "4 名成员" },
        { area: "青年", members: "3 名成员" },
        { area: "文化", members: "5 名成员" },
        { area: "资源", members: "2 名成员" },
      ],
      prinLabel: "原则",
      prinTitle: "我们的指导原则",
      principles: [
        { title: "透明度", desc: "开放治理和对成员的诚实。" },
        { title: "包容性", desc: "欢迎所有人，无论背景如何。" },
        { title: "可持续性", desc: "为长期未来而建设。" },
        { title: "卓越", desc: "在我们的所有努力中追求卓越。" },
      ],
    },
    en: {
      pageLabel: "Board",
      pageTitle: "Board of Directors",
      pageDesc: "Meet the leaders of our association.",
      coreLabel: "Leadership",
      coreTitle: "Core Members",
      coreMember: [
        { name: "Li Lindai", title: "President", desc: "Founder and president since 2013." },
        { name: "Zhang Mingyuan", title: "Vice President", desc: "Responsible for events and initiatives." },
        { name: "Wang Xiaohong", title: "Treasurer", desc: "Financial and budgetary management." },
        { name: "Chen Siyun", title: "Secretary", desc: "Communications and archives." },
        { name: "Lin David", title: "Cultural Director", desc: "Cultural and heritage program." },
        { name: "Meng Zhiqiang", title: "Partnership Director", desc: "Collaborations and sponsorships." },
      ],
      specLabel: "Specialists",
      specTitle: "Specialist Committees",
      specMembers: [
        { area: "Education", members: "4 members" },
        { area: "Youth", members: "3 members" },
        { area: "Culture", members: "5 members" },
        { area: "Resources", members: "2 members" },
      ],
      prinLabel: "Principles",
      prinTitle: "Our Guiding Principles",
      principles: [
        { title: "Transparency", desc: "Open governance and honesty towards our members." },
        { title: "Inclusivity", desc: "Welcome to all, regardless of background." },
        { title: "Sustainability", desc: "Building for long-term future." },
        { title: "Excellence", desc: "Pursuing excellence in all our endeavors." },
      ],
    },
  };

  const c = content[lang as keyof typeof content];

  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="sec-label">{c.pageLabel}</div>
          <h1 className="sec-title-zh">{c.pageTitle}</h1>
          <p className="sec-sub">{c.pageDesc}</p>
        </div>
      </section>

      {/* Core Members */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.coreLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.coreTitle}</h2>

          <div className="grid-3" style={{ marginTop: "60px", gap: "32px" }}>
            {c.coreMember.map((member, idx) => (
              <div key={idx} className="card">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,var(--gold),var(--red2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "32px",
                    fontWeight: "700",
                    marginBottom: "20px",
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "4px" }}>
                  {member.name}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--red2)", fontWeight: "600", marginBottom: "12px", textTransform: "uppercase", letterSpacing: ".08em" }}>
                  {member.title}
                </p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Committees */}
      <section style={{ background: "var(--offwhite)", padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.specLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.specTitle}</h2>

          <div className="grid-2" style={{ marginTop: "60px", gap: "32px" }}>
            {c.specMembers.map((spec, idx) => (
              <div key={idx} className="card" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg,rgba(212, 175, 55, 0.1),rgba(212, 175, 55, 0.03))",
                    border: "1px solid rgba(212, 175, 55, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    fontSize: "24px",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  {spec.area.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "4px" }}>
                    {spec.area}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0" }}>
                    {spec.members}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.prinLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.prinTitle}</h2>

          <div className="grid-2" style={{ marginTop: "60px", gap: "48px" }}>
            {c.principles.map((principle, idx) => (
              <div key={idx}>
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,var(--gold),var(--gold2))",
                      color: "var(--navy)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </span>
                  {principle.title}
                </h4>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginLeft: "44px" }}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section style={{ background: "var(--navy)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="sec-label" style={{ color: "var(--gold2)" }}>
            {lang === "fr" ? "Impliquez-vous" : lang === "zh" ? "参与其中" : "Get Involved"}
          </div>
          <div className="gold-line" style={{ background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 20px" }}></div>
          <h2 className="sec-title-zh" style={{ color: "#fff" }}>
            {lang === "fr" ? "Rejoignez notre équipe" : lang === "zh" ? "加入我们的团队" : "Join Our Team"}
          </h2>
          <p className="sec-sub" style={{ maxWidth: "560px", margin: "0 auto 32px", color: "rgba(255,255,255,0.78)" }}>
            {lang === "fr"
              ? "Nous recherchons des bénévoles passionnés pour nous aider."
              : lang === "zh"
              ? "我们正在寻找充满激情的志愿者来帮助我们。"
              : "We are looking for passionate volunteers to help us."}
          </p>
          <button className="btn-gold">
            {lang === "fr" ? "Nous contacter" : lang === "zh" ? "联系我们" : "Contact Us"}
          </button>
        </div>
      </section>
    </main>
  );
}
