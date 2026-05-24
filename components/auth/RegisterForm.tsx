"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const content = {
    fr: {
      title: "S'inscrire",
      name: "Nom Complet",
      email: "Adresse e-mail",
      password: "Mot de passe",
      confirm: "Confirmer le mot de passe",
      submit: "Créer un Compte",
      login: "Déjà membre?",
      loginLink: "Se connecter ici",
      google: "S'inscrire avec Google",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      success: "Compte créé avec succès! Redirection...",
    },
    zh: {
      title: "注册",
      name: "全名",
      email: "电子邮件",
      password: "密码",
      confirm: "确认密码",
      submit: "创建账户",
      login: "已有账户?",
      loginLink: "在这里登录",
      google: "使用 Google 注册",
      passwordMismatch: "密码不匹配",
      success: "账户创建成功!正在重定向...",
    },
    en: {
      title: "Sign Up",
      name: "Full Name",
      email: "Email Address",
      password: "Password",
      confirm: "Confirm Password",
      submit: "Create Account",
      login: "Already have an account?",
      loginLink: "Sign in here",
      google: "Sign up with Google",
      passwordMismatch: "Passwords do not match",
      success: "Account created successfully! Redirecting...",
    },
  };

  const c = content[lang as keyof typeof content];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm) {
      setError(c.passwordMismatch);
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
        setError(data.error || "Registration failed");
        return;
      }

      setError("");
      alert(c.success);
      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{c.title}</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">{c.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{c.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{c.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm">{c.confirm}</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-gold" disabled={isLoading}>
            {isLoading ? "..." : c.submit}
          </button>
        </form>

        <div className="auth-divider">ou</div>

        <button className="btn-google">{c.google}</button>

        <div className="auth-footer">
          <p>
            {c.login}{" "}
            <Link href="/auth/login" className="link">
              {c.loginLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
