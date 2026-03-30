import { Router } from "express";
import { kanaData } from "../data/lessons.js";
import { randomUUID } from "crypto";

const router = Router();

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// GET /api/quiz/hiragana-game
router.get("/", async (req, res) => {
  try {
    const type = (req.query.type as string) || "hiragana";
    const count = parseInt(req.query.count as string || "20");

    let pool: typeof kanaData.hiragana = [];
    if (type === "hiragana") pool = kanaData.hiragana;
    else if (type === "katakana") pool = kanaData.katakana;
    else pool = [...kanaData.hiragana, ...kanaData.katakana];

    const allRomaji = [...new Set(pool.map(k => k.romaji))];
    const selected = shuffle(pool).slice(0, count);

    const questions = selected.map(item => {
      const wrong = shuffle(allRomaji.filter(r => r !== item.romaji)).slice(0, 3);
      const options = shuffle([item.romaji, ...wrong]);
      return {
        id: randomUUID(),
        kana: item.kana,
        type: type === "both" ? (kanaData.hiragana.some(k => k.kana === item.kana) ? "hiragana" : "katakana") : type,
        options,
        correctAnswer: item.romaji,
      };
    });

    res.json(questions);
  } catch (err) {
    req.log.error({ err }, "Failed to get hiragana game");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
