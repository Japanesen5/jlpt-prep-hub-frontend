export interface LessonData {
  id: string;
  title: string;
  titleJa: string;
  level: string;
  type: string;
  chapter: number;
  description: string;
  xpReward: number;
  estimatedMinutes: number;
  order: number;
  content: {
    explanation: string;
    explanationCanto: string;
    structure?: string;
    notes?: string;
    memoryTip?: string;
  };
  examples: Array<{
    japanese: string;
    reading: string;
    cantonese: string;
    english: string;
  }>;
  vocabulary: Array<{
    word: string;
    reading: string;
    meaning: string;
    meaningCanto: string;
    partOfSpeech?: string;
    example?: string;
  }>;
  questions: Array<{
    id: string;
    type: "multiple-choice" | "fill-blank" | "translation" | "kana-match";
    question: string;
    questionJa?: string;
    options?: string[];
    correctAnswer: string;
    hint?: string;
    difficulty: number;
  }>;
}

export const lessonsData: LessonData[] = [
  // ===== HIRAGANA =====
  {
    id: "hiragana-1",
    title: "平假名：あ行",
    titleJa: "ひらがな：あ行",
    level: "hiragana",
    type: "grammar",
    chapter: 1,
    description: "學習平假名 あ、い、う、え、お",
    xpReward: 20,
    estimatedMinutes: 10,
    order: 1,
    content: {
      explanation: "Hiragana is one of the Japanese syllabaries, with 46 basic characters.",
      explanationCanto: "平假名係日文嘅其中一種音節文字，共有46個基本字符。我哋由あ行開始，即係 あ（a）、い（i）、う（u）、え（e）、お（o）。記住佢哋係學日文嘅第一步！",
      structure: "あ(a) い(i) う(u) え(e) お(o)",
      memoryTip: "あ就好似英文A，い就好似英文e嘅形狀，う係U字形，え係 e 嘅變體，お係o加撇",
    },
    examples: [
      { japanese: "あお", reading: "あお", cantonese: "藍色", english: "blue" },
      { japanese: "いえ", reading: "いえ", cantonese: "屋企", english: "house" },
      { japanese: "うえ", reading: "うえ", cantonese: "上面", english: "above/up" },
      { japanese: "えお", reading: "えお", cantonese: "（練習用）", english: "(practice)" },
    ],
    vocabulary: [
      { word: "あお", reading: "あお", meaning: "blue", meaningCanto: "藍色", partOfSpeech: "noun" },
      { word: "あい", reading: "あい", meaning: "love", meaningCanto: "愛", partOfSpeech: "noun" },
      { word: "いえ", reading: "いえ", meaning: "house/home", meaningCanto: "屋企/家", partOfSpeech: "noun" },
      { word: "うえ", reading: "うえ", meaning: "above/top", meaningCanto: "上面", partOfSpeech: "noun" },
    ],
    questions: [
      { id: "h1-q1", type: "multiple-choice", question: "「あ」係咩讀音？", options: ["a", "i", "u", "e"], correctAnswer: "a", difficulty: 1 },
      { id: "h1-q2", type: "multiple-choice", question: "「い」係咩讀音？", options: ["a", "i", "u", "e"], correctAnswer: "i", difficulty: 1 },
      { id: "h1-q3", type: "multiple-choice", question: "「う」係咩讀音？", options: ["a", "e", "u", "o"], correctAnswer: "u", difficulty: 1 },
      { id: "h1-q4", type: "multiple-choice", question: "「え」係咩讀音？", options: ["a", "i", "e", "o"], correctAnswer: "e", difficulty: 1 },
      { id: "h1-q5", type: "multiple-choice", question: "「お」係咩讀音？", options: ["a", "i", "u", "o"], correctAnswer: "o", difficulty: 1 },
      { id: "h1-q6", type: "multiple-choice", question: "「a」對應邊個平假名？", options: ["あ", "い", "う", "え"], correctAnswer: "あ", difficulty: 1 },
      { id: "h1-q7", type: "multiple-choice", question: "「いえ」係咩意思？", options: ["愛", "屋企", "藍色", "上面"], correctAnswer: "屋企", difficulty: 2 },
    ],
  },
  {
    id: "hiragana-2",
    title: "平假名：か行",
    titleJa: "ひらがな：か行",
    level: "hiragana",
    type: "grammar",
    chapter: 1,
    description: "學習平假名 か、き、く、け、こ",
    xpReward: 20,
    estimatedMinutes: 10,
    order: 2,
    content: {
      explanation: "Ka row: ka, ki, ku, ke, ko",
      explanationCanto: "か行係 か（ka）、き（ki）、く（ku）、け（ke）、こ（ko）。呢行字喺日常用語好常見，例如「かわいい」（可愛）、「こんにちは」（你好）都用到！",
      structure: "か(ka) き(ki) く(ku) け(ke) こ(ko)",
      memoryTip: "か就好似中文「加」的右半部，き有兩橫一直，く就係個「<」號，け係「け」字，こ係兩條橫線",
    },
    examples: [
      { japanese: "かさ", reading: "かさ", cantonese: "雨傘", english: "umbrella" },
      { japanese: "き", reading: "き", cantonese: "樹木", english: "tree" },
      { japanese: "くも", reading: "くも", cantonese: "雲", english: "cloud" },
      { japanese: "こい", reading: "こい", cantonese: "愛情", english: "love/romantic feeling" },
    ],
    vocabulary: [
      { word: "かさ", reading: "かさ", meaning: "umbrella", meaningCanto: "雨傘", partOfSpeech: "noun" },
      { word: "き", reading: "き", meaning: "tree", meaningCanto: "樹木", partOfSpeech: "noun" },
      { word: "くも", reading: "くも", meaning: "cloud", meaningCanto: "雲", partOfSpeech: "noun" },
      { word: "こ", reading: "こ", meaning: "child", meaningCanto: "小孩", partOfSpeech: "noun" },
    ],
    questions: [
      { id: "h2-q1", type: "multiple-choice", question: "「か」係咩讀音？", options: ["ka", "ki", "ku", "ke"], correctAnswer: "ka", difficulty: 1 },
      { id: "h2-q2", type: "multiple-choice", question: "「き」係咩讀音？", options: ["ka", "ki", "ku", "ke"], correctAnswer: "ki", difficulty: 1 },
      { id: "h2-q3", type: "multiple-choice", question: "「く」係咩讀音？", options: ["ka", "ku", "ke", "ko"], correctAnswer: "ku", difficulty: 1 },
      { id: "h2-q4", type: "multiple-choice", question: "「かさ」係咩意思？", options: ["雲", "雨傘", "樹木", "小孩"], correctAnswer: "雨傘", difficulty: 2 },
      { id: "h2-q5", type: "multiple-choice", question: "「ko」對應邊個平假名？", options: ["か", "き", "く", "こ"], correctAnswer: "こ", difficulty: 1 },
    ],
  },
  {
    id: "hiragana-3",
    title: "平假名：さ、た、な行",
    titleJa: "ひらがな：さ、た、な行",
    level: "hiragana",
    type: "grammar",
    chapter: 1,
    description: "學習平假名 さ行、た行、な行",
    xpReward: 25,
    estimatedMinutes: 15,
    order: 3,
    content: {
      explanation: "Sa, Ta, Na rows of hiragana",
      explanationCanto: "今次學三行！さ行（sa/si/su/se/so）、た行（ta/chi/tsu/te/to）、な行（na/ni/nu/ne/no）。注意た行有啲特別：ち讀 chi，つ讀 tsu！",
      structure: "さ(sa) し(shi) す(su) せ(se) そ(so) | た(ta) ち(chi) つ(tsu) て(te) と(to) | な(na) に(ni) ぬ(nu) ね(ne) の(no)",
      memoryTip: "し就好似英文S，つ就好似波浪加點，ち好似數字7，の係の字圈圈",
    },
    examples: [
      { japanese: "さかな", reading: "さかな", cantonese: "魚", english: "fish" },
      { japanese: "たべる", reading: "たべる", cantonese: "食嘢", english: "to eat" },
      { japanese: "なに", reading: "なに", cantonese: "咩嘢", english: "what" },
      { japanese: "のみもの", reading: "のみもの", cantonese: "飲品", english: "drink/beverage" },
    ],
    vocabulary: [
      { word: "さかな", reading: "さかな", meaning: "fish", meaningCanto: "魚", partOfSpeech: "noun" },
      { word: "たべる", reading: "たべる", meaning: "to eat", meaningCanto: "食嘢", partOfSpeech: "verb" },
      { word: "なに", reading: "なに", meaning: "what", meaningCanto: "咩嘢", partOfSpeech: "pronoun" },
      { word: "のむ", reading: "のむ", meaning: "to drink", meaningCanto: "飲", partOfSpeech: "verb" },
    ],
    questions: [
      { id: "h3-q1", type: "multiple-choice", question: "「し」讀咩音？", options: ["sa", "shi", "su", "se"], correctAnswer: "shi", difficulty: 1 },
      { id: "h3-q2", type: "multiple-choice", question: "「ち」讀咩音？", options: ["ta", "chi", "tsu", "te"], correctAnswer: "chi", difficulty: 1 },
      { id: "h3-q3", type: "multiple-choice", question: "「つ」讀咩音？", options: ["ta", "chi", "tsu", "to"], correctAnswer: "tsu", difficulty: 1 },
      { id: "h3-q4", type: "multiple-choice", question: "「さかな」係咩意思？", options: ["食嘢", "飲品", "魚", "咩嘢"], correctAnswer: "魚", difficulty: 2 },
      { id: "h3-q5", type: "multiple-choice", question: "「の」讀咩音？", options: ["na", "ni", "ne", "no"], correctAnswer: "no", difficulty: 1 },
    ],
  },
  {
    id: "hiragana-4",
    title: "平假名：は、ま、や、ら、わ行",
    titleJa: "ひらがな：は〜わ行",
    level: "hiragana",
    type: "grammar",
    chapter: 1,
    description: "學習剩餘平假名行，完成平假名！",
    xpReward: 30,
    estimatedMinutes: 15,
    order: 4,
    content: {
      explanation: "Remaining hiragana rows: Ha, Ma, Ya, Ra, Wa, N",
      explanationCanto: "最後幾行！は行、ま行、や行、ら行、わ行、同埋單獨個「ん」。學完呢課你就識晒全部平假名啦！特別注意：は作助詞時讀「wa」，へ作助詞時讀「e」",
      structure: "は(ha) ひ(hi) ふ(fu) へ(he) ほ(ho) | ま(ma) み(mi) む(mu) め(me) も(mo) | や(ya) ゆ(yu) よ(yo) | ら(ra) り(ri) る(ru) れ(re) ろ(ro) | わ(wa) を(wo) | ん(n)",
      memoryTip: "ふ讀fu唔係hu，ら行係L音唔係R音，ん係收結尾音n",
    },
    examples: [
      { japanese: "はな", reading: "はな", cantonese: "花", english: "flower" },
      { japanese: "みず", reading: "みず", cantonese: "水", english: "water" },
      { japanese: "やま", reading: "やま", cantonese: "山", english: "mountain" },
      { japanese: "わたし", reading: "わたし", cantonese: "我", english: "I/me" },
    ],
    vocabulary: [
      { word: "はな", reading: "はな", meaning: "flower/nose", meaningCanto: "花/鼻", partOfSpeech: "noun" },
      { word: "みず", reading: "みず", meaning: "water", meaningCanto: "水", partOfSpeech: "noun" },
      { word: "やま", reading: "やま", meaning: "mountain", meaningCanto: "山", partOfSpeech: "noun" },
      { word: "わたし", reading: "わたし", meaning: "I/me", meaningCanto: "我", partOfSpeech: "pronoun" },
    ],
    questions: [
      { id: "h4-q1", type: "multiple-choice", question: "「ふ」讀咩音？", options: ["ha", "hi", "fu", "ho"], correctAnswer: "fu", difficulty: 1 },
      { id: "h4-q2", type: "multiple-choice", question: "「ん」係咩意思？", options: ["ya", "yu", "yo", "n"], correctAnswer: "n", difficulty: 1 },
      { id: "h4-q3", type: "multiple-choice", question: "「わたし」係咩意思？", options: ["山", "花", "水", "我"], correctAnswer: "我", difficulty: 2 },
      { id: "h4-q4", type: "multiple-choice", question: "「みず」係咩意思？", options: ["花", "水", "山", "我"], correctAnswer: "水", difficulty: 2 },
      { id: "h4-q5", type: "multiple-choice", question: "「ら」係咩讀音？", options: ["ya", "yu", "ra", "wa"], correctAnswer: "ra", difficulty: 1 },
    ],
  },

  // ===== KATAKANA =====
  {
    id: "katakana-1",
    title: "片假名基礎",
    titleJa: "カタカナ基礎",
    level: "katakana",
    type: "grammar",
    chapter: 2,
    description: "學習片假名ア行到カ行",
    xpReward: 25,
    estimatedMinutes: 12,
    order: 5,
    content: {
      explanation: "Katakana is used for foreign words and loan words.",
      explanationCanto: "片假名主要用嚟寫外來語（外文借字）、外國人名地名，同埋強調某啲字。每個平假名都有對應嘅片假名！ア行：ア(a) イ(i) ウ(u) エ(e) オ(o)，カ行：カ(ka) キ(ki) ク(ku) ケ(ke) コ(ko)",
      structure: "ア(a) イ(i) ウ(u) エ(e) オ(o) | カ(ka) キ(ki) ク(ku) ケ(ke) コ(ko)",
      memoryTip: "片假名通常筆畫比較直同硬，好似外來語咁「外」",
    },
    examples: [
      { japanese: "アイスクリーム", reading: "アイスクリーム", cantonese: "雪糕", english: "ice cream" },
      { japanese: "コーヒー", reading: "コーヒー", cantonese: "咖啡", english: "coffee" },
      { japanese: "カメラ", reading: "カメラ", cantonese: "相機", english: "camera" },
      { japanese: "エアコン", reading: "エアコン", cantonese: "冷氣機", english: "air conditioner" },
    ],
    vocabulary: [
      { word: "コーヒー", reading: "コーヒー", meaning: "coffee", meaningCanto: "咖啡", partOfSpeech: "noun" },
      { word: "カメラ", reading: "カメラ", meaning: "camera", meaningCanto: "相機", partOfSpeech: "noun" },
      { word: "アイスクリーム", reading: "アイスクリーム", meaning: "ice cream", meaningCanto: "雪糕", partOfSpeech: "noun" },
      { word: "エアコン", reading: "エアコン", meaning: "air conditioner", meaningCanto: "冷氣機", partOfSpeech: "noun" },
    ],
    questions: [
      { id: "k1-q1", type: "multiple-choice", question: "「ア」讀咩音？", options: ["a", "i", "u", "e"], correctAnswer: "a", difficulty: 1 },
      { id: "k1-q2", type: "multiple-choice", question: "「コーヒー」係咩意思？", options: ["雪糕", "相機", "咖啡", "冷氣機"], correctAnswer: "咖啡", difficulty: 2 },
      { id: "k1-q3", type: "multiple-choice", question: "「カメラ」係咩意思？", options: ["電視", "相機", "電話", "電腦"], correctAnswer: "相機", difficulty: 2 },
      { id: "k1-q4", type: "multiple-choice", question: "「ク」讀咩音？", options: ["ka", "ki", "ku", "ke"], correctAnswer: "ku", difficulty: 1 },
      { id: "k1-q5", type: "multiple-choice", question: "「ice cream」用片假名點寫？", options: ["アイスクリーム", "アイスリーム", "アスクリーム", "イスクリーム"], correctAnswer: "アイスクリーム", difficulty: 3 },
    ],
  },

  // ===== N5 =====
  {
    id: "n5-1",
    title: "N5 第1課：自我介紹",
    titleJa: "N5 第1課：自己紹介",
    level: "N5",
    type: "grammar",
    chapter: 1,
    description: "學習「〜は〜です」句型同基本自我介紹",
    xpReward: 30,
    estimatedMinutes: 15,
    order: 10,
    content: {
      explanation: "〜は〜です is the basic 'A is B' sentence pattern in Japanese.",
      explanationCanto: "「〜は〜です」係日文最基本嘅句型，意思係「〜係〜」。は係助詞，表示主語，です係禮貌語尾。\n\n例如：わたしはガオ・ミンです。（我係高明。）\n\n唔係問題，係描述！",
      structure: "[主語] は [補語] です。",
      notes: "は作助詞時讀「wa」唔係「ha」。です後面通常唔加句號係日文書寫。",
      memoryTip: "記住「は + です」就係「係」嘅意思，就好似英文 is/am/are",
    },
    examples: [
      { japanese: "わたしは学生です。", reading: "わたしはがくせいです。", cantonese: "我係學生。", english: "I am a student." },
      { japanese: "これは本です。", reading: "これはほんです。", cantonese: "呢個係書。", english: "This is a book." },
      { japanese: "田中さんは先生です。", reading: "たなかさんはせんせいです。", cantonese: "田中先生係老師。", english: "Mr. Tanaka is a teacher." },
      { japanese: "わたしは日本人ではありません。", reading: "わたしはにほんじんではありません。", cantonese: "我唔係日本人。", english: "I am not Japanese." },
    ],
    vocabulary: [
      { word: "わたし", reading: "わたし", meaning: "I/me", meaningCanto: "我", partOfSpeech: "pronoun" },
      { word: "学生", reading: "がくせい", meaning: "student", meaningCanto: "學生", partOfSpeech: "noun" },
      { word: "先生", reading: "せんせい", meaning: "teacher", meaningCanto: "老師", partOfSpeech: "noun" },
      { word: "日本人", reading: "にほんじん", meaning: "Japanese person", meaningCanto: "日本人", partOfSpeech: "noun" },
      { word: "これ", reading: "これ", meaning: "this (near speaker)", meaningCanto: "呢個", partOfSpeech: "pronoun" },
      { word: "本", reading: "ほん", meaning: "book", meaningCanto: "書", partOfSpeech: "noun" },
    ],
    questions: [
      { id: "n5-1-q1", type: "multiple-choice", question: "「わたしは＿＿です。」填咩？（我係學生）", options: ["先生", "学生", "日本人", "本"], correctAnswer: "学生", difficulty: 1 },
      { id: "n5-1-q2", type: "multiple-choice", question: "「これは本です」係咩意思？", options: ["我係學生", "呢個係書", "佢係老師", "我唔係日本人"], correctAnswer: "呢個係書", difficulty: 1 },
      { id: "n5-1-q3", type: "translation", question: "「我係老師」用日文點講？", correctAnswer: "わたしは先生です", difficulty: 2 },
      { id: "n5-1-q4", type: "multiple-choice", question: "助詞「は」作主語時讀咩音？", options: ["ha", "wa", "ba", "pa"], correctAnswer: "wa", difficulty: 2 },
      { id: "n5-1-q5", type: "multiple-choice", question: "「田中さんは先生ではありません」係咩意思？", options: ["田中先生係老師", "田中先生唔係老師", "我係老師", "我唔係老師"], correctAnswer: "田中先生唔係老師", difficulty: 2 },
    ],
  },
  {
    id: "n5-2",
    title: "N5 第2課：數字同時間",
    titleJa: "N5 第2課：数字と時間",
    level: "N5",
    type: "vocabulary",
    chapter: 1,
    description: "學習1-100數字同時間表達",
    xpReward: 30,
    estimatedMinutes: 15,
    order: 11,
    content: {
      explanation: "Japanese numbers 1-10 and time expressions",
      explanationCanto: "日文數字1-10：いち、に、さん、し（よん）、ご、ろく、しち（なな）、はち、く（きゅう）、じゅう。時間：〜時（じ）係點鐘，〜分（ふん）係分鐘。\n\n「いま何時ですか？」係「而家幾點？」",
      structure: "N時Nふん （N點N分）",
      memoryTip: "4可以讀「し」或「よん」，7可以讀「しち」或「なな」，9可以讀「く」或「きゅう」，因應情況用唔同讀法",
    },
    examples: [
      { japanese: "今、三時です。", reading: "いま、さんじです。", cantonese: "而家係3點。", english: "It's 3 o'clock now." },
      { japanese: "七時三十分に起きます。", reading: "しちじさんじゅっぷんにおきます。", cantonese: "我7點半起床。", english: "I wake up at 7:30." },
      { japanese: "学校は九時に始まります。", reading: "がっこうはくじにはじまります。", cantonese: "學校9點開始。", english: "School starts at 9 o'clock." },
    ],
    vocabulary: [
      { word: "いち", reading: "いち", meaning: "1 (one)", meaningCanto: "一", partOfSpeech: "noun" },
      { word: "に", reading: "に", meaning: "2 (two)", meaningCanto: "二", partOfSpeech: "noun" },
      { word: "さん", reading: "さん", meaning: "3 (three)", meaningCanto: "三", partOfSpeech: "noun" },
      { word: "じ", reading: "じ", meaning: "o'clock", meaningCanto: "點鐘", partOfSpeech: "suffix" },
      { word: "ふん/ぷん", reading: "ふん/ぷん", meaning: "minute(s)", meaningCanto: "分鐘", partOfSpeech: "suffix" },
      { word: "いま", reading: "いま", meaning: "now", meaningCanto: "而家", partOfSpeech: "noun" },
    ],
    questions: [
      { id: "n5-2-q1", type: "multiple-choice", question: "「さん」係數字幾多？", options: ["1", "2", "3", "4"], correctAnswer: "3", difficulty: 1 },
      { id: "n5-2-q2", type: "multiple-choice", question: "「7點鐘」日文點講？", options: ["しちじ", "はちじ", "ごじ", "ろくじ"], correctAnswer: "しちじ", difficulty: 2 },
      { id: "n5-2-q3", type: "multiple-choice", question: "「いま何時ですか」係咩意思？", options: ["而家係幾號？", "而家幾點？", "而家係星期幾？", "你叫咩名？"], correctAnswer: "而家幾點？", difficulty: 2 },
      { id: "n5-2-q4", type: "multiple-choice", question: "「じゅう」係數字幾多？", options: ["8", "9", "10", "11"], correctAnswer: "10", difficulty: 1 },
    ],
  },
  {
    id: "n5-3",
    title: "N5 第3課：助詞 が、を、に、で",
    titleJa: "N5 第3課：助詞",
    level: "N5",
    type: "grammar",
    chapter: 2,
    description: "學習最重要嘅基本助詞",
    xpReward: 40,
    estimatedMinutes: 20,
    order: 12,
    content: {
      explanation: "Core Japanese particles: が (subject marker), を (object marker), に (direction/time), で (location/means)",
      explanationCanto: "助詞係日文嘅靈魂！\n\n【が】主語標記（強調主語）\n例：猫が鳴く。（係隻貓喺叫。）\n\n【を】賓語標記（動作對象）\n例：本を読む。（讀書。）\n\n【に】方向/時間（去邊/幾時）\n例：学校に行く。（去學校。）/ 3時に来る。（3點嚟。）\n\n【で】地點/方法（喺邊/用咩）\n例：図書館で勉強する。（喺圖書館讀書。）/ バスで行く。（搭巴士去。）",
      structure: "[主語]が / [賓語]を / [地點/時間]に・で",
      notes: "は係主題標記，が係主語標記。兩個有時可以互換，但意思有微妙分別。",
      memoryTip: "を唔讀「wo」，讀「o」。に記住係指向性（去邊/幾時），で係地點/方法",
    },
    examples: [
      { japanese: "わたしは水を飲みます。", reading: "わたしはみずをのみます。", cantonese: "我飲水。", english: "I drink water." },
      { japanese: "学校に行きます。", reading: "がっこうにいきます。", cantonese: "去學校。", english: "I go to school." },
      { japanese: "図書館で本を読みます。", reading: "としょかんでほんをよみます。", cantonese: "喺圖書館讀書。", english: "I read a book at the library." },
      { japanese: "バスで来ました。", reading: "バスできました。", cantonese: "搭巴士嚟。", english: "I came by bus." },
    ],
    vocabulary: [
      { word: "飲む", reading: "のむ", meaning: "to drink", meaningCanto: "飲", partOfSpeech: "verb" },
      { word: "行く", reading: "いく", meaning: "to go", meaningCanto: "去", partOfSpeech: "verb" },
      { word: "読む", reading: "よむ", meaning: "to read", meaningCanto: "讀", partOfSpeech: "verb" },
      { word: "図書館", reading: "としょかん", meaning: "library", meaningCanto: "圖書館", partOfSpeech: "noun" },
    ],
    questions: [
      { id: "n5-3-q1", type: "multiple-choice", question: "「わたしは本＿読みます。」填咩助詞？", options: ["が", "を", "に", "で"], correctAnswer: "を", difficulty: 2 },
      { id: "n5-3-q2", type: "multiple-choice", question: "「図書館＿勉強します。」填咩助詞？（喺圖書館讀書）", options: ["が", "を", "に", "で"], correctAnswer: "で", difficulty: 2 },
      { id: "n5-3-q3", type: "multiple-choice", question: "「学校＿行きます。」填咩助詞？（去學校）", options: ["が", "を", "に", "で"], correctAnswer: "に", difficulty: 2 },
      { id: "n5-3-q4", type: "multiple-choice", question: "「を」係咩助詞？", options: ["主語標記", "賓語標記", "方向標記", "地點標記"], correctAnswer: "賓語標記", difficulty: 1 },
      { id: "n5-3-q5", type: "translation", question: "「我喺咖啡廳飲咖啡」用日文點講？", correctAnswer: "カフェでコーヒーを飲みます", difficulty: 3 },
    ],
  },
  {
    id: "n5-4",
    title: "N5 第4課：形容詞",
    titleJa: "N5 第4課：形容詞",
    level: "N5",
    type: "grammar",
    chapter: 2,
    description: "學習い形容詞同な形容詞",
    xpReward: 35,
    estimatedMinutes: 18,
    order: 13,
    content: {
      explanation: "Japanese has two types of adjectives: i-adjectives (ends in い) and na-adjectives (needs な before nouns)",
      explanationCanto: "日文有兩種形容詞：\n\n【い形容詞】詞尾係「い」\n例：おいしい（好食）、たかい（貴/高）、やすい（平）\n\n用法：おいしい料理（好食嘅食物）/ 料理はおいしいです（食物係好食嘅）\n\n【な形容詞】接名詞前要加「な」\n例：きれい（靚）、しずか（安靜）、げんき（精神）\n\n用法：きれいな人（靚人）/ 人はきれいです（人係靚嘅）",
      structure: "い形容詞 + 名詞 / な形容詞 + な + 名詞",
      notes: "きれい雖然詞尾有い但係な形容詞！要特別記住。否定：おいしい→おいしくない，きれい→きれいじゃない",
      memoryTip: "い形容詞=詞尾係い（真正係い）；な形容詞接名詞要加な",
    },
    examples: [
      { japanese: "このラーメンはおいしいです。", reading: "このラーメンはおいしいです。", cantonese: "呢碗拉麵好好食。", english: "This ramen is delicious." },
      { japanese: "あの人はきれいですね。", reading: "あのひとはきれいですね。", cantonese: "嗰個人好靚喎。", english: "That person is beautiful, isn't she." },
      { japanese: "図書館はしずかです。", reading: "としょかんはしずかです。", cantonese: "圖書館好安靜。", english: "The library is quiet." },
      { japanese: "値段が高いですね。", reading: "ねだんがたかいですね。", cantonese: "價錢好貴喎。", english: "The price is expensive, isn't it." },
    ],
    vocabulary: [
      { word: "おいしい", reading: "おいしい", meaning: "delicious", meaningCanto: "好食", partOfSpeech: "i-adj" },
      { word: "たかい", reading: "たかい", meaning: "expensive/tall", meaningCanto: "貴/高", partOfSpeech: "i-adj" },
      { word: "やすい", reading: "やすい", meaning: "cheap/inexpensive", meaningCanto: "平/便宜", partOfSpeech: "i-adj" },
      { word: "きれい", reading: "きれい", meaning: "beautiful/clean", meaningCanto: "靚/乾淨", partOfSpeech: "na-adj" },
      { word: "しずか", reading: "しずか", meaning: "quiet", meaningCanto: "安靜", partOfSpeech: "na-adj" },
      { word: "げんき", reading: "げんき", meaning: "healthy/energetic", meaningCanto: "精神/健康", partOfSpeech: "na-adj" },
    ],
    questions: [
      { id: "n5-4-q1", type: "multiple-choice", question: "「おいしい」係哪種形容詞？", options: ["い形容詞", "な形容詞", "兩者都係", "兩者都唔係"], correctAnswer: "い形容詞", difficulty: 1 },
      { id: "n5-4-q2", type: "multiple-choice", question: "「きれい＿人」填咩字？", options: ["い", "な", "の", "が"], correctAnswer: "な", difficulty: 2 },
      { id: "n5-4-q3", type: "multiple-choice", question: "「おいしい」嘅否定係？", options: ["おいしくない", "おいしじゃない", "おいしくない", "おいしではない"], correctAnswer: "おいしくない", difficulty: 3 },
      { id: "n5-4-q4", type: "multiple-choice", question: "「やすい」係咩意思？", options: ["貴", "靚", "平", "安靜"], correctAnswer: "平", difficulty: 1 },
      { id: "n5-4-q5", type: "multiple-choice", question: "「げんき」係哪種形容詞？", options: ["い形容詞", "な形容詞"], correctAnswer: "な形容詞", difficulty: 2 },
    ],
  },
  {
    id: "n5-5",
    title: "N5 情境：餐廳點餐",
    titleJa: "N5 情境：レストランで注文",
    level: "N5",
    type: "context",
    chapter: 3,
    description: "學習喺餐廳點餐嘅實用日語",
    xpReward: 35,
    estimatedMinutes: 15,
    order: 14,
    content: {
      explanation: "Real-life restaurant ordering in Japanese",
      explanationCanto: "去日本食飯？學識呢幾句就夠用！\n\n入座時：「いらっしゃいませ」（歡迎光臨）→ 你答：「ふたりです」（兩位）\n\n點餐：「〜をください」（請給我〜）或「〜にします」（我要〜）\n\n問問題：「おすすめは何ですか？」（有咩推薦？）\n\n結帳：「お会計をお願いします」（唔該結帳）",
      structure: "〜をください / 〜にします",
      notes: "「ください」係禮貌請求，「〜にします」係「決定要〜」嘅意思",
      memoryTip: "ください = please give me，〜にします = I'll have/I'll go with",
    },
    examples: [
      { japanese: "ラーメンをください。", reading: "ラーメンをください。", cantonese: "請給我拉麵。", english: "Please give me ramen." },
      { japanese: "すみません、お水をお願いします。", reading: "すみません、おみずをおねがいします。", cantonese: "唔該，請給我水。", english: "Excuse me, water please." },
      { japanese: "お会計をお願いします。", reading: "おかいけいをおねがいします。", cantonese: "唔該結帳。", english: "Check please." },
      { japanese: "おすすめは何ですか？", reading: "おすすめはなんですか？", cantonese: "有咩推薦？", english: "What do you recommend?" },
    ],
    vocabulary: [
      { word: "ください", reading: "ください", meaning: "please give me", meaningCanto: "請給我", partOfSpeech: "expression" },
      { word: "お願いします", reading: "おねがいします", meaning: "please/I request", meaningCanto: "唔該/拜託", partOfSpeech: "expression" },
      { word: "お会計", reading: "おかいけい", meaning: "check/bill", meaningCanto: "帳單", partOfSpeech: "noun" },
      { word: "おすすめ", reading: "おすすめ", meaning: "recommendation", meaningCanto: "推薦", partOfSpeech: "noun" },
      { word: "すみません", reading: "すみません", meaning: "excuse me/sorry", meaningCanto: "唔該/對不起", partOfSpeech: "expression" },
    ],
    questions: [
      { id: "n5-5-q1", type: "multiple-choice", question: "「點拉麵」用日文係？", options: ["ラーメンをください", "ラーメンがほしい", "ラーメンにします", "ラーメンです"], correctAnswer: "ラーメンをください", difficulty: 2 },
      { id: "n5-5-q2", type: "multiple-choice", question: "「お会計をお願いします」係咩意思？", options: ["有咩推薦？", "請給我水", "唔該結帳", "歡迎光臨"], correctAnswer: "唔該結帳", difficulty: 1 },
      { id: "n5-5-q3", type: "multiple-choice", question: "「すみません」係咩意思？", options: ["多謝", "唔該/對不起", "唔緊要", "歡迎"], correctAnswer: "唔該/對不起", difficulty: 1 },
    ],
  },

  // ===== N4 =====
  {
    id: "n4-1",
    title: "N4 第1課：て形連接",
    titleJa: "N4 第1課：て形",
    level: "N4",
    type: "grammar",
    chapter: 1,
    description: "學習動詞て形同連接句子",
    xpReward: 40,
    estimatedMinutes: 20,
    order: 20,
    content: {
      explanation: "The te-form is used to connect actions, make requests, and express various nuances",
      explanationCanto: "て形係日文動詞嘅超重要變化！用途超多：\n\n1. 連接動作：食べて、飲んで（食完再飲）\n2. 請求：〜てください（請做〜）\n3. 進行時態：〜ています（緊做緊〜）\n4. 許可：〜てもいいです（可以〜）\n5. 禁止：〜てはいけません（唔可以〜）\n\n变化規則（一類動詞/う動詞）：\n- く→いて：書く→書いて\n- ぐ→いで：泳ぐ→泳いで\n- す→して：話す→話して\n- む/ぶ/ぬ→んで：飲む→飲んで\n- る/つ/う→って：帰る→帰って（一類）",
      structure: "[動詞て形] + ください / います / もいいです / はいけません",
      notes: "二類動詞（るverb）: 去掉る加て。例：食べる→食べて\n三類動詞（不規則）: する→して，来る→来て",
      memoryTip: "記住：食べる→食べて（二類去る加て）；飲む→飲んで（一類む→んで）",
    },
    examples: [
      { japanese: "手を洗ってから、食べてください。", reading: "てをあらってから、たべてください。", cantonese: "請洗手先，再食嘢。", english: "Please wash your hands, then eat." },
      { japanese: "今、勉強しています。", reading: "いま、べんきょうしています。", cantonese: "我而家緊讀書。", english: "I am studying now." },
      { japanese: "ここに座ってもいいですか？", reading: "ここにすわってもいいですか？", cantonese: "我可以坐喺度嗎？", english: "May I sit here?" },
      { japanese: "走ってはいけません。", reading: "はしってはいけません。", cantonese: "唔可以跑步。", english: "You must not run." },
    ],
    vocabulary: [
      { word: "洗う", reading: "あらう", meaning: "to wash", meaningCanto: "洗", partOfSpeech: "verb" },
      { word: "勉強する", reading: "べんきょうする", meaning: "to study", meaningCanto: "讀書/學習", partOfSpeech: "verb" },
      { word: "座る", reading: "すわる", meaning: "to sit", meaningCanto: "坐", partOfSpeech: "verb" },
      { word: "走る", reading: "はしる", meaning: "to run", meaningCanto: "跑步", partOfSpeech: "verb" },
    ],
    questions: [
      { id: "n4-1-q1", type: "multiple-choice", question: "「食べる」嘅て形係？", options: ["食べて", "食べって", "食べいて", "食べんで"], correctAnswer: "食べて", difficulty: 2 },
      { id: "n4-1-q2", type: "multiple-choice", question: "「飲む」嘅て形係？", options: ["飲んで", "飲って", "飲いて", "飲して"], correctAnswer: "飲んで", difficulty: 2 },
      { id: "n4-1-q3", type: "multiple-choice", question: "「〜てください」係咩意思？", options: ["正在做〜", "請做〜", "可以做〜", "唔可以做〜"], correctAnswer: "請做〜", difficulty: 1 },
      { id: "n4-1-q4", type: "multiple-choice", question: "「今、勉強しています」係咩意思？", options: ["我想讀書", "我讀完書", "我而家緊讀書", "我唔讀書"], correctAnswer: "我而家緊讀書", difficulty: 2 },
      { id: "n4-1-q5", type: "multiple-choice", question: "「書く」嘅て形係？", options: ["書いて", "書って", "書んで", "書して"], correctAnswer: "書いて", difficulty: 3 },
    ],
  },

  // ===== N3 =====
  {
    id: "n3-1",
    title: "N3 第1課：〜ために",
    titleJa: "N3 第1課：〜ために",
    level: "N3",
    type: "grammar",
    chapter: 1,
    description: "學習表達目的嘅「〜ために」",
    xpReward: 50,
    estimatedMinutes: 20,
    order: 30,
    content: {
      explanation: "〜ために expresses purpose or reason",
      explanationCanto: "「〜ために」用嚟表達目的，意思係「為咗〜」或「因為〜（原因）」。\n\n【目的用法】動詞辭書形 + ために\n例：日本語を勉強するために、毎日練習します。\n（為咗學日文，每日練習。）\n\n【原因用法】名詞 + のために\n例：試験のために、睡眠不足です。\n（因為考試，所以睡眠不足。）",
      structure: "[動詞辭書形 / 名詞の] + ために",
      notes: "ために同ように（好像）唔好搞混！ために係目的/原因，ように係方式/比較",
      memoryTip: "ために = for the sake of / in order to，記住「為」字就係ため",
    },
    examples: [
      { japanese: "健康のために、毎朝走っています。", reading: "けんこうのために、まいあさはしっています。", cantonese: "為咗健康，每朝跑步。", english: "I run every morning for my health." },
      { japanese: "JLPT N2に合格するために、毎日勉強しています。", reading: "JLPT N2にごうかくするために、まいにちべんきょうしています。", cantonese: "為咗通過JLPT N2，每日讀書。", english: "I study every day to pass JLPT N2." },
    ],
    vocabulary: [
      { word: "ために", reading: "ために", meaning: "for/in order to", meaningCanto: "為咗/因為", partOfSpeech: "particle" },
      { word: "健康", reading: "けんこう", meaning: "health", meaningCanto: "健康", partOfSpeech: "noun/na-adj" },
      { word: "合格する", reading: "ごうかくする", meaning: "to pass (an exam)", meaningCanto: "合格/通過", partOfSpeech: "verb" },
    ],
    questions: [
      { id: "n3-1-q1", type: "multiple-choice", question: "「〜ために」係咩意思？", options: ["雖然〜", "為咗〜", "好像〜", "如果〜"], correctAnswer: "為咗〜", difficulty: 1 },
      { id: "n3-1-q2", type: "multiple-choice", question: "「健康＿ために」填咩？", options: ["が", "の", "を", "で"], correctAnswer: "の", difficulty: 2 },
      { id: "n3-1-q3", type: "translation", question: "「為咗讀大學，我緊努力學習」用日文係？", correctAnswer: "大学に入るために、一生懸命勉強しています", difficulty: 4 },
    ],
  },

  // ===== N2 =====
  {
    id: "n2-1",
    title: "N2 第1課：〜わけだ / 〜わけがない",
    titleJa: "N2 第1課：〜わけだ",
    level: "N2",
    type: "grammar",
    chapter: 1,
    description: "學習表達推理和結論嘅句型",
    xpReward: 60,
    estimatedMinutes: 25,
    order: 40,
    content: {
      explanation: "〜わけだ expresses logical conclusion or reason, 〜わけがない expresses impossibility",
      explanationCanto: "「わけだ」係推理/結論句型，表示「難怪〜」、「所以說〜」嘅意思。\n\n【わけだ】係點解係咁嘅結論/推理\n例：毎日練習しているわけだ。（難怪咁叻！）\n\n【わけがない】係不可能嘅強調\n例：そんなことができるわけがない。（咁嘅事根本唔可能做到。）\n\n【わけではない】唔係話完全係咁\n例：嫌いなわけではないが...(唔係話唔鍾意，但係...)",
      structure: "〔普通形〕+ わけだ / わけがない / わけではない",
      notes: "わけ本身係「理由」「原因」嘅意思，所以わけだ=就係因為咁，わけがない=冇咁嘅道理",
      memoryTip: "わけ=理由，わけだ=難怪/所以，わけがない=不可能",
    },
    examples: [
      { japanese: "彼女は10年間日本に住んでいたわけだから、日本語が上手なわけだ。", reading: "かのじょは10ねんかんにほんにすんでいたわけだから、にほんごがじょうずなわけだ。", cantonese: "佢住咗日本10年，難怪日文咁好囉。", english: "She lived in Japan for 10 years, so it's no wonder her Japanese is good." },
      { japanese: "そんな難しい問題が簡単に解けるわけがない。", reading: "そんなむずかしいもんだいがかんたんにとけるわけがない。", cantonese: "咁難嘅問題唔可能咁簡單就解到。", english: "There is no way such a difficult problem can be solved easily." },
    ],
    vocabulary: [
      { word: "わけだ", reading: "わけだ", meaning: "it means that / no wonder", meaningCanto: "難怪/所以說", partOfSpeech: "expression" },
      { word: "わけがない", reading: "わけがない", meaning: "there's no way / impossible", meaningCanto: "不可能/根本唔可能", partOfSpeech: "expression" },
      { word: "上手", reading: "じょうず", meaning: "skilled/good at", meaningCanto: "叻/擅長", partOfSpeech: "na-adj" },
    ],
    questions: [
      { id: "n2-1-q1", type: "multiple-choice", question: "「わけがない」係咩意思？", options: ["難怪", "不可能", "唔係話", "雖然"], correctAnswer: "不可能", difficulty: 2 },
      { id: "n2-1-q2", type: "multiple-choice", question: "「10年間日本に住んでいたわけだから、日本語が上手なわけだ」係咩意思？", options: ["雖然住咗10年但係日文唔好", "住咗10年，難怪日文好", "住咗10年，所以唔識日文", "唔確定住咗幾耐"], correctAnswer: "住咗10年，難怪日文好", difficulty: 3 },
    ],
  },

  // ===== N1 =====
  {
    id: "n1-1",
    title: "N1 第1課：〜に即して / 〜をめぐって",
    titleJa: "N1 第1課：上級文法",
    level: "N1",
    type: "grammar",
    chapter: 1,
    description: "學習N1高級文法句型",
    xpReward: 80,
    estimatedMinutes: 30,
    order: 50,
    content: {
      explanation: "Advanced N1 grammar patterns: 〜に即して and 〜をめぐって",
      explanationCanto: "【〜に即して】根據〜/按照〜\n意思：按照某標準/現實情況去做\n例：現実に即した計画を立てる。（制定符合現實嘅計劃。）\n\n【〜をめぐって】圍繞〜/關於〜（有爭議）\n意思：圍繞某問題有討論/爭議\n例：この問題をめぐって、議論が続いている。（圍繞呢個問題，討論持續中。）\n\n兩者都係高級文法，多見於書面語/新聞。",
      structure: "名詞 + に即して / をめぐって",
      notes: "に即して係中性表達，をめぐって通常帶有爭議性。書面語多用，口語少用。",
      memoryTip: "即(そく)=即時/即刻，に即して=即刻對應（即按照）；めぐる=圍繞，をめぐって=圍繞著",
    },
    examples: [
      { japanese: "法律に即して判断する必要がある。", reading: "ほうりつにそくしてはんだんするひつようがある。", cantonese: "有需要根據法律嚟判斷。", english: "It is necessary to judge in accordance with the law." },
      { japanese: "原発問題をめぐって、国民の意見が分かれている。", reading: "げんぱつもんだいをめぐって、こくみんのいけんがわかれている。", cantonese: "圍繞核電問題，國民意見分歧。", english: "Opinions among citizens are divided over the nuclear power issue." },
    ],
    vocabulary: [
      { word: "に即して", reading: "にそくして", meaning: "in accordance with / based on", meaningCanto: "根據/按照", partOfSpeech: "expression" },
      { word: "をめぐって", reading: "をめぐって", meaning: "surrounding / over the issue of", meaningCanto: "圍繞/關於（爭議）", partOfSpeech: "expression" },
      { word: "議論", reading: "ぎろん", meaning: "debate/argument", meaningCanto: "討論/爭論", partOfSpeech: "noun" },
    ],
    questions: [
      { id: "n1-1-q1", type: "multiple-choice", question: "「法律に即して判断する」係咩意思？", options: ["反對法律嚟判斷", "根據法律嚟判斷", "雖然有法律但唔判斷", "為咗法律而判斷"], correctAnswer: "根據法律嚟判斷", difficulty: 3 },
      { id: "n1-1-q2", type: "multiple-choice", question: "「〜をめぐって」通常表達？", options: ["和諧一致嘅情況", "有爭議/討論嘅情況", "特定嘅命令", "表示原因"], correctAnswer: "有爭議/討論嘅情況", difficulty: 3 },
    ],
  },
];

