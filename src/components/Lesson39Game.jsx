import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Target, Award, Compass, MapPin, Navigation } from 'lucide-react';
import { LESSON_39_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson39Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_39_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_39_SCENARIOS.length) {
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
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-800 text-white p-6 rounded-3xl shadow-xl border-4 border-blue-300/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
          <Navigation className="w-4 h-4 text-blue-200" />
          Lesson 39 Quiz Challenge • Wegbeschreibung
        </div>
        <h2 className="text-2xl md:text-3xl font-black">
          The City Direction Navigator Quiz 🧭
        </h2>
        <p className="text-blue-100 text-xs md:text-sm">
          Test your knowledge of giving & asking for directions, the magic "zum" vs. "zur" rule, turns, and polite German street dialogues!
        </p>
      </div>

      {!completed ? (
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-500">
              <span>Question {currentIndex + 1} of {LESSON_39_SCENARIOS.length}</span>
              <span>Score: {score} / {currentIndex + (showResult ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / LESSON_39_SCENARIOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-base md:text-lg font-bold text-stone-800 dark:text-stone-100">
                  {currentQ.scenario}
                </div>
              </div>
            </div>

            {/* Hint toggle */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 px-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Hint: {currentQ.hint}</span>
            </div>
          </div>

          {/* Option Buttons */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = "border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-700/50 text-stone-800 dark:text-stone-200";

              if (showResult) {
                if (option.correct) {
                  btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-300";
                } else if (isSelected && !option.correct) {
                  btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 font-bold ring-2 ring-rose-300";
                } else {
                  btnStyle = "opacity-50 border-stone-200 dark:border-stone-700";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option, idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 flex items-center justify-center text-xs font-bold text-stone-600 dark:text-stone-300 shadow-sm shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm md:text-base font-semibold">{option.text}</span>
                  </div>

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

          {/* Explanation Box */}
          {showResult && (
            <div className="space-y-4 pt-2 animate-fadeIn">
              <div className={`p-4 rounded-2xl border ${
                currentQ.options[selectedOption].correct
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}>
                <p className="text-xs md:text-sm font-medium leading-relaxed">
                  {currentQ.options[selectedOption].explain}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
                >
                  <span>{currentIndex + 1 === LESSON_39_SCENARIOS.length ? 'Show My Certificate' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Certificate & Results Screen */
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border-2 border-stone-200 dark:border-stone-700 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-xl">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              City Navigation Master
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-stone-900 dark:text-stone-100">
              Challenge Completed! 🎉
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-md mx-auto">
              You scored <span className="font-bold text-blue-600 text-lg">{score}</span> out of <span className="font-bold text-lg">{LESSON_39_SCENARIOS.length}</span>! You can now navigate German cities like a native!
            </p>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 max-w-md mx-auto text-xs text-stone-600 dark:text-stone-400 space-y-1 text-left">
            <div className="font-bold text-stone-800 dark:text-stone-200">Key Takeaways from Lesson 39:</div>
            <div>• <strong>links</strong> (left), <strong>geradeaus</strong> (straight), <strong>rechts</strong> (right)</div>
            <div>• <strong>zum</strong> = zu + dem (der/das: zum Bahnhof, zum Rathaus)</div>
            <div>• <strong>zur</strong> = zu + der (die: zur Apotheke, zur Bank, zur Kirche)</div>
            <div>• <strong>an der Ecke</strong> (at corner) & <strong>dem Rathaus gegenüber</strong> (opposite town hall)</div>
            <div>• Polite response: <em>Es tut mir leid. Ich weiß es leider auch nicht.</em></div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-900 dark:bg-stone-700 dark:hover:bg-stone-600 text-white font-bold rounded-2xl shadow transition-all inline-flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
