import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import FadeUp from "@/animation/fade-up";
import FadeRight from "@/animation/fade-right";
import heroProfileImg from "@/public/images/heroProfile.png";
import DuotoneImage from "./duotone-image";

import { useRouter } from "next/router";
import { translations, Locale } from "@/utility/translations";

export default function AboutHero({ data }: { data: any }) {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = data?.about || translations[locale].about;
  const tHero = data?.hero || translations[locale].hero;

  // Handle both legacy p1,p2,p3 and new paragraphs array
  const paragraphs = t.paragraphs || [t.p1, t.p2, t.p3].filter(Boolean);

  return (
    <div className="mx-auto mt-0 flex max-w-7xl flex-col items-center gap-6 px-6 pt-20 text-center sm:px-14 md:mt-20 md:px-20 lg:mt-0 lg:flex-row lg:text-left">
      <div className="w-full sm:w-1/2 md:w-2/3 lg:inline-block lg:h-full lg:w-1/2">
        <AnimatePresence>
          <FadeUp key="hero-image" duration={0.6}>
            <DuotoneImage
              src={heroProfileImg}
              width={500}
              height={500}
              className="h-auto w-full origin-center scale-[1.1] px-0 transition-transform duration-500 sm:scale-[1.50] lg:scale-[1.60]"
              alt="Mohammad Faizan Khan - Profile Image"
              lightColor="#E0FFFF"
              darkColor="#004D4D"
              unoptimized
            />
          </FadeUp>
        </AnimatePresence>
      </div>
      <div className="mt-16 w-full sm:mt-10 lg:w-1/2">
        <AnimatePresence>
          <FadeUp key="title-greeting" duration={0.6}>
            <h1 className="text-5xl font-bold text-accent sm:text-7xl md:text-6xl lg:text-5xl xl:text-7xl">
              {t.greeting}
            </h1>
          </FadeUp>
          
          {paragraphs.map((p: string, idx: number) => (
            <FadeUp key={`description-${idx}`} duration={0.6} delay={0.2 + idx * 0.1}>
              <p className="mt-8 text-base font-medium text-zinc-900 dark:text-zinc-300 sm:text-lg md:text-lg">
                {p}
              </p>
            </FadeUp>
          ))}

          <FadeUp key="cta-section" duration={0.6} delay={0.2 + paragraphs.length * 0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href={tHero.cvLink || "https://drive.google.com/drive/folders/1pq1KYKi-74dCn60FwlzWkHVbiFuMo5ir?usp=sharing"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border-2 border-accent bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                {tHero.downloadCV}
              </a>
            </div>
          </FadeUp>

          <FadeRight
            key="hero-location"
            duration={0.6}
            delay={0.8}
            className="mr-0 mt-8 flex items-center justify-center gap-4 lg:mr-8 lg:justify-end"
          >
            <div className="relative flex w-12 gap-4 overflow-hidden rounded-md">
              <Image
                className="h-full w-full bg-cover bg-no-repeat"
                alt="Saudi Arabia flag"
                src="https://flagcdn.com/sa.svg"
                width={15}
                height={15}
              />
            </div>
            <span className="text-lg font-medium text-foreground">
              {tHero.location}
            </span>
          </FadeRight>
        </AnimatePresence>
      </div>
    </div>
  );
}
