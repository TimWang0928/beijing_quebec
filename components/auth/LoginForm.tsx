"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const content = {
    fr: {
      title: "Connexion",
      email: "Adresse e-mail",
      password: "Mot de passe",
      submit: "Se Connecter",
      forgot: "Mot de passe oublié?",
      signup: "Pas encore de compte?",
      signupLink: "S'inscrire ici",
      google: "Continuer avec Google",
    },
    zh: {
      title: "登录",
      email: "电子邮件",
      password: "密码",
      submit: "登录",
      forgot: "忘记密码?",
      signup: "没有账户?",
      signupLink: "在这里注册",
      google: "使用 Google 登录",
    },
    en: {
      title: "Login",
      email: "Email Address",
      password: "Password",
      submit: "Sign In",
      forgot: "Forgot password?",
      signup: "Don't have an account?",
      signupLink: "Sign up here",
      google: "Continue with Google",
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
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{c.title}</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

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

          <button type="submit" className="btn-gold" disabled={isLoading}>
            {isLoading ? "..." : c.submit}
          </button>
        </form>

        <div className="auth-divider">ou</div>

        <button
          type="button"
          className="btn-google"
          onClick={handleGoogleSignIn}
        >
          {c.google}
        </button>

        <div className="auth-footer">
          <p>
            {c.signup}{" "}
            <Link href="/auth/register" className="link">
              {c.signupLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
