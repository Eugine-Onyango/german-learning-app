import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_LESSON_9_WORKSHEET_QUESTIONS } from '../data/germanLessonsA2';

export default function A2Lektion9Game({ isSlowMode }) {
  const [activeMode, setActiveMode] = useState('worksheet'); // 'worksheet' or 'quiz'

  // Worksheet State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Quiz State
  const quizQuestions = [
    {
      id: 1,
      question: "Auf welche Kontrollfrage antwortet der Genitiv?",
      options: [
        { text: "Wem? (Dativ)", correct: false, explanation: "'Wem' fragt nach dem indirekten Objekt im Dativ." },
        { text: "Wessen? (Whose?)", correct: true, explanation: "Richtig! 'Wessen Haus ist das?' ➔ 'Das Haus meines Bruders.'" },
        { text: "Wen? (Akkusativ)", correct: false, explanation: "'Wen' fragt nach dem direkten Objekt im Akkusativ." },
        { text: "Woher? (Herkunft)", correct: false, explanation: "'Woher' fragt nach der Herkunft/Ort." }
      ]
    },
    {
      id: 2,
      question: "Welche Endung bekommt ein FEMININES Nomen im Genitiv (z.B. die Frau, die Stadt)?",
      options: [
        { text: "Immer ein -s (z.B. der Fraus)", correct: false, explanation: "Falsch! Feminine Nomen bekommen im Genitiv NIEMALS ein -s!" },
        { text: "Keine Endung (bleibt unverändert)", correct: true, explanation: "Genau! Nur der Artikel ändert sich zu 'der' (der Frau, der Stadt)." },
        { text: "Ein -en (z.B. der Frauen)", correct: false, explanation: "Nein, -en ist für n-Deklination oder Plural." },
        { text: "Ein -es", correct: false, explanation: "-es ist nur für maskuline und neutrale Nomen." }
      ]
    },
    {
      id: 3,
      question: "Warum heißt es „des Mannes“ mit -es und nicht nur „des Manns“?",
      options: [
        { text: "Weil 'Mann' ein einsilbiges Nomen ist (monosyllabic)", correct: true, explanation: "Perfekt! Einsilbige Nomen wie Mann, Buch, Kind, Film bekommen -es als Atem-Polster." },
        { text: "Weil es unregelmäßig ist", correct: false, explanation: "Nein, das ist eine regelmäßige Regel für alle einsilbigen Nomen." },
        { text: "Weil es im Plural steht", correct: false, explanation: "Nein, 'des Mannes' ist Singular." },
        { text: "Weil es Feminin ist", correct: false, explanation: "Mann ist Maskulin." }
      ]
    },
    {
      id: 4,
      question: "Wie lautet der Genitiv von Eigennamen, die bereits auf s, ß, x oder z enden (z.B. Hans)?",
      options: [
        { text: "Hanses Auto", correct: false, explanation: "Nein, im Deutschen sagt man nicht 'Hanses'." },
        { text: "Hans' Auto (nur mit Apostroph)", correct: true, explanation: "Richtig! Slide 14: Bei Namen auf s, ß, z, x setzt man nur einen Apostroph: Hans' Auto!" },
        { text: "Hansen Auto", correct: false, explanation: "Falsch." },
        { text: "Das Auto von Hanses", correct: false, explanation: "Falsch." }
      ]
    },
    {
      id: 5,
      question: "Wie lautet der unbestimmte Artikel im Genitiv für ein neutrales Nomen (z.B. das Haus)?",
      options: [
        { text: "einer Hauses", correct: false, explanation: "'einer' ist für feminine Nomen." },
        { text: "eines Hauses", correct: true, explanation: "Bravo! Neutral und Maskulin nehmen 'eines' + Nomen bekommt -(e)s: eines Hauses!" },
        { text: "einem Hauses", correct: false, explanation: "'einem' ist Dativ." },
        { text: "eins Hauses", correct: false, explanation: "'eins' existiert nicht als Genitiv-Artikel." }
      ]
    },
    {
      id: 6,
      question: "Wie ersetzen viele Deutsche den Genitiv in der alltäglichen Umgangssprache (Slide 41)?",
      options: [
        { text: "Mit 'mit' + Akkusativ", correct: false, explanation: "Nein." },
        { text: "Mit 'von' + Dativ (z.B. die Freundin von meinem Bruder)", correct: true, explanation: "Sehr gut! 'Die Freundin von meinem Bruder' ist der klassische umgangssprachliche Dativ-Ersatz." },
        { text: "Mit 'für' + Akkusativ", correct: false, explanation: "Nein, 'für' zeigt Bestimmung oder Zweck." },
        { text: "Mit dem Nominativ", correct: false, explanation: "Nein." }
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

  // Handle worksheet selection
  const handleOptionSelect = (qId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleCheckWorksheet = () => {
    setSubmitted(true);
    // Calculate if all correct
    const allCorrect = A2_LESSON_9_WORKSHEET_QUESTIONS.every(
      q => selectedAnswers[q.id] === q.correctAnswer
    );
    if (allCorrect) {
      playAudio("Sehr gut! Alle fünf Sätze im Genitiv sind richtig!");
    }
  };

  const resetWorksheet = () => {
    setSelectedAnswers({});
    setSubmitted(false);
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

  // Count correct answers in worksheet
  const worksheetCorrectCount = submitted
    ? A2_LESSON_9_WORKSHEET_QUESTIONS.filter(q => selectedAnswers[q.id] === q.correctAnswer).length
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-black uppercase mb-1">
            <span>A2-9 Practice Zone</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-850 dark:text-white">
            Worksheet & Genitiv Blitz Challenge
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Practice with the official 5-question worksheet or test your rules in the Quiz!
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-2 bg-stone-100 dark:bg-slate-700 p-1.5 rounded-2xl border border-stone-200 dark:border-slate-600">
          <button
            onClick={() => setActiveMode('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'worksheet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:text-indigo-600'
            }`}
          >
            📝 5-Fragen Worksheet
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
              activeMode === 'quiz'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:text-purple-600'
            }`}
          >
            ⚡ Genitiv Quiz (6 Qs)
          </button>
        </div>
      </div>

      {/* MODE 1: WORKSHEET EXERCISES */}
      {activeMode === 'worksheet' && (
        <div className="space-y-6">
          {/* Instructions Banner */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800/40 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📄</span>
              <div>
                <h3 className="text-base font-black text-indigo-950 dark:text-indigo-100">
                  A2 - Lektion 9: Markiere die richtige Antwort!
                </h3>
                <p className="text-xs text-indigo-800 dark:text-indigo-300">
                  Select the correct Genitive article for each sentence from the official course worksheet.
                </p>
              </div>
            </div>
            <button
              onClick={resetWorksheet}
              className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-stone-100 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-slate-600 rounded-xl text-xs font-black cursor-pointer transition-all shrink-0"
            >
              🔄 Reset Choices
            </button>
          </div>

          {/* 5 Questions */}
          <div className="space-y-4">
            {A2_LESSON_9_WORKSHEET_QUESTIONS.map((q) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = submitted && userChoice === q.correctAnswer;
              const isWrong = submitted && userChoice && userChoice !== q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl border-2 transition-all bg-white dark:bg-slate-800 shadow-sm ${
                    submitted
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : isWrong
                        ? 'border-rose-400 bg-rose-50/20 dark:bg-rose-950/20'
                        : 'border-amber-400 bg-amber-50/20'
                      : 'border-stone-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Frage {q.id} • {q.gender}
                    </span>
                    <button
                      onClick={() => playAudio(q.fullSentence)}
                      className="px-3 py-1 bg-stone-100 hover:bg-stone-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-stone-700 dark:text-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                    >
                      <span>🔊 Listen</span>
                    </button>
                  </div>

                  {/* Sentence with inline radio buttons */}
                  <div className="text-sm sm:text-base font-black text-slate-850 dark:text-white flex flex-wrap items-center gap-2 mb-4 leading-relaxed">
                    <span>{q.sentenceStart}</span>

                    {/* Checkbox/Radio options */}
                    <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-slate-900 p-1 rounded-2xl border border-stone-300 dark:border-slate-600">
                      {q.options.map((opt) => {
                        let btnStyle = "bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200";

                        if (userChoice === opt) {
                          btnStyle = "bg-indigo-600 text-white shadow-xs font-black";
                        }

                        if (submitted) {
                          if (opt === q.correctAnswer) {
                            btnStyle = "bg-emerald-600 text-white shadow-xs font-black ring-2 ring-emerald-400";
                          } else if (userChoice === opt && opt !== q.correctAnswer) {
                            btnStyle = "bg-rose-600 text-white shadow-xs font-black";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(q.id, opt)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${btnStyle}`}
                          >
                            <span>{userChoice === opt ? '☑' : '☐'}</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    <span>{q.sentenceEnd}</span>
                  </div>

                  {/* English meaning */}
                  <div className="text-xs text-stone-500 dark:text-slate-400 italic mb-2">
                    Meaning: "{q.english}"
                  </div>

                  {/* Grammatical explanation */}
                  {submitted && (
                    <div className={`mt-3 p-3 rounded-xl text-xs font-bold ${
                      isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <span>{isCorrect ? '✅ Richtig!' : '❌ Nicht ganz!'}</span>
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-stone-200 dark:border-slate-700 shadow-sm">
            <div className="text-xs font-bold text-stone-600 dark:text-slate-300">
              {submitted ? (
                <span>Ergebnis: <strong className="text-indigo-600 dark:text-indigo-400">{worksheetCorrectCount} von 5 richtig</strong></span>
              ) : (
                <span>Bitte wähle für alle 5 Sätze eine Antwort aus!</span>
              )}
            </div>

            <button
              onClick={handleCheckWorksheet}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all hover:scale-105"
            >
              Antworten Prüfen ➔
            </button>
          </div>

          {/* Completion Celebration */}
          {submitted && worksheetCorrectCount === 5 && (
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-3xl shadow-lg text-center space-y-3 animate-bounce">
              <span className="text-4xl">🏆</span>
              <h4 className="text-xl font-black">Perfekt! 5 von 5 im Genitiv-Worksheet!</h4>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto">
                Du hast alle Genitiv-Formen (meiner Eltern, der Stadt, unserer Nachbarin, eines Hauses, des Filmes) fehlerfrei gelöst!
              </p>
              <button
                onClick={() => setActiveMode('quiz')}
                className="px-5 py-2.5 bg-white text-indigo-900 font-black rounded-2xl text-xs shadow-md cursor-pointer hover:scale-105 transition-all"
              >
                Zum Genitiv-Quiz ➔
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
                <span className="text-indigo-600 dark:text-indigo-400">Score: {quizScore} / {quizQuestions.length}</span>
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
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all hover:scale-105"
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
                Genitiv Quiz Abgeschlossen!
              </h3>
              <p className="text-sm text-stone-600 dark:text-slate-300">
                Dein Ergebnis: <strong className="text-indigo-600 dark:text-indigo-400 text-lg">{quizScore}</strong> von {quizQuestions.length} Punkten ({Math.round((quizScore / quizQuestions.length) * 100)}%)!
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm"
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
