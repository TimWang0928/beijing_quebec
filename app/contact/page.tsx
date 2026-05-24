"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    fr: {
      pageLabel: "Contact",
      pageTitle: "Nous contacter",
      pageDesc: "Vous avez une question? Contactez-nous directement.",
      infoLabel: "Informations",
      infoTitle: "Coordonnées",
      infoItems: [
        { label: "Adresse", value: "123 rue Saint-Catherine, Montréal, QC H2X 1Z5" },
        { label: "Téléphone", value: "+1 (514) 555-0123" },
        { label: "Email", value: "info@qba-beijing.ca" },
        { label: "Heures", value: "Lun - Ven: 9h - 18h" },
      ],
      formLabel: "Formulaire",
      formTitle: "Envoyez-nous un message",
      formDesc: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les 48 heures.",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      subject: "Sujet",
      category: "Catégorie",
      message: "Message",
      categoryOpt1: "Adhésion",
      categoryOpt2: "Événement",
      categoryOpt3: "Partenariat",
      categoryOpt4: "Autre",
      submit: "Envoyer",
      success: "Merci! Nous avons reçu votre message.",
    },
    zh: {
      pageLabel: "联系",
      pageTitle: "联系我们",
      pageDesc: "有任何问题？直接与我们联系。",
      infoLabel: "信息",
      infoTitle: "联系方式",
      infoItems: [
        { label: "地址", value: "魁北克省蒙特利尔市圣凯瑟琳街 123 号，H2X 1Z5" },
        { label: "电话", value: "+1 (514) 555-0123" },
        { label: "邮箱", value: "info@qba-beijing.ca" },
        { label: "时间", value: "周一至周五：9:00 - 18:00" },
      ],
      formLabel: "表格",
      formTitle: "给我们发送信息",
      formDesc: "填写下面的表格，我们会在 48 小时内回复您。",
      firstName: "名字",
      lastName: "姓氏",
      email: "邮箱",
      subject: "主题",
      category: "分类",
      message: "消息",
      categoryOpt1: "会员",
      categoryOpt2: "活动",
      categoryOpt3: "合作伙伴",
      categoryOpt4: "其他",
      submit: "发送",
      success: "谢谢！我们已收到您的消息。",
    },
    en: {
      pageLabel: "Contact",
      pageTitle: "Contact Us",
      pageDesc: "Have a question? Contact us directly.",
      infoLabel: "Information",
      infoTitle: "Contact Details",
      infoItems: [
        { label: "Address", value: "123 Saint-Catherine Street, Montreal, QC H2X 1Z5" },
        { label: "Phone", value: "+1 (514) 555-0123" },
        { label: "Email", value: "info@qba-beijing.ca" },
        { label: "Hours", value: "Mon - Fri: 9am - 6pm" },
      ],
      formLabel: "Form",
      formTitle: "Send us a message",
      formDesc: "Fill out the form below and we'll get back to you within 48 hours.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      subject: "Subject",
      category: "Category",
      message: "Message",
      categoryOpt1: "Membership",
      categoryOpt2: "Event",
      categoryOpt3: "Partnership",
      categoryOpt4: "Other",
      submit: "Send",
      success: "Thank you! We've received your message.",
    },
  };

  const c = content[lang as keyof typeof content];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ firstName: "", lastName: "", email: "", subject: "", category: "", message: "" });
  };

  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="sec-label">{c.pageLabel}</div>
          <h1 className="sec-title-zh">{c.pageTitle}</h1>
          <p className="sec-sub">{c.pageDesc}</p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section style={{ background: "var(--offwhite)", padding: "120px 0" }}>
        <div className="container">
          <div className="grid-2">
            {/* Info Section */}
            <div>
              <div className="sec-label">{c.infoLabel}</div>
              <div className="gold-line"></div>
              <h2 className="sec-title-zh">{c.infoTitle}</h2>
              <div style={{ marginTop: "40px" }}>
                {c.infoItems.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: "32px" }}>
                    <p style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", letterSpacing: ".1em", marginBottom: "6px" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "16px", color: "var(--navy)", fontWeight: "600" }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              {/* Social Links */}
              <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <p style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--muted)", letterSpacing: ".1em", marginBottom: "16px" }}>
                  {lang === "fr" ? "Réseaux sociaux" : lang === "zh" ? "社交媒体" : "Follow Us"}
                </p>
                <div style={{ display: "flex", gap: "16px" }}>
                  <a href="#" style={{ fontSize: "14px", color: "var(--red2)", textDecoration: "none", fontWeight: "600" }}>
                    Facebook
                  </a>
                  <a href="#" style={{ fontSize: "14px", color: "var(--red2)", textDecoration: "none", fontWeight: "600" }}>
                    WeChat
                  </a>
                  <a href="#" style={{ fontSize: "14px", color: "var(--red2)", textDecoration: "none", fontWeight: "600" }}>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="contact-card">
              <div className="sec-label">{c.formLabel}</div>
              <div className="gold-line" style={{ marginTop: "12px", marginBottom: "20px" }}></div>
              <h3 className="sec-title-zh" style={{ fontSize: "20px", marginBottom: "8px" }}>
                {c.formTitle}
              </h3>
              <p className="sec-sub" style={{ marginBottom: "28px", fontSize: "14px" }}>
                {c.formDesc}
              </p>

              {submitted && (
                <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", color: "var(--navy)", padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", fontSize: "14px" }}>
                  ✓ {c.success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }}>
                      {c.firstName}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }}>
                      {c.lastName}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }}>
                    {c.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }}>
                      {c.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }}>
                      {c.category}
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">
                        {lang === "fr" ? "Sélectionner..." : lang === "zh" ? "选择..." : "Select..."}
                      </option>
                      <option value="membership">{c.categoryOpt1}</option>
                      <option value="event">{c.categoryOpt2}</option>
                      <option value="partnership">{c.categoryOpt3}</option>
                      <option value="other">{c.categoryOpt4}</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }}>
                    {c.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button type="submit" className="btn-red" style={{ width: "100%" }}>
                  {c.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section>
        <div className="container">
          <div style={{ background: "var(--offwhite)", borderRadius: "16px", overflow: "hidden", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
            {lang === "fr" ? "Carte interactive ici" : lang === "zh" ? "互动地图在此" : "Interactive map here"}
          </div>
        </div>
      </section>
    </main>
  );
}
