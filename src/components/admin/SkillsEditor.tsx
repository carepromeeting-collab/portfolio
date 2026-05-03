import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Trash2, Plus, Zap, Award, Check } from "lucide-react";

export default function SkillsEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsDoc = await getDoc(doc(db, "portfolio", "skills"));
        if (skillsDoc.exists()) setData(skillsDoc.data());
      } catch (err) {
        console.error("Failed to load skills", err);
      }
      setLoading(false);
    };
    fetchSkills();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "portfolio", "skills"), data);
      alert("Skills updated successfully!");
    } catch (err) {
      alert("Failed to sync skills.");
    }
    setSaving(false);
  };

  const handleSectionNameChange = (sectionIndex: number, value: string) => {
    const newData = { ...data };
    newData[lang][sectionIndex].sectionName = value;
    setData(newData);
  };

  const handleSkillNameChange = (sectionIndex: number, skillIndex: number, value: string) => {
    const newData = { ...data };
    newData[lang][sectionIndex].skills[skillIndex].name = value;
    setData(newData);
  };

  const handleAddSection = () => {
    const newData = { ...data };
    const emptySection = { sectionName: "New Section", skills: [] };
    newData.en.push({ ...emptySection });
    newData.ar.push({ ...emptySection, sectionName: "قسم جديد" });
    setData(newData);
  };

  const handleAddSkill = (sectionIndex: number) => {
    const newData = { ...data };
    const emptySkill = { name: "New Skill", icon: "FaCogs" };
    newData[lang][sectionIndex].skills.push(emptySkill);
    setData(newData);
  };

  const handleDeleteSkill = (sectionIndex: number, skillIndex: number) => {
    const newData = { ...data };
    newData[lang][sectionIndex].skills.splice(skillIndex, 1);
    setData(newData);
  };

  const handleDeleteSection = (sectionIndex: number) => {
    if (!window.confirm("Remove this entire skill section?")) return;
    const newData = { ...data };
    newData.en.splice(sectionIndex, 1);
    newData.ar.splice(sectionIndex, 1);
    setData(newData);
  };

  if (loading) return <div className="flex h-64 items-center justify-center text-zinc-400">Loading skills...</div>;
  if (!data) return <div className="p-4 text-red-400">Sync required.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Expertise & Certs</h2>
          <p className="text-sm font-medium text-zinc-500">Categorize your technical and professional strengths.</p>
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
            {saving ? "Syncing..." : "Save Skills"}
          </button>
        </div>
      </div>

      <button onClick={handleAddSection} className="mb-10 flex w-full items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed border-zinc-200 p-6 text-sm font-black text-zinc-400 transition-all hover:border-accent hover:bg-accent/5 hover:text-accent dark:border-zinc-800 dark:hover:bg-accent/10">
        <Plus size={24} /> 
        <span>Add Category Section</span>
      </button>

      <div className="space-y-12">
        {data[lang]?.map((section: any, sIdx: number) => (
          <div key={sIdx} className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Zap size={20} />
                </div>
                <input
                  type="text"
                  value={section.sectionName}
                  onChange={(e) => handleSectionNameChange(sIdx, e.target.value)}
                  className="bg-transparent text-xl font-black text-zinc-900 outline-none dark:text-white"
                  placeholder="Section Name"
                />
              </div>
              <button onClick={() => handleDeleteSection(sIdx)} className="text-zinc-300 hover:text-red-500 transition-all">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {section.skills?.map((skill: any, kIdx: number) => (
                <div key={kIdx} className="group relative flex items-center gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-accent/30 hover:bg-white dark:border-zinc-800 dark:bg-zinc-800/30">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillNameChange(sIdx, kIdx, e.target.value)}
                    className="flex-1 bg-transparent text-sm font-bold text-zinc-700 outline-none dark:text-zinc-300"
                    placeholder="Skill"
                  />
                  <button 
                    onClick={() => handleDeleteSkill(sIdx, kIdx)} 
                    className="text-zinc-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddSkill(sIdx)}
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-100 p-4 text-xs font-black text-zinc-300 hover:border-accent hover:text-accent transition-all dark:border-zinc-800"
              >
                <Plus size={14} /> Add Skill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
