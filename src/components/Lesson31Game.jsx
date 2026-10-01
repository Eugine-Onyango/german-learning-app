import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Target, Gift } from 'lucide-react';
import { LESSON_31_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson31Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_31_SCENARIOS[currentIndex];

  const handleSelect = (option, idx) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    if (option.correct) {
      playChime('success');
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      speakGerman(option.text, isSlowMode);
    } else {
      playChime('wrong');
    }
  };

  const handleNext = () => {
    playChime('click');
    if (currentIndex + 1 < LESSON_31_SCENARIOS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    playChime('click');
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 text-white p-6 rounded-3xl shadow-xl border-4 border-purple-400/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
          <Target className="w-4 h-4 text-amber-300" />
          Lesson 31 Quiz Challenge • Artikel im Dativ
        </div>
        <h2 className="text-2xl md:text-3xl font-black">
          The Dative Receiver Quiz 🎁
        </h2>
        <p className="text-purple-100 text-xs md:text-sm">
          Pick the correct Dative article (dem, der, dem, den+n, einem, einer) for each real-life scenario!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIndex + 1} of {LESSON_31_SCENARIOS.length}</span>
              <span>Score: {score} / {currentIndex + (showResult ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / LESSON_31_SCENARIOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div className="text-base md:text-lg font-bold text-stone-800 dark:text-stone-100">
                  {currentQ.scenario}
                </div>
              </div>
            </div>

            {currentQ.hint && (
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800/50">
                <Lightbulb className="w-4 h-4 shrink-0" />
                <span><strong>Hint:</strong> {currentQ.hint}</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = "bg-stone-50 dark:bg-stone-700/60 border-stone-200 dark:border-stone-600 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200";

              if (showResult) {
                if (option.correct) {
                  btnStyle = "bg-purple-100 dark:bg-purple-950/60 border-purple-500 text-purple-900 dark:text-purple-100 font-bold ring-2 ring-purple-400";
                } else if (isSelected) {
                  btnStyle = "bg-red-100 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-100 font-bold";
                } else {
                  btnStyle = "opacity-50 border-stone-200 dark:border-stone-700";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showResult}
                  onClick={() => handleSelect(option, idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="text-base font-semibold">{option.text}</span>
                  {showResult && option.correct && (
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                  )}
                  {showResult && isSelected && !option.correct && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-700/50 border border-stone-200 dark:border-stone-600 space-y-3 animate-fade-in">
              <div className="text-sm font-medium text-stone-700 dark:text-stone-300 leading-relaxed">
                {currentQ.options[selectedOption]?.explain}
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 active:scale-95 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{currentIndex + 1 < LESSON_31_SCENARIOS.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completion Certificate Screen */
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border-2 border-purple-400 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full flex items-center justify-center text-4xl shadow-xl">
            🏆
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
              Lesson 31 Completed!
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              You scored <span className="font-bold text-purple-600 text-lg">{score}</span> out of <span className="font-bold text-stone-700 dark:text-stone-200">{LESSON_31_SCENARIOS.length}</span>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
            🎉 <strong>Dative Mastery Unlocked:</strong> You now know the famous <strong>M - R - M - N</strong> formula (<em>dem, der, dem, den + n</em>) and can fluently identify who is receiving gifts, help, meals, or gratitude in German!
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3.5 bg-purple-700 hover:bg-purple-800 active:scale-95 text-white font-bold rounded-2xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
