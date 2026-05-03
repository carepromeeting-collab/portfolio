import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, useTheme } from "next-themes";
import { AnimatePresence } from "framer-motion";

import FinalPortfolioLayout from "@/layout/main-layout";
import "@/styles/globals.css";

function ThemeRandomizer() {
  const { setTheme } = useTheme();
  useEffect(() => {
    const randomTheme = Math.random() > 0.5 ? "dark" : "light";
    setTheme(randomTheme);
  }, [setTheme]);
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {isClient && <ThemeRandomizer />}
      <FinalPortfolioLayout>
        <AnimatePresence mode="wait" initial={false}>
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
      </FinalPortfolioLayout>
      <Analytics />
    </ThemeProvider>
  );
}
