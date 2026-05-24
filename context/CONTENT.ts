export interface Translation {
  nav: string[];
  heroDesc: string;
  heroCta1: string;
  heroCta2: string;
  hStat1: string;
  hStat2: string;
  hStat3: string;
  hStat4: string;
  introLabel: string;
  introTitle: string;
  introDesc: string;
  introBtn: string;
  homeQuote: string;
  homeQuoteSub: string;
  homeFounded: string;
  galleryLabel: string;
  galleryTitle: string;
  gallery: { tag: string; lbl: string }[];
  evPreLabel: string;
  evPreTitle: string;
  evPreBtn: string;
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn1: string;
  ctaBtn2: string;
  abPageLabel: string;
  abPageTitle: string;
  abPageDesc: string;
  abIntroLabel: string;
  abIntroTitle: string;
  abIntroDesc: string;
  abBadges: string[];
  abQuote: string;
  abQuoteSub: string;
  abFounded: string;
  missionLabel: string;
  missionTitle: string;
  missions: { icon: string; title: string; desc: string }[];
  presLabel: string;
  presTitle: string;
  presText: string;
  presName: string;
  bdPageLabel: string;
  bdPageTitle: string;
  bdPageDesc: string;
  bdCoreLabel: string;
  bdCoreTitle: string;
  bdSpecLabel: string;
  boardCore: { name: string; role: string; init: string }[];
  boardSpec: { name: string; role: string }[];
  bdPrinLabel: string;
  bdPrinTitle: string;
  principles: { icon: string; title: string; desc: string }[];
  evPageLabel: string;
  evPageTitle: string;
  evPageDesc: string;
  evUpLabel: string;
  evUpTitle: string;
  events: { emoji: string; tag: string; evColor: string; title: string; desc: string }[];
  evBrandLabel: string;
  evBrandTitle: string;
  evBrandDesc: string;
  evBrand: { icon: string; title: string; desc: string }[];
  mbPageLabel: string;
  mbPageTitle: string;
  mbPageDesc: string;
  mbBenLabel: string;
  mbBenTitle: string;
  benefits: string[];
  mbTypLabel: string;
  mbTypTitle: string;
  mbTypList: string; // wait, in CONTENT it's type string[] for memberTypes
  memberTypes: string[];
  mbJoinLabel: string;
  mbJoinTitle: string;
  mbJoinDesc: string;
  mbJoinBtn: string;
  ptPageLabel: string;
  ptPageTitle: string;
  ptPageDesc: string;
  ptLvlLabel: string;
  ptLvlTitle: string;
  sponsors: { cls: string; gem: string; name: string; desc: string }[];
  ptCtaTitle: string;
  ptCtaDesc: string;
  ptCtaBtn: string;
  ctPageLabel: string;
  ctPageTitle: string;
  ctPageDesc: string;
  ctInfoLabel: string;
  ctInfoTitle: string;
  contactItems: { icon: string; label: string; val: string }[];
  ctFormLabel: string;
  fLName: string;
  fLEmail: string;
  fLSubject: string;
  fLMsg: string;
  fOpt1: string;
  fOpt2: string;
  fOpt3: string;
  fOpt4: string;
  fSubmit: string;
  footerLinks: string[];
  footerCopy: string;
}

