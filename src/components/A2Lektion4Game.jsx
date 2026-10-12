import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_LESSON_4_WORKSHEET_QUESTIONS } from '../data/germanLessonsA2';

export default function A2Lektion4Game({ isSlowMode = false }) {
  const [activeMode, setActiveMode] = useState('worksheet'); // 'worksheet' or 'quiz'

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

  // Quiz State
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const quizQuestions = [
    {
      q: "What is the key grammatical difference between „weil“ and „denn“?",
      options: [
        "Both put the verb at the very end",
        "„weil“ kicks the verb to the end; „denn“ leaves the verb in Position 2",
        "„denn“ kicks the verb to the end; „weil“ leaves the verb in Position 2",
        "Neither allows a comma before it"
      ],
      answer: "„weil“ kicks the verb to the end; „denn“ leaves the verb in Position 2",
      explanation: "Slides 18 & 19: 'weil' is a subordinating conjunction (Verb am Ende); 'denn' is a coordinating Position 0 conjunction (Verb in Position 2)!"
    },
    {
      q: "If you START a sentence with „Weil ich krank bin, ...“, what happens immediately after the comma?",
      options: [
        "The subject comes first: '..., ich kann nicht arbeiten.'",
        "The verb comes first: '..., kann ich nicht arbeiten.' (Verb Collision!)",
        "Another 'weil' is required",
        "The verb is omitted"
      ],
      answer: "The verb comes first: '..., kann ich nicht arbeiten.' (Verb Collision!)",
      explanation: "Slide 10: When the subordinate clause comes first, the main clause MUST start with its verb ('kann')!"
    },
    {
      q: "Which word means the same causal reason as „weil“ and ALSO puts the verb at the end?",
      options: ["denn", "aber", "da", "oder"],
      answer: "da",
      explanation: "Slide 9: 'da' is an interchangeable causal twin with 'weil' (since / because) and also kicks the verb to the end!"
    },
    {
      q: "Which question word can be answered by a „weil“ clause?",
      options: [
        "Only 'Warum?'",
        "Only 'Wieso?'",
        "All 5: Warum, Wieso, Weshalb, Weswegen, and Aus welchem Grund",
        "Only 'Wohin?'"
      ],
      answer: "All 5: Warum, Wieso, Weshalb, Weswegen, and Aus welchem Grund",
      explanation: "Slide 6: All 5 triggers ask for the reason or cause, and all 5 can be answered using 'weil'!"
    },
    {
      q: "In a sentence with a modal verb: '... weil sie dort studieren ___.' Which form is correct for 'sie' (singular)?",
      options: ["will", "wollen", "willt", "gewollt"],
      answer: "will",
      explanation: "Worksheet #2: '... weil sie dort studieren will.' Conjugated modal stands at the very end!"
    },
    {
      q: "How do you correctly combine: 'Ich muss etwas kochen. Ich habe Hunger.'?",
      options: [
        "Ich muss etwas kochen, weil ich habe Hunger.",
        "Ich muss etwas kochen, weil ich Hunger habe.",
        "Ich muss etwas kochen denn ich Hunger habe.",
        "Ich muss etwas kochen, da habe ich Hunger."
      ],
      answer: "Ich muss etwas kochen, weil ich Hunger habe.",
      explanation: "Worksheet #3: 'habe' travels after 'Hunger' to the finish line!"
    }
  ];

  const handleInputChange = (id, val) => {
    setUserInputs(prev => ({
      ...prev,
      [id]: val
    }));
    setGraded(false);
  };

  const cleanText = (str) => {
    return (str || '')
      .trim()
      .toLowerCase()
      .replace(/[.,?!]/g, '')
      .replace(/\s+/g, ' ');
  };

  const calculateScore = () => {
    let score = 0;
    A2_LESSON_4_WORKSHEET_QUESTIONS.forEach(q => {
      const input = cleanText(userInputs[q.id]);
      if (q.acceptableAnswers.some(ans => cleanText(ans) === input)) {
        score++;
      }
    });
    return score;
  };

  const handleGrade = () => {
    setGraded(true);
    const score = calculateScore();
    if (score === 5) {
      speakGerman("Großartig! Alle fünf weil-Sätze sind absolut fehlerfrei!", isSlowMode);
    } else {
      speakGerman(`Du hast ${score} von 5 Punkten erreicht. Achte auf das Verb am Ende!`, isSlowMode);
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
      speakGerman("Richtig! Hervorragend!", isSlowMode);
    } else {
      speakGerman("Das ist leider nicht richtig!", isSlowMode);
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
      {/* Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-stone-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>🎮</span>
            <span>A2 Lektion 4: „weil“ & „da“ Game & Worksheet</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Form causal sentences with „weil“ and master reason clauses with instant grading!
          </p>
        </div>

        <div className="flex p-1 bg-stone-100 dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMode('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'worksheet'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            📝 Official Worksheet
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'quiz'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            ⚡ Causal Blitz Quiz (6 Qs)
          </button>
        </div>
      </div>

      {/* MODE 1: WORKSHEET CHALLENGE */}
      {activeMode === 'worksheet' && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300/60 dark:border-slate-700 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 dark:border-slate-700 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                Official Worksheet • Bilde die Sätze mit „weil“!
              </span>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                Make sentences with „weil“!
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                Combine each of the 5 sentence pairs using „weil“ and remember to send the conjugated verb to the finish line!
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

          {/* 5 Questions */}
          <div className="space-y-4">
            {A2_LESSON_4_WORKSHEET_QUESTIONS.map((q) => {
              const currentClean = cleanText(userInputs[q.id]);
              const isCorrect = q.acceptableAnswers.some(
                ans => cleanText(ans) === currentClean
              );

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                    graded
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40'
                        : 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40'
                      : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-base text-stone-900 dark:text-white">
                      {q.prompt}
                    </span>
                    <button
                      onClick={() => speakGerman(q.audioText, isSlowMode)}
                      className="px-2.5 py-1 bg-stone-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 rounded-lg text-xs cursor-pointer font-bold inline-flex items-center gap-1"
                    >
                      <span>🔊</span>
                      <span>Listen</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={userInputs[q.id] || ''}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      placeholder="Type your combined sentence with weil..."
                      className={`w-full px-3.5 py-2 border-2 rounded-xl font-bold text-sm transition-all ${
                        graded
                          ? isCorrect
                            ? 'border-emerald-600 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-white'
                            : 'border-rose-500 bg-rose-100 dark:bg-rose-900 text-rose-950 dark:text-white'
                          : 'border-amber-300 dark:border-amber-700 bg-stone-50 dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500'
                      }`}
                    />
                    {graded && (
                      <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                    )}
                  </div>

                  {/* Translation & Solution */}
                  <div className="text-xs text-stone-500 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                    <div className="italic">
                      "{q.english}"
                    </div>
                    {(showSolution || (graded && !isCorrect)) && (
                      <div className="font-bold text-amber-800 dark:text-amber-300">
                        Solution: <span className="underline font-black">{q.correctAnswer}</span> ({q.hint})
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
                    {calculateScore() === 5 ? '🎉 100% Perfect!' : 'Keep practicing the verb kick!'}
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

      {/* MODE 2: CAUSAL BLITZ QUIZ */}
      {activeMode === 'quiz' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-orange-200 dark:border-slate-700 space-y-6">
          {!quizDone ? (
            <>
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                    Question {currentQuizIdx + 1} of {quizQuestions.length}
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
                    Kausalsätze Fast-Diagnostic
                  </h3>
                </div>
                <div className="text-sm font-black text-amber-600 dark:text-amber-400">
                  Score: {quizScore} / {quizQuestions.length}
                </div>
              </div>

              {/* Question */}
              <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-lg sm:text-xl font-black text-orange-950 dark:text-orange-100">
                {quizQuestions[currentQuizIdx].q}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[currentQuizIdx].options.map((opt, idx) => {
                  const isSelected = quizSelected === opt;
                  const isCorrect = opt === quizQuestions[currentQuizIdx].answer;
                  let btnStyle = 'border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-850 hover:border-orange-400';

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
                      className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSelected !== null && isCorrect && <span>✅</span>}
                      {quizSelected !== null && isSelected && !isCorrect && <span>❌</span>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {quizSelected !== null && (
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
                  <div className="text-xs sm:text-sm text-stone-700 dark:text-slate-300">
                    💡 <strong>Explanation:</strong> {quizQuestions[currentQuizIdx].explanation}
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl text-xs cursor-pointer transition-all shrink-0"
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
                Causal Mastery Achieved!
              </h3>
              <p className="text-base text-stone-600 dark:text-slate-300">
                You scored <span className="font-black text-amber-600 dark:text-amber-400">{quizScore}</span> out of {quizQuestions.length}!
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl text-sm cursor-pointer shadow-md transition-all hover:scale-105"
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
