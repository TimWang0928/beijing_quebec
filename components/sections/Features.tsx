"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CommunityIcon, HeritageIcon, ExchangeIcon } from "@/components/Icons";

export default function Features() {
  const { lang } = useLanguage();

  const content = {
    fr: [
      {
        icon: "community",
        title: "Communauté",
        description: "Connectez-vous avec d'autres Pékinois et construisez des amitiés durables.",
      },
      {
        icon: "heritage",
        title: "Patrimoine",
        description: "Célébrez et préservez notre riche héritage culturel et traditions.",
      },
      {
        icon: "exchange",
        title: "Échanges",
        description: "Favorisez les échanges culturels entre le Québec et Beijing.",
      },
    ],
    zh: [
      {
        icon: "community",
        title: "社区",
        description: "与其他北京人联系，建立长久的友谊。",
      },
      {
        icon: "heritage",
        title: "文化",
        description: "庆祝和保护我们丰富的文化遗产和传统。",
      },
      {
        icon: "exchange",
        title: "交流",
        description: "促进魁北克和北京之间的文化交流。",
      },
    ],
    en: [
      {
        icon: "community",
        title: "Community",
        description: "Connect with other Beijingers and build lasting friendships.",
      },
      {
        icon: "heritage",
        title: "Heritage",
        description: "Celebrate and preserve our rich cultural heritage and traditions.",
      },
      {
        icon: "exchange",
        title: "Exchange",
        description: "Promote cultural exchange between Quebec and Beijing.",
      },
    ],
  };

  const c = content[lang as keyof typeof content];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {c.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon === "community" && <CommunityIcon />}
                {feature.icon === "heritage" && <HeritageIcon />}
                {feature.icon === "exchange" && <ExchangeIcon />}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
