import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Trash2, Plus, ExternalLink, Image as ImageIcon, Layout, Globe, Search } from "lucide-react";

export default function ProjectEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projDoc = await getDoc(doc(db, "portfolio", "projects"));
        if (projDoc.exists()) setData(projDoc.data());
      } catch (err) {
        console.error("Failed to load projects", err);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "portfolio", "projects"), data);
      alert("Projects published to the cloud!");
    } catch (err) {
      alert("Cloud sync failed.");
    }
    setSaving(false);
  };

  const handleCardChange = (index: number, field: string, value: any) => {
    const newData = { ...data };
    newData.PROJECTS_CARD[lang][index][field] = value;
    setData(newData);
  };

  const handleAddCard = () => {
    const newData = { ...data };
    const emptyCard = {
      title: "New Digital Product",
      description: "Explain the problem you solved...",
      githubUrl: "",
      externalUrl: "https://",
    };
    newData.PROJECTS_CARD.en.unshift({ ...emptyCard });
    newData.PROJECTS_CARD.ar.unshift({ ...emptyCard, title: "منتج رقمي جديد" });
    setData(newData);
  };

  const handleDeleteCard = (index: number) => {
    if (!window.confirm("Remove this project card?")) return;
    const newData = { ...data };
    newData.PROJECTS_CARD.en.splice(index, 1);
    newData.PROJECTS_CARD.ar.splice(index, 1);
    setData(newData);
  };

  if (loading) return <div className="flex h-64 items-center justify-center text-zinc-400 font-bold uppercase tracking-widest text-xs">Loading Portfolios...</div>;
  if (!data) return <div className="p-4 text-red-400 font-bold">Sync required.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Project Showcase</h2>
          <p className="text-sm font-medium text-zinc-500">Curate and manage your collection of digital works.</p>
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
            {saving ? "Publishing..." : "Publish Projects"}
          </button>
        </div>
      </div>

      <button onClick={handleAddCard} className="mb-10 flex w-full items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed border-zinc-200 p-6 text-sm font-black text-zinc-400 transition-all hover:border-accent hover:bg-accent/5 hover:text-accent dark:border-zinc-800 dark:hover:bg-accent/10">
        <Plus size={24} /> 
        <span>Add New Project</span>
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {data.PROJECTS_CARD[lang].map((project: any, idx: number) => (
          <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-accent/30 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 flex gap-6">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-[2rem] bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-300">
              <Layout size={40} />
              <button 
                onClick={() => handleDeleteCard(idx)}
                className="absolute inset-0 flex items-center justify-center bg-red-500/90 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 size={24} />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Project Name</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleCardChange(idx, "title", e.target.value)}
                  className="w-full bg-transparent text-xl font-black text-zinc-900 outline-none dark:text-white"
                  placeholder="App Name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleCardChange(idx, "description", e.target.value)}
                  className="h-20 w-full resize-none bg-transparent text-sm font-medium leading-relaxed text-zinc-500 outline-none"
                  placeholder="Summary..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-zinc-50 dark:border-zinc-800">
                <div className="flex flex-1 items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-bold text-blue-500 dark:bg-zinc-800">
                  <Globe size={12} />
                  <input
                    type="text"
                    value={project.externalUrl || ""}
                    onChange={(e) => handleCardChange(idx, "externalUrl", e.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
