import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, BookOpen, Brain, MessageCircle, User, Zap, Grid2x2 } from "lucide-react";
import { useGetProgress } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const { data: progress } = useGetProgress();

  const navItems = [
    { href: "/", label: "主頁", icon: Home },
    { href: "/lessons", label: "課程", icon: BookOpen },
    { href: "/kana-chart", label: "五十音", icon: Grid2x2 },
    { href: "/review", label: "溫習", icon: Brain },
    { href: "/ai-chat", label: "AI 老師", icon: MessageCircle },
    { href: "/profile", label: "我的", icon: User },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-7xl mx-auto md:px-6 xl:px-8">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 pt-8 pb-6 pr-6 sticky top-0 h-screen border-r border-border">
        <Link href="/" className="flex items-center gap-3 mb-12 px-4 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="bg-primary text-white p-2 rounded-xl rotate-3 shadow-sm">
            <span className="font-display font-black text-xl">日</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-secondary">JLPT Master</h1>
        </Link>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className="block">
                <div className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 border-2",
                  isActive 
                    ? "bg-primary/10 text-primary border-primary/20" 
                    : "text-muted-foreground border-transparent hover:bg-gray-100 hover:text-foreground hover:border-gray-200"
                )}>
                  <item.icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-lg">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {progress && (
          <div className="mt-auto px-4 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm font-bold text-muted-foreground mb-3">
              <span>今日進度</span>
              <span className="text-accent-dark flex items-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {progress.streak} 日
              </span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.min(100, (progress.dailyXpEarned / progress.dailyXpGoal) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-center mt-2 font-bold text-muted-foreground">
              {progress.dailyXpEarned} / {progress.dailyXpGoal} XP
            </p>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-[100dvh] pb-24 md:pb-8 pt-6 px-4 md:px-8">
        {/* Mobile Header (Only visible on mobile) */}
        <header className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg rotate-3 shadow-sm">
              <span className="font-display font-black text-sm">日</span>
            </div>
            <h1 className="font-display font-bold text-lg text-secondary">JLPT Master</h1>
          </div>
          {progress && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-accent-dark font-bold bg-accent/10 px-2.5 py-1 rounded-lg">
                <Zap className="w-4 h-4 fill-current" /> {progress.streak}
              </div>
              <div className="bg-secondary text-white font-bold text-sm px-2.5 py-1 rounded-lg">
                Lvl {progress.level}
              </div>
            </div>
          )}
        </header>

        <div className="flex-1 w-full max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border pb-safe z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center justify-center">
                <div className={cn(
                  "p-1.5 rounded-xl transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}>
                  <item.icon className={cn("w-6 h-6", isActive && "fill-current/20")} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold mt-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
