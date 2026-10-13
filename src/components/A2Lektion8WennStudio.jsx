import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_WENN_FALLS_COMPARISONS } from '../data/germanLessonsA2';

export default function A2Lektion8WennStudio({ isSlowMode }) {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [activeOrder, setActiveOrder] = useState('B'); // 'A' (HS first) or 'B' (NS first - collision)
  const [conjunctionMode, setConjunctionMode] = useState('wenn'); // 'wenn' or 'falls'
  const [customConditionIndex, setCustomConditionIndex] = useState(0);
  const [customActionIndex, setCustomActionIndex] = useState(0);

  const presets = [
    {
      id: "rain",
      title: "Regen & Zu Hause bleiben",
      emoji: "🌧️",
      conditionSubj: "es",
      conditionRest: "",
      conditionVerb: "regnet",
      actionSubj: "ich",
      actionVerb: "bleibe",
      actionRest: "zu Hause",
      englishCond: "it rains",
      englishAct: "I stay at home",
      note: "Worksheet & Slide 15-16 classic: notice how 'regnet' and 'bleibe' collide in Order B!"
    },
    {
      id: "weather",
      title: "Wetter & Spielen gehen",
      emoji: "☀️",
      conditionSubj: "das Wetter",
      conditionRest: "schön",
      conditionVerb: "ist",
      actionSubj: "ich",
      actionVerb: "gehe",
      actionRest: "spielen",
      englishCond: "the weather is nice",
      englishAct: "I go to play",
      note: "Slide 10-12 classic: 'wenn das Wetter schön ist, gehe ich spielen!'"
    },
    {
      id: "hunger",
      title: "Hunger & Pizza essen",
      emoji: "🍕",
      conditionSubj: "ich",
      conditionRest: "Hunger",
      conditionVerb: "habe",
      actionSubj: "ich",
      actionVerb: "esse",
      actionRest: "eine Pizza",
      englishCond: "I am hungry",
      englishAct: "I eat a pizza",
      note: "Worksheet Question 4: 'Wenn ich Hunger habe, esse ich eine Pizza.'"
    },
    {
      id: "sick",
      title: "Krank & Im Bett bleiben",
      emoji: "🛏️",
      conditionSubj: "er",
      conditionRest: "krank",
      conditionVerb: "ist",
      actionSubj: "er",
      actionVerb: "bleibt",
      actionRest: "im Bett",
      englishCond: "he is sick",
      englishAct: "he stays in bed",
      note: "Worksheet Question 3 & Slide 27: 'Wenn er krank ist, bleibt er im Bett.'"
    },
    {
      id: "piano",
      title: "Regen & Klavier spielen",
      emoji: "🎹",
      conditionSubj: "es",
      conditionRest: "",
      conditionVerb: "regnet",
      actionSubj: "ich",
      actionVerb: "spiele",
      actionRest: "Klavier",
      englishCond: "it rains",
      englishAct: "I play piano",
      note: "Worksheet Question 1: 'Wenn es regnet, spiele ich Klavier.'"
    },
    {
      id: "german",
      title: "Deutsch & Konzentriert sein",
      emoji: "🧠",
      conditionSubj: "ich",
      conditionRest: "Deutsch",
      conditionVerb: "lerne",
      actionSubj: "ich",
      actionVerb: "bin",
      actionRest: "sehr konzentriert",
      englishCond: "I learn German",
      englishAct: "I am very focused",
      note: "Worksheet Question 5: 'Wenn ich Deutsch lerne, bin ich sehr konzentriert.'"
    }
  ];

  const currentPreset = presets[selectedPresetIndex];

  // Helper to trigger audio
  const playAudio = (text) => {
    speakGerman(text, isSlowMode);
  };

  // Generate German sentence for current preset
  const conj = conjunctionMode === 'wenn' ? 'Wenn' : 'Falls';
  const conjLower = conjunctionMode === 'wenn' ? 'wenn' : 'falls';

  // Order A: Hauptsatz, [conj] Nebensatz
  // "Ich bleibe zu Hause, wenn es regnet."
  const sentenceOrderA = `${currentPreset.actionSubj.charAt(0).toUpperCase() + currentPreset.actionSubj.slice(1)} ${currentPreset.actionVerb} ${currentPreset.actionRest}, ${conjLower} ${currentPreset.conditionSubj} ${currentPreset.conditionRest ? currentPreset.conditionRest + ' ' : ''}${currentPreset.conditionVerb}.`;

  // Order B: [Conj] Nebensatz, Hauptsatz
  // "Wenn es regnet, bleibe ich zu Hause."
  const sentenceOrderB = `${conj} ${currentPreset.conditionSubj} ${currentPreset.conditionRest ? currentPreset.conditionRest + ' ' : ''}${currentPreset.conditionVerb}, ${currentPreset.actionVerb} ${currentPreset.actionSubj} ${currentPreset.actionRest}.`;

  const activeSentence = activeOrder === 'A' ? sentenceOrderA : sentenceOrderB;

  // Custom clause builder data
  const customConditions = [
    { text: "das Wetter schön ist", label: "☀️ das Wetter schön ist (weather nice)" },
    { text: "ich Urlaub habe", label: "🏖️ ich Urlaub habe (on vacation)" },
    { text: "wir Feierabend haben", label: "⏰ wir Feierabend haben (work finished)" },
    { text: "ich Geld spare", label: "💰 ich Geld spare (save money)" },
    { text: "ich Musik höre", label: "🎧 ich Musik höre (listen to music)" }
  ];

  const customActions = [
    { textA: "gehen wir an den Strand", textB: "gehe ich an den Strand", label: "🏖️ gehe / gehen an den Strand" },
    { textA: "schlafe ich bis 10 Uhr", textB: "schlafe ich bis 10 Uhr", label: "😴 schlafe bis 10 Uhr" },
    { textA: "trinken wir einen Kaffee", textB: "trinken wir einen Kaffee", label: "☕ trinken wir Kaffee" },
    { textA: "kaufe ich mir ein Buch", textB: "kaufe ich ein Buch", label: "📖 kaufe ein Buch" },
    { textA: "bin ich gut gelaunt", textB: "bin ich gut gelaunt", label: "😄 bin ich gut gelaunt" }
  ];

  const selectedCustomCond = customConditions[customConditionIndex];
  const selectedCustomAct = customActions[customActionIndex];
  const customSentenceA = `Ich ${selectedCustomAct.textB}, wenn ${selectedCustomCond.text}.`;
  const customSentenceB = `Wenn ${selectedCustomCond.text}, ${selectedCustomAct.textB}.`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-850 to-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-teal-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-400/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-teal-400/30">
            <span>⚡ Level A2 Lektion 8</span>
            <span>•</span>
            <span>Konditionalsätze Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Nebensätze mit „wenn“ & „falls“
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-2xl leading-relaxed">
            In German, conditional sentences express that an action (<strong>Handlung</strong>) only happens under a specific condition (<strong>Bedingung</strong>).
            Discover the two word-order rules, the famous <strong>Verb-Verb collision at the comma</strong>, and the certainty gauge between <em>wenn</em> (100% sure) and <em>falls</em> (in case)!
          </p>
        </div>
      </div>

      {/* Interactive Sentence Flip Machine (Order A vs Order B) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-teal-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-850 dark:text-white flex items-center gap-2">
              <span>🔄</span>
              <span>Die 2 Satzstellungen (The 2 Sentence Orders)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
              Flip between Order A (Main clause first) and Order B (Condition first with Verb-Verb Crash!).
            </p>
          </div>

          {/* Order Selector Pill */}
          <div className="inline-flex bg-slate-100 dark:bg-slate-700 p-1 rounded-2xl border border-slate-300 dark:border-slate-600">
            <button
              onClick={() => setActiveOrder('A')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeOrder === 'A'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-teal-600'
              }`}
            >
              Order A: Hauptsatz zuerst
            </button>
            <button
              onClick={() => setActiveOrder('B')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeOrder === 'B'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-amber-600'
              }`}
            >
              <span>Order B: Verb-Verb Crash!</span>
              <span className="text-[10px] bg-amber-400/30 text-amber-100 px-1.5 py-0.5 rounded-full">Slide 12</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {presets.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedPresetIndex === idx
                  ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 border-2 border-teal-500 shadow-xs'
                  : 'bg-stone-50 dark:bg-slate-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-650'
              }`}
            >
              <span>{preset.emoji}</span>
              <span>{preset.title}</span>
            </button>
          ))}
        </div>

        {/* Big Live Sentence Chalkboard */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-teal-500/40 shadow-inner mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <span>{activeOrder === 'A' ? '📐 Normal Subclause Architecture' : '💥 Head-on Verb-Verb Collision Rule'}</span>
            </span>
            <button
              onClick={() => playAudio(activeSentence)}
              className="px-3.5 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-all hover:scale-105"
            >
              <span>🔊 Listen</span>
            </button>
          </div>

          {/* Colored Anatomy Display */}
          {activeOrder === 'A' ? (
            /* Order A: Hauptsatz first, then Nebensatz */
            <div className="space-y-4">
              <div className="text-xl sm:text-2xl font-black tracking-wide leading-relaxed flex flex-wrap items-center gap-2">
                {/* Hauptsatz */}
                <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30">
                  {currentPreset.actionSubj.charAt(0).toUpperCase() + currentPreset.actionSubj.slice(1)}
                </span>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-400/30 ring-2 ring-amber-400/40">
                  {currentPreset.actionVerb}
                </span>
                <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30">
                  {currentPreset.actionRest}
                </span>

                {/* Comma */}
                <span className="text-amber-400 text-3xl font-black">,</span>

                {/* Nebensatz */}
                <span className="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-400/30">
                  {conjLower}
                </span>
                <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-400/30">
                  {currentPreset.conditionSubj}
                </span>
                {currentPreset.conditionRest && (
                  <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-400/30">
                    {currentPreset.conditionRest}
                  </span>
                )}
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-400/30 ring-2 ring-amber-400/40">
                  {currentPreset.conditionVerb}.
                </span>
              </div>

              {/* Anatomy legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                  <span>Hauptsatz (Pos 2 Verb)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-teal-400"></span>
                  <span>Konjunktion (wenn/falls)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span>Verb am Ende (kicked!)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                  <span>Bedingung Subjekt</span>
                </div>
              </div>
            </div>
          ) : (
            /* Order B: Nebensatz first with Verb-Verb collision */
            <div className="space-y-4">
              <div className="text-xl sm:text-2xl font-black tracking-wide leading-relaxed flex flex-wrap items-center gap-2">
                {/* Nebensatz */}
                <span className="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-400/30">
                  {conj}
                </span>
                <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-400/30">
                  {currentPreset.conditionSubj}
                </span>
                {currentPreset.conditionRest && (
                  <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-400/30">
                    {currentPreset.conditionRest}
                  </span>
                )}

                {/* Verb 1 ending the subclause */}
                <span className="px-3 py-1 bg-rose-500/30 text-rose-300 rounded-xl border-2 border-rose-400 font-extrabold animate-pulse">
                  {currentPreset.conditionVerb}
                </span>

                {/* Comma bridge */}
                <span className="text-amber-400 text-3xl font-black">,</span>

                {/* Verb 2 immediately kicking off the main clause */}
                <span className="px-3 py-1 bg-rose-500/30 text-rose-300 rounded-xl border-2 border-rose-400 font-extrabold animate-pulse">
                  {currentPreset.actionVerb}
                </span>

                {/* Rest of Hauptsatz */}
                <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30">
                  {currentPreset.actionSubj}
                </span>
                <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30">
                  {currentPreset.actionRest}.
                </span>
              </div>

              {/* Collision Alert Banner */}
              <div className="p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">💥</span>
                <div className="text-xs text-rose-200">
                  <strong className="text-rose-100 font-black">The Slide 12 Verb-Verb Collision Rule:</strong>
                  {" "}The subclause finishes with its verb (<em>{currentPreset.conditionVerb}</em>), and right across the comma, the main clause opens with its verb (<em>{currentPreset.actionVerb}</em>). Two verbs back-to-back!
                </div>
              </div>
            </div>
          )}

          {/* English translation & teacher note */}
          <div className="mt-4 pt-4 border-t border-slate-800 text-sm text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-stone-400">English: </span>
              <span className="text-white font-medium italic">
                {activeOrder === 'A'
                  ? `${currentPreset.englishAct.charAt(0).toUpperCase() + currentPreset.englishAct.slice(1)} when ${currentPreset.englishCond}.`
                  : `When ${currentPreset.englishCond}, ${currentPreset.englishAct}.`}
              </span>
            </div>
            <div className="text-xs text-teal-300 font-mono">
              💡 {currentPreset.note}
            </div>
          </div>
        </div>

        {/* Kenyan Layman Analogy Card */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800/40 rounded-2xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-3">
          <span className="text-2xl">🇰🇪</span>
          <div>
            <strong className="font-black text-amber-950 dark:text-amber-100">Kenyan Layman Analogy:</strong>
            <p className="mt-0.5">
              Think of order B like driving into a roundabout in Nairobi: The moment the incoming matatu signals out (<em>verb finishes subclause</em>), the next one immediately enters (<em>verb starts main clause</em>)! You NEVER put the subject between the comma and the verb in Order B!
            </p>
          </div>
        </div>
      </div>

      {/* Wenn vs Falls Certainty Gauge (Slide 19-22) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-blue-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-xs font-black uppercase mb-1">
              <span>Slide 19-22 Master Breakdown</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-850 dark:text-white flex items-center gap-2">
              <span>⚖️</span>
              <span>Der Unterschied: „wenn“ vs. „falls“</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
              Both use the identical subclause grammar, but their level of certainty in the speaker's mind is completely different!
            </p>
          </div>

          {/* Conjunction toggle button */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-600">
            <button
              onClick={() => setConjunctionMode('wenn')}
              className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                conjunctionMode === 'wenn'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              „wenn“ (When / If)
            </button>
            <button
              onClick={() => setConjunctionMode('falls')}
              className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                conjunctionMode === 'falls'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              „falls“ (In case)
            </button>
          </div>
        </div>

        {/* 3 Comparison Cards from Slide Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {A2_WENN_FALLS_COMPARISONS.map((comp) => (
            <div
              key={comp.id}
              className="p-5 rounded-2xl border-2 border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-850 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  {comp.pairTitle}
                </div>

                {/* Wenn section */}
                <div className="mb-4 p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800/40">
                  <div className="flex items-center justify-between text-xs font-bold text-teal-800 dark:text-teal-300 mb-1">
                    <span>🟢 WENN (Sicher)</span>
                    <button
                      onClick={() => playAudio(comp.wennSentence)}
                      className="cursor-pointer hover:scale-110 transition-transform"
                    >
                      🔊
                    </button>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    {comp.wennSentence}
                  </div>
                  <div className="text-[11px] text-teal-700 dark:text-teal-400 italic">
                    "{comp.wennMeaning}"
                  </div>
                  <div className="mt-1 text-[10px] font-black text-teal-900 dark:text-teal-200">
                    Gauge: {comp.wennCertainty}
                  </div>
                </div>

                {/* Falls section */}
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/40">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-800 dark:text-indigo-300 mb-1">
                    <span>🟣 FALLS (Eventuell)</span>
                    <button
                      onClick={() => playAudio(comp.fallsSentence)}
                      className="cursor-pointer hover:scale-110 transition-transform"
                    >
                      🔊
                    </button>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    {comp.fallsSentence}
                  </div>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-400 italic">
                    "{comp.fallsMeaning}"
                  </div>
                  <div className="mt-1 text-[10px] font-black text-indigo-900 dark:text-indigo-200">
                    Gauge: {comp.fallsCertainty}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-200 dark:border-slate-700 text-[11px] text-stone-500 dark:text-slate-400">
                📌 {comp.ruleNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Satz-Baukasten (Interactive Clause Builder) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-purple-200 dark:border-slate-700">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded-full text-xs font-black uppercase mb-1">
            <span>Satz-Baukasten (Lego Clause Builder)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-850 dark:text-white flex items-center gap-2">
            <span>🧩</span>
            <span>Build Your Own Conditional Sentences</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Pick a condition and an action to instantly see both sentence orders with speech preview!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Step 1: Pick Condition */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
              1. Wähle eine Bedingung (Pick Condition):
            </label>
            <div className="space-y-2">
              {customConditions.map((cond, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomConditionIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    customConditionIndex === idx
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-stone-50 dark:bg-slate-700 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-650'
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Pick Action */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-2">
              2. Wähle eine Handlung (Pick Action):
            </label>
            <div className="space-y-2">
              {customActions.map((act, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomActionIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    customActionIndex === idx
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-stone-50 dark:bg-slate-700 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-650'
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Built Output */}
        <div className="p-5 bg-slate-900 rounded-2xl text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400">
              Order B Output (Nebensatz First):
            </span>
            <button
              onClick={() => playAudio(customSentenceB)}
              className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-slate-950 rounded-xl text-xs font-black cursor-pointer transition-all hover:scale-105 flex items-center gap-1"
            >
              <span>🔊 Listen</span>
            </button>
          </div>
          <div className="text-base sm:text-lg font-black text-white bg-slate-800 p-3.5 rounded-xl border border-purple-500/30">
            {customSentenceB}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs font-black uppercase tracking-wider text-teal-400">
              Order A Output (Hauptsatz First):
            </span>
            <button
              onClick={() => playAudio(customSentenceA)}
              className="px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-black cursor-pointer transition-all hover:scale-105 flex items-center gap-1"
            >
              <span>🔊 Listen</span>
            </button>
          </div>
          <div className="text-base sm:text-lg font-black text-white bg-slate-800 p-3.5 rounded-xl border border-teal-500/30">
            {customSentenceA}
          </div>
        </div>
      </div>
    </div>
  );
}