export const kanaData = {
  hiragana: [
    { kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" },
    { kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" },
    { kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" },
    { kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" },
    { kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" },
    { kana: "は", romaji: "ha" }, { kana: "ひ", romaji: "hi" }, { kana: "ふ", romaji: "fu" }, { kana: "へ", romaji: "he" }, { kana: "ほ", romaji: "ho" },
    { kana: "ま", romaji: "ma" }, { kana: "み", romaji: "mi" }, { kana: "む", romaji: "mu" }, { kana: "め", romaji: "me" }, { kana: "も", romaji: "mo" },
    { kana: "や", romaji: "ya" }, { kana: "ゆ", romaji: "yu" }, { kana: "よ", romaji: "yo" },
    { kana: "ら", romaji: "ra" }, { kana: "り", romaji: "ri" }, { kana: "る", romaji: "ru" }, { kana: "れ", romaji: "re" }, { kana: "ろ", romaji: "ro" },
    { kana: "わ", romaji: "wa" }, { kana: "を", romaji: "wo" }, { kana: "ん", romaji: "n" },
  ],
  katakana: [
    { kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" },
    { kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" },
    { kana: "サ", romaji: "sa" }, { kana: "シ", romaji: "shi" }, { kana: "ス", romaji: "su" }, { kana: "セ", romaji: "se" }, { kana: "ソ", romaji: "so" },
    { kana: "タ", romaji: "ta" }, { kana: "チ", romaji: "chi" }, { kana: "ツ", romaji: "tsu" }, { kana: "テ", romaji: "te" }, { kana: "ト", romaji: "to" },
    { kana: "ナ", romaji: "na" }, { kana: "ニ", romaji: "ni" }, { kana: "ヌ", romaji: "nu" }, { kana: "ネ", romaji: "ne" }, { kana: "ノ", romaji: "no" },
    { kana: "ハ", romaji: "ha" }, { kana: "ヒ", romaji: "hi" }, { kana: "フ", romaji: "fu" }, { kana: "ヘ", romaji: "he" }, { kana: "ホ", romaji: "ho" },
    { kana: "マ", romaji: "ma" }, { kana: "ミ", romaji: "mi" }, { kana: "ム", romaji: "mu" }, { kana: "メ", romaji: "me" }, { kana: "モ", romaji: "mo" },
    { kana: "ヤ", romaji: "ya" }, { kana: "ユ", romaji: "yu" }, { kana: "ヨ", romaji: "yo" },
    { kana: "ラ", romaji: "ra" }, { kana: "リ", romaji: "ri" }, { kana: "ル", romaji: "ru" }, { kana: "レ", romaji: "re" }, { kana: "ロ", romaji: "ro" },
    { kana: "ワ", romaji: "wa" }, { kana: "ヲ", romaji: "wo" }, { kana: "ン", romaji: "n" },
  ],
};
