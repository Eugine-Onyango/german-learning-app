import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_LESSON_7_WORKSHEET_QUESTIONS } from '../data/germanLessonsA2';

export default function A2Lektion7Game({ isSlowMode = false }) {
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
      q: "What is the golden universal rule for adjective endings in Dativ whenever an article is present?",
      options: [
        "Adjectives take '-e' for feminine, '-er' for masculine",
        "Adjectives ALWAYS take '-en' across all genders (masculine, feminine, neuter, plural)!",
        "Adjectives take no endings in Dativ",
        "Only plural adjectives take '-en'"
      ],
      answer: "Adjectives ALWAYS take '-en' across all genders (masculine, feminine, neuter, plural)!",
      explanation: "Slides 15, 22 & 31: Whenever any article is present in Dativ, the adjective ending is 100% universal '-en'!"
    },
    {
      q: "Fill in the blank: 'Er fährt mit seinem neu____ Auto.'",
      options: ["-es (neues)", "-em (neuem)", "-en (neuen)", "-e (neue)"],
      answer: "-en (neuen)",
      explanation: "Worksheet #1: 'seinem' is already in Dativ (mit dem ➔ mit seinem), so the adjective takes universal '-en': seinem neuen Auto!"
    },
    {
      q: "Fill in the blank: 'Wir wohnen in einer klein____ Wohnung.'",
      options: ["-er (kleiner)", "-e (kleine)", "-en (kleinen)", "-es (kleines)"],
      answer: "-en (kleinen)",
      explanation: "Worksheet #3: 'einer' is feminine Dativ (in der ➔ in einer), so the adjective takes universal '-en': einer kleinen Wohnung!"
    },
    {
      q: "Why does 'Frau' take 'alten' in 'Kannst du bitte der alt____ Frau helfen?'",
      options: [
        "Because 'helfen' is a Dativ verb and adjectives with articles in Dativ take '-en'",
        "Because Frau is plural",
        "Because of the accusative case",
        "Because of a spelling error"
      ],
      answer: "Because 'helfen' is a Dativ verb and adjectives with articles in Dativ take '-en'",
      explanation: "Worksheet #4 & Slide 8: The verb 'helfen' takes a Dativ object (der Frau), and any adjective with an article in Dativ takes '-en'!"
    },
    {
      q: "In Dativ Plural (e.g. 'den süßen Kindern'), what special addition happens to the noun?",
      options: [
        "The noun gets an extra '-s'",
        "The noun gets an extra '-n' am Ende (Kinder ➔ Kindern)",
        "The noun loses all endings",
        "The noun becomes masculine"
      ],
      answer: "The noun gets an extra '-n' am Ende (Kinder ➔ Kindern)",
      explanation: "Slide 14: In Dativ Plural, both the adjective gets '-en' (den süßen) AND the noun gets an extra '-n' (Kindern)!"
    },
    {
      q: "What ending does the adjective take in Dativ when there is NO article (Nullartikel) for masculine: '___ Mann'?",
      options: [
        "-en (alten Mann)",
        "-em (altem Mann - from dem)",
        "-er (alter Mann)",
        "-es (altes Mann)"
      ],
      answer: "-em (altem Mann - from dem)",
      explanation: "Slide 34: With NO article (Nullartikel), the adjective copies the definite article flag 'dem' ➔ altem Mann!"
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
    A2_LESSON_7_WORKSHEET_QUESTIONS.forEach(q => {
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
      speakGerman("Perfekt! Alle fünf Dativ-Endungen sind absolut richtig!", isSlowMode);
    } else {
      speakGerman(`Du hast ${score} von 5 Punkten erreicht. Denk an das universelle e n im Dativ!`, isSlowMode);
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
            <span>A2 Lektion 7: Adjektivendungen (Dativ) Game & Worksheet</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Practice the easiest German declension rule: universal -en in Dativ with prepositions and verbs!
          </p>
        </div>

        <div className="flex p-1 bg-stone-100 dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMode('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'worksheet'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            📝 Official Worksheet
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'quiz'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
            }`}
          >
            ⚡ Dativ Blitz (6 Qs)
          </button>
        </div>
      </div>

      {/* MODE 1: WORKSHEET CHALLENGE */}
      {activeMode === 'worksheet' && (
        <div className="bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-cyan-300/60 dark:border-slate-700 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cyan-200 dark:border-slate-700 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-800 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-300 dark:border-cyan-800">
                Official Worksheet • Ergänze Adjektivendungen im Dativ!
              </span>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                Fill in the blanks with adjective endings in the dative case!
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                Type the correct ending for each blank from the official PDF. (Hint: Look for the universal Dativ pattern!)
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
            {A2_LESSON_7_WORKSHEET_QUESTIONS.map((q) => {
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
                            : 'border-cyan-400 dark:border-cyan-600 bg-stone-50 dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-cyan-500'
                        }`}
                      />
                      <span>{q.germanEnd}</span>
                      {graded && <span>{isCorrect ? '✅' : '❌'}</span>}
                    </div>

                    <button
                      onClick={() => speakGerman(q.audioText, isSlowMode)}
                      className="px-2.5 py-1 bg-stone-100 dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-slate-600 rounded-lg text-xs cursor-pointer font-bold inline-flex items-center gap-1"
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
                      <div className="font-bold text-cyan-800 dark:text-cyan-300">
                        Solution: <span className="underline font-black">{q.fullSentence}</span> ({q.hint})
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-cyan-200 dark:border-slate-700">
            <div>
              {graded && (
                <div className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span>Score:</span>
                  <span className="text-xl text-cyan-600 dark:text-cyan-400">
                    {calculateScore()} / 5
                  </span>
                  <span>
                    {calculateScore() === 5 ? '🎉 100% Perfect!' : 'Keep practicing the universal -en!'}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleGrade}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 text-base"
            >
              ✅ Check My Answers
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: DATIV BLITZ QUIZ */}
      {activeMode === 'quiz' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-teal-200 dark:border-slate-700 space-y-6">
          {!quizDone ? (
            <>
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                    Question {currentQuizIdx + 1} of {quizQuestions.length}
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
                    Dativ Adjektivendungen Diagnostic
                  </h3>
                </div>
                <div className="text-sm font-black text-cyan-600 dark:text-amber-400">
                  Score: {quizScore} / {quizQuestions.length}
                </div>
              </div>

              {/* Question */}
              <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-lg sm:text-xl font-black text-teal-950 dark:text-teal-100">
                {quizQuestions[currentQuizIdx].q}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[currentQuizIdx].options.map((opt, idx) => {
                  const isSelected = quizSelected === opt;
                  const isCorrect = opt === quizQuestions[currentQuizIdx].answer;
                  let btnStyle = 'border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-850 hover:border-teal-400';

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
                    💡 <strong>Insight:</strong> {quizQuestions[currentQuizIdx].explanation}
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs cursor-pointer transition-all shrink-0"
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
                Dative Case Mastered!
              </h3>
              <p className="text-base text-stone-600 dark:text-slate-300">
                You scored <span className="font-black text-cyan-600 dark:text-amber-400">{quizScore}</span> out of {quizQuestions.length}!
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl text-sm cursor-pointer shadow-md transition-all hover:scale-105"
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
