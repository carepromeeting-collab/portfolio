import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

import { EXPERIENCE } from "@/data/experience";
import { PROJECT_SHOWCASE, PROJECTS_CARD } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";
import { HIGHLIGHTS_DATA } from "@/data/highlights";
import { translations } from "@/utility/translations";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const password = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password || password !== adminPassword) {
    // Artificial delay for unauthorized requests
    await new Promise(resolve => setTimeout(resolve, 2000));
    return res.status(401).json({ message: "Unauthorized: Master Key Required" });
  }

  if (req.method === "POST") {
    try {
      // Migrate Experience
      await setDoc(doc(db, "portfolio", "experience"), EXPERIENCE);
      
      // Migrate Projects
      await setDoc(doc(db, "portfolio", "projects"), {
        PROJECT_SHOWCASE,
        PROJECTS_CARD,
      });

      // Migrate Skills
      const cleanSkills = JSON.parse(JSON.stringify(SKILLS_DATA, (key, value) => {
        if (typeof value === "function") return undefined;
        return value;
      }));
      await setDoc(doc(db, "portfolio", "skills"), cleanSkills);

      // Migrate Highlights
      await setDoc(doc(db, "portfolio", "highlights"), HIGHLIGHTS_DATA);

      // Migrate Hero and About Content
      await setDoc(doc(db, "portfolio", "content"), {
        en: {
          hero: { ...translations.en.hero, cvLink: "https://drive.google.com/drive/folders/1pq1KYKi-74dCn60FwlzWkHVbiFuMo5ir?usp=sharing" },
          about: translations.en.about,
        },
        ar: {
          hero: { ...translations.ar.hero, cvLink: "https://drive.google.com/drive/folders/1pq1KYKi-74dCn60FwlzWkHVbiFuMo5ir?usp=sharing" },
          about: translations.ar.about,
        }
      });

      return res.status(200).json({ message: "Cloud sync successful!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Cloud node error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
