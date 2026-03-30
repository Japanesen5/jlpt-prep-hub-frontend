import { Router } from "express";
import { db } from "@workspace/db";
import { userProgressTable, achievementsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { lessonsData } from "../data/lessons.js";
import { randomUUID } from "crypto";

const router = Router();
const DEFAULT_USER = "default";

function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

// GET /api/lessons
router.get("/", async (req, res) => {
  try {
    const level = req.query.level as string | undefined;
    const type = req.query.type as string | undefined;

    let [user] = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
    const completedLessons: string[] = (user?.completedLessons as string[]) || [];

    let filtered = lessonsData;
    if (level) filtered = filtered.filter(l => l.level === level);
    if (type) filtered = filtered.filter(l => l.type === type);

    // Sort by order
    filtered = filtered.sort((a, b) => a.order - b.order);

    const result = filtered.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      titleJa: lesson.titleJa,
      level: lesson.level,
      type: lesson.type,
      chapter: lesson.chapter,
      description: lesson.description,
      isCompleted: completedLessons.includes(lesson.id),
      isLocked: false,
      xpReward: lesson.xpReward,
      estimatedMinutes: lesson.estimatedMinutes,
      order: lesson.order,
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to get lessons");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/lessons/:id
router.get("/:id", async (req, res) => {
  try {
    const lesson = lessonsData.find(l => l.id === req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.json({
      id: lesson.id,
      title: lesson.title,
      titleJa: lesson.titleJa,
      level: lesson.level,
      type: lesson.type,
      chapter: lesson.chapter,
      description: lesson.description,
      xpReward: lesson.xpReward,
      content: lesson.content,
      examples: lesson.examples,
      vocabulary: lesson.vocabulary,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get lesson");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/lessons/:id/complete
router.post("/:id/complete", async (req, res) => {
  try {
    const lesson = lessonsData.find(l => l.id === req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    const { score = 1, timeSpentSeconds = 0 } = req.body;

    let [user] = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
    if (!user) {
      await db.insert(userProgressTable).values({ id: DEFAULT_USER });
      [user] = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
    }

    const completedLessons: string[] = (user.completedLessons as string[]) || [];
    const isNewCompletion = !completedLessons.includes(lesson.id);

    const xpGained = isNewCompletion ? Math.round(lesson.xpReward * score) : Math.round(lesson.xpReward * score * 0.3);
    const newXp = user.xp + xpGained;
    const newLevel = xpToLevel(newXp);
    const oldLevel = xpToLevel(user.xp);

    const newCompletedLessons = isNewCompletion ? [...completedLessons, lesson.id] : completedLessons;

    await db.update(userProgressTable).set({
      xp: newXp,
      level: newLevel,
      completedLessons: newCompletedLessons,
      totalLessonsCompleted: user.totalLessonsCompleted + (isNewCompletion ? 1 : 0),
      dailyXpEarned: user.dailyXpEarned + xpGained,
      updatedAt: new Date(),
    }).where(eq(userProgressTable.id, DEFAULT_USER));

    // Check for achievements
    const newAchievements = [];
    const updatedCompleted = newCompletedLessons;
    const existing = await db.select().from(achievementsTable).where(eq(achievementsTable.userId, DEFAULT_USER));
    const existingIds = existing.map(a => a.id);

    const achievementChecks = [
      { id: "first-lesson", title: "第一步", description: "完成第一課", icon: "🌟", xpReward: 10, condition: updatedCompleted.length >= 1 },
      { id: "five-lessons", title: "學習達人", description: "完成5堂課", icon: "📚", xpReward: 30, condition: updatedCompleted.length >= 5 },
      { id: "hiragana-master", title: "平假名達人", description: "完成所有平假名課程", icon: "あ", xpReward: 50, condition: updatedCompleted.filter(id => id.startsWith("hiragana")).length >= 4 },
      { id: "n5-starter", title: "N5入門", description: "開始N5學習", icon: "🇯🇵", xpReward: 25, condition: updatedCompleted.some(id => id.startsWith("n5")) },
    ];

    for (const check of achievementChecks) {
      if (check.condition && !existingIds.includes(check.id)) {
        await db.insert(achievementsTable).values({
          id: check.id,
          userId: DEFAULT_USER,
          title: check.title,
          description: check.description,
          icon: check.icon,
          xpReward: check.xpReward,
        });
        newAchievements.push({ id: check.id, title: check.title, description: check.description, icon: check.icon, xpReward: check.xpReward });
        // Add XP for achievements
        await db.update(userProgressTable).set({ xp: newXp + check.xpReward }).where(eq(userProgressTable.id, DEFAULT_USER));
      }
    }

    res.json({
      xpGained,
      newLevel,
      newAchievements,
      streakBonus: 0,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to complete lesson");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
