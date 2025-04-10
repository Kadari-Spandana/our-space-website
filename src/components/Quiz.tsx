import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  score: number;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "How have you been sleeping lately?",
    options: ["Very well", "Fairly well", "Not very well", "Having significant trouble"],
    score: 0
  },
  {
    id: 2,
    question: "How would you rate your energy levels?",
    options: ["High energy", "Moderate energy", "Low energy", "Very low energy"],
    score: 0
  },
  {
    id: 3,
    question: "How often do you feel anxious?",
    options: ["Rarely", "Sometimes", "Often", "Very often"],
    score: 0
  },
  {
    id: 4,
    question: "How would you describe your mood most days?",
    options: ["Generally positive", "Neutral", "Somewhat down", "Very low"],
    score: 0
  },
  {
    id: 5,
    question: "How well can you concentrate on tasks?",
    options: ["Very well", "Fairly well", "With some difficulty", "With great difficulty"],
    score: 0
  },
  {
    id: 6,
    question: "How often do you feel overwhelmed?",
    options: ["Rarely", "Sometimes", "Often", "Very often"],
    score: 0
  },
  {
    id: 7,
    question: "How do you feel about your future?",
    options: ["Very optimistic", "Somewhat optimistic", "Uncertain", "Pessimistic"],
    score: 0
  }
];

export function Quiz() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState("");

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateResults = () => {
    const totalQuestions = questions.length;
    const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
    const averageScore = totalScore / totalQuestions;

    if (averageScore < 1) {
      return "Your responses suggest you're managing well! Keep up the good work and continue practicing self-care.";
    } else if (averageScore < 2) {
      return "You're doing okay, but there might be some areas where you could use additional support.";
    } else if (averageScore < 3) {
      return "Your responses indicate you might be experiencing some challenges. Consider reaching out to a mental health professional.";
    } else {
      return "Your responses suggest you're going through a difficult time. We strongly recommend speaking with a mental health professional.";
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setResult(calculateResults());
      setShowResults(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Mental Wellness Check</h2>
      
      {!showResults ? (
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
              <select
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={(e) => handleAnswer(q.id, parseInt(e.target.value))}
                value={answers[q.id] || ""}
              >
                <option value="">Select an answer</option>
                {q.options.map((option, i) => (
                  <option key={i} value={i}>{option}</option>
                ))}
              </select>
            </div>
          ))}
          
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold
                     hover:bg-purple-700 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold mb-4">Your Results</h3>
          <p className="text-gray-700 mb-6">{result}</p>
          <button
            className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold
                     hover:bg-purple-700 transition-colors duration-300"
          >
            Connect with a Therapist
          </button>
        </div>
      )}
    </div>
  );
}