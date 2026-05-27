"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const TIERS = [
  {
    id: "REGULAR",
    icon: "👤",
    fr: { name: "Membre ordinaire", desc: "Adhésion individuelle standard. Participez à toutes les activités et assemblées générales." },
    zh: { name: "普通会员", desc: "标准个人会员资格，可参与协会所有活动及大会投票。" },
    en: { name: "Regular Member", desc: "Standard individual membership. Participate in all activities and general assemblies." },
    color: "tier-regular",
    accentColor: "#93c5fd",
  },
  {
    id: "FAMILY",
    icon: "👨‍👩‍👧",
    fr: { name: "Membre famille", desc: "Adhésion familiale pour deux adultes et leurs enfants mineurs. Idéal pour les familles." },
    zh: { name: "家庭会员", desc: "家庭会员，适用于两名成人及其未成年子女，最适合家庭参与。" },
    en: { name: "Family Member", desc: "Family membership for two adults and their minor children. Ideal for families." },
    color: "tier-family",
    accentColor: "#d8b4fe",
    recommended: true,
  },
  {
    id: "YOUTH",
    icon: "🎓",
    fr: { name: "Membre jeunesse", desc: "Pour les membres de moins de 30 ans. Accès complet à tous les programmes à tarif réduit." },
    zh: { name: "青年会员", desc: "适用于30岁以下成员，享受所有会员权益的优惠价格。" },
    en: { name: "Youth Member", desc: "For members under 30 years old. Full access to all programs at a reduced rate." },
    color: "tier-youth",
    accentColor: "#6ee7b7",
  },
  {
    id: "HONORARY",
    icon: "🏆",
    fr: { name: "Membre d'honneur", desc: "Décerné par invitation aux personnes ayant rendu des services exceptionnels à la communauté." },
    zh: { name: "荣誉会员", desc: "由协会特别邀请授予，表彰对社区作出杰出贡献的人士。" },
    en: { name: "Honorary Member", desc: "Awarded by invitation to individuals who have rendered exceptional services to the community." },
    color: "tier-honorary",
    accentColor: "#d4af37",
    inviteOnly: true,
  },
  {
    id: "SUPPORTING",
    icon: "🤝",
    fr: { name: "Membre soutien", desc: "Pour les organisations et entreprises qui soutiennent la mission et les activités de l'association." },
    zh: { name: "支持会员", desc: "适用于支持协会使命与活动的组织及企业。" },
    en: { name: "Supporting Member", desc: "For organizations and businesses that support the association's mission and activities." },
    color: "tier-supporting",
    accentColor: "#fdba74",
  },
];

const CONTENT = {
  fr: {
    pageLabel: "Adhésion",
    title: "Choisissez votre adhésion",
    subtitle: "Rejoignez la communauté pékinoise du Québec — choisissez la formule qui vous convient",
    recommended: "Recommandé",
    inviteOnly: "Sur invitation",
    priceLabel: "Tarif",
    priceTbd: "À confirmer",
    selectBtn: "Choisir ce niveau",
    selectedBtn: "✓ Sélectionné",
    inviteBtn: "Nous contacter",
    paymentTitle: "Finaliser votre adhésion",
    paymentDesc: "Notre système de paiement en ligne est en cours de développement. Pour adhérer dès maintenant, veuillez contacter l'association directement — nous traiterons votre demande dans les plus brefs délais.",
    paymentNotice: "Le paiement en ligne sera bientôt disponible.",
    contactBtn: "Contacter l'association",
    backToMembership: "← Retour à l'adhésion",
    selectedTier: "Niveau sélectionné",
    benefits: {
      REGULAR:    ["Participation à toutes les activités", "Droit de vote aux AG", "Accès aux ressources communautaires"],
      FAMILY:     ["Adhésion pour toute la famille", "Participation à toutes les activités", "Droit de vote aux AG", "Tarif préférentiel pour les enfants"],
      YOUTH:      ["Pour les moins de 30 ans", "Tarif réduit", "Participation à toutes les activités"],
      HONORARY:   ["Sur invitation uniquement", "Membres méritants", "Tous les droits ordinaires inclus"],
      SUPPORTING: ["Pour entreprises & organisations", "Visibilité dans nos publications", "Soutien à la communauté"],
    } as Record<string, string[]>,
  },
  zh: {
    pageLabel: "会员申请",
    title: "选择会员类别",
    subtitle: "加入魁北克北京同乡会 — 选择最适合您的会员类别",
    recommended: "推荐",
    inviteOnly: "邀请制",
    priceLabel: "费用",
    priceTbd: "待定",
    selectBtn: "选择此类别",
    selectedBtn: "✓ 已选择",
    inviteBtn: "联系我们",
    paymentTitle: "完成申请",
    paymentDesc: "在线支付系统正在开发中。如需立即申请，请直接联系协会，我们将尽快处理您的申请。",
    paymentNotice: "在线缴费功能即将上线。",
    contactBtn: "联系协会",
    backToMembership: "← 返回会员中心",
    selectedTier: "已选类别",
    benefits: {
      REGULAR:    ["参与所有协会活动", "大会投票权", "获取社区资源"],
      FAMILY:     ["家庭全员会员资格", "参与所有协会活动", "大会投票权", "子女优惠票价"],
      YOUTH:      ["适用于30岁以下", "优惠费用", "参与所有协会活动"],
      HONORARY:   ["仅限受邀", "表彰杰出贡献人士", "享有全部普通会员权利"],
      SUPPORTING: ["适用于企业及组织", "出现在协会出版物中", "支持社区建设"],
    } as Record<string, string[]>,
  },
  en: {
    pageLabel: "Membership",
    title: "Choose Your Membership",
    subtitle: "Join the Beijing Association of Quebec — find the plan that works best for you",
    recommended: "Recommended",
    inviteOnly: "By Invitation",
    priceLabel: "Price",
    priceTbd: "TBD",
    selectBtn: "Select This Tier",
    selectedBtn: "✓ Selected",
    inviteBtn: "Contact Us",
    paymentTitle: "Complete Your Application",
    paymentDesc: "Our online payment system is currently under development. To join now, please contact the association directly — we will process your application as soon as possible.",
    paymentNotice: "Online payment will be available soon.",
    contactBtn: "Contact the Association",
    backToMembership: "← Back to Membership",
    selectedTier: "Selected Tier",
    benefits: {
      REGULAR:    ["Participate in all activities", "Voting rights at general assemblies", "Access to community resources"],
      FAMILY:     ["Whole family membership", "Participate in all activities", "Voting rights at general assemblies", "Children's preferential rates"],
      YOUTH:      ["For members under 30", "Reduced rate", "Participate in all activities"],
      HONORARY:   ["By invitation only", "Awarded to distinguished contributors", "All regular member rights included"],
      SUPPORTING: ["For businesses & organizations", "Featured in association publications", "Support the community"],
    } as Record<string, string[]>,
  },
};

