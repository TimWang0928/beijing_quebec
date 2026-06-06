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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={closeSidebar}>
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
                    onClick={() => { signOut({ callbackUrl: "/" }); setUserMenuOpen(false); }}
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
            </div>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    {/* 侧边栏遮罩 */}
    <div
      className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
      onClick={closeSidebar}
      aria-hidden="true"
    />

    {/* 侧边栏抽屉 */}
    <aside className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`} aria-label="Navigation sidebar">
      {/* 头部 */}
      <div className="sidebar-header">
        <Link href="/" className="sidebar-logo" onClick={closeSidebar}>
          <img src="/images/beijing_logo.png" alt="QBA" />
          <div className="nav-logo-text">
            <span className="nav-logo-zh">魁北克北京同乡会</span>
            <span className="nav-logo-fr">L'Association de Beijing du Québec</span>
          </div>
        </Link>
        <button className="sidebar-close-btn" onClick={closeSidebar} aria-label="Close menu" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* 导航链接 */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-nav-item ${pathname === item.href ? "active" : ""}`}
            onClick={closeSidebar}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 分割线 */}
      <div className="sidebar-divider" />

      {/* 语言切换 */}
      <div className="sidebar-section">
        <span className="sidebar-section-label">
          {lang === "fr" ? "Langue" : lang === "zh" ? "语言" : "Language"}
        </span>
        <div className="sidebar-lang-group">
          <button className={`sidebar-lang-btn ${lang === "fr" ? "active" : ""}`} onClick={() => setLang("fr")}>Français</button>
          <button className={`sidebar-lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => setLang("zh")}>中文</button>
          <button className={`sidebar-lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>English</button>
        </div>
      </div>

      <div className="sidebar-divider" />

      {/* 登录/用户区域 */}
      <div className="sidebar-section">
        {session ? (
          <>
            <div className="sidebar-user-info">
              {session.user?.image ? (
                <img src={session.user.image} alt={session.user.name || "User"} className="sidebar-user-avatar" />
              ) : (
                <div className="sidebar-user-avatar-default">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
              )}
              <div>
                <div className="sidebar-user-name">{session.user?.name || session.user?.email}</div>
                {session.user?.name && <div className="sidebar-user-email">{session.user?.email}</div>}
              </div>
            </div>
            <Link href="/profile" className="sidebar-auth-btn sidebar-profile-btn" onClick={closeSidebar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              {lang === "fr" ? "Mon Profil" : lang === "zh" ? "我的资料" : "My Profile"}
            </Link>
            <button
              className="sidebar-auth-btn sidebar-logout-btn"
              onClick={() => { signOut({ callbackUrl: "/" }); closeSidebar(); }}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              {lang === "fr" ? "Déconnexion" : lang === "zh" ? "登出" : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="sidebar-auth-btn sidebar-login-btn" onClick={closeSidebar}>
              {lang === "fr" ? "Connexion" : lang === "zh" ? "登录" : "Login"}
            </Link>
            <Link href="/auth/register" className="sidebar-auth-btn sidebar-register-btn" onClick={closeSidebar}>
              {lang === "fr" ? "S'inscrire" : lang === "zh" ? "注册" : "Sign Up"}
            </Link>
          </>
        )}
      </div>
    </aside>
    </>
  );
}
