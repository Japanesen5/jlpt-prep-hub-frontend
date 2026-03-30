import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useGetQuiz, useSubmitAnswer, useCompleteLesson, AnswerResult } from "@workspace/api-client-react";
import { GameButton } from "@/components/ui/GameButton";
import { Furigana } from "@/components/Furigana";
import { X, Check, Heart, Trophy, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const [, params] = useRoute("/quiz/:lessonId");
  const [, setLocation] = useLocation();
  const lessonId = params?.lessonId || "";

  const { data: questions, isLoading } = useGetQuiz(lessonId);
  const submitMutation = useSubmitAnswer();
  const completeMutation = useCompleteLesson();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [feedback, setFeedback] = useState<AnswerResult | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setQuestionStartTime(Date.now());
    }
  }, [currentIndex, questions]);

  if (isLoading || !questions) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const q = questions[currentIndex];

  const handleSubmit = () => {
    if (feedback) return; // Already submitted

    let answer = "";
    if (q.type === 'multiple-choice' || q.type === 'kana-match') {
      if (!selectedOption) return;
      answer = selectedOption;
    } else {
      if (!typedAnswer.trim()) return;
      answer = typedAnswer;
    }

    const timeSpent = Date.now() - questionStartTime;
    
    submitMutation.mutate(
      { data: { questionId: q.id, lessonId, answer, timeSpentMs: timeSpent } },
      {
        onSuccess: (result) => {
          setFeedback(result);
          if (result.isCorrect) setScore(s => s + 1);
        }
      }
    );
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setTypedAnswer("");
      setFeedback(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const finalScore = score / questions.length;
    const timeSpentSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    completeMutation.mutate(
      { id: lessonId, data: { score: finalScore, timeSpentSeconds } },
      {
        onSuccess: () => {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#E63946', '#F4A261', '#2A9D8F']
          });
        }
      }
    );
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="bg-white p-8 rounded-3xl border-2 border-border shadow-lg max-w-md w-full">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-display font-black text-secondary mb-2">完成！🎉</h1>
          <p className="text-muted-foreground font-bold text-lg mb-8">
            你答啱咗 {score} / {questions.length} 題
          </p>
          
          {completeMutation.isSuccess && (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-8">
              <p className="font-bold text-green-800 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 fill-current"/> 獲得 {completeMutation.data?.xpGained} XP
              </p>
            </div>
          )}

          <GameButton 
            isFullWidth 
            onClick={() => setLocation("/lessons")}
            className="py-4 text-lg"
          >
            返回課程地圖
          </GameButton>
        </div>
      </div>
    );
  }

  const progressPct = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
      {/* Quiz Header */}
      <div className="max-w-3xl mx-auto w-full p-4 md:p-8 flex items-center gap-4">
        <button onClick={() => setLocation("/lessons")} className="text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-success transition-all duration-300 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="text-primary font-bold flex items-center gap-1 shrink-0">
          <Heart className="w-5 h-5 fill-current" /> 3
        </div>
      </div>

      {/* Main Question Area */}
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4 md:px-8">
        <div className="flex-1 flex flex-col pt-8">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-secondary mb-8 leading-normal">
            {q.question}
          </h2>
          
          {q.questionJa && (
            <div className="text-3xl md:text-5xl mb-12 text-center py-8 bg-white rounded-3xl border-2 border-border shadow-sm">
              <Furigana japanese={q.questionJa} />
            </div>
          )}

          {/* Options */}
          {(q.type === 'multiple-choice' || q.type === 'kana-match') && q.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto mb-20">
              {q.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let optState = "default";
                if (feedback) {
                  if (opt === q.correctAnswer) optState = "correct";
                  else if (isSelected) optState = "wrong";
                }

                return (
                  <button
                    key={idx}
                    disabled={!!feedback}
                    onClick={() => setSelectedOption(opt)}
                    className={cn(
                      "p-5 rounded-2xl border-2 font-bold text-lg md:text-xl transition-all text-left",
                      optState === "default" && !isSelected && "bg-white border-border text-foreground hover:bg-gray-50 hover:border-gray-300 shadow-[0_4px_0_0_hsl(var(--border))]",
                      optState === "default" && isSelected && "bg-primary/10 border-primary text-primary shadow-[0_4px_0_0_hsl(var(--primary))]",
                      optState === "correct" && "bg-success border-success-dark text-white shadow-none translate-y-1",
                      optState === "wrong" && "bg-red-100 border-red-500 text-red-700 shadow-none translate-y-1 opacity-50"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {(q.type === 'translation' || q.type === 'fill-blank') && (
            <div className="mt-auto mb-20">
              <textarea
                autoFocus
                disabled={!!feedback}
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="在此輸入日文或廣東話..."
                className="w-full p-6 text-xl rounded-2xl border-2 border-border bg-white focus:border-primary focus:ring-4 ring-primary/20 outline-none resize-none min-h-[120px]"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer / Feedback Bottom Sheet */}
      <div className="mt-auto border-t-2 border-border bg-white sticky bottom-0 z-50 px-4 py-6 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <AnimatePresence mode="wait">
            {!feedback ? (
              <motion.div 
                key="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full flex justify-end"
              >
                <GameButton 
                  size="lg" 
                  disabled={submitMutation.isPending || (!selectedOption && !typedAnswer.trim())}
                  onClick={handleSubmit}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {submitMutation.isPending ? "檢查中..." : "提交答案"}
                </GameButton>
              </motion.div>
            ) : (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <div className={cn(
                  "p-5 rounded-2xl mb-4 flex items-start gap-4",
                  feedback.isCorrect ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"
                )}>
                  <div className={cn(
                    "p-2 rounded-full shrink-0",
                    feedback.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {feedback.isCorrect ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-black text-xl mb-1">
                      {feedback.isCorrect ? "答啱啦！叻叻！" : "唔緊要，下次再嚟過！"}
                    </h3>
                    {!feedback.isCorrect && (
                      <p className="font-bold mb-2">正確答案：{feedback.correctAnswer}</p>
                    )}
                    <p className="font-medium opacity-90">{feedback.feedback}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <GameButton 
                    variant={feedback.isCorrect ? "success" : "primary"}
                    size="lg" 
                    onClick={handleNext}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    下一題 <ArrowRight className="w-5 h-5 ml-2" />
                  </GameButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
