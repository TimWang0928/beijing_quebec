"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import CloverPayment from "@/components/CloverPayment";

const TIER = {
  id: "REGULAR",
  price: 100, // $1.00 (test)
  icon: "👤",
  fr: {
    name: "Membre ordinaire",
    desc: "Accès à toutes les activités culturelles et communautaires de l'association.",
    benefits: ["Activités culturelles", "Réseau des Pékinois du Québec", "Bulletins d'information"],
  },
  zh: {
    name: "普通会员",
    desc: "参与协会各项文化与社区活动，融入旅加北京同乡圈。",
    benefits: ["文化与社区活动", "旅加北京同乡网络", "协会活动资讯"],
  },
  en: {
    name: "Regular Member",
    desc: "Join all cultural and community activities of the Beijing Association of Quebec.",
    benefits: ["Cultural activities", "Beijing community network", "Association news"],
  },
};

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.532 24.552c0-1.636-.147-3.2-.42-4.704H24v9.02h13.196c-.572 3.06-2.292 5.652-4.88 7.388v6.136h7.9c4.62-4.252 7.316-10.516 7.316-17.84z" fill="#4285F4"/>
    <path d="M24 48c6.48 0 11.916-2.148 15.888-5.82l-7.9-6.136c-2.148 1.44-4.892 2.292-7.988 2.292-6.144 0-11.344-4.152-13.2-9.724H2.62v6.336C6.572 42.8 14.74 48 24 48z" fill="#34A853"/>
    <path d="M10.8 28.612A14.38 14.38 0 0 1 9.96 24c0-1.604.284-3.16.84-4.612v-6.336H2.62A23.98 23.98 0 0 0 0 24c0 3.876.932 7.544 2.62 10.948l8.18-6.336z" fill="#FBBC05"/>
    <path d="M24 9.664c3.46 0 6.572 1.188 9.016 3.52l6.748-6.748C35.908 2.4 30.472 0 24 0 14.74 0 6.572 5.2 2.62 13.052l8.18 6.336C12.656 13.816 17.856 9.664 24 9.664z" fill="#EA4335"/>
  </svg>
);

const CONTENT = {
  fr: {
    title: "Rejoindre l'Association",
    subtitle: "Inscription avec adhésion",
    membershipTitle: "Votre adhésion",
    priceLabel: "Cotisation annuelle",
    perYear: "/ an",
    includedLabel: "Inclus :",
    accountSection: "Vos informations",
    name: "Nom Complet",
    namePlaceholder: "Votre nom complet",
    email: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    password: "Mot de passe",
    passwordPlaceholder: "Au moins 8 caractères",
    confirm: "Confirmer le mot de passe",
    confirmPlaceholder: "Répétez votre mot de passe",
    nextPayment: "Continuer vers le paiement →",
    google: "S'inscrire avec Google",
    orEmail: "ou remplissez le formulaire",
    login: "Déjà membre ?",
    loginLink: "Se connecter",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères",
    errorGeneric: "Une erreur est survenue, veuillez réessayer",
    successRedirect: "Compte créé ! Veuillez vous connecter.",
    emailTaken: "Cette adresse e-mail est déjà utilisée.",
    checkingEmail: "Vérification de l'adresse…",
  },
  zh: {
    title: "加入同乡会",
    subtitle: "注册并成为会员",
    membershipTitle: "您的会员资格",
    priceLabel: "年度会费",
    perYear: "/ 年",
    includedLabel: "包含：",
    accountSection: "填写账户信息",
    name: "全名",
    namePlaceholder: "请输入您的姓名",
    email: "电子邮件",
    emailPlaceholder: "your@example.com",
    password: "密码",
    passwordPlaceholder: "至少8个字符",
    confirm: "确认密码",
    confirmPlaceholder: "再次输入密码",
    nextPayment: "继续前往付款 →",
    google: "使用 Google 注册",
    orEmail: "或填写以下表单",
    login: "已有账户？",
    loginLink: "立即登录",
    passwordMismatch: "两次输入的密码不一致",
    passwordTooShort: "密码至少需要8个字符",
    errorGeneric: "发生错误，请重试",
    successRedirect: "账户创建成功！请登录。",
    emailTaken: "该邮箱已被注册。",
    checkingEmail: "正在检查邮箱…",
  },
  en: {
    title: "Join the Association",
    subtitle: "Registration & Membership",
    membershipTitle: "Your Membership",
    priceLabel: "Annual fee",
    perYear: "/ year",
    includedLabel: "Includes:",
    accountSection: "Account details",
    name: "Full Name",
    namePlaceholder: "Your full name",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "At least 8 characters",
    confirm: "Confirm Password",
    confirmPlaceholder: "Repeat your password",
    nextPayment: "Continue to Payment →",
    google: "Sign up with Google",
    orEmail: "or fill out the form",
    login: "Already a member?",
    loginLink: "Sign in",
    passwordMismatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 8 characters",
    errorGeneric: "An error occurred, please try again",
    successRedirect: "Account created! Please sign in.",
    emailTaken: "This email address is already registered.",
    checkingEmail: "Checking email…",
  },
};

