import { Router } from "express";
import { db, detectionsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

router.get("/statistics", async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [totalResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(detectionsTable);

    const [todayResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(detectionsTable)
      .where(sql`detected_at >= ${todayStart}`);

    const breakdownResults = await db
      .select({
        animal_type: detectionsTable.animal_type,
        total: sql<number>`count(*)::int`,
      })
      .from(detectionsTable)
      .groupBy(detectionsTable.animal_type);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const trendResults = await db
      .select({
        date: sql<string>`TO_CHAR(DATE(detected_at), 'DD/MM')`,
        total: sql<number>`count(*)::int`,
      })
      .from(detectionsTable)
      .where(sql`detected_at >= ${sevenDaysAgo}`)
      .groupBy(sql`DATE(detected_at)`)
      .orderBy(sql`DATE(detected_at)`);

    const casesToday = todayResult?.count ?? 0;
    let alertLevel: string;
    if (casesToday >= 5) {
      alertLevel = "Bahaya";
    } else if (casesToday >= 2) {
      alertLevel = "Sederhana";
    } else {
      alertLevel = "Selamat";
    }

    return res.json({
      total_cases: totalResult?.count ?? 0,
      cases_today: casesToday,
      alert_level: alertLevel,
      breakdown: breakdownResults,
      weekly_trend: trendResults,
    });
  } catch (err) {
    logger.error({ err }, "Statistics error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
