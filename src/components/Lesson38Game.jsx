import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Target, Award, Megaphone } from 'lucide-react';
import { LESSON_38_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson38Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_38_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_38_SCENARIOS.length) {
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
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-amber-800 text-white p-6 rounded-3xl shadow-xl border-4 border-rose-300/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
          <Megaphone className="w-4 h-4 text-rose-200" />
          Lesson 38 Quiz Challenge • Der Imperativ
        </div>
        <h2 className="text-2xl md:text-3xl font-black">
          The Imperative Action Quiz 📣
        </h2>
        <p className="text-rose-100 text-xs md:text-sm">
          Test your mastery of German commands, requests, the Umlaut trap, and rebel verbs (sein / haben / werden)!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIndex + 1} of {LESSON_38_SCENARIOS.length}</span>
              <span>Score: {score} / {currentIndex + (showResult ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-red-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / LESSON_38_SCENARIOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3">
            <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="text-base md:text-lg font-bold text-stone-800 dark:text-stone-100">
                  {currentQ.scenario}
                </div>
              </div>
            </div>

            {currentQ.hint && !showResult && (
              <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800/50">
                <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
                <span><strong>Hint:</strong> {currentQ.hint}</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = "bg-stone-50 dark:bg-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-600 text-stone-800 dark:text-stone-200";

              if (showResult) {
                if (option.correct) {
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-400/30";
                } else if (isSelected) {
                  btnStyle = "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/30";
                } else {
                  btnStyle = "opacity-50 bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option, idx)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between gap-3 text-sm md:text-base font-semibold cursor-pointer ${btnStyle}`}
                >
                  <span className="flex-1">{option.text}</span>
                  {showResult && (
                    <div className="shrink-0">
                      {option.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {showResult && (
            <div className={`p-4 rounded-2xl space-y-2 border text-sm animate-fadeIn ${
              currentQ.options[selectedOption].correct
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                : "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {currentQ.options[selectedOption].correct ? "✨ Ausgezeichnet!" : "⚠️ Nicht ganz!"}
              </div>
              <p className="text-xs md:text-sm leading-relaxed">
                {currentQ.options[selectedOption].explain}
              </p>
              <button
                onClick={() => speakGerman(currentQ.options[selectedOption].text, isSlowMode)}
                className="mt-2 text-xs font-bold flex items-center gap-1.5 text-red-700 dark:text-red-300 hover:underline cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen again
              </button>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>{currentIndex + 1 < LESSON_38_SCENARIOS.length ? "Next Question" : "Complete Quiz"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        /* Certificate Box */
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200 dark:border-stone-700 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto text-red-600 dark:text-red-300 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 dark:bg-red-950 px-3 py-1 rounded-full border border-red-200 dark:border-red-800">
              <Sparkles className="w-3.5 h-3.5" />
              Quiz Certificate
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100">
              Imperative Action Mastery Unlocked! 📣
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm max-w-md mx-auto">
              You correctly solved <strong className="text-red-600 font-bold">{score}</strong> out of <strong className="text-stone-800 dark:text-stone-200">{LESSON_38_SCENARIOS.length}</strong> questions on German imperative commands and special verbs!
            </p>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800 inline-block text-left text-xs text-stone-700 dark:text-stone-300 space-y-1">
            <div className="font-bold text-red-900 dark:text-red-200 text-sm">Key Takeaways from Lesson 38:</div>
            <div>✅ <strong>du:</strong> Drop 'du' & '-st' (<em>Komm!</em>, <em>Lern!</em>). Drop Umlaut: <em>Fahr!</em></div>
            <div>✅ <strong>ihr:</strong> Drop 'ihr', keep '-t' (<em>Kommt!</em>, <em>Lernt!</em>)</div>
            <div>✅ <strong>Sie:</strong> Invert Verb & Sie (<em>Kommen Sie bitte!</em>)</div>
            <div>✅ <strong>Royal Rebels:</strong> <em>Sei! / Seien Sie!</em> • <em>Hab Geduld!</em> • <em>Werde gesund!</em></div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