type Step = "info" | "pay";

export default function RegisterForm() {
  const { lang } = useLanguage();
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState<Step>("info");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.fr;
  const tierLang = TIER[lang as keyof typeof TIER] as { name: string; desc: string; benefits: string[] };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      showToast(c.passwordMismatch, "error");
      return;
    }
    if (formData.password.length < 8) {
      showToast(c.passwordTooShort, "error");
      return;
    }
    // Check email availability before going to payment step
    setCheckingEmail(true);
    try {
      const res = await fetch(
        `/api/auth/check-email?email=${encodeURIComponent(formData.email)}`
      );
      const { exists } = await res.json();
      if (exists) {
        showToast(c.emailTaken, "error");
        return;
      }
    } catch {
      // If check fails, let the payment step handle it
    } finally {
      setCheckingEmail(false);
    }
    setStep("pay");
  };

  const handleCustomSubmit = async (token: string) => {
    const res = await fetch("/api/auth/register-with-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        tierId: TIER.id,
        token,
      }),
    });
    if (!res.ok) {
      const d = await res.json();
      throw new Error(d.error || c.errorGeneric);
    }
    // Account created — sign in automatically
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (result?.ok) {
      router.push("/profile");
    } else {
      showToast(c.successRedirect, "success");
      router.push("/auth/login");
    }
  };

  // ── Step: pay ─────────────────────────────────────────────
  if (step === "pay") {
    return (
      <div className="register-pay-page">
        <CloverPayment
          tierId={TIER.id}
          tierName={tierLang?.name ?? "Regular Member"}
          amount={TIER.price}
          onSuccess={() => {/* handled inside customSubmit */}}
          onCancel={() => setStep("info")}
          customSubmit={handleCustomSubmit}
        />
      </div>
    );
  }

  // ── Step: info ────────────────────────────────────────────
  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-side">
        <div className="auth-form-box register-form-wide">

          <div className="auth-form-header">
            <span className="auth-form-eyebrow">{c.subtitle}</span>
            <h1 className="auth-form-title">{c.title}</h1>
          </div>

          {/* Membership tier summary */}
          <div className="register-tier-summary">
            <div className="register-tier-summary-header">
              <span className="register-tier-icon">{TIER.icon}</span>
              <div className="register-tier-summary-info">
                <span className="register-tier-summary-label">{c.membershipTitle}</span>
                <span className="register-tier-summary-name">{tierLang?.name}</span>
              </div>
              <div className="register-tier-summary-price">
                <span className="register-tier-price-amount">${(TIER.price / 100).toFixed(0)} CAD</span>
                <span className="register-tier-price-period">{c.perYear}</span>
              </div>
            </div>
            <div className="register-tier-benefits">
              <span className="register-tier-benefits-label">{c.includedLabel}</span>
              <ul className="register-tier-benefits-list">
                {tierLang?.benefits.map((b) => (
                  <li key={b}>
                    <span className="register-check">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Google OAuth */}
          {/* <button
            type="button"
            className="auth-google-btn"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            {GOOGLE_ICON}
            {c.google}
          </button>

          <div className="auth-sep"><span>{c.orEmail}</span></div> */}

          <p className="register-section-label">{c.accountSection}</p>

          <form onSubmit={handleInfoSubmit} className="auth-fields" noValidate>
            <div className="auth-field-group">
              <label htmlFor="name" className="auth-label">{c.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={c.namePlaceholder}
                className="auth-input"
                required
                autoComplete="name"
              />
            </div>

            <div className="auth-field-group">
              <label htmlFor="email" className="auth-label">{c.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={c.emailPlaceholder}
                className="auth-input"
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field-group">
              <label htmlFor="password" className="auth-label">{c.password}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={c.passwordPlaceholder}
                className="auth-input"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="auth-field-group">
              <label htmlFor="confirm" className="auth-label">{c.confirm}</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                placeholder={c.confirmPlaceholder}
                className="auth-input"
                required
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={checkingEmail}>
              {checkingEmail && <span className="auth-spinner" />}
              {checkingEmail ? c.checkingEmail : c.nextPayment}
            </button>
          </form>

          <p className="auth-switch">
            {c.login}{" "}
            <Link href="/auth/login" className="auth-switch-link">
              {c.loginLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

