import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Lightbulb, HelpCircle, Target, Utensils } from 'lucide-react';
import { LESSON_29_SCENARIOS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson29Game({ isSlowMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = LESSON_29_SCENARIOS[currentIndex];

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
    if (currentIndex + 1 < LESSON_29_SCENARIOS.length) {
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
      <div className="bg-gradient-to-br from-amber-900 via-orange-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-amber-500/30">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-amber-500/30 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-amber-400/40">
              <Utensils className="w-3.5 h-3.5" />
              Lesson 29 Challenge
            </span>
            <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full">
              Score: {score} / {LESSON_29_SCENARIOS.length}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-100 to-orange-200">
            Restaurant & Café Master Quiz
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm">
            Put your real-life German dining skills to the test! Remember: <span className="text-amber-300 font-bold">"Stimmt so!"</span> for tips, <span className="text-emerald-300 font-bold">"Zum Mitnehmen"</span> for take-away, and <span className="text-yellow-300 font-bold">"einen Kaffee / Burger"</span> in Akkusativ!
          </p>
        </div>
      </div>

      {!completed ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-stone-200 space-y-6">
          {/* Question Counter */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-600" />
              Question {currentIndex + 1} of {LESSON_29_SCENARIOS.length}
            </span>
            <span className="text-xs text-stone-400 font-medium">
              Take your time • Zero stress
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
              let btnClass = 'bg-stone-50 border-2 border-stone-200 text-stone-800 hover:bg-amber-50 hover:border-amber-300';

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
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-2 animate-fade-in">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Grammar & Etiquette Breakdown:</span>
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
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-black py-3.5 rounded-2xl shadow-md hover:from-amber-500 hover:to-yellow-500 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>{currentIndex + 1 < LESSON_29_SCENARIOS.length ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* Completion View */
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-200 text-center space-y-6">
          <div className="text-6xl animate-bounce">🍽️</div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
              {score === LESSON_29_SCENARIOS.length
                ? 'Flawless Master of German Restaurant & Café German!'
                : score >= 4
                ? 'Wunderbar! Ready to Dine Anywhere in Germany!'
                : 'Good Effort! Review the Ordering Formulas & Try Again!'}
            </h3>
            <p className="text-stone-500 text-sm">
              You scored <span className="font-bold text-amber-700">{score}</span> out of <span className="font-bold">{LESSON_29_SCENARIOS.length}</span> questions.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs sm:text-sm text-left space-y-1">
            <div className="font-bold">✨ Lesson 29 Golden Summary:</div>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              <li><strong>3 Formulas:</strong> <em>Ich hätte gerne... / Ich nehme... / Ich möchte...</em></li>
              <li><strong>Akkusativ Food & Drinks:</strong> <em>einen Kaffee, einen Wein, einen Burger, einen Salat</em> (masculine takes <em>-en</em>).</li>
              <li><strong>Paying:</strong> <em>Zusammen oder getrennt?</em> (Together or split).</li>
              <li><strong>Tipping:</strong> <em>"Stimmt so!"</em> (Keep the change - das Trinkgeld).</li>
              <li><strong>Café:</strong> <em>"Zum hier trinken oder zum Mitnehmen?"</em> & <em>"Hier mit Karte, bitte."</em></li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Quiz Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
