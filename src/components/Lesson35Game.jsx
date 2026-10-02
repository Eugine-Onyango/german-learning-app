import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Target, Award, Gift } from 'lucide-react';
import { LESSON_35_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson35Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_35_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_35_SCENARIOS.length) {
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
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 text-white p-6 rounded-3xl shadow-xl border-4 border-teal-300/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
          <Target className="w-4 h-4 text-teal-200" />
          Lesson 35 Quiz Challenge • Personalpronomen im Dativ
        </div>
        <h2 className="text-2xl md:text-3xl font-black">
          The Dative Pronouns Master Quiz 🎁
        </h2>
        <p className="text-teal-100 text-xs md:text-sm">
          Test your mastery of mir, dir, ihm, ihr, uns, euch, and everyday Dative verbs!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIndex + 1} of {LESSON_35_SCENARIOS.length}</span>
              <span>Score: {score} / {currentIndex + (showResult ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / LESSON_35_SCENARIOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div className="text-base md:text-lg font-bold text-stone-800 dark:text-stone-100">
                  {currentQ.scenario}
                </div>
              </div>
            </div>

            {/* Hint Box */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 px-2 font-medium">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Hint: {currentQ.hint}</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/50 text-stone-800 dark:text-stone-200';

              if (showResult) {
                if (option.correct) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && !option.correct) {
                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 line-through';
                } else {
                  btnStyle = 'border-stone-200 dark:border-stone-700 opacity-40 text-stone-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showResult}
                  onClick={() => handleSelect(option, idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="text-sm md:text-base font-semibold">{option.text}</span>
                  {showResult && option.correct && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showResult && isSelected && !option.correct && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {showResult && (
            <div className={`p-4 rounded-2xl border ${
              currentQ.options[selectedOption]?.correct
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm font-medium leading-relaxed">
                  {currentQ.options[selectedOption]?.explain}
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl font-black text-sm md:text-base shadow-lg transition active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{currentIndex + 1 < LESSON_35_SCENARIOS.length ? 'Next Question' : 'Complete Quiz'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        /* Completion Certificate */
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200 dark:border-stone-700 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center shadow-lg transform rotate-3">
            <Award className="w-10 h-10 text-amber-900" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
              Herzlichen Glückwunsch! 🎉
            </h3>
            <p className="text-stone-500 text-sm">
              You scored <strong className="text-teal-600 dark:text-teal-400">{score}</strong> out of <strong className="text-stone-800 dark:text-stone-100">{LESSON_35_SCENARIOS.length}</strong> on the Personalpronomen im Dativ Challenge!
            </p>
          </div>

          <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 text-xs md:text-sm text-teal-950 dark:text-teal-200">
            {score === LESSON_35_SCENARIOS.length ? (
              <span className="font-bold">🌟 Perfect Score! You are an official Master of German Dative Pronouns!</span>
            ) : score >= 4 ? (
              <span className="font-bold">👏 Great job! You know mir, dir, ihm, ihr, and how to use everyday Dative verbs!</span>
            ) : (
              <span>Good effort! Review the 10 Character Stories and Hit Phrases, and try again to score 100%!</span>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-2xl font-black text-sm shadow-lg hover:opacity-90 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
