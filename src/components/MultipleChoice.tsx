import { useState } from "react";
import { Question } from "@/hooks/useGameLogic";

interface MultipleChoiceProps {
  question: Question;
  onAnswer: (answer: string) => void;
  answered: boolean;
  correct: boolean | null;
}

const MultipleChoice = ({ question, onAnswer, answered, correct }: MultipleChoiceProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const isEnToUa = question.type === "en-to-ua";
  const prompt = isEnToUa ? question.correctWord.english : question.correctWord.ukrainian;
  const correctAnswer = isEnToUa ? question.correctWord.ukrainian : question.correctWord.english;

  const handleClick = (option: string) => {
    if (answered) return;
    setSelected(option);
    onAnswer(option);
  };

  const getButtonClasses = (option: string) => {
    const base =
      "w-full p-4 rounded-xl text-lg font-bold font-body border-2 transition-all duration-200";

    if (!answered) {
      return `${base} border-border bg-card hover:bg-secondary hover:scale-105 hover:shadow-md cursor-pointer`;
    }

    if (option === correctAnswer) {
      return `${base} border-success bg-success/10 text-success animate-bounce-in`;
    }

    if (option === selected && option !== correctAnswer) {
      return `${base} border-destructive bg-destructive/10 text-destructive animate-shake`;
    }

    return `${base} border-border bg-card opacity-50`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-body mb-2">
          {isEnToUa ? "Choose the Ukrainian translation:" : "Choose the English word:"}
        </p>
        <h2 className="text-3xl font-display text-foreground">{prompt}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={getButtonClasses(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>

      {answered && (
        <div className="text-center text-4xl animate-emoji-pop">
          {correct ? "🎉" : "😬"}
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
