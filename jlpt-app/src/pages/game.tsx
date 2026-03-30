import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useGetHiraganaGame, useAddXp } from "@workspace/api-client-react";
import { GameButton } from "@/components/ui/GameButton";
import { Trophy, Clock, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function KanaGame() {
  const [, setLocation] = useLocation();
  const { data: questions, isLoading } = useGetHiraganaGame({ type: "both", count: 30 });
  const addXpMutation = useAddXp();

  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setCurrentIndex(0);
  };

  const endGame = () => {
    setGameState('end');
    const xpReward = Math.floor(score * 2 + maxCombo * 5);
    addXpMutation.mutate({ data: { amount: xpReward, source: "kana_game" } });
    
    if (score > 10) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleAnswer = (answer: string) => {
    if (!questions) return;
    const isCorrect = answer === questions[currentIndex].correctAnswer;
    
    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));
      setScore(s => s + 1 + Math.floor(newCombo / 5)); // Bonus points for high combo
    } else {
      setCombo(0);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      endGame();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary relative overflow-hidden flex flex-col">
      <img 
        src={`${import.meta.env.BASE_URL}images/dojo-bg.png`} 
        alt="Dojo Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      {/* Header */}
      <div className="relative z-10 p-6 flex items-center justify-between">
        <button onClick={() => setLocation("/lessons")} className="text-white/70 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-sm">
          <X className="w-6 h-6" />
        </button>
        {gameState === 'playing' && (
          <div className="flex gap-4">
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-bold font-display flex items-center gap-2 border border-white/10">
              <Trophy className="w-5 h-5 text-accent" /> {score}
            </div>
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-bold font-display flex items-center gap-2 border border-white/10">
              <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`} /> 
              {timeLeft}s
            </div>
          </div>
        )}
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-[2rem] border-4 border-border shadow-2xl max-w-sm w-full text-center"
            >
              <h1 className="text-4xl font-display font-black text-secondary mb-4">假名速認挑戰</h1>
              <p className="text-muted-foreground font-bold mb-8">
                60秒內認出最多平假名/片假名。連擊可以獲得額外分數！
              </p>
              <GameButton size="lg" isFullWidth onClick={startGame} className="text-xl py-4">
                開始遊戲
              </GameButton>
            </motion.div>
          )}

          {gameState === 'playing' && questions && (
            <motion.div 
              key={`q-${currentIndex}`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-[2rem] border-4 border-border shadow-2xl p-8 mb-6 flex flex-col items-center justify-center min-h-[250px] relative">
                {combo >= 3 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 text-accent font-black text-xl italic flex items-center gap-1"
                  >
                    <Zap className="w-5 h-5 fill-current" /> {combo} Combo!
                  </motion.div>
                )}
                <div className="text-8xl font-jp font-bold text-secondary">
                  {questions[currentIndex].kana}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {questions[currentIndex].options.map(opt => (
                  <GameButton 
                    key={opt}
                    variant="outline"
                    className="h-24 text-3xl hover:border-primary hover:text-primary active:bg-primary/10"
                    onClick={() => handleAnswer(opt)}
                  >
                    {opt}
                  </GameButton>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'end' && (
            <motion.div 
              key="end"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-[2rem] border-4 border-border shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-accent-dark" />
              </div>
              <h2 className="text-3xl font-display font-black text-secondary mb-2">時間到！</h2>
              
              <div className="bg-gray-50 rounded-2xl p-4 my-6 border-2 border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-muted-foreground">最終分數</span>
                  <span className="text-2xl font-black text-primary">{score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-muted-foreground">最高連擊</span>
                  <span className="text-xl font-bold text-accent-dark">{maxCombo}</span>
                </div>
              </div>

              {addXpMutation.isSuccess && (
                <p className="text-success font-bold mb-6 flex items-center justify-center gap-1">
                  <Zap className="w-5 h-5 fill-current" /> 獲得 {Math.floor(score * 2 + maxCombo * 5)} XP
                </p>
              )}

              <div className="space-y-3">
                <GameButton size="lg" isFullWidth onClick={startGame}>
                  再玩一次
                </GameButton>
                <GameButton variant="ghost" isFullWidth onClick={() => setLocation("/lessons")}>
                  返回主頁
                </GameButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
