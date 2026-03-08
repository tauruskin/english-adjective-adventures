interface TeacherCharacterProps {
  state: "thinking" | "correct" | "wrong" | "celebrate" | "sad";
}

const BASE = import.meta.env.BASE_URL;

const images: Record<TeacherCharacterProps["state"], string> = {
  thinking: `${BASE}images/teacher-thinking.png`,
  correct: `${BASE}images/teacher-correct.png`,
  wrong: `${BASE}images/teacher-sad.png`,
  celebrate: `${BASE}images/teacher-celebrate.png`,
  sad: `${BASE}images/teacher-sad.png`,
};

const TeacherCharacter = ({ state }: TeacherCharacterProps) => {
  const animClass =
    state === "correct"
      ? "animate-bounce-in"
      : state === "wrong"
      ? "animate-shake"
      : state === "celebrate"
      ? "animate-bounce-in"
      : "";

  return (
    <div className={`hidden lg:block ${animClass}`}>
      <img
        src={images[state]}
        alt="Teacher"
        className="w-48 h-auto drop-shadow-lg"
      />
    </div>
  );
};

export default TeacherCharacter;
