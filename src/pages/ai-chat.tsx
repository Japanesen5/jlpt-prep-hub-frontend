import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAiChatStream } from "@/hooks/use-ai-chat";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AiChat() {
  const { messages, isStreaming, sendMessage } = useAiChatStream();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage({ message: input });
    setInput("");
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] max-w-3xl mx-auto bg-white rounded-3xl border-2 border-border shadow-sm overflow-hidden relative">
        
        {/* Header */}
        <header className="bg-primary px-6 py-4 flex items-center gap-4 text-white z-10 shadow-md">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">Sensei AI 老師</h2>
            <p className="text-primary-foreground/80 text-xs font-medium">廣東話講解・隨時問問題</p>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FFFDF7]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <img 
                src={`${import.meta.env.BASE_URL}images/sensei-avatar.png`} 
                alt="Sensei" 
                className="w-32 h-32 mb-6 drop-shadow-md"
              />
              <h3 className="font-bold text-xl text-secondary mb-2">有咩想問呀？</h3>
              <p className="text-muted-foreground font-medium max-w-sm">
                你可以用廣東話問我任何日文問題，例如「點解呢句要用 は 唔用 が？」
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm",
                  msg.role === "user" ? "bg-secondary" : "bg-primary"
                )}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl whitespace-pre-wrap font-medium leading-relaxed text-[15px]",
                  msg.role === "user" 
                    ? "bg-secondary text-white rounded-tr-sm" 
                    : "bg-white border-2 border-border text-foreground rounded-tl-sm shadow-sm"
                )}>
                  {msg.content || (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Sparkles className="w-4 h-4 animate-spin text-primary" /> 諗緊...
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-2 border-border z-10">
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入問題..."
              disabled={isStreaming}
              className="flex-1 bg-gray-50 border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-2 ring-primary/20 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="bg-primary hover:bg-primary-dark text-white p-3 px-5 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_3px_0_0_hsl(var(--primary-dark))] active:shadow-none active:translate-y-[3px]"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
