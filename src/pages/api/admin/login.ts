import { NextApiRequest, NextApiResponse } from "next";

// Simulated rate limiting state (resets on server restart)
const attempts = new Map<string, { count: number, lastAttempt: number }>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ipKey = String(ip);

    // Brute force protection: Check if this IP is blocked
    const now = Date.now();
    const userAttempts = attempts.get(ipKey);

    if (userAttempts && userAttempts.count >= 5 && now - userAttempts.lastAttempt < 60000) {
      return res.status(429).json({ 
        success: false, 
        message: "Too many failed attempts. Cloud node locked for 60 seconds." 
      });
    }

    // Artificial delay to prevent automated timing attacks
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === adminPassword) {
      // Success: Reset attempts
      attempts.delete(ipKey);
      return res.status(200).json({ success: true, message: "Authentication successful" });
    } else {
      // Fail: Increment attempts
      const count = (userAttempts?.count || 0) + 1;
      attempts.set(ipKey, { count, lastAttempt: now });
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
