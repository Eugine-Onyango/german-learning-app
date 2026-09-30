import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle } from 'lucide-react';
import { LESSON_19_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson19Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_19_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_19_SCENARIOS.length) {
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
      <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-indigo-700 rounded-3xl p-5 sm:p-6 text-white shadow-md text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">✨ 🍎 👜 📖 💐</div>
        <h2 className="text-2xl font-black">
          Lesson 19 Challenge: Indefinite Articles!
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1">
          Master ein, eine, ein, first vs second mention, and the plural rule!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIndex + 1} of {LESSON_19_SCENARIOS.length}</span>
              <span className="text-teal-800 font-black">Score: {score} correct</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden border border-stone-200">
              <div
                className="bg-teal-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / LESSON_19_SCENARIOS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scenario description */}
          <div className="bg-teal-50 rounded-2xl p-5 border-2 border-teal-200 space-y-2">
            <div className="text-xs font-black uppercase text-teal-900 tracking-wide flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              Article Challenge:
            </div>
            <p className="text-base sm:text-lg font-bold text-stone-800 leading-snug">
              {currentQ.scenario}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-stone-600 italic pt-1">
              <Lightbulb className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>Hint: {currentQ.hint}</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = "bg-stone-50 hover:bg-teal-50/60 border-2 border-stone-200 text-stone-800";
              if (showResult) {
                if (option.correct) {
                  btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-200";
                } else if (isSelected && !option.correct) {
                  btnStyle = "bg-rose-50 border-2 border-rose-500 text-rose-950 font-bold opacity-80";
                } else {
                  btnStyle = "bg-stone-50 border-2 border-stone-200 text-stone-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option, idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between text-sm sm:text-base font-bold shadow-sm ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-xs font-black text-stone-600 shadow-xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option.text}</span>
                  </div>
                  {showResult && (
                    <div>
                      {option.correct ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation box */}
          {showResult && (
            <div className={`p-4 rounded-2xl border-2 text-sm sm:text-base animate-fadeIn ${
              currentQ.options[selectedOption].correct
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : "bg-rose-50 border-rose-300 text-rose-950"
            }`}>
              <div className="font-extrabold flex items-center gap-2 mb-1">
                {currentQ.options[selectedOption].correct ? "🎉 Superb! Genau richtig!" : "💡 Keep Going! Here is why:"}
              </div>
              <p className="font-medium text-xs sm:text-sm">
                {currentQ.options[selectedOption].explain}
              </p>
            </div>
          )}

          {/* Next / Submit buttons */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-base shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < LESSON_19_SCENARIOS.length ? "Next Challenge Question" : "See Final Score"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        /* Completion card */
        <div className="bg-white rounded-3xl p-8 border-3 border-stone-200 shadow-xl text-center space-y-6">
          <div className="text-6xl animate-gentle-bounce">🏆 ✨ 🍎 💐</div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-stone-900">
              Indefinite Articles Quest Complete!
            </h3>
            <p className="text-stone-600 font-semibold text-sm">
              You scored <span className="font-black text-teal-700 text-lg">{score}</span> out of <span className="font-black text-stone-800 text-lg">{LESSON_19_SCENARIOS.length}</span>!
            </p>
          </div>

          <div className="bg-teal-50 rounded-2xl p-5 border-2 border-teal-200 text-left space-y-2">
            <h4 className="font-black text-teal-950 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Lesson 19 Golden Article Takeaways:
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              • <strong>First Mention (A / An):</strong> <em>ein Apfel</em> (der), <em>eine Frau</em> (die), <em>ein Mädchen</em> (das).<br />
              • <strong>Second Mention (The):</strong> Follow up with <em>der Apfel</em>, <em>die Frau</em>, <em>das Mädchen</em>.<br />
              • <strong>The Golden Plural Rule:</strong> Plural has <strong>NO 'ein'</strong>! Say: <em>Das sind Blumen. Die Blumen sind schön.</em><br />
              • <strong>The Twins:</strong> Maskulin and Neutral share the identical article <strong>ein</strong>!
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-black text-base shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Challenge Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
