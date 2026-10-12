import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_LESSON_2_WORKSHEET_QUESTIONS, A2_CHARAKTER_OPPOSITES_PAIRS } from '../data/germanLessonsA2';

export default function A2Lektion2Game({ isSlowMode = false }) {
  const [activeMode, setActiveMode] = useState('worksheet'); // 'worksheet' or 'speedQuiz'

  // Worksheet State
  const [userInputs, setUserInputs] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });
  const [graded, setGraded] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Speed Quiz State
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const quizQuestions = [
    {
      q: "What is the exact opposite of 'zuverlässig' (reliable)?",
      options: ["faul", "unzuverlässig", "lieblos", "unruhig"],
      answer: "unzuverlässig",
      explanation: "Add the negative prefix 'un-' ➔ zuverlässig ↔ unzuverlässig!"
    },
    {
      q: "What is the opposite of 'mutig' (brave/courageous)?",
      options: ["unmutig", "ängstlich", "schüchtern", "faul"],
      answer: "ängstlich",
      explanation: "Mutig does not take 'un-'; its opposite is 'ängstlich' (fear-filled/scared) from 'die Angst'!"
    },
    {
      q: "What is the opposite of 'schüchtern' (shy)?",
      options: ["selbstbewusst", "arrogant", "unfreundlich", "fleißig"],
      answer: "selbstbewusst",
      explanation: "Schüchtern ↔ selbstbewusst (self-assured/confident)!"
    },
    {
      q: "Which adverb means 'somewhat / a bit' as in: 'Mona ist ___ schüchtern'?",
      options: ["ziemlich", "etwas", "immer", "ganz"],
      answer: "etwas",
      explanation: "Slide 44 & 48: 'etwas' means somewhat / a bit (etwas schüchtern / etwas arrogant)!"
    },
    {
      q: "What is the opposite of 'fleißig' (diligent / hard-working)?",
      options: ["unfleißig", "ängstlich", "faul", "lieblos"],
      answer: "faul",
      explanation: "Slide 37: fleißig ↔ faul (lazy)!"
    },
    {
      q: "In the Slide 47 master sentence: 'Tanja ist etwas arrogant, aber ___ zuverlässig.' Which adverb fills the blank?",
      options: ["ganz", "immer", "nie", "ziemlich"],
      answer: "immer",
      explanation: "'immer' means 'always': Tanja is somewhat arrogant, but always reliable!"
    }
  ];

  const handleInputChange = (id, val) => {
    setUserInputs(prev => ({
      ...prev,
      [id]: val
    }));
    setGraded(false);
  };

  const calculateScore = () => {
    let score = 0;
    A2_LESSON_2_WORKSHEET_QUESTIONS.forEach(q => {
      const input = (userInputs[q.id] || '').trim().toLowerCase();
      if (q.acceptableAnswers.some(ans => ans.toLowerCase() === input)) {
        score++;
      }
    });
    return score;
  };

  const handleGrade = () => {
    setGraded(true);
    const score = calculateScore();
    if (score === 5) {
      speakGerman("Ausgezeichnet! Alle fünf Gegenteile sind absolut richtig!", isSlowMode);
    } else {
      speakGerman(`Du hast ${score} von 5 Punkten erreicht. Versuch es noch einmal!`, isSlowMode);
    }
  };

  const handleResetWorksheet = () => {
    setUserInputs({ 1: '', 2: '', 3: '', 4: '', 5: '' });
    setGraded(false);
    setShowSolution(false);
  };

  const handleQuizAnswer = (option) => {
    if (quizSelected !== null) return;
    setQuizSelected(option);
    const isCorrect = option === quizQuestions[currentQuizIdx].answer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      speakGerman("Richtig! Gut gemacht!", isSlowMode);
    } else {
      speakGerman("Leider falsch!", isSlowMode);
    }
  };

  const handleNextQuiz = () => {
    setQuizSelected(null);
    if (currentQuizIdx + 1 < quizQuestions.length) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setQuizDone(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setQuizSelected(null);
    setQuizDone(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-stone-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>🎮</span>
            <span>A2 Lektion 2: Gegenteile & Traits Challenge</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Practice the official worksheet opposites and test your speed on character nuance!
          </p>
        </div>

        <div className="flex p-1 bg-stone-100 dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMode('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'worksheet'
                ? 'bg-amber-500 text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            📝 Official Worksheet
          </button>
          <button
            onClick={() => setActiveMode('speedQuiz')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'speedQuiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            ⚡ Gegenteile Blitz (6 Qs)
          </button>
        </div>
      </div>

      {/* MODE 1: WORKSHEET CHALLENGE */}
      {activeMode === 'worksheet' && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300/60 dark:border-slate-700 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 dark:border-slate-700 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                Official Worksheet • Schreib die Gegenteile!
              </span>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                Write the Opposites!
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                Fill in the opposite word for each of the 5 character traits from your PDF.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-3.5 py-2 bg-stone-100 dark:bg-slate-700 hover:bg-stone-200 text-stone-700 dark:text-slate-200 rounded-xl text-xs font-black cursor-pointer transition-all"
              >
                {showSolution ? '🙈 Hide Solutions' : '👁️ Show Solutions'}
              </button>
              <button
                onClick={handleResetWorksheet}
                className="px-3.5 py-2 bg-stone-100 dark:bg-slate-700 hover:bg-stone-200 text-stone-700 dark:text-slate-200 rounded-xl text-xs font-black cursor-pointer transition-all"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* 5 Questions List */}
          <div className="space-y-4">
            {A2_LESSON_2_WORKSHEET_QUESTIONS.map((q) => {
              const currentInput = (userInputs[q.id] || '').trim();
              const isCorrect = q.acceptableAnswers.some(
                ans => ans.toLowerCase() === currentInput.toLowerCase()
              );

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    graded
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40'
                        : 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40'
                      : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap text-base sm:text-lg font-black text-stone-900 dark:text-white">
                      <span>{q.germanStart}</span>
                      <input
                        type="text"
                        value={userInputs[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Type opposite..."
                        className={`px-3 py-1.5 border-2 rounded-xl font-black text-base text-center transition-all min-w-[170px] ${
                          graded
                            ? isCorrect
                              ? 'border-emerald-600 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-white'
                              : 'border-rose-500 bg-rose-100 dark:bg-rose-900 text-rose-950 dark:text-white'
                            : 'border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500'
                        }`}
                      />
                      {graded && (
                        <span>{isCorrect ? '✅' : '❌'}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakGerman(q.audioText, isSlowMode)}
                        className="p-2 bg-stone-100 dark:bg-slate-700 hover:bg-amber-200 dark:hover:bg-slate-600 rounded-xl text-xs cursor-pointer transition-all"
                        title="Listen to full phrase"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>

                  {/* Hints or Solutions */}
                  <div className="mt-2 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-stone-500 dark:text-slate-400">
                    <div className="italic">
                      Translation: "{q.english}"
                    </div>
                    {(showSolution || (graded && !isCorrect)) && (
                      <div className="font-bold text-amber-700 dark:text-amber-400">
                        Answer: <span className="underline font-black">{q.correctAnswer}</span> ({q.hint})
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-200 dark:border-slate-700">
            <div>
              {graded && (
                <div className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span>Score:</span>
                  <span className="text-xl text-amber-600 dark:text-amber-400">
                    {calculateScore()} / 5
                  </span>
                  <span>
                    {calculateScore() === 5 ? '🎉 Outstanding!' : 'Keep practicing!'}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleGrade}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 text-base"
            >
              ✅ Check My Answers
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: SPEED BLITZ QUIZ */}
      {activeMode === 'speedQuiz' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-indigo-200 dark:border-slate-700 space-y-6">
          {!quizDone ? (
            <>
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Question {currentQuizIdx + 1} of {quizQuestions.length}
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
                    Gegenteile & Adverbien Fast-Recall
                  </h3>
                </div>
                <div className="text-sm font-black text-indigo-600 dark:text-amber-400">
                  Score: {quizScore} / {quizQuestions.length}
                </div>
              </div>

              {/* Question Text */}
              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-lg sm:text-xl font-black text-indigo-950 dark:text-indigo-100">
                {quizQuestions[currentQuizIdx].q}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[currentQuizIdx].options.map((opt, idx) => {
                  const isSelected = quizSelected === opt;
                  const isCorrect = opt === quizQuestions[currentQuizIdx].answer;
                  let btnStyle = 'border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-850 hover:border-indigo-400';

                  if (quizSelected !== null) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-white font-black';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-500 bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-white font-black';
                    } else {
                      btnStyle = 'opacity-40 border-stone-200 dark:border-slate-700';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(opt)}
                      className={`p-4 rounded-2xl border-2 text-left font-bold text-base transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSelected !== null && isCorrect && <span>✅</span>}
                      {quizSelected !== null && isSelected && !isCorrect && <span>❌</span>}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next */}
              {quizSelected !== null && (
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
                  <div className="text-xs sm:text-sm text-stone-700 dark:text-slate-300">
                    💡 <strong>Explanation:</strong> {quizQuestions[currentQuizIdx].explanation}
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs cursor-pointer transition-all shrink-0"
                  >
                    Next Question ➔
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="text-5xl">🏆</div>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                Quiz Completed!
              </h3>
              <p className="text-base text-stone-600 dark:text-slate-300">
                You scored <span className="font-black text-indigo-600 dark:text-amber-400">{quizScore}</span> out of {quizQuestions.length}!
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm cursor-pointer shadow-md transition-all hover:scale-105"
              >
                🔄 Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
