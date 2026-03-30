import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Dashboard from "@/pages/dashboard";
import Lessons from "@/pages/lessons";
import LessonDetail from "@/pages/lesson-detail";
import Quiz from "@/pages/quiz";
import KanaGame from "@/pages/game";
import Review from "@/pages/review";
import AiChat from "@/pages/ai-chat";
import SentenceBuilder from "@/pages/sentence-builder";
import Profile from "@/pages/profile";
import KanaChart from "@/pages/kana-chart";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/lessons" component={Lessons} />
      <Route path="/lessons/:level" component={Lessons} />
      <Route path="/lessons/:level/:id" component={LessonDetail} />
      <Route path="/quiz/:lessonId" component={Quiz} />
      <Route path="/game/kana" component={KanaGame} />
      <Route path="/review" component={Review} />
      <Route path="/ai-chat" component={AiChat} />
      <Route path="/sentence-builder" component={SentenceBuilder} />
      <Route path="/profile" component={Profile} />
      <Route path="/kana-chart" component={KanaChart} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
