import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Trash2, Plus, Building2, MapPin, Calendar, AlignLeft, Briefcase } from "lucide-react";

export default function ExperienceEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const expDoc = await getDoc(doc(db, "portfolio", "experience"));
        if (expDoc.exists()) setData(expDoc.data());
      } catch (err) {
        console.error("Failed to load experience", err);
      }
      setLoading(false);
    };
    fetchExp();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "portfolio", "experience"), data);
      alert("Professional history updated!");
    } catch (err) {
      alert("Failed to sync work history.");
    }
    setSaving(false);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newData = { ...data };
    if (field.includes(".")) {
      const [p1, p2] = field.split(".");
      newData[lang][index][p1][p2] = value;
    } else {
      newData[lang][index][field] = value;
    }
    setData(newData);
  };

  const handleAddItem = () => {
    const newData = { ...data };
    const emptyItem = {
      title: "New Role",
      organisation: { name: "Company Name", href: "#" },
      date: "2024 - Present",
      location: "Saudi Arabia",
      description: "Successfully managed operations...",
    };
    newData.en.unshift({ ...emptyItem });
    newData.ar.unshift({ ...emptyItem, title: "وظيفة جديدة", location: "المملكة العربية السعودية" });
    setData(newData);
  };

  const handleDeleteItem = (index: number) => {
    if (!window.confirm("Delete this entry forever?")) return;
    const newData = { ...data };
    newData.en.splice(index, 1);
    newData.ar.splice(index, 1);
    setData(newData);
  };

  if (loading) return <div className="flex h-64 items-center justify-center text-zinc-400">Loading work history...</div>;
  if (!data) return <div className="p-4 text-red-400">Sync needed.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Career Journey</h2>
          <p className="text-sm font-medium text-zinc-500">Manage your professional roles and achievements.</p>
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
            {saving ? "Syncing..." : "Update Experience"}
          </button>
        </div>
      </div>

      <button onClick={handleAddItem} className="mb-10 flex w-full items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed border-zinc-200 p-6 text-sm font-black text-zinc-400 transition-all hover:border-accent hover:bg-accent/5 hover:text-accent dark:border-zinc-800 dark:hover:bg-accent/10">
        <Plus size={24} /> 
        <span>Add Professional Role</span>
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {data[lang].map((exp: any, idx: number) => (
          <div key={idx} className="group relative rounded-[2.5rem] border border-zinc-200 bg-zinc-50/50 p-8 transition-all hover:border-accent/30 hover:bg-white dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-900 shadow-sm">
            <button 
              onClick={() => handleDeleteItem(idx)}
              className="absolute right-6 top-6 rounded-full bg-white p-3 text-zinc-400 shadow-sm transition-all hover:bg-red-50 hover:text-red-500 dark:bg-zinc-800 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Briefcase size={28} />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleItemChange(idx, "title", e.target.value)}
                    className="w-full bg-transparent text-xl font-black text-zinc-900 outline-none dark:text-white"
                    placeholder="Role Title"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 size={12} className="text-accent" />
                    <input
                      type="text"
                      value={exp.organisation.name}
                      onChange={(e) => handleItemChange(idx, "organisation.name", e.target.value)}
                      className="bg-transparent text-xs font-bold text-zinc-500 outline-none"
                      placeholder="Company"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1">
                    <Calendar size={10} /> Duration
                  </label>
                  <input
                    type="text"
                    value={exp.date}
                    onChange={(e) => handleItemChange(idx, "date", e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2 text-xs font-bold dark:border-zinc-800 dark:bg-zinc-900 outline-none focus:border-accent/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1">
                    <MapPin size={10} /> Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleItemChange(idx, "location", e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2 text-xs font-bold dark:border-zinc-800 dark:bg-zinc-900 outline-none focus:border-accent/50"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <AlignLeft size={10} /> Impact & Responsibilities
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                  className="h-40 w-full rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-medium leading-relaxed outline-none focus:border-accent/50 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                  placeholder="Describe your achievements..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
