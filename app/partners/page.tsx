"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function PartnersPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      pageLabel: "Partenaires",
      pageTitle: "Nos partenaires",
      pageDesc: "Collaborations et sponsorisations qui nous soutiennent.",
      diamondLabel: "Diamant",
      diamondTitle: "Partenaires principales",
      diamondDesc: "Nos plus grands soutiens.",
      goldLabel: "Or",
      goldTitle: "Partenaires or",
      goldDesc: "Sponsors engagés.",
      silverLabel: "Argent",
      silverTitle: "Partenaires argent",
      silverDesc: "Supporteurs loyaux.",
      communityLabel: "Communauté",
      communityTitle: "Partenaires communautaires",
      communityDesc: "Soutien grassroots.",
      sponsors: [
        { name: "Société Montréal", level: "diamond", desc: "Partenaire principal depuis 2015" },
        { name: "Banque Sino", level: "diamond", desc: "Sponsor financier" },
        { name: "Restaurant Beijing", level: "gold", desc: "Soutien culinaire" },
        { name: "Université McGill", level: "gold", desc: "Partenaire académique" },
        { name: "Librairie Asia", level: "silver", desc: "Ressources culturelles" },
        { name: "Studio Jade", level: "silver", desc: "Arts et culture" },
        { name: "Association Jeunesse", level: "community", desc: "Réseau communautaire" },
        { name: "Église Chinese", level: "community", desc: "Soutien spirituel" },
      ],
      becomeLabel: "Devenir",
      becomeTitle: "Devenir partenaire",
      becomeDesc: "Contactez-nous pour discuter des opportunités de partenariat.",
      becomeLevels: [
        { level: "Diamant", price: "5000+$", benefits: ["Logo en vedette", "5 invitations aux événements", "Annonce médias"] },
        { level: "Or", price: "2500+$", benefits: ["Logo visible", "3 invitations aux événements", "Newsletter"] },
        { level: "Argent", price: "1000+$", benefits: ["Logo mentionné", "2 invitations aux événements"] },
        { level: "Communautaire", price: "$500+", benefits: ["Support symbolique", "1 invitation aux événements"] },
      ],
      contactBtn: "Nous contacter",
    },
    zh: {
      pageLabel: "合作伙伴",
      pageTitle: "我们的合作伙伴",
      pageDesc: "支持我们的合作和赞助。",
      diamondLabel: "钻石",
      diamondTitle: "主要合作伙伴",
      diamondDesc: "我们最大的支持者。",
      goldLabel: "黄金",
      goldTitle: "黄金合作伙伴",
      goldDesc: "认真的赞助商。",
      silverLabel: "银",
      silverTitle: "银级合作伙伴",
      silverDesc: "忠诚的支持者。",
      communityLabel: "社区",
      communityTitle: "社区合作伙伴",
      communityDesc: "草根支持。",
      sponsors: [
        { name: "蒙特利尔社会", level: "diamond", desc: "自 2015 年起的主要合作伙伴" },
        { name: "中国银行", level: "diamond", desc: "财务赞助商" },
        { name: "北京餐厅", level: "gold", desc: "烹饪支持" },
        { name: "麦吉尔大学", level: "gold", desc: "学术合作伙伴" },
        { name: "亚洲图书馆", level: "silver", desc: "文化资源" },
        { name: "玉石工作室", level: "silver", desc: "艺术与文化" },
        { name: "青年协会", level: "community", desc: "社区网络" },
        { name: "中国教堂", level: "community", desc: "精神支持" },
      ],
      becomeLabel: "成为",
      becomeTitle: "成为合作伙伴",
      becomeDesc: "联系我们讨论合作机会。",
      becomeLevels: [
        { level: "钻石", price: "$5000+", benefits: ["特色徽标", "5 个活动邀请", "媒体公告"] },
        { level: "黄金", price: "$2500+", benefits: ["可见徽标", "3 个活动邀请", "新闻通讯"] },
        { level: "银级", price: "$1000+", benefits: ["提到徽标", "2 个活动邀请"] },
        { level: "社区", price: "$500+", benefits: ["象征性支持", "1 个活动邀请"] },
      ],
      contactBtn: "联系我们",
    },
    en: {
      pageLabel: "Partners",
      pageTitle: "Our Partners",
      pageDesc: "Collaborations and sponsorships that support us.",
      diamondLabel: "Diamond",
      diamondTitle: "Principal Partners",
      diamondDesc: "Our greatest supporters.",
      goldLabel: "Gold",
      goldTitle: "Gold Partners",
      goldDesc: "Committed sponsors.",
      silverLabel: "Silver",
      silverTitle: "Silver Partners",
      silverDesc: "Loyal supporters.",
      communityLabel: "Community",
      communityTitle: "Community Partners",
      communityDesc: "Grassroots support.",
      sponsors: [
        { name: "Montreal Society", level: "diamond", desc: "Principal partner since 2015" },
        { name: "Sino Bank", level: "diamond", desc: "Financial sponsor" },
        { name: "Beijing Restaurant", level: "gold", desc: "Culinary support" },
        { name: "McGill University", level: "gold", desc: "Academic partner" },
        { name: "Asia Library", level: "silver", desc: "Cultural resources" },
        { name: "Jade Studio", level: "silver", desc: "Arts and culture" },
        { name: "Youth Association", level: "community", desc: "Community network" },
        { name: "Chinese Church", level: "community", desc: "Spiritual support" },
      ],
      becomeLabel: "Become",
      becomeTitle: "Become a Partner",
      becomeDesc: "Contact us to discuss partnership opportunities.",
      becomeLevels: [
        { level: "Diamond", price: "$5000+", benefits: ["Featured logo", "5 event invitations", "Media announcement"] },
        { level: "Gold", price: "$2500+", benefits: ["Visible logo", "3 event invitations", "Newsletter"] },
        { level: "Silver", price: "$1000+", benefits: ["Logo mentioned", "2 event invitations"] },
        { level: "Community", price: "$500+", benefits: ["Symbolic support", "1 event invitation"] },
      ],
      contactBtn: "Contact Us",
    },
  };

  const c = content[lang as keyof typeof content];

  const diamondSponsors = c.sponsors.filter((s) => s.level === "diamond");
  const goldSponsors = c.sponsors.filter((s) => s.level === "gold");
  const silverSponsors = c.sponsors.filter((s) => s.level === "silver");
  const communitySponsors = c.sponsors.filter((s) => s.level === "community");

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

      {/* Diamond Sponsors */}
      {diamondSponsors.length > 0 && (
        <section style={{ padding: "120px 0" }}>
          <div className="container">
            <div className="sec-label" style={{ color: "var(--gold)" }}>
              {c.diamondLabel}
            </div>
            <div className="gold-line" style={{ background: "var(--gold)" }}></div>
            <h2 className="sec-title-zh">{c.diamondTitle}</h2>
            <p className="sec-sub">{c.diamondDesc}</p>

            <div className="grid-2" style={{ marginTop: "60px", gap: "32px" }}>
              {diamondSponsors.map((sponsor, idx) => (
                <div key={idx} className="card sponsor-card diamond">
                  <div className="sponsor-gem" style={{ fontSize: "32px", marginBottom: "20px" }}>
                    ✦
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
                    {sponsor.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--muted)" }}>
                    {sponsor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gold Sponsors */}
      {goldSponsors.length > 0 && (
        <section style={{ background: "var(--offwhite)", padding: "120px 0" }}>
          <div className="container">
            <div className="sec-label" style={{ color: "#b8860b" }}>
              {c.goldLabel}
            </div>
            <div className="gold-line" style={{ background: "#b8860b" }}></div>
            <h2 className="sec-title-zh">{c.goldTitle}</h2>
            <p className="sec-sub">{c.goldDesc}</p>

            <div className="grid-2" style={{ marginTop: "60px", gap: "32px" }}>
              {goldSponsors.map((sponsor, idx) => (
                <div key={idx} className="card sponsor-card gold-tier">
                  <div className="sponsor-gem" style={{ fontSize: "32px", marginBottom: "20px" }}>
                    ◆
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
                    {sponsor.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--muted)" }}>
                    {sponsor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Silver Sponsors */}
      {silverSponsors.length > 0 && (
        <section style={{ padding: "120px 0" }}>
          <div className="container">
            <div className="sec-label" style={{ color: "#778" }}>
              {c.silverLabel}
            </div>
            <div className="gold-line" style={{ background: "#778" }}></div>
            <h2 className="sec-title-zh">{c.silverTitle}</h2>
            <p className="sec-sub">{c.silverDesc}</p>

            <div className="grid-2" style={{ marginTop: "60px", gap: "32px" }}>
              {silverSponsors.map((sponsor, idx) => (
                <div key={idx} className="card sponsor-card silver">
                  <div className="sponsor-gem" style={{ fontSize: "32px", marginBottom: "20px" }}>
                    ◇
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
                    {sponsor.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--muted)" }}>
                    {sponsor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Community Sponsors */}
      {communitySponsors.length > 0 && (
        <section style={{ background: "var(--offwhite)", padding: "120px 0" }}>
          <div className="container">
            <div className="sec-label">{c.communityLabel}</div>
            <div className="gold-line"></div>
            <h2 className="sec-title-zh">{c.communityTitle}</h2>
            <p className="sec-sub">{c.communityDesc}</p>

            <div className="grid-2" style={{ marginTop: "60px", gap: "32px" }}>
              {communitySponsors.map((sponsor, idx) => (
                <div key={idx} className="card sponsor-card community">
                  <div className="sponsor-gem" style={{ fontSize: "32px", marginBottom: "20px" }}>
                    ⬥
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
                    {sponsor.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--muted)" }}>
                    {sponsor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Become Partner */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.becomeLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.becomeTitle}</h2>
          <p className="sec-sub">{c.becomeDesc}</p>

          <div className="grid-2" style={{ marginTop: "60px", gap: "32px" }}>
            {c.becomeLevels.map((level, idx) => (
              <div key={idx} className="card">
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
                  {level.level}
                </h4>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--red2)", marginBottom: "20px", fontFamily: '"Playfair Display", serif' }}>
                  {level.price}
                </div>
                <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                  {level.benefits.map((benefit, bidx) => (
                    <li
                      key={bidx}
                      style={{
                        fontSize: "14px",
                        color: "var(--navy)",
                        marginBottom: "12px",
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ color: "var(--gold2)" }}>✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="sec-label" style={{ color: "var(--gold2)" }}>
            {lang === "fr" ? "Partenariat" : lang === "zh" ? "伙伴关系" : "Partnership"}
          </div>
          <div className="gold-line" style={{ background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 20px" }}></div>
          <h2 className="sec-title-zh" style={{ color: "#fff" }}>
            {lang === "fr"
              ? "Intéressé par un partenariat?"
              : lang === "zh"
              ? "对合作感兴趣？"
              : "Interested in a partnership?"}
          </h2>
          <p className="sec-sub" style={{ maxWidth: "560px", margin: "0 auto 32px", color: "rgba(255,255,255,0.78)" }}>
            {lang === "fr"
              ? "Contactez notre équipe pour discuter des opportunités."
              : lang === "zh"
              ? "联系我们的团队讨论机会。"
              : "Contact our team to discuss opportunities."}
          </p>
          <Link href="/contact" className="btn-gold">
            {c.contactBtn}
          </Link>
        </div>
      </section>
    </main>
  );
}
