import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_LESSON_5_WORKSHEET_QUESTIONS } from '../data/germanLessonsA2';

export default function A2Lektion5Game({ isSlowMode = false }) {
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
      q: "In 'Sandra ist schön', why does the adjective 'schön' have NO ending?",
      options: [
        "Because it is feminine",
        "Because it stands AFTER the noun/verb (predicative), so it takes no ending",
        "Because Sandra is singular",
        "It is a spelling exception"
      ],
      answer: "Because it stands AFTER the noun/verb (predicative), so it takes no ending",
      explanation: "Slides 2-4: When an adjective stands behind the noun/verb ('Sandra ist schön'), it is predicative and takes zero endings!"
    },
    {
      q: "What ending does an adjective take with a singular definite article in Nominativ (der/die/das)?",
      options: [
        "Always '-en'",
        "Always '-e' (der nette Mann, die schöne Frau, das kleine Kind)",
        "Always '-er'",
        "Always '-es'"
      ],
      answer: "Always '-e' (der nette Mann, die schöne Frau, das kleine Kind)",
      explanation: "Slide 16: Definite articles in Nominativ singular always give the adjective a calm '-e' ending!"
    },
    {
      q: "Why do we say 'ein teures Buch' instead of 'ein teueres Buch'?",
      options: [
        "Because adjectives ending in -el/-er drop their internal 'e' when declined",
        "Because Buch is neuter",
        "Because of the umlaut rule",
        "It is an optional modern slang shortcut"
      ],
      answer: "Because adjectives ending in -el/-er drop their internal 'e' when declined",
      explanation: "Slides 38-40 & Worksheet #1: Words ending in -er/-el (teuer, dunkel, sauer) drop the inner 'e': teuer ➔ teures Buch!"
    },
    {
      q: "What happens to the adjective 'hoch' when declined (e.g. 'der ___ Baum')?",
      options: [
        "der hochste Baum",
        "der hohe Baum (the 'c' disappears!)",
        "der hoche Baum",
        "der hocher Baum"
      ],
      answer: "der hohe Baum (the 'c' disappears!)",
      explanation: "Slides 41-43: With 'hoch', the letter 'c' vanishes completely when declined: der hohe Baum!"
    },
    {
      q: "Which ending does the plural adjective take with NO article (Nullartikel), e.g. 'Das sind ___ Kinder'?",
      options: [
        "-en (süßen Kinder)",
        "-e (süße Kinder)",
        "-er (süßer Kinder)",
        "-es (süßes Kinder)"
      ],
      answer: "-e (süße Kinder)",
      explanation: "Worksheet #3 & Slide 36: Without any article, the plural adjective copies the 'die' ending '-e': süße Kinder / alte Bücher!"
    },
    {
      q: "Why does 'der rosa Ballon' have no ending on 'rosa'?",
      options: [
        "Ballon is masculine",
        "Colors that end with a vowel (rosa, lila) do not decline",
        "It is in the accusative case",
        "Only plural colors decline"
      ],
      answer: "Colors that end with a vowel (rosa, lila) do not decline",
      explanation: "Slides 44-45: Foreign color adjectives ending in a vowel (rosa, lila) remain unchanged without endings in standard German!"
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
    A2_LESSON_5_WORKSHEET_QUESTIONS.forEach(q => {
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
      speakGerman("Fantastisch! Alle fünf Adjektivendungen sind perfekt!", isSlowMode);
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
      speakGerman("Richtig! Ausgezeichnet!", isSlowMode);
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
            <span>A2 Lektion 5: Adjektivendungen Game & Worksheet</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Fill in the exact adjective endings in the Nominativ case with instant checking!
          </p>
        </div>

        <div className="flex p-1 bg-stone-100 dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMode('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'worksheet'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            📝 Official Worksheet
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            ⚡ Endings Blitz (6 Qs)
          </button>
        </div>
      </div>

      {/* MODE 1: WORKSHEET CHALLENGE */}
      {activeMode === 'worksheet' && (
        <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-purple-300/60 dark:border-slate-700 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-200 dark:border-slate-700 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-800 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-300 dark:border-purple-800">
                Official Worksheet • Ergänze Adjektivendungen im Nominativ!
              </span>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                Fill in the blanks with adjective endings!
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                Type the correct ending (-e, -er, -es, or -en) for each blank from the official PDF.
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
            {A2_LESSON_5_WORKSHEET_QUESTIONS.map((q) => {
              const currentInput = (userInputs[q.id] || '').trim().toLowerCase();
              const isCorrect = q.acceptableAnswers.some(ans => ans.toLowerCase() === currentInput);

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
                    <div className="flex items-center gap-1.5 flex-wrap text-base sm:text-lg font-black text-stone-900 dark:text-white">
                      <span>{q.germanStart}</span>
                      <input
                        type="text"
                        value={userInputs[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="ending..."
                        className={`w-20 px-2 py-1 border-2 rounded-xl text-center font-black text-base transition-all ${
                          graded
                            ? isCorrect
                              ? 'border-emerald-600 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-white'
                              : 'border-rose-500 bg-rose-100 dark:bg-rose-900 text-rose-950 dark:text-white'
                            : 'border-purple-400 dark:border-purple-600 bg-stone-50 dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500'
                        }`}
                      />
                      <span>{q.germanEnd}</span>
                      {graded && <span>{isCorrect ? '✅' : '❌'}</span>}
                    </div>

                    <button
                      onClick={() => speakGerman(q.audioText, isSlowMode)}
                      className="px-2.5 py-1 bg-stone-100 dark:bg-slate-700 hover:bg-purple-100 dark:hover:bg-slate-600 rounded-lg text-xs cursor-pointer font-bold inline-flex items-center gap-1"
                    >
                      <span>🔊</span>
                      <span>Listen</span>
                    </button>
                  </div>

                  {/* Translation & Solution */}
                  <div className="text-xs text-stone-500 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                    <div className="italic">
                      "{q.english}"
                    </div>
                    {(showSolution || (graded && !isCorrect)) && (
                      <div className="font-bold text-purple-800 dark:text-purple-300">
                        Solution: <span className="underline font-black">{q.fullSentence}</span> ({q.hint})
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-200 dark:border-slate-700">
            <div>
              {graded && (
                <div className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span>Score:</span>
                  <span className="text-xl text-purple-600 dark:text-purple-400">
                    {calculateScore()} / 5
                  </span>
                  <span>
                    {calculateScore() === 5 ? '🎉 Outstanding Master!' : 'Keep practicing the endings!'}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleGrade}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 text-base"
            >
              ✅ Check My Answers
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: ENDINGS BLITZ QUIZ */}
      {activeMode === 'quiz' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-indigo-200 dark:border-slate-700 space-y-6">
          {!quizDone ? (
            <>
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Question {currentQuizIdx + 1} of {quizQuestions.length}
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
                    Nominativ Adjektivendungen Diagnostic
                  </h3>
                </div>
                <div className="text-sm font-black text-purple-600 dark:text-purple-400">
                  Score: {quizScore} / {quizQuestions.length}
                </div>
              </div>

              {/* Question */}
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
                    💡 <strong>Grammar Insight:</strong> {quizQuestions[currentQuizIdx].explanation}
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
                Adjektivdeklination Mastered!
              </h3>
              <p className="text-base text-stone-600 dark:text-slate-300">
                You scored <span className="font-black text-purple-600 dark:text-purple-400">{quizScore}</span> out of {quizQuestions.length}!
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl text-sm cursor-pointer shadow-md transition-all hover:scale-105"
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
