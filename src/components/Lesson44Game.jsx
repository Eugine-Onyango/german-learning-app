import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Target, Award, Crown, Scale, ShieldCheck } from 'lucide-react';
import { LESSON_44_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson44Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_44_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_44_SCENARIOS.length) {
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
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-900 text-white p-6 rounded-3xl shadow-xl border-4 border-amber-300/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
          <Crown className="w-4 h-4 text-amber-200" />
          Lesson 44 Quiz Challenge • haben vs. sein
        </div>
        <h2 className="text-2xl md:text-3xl font-black">
          The Auxiliary Selection Master Quiz ⚖️
        </h2>
        <p className="text-amber-100 text-xs md:text-sm">
          Test your mastery of auxiliary verb selection: Movement (A ➔ B), State Change, the 4 Rebel Verbs, and the Chameleon "fahren" rule!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIndex + 1} of {LESSON_44_SCENARIOS.length}</span>
              <span>Score: {score} / {currentIndex + (showResult ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / LESSON_44_SCENARIOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-base md:text-lg font-bold text-stone-800 dark:text-stone-100">
                  {currentQ.scenario}
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = "bg-stone-50 dark:bg-stone-750 hover:bg-stone-100 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-600 text-stone-800 dark:text-stone-200";

              if (showResult) {
                if (option.correct) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20";
                } else if (isSelected && !option.correct) {
                  btnStyle = "bg-rose-500 text-white border-rose-600";
                } else {
                  btnStyle = "bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option, idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-2xl border-2 font-medium transition-all duration-200 flex items-center justify-between group ${btnStyle}`}
                >
                  <span className="text-sm md:text-base font-semibold">{option.text}</span>
                  {showResult && (
                    <span>
                      {option.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-white" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Result / Explanation Box */}
          {showResult && (
            <div className={`p-4 rounded-2xl border ${currentQ.options[selectedOption]?.correct ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'} space-y-2 animate-in fade-in duration-300`}>
              <div className="flex items-center gap-2">
                <Lightbulb className={`w-4 h-4 ${currentQ.options[selectedOption]?.correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`} />
                <span className={`text-xs font-black uppercase tracking-wider ${currentQ.options[selectedOption]?.correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                  {currentQ.options[selectedOption]?.correct ? 'Excellent Job!' : 'Grammar Note'}
                </span>
              </div>
              <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                {currentQ.explanation}
              </p>
              {currentQ.options.find(o => o.correct) && (
                <button
                  onClick={() => speakGerman(currentQ.options.find(o => o.correct).text, isSlowMode)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline pt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen to correct pronunciation
                </button>
              )}
            </div>
          )}

          {/* Action Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 text-base transition-all duration-200 hover:scale-[1.01]"
            >
              <span>{currentIndex + 1 < LESSON_44_SCENARIOS.length ? 'Next Question' : 'Complete Challenge'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        /* Completion Certificate Screen */
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200 dark:border-stone-700 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400 border-4 border-amber-200 dark:border-amber-700">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100">
              haben vs. sein Crown Claimed! 👑
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto">
              You scored <span className="font-black text-amber-600 dark:text-amber-400 text-lg">{score}</span> out of <span className="font-black text-stone-800 dark:text-stone-200 text-lg">{LESSON_44_SCENARIOS.length}</span>!
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs md:text-sm text-amber-900 dark:text-amber-200 text-left space-y-2 font-medium">
            <div className="font-black flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
              <ShieldCheck className="w-4 h-4" /> The Golden Auxiliary Rules:
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>haben:</strong> 85% of verbs (eating, buying, drinking, working, writing).</li>
              <li><strong>sein:</strong> Movement (A ➔ B), State change (einschlafen, sterben), and Rebels (<em>bleiben, sein, passieren, werden</em>).</li>
              <li><strong>fahren:</strong> Movement to city = <em>sein</em>; driving a car object = <em>haben</em>.</li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/30 transition-all hover:scale-105 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