export default function MembershipApplyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { lang } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.fr;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/membership/apply");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="profile-loading">
        <span className="profile-spinner" />
      </div>
    );
  }

  const selected = TIERS.find((t) => t.id === selectedTier);

  return (
    <main className="membership-apply-page">
      {/* Hero */}
      <section className="membership-apply-hero">
        <div className="container">
          {/* <div className="sec-label" style={{ color: "var(--gold)" }}>{c.pageLabel}</div> */}
          <div className="sec-label" style={{ color: "var(--gold)" }}></div>
          <div  style={{ marginBottom: 20 }} />
          <h1 className="sec-title-zh" style={{ color: "#fff", textAlign: "center" }}>{c.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: 560, margin: "16px auto 0", fontSize: 15, lineHeight: 1.7 }}>
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="membership-apply-tiers">
        <div className="container">
          <div className="tier-cards-grid">
            {TIERS.map((tier) => {
              const t = tier[lang as keyof typeof tier] as { name: string; desc: string };
              const isSelected = selectedTier === tier.id;
              const benefits = c.benefits[tier.id] ?? [];

              return (
                <div
                  key={tier.id}
                  className={`tier-card ${isSelected ? "tier-card-selected" : ""} ${tier.inviteOnly ? "tier-card-invite" : ""}`}
                  style={{ "--tier-accent": tier.accentColor } as React.CSSProperties}
                >
                  {tier.recommended && (
                    <div className="tier-card-recommended">{c.recommended}</div>
                  )}
                  {tier.inviteOnly && (
                    <div className="tier-card-invite-badge">{c.inviteOnly}</div>
                  )}

                  <div className="tier-card-icon">{tier.icon}</div>
                  <div className={`tier-card-name-badge ${tier.color}`}>{t.name}</div>
                  <p className="tier-card-desc">{t.desc}</p>

                  <ul className="tier-card-benefits">
                    {benefits.map((b) => (
                      <li key={b}>
                        <span className="tier-benefit-check">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="tier-card-price">
                    <span className="tier-price-label">{c.priceLabel}</span>
                    <span className="tier-price-value">{c.priceTbd}</span>
                  </div>

                  {tier.inviteOnly ? (
                    <Link href="/contact" className="tier-select-btn tier-invite-btn">
                      {c.inviteBtn}
                    </Link>
                  ) : (
                    <button
                      className={`tier-select-btn ${isSelected ? "tier-select-btn-active" : ""}`}
                      onClick={() => setSelectedTier(isSelected ? null : tier.id)}
                    >
                      {isSelected ? c.selectedBtn : c.selectBtn}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment / Contact Section */}
      <section className="membership-apply-payment">
        <div className="container">
          <div className="payment-card">
            <div className="payment-card-left">
              <div className="payment-icon">🔒</div>
              <h2 className="payment-title">{c.paymentTitle}</h2>
              {selected && (
                <div className="payment-selected-tier">
                  <span className="payment-selected-label">{c.selectedTier}:</span>
                  <span className={`profile-tier-badge ${selected.color}`}>
                    {(selected[lang as keyof typeof selected] as { name: string })?.name}
                  </span>
                </div>
              )}
              <p className="payment-desc">{c.paymentDesc}</p>
              <div className="payment-notice">
                <span className="payment-notice-icon">⏳</span>
                {c.paymentNotice}
              </div>
            </div>
            <div className="payment-card-right">
              <Link href="/contact" className="btn-gold payment-contact-btn">
                {c.contactBtn}
              </Link>
              <Link href="/membership" className="payment-back-btn">
                {c.backToMembership}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
