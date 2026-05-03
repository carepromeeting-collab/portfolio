import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Trophy, Globe } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/router";
import { translations, Locale } from "@/utility/translations";

const HIGHLIGHTS_DATA = {
  en: {
    coreCompetencies: [
      "Workforce & Project Management",
      "HR & Employee Relations",
      "Facility & Accommodation Planning",
      "Transportation Logistics",
      "Strategic Planning & Execution",
      "Payroll & Compliance Oversight",
      "Talent Acquisition & Onboarding",
      "Training & Development Programs",
      "KPI Monitoring & Reporting",
      "SmartSheet & Systems Integration",
    ],
    achievements: [
      "Author of “Sand & Silence — A Migrant’s Truth Beneath the Golden Kingdom”.",
      "Digitized project tracking operations to improve visibility and accountability.",
      "Delivered training programs for 300+ employees focused on communication and workplace ethics.",
    ],
    websites: [
      {
        name: "Hijri to Gregorian Converter",
        url: "https://calender.linux-aios.com/",
      },
      {
        name: "Job Applying Website",
        url: "https://job.linux-aios.com/",
      },
      {
        name: "Job Report System",
        url: "http://jobreport.linux-aios.com/",
      },
      {
        name: "AI CV Maker",
        url: "https://cv.linux-aios.com",
      },
      {
        name: "Faizan AI Chat Bot",
        url: "https://faizanai.linux-aios.com",
      },
      {
        name: "Zip Code Finder",
        url: "https://zipcode.linux-aios.com",
      },
      {
        name: "Forex Signals",
        url: "https://faizandgreate-lang.github.io/trade/#signals",
      },
      {
        name: "AI Trading Platform",
        url: "https://aitrade.linux-aios.com",
      },
      {
        name: "Workflok Platform",
        url: "https://workflok.linux-aios.com",
      },
    ],
  },
  ar: {
    coreCompetencies: [
      "إدارة القوى العاملة والمشاريع",
      "الموارد البشرية وعلاقات الموظفين",
      "تخطيط المرافق والإسكان",
      "لوجستيات النقل",
      "التخطيط الاستراتيجي والتنفيذ",
      "الرقابة على الرواتب والامتثال",
      "استقطاب المواهب والتوجيه",
      "برامج التدريب والتطوير",
      "مراقبة مؤشرات الأداء والتقارير",
      "تكامل الأنظمة و SmartSheet",
    ],
    achievements: [
      "مؤلف كتاب “الرمل والصمت — حقيقة المهاجر تحت المملكة الذهبية”.",
      "رقمنة عمليات تتبع المشاريع لتحسين الرؤية والمساءلة.",
      "تقديم برامج تدريبية لأكثر من ٣٠٠ موظف تركز على التواصل وأخلاقيات العمل.",
    ],
    websites: [
      {
        name: "محول التاريخ الهجري إلى ميلادي",
        url: "https://calender.linux-aios.com/",
      },
      {
        name: "موقع التقديم على الوظائف",
        url: "https://job.linux-aios.com/",
      },
      {
        name: "نظام تقارير الوظائف",
        url: "http://jobreport.linux-aios.com/",
      },
      {
        name: "صانع السير الذاتية بالذكاء الاصطناعي",
        url: "https://cv.linux-aios.com",
      },
      {
        name: "فيضان AI بوت الدردشة",
        url: "https://faizanai.linux-aios.com",
      },
      {
        name: "مكتشف الرمز البريدي",
        url: "https://zipcode.linux-aios.com",
      },
      {
        name: "إشارات الفوركس",
        url: "https://faizandgreate-lang.github.io/trade/#signals",
      },
      {
        name: "منصة التداول بالذكاء الاصطناعي",
        url: "https://aitrade.linux-aios.com",
      },
      {
        name: "منصة ورك فلوك",
        url: "https://workflok.linux-aios.com",
      },
    ],
  },
};

export default function HomeHighlights({ data }: { data: any }) {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = translations[locale].highlights;
  
  const displayData = data || HIGHLIGHTS_DATA[locale];

  return (
    <section className="mx-auto mb-40 mt-12 w-full px-6 sm:px-14 md:px-20 lg:max-w-7xl">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        {/* Core Competencies */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-accent" />
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t.coreCompetencies}
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {displayData.coreCompetencies.map((comp: string, idx: number) => (
              <li
                key={idx}
                className="flex items-start gap-2 rounded-lg border border-accent/20 bg-background p-3 shadow-sm dark:bg-zinc-800/80"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-sm font-medium text-foreground">
                  {comp}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notable Achievements */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-accent" />
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t.notableAchievements}
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {displayData.achievements.map((achieve: string, idx: number) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-lg border-l-4 border-accent bg-accent/5 p-4"
              >
                <span className="text-base font-medium text-foreground">
                  {achieve}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Websites */}
      <div className="mt-20">
        <div className="mb-6 flex items-center gap-3">
          <Globe className="h-8 w-8 text-accent" />
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t.websitesAndProjects}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayData.websites.map((site: any, idx: number) => (
            <a
              key={idx}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-lg border border-accent/20 bg-background p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-zinc-800"
            >
              <div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-accent">
                  {site.name}
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-accent">
                <span>{t.visitSite}</span>
                <FiExternalLink className="h-3 w-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
