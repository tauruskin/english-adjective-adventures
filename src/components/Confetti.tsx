import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
}

const colors = ["#f97316", "#fbbf24", "#34d399", "#f472b6", "#60a5fa", "#a78bfa"];

const Confetti = ({ active }: ConfettiProps) => {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; color: string; delay: number; size: number }>>([]);

  useEffect(() => {
    if (active) {
      setPieces(
        Array.from({ length: 50 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
          size: Math.random() * 8 + 4,
        }))
      );
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confetti-fall ${2 + Math.random() * 2}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
