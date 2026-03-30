import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const SENSEI_SYSTEM_PROMPT = `你係一個專業日文老師，名叫「先生」。你嘅學生係香港人，所以你用廣東話同佢哋溝通。

你嘅教學風格：
- 用廣東話解釋（Traditional Chinese）
- 親切、耐心、鼓勵嘅語氣
- 用簡單易明嘅例子
- 解釋文法點係錯，點樣記住
- 每次回答都帶有溫暖同支持
- 如有需要，提供日文例句（包括假名讀法）

當學生問文法問題時：
1. 簡單解釋文法規則
2. 提供2-3個例句
3. 解釋常見錯誤
4. 提供記憶技巧

當學生問詞彙時：
1. 解釋意思
2. 提供例句
3. 解釋使用場景

請用廣東話回答，日文用括號標示讀音。`;

// POST /api/ai/chat (SSE streaming)
router.post("/chat", async (req, res) => {
  try {
    const { message, context, conversationHistory = [] } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const messages: Array<{ role: "user" | "assistant" | "system"; content: string }> = [
      { role: "system", content: SENSEI_SYSTEM_PROMPT },
    ];

    if (context) {
      messages.push({ role: "system", content: `當前學習情境：${context}` });
    }

    // Add conversation history
    for (const msg of (conversationHistory as Array<{ role: string; content: string }>).slice(-10)) {
      if (msg.role === "user" || msg.role === "assistant") {
        messages.push({ role: msg.role as "user" | "assistant", content: msg.content });
      }
    }

    messages.push({ role: "user", content: message });

    const stream = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 1000,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "Failed to chat with AI");
    res.write(`data: ${JSON.stringify({ error: "AI老師而家唔得閒，請稍後再試！" })}\n\n`);
    res.end();
  }
});

// POST /api/ai/analyze-errors
router.post("/analyze-errors", async (req, res) => {
  try {
    const { errorLog } = req.body;

    if (!errorLog || errorLog.length === 0) {
      return res.json({
        weakAreas: [],
        recommendations: ["繼續保持！你冇犯咩錯誤。"],
        insights: "你表現得好好！繼續努力！",
        suggestedLessons: [],
      });
    }

    const errorSummary = errorLog.map((e: any) => `題目：${e.question} | 你答：${e.userAnswer} | 正確：${e.correctAnswer}`).join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 600,
      messages: [
        { role: "system", content: "你係一個日文老師。分析學生嘅錯題，用廣東話提供分析。以JSON格式回應。" },
        {
          role: "user", content: `請分析以下錯題並以JSON格式回應：
${errorSummary}

JSON格式（唔好加markdown）：
{
  "weakAreas": ["弱點1", "弱點2"],
  "recommendations": ["建議1", "建議2"],
  "insights": "整體分析（廣東話）",
  "suggestedLessons": ["建議課程ID1", "建議課程ID2"]
}`
        },
      ],
    });

    const content = response.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
    res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "Failed to analyze errors");
    res.json({
      weakAreas: ["需要更多練習"],
      recommendations: ["繼續努力，多做練習"],
      insights: "AI分析暫時唔可用，請稍後再試。",
      suggestedLessons: [],
    });
  }
});

// POST /api/ai/sentence-check
router.post("/sentence-check", async (req, res) => {
  try {
    const { sentence, targetLevel } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 800,
      messages: [
        {
          role: "system",
          content: `你係一個日文老師。學生寫咗一句日文，你需要評估同改正。用廣東話解釋。以JSON格式回應。
JSON格式（唔好加markdown）：
{
  "score": 0-100嘅分數,
  "isCorrect": true/false,
  "corrections": [{"original": "錯嘅部分", "corrected": "改正後", "explanation": "廣東話解釋", "errorType": "grammar/vocabulary/particle/conjugation/spelling/other"}],
  "correctedSentence": "完整改正後嘅句子",
  "feedback": "廣東話整體反饋",
  "naturalAlternative": "更自然嘅表達方式（如適用）"
}`
        },
        {
          role: "user",
          content: `學生（${targetLevel}水平）寫嘅日文句子：「${sentence}」\n請評估同改正。`
        },
      ],
    });

    const content = response.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
    res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "Failed to check sentence");
    res.status(500).json({ error: "AI檢查暫時唔可用" });
  }
});

// POST /api/ai/explain
router.post("/explain", async (req, res) => {
  try {
    const { concept, level, language = "cantonese" } = req.body;

    const langInstruction = language === "cantonese" ? "用廣東話解釋" : "Explain in English";

    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 800,
      messages: [
        {
          role: "system",
          content: `你係一個日文老師。${langInstruction}。以JSON格式回應。
JSON格式（唔好加markdown）：
{
  "concept": "概念名稱",
  "explanation": "詳細解釋",
  "examples": [{"japanese": "日文例句", "reading": "讀音", "cantonese": "廣東話翻譯", "english": "英文翻譯"}],
  "memoryTip": "記憶技巧",
  "commonMistakes": ["常見錯誤1", "常見錯誤2"]
}`
        },
        {
          role: "user",
          content: `${level}水平學生問：「${concept}」係咩意思/點用？`
        },
      ],
    });

    const content = response.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
    res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "Failed to explain concept");
    res.status(500).json({ error: "AI解釋暫時唔可用" });
  }
});

export default router;
