import React, { ReactNode, useState, useEffect } from "react";
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import FaizanAIChat from "@/components/faizan-ai-chat";
import CursorTrailCanvas from "@/components/cursor-trail-canvas";
import { useRouter } from "next/router";
import { translations, Locale } from "../utility/translations";
import { NavbarRoutes } from "@/types/navigation";

export interface MainLayoutProps {
  children: ReactNode;
}

export default function FinalPortfolioLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const locale = (router.locale || "en") as Locale;
  const t = translations[locale]?.navbar || translations.en.navbar;

  const handleAISearch = (query: string) => {
    setInitialChatMessage(query);
    setIsChatOpen(true);
  };

  const localizedRoutes: NavbarRoutes = [
    { title: t.home, href: "/" },
    { title: t.about, href: "/about" },
    { title: t.events, href: "/projects" },
  ];

  return (
    <div className="min-h-screen bg-background relative" suppressHydrationWarning>
      {isClient && (
        <CursorTrailCanvas className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-50" />
      )}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar routes={localizedRoutes} onAISearch={handleAISearch} />
        <main id="main-content-root" className="flex-grow">{children}</main>
        <Footer />
      </div>
      {isClient && (
        <FaizanAIChat
          isOpen={isChatOpen}
          setIsOpen={setIsChatOpen}
          initialMessage={initialChatMessage}
        />
      )}
    </div>
  );
}
