import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, MapPin, Link2, FileText, Globe2, Plus, Trash2 } from "lucide-react";

export default function AboutEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cDoc = await getDoc(doc(db, "portfolio", "content"));
        if (cDoc.exists()) {
          const rawData = cDoc.data() as any;
          
          // Ensure data structure exists for both languages
          ["en", "ar"].forEach((l) => {
            if (!rawData[l]) rawData[l] = { about: {}, hero: {} };
            if (!rawData[l].about) rawData[l].about = {};
            
            // Migration: Convert p1, p2, p3 to paragraphs array if it doesn't exist
            if (!rawData[l].about.paragraphs || !Array.isArray(rawData[l].about.paragraphs)) {
              rawData[l].about.paragraphs = [
                rawData[l].about.p1,
                rawData[l].about.p2,
                rawData[l].about.p3
              ].filter(Boolean);
            }
          });
          
          setData(rawData);
        }
      } catch (err) {
        console.error("Failed to load content", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "portfolio", "content"), data);
      alert("Changes saved to the cloud!");
    } catch (err) {
      alert("Cloud sync failed.");
    }
    setSaving(false);
  };

  const handleHeroChange = (field: string, value: string) => {
    const newData = { ...data };
    newData[lang].hero[field] = value;
    setData(newData);
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newData = { ...data };
    newData[lang].about.paragraphs[index] = value;
    setData(newData);
  };

  const handleAddParagraph = () => {
    const newData = { ...data };
    if (!newData[lang].about.paragraphs) newData[lang].about.paragraphs = [];
    newData[lang].about.paragraphs.push("");
    setData(newData);
  };

  const handleDeleteParagraph = (index: number) => {
    const newData = { ...data };
    newData[lang].about.paragraphs.splice(index, 1);
    setData(newData);
  };

  if (loading) return <div className="flex h-64 items-center justify-center text-zinc-400">Loading your profile...</div>;
  if (!data || !data[lang]) return <div className="p-4 text-red-400">Data structure error. Please click "Sync Local Data" in the main dashboard.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Bio & Identity</h2>
          <p className="text-sm font-medium text-zinc-500">Update your public profile, greetings, and CV links.</p>
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
            {saving ? "Syncing..." : "Update Bio"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Intro Section */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent">
              <User size={14} /> Basic Information
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField 
                label="Greeting" 
                value={data[lang].hero?.greeting || ""} 
                onChange={(v: string) => handleHeroChange("greeting", v)} 
              />
              <InputField 
                label="Professional Title" 
                value={data[lang].hero?.title || ""} 
                onChange={(v: string) => handleHeroChange("title", v)} 
              />
              <InputField 
                label="Location" 
                icon={<MapPin size={14}/>}
                value={data[lang].hero?.location || ""} 
                onChange={(v: string) => handleHeroChange("location", v)} 
              />
              <InputField 
                label="CV Link (URL)" 
                icon={<Link2 size={14}/>}
                value={data[lang].hero?.cvLink || ""} 
                onChange={(v: string) => handleHeroChange("cvLink", v)} 
                className="text-blue-500 font-mono"
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent">
                <FileText size={14} /> Detailed Bio
              </div>
              <button 
                onClick={handleAddParagraph} 
                className="flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent/20 transition-all"
              >
                <Plus size={14} /> Add Paragraph
              </button>
            </div>
            <div className="space-y-6">
              {(data[lang].about.paragraphs || []).map((p: string, idx: number) => (
                <div key={idx} className="group relative">
                  <TextareaField 
                    label={`Paragraph ${idx + 1}`} 
                    value={p} 
                    onChange={(v: string) => handleParagraphChange(idx, v)} 
                  />
                  <button 
                    onClick={() => handleDeleteParagraph(idx)}
                    className="absolute right-2 top-0 rounded-full p-2 text-zinc-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Preview / Status Column */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-800/30">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">
              <Globe2 size={14} /> Quick Summary
            </div>
            <TextareaField 
              label="Hero Snippet" 
              value={data[lang].hero?.summary || ""} 
              onChange={(v: string) => handleHeroChange("summary", v)} 
              className="h-40"
            />
          </section>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, icon, className = "" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</div>}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5 text-sm font-bold text-zinc-900 outline-none transition-all focus:border-accent focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-accent/50 ${icon ? 'pl-11' : 'px-4'} ${className}`}
        />
      </div>
    </div>
  );
}

function TextareaField({ label, value, onChange, className = "" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-medium leading-relaxed text-zinc-700 outline-none transition-all focus:border-accent focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-accent/50 ${className}`}
      />
    </div>
  );
}
