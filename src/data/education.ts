import { type ExperienceShowcaseListItemProps } from "@/components/experience/experience-showcase-list-item";

import { type Locale } from "@/utility/translations";

export const EDUCATION: Record<Locale, ExperienceShowcaseListItemProps[]> = {
  en: [
    {
      title: "Bachelor of Commerce - BCom, Accounting",
      organisation: {
        name: "University of Lucknow",
        href: "https://www.lkouniv.ac.in/",
      },
      date: "2014-2016",
      location: "Lucknow",
      description:
        "Completed Bachelor of Commerce degree with a focus on Accounting.",
    },
    {
      title: "Hardware Intensive Program",
      organisation: {
        name: "UPTEC Computer Consultancy Ltd.",
        href: "https://www.uptecnet.com/",
      },
      date: "2013-2013",
      location: "Lucknow",
      description:
        "Completed comprehensive training in computer hardware components, assembly, software installation, networking fundamentals, and troubleshooting techniques.",
    },
  ],
  ar: [
    {
      title: "بكالوريوس التجارة - المحاسبة",
      organisation: {
        name: "جامعة لكناو",
        href: "https://www.lkouniv.ac.in/",
      },
      date: "٢٠١٤ - ٢٠١٦",
      location: "لكناو",
      description: "إكمال درجة بكالوريوس التجارة مع التركيز على المحاسبة.",
    },
    {
      title: "برنامج مكثف في الأجهزة (Hardware)",
      organisation: {
        name: "شركة UPTEC المحدودة للاستشارات الحاسوبية",
        href: "https://www.uptecnet.com/",
      },
      date: "٢٠١٣ - ٢٠١٣",
      location: "لكناو",
      description:
        "إكمال التدريب الشامل في مكونات أجهزة الكمبيوتر، والتجميع، وتثبيت البرامج، وأساسيات الشبكات، وتقنيات استكشاف الأخطاء وإصلاحها.",
    },
  ],
};
