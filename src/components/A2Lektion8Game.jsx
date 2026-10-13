import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_LESSON_8_WORKSHEET_QUESTIONS } from '../data/germanLessonsA2';

export default function A2Lektion8Game({ isSlowMode }) {
  const [activeMode, setActiveMode] = useState('worksheet'); // 'worksheet' or 'quiz'

  // Worksheet State
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showHints, setShowHints] = useState({});
  const [worksheetCompleted, setWorksheetCompleted] = useState(false);

  // Quiz State
  const quizQuestions = [
    {
      id: 1,
      question: "Wo steht das konjugierte Verb in einem Nebensatz mit „wenn“?",
      options: [
        { text: "Auf Position 2 (wie im Hauptsatz)", correct: false, explanation: "Nein, Position 2 ist für Hauptsätze. 'Wenn' kickt das Verb ans Satzende!" },
        { text: "Ganz am Ende des Nebensatzes (Satzende)", correct: true, explanation: "Richtig! 'Wenn' ist eine subordinierende Konjunktion (Verb am Ende)." },
        { text: "Auf Position 1 (am Satzanfang)", correct: false, explanation: "Nein, auf Position 1 steht die Konjunktion 'wenn'." },
        { text: "Direkt vor dem Subjekt", correct: false, explanation: "Nein, das Subjekt folgt meist direkt nach 'wenn'." }
      ]
    },
    {
      id: 2,
      question: "Wenn der Nebensatz ZUERST steht („Wenn es regnet, ...“), wie geht der Hauptsatz weiter?",
      options: [
        { text: "...ich bleibe zu Hause.", correct: false, explanation: "Falsch! Nach dem Komma darf das Subjekt 'ich' nicht zuerst kommen." },
        { text: "...bleibe ich zu Hause.", correct: true, explanation: "Perfekt! Die Verb-Verb-Kollision: '...regnet, bleibe ich...'!" },
        { text: "...bleiben ich zu Hause.", correct: false, explanation: "Falsch konjugiert! Das Verb muss zu 'ich' passen (bleibe)." },
        { text: "...zu Hause ich bleibe.", correct: false, explanation: "Falsche Satzstellung." }
      ]
    },
    {
      id: 3,
      question: "Was bedeutet „Wenn ich morgen komme, gehen wir einkaufen“ laut Slide 21?",
      options: [
        { text: "Es ist sicher, dass ich komme!", correct: true, explanation: "Genau! 'Wenn' drückt hier feste Gewissheit aus (high certainty)." },
        { text: "Es ist sehr unwahrscheinlich, dass ich komme.", correct: false, explanation: "Nein, für Zweifel oder Zufall benutzt man eher 'falls'." },
        { text: "Ich komme auf keinen Fall.", correct: false, explanation: "Nein, das wäre eine Verneinung." },
        { text: "Nur wenn ich Geld habe.", correct: false, explanation: "Das steht nicht im Satz." }
      ]
    },
    {
      id: 4,
      question: "Welche Konjunktion benutzt man, wenn etwas eher zufällig oder hypothetisch ist („in case“)?",
      options: [
        { text: "weil", correct: false, explanation: "'Weil' gibt einen Grund an (Kausalsatz), keine Bedingung." },
        { text: "falls", correct: true, explanation: "Richtig! 'Falls' = 'in case / im Falle, dass' (Slide 20-22)." },
        { text: "dass", correct: false, explanation: "'Dass' verbindet Aussagen und Meinungen." },
        { text: "denn", correct: false, explanation: "'Denn' ist eine Position-0-Konjunktion für Begründungen." }
      ]
    },
    {
      id: 5,
      question: "Slide 14 Perfekt-Kicker: „Du kannst fernsehen, wenn du deine Hausaufgabe gemacht ...“",
      options: [
        { text: "hast.", correct: true, explanation: "Bravo! Im Perfekt steht das Hilfsverb 'hast' ganz am Ende nach dem Partizip II ('gemacht hast')." },
        { text: "haben.", correct: false, explanation: "Falsch konjugiert! Subjekt ist 'du', also 'hast'." },
        { text: "hattest.", correct: false, explanation: "Das ist Plusquamperfekt/Präteritum." },
        { text: "bist.", correct: false, explanation: "'Hausaufgaben machen' bildet das Perfekt mit 'haben', nicht 'sein'." }
      ]
    },
    {
      id: 6,
      question: "Wandle um in Order A (Hauptsatz zuerst): „Wenn ich Hunger habe, esse ich eine Pizza.“",
      options: [
        { text: "Ich esse eine Pizza, wenn ich Hunger habe.", correct: true, explanation: "Ausgezeichnet! Hauptsatz ganz normal (Pos 2), Komma, wenn + habe am Ende." },
        { text: "Esse ich eine Pizza, wenn ich Hunger habe.", correct: false, explanation: "Nein, im Hauptsatz steht das Subjekt vor dem Verb, wenn kein Nebensatz vorangeht." },
        { text: "Ich eine Pizza esse, wenn ich Hunger habe.", correct: false, explanation: "Falsche Satzstellung im Hauptsatz." },
        { text: "Ich esse eine Pizza, wenn Hunger ich habe.", correct: false, explanation: "Das Subjekt 'ich' gehört direkt nach 'wenn'." }
      ]
    }
  ];

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Play audio helper
  const playAudio = (text) => {
    speakGerman(text, isSlowMode);
  };

  // Check individual worksheet question
  const checkWorksheetAnswer = (qId) => {
    const q = A2_LESSON_8_WORKSHEET_QUESTIONS.find(item => item.id === qId);
    const userVal = (userAnswers[qId] || '').trim().toLowerCase();
    
    // Normalize punctuation
    const cleanUser = userVal.replace(/^[.…\s]+|[.\s]+$/g, '').trim();
    const isCorrect = q.acceptableAnswers.some(ans => {
      const cleanAns = ans.toLowerCase().replace(/^[.…\s]+|[.\s]+$/g, '').trim();
      return cleanUser === cleanAns;
    });

    setResults(prev => ({ ...prev, [qId]: isCorrect }));

    if (isCorrect) {
      playAudio(q.fullSentence);
    }

    // Check if all answered
    const updatedResults = { ...results, [qId]: isCorrect };
    if (Object.keys(updatedResults).length === A2_LESSON_8_WORKSHEET_QUESTIONS.length) {
      const allRight = Object.values(updatedResults).every(v => v === true);
      setWorksheetCompleted(allRight);
    }
  };

  // Fill sample answer
  const autofillAnswer = (qId) => {
    const q = A2_LESSON_8_WORKSHEET_QUESTIONS.find(item => item.id === qId);
    setUserAnswers(prev => ({ ...prev, [qId]: q.correctAnswer }));
    setResults(prev => ({ ...prev, [qId]: true }));
    playAudio(q.fullSentence);
  };

  // Reset worksheet
  const resetWorksheet = () => {
    setUserAnswers({});
    setResults({});
    setShowHints({});
    setWorksheetCompleted(false);
  };

  // Quiz handlers
  const handleQuizOption = (optIndex) => {
    if (quizAnswered) return;
    setSelectedQuizOption(optIndex);
    setQuizAnswered(true);

    const isCorrect = quizQuestions[currentQuizIndex].options[optIndex].correct;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedQuizOption(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 rounded-full text-xs font-black uppercase mb-1">
            <span>A2-8 Practice Zone</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-850 dark:text-white">
            Worksheet & Konditionalsatz Quiz
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Complete the 5 official course worksheet sentences, or test your mastery in the Blitz Quiz!
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-2 bg-stone-100 dark:bg-slate-700 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-600">
          <button
            onClick={() => setActiveMode('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'worksheet'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:text-teal-600'
            }`}
          >
            📝 5-Sätze Worksheet
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'quiz'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:text-amber-600'
            }`}
          >
            ⚡ Blitz Quiz (6 Qs)
          </button>
        </div>
      </div>

      {/* MODE 1: WORKSHEET EXERCISES */}
      {activeMode === 'worksheet' && (
        <div className="space-y-6">
          {/* Worksheet instructions banner */}
          <div className="bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-200 dark:border-teal-800/40 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📄</span>
              <div>
                <h3 className="text-base font-black text-teal-950 dark:text-teal-100">
                  Lektion 8: Vervollständige die Sätze! (Complete the sentences!)
                </h3>
                <p className="text-xs text-teal-800 dark:text-teal-300">
                  Transform each given statement in brackets into the Hauptsatz continuation after the comma. Remember the <strong>Verb-Verb collision</strong>!
                </p>
              </div>
            </div>
            <button
              onClick={resetWorksheet}
              className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-stone-100 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-slate-600 rounded-xl text-xs font-black cursor-pointer transition-all shrink-0"
            >
              🔄 Reset Worksheet
            </button>
          </div>

          {/* 5 Questions List */}
          <div className="space-y-4">
            {A2_LESSON_8_WORKSHEET_QUESTIONS.map((q) => {
              const isEvaluated = results[q.id] !== undefined;
              const isCorrect = results[q.id] === true;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl border-2 transition-all bg-white dark:bg-slate-800 shadow-sm ${
                    isEvaluated
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : 'border-rose-400 bg-rose-50/20 dark:bg-rose-950/20'
                      : 'border-stone-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    {/* Sentence Prompter */}
                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-black text-slate-850 dark:text-white flex flex-wrap items-center gap-2">
                        <span className="text-teal-600 dark:text-teal-400 font-extrabold">{q.conditionClause}</span>
                        <span className="text-stone-400 dark:text-slate-500">...</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>Original:</span>
                        <span className="px-2 py-0.5 bg-stone-100 dark:bg-slate-700 rounded-md font-mono text-stone-700 dark:text-stone-200">
                          ({q.promptSentence})
                        </span>
                        <span>➔ English: "{q.english}"</span>
                      </div>
                    </div>

                    {/* Quick audio preview */}
                    <button
                      onClick={() => playAudio(q.fullSentence)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-stone-700 dark:text-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
                      title="Listen to full German sentence"
                    >
                      <span>🔊 Listen</span>
                    </button>
                  </div>

                  {/* Input form */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={userAnswers[q.id] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUserAnswers(prev => ({ ...prev, [q.id]: val }));
                          if (results[q.id] !== undefined) {
                            setResults(prev => {
                              const copy = { ...prev };
                              delete copy[q.id];
                              return copy;
                            });
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') checkWorksheetAnswer(q.id);
                        }}
                        placeholder={`e.g. ${q.correctAnswer}`}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-hidden transition-all ${
                          isEvaluated
                            ? isCorrect
                              ? 'border-emerald-500 text-emerald-800 dark:text-emerald-300'
                              : 'border-rose-500 text-rose-800 dark:text-rose-300'
                            : 'border-stone-300 dark:border-slate-600 focus:border-teal-500'
                        }`}
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => checkWorksheetAnswer(q.id)}
                        className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer transition-all hover:scale-102"
                      >
                        Check
                      </button>
                      <button
                        onClick={() => setShowHints(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-stone-700 dark:text-stone-200 rounded-xl text-xs font-bold cursor-pointer"
                        title="Toggle Hint"
                      >
                        💡
                      </button>
                      <button
                        onClick={() => autofillAnswer(q.id)}
                        className="px-3 py-2.5 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-xl text-xs font-bold cursor-pointer"
                        title="Reveal Answer"
                      >
                        Show
                      </button>
                    </div>
                  </div>

                  {/* Feedback line */}
                  {isEvaluated && (
                    <div className={`mt-3 p-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span>{isCorrect ? '✅ Perfekt!' : '❌ Nicht ganz!'}</span>
                        <span>
                          {isCorrect
                            ? `Full sentence: "${q.fullSentence}" (Collision: ${q.verbCollision})`
                            : `Expected answer: "${q.correctAnswer}"`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Hint Display */}
                  {showHints[q.id] && (
                    <div className="mt-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800/40">
                      💡 <strong>Hint:</strong> {q.hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Completion Celebration */}
          {worksheetCompleted && (
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl shadow-lg text-center space-y-3 animate-bounce">
              <span className="text-4xl">🏆</span>
              <h4 className="text-xl font-black">Herzlichen Glückwunsch! Worksheet Completed!</h4>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto">
                You've mastered the Verb-Verb collision rule across all 5 worksheet questions. Ready to conquer the Blitz Quiz?
              </p>
              <button
                onClick={() => setActiveMode('quiz')}
                className="px-5 py-2.5 bg-white text-emerald-800 font-black rounded-2xl text-xs shadow-md cursor-pointer hover:scale-105 transition-all"
              >
                Start Blitz Quiz ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: BLITZ QUIZ */}
      {activeMode === 'quiz' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm space-y-6">
          {!quizFinished ? (
            <>
              {/* Quiz progress */}
              <div className="flex items-center justify-between text-xs font-black text-stone-500 dark:text-slate-400 border-b border-stone-200 dark:border-slate-700 pb-3">
                <span>Frage {currentQuizIndex + 1} von {quizQuestions.length}</span>
                <span className="text-teal-600 dark:text-teal-400">Score: {quizScore} / {quizQuestions.length}</span>
              </div>

              {/* Question */}
              <div className="text-base sm:text-lg font-black text-slate-850 dark:text-white">
                {quizQuestions[currentQuizIndex].question}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[currentQuizIndex].options.map((opt, idx) => {
                  let btnStyle = "border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-750 text-stone-800 dark:text-stone-100 hover:bg-stone-100";

                  if (quizAnswered) {
                    if (opt.correct) {
                      btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30";
                    } else if (selectedQuizOption === idx) {
                      btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                    } else {
                      btnStyle = "opacity-50 border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizOption(idx)}
                      disabled={quizAnswered}
                      className={`w-full text-left p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-stone-200 dark:bg-slate-600 flex items-center justify-center text-xs font-black shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div>
                          <div>{opt.text}</div>
                          {quizAnswered && (opt.correct || selectedQuizOption === idx) && (
                            <div className="mt-1 text-xs text-stone-500 dark:text-slate-400 font-normal">
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {quizAnswered && (
                <div className="flex justify-end pt-4 border-t border-stone-200 dark:border-slate-700">
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all hover:scale-105"
                  >
                    {currentQuizIndex + 1 === quizQuestions.length ? 'Ergebnisse ansehen ➔' : 'Nächste Frage ➔'}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Quiz Results Screen */
            <div className="text-center py-8 space-y-4">
              <span className="text-5xl">🎉</span>
              <h3 className="text-2xl font-black text-slate-850 dark:text-white">
                Quiz Abgeschlossen!
              </h3>
              <p className="text-sm text-stone-600 dark:text-slate-300">
                Dein Ergebnis: <strong className="text-teal-600 dark:text-teal-400 text-lg">{quizScore}</strong> von {quizQuestions.length} Punkten ({Math.round((quizScore / quizQuestions.length) * 100)}%)!
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm"
                >
                  Nochmal spielen
                </button>
                <button
                  onClick={() => setActiveMode('worksheet')}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-slate-700 text-stone-700 dark:text-stone-200 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Zum Worksheet
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
