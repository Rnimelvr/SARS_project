import { Router, type Request } from "express";
import { db, adminTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

interface SarsSession {
  userId?: number;
  username?: string;
  fullName?: string;
  role?: string;
  destroy(cb: (err: unknown) => void): void;
}

type SarsRequest = Request & { session: SarsSession };

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const [admin] = await db
      .select()
      .from(adminTable)
      .where(eq(adminTable.username, username))
      .limit(1);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    (req as any).session.userId = admin.id;
    (req as any).session.username = admin.username;
    (req as any).session.fullName = admin.full_name ?? admin.username;
    (req as any).session.role = admin.role ?? "admin";

    return res.json({
      success: true,
      username: admin.username,
      full_name: admin.full_name ?? admin.username,
    });
  } catch (err) {
    logger.error({ err }, "Login error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/logout", (req, res) => {
  (req as any).session.destroy((err: unknown) => {
    if (err) {
      logger.error({ err }, "Logout error");
    }
  });
  return res.json({ success: true, message: "Logged out successfully" });
});

router.get("/auth/me", (req, res) => {
  const session = (req as any).session;
  if (!session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  return res.json({
    username: session.username,
    full_name: session.fullName,
    role: session.role,
  });
});

export default router;
