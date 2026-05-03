import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Trash2, Plus, Globe, CheckCircle2, Trophy, ArrowUpRight } from "lucide-react";

export default function HighlightsEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hDoc = await getDoc(doc(db, "portfolio", "highlights"));
        if (hDoc.exists()) setData(hDoc.data());
      } catch (err) {
        console.error("Failed to load highlights", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "portfolio", "highlights"), data);
      alert("Home highlights updated!");
    } catch (err) {
      alert("Sync failed.");
    }
    setSaving(false);
  };

  const handleListChange = (key: string, index: number, value: string) => {
    const newData = { ...data };
    newData[lang][key][index] = value;
    setData(newData);
  };

  const handleWebsiteChange = (index: number, field: string, value: string) => {
    const newData = { ...data };
    newData[lang].websites[index][field] = value;
    setData(newData);
  };

  const handleAddItem = (key: string, defaultValue: any) => {
    const newData = { ...data };
    newData[lang][key].unshift(defaultValue);
    setData(newData);
  };

  const handleDeleteItem = (key: string, index: number) => {
    const newData = { ...data };
    newData[lang][key].splice(index, 1);
    setData(newData);
  };

  if (loading) return <div className="flex h-64 items-center justify-center text-zinc-400">Loading highlights...</div>;
  if (!data) return <div className="p-4 text-red-400">Sync required.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Home Page Assets</h2>
          <p className="text-sm font-medium text-zinc-500">Manage competencies, achievements, and website links.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex rounded-2xl bg-zinc-100 p-1 dark:bg-zinc-800">
            {["en", "ar"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as any)}
                className={`rounded-xl px-6 py-2 text-xs font-black uppercase tracking-widest transition-all ${lang === l ? "bg-white text-accent shadow-sm dark:bg-zinc-700" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="rounded-2xl bg-accent px-8 py-3 text-sm font-black text-white shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {saving ? "Syncing..." : "Publish Highlights"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Core Competencies */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">Competencies</h3>
            </div>
            <button onClick={() => handleAddItem("coreCompetencies", "New Area")} className="rounded-xl bg-zinc-100 px-4 py-2 text-xs font-black text-zinc-600 hover:bg-accent hover:text-white transition-all dark:bg-zinc-800 dark:text-zinc-400">
              <Plus size={14} className="inline mr-1" /> Add
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data[lang].coreCompetencies.map((item: string, idx: number) => (
              <div key={idx} className="group flex items-center gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:bg-white dark:border-zinc-800 dark:bg-zinc-800/30 shadow-sm">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListChange("coreCompetencies", idx, e.target.value)}
                  className="flex-1 bg-transparent text-sm font-bold text-zinc-700 outline-none dark:text-zinc-300"
                />
                <button onClick={() => handleDeleteItem("coreCompetencies", idx)} className="text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Notable Achievements */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Trophy size={20} />
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">Achievements</h3>
            </div>
            <button onClick={() => handleAddItem("achievements", "Major Milestone")} className="rounded-xl bg-zinc-100 px-4 py-2 text-xs font-black text-zinc-600 hover:bg-accent hover:text-white transition-all dark:bg-zinc-800 dark:text-zinc-400">
              <Plus size={14} className="inline mr-1" /> Add
            </button>
          </div>
          <div className="space-y-4">
            {data[lang].achievements.map((item: string, idx: number) => (
              <div key={idx} className="group relative flex items-start gap-3 rounded-[2rem] border border-zinc-100 bg-zinc-50/50 p-6 transition-all hover:bg-white dark:border-zinc-800 dark:bg-zinc-800/30 shadow-sm">
                <textarea
                  value={item}
                  onChange={(e) => handleListChange("achievements", idx, e.target.value)}
                  className="w-full resize-none bg-transparent text-sm font-bold leading-relaxed text-zinc-700 outline-none dark:text-zinc-300 h-20"
                />
                <button onClick={() => handleDeleteItem("achievements", idx)} className="absolute right-4 top-4 text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Websites & Projects */}
        <section className="space-y-6 lg:col-span-2 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Globe size={20} />
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">Live Portals & Links</h3>
            </div>
            <button onClick={() => handleAddItem("websites", { name: "Project Hub", url: "https://" })} className="rounded-xl bg-zinc-100 px-4 py-2 text-xs font-black text-zinc-600 hover:bg-accent hover:text-white transition-all dark:bg-zinc-800 dark:text-zinc-400">
              <Plus size={14} className="inline mr-1" /> Add Link
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data[lang].websites.map((site: any, idx: number) => (
              <div key={idx} className="group relative overflow-hidden rounded-[2rem] border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:border-accent/30 dark:border-zinc-800 dark:bg-zinc-900">
                <button onClick={() => handleDeleteItem("websites", idx)} className="absolute right-4 top-4 text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={16} />
                </button>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Name</label>
                    <input
                      type="text"
                      value={site.name}
                      onChange={(e) => handleWebsiteChange(idx, "name", e.target.value)}
                      className="w-full bg-transparent text-sm font-black text-zinc-900 outline-none dark:text-white border-b border-zinc-50 dark:border-zinc-800 py-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Endpoint</label>
                    <div className="flex items-center gap-2 text-blue-500">
                      <ArrowUpRight size={12} />
                      <input
                        type="text"
                        value={site.url}
                        onChange={(e) => handleWebsiteChange(idx, "url", e.target.value)}
                        className="w-full bg-transparent text-[10px] font-mono font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
