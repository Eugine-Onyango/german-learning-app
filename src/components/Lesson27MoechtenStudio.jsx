import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, HelpCircle, ArrowRight, Lightbulb, Pizza, Coffee, Heart, ShoppingBag, Plane, Film, Stethoscope } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson27MoechtenStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('bracket');

  // Tab 1: Scramble state for Slide 4: bestellen - möchten - Tobi - eine Pizza
  const initialScrambleWords = [
    { id: 'w1', word: 'bestellen.', role: 'Infinitiv (am Ende)' },
    { id: 'w2', word: 'möchte', role: 'Modalverb (Pos. 2)' },
    { id: 'w3', word: 'Tobi', role: 'Subjekt (Pos. 1)' },
    { id: 'w4', word: 'eine Pizza', role: 'Objekt (Mitte)' }
  ];
  const [scrambleBank, setScrambleBank] = useState(initialScrambleWords);
  const [scrambleSlots, setScrambleSlots] = useState([]);
  const [scrambleStatus, setScrambleStatus] = useState(null); // 'correct' | 'wrong'

  const handleWordPick = (item) => {
    playChime('click');
    setScrambleBank(prev => prev.filter(w => w.id !== item.id));
    setScrambleSlots(prev => [...prev, item]);
    setScrambleStatus(null);
  };

  const handleSlotRemove = (item) => {
    playChime('click');
    setScrambleSlots(prev => prev.filter(w => w.id !== item.id));
    setScrambleBank(prev => [...prev, item]);
    setScrambleStatus(null);
  };

  const handleCheckScramble = () => {
    const constructed = scrambleSlots.map(s => s.word).join(' ');
    if (constructed === 'Tobi möchte eine Pizza bestellen.') {
      playChime('success');
      setScrambleStatus('correct');
      speakGerman('Tobi möchte eine Pizza bestellen.', isSlowMode);
    } else {
      playChime('wrong');
      setScrambleStatus('wrong');
    }
  };

  const handleResetScramble = () => {
    playChime('click');
    setScrambleBank(initialScrambleWords);
    setScrambleSlots([]);
    setScrambleStatus(null);
  };

  // Tab 2: Custom Order & Wish Generator
  const [builderSubject, setBuilderSubject] = useState('ich');
  const [builderAction, setBuilderAction] = useState('pizza');

  const builderOptions = {
    subjects: [
      { id: 'ich', pronoun: 'ich', verb: 'möchte', label: 'I' },
      { id: 'du', pronoun: 'du', verb: 'möchtest', label: 'you (casual)' },
      { id: 'er', pronoun: 'er', verb: 'möchte', label: 'he' },
      { id: 'sie', pronoun: 'sie', verb: 'möchte', label: 'she' },
      { id: 'wir', pronoun: 'wir', verb: 'möchten', label: 'we' },
      { id: 'ihr', pronoun: 'ihr', verb: 'möchtet', label: 'you all' },
      { id: 'Sie', pronoun: 'Sie', verb: 'möchten', label: 'You (formal)' }
    ],
    actions: [
      { id: 'pizza', middle: 'eine Pizza', end: 'bestellen', type: 'order', label: 'order a pizza 🍕', icon: '🍕' },
      { id: 'cola', middle: 'eine Cola', end: '', type: 'direct', label: 'have a cola (direct noun) 🥤', icon: '🥤' },
      { id: 'burger', middle: 'einen Hamburger', end: 'essen', type: 'order', label: 'eat a hamburger 🍔', icon: '🍔' },
      { id: 'arzt', middle: 'Ärztin', end: 'werden', type: 'wish', label: 'become a doctor 👩‍⚕️', icon: '👩‍⚕️' },
      { id: 'schauspieler', middle: 'Schauspieler', end: 'werden', type: 'wish', label: 'become an actor 🎭', icon: '🎭' },
      { id: 'pilot', middle: 'Pilot', end: 'werden', type: 'wish', label: 'become a pilot 👨‍✈️', icon: '👨‍✈️' },
      { id: 'aepfel', middle: 'Äpfel', end: 'kaufen', type: 'shopping', label: 'buy apples 🍎', icon: '🍏' },
      { id: 'usa', middle: 'in die USA', end: 'fliegen', type: 'wish', label: 'fly to the USA ✈️', icon: '✈️' },
      { id: 'england', middle: 'in England', end: 'studieren', type: 'wish', label: 'study in England 🇬🇧', icon: '📚' },
      { id: 'kino', middle: 'ins Kino', end: 'gehen', type: 'activity', label: 'go to cinema 🎬', icon: '🍿' }
    ]
  };

  const currentSub = builderOptions.subjects.find(s => s.id === builderSubject);
  const currentAct = builderOptions.actions.find(a => a.id === builderAction);

  const getBuiltSentence = () => {
    if (!currentAct.end) {
      return `${currentSub.pronoun} ${currentSub.verb} ${currentAct.middle}.`;
    }
    return `${currentSub.pronoun} ${currentSub.verb} ${currentAct.middle} ${currentAct.end}.`;
  };

  const getBuiltSentenceCapitalized = () => {
    const s = getBuiltSentence();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // Tab 3: Slide 12–16 Exercises
  const exercises = [
    {
      id: 'ex1',
      slideNum: 12,
      instruction: "Slide 12: Fill in the correct form of 'möchten' for 'Wir':",
      prefix: "Wir",
      correct: "möchten",
      options: ["möchte", "möchtest", "möchten", "möchtet"],
      suffix: "in die USA fliegen.",
      english: "We would like to fly to the USA.",
      icon: "✈️",
      explain: "For 'wir' (we), the ending is standard '-en' -> 'Wir möchten in die USA fliegen.'"
    },
    {
      id: 'ex2',
      slideNum: 13,
      instruction: "Slide 13: Fill in the form for 'Er' (He):",
      prefix: "Er",
      correct: "möchte",
      options: ["möchte", "möchtet", "möchten", "möchtest"],
      suffix: "einen Hamburger.",
      english: "He would like a hamburger.",
      icon: "🍔",
      explain: "⚠️ Twin Rule! 3rd person singular 'er/sie/es' is identical to 'ich' -> 'Er möchte einen Hamburger' (masculine Akkusativ)."
    },
    {
      id: 'ex3',
      slideNum: 14,
      instruction: "Slide 14: Group invitation for 'ihr' (you all):",
      prefix: "",
      correct: "Möchtet",
      options: ["Möchte", "Möchtest", "Möchtet", "Möchten"],
      suffix: "ihr mitkommen?",
      english: "Would you all like to come along?",
      icon: "🙋‍♂️",
      explain: "For informal plural 'ihr', the verb takes '-et' and leaps to Position 1 for the question -> 'Möchtet ihr mitkommen?'"
    },
    {
      id: 'ex4',
      slideNum: 15,
      instruction: "Slide 15: Career dream for 'Ich':",
      prefix: "Ich",
      correct: "möchte",
      options: ["möchte", "möchtest", "möchten", "möchtet"],
      suffix: "Pilot werden.",
      english: "I would like to become a pilot.",
      icon: "👨‍✈️",
      explain: "For 'ich', the form is 'möchte' -> 'Ich möchte Pilot werden.'"
    },
    {
      id: 'ex5',
      slideNum: 16,
      instruction: "Slide 16: Waiter asking formal 'Sie':",
      prefix: "",
      correct: "Möchten",
      options: ["Möchte", "Möchtest", "Möchtet", "Möchten"],
      suffix: "Sie etwas bestellen?",
      english: "Would you like to order something?",
      icon: "📋",
      explain: "For formal 'Sie', the verb is 'Möchten' capitalized at Position 1 -> 'Möchten Sie etwas bestellen?'"
    }
  ];

  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerPick = (exId, option) => {
    playChime('click');
    setUserAnswers(prev => ({ ...prev, [exId]: option }));
    const ex = exercises.find(e => e.id === exId);
    if (option === ex.correct) {
      playChime('success');
      const fullText = `${ex.prefix ? ex.prefix + ' ' : ''}${option} ${ex.suffix}`;
      speakGerman(fullText, isSlowMode);
    } else {
      playChime('wrong');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-orange-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-amber-500/30">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-amber-500/30 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-amber-400/40">
              <Sparkles className="w-3.5 h-3.5" />
              Lesson 27 Interactive Studio
            </span>
            <button
              onClick={() => speakGerman("Das Modalverb möchten. Ich möchte Ärztin werden. Tobi möchte eine Pizza bestellen. Was möchtest du essen?", isSlowMode)}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen to Studio Audio</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-emerald-200">
            möchten (would like to)
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            The polite superpower verb in German! Express desires, career dreams, ordering food, and asking questions. Master the <strong>Satzklammer (Verb Bracket)</strong> and the famous <strong>Modal Twin Rule (ich = er/sie/es)</strong>!
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
        <button
          onClick={() => { playChime('click'); setActiveTab('bracket'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'bracket'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>🧲 1. Verb Bracket & Scramble</span>
        </button>
        <button
          onClick={() => { playChime('click'); setActiveTab('usage'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'usage'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>🍕 2. Usage & Wish Builder</span>
        </button>
        <button
          onClick={() => { playChime('click'); setActiveTab('exercises'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'exercises'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>🎯 3. Conjugation & Übungen</span>
        </button>
      </div>

      {/* TAB 1: VERB BRACKET & SCRAMBLE */}
      {activeTab === 'bracket' && (
        <div className="space-y-6 animate-fade-in">
          {/* Explanation Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-4">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>The German Sentence Sandwich (Die Satzklammer / Verb Bracket)</span>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              When you use a modal helper verb like <strong>möchten</strong>, German sentences form a <strong>bracket (Klammer)</strong> around the details:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Slide 3 Example 1 */}
              <div
                onClick={() => speakGerman("Ich möchte Ärztin werden.", isSlowMode)}
                className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-4 cursor-pointer hover:bg-amber-100/70 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
                    Slide 3: Doctor Dream
                  </span>
                  <Volume2 className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-lg sm:text-xl font-black text-stone-900">
                  Ich <span className="text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-lg">möchte</span> Ärztin <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">werden</span>.
                </div>
                <div className="text-xs text-stone-500 italic">
                  "I would like to be (become) a doctor."
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-amber-200">
                  <div className="text-amber-900 font-bold">Pos 2: möchte (Modalverb konjugiert)</div>
                  <div className="text-emerald-900 font-bold">Ende: werden (Infinitiv)</div>
                </div>
              </div>

              {/* Slide 3 Example 2 */}
              <div
                onClick={() => speakGerman("Peter möchte in England studieren.", isSlowMode)}
                className="bg-sky-50/70 border-2 border-sky-300 rounded-2xl p-4 cursor-pointer hover:bg-sky-100/70 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-900 bg-sky-200/70 px-2.5 py-0.5 rounded-full">
                    Slide 3: Study Abroad
                  </span>
                  <Volume2 className="w-4 h-4 text-sky-700" />
                </div>
                <div className="text-lg sm:text-xl font-black text-stone-900">
                  Peter <span className="text-sky-700 bg-sky-200/80 px-2 py-0.5 rounded-lg">möchte</span> in England <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">studieren</span>.
                </div>
                <div className="text-xs text-stone-500 italic">
                  "Peter would like to study in England."
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-sky-200">
                  <div className="text-sky-900 font-bold">Pos 2: möchte (Modalverb konjugiert)</div>
                  <div className="text-emerald-900 font-bold">Ende: studieren (Infinitiv)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4 Scramble Challenge Machine */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pizza className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  Slide 4 Scramble Challenge: Tobi's Pizza
                </span>
              </div>
              <button
                onClick={handleResetScramble}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Tap the words below in the correct German sentence order to build Tobi's order:
            </p>

            {/* Answer Slots */}
            <div className="min-h-[64px] p-3 rounded-2xl bg-amber-50/50 border-2 border-dashed border-amber-300 flex flex-wrap items-center gap-2">
              {scrambleSlots.length === 0 && (
                <span className="text-xs text-stone-400 italic">
                  Tap words from the tray below to build the sentence...
                </span>
              )}
              {scrambleSlots.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSlotRemove(item)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span>{item.word}</span>
                  <span className="text-[10px] opacity-75 font-normal">({idx + 1})</span>
                </button>
              ))}
            </div>

            {/* Word Bank Tray */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Word Tray (Tap to select):
              </div>
              <div className="flex flex-wrap gap-2">
                {scrambleBank.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleWordPick(item)}
                    className="bg-stone-100 hover:bg-amber-100 border border-stone-300 hover:border-amber-400 text-stone-800 font-semibold px-3 py-2 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    <span>{item.word}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Validate Button */}
            {scrambleSlots.length === 4 && (
              <button
                onClick={handleCheckScramble}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-black py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Check Sentence Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Feedback */}
            {scrambleStatus === 'correct' && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 text-xs sm:text-sm space-y-1 animate-fade-in flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Perfekt! "Tobi möchte eine Pizza bestellen."</div>
                  <div className="text-stone-600">
                    Pos. 1: <strong>Tobi</strong> (Subjekt) | Pos. 2: <strong>möchte</strong> (Modalverb) | Mitte: <strong>eine Pizza</strong> (Objekt) | Satzende: <strong>bestellen</strong> (Infinitiv)!
                  </div>
                </div>
              </div>
            )}
            {scrambleStatus === 'wrong' && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-950 text-xs space-y-1 animate-fade-in">
                <div className="font-bold">Not quite!</div>
                <div>Remember the rule: <strong>Subjekt (Tobi)</strong> $\rightarrow$ <strong>möchte (Pos 2)</strong> $\rightarrow$ <strong>eine Pizza</strong> $\rightarrow$ <strong>bestellen (End)</strong>!</div>
              </div>
            )}
          </div>

          {/* Slide 5 Question Types Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>Slide 5: How to Ask Questions with "möchten"</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* W-Frage */}
              <div
                onClick={() => speakGerman("Was möchtest du essen?", isSlowMode)}
                className="p-4 bg-amber-50/70 border-2 border-amber-300 rounded-2xl cursor-pointer hover:bg-amber-100/70 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                    W-Frage (What/Where/Who)
                  </span>
                  <Volume2 className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-lg font-black text-stone-900">
                  <span className="text-amber-800">Was</span> <span className="text-amber-600 font-black">möchtest</span> du <span className="text-emerald-700 font-bold">essen</span>?
                </div>
                <div className="text-xs text-stone-500 italic">"What would you like to eat?"</div>
                <div className="text-[11px] text-stone-600 pt-1">
                  <strong>Order:</strong> Was (1) + möchtest (2) + du + essen (End)?
                </div>
              </div>

              {/* Ja-Nein-Frage */}
              <div
                onClick={() => speakGerman("Möchtest du ins Kino gehen?", isSlowMode)}
                className="p-4 bg-rose-50/70 border-2 border-rose-300 rounded-2xl cursor-pointer hover:bg-rose-100/70 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-rose-900 bg-rose-200 px-2.5 py-0.5 rounded-full">
                    Ja/Nein-Frage (Yes/No Question)
                  </span>
                  <Volume2 className="w-4 h-4 text-rose-700" />
                </div>
                <div className="text-lg font-black text-stone-900">
                  <span className="text-rose-700 font-black">Möchtest</span> du ins Kino <span className="text-emerald-700 font-bold">gehen</span>?
                </div>
                <div className="text-xs text-stone-500 italic">"Would you like to go to cinema?"</div>
                <div className="text-[11px] text-stone-600 pt-1">
                  <strong>Order:</strong> Möchtest (Pos 1 Leap!) + du + ins Kino + gehen (End)?
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USAGE & WISH BUILDER */}
      {activeTab === 'usage' && (
        <div className="space-y-6 animate-fade-in">
          {/* 4 Core Usage Cards from Slides 6-9 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>Slides 6–9: The 4 Everyday Superpowers of "möchten"</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Slide 6 */}
              <div
                onClick={() => speakGerman("Ich möchte eine Cola.", isSlowMode)}
                className="p-4 bg-rose-50 border-2 border-rose-200 hover:border-rose-400 rounded-2xl cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 bg-rose-200 px-2.5 py-0.5 rounded-full">
                    1. Direct Noun (No 2nd verb)
                  </span>
                  <span className="text-lg">🥤</span>
                </div>
                <div className="text-base font-black text-stone-900">
                  Ich möchte <span className="text-rose-700">eine Cola</span>.
                </div>
                <div className="text-xs text-stone-500 italic">"I would like a cola." (die Cola $\rightarrow$ eine Cola)</div>
              </div>

              {/* Slide 7 */}
              <div
                onClick={() => speakGerman("Ich möchte Schauspieler werden.", isSlowMode)}
                className="p-4 bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-2xl cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900 bg-purple-200 px-2.5 py-0.5 rounded-full">
                    2. Wunsch (Ambition / Wish)
                  </span>
                  <span className="text-lg">🎭</span>
                </div>
                <div className="text-base font-black text-stone-900">
                  Ich möchte <span className="text-purple-700">Schauspieler werden</span>.
                </div>
                <div className="text-xs text-stone-500 italic">"I would like to be an actor." (der Schauspieler)</div>
              </div>

              {/* Slide 8 */}
              <div
                onClick={() => speakGerman("Ich möchte eine Pizza bestellen.", isSlowMode)}
                className="p-4 bg-amber-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                    3. Etwas bestellen (Ordering)
                  </span>
                  <span className="text-lg">🍕</span>
                </div>
                <div className="text-base font-black text-stone-900">
                  Ich möchte <span className="text-amber-800">eine Pizza (bestellen)</span>.
                </div>
                <div className="text-xs text-stone-500 italic">"I would like to order a Pizza." (die Pizza)</div>
              </div>

              {/* Slide 9 */}
              <div
                onClick={() => speakGerman("Ich möchte Äpfel kaufen.", isSlowMode)}
                className="p-4 bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-200 px-2.5 py-0.5 rounded-full">
                    4. Etwas einkaufen (Shopping)
                  </span>
                  <span className="text-lg">🍏</span>
                </div>
                <div className="text-base font-black text-stone-900">
                  Ich möchte <span className="text-emerald-700">Äpfel kaufen</span>.
                </div>
                <div className="text-xs text-stone-500 italic">"I would like to buy apples." (die Äpfel)</div>
              </div>
            </div>
          </div>

          {/* Interactive Wish & Order Builder */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  Interactive Wish & Restaurant Order Builder
                </span>
              </div>
              <span className="text-xs text-amber-800 font-bold bg-amber-100 px-3 py-1 rounded-full">
                Live Simulator
              </span>
            </div>

            {/* Step 1: Pick Subject */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Step 1: Choose the Person (Subject):
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                {builderOptions.subjects.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { playChime('click'); setBuilderSubject(s.id); }}
                    className={`py-2 px-1 rounded-xl text-center transition-all ${
                      builderSubject === s.id
                        ? 'bg-amber-600 text-white font-black ring-2 ring-amber-400 shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.pronoun}</div>
                    <div className="text-[10px] opacity-75">{s.verb}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pick Desire/Item */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Step 2: Choose What They Want:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {builderOptions.actions.map(a => (
                  <button
                    key={a.id}
                    onClick={() => { playChime('click'); setBuilderAction(a.id); }}
                    className={`p-3 rounded-2xl text-left transition-all border ${
                      builderAction === a.id
                        ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-300'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800 text-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold">
                      <span>{a.icon}</span>
                      <span>{a.middle}</span>
                    </div>
                    {a.end && <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">+{a.end}</div>}
                    <div className="text-[10px] text-stone-400 mt-1">{a.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Result Display */}
            <div
              onClick={() => speakGerman(getBuiltSentenceCapitalized(), isSlowMode)}
              className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg cursor-pointer hover:opacity-95 transition-all space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-100">
                <span>GENERATED GERMAN SENTENCE (Tap to Listen)</span>
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="text-xl sm:text-3xl font-black tracking-tight text-white">
                {currentSub.pronoun.charAt(0).toUpperCase() + currentSub.pronoun.slice(1)}{' '}
                <span className="text-yellow-200 underline decoration-yellow-300 decoration-4 underline-offset-4">
                  {currentSub.verb}
                </span>{' '}
                {currentAct.middle}{' '}
                {currentAct.end && (
                  <span className="text-emerald-200 font-black">{currentAct.end}</span>
                )}
                .
              </div>
              <div className="text-xs text-amber-100 font-medium">
                Meaning: {currentSub.label} would like to {currentAct.label.replace(/[\u{1F300}-\u{1F6FF}]/gu, '')}.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONJUGATION & ÜBUNGEN */}
      {activeTab === 'exercises' && (
        <div className="space-y-6 animate-fade-in">
          {/* Slide 10 Conjugation Matrix with Twin Warning */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  Slide 10: Conjugation Table (Die Konjugation)
                </span>
              </div>
              <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-rose-200">
                ⚠️ Twin Rule Alert!
              </span>
            </div>

            <p className="text-xs text-stone-500">
              Notice: <strong>ich möchte</strong> and <strong>er/sie/es möchte</strong> are 100% IDENTICAL TWINS! (No '-t' on er/sie/es).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Singular Column */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-stone-100 px-4 py-2 font-bold text-xs text-stone-700 uppercase tracking-wider">
                  Singular
                </div>
                <div className="divide-y divide-stone-100 text-xs sm:text-sm">
                  <div
                    onClick={() => speakGerman("ich möchte", isSlowMode)}
                    className="p-3 flex items-center justify-between hover:bg-amber-50 cursor-pointer"
                  >
                    <span className="font-bold text-stone-700">ich</span>
                    <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">möchte</span>
                  </div>
                  <div
                    onClick={() => speakGerman("du möchtest", isSlowMode)}
                    className="p-3 flex items-center justify-between hover:bg-amber-50 cursor-pointer"
                  >
                    <span className="font-bold text-stone-700">du</span>
                    <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">möchtest</span>
                  </div>
                  <div
                    onClick={() => speakGerman("Sie möchten", isSlowMode)}
                    className="p-3 flex items-center justify-between hover:bg-amber-50 cursor-pointer"
                  >
                    <span className="font-bold text-stone-700">Sie (formal)</span>
                    <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">möchten</span>
                  </div>
                  <div
                    onClick={() => speakGerman("er sie es möchte", isSlowMode)}
                    className="p-3 flex items-center justify-between bg-rose-50/60 hover:bg-rose-100/60 cursor-pointer"
                  >
                    <span className="font-bold text-rose-950 flex items-center gap-1.5">
                      er / sie / es ⚠️
                    </span>
                    <span className="font-mono font-black text-rose-900 bg-rose-200/80 px-3 py-1 rounded-lg ring-1 ring-rose-400">
                      möchte
                    </span>
                  </div>
                </div>
              </div>

              {/* Plural Column */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-stone-100 px-4 py-2 font-bold text-xs text-stone-700 uppercase tracking-wider">
                  Plural
                </div>
                <div className="divide-y divide-stone-100 text-xs sm:text-sm">
                  <div
                    onClick={() => speakGerman("wir möchten", isSlowMode)}
                    className="p-3 flex items-center justify-between hover:bg-amber-50 cursor-pointer"
                  >
                    <span className="font-bold text-stone-700">wir</span>
                    <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">möchten</span>
                  </div>
                  <div
                    onClick={() => speakGerman("ihr möchtet", isSlowMode)}
                    className="p-3 flex items-center justify-between hover:bg-amber-50 cursor-pointer"
                  >
                    <span className="font-bold text-stone-700">ihr</span>
                    <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">möchtet</span>
                  </div>
                  <div
                    onClick={() => speakGerman("Sie möchten", isSlowMode)}
                    className="p-3 flex items-center justify-between hover:bg-amber-50 cursor-pointer"
                  >
                    <span className="font-bold text-stone-700">Sie (formal)</span>
                    <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">möchten</span>
                  </div>
                  <div
                    onClick={() => speakGerman("sie möchten", isSlowMode)}
                    className="p-3 flex items-center justify-between hover:bg-amber-50 cursor-pointer"
                  >
                    <span className="font-bold text-stone-700">sie (they)</span>
                    <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">möchten</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Classroom Übungen 1–5 from Slides 12–16 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  Slides 11–16: Interactive Classroom Exercises (Übungen 1–5)
                </span>
              </div>
              <span className="text-xs text-stone-400">5 Chalkboard Drills</span>
            </div>

            <div className="space-y-6">
              {exercises.map((ex, index) => {
                const selected = userAnswers[ex.id];
                const isCorrect = selected === ex.correct;

                return (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl bg-stone-50 border-2 border-stone-200 space-y-3 transition-all hover:border-amber-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        Exercise {index + 1} ({ex.icon})
                      </span>
                      <span className="text-xs text-stone-500 italic">{ex.english}</span>
                    </div>

                    <p className="text-xs text-stone-600 font-medium">{ex.instruction}</p>

                    {/* Sentence Line */}
                    <div className="text-base sm:text-lg font-black text-stone-900 flex flex-wrap items-center gap-2">
                      {ex.prefix && <span>{ex.prefix}</span>}
                      <span className={`px-3 py-1 rounded-xl font-mono text-sm sm:text-base ${
                        selected
                          ? isCorrect
                            ? 'bg-emerald-150 text-emerald-950 ring-2 ring-emerald-400 bg-emerald-100'
                            : 'bg-rose-150 text-rose-950 ring-2 ring-rose-400 bg-rose-100'
                          : 'bg-white border-2 border-dashed border-stone-300 text-stone-400 px-4'
                      }`}>
                        {selected || '________'}
                      </span>
                      <span>{ex.suffix}</span>
                    </div>

                    {/* Option Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {ex.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerPick(ex.id, opt)}
                          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                            selected === opt
                              ? opt === ex.correct
                                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                                : 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                              : 'bg-white border border-stone-300 text-stone-700 hover:bg-amber-50 hover:border-amber-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {/* Explanation */}
                    {selected && (
                      <div className={`p-3 rounded-xl text-xs ${
                        isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                      }`}>
                        <strong>{isCorrect ? '✓ Correct! ' : '✗ Keep in mind: '}</strong>
                        {ex.explain}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
