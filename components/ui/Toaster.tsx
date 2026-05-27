"use client";

import { useToast } from "@/context/ToastContext";
import { useEffect, useRef } from "react";

const ICONS: Record<string, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export default function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toaster" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onClose,
}: {
  toast: { id: string; message: string; type: string };
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // trigger enter animation
    requestAnimationFrame(() => {
      el.classList.add("toast-enter");
    });
  }, []);

  return (
    <div ref={ref} className={`toast toast-${toast.type}`} role="alert">
      <span className="toast-icon">{ICONS[toast.type] ?? "ℹ"}</span>
      <span className="toast-msg">{toast.message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
