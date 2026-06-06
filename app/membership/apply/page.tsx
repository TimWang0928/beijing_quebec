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
    price: 3600, // $36.00 CAD/year
    recurring: true,
    fr: { name: "Membre communautaire", desc: "Devenez membre de l'Association des Pékinois du Québec et participez à nos activités culturelles et communautaires." },
    zh: { name: "普通会员", desc: "成为魁北克北京同乡会正式会员，与旅加同乡共叙乡情，参与协会各项文化与社区活动。" },
    en: { name: "Community Member", desc: "Become a member of the Beijing Association of Quebec and join our cultural and community activities." },
    color: "tier-regular",
    accentColor: "#93c5fd",
  },
  {
    id: "FAMILY",
    icon: "👨‍👩‍👧‍👦",
    price: 6600, // $66.00 CAD/year
    recurring: true,
    fr: { name: "Membre famille", desc: "Toute la famille profite des avantages membres. Une adhésion unique pour tous les membres du foyer." },
    zh: { name: "家庭会员", desc: "以家庭为单位入会，全家共享协会活动参与权及所有普通会员权益。" },
    en: { name: "Family Member", desc: "One membership covers the whole family. All household members enjoy full activity participation rights." },
    color: "tier-family",
    accentColor: "#86efac",
  },
  {
    id: "FOUNDING",
    icon: "🏅",
    price: 36500, // $365.00 CAD one-time
    recurring: false,
    seatLimit: 50,
    fr: { name: "Membre fondateur", desc: "Rejoignez les 50 membres fondateurs avec un numéro permanent. Un honneur unique et inoubliable." },
    zh: { name: "创始会员", desc: "限量50席，永久编号 NO.001–NO.050，与协会共同见证历史，享受最高礼遇。" },
    en: { name: "Founding Member", desc: "One of only 50 founding members with a permanent number. A unique and lasting honor." },
    color: "tier-founding",
    accentColor: "#fcd34d",
  },
];

