import { type SkillsShowcaseProps } from "@/components/skills/skills-showcase";
import {
  FaCogs,
  FaUsers,
  FaChartLine,
  FaRobot,
  FaAward,
  FaSearch,
  FaProjectDiagram,
  FaLightbulb,
} from "react-icons/fa";
import { SiGoogleanalytics, SiSap } from "react-icons/si";
import { MdOutlineLeaderboard, MdOutlineManageAccounts } from "react-icons/md";

import { type Locale } from "@/utility/translations";

export const SKILLS_DATA: Record<Locale, SkillsShowcaseProps["skills"]> = {
  en: [
    {
      sectionName: "Top Skills & Expertise",
      skills: [
        {
          name: "Operations Management",
          icon: FaCogs,
        },
        {
          name: "Project Management",
          icon: FaProjectDiagram,
        },
        {
          name: "Workforce Management",
          icon: FaUsers,
        },
        {
          name: "Team Leadership",
          icon: MdOutlineLeaderboard,
        },
        {
          name: "Strategic Planning",
          icon: FaChartLine,
        },
      ],
    },
    {
      sectionName: "Certifications",
      skills: [
        {
          name: "PMP Practice Exam (PMI)",
          icon: FaAward,
        },
        {
          name: "SAP Ariba Collaboration",
          icon: SiSap,
        },
        {
          name: "SAP ERP Essential Training",
          icon: SiSap,
        },
        {
          name: "Operations Management Foundations",
          icon: FaCogs,
        },
        {
          name: "Google Analytics Certification",
          icon: SiGoogleanalytics,
        },
        {
          name: "Google Ads for Beginners",
          icon: FaSearch,
        },
        {
          name: "AI for Leadership (LinkedIn)",
          icon: FaRobot,
        },
        {
          name: "What Is Generative AI?",
          icon: FaRobot,
        },
        {
          name: "Supporting Belonging (Open University)",
          icon: FaAward,
        },
      ],
    },
  ],
  ar: [
    {
      sectionName: "أبرز المهارات والخبرات",
      skills: [
        {
          name: "إدارة العمليات",
          icon: FaCogs,
        },
        {
          name: "إدارة المشاريع",
          icon: FaProjectDiagram,
        },
        {
          name: "إدارة القوى العاملة",
          icon: FaUsers,
        },
        {
          name: "قيادة الفرق",
          icon: MdOutlineLeaderboard,
        },
        {
          name: "التخطيط الاستراتيجي",
          icon: FaChartLine,
        },
      ],
    },
    {
      sectionName: "الشهادات",
      skills: [
        {
          name: "اختبار PMP التجريبي (PMI)",
          icon: FaAward,
        },
        {
          name: "تعاون سلاسل الإمداد SAP Ariba",
          icon: SiSap,
        },
        {
          name: "التدريب الأساسي لنظام SAP ERP",
          icon: SiSap,
        },
        {
          name: "أساسيات إدارة العمليات",
          icon: FaCogs,
        },
        {
          name: "شهادة تحليلات جوجل",
          icon: SiGoogleanalytics,
        },
        {
          name: "إعلانات جوجل للمبتدئين",
          icon: FaSearch,
        },
        {
          name: "الذكاء الاصطناعي للقيادة (LinkedIn)",
          icon: FaRobot,
        },
        {
          name: "ما هو الذكاء الاصطناعي التوليدي؟",
          icon: FaRobot,
        },
        {
          name: "دعم الانتماء (الجامعة المفتوحة)",
          icon: FaAward,
        },
      ],
    },
  ],
};
