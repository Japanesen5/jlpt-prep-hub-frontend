import { useState, useCallback } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { BookOpen, Volume2 } from "lucide-react";
import { speakJapanese } from "@/lib/speech";

interface KanaCell {
  hiragana: string;
  katakana: string;
  romaji: string;
}

type MaybeCell = KanaCell | null;

interface KanaRow {
  label: string;
  cells: MaybeCell[];
}

interface YoonRow {
  label: string;
  cells: KanaCell[];
}

// ===== 清音 =====
const seionRows: KanaRow[] = [
  { label: "あ", cells: [
    { hiragana: "あ", katakana: "ア", romaji: "a" },
    { hiragana: "い", katakana: "イ", romaji: "i" },
    { hiragana: "う", katakana: "ウ", romaji: "u" },
    { hiragana: "え", katakana: "エ", romaji: "e" },
    { hiragana: "お", katakana: "オ", romaji: "o" },
  ]},
  { label: "か", cells: [
    { hiragana: "か", katakana: "カ", romaji: "ka" },
    { hiragana: "き", katakana: "キ", romaji: "ki" },
    { hiragana: "く", katakana: "ク", romaji: "ku" },
    { hiragana: "け", katakana: "ケ", romaji: "ke" },
    { hiragana: "こ", katakana: "コ", romaji: "ko" },
  ]},
  { label: "さ", cells: [
    { hiragana: "さ", katakana: "サ", romaji: "sa" },
    { hiragana: "し", katakana: "シ", romaji: "shi" },
    { hiragana: "す", katakana: "ス", romaji: "su" },
    { hiragana: "せ", katakana: "セ", romaji: "se" },
    { hiragana: "そ", katakana: "ソ", romaji: "so" },
  ]},
  { label: "た", cells: [
    { hiragana: "た", katakana: "タ", romaji: "ta" },
    { hiragana: "ち", katakana: "チ", romaji: "chi" },
    { hiragana: "つ", katakana: "ツ", romaji: "tsu" },
    { hiragana: "て", katakana: "テ", romaji: "te" },
    { hiragana: "と", katakana: "ト", romaji: "to" },
  ]},
  { label: "な", cells: [
    { hiragana: "な", katakana: "ナ", romaji: "na" },
    { hiragana: "に", katakana: "ニ", romaji: "ni" },
    { hiragana: "ぬ", katakana: "ヌ", romaji: "nu" },
    { hiragana: "ね", katakana: "ネ", romaji: "ne" },
    { hiragana: "の", katakana: "ノ", romaji: "no" },
  ]},
  { label: "は", cells: [
    { hiragana: "は", katakana: "ハ", romaji: "ha" },
    { hiragana: "ひ", katakana: "ヒ", romaji: "hi" },
    { hiragana: "ふ", katakana: "フ", romaji: "fu" },
    { hiragana: "へ", katakana: "ヘ", romaji: "he" },
    { hiragana: "ほ", katakana: "ホ", romaji: "ho" },
  ]},
  { label: "ま", cells: [
    { hiragana: "ま", katakana: "マ", romaji: "ma" },
    { hiragana: "み", katakana: "ミ", romaji: "mi" },
    { hiragana: "む", katakana: "ム", romaji: "mu" },
    { hiragana: "め", katakana: "メ", romaji: "me" },
    { hiragana: "も", katakana: "モ", romaji: "mo" },
  ]},
  { label: "や", cells: [
    { hiragana: "や", katakana: "ヤ", romaji: "ya" },
    null,
    { hiragana: "ゆ", katakana: "ユ", romaji: "yu" },
    null,
    { hiragana: "よ", katakana: "ヨ", romaji: "yo" },
  ]},
  { label: "ら", cells: [
    { hiragana: "ら", katakana: "ラ", romaji: "ra" },
    { hiragana: "り", katakana: "リ", romaji: "ri" },
    { hiragana: "る", katakana: "ル", romaji: "ru" },
    { hiragana: "れ", katakana: "レ", romaji: "re" },
    { hiragana: "ろ", katakana: "ロ", romaji: "ro" },
  ]},
  { label: "わ", cells: [
    { hiragana: "わ", katakana: "ワ", romaji: "wa" },
    null,
    null,
    null,
    { hiragana: "を", katakana: "ヲ", romaji: "wo" },
  ]},
  { label: "ん", cells: [
    { hiragana: "ん", katakana: "ン", romaji: "n" },
    null, null, null, null,
  ]},
];

