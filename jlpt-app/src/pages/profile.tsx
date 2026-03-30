import { useGetProgress, useGetAchievements } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, Zap, Flame, Brain, BookOpen } from "lucide-react";

export default function Profile() {
  const { data: progress, isLoading: progressLoading } = useGetProgress();
  const { data: achievements, isLoading: achievementsLoading } = useGetAchievements();

  if (progressLoading || achievementsLoading || !progress) {
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
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 border-2 border-border shadow-sm flex flex-col sm:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full border-4 border-primary/20 flex items-center justify-center p-2 relative">
            <img 
              src={`${import.meta.env.BASE_URL}images/sensei-avatar.png`} 
              alt="Avatar" 
              className="w-full h-full object-contain drop-shadow-md"
            />
            <div className="absolute -bottom-3 bg-secondary text-white font-black px-4 py-1 rounded-full border-2 border-white shadow-sm text-sm">
              Lvl {progress.level}
            </div>
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-display font-black text-secondary mb-2">學習者 (Default)</h1>
            <p className="text-muted-foreground font-bold mb-6">
              目前目標: {progress.currentJlptLevel.toUpperCase()}
            </p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <div className="bg-gray-50 px-4 py-2 rounded-2xl border-2 border-border flex items-center gap-2 font-bold">
                <Zap className="w-5 h-5 text-accent-dark fill-current" /> {progress.xp} XP
              </div>
              <div className="bg-orange-50 px-4 py-2 rounded-2xl border-2 border-orange-200 flex items-center gap-2 font-bold text-orange-700">
                <Flame className="w-5 h-5 text-orange-500 fill-current" /> {progress.streak} 日連勝
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <h2 className="text-2xl font-bold flex items-center gap-2 pt-4">
          <Brain className="w-6 h-6 text-primary" /> 學習統計
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "完成課堂", value: progress.totalLessonsCompleted, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
            { label: "答題數", value: progress.totalQuestionsAnswered, icon: Brain, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
            { label: "答對題數", value: progress.totalCorrectAnswers, icon: Trophy, color: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
            { label: "準確率", value: progress.totalQuestionsAnswered ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100) + '%' : '0%', icon: Zap, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
          ].map((stat, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border-2 ${stat.border} ${stat.bg} flex flex-col items-center text-center`}>
              <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
              <div className="text-2xl font-black font-display mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <h2 className="text-2xl font-bold flex items-center gap-2 pt-4">
          <Trophy className="w-6 h-6 text-accent-dark" /> 成就徽章
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {achievements && achievements.length > 0 ? (
            achievements.map((ach) => (
              <div key={ach.id} className="bg-white border-2 border-border p-4 rounded-3xl flex flex-col items-center text-center shadow-sm">
                <div className="text-4xl mb-3">{ach.icon}</div>
                <h3 className="font-bold mb-1 leading-tight">{ach.title}</h3>
                <p className="text-xs text-muted-foreground font-medium mb-3">{ach.description}</p>
                <div className="mt-auto bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-md">
                  +{ach.xpReward} XP
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-3xl">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground font-bold">繼續學習，解鎖更多成就！</p>
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
