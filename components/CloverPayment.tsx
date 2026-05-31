"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  tierId: string;
  tierName: string;
  amount: number; // cents
  onSuccess: () => void;
  onCancel: () => void;
  /** Optional: custom payment handler. Receives the Clover token. Throw to display an error. */
  customSubmit?: (token: string) => Promise<void>;
}

declare global {
  interface Window {
    Clover: new (
      apiKey: string,
      options?: { merchantId?: string; locale?: string }
    ) => CloverInstance;
  }
}
interface CloverInstance {
  elements: () => CloverElements;
  createToken: () => Promise<{ token?: string; errors?: Record<string, string> }>;
}
interface CloverElements {
  create: (type: string, styles?: object) => CloverElement;
}
interface CloverElement {
  mount: (selector: string) => void;
  addEventListener: (event: string, handler: (e: { error?: { message: string } }) => void) => void;
}

const CONTENT = {
  fr: {
    title: "Informations de paiement",
    cardNumber: "Numéro de carte",
    expiry: "Date d'expiration",
    cvv: "CVV",
    postal: "Code postal",
    pay: "Payer maintenant",
    paying: "Traitement en cours…",
    cancel: "← Retour",
    membershipLabel: "Adhésion",
    totalLabel: "Total",
    secureNotice: "Paiement sécurisé via Clover",
    tokenError: "Échec de la vérification de la carte. Veuillez réessayer.",
    genericError: "Une erreur est survenue. Veuillez réessayer.",
  },
  zh: {
    title: "付款信息",
    cardNumber: "卡号",
    expiry: "有效期",
    cvv: "CVV",
    postal: "邮政编码",
    pay: "立即付款",
    paying: "处理中…",
    cancel: "← 返回",
    membershipLabel: "会员类别",
    totalLabel: "合计",
    secureNotice: "由 Clover 安全处理",
    tokenError: "卡片验证失败，请重试。",
    genericError: "发生错误，请重试。",
  },
  en: {
    title: "Payment Details",
    cardNumber: "Card Number",
    expiry: "Expiry Date",
    cvv: "CVV",
    postal: "Postal Code",
    pay: "Pay Now",
    paying: "Processing…",
    cancel: "← Back",
    membershipLabel: "Membership",
    totalLabel: "Total",
    secureNotice: "Secured by Clover",
    tokenError: "Card verification failed. Please try again.",
    genericError: "An unexpected error occurred. Please try again.",
  },
};

const SANDBOX_SDK = "https://checkout.sandbox.dev.clover.com/sdk.js";
const PRODUCTION_SDK = "https://checkout.clover.com/sdk.js";

export default function CloverPayment({ tierId, tierName, amount, onSuccess, onCancel, customSubmit }: Props) {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.fr;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cloverRef = useRef<CloverInstance | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const src = process.env.NODE_ENV === "production" ? PRODUCTION_SDK : SANDBOX_SDK;

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      // SDK already loaded — initialize immediately
      initClover();
      return () => { mountedRef.current = false; };
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = initClover;
    document.head.appendChild(script);

    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initClover() {
    if (!mountedRef.current || typeof window.Clover === "undefined") return;

    const locale =
      lang === "zh" ? "en-US" : lang === "fr" ? "fr-CA" : "en-CA";

    const clover = new window.Clover(
      process.env.NEXT_PUBLIC_CLOVER_PUBLIC_KEY ?? "",
      {
        merchantId: process.env.NEXT_PUBLIC_CLOVER_MERCHANT_ID,
        locale,
      }
    );
    cloverRef.current = clover;

    const elements = clover.elements();
    const styles = {
      body: { fontFamily: "'DM Sans', sans-serif", fontSize: "15px" },
      input: { color: "#1a1a2e", fontFamily: "'DM Sans', sans-serif" },
    };

    const cardNumber = elements.create("CARD_NUMBER", styles);
    const cardDate = elements.create("CARD_DATE", styles);
    const cardCvv = elements.create("CARD_CVV", styles);
    const cardPostalCode = elements.create("CARD_POSTAL_CODE", styles);

    cardNumber.mount("#clover-card-number");
    cardDate.mount("#clover-card-date");
    cardCvv.mount("#clover-card-cvv");
    cardPostalCode.mount("#clover-card-postal-code");

    // Surface first validation error to UI
    [cardNumber, cardDate, cardCvv, cardPostalCode].forEach((el) => {
      el.addEventListener("change", (e) => {
        if (e.error) setError(e.error.message);
        else setError(null);
      });
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloverRef.current || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await cloverRef.current.createToken();

      if (result.errors) {
        const firstMsg = Object.values(result.errors)[0];
        setError(firstMsg ?? c.tokenError);
        return;
      }
      if (!result.token) {
        setError(c.tokenError);
        return;
      }

      if (customSubmit) {
        await customSubmit(result.token);
      } else {
        const res = await fetch("/api/payment/charge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: result.token, tierId }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? c.genericError);
          return;
        }
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : c.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="clover-payment-wrapper">
      <div className="clover-payment-summary">
        <span className="clover-summary-label">{c.membershipLabel}:</span>
        <strong>{tierName}</strong>
        <span className="clover-summary-sep">·</span>
        <span className="clover-summary-label">{c.totalLabel}:</span>
        <strong className="clover-summary-amount">${(amount / 100).toFixed(2)} CAD</strong>
      </div>

      <form onSubmit={handleSubmit} className="clover-form" noValidate>
        <h3 className="clover-form-title">{c.title}</h3>

        {error && (
          <div className="clover-error" role="alert">
            {error}
          </div>
        )}

        <div className="clover-field">
          <label className="clover-label">{c.cardNumber}</label>
          <div id="clover-card-number" className="clover-input-frame" />
        </div>

        <div className="clover-field-row">
          <div className="clover-field">
            <label className="clover-label">{c.expiry}</label>
            <div id="clover-card-date" className="clover-input-frame" />
          </div>
          <div className="clover-field">
            <label className="clover-label">{c.cvv}</label>
            <div id="clover-card-cvv" className="clover-input-frame" />
          </div>
          <div className="clover-field">
            <label className="clover-label">{c.postal}</label>
            <div id="clover-card-postal-code" className="clover-input-frame" />
          </div>
        </div>

        <button
          type="submit"
          className="btn-gold clover-pay-btn"
          disabled={isLoading}
        >
          {isLoading ? c.paying : `${c.pay} — $${(amount / 100).toFixed(2)} CAD`}
        </button>

        <button type="button" className="payment-back-btn" onClick={onCancel}>
          {c.cancel}
        </button>

        <p className="clover-secure-notice">🔒 {c.secureNotice}</p>
      </form>
    </div>
  );
}
