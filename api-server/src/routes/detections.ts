import { Router } from "express";
import { db, detectionsTable } from "@workspace/db";
import { eq, desc, and, sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

router.get("/detections", async (req, res) => {
  const { animal_type, date, status } = req.query as Record<string, string>;

  try {
    const conditions = [];

    if (animal_type) {
      conditions.push(eq(detectionsTable.animal_type, animal_type));
    }
    if (status) {
      conditions.push(eq(detectionsTable.status, status));
    }
    if (date) {
      conditions.push(sql`DATE(detected_at) = ${date}`);
    }

    const results = await db
      .select()
      .from(detectionsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(detectionsTable.detected_at));

    return res.json(
      results.map((d) => ({
        id: d.id,
        animal_type: d.animal_type,
        location: d.location,
        status: d.status,
        detected_at: d.detected_at.toISOString(),
      }))
    );
  } catch (err) {
    logger.error({ err }, "Get detections error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/detections", async (req, res) => {
  const { animal_type, location, status, detected_at } = req.body;

  if (!animal_type || !location) {
    return res.status(400).json({ error: "animal_type and location are required" });
  }

  try {
    const [created] = await db
      .insert(detectionsTable)
      .values({
        animal_type,
        location,
        status: status ?? "detected",
        detected_at: detected_at ? new Date(detected_at) : new Date(),
      })
      .returning();

    return res.status(201).json({
      id: created.id,
      animal_type: created.animal_type,
      location: created.location,
      status: created.status,
      detected_at: created.detected_at.toISOString(),
    });
  } catch (err) {
    logger.error({ err }, "Create detection error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
