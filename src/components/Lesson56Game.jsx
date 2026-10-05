import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_56_SCENARIOS } from '../data/germanLessons';

export default function Lesson56Game({ isSlowMode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQ = LESSON_56_SCENARIOS[currentQuestionIndex];

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

    if (currentQuestionIndex + 1 < LESSON_56_SCENARIOS.length) {
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
    const percentage = Math.round((score / LESSON_56_SCENARIOS.length) * 100);
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 max-w-2xl mx-auto text-center space-y-6">
        <div className="text-6xl animate-bounce">⏱️</div>
        <h2 className="text-3xl font-black text-slate-800">
          Zeit-Champion! (Time Adverb Master)
        </h2>
        <p className="text-slate-600 text-lg">
          You mastered habitual days (-s), 3-era timelines, sequence chains (zuerst ➔ dann), and frequency scales!
        </p>

        <div className="bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl p-6 border border-indigo-100 max-w-sm mx-auto">
          <div className="text-4xl font-black text-indigo-600">{percentage}%</div>
          <div className="text-sm font-semibold text-slate-500 mt-1">
            {score} of {LESSON_56_SCENARIOS.length} Scenarios Solved
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-200 hover:scale-105 active:scale-95 transition-all text-base"
        >
          🔄 Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      {/* Top Bar: Progress & Streak */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            Scenario {currentQuestionIndex + 1} of {LESSON_56_SCENARIOS.length}
          </span>
          {streak >= 2 && (
            <span className="text-xs font-black px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full animate-pulse flex items-center gap-1">
              🔥 {streak} Streak!
            </span>
          )}
        </div>
        <div className="text-xs font-bold text-slate-400">
          Score: {score}/{LESSON_56_SCENARIOS.length}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-snug">
          {currentQ.scenario}
        </h3>
        {currentQ.hint && (
          <p className="text-xs text-indigo-600 bg-indigo-50/70 inline-block px-3 py-1 rounded-lg font-medium">
            💡 Hint: {currentQ.hint}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 pt-2">
        {currentQ.options.map((option, idx) => {
          let btnStyle = "bg-slate-50 hover:bg-indigo-50/50 border-slate-200 text-slate-800";
          if (showFeedback) {
            if (option.correct) {
              btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-200";
            } else if (selectedOption === idx) {
              btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-200";
            } else {
              btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${btnStyle}`}
            >
              <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0 text-slate-600">
                {String.fromCharCode(65 + idx)}
              </span>
              <div className="space-y-1 flex-1">
                <div className="text-sm md:text-base">{option.text}</div>
                {showFeedback && (
                  <div className={`text-xs mt-1 ${option.correct ? 'text-emerald-700 font-medium' : 'text-rose-600'}`}>
                    {option.explain}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {showFeedback && (
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold rounded-2xl shadow-md hover:shadow-indigo-200 hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2"
          >
            <span>{currentQuestionIndex + 1 < LESSON_56_SCENARIOS.length ? 'Next Scenario' : 'See Results'}</span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
