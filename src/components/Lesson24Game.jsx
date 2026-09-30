import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Users } from 'lucide-react';
import { LESSON_24_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson24Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_24_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_24_SCENARIOS.length) {
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
      {/* Game Card Header */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-emerald-500/30">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-emerald-500/30 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-emerald-400/40">
              <Sparkles className="w-3.5 h-3.5" />
              Lesson 24 Challenge
            </span>
            <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full">
              Score: {score} / {LESSON_24_SCENARIOS.length}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-teal-100 to-amber-200">
            Familie & Stammbaum Quiz Game
          </h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm">
            Test your German family vocabulary! Remember: <span className="text-blue-300 font-bold">mein Vater/Bruder</span>, <span className="text-pink-300 font-bold">meine Mutter/Schwester</span>, and <span className="text-purple-300 font-bold">Das sind meine Eltern/Geschwister</span>!
          </p>
        </div>
      </div>

      {!completed ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-stone-200 space-y-6">
          {/* Question Counter */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              Question {currentIndex + 1} of {LESSON_24_SCENARIOS.length}
            </span>
            <span className="text-xs text-stone-400 font-medium">
              Warm & Relatable • No Rush
            </span>
          </div>

          {/* Scenario Text */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-snug">
              {currentQ.scenario}
            </h3>
            {currentQ.hint && (
              <div className="bg-amber-50 text-amber-900 border border-amber-200 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Hint:</strong> {currentQ.hint}</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'bg-stone-50 border-2 border-stone-200 text-stone-800 hover:bg-emerald-50 hover:border-emerald-300';

              if (showResult) {
                if (option.correct) {
                  btnClass = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                } else if (isSelected && !option.correct) {
                  btnClass = 'bg-rose-50 border-2 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-200';
                } else {
                  btnClass = 'bg-stone-50 border border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option, idx)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-2xl text-left transition-all text-sm sm:text-base flex items-center justify-between gap-3 shadow-xs ${btnClass}`}
                >
                  <span className="font-semibold">{option.text}</span>
                  {showResult && option.correct && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showResult && isSelected && !option.correct && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showResult && (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-2 animate-fade-in">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Why this is correct:</span>
              </div>
              <p className="leading-relaxed text-stone-700">
                {currentQ.options[selectedOption]?.explain || currentQ.options.find(o => o.correct)?.explain}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3.5 rounded-2xl shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>{currentIndex + 1 < LESSON_24_SCENARIOS.length ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* Completion View */
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-200 text-center space-y-6">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
              {score === LESSON_24_SCENARIOS.length
                ? 'Flawless Master of the German Family Tree!'
                : score >= 4
                ? 'Wunderbar! Great Family Vocabulary!'
                : 'Good Effort! Keep Practicing!'}
            </h3>
            <p className="text-stone-500 text-sm">
              You scored <span className="font-bold text-emerald-700">{score}</span> out of <span className="font-bold">{LESSON_24_SCENARIOS.length}</span> questions.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 text-xs sm:text-sm text-left space-y-1">
            <div className="font-bold">✨ Lesson 24 Family Tree Takeaways:</div>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              <li><strong>Singular vs Plural:</strong> <em>Das ist mein Vater</em> vs. <em>Das sind meine Eltern</em>.</li>
              <li><strong>3 Collective Plurals:</strong> <em>die Eltern, die Großeltern, die Geschwister</em>.</li>
              <li><strong>Cousin Gender:</strong> <em>der Cousin</em> (boy) vs. <em>die Cousine</em> (girl).</li>
              <li><strong>Warm Pet Names:</strong> <em>mein Opa</em> (grandpa) & <em>meine Oma</em> (grandma).</li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Quiz Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
