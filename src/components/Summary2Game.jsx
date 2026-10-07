import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SUMMARY_2_SCENARIOS } from '../data/germanLessons';
import { playChime, speakGerman } from '../utils/sound';
import { Volume2, RotateCcw, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function Summary2Game({ isSlowMode }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = SUMMARY_2_SCENARIOS[currentIdx];

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
    if (currentIdx + 1 < SUMMARY_2_SCENARIOS.length) {
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
    const percentage = Math.round((score / SUMMARY_2_SCENARIOS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl border-4 border-indigo-300 text-center space-y-6">
        <div className="inline-flex p-5 rounded-full bg-indigo-100 text-indigo-600 text-5xl mb-2 animate-bounce">
          🏆
        </div>
        <h3 className="text-3xl font-black text-stone-900 tracking-tight">
          Summary 2 Challenge Complete!
        </h3>
        <p className="text-sm font-semibold text-stone-600 max-w-md mx-auto">
          You scored <strong>{score}</strong> out of <strong>{SUMMARY_2_SCENARIOS.length}</strong> ({percentage}%) on the Grammatik & Redemittel Toolkit!
        </p>

        <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200 text-xs text-indigo-900 font-bold max-w-md mx-auto space-y-1">
          <div>✨ Verben: <em>du kommst • du heißt (only -t) • wir sind / ihr seid • du hast</em></div>
          <div>✨ Nomen & Artikel: <em>der Bleistift • das Heft • die Lampe</em></div>
          <div>✨ Satzbau: <em>Verb ALWAYS in Position 2 in statements & W-questions!</em></div>
          <div>✨ Negation & Doch: <em>nicht (verbs/states) • kein (nouns) • DOCH! (reversing negatives)</em></div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Challenge Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-indigo-200 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
            Visual Summary 2 Quiz • Question {currentIdx + 1} of {SUMMARY_2_SCENARIOS.length}
          </span>
          <h3 className="text-lg font-black text-stone-900 mt-1">
            Grammatik & Redemittel Mastery Quiz
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-black text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>{streak} Streak!</span>
            </div>
          )}
          <div className="text-sm font-black text-stone-700 bg-stone-100 px-3 py-1 rounded-full">
            Score: {score}/{currentIdx + (isAnswered ? 1 : 0)}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-indigo-200 space-y-6">
        <div className="space-y-2">
          <div className="text-lg sm:text-xl font-black text-stone-900 leading-snug">
            {scenario.scenario}
          </div>
          {scenario.hint && (
            <div className="text-xs font-semibold text-indigo-800 bg-indigo-50 p-2.5 rounded-xl border border-indigo-200 flex items-center gap-2">
              <span>💡 Hint:</span>
              <span>{scenario.hint}</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {scenario.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            let btnStyle = 'bg-stone-50 border-stone-200 hover:border-indigo-400 hover:bg-indigo-50/50';

            if (isAnswered) {
              if (opt.correct) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
              } else if (isSelected && !opt.correct) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300';
              } else {
                btnStyle = 'bg-stone-50 border-stone-200 opacity-50';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-stone-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="text-xs sm:text-sm font-bold leading-relaxed">
                    {opt.text}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isAnswered && opt.correct && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  {isAnswered && isSelected && !opt.correct && (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playChime('click');
                      speakGerman(opt.text, isSlowMode);
                    }}
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-stone-700 shadow-xs border border-stone-200"
                    title="Pronounce option"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback / Explanation */}
        {isAnswered && (
          <div className={`p-4 rounded-2xl border-2 text-xs leading-relaxed ${
            scenario.options[selectedOpt].correct
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900'
              : 'bg-rose-50/90 border-rose-300 text-rose-900'
          }`}>
            <div className="font-black mb-1 flex items-center gap-1.5">
              {scenario.options[selectedOpt].correct ? '🎉 Richtig! (Correct!)' : '❌ Leider falsch! (Not quite!)'}
            </div>
            <div>{scenario.options[selectedOpt].explain}</div>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{currentIdx + 1 === SUMMARY_2_SCENARIOS.length ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
