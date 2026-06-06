"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import CloverPayment from "@/components/CloverPayment";

// ─── Tier definitions ──────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "TEST",
    icon: "🧪",
    price: 1,
    recurring: false,
    color: "tier-regular",
    accentColor: "#d1d5db",
    fr: {
      name: "[TEST] $0.01",
      desc: "Paiement de test — 1 cent seulement.",
      benefits: ["Paiement de test — aucun avantage réel"],
    },
    zh: {
      name: "[测试] $0.01",
      desc: "仅用于测试支付流程，金额为1分钱。",
      benefits: ["仅用于测试，无实际权益"],
    },
    en: {
      name: "[TEST] $0.01",
      desc: "Test payment only — charges 1 cent.",
      benefits: ["Test payment only — no real benefits"],
    },
  },
  {
    id: "REGULAR",
    icon: "👤",
    price: 3600,
    recurring: true,
    color: "tier-regular",
    accentColor: "#93c5fd",
    fr: {
      name: "Membre communautaire",
      desc: "Accès à toutes les activités et à la communauté des Pékinois du Québec.",
      benefits: ["Toutes les activités de l'association", "Informations communautaires", "Accès aux infos exclusives membres"],
    },
    zh: {
      name: "普通会员",
      desc: "参与协会各项文化与社区活动，融入旅加北京同乡圈。",
      benefits: ["参与协会举办的各类活动", "获取社区资讯与资源", "享受会员专属信息"],
    },
    en: {
      name: "Community Member",
      desc: "Join all activities and the Beijing community of Quebec.",
      benefits: ["All association activities", "Community news & resources", "Member-exclusive info"],
    },
  },
  {
    id: "FAMILY",
    icon: "👨‍👩‍👧‍👦",
    price: 6600,
    recurring: true,
    color: "tier-family",
    accentColor: "#d8b4fe",
    fr: {
      name: "Membre famille",
      desc: "Une adhésion pour tous les membres du foyer.",
      benefits: ["Tous les avantages ordinaires", "Couverture de toute la famille", "Participation familiale aux activités"],
    },
    zh: {
      name: "家庭会员",
      desc: "以家庭为单位入会，全家共享所有权益。",
      benefits: ["包含全部普通会员权益", "全家成员共享活动参与权", "家庭身份统一管理"],
    },
    en: {
      name: "Family Member",
      desc: "One membership covers the whole household.",
      benefits: ["All Regular Member benefits", "Covers all household members", "Family activity participation"],
    },
  },
  {
    id: "FOUNDING",
    icon: "🏅",
    price: 36500,
    recurring: false,
    seatLimit: 50,
    color: "tier-founding",
    accentColor: "#fcd34d",
    fr: {
      name: "Membre fondateur",
      desc: "Rejoignez les 50 membres fondateurs. Numéro permanent. Honneur inoubliable.",
      benefits: ["Numéro permanent NO.001–NO.050", "Mur des fondateurs anniversaire", "Certification en présentiel 6 juin", "Carte collector permanente", "Sièges prioritaires aux événements", "Réunions privées & projets prioritaires"],
    },
    zh: {
      name: "创始会员",
      desc: "限量50席，永久编号，与协会共同见证历史。",
      benefits: ["永久编号 NO.001–NO.050", "周年签名墙永久留名", "6月6日现场认证", "永久收藏版会员卡", "周年活动优先席位", "闭门交流与项目优先参与"],
    },
    en: {
      name: "Founding Member",
      desc: "One of only 50 founding members. Permanent number. Lasting legacy.",
      benefits: ["Permanent number NO.001–NO.050", "Anniversary signature wall", "June 6th on-site certification", "Permanent collector's card", "Priority seats at events", "Closed-door meetings & priority projects"],
    },
  },
];

