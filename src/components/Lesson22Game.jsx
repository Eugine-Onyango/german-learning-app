import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Clock } from 'lucide-react';
import { LESSON_22_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson22Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_22_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_22_SCENARIOS.length) {
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
      <div className="bg-gradient-to-r from-teal-800 via-slate-800 to-indigo-800 rounded-3xl p-5 sm:p-6 text-white shadow-md text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🕰️ ⏰ 🥨 🎯 ⏳</div>
        <h2 className="text-2xl font-black">
          Lesson 22 Challenge: Inoffizielle Zeit!
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1">
          Master "halb", "vor", "nach", and conversational German time!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress header */}
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider pb-3 border-b border-stone-100">
            <span>Question {currentIndex + 1} of {LESSON_22_SCENARIOS.length}</span>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold">
              Score: {score}
            </span>
          </div>

          {/* Scenario Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-snug">
              {currentQ.scenario}
            </h3>
            {currentQ.hint && (
              <div className="flex items-start gap-1.5 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Hint:</strong> {currentQ.hint}</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let btnStyle = "bg-stone-50 hover:bg-amber-50/50 border-stone-200 text-stone-800";
              if (showResult) {
                if (option.correct) {
                  btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300";
                } else if (selectedOption === idx) {
                  btnStyle = "bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200";
                } else {
                  btnStyle = "opacity-40 border-stone-200 text-stone-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option, idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <span className="text-sm sm:text-base leading-relaxed">{option.text}</span>
                  {showResult && option.correct && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {showResult && selectedOption === idx && !option.correct && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showResult && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fadeIn space-y-2 ${
              currentQ.options[selectedOption]?.correct
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {currentQ.options[selectedOption]?.correct ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ausgezeichnet! That's correct!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Review the Grammar Rule:</span>
                  </>
                )}
              </div>
              <p>{currentQ.options[selectedOption]?.explain}</p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-md active:scale-95 text-sm"
              >
                <span>{currentIndex + 1 < LESSON_22_SCENARIOS.length ? 'Next Question' : 'Complete Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completion Summary Card */
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-8 text-center space-y-5 shadow-sm animate-fadeIn">
          <div className="text-6xl animate-bounce">🏆</div>
          <h3 className="text-2xl font-black text-stone-900">
            Lesson 22 Challenge Completed!
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            You scored <strong className="text-emerald-700 font-extrabold text-base">{score} out of {LESSON_22_SCENARIOS.length}</strong>! You now understand native conversational German time like a local.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-sm mx-auto text-xs text-amber-950 space-y-1 text-left">
            <div className="font-bold text-center text-sm text-amber-900 mb-1">🎓 Key Takeaway</div>
            <div>• <strong>halb zwei = 1:30</strong> (halfway TO two!)</div>
            <div>• <strong>fünf vor halb zwei = 1:25</strong> (5 mins before 1:30)</div>
            <div>• <strong>fünf nach halb zwei = 1:35</strong> (5 mins past 1:30)</div>
            <div>• <strong>kurz vor / fast / gleich:</strong> just before / almost!</div>
          </div>

          <button
            onClick={handleRestart}
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-3 rounded-2xl transition-all inline-flex items-center gap-2 shadow-md active:scale-95 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
