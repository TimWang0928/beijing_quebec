"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  membershipTier: string;
  membershipExpiresAt: string | null;
  foundingNumber: number | null;
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PaymentRecord {
  id: string;
  cloverChargeId: string;
  amount: number;
  currency: string;
  tierApplied: string;
  status: string;
  createdAt: string;
}

const TIER_LABELS: Record<string, { fr: string; zh: string; en: string; color: string }> = {
  NONE:       { fr: "Aucun",             zh: "无",      en: "None",            color: "tier-none" },
  REGULAR:    { fr: "Membre communautaire",  zh: "普通会员", en: "Community Member", color: "tier-regular" },
  FAMILY:     { fr: "Membre famille",    zh: "家庭会员", en: "Family Member",   color: "tier-family" },
  FOUNDING:   { fr: "Membre fondateur", zh: "创始会员", en: "Founding Member", color: "tier-founding" },
};

const CONTENT = {
  fr: {
    title: "Mon Profil",
    subtitle: "Gérez vos informations personnelles",
    personalInfo: "Informations personnelles",
    membershipInfo: "Informations d'adhésion",
    accountInfo: "Informations du compte",
    name: "Nom complet",
    email: "Adresse e-mail",
    role: "Rôle",
    membershipTier: "Niveau d'adhésion",
    membershipExpiry: "Expiration de l'adhésion",
    emailVerified: "E-mail vérifié",
    memberSince: "Membre depuis",
    lastUpdated: "Dernière mise à jour",
    editName: "Modifier le nom",
    saveName: "Enregistrer",
    cancelEdit: "Annuler",
    namePlaceholder: "Votre nom complet",
    saveSuccess: "Profil mis à jour !",
    saveError: "Échec de la mise à jour",
    noExpiry: "N/A",
    verified: "Vérifié",
    notVerified: "Non vérifié",
    roleUser: "Utilisateur",
    roleAdmin: "Administrateur",
    loginRequired: "Connexion requise",
    loading: "Chargement…",
    paymentHistory: "Historique des paiements",
    noPayments: "Aucun paiement enregistré.",
    paymentDate: "Date",
    paymentAmount: "Montant",
    paymentTier: "Niveau",
    paymentRef: "Référence",
    paymentStatus: "Statut",
  },
  zh: {
    title: "我的资料",
    subtitle: "管理您的个人信息",
    personalInfo: "个人信息",
    membershipInfo: "会员信息",
    accountInfo: "账户信息",
    name: "全名",
    email: "电子邮件",
    role: "角色",
    membershipTier: "会员等级",
    membershipExpiry: "会员到期日",
    emailVerified: "邮箱验证",
    memberSince: "注册时间",
    lastUpdated: "最后更新",
    editName: "修改姓名",
    saveName: "保存",
    cancelEdit: "取消",
    namePlaceholder: "您的全名",
    saveSuccess: "资料已更新！",
    saveError: "更新失败",
    noExpiry: "无",
    verified: "已验证",
    notVerified: "未验证",
    roleUser: "普通用户",
    roleAdmin: "管理员",
    loginRequired: "需要登录",
    loading: "加载中…",
    paymentHistory: "付款记录",
    noPayments: "暂无付款记录。",
    paymentDate: "日期",
    paymentAmount: "金额",
    paymentTier: "会员类别",
    paymentRef: "交易编号",
    paymentStatus: "状态",
  },
  en: {
    title: "My Profile",
    subtitle: "Manage your personal information",
    personalInfo: "Personal Information",
    membershipInfo: "Membership",
    accountInfo: "Account",
    name: "Full Name",
    email: "Email Address",
    role: "Role",
    membershipTier: "Membership Tier",
    membershipExpiry: "Membership Expiry",
    emailVerified: "Email Verified",
    memberSince: "Member Since",
    lastUpdated: "Last Updated",
    editName: "Edit Name",
    saveName: "Save",
    cancelEdit: "Cancel",
    namePlaceholder: "Your full name",
    saveSuccess: "Profile updated!",
    saveError: "Failed to update profile",
    noExpiry: "N/A",
    verified: "Verified",
    notVerified: "Not verified",
    roleUser: "User",
    roleAdmin: "Admin",
    loginRequired: "Login required",
    loading: "Loading…",
    paymentHistory: "Payment History",
    noPayments: "No payments on record.",
    paymentDate: "Date",
    paymentAmount: "Amount",
    paymentTier: "Tier",
    paymentRef: "Reference",
    paymentStatus: "Status",
  },
};

