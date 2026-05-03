import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Bot, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/router";
import { translations, Locale } from "../utility/translations";
import { useTheme } from "next-themes";

interface FaizanAIChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialMessage?: string;
}

export default function FaizanAIChat({
  isOpen,
  setIsOpen,
  initialMessage,
}: FaizanAIChatProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const locale = (router.locale || "en") as Locale;
  const isRTL = locale === "ar";
  const t = translations[locale].chat;

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string; copied?: boolean }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  useEffect(() => {
    if (initialMessage && isOpen && chatHistory.length === 0) {
      handleSend(initialMessage);
    }
  }, [initialMessage, isOpen]);

  const handleSend = async (overrideMessage?: string) => {
    const msgToSend = overrideMessage || message;
    if (!msgToSend.trim() || isLoading) return;

    const userMessage = msgToSend.trim();
    if (!overrideMessage) setMessage("");

    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: chatHistory.map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to connect");

      setChatHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = {
          role: "assistant",
          content: data.text,
        };
        return newHistory;
      });
    } catch (error: any) {
      console.error("Chat error:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: `❌ **Error:** ${error.message || t.error}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setChatHistory((prev) => {
        const next = [...prev];
        next[index].copied = true;
        return next;
      });
      setTimeout(() => {
        setChatHistory((prev) => {
          const next = [...prev];
          next[index].copied = false;
          return next;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
          />

          <motion.div
            dir={isRTL ? "rtl" : "ltr"}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed inset-x-4 bottom-6 z-[9999] mx-auto flex h-[650px] max-w-[500px] flex-col overflow-hidden rounded-3xl border border-accent/20 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:mx-0 sm:w-[500px] ${
              isRTL ? "sm:left-14 md:left-20" : "sm:right-14 md:right-20"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between bg-accent p-5 text-background ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <div className="rounded-full bg-background/20 p-2">
                  <Bot className="h-6 w-6" />
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <h3 className="text-lg font-bold leading-tight">{t.title}</h3>
                  <p className="text-[10px] uppercase tracking-wider opacity-90">
                    {t.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-background/10 p-2 transition-colors hover:bg-background/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-6 overflow-y-auto bg-zinc-50 p-5 dark:bg-zinc-900/30"
              style={{ scrollBehavior: "smooth" }}
            >
              {chatHistory.length === 0 && (
                <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                    <Bot className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {t.welcome}
                    </p>
                    <p className="mx-auto mt-1 max-w-[250px] text-sm text-muted-foreground">
                      {t.welcomeSub}
                    </p>
                  </div>
                  <div className="rounded-xl border border-accent/10 bg-accent/5 p-3">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-tighter text-accent">
                      PROMPT SUGGESTION
                    </p>
                    <p className="text-xs italic text-muted-foreground">
                      "{t.example}"
                    </p>
                  </div>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user"
                      ? isRTL
                        ? "justify-start"
                        : "justify-end"
                      : isRTL
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`group relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-300 ${
                      msg.role === "user"
                        ? "rounded-tr-none bg-accent text-background"
                        : "rounded-tl-none border border-accent/5 bg-white text-foreground hover:border-accent/20 dark:bg-zinc-800"
                    }`}
                  >
                    {msg.role === "assistant" && msg.content && (
                      <button
                        onClick={() => copyToClipboard(msg.content, idx)}
                        className={`absolute -top-2 rounded-full border border-accent/20 bg-background p-1.5 text-accent opacity-0 shadow-md transition-all hover:scale-110 group-hover:opacity-100 ${
                          isRTL ? "-left-2" : "-right-2"
                        }`}
                        title="Copy message"
                      >
                        {msg.copied ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    )}
                    <div
                      className={`prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:p-3 prose-pre:rounded-xl max-w-none ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading &&
                chatHistory[chatHistory.length - 1]?.role === "user" && (
                  <div
                    className={`flex ${
                      isRTL ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-center gap-2 rounded-2xl border border-accent/10 bg-white px-4 py-3 text-sm text-foreground shadow-sm dark:bg-zinc-800">
                      <div className="mr-1 flex items-center space-x-1">
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                          style={{ animationDelay: "150ms" }}
                        ></span>
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                          style={{ animationDelay: "300ms" }}
                        ></span>
                      </div>
                      <span className="font-medium text-accent">
                        {t.typing}
                      </span>
                    </div>
                  </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-accent/10 bg-white p-5 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] dark:bg-zinc-900">
              <div
                className={`flex items-center gap-3 rounded-2xl bg-zinc-100 px-4 py-1.5 ring-1 ring-zinc-200 transition-all focus-within:ring-2 focus-within:ring-accent dark:bg-zinc-800/50 dark:ring-accent/20 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <input
                  autoFocus
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t.placeholder}
                  className={`flex-1 bg-transparent py-2.5 text-sm font-medium outline-none placeholder:text-muted-foreground ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !message.trim()}
                  className="rounded-xl bg-accent p-2 text-background shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <Send className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </button>
              </div>
              <p className="mt-3 text-center text-[9px] uppercase tracking-widest text-muted-foreground opacity-60">
                Powered by Faizan AI • Gemini 3 Preview
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
