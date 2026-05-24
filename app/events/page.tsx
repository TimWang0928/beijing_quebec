"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function EventsPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      pageLabel: "Événements",
      pageTitle: "Nos événements",
      pageDesc: "Découvrez nos activités et manifestations culturelles.",
      upcomingLabel: "À venir",
      upcomingTitle: "Événements à venir",
      upcomingDesc: "Rejoignez-nous pour des événements inoubliables.",
      events: [
        {
          date: "15 mars",
          title: "Dîner de gala",
          desc: "Soirée de célébration avec musique traditionnelle et gastronomie.",
          tag: "Social",
          color: "ev-red",
        },
        {
          date: "22 mars",
          title: "Atelier de calligraphie",
          desc: "Découvrez l'art ancestral de la calligraphie chinoise.",
          tag: "Culture",
          color: "ev-amber",
        },
        {
          date: "5 avril",
          title: "Fête de Qingming",
          desc: "Célébration de la fête traditionnelle du renouveau.",
          tag: "Festivité",
          color: "ev-green",
        },
        {
          date: "18 avril",
          title: "Randonnée du groupe",
          desc: "Exploration de la nature avec les membres de l'association.",
          tag: "Sport",
          color: "ev-teal",
        },
      ],
      brandLabel: "Initiatives",
      brandTitle: "Programmes spéciaux",
      brandDesc: "Nos projets phares tout au long de l'année.",
      brands: [
        {
          title: "Programme d'échange",
          desc: "Renforcer les liens culturels avec Beijing.",
          icon: "🌏",
        },
        {
          title: "Bourses jeunesse",
          desc: "Soutenir l'éducation et la formation des jeunes.",
          icon: "📚",
        },
        {
          title: "Volunteer Day",
          desc: "Contribuer à la communauté par le bénévolat.",
          icon: "🤝",
        },
      ],
    },
    zh: {
      pageLabel: "活动",
      pageTitle: "我们的活动",
      pageDesc: "发现我们的文化活动和庆祝活动。",
      upcomingLabel: "即将到来",
      upcomingTitle: "即将举行的活动",
      upcomingDesc: "加入我们参加难忘的活动。",
      events: [
        {
          date: "3月15日",
          title: "慈善晚宴",
          desc: "传统音乐和美食庆祝活动。",
          tag: "社交",
          color: "ev-red",
        },
        {
          date: "3月22日",
          title: "书法工作坊",
          desc: "发现中国书法的古老艺术。",
          tag: "文化",
          color: "ev-amber",
        },
        {
          date: "4月5日",
          title: "清明节庆祝",
          desc: "传统春天新生的庆祝活动。",
          tag: "节日",
          color: "ev-green",
        },
        {
          date: "4月18日",
          title: "集体登山",
          desc: "与协会成员一起探索自然。",
          tag: "体育",
          color: "ev-teal",
        },
      ],
      brandLabel: "倡议",
      brandTitle: "特别项目",
      brandDesc: "我们全年的旗舰项目。",
      brands: [
        {
          title: "交流项目",
          desc: "加强与北京的文化联系。",
          icon: "🌏",
        },
        {
          title: "青年奖学金",
          desc: "支持青年教育和培训。",
          icon: "📚",
        },
        {
          title: "志愿者日",
          desc: "通过志愿服务为社区做出贡献。",
          icon: "🤝",
        },
      ],
    },
    en: {
      pageLabel: "Events",
      pageTitle: "Our Events",
      pageDesc: "Discover our cultural activities and celebrations.",
      upcomingLabel: "Upcoming",
      upcomingTitle: "Upcoming Events",
      upcomingDesc: "Join us for unforgettable events.",
      events: [
        {
          date: "March 15",
          title: "Charity Gala",
          desc: "Evening celebration with traditional music and fine dining.",
          tag: "Social",
          color: "ev-red",
        },
        {
          date: "March 22",
          title: "Calligraphy Workshop",
          desc: "Discover the ancient art of Chinese calligraphy.",
          tag: "Culture",
          color: "ev-amber",
        },
        {
          date: "April 5",
          title: "Qingming Festival",
          desc: "Celebration of the traditional spring renewal festival.",
          tag: "Festival",
          color: "ev-green",
        },
        {
          date: "April 18",
          title: "Group Hiking",
          desc: "Explore nature with association members.",
          tag: "Sports",
          color: "ev-teal",
        },
      ],
      brandLabel: "Initiatives",
      brandTitle: "Special Programs",
      brandDesc: "Our flagship projects throughout the year.",
      brands: [
        {
          title: "Exchange Program",
          desc: "Strengthen cultural ties with Beijing.",
          icon: "🌏",
        },
        {
          title: "Youth Scholarships",
          desc: "Support education and training for youth.",
          icon: "📚",
        },
        {
          title: "Volunteer Day",
          desc: "Contribute to the community through volunteering.",
          icon: "🤝",
        },
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

      {/* Upcoming Events */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.upcomingLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.upcomingTitle}</h2>
          <p className="sec-sub" style={{ maxWidth: "600px", marginBottom: "60px" }}>
            {c.upcomingDesc}
          </p>

          <div className="grid-2" style={{ gap: "32px" }}>
            {c.events.map((event, idx) => (
              <div key={idx} className="card" style={{ overflow: "hidden", borderRadius: "16px" }}>
                <div className={`event-top ${event.color}`} style={{ padding: "24px 0", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--gold2)" }}>
                    {event.date}
                  </div>
                  <span className="event-tag" style={{ display: "inline-block", marginTop: "12px" }}>
                    {event.tag}
                  </span>
                </div>
                <div style={{ padding: "24px" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
                    {event.title}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>
                    {event.desc}
                  </p>
                  <button className="btn-outline" style={{ marginTop: "16px", fontSize: "12px" }}>
                    {lang === "fr" ? "En savoir plus" : lang === "zh" ? "了解更多" : "Learn More"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section style={{ background: "var(--offwhite)", padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.brandLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.brandTitle}</h2>
          <p className="sec-sub" style={{ maxWidth: "600px", marginBottom: "60px" }}>
            {c.brandDesc}
          </p>

          <div className="grid-3">
            {c.brands.map((brand, idx) => (
              <div key={idx} className="card" style={{ textAlign: "center" }}>
                <div className="brand-icon-wrap" style={{ display: "inline-flex" }}>
                  <span style={{ fontSize: "32px" }}>{brand.icon}</span>
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "12px" }}>
                  {brand.title}
                </h4>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>
                  {brand.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section style={{ background: "var(--navy)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="sec-label" style={{ color: "var(--gold2)" }}>
            {lang === "fr" ? "Restez informé" : lang === "zh" ? "保持更新" : "Stay Updated"}
          </div>
          <div className="gold-line" style={{ background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 20px" }}></div>
          <h2 className="sec-title-zh" style={{ color: "#fff" }}>
            {lang === "fr" ? "S'abonner à nos actualités" : lang === "zh" ? "订阅我们的新闻" : "Subscribe to Our Newsletter"}
          </h2>
          <p className="sec-sub" style={{ maxWidth: "560px", margin: "0 auto 32px", color: "rgba(255,255,255,0.78)" }}>
            {lang === "fr" ? "Recevez les annonces des événements et actualités directement dans votre boîte mail." : lang === "zh" ? "直接在您的收件箱中接收活动公告和新闻。" : "Get event announcements and news directly to your inbox."}
          </p>
          <form style={{ display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder={lang === "fr" ? "Votre email" : lang === "zh" ? "您的邮箱" : "Your email"}
              required
              style={{
                flex: 1,
                padding: "14px 20px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
            <button type="submit" className="btn-gold">
              {lang === "fr" ? "S'abonner" : lang === "zh" ? "订阅" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
