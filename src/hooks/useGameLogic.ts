import { useState, useCallback, useMemo } from "react";
import { wordData, fillInBlankSentences, WordEntry } from "@/data/wordData";

export type QuestionType = "en-to-ua" | "ua-to-en" | "fill-blank";

export interface Question {
  type: QuestionType;
  correctWord: WordEntry;
  options?: string[];
  sentence?: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(count: number): Question[] {
  const selected = shuffle(wordData).slice(0, count);
  return selected.map((word) => {
    const type: QuestionType = (["en-to-ua", "ua-to-en", "fill-blank"] as const)[
      Math.floor(Math.random() * 3)
    ];

    if (type === "fill-blank") {
      return {
        type,
        correctWord: word,
        sentence: fillInBlankSentences[word.english] || `I feel ___ today.`,
      };
    }

    const isEnToUa = type === "en-to-ua";
    const correctAnswer = isEnToUa ? word.ukrainian : word.english;
    const pool = wordData
      .filter((w) => w.english !== word.english)
      .map((w) => (isEnToUa ? w.ukrainian : w.english));
    const distractors = shuffle(pool).slice(0, 3);
    const options = shuffle([correctAnswer, ...distractors]);

    return { type, correctWord: word, options };
  });
}

export type GameState = "playing" | "answered" | "finished";

export function useGameLogic(questionsPerRound = 10) {
  const [questions, setQuestions] = useState<Question[]>(() =>
    generateQuestions(questionsPerRound)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[currentIndex] || null;

  const checkAnswer = useCallback(
    (answer: string) => {
      if (!currentQuestion || gameState === "answered") return;

      const correct =
        currentQuestion.type === "ua-to-en"
          ? answer.toLowerCase().trim() === currentQuestion.correctWord.english.toLowerCase()
          : currentQuestion.type === "en-to-ua"
          ? answer === currentQuestion.correctWord.ukrainian
          : answer.toLowerCase().trim() === currentQuestion.correctWord.english.toLowerCase();

      setLastAnswerCorrect(correct);
      setGameState("answered");

      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
    },
    [currentQuestion, gameState]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setGameState("finished");
    } else {
      setCurrentIndex((i) => i + 1);
      setGameState("playing");
      setLastAnswerCorrect(null);
    }
  }, [currentIndex, questions.length]);

  const restart = useCallback(() => {
    setQuestions(generateQuestions(questionsPerRound));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setGameState("playing");
    setLastAnswerCorrect(null);
  }, [questionsPerRound]);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    score,
    streak,
    gameState,
    lastAnswerCorrect,
    checkAnswer,
    nextQuestion,
    restart,
  };
}
