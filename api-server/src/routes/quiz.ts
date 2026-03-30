import { Router } from "express";
import { db } from "@workspace/db";
import { userProgressTable, errorLogTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { lessonsData, kanaData } from "../data/lessons.js";
import { openai } from "@workspace/integrations-openai-ai-server";
import { randomUUID } from "crypto";

const router = Router();
const DEFAULT_USER = "default";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateOptions(correct: string, pool: string[], count = 4): string[] {
  const wrong = shuffle(pool.filter(o => o !== correct)).slice(0, count - 1);
  return shuffle([correct, ...wrong]);
}

// GET /api/quiz/:lessonId
router.get("/:lessonId", async (req, res) => {
  try {
    const lesson = lessonsData.find(l => l.id === req.params.lessonId);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    const count = parseInt(req.query.count as string || "10");
    const questions = shuffle(lesson.questions).slice(0, count);

    res.json(questions.map(q => ({
      id: q.id,
      lessonId: lesson.id,
      type: q.type,
      question: q.question,
      questionJa: q.questionJa,
      options: q.options,
      correctAnswer: q.correctAnswer,
      hint: q.hint,
      difficulty: q.difficulty,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to get quiz");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/quiz/hiragana-game
router.get("/hiragana-game", async (req, res) => {
  // This is handled by router mounting order — it needs to be first
  res.json([]);
});

// POST /api/quiz/answer
router.post("/answer", async (req, res) => {
  try {
    const { questionId, lessonId, answer, timeSpentMs } = req.body;

    const lesson = lessonsData.find(l => l.id === lessonId);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    const question = lesson.questions.find(q => q.id === questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const isCorrect = answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
    const xpGained = isCorrect ? (question.difficulty * 5) : 0;

    // Update stats
    const [user] = await db.select().from(userProgressTable).where(eq(userProgressTable.id, DEFAULT_USER)).limit(1);
    if (user) {
      await db.update(userProgressTable).set({
        totalQuestionsAnswered: user.totalQuestionsAnswered + 1,
        totalCorrectAnswers: user.totalCorrectAnswers + (isCorrect ? 1 : 0),
        xp: user.xp + xpGained,
        updatedAt: new Date(),
      }).where(eq(userProgressTable.id, DEFAULT_USER));
    }

    // Log error for analysis
    if (!isCorrect) {
      await db.insert(errorLogTable).values({
        id: randomUUID(),
        userId: DEFAULT_USER,
        questionId,
        lessonId,
        question: question.question,
        userAnswer: answer,
        correctAnswer: question.correctAnswer,
        errorType: "answer",
      }).onConflictDoNothing();
    }

    // Generate AI feedback
    let feedback = "";
    let memoryTip = "";
    let reinforcementQuestion = null;

    try {
      const systemPrompt = `你係一個日文老師，用廣東話同學生溝通。你嘅任務係對學生嘅答案提供簡短、有用嘅反饋。
回應要：
1. 簡潔（唔超過3-4句）
2. 用廣東話
3. 如果答啱：讚佢 + 簡單解釋點解啱
4. 如果答錯：解釋錯誤原因 + 提供記憶方法
5. 親切鼓勵嘅語氣`;

      const userMsg = `題目：${question.question}
學生答案：${answer}
正確答案：${question.correctAnswer}
答${isCorrect ? "啱" : "錯"}咗

請提供${isCorrect ? "正面嘅" : "有建設性嘅"}反饋。`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        max_completion_tokens: 300,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMsg },
        ],
      });

      feedback = response.choices[0]?.message?.content || "";

      // Generate memory tip if wrong
      if (!isCorrect) {
        const tipResponse = await openai.chat.completions.create({
          model: "gpt-5.2",
          max_completion_tokens: 150,
          messages: [
            { role: "system", content: "你係一個日文老師。提供一個簡短、有創意嘅記憶方法（廣東話），唔超過2句。" },
            { role: "user", content: `點樣記住「${question.correctAnswer}」係「${question.question}」嘅答案？` },
          ],
        });
        memoryTip = tipResponse.choices[0]?.message?.content || "";
      }
    } catch (aiErr) {
      feedback = isCorrect
        ? `✅ 答啱喇！正確答案係「${question.correctAnswer}」。`
        : `❌ 答錯了。正確答案係「${question.correctAnswer}」。請再試一次！`;
    }

    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      errorType: isCorrect ? "none" : "answer",
      feedback,
      memoryTip: memoryTip || undefined,
      reinforcementQuestion: reinforcementQuestion || undefined,
      xpGained,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit answer");
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as quizRouter };
export default router;
