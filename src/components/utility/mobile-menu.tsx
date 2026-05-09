import { Dispatch, Fragment, SetStateAction } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";

import ThemeSwitch from "@/components/utility/theme-switch";
import { NavbarProps } from "@/types/navigation";
import { classNames } from "@/utility/classNames";

export interface MobileMenuProps extends NavbarProps {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({
  openMenu,
  routes,
  setOpenMenu,
}: MobileMenuProps) {
  const router = useRouter();
  const pathName = router.pathname;

  const handleClick = (href: string) => {
    setOpenMenu(false);
    router.push(href);
  };

  return (
    <Transition show={openMenu} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={setOpenMenu}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl border border-accent/20 bg-background p-10 text-left align-middle text-foreground shadow-2xl transition-all">
                <div className="flex flex-col items-center gap-8 text-center">
                  {routes.map((link, i) => (
                    <button
                      key={i}
                      className="group relative py-2 text-4xl font-black uppercase tracking-tighter text-foreground"
                      onClick={() => handleClick(link.href)}
                    >
                      <span
                        className={classNames(
                          pathName === link.href ? "w-full" : "w-0",
                          "absolute -bottom-1 left-0 h-1 rounded-lg bg-accent transition-[width] duration-300 group-hover:w-full",
                        )}
                      ></span>
                      {link.title}
                    </button>
                  ))}
                  
                  <div className="mt-4 flex gap-6">
                    <button
                      onClick={() => {
                        const newLocale = router.locale === "en" ? "ar" : "en";
                        router.push(pathName, pathName, { locale: newLocale });
                        setOpenMenu(false);
                      }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent text-lg font-black text-accent hover:bg-accent/10 transition-colors"
                    >
                      {router.locale === "en" ? "ع" : "EN"}
                    </button>
                    <ThemeSwitch setClose={setOpenMenu} />
                  </div>

                  <div className="mt-10 border-t border-accent/10 pt-8 w-full">
                    <span
                      onClick={() => {
                        setOpenMenu(false);
                        router.push("/admin");
                      }}
                      className="cursor-pointer text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors"
                    >
                      ©{new Date().getFullYear()} Mohammad Faizan Khan
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
