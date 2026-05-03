import { type ProjectCardProps } from "@/components/projects/project-card";
import { type ProjectShowcaseListItem } from "@/components/projects/project-showcase-list";
import { siteMetadata } from "@/data/siteMetaData.mjs";

import { type Locale } from "@/utility/translations";

export const PROJECT_SHOWCASE: Record<Locale, ProjectShowcaseListItem[]> = {
  en: [
    {
      index: 0,
      title: "Corporate & Hospitality Manpower Supply",
      href: "/projects",
      tags: ["Hilton", "Shangri-La", "Corporate Offices", "Coffee Shops"],
      image: {
        LIGHT: "/images/projects/f1_event_workforce.png",
        DARK: "/images/projects/f1_event_workforce.png",
      },
    },
    {
      index: 1,
      title: "FIFA Club World Cup Jeddah",
      href: "/projects",
      tags: ["Event Management", "Manpower Services", "Operations"],
      image: {
        LIGHT: "/images/projects/fifa_event_workforce.png",
        DARK: "/images/projects/fifa_event_workforce.png",
      },
    },
    {
      index: 2,
      title: "Healthcare Sector Workforce Logistics",
      href: "/projects",
      tags: ["Healthcare", "Facility Management", "Compliance", "Safety"],
      image: {
        LIGHT: "/images/projects/healthcare_workforce.png",
        DARK: "/images/projects/healthcare_workforce.png",
      },
    },
    {
      index: 3,
      title: "Mass Transportation & Housing Operations",
      href: "/projects",
      tags: [
        "Logistics",
        "Accommodation Planning",
        "Transportation",
        "Punctuality",
      ],
      image: {
        LIGHT: "/images/projects/logistics_transportation.png",
        DARK: "/images/projects/logistics_transportation.png",
      },
    },
  ],
  ar: [
    {
      index: 0,
      title: "توفير القوى العاملة للشركات والضيافة",
      href: "/projects",
      tags: ["هيلتون", "شانغريلا", "مكاتب الشركات", "مقاهي"],
      image: {
        LIGHT: "/images/projects/f1_event_workforce.png",
        DARK: "/images/projects/f1_event_workforce.png",
      },
    },
    {
      index: 1,
      title: "كأس العالم للأندية FIFA جدة",
      href: "/projects",
      tags: ["إدارة الفعاليات", "خدمات القوى العاملة", "عمليات"],
      image: {
        LIGHT: "/images/projects/fifa_event_workforce.png",
        DARK: "/images/projects/fifa_event_workforce.png",
      },
    },
    {
      index: 2,
      title: "اللوجستيات للقوى العاملة في القطاع الصحي",
      href: "/projects",
      tags: ["رعاية صحية", "إدارة المرافق", "الامتثال", "السلامة"],
      image: {
        LIGHT: "/images/projects/healthcare_workforce.png",
        DARK: "/images/projects/healthcare_workforce.png",
      },
    },
    {
      index: 3,
      title: "عمليات النقل الجماعي والإسكان",
      href: "/projects",
      tags: ["لوجستيات", "تخطيط الإسكان", "النقل", "الالتزام بالمواعيد"],
      image: {
        LIGHT: "/images/projects/logistics_transportation.png",
        DARK: "/images/projects/logistics_transportation.png",
      },
    },
  ],
};

export const PROJECTS_CARD: Record<Locale, ProjectCardProps[]> = {
  en: [
    {
      name: "Corporate & Hospitality Sectors",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/f1_event_workforce.png"],
      description:
        "Successfully providing dedicated manpower services across high-end corporate offices, Hilton, Shangri-La, artisan coffee shops, and Gumbari. We orchestrated wide-scale strategic staffing by bringing in premier manpower through trusted partnerships with IRC, Esad, Mahra, Jawahar, Evan, Riyadity, and CARE-PRO.",
    },
    {
      name: "FIFA Club World Cup Jeddah",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/fifa_event_workforce.png"],
      description:
        "Directed end-to-end workforce operations for the prestigious FIFA Club World Cup in Jeddah. Successfully provided and arranged specialized manpower services to ensure zero interruptions. Led multicultural teams through seamless planning and rigorous deployment schedules in an incredibly dynamic global football event.",
    },
    {
      name: "Healthcare Sector Operations",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/healthcare_workforce.png"],
      description:
        "Provided highly specialized workforce solutions and facility management support across major healthcare centers. Successfully coordinated strict compliance, safety protocols, and daily logistical operations for hundreds of skilled and semi-skilled hospital staff to ensure uninterrupted patient care ecosystems.",
    },
    {
      name: "Mass Transportation Logistics",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/logistics_transportation.png"],
      description:
        "Engineered seamless transportation ecosystems and supervised critical housing arrangements for a massive workforce of 1,500+ employees across 40+ active daily sites. Focused on precision punctuality, strict safety compliance, and robust employee well-being standards.",
    },
  ],
  ar: [
    {
      name: "قطاعات الشركات والضيافة",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/f1_event_workforce.png"],
      description:
        "توفير خدمات القوى العاملة المتخصصة بنجاح عبر مكاتب الشركات الراقية، وهيلتون، وشانغريلا، والمقاهي الحرفية، وغمباري. قمنا بتنسيق التوظيف الاستراتيجي على نطاق واسع من خلال جلب قوى عاملة متميزة عبر شراكات موثوقة مع IRC، وإسناد، ومهارة، وجواهر، وإيفان، ورياديتي، وكير-برو.",
    },
    {
      name: "كأس العالم للأندية FIFA جدة",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/fifa_event_workforce.png"],
      description:
        "توجيه عمليات القوى العاملة من الألف إلى الياء لبطولة كأس العالم للأندية المرموقة في جدة. تقديم وترتيب خدمات القوى العاملة المتخصصة بنجاح لضمان عدم وجود أي انقطاع. قيادة فرق متعددة الثقافات عبر تخطيط سلس وجداول انتشار صارمة في حدث كروي عالمي ديناميكي للغاية.",
    },
    {
      name: "عمليات قطاع الرعاية الصحية",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/healthcare_workforce.png"],
      description:
        "توفير حلول قوى عاملة عالية التخصص ودعم إدارة المرافق عبر المراكز الصحية الكبرى. تنسيق صارم للامتثال، وبروتوكولات السلامة، والعمليات اللوجستية اليومية لمئات من موظفي المستشفيات المهرة وشبه المهرة لضمان أنظمة رعاية مرضى مستمرة.",
    },
    {
      name: "لوجستيات النقل الجماعي",
      favicon: "/images/logo.png",
      imageUrl: ["/images/projects/logistics_transportation.png"],
      description:
        "هندسة أنظمة نقل سلسة والإشراف على ترتيبات الإسكان الحيوية لقوة عاملة ضخمة تزيد عن ١٥٠٠ موظف عبر أكثر من ٤٠ موقعاً نشطاً يومياً. التركيز على دقة المواعيد المتقنة، والامتثال الصارم للسلامة، ومعايير رفاهية الموظفين القوية.",
    },
  ],
};
