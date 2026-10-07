import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SUMMARY_7_SCENARIOS } from '../data/germanLessons';
import { playChime, speakGerman } from '../utils/sound';
import { Volume2, RotateCcw, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function Summary7Game({ isSlowMode }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = SUMMARY_7_SCENARIOS[currentIdx];

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
    if (currentIdx + 1 < SUMMARY_7_SCENARIOS.length) {
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
    const percentage = Math.round((score / SUMMARY_7_SCENARIOS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl border-4 border-teal-300 text-center space-y-6">
        <div className="inline-flex p-5 rounded-full bg-teal-100 text-teal-600 text-5xl mb-2 animate-bounce">
          🏆
        </div>
        <h3 className="text-3xl font-black text-stone-900 tracking-tight">
          Summary 7 Master Challenge Complete!
        </h3>
        <p className="text-sm font-semibold text-stone-600 max-w-md mx-auto">
          You scored <strong>{score}</strong> out of <strong>{SUMMARY_7_SCENARIOS.length}</strong> ({percentage}%) on the Complete Visual Grammatik & Redemittel Summary 7!
        </p>

        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200 text-xs text-teal-950 font-bold max-w-md mx-auto space-y-1.5 text-left">
          <div>✨ <strong>Imperativ Rules:</strong> <em>du ➔ Hol!, Fahr! (drop umlaut!), Nimm! (keep e➔i), Ruf an! • ihr ➔ Holt! • Sie ➔ Holen Sie!</em></div>
          <div>✨ <strong>Präteritum (Simple Past):</strong> <em>ich war / er war • ich hatte / er hatte (Identical twins!)</em></div>
          <div>✨ <strong>von + Dativ:</strong> <em>der Name von seiner Exfreundin (-er ending for feminine!)</em></div>
          <div>✨ <strong>Dativ Body Endings:</strong> <em>meinem Rücken (-em), meinem Gesicht (-em), meiner Hand (-er), meinen Haaren (-en + -n)</em></div>
          <div>✨ <strong>Position 1 deshalb:</strong> <em>deshalb (1) will (2) ich (3) es wegmachen (Verb leaps to Pos 2!)</em></div>
          <div>✨ <strong>Ordinalzahlen & Dates:</strong> <em>1-19: -te (der vierte) • 20+: -ste (der zwanzigste) • am 21. 4. (am einundzwanzigsten vierten)</em></div>
          <div>✨ <strong>Dentist Comic:</strong> <em>"Am 16. 12. hast du deinen Zahnarzttermin." - "Ich gehe aber erst im November!"</em></div>
          <div>✨ <strong>Redemittel Clinic & Letters:</strong> <em>Ich habe Fieber / Zahnschmerzen • Gute Besserung! • Sehr geehrte/r... • Mit freundlichen Grüßen</em></div>
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
            Question {currentIdx + 1} of {SUMMARY_7_SCENARIOS.length}
          </span>
          {streak >= 2 && (
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{streak} Streak!</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-600">Score:</span>
          <span className="bg-teal-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
            {score} / {SUMMARY_7_SCENARIOS.length}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              Summary 7 Challenge Scenario
            </span>
            <button
              onClick={() => speakGerman(scenario.scenario, isSlowMode)}
              className="text-stone-400 hover:text-teal-600 transition"
              title="Listen to Question"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-snug">
            {scenario.scenario}
          </h3>
          {scenario.hint && (
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl font-medium">
              💡 <strong>Hint:</strong> {scenario.hint}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {scenario.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            let btnStyle =
              'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800 hover:border-stone-300';

            if (isAnswered) {
              if (opt.correct) {
                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
              } else if (isSelected && !opt.correct) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
              } else {
                btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isAnswered && opt.correct
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isSelected && !opt.correct
                        ? 'bg-rose-600 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-semibold">{opt.text}</span>
                </div>

                {isAnswered && opt.correct && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
                {isAnswered && isSelected && !opt.correct && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Explanation Box */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 animate-fadeIn ${
              scenario.options[selectedOpt]?.correct
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="font-extrabold flex items-center gap-1.5">
              {scenario.options[selectedOpt]?.correct ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ausgezeichnet!
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-amber-600" /> Nicht ganz richtig:
                </>
              )}
            </div>
            <p className="leading-relaxed font-medium">
              {scenario.options[selectedOpt]?.explain}
            </p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{currentIdx + 1 < SUMMARY_7_SCENARIOS.length ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