// ===== 濁音 =====
const dakuonRows: KanaRow[] = [
  { label: "が", cells: [
    { hiragana: "が", katakana: "ガ", romaji: "ga" },
    { hiragana: "ぎ", katakana: "ギ", romaji: "gi" },
    { hiragana: "ぐ", katakana: "グ", romaji: "gu" },
    { hiragana: "げ", katakana: "ゲ", romaji: "ge" },
    { hiragana: "ご", katakana: "ゴ", romaji: "go" },
  ]},
  { label: "ざ", cells: [
    { hiragana: "ざ", katakana: "ザ", romaji: "za" },
    { hiragana: "じ", katakana: "ジ", romaji: "ji" },
    { hiragana: "ず", katakana: "ズ", romaji: "zu" },
    { hiragana: "ぜ", katakana: "ゼ", romaji: "ze" },
    { hiragana: "ぞ", katakana: "ゾ", romaji: "zo" },
  ]},
  { label: "だ", cells: [
    { hiragana: "だ", katakana: "ダ", romaji: "da" },
    { hiragana: "ぢ", katakana: "ヂ", romaji: "ji" },
    { hiragana: "づ", katakana: "ヅ", romaji: "zu" },
    { hiragana: "で", katakana: "デ", romaji: "de" },
    { hiragana: "ど", katakana: "ド", romaji: "do" },
  ]},
  { label: "ば", cells: [
    { hiragana: "ば", katakana: "バ", romaji: "ba" },
    { hiragana: "び", katakana: "ビ", romaji: "bi" },
    { hiragana: "ぶ", katakana: "ブ", romaji: "bu" },
    { hiragana: "べ", katakana: "ベ", romaji: "be" },
    { hiragana: "ぼ", katakana: "ボ", romaji: "bo" },
  ]},
];

// ===== 半濁音 =====
const handakuonRows: KanaRow[] = [
  { label: "ぱ", cells: [
    { hiragana: "ぱ", katakana: "パ", romaji: "pa" },
    { hiragana: "ぴ", katakana: "ピ", romaji: "pi" },
    { hiragana: "ぷ", katakana: "プ", romaji: "pu" },
    { hiragana: "ぺ", katakana: "ペ", romaji: "pe" },
    { hiragana: "ぽ", katakana: "ポ", romaji: "po" },
  ]},
];

// ===== 拗音 =====
const yoonRows: YoonRow[] = [
  { label: "きゃ", cells: [
    { hiragana: "きゃ", katakana: "キャ", romaji: "kya" },
    { hiragana: "きゅ", katakana: "キュ", romaji: "kyu" },
    { hiragana: "きょ", katakana: "キョ", romaji: "kyo" },
  ]},
  { label: "しゃ", cells: [
    { hiragana: "しゃ", katakana: "シャ", romaji: "sha" },
    { hiragana: "しゅ", katakana: "シュ", romaji: "shu" },
    { hiragana: "しょ", katakana: "ショ", romaji: "sho" },
  ]},
  { label: "ちゃ", cells: [
    { hiragana: "ちゃ", katakana: "チャ", romaji: "cha" },
    { hiragana: "ちゅ", katakana: "チュ", romaji: "chu" },
    { hiragana: "ちょ", katakana: "チョ", romaji: "cho" },
  ]},
  { label: "にゃ", cells: [
    { hiragana: "にゃ", katakana: "ニャ", romaji: "nya" },
    { hiragana: "にゅ", katakana: "ニュ", romaji: "nyu" },
    { hiragana: "にょ", katakana: "ニョ", romaji: "nyo" },
  ]},
  { label: "ひゃ", cells: [
    { hiragana: "ひゃ", katakana: "ヒャ", romaji: "hya" },
    { hiragana: "ひゅ", katakana: "ヒュ", romaji: "hyu" },
    { hiragana: "ひょ", katakana: "ヒョ", romaji: "hyo" },
  ]},
  { label: "みゃ", cells: [
    { hiragana: "みゃ", katakana: "ミャ", romaji: "mya" },
    { hiragana: "みゅ", katakana: "ミュ", romaji: "myu" },
    { hiragana: "みょ", katakana: "ミョ", romaji: "myo" },
  ]},
  { label: "りゃ", cells: [
    { hiragana: "りゃ", katakana: "リャ", romaji: "rya" },
    { hiragana: "りゅ", katakana: "リュ", romaji: "ryu" },
    { hiragana: "りょ", katakana: "リョ", romaji: "ryo" },
  ]},
  { label: "ぎゃ", cells: [
    { hiragana: "ぎゃ", katakana: "ギャ", romaji: "gya" },
    { hiragana: "ぎゅ", katakana: "ギュ", romaji: "gyu" },
    { hiragana: "ぎょ", katakana: "ギョ", romaji: "gyo" },
  ]},
  { label: "じゃ", cells: [
    { hiragana: "じゃ", katakana: "ジャ", romaji: "ja" },
    { hiragana: "じゅ", katakana: "ジュ", romaji: "ju" },
    { hiragana: "じょ", katakana: "ジョ", romaji: "jo" },
  ]},
  { label: "びゃ", cells: [
    { hiragana: "びゃ", katakana: "ビャ", romaji: "bya" },
    { hiragana: "びゅ", katakana: "ビュ", romaji: "byu" },
    { hiragana: "びょ", katakana: "ビョ", romaji: "byo" },
  ]},
  { label: "ぴゃ", cells: [
    { hiragana: "ぴゃ", katakana: "ピャ", romaji: "pya" },
    { hiragana: "ぴゅ", katakana: "ピュ", romaji: "pyu" },
    { hiragana: "ぴょ", katakana: "ピョ", romaji: "pyo" },
  ]},
];

