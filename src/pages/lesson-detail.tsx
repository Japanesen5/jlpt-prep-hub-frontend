import { useState, useCallback } from "react";
import { useRoute, Link } from "wouter";
import { useGetLesson } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GameButton } from "@/components/ui/GameButton";
import { Furigana } from "@/components/Furigana";
import { ArrowLeft, PlayCircle, BookA, Info, Check, Star, Volume2 } from "lucide-react";
import { speakJapanese } from "@/lib/speech";
import { cn } from "@/lib/utils";

function SpeakButton({ text, className }: { text: string; className?: string }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeaking(true);
    speakJapanese(text);
    setTimeout(() => setSpeaking(false), 800);
  }, [text]);

  return (
    <button
      onClick={handleSpeak}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full transition-all",
        speaking
          ? "bg-primary text-white scale-110"
          : "bg-primary/10 text-primary hover:bg-primary/20",
        className
      )}
      title="點擊播放讀音"
    >
      <Volume2 className={cn("w-4 h-4", speaking && "animate-pulse")} />
    </button>
  );
}

export default function LessonDetail() {
  const [, params] = useRoute("/lessons/:level/:id");
  const lessonId = params?.id;

  const { data: lesson, isLoading } = useGetLesson(lessonId || "", {
    query: { enabled: !!lessonId }
  });

  if (isLoading || !lesson) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-500 pb-12">

        {/* Header */}
        <Link href={`/lessons`} className="inline-flex items-center gap-2 text-muted-foreground font-bold hover:text-foreground mb-4">
          <ArrowLeft className="w-5 h-5" /> 返回課程地圖
        </Link>

        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-border shadow-sm mb-6">
          <div className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-lg mb-4">
            Chapter {lesson.chapter} • {lesson.type.toUpperCase()}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black text-secondary mb-2 leading-tight">
            {lesson.title}
          </h1>
          {lesson.titleJa && (
            <p className="text-xl font-jp text-muted-foreground mb-4">{lesson.titleJa}</p>
          )}
          <p className="text-foreground/80 font-medium leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* Explanation */}
        <section className="bg-[#FFFDF7] rounded-3xl p-6 md:p-8 border-2 border-border shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Info className="w-6 h-6" /> 文法解說 (廣東話)
          </div>

          <div className="prose prose-lg max-w-none prose-p:font-medium prose-p:leading-relaxed text-foreground">
            <p className="whitespace-pre-wrap">{lesson.content.explanationCanto}</p>
          </div>

          {lesson.content.structure && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mt-6">
              <h4 className="text-blue-800 font-bold mb-2">句型結構</h4>
              <p className="font-jp text-lg font-bold tracking-wider text-blue-900">
                {lesson.content.structure}
              </p>
            </div>
          )}

          {lesson.content.memoryTip && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 mt-6 flex gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="text-orange-800 font-bold mb-1">記憶小貼士</h4>
                <p className="text-orange-900/80 font-medium">{lesson.content.memoryTip}</p>
              </div>
            </div>
          )}
        </section>

        {/* Examples */}
        {lesson.examples && lesson.examples.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-bold text-xl text-secondary flex items-center gap-2">
              <BookA className="w-6 h-6" /> 實用例句
            </h3>
            <div className="grid gap-4">
              {lesson.examples.map((ex, idx) => (
                <div key={idx} className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm hover:border-gray-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 text-xl md:text-2xl mb-3">
                      <Furigana japanese={ex.japanese} reading={ex.reading} />
                    </div>
                    <SpeakButton text={ex.japanese} className="mt-1 shrink-0" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-primary">{ex.cantonese}</p>
                    {ex.english && (
                      <p className="text-sm font-medium text-muted-foreground">{ex.english}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vocabulary */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-bold text-xl text-secondary flex items-center gap-2">
              <Check className="w-6 h-6" /> 本課詞彙
            </h3>
            <div className="grid gap-2">
              {lesson.vocabulary.map((voc, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-border rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4 hover:border-gray-300 transition-colors"
                >
                  {/* Speak button */}
                  <SpeakButton text={voc.word} />

                  {/* Word + reading */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-jp text-2xl font-bold text-secondary">{voc.word}</span>
                      {voc.reading && voc.reading !== voc.word && (
                        <span className="font-jp text-sm text-muted-foreground">({voc.reading})</span>
                      )}
                      {voc.partOfSpeech && (
                        <span className="text-xs bg-gray-100 text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                          {voc.partOfSpeech}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-sm font-bold text-primary">{voc.meaningCanto}</span>
                      <span className="text-sm text-muted-foreground">{voc.meaning}</span>
                    </div>
                    {voc.example && (
                      <p className="text-xs text-muted-foreground mt-1 font-jp">{voc.example}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Start Quiz */}
        <div className="pt-8 flex flex-col items-center">
          <Link href={`/quiz/${lesson.id}`} className="w-full">
            <GameButton size="lg" isFullWidth className="text-xl py-5">
              我明白晒！開始測驗 <PlayCircle className="w-7 h-7 ml-2" />
            </GameButton>
          </Link>
          <p className="text-muted-foreground font-bold mt-4 text-sm flex items-center gap-1">
            完成可獲得 <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" /> {lesson.xpReward} XP
          </p>
        </div>

      </div>
    </AppLayout>
  );
}
