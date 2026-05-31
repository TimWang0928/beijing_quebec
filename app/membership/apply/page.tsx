"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import CloverPayment from "@/components/CloverPayment";

const TIERS = [
  {
    id: "REGULAR",
    icon: "👤",
    price: 100, // $1.00 CAD (test)
    fr: { name: "Membre ordinaire", desc: "Devenez membre de l'Association des Pékinois du Québec et participez à nos activités culturelles et communautaires." },
    zh: { name: "普通会员", desc: "成为魁北克北京同乡会正式会员，与旅加同乡共叙乡情，参与协会各项文化与社区活动。" },
    en: { name: "Regular Member", desc: "Become a member of the Beijing Association of Quebec and join our cultural and community activities." },
    color: "tier-regular",
    accentColor: "#93c5fd",
  },
];

const CONTENT = {
  fr: {
    pageLabel: "Adhésion",
    title: "Demande d'adhésion",
    subtitle: "Rejoignez l'Association des Pékinois du Québec et participez à notre communauté",
    recommended: "Recommandé",
    inviteOnly: "Sur invitation",
    priceLabel: "Tarif",
    selectBtn: "Choisir ce niveau",
    selectedBtn: "✓ Sélectionné",
    inviteBtn: "Nous contacter",
    selectFirstMsg: "Veuillez sélectionner un niveau ci-dessus pour continuer",
    proceedBtn: "Procéder au paiement",
    selectedTier: "Niveau sélectionné",
    contactBtn: "Contacter l'association",
    backToMembership: "← Retour à l'adhésion",
    successTitle: "Adhésion activée !",
    successDesc: "Merci ! Votre adhésion a bien été activée. Vous pouvez maintenant profiter de tous les avantages.",
    viewProfileBtn: "Voir mon profil",
    benefits: {
      REGULAR: ["Accès à toutes les activités culturelles", "Réseau communautaire des Pékinois du Québec", "Bulletin et informations de l'association"],
    } as Record<string, string[]>,
  },
  zh: {
    pageLabel: "会员申请",
    title: "申请会员",
    subtitle: "加入魁北克北京同乡会，与旅加北京乡亲共建社区",
    recommended: "推荐",
    inviteOnly: "邀请制",
    priceLabel: "费用",
    selectBtn: "选择此类别",
    selectedBtn: "✓ 已选择",
    inviteBtn: "联系我们",
    selectFirstMsg: "请先在上方选择一个会员类别",
    proceedBtn: "前往付款",
    selectedTier: "已选类别",
    contactBtn: "联系协会",
    backToMembership: "← 返回会员中心",
    successTitle: "会员已激活！",
    successDesc: "感谢您！您的会员资格已成功激活，即刻享受所有会员权益。",
    viewProfileBtn: "查看我的主页",
    benefits: {
      REGULAR: ["参与文化与社区活动", "融入旅加北京同乡圆", "接收协会活动资讯"],
    } as Record<string, string[]>,
  },
  en: {
    pageLabel: "Membership",
    title: "Apply for Membership",
    subtitle: "Join the Beijing Association of Quebec and connect with our community",
    recommended: "Recommended",
    inviteOnly: "By Invitation",
    priceLabel: "Price",
    selectBtn: "Select This Tier",
    selectedBtn: "✓ Selected",
    inviteBtn: "Contact Us",
    selectFirstMsg: "Please select a tier above to continue",
    proceedBtn: "Proceed to Payment",
    selectedTier: "Selected Tier",
    contactBtn: "Contact the Association",
    backToMembership: "← Back to Membership",
    successTitle: "Membership Activated!",
    successDesc: "Thank you! Your membership has been successfully activated. You can now enjoy all member benefits.",
    viewProfileBtn: "View My Profile",
    benefits: {
      REGULAR: ["Access to all cultural and community activities", "Beijing community network in Quebec", "Association news and updates"],
    } as Record<string, string[]>,
  },
};

type Step = "select" | "pay" | "success";

export default function MembershipApplyPage() {
  const { status } = useSession();
  const router = useRouter();
  const { lang } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<string | null>("REGULAR");
  const [step, setStep] = useState<Step>("select");

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
  const selectedName =
    selected
      ? ((selected[lang as keyof typeof selected] as { name: string } | undefined)?.name ?? "")
      : "";

  const handleSelectTier = (tierId: string) => {
    setSelectedTier((prev) => (prev === tierId ? null : tierId));
    setStep("select");
  };

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

      {/* Tier Cards — visible only during select step */}
      {step === "select" && (
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
                  className={`tier-card ${isSelected ? "tier-card-selected" : ""}`}
                  style={{ "--tier-accent": tier.accentColor } as React.CSSProperties}
                >
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
                    <span className="tier-price-value">${(tier.price / 100).toFixed(0)} CAD</span>
                  </div>

                  <button
                    className={`tier-select-btn ${isSelected ? "tier-select-btn-active" : ""}`}
                    onClick={() => handleSelectTier(tier.id)}
                  >
                    {isSelected ? c.selectedBtn : c.selectBtn}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Bottom section — adapts to current step */}
      <section className={`membership-apply-payment${step === "pay" ? " is-pay-step" : ""}`}>
        <div className="container">

          {/* Step: select — show proceed or prompt to choose */}
          {step === "select" && (
            <div className="payment-card">
              {selected ? (
                <>
                  <div className="payment-card-left">
                    <div className="payment-icon">💳</div>
                    <h2 className="payment-title">{c.selectedTier}</h2>
                    <div className="payment-selected-tier">
                      <span className={`profile-tier-badge ${selected.color}`}>{selectedName}</span>
                      <span className="tier-price-label" style={{ marginLeft: 12 }}>
                        ${(selected.price / 100).toFixed(0)} CAD
                      </span>
                    </div>
                  </div>
                  <div className="payment-card-right">
                    <button
                      className="btn-gold payment-contact-btn"
                      onClick={() => setStep("pay")}
                    >
                      {c.proceedBtn}
                    </button>
                    <Link href="/membership" className="payment-back-btn">
                      {c.backToMembership}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="payment-card-left">
                    <div className="payment-icon">☝️</div>
                    <p className="payment-desc">{c.selectFirstMsg}</p>
                  </div>
                  <div className="payment-card-right">
                    <Link href="/membership" className="payment-back-btn">
                      {c.backToMembership}
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step: pay — Clover iframe */}
          {step === "pay" && selected && (
            <CloverPayment
              tierId={selected.id}
              tierName={selectedName}
              amount={selected.price}
              onSuccess={() => setStep("success")}
              onCancel={() => setStep("select")}
            />
          )}

          {/* Step: success */}
          {step === "success" && (
            <div className="payment-card" style={{ justifyContent: "center", textAlign: "center" }}>
              <div style={{ padding: "8px 0" }}>
                <div className="payment-icon" style={{ fontSize: 56 }}>🎉</div>
                <h2 className="payment-title" style={{ marginTop: 16 }}>{c.successTitle}</h2>
                <p className="payment-desc" style={{ maxWidth: 480, margin: "12px auto 28px" }}>{c.successDesc}</p>
                <button className="btn-gold" onClick={() => router.push("/profile")}>
                  {c.viewProfileBtn}
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
