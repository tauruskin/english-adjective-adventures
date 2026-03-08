interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
  streak: number;
}

const ProgressBar = ({ current, total, score, streak }: ProgressBarProps) => {
  const progress = ((current) / total) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-sm font-bold font-body">
        <span className="text-foreground">
          Question {current + 1} of {total}
        </span>
        <span className="text-primary">
          Score: {score} / {current}
        </span>
      </div>

      <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {streak >= 3 && (
        <div className="flex items-center justify-center gap-1 text-sm font-bold text-primary animate-streak-fire">
          <span>🔥</span>
          <span>{streak} streak!</span>
          <span>🔥</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
