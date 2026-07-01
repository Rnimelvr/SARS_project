import { Router } from "express";
import { db, detectionsTable } from "@workspace/db";
import { desc, sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

router.get("/dashboard/status", async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(detectionsTable)
      .where(sql`detected_at >= ${todayStart}`);

    const recentDetections = await db
      .select()
      .from(detectionsTable)
      .orderBy(desc(detectionsTable.detected_at))
      .limit(5);

    return res.json({
      system_status: "AKTIF",
      cases_today: countResult?.count ?? 0,
      recent_detections: recentDetections.map((d) => ({
        id: d.id,
        animal_type: d.animal_type,
        location: d.location,
        status: d.status,
        detected_at: d.detected_at.toISOString(),
      })),
    });
  } catch (err) {
    logger.error({ err }, "Dashboard status error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
