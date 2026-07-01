import { pgTable, serial, varchar, integer, timestamp, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const adminTable = pgTable("admin", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  full_name: varchar("full_name", { length: 100 }),
  role: varchar("role", { length: 20 }).default("admin"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertAdminSchema = createInsertSchema(adminTable).omit({ id: true, created_at: true });
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof adminTable.$inferSelect;

export const detectionsTable = pgTable("detections", {
  id: serial("id").primaryKey(),
  animal_type: varchar("animal_type", { length: 50 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).default("detected"),
  detected_at: timestamp("detected_at").defaultNow().notNull(),
});

export const insertDetectionSchema = createInsertSchema(detectionsTable).omit({ id: true });
export type InsertDetection = z.infer<typeof insertDetectionSchema>;
export type Detection = typeof detectionsTable.$inferSelect;