type ScriptMode = "both" | "hiragana" | "katakana";

function KanaCard({ cell, mode }: { cell: KanaCell; mode: ScriptMode }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = useCallback(() => {
    setSpeaking(true);
    speakJapanese(cell.hiragana);
    setTimeout(() => setSpeaking(false), 700);
  }, [cell.hiragana]);

  const isCompound = cell.hiragana.length > 1;

  return (
    <button
      onClick={handleSpeak}
      className={cn(
        "flex flex-col items-center justify-center p-1 rounded-xl border-2 transition-all duration-150 select-none w-full aspect-square min-w-0 group relative overflow-hidden",
        speaking
          ? "bg-primary/15 border-primary shadow-md scale-105"
          : "bg-white border-border hover:border-primary/50 hover:bg-primary/5 active:scale-95"
      )}
    >
      {/* Speaking ripple */}
      {speaking && (
        <span className="absolute inset-0 rounded-xl animate-ping bg-primary/10 pointer-events-none" />
      )}

      {/* Hiragana */}
      {mode !== "katakana" && (
        <span className={cn(
          "font-jp leading-tight font-medium",
          isCompound ? "text-sm md:text-base" : "text-lg md:text-2xl"
        )}>
          {cell.hiragana}
        </span>
      )}

      {/* Katakana — shown in "both" mode below hiragana, or alone in katakana mode */}
      {mode === "katakana" && (
        <span className={cn(
          "font-jp leading-tight font-medium",
          isCompound ? "text-sm md:text-base" : "text-lg md:text-2xl"
        )}>
          {cell.katakana}
        </span>
      )}
      {mode === "both" && (
        <span className={cn(
          "font-jp leading-tight text-muted-foreground",
          isCompound ? "text-[10px] md:text-xs" : "text-xs md:text-sm"
        )}>
          {cell.katakana}
        </span>
      )}

      {/* Romaji */}
      <span className="text-[9px] md:text-[11px] font-bold text-primary mt-0.5 leading-none">
        {cell.romaji}
      </span>

      {/* Speaker icon on hover */}
      <Volume2 className={cn(
        "absolute bottom-0.5 right-0.5 w-2.5 h-2.5 transition-opacity",
        speaking ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-40 text-muted-foreground"
      )} />
    </button>
  );
}

function EmptyCard() {
  return <div className="w-full aspect-square min-w-0" />;
}

function SectionLabel({ title, subtitle, color }: { title: string; subtitle: string; color: string }) {
  return (
    <div className={cn("flex items-center gap-3 mb-2 px-1", color)}>
      <div className="w-1 h-7 rounded-full bg-current opacity-50" />
      <div>
        <h3 className="font-bold text-sm md:text-base leading-tight">{title}</h3>
        <p className="text-xs opacity-60 leading-tight">{subtitle}</p>
      </div>
    </div>
  );
}

