import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_46_SCENARIOS } from '../data/germanLessons';

export default function Lesson46Game({ isSlowMode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQ = LESSON_46_SCENARIOS[currentQuestionIndex];

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
      // Audio not available or allowed
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
          origin: { y: 0.7 }
        });
      }
    } else {
      setStreak(0);
      playTone('wrong');
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);

    if (currentQuestionIndex + 1 < LESSON_46_SCENARIOS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
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
    const percentage = Math.round((score / LESSON_46_SCENARIOS.length) * 100);

    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-200 text-center space-y-6 animate-fadeIn">
        <div className="text-6xl animate-bounce">🏖️</div>
        <h2 className="text-3xl font-black text-stone-900">
          Vacation & Holiday Quiz Mastered!
        </h2>
        <div className="text-5xl font-extrabold text-amber-600 font-mono">
          {score} / {LESSON_46_SCENARIOS.length}
        </div>
        <p className="text-base sm:text-lg text-stone-600 max-w-lg mx-auto">
          {percentage >= 80
            ? "🎉 Wunderschön! You can now talk effortlessly about your vacations, hotels, destinations, and past adventures in German!"
            : "Great job! Take another spin through the Vacation Diary Studio and try the quiz again to score a perfect 100%!"}
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-black rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            🔄 Retake Challenge
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-stone-200 space-y-6 animate-fadeIn">
      {/* Progress & Header */}
      <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
            Urlaub & Ferien Challenge
          </span>
          <h3 className="text-lg sm:text-xl font-black text-stone-900">
            Question {currentQuestionIndex + 1} of {LESSON_46_SCENARIOS.length}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-1 rounded-full border border-amber-300 animate-pulse">
              🔥 {streak} Streak
            </span>
          )}
          <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-full">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="bg-amber-50 p-5 sm:p-6 rounded-2xl border border-amber-200 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <p className="text-base sm:text-lg font-extrabold text-amber-950 leading-relaxed">
            {currentQ.scenario}
          </p>
          <button
            onClick={() => speakText(currentQ.scenario)}
            className="p-2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl transition-all"
            title="Read question"
          >
            🔊
          </button>
        </div>
        <div className="text-xs text-amber-800 font-medium bg-white/70 p-2.5 rounded-xl">
          💡 <strong>Hint:</strong> {currentQ.hint}
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800";
          if (showFeedback) {
            if (opt.correct) {
              btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
            } else if (selectedOption === idx) {
              btnStyle = "bg-red-100 border-red-500 text-red-950 line-through";
            } else {
              btnStyle = "bg-stone-100 border-stone-200 text-stone-400 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              disabled={showFeedback}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-sm sm:text-base font-semibold ${btnStyle}`}
            >
              <span>{opt.text}</span>
              {showFeedback && opt.correct && <span className="text-xl">✅</span>}
              {showFeedback && selectedOption === idx && !opt.correct && <span className="text-xl">❌</span>}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showFeedback && (
        <div className={`p-4 rounded-2xl border text-sm animate-fadeIn space-y-2 ${
          currentQ.options[selectedOption].correct
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="font-bold flex items-center justify-between">
            <span>
              {currentQ.options[selectedOption].correct ? '🎉 Wunderbar!' : '💡 Explanation:'}
            </span>
            <button
              onClick={() => speakText(currentQ.options[selectedOption].explain)}
              className="text-xs px-2 py-1 bg-white/60 hover:bg-white rounded-lg transition-all"
            >
              🔊 Listen
            </button>
          </div>
          <p>{currentQ.options[selectedOption].explain}</p>
        </div>
      )}

      {/* Footer / Next Button */}
      {showFeedback && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all text-sm flex items-center gap-2"
          >
            <span>{currentQuestionIndex + 1 === LESSON_46_SCENARIOS.length ? 'Show Certificate' : 'Next Question'}</span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
