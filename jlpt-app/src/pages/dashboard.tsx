import { Link } from "wouter";
import { useGetProgress } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GameButton } from "@/components/ui/GameButton";
import { Brain, Trophy, Star, Zap, ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: progress, isLoading } = useGetProgress();

  if (isLoading || !progress) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  const xpPercent = Math.min(100, (progress.dailyXpEarned / progress.dailyXpGoal) * 100);

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Welcome Banner */}
        <section className="relative overflow-hidden bg-secondary rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Mt Fuji Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-display font-black mb-2">
              歡迎返嚟！💪
            </h1>
            <p className="text-secondary-foreground/80 font-medium text-lg mb-6">
              準備好征服 {progress.currentJlptLevel.toUpperCase()} 未呀？
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col">
                <span className="text-white/60 text-sm font-bold mb-1 flex items-center gap-1.5"><Star className="w-4 h-4"/> 總 XP</span>
                <span className="text-2xl font-black font-display text-accent">{progress.xp}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col">
                <span className="text-white/60 text-sm font-bold mb-1 flex items-center gap-1.5"><Trophy className="w-4 h-4"/> 等級</span>
                <span className="text-2xl font-black font-display text-white">{progress.level}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col col-span-2 sm:col-span-2">
                <span className="text-white/60 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-accent"/> 今日目標
                </span>
                <div className="w-full bg-black/20 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-accent to-yellow-300 h-full rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-white/80">
                  <span>{progress.dailyXpEarned} XP</span>
                  <span>{progress.dailyXpGoal} XP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <section className="bg-white border-2 border-border p-5 rounded-3xl shadow-sm hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <PlayCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold mb-2">繼續學習</h2>
            <p className="text-muted-foreground text-sm font-medium mb-5">
              進入下一個 {progress.currentJlptLevel.toUpperCase()} 課程
            </p>
            <Link href="/lessons">
              <GameButton variant="primary" isFullWidth>
                開始上堂 <ArrowRight className="w-5 h-5 ml-1" />
              </GameButton>
            </Link>
          </section>

          <section className="bg-white border-2 border-border p-5 rounded-3xl shadow-sm hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 text-accent-dark">
              <Brain className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold mb-2">智能溫習</h2>
            <p className="text-muted-foreground text-sm font-medium mb-5">
              使用間隔重複法鞏固記憶，溫故知新！
            </p>
            <Link href="/review">
              <GameButton variant="accent" isFullWidth>
                開始溫習 <ArrowRight className="w-5 h-5 ml-1" />
              </GameButton>
            </Link>
          </section>
        </div>

        {/* Weak Points Alert */}
        {progress.weakPoints && progress.weakPoints.length > 0 && (
          <section className="bg-orange-50 border-2 border-orange-200 p-5 rounded-3xl flex items-start gap-4">
            <div className="bg-orange-200 text-orange-600 p-2.5 rounded-xl shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-orange-800 text-lg mb-1">AI 建議強化範疇</h3>
              <p className="text-orange-700/80 text-sm font-medium mb-3">
                系統發現你喺以下範疇比較弱，建議多加練習：
              </p>
              <div className="flex flex-wrap gap-2">
                {progress.weakPoints.map(wp => (
                  <span key={wp} className="bg-white text-orange-700 border border-orange-200 px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                    {wp}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </AppLayout>
  );
}
