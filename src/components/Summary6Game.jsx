import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SUMMARY_6_SCENARIOS } from '../data/germanLessons';
import { playChime, speakGerman } from '../utils/sound';
import { Volume2, RotateCcw, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function Summary6Game({ isSlowMode }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = SUMMARY_6_SCENARIOS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = scenario.options[idx].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      playChime('success');
      speakGerman(scenario.options[idx].text, isSlowMode);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 }
        });
      } catch (e) {
        // Fallback safe
      }
    } else {
      setStreak(0);
      playChime('wrong');
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < SUMMARY_6_SCENARIOS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      playChime('click');
    } else {
      setGameFinished(true);
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setGameFinished(false);
    playChime('click');
  };

  if (gameFinished) {
    const percentage = Math.round((score / SUMMARY_6_SCENARIOS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl border-4 border-teal-300 text-center space-y-6">
        <div className="inline-flex p-5 rounded-full bg-teal-100 text-teal-600 text-5xl mb-2 animate-bounce">
          🏆
        </div>
        <h3 className="text-3xl font-black text-stone-900 tracking-tight">
          Summary 6 Master Challenge Complete!
        </h3>
        <p className="text-sm font-semibold text-stone-600 max-w-md mx-auto">
          You scored <strong>{score}</strong> out of <strong>{SUMMARY_6_SCENARIOS.length}</strong> ({percentage}%) on the Complete Visual Grammatik & Redemittel Summary 6!
        </p>

        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200 text-xs text-teal-950 font-bold max-w-md mx-auto space-y-1 text-left">
          <div>✨ <strong>Dativ Articles:</strong> <em>dem Stuhl, dem Regal, der Lampe, den Stühlen (Double-N!)</em></div>
          <div>✨ <strong>Akkusativ Pronouns:</strong> <em>er ➔ ihn (only 3rd sing changer!), du ➔ dich, wir ➔ uns</em></div>
          <div>✨ <strong>9 Spatial Prepositions:</strong> <em>in, an, auf, über, unter, vor, hinter, neben, zwischen (Wo? = Dativ)</em></div>
          <div>✨ <strong>Contractions:</strong> <em>in dem ➔ im • an dem ➔ am</em></div>
          <div>✨ <strong>für + Akkusativ:</strong> <em>für meinen Mann ➔ für ihn • für meine Schwester ➔ für sie</em></div>
          <div>✨ <strong>Position 0 denn:</strong> <em>denn ihr Fahrrad (1) ist (2) nicht da</em></div>
          <div>✨ <strong>Desert Directions & DOCH:</strong> <em>geradeaus, nach links • Doch, für mich sind ... wichtig!</em></div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-black px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Challenge Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Stats Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Question {currentIdx + 1} of {SUMMARY_6_SCENARIOS.length}
          </span>
          {streak >= 2 && (
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{streak} Streak!</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
          <span>Score:</span>
          <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-mono font-black text-sm">
            {score}
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-teal-600 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / SUMMARY_6_SCENARIOS.length) * 100}%` }}
        />
      </div>

      {/* Scenario Question Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <span>Summary 6 Challenge</span>
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-stone-900 leading-snug">
            {scenario.scenario}
          </h3>
          {scenario.hint && (
            <p className="text-xs text-stone-500 italic">
              💡 Hint: {scenario.hint}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {scenario.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            let btnClass = 'border-stone-200 hover:border-teal-300 hover:bg-teal-50/50 bg-stone-50 text-stone-900';

            if (isAnswered) {
              if (opt.correct) {
                btnClass = 'border-teal-500 bg-teal-50 text-teal-950 ring-2 ring-teal-500/30 font-bold';
              } else if (isSelected && !opt.correct) {
                btnClass = 'border-rose-400 bg-rose-50 text-rose-950 font-bold';
              } else {
                btnClass = 'border-stone-200 opacity-50 bg-stone-50 text-stone-500';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-sm md:text-base ${btnClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white border border-stone-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt.text}</span>
                </div>

                {isAnswered && opt.correct && (
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                )}
                {isAnswered && isSelected && !opt.correct && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Button */}
        {isAnswered && (
          <div className="space-y-4 pt-4 border-t border-stone-100 animate-fadeIn">
            <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed border ${
              scenario.options[selectedOpt]?.correct
                ? 'bg-teal-50 border-teal-200 text-teal-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <strong>{scenario.options[selectedOpt]?.correct ? '🎉 Richtig!' : '💡 Erklärung:'}</strong>{' '}
              {scenario.options[selectedOpt]?.explain}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm md:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentIdx + 1 === SUMMARY_6_SCENARIOS.length ? 'See Final Score 🏆' : 'Next Question'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
