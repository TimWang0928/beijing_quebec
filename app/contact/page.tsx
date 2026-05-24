"use client";

import { FormEvent } from "react";
import { renderIcon } from "@/components/Icons";
import { CONTENT } from "@/context/CONTENT";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as keyof typeof CONTENT];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    window.location.href = `mailto:aqcbeijing@gmail.com?subject=${encodeURIComponent(`Message de ${name || email || "Contact"}: ${subject}`)}&body=${encodeURIComponent(`${message}\n\n${email}`)}`;
  };

  return (
    <main className="page">
      <section className="page-header">
        <div className="container">
          <div className="sec-label">{c.ctPageLabel}</div>
          <h1 className="sec-title-zh">{c.ctPageTitle}</h1>
          <p className="sec-sub">{c.ctPageDesc}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid-2">
            <div className="fade on">
              <div className="sec-label">{c.ctInfoLabel}</div>
              <div className="gold-line"></div>
              <h2 className="sec-title-zh">{c.ctInfoTitle}</h2>
              <div style={{ marginTop: "24px" }}>
                {c.contactItems.map((item) => (
                  <div key={item.label} className="contact-item">
                    <div className="contact-icon-box">{renderIcon(item.icon, { size: 22 })}</div>
                    <div>
                      <div className="contact-label">{item.label}</div>
                      <div className="contact-val">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade on" style={{ transitionDelay: ".15s" }}>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid rgba(0,0,0,0.07)" }}>
                <div className="sec-label" style={{ marginBottom: "20px" }}>
                  {c.ctFormLabel}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">{c.fLName}</label>
                    <input id="contact-name" name="name" type="text" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">{c.fLEmail}</label>
                    <input id="contact-email" name="email" type="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">{c.fLSubject}</label>
                    <select id="contact-subject" name="subject">
                      <option>{c.fOpt1}</option>
                      <option>{c.fOpt2}</option>
                      <option>{c.fOpt3}</option>
                      <option>{c.fOpt4}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">{c.fLMsg}</label>
                    <textarea id="contact-message" name="message"></textarea>
                  </div>
                  <button className="btn-red" type="submit" style={{ width: "100%" }}>
                    {c.fSubmit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
