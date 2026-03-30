import { useState } from "react";
import { useGetReviewItems, useScheduleReview } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GameButton } from "@/components/ui/GameButton";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Smile, Meh, Frown, CheckCircle } from "lucide-react";

export default function Review() {
  const { data: reviewItems, isLoading } = useGetReviewItems();
  const scheduleMutation = useScheduleReview();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  const items = reviewItems || [];
  
  if (items.length === 0 || currentIndex >= items.length) {
    return (
      <AppLayout>
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-border shadow-sm">
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
          <h2 className="text-3xl font-display font-black text-secondary mb-3">搞掂晒！</h2>
          <p className="text-lg text-muted-foreground font-bold mb-8">
            今日嘅溫習任務已經全部完成。聽日再嚟啦！
          </p>
          <img 
            src={`${import.meta.env.BASE_URL}images/sensei-avatar.png`} 
            alt="Sensei" 
            className="w-32 h-32 mx-auto opacity-80"
          />
        </div>
      </AppLayout>
    );
  }

  const currentItem = items[currentIndex];

  const handleGrade = (quality: number) => {
    scheduleMutation.mutate({
      data: {
        questionId: currentItem.questionId,
        lessonId: currentItem.lessonId,
        quality
      }
    });
    
    setIsFlipped(false);
    setCurrentIndex(i => i + 1);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-black flex items-center gap-2">
            <Brain className="w-7 h-7 text-accent-dark" /> 智能溫習
          </h1>
          <span className="font-bold text-muted-foreground">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        {/* Flashcard */}
        <div className="relative h-[400px] perspective-1000">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentItem.id + (isFlipped ? "-back" : "-front")}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full bg-white rounded-3xl border-2 border-border shadow-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer"
                   onClick={() => !isFlipped && setIsFlipped(true)}>
                
                {!isFlipped ? (
                  <>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary leading-tight">
                      {currentItem.question}
                    </h2>
                    <p className="text-muted-foreground font-bold mt-12 animate-pulse">
                      㩒卡片睇答案...
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg text-muted-foreground font-bold mb-4">問題：{currentItem.question}</p>
                    <div className="w-full h-px bg-border mb-8"></div>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-primary mb-8">
                      {currentItem.correctAnswer}
                    </h2>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4 pt-4"
          >
            <GameButton variant="outline" className="flex flex-col h-24 py-2 border-red-200 hover:bg-red-50 text-red-600" onClick={() => handleGrade(0)}>
              <Frown className="w-8 h-8 mb-1" />
              <span className="text-sm">唔記得晒</span>
            </GameButton>
            <GameButton variant="outline" className="flex flex-col h-24 py-2 border-orange-200 hover:bg-orange-50 text-orange-600" onClick={() => handleGrade(3)}>
              <Meh className="w-8 h-8 mb-1" />
              <span className="text-sm">諗咗好耐</span>
            </GameButton>
            <GameButton variant="outline" className="flex flex-col h-24 py-2 border-green-200 hover:bg-green-50 text-green-600" onClick={() => handleGrade(5)}>
              <Smile className="w-8 h-8 mb-1" />
              <span className="text-sm">好容易！</span>
            </GameButton>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
