"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface RawResponse {
  ref_num?: string;
  auth_code?: string;
  source?: { brand?: string; last4?: string };
}

interface PaymentDetail {
  id: string;
  cloverChargeId: string;
  amount: number;
  currency: string;
  tierApplied: string;
  status: string;
  rawResponse: RawResponse | null;
  createdAt: string;
  user: { name: string | null; email: string | null };
}

const TIER_LABELS: Record<string, { fr: string; zh: string; en: string }> = {
  NONE:       { fr: "Aucun",      zh: "无",   en: "None" },
  REGULAR:    { fr: "Régulier",   zh: "普通", en: "Regular" },
  FAMILY:     { fr: "Famille",    zh: "家庭", en: "Family" },
  YOUTH:      { fr: "Jeunesse",   zh: "青年", en: "Youth" },
  HONORARY:   { fr: "Honoraire",  zh: "荣誉", en: "Honorary" },
  SUPPORTING: { fr: "Soutien",    zh: "支持", en: "Supporting" },
};

const CONTENT = {
  fr: {
    title: "Reçu de paiement",
    org: "Association de Beijing du Québec",
    backToProfile: "← Retour au profil",
    print: "Imprimer",
    receiptNo: "N° de reçu",
    date: "Date",
    name: "Nom",
    email: "Courriel",
    membership: "Adhésion",
    amount: "Montant",
    paymentMethod: "Méthode de paiement",
    card: "Carte",
    refNum: "N° de référence",
    authCode: "Code d'autorisation",
    status: "Statut",
    succeeded: "Paiement réussi",
    thankYou: "Merci pour votre adhésion !",
    loading: "Chargement…",
    notFound: "Paiement introuvable.",
  },
  zh: {
    title: "付款收据",
    org: "魁北克北京同乡会",
    backToProfile: "← 返回资料页",
    print: "打印",
    receiptNo: "收据编号",
    date: "日期",
    name: "姓名",
    email: "邮箱",
    membership: "会员类别",
    amount: "金额",
    paymentMethod: "支付方式",
    card: "卡片",
    refNum: "流水号",
    authCode: "授权码",
    status: "状态",
    succeeded: "付款成功",
    thankYou: "感谢您成为我们的会员！",
    loading: "加载中…",
    notFound: "找不到该付款记录。",
  },
  en: {
    title: "Payment Receipt",
    org: "Quebec Beijing Association",
    backToProfile: "← Back to Profile",
    print: "Print",
    receiptNo: "Receipt No.",
    date: "Date",
    name: "Name",
    email: "Email",
    membership: "Membership",
    amount: "Amount",
    paymentMethod: "Payment Method",
    card: "Card",
    refNum: "Reference No.",
    authCode: "Auth Code",
    status: "Status",
    succeeded: "Payment Successful",
    thankYou: "Thank you for becoming a member!",
    loading: "Loading…",
    notFound: "Payment record not found.",
  },
};

function formatDate(dateStr: string, lang: string) {
  const d = new Date(dateStr);
  const locale = lang === "zh" ? "zh-CN" : lang === "fr" ? "fr-CA" : "en-CA";
  return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.fr;

  useEffect(() => {
    fetch(`/api/user/payments/${id}`)
      .then((r) => {
        if (r.status === 401) { router.push("/auth/login"); return null; }
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setPayment(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="receipt-loading">{c.loading}</div>;
  }

  if (notFound || !payment) {
    return (
      <div className="receipt-loading">
        <p>{c.notFound}</p>
        <Link href="/profile" className="receipt-back-btn">{c.backToProfile}</Link>
      </div>
    );
  }

  const tier = TIER_LABELS[payment.tierApplied];
  const tierLabel = (tier?.[lang as keyof typeof tier] as string) ?? payment.tierApplied;
  const raw = payment.rawResponse;
  const cardBrand = raw?.source?.brand ?? "";
  const cardLast4 = raw?.source?.last4 ?? "";

  return (
    <div className="receipt-page">
      <div className="receipt-actions no-print">
        <Link href="/profile" className="receipt-back-btn">{c.backToProfile}</Link>
        <button className="receipt-print-btn" onClick={() => window.print()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          {c.print}
        </button>
      </div>

      <div className="receipt-card">
        {/* Header */}
        <div className="receipt-header">
          <div className="receipt-logo-area">
            <div className="receipt-org-icon">北</div>
            <div>
              <div className="receipt-org-name">{c.org}</div>
              <div className="receipt-title">{c.title}</div>
            </div>
          </div>
          <div className="receipt-status-badge receipt-succeeded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            {c.succeeded}
          </div>
        </div>

        <div className="receipt-divider" />

        {/* Details */}
        <div className="receipt-body">
          <div className="receipt-row">
            <span className="receipt-label">{c.receiptNo}</span>
            <span className="receipt-value receipt-mono">{payment.cloverChargeId}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">{c.date}</span>
            <span className="receipt-value">{formatDate(payment.createdAt, lang)}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">{c.name}</span>
            <span className="receipt-value">{payment.user.name || "—"}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">{c.email}</span>
            <span className="receipt-value">{payment.user.email || "—"}</span>
          </div>

          <div className="receipt-divider" />

          <div className="receipt-row">
            <span className="receipt-label">{c.membership}</span>
            <span className="receipt-value receipt-tier">{tierLabel}</span>
          </div>
          <div className="receipt-row receipt-total">
            <span className="receipt-label">{c.amount}</span>
            <span className="receipt-value receipt-amount">
              ${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
            </span>
          </div>

          <div className="receipt-divider" />

          {(cardBrand || cardLast4) && (
            <div className="receipt-row">
              <span className="receipt-label">{c.card}</span>
              <span className="receipt-value">{cardBrand} •••• {cardLast4}</span>
            </div>
          )}
          {raw?.ref_num && (
            <div className="receipt-row">
              <span className="receipt-label">{c.refNum}</span>
              <span className="receipt-value receipt-mono">{raw.ref_num}</span>
            </div>
          )}
          {raw?.auth_code && (
            <div className="receipt-row">
              <span className="receipt-label">{c.authCode}</span>
              <span className="receipt-value receipt-mono">{raw.auth_code}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="receipt-footer">
          <p className="receipt-thank-you">{c.thankYou}</p>
        </div>
      </div>
    </div>
  );
}
