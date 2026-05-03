import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  LogOut, 
  Database, 
  LayoutDashboard, 
  Briefcase, 
  Code2, 
  Trophy, 
  UserCircle, 
  Mail,
  KeyRound,
  ChevronRight,
  X,
  AlertCircle,
  Send,
  ArrowLeft
} from "lucide-react";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import ProjectEditor from "@/components/admin/ProjectEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import SkillsEditor from "@/components/admin/SkillsEditor";
import HighlightsEditor from "@/components/admin/HighlightsEditor";

type TabType = "about" | "experience" | "projects" | "skills" | "highlights";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryStatus, setRecoveryStatus] = useState("");

  const AUTHORIZED_EMAILS = [
    "mohammad.faizankhan@icloud.com",
    "faizandgreate@gmail.com",
    "k.faizan204@gmail.com"
  ];

  const WRONG_PASS_MESSAGES = [
    "Wrong. Not even by accident could that be right.",
    "That wasn’t a guess—it was a complete system failure.",
    "Access denied. So is whatever logic you used.",
    "That input made things worse somehow.",
    "Wrong. You’re not even circling the answer.",
    "That attempt had zero intelligence behind it.",
    "Incorrect. You’re guessing with confidence, which is dangerous.",
    "That wasn’t close—it wasn’t even relevant.",
    "Wrong again. At this point, it’s intentional.",
    "That guess collapsed instantly under reality.",
    "Incorrect. Your accuracy is impressively nonexistent.",
    "That was less of a password and more of a mistake.",
    "Wrong. You’re drifting further away each time.",
    "That attempt didn’t just fail—it embarrassed itself.",
    "Incorrect. Even randomness would outperform this.",
    "That guess had absolutely no chance. None.",
    "Wrong. You’re confidently heading nowhere.",
    "That wasn’t just incorrect—it was pointless.",
    "Incorrect. Try remembering instead of inventing nonsense.",
    "Wrong again. This isn’t trial and error, it’s just error."
  ];

  useEffect(() => {
    const verifyAuth = async () => {
      const savedAuth = localStorage.getItem("admin_session");
      if (savedAuth) {
        try {
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: savedAuth })
          });
          const data = await res.json();
          if (data.success) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("admin_session");
          }
        } catch (err) {
          console.error("Auth verification failed");
        }
      }
      setAuthLoading(false);
    };
    verifyAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem("admin_session", password);
      } else {
        const randomMsg = WRONG_PASS_MESSAGES[Math.floor(Math.random() * WRONG_PASS_MESSAGES.length)];
        setErrorMsg(randomMsg);
      }
    } catch (err) {
      setErrorMsg("Connection failure. The cloud is unreachable.");
    }
    setLoading(false);
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecoveryStatus("");
    
    if (AUTHORIZED_EMAILS.includes(recoveryEmail.toLowerCase().trim())) {
      setRecoveryStatus("Recovery request sent! Check your inbox.");
      setTimeout(() => setShowForgot(false), 3000);
    } else {
      setErrorMsg("Identity not recognized. Access denied.");
    }
    setLoading(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("admin_session");
    setIsLoggedIn(false);
  };

  const handleMigrateData = async () => {
    setStatus("Syncing...");
    try {
      const res = await fetch("/api/admin/migrate", {
        method: "POST",
        headers: { "Authorization": localStorage.getItem("admin_session") || "" } 
      });
      if (res.ok) {
        setStatus("Success!");
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("Sync failed.");
      }
    } catch (err) {
      setStatus("Error.");
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>MFK Admin | {isLoggedIn ? "Dashboard" : "Auth"}</title>
      </Head>

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div 
            key="auth-modal-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-md"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-accent/10 blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
            </div>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative z-10 w-full max-w-md px-4"
            >
              <button 
                onClick={() => window.location.href = "/"}
                className="absolute -top-4 -right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center gap-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 sm:p-12 backdrop-blur-3xl shadow-2xl overflow-hidden min-h-[400px] justify-center">
                
                <AnimatePresence mode="wait">
                  {!showForgot ? (
                    <motion.div 
                      key="login-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="w-full flex flex-col items-center gap-6"
                    >
                      <div className="relative h-20 w-20">
                        <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl animate-pulse" />
                        <img 
                          src="/images/logo.png" 
                          alt="Logo" 
                          className="relative h-full w-full object-contain filter drop-shadow-lg"
                        />
                      </div>
                      
                      <div className="text-center">
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">Cloud <span className="text-accent">Access</span></h1>
                        <p className="mt-1 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Secure Managed Portal</p>
                      </div>

                      <form onSubmit={handleLogin} className="w-full space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">Master Key</label>
                          <div className="relative">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 pl-12 text-sm font-medium text-white outline-none focus:border-accent/30 focus:bg-white/10 transition-all"
                            />
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          {errorMsg && (
                            <motion.div 
                              key={errorMsg}
                              initial={{ opacity: 0, scale: 0.5, y: 10 }}
                              animate={{ 
                                opacity: 1, 
                                scale: [0.5, 1.3, 0.9, 1],
                                y: 0 
                              }}
                              transition={{ 
                                duration: 0.8,
                                times: [0, 0.4, 0.8, 1],
                                ease: "backOut"
                              }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-start gap-2 rounded-xl bg-red-500/10 p-3 text-[10px] font-bold text-red-400 border border-red-500/20"
                            >
                              <AlertCircle size={14} className="shrink-0" />
                              <span>{errorMsg}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-accent p-4 text-sm font-black text-white transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-accent/20"
                        >
                          {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Authenticate"}
                        </button>
                      </form>

                      <button 
                        onClick={() => { setShowForgot(true); setErrorMsg(""); }}
                        className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-accent transition-colors"
                      >
                        Forget Key?
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="forgot-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full flex flex-col items-center gap-6"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                        <Mail size={28} />
                      </div>
                      
                      <div className="text-center">
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">Key <span className="text-blue-400">Recovery</span></h1>
                        <p className="mt-1 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Identity Verification</p>
                      </div>

                      <form onSubmit={handleRecovery} className="w-full space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">Recovery Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input
                              type="email"
                              placeholder="email@address.com"
                              value={recoveryEmail}
                              onChange={(e) => setRecoveryEmail(e.target.value)}
                              className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 pl-12 text-sm font-medium text-white outline-none focus:border-blue-500/30 focus:bg-white/10 transition-all"
                              required
                            />
                          </div>
                        </div>

                        <AnimatePresence>
                          {(errorMsg || recoveryStatus) && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className={`flex items-start gap-2 rounded-xl p-3 text-[10px] font-bold ${recoveryStatus ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}
                            >
                              {recoveryStatus ? <Send size={14} className="shrink-0" /> : <AlertCircle size={14} className="shrink-0" />}
                              <span>{recoveryStatus || errorMsg}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-500 p-4 text-sm font-black text-white transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/20"
                        >
                          {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Send Recovery Link"}
                        </button>
                      </form>

                      <button 
                        onClick={() => { setShowForgot(false); setErrorMsg(""); setRecoveryStatus(""); }}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                      >
                        <ArrowLeft size={12} /> Back to Login
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="admin-dashboard-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <header className="sticky top-0 z-[60] w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
              <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
                    <LayoutDashboard size={24} />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Cloud <span className="text-accent">Manager</span></h1>
                    <p className="hidden sm:block text-[9px] font-bold text-zinc-400 uppercase tracking-widest italic">System Active</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button 
                    onClick={() => window.location.href = "/"}
                    className="hidden sm:flex items-center gap-2 rounded-2xl border border-zinc-200 px-5 py-2.5 text-sm font-bold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  >
                    <span>View Site</span>
                  </button>
                  <AnimatePresence>
                    {status && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="hidden rounded-full bg-green-500/10 px-3 py-1.5 text-[10px] font-bold text-green-500 md:block"
                      >
                        {status}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={handleSignOut} 
                    className="flex items-center justify-center rounded-xl bg-zinc-100 p-2.5 sm:px-4 sm:py-2.5 text-sm font-bold text-zinc-600 transition-all active:scale-95 dark:bg-zinc-900 dark:text-zinc-400"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline ml-2">Lock</span>
                  </button>
                </div>
              </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
              <div className="mb-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Control Panel</h2>
                  <button
                    onClick={handleMigrateData}
                    className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-[10px] font-black text-white dark:bg-white dark:text-zinc-950 shadow-lg"
                  >
                    <Database size={14} />
                    Sync
                  </button>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                  {[
                    { id: "about", label: "Bio", icon: UserCircle },
                    { id: "experience", label: "Work", icon: Briefcase },
                    { id: "projects", label: "Projects", icon: Database },
                    { id: "skills", label: "Skills", icon: Code2 },
                    { id: "highlights", label: "Home", icon: Trophy },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                          ? "bg-accent text-white shadow-lg shadow-accent/20" 
                          : "bg-white text-zinc-400 dark:bg-zinc-900 shadow-sm"
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] sm:rounded-[3rem] border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50 pb-20 sm:pb-10"
              >
                <div className="overflow-hidden rounded-[1.8rem] sm:rounded-[2.5rem] bg-white p-4 sm:p-10 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <div className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent">
                    <span>Cloud Engine</span>
                    <ChevronRight size={10} />
                    <span className="text-zinc-400 capitalize">{activeTab}</span>
                  </div>
                  {activeTab === "about" && <AboutEditor />}
                  {activeTab === "experience" && <ExperienceEditor />}
                  {activeTab === "projects" && <ProjectEditor />}
                  {activeTab === "skills" && <SkillsEditor />}
                  {activeTab === "highlights" && <HighlightsEditor />}
                </div>
              </motion.div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
