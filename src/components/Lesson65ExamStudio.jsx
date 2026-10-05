import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playChime, speakGerman } from '../utils/sound';

export default function Lesson65ExamStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('exam'); // 'exam', 'rules', 'sandbox'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sandboxScenario, setSandboxScenario] = useState('greeting');

  // Complete 20-Question Exam from Lesson 65 PDF (Slides 2-22)
  const examQuestions = [
    {
      id: 1,
      topic: 'Verb Conjugation (-e for ich)',
      slide: 'Slide 2-3',
      german: 'Guten Tag, ich _____ Alex.',
      english: 'Good day, my name is Alex.',
      options: [
        { key: 'a', text: 'ist' },
        { key: 'b', text: 'sein' },
        { key: 'c', text: 'heiße' },
        { key: 'd', text: 'heißt' }
      ],
      correctKey: 'c',
      correctAnswer: 'heiße',
      explanation: "In German, the pronoun 'ich' ALWAYS pairs with the verb ending '-e' (ich heiße, ich wohne, ich lerne). 'ist' is for er/sie/es, 'sein' is the raw infinitive, and 'heißt' is for du/er/sie/es.",
      analogy: "Think of matching your subject 'ich' with its dedicated uniform ending '-e'!"
    },
    {
      id: 2,
      topic: 'Everyday Redemittel & Casual Greetings',
      slide: 'Slide 4',
      german: 'Hallo, wie geht es dir?',
      english: 'Hello, how are you?',
      options: [
        { key: 'a', text: 'Gut, und dir?' },
        { key: 'b', text: 'Gut, und Ihnen?' },
        { key: 'c', text: 'Bitte.' },
        { key: 'd', text: 'Ich gehe gut. Und Sie?' }
      ],
      correctKey: 'a',
      correctAnswer: 'Gut, und dir?',
      explanation: "When asked casually with 'dir' (informal du), you mirror the casual tone with 'Gut, und dir?' (Good, and you?). Never say 'Ich gehe gut' in German (say 'Mir geht es gut' or 'Gut')!",
      analogy: "If a buddy greets you casually in Kenya, you reply on the same casual level."
    },
    {
      id: 3,
      topic: 'Irregular Stem-Changing Verbs (e ➔ i)',
      slide: 'Slide 5',
      german: 'Welche Sprachen _____ du?',
      english: 'Which languages do you speak?',
      options: [
        { key: 'a', text: 'sprechen' },
        { key: 'b', text: 'spricht' },
        { key: 'c', text: 'sprichst' },
        { key: 'd', text: 'sprecht' }
      ],
      correctKey: 'c',
      correctAnswer: 'sprichst',
      explanation: "The verb 'sprechen' changes its root vowel from 'e' to 'i' when paired with 'du' (du sprichst) and 'er/sie/es' (er spricht).",
      analogy: "The verb stem changes its vowel shape for 'du' and 'er/sie/es'."
    },
    {
      id: 4,
      topic: 'Articles: Indefinite to Definite (Feminine)',
      slide: 'Slide 6',
      german: 'Das ist eine Tasche. _____ Tasche kostet 10 Euro.',
      english: 'This is a bag. The bag costs 10 euros.',
      options: [
        { key: 'a', text: 'Der' },
        { key: 'b', text: '-' },
        { key: 'c', text: 'Die' },
        { key: 'd', text: 'Das' }
      ],
      correctKey: 'c',
      correctAnswer: 'Die',
      explanation: "Nouns introduced with 'eine' (feminine) take the definite article 'Die' when referenced a second time (eine Tasche ➔ die Tasche).",
      analogy: "First you introduce 'a bag' (eine), then you talk about 'the specific bag' (die)."
    },
    {
      id: 5,
      topic: 'Adjectives & Opposites (billig vs. teuer)',
      slide: 'Slide 7',
      german: 'Die Lampe ist nicht billig. Sie ist _____.',
      english: 'The lamp is not cheap. It is expensive.',
      options: [
        { key: 'a', text: 'teuer' },
        { key: 'b', text: 'schön' },
        { key: 'c', text: 'hässlich' },
        { key: 'd', text: 'toll' }
      ],
      correctKey: 'a',
      correctAnswer: 'teuer',
      explanation: "Direct opposites: 'billig' (cheap / inexpensive) is the exact opposite of 'teuer' (expensive). 'nicht billig' means 'teuer'.",
      analogy: "Like knowing if an item is not cheap, it has a high price tag (teuer)."
    },
    {
      id: 6,
      topic: 'Akkusativ Indefinite Article (Feminine)',
      slide: 'Slide 8',
      german: 'Guten Tag, ich brauche _____ Couch für mein Wohnzimmer.',
      english: 'Hello, I need a couch for my living room.',
      options: [
        { key: 'a', text: 'ein' },
        { key: 'b', text: 'einen' },
        { key: 'c', text: '-' },
        { key: 'd', text: 'eine' }
      ],
      correctKey: 'd',
      correctAnswer: 'eine',
      explanation: "'die Couch' is feminine. In the accusative case (direct object of 'brauchen'), feminine nouns stay 'eine' (only masculine changes to 'einen').",
      analogy: "Feminine nouns stay completely calm and keep 'eine' in the accusative case."
    },
    {
      id: 7,
      topic: 'Existence Idiom (es gibt + Akkusativ)',
      slide: 'Slide 9',
      german: 'In Hamburg _____ viele Sehenswürdigkeiten.',
      english: 'There are many sights in Hamburg.',
      options: [
        { key: 'a', text: 'gibt es' },
        { key: 'b', text: 'sehen es' },
        { key: 'c', text: 'sind es' },
        { key: 'd', text: 'hat es' }
      ],
      correctKey: 'a',
      correctAnswer: 'gibt es',
      explanation: "The German phrase for 'there is / there are' is 'es gibt'. In inverted word order (starting with place 'In Hamburg'), it flips to 'gibt es'!",
      analogy: "Universal formula to state that something exists in a city or area."
    },
    {
      id: 8,
      topic: 'Time Prepositions (Um for clock times)',
      slide: 'Slide 10',
      german: 'Axel: Wann fängt der Unterricht an? Sabine: _____ 19 Uhr.',
      english: 'Axel: When does class start? Sabine: At 7 p.m.',
      options: [
        { key: 'a', text: 'Am' },
        { key: 'b', text: 'Bis' },
        { key: 'c', text: 'Von' },
        { key: 'd', text: 'Um' }
      ],
      correctKey: 'd',
      correctAnswer: 'Um',
      explanation: "Exact clock times ALWAYS use 'Um' (Um 19 Uhr, Um 16.30 Uhr). 'Am' is for days/weekends (Am Montag), 'Im' is for months/seasons.",
      analogy: "'Um' points like a sharp arrow directly at the clock face."
    },
    {
      id: 9,
      topic: 'Word Order Inversion & Separable Verbs',
      slide: 'Slide 11',
      german: 'Am Wochenende _____',
      english: 'On the weekend we go shopping.',
      options: [
        { key: 'a', text: 'wir kaufen ein.' },
        { key: 'b', text: 'kaufen wir ein.' },
        { key: 'c', text: 'einkaufen wir.' },
        { key: 'd', text: 'wir einkaufen.' }
      ],
      correctKey: 'b',
      correctAnswer: 'kaufen wir ein.',
      explanation: "Position 1 = 'Am Wochenende' (Time). The conjugated verb 'kaufen' MUST be in Position 2, followed by subject 'wir', with separable prefix 'ein' at the very end!",
      analogy: "The verb is an immovable anchor at slot 2; the prefix detaches to the end."
    },
    {
      id: 10,
      topic: 'Polite Shopping Dialogue (Ich hätte gern...)',
      slide: 'Slide 12',
      german: 'Verkäufer: Guten Tag. Was möchten Sie? Kunde: _____',
      english: 'Seller: Hello. What would you like? Customer: I would like two kilos of pears.',
      options: [
        { key: 'a', text: 'Danke, das ist alles.' },
        { key: 'b', text: 'Danke, nein.' },
        { key: 'c', text: 'Und vierzig Cent zurück.' },
        { key: 'd', text: 'Ich hätte gern zwei Kilo Birnen.' }
      ],
      correctKey: 'd',
      correctAnswer: 'Ich hätte gern zwei Kilo Birnen.',
      explanation: "'Ich hätte gern...' (I would like to have...) is the most polite and natural German formula for ordering groceries and market items.",
      analogy: "Saying 'I would love to have...' when shopping at the grocery counter."
    },
    {
      id: 11,
      topic: 'Modal Verbs & Satzklammer (Verb at end)',
      slide: 'Slide 13',
      german: 'Das kann Max gut: _____',
      english: 'Max can do this well: Max can speak English well.',
      options: [
        { key: 'a', text: 'Englisch Max kann gut sprechen.' },
        { key: 'b', text: 'Max kann gut Englisch sprechen.' },
        { key: 'c', text: 'Max kann sprechen gut Englisch.' },
        { key: 'd', text: 'Max kann gut sprechen Englisch.' }
      ],
      correctKey: 'b',
      correctAnswer: 'Max kann gut Englisch sprechen.',
      explanation: "Sentence Bracket (Satzklammer): Modal verb 'kann' sits in Position 2, and kicks the infinitive action verb 'sprechen' to the very end!",
      analogy: "The modal verb opens the bracket, and the infinitive action verb closes it at the end."
    },
    {
      id: 12,
      topic: 'W-Question Words of Origin (Woher)',
      slide: 'Slide 14',
      german: 'Weißt du, _____ kommt Frau Schmidt?',
      english: 'Do you know where Ms. Schmidt is from?',
      options: [
        { key: 'a', text: 'Was' },
        { key: 'b', text: 'Woher' },
        { key: 'c', text: 'Wohin' },
        { key: 'd', text: 'Wo' }
      ],
      correctKey: 'b',
      correctAnswer: 'Woher',
      explanation: "'Woher' asks about origin (Where from? / kommen aus). 'Wo' asks about location (Where at?), and 'Wohin' asks about destination (Where to?).",
      analogy: "Woher asks about the starting point / origin country."
    },
    {
      id: 13,
      topic: 'Banking Collocations (ein Konto eröffnen)',
      slide: 'Slide 15',
      german: 'Herr Müller geht zur Bank. Er muss ein Konto _____.',
      english: 'Mr. Müller goes to the bank. He needs to open an account.',
      options: [
        { key: 'a', text: 'eröffnen' },
        { key: 'b', text: 'unterschreiben' },
        { key: 'c', text: 'überweisen' },
        { key: 'd', text: 'bedienen' }
      ],
      correctKey: 'a',
      correctAnswer: 'eröffnen',
      explanation: "Standard banking phrase: 'ein Konto eröffnen' (to open a bank account). 'überweisen' means to transfer money.",
      analogy: "Going to the bank specifically to open a new account."
    },
    {
      id: 14,
      topic: 'Medical & Clinic Collocations (einen Termin)',
      slide: 'Slide 16',
      german: 'Ich habe morgen einen _____ beim Zahnarzt.',
      english: 'I have an appointment with the dentist tomorrow.',
      options: [
        { key: 'a', text: 'Besserung' },
        { key: 'b', text: 'Sprechzeit' },
        { key: 'c', text: 'Datum' },
        { key: 'd', text: 'Termin' }
      ],
      correctKey: 'd',
      correctAnswer: 'Termin',
      explanation: "In Germany, you have 'einen Termin' (an appointment) with a doctor, dentist, or official office.",
      analogy: "A scheduled doctor's appointment slot in the calendar."
    },
    {
      id: 15,
      topic: 'Dative Personal Pronouns with wehtun (Mir)',
      slide: 'Slide 17',
      german: 'Ich bin krank. _____ tut der Kopf weh.',
      english: 'I am sick. My head hurts.',
      options: [
        { key: 'a', text: 'Ich' },
        { key: 'b', text: 'Mich' },
        { key: 'c', text: 'Mir' },
        { key: 'd', text: 'Es' }
      ],
      correctKey: 'c',
      correctAnswer: 'Mir',
      explanation: "'wehtun' (to hurt) is a Dative verb that literally means 'to do woe to someone'. 'ich' transforms into Dative 'Mir' (Mir tut der Kopf weh).",
      analogy: "The head is causing pain to the recipient (mir)."
    },
    {
      id: 16,
      topic: 'Dative Preposition mit (mit dem Fahrrad)',
      slide: 'Slide 18',
      german: 'Saskia fährt mit _____ Fahrrad zum Büro.',
      english: 'Saskia rides her bicycle to the office.',
      options: [
        { key: 'a', text: 'dem' },
        { key: 'b', text: 'die' },
        { key: 'c', text: 'das' },
        { key: 'd', text: 'der' }
      ],
      correctKey: 'a',
      correctAnswer: 'dem',
      explanation: "The preposition 'mit' ALWAYS takes Dativ! Neuter 'das Fahrrad' transforms into 'mit dem Fahrrad'.",
      analogy: "'mit' instantly shifts 'das' into 'dem'."
    },
    {
      id: 17,
      topic: 'Modal Verb dürfen & Impersonal man (Darf)',
      slide: 'Slide 19',
      german: '_____ man hier rauchen?',
      english: 'Is one allowed to smoke here?',
      options: [
        { key: 'a', text: 'Darfst' },
        { key: 'b', text: 'Dürft' },
        { key: 'c', text: 'Darf' },
        { key: 'd', text: 'Dürfen' }
      ],
      correctKey: 'c',
      correctAnswer: 'Darf',
      explanation: "The impersonal pronoun 'man' (one/people) always conjugates in 3rd person singular (like er/sie/es): 'dürfen' becomes 'darf' (Darf man...?).",
      analogy: "Asking about official permission for the general public."
    },
    {
      id: 18,
      topic: 'Perfekt Auxiliary sein for Movement (bin gegangen)',
      slide: 'Slide 20',
      german: 'Am Wochenende _____ ich ins Kino gegangen.',
      english: 'On the weekend I went to the cinema.',
      options: [
        { key: 'a', text: 'hatte' },
        { key: 'b', text: 'ist' },
        { key: 'c', text: 'bin' },
        { key: 'd', text: 'Habe' }
      ],
      correctKey: 'c',
      correctAnswer: 'bin',
      explanation: "'gehen' is a verb of movement from point A to B and requires 'sein' in the past tense (ich bin gegangen, wir sind gegangen).",
      analogy: "Physical locomotion across space activates the 'sein' auxiliary."
    },
    {
      id: 19,
      topic: 'Demonstrative dies- in Akkusativ Masculine (diesen)',
      slide: 'Slide 21',
      german: 'Wie findest du _____ Pullover?',
      english: 'How do you find this sweater?',
      options: [
        { key: 'a', text: 'dieser' },
        { key: 'b', text: 'dieses' },
        { key: 'c', text: 'diesen' },
        { key: 'd', text: 'diesem' }
      ],
      correctKey: 'c',
      correctAnswer: 'diesen',
      explanation: "Masculine noun 'der Pullover' in Akkusativ direct object of 'finden' takes '-en' ending: 'diesen Pullover'.",
      analogy: "Pointing to a specific masculine sweater in the shop."
    },
    {
      id: 20,
      topic: 'Conjunctions & Connectors (aber = but)',
      slide: 'Slide 22',
      german: 'Ich verstehe diese Übung nicht, _____ ich möchte versuchen.',
      english: "I don't understand this exercise, but I want to try.",
      options: [
        { key: 'a', text: 'und' },
        { key: 'b', text: 'oder' },
        { key: 'c', text: 'denn' },
        { key: 'd', text: 'aber' }
      ],
      correctKey: 'd',
      correctAnswer: 'aber',
      explanation: "'aber' is the conjunction expressing contrast ('but'). 'und' = and, 'oder' = or, 'denn' = because.",
      analogy: "Balancing difficulty with determination using 'but'."
    }
  ];

  const currentQ = examQuestions[currentQuestionIdx];
  const selectedKey = userAnswers[currentQ.id];
  const totalAnswered = Object.keys(userAnswers).length;
  
  // Calculate Score
  const score = Object.entries(userAnswers).reduce((acc, [qId, ansKey]) => {
    const q = examQuestions.find(item => item.id === parseInt(qId));
    return q && q.correctKey === ansKey ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (key) => {
    if (userAnswers[currentQ.id]) return; // Already answered this question
    const updated = { ...userAnswers, [currentQ.id]: key };
    setUserAnswers(updated);
    setShowExplanation(true);

    const isCorrect = key === currentQ.correctKey;
    if (isCorrect) {
      playChime('success');
      const optText = currentQ.options.find(o => o.key === key)?.text || '';
      speakGerman(optText, isSlowMode);
    } else {
      playChime('wrong');
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx + 1 < examQuestions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setShowExplanation(userAnswers[examQuestions[currentQuestionIdx + 1]?.id] !== undefined);
      playChime('click');
    } else {
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
      setShowExplanation(true);
      playChime('click');
    }
  };

  const handleResetExam = () => {
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
    setShowExplanation(false);
    playChime('click');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-teal-200 overflow-hidden mb-8">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-800 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm mb-2">
              <span>🎓</span> Lesson 65 Milestone Exam Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Test A1: Der Große A1-Prüfungstest
            </h2>
            <p className="text-teal-100 text-sm mt-1 max-w-2xl">
              Complete diagnostic milestone exam covering the 20 fundamental A1 grammar pillars, word orders, cases, and everyday conversational formulas from the official slides!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/20 px-3.5 py-2 rounded-xl text-center backdrop-blur-sm">
              <span className="text-[10px] text-teal-200 uppercase font-bold block">Progress</span>
              <span className="text-base font-black">{totalAnswered} / {examQuestions.length}</span>
            </div>
            <div className="bg-black/20 px-3.5 py-2 rounded-xl text-center backdrop-blur-sm">
              <span className="text-[10px] text-teal-200 uppercase font-bold block">Current Score</span>
              <span className="text-base font-black text-amber-300">{score} pts</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-1 border-b border-white/20">
          <button
            onClick={() => { playChime('click'); setActiveTab('exam'); }}
            className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'exam'
                ? 'bg-white text-teal-800 shadow-md'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <span>📝</span> 1. Complete A1 Diagnostic Exam (20 Questions)
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('rules'); }}
            className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'rules'
                ? 'bg-white text-teal-800 shadow-md'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <span>📚</span> 2. A1 Grammar Matrix & Cheat Sheet
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('sandbox'); }}
            className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'sandbox'
                ? 'bg-white text-teal-800 shadow-md'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <span>💬</span> 3. Real-Life Dialogue Sandbox
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-6 bg-teal-50/30">
        {/* ========================================================================= */}
        {/* TAB 1: 20-QUESTION A1 EXAM (SLIDES 2-22) */}
        {/* ========================================================================= */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            {!isSubmitted ? (
              <div>
                {/* Question Progress Tracker Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-bold text-teal-900 mb-1">
                    <span>Question {currentQuestionIdx + 1} of {examQuestions.length} ({currentQ.slide})</span>
                    <span className="text-stone-500 font-mono">Topic: {currentQ.topic}</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / examQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl border-2 border-teal-200 p-5 sm:p-6 shadow-md space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block bg-teal-100 text-teal-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
                        {currentQ.topic}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                        {currentQ.german}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium italic mt-1">
                        "{currentQ.english}"
                      </p>
                    </div>

                    <button
                      onClick={() => speakGerman(currentQ.german, isSlowMode)}
                      className="w-10 h-10 rounded-full bg-teal-100 hover:bg-teal-200 text-teal-800 flex items-center justify-center shrink-0 text-base shadow-sm transition-all"
                      title="Listen to German Sentence"
                    >
                      🔊
                    </button>
                  </div>

                  {/* 4 Option Buttons (a, b, c, d) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentQ.options.map((opt) => {
                      const isAnswered = selectedKey !== undefined;
                      const isThisSelected = selectedKey === opt.key;
                      const isThisCorrect = opt.key === currentQ.correctKey;

                      let btnStyle = "bg-stone-50 border-stone-200 hover:border-teal-400 hover:bg-teal-50/40 text-stone-800";
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-black ring-2 ring-emerald-300";
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-300";
                        } else {
                          btnStyle = "bg-stone-100 border-stone-200 text-stone-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectOption(opt.key)}
                          disabled={isAnswered}
                          className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-left ${btnStyle}`}
                        >
                          <span className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-xs font-black text-stone-700 shrink-0">
                            {opt.key}
                          </span>
                          <span className="text-base font-bold flex-1">{opt.text}</span>
                          {isAnswered && isThisCorrect && <span className="text-emerald-600 font-black text-lg">✓</span>}
                          {isAnswered && isThisSelected && !isThisCorrect && <span className="text-rose-600 font-black text-lg">✗</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Accordion Box */}
                  {showExplanation && (
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span>💡</span> Grammar Rule & Layman Analysis:
                        </span>
                        <button
                          onClick={() => speakGerman(currentQ.correctAnswer, isSlowMode)}
                          className="text-xs text-teal-800 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>🔊</span> Hear Correct Answer
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-800 font-medium">
                        {currentQ.explanation}
                      </p>
                      <p className="text-xs text-teal-900 font-semibold bg-white/80 p-2 rounded-lg border border-teal-100">
                        🇰🇪 <strong>Layman Analogy:</strong> {currentQ.analogy}
                      </p>
                    </div>
                  )}

                  {/* Navigation controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <button
                      onClick={handlePrev}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 transition-all"
                    >
                      ◀ Previous
                    </button>

                    <span className="text-xs text-stone-400 font-mono">
                      Q{currentQuestionIdx + 1} of {examQuestions.length}
                    </span>

                    <button
                      onClick={handleNext}
                      disabled={selectedKey === undefined}
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 transition-all shadow-md flex items-center gap-2"
                    >
                      <span>{currentQuestionIdx + 1 < examQuestions.length ? 'Next Question' : 'Finish & See Results'}</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>

                {/* Quick Question Jump Buttons */}
                <div className="mt-4 bg-white p-3 rounded-xl border border-stone-200 shadow-sm flex flex-wrap items-center gap-1.5 justify-center">
                  <span className="text-[11px] font-bold text-stone-500 mr-1">Jump to:</span>
                  {examQuestions.map((q, idx) => {
                    const ans = userAnswers[q.id];
                    let btnColor = "bg-stone-100 text-stone-600 hover:bg-stone-200";
                    if (ans !== undefined) {
                      btnColor = ans === q.correctKey ? "bg-emerald-600 text-white font-bold" : "bg-rose-500 text-white font-bold";
                    }
                    if (idx === currentQuestionIdx) {
                      btnColor += " ring-2 ring-teal-500 ring-offset-1";
                    }
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          playChime('click');
                          setCurrentQuestionIdx(idx);
                          setShowExplanation(userAnswers[q.id] !== undefined);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${btnColor}`}
                        title={`Question ${idx + 1}: ${q.topic}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Comprehensive Diagnostic Score Card */
              <div className="bg-white rounded-2xl border-2 border-teal-300 p-6 sm:p-8 shadow-xl text-center space-y-6">
                <span className="text-6xl inline-block animate-bounce">🏆</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                    A1 Diagnostic Milestone Completed!
                  </h3>
                  <p className="text-sm text-stone-600 mt-1">
                    You scored <strong className="text-teal-700 text-xl font-black">{score}</strong> out of <strong className="text-xl font-black">{examQuestions.length}</strong> (
                    {Math.round((score / examQuestions.length) * 100)}%)
                  </p>
                </div>

                {/* Performance Badge */}
                <div className={`p-4 rounded-xl border text-sm max-w-lg mx-auto ${
                  score >= 18
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : score >= 14
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}>
                  {score >= 18 && (
                    <p className="font-bold">
                      🌟 <strong>A1 Goethe / TELC Ready!</strong> Outstanding mastery across verb conjugations, inverted word orders, Akkusativ/Dativ cases, and German everyday expressions!
                    </p>
                  )}
                  {score >= 14 && score < 18 && (
                    <p className="font-bold">
                      👍 <strong>Solid A1 Foundation!</strong> Great progress! Review the few missed questions below to cement your perfect score.
                    </p>
                  )}
                  {score < 14 && (
                    <p className="font-bold">
                      💪 <strong>Good Start!</strong> Re-visit the A1 Grammar Cheat Sheet in Tab 2 and try the exam again to sharpen your accuracy.
                    </p>
                  )}
                </div>

                {/* Diagnostic Question Review List */}
                <div className="text-left max-w-2xl mx-auto space-y-2 pt-2">
                  <h4 className="text-xs font-black uppercase text-stone-500 tracking-wider">
                    Question-by-Question Breakdown:
                  </h4>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {examQuestions.map((q) => {
                      const ans = userAnswers[q.id];
                      const isCorrect = ans === q.correctKey;
                      return (
                        <div
                          key={q.id}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                            isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-rose-50/70 border-rose-200 text-rose-950'
                          }`}
                        >
                          <div className="flex-1">
                            <span className="font-black mr-2">Q{q.id}:</span>
                            <span className="font-semibold">{q.german.replace('_____', `[${q.correctAnswer}]`)}</span>
                            <p className="text-[10px] text-stone-500 mt-0.5">{q.topic}</p>
                          </div>
                          <span className={`font-black text-xs px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'}`}>
                            {isCorrect ? 'Correct ✓' : 'Missed ✗'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  <button
                    onClick={handleResetExam}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm rounded-xl shadow-md transition-all"
                  >
                    🔄 Retake Exam
                  </button>
                  <button
                    onClick={() => {
                      playChime('click');
                      setActiveTab('rules');
                    }}
                    className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm rounded-xl transition-all"
                  >
                    📖 Review Grammar Rules
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: A1 GRAMMAR RULE MATRIX & CHEAT SHEET */}
        {/* ========================================================================= */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-sm flex items-start gap-3">
              <span className="text-3xl">🏛️</span>
              <div className="text-xs sm:text-sm text-stone-700">
                <p className="font-bold text-teal-900 mb-1">
                  The 6 Essential A1 German Grammar Pillars Tested:
                </p>
                <p>
                  Every question in Test A1 tests one of these core pillars. Tap any card to listen to the German audio!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pillar 1 */}
              <div
                onClick={() => {
                  playChime('click');
                  speakGerman('ich heiße, du sprichst, er kommt.', isSlowMode);
                }}
                className="bg-white p-4 rounded-2xl border-2 border-teal-200 shadow-sm hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h4 className="font-black text-stone-900 text-sm">1. Verb Endings & Vowel Changes</h4>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  • <strong>ich</strong> takes <strong>-e</strong>: <em>ich heiße, ich lerne</em>.<br />
                  • <strong>sprechen</strong> stem change (e ➔ i): <em>du sprichst, er spricht</em>.<br />
                  • <strong>sein</strong> is irregular: <em>ich bin, du bist, er ist, wir sind</em>.
                </p>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold">
                  Slide 2 & 5: ich heiße Alex • Welche Sprachen sprichst du?
                </span>
              </div>

              {/* Pillar 2 */}
              <div
                onClick={() => {
                  playChime('click');
                  speakGerman('Am Wochenende kaufen wir ein. Max kann gut sprechen.', isSlowMode);
                }}
                className="bg-white p-4 rounded-2xl border-2 border-teal-200 shadow-sm hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚂</span>
                  <h4 className="font-black text-stone-900 text-sm">2. Position 2 Verb & Satzklammer</h4>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  • <strong>Inversion:</strong> Time first ➔ Verb stays Pos 2 (<em>Am Wochenende <strong>kaufen</strong> wir ein</em>).<br />
                  • <strong>Modal Bracket:</strong> Modal in Pos 2, infinitive kicked to end (<em>Max <strong>kann</strong> gut Deutsch <strong>sprechen</strong></em>).
                </p>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold">
                  Slide 11 & 13: Satzklammer & Verbposition 2
                </span>
              </div>

              {/* Pillar 3 */}
              <div
                onClick={() => {
                  playChime('click');
                  speakGerman('Ich brauche eine Couch. Saskia fährt mit dem Fahrrad. Mir tut der Kopf weh.', isSlowMode);
                }}
                className="bg-white p-4 rounded-2xl border-2 border-teal-200 shadow-sm hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔄</span>
                  <h4 className="font-black text-stone-900 text-sm">3. Akkusativ vs. Dativ Cases</h4>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  • <strong>Akkusativ:</strong> Only masculine changes (<em>diesen Pullover</em>); feminine stays <em>eine Couch</em>.<br />
                  • <strong>Dativ Preposition:</strong> <strong>mit</strong> always takes Dativ (<em>mit dem Fahrrad</em>).<br />
                  • <strong>Dativ Pronoun:</strong> <em>wehtun</em> takes Dativ (<em>Mir tut der Kopf weh</em>).
                </p>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold">
                  Slide 8, 17, 18, 21: eine Couch • mit dem Fahrrad • Mir tut... • diesen Pullover
                </span>
              </div>

              {/* Pillar 4 */}
              <div
                onClick={() => {
                  playChime('click');
                  speakGerman('Um 19 Uhr. Am Montag. Im Sommer.', isSlowMode);
                }}
                className="bg-white p-4 rounded-2xl border-2 border-teal-200 shadow-sm hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⏰</span>
                  <h4 className="font-black text-stone-900 text-sm">4. Time Prepositions (Um, Am, Im)</h4>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  • <strong>Um:</strong> Exact clock time (<em>Um 19 Uhr, Um 16:30 Uhr</em>).<br />
                  • <strong>Am:</strong> Days & weekends (<em>Am Montag, Am Wochenende</em>).<br />
                  • <strong>Im:</strong> Months & seasons (<em>Im Juli, Im Sommer</em>).
                </p>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold">
                  Slide 10: Sabine: Um 19 Uhr.
                </span>
              </div>

              {/* Pillar 5 */}
              <div
                onClick={() => {
                  playChime('click');
                  speakGerman('Ich bin ins Kino gegangen. Ich habe einen Apfel gegessen.', isSlowMode);
                }}
                className="bg-white p-4 rounded-2xl border-2 border-teal-200 shadow-sm hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚶</span>
                  <h4 className="font-black text-stone-900 text-sm">5. Perfekt Auxiliaries (sein vs. haben)</h4>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  • <strong>sein:</strong> Movement from A to B (<em>gehen, fahren, kommen, fliegen ➔ ich <strong>bin</strong> gegangen</em>).<br />
                  • <strong>haben:</strong> Stationary actions & transitive verbs (<em>essen, kaufen, trinken ➔ ich <strong>habe</strong> gekauft</em>).
                </p>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold">
                  Slide 20: Am Wochenende bin ich ins Kino gegangen.
                </span>
              </div>

              {/* Pillar 6 */}
              <div
                onClick={() => {
                  playChime('click');
                  speakGerman('ein Konto eröffnen, einen Termin haben, es gibt, ich hätte gern.', isSlowMode);
                }}
                className="bg-white p-4 rounded-2xl border-2 border-teal-200 shadow-sm hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💬</span>
                  <h4 className="font-black text-stone-900 text-sm">6. High-Frequency Daily Collocations</h4>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  • <strong>Banking:</strong> <em>ein Konto eröffnen</em> (to open an account).<br />
                  • <strong>Doctor:</strong> <em>einen Termin beim Arzt haben</em> (to have an appointment).<br />
                  • <strong>Shopping:</strong> <em>Ich hätte gern zwei Kilo...</em> (I would like to have...).<br />
                  • <strong>Existence:</strong> <em>Es gibt viele Sehenswürdigkeiten</em>.
                </p>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold">
                  Slide 9, 12, 15, 16: es gibt • Ich hätte gern • Konto eröffnen • Termin
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: REAL-LIFE DIALOGUE SANDBOX */}
        {/* ========================================================================= */}
        {activeTab === 'sandbox' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-sm space-y-4">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>🎭</span> 4 Real-Life A1 Conversational Scenarios
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'greeting', label: '👋 1. Friendly Greeting', speaker: 'Friend' },
                  { id: 'shopping', label: '🍎 2. Market Shopping', speaker: 'Vendor' },
                  { id: 'bank', label: '🏦 3. Bank Visit', speaker: 'Bank Clerk' },
                  { id: 'doctor', label: '🩺 4. Doctor Appointment', speaker: 'Receptionist' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playChime('click');
                      setSandboxScenario(s.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                      sandboxScenario === s.id
                        ? 'bg-teal-700 text-white border-teal-800 shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-teal-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Sandbox Scenario Cards */}
              <div className="bg-teal-50/50 p-5 rounded-xl border border-teal-200 space-y-4">
                {sandboxScenario === 'greeting' && (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                      <p className="text-xs font-bold text-teal-800 uppercase">Friend asks:</p>
                      <p className="text-lg font-black text-stone-900 flex items-center justify-between">
                        <span>Hallo! Wie geht es dir?</span>
                        <button
                          onClick={() => speakGerman('Hallo! Wie geht es dir?', isSlowMode)}
                          className="text-xs bg-teal-100 p-1.5 rounded-lg text-teal-800 hover:bg-teal-200"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-stone-500">"Hello! How are you?"</p>
                    </div>

                    <div className="bg-teal-100/70 p-4 rounded-xl border border-teal-300">
                      <p className="text-xs font-bold text-teal-900 uppercase">Your Perfect A1 Response (Slide 4):</p>
                      <p className="text-lg font-black text-teal-950 flex items-center justify-between">
                        <span>Danke, gut! Und dir?</span>
                        <button
                          onClick={() => speakGerman('Danke, gut! Und dir?', isSlowMode)}
                          className="text-xs bg-teal-700 text-white p-1.5 rounded-lg hover:bg-teal-800"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-teal-800">"Thanks, good! And you?"</p>
                    </div>
                  </div>
                )}

                {sandboxScenario === 'shopping' && (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                      <p className="text-xs font-bold text-teal-800 uppercase">Vendor asks:</p>
                      <p className="text-lg font-black text-stone-900 flex items-center justify-between">
                        <span>Guten Tag! Was möchten Sie bitte?</span>
                        <button
                          onClick={() => speakGerman('Guten Tag! Was möchten Sie bitte?', isSlowMode)}
                          className="text-xs bg-teal-100 p-1.5 rounded-lg text-teal-800 hover:bg-teal-200"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-stone-500">"Good day! What would you like?"</p>
                    </div>

                    <div className="bg-teal-100/70 p-4 rounded-xl border border-teal-300">
                      <p className="text-xs font-bold text-teal-900 uppercase">Your Perfect A1 Response (Slide 12):</p>
                      <p className="text-lg font-black text-teal-950 flex items-center justify-between">
                        <span>Ich hätte gern zwei Kilo Birnen bitte!</span>
                        <button
                          onClick={() => speakGerman('Ich hätte gern zwei Kilo Birnen bitte!', isSlowMode)}
                          className="text-xs bg-teal-700 text-white p-1.5 rounded-lg hover:bg-teal-800"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-teal-800">"I would like to have two kilos of pears please!"</p>
                    </div>
                  </div>
                )}

                {sandboxScenario === 'bank' && (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                      <p className="text-xs font-bold text-teal-800 uppercase">Bank Clerk asks:</p>
                      <p className="text-lg font-black text-stone-900 flex items-center justify-between">
                        <span>Guten Tag! Wie kann ich Ihnen helfen?</span>
                        <button
                          onClick={() => speakGerman('Guten Tag! Wie kann ich Ihnen helfen?', isSlowMode)}
                          className="text-xs bg-teal-100 p-1.5 rounded-lg text-teal-800 hover:bg-teal-200"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-stone-500">"Good day! How can I help you?"</p>
                    </div>

                    <div className="bg-teal-100/70 p-4 rounded-xl border border-teal-300">
                      <p className="text-xs font-bold text-teal-900 uppercase">Your Perfect A1 Response (Slide 15):</p>
                      <p className="text-lg font-black text-teal-950 flex items-center justify-between">
                        <span>Ich möchte gern ein Girokonto eröffnen.</span>
                        <button
                          onClick={() => speakGerman('Ich möchte gern ein Girokonto eröffnen.', isSlowMode)}
                          className="text-xs bg-teal-700 text-white p-1.5 rounded-lg hover:bg-teal-800"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-teal-800">"I would like to open a checking account."</p>
                    </div>
                  </div>
                )}

                {sandboxScenario === 'doctor' && (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                      <p className="text-xs font-bold text-teal-800 uppercase">Doctor Receptionist asks:</p>
                      <p className="text-lg font-black text-stone-900 flex items-center justify-between">
                        <span>Praxis Dr. Schmidt, guten Tag! Haben Sie einen Termin?</span>
                        <button
                          onClick={() => speakGerman('Praxis Dr. Schmidt, guten Tag! Haben Sie einen Termin?', isSlowMode)}
                          className="text-xs bg-teal-100 p-1.5 rounded-lg text-teal-800 hover:bg-teal-200"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-stone-500">"Practice Dr. Schmidt, hello! Do you have an appointment?"</p>
                    </div>

                    <div className="bg-teal-100/70 p-4 rounded-xl border border-teal-300">
                      <p className="text-xs font-bold text-teal-900 uppercase">Your Perfect A1 Response (Slide 16 & 17):</p>
                      <p className="text-lg font-black text-teal-950 flex items-center justify-between">
                        <span>Ja, ich habe einen Termin um 10 Uhr. Mir tut der Kopf weh.</span>
                        <button
                          onClick={() => speakGerman('Ja, ich habe einen Termin um 10 Uhr. Mir tut der Kopf weh.', isSlowMode)}
                          className="text-xs bg-teal-700 text-white p-1.5 rounded-lg hover:bg-teal-800"
                        >
                          🔊
                        </button>
                      </p>
                      <p className="text-xs text-teal-800">"Yes, I have an appointment at 10:00. My head hurts."</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