export const CONTENT: Record<string, Translation> = {
  fr: {
    nav: ["Accueil", "À propos", "Conseil", "Activités", "Adhésion", "Partenaires", "Contact"],
    heroDesc: "Organisation à but non lucratif enregistrée au Québec, l'Association de Beijing du Québec rassemble les Pékinois, favorise les échanges culturels et renforce les liens communautaires.",
    heroCta1: "Devenir membre", heroCta2: "En savoir plus",
    hStat1: "Participants", hStat2: "Événements", hStat3: "Partenaires", hStat4: "Fondée en",
    introLabel: "Qui sommes-nous", introTitle: "连接乡情，传承文化",
    introDesc: "L'Association de Beijing du Québec est une organisation à but non lucratif, dédiée à relier les Pékinois du Québec, préserver la culture et promouvoir les échanges interculturels.",
    introBtn: "En savoir plus",
    homeQuote: "联络乡情，传承文化，服务社区，促进交流",
    homeQuoteSub: "Connecter · Préserver · Servir · Promouvoir",
    homeFounded: "Fondée le 29 novembre 2013 · Montréal",
    galleryLabel: "Moments", galleryTitle: "Notre communauté en images",
    gallery: [{ tag: "Annuel", lbl: "Gala & Cérémonie" }, { tag: "Sport", lbl: "Dragon Boat" }, { tag: "Culturel", lbl: "Fête du Printemps" }, { tag: "Éducatif", lbl: "Conférences" }, { tag: "Bénévolat", lbl: "Engagement communautaire" }],
    evPreLabel: "Activités", evPreTitle: "Nos activités phares", evPreBtn: "Voir toutes les activités →",
    ctaLabel: "Rejoignez-nous", ctaTitle: "加入同乡会",
    ctaDesc: "Rejoignez une communauté dynamique et bienveillante. Ensemble, préservons notre culture et renforçons nos liens.",
    ctaBtn1: "Devenir membre", ctaBtn2: "Nous contacter",
    abPageLabel: "À propos", abPageTitle: "关于我们",
    abPageDesc: "Découvrez notre histoire, notre mission et les valeurs qui nous unissent.",
    abIntroLabel: "Notre association", abIntroTitle: "L'Association de Beijing du Québec",
    abIntroDesc: "L'Association de Beijing du Québec (QBA) is a registered non-profit in Quebec. Our mission: relier les Pékinois du Québec, préserver la culture pékinoise et promouvoir les échanges interculturels.",
    abBadges: ["À but non lucratif", "Enregistrée au Québec", "Trilingue FR · ZH · EN", "Depuis 2013"],
    abQuote: "联络乡情，传承文化，服务社区，促进交流",
    abQuoteSub: "Connecter, Préserver, Servir, Promouvoir",
    abFounded: "Fondée le 29 novembre 2013 · Montréal",
    missionLabel: "Notre mission", missionTitle: "Nos valeurs fondamentales",
    missions: [
      { icon: "community", title: "Liens communautaires", desc: "Renforcer les liens d'amitié et d'entraide entre les Pékinois résidant au Québec." },
      { icon: "heritage", title: "Héritage culturel", desc: "Préserver et promouvoir la culture pékinoise et le patrimoine culturel chinois traditionnel." },
      { icon: "exchange", title: "Échanges interculturels", desc: "Favoriser l'intégration et les échanges entre la communauté et la société québécoise." },
    ],
    presLabel: "Message de la présidente", presTitle: "会长寄语",
    presText: "Au nom du Conseil d'administration de l'Association de Beijing du Québec, je vous souhaite la bienvenue. Depuis sa fondation en 2013, notre association s'est engagée à créer un espace chaleureux pour les Pékinois du Québec — un lieu de partage, de soutien mutuel et de transmission culturelle. Ensemble, nous continuons à bâtir des ponts entre nos communautés et la société québécoise, dans un esprit d'ouverture et de collaboration.",
    presName: "李林黛 · Présidente, Association de Beijing du Québec",
    bdPageLabel: "Conseil d'administration", bdPageTitle: "理事会",
    bdPageDesc: "Notre conseil est composé de membres dévoués, engagés pour le développement de l'association.",
    bdCoreLabel: "Membres du bureau", bdCoreTitle: "Conseil exécutif",
    bdSpecLabel: "Responsables spécialisés",
    boardCore: [
      { name: "李林黛", role: "Présidente", init: "李" },
      { name: "张玲玲", role: "Présidente d'honneur", init: "张" },
      { name: "凤朝晖", role: "Présidente d'honneur", init: "凤" },
      { name: "李红娟", role: "Vice-Présidente", init: "李" },
      { name: "秦学刚", role: "Vice-Président", init: "秦" },
      { name: "Georges", role: "Secrétaire général", init: "G" },
    ],
    boardSpec: [
      { name: "于水心 & 李微", role: "Activités & Événements" },
      { name: "李婷婷 & 杨欣欣", role: "Médias & Communications" },
      { name: "李占昆", role: "West Island & Dragon Boat" },
      { name: "George & 毕桐", role: "Finance & Ressources" },
      { name: "毕桐", role: "Relations communautaires" },
      { name: "周礼", role: "Conférences & Cours" },
      { name: "张玲玲", role: "Arts & Célébrations" },
      { name: "杨霖", role: "Jeunesse & Bénévoles" },
    ],
    bdPrinLabel: "Nos principes", bdPrinTitle: "Gouvernance & valeurs",
    principles: [
      { icon: "integrity", title: "Intégrité", desc: "Agir avec transparence et responsabilité dans toutes nos décisions." },
      { icon: "collaboration", title: "Collaboration", desc: "Favoriser la coopération entre les membres et les partenaires." },
      { icon: "confidentiality", title: "Confidentialité", desc: "Respecter et protéger les informations partagées au sein de l'association." },
      { icon: "growth", title: "Développement", desc: "Soutenir la croissance personnelle et communautaire de chaque membre." },
    ],
    evPageLabel: "Activités", evPageTitle: "Activités & Programmes",
    evPageDesc: "Découvrez nos activités culturelles, éducatives, sportives et communautaires.",
    evUpLabel: "Activités régulières", evUpTitle: "Nos programmes",
    events: [
      { emoji: "celebration", tag: "Annuel", evColor: "red", title: "Cérémonie annuelle", desc: "Grande cérémonie annuelle rassemblant toute la communauté pékinoise du Québec." },
      { emoji: "culture", tag: "Culturel", evColor: "amber", title: "Fête du Printemps", desc: "Célébration du Nouvel An chinois avec dumplings, spectacles et retrouvailles." },
      { emoji: "dragon", tag: "Sportif", evColor: "teal", title: "Équipe Dragon Boat", desc: "Entraînements réguliers et compétitions pour notre équipe de dragon boat." },
      { emoji: "education", tag: "Éducatif", evColor: "blue", title: "Conférences publiques", desc: "Conférences pratiques sur l'immigration, l'emploi et la vie au Québec." },
      { emoji: "arts", tag: "Arts", evColor: "purple", title: "Fêtes culturelles", desc: "Spectacles et célébrations mettant en valeur l'art et la tradition pékinois." },
      { emoji: "volunteer", tag: "Communauté", evColor: "green", title: "Services bénévoles", desc: "Projets de bénévolat et d'entraide pour les membres et la communauté." },
    ],
    evBrandLabel: "Activités phares", evBrandTitle: "Nos événements emblématiques",
    evBrandDesc: "Des événements incontournables qui renforcent notre identité et nos liens communautaires.",
    evBrand: [
      { icon: "celebration", title: "Gala annuel", desc: "Notre grande fête annuelle" },
      { icon: "culture", title: "Festival du Printemps", desc: "Fête du Nouvel An chinois" },
      { icon: "dragon", title: "Dragon Boat", desc: "Compétitions & entraînements" },
      { icon: "education", title: "Conférences", desc: "Lectures & ateliers pratiques" },
    ],
    mbPageLabel: "Adhésion", mbPageTitle: "会员中心",
    mbPageDesc: "Rejoignez notre communauté et participez activement à la vie associative.",
    mbBenLabel: "Avantages", mbBenTitle: "Pourquoi adhérer?",
    benefits: ["Participer à toutes les activités de l'association", "Accès prioritaire et tarifs préférentiels aux événements", "Réseautage professionnel et accès aux ressources communautaires", "Droit de vote aux assemblées générales", "Accès aux informations et services communautaires"],
    mbTypLabel: "Types de membres", mbTypTitle: "Catégories d'adhésion",
    mbTypList: "", // not strictly used since memberTypes is the list
    memberTypes: ["Membre ordinaire", "Membre famille", "Membre jeunesse", "Membre d'honneur", "Membre soutien"],
    mbJoinLabel: "Rejoignez-nous", mbJoinTitle: "加入我们",
    mbJoinDesc: "L'adhésion est ouverte à toute personne de 18 ans et plus partageant nos valeurs. Contactez-nous pour les modalités.",
    mbJoinBtn: "Faire une demande d'adhésion",
    ptPageLabel: "Partenaires & Commandites", ptPageTitle: "合作与赞助",
    ptPageDesc: "Soutenez notre communauté et développez votre visibilité auprès de la communauté pékinoise du Québec.",
    ptLvlLabel: "Niveaux de commandite", ptLvlTitle: "Comment nous soutenir",
    sponsors: [
      { cls: "diamond", gem: "diamond", name: "Diamant", desc: "Visibilité maximale, présence à tous les événements annuels" },
      { cls: "gold-tier", gem: "trophy", name: "Or", desc: "Présence de marque aux événements phares de l'année" },
      { cls: "silver", gem: "medal", name: "Argent", desc: "Reconnaissance lors des activités culturelles et communautaires" },
      { cls: "community", gem: "star", name: "Soutien communautaire", desc: "Participation aux projets de proximité et bénévolat" },
    ],
    ptCtaTitle: "Intéressé par un partenariat?",
    ptCtaDesc: "Contactez-nous pour discuter d'une collaboration adaptée à vos objectifs.",
    ptCtaBtn: "Nous contacter",
    ctPageLabel: "Contact", ctPageTitle: "联系我们",
    ctPageDesc: "Nous sommes là pour répondre à toutes vos questions.",
    ctInfoLabel: "Coordonnées", ctInfoTitle: "Contactez-nous",
    contactItems: [
      { icon: "email", label: "Courriel", val: "aqcbeijing@gmail.com" },
      { icon: "phone", label: "Téléphone", val: "514-566-6826" },
      { icon: "chat", label: "WeChat", val: "orgManager" },
      { icon: "location", label: "Location", val: "Montréal, Québec, Canada" },
    ],
    ctFormLabel: "Envoyez-nous un message",
    fLName: "Nom", fLEmail: "Courriel", fLSubject: "Objet", fLMsg: "Message",
    fOpt1: "Adhésion", fOpt2: "Activités", fOpt3: "Partenariat", fOpt4: "Autre",
    fSubmit: "Envoyer",
    footerLinks: ["Accueil", "À propos", "Activités", "Adhésion", "Contact"],
    footerCopy: "© 2026 L'Association de Beijing du Québec · Tous droits réservés",
  },
  zh: {
    nav: ["首页", "关于我们", "理事会", "活动", "会员", "合作", "联系"],
    heroDesc: "魁北克北京同乡会是在魁北克省依法注册的非营利组织，致力于联络乡情、传承文化、服务社区、促进交流。",
    heroCta1: "加入我们", heroCta2: "了解更多",
    hStat1: "活动参与人次", hStat2: "已举办活动", hStat3: "合作伙伴", hStat4: "成立于",
    introLabel: "关于我们", introTitle: "连接乡情，传承文化",
    introDesc: "魁北克北京同乡会（QBA）是在魁北克省依法注册的非营利组织，以联络乡情、传承文化、服务社区、促进交流为宗旨，团结在魁北克生活、工作和学习的北京乡亲。",
    introBtn: "了解更多",
    homeQuote: "联络乡情，传承文化，服务社区，促进交流",
    homeQuoteSub: "Connecter · Préserver · Servir · Promouvoir",
    homeFounded: "成立于2013年11月29日 · 蒙特利尔",
    galleryLabel: "精彩瞬间", galleryTitle: "社区活动剪影",
    gallery: [{ tag: "年度活动", lbl: "年度庆典" }, { tag: "体育", lbl: "龙舟竞渡" }, { tag: "文化", lbl: "迎春活动" }, { tag: "教育", lbl: "公益讲座" }, { tag: "志愿者", lbl: "志愿服务" }],
    evPreLabel: "活动", evPreTitle: "代表性活动", evPreBtn: "查看全部活动 →",
    ctaLabel: "加入我们", ctaTitle: "欢迎加入同乡会",
    ctaDesc: "加入一个充满活力、互助友爱的大家庭，一起传承文化、共建社区。",
    ctaBtn1: "立即申请入会", ctaBtn2: "联系我们",
    abPageLabel: "关于我们", abPageTitle: "协会简介",
    abPageDesc: "了解我们的历史、使命和凝聚我们的核心价值观。",
    abIntroLabel: "协会简介", abIntroTitle: "魁北克北京同乡会",
    abIntroDesc: "魁北克北京同乡会（QBA）是在魁北克省依法注册的非营利组织，以联络乡情、传承文化、服务社区、促进交流为宗旨，团结在魁北克省生活、工作和学习的北京乡亲，并欢迎认同北京文化与中华优秀传统文化价值的社会各界人士参与。",
    abBadges: ["非营利组织", "魁北克省注册", "三语服务 法·中·英", "成立于2013年"],
    abQuote: "联络乡情，传承文化，服务社区，促进交流",
    abQuoteSub: "Connecter · Préserver · Servir · Promouvoir",
    abFounded: "成立于2013年11月29日 · 蒙特利尔",
    missionLabel: "宗旨与使命", missionTitle: "我们的核心价值",
    missions: [
      { icon: "community", title: "联络乡情", desc: "加强北京乡亲之间的联系与互助，构建温暖的社区归属感。" },
      { icon: "heritage", title: "传承文化", desc: "传承和弘扬北京及中华优秀传统文化，举办文化庆典与教育活动。" },
      { icon: "exchange", title: "促进交流", desc: "推动华人社群与魁北克主流社会的交流与融合，搭建跨领域合作平台。" },
    ],
    presLabel: "会长寄语", presTitle: "会长寄语",
    presText: "在魁北克北京同乡会理事会的名义下，我向大家致以诚挚的欢迎。自2013年成立以来，同乡会始终致力于为在魁北克的北京乡亲打造一个温暖的家园——一个分享、互助和文化传承的空间。我们共同努力，在开放与合作的精神下，在华人社区与魁北克社会之间架起沟通的桥梁。",
    presName: "李林黛 · 魁北克北京同乡会会长",
    bdPageLabel: "理事会", bdPageTitle: "理事会成员",
    bdPageDesc: "理事会由致力于协会发展的核心成员组成，共同推动协会各项工作。",
    bdCoreLabel: "核心理事会", bdCoreTitle: "执行理事会",
    bdSpecLabel: "专项负责人",
    boardCore: [
      { name: "李林黛", role: "会长", init: "李" },
      { name: "张玲玲", role: "名誉会长", init: "张" },
      { name: "凤朝晖", role: "名誉会长", init: "凤" },
      { name: "李红娟", role: "副会长", init: "李" },
      { name: "秦学刚", role: "副会长", init: "秦" },
      { name: "Georges", role: "秘书长", init: "G" },
    ],
    boardSpec: [
      { name: "于水心 & 李微", role: "活动策划与执行" },
      { name: "李婷婷 & 杨欣欣", role: "宣传与媒体" },
      { name: "李占昆", role: "西岛分部·龙舟队" },
      { name: "George & 毕桐", role: "财务与资源筹备" },
      { name: "毕桐", role: "社区联络" },
      { name: "周礼", role: "讲座与课程组" },
      { name: "张玲玲", role: "文艺与庆典策划" },
      { name: "杨霖", role: "青年部·志愿者" },
    ],
    bdPrinLabel: "治理原则", bdPrinTitle: "理事会核心原则",
    principles: [
      { icon: "integrity", title: "诚信负责", desc: "在所有决策中保持透明度和责任感。" },
      { icon: "collaboration", title: "协作共赢", desc: "促进成员和合作伙伴之间的协作与合作。" },
      { icon: "confidentiality", title: "保密义务", desc: "尊重和保护协会内部共享的信息。" },
      { icon: "growth", title: "持续发展", desc: "支持每位成员的个人成长与社区发展。" },
    ],
    evPageLabel: "活动资讯", evPageTitle: "活动与项目",
    evPageDesc: "探索我们的文化、教育、体育和社区活动。",
    evUpLabel: "常规活动", evUpTitle: "我们的活动项目",
    events: [
      { emoji: "celebration", tag: "年度活动", evColor: "red", title: "周年庆典", desc: "年度大型庆典，汇聚乡亲，共叙情谊，回顾过去，展望未来。" },
      { emoji: "culture", tag: "文化活动", evColor: "amber", title: "迎春活动", desc: "春节庆典活动，包括包饺子、文艺演出、抽奖联欢等传统节目。" },
      { emoji: "dragon", tag: "体育活动", evColor: "teal", title: "龙舟队", desc: "龙舟队定期训练与参赛，展示华人社区体育精神与团队力量。" },
      { emoji: "education", tag: "教育讲座", evColor: "blue", title: "公益讲座", desc: "涵盖移民政策、就业创业、子女教育等实用主题的公益讲座。" },
      { emoji: "arts", tag: "文化庆典", evColor: "purple", title: "文化庆典活动", desc: "传承北京文化与中华传统，举办各类文化表演与社区联谊活动。" },
      { emoji: "volunteer", tag: "志愿者", evColor: "green", title: "志愿者服务", desc: "组织青年志愿者项目，服务社区，培育新一代华人社区力量。" },
    ],
    evBrandLabel: "品牌活动", evBrandTitle: "标志性年度活动",
    evBrandDesc: "凝聚我们身份认同与社区纽带的重要活动。",
    evBrand: [
      { icon: "celebration", title: "年度庆典", desc: "盛大年度聚会" },
      { icon: "culture", title: "迎春嘉年华", desc: "春节庆典活动" },
      { icon: "dragon", title: "龙舟队", desc: "训练与竞赛" },
      { icon: "education", title: "公益讲座", desc: "讲座与实用课程" },
    ],
    mbPageLabel: "会员中心", mbPageTitle: "加入同乡会",
    mbPageDesc: "加入我们的社区，积极参与协会活动。",
    mbBenLabel: "会员权益", mbBenTitle: "为什么加入我们？",
    benefits: ["参与协会举办的各类活动", "享有活动优先报名权及优惠", "职业网络与社区资源获取渠道", "参加会员大会，享有建议和表决权", "获得社区信息与服务支持"],
    mbTypLabel: "会员类别", mbTypTitle: "会员分类",
    mbTypList: "",
    memberTypes: ["普通会员", "家庭会员", "青年会员", "荣誉会员", "支持会员"],
    mbJoinLabel: "加入我们", mbJoinTitle: "立即申请入会",
    mbJoinDesc: "凡年满十八周岁、认同协会宗旨、愿意遵守章程者，均可申请入会。欢迎联系我们了解会费与申请流程。",
    mbJoinBtn: "申请入会",
    ptPageLabel: "合作与赞助", ptPageTitle: "支持同乡会",
    ptPageDesc: "支持我们的社区，提升您在魁北克北京社区的知名度。",
    ptLvlLabel: "赞助级别", ptLvlTitle: "如何支持我们",
    sponsors: [
      { cls: "diamond", gem: "diamond", name: "钻石赞助商", desc: "全年活动最高曝光度，一对一合作定制方案" },
      { cls: "gold-tier", gem: "trophy", name: "金牌赞助商", desc: "主要年度活动品牌展示与推广权益" },
      { cls: "silver", gem: "medal", name: "银牌赞助商", desc: "文化与社区活动的品牌联合展示" },
      { cls: "community", gem: "star", name: "社区支持者", desc: "以资源、服务或志愿方式支持社区项目" },
    ],
    ptCtaTitle: "有意合作？",
    ptCtaDesc: "请联系我们，共同探讨适合您目标的合作方式。",
    ptCtaBtn: "联系我们",
    ctPageLabel: "联系我们", ctPageTitle: "联系同乡会",
    ctPageDesc: "我们随时为您解答问题。",
    ctInfoLabel: "联系方式", ctInfoTitle: "联系我们",
    contactItems: [
      { icon: "email", label: "电子邮件", val: "aqcbeijing@gmail.com" },
      { icon: "phone", label: "电话", val: "514-566-6826" },
      { icon: "chat", label: "微信", val: "orgManager" },
      { icon: "location", label: "城市", val: "蒙特利尔，魁北克，加拿大" },
    ],
    ctFormLabel: "发送消息",
    fLName: "姓名", fLEmail: "电子邮件", fLSubject: "主题", fLMsg: "留言",
    fOpt1: "入会申请", fOpt2: "活动咨询", fOpt3: "合作洽谈", fOpt4: "其他",
    fSubmit: "发送消息",
    footerLinks: ["首页", "关于我们", "活动", "会员", "联系"],
    footerCopy: "© 2026 魁北克北京同乡会 · 版权所有",
  },
  en: {
    nav: ["Home", "About", "Board", "Events", "Membership", "Partners", "Contact"],
    heroDesc: "The Quebec Beijing Association (QBA) is a registered non-profit in Quebec, dedicated to connecting Beijing natives, preserving culture, and promoting cross-cultural exchange.",
    heroCta1: "Become a Member", heroCta2: "Learn More",
    hStat1: "Event Participants", hStat2: "Events Organized", hStat3: "Partners", hStat4: "Founded in",
    introLabel: "About Us", introTitle: "连接乡情，传承文化",
    introDesc: "The Quebec Beijing Association (QBA) is a non-profit dedicated to connecting Beijing natives in Quebec, preserving culture, and promoting exchanges between the Chinese community and Quebec society.",
    introBtn: "Learn More",
    homeQuote: "联络乡情，传承文化，服务社区，促进交流",
    homeQuoteSub: "Connect · Preserve · Serve · Promote",
    homeFounded: "Founded November 29, 2013 · Montréal",
    galleryLabel: "Moments", galleryTitle: "Our Community in Pictures",
    gallery: [{ tag: "Annual", lbl: "Gala & Ceremony" }, { tag: "Sports", lbl: "Dragon Boat" }, { tag: "Cultural", lbl: "Spring Festival" }, { tag: "Education", lbl: "Public Lectures" }, { tag: "Volunteer", lbl: "Community Service" }],
    evPreLabel: "Events", evPreTitle: "Featured Activities", evPreBtn: "See all events →",
    ctaLabel: "Join Us", ctaTitle: "欢迎加入",
    ctaDesc: "Join a vibrant, supportive community. Together we preserve our culture and strengthen our bonds.",
    ctaBtn1: "Become a Member", ctaBtn2: "Contact Us",
    abPageLabel: "About", abPageTitle: "About QBA",
    abPageDesc: "Discover our history, mission, and the values that unite us.",
    abIntroLabel: "Our Association", abIntroTitle: "Quebec Beijing Association",
    abIntroDesc: "The Quebec Beijing Association (QBA) is a registered non-profit in Quebec. Our mission is to connect Beijing natives, preserve Beijing culture, and promote cross-cultural exchanges between the Chinese community and Quebec society.",
    abBadges: ["Non-Profit Organization", "Registered in Quebec", "Trilingual FR · ZH · EN", "Est. 2013"],
    abQuote: "联络乡情，传承文化，服务社区，促进交流",
    abQuoteSub: "Connect · Preserve · Serve · Promote",
    abFounded: "Founded November 29, 2013 · Montréal",
    missionLabel: "Mission", missionTitle: "Our Core Values",
    missions: [
      { icon: "community", title: "Community Bonds", desc: "Strengthen friendship and mutual support among Beijing natives living in Quebec." },
      { icon: "heritage", title: "Cultural Heritage", desc: "Preserve and promote Beijing culture and Chinese traditional heritage through events and education." },
      { icon: "exchange", title: "Cultural Exchange", desc: "Bridge the Chinese community and Quebec society through meaningful partnerships." },
    ],
    presLabel: "President's Message", presTitle: "会长寄语",
    presText: "On behalf of the Board of Directors of the Quebec Beijing Association, I warmly welcome you. Since our founding in 2013, QBA has been committed to creating a warm home for Beijing natives in Quebec — a space for sharing, mutual support, and cultural transmission. Together, we continue to build bridges between our communities and Quebec society, in a spirit of openness and collaboration.",
    presName: "李林黛 (Linda Li) · President, Quebec Beijing Association",
    bdPageLabel: "Board", bdPageTitle: "Board of Directors",
    bdPageDesc: "Our board is composed of dedicated members committed to the development of the association.",
    bdCoreLabel: "Executive Board", bdCoreTitle: "Core Leadership",
    bdSpecLabel: "Committee Leads",
    boardCore: [
      { name: "李林黛", role: "President", init: "李" },
      { name: "张玲玲", role: "Honorary President", init: "张" },
      { name: "凤朝晖", role: "Honorary President", init: "凤" },
      { name: "李红娟", role: "Vice President", init: "李" },
      { name: "秦学刚", role: "Vice President", init: "秦" },
      { name: "Georges", role: "Secretary General", init: "G" },
    ],
    boardSpec: [
      { name: "于水心 & 李微", role: "Events & Programming" },
      { name: "李婷婷 & 杨欣欣", role: "Media & Communications" },
      { name: "李占昆", role: "West Island & Dragon Boat" },
      { name: "George & 毕桐", role: "Finance & Resources" },
      { name: "毕桐", role: "Community Relations" },
      { name: "周礼", role: "Talks & Courses" },
      { name: "张玲玲", role: "Arts & Celebrations" },
      { name: "杨霖", role: "Youth & Volunteers" },
    ],
    bdPrinLabel: "Principles", bdPrinTitle: "Governance & Values",
    principles: [
      { icon: "integrity", title: "Integrity", desc: "Acting with transparency and accountability in all our decisions." },
      { icon: "collaboration", title: "Collaboration", desc: "Fostering cooperation between members and partners." },
      { icon: "confidentiality", title: "Confidentiality", desc: "Respecting and protecting information shared within the association." },
      { icon: "growth", title: "Growth", desc: "Supporting personal and community development for every member." },
    ],
    evPageLabel: "Events", evPageTitle: "Events & Programs",
    evPageDesc: "Explore our cultural, educational, sports, and community activities.",
    evUpLabel: "Regular Programs", evUpTitle: "Our Activities",
    events: [
      { emoji: "celebration", tag: "Annual", evColor: "red", title: "Annual Gala", desc: "Grand annual ceremony bringing together the entire Beijing community of Quebec." },
      { emoji: "culture", tag: "Cultural", evColor: "amber", title: "Spring Festival", desc: "Chinese New Year celebration featuring dumplings, performances, and gatherings." },
      { emoji: "dragon", tag: "Sports", evColor: "teal", title: "Dragon Boat Team", desc: "Regular training sessions and competitions for our Dragon Boat team." },
      { emoji: "education", tag: "Education", evColor: "blue", title: "Public Lectures", desc: "Practical talks on immigration, employment, entrepreneurship, and life in Quebec." },
      { emoji: "arts", tag: "Arts", evColor: "purple", title: "Cultural Festivals", desc: "Performances and celebrations showcasing Beijing arts and Chinese traditions." },
      { emoji: "volunteer", tag: "Community", evColor: "green", title: "Volunteer Services", desc: "Youth volunteer programs and community support initiatives." },
    ],
    evBrandLabel: "Signature Events", evBrandTitle: "Our Flagship Programs",
    evBrandDesc: "Landmark events that strengthen our identity and community bonds.",
    evBrand: [
      { icon: "celebration", title: "Annual Gala", desc: "Grand annual celebration" },
      { icon: "culture", title: "Spring Festival", desc: "Chinese New Year" },
      { icon: "dragon", title: "Dragon Boat", desc: "Training & competitions" },
      { icon: "education", title: "Public Lectures", desc: "Talks & workshops" },
    ],
    mbPageLabel: "Membership", mbPageTitle: "Join QBA",
    mbPageDesc: "Join our community and actively participate in association life.",
    mbBenLabel: "Benefits", mbBenTitle: "Why Join Us?",
    benefits: ["Participate in all association events", "Priority registration and member discounts", "Professional networking and community resources", "Voting rights at General Assemblies", "Access to community information and services"],
    mbTypLabel: "Member Types", mbTypTitle: "Membership Categories",
    mbTypList: "",
    memberTypes: ["Regular Member", "Family Member", "Youth Member", "Honorary Member", "Supporting Member"],
    mbJoinLabel: "Join Us", mbJoinTitle: "Apply for Membership",
    mbJoinDesc: "Membership is open to all persons 18 years and older who share our values. Contact us for information on fees and process.",
    mbJoinBtn: "Apply for Membership",
    ptPageLabel: "Partners & Sponsorship", ptPageTitle: "Support QBA",
    ptPageDesc: "Support our community and grow your visibility with Quebec's Beijing community.",
    ptLvlLabel: "Sponsorship Levels", ptLvlTitle: "How to Support Us",
    sponsors: [
      { cls: "diamond", gem: "diamond", name: "Diamond", desc: "Maximum visibility, presence at all annual events with customized partnership" },
      { cls: "gold-tier", gem: "trophy", name: "Gold", desc: "Brand presence at flagship annual events and major gatherings" },
      { cls: "silver", gem: "medal", name: "Silver", desc: "Brand recognition at cultural and community activities" },
      { cls: "community", gem: "star", name: "Community Supporter", desc: "Support through resources, services, or volunteer engagement" },
    ],
    ptCtaTitle: "Interested in partnering?",
    ptCtaDesc: "Contact us to discuss a collaboration tailored to your objectives.",
    ptCtaBtn: "Contact Us",
    ctPageLabel: "Contact", ctPageTitle: "Contact Us",
    ctPageDesc: "We are here to answer all your questions.",
    ctInfoLabel: "Contact Info", ctInfoTitle: "Get in Touch",
    contactItems: [
      { icon: "email", label: "Email", val: "aqcbeijing@gmail.com" },
      { icon: "phone", label: "Phone", val: "514-566-6826" },
      { icon: "chat", label: "WeChat", val: "orgManager" },
      { icon: "location", label: "City", val: "Montréal, Québec, Canada" },
    ],
    ctFormLabel: "Send us a message",
    fLName: "Full Name", fLEmail: "Email", fLSubject: "Subject", fLMsg: "Message",
    fOpt1: "Membership", fOpt2: "Events", fOpt3: "Partnership", fOpt4: "Other",
    fSubmit: "Send Message",
    footerLinks: ["Home", "About", "Events", "Membership", "Contact"],
    footerCopy: "© 2026 Quebec Beijing Association · All rights reserved",
  },
};
