import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb } from 'lucide-react';
import { LESSON_6_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson6Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_6_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_6_SCENARIOS.length) {
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
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl p-5 sm:p-6 text-white shadow-md text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🆔 🎯</div>
        <h2 className="text-2xl font-black">
          Lesson 6 Challenge: Self-Introduction Mastery!
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1">
          Test your skills in introducing your name, origin, age, profession, and family in German!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIndex + 1} of {LESSON_6_SCENARIOS.length}</span>
              <span className="text-sky-800">Score: {score} correct</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden border border-stone-200">
              <div
                className="bg-sky-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / LESSON_6_SCENARIOS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scenario description */}
          <div className="bg-sky-50 rounded-2xl p-5 border-2 border-sky-200 space-y-2">
            <div className="text-xs font-black uppercase text-sky-900 tracking-wide">
              Challenge Question:
            </div>
            <p className="text-base sm:text-lg font-bold text-stone-800 leading-snug">
              {currentQ.scenario}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-stone-600 italic pt-1">
              <Lightbulb className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Hint: {currentQ.hint}</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              let btnClass = "bg-stone-50 border-stone-200 hover:border-sky-400 hover:bg-sky-50/50 text-stone-800";

              if (showResult) {
                if (opt.correct) {
                  btnClass = "bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300";
                } else if (isChosen) {
                  btnClass = "bg-rose-100 border-rose-500 text-rose-950";
                } else {
                  btnClass = "opacity-50 bg-stone-50 border-stone-200";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt, idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-2xl border-3 font-bold text-base transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-mono font-bold text-xs shadow-xs border border-stone-200">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-mono text-base sm:text-lg">{opt.text}</span>
                  </div>

                  {showResult && opt.correct && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  )}
                  {showResult && isChosen && !opt.correct && (
                    <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {showResult && (
            <div className={`p-4 rounded-2xl border-2 text-sm leading-relaxed animate-gentle-bounce ${
              currentQ.options[selectedOption]?.correct
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <p className="font-bold">
                {currentQ.options[selectedOption]?.explain}
              </p>

              <button
                onClick={handleNext}
                className="mt-3 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer ml-auto"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completion card */
        <div className="bg-white rounded-3xl p-8 border-3 border-emerald-400 shadow-2xl text-center space-y-4">
          <div className="text-5xl animate-bounce">🏆 🇩🇪 🎊</div>
          <h3 className="text-2xl font-black text-emerald-950">
            Self-Introduction Expert! Full Score!
          </h3>
          <p className="text-stone-700 text-sm max-w-md mx-auto">
            You scored <strong className="text-emerald-800 text-lg">{score}</strong> out of <strong className="text-lg">{LESSON_6_SCENARIOS.length}</strong>!
            You can now introduce yourself anywhere in Germany, state your profession, age, family, and hobbies with total confidence!
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-black text-sm flex items-center gap-2 mx-auto shadow-md cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Challenge Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