const colLabels = ["a", "i", "u", "e", "o"];

export default function KanaChart() {
  const [mode, setMode] = useState<ScriptMode>("both");

  const modeOptions: { value: ScriptMode; label: string; emoji: string }[] = [
    { value: "both", label: "兩者", emoji: "あア" },
    { value: "hiragana", label: "平假名", emoji: "あ" },
    { value: "katakana", label: "片假名", emoji: "ア" },
  ];

  return (
    <AppLayout>
      <div className="space-y-5 pb-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-black text-secondary">五十音表</h1>
          <p className="text-muted-foreground text-sm mt-1">
            點擊任何假名即可<span className="text-primary font-bold">播放讀音</span> 🔊
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={cn(
                "px-3 py-2 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-1.5",
                mode === opt.value
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="font-jp text-base">{opt.emoji}</span>
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1.75rem_1fr_1fr_1fr_1fr_1fr] gap-1 items-center">
          <div />
          {colLabels.map((h) => (
            <div key={h} className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h}</div>
          ))}
        </div>

        {/* ===== 清音 ===== */}
        <div>
          <SectionLabel title="清音（せいおん）" subtitle="基本46音節" color="text-secondary" />
          <div className="space-y-1">
            {seionRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1.75rem_1fr_1fr_1fr_1fr_1fr] gap-1 items-center">
                <span className="text-center text-[10px] font-bold text-muted-foreground font-jp leading-none">{row.label}</span>
                {row.cells.map((cell, i) =>
                  cell ? <KanaCard key={i} cell={cell} mode={mode} /> : <EmptyCard key={i} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== 濁音 ===== */}
        <div>
          <SectionLabel title="濁音（だくおん）" subtitle="加「゛」的有聲音 — が・ざ・だ・ば行" color="text-blue-600" />
          <div className="space-y-1">
            {dakuonRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1.75rem_1fr_1fr_1fr_1fr_1fr] gap-1 items-center">
                <span className="text-center text-[10px] font-bold text-muted-foreground font-jp leading-none">{row.label}</span>
                {row.cells.map((cell, i) =>
                  cell ? <KanaCard key={i} cell={cell} mode={mode} /> : <EmptyCard key={i} />
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 px-1">
            ※ ぢ・ヂ 同 じ・ジ 讀音相同（ji）；づ・ヅ 同 ず・ズ 讀音相同（zu）
          </p>
        </div>

        {/* ===== 半濁音 ===== */}
        <div>
          <SectionLabel title="半濁音（はんだくおん）" subtitle="加「゜」的ぱ行" color="text-orange-500" />
          <div className="space-y-1">
            {handakuonRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1.75rem_1fr_1fr_1fr_1fr_1fr] gap-1 items-center">
                <span className="text-center text-[10px] font-bold text-muted-foreground font-jp leading-none">{row.label}</span>
                {row.cells.map((cell, i) =>
                  cell ? <KanaCard key={i} cell={cell} mode={mode} /> : <EmptyCard key={i} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== 拗音 ===== */}
        <div>
          <SectionLabel title="拗音（ようおん）" subtitle="組合音節 — い段 + 小字や・ゆ・よ" color="text-purple-600" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1">
            {yoonRows.map((row) => (
              <div key={row.label} className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-muted-foreground font-jp w-7 text-right shrink-0 leading-none">{row.label}</span>
                <div className="grid grid-cols-3 gap-1 flex-1">
                  {row.cells.map((cell, i) => (
                    <KanaCard key={i} cell={cell} mode={mode} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 px-1">
            ※ 拗音係將い段假名（き・し・ち…）同小字的や・ゆ・よ組合：きゃ(kya)、しゃ(sha)、ちゃ(cha)…
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 p-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-secondary text-base">開始練習！</h3>
            <p className="text-xs text-muted-foreground">完成課程同測驗，熟練所有假名</p>
          </div>
          <Link href="/lessons/hiragana">
            <button className="bg-primary text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors whitespace-nowrap text-sm">
              <BookOpen className="w-4 h-4" />
              去課程
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
