import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_59_SCENARIOS } from '../data/germanLessons';

export default function Lesson59Game({ isSlowMode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQ = LESSON_59_SCENARIOS[currentQuestionIndex];

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

    if (currentQuestionIndex + 1 < LESSON_59_SCENARIOS.length) {
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
    const percentage = Math.round((score / LESSON_59_SCENARIOS.length) * 100);
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-4xl shadow-lg text-white">
          🏨
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Hotelreservierung Abgeschlossen!
          </h2>
          <p className="text-slate-500 mt-2">
            You scored <span className="font-bold text-amber-600">{score}</span> out of {LESSON_59_SCENARIOS.length} ({percentage}%)
          </p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-left space-y-2">
          <h3 className="font-bold text-amber-950 flex items-center gap-2">
            <span>🎉</span>
            <span>Mastery Summary: Hotelreservierung</span>
          </h3>
          <p className="text-sm text-amber-800">
            You know how to book single (<em>EZ</em>) and double (<em>DZ</em>) rooms, select meal plans (*Frühstück*, *Halbpension/HP*, *Vollpension/VP*), write formal German reservation letters (*Sehr geehrte Damen und Herren*), state arrival & date ranges (*vom... bis zum...*), and make special requests like *Meeresblick* and pet inquiries (*Hunde erlaubt*)!
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          Train Again 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Question {currentQuestionIndex + 1} of {LESSON_59_SCENARIOS.length}
          </span>
          <h3 className="text-lg font-bold text-slate-800">Hotel-Challenge 🏨</h3>
        </div>
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <span className="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full animate-bounce">
              🔥 {streak} Streak!
            </span>
          )}
          <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="space-y-3">
        <p className="text-lg font-bold text-slate-900 leading-snug">
          {currentQ.scenario}
        </p>
        {currentQ.hint && (
          <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            💡 <strong>Hint:</strong> {currentQ.hint}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQ.options.map((option, idx) => {
          let btnStyle = "border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 text-slate-800";
          if (showFeedback) {
            if (option.correct) {
              btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300";
            } else if (selectedOption === idx) {
              btnStyle = "border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-300";
            } else {
              btnStyle = "border-slate-200 opacity-50 text-slate-400";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 ${btnStyle}`}
            >
              <span className="text-sm md:text-base">{option.text}</span>
              {showFeedback && option.correct && <span className="text-emerald-600 text-lg font-bold">✓</span>}
              {showFeedback && selectedOption === idx && !option.correct && (
                <span className="text-rose-600 text-lg font-bold">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Alert */}
      {showFeedback && (
        <div
          className={`p-4 rounded-2xl text-sm ${
            currentQ.options[selectedOption].correct
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5 mb-1">
            {currentQ.options[selectedOption].correct ? '🎉 Richtig! (Correct)' : '❌ Nicht ganz (Not quite)'}
          </div>
          <p>{currentQ.options[selectedOption].explain}</p>
        </div>
      )}

      {/* Next Button */}
      {showFeedback && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg transition-all"
        >
          {currentQuestionIndex + 1 < LESSON_59_SCENARIOS.length ? 'Next Question ➔' : 'View Results 🎉'}
        </button>
      )}
    </div>
  );
}
