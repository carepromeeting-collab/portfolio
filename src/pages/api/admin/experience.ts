import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const password = req.headers.authorization;
  if (password !== "admin123") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      
      // Save directly to Firebase
      await setDoc(doc(db, "portfolio", "experience"), data);

      return res.status(200).json({ message: "Saved to Firebase successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error saving data to Firebase" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
