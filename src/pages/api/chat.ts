import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Faizan AI, a highly intelligent and versatile AI assistant. 
You are powered by the latest Gemini 2.0 architecture but presented as Faizan's custom AI.

Your capabilities include:
1. Helping with any general task (writing, coding, analysis, creative work).
2. Providing detailed and professional information about Mohammad Faizan Khan (Project Manager) if asked.
3. Responding in a helpful, friendly, and expert tone, similar to ChatGPT-4.

Always use Markdown for formatting. If the user asks in Arabic, respond in Arabic.
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "API Key missing on server" });
  }

  const { message, history } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood." }] },
        ...(history || []).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: h.parts,
        })),
        { role: "user", parts: [{ text: message }] },
      ],
    });

    const responseText = result.response.text();
    res.status(200).json({ text: responseText });
  } catch (error: any) {
    console.error("AI Error:", error);
    res.status(500).json({ message: error.message || "Error generating response" });
  }
}
