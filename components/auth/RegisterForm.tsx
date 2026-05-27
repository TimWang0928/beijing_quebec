"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/context/ToastContext";

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
    title: "S'inscrire",
    subtitle: "Rejoignez la communauté",
    name: "Nom Complet",
    namePlaceholder: "Votre nom complet",
    email: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    password: "Mot de passe",
    passwordPlaceholder: "Au moins 8 caractères",
    confirm: "Confirmer le mot de passe",
    confirmPlaceholder: "Répétez votre mot de passe",
    submit: "Créer un Compte",
    loading: "Création…",
    login: "Déjà membre ?",
    loginLink: "Se connecter",
    google: "S'inscrire avec Google",
    divider: "ou",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    success: "Compte créé ! Redirection vers la connexion…",
    errorGeneric: "Une erreur est survenue, veuillez réessayer",
  },
  zh: {
    title: "注册",
    subtitle: "加入我们的社区",
    name: "全名",
    namePlaceholder: "请输入您的姓名",
    email: "电子邮件",
    emailPlaceholder: "your@example.com",
    password: "密码",
    passwordPlaceholder: "至少8个字符",
    confirm: "确认密码",
    confirmPlaceholder: "再次输入密码",
    submit: "创建账户",
    loading: "创建中…",
    login: "已有账户？",
    loginLink: "立即登录",
    google: "使用 Google 注册",
    divider: "或",
    passwordMismatch: "两次输入的密码不一致",
    success: "账户创建成功！正在跳转到登录…",
    errorGeneric: "发生错误，请重试",
  },
  en: {
    title: "Create Account",
    subtitle: "Join our community",
    name: "Full Name",
    namePlaceholder: "Your full name",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "At least 8 characters",
    confirm: "Confirm Password",
    confirmPlaceholder: "Repeat your password",
    submit: "Create Account",
    loading: "Creating…",
    login: "Already have an account?",
    loginLink: "Sign in",
    google: "Sign up with Google",
    divider: "or",
    passwordMismatch: "Passwords do not match",
    success: "Account created! Redirecting to sign in…",
    errorGeneric: "An error occurred, please try again",
  },
};

export default function RegisterForm() {
  const { lang } = useLanguage();
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.fr;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      showToast(c.passwordMismatch, "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || c.errorGeneric, "error");
        return;
      }

      showToast(c.success, "success");
      router.push("/auth/login");
    } catch {
      showToast(c.errorGeneric, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-side">
        <div className="auth-form-box">
          <div className="auth-form-header">
            <span className="auth-form-eyebrow">{c.subtitle}</span>
            <h1 className="auth-form-title">{c.title}</h1>
          </div>

          <button
            type="button"
            className="auth-google-btn"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            {GOOGLE_ICON}
            {c.google}
          </button>

          <div className="auth-sep">
            <span>{c.divider}</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-fields" noValidate>
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

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading && <span className="auth-spinner" />}
              {isLoading ? c.loading : c.submit}
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
    // </div>
  );
}
