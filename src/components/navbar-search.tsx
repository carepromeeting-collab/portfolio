import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { translations, Locale } from "@/utility/translations";

interface NavbarSearchProps {
  onSearch: (value: string) => void;
}

export default function NavbarSearch({ onSearch }: NavbarSearchProps) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = translations[locale].chat;
  const isRTL = locale === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative flex w-full max-w-[450px] items-center"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="relative flex w-full items-center overflow-hidden rounded-full bg-accent/5 px-4 py-1 shadow-md ring-1 ring-accent/30 backdrop-blur-md focus-within:ring-2 focus-within:ring-accent/40 dark:bg-accent/10 dark:ring-accent/50">
        <Search
          className={`h-3.5 w-3.5 text-accent ${isRTL ? "ml-2" : "mr-2"}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t.placeholder}
          className={`w-full bg-transparent py-1 text-sm font-medium text-accent outline-none placeholder:text-accent/50 ${
            isRTL ? "text-right" : "text-left"
          }`}
        />
        <div
          className={`${isRTL ? "mr-1" : "ml-1"} hidden items-center sm:flex`}
        >
          <span className="text-[10px] font-bold text-accent opacity-0 transition-opacity group-focus-within:opacity-100">
            {isRTL ? "↵" : "↵"}
          </span>
        </div>
      </div>
    </form>
  );
}
