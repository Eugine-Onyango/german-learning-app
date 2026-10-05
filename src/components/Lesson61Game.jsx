import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_61_SCENARIOS } from '../data/germanLessons';
import { speakGerman } from '../utils/sound';

export default function Lesson61Game({ isSlowMode }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = LESSON_61_SCENARIOS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = scenario.options[idx].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      speakGerman(scenario.options[idx].text, isSlowMode);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {
        // Safe confetti fallback
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < LESSON_61_SCENARIOS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setGameFinished(true);
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setGameFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Game Header Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-yellow-800 to-stone-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>🎯</span> Lesson 61 Challenge
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100">
            Post & Versand Quiz-Meister
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm">
            Test your knowledge of postal terms, counter requests, registered mail, and envelope addressing!
          </p>
        </div>

        {/* Score & Streak Counters */}
        <div className="flex items-center gap-3 z-10">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-300 block">Score</span>
            <span className="text-xl font-black text-amber-300">{score} / {LESSON_61_SCENARIOS.length}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-300 block">Streak</span>
            <span className="text-xl font-black text-emerald-300">🔥 {streak}</span>
          </div>
        </div>
      </div>

      {!gameFinished ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-md space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIdx + 1} of {LESSON_61_SCENARIOS.length}</span>
              <span>{Math.round(((currentIdx) / LESSON_61_SCENARIOS.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / LESSON_61_SCENARIOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Prompt */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2">
            <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🏤</span> Post Scenario:
            </span>
            <p className="text-stone-900 font-bold text-base sm:text-lg leading-snug">
              {scenario.scenario}
            </p>
            {scenario.hint && (
              <p className="text-xs text-stone-500 italic mt-1">
                💡 <strong>Hint:</strong> {scenario.hint}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {scenario.options.map((opt, idx) => {
              let btnStyle = "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200";

              if (isAnswered) {
                if (opt.correct) {
                  btnStyle = "bg-emerald-100 text-emerald-950 border-emerald-500 ring-2 ring-emerald-400 font-extrabold";
                } else if (selectedOpt === idx) {
                  btnStyle = "bg-rose-100 text-rose-950 border-rose-400 ring-2 ring-rose-400";
                } else {
                  btnStyle = "bg-stone-50 text-stone-400 border-stone-200 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-semibold text-sm sm:text-base transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="flex-1">{opt.text}</span>
                  {isAnswered && opt.correct && (
                    <span className="text-emerald-700 font-black text-lg">✓</span>
                  )}
                  {isAnswered && selectedOpt === idx && !opt.correct && (
                    <span className="text-rose-700 font-black text-lg">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Button */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-200 space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <span>💡</span> Why this is correct:
                </span>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                  {scenario.options[selectedOpt]?.explain || scenario.options.find(o => o.correct)?.explain}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-amber-100 font-bold rounded-2xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>{currentIdx + 1 < LESSON_61_SCENARIOS.length ? 'Next Question' : 'View Results'}</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* End Game Score Card */
        <div className="bg-white p-8 rounded-3xl border-2 border-stone-200 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
            {score >= LESSON_61_SCENARIOS.length - 1 ? '🏆' : '🎉'}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {score === LESSON_61_SCENARIOS.length
                ? 'Ausgezeichnet! Post-Meister!'
                : score >= 4
                ? 'Sehr Gut! Great Progress on Postal Terms!'
                : 'Keep Practicing! Review the Slides & Try Again!'}
            </h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              You scored <strong className="text-amber-800 font-black">{score} out of {LESSON_61_SCENARIOS.length}</strong> on the Lesson 61 Post office challenge.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-8 py-3.5 bg-amber-800 hover:bg-amber-900 text-amber-100 font-extrabold rounded-2xl shadow-md transition-all text-sm flex items-center gap-2"
            >
              <span>🔄</span> Try Challenge Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
