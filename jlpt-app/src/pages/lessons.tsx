import { useState } from "react";
import { Link } from "wouter";
import { useGetLessons, GetLessonsLevel, Lesson } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GameButton } from "@/components/ui/GameButton";
import { Lock, Star, CheckCircle2, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Lessons() {
  const [level, setLevel] = useState<GetLessonsLevel>("N5");
  const { data: lessons, isLoading } = useGetLessons({ level });

  const levels: { id: GetLessonsLevel; label: string }[] = [
    { id: "hiragana", label: "平假名" },
    { id: "katakana", label: "片假名" },
    { id: "N5", label: "N5" },
    { id: "N4", label: "N4" },
    { id: "N3", label: "N3" },
    { id: "N2", label: "N2" },
    { id: "N1", label: "N1" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header & Level Selector */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-display font-black">課程地圖 🗺️</h1>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x">
            <div className="flex gap-2 min-w-max">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setLevel(lvl.id)}
                  className={cn(
                    "snap-center px-5 py-2.5 rounded-2xl font-bold transition-all border-2",
                    level === lvl.id 
                      ? "bg-secondary text-white border-secondary-dark shadow-chunky-secondary transform -translate-y-1" 
                      : "bg-white text-muted-foreground border-border hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                  )}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Path View */}
        <div className="relative py-8">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2.5 bg-gray-200 -translate-x-1/2 rounded-full z-0" />
          
          {isLoading ? (
            <div className="flex justify-center py-12 relative z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : !lessons || lessons.length === 0 ? (
            <div className="text-center py-12 relative z-10 bg-white border-2 border-border rounded-3xl">
              <p className="text-muted-foreground font-bold">此級別暫未有課程</p>
            </div>
          ) : (
            <div className="space-y-12 relative z-10 flex flex-col items-center">
              {lessons.sort((a, b) => a.order - b.order).map((lesson, idx) => {
                const isLeft = idx % 2 === 0;
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={lesson.id} 
                    className="relative w-full max-w-[320px] sm:max-w-md group"
                  >
                    <Link href={lesson.isLocked ? "#" : `/lessons/${level}/${lesson.id}`}>
                      <div className={cn(
                        "relative p-5 rounded-3xl border-2 transition-all duration-200 flex items-center gap-4",
                        isLeft ? "mr-auto ml-0" : "ml-auto mr-0",
                        lesson.isLocked 
                          ? "bg-gray-50 border-gray-200 cursor-not-allowed opacity-80" 
                          : lesson.isCompleted
                            ? "bg-green-50 border-success-dark shadow-chunky-success hover:-translate-y-1 cursor-pointer"
                            : "bg-white border-primary-dark shadow-chunky-primary hover:-translate-y-1 cursor-pointer"
                      )}>
                        
                        {/* Status Icon Indicator */}
                        <div className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-20 shadow-sm",
                          isLeft ? "-right-5" : "-left-5",
                          lesson.isLocked ? "bg-gray-300" :
                          lesson.isCompleted ? "bg-success" : "bg-primary"
                        )}>
                          {lesson.isLocked ? <Lock className="w-4 h-4 text-white" /> :
                           lesson.isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> :
                           <Star className="w-4 h-4 text-white fill-white" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                            Chapter {lesson.chapter} • {
                              lesson.type === 'grammar' ? '文法' :
                              lesson.type === 'vocabulary' ? '單字' :
                              lesson.type === 'context' ? '情境' :
                              lesson.type === 'hiragana-game' ? '遊戲' : '測驗'
                            }
                          </div>
                          <h3 className={cn(
                            "font-bold text-lg mb-1 leading-tight",
                            lesson.isLocked ? "text-gray-500" : "text-foreground"
                          )}>
                            {lesson.title}
                          </h3>
                          {lesson.titleJa && (
                            <p className="text-sm font-jp text-muted-foreground mb-2">
                              {lesson.titleJa}
                            </p>
                          )}
                          {!lesson.isLocked && (
                            <div className="flex items-center gap-3 mt-3">
                              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current"/> +{lesson.xpReward} XP
                              </span>
                              <span className="text-xs font-bold text-muted-foreground">
                                {lesson.estimatedMinutes} 分鐘
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {!lesson.isLocked && !lesson.isCompleted && (
                          <div className="shrink-0 bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <Play className="w-6 h-6 ml-1" />
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
