import { useEffect } from "react";
import { useGameLogic } from "@/hooks/useGameLogic";
import ProgressBar from "@/components/ProgressBar";
import TeacherCharacter from "@/components/TeacherCharacter";
import MultipleChoice from "@/components/MultipleChoice";
import FillInBlank from "@/components/FillInBlank";
import EndScreen from "@/components/EndScreen";

const BASE = import.meta.env.BASE_URL;

const Index = () => {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    streak,
    gameState,
    lastAnswerCorrect,
    checkAnswer,
    nextQuestion,
    restart,
  } = useGameLogic(10);

  // Auto-advance after answer
  useEffect(() => {
    if (gameState !== "answered") return;

    const delay = lastAnswerCorrect
      ? 2000
      : currentQuestion?.type === "fill-blank"
      ? 4000
      : 2000;

    const timer = setTimeout(nextQuestion, delay);
    return () => clearTimeout(timer);
  }, [gameState, lastAnswerCorrect, nextQuestion, currentQuestion?.type]);

  const teacherState =
    gameState === "playing"
      ? "thinking"
      : lastAnswerCorrect
      ? "correct"
      : "wrong";

  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <EndScreen score={score} total={totalQuestions} onRestart={restart} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl flex items-start gap-6">
          <TeacherCharacter state={teacherState} />

          <div className="flex-1 space-y-6">
            <ProgressBar
              current={currentIndex}
              total={totalQuestions}
              score={score}
              streak={streak}
            />

            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border">
              {currentQuestion?.type === "fill-blank" ? (
                <FillInBlank
                  key={currentIndex}
                  question={currentQuestion}
                  onAnswer={checkAnswer}
                  answered={gameState === "answered"}
                  correct={lastAnswerCorrect}
                />
              ) : currentQuestion ? (
                <MultipleChoice
                  key={currentIndex}
                  question={currentQuestion}
                  onAnswer={checkAnswer}
                  answered={gameState === "answered"}
                  correct={lastAnswerCorrect}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const BASE = import.meta.env.BASE_URL;
  return (
    <header className="flex items-center justify-center gap-3 py-4 px-4 border-b border-border bg-card">
      <img
        src={`${BASE}images/logo.png`}
        alt="EnglishPusher Logo"
        className="h-10"
      />
      <div className="text-center">
        <h1 className="text-xl font-display text-foreground leading-tight">
          EnglishPusher Trivia
        </h1>
        <p className="text-xs text-muted-foreground font-body">
          Adjectives for Feelings
        </p>
      </div>
    </header>
  );
};

export default Index;
