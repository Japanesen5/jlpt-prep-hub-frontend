import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCheckSentence, SentenceCheckBodyTargetLevel } from "@workspace/api-client-react";
import { GameButton } from "@/components/ui/GameButton";
import { PenTool, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function SentenceBuilder() {
  const [sentence, setSentence] = useState("");
  const [level, setLevel] = useState<SentenceCheckBodyTargetLevel>("N5");
  const checkMutation = useCheckSentence();

  const handleCheck = () => {
    if (!sentence.trim()) return;
    checkMutation.mutate({
      data: { sentence, targetLevel: level }
    });
  };

  const result = checkMutation.data;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
        
        <header className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-accent/20 text-accent-dark rounded-3xl mx-auto flex items-center justify-center rotate-3 mb-4">
            <PenTool className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-black text-secondary">造句練習</h1>
          <p className="text-muted-foreground font-bold">自己試吓寫句日文，AI 老師幫你批改！</p>
        </header>

        <div className="bg-white rounded-3xl p-6 border-2 border-border shadow-sm space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["N5", "N4", "N3", "N2", "N1"].map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l as SentenceCheckBodyTargetLevel)}
                className={`px-4 py-1.5 rounded-lg font-bold text-sm border-2 transition-all shrink-0 ${
                  level === l 
                    ? "bg-primary/10 border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:bg-gray-50"
                }`}
              >
                目標 {l}
              </button>
            ))}
          </div>

          <textarea
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="例如：私は毎朝コーヒーを飲みます。"
            className="w-full min-h-[150px] p-5 text-lg font-jp rounded-2xl border-2 border-border focus:border-primary focus:ring-4 ring-primary/10 outline-none resize-none transition-all"
          />

          <GameButton 
            isFullWidth 
            onClick={handleCheck} 
            disabled={checkMutation.isPending || !sentence.trim()}
          >
            {checkMutation.isPending ? "批改中..." : "批改句子"}
          </GameButton>
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-3xl border-2 ${
              result.isCorrect ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"
            }`}>
              <div className="flex items-start gap-4">
                {result.isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-green-600 shrink-0 mt-1" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-orange-500 shrink-0 mt-1" />
                )}
                <div>
                  <h3 className={`text-xl font-black mb-2 ${result.isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                    {result.score} / 100 分
                  </h3>
                  <p className="font-bold text-foreground/80 whitespace-pre-wrap leading-relaxed">
                    {result.feedback}
                  </p>
                </div>
              </div>
            </div>

            {!result.isCorrect && result.corrections.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border-2 border-border shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-primary" /> 錯誤分析
                </h3>
                <div className="space-y-4">
                  {result.corrections.map((corr, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2 text-lg font-jp font-bold">
                        <span className="line-through text-red-500 decoration-2 decoration-red-500">{corr.original}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-green-600">{corr.corrected}</span>
                      </div>
                      <p className="text-sm font-bold text-muted-foreground bg-white px-3 py-2 rounded-lg inline-block shadow-sm">
                        {corr.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.naturalAlternative && (
              <div className="bg-blue-50 rounded-3xl p-6 border-2 border-blue-200 shadow-sm">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-blue-800">
                  <Lightbulb className="w-5 h-5" /> 更自然嘅講法 (Native-like)
                </h3>
                <p className="text-2xl font-jp font-bold text-blue-900 mb-2">
                  {result.naturalAlternative}
                </p>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </AppLayout>
  );
}
