import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import FadeUp from "@/animation/fade-up";
import { useRouter } from "next/router";
import { translations, Locale } from "@/utility/translations";

export default function LandingHero({ data }: { data: any }) {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = data || translations[locale].hero;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
    springConfig,
  );

  return (
    <motion.section
      style={{ y }}
      ref={ref}
      suppressHydrationWarning
      className="pointer-events-none flex max-h-[1000px] min-h-[calc(100vh-200px)] items-center px-6 sm:px-14 md:h-[calc(100vh-200px)] md:min-h-max md:px-20"
    >
      <div className="pointer-events-auto w-full">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence>
            <FadeUp key="title-main" duration={0.6}>
              <h1 className="bg-accent bg-clip-text py-2 text-5xl font-bold text-transparent sm:text-6xl md:text-7xl xl:text-8xl">
                {t.greeting.replace("Hi, I'm ", "").replace("مرحباً، أنا ", "")}
              </h1>
              <span className="text-xl font-black text-foreground md:text-3xl">
                {t.title}
              </span>
            </FadeUp>
            <FadeUp key="description" duration={0.6} delay={0.2}>
              <div className="mt-8 max-w-3xl text-base font-bold text-foreground sm:text-base md:text-xl">
                {t.summary}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={t.cvLink || "https://drive.google.com/drive/folders/1pq1KYKi-74dCn60FwlzWkHVbiFuMo5ir?usp=sharing"}
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
                  {t.downloadCV}
                </a>
              </div>
            </FadeUp>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
