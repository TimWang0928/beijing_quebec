"use client";

import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { lang, setLang } = useLanguage();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const content = CONTENT[lang as keyof typeof CONTENT];
  const navPages = ["/", "/about", "/board", "/events", "/membership", "/partners", "/contact"];
  const navItems = content.nav.map((label, index) => ({ label, href: navPages[index] ?? "/" }));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/images/beijing_logo.png" alt="QBA" />
          <div className="nav-logo-text">
            <span className="nav-logo-zh">魁北克北京同乡会</span>
            <span className="nav-logo-fr">L'Association de Beijing du Québec</span>
          </div>
        </Link>

        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <button
            className={`lang-btn ${lang === "fr" ? "active" : ""}`}
            onClick={() => setLang("fr")}
          >
            FR
          </button>
          <button
            className={`lang-btn ${lang === "zh" ? "active" : ""}`}
            onClick={() => setLang("zh")}
          >
            中文
          </button>
          <button
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>

          {/* 登录状态 */}
          {session ? (
            <div className="user-menu-container">
              <button
                className="user-icon-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                type="button"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                {session.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || "User"} className="user-avatar-img" />
                ) : (
                  <span className="user-icon-default">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  </span>
                )}
              </button>
              {userMenuOpen && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-info">
                    <span className="user-menu-name">{session.user?.name || session.user?.email}</span>
                    {session.user?.name && <span className="user-menu-email">{session.user?.email}</span>}
                  </div>
                  <div className="user-menu-divider" />
                  <Link href="/profile" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    {lang === "fr" ? "Mon Profil" : lang === "zh" ? "我的资料" : "My Profile"}
                  </Link>
                  <button
                    className="user-menu-item user-menu-logout"
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setUserMenuOpen(false);
                    }}
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    {lang === "fr" ? "Déconnexion" : lang === "zh" ? "登出" : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link href="/auth/login" className="nav-link nav-link-login">
                {lang === "fr" ? "Connexion" : lang === "zh" ? "登录" : "Login"}
              </Link>
              <Link href="/auth/register" className="nav-link nav-link-register">
                {lang === "fr" ? "S'inscrire" : lang === "zh" ? "注册" : "Sign Up"}
              </Link>
            </div>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="mobile-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        {/* 移动端登录/注册 */}
        <div className="mobile-menu-divider" />
        {session ? (
          <>
            <Link
              href="/profile"
              className="mobile-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {lang === "fr" ? "Mon Profil" : lang === "zh" ? "我的资料" : "My Profile"}
            </Link>
            <button
              className="mobile-item mobile-logout-btn"
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setMobileMenuOpen(false);
              }}
              type="button"
            >
              {lang === "fr" ? "Déconnexion" : lang === "zh" ? "登出" : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="mobile-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {lang === "fr" ? "Connexion" : lang === "zh" ? "登录" : "Login"}
            </Link>
            <Link
              href="/auth/register"
              className="mobile-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {lang === "fr" ? "S'inscrire" : lang === "zh" ? "注册" : "Sign Up"}
            </Link>
          </>
        )}
      </div>
    </nav>
    </>
  );
}
