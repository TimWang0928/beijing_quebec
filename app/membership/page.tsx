"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function MembershipPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      pageLabel: "Adhésion",
      pageTitle: "Devenir membre",
      pageDesc: "Rejoignez notre communauté et participez à nos initiatives.",
      benLabel: "Avantages",
      benTitle: "Bénéfices de l'adhésion",
      benefits: [
        "Accès à tous les événements et activités",
        "Réseautage avec la communauté",
        "Support et ressources culturelles",
        "Bulletin d'information mensuel",
        "Tarifs réduits pour les événements",
        "Participation à la gouvernance",
      ],
      typLabel: "Catégories",
      typTitle: "Types d'adhésion",
      types: [
        {
          name: "Étudiant",
          price: "15$",
          desc: "Pour les étudiants actuels",
          features: ["Accès à tous les événements", "Support communautaire"],
        },
        {
          name: "Régulier",
          price: "30$",
          desc: "Pour les professionnels",
          features: ["Tous les avantages étudiants", "Réseautage prioritaire"],
        },
        {
          name: "Famille",
          price: "50$",
          desc: "Pour les familles (jusqu'à 4)",
          features: ["Tous les avantages", "Priorité pour les événements familiaux"],
        },
      ],
      joinLabel: "Prêt?",
      joinTitle: "Adhérez maintenant",
      joinDesc: "Remplissez le formulaire ci-dessous pour devenir membre.",
      joinBtn: "Adhérer maintenant",
      contactBtn: "Nous contacter",
    },
    zh: {
      pageLabel: "会员",
      pageTitle: "成为会员",
      pageDesc: "加入我们的社区并参与我们的倡议。",
      benLabel: "好处",
      benTitle: "会员权益",
      benefits: [
        "参加所有活动和赛事",
        "与社区交流",
        "文化支持和资源",
        "月度通讯",
        "活动优惠价格",
        "参与治理",
      ],
      typLabel: "分类",
      typTitle: "会员类型",
      types: [
        {
          name: "学生",
          price: "$15",
          desc: "针对在读学生",
          features: ["参加所有活动", "社区支持"],
        },
        {
          name: "普通",
          price: "$30",
          desc: "针对专业人士",
          features: ["所有学生权益", "优先社交"],
        },
        {
          name: "家庭",
          price: "$50",
          desc: "家庭成员（最多 4 人）",
          features: ["所有权益", "家庭活动优先"],
        },
      ],
      joinLabel: "准备好了吗？",
      joinTitle: "立即加入",
      joinDesc: "填写以下表格成为会员。",
      joinBtn: "立即加入",
      contactBtn: "联系我们",
    },
    en: {
      pageLabel: "Membership",
      pageTitle: "Join Us",
      pageDesc: "Join our community and participate in our initiatives.",
      benLabel: "Benefits",
      benTitle: "Membership Benefits",
      benefits: [
        "Access to all events and activities",
        "Networking with the community",
        "Cultural support and resources",
        "Monthly newsletter",
        "Discounted event rates",
        "Participation in governance",
      ],
      typLabel: "Categories",
      typTitle: "Membership Types",
      types: [
        {
          name: "Student",
          price: "$15",
          desc: "For current students",
          features: ["Access to all events", "Community support"],
        },
        {
          name: "Regular",
          price: "$30",
          desc: "For professionals",
          features: ["All student benefits", "Priority networking"],
        },
        {
          name: "Family",
          price: "$50",
          desc: "For families (up to 4 members)",
          features: ["All benefits", "Priority for family events"],
        },
      ],
      joinLabel: "Ready?",
      joinTitle: "Join Now",
      joinDesc: "Fill out the form below to become a member.",
      joinBtn: "Join Now",
      contactBtn: "Contact Us",
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

      {/* Benefits */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.benLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.benTitle}</h2>

          <div className="grid-3" style={{ marginTop: "60px" }}>
            {c.benefits.map((benefit, idx) => (
              <div key={idx} style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,var(--gold),var(--gold2))",
                    color: "var(--navy)",
                    fontWeight: "700",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  ✓
                </div>
                <div>
                  <p style={{ fontSize: "16px", color: "var(--navy)", fontWeight: "600", margin: "0" }}>
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section style={{ background: "var(--offwhite)", padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{c.typLabel}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">{c.typTitle}</h2>

          <div className="grid-3" style={{ marginTop: "60px" }}>
            {c.types.map((type, idx) => (
              <div key={idx} className="card" style={{ textAlign: "center", position: "relative" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
                  {type.name}
                </h3>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "var(--red2)",
                    marginBottom: "8px",
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {type.price}
                </div>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "24px" }}>
                  {type.desc}
                </p>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "24px" }}>
                  {type.features.map((feature, fidx) => (
                    <p key={fidx} style={{ fontSize: "14px", color: "var(--navy)", marginBottom: "12px", margin: "0 0 12px" }}>
                      {feature}
                    </p>
                  ))}
                </div>
                <button className="btn-red" style={{ width: "100%", marginTop: "24px" }}>
                  {c.joinBtn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: "var(--navy)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="sec-label" style={{ color: "var(--gold2)" }}>
            {c.joinLabel}
          </div>
          <div className="gold-line" style={{ background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 20px" }}></div>
          <h2 className="sec-title-zh" style={{ color: "#fff" }}>
            {c.joinTitle}
          </h2>
          <p className="sec-sub" style={{ maxWidth: "560px", margin: "0 auto 32px", color: "rgba(255,255,255,0.78)" }}>
            {c.joinDesc}
          </p>
          <div className="btn-row" style={{ justifyContent: "center", gap: "20px" }}>
            <Link href="/auth/register" className="btn-gold">
              {c.joinBtn}
            </Link>
            <Link href="/contact" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
              {c.contactBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="sec-label">{lang === "fr" ? "FAQ" : lang === "zh" ? "常见问题" : "FAQ"}</div>
          <div className="gold-line"></div>
          <h2 className="sec-title-zh">
            {lang === "fr" ? "Questions fréquemment posées" : lang === "zh" ? "常见问题解答" : "Frequently Asked Questions"}
          </h2>

          <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "60px" }}>
            {[1, 2, 3].map((idx) => (
              <div key={idx} style={{ marginBottom: "32px", paddingBottom: "32px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--navy)", marginBottom: "12px" }}>
                  {lang === "fr"
                    ? ["Quel est le processus d'adhésion?", "Y a-t-il des frais cachés?", "Puis-je annuler mon adhésion?"][idx - 1]
                    : lang === "zh"
                    ? ["加入流程是什么？", "有隐藏费用吗？", "我可以取消会员资格吗？"][idx - 1]
                    : ["What is the membership process?", "Are there any hidden fees?", "Can I cancel my membership?"][idx - 1]}
                </h4>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", margin: "0" }}>
                  {lang === "fr"
                    ? ["Inscrivez-vous en ligne, validez votre email et commencez à participer.", "Non, le prix affiché est le seul coût.", "Oui, vous pouvez annuler à tout moment avec un préavis."][idx - 1]
                    : lang === "zh"
                    ? ["在线注册、验证电子邮件并开始参与。", "否，所显示的价格是唯一的成本。", "是的，您可以随时取消。"][idx - 1]
                    : ["Sign up online, validate your email and start participating.", "No, the displayed price is the only cost.", "Yes, you can cancel at any time with notice."][idx - 1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
