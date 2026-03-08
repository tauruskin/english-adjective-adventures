import { useState } from "react";
import { Question } from "@/hooks/useGameLogic";

interface FillInBlankProps {
  question: Question;
  onAnswer: (answer: string) => void;
  answered: boolean;
  correct: boolean | null;
}

const FillInBlank = ({ question, onAnswer, answered, correct }: FillInBlankProps) => {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);

  const sentence = question.sentence || "";
  const correctWord = question.correctWord.english;
  const parts = sentence.split("___");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || submitted) return;
    setSubmitted(true);
    onAnswer(input.trim());
  };

  const isCorrect = submitted && correct === true;
  const isWrong = submitted && correct === false;

  // After wrong: show correction after 1s
  if (isWrong && !showCorrection) {
    setTimeout(() => setShowCorrection(true), 1000);
  }

  const blankContent = () => {
    if (!submitted) return <span className="inline-block w-24 border-b-2 border-primary mx-1" />;

    if (isCorrect) {
      return (
        <span className="inline-block mx-1 font-bold text-success animate-slide-into-blank">
          {input}
        </span>
      );
    }

    if (isWrong && !showCorrection) {
      return (
        <span className="inline-block mx-1 font-bold text-destructive animate-shake">
          {input}
        </span>
      );
    }

    if (isWrong && showCorrection) {
      return (
        <span className="inline-block mx-1 font-bold text-success animate-slide-into-blank">
          {correctWord}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-body mb-2">Fill in the blank:</p>
        <p className="text-sm text-muted-foreground font-body mb-4">
          ({question.correctWord.ukrainian})
        </p>
        <p className="text-2xl font-body text-foreground leading-relaxed">
          {parts[0]}
          {blankContent()}
          {parts[1]}
        </p>
      </div>

      {!submitted && (
        <form onSubmit={handleSubmit} className="flex gap-3 justify-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the word..."
            className="px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground font-body text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-64"
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold font-body text-lg hover:scale-105 transition-transform"
          >
            Check
          </button>
        </form>
      )}

      {submitted && (
        <div className="text-center text-4xl animate-emoji-pop">
          {correct ? "🎉" : "😬"}
        </div>
      )}
    </div>
  );
};

export default FillInBlank;