function formatDate(dateStr: string | null, lang: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const locale = lang === "zh" ? "zh-CN" : lang === "fr" ? "fr-CA" : "en-CA";
  return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [saving, setSaving] = useState(false);

  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.fr;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setLoading(true);
      // 添加小延迟确保会话完全就绪
      const timer = setTimeout(() => {
        fetch("/api/user/profile")
          .then((r) => {
            if (!r.ok) {
              if (r.status === 401) {
                // 会话过期，重新登录
                router.push("/auth/login");
              } else {
                throw new Error(`API ${r.status}`);
              }
            }
            return r.json();
          })
          .then((data) => {
            if (data?.id) {
              setProfile(data);
              setNameValue(data.name || "");
            } else {
              console.warn("Invalid profile data:", data);
              showToast(c.saveError, "error");
            }
          })
          .catch((err) => {
            console.error("Profile fetch failed:", err);
            showToast(c.saveError, "error");
          })
          .finally(() => setLoading(false));
        // Fetch payments in parallel (non-blocking)
        fetch("/api/user/payments")
          .then((r) => r.ok ? r.json() : [])
          .then((data) => { if (Array.isArray(data)) setPayments(data); })
          .catch(() => {/* ignore payment fetch errors */});
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [status, session?.user]);

  const handleSaveName = async () => {
    if (!nameValue.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameValue }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setProfile(updated);
      setEditingName(false);
      showToast(c.saveSuccess, "success");
    } catch {
      showToast(c.saveError, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <span className="profile-spinner" />
        <span>{c.loading}</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-loading">
        <span>{c.loginRequired}</span>
      </div>
    );
  }

  const tier = TIER_LABELS[profile.membershipTier] ?? TIER_LABELS.NONE;
  const tierLabel = tier[lang as keyof typeof tier] as string;
  const isActive =
    profile.membershipTier !== "NONE" &&
    (!profile.membershipExpiresAt || new Date(profile.membershipExpiresAt) > new Date());

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (profile.email?.[0] ?? "?").toUpperCase();

  return (
    <div className="profile-page">
      {/* Hero banner */}
      <div className="profile-hero">
        <div className="profile-hero-inner container">
          <div className="profile-avatar">
            {profile.image ? (
              <img src={profile.image} alt={profile.name || "User"} className="profile-avatar-img" />
            ) : (
              <span className="profile-avatar-initials">{initials}</span>
            )}
          </div>
          <div className="profile-hero-info">
            <h1 className="profile-hero-name">{profile.name || profile.email}</h1>
            <p className="profile-hero-email">{profile.email}</p>
            <div className="profile-hero-badges">
              <span className={`profile-tier-badge ${tier.color}`}>
                {tierLabel}
              </span>
              {profile.role === "admin" && (
                <span className="profile-role-badge">{c.roleAdmin}</span>
              )}
              {isActive && (
                <span className="profile-active-badge">
                  ✓ {lang === "zh" ? "会员有效" : lang === "fr" ? "Adhésion active" : "Active Member"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="profile-content container">
        <div className="profile-grid">

          {/* Personal Information */}
          <section className="profile-section">
            <div className="profile-section-header">
              <svg className="profile-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              <h2 className="profile-section-title">{c.personalInfo}</h2>
            </div>
            <div className="profile-card">
              <div className="profile-field">
                <span className="profile-field-label">{c.name}</span>
                {editingName ? (
                  <div className="profile-field-edit">
                    <input
                      className="profile-edit-input"
                      value={nameValue}
                      onChange={(e) => setNameValue(e.target.value)}
                      placeholder={c.namePlaceholder}
                      autoFocus
                    />
                    <div className="profile-edit-actions">
                      <button
                        className="profile-btn-save"
                        onClick={handleSaveName}
                        disabled={saving || !nameValue.trim()}
                      >
                        {saving ? <span className="auth-spinner" /> : null}
                        {c.saveName}
                      </button>
                      <button
                        className="profile-btn-cancel"
                        onClick={() => {
                          setEditingName(false);
                          setNameValue(profile.name || "");
                        }}
                      >
                        {c.cancelEdit}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-field-value-row">
                    <span className="profile-field-value">{profile.name || "—"}</span>
                    <button className="profile-edit-btn" onClick={() => setEditingName(true)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      {c.editName}
                    </button>
                  </div>
                )}
              </div>
              <div className="profile-field">
                <span className="profile-field-label">{c.email}</span>
                <div className="profile-field-value-row">
                  <span className="profile-field-value">{profile.email}</span>
                  <span className={`profile-verified-badge ${profile.emailVerified ? "verified" : "unverified"}`}>
                    {profile.emailVerified ? `✓ ${c.verified}` : c.notVerified}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Membership */}
          <section className="profile-section">
            <div className="profile-section-header">
              <svg className="profile-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              <h2 className="profile-section-title">{c.membershipInfo}</h2>
            </div>
            <div className="profile-card">
              <div className="profile-field">
                <span className="profile-field-label">{c.membershipTier}</span>
                <span className={`profile-tier-badge-lg ${tier.color}`}>{tierLabel}</span>
              </div>
              {profile.membershipTier === "FOUNDING" && profile.foundingNumber && (
                <div className="profile-field">
                  <span className="profile-field-label">
                    {lang === "zh" ? "永久编号" : lang === "fr" ? "Numéro permanent" : "Permanent Number"}
                  </span>
                  <span className="profile-field-value profile-founding-number">
                    NO.{String(profile.foundingNumber).padStart(3, "0")}
                  </span>
                </div>
              )}
              <div className="profile-field">
                <span className="profile-field-label">{c.membershipExpiry}</span>
                <span className="profile-field-value">
                  {profile.membershipTier === "FOUNDING"
                    ? (lang === "zh" ? "永久" : lang === "fr" ? "Permanent" : "Permanent")
                    : profile.membershipExpiresAt
                    ? formatDate(profile.membershipExpiresAt, lang)
                    : c.noExpiry}
                </span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">{lang === "zh" ? "状态" : lang === "fr" ? "Statut" : "Status"}</span>
                <span className={`profile-status-badge ${isActive ? "active" : "inactive"}`}>
                  {isActive
                    ? (lang === "zh" ? "● 有效" : lang === "fr" ? "● Actif" : "● Active")
                    : (lang === "zh" ? "○ 无效" : lang === "fr" ? "○ Inactif" : "○ Inactive")}
                </span>
              </div>
              {!isActive && (
                <div className="profile-field profile-become-member-row">
                  <Link
                    href="/membership/apply"
                    className="profile-become-member-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                    {lang === "zh" ? "成为会员" : lang === "fr" ? "Devenir membre" : "Become a Member"}
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Account */}
          <section className="profile-section">
            <div className="profile-section-header">
              <svg className="profile-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <h2 className="profile-section-title">{c.accountInfo}</h2>
            </div>
            <div className="profile-card">
              <div className="profile-field">
                <span className="profile-field-label">{c.role}</span>
                <span className="profile-field-value profile-field-capitalize">
                  {profile.role === "admin" ? c.roleAdmin : c.roleUser}
                </span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">{c.memberSince}</span>
                <span className="profile-field-value">{formatDate(profile.createdAt, lang)}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">{c.lastUpdated}</span>
                <span className="profile-field-value">{formatDate(profile.updatedAt, lang)}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">ID</span>
                <span className="profile-field-value profile-field-mono">{profile.id}</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Payment History */}
      <div className="profile-content profile-content-payments container">
        <section className="profile-section profile-section-full">
          <div className="profile-section-header">
            <svg className="profile-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
            </svg>
            <h2 className="profile-section-title">{c.paymentHistory}</h2>
          </div>
          <div className="profile-card">
            {payments.length === 0 ? (
              <div className="profile-no-payments">{c.noPayments}</div>
            ) : (
              <div className="profile-payments-list">
                {payments.map((p) => {
                  const tierMeta = TIER_LABELS[p.tierApplied];
                  const tierLabel = (tierMeta?.[lang as keyof typeof tierMeta] as string) ?? p.tierApplied;
                  return (
                    <div key={p.id} className="profile-payment-row">
                      <div className="profile-payment-left">
                        <span className={`profile-tier-badge ${tierMeta?.color ?? "tier-none"}`}>
                          {tierLabel}
                        </span>
                        <span className="profile-payment-date">{formatDate(p.createdAt, lang)}</span>
                      </div>
                      <div className="profile-payment-right">
                        <span className="profile-payment-amount">
                          ${(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()}
                        </span>
                        <span className={`profile-payment-status pstatus-${p.status}`}>
                          {p.status === "succeeded"
                            ? (lang === "zh" ? "✓ 成功" : lang === "fr" ? "✓ Réussi" : "✓ Succeeded")
                            : p.status}
                        </span>
                        <span className="profile-payment-ref">#{p.cloverChargeId}</span>
                        <Link
                          href={`/profile/receipts/${p.id}`}
                          className="profile-receipt-btn"
                        >
                          {lang === "zh" ? "查看收据" : lang === "fr" ? "Voir reçu" : "View Receipt"}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