const PAGE_CONTENT = {
  fr: {
    pageLabel: "Adhésion",
    title: "Demande d'adhésion",
    subtitle: "Rejoignez l'Association des Pékinois du Québec et participez à notre communauté",
    priceLabel: "Tarif",
    perYear: "/ an",
    oneTime: "unique",
    seatsLeft: (n: number) => `${n} place${n !== 1 ? "s" : ""} restante${n !== 1 ? "s" : ""}`,
    soldOut: "Complet",
    selectBtn: "Choisir ce niveau",
    selectedBtn: "✓ Sélectionné",
    selectFirstMsg: "Veuillez sélectionner un niveau ci-dessus pour continuer",
    proceedBtn: "Procéder au paiement",
    selectedTier: "Niveau sélectionné",
    backToMembership: "← Retour à l'adhésion",
    successTitle: "Adhésion activée !",
    successDesc: "Merci ! Votre adhésion a bien été activée. Vous pouvez maintenant profiter de tous les avantages.",
    viewProfileBtn: "Voir mon profil",
    benefits: {
      REGULAR: [
        "Participation à toutes les activités de l'association",
        "Informations et ressources communautaires",
        "Accès aux informations exclusives aux membres",
      ],
      FAMILY: [
        "Tous les avantages du membre ordinaire",
        "Couverture de tous les membres du foyer",
        "Participation familiale aux activités",
      ],
      FOUNDING: [
        "Numéro permanent NO.001–NO.050",
        "Inscription permanente sur le mur des fondateurs",
        "Certification fondateur en présentiel le 6 juin",
        "Carte de membre collector édition permanente",
        "Sièges prioritaires aux événements anniversaires",
        "Accès aux réunions privées et projets prioritaires",
      ],
    } as Record<string, string[]>,
  },
  zh: {
    pageLabel: "会员申请",
    title: "申请会员",
    subtitle: "加入魁北克北京同乡会，与旅加北京乡亲共建社区",
    priceLabel: "费用",
    perYear: "/ 年",
    oneTime: "一次性",
    seatsLeft: (n: number) => `仅剩 ${n} 席`,
    soldOut: "已售罄",
    selectBtn: "选择此类别",
    selectedBtn: "✓ 已选择",
    selectFirstMsg: "请先在上方选择一个会员类别",
    proceedBtn: "前往付款",
    selectedTier: "已选类别",
    backToMembership: "← 返回会员中心",
    successTitle: "会员已激活！",
    successDesc: "感谢您！您的会员资格已成功激活，即刻享受所有会员权益。",
    viewProfileBtn: "查看我的主页",
    benefits: {
      REGULAR: [
        "参与协会举办的各类活动",
        "获取社区资讯与资源",
        "享受会员专属信息",
      ],
      FAMILY: [
        "包含全部普通会员权益",
        "全家成员共享活动参与权",
        "家庭身份统一管理",
      ],
      FOUNDING: [
        "永久编号 NO.001–NO.050",
        "周年签名墙永久留名",
        "6月6日现场创始会员认证",
        "永久收藏版会员卡",
        "周年活动优先席位",
        "闭门交流与项目优先参与机会",
      ],
    } as Record<string, string[]>,
  },
  en: {
    pageLabel: "Membership",
    title: "Apply for Membership",
    subtitle: "Join the Beijing Association of Quebec and connect with our community",
    priceLabel: "Price",
    perYear: "/ year",
    oneTime: "one-time",
    seatsLeft: (n: number) => `${n} seat${n !== 1 ? "s" : ""} left`,
    soldOut: "Sold Out",
    selectBtn: "Select This Tier",
    selectedBtn: "✓ Selected",
    selectFirstMsg: "Please select a tier above to continue",
    proceedBtn: "Proceed to Payment",
    selectedTier: "Selected Tier",
    backToMembership: "← Back to Membership",
    successTitle: "Membership Activated!",
    successDesc: "Thank you! Your membership has been successfully activated. You can now enjoy all member benefits.",
    viewProfileBtn: "View My Profile",
    benefits: {
      REGULAR: [
        "Participate in all association activities",
        "Community news and resources",
        "Member-exclusive information access",
      ],
      FAMILY: [
        "All Regular Member benefits",
        "Covers all household members",
        "Family participation in activities",
      ],
      FOUNDING: [
        "Permanent number NO.001–NO.050",
        "Permanent name on anniversary signature wall",
        "June 6th on-site founding member certification",
        "Permanent collector's edition membership card",
        "Priority seats at anniversary events",
        "Access to closed-door meetings and priority projects",
      ],
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
  // Remaining founding seats fetched from server
  const [foundingSeatsLeft, setFoundingSeatsLeft] = useState<number | null>(null);

  const c = PAGE_CONTENT[lang as keyof typeof PAGE_CONTENT] ?? PAGE_CONTENT.fr;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/membership/apply");
    }
  }, [status, router]);

  useEffect(() => {
    fetch("/api/membership/founding-seats")
      .then((r) => r.json())
      .then((d) => setFoundingSeatsLeft(d.seatsLeft ?? null))
      .catch(() => setFoundingSeatsLeft(null));
  }, []);

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

  const isFoundingSoldOut = foundingSeatsLeft !== null && foundingSeatsLeft <= 0;

  const handleSelectTier = (tierId: string) => {
    if (tierId === "FOUNDING" && isFoundingSoldOut) return;
    setSelectedTier((prev) => (prev === tierId ? null : tierId));
    setStep("select");
  };

  return (
    <main className="membership-apply-page">
      {/* Hero */}
      <section className="membership-apply-hero">
        <div className="container">
          <div style={{ marginBottom: 20 }} />
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
                const soldOut = tier.id === "FOUNDING" && isFoundingSoldOut;
                const seatsLeft =
                  tier.id === "FOUNDING" && foundingSeatsLeft !== null
                    ? foundingSeatsLeft
                    : null;

                return (
                  <div
                    key={tier.id}
                    className={`tier-card ${isSelected ? "tier-card-selected" : ""} ${soldOut ? "tier-card-disabled" : ""}`}
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
                      <span className="tier-price-value">
                        ${(tier.price / 100).toFixed(0)} CAD
                        <span className="tier-price-recurrence">
                          &nbsp;{tier.recurring ? c.perYear : c.oneTime}
                        </span>
                      </span>
                    </div>

                    {/* Founding seat counter */}
                    {tier.id === "FOUNDING" && (
                      <div className={`founding-seats-badge ${soldOut ? "founding-seats-soldout" : ""}`}>
                        {soldOut
                          ? c.soldOut
                          : seatsLeft !== null
                          ? c.seatsLeft(seatsLeft)
                          : `${tier.seatLimit} seats total`}
                      </div>
                    )}

                    <button
                      className={`tier-select-btn ${isSelected ? "tier-select-btn-active" : ""} ${soldOut ? "tier-select-btn-disabled" : ""}`}
                      onClick={() => handleSelectTier(tier.id)}
                      disabled={soldOut}
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

      {/* Bottom section */}
      <section className={`membership-apply-payment${step === "pay" ? " is-pay-step" : ""}`}>
        <div className="container">

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
                        &nbsp;{selected.recurring ? c.perYear : c.oneTime}
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

          {step === "pay" && selected && (
            <CloverPayment
              tierId={selected.id}
              tierName={selectedName}
              amount={selected.price}
              onSuccess={() => setStep("success")}
              onCancel={() => setStep("select")}
            />
          )}

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
