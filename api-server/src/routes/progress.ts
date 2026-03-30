import { Router } from "express";
import { db } from "@workspace/db";
import { userProgressTable, achievementsTable } from "@workspace/db";
import { AddXpBody, UpdateProgressBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

const DEFAULT_USER = "default";

async function ensureUser() {
  const existing = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
  if (existing.length === 0) {
    await db.insert(userProgressTable).values({
      id: DEFAULT_USER,
      xp: 0,
      level: 1,
      streak: 0,
      lastLoginDate: null,
      currentJlptLevel: "hiragana",
      completedLessons: [],
      weakPoints: [],
      dailyXpGoal: 50,
      dailyXpEarned: 0,
      totalLessonsCompleted: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
    });
  }
  const [user] = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
  return user;
}

function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

router.get("/", async (req, res) => {
  try {
    const user = await ensureUser();
    const level = xpToLevel(user.xp);
    res.json({ ...user, level });
  } catch (err) {
    req.log.error({ err }, "Failed to get progress");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/", async (req, res) => {
  try {
    const body = UpdateProgressBody.parse(req.body);
    const user = await ensureUser();
    await db.update(userProgressTable).set({ ...body, updatedAt: new Date() }).where(eq(userProgressTable.id, DEFAULT_USER));
    const updated = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
    res.json({ ...updated[0], level: xpToLevel(updated[0].xp) });
  } catch (err) {
    req.log.error({ err }, "Failed to update progress");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/xp", async (req, res) => {
  try {
    const body = AddXpBody.parse(req.body);
    const user = await ensureUser();
    const newXp = user.xp + body.amount;
    const newDailyXp = user.dailyXpEarned + body.amount;
    await db.update(userProgressTable)
      .set({ xp: newXp, dailyXpEarned: newDailyXp, updatedAt: new Date() })
      .where(eq(userProgressTable.id, DEFAULT_USER));
    const updated = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
    res.json({ ...updated[0], level: xpToLevel(updated[0].xp) });
  } catch (err) {
    req.log.error({ err }, "Failed to add XP");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/streak", async (req, res) => {
  try {
    const user = await ensureUser();
    const today = new Date().toISOString().split("T")[0];
    const lastLogin = user.lastLoginDate;

    let newStreak = user.streak;
    let bonusXp = 0;

    if (!lastLogin) {
      newStreak = 1;
    } else if (lastLogin === today) {
      // already logged in today
    } else {
      const last = new Date(lastLogin);
      const now = new Date(today);
      const diff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        newStreak = user.streak + 1;
      } else {
        newStreak = 1;
      }
    }

    // Streak bonus
    if (newStreak >= 7) bonusXp = 20;
    else if (newStreak >= 3) bonusXp = 10;

    const newXp = user.xp + bonusXp;
    await db.update(userProgressTable)
      .set({ streak: newStreak, lastLoginDate: today, xp: newXp, dailyXpEarned: 0, updatedAt: new Date() })
      .where(eq(userProgressTable.id, DEFAULT_USER));

    res.json({ streak: newStreak, lastLoginDate: today, bonusXp });
  } catch (err) {
    req.log.error({ err }, "Failed to update streak");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/achievements", async (req, res) => {
  try {
    const achievements = await db.select().from(achievementsTable).where(eq(achievementsTable.userId, DEFAULT_USER));
    res.json(achievements);
  } catch (err) {
    req.log.error({ err }, "Failed to get achievements");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
