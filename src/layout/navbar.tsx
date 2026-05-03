import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import MenuLogo from "@/components/utility/menu-button";
import ThemeSwitch from "@/components/utility/theme-switch";
import AnimatedLogo from "@/animation/animated-logo";
import MobileMenu from "@/components/utility/mobile-menu";
import NavbarSearch from "@/components/navbar-search";
import { classNames } from "../utility/classNames";

import { NavbarProps } from "@/types/navigation";

export default function Navbar(props: NavbarProps) {
  const router = useRouter();
  const pathName = router.pathname;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 mt-2 px-6 py-4 sm:mt-8 sm:px-14 md:px-20">
      <div className="mx-auto grid h-16 grid-cols-2 items-center md:grid-cols-3 lg:max-w-7xl">
        {/* Logo - Left */}
        <div className="flex items-center justify-start">
          <Link
            href="/"
            className="drop-shadow-teralight flex items-center justify-center"
            aria-label="Return to home page"
          >
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <AnimatedLogo />
            </div>
          </Link>
        </div>

        <div className="hidden items-center justify-center md:flex">
          {router.pathname === "/" && (
            <NavbarSearch onSearch={props.onAISearch || (() => {})} />
          )}
        </div>

        {/* Menu - Right */}
        <div className="flex items-center justify-end gap-4">
          <nav className="hidden items-center gap-2 rounded-full px-4 py-1.5 shadow-md ring-1 ring-zinc-200 backdrop-blur-md dark:ring-accent/50 md:flex">
            <ul className="flex gap-2 text-sm font-medium">
              {props.routes.map((_link, index) => {
                return (
                  <li
                    key={index}
                    className="transition-transform duration-100 hover:scale-[1.1]"
                  >
                    <Link
                      href={_link.href}
                      className={classNames(
                        pathName === _link.href
                          ? "font-semibold text-background dark:hover:text-foreground"
                          : "text-foreground",
                        "group relative mx-2 rounded-full px-3 py-1.5 transition-colors duration-200",
                      )}
                    >
                      {_link.href === pathName && (
                        <motion.span
                          layoutId="tab-pill"
                          animate={{
                            transition: {
                              x: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              },
                            },
                          }}
                          className="absolute inset-0 -z-10 rounded-full bg-accent group-hover:bg-accent/80"
                        ></motion.span>
                      )}
                      {_link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mx-2 h-4 w-[1px] bg-zinc-200 dark:bg-zinc-700"></div>

            <button
              onClick={() => {
                const newLocale = router.locale === "en" ? "ar" : "en";
                router.push(pathName, pathName, { locale: newLocale });
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-foreground hover:bg-accent/10"
            >
              {router.locale === "en" ? "ع" : "EN"}
            </button>
            <ThemeSwitch />
          </nav>

          <AnimatePresence>
            <MenuLogo open={isModalOpen} toggle={toggleModal} />
          </AnimatePresence>
        </div>
      </div>

      <MobileMenu
        routes={props.routes}
        openMenu={isModalOpen}
        setOpenMenu={setIsModalOpen}
      />
    </header>
  );
}
