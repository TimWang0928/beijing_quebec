"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function AboutPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      pageLabel: "À propos",
      pageTitle: "关于我们",
      pageDesc: "Découvrez notre histoire, notre mission et les valeurs qui nous unissent.",
      introLabel: "Notre association",
      introTitle: "L'Association de Beijing du Québec",
      introDesc:
        "L'Association de Beijing du Québec (QBA) is a registered non-profit in Quebec. Our mission: relier les Pékinois du Québec, préserver la culture pékinoise et promouvoir les échanges interculturels.",
      badges: ["À but non lucratif", "Enregistrée au Québec", "Trilingue FR · ZH · EN", "Depuis 2013"],
      quote: "联络乡情，传承文化，服务社区，促进交流",
      quoteSub: "Connecter, Préserver, Servir, Promouvoir",
      founded: "Fondée le 29 novembre 2013 · Montréal",
      missionLabel: "Notre mission",
      missionTitle: "Nos valeurs fondamentales",
      missions: [
        { title: "Liens communautaires", desc: "Renforcer les liens d'amitié et d'entraide entre les Pékinois résidant au Québec." },
        { title: "Héritage culturel", desc: "Préserver et promouvoir la culture pékinoise et le patrimoine culturel chinois traditionnel." },
        { title: "Échanges interculturels", desc: "Favoriser l'intégration et les échanges entre la communauté et la société québécoise." },
      ],
      presLabel: "Message de la présidente",
      presTitle: "会长寄语",
      presText: "Au nom du Conseil d'administration de l'Association de Beijing du Québec, je vous souhaite la bienvenue. Depuis sa fondation en 2013, notre association s'est engagée à créer un espace chaleureux pour les Pékinois du Québec — un lieu de partage, de soutien mutuel et de transmission culturelle. Ensemble, nous continuons à bâtir des ponts entre nos communautés et la société québécoise, dans un esprit d'ouverture et de collaboration.",
      presName: "李林黛 · Présidente, Association de Beijing du Québec",
    },
    zh: {
      pageLabel: "关于",
      pageTitle: "关于我们",
      pageDesc: "了解我们的历史、使命和价值观。",
      introLabel: "我们的协会",
      introTitle: "魁北克北京同乡会",
      introDesc: "魁北克北京同乡会 (QBA) 是在魁北克注册的非营利组织。我们的使命是：联络乡情、传承文化、促进交流。",
      badges: ["非营利组织", "魁北克注册", "三语服务 FR · ZH · EN", "成立于 2013"],
      quote: "联络乡情，传承文化，服务社区，促进交流",
      quoteSub: "连接、保护、服务、促进",
      founded: "2013 年 11 月 29 日成立 · 蒙特利尔",
      missionLabel: "我们的使命",
      missionTitle: "核心价值观",
      missions: [
        { title: "社区纽带", desc: "加强魁北克地区北京人之间的友谊和相互帮助。" },
        { title: "文化遗产", desc: "保护和弘扬北京文化和中华传统文化遗产。" },
        { title: "文化交流", desc: "促进社区与魁北克社会之间的融合和交流。" },
      ],
      presLabel: "会长寄语",
      presTitle: "会长寄语",
      presText: "代表魁北克北京同乡会董事会，我诚挚欢迎您。自 2013 年成立以来，我们致力于为魁北克的北京人创造一个温暖的空间——一个分享、相互支持和文化传承的地方。我们继续在开放和协作的精神中为我们的社区和魁北克社会之间搭建桥梁。",
      presName: "李林黛 · 主席，魁北克北京同乡会",
    },
    en: {
      pageLabel: "About",
      pageTitle: "About Us",
      pageDesc: "Learn about our history, mission and the values that unite us.",
      introLabel: "Our Association",
      introTitle: "Quebec Beijing Association",
      introDesc: "Quebec Beijing Association (QBA) is a registered non-profit in Quebec. Our mission: connect Beijingers, preserve Beijing culture and promote cultural exchange.",
      badges: ["Non-profit", "Quebec Registered", "Trilingual FR · ZH · EN", "Founded 2013"],
      quote: "Connect · Preserve · Serve · Promote",
      quoteSub: "联络乡情，传承文化，服务社区，促进交流",
      founded: "Founded November 29, 2013 · Montreal",
      missionLabel: "Our Mission",
      missionTitle: "Core Values",
      missions: [
        { title: "Community Bonds", desc: "Strengthen friendship and mutual support among Beijingers in Quebec." },
        { title: "Cultural Heritage", desc: "Preserve and promote Beijing culture and traditional Chinese heritage." },
        { title: "Cultural Exchange", desc: "Foster integration and exchange between our community and Quebec society." },
      ],
      presLabel: "Message from the President",
      presTitle: "President's Message",
      presText: "On behalf of the Board of Directors of the Quebec Beijing Association, I warmly welcome you. Since our founding in 2013, our association has been committed to creating a welcoming space for Beijingers in Quebec — a place for sharing, mutual support and cultural transmission. Together we continue to build bridges between our communities and Quebec society, in a spirit of openness and collaboration.",
      presName: "Li Lindai · President, Quebec Beijing Association",
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

      {/* Introduction */}
      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <div className="grid-2">
            <div>
              <div className="sec-label">{c.introLabel}</div>
              <div className="gold-line"></div>
              <h2 className="sec-title">{c.introTitle}</h2>
              <p className="sec-sub">{c.introDesc}</p>
              <div className="about-badges">
                {c.badges.map((badge) => (
                  <div key={badge} className="about-badge">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
            <div className="about-box">
              <img src="data:image/png;base64,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" alt="QBA Logo" />
              <div className="about-quote">{c.quote}</div>
              <div className="about-quote-sub">{c.quoteSub}</div>
              <div className="about-founded">{c.founded}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Missions/Values */}
      <section>
        <div className="container">
          <div className="sec-label">{c.missionLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.missionTitle}</h2>
          <div className="grid-3" style={{ marginTop: "60px" }}>
            {c.missions.map((mission, idx) => (
              <div key={idx} className="card">
                <h4>{mission.title}</h4>
                <p>{mission.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* President's Message */}
      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <div className="grid-2">
            <div>
              <div className="sec-label">{c.presLabel}</div>
              <div className="gold-line"></div>
              <h2 className="sec-title-zh">{c.presTitle}</h2>
            </div>
            <div>
              <p className="sec-sub" style={{ fontStyle: "italic", marginBottom: "24px" }}>
                {c.presText}
              </p>
              <p style={{ fontWeight: "700", color: "var(--navy)" }}>{c.presName}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: "var(--navy)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="sec-label" style={{ color: "var(--gold2)" }}>
            {lang === "fr" ? "Prêt à participer?" : lang === "zh" ? "准备好加入了吗?" : "Ready to join?"}
          </div>
          <div className="gold-line" style={{ background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 20px" }}></div>
          <h2 className="sec-title-zh" style={{ color: "#fff" }}>
            {lang === "fr" ? "Rejoignez notre communauté" : lang === "zh" ? "加入我们的社区" : "Join Our Community"}
          </h2>
          <p className="sec-sub" style={{ maxWidth: "560px", margin: "0 auto 32px", color: "rgba(255,255,255,0.78)" }}>
            {lang === "fr" ? "Devenez membre et participez à nos événements, activités et initiatives." : lang === "zh" ? "成为会员，参与我们的活动和倡议。" : "Become a member and participate in our events and activities."}
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/membership" className="btn-gold">
              {lang === "fr" ? "Adhérer maintenant" : lang === "zh" ? "立即加入" : "Join Now"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
