import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_50_SCENARIOS } from '../data/germanLessons';

export default function Lesson50Game({ isSlowMode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQ = LESSON_50_SCENARIOS[currentQuestionIndex];

  const playTone = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(196, ctx.currentTime + 0.15); // G3
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      // Audio not available
    }
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = isSlowMode ? 0.7 : 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (index) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);

    const isCorrect = currentQ.options[index].correct;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      playTone('correct');
      if (streak + 1 >= 3) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    } else {
      setStreak(0);
      playTone('wrong');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);

    if (currentQuestionIndex + 1 < LESSON_50_SCENARIOS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setQuizFinished(false);
    setStreak(0);
  };

  if (quizFinished) {
    const percentage = Math.round((score / LESSON_50_SCENARIOS.length) * 100);
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-rose-100 text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
          {percentage >= 80 ? '✉️' : percentage >= 50 ? '🎂' : '📜'}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            {percentage === 100
              ? 'Wunderbar! German Invitation Master! 🌟'
              : percentage >= 80
              ? 'Ausgezeichnet! Great Letter Writing & RSVP Mastery! ✉️'
              : percentage >= 50
              ? 'Gut gemacht! Good Practice on Invitations! 👍'
              : 'Schade! Let’s Review the Letter Anatomy! 🔄'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            You scored <span className="font-bold text-rose-600 text-lg">{score}</span> out of{' '}
            <span className="font-bold text-stone-800">{LESSON_50_SCENARIOS.length}</span> (
            <span className="font-bold">{percentage}%</span>)
          </p>
          {streak > 2 && (
            <p className="text-xs text-amber-600 font-bold bg-amber-50 py-1 px-3 rounded-full inline-block">
              🔥 Max Streak: {streak} correct in a row!
            </p>
          )}
        </div>

        <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 text-left text-xs sm:text-sm text-stone-700 space-y-2">
          <p className="font-bold text-rose-900 flex items-center gap-1.5">
            <span>💡</span> 3 Golden Invitation Rules to Remember:
          </p>
          <ul className="list-disc list-inside space-y-1 text-stone-600">
            <li><strong>Letter Anatomy:</strong> 1. <span className="text-rose-800 font-semibold">Anrede</span> (Lieber Boris / Liebe Julia), 2. <span className="text-rose-800 font-semibold">Textteil</span> (lowercase first letter after comma!), 3. <span className="text-rose-800 font-semibold">Grußformel & Unterschrift</span> (Viele Grüße, Monika).</li>
            <li><strong>Zusagen Formula:</strong> <span className="text-rose-800 font-semibold">Vielen Dank für die Einladung!</span> ➔ <span className="text-rose-800 font-semibold">Ich freue mich auf Samstag und komme sehr gern.</span></li>
            <li><strong>Absagen Formula:</strong> <span className="text-rose-800 font-semibold">Es tut mir leid, aber ich kann nicht kommen.</span> + Reason (<span className="text-rose-800 font-semibold">Ich habe am Montag eine Prüfung / muss arbeiten</span>) + Well-wishes (<span className="text-rose-800 font-semibold">Viel Spaß auf der Party!</span>).</li>
          </ul>
        </div>

        <button
          onClick={handleRestart}
          className="bg-rose-700 hover:bg-rose-800 text-white font-black px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer text-sm sm:text-base"
        >
          🔄 Play Einladung Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-rose-100 max-w-3xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✉️</span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900">
              Einladung Quiz & Letter Mastery
            </h2>
            <p className="text-xs text-stone-500">
              Question {currentQuestionIndex + 1} of {LESSON_50_SCENARIOS.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <span className="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-1 rounded-full animate-bounce">
              🔥 {streak} Streak
            </span>
          )}
          <span className="bg-rose-100 text-rose-800 text-xs font-black px-3 py-1 rounded-full">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-rose-600 h-2.5 rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / LESSON_50_SCENARIOS.length) * 100}%`
          }}
        ></div>
      </div>

      {/* Scenario Question */}
      <div className="space-y-2">
        <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200/80">
          <p className="text-base sm:text-lg font-bold text-stone-800 leading-snug">
            {currentQ.scenario}
          </p>
          {currentQ.hint && (
            <p className="text-xs text-rose-700 mt-2 flex items-center gap-1 font-medium">
              <span>💡 Hint:</span> {currentQ.hint}
            </p>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-stone-50 hover:bg-rose-50/50 border-stone-200 text-stone-800';

          if (showFeedback) {
            if (opt.correct) {
              btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold ring-2 ring-emerald-300';
            } else if (selectedOption === idx) {
              btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
            } else {
              btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 text-xs sm:text-sm ${btnStyle}`}
            >
              <span className="w-6 h-6 rounded-full bg-white/80 border border-stone-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-relaxed">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback box */}
      {showFeedback && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
            currentQ.options[selectedOption].correct
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="font-black flex items-center gap-1.5">
              <span>{currentQ.options[selectedOption].correct ? '✅ Richtig! (Correct!)' : '❌ Leider falsch!'}</span>
            </p>
            <button
              onClick={() => speakText(currentQ.options[selectedOption].text)}
              className="text-xs bg-white/80 hover:bg-white px-2 py-0.5 rounded-lg border border-stone-300 text-stone-700 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>🔊 Listen</span>
            </button>
          </div>
          <p className="text-stone-700 leading-relaxed">
            {currentQ.options[selectedOption].explain}
          </p>

          <button
            onClick={handleNextQuestion}
            className="mt-3 bg-rose-700 hover:bg-rose-800 text-white font-bold px-5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 text-xs sm:text-sm ml-auto"
          >
            <span>{currentQuestionIndex + 1 === LESSON_50_SCENARIOS.length ? 'Show Results 🎉' : 'Next Question ➔'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
