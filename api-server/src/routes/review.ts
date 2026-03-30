import { Router } from "express";
import { db } from "@workspace/db";
import { reviewItemsTable } from "@workspace/db";
import { eq, lte } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();
const DEFAULT_USER = "default";

// SM-2 spaced repetition algorithm
function calculateNextReview(quality: number, repetitions: number, easeFactor: number, interval: number) {
  let newInterval: number;
  let newEaseFactor: number;
  let newRepetitions: number;

  if (quality >= 3) {
    if (repetitions === 0) newInterval = 1;
    else if (repetitions === 1) newInterval = 6;
    else newInterval = Math.round(interval * easeFactor);
    newRepetitions = repetitions + 1;
  } else {
    newInterval = 1;
    newRepetitions = 0;
  }

  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);

  return {
    interval: newInterval,
    easeFactor: newEaseFactor,
    repetitions: newRepetitions,
    nextReviewDate: nextDate.toISOString().split("T")[0],
  };
}

// GET /api/review
router.get("/", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const items = await db.select().from(reviewItemsTable)
      .where(eq(reviewItemsTable.userId, DEFAULT_USER));

    const due = items.filter(item => item.nextReviewDate <= today);
    res.json(due);
  } catch (err) {
    req.log.error({ err }, "Failed to get review items");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/review/schedule
router.post("/schedule", async (req, res) => {
  try {
    const { questionId, lessonId, quality } = req.body;

    // Find existing item
    const existing = await db.select().from(reviewItemsTable)
      .where(eq(reviewItemsTable.questionId, questionId))
      .limit(1);

    if (existing.length > 0) {
      const item = existing[0];
      const next = calculateNextReview(quality, item.repetitions, item.easeFactor, item.interval);
      await db.update(reviewItemsTable).set({
        ...next,
        updatedAt: new Date(),
      }).where(eq(reviewItemsTable.id, item.id));
      const [updated] = await db.select().from(reviewItemsTable).where(eq(reviewItemsTable.id, item.id)).limit(1);
      res.json(updated);
    } else {
      const next = calculateNextReview(quality, 0, 2.5, 1);
      const id = randomUUID();
      await db.insert(reviewItemsTable).values({
        id,
        userId: DEFAULT_USER,
        questionId,
        lessonId,
        question: req.body.question || questionId,
        correctAnswer: req.body.correctAnswer || "",
        ...next,
      });
      const [created] = await db.select().from(reviewItemsTable).where(eq(reviewItemsTable.id, id)).limit(1);
      res.json(created);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to schedule review");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
