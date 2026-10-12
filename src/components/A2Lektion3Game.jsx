import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_LESSON_3_WORKSHEET_QUESTIONS } from '../data/germanLessonsA2';

export default function A2Lektion3Game({ isSlowMode = false }) {
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
      q: "Where does the conjugated verb go in a clause that begins with „dass“?",
      options: [
        "In Position 1 (before the subject)",
        "In Position 2 (like normal sentences)",
        "At the very end of the clause (Verb am Ende)",
        "Right after the word 'dass'"
      ],
      answer: "At the very end of the clause (Verb am Ende)",
      explanation: "The Golden Subordinate Rule: 'dass' kicks the conjugated verb directly to the finish line!"
    },
    {
      q: "Which sentence is punctuated and ordered correctly?",
      options: [
        "Ich glaube dass Peter liebt mich.",
        "Ich glaube, dass Peter mich liebt.",
        "Ich glaube, dass liebt Peter mich.",
        "Ich glaube dass, Peter mich liebt."
      ],
      answer: "Ich glaube, dass Peter mich liebt.",
      explanation: "Slide 10: Mandatory comma before 'dass', and the verb 'liebt' moves after 'mich' to the very end!"
    },
    {
      q: "How does a separable verb like 'aufstehen' behave inside a „dass“ clause?",
      options: [
        "It splits: '..., dass du stehst um 6 Uhr auf.'",
        "It re-glues at the end: '..., dass du um 6 Uhr aufstehst.'",
        "The prefix drops completely: '..., dass du um 6 Uhr stehst.'",
        "It turns into an infinitive: '..., dass du um 6 Uhr aufstehen.'"
      ],
      answer: "It re-glues at the end: '..., dass du um 6 Uhr aufstehst.'",
      explanation: "Slide 7: In subordinate clauses, the prefix and verb re-unite at the end as one word ('aufstehst')!"
    },
    {
      q: "In a Perfekt sentence (e.g. 'hast bekommen'), which verb goes to the very end?",
      options: [
        "The participle 'bekommen'",
        "The helping verb 'hast'",
        "Both stay in the middle",
        "Only the subject"
      ],
      answer: "The helping verb 'hast'",
      explanation: "Slide 6: The conjugated helping verb ('hast' or 'ist') stands in the ultimate final position: '... bekommen hast'!"
    },
    {
      q: "When a modal verb is present ('kannst schreiben'), what is the correct order at the end?",
      options: [
        "... kannst besser schreiben.",
        "... besser schreiben kannst.",
        "... schreiben besser kannst.",
        "... kannst schreiben besser."
      ],
      answer: "... besser schreiben kannst.",
      explanation: "Slide 8: Infinitive comes first, conjugated modal verb stands at the very end: '... schreiben kannst'!"
    },
    {
      q: "Transform: 'Es ist wichtig. Du machst regelmäßig deine Hausaufgaben.'",
      options: [
        "Es ist wichtig, dass du machst regelmäßig deine Hausaufgaben.",
        "Es ist wichtig, dass du regelmäßig deine Hausaufgaben machst.",
        "Es ist wichtig dass du machst deine Hausaufgaben regelmäßig.",
        "Es ist wichtig, dass regelmäßig du deine Hausaufgaben machst."
      ],
      answer: "Es ist wichtig, dass du regelmäßig deine Hausaufgaben machst.",
      explanation: "Worksheet #2: Subject 'du' follows 'dass', while 'machst' travels to the end!"
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
    A2_LESSON_3_WORKSHEET_QUESTIONS.forEach(q => {
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
      speakGerman("Hervorragend! Alle fünf dass-Sätze sind absolut perfekt!", isSlowMode);
    } else {
      speakGerman(`Du hast ${score} von 5 Punkten erreicht. Überprüfe die Verbstellung am Ende!`, isSlowMode);
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
      speakGerman("Leider nicht ganz richtig!", isSlowMode);
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
            <span>A2 Lektion 3: Nebensätze mit „dass“ Game & Worksheet</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Combine sentences with „dass“ and master verb positioning at the end of the clause!
          </p>
        </div>

        <div className="flex p-1 bg-stone-100 dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMode('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'worksheet'
                ? 'bg-emerald-500 text-stone-950 shadow-sm'
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
            ⚡ Verb-Kicker Quiz (6 Qs)
          </button>
        </div>
      </div>

      {/* MODE 1: WORKSHEET CHALLENGE */}
      {activeMode === 'worksheet' && (
        <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-300/60 dark:border-slate-700 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-200 dark:border-slate-700 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                Official Worksheet • Bilde die Sätze mit „dass“!
              </span>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                Make sentences with „dass“!
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                Combine the two standalone sentences into one subordinate clause with a comma and the verb kicked to the end.
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
            {A2_LESSON_3_WORKSHEET_QUESTIONS.map((q) => {
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
                      className="px-2.5 py-1 bg-stone-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-slate-600 rounded-lg text-xs cursor-pointer font-bold inline-flex items-center gap-1"
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
                      placeholder="Type your combined sentence with dass..."
                      className={`w-full px-3.5 py-2 border-2 rounded-xl font-bold text-sm transition-all ${
                        graded
                          ? isCorrect
                            ? 'border-emerald-600 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-white'
                            : 'border-rose-500 bg-rose-100 dark:bg-rose-900 text-rose-950 dark:text-white'
                          : 'border-emerald-300 dark:border-emerald-700 bg-stone-50 dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                    {graded && (
                      <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                    )}
                  </div>

                  {/* Translation and Hints */}
                  <div className="text-xs text-stone-500 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                    <div className="italic">
                      "{q.english}"
                    </div>
                    {(showSolution || (graded && !isCorrect)) && (
                      <div className="font-bold text-emerald-800 dark:text-emerald-300">
                        Solution: <span className="underline font-black">{q.correctAnswer}</span> ({q.hint})
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-200 dark:border-slate-700">
            <div>
              {graded && (
                <div className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <span>Score:</span>
                  <span className="text-xl text-emerald-600 dark:text-emerald-400">
                    {calculateScore()} / 5
                  </span>
                  <span>
                    {calculateScore() === 5 ? '🎉 100% Perfect!' : 'Keep practicing the verb-kick!'}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleGrade}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 text-base"
            >
              ✅ Check My Answers
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: VERB-KICKER QUIZ */}
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
                    „dass“ Sentence Architecture Diagnostic
                  </h3>
                </div>
                <div className="text-sm font-black text-emerald-600 dark:text-amber-400">
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
                    💡 <strong>Rule Explanation:</strong> {quizQuestions[currentQuizIdx].explanation}
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
                Mastery Confirmed!
              </h3>
              <p className="text-base text-stone-600 dark:text-slate-300">
                You scored <span className="font-black text-emerald-600 dark:text-amber-400">{quizScore}</span> out of {quizQuestions.length}!
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-sm cursor-pointer shadow-md transition-all hover:scale-105"
              >
                🔄 Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
