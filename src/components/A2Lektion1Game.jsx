import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, Trophy, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';
import { A2_LESSON_1_WORKSHEET_QUESTIONS } from '../data/germanLessonsA2';

export default function A2Lektion1Game({ isSlowMode }) {
  // Mode: 'worksheet' or 'qa'
  const [activeTab, setActiveTab] = useState('worksheet');

  // Worksheet State
  const [worksheetAnswers, setWorksheetAnswers] = useState({});
  const [worksheetSubmitted, setWorksheetSubmitted] = useState(false);

  // Q&A Quiz State
  const qaChallenges = [
    {
      question: "Wie heißt du?",
      correct: "Mein Vorname ist Sam und mein Familienname ist Müller.",
      options: [
        "Mein Vorname ist Sam und mein Familienname ist Müller.",
        "Ich wohne in einer WG in München.",
        "Ich bin 1992 geboren."
      ],
      explanation: "'Vorname' means first name and 'Familienname' means surname!"
    },
    {
      question: "Wie alt bist du?",
      correct: "Ich bin im Jahr 1992 geboren.",
      options: [
        "Ich habe 25 Jahre.",
        "Ich bin im Jahr 1992 geboren.",
        "Ich komme aus Spanien."
      ],
      explanation: "In German, state age with 'Ich bin [X] Jahre alt' or birth year with 'Ich bin [Jahr] geboren' (never 'ich habe')!"
    },
    {
      question: "Woher kommst du?",
      correct: "Ich komme aus den USA.",
      options: [
        "Ich komme aus den USA.",
        "Ich komme bei den USA.",
        "Ich wohne aus den USA."
      ],
      explanation: "Origin uses 'aus + Country'. Plural rebel USA takes 'den': 'aus den USA'!"
    },
    {
      question: "Wo wohnst du?",
      correct: "Ich wohne in einer WG.",
      options: [
        "Ich wohne in einer WG.",
        "Ich arbeite Teilzeit.",
        "Meine Muttersprache ist Deutsch."
      ],
      explanation: "A 'WG' (Wohngemeinschaft) is a shared apartment with flatmates!"
    },
    {
      question: "Wo arbeitest du?",
      correct: "Ich arbeite bei Deutsche Bahn in München.",
      options: [
        "Ich arbeite bei Deutsche Bahn in München.",
        "Ich arbeite aus Deutsche Bahn.",
        "Ich bin in Deutsche Bahn."
      ],
      explanation: "Always use 'bei + Company' when stating your employer in German!"
    },
    {
      question: "Was machst du gern in der Freizeit?",
      correct: "Für Hobbys habe ich keine Zeit, aber ab und zu gehe ich ins Kino.",
      options: [
        "Für Hobbys habe ich keine Zeit, aber ab und zu gehe ich ins Kino.",
        "Ich bin arbeitslos und suche eine Stelle.",
        "Ich spreche sehr gut Englisch."
      ],
      explanation: "'ab und zu' means 'now and then / once in a while' - a great A2 phrase!"
    }
  ];

  const [currentQAIndex, setCurrentQAIndex] = useState(0);
  const [selectedQAOption, setSelectedQAOption] = useState(null);
  const [qaScore, setQAScore] = useState(0);
  const [qaFinished, setQAFinished] = useState(false);

  // Handle Worksheet Select
  const handleSelectWorksheetOption = (qId, option) => {
    if (worksheetSubmitted) return;
    playChime('click');
    setWorksheetAnswers({
      ...worksheetAnswers,
      [qId]: option
    });
  };

  const handleCheckWorksheet = () => {
    playChime('success');
    setWorksheetSubmitted(true);
  };

  const handleResetWorksheet = () => {
    playChime('click');
    setWorksheetAnswers({});
    setWorksheetSubmitted(false);
  };

  // Calculate worksheet score
  const worksheetScore = A2_LESSON_1_WORKSHEET_QUESTIONS.filter(
    (q) => worksheetAnswers[q.id] === q.blankAnswer
  ).length;

  // Handle QA Answer
  const handleAnswerQA = (option) => {
    if (selectedQAOption !== null) return;
    setSelectedQAOption(option);
    const isCorrect = option === qaChallenges[currentQAIndex].correct;
    if (isCorrect) {
      playChime('success');
      setQAScore(qaScore + 1);
    } else {
      playChime('wrong');
    }
  };

  const handleNextQA = () => {
    playChime('click');
    if (currentQAIndex + 1 < qaChallenges.length) {
      setCurrentQAIndex(currentQAIndex + 1);
      setSelectedQAOption(null);
    } else {
      setQAFinished(true);
    }
  };

  const handleResetQA = () => {
    playChime('click');
    setCurrentQAIndex(0);
    setSelectedQAOption(null);
    setQAScore(0);
    setQAFinished(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab Switcher: Worksheet vs Q&A */}
      <div className="flex gap-3 border-b-2 border-stone-200 dark:border-slate-700 pb-3">
        <button
          onClick={() => { setActiveTab('worksheet'); playChime('click'); }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'worksheet'
              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
              : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
          }`}
        >
          📝 Lektion 1 Worksheet Challenge (PDF Exercise)
        </button>
        <button
          onClick={() => { setActiveTab('qa'); playChime('click'); }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'qa'
              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
              : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
          }`}
        >
          ⚡ A2 Dialogue Q&A Blitz Quiz
        </button>
      </div>

      {/* WORKSHEET MODE */}
      {activeTab === 'worksheet' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-slate-700 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📑</span>
                <h3 className="font-black text-xl text-stone-900 dark:text-white">
                  Ergänze! (Fill in the Blanks - Martin Müller)
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                From the official A2 Lektion 1 worksheet. Choose the exact word that completes each sentence!
              </p>
            </div>
            {worksheetSubmitted && (
              <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black">
                Score: {worksheetScore} / {A2_LESSON_1_WORKSHEET_QUESTIONS.length} Correct
              </div>
            )}
          </div>

          <div className="space-y-4">
            {A2_LESSON_1_WORKSHEET_QUESTIONS.map((q) => {
              const selected = worksheetAnswers[q.id];
              const isCorrect = selected === q.blankAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    worksheetSubmitted
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/20'
                      : 'border-stone-200 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-750'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black">
                        {q.id}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-stone-900 dark:text-slate-100">
                        {q.sentence.replace('________', selected ? `[ ${selected} ]` : '________')}
                      </span>
                    </div>
                    <button
                      onClick={() => speakGerman(q.sentence.replace('________', q.blankAnswer), isSlowMode)}
                      className="p-1.5 text-stone-400 hover:text-amber-600 transition-colors cursor-pointer"
                      title="Listen to full correct sentence"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-stone-500 dark:text-slate-400 italic mb-3 ml-8">
                    {q.english}
                  </div>

                  {/* Options */}
                  <div className="flex flex-wrap gap-2 ml-8">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectWorksheetOption(q.id, opt)}
                        disabled={worksheetSubmitted}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selected === opt
                            ? worksheetSubmitted
                              ? isCorrect
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-rose-600 text-white shadow-xs'
                              : 'bg-amber-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-stone-700 dark:text-slate-200 border border-stone-300 dark:border-slate-600 hover:bg-stone-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {worksheetSubmitted && (
                    <div className="mt-3 ml-8 text-xs font-medium text-stone-600 dark:text-slate-300 flex items-center gap-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                            Perfekt! Answer is "{q.blankAnswer}".
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span className="text-rose-600 dark:text-rose-400">
                            Correct answer: <strong>{q.blankAnswer}</strong>. {q.hint}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            {worksheetSubmitted ? (
              <button
                onClick={handleResetWorksheet}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black bg-stone-200 dark:bg-slate-700 text-stone-800 dark:text-white hover:bg-stone-300 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            ) : (
              <button
                onClick={handleCheckWorksheet}
                disabled={Object.keys(worksheetAnswers).length < A2_LESSON_1_WORKSHEET_QUESTIONS.length}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Check Answers (Lösungen prüfen)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Q&A BLITZ QUIZ MODE */}
      {activeTab === 'qa' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm space-y-6">
          {!qaFinished ? (
            <>
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-700 pb-3">
                <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Question {currentQAIndex + 1} of {qaChallenges.length}
                </span>
                <span className="text-xs bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full font-bold">
                  Score: {qaScore}
                </span>
              </div>

              {/* Question */}
              <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-750 dark:to-slate-700 rounded-2xl border border-amber-200 dark:border-slate-600 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    How would an A2 speaker respond naturally?
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-1">
                    "{qaChallenges[currentQAIndex].question}"
                  </div>
                </div>
                <button
                  onClick={() => speakGerman(qaChallenges[currentQAIndex].question, isSlowMode)}
                  className="p-2 bg-white dark:bg-slate-600 rounded-full shadow-xs hover:scale-105 cursor-pointer text-amber-600 dark:text-amber-300 transition-transform"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {qaChallenges[currentQAIndex].options.map((opt, idx) => {
                  const isSelected = selectedQAOption === opt;
                  const isCorrect = opt === qaChallenges[currentQAIndex].correct;

                  let btnStyle = 'bg-stone-50 dark:bg-slate-700/60 border-stone-200 dark:border-slate-600 hover:border-amber-400';
                  if (selectedQAOption !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQA(opt)}
                      disabled={selectedQAOption !== null}
                      className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedQAOption !== null && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {selectedQAOption !== null && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {selectedQAOption !== null && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                  <div className="text-xs text-blue-900 dark:text-blue-200">
                    💡 {qaChallenges[currentQAIndex].explanation}
                  </div>
                  <button
                    onClick={handleNextQA}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm ml-4 shrink-0"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                🏆
              </div>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                A2 Q&A Challenge Completed!
              </h3>
              <p className="text-sm text-stone-600 dark:text-slate-300">
                You scored <strong>{qaScore}</strong> out of <strong>{qaChallenges.length}</strong>!
              </p>
              <button
                onClick={handleResetQA}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-md cursor-pointer transition-all"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
