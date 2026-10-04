import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  Car, 
  Utensils, 
  BookOpen, 
  PhoneCall, 
  Film, 
  CheckSquare, 
  HelpCircle,
  Puzzle
} from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson43PerfektStudio({ isSlowMode }) {
  const [activeSubTab, setActiveSubTab] = useState('bracket');
  const [activeMode, setActiveMode] = useState('statement');
  const [partizipCategory, setPartizipCategory] = useState('all');

  // Interactive Puzzle State
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleError, setPuzzleError] = useState(false);

  // 4 Modes for Satzklammer Bracket Visualizer
  const BRACKET_MODES = {
    statement: {
      title: '1. Standard Statement (Slide 6 & 8)',
      pos1: { label: 'Position 1 (Subjekt)', text: 'Ich', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-amber-300' },
      pos2: { label: 'Position 2 (Hilfsverb)', text: 'habe', color: 'bg-emerald-500 text-white border-emerald-600 shadow-md', badge: 'Conjugated haben' },
      middle: { label: 'Mittelfeld (Details / Objekt)', text: 'einen frischen Salat', color: 'bg-stone-100 dark:bg-stone-750 text-stone-800 dark:text-stone-200 border-stone-300' },
      posEnd: { label: 'Satzende (Partizip II)', text: 'gegessen.', color: 'bg-indigo-600 text-white border-indigo-700 shadow-md', badge: 'Frozen Partizip II' },
      fullSentence: 'Ich habe einen frischen Salat gegessen.',
      translation: 'I have eaten a fresh salad.',
      explanation: 'The conjugated helping verb "habe" sits in Position 2, while the past participle "gegessen" is frozen at the very end!'
    },
    movement: {
      title: '2. Movement with sein (Slide 7 & 10)',
      pos1: { label: 'Position 1 (Subjekt)', text: 'Wir', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-amber-300' },
      pos2: { label: 'Position 2 (Hilfsverb)', text: 'sind', color: 'bg-blue-600 text-white border-blue-700 shadow-md', badge: 'Conjugated sein' },
      middle: { label: 'Mittelfeld (Zeit & Ort)', text: 'letzte Woche nach Paris', color: 'bg-stone-100 dark:bg-stone-750 text-stone-800 dark:text-stone-200 border-stone-300' },
      posEnd: { label: 'Satzende (Partizip II)', text: 'gefahren.', color: 'bg-indigo-600 text-white border-indigo-700 shadow-md', badge: 'Movement Partizip II' },
      fullSentence: 'Wir sind letzte Woche nach Paris gefahren.',
      translation: 'Last week we travelled to Paris.',
      explanation: 'Because "fahren" indicates traveling from Point A to Point B, it requires "sein" (wir sind) as the helping verb!'
    },
    inversion: {
      title: '3. Time Inversion (Slide 19 & 20)',
      pos1: { label: 'Position 1 (Zeitangabe)', text: 'Am Freitag', color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200 border-purple-300' },
      pos2: { label: 'Position 2 (Hilfsverb)', text: 'sind', color: 'bg-blue-600 text-white border-blue-700 shadow-md', badge: 'Position 2 Locked!' },
      middle: { label: 'Mittelfeld (Subjekt & Ort)', text: 'wir ins Kino', color: 'bg-stone-100 dark:bg-stone-750 text-stone-800 dark:text-stone-200 border-stone-300' },
      posEnd: { label: 'Satzende (Partizip II)', text: 'gegangen.', color: 'bg-indigo-600 text-white border-indigo-700 shadow-md', badge: 'Frozen Partizip II' },
      fullSentence: 'Am Freitag sind wir ins Kino gegangen.',
      translation: 'On Friday we went to the cinema.',
      explanation: 'Starting with a time element ("Am Freitag") pushes the subject ("wir") to Position 3, keeping "sind" firmly in Position 2!'
    },
    wFrage: {
      title: '4. W-Frage (Slide 11)',
      pos1: { label: 'Position 1 (Fragewort)', text: 'Was', color: 'bg-rose-100 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200 border-rose-300' },
      pos2: { label: 'Position 2 (Hilfsverb)', text: 'hast', color: 'bg-emerald-500 text-white border-emerald-600 shadow-md', badge: 'Conjugated hast' },
      middle: { label: 'Mittelfeld (Subjekt & Zeit)', text: 'du gestern', color: 'bg-stone-100 dark:bg-stone-750 text-stone-800 dark:text-stone-200 border-stone-300' },
      posEnd: { label: 'Satzende (Partizip II)', text: 'gemacht?', color: 'bg-indigo-600 text-white border-indigo-700 shadow-md', badge: 'Partizip II at End' },
      fullSentence: 'Was hast du gestern gemacht?',
      translation: 'What did you do yesterday?',
      explanation: 'In W-questions, the wh-word takes Position 1, the helping verb "hast" takes Position 2, and "gemacht?" closes the bracket.'
    },
    jaNein: {
      title: '5. Ja/Nein-Frage (Slide 11 & 17)',
      pos1: { label: 'Position 1 (Hilfsverb Leaps!)', text: 'Hast', color: 'bg-emerald-500 text-white border-emerald-600 shadow-md', badge: 'Position 1 Leap!' },
      pos2: { label: 'Position 2 (Subjekt)', text: 'du', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-amber-300' },
      middle: { label: 'Mittelfeld (Objekt)', text: 'deine Hausaufgabe', color: 'bg-stone-100 dark:bg-stone-750 text-stone-800 dark:text-stone-200 border-stone-300' },
      posEnd: { label: 'Satzende (Partizip II)', text: 'gemacht?', color: 'bg-indigo-600 text-white border-indigo-700 shadow-md', badge: 'Partizip II at End' },
      fullSentence: 'Hast du deine Hausaufgabe gemacht?',
      translation: 'Did you do your homework?',
      explanation: 'In Yes/No questions, the helping verb "Hast" leaps to Position 1, and "gemacht?" waits patiently at the end.'
    }
  };

  // Partizip II Formation Matrix
  const PARTIZIP_VERBS = [
    {
      infinitive: 'spielen',
      type: 'regular',
      typeName: 'Regular (ge-...-t)',
      aux: 'hat',
      partizip: 'gespielt',
      formula: 'ge- + spiel + -t',
      example: 'Er hat mit seinem Hund gespielt.',
      trans: 'He played with his dog.',
      icon: '🐕',
      slide: 'Slide 8 & 15'
    },
    {
      infinitive: 'machen',
      type: 'regular',
      typeName: 'Regular (ge-...-t)',
      aux: 'hat',
      partizip: 'gemacht',
      formula: 'ge- + mach + -t',
      example: 'Was hast du gestern gemacht?',
      trans: 'What did you do yesterday?',
      icon: '🛠️',
      slide: 'Slide 11 & 15'
    },
    {
      infinitive: 'kochen',
      type: 'regular',
      typeName: 'Regular (ge-...-t)',
      aux: 'hat',
      partizip: 'gekocht',
      formula: 'ge- + koch + -t',
      example: 'Ich habe eine leckere Suppe gekocht.',
      trans: 'I cooked a delicious soup.',
      icon: '🍲',
      slide: 'Bonus Core'
    },
    {
      infinitive: 'essen',
      type: 'irregular',
      typeName: 'Irregular (ge-...-en)',
      aux: 'hat',
      partizip: 'gegessen',
      formula: 'ge- + gess + -en',
      example: 'Ich habe einen Salat gegessen.',
      trans: 'I ate a salad.',
      icon: '🥗',
      slide: 'Slide 6 & 15'
    },
    {
      infinitive: 'fahren',
      type: 'movement',
      typeName: 'Movement (sein + ge-...-en)',
      aux: 'ist / sind',
      partizip: 'gefahren',
      formula: 'ge- + fahr + -en (sein!)',
      example: 'Wir sind nach Paris gefahren.',
      trans: 'We travelled to Paris.',
      icon: '🚗',
      slide: 'Slide 7 & 15'
    },
    {
      infinitive: 'gehen',
      type: 'movement',
      typeName: 'Movement (sein + ge-...-en)',
      aux: 'ist / sind',
      partizip: 'gegangen',
      formula: 'ge- + gang + -en (sein!)',
      example: 'Wir sind ins Kino gegangen.',
      trans: 'We went to the cinema.',
      icon: '🍿',
      slide: 'Slide 19 & 20'
    },
    {
      infinitive: 'schlafen',
      type: 'irregular',
      typeName: 'Irregular (ge-...-en)',
      aux: 'hat',
      partizip: 'geschlafen',
      formula: 'ge- + schlaf + -en',
      example: 'Ich habe nur 3 Stunden geschlafen.',
      trans: 'I only slept 3 hours.',
      icon: '😴',
      slide: 'Slide 18'
    },
    {
      infinitive: 'studieren',
      type: 'ieren',
      typeName: '-ieren Verb (NO ge-!)',
      aux: 'hat',
      partizip: 'studiert',
      formula: 'studier + -t (NO ge-!)',
      example: 'Sie hat Philosophie studiert.',
      trans: 'She has studied philosophy.',
      icon: '📚',
      slide: 'Slide 9 & 15'
    },
    {
      infinitive: 'telefonieren',
      type: 'ieren',
      typeName: '-ieren Verb (NO ge-!)',
      aux: 'hat',
      partizip: 'telefoniert',
      formula: 'telefonier + -t (NO ge-!)',
      example: 'Ich habe mit meiner Mutter telefoniert.',
      trans: 'I talked on the phone with my mother.',
      icon: '📞',
      slide: 'Bonus -ieren'
    },
    {
      infinitive: 'anrufen',
      type: 'separable',
      typeName: 'Separable (prefix-ge-...-en)',
      aux: 'hat',
      partizip: 'angerufen',
      formula: 'an + -ge- + rufen',
      example: 'Tanja hat ihren Freund angerufen.',
      trans: 'Tanja called her boyfriend.',
      icon: '📱',
      slide: 'Slide 12 & 15'
    },
    {
      infinitive: 'einkaufen',
      type: 'separable',
      typeName: 'Separable (prefix-ge-...-t)',
      aux: 'hat',
      partizip: 'eingekauft',
      formula: 'ein + -ge- + kauf + -t',
      example: 'Er hat im Supermarkt eingekauft.',
      trans: 'He shopped in the supermarket.',
      icon: '🛒',
      slide: 'Bonus Separable'
    }
  ];

  // Slide Interactive Puzzles (Slides 16–20)
  const PUZZLES = [
    {
      title: 'Puzzle 1: Homework Question (Slide 17)',
      instruction: 'Form a correct Yes/No question in the Perfekt:',
      scrambled: ['gemacht?', 'Hast', 'du', 'deine Hausaufgabe'],
      target: ['Hast', 'du', 'deine Hausaufgabe', 'gemacht?'],
      fullGerman: 'Hast du deine Hausaufgabe gemacht?',
      english: 'Did you do your homework?',
      tip: 'Ja/Nein-Frage: Helping verb "Hast" in Position 1, Partizip II "gemacht?" at the end!'
    },
    {
      title: 'Puzzle 2: Lack of Sleep (Slide 18)',
      instruction: 'Assemble the statement: "I only slept 3 hours."',
      scrambled: ['geschlafen.', 'nur 3 Stunden', 'Ich', 'habe'],
      target: ['Ich', 'habe', 'nur 3 Stunden', 'geschlafen.'],
      fullGerman: 'Ich habe nur 3 Stunden geschlafen.',
      english: 'I only slept 3 hours.',
      tip: 'Subjekt (Ich) ➔ Hilfsverb (habe) ➔ Mittelfeld (nur 3 Stunden) ➔ Partizip II (geschlafen).'
    },
    {
      title: 'Puzzle 3: Cinema on Friday - Inversion (Slide 19 & 20)',
      instruction: 'Assemble the sentence starting with time: "Am Freitag..."',
      scrambled: ['gegangen.', 'wir', 'sind', 'Am Freitag', 'ins Kino'],
      target: ['Am Freitag', 'sind', 'wir', 'ins Kino', 'gegangen.'],
      fullGerman: 'Am Freitag sind wir ins Kino gegangen.',
      english: 'On Friday we went to the cinema.',
      tip: 'Time in Pos. 1 ("Am Freitag") ➔ Helping verb in Pos. 2 ("sind") ➔ Subject in Pos. 3 ("wir") ➔ "gegangen" at the end!'
    }
  ];

  const currentPuzzle = PUZZLES[puzzleIndex];

  const handleSelectToken = (token) => {
    if (puzzleSolved) return;
    playChime('click');
    const newSelected = [...selectedTokens, token];
    setSelectedTokens(newSelected);
    setPuzzleError(false);

    if (newSelected.length === currentPuzzle.target.length) {
      const isCorrect = newSelected.every((t, i) => t === currentPuzzle.target[i]);
      if (isCorrect) {
        playChime('success');
        setPuzzleSolved(true);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
        speakGerman(currentPuzzle.fullGerman, isSlowMode);
      } else {
        playChime('wrong');
        setPuzzleError(true);
      }
    }
  };

  const handleResetPuzzle = () => {
    playChime('click');
    setSelectedTokens([]);
    setPuzzleSolved(false);
    setPuzzleError(false);
  };

  const handleNextPuzzle = () => {
    playChime('click');
    setPuzzleIndex((prev) => (prev + 1) % PUZZLES.length);
    setSelectedTokens([]);
    setPuzzleSolved(false);
    setPuzzleError(false);
  };

  const filteredVerbs = PARTIZIP_VERBS.filter(v => {
    if (partizipCategory === 'all') return true;
    if (partizipCategory === 'regular') return v.type === 'regular';
    if (partizipCategory === 'irregular') return v.type === 'irregular';
    if (partizipCategory === 'movement') return v.type === 'movement';
    if (partizipCategory === 'ieren') return v.type === 'ieren';
    if (partizipCategory === 'separable') return v.type === 'separable';
    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-indigo-300/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <Clock className="w-4 h-4 text-indigo-200" />
            Lesson 43 Interactive Studio • das Perfekt (Teil 1)
          </div>
          <button
            onClick={() => speakGerman("Das Perfekt: Was hast du gestern gemacht? Ich habe einen Salat gegessen und wir sind nach Paris gefahren. Tanja hat ihren Freund angerufen!", isSlowMode)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-900 font-bold rounded-xl text-xs shadow-md hover:bg-indigo-50 transition-transform active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-indigo-600" />
            Play Audio Intro
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            The German Perfekt Studio ⏳
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed max-w-3xl">
            Master the spoken past tense in German! Discover the <strong>Sentence Bracket (Satzklammer)</strong>, when to use <strong>haben vs. sein</strong>, the 4 Partizip II formations (<em>gespielt, gegessen, studiert, angerufen</em>), and solve live sentence puzzles!
          </p>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-indigo-400/40">
          <button
            onClick={() => { playChime('click'); setActiveSubTab('bracket'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'bracket'
                ? 'bg-white text-indigo-900 shadow-lg scale-105'
                : 'bg-indigo-800/60 text-indigo-100 hover:bg-indigo-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. The Satzklammer Bracket Architecture 🏗️
          </button>

          <button
            onClick={() => { playChime('click'); setActiveSubTab('partizip'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'partizip'
                ? 'bg-white text-indigo-900 shadow-lg scale-105'
                : 'bg-indigo-800/60 text-indigo-100 hover:bg-indigo-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            2. Partizip II Formation Matrix 🧩
          </button>

          <button
            onClick={() => { playChime('click'); setActiveSubTab('puzzle'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'puzzle'
                ? 'bg-white text-indigo-900 shadow-lg scale-105'
                : 'bg-indigo-800/60 text-indigo-100 hover:bg-indigo-700'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            3. Sentence Unscrambler Puzzles 🧱
          </button>
        </div>
      </div>

      {/* TAB 1: THE SATZKLAMMER BRACKET ARCHITECTURE */}
      {activeSubTab === 'bracket' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Mode Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'statement', label: '1. Statement (Ich habe...)' },
              { id: 'movement', label: '2. Movement with sein (Wir sind...)' },
              { id: 'inversion', label: '3. Time Inversion (Am Freitag...)' },
              { id: 'wFrage', label: '4. W-Frage (Was hast du...)' },
              { id: 'jaNein', label: '5. Ja/Nein-Frage (Hast du...)' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => { playChime('click'); setActiveMode(mode.id); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeMode === mode.id
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Bracket Showcase Box */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-indigo-200 dark:border-indigo-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-700 pb-4">
              <div>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
                  {BRACKET_MODES[activeMode].title}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {BRACKET_MODES[activeMode].explanation}
                </p>
              </div>
              <button
                onClick={() => speakGerman(BRACKET_MODES[activeMode].fullSentence, isSlowMode)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl text-xs hover:bg-indigo-100 transition-colors"
              >
                <Volume2 className="w-4 h-4" /> Listen
              </button>
            </div>

            {/* 4-Column Sentence Bracket Train */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Position 1 */}
              <div className={`p-4 rounded-2xl border-2 space-y-2 flex flex-col justify-between ${BRACKET_MODES[activeMode].pos1.color}`}>
                <div className="text-[10px] font-black uppercase tracking-wider opacity-80">
                  {BRACKET_MODES[activeMode].pos1.label}
                </div>
                <div className="text-xl font-black">{BRACKET_MODES[activeMode].pos1.text}</div>
                <div className="text-[10px] font-bold opacity-75">Anchor 1</div>
              </div>

              {/* Position 2 (Helping Verb) */}
              <div className={`p-4 rounded-2xl border-2 space-y-2 flex flex-col justify-between ${BRACKET_MODES[activeMode].pos2.color}`}>
                <div className="text-[10px] font-black uppercase tracking-wider opacity-90">
                  {BRACKET_MODES[activeMode].pos2.label}
                </div>
                <div className="text-2xl font-black">{BRACKET_MODES[activeMode].pos2.text}</div>
                <div className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full inline-block">
                  {BRACKET_MODES[activeMode].pos2.badge}
                </div>
              </div>

              {/* Middle Field */}
              <div className={`p-4 rounded-2xl border-2 space-y-2 flex flex-col justify-between ${BRACKET_MODES[activeMode].middle.color}`}>
                <div className="text-[10px] font-black uppercase tracking-wider opacity-80">
                  {BRACKET_MODES[activeMode].middle.label}
                </div>
                <div className="text-base sm:text-lg font-bold">{BRACKET_MODES[activeMode].middle.text}</div>
                <div className="text-[10px] font-bold text-stone-400">Mittelfeld</div>
              </div>

              {/* Satzende (Partizip II) */}
              <div className={`p-4 rounded-2xl border-2 space-y-2 flex flex-col justify-between ${BRACKET_MODES[activeMode].posEnd.color}`}>
                <div className="text-[10px] font-black uppercase tracking-wider opacity-90">
                  {BRACKET_MODES[activeMode].posEnd.label}
                </div>
                <div className="text-2xl font-black">{BRACKET_MODES[activeMode].posEnd.text}</div>
                <div className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full inline-block">
                  {BRACKET_MODES[activeMode].posEnd.badge}
                </div>
              </div>
            </div>

            {/* Translation & Takeaway */}
            <div className="p-4 bg-stone-50 dark:bg-stone-750 rounded-2xl border border-stone-200 dark:border-stone-600 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-stone-500 font-bold block">Complete Sentence:</span>
                <span className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100">
                  "{BRACKET_MODES[activeMode].fullSentence}"
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 block font-semibold">
                  ({BRACKET_MODES[activeMode].translation})
                </span>
              </div>
              <button
                onClick={() => speakGerman(BRACKET_MODES[activeMode].fullSentence, isSlowMode)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                Play Sentence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PARTIZIP II FORMATION MATRIX */}
      {activeSubTab === 'partizip' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Category Filter */}
          <div className="bg-white dark:bg-stone-800 p-4 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-md flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-stone-500">Filter Partizip II Patterns:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Verbs (11)' },
                { id: 'regular', label: 'Regular: ge-...-t (3)' },
                { id: 'irregular', label: 'Irregular: ge-...-en (2)' },
                { id: 'movement', label: 'Movement: sein (2)' },
                { id: 'ieren', label: '-ieren: NO ge- (2)' },
                { id: 'separable', label: 'Separable: an-ge-... (2)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { playChime('click'); setPartizipCategory(cat.id); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    partizipCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verb Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVerbs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {item.typeName}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500 font-bold">Infinitive: <span className="text-stone-800 dark:text-stone-200">{item.infinitive}</span></div>
                    <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                      {item.aux} {item.partizip}
                    </div>
                    <div className="text-xs font-mono bg-stone-100 dark:bg-stone-750 px-2 py-0.5 rounded text-stone-600 dark:text-stone-300 inline-block mt-1">
                      Formula: {item.formula}
                    </div>
                  </div>

                  <div className="p-2.5 bg-stone-50 dark:bg-stone-750 rounded-xl space-y-0.5 text-xs">
                    <div className="font-bold text-stone-800 dark:text-stone-200">"{item.example}"</div>
                    <div className="text-stone-500 italic font-medium">{item.trans}</div>
                  </div>
                </div>

                <button
                  onClick={() => speakGerman(item.example, isSlowMode)}
                  className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen Sentence
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SENTENCE UNSCRAMBLER PUZZLES */}
      {activeSubTab === 'puzzle' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Puzzle Header */}
          <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Chalkboard Drill • {puzzleIndex + 1} of {PUZZLES.length}
                </span>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
                  {currentPuzzle.title}
                </h3>
              </div>
              <button
                onClick={handleResetPuzzle}
                className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
              {currentPuzzle.instruction}
            </p>

            {/* Assembled Sentence Drop Zone */}
            <div className="min-h-[70px] p-4 bg-stone-100 dark:bg-stone-900/60 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-wrap items-center gap-2">
              {selectedTokens.length === 0 ? (
                <span className="text-xs text-stone-400 italic">Tap the word blocks below in the correct order to build the sentence...</span>
              ) : (
                selectedTokens.map((tok, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 bg-indigo-600 text-white font-black text-sm sm:text-base rounded-xl shadow-md animate-in zoom-in-95 duration-150"
                  >
                    {tok}
                  </span>
                ))
              )}
            </div>

            {/* Error or Success Message */}
            {puzzleError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 font-bold flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0" />
                Not quite right. Remember the sentence bracket: Helping verb in Position 2 (or Pos. 1 in questions) and Partizip II at the end!
              </div>
            )}

            {puzzleSolved && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Perfekt! Sentence Solved!
                </div>
                <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                  "{currentPuzzle.fullGerman}" = {currentPuzzle.english}
                </p>
                <div className="text-[11px] text-stone-600 dark:text-stone-400">
                  💡 {currentPuzzle.tip}
                </div>
              </div>
            )}

            {/* Available Word Blocks to Tap */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-500">Available Word Blocks:</span>
              <div className="flex flex-wrap gap-2.5">
                {currentPuzzle.scrambled.map((word, idx) => {
                  const isUsed = selectedTokens.includes(word);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectToken(word)}
                      disabled={isUsed || puzzleSolved}
                      className={`px-4 py-3 rounded-2xl font-black text-sm sm:text-base transition-all ${
                        isUsed
                          ? 'bg-stone-200 dark:bg-stone-700 text-stone-400 opacity-40 cursor-not-allowed scale-95'
                          : 'bg-white dark:bg-stone-750 text-indigo-900 dark:text-indigo-200 border-2 border-indigo-200 dark:border-indigo-700 shadow-md hover:scale-105 hover:bg-indigo-50 active:scale-95'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Puzzle Button */}
            {puzzleSolved && (
              <button
                onClick={handleNextPuzzle}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 text-sm sm:text-base transition-all hover:scale-[1.01]"
              >
                <span>Next Puzzle Drill</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
