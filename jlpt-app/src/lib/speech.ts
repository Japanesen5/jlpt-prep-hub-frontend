let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakJapanese(text: string, rate = 0.85): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "ja-JP";
  currentUtterance.rate = rate;
  currentUtterance.pitch = 1.0;
  window.speechSynthesis.speak(currentUtterance);
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