// ─── Page-level content ────────────────────────────────────────────────────────
const CONTENT = {
  fr: {
    title: "Rejoindre l'Association",
    chooseTierTitle: "Choisissez votre adhésion",
    chooseTierSub: "Sélectionnez le niveau qui vous convient avant de créer votre compte",
    perYear: "/ an",
    oneTime: "unique",
    seatsLeft: (n: number) => `${n} place${n !== 1 ? "s" : ""} restante${n !== 1 ? "s" : ""}`,
    soldOut: "Complet",
    selectBtn: "Choisir",
    selectedBtn: "✓ Sélectionné",
    continueToAccount: "Continuer →",
    accountSection: "Vos informations",
    subtitle: "Inscription avec adhésion",
    membershipTitle: "Votre adhésion",
    priceLabel: "Cotisation",
    includedLabel: "Inclus :",
    name: "Nom complet",
    namePlaceholder: "Votre nom complet",
    email: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    password: "Mot de passe",
    passwordPlaceholder: "Au moins 8 caractères",
    confirm: "Confirmer le mot de passe",
    confirmPlaceholder: "Répétez votre mot de passe",
    nextPayment: "Continuer vers le paiement →",
    login: "Déjà membre ?",
    loginLink: "Se connecter",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères",
    errorGeneric: "Une erreur est survenue, veuillez réessayer",
    successRedirect: "Compte créé ! Veuillez vous connecter.",
    emailTaken: "Cette adresse e-mail est déjà utilisée.",
    checkingEmail: "Vérification…",
    backToTiers: "← Modifier le niveau",
    phone: "Téléphone",
    phonePlaceholder: "Optionnel",
    wechat: "WeChat",
    wechatPlaceholder: "Identifiant WeChat (optionnel)",
  },
  zh: {
    title: "加入同乡会",
    chooseTierTitle: "选择会员档位",
    chooseTierSub: "在创建账户之前，请先选择适合您的会员类别",
    perYear: "/ 年",
    oneTime: "一次性",
    seatsLeft: (n: number) => `仅剩 ${n} 席`,
    soldOut: "已售罄",
    selectBtn: "选择",
    selectedBtn: "✓ 已选择",
    continueToAccount: "继续 →",
    accountSection: "填写账户信息",
    subtitle: "注册并成为会员",
    membershipTitle: "您的会员资格",
    priceLabel: "会费",
    includedLabel: "包含：",
    name: "全名",
    namePlaceholder: "请输入您的姓名",
    email: "电子邮件",
    emailPlaceholder: "your@example.com",
    password: "密码",
    passwordPlaceholder: "至少8个字符",
    confirm: "确认密码",
    confirmPlaceholder: "再次输入密码",
    nextPayment: "继续前往付款 →",
    login: "已有账户？",
    loginLink: "立即登录",
    passwordMismatch: "两次输入的密码不一致",
    passwordTooShort: "密码至少需要8个字符",
    errorGeneric: "发生错误，请重试",
    successRedirect: "账户创建成功！请登录。",
    emailTaken: "该邮箱已被注册。",
    checkingEmail: "检查中…",
    backToTiers: "← 修改档位",
    phone: "手机号",
    phonePlaceholder: "选填",
    wechat: "微信号",
    wechatPlaceholder: "微信号（选填）",
  },
  en: {
    title: "Join the Association",
    chooseTierTitle: "Choose Your Membership",
    chooseTierSub: "Select the tier that suits you before creating your account",
    perYear: "/ year",
    oneTime: "one-time",
    seatsLeft: (n: number) => `${n} seat${n !== 1 ? "s" : ""} left`,
    soldOut: "Sold Out",
    selectBtn: "Select",
    selectedBtn: "✓ Selected",
    continueToAccount: "Continue →",
    accountSection: "Account details",
    subtitle: "Registration & Membership",
    membershipTitle: "Your Membership",
    priceLabel: "Fee",
    includedLabel: "Includes:",
    name: "Full Name",
    namePlaceholder: "Your full name",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "At least 8 characters",
    confirm: "Confirm Password",
    confirmPlaceholder: "Repeat your password",
    nextPayment: "Continue to Payment →",
    login: "Already a member?",
    loginLink: "Sign in",
    passwordMismatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 8 characters",
    errorGeneric: "An error occurred, please try again",
    successRedirect: "Account created! Please sign in.",
    emailTaken: "This email address is already registered.",
    checkingEmail: "Checking…",
    backToTiers: "← Change tier",
    phone: "Phone",
    phonePlaceholder: "Optional",
    wechat: "WeChat",
    wechatPlaceholder: "WeChat ID (optional)",
  },
};

type Step = "tier" | "info" | "pay";

