import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_65_SCENARIOS } from '../data/germanLessons';
import { playChime, speakGerman } from '../utils/sound';

export default function Lesson65Game({ isSlowMode }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = LESSON_65_SCENARIOS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = scenario.options[idx].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      playChime('success');
      speakGerman(scenario.options[idx].text, isSlowMode);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 }
        });
      } catch (e) {
        // Fallback safe
      }
    } else {
      setStreak(0);
      playChime('wrong');
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < LESSON_65_SCENARIOS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      playChime('click');
    } else {
      setGameFinished(true);
      try {
        confetti({
          particleCount: 150,
          spread: 100,
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
    playChime('click');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-teal-200 overflow-hidden mb-8 max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-800 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm mb-2">
              <span>🎯</span> Lesson 65 Blitz Challenge
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              A1 Grammar & Vocabulary Speed Quiz
            </h2>
            <p className="text-teal-100 text-xs sm:text-sm mt-1">
              Test your rapid-fire intuition on verb endings, word inversion, time prepositions, and modal brackets!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 px-3 py-1.5 rounded-xl text-center backdrop-blur-sm">
              <span className="text-[10px] text-teal-200 uppercase font-bold block">Score</span>
              <span className="text-lg font-black">{score}/{LESSON_65_SCENARIOS.length}</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl text-center backdrop-blur-sm">
              <span className="text-[10px] text-teal-200 uppercase font-bold block">Streak</span>
              <span className="text-lg font-black text-amber-300">🔥 {streak}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-black/20 h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIdx + (gameFinished ? 1 : 0)) / LESSON_65_SCENARIOS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Challenge Area */}
      <div className="p-6">
        {!gameFinished ? (
          <div className="space-y-6">
            {/* Question Card */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50/40 p-5 rounded-2xl border-2 border-teal-200 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📝</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                      Question {currentIdx + 1} of {LESSON_65_SCENARIOS.length}
                    </span>
                    <button
                      onClick={() => speakGerman(scenario.scenario, isSlowMode)}
                      className="w-7 h-7 rounded-full bg-teal-100 hover:bg-teal-200 text-teal-800 flex items-center justify-center text-xs transition-all"
                      title="Listen"
                    >
                      🔊
                    </button>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 leading-snug">
                    {scenario.scenario}
                  </h3>
                  {scenario.hint && (
                    <p className="text-xs text-stone-600 mt-2 bg-white/80 p-2.5 rounded-xl border border-teal-200">
                      💡 <strong>Clue:</strong> {scenario.hint}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {scenario.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                let btnStyle = "bg-white border-stone-200 hover:border-teal-400 text-stone-800 hover:bg-teal-50/30";

                if (isAnswered) {
                  if (opt.correct) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-300";
                  } else if (isSelected && !opt.correct) {
                    btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-300";
                  } else {
                    btnStyle = "bg-stone-50 border-stone-200 text-stone-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-xs font-bold text-stone-600 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{opt.text}</p>
                      {isAnswered && (isSelected || opt.correct) && (
                        <p className={`text-xs mt-2 pt-2 border-t ${opt.correct ? 'border-emerald-200 text-emerald-800' : 'border-rose-200 text-rose-800'}`}>
                          {opt.explain}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>{currentIdx + 1 < LESSON_65_SCENARIOS.length ? "Next Question" : "View Final Score"}</span>
                  <span>➔</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion View */
          <div className="text-center py-8 space-y-6">
            <span className="text-6xl animate-bounce inline-block">🌟</span>
            <div>
              <h3 className="text-2xl font-black text-stone-900">
                A1 Master Speed Quiz Completed!
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                You scored <strong className="text-teal-700 text-lg">{score}</strong> out of <strong className="text-lg">{LESSON_65_SCENARIOS.length}</strong> questions correctly!
              </p>
            </div>

            <div className="max-w-md mx-auto bg-teal-50 p-4 rounded-xl border border-teal-200 text-xs text-teal-900 font-semibold">
              {score === LESSON_65_SCENARIOS.length ? (
                <p>🏆 Perfekt! You have flawless intuition on German A1 fundamentals: verb endings, question forms, cases, and word orders! Wunderbar!</p>
              ) : (
                <p>💪 Great job! Review the 20-question Diagnostic Exam and cheat sheet in Tab 1 & 2 to lock in a 100% mastery score!</p>
              )}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
