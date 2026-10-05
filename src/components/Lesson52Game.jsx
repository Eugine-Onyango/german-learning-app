import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_52_SCENARIOS } from '../data/germanLessons';

export default function Lesson52Game({ isSlowMode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQ = LESSON_52_SCENARIOS[currentQuestionIndex];

  const playTone = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(196, ctx.currentTime + 0.15); // G3
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      // Audio not available
    }
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = isSlowMode ? 0.7 : 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (index) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);

    const isCorrect = currentQ.options[index].correct;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      playTone('correct');
      if (streak + 1 >= 3) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    } else {
      setStreak(0);
      playTone('wrong');
    }

    speakText(currentQ.options[index].text);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);

    if (currentQuestionIndex + 1 < LESSON_52_SCENARIOS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = Math.round((score / LESSON_52_SCENARIOS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-indigo-100 text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-4xl shadow-lg shadow-indigo-200">
          🏆
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900">Quiz Completed!</h2>
          <p className="text-gray-500 text-sm mt-1">Fragepronomen "welch-" Mastery</p>
        </div>

        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2">
          <p className="text-4xl font-black text-indigo-600">{percentage}%</p>
          <p className="text-sm font-semibold text-gray-700">
            You scored {score} out of {LESSON_52_SCENARIOS.length} questions correctly!
          </p>
        </div>

        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          {percentage >= 80
            ? "🎉 Ausgezeichnet! You have mastered the definite article mirror rule for 'welcher, welche, welches, welchen, welchem' across all cases!"
            : "👍 Good effort! Remember: 'welch-' mirrors 'der, die, das, den, dem'. Try again for 100%!"}
        </p>

        <button
          onClick={handleRestart}
          className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 text-base"
        >
          🔄 Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 space-y-6">
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full">
            Question {currentQuestionIndex + 1} / {LESSON_52_SCENARIOS.length}
          </span>
          {streak > 1 && (
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full animate-bounce">
              🔥 {streak} Streak!
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-gray-400">
          Score: <span className="text-indigo-600 font-extrabold">{score}</span>
        </span>
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug">
          {currentQ.scenario}
        </h3>
        {currentQ.hint && (
          <p className="text-xs text-indigo-600 font-medium bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 inline-block">
            💡 Hint clue: <span className="font-bold">{currentQ.hint}</span>
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {currentQ.options.map((option, idx) => {
          let btnStyle = 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 bg-white text-gray-800';

          if (showFeedback) {
            if (option.correct) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 font-bold';
            } else if (selectedOption === idx) {
              btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-300';
            } else {
              btnStyle = 'border-gray-200 bg-gray-50 text-gray-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 shadow-sm text-sm sm:text-base leading-relaxed ${btnStyle}`}
            >
              <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 font-medium">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {showFeedback && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
          currentQ.options[selectedOption]?.correct
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          <p className="font-bold flex items-center gap-1.5 text-sm">
            {currentQ.options[selectedOption]?.correct ? '✨ Richtig! (Correct)' : '❌ Nicht ganz! (Not quite)'}
          </p>
          <p>{currentQ.options[selectedOption]?.explain}</p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              {currentQuestionIndex + 1 < LESSON_52_SCENARIOS.length ? 'Next Question ➔' : 'View Results 🏆'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