export default function RegisterForm() {
  const { lang } = useLanguage();
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState<Step>("tier");
  const [selectedTierId, setSelectedTierId] = useState<string>("REGULAR");
  const [foundingSeatsLeft, setFoundingSeatsLeft] = useState<number | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "", phone: "", wechat: "" });

  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.fr;

  useEffect(() => {
    fetch("/api/membership/founding-seats")
      .then((r) => r.json())
      .then((d) => setFoundingSeatsLeft(d.seatsLeft ?? null))
      .catch(() => {});
  }, []);

  const selectedTier = TIERS.find((t) => t.id === selectedTierId)!;
  const tierLang = selectedTier[lang as keyof typeof selectedTier] as { name: string; desc: string; benefits: string[] };

  const isFoundingSoldOut = foundingSeatsLeft !== null && foundingSeatsLeft <= 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) { showToast(c.passwordMismatch, "error"); return; }
    if (formData.password.length < 8) { showToast(c.passwordTooShort, "error"); return; }
    setCheckingEmail(true);
    try {
      const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(formData.email)}`);
      const { exists } = await res.json();
      if (exists) { showToast(c.emailTaken, "error"); return; }
    } catch { /* let payment step handle it */ } finally { setCheckingEmail(false); }
    setStep("pay");
  };

  const handleCustomSubmit = async (token: string) => {
    const res = await fetch("/api/auth/register-with-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password, tierId: selectedTierId, token, phone: formData.phone, wechat: formData.wechat }),
    });
    if (!res.ok) {
      const d = await res.json();
      throw new Error(d.error || c.errorGeneric);
    }
    const result = await signIn("credentials", { email: formData.email, password: formData.password, redirect: false });
    if (result?.ok) { router.push("/profile"); }
    else { showToast(c.successRedirect, "success"); router.push("/auth/login"); }
  };

  // ── Step: pay ──────────────────────────────────────────────────────────────
  if (step === "pay") {
    return (
      <div className="register-pay-page">
        <CloverPayment
          tierId={selectedTierId}
          tierName={tierLang?.name ?? selectedTierId}
          amount={selectedTier.price}
          onSuccess={() => {}}
          onCancel={() => setStep("info")}
          customSubmit={handleCustomSubmit}
        />
      </div>
    );
  }

  // ── Step: tier ─────────────────────────────────────────────────────────────
  if (step === "tier") {
    return (
      <div className="auth-page-wrapper register-tier-wrapper">
        <div className="register-tier-page">
          <div className="register-tier-header">
            <h1 className="auth-form-title" style={{ textAlign: "center" }}>{c.chooseTierTitle}</h1>
            <p className="auth-form-eyebrow" style={{ textAlign: "center", marginTop: 8 }}>{c.chooseTierSub}</p>
          </div>

          <div className="register-tier-cards">
            {TIERS.map((tier) => {
              const t = tier[lang as keyof typeof tier] as { name: string; desc: string; benefits: string[] };
              const isSelected = selectedTierId === tier.id;
              const soldOut = tier.id === "FOUNDING" && isFoundingSoldOut;
              const seatsLeft = tier.id === "FOUNDING" ? foundingSeatsLeft : null;

              return (
                <div
                  key={tier.id}
                  className={`register-tier-card ${isSelected ? "register-tier-card-selected" : ""} ${soldOut ? "tier-card-disabled" : ""}`}
                  style={{ "--tier-accent": tier.accentColor } as React.CSSProperties}
                  onClick={() => { if (!soldOut) setSelectedTierId(tier.id); }}
                >
                  <div className="register-tier-card-top">
                    <span className="register-tier-card-icon">{tier.icon}</span>
                    <span className={`tier-card-name-badge ${tier.color}`}>{t.name}</span>
                    {isSelected && <span className="register-tier-card-check">✓</span>}
                  </div>

                  <p className="register-tier-card-desc">{t.desc}</p>

                  <ul className="tier-card-benefits register-tier-card-benefits">
                    {t.benefits.map((b) => (
                      <li key={b}><span className="tier-benefit-check">✓</span>{b}</li>
                    ))}
                  </ul>

                  <div className="register-tier-card-footer">
                    <div className="tier-card-price" style={{ marginBottom: 0 }}>
                      <span className="tier-price-value">
                        ${(tier.price / 100).toFixed(0)} CAD
                        <span className="tier-price-recurrence">&nbsp;{tier.recurring ? c.perYear : c.oneTime}</span>
                      </span>
                    </div>

                    {tier.id === "FOUNDING" && (
                      <div className={`founding-seats-badge ${soldOut ? "founding-seats-soldout" : ""}`} style={{ marginTop: 6 }}>
                        {soldOut ? c.soldOut : seatsLeft !== null ? c.seatsLeft(seatsLeft) : `${tier.seatLimit} seats total`}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <button
              className="btn-gold"
              style={{ minWidth: 220, fontSize: 15 }}
              onClick={() => setStep("info")}
            >
              {c.continueToAccount}
            </button>
          </div>

          <p className="auth-switch" style={{ textAlign: "center", marginTop: 24 }}>
            {c.login}{" "}
            <Link href="/auth/login" className="auth-switch-link">{c.loginLink}</Link>
          </p>
        </div>
      </div>
    );
  }

  // ── Step: info ─────────────────────────────────────────────────────────────
  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-side">
        <div className="auth-form-box register-form-wide">

          <div className="auth-form-header">
            <span className="auth-form-eyebrow">{c.subtitle}</span>
            <h1 className="auth-form-title">{c.title}</h1>
          </div>

          {/* Selected tier summary */}
          <div className="register-tier-summary">
            <div className="register-tier-summary-header">
              <span className="register-tier-icon">{selectedTier.icon}</span>
              <div className="register-tier-summary-info">
                <span className="register-tier-summary-label">{c.membershipTitle}</span>
                <span className="register-tier-summary-name">{tierLang?.name}</span>
              </div>
              <div className="register-tier-summary-price">
                <span className="register-tier-price-amount">${(selectedTier.price / 100).toFixed(0)} CAD</span>
                <span className="register-tier-price-period">
                  &nbsp;{selectedTier.recurring ? c.perYear : c.oneTime}
                </span>
              </div>
            </div>
            <div className="register-tier-benefits">
              <span className="register-tier-benefits-label">{c.includedLabel}</span>
              <ul className="register-tier-benefits-list">
                {tierLang?.benefits.map((b) => (
                  <li key={b}><span className="register-check">✓</span>{b}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="register-back-to-tiers"
              onClick={() => setStep("tier")}
            >
              {c.backToTiers}
            </button>
          </div>

          <p className="register-section-label">{c.accountSection}</p>

          <form onSubmit={handleInfoSubmit} className="auth-fields" noValidate>
            <div className="auth-field-group">
              <label htmlFor="name" className="auth-label">{c.name}</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder={c.namePlaceholder} className="auth-input" required autoComplete="name" />
            </div>
            <div className="auth-field-group">
              <label htmlFor="email" className="auth-label">{c.email}</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder={c.emailPlaceholder} className="auth-input" required autoComplete="email" />
            </div>
            <div className="auth-field-group">
              <label htmlFor="password" className="auth-label">{c.password}</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder={c.passwordPlaceholder} className="auth-input" required autoComplete="new-password" />
            </div>
            <div className="auth-field-group">
              <label htmlFor="confirm" className="auth-label">{c.confirm}</label>
              <input type="password" id="confirm" name="confirm" value={formData.confirm} onChange={handleChange} placeholder={c.confirmPlaceholder} className="auth-input" required autoComplete="new-password" />
            </div>
            <div className="auth-field-group">
              <label htmlFor="phone" className="auth-label">{c.phone} <span className="auth-label-optional">({lang === "zh" ? "选填" : lang === "fr" ? "optionnel" : "optional"})</span></label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder={c.phonePlaceholder} className="auth-input" autoComplete="tel" />
            </div>
            <div className="auth-field-group">
              <label htmlFor="wechat" className="auth-label">{c.wechat} <span className="auth-label-optional">({lang === "zh" ? "选填" : lang === "fr" ? "optionnel" : "optional"})</span></label>
              <input type="text" id="wechat" name="wechat" value={formData.wechat} onChange={handleChange} placeholder={c.wechatPlaceholder} className="auth-input" />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={checkingEmail}>
              {checkingEmail && <span className="auth-spinner" />}
              {checkingEmail ? c.checkingEmail : c.nextPayment}
            </button>
          </form>

          <p className="auth-switch">
            {c.login}{" "}
            <Link href="/auth/login" className="auth-switch-link">{c.loginLink}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
