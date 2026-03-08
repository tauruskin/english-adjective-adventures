import Confetti from "./Confetti";
import TeacherCharacter from "./TeacherCharacter";

interface EndScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const EndScreen = ({ score, total, onRestart }: EndScreenProps) => {
  const isPerfect = score === total;
  const isGood = score >= 7;

  const message = isPerfect
    ? "PERFECT! 🏆"
    : isGood
    ? "Great job! 🎉"
    : "Keep practicing! 💪";

  const teacherState = isGood ? "celebrate" : "sad";

  return (
    <div className="flex flex-col items-center gap-8 animate-bounce-in">
      <Confetti active={isGood} />

      <TeacherCharacter state={teacherState} />

      <h2 className="text-4xl font-display text-foreground">{message}</h2>

      <div className="text-6xl font-display text-primary">
        {score} / {total}
      </div>

      <p className="text-lg text-muted-foreground font-body">
        {isPerfect
          ? "You're a vocabulary master!"
          : isGood
          ? "You're doing great!"
          : "Practice makes perfect!"}
      </p>

      <button
        onClick={onRestart}
        className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold font-body text-xl hover:scale-105 transition-transform shadow-lg"
      >
        Play Again 🔄
      </button>
    </div>
  );
};

export default EndScreen;
