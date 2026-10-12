import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_CHARAKTER_OPPOSITES_PAIRS, A2_ADVERBIEN_LIST } from '../data/germanLessonsA2';

export default function A2Lektion2TraitsStudio({ isSlowMode = false }) {
  const [selectedPerson, setSelectedPerson] = useState('tanja');
  const [customSubject, setCustomSubject] = useState('Erick');
  const [customAdverb1, setCustomAdverb1] = useState('etwas');
  const [customTrait1, setCustomTrait1] = useState('schüchtern');
  const [customConnector, setCustomConnector] = useState('aber');
  const [customAdverb2, setCustomAdverb2] = useState('immer');
  const [customTrait2, setCustomTrait2] = useState('zuverlässig');
  const [activeDrawer, setActiveDrawer] = useState('opposites'); // 'opposites', 'adverbs', 'formulas'
  const [testedOpposite, setTestedOpposite] = useState(null);

  const personaPresets = {
    sabina: {
      name: "Sabina",
      avatar: "👩‍🦰",
      germanText: "Sabina ist sehr schön und immer freundlich.",
      englishText: "Sabina is very beautiful and always friendly.",
      breakdown: "sehr + schön (Slide 42) & immer + freundlich",
      traits: ["sehr schön", "immer freundlich", "höflich"]
    },
    alex: {
      name: "Alex",
      avatar: "🎧",
      germanText: "Alex ist ganz anders, aber super kreativ.",
      englishText: "Alex is completely different, but super creative.",
      breakdown: "ganz + anders (Slide 43) & kreativ",
      traits: ["ganz anders", "kreativ", "humorvoll"]
    },
    mona: {
      name: "Mona",
      avatar: "👗",
      germanText: "Mona ist etwas schüchtern, aber sehr begabt.",
      englishText: "Mona is somewhat shy, but very talented.",
      breakdown: "etwas + schüchtern (Slide 44) & sehr + begabt",
      traits: ["etwas schüchtern", "sehr begabt", "lieb"]
    },
    caroline: {
      name: "Caroline",
      avatar: "🩰",
      germanText: "Caroline ist ziemlich ruhig und modebewusst.",
      englishText: "Caroline is quite calm and fashion-conscious.",
      breakdown: "ziemlich + ruhig (Slide 45) & modebewusst",
      traits: ["ziemlich ruhig", "modebewusst", "ehrlich"]
    },
    boris: {
      name: "Boris",
      avatar: "🕺",
      germanText: "Boris ist immer hilfsbereit und absolut zuverlässig.",
      englishText: "Boris is always helpful and absolutely reliable.",
      breakdown: "immer + hilfsbereit (Slide 46) & zuverlässig",
      traits: ["immer hilfsbereit", "zuverlässig", "mutig"]
    },
    tanja: {
      name: "Tanja",
      avatar: "👢",
      germanText: "Tanja ist etwas arrogant, aber immer zuverlässig.",
      englishText: "Tanja is somewhat arrogant, but always reliable.",
      breakdown: "The Master Sentence from Slide 47!",
      traits: ["etwas arrogant", "immer zuverlässig", "fleißig"]
    }
  };

  const currentPersona = personaPresets[selectedPerson];

  const constructedGerman = `${customSubject} ist ${customAdverb1} ${customTrait1}${customConnector ? `, ${customConnector} ${customAdverb2} ${customTrait2}` : ''}.`;

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-850 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-indigo-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-400/30">
              <span>🎭</span>
              <span>A2 Interactive Personality Lab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
              Charaktereigenschaften & Gegenteile Studio
            </h2>
            <p className="text-sm sm:text-base text-indigo-100/90 max-w-2xl leading-relaxed">
              Describe friends, colleagues, and family with high nuance! Master the 11 Gegenteile pairs,
              the 3 negative prefixes (<code className="text-amber-300 font-bold">un-</code>, <code className="text-amber-300 font-bold">-los</code>, and unique word roots),
              and the 5 intensity adverbs (<code className="text-amber-300 font-bold">sehr, ganz, immer, ziemlich, etwas</code>).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => handleSpeak("Charaktereigenschaften und Gegenteile. Freundlich und unfreundlich. Tanja ist etwas arrogant, aber immer zuverlässig.")}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm"
            >
              <span>🔊</span>
              <span>Listen to Studio Intro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Personas Carousel (From Slides 42 - 47) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
              <span>👥</span>
              <span>The 6 Presentation Characters (Slides 42–47)</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Click any character to load their authentic textbook sentence & pronunciation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {Object.entries(personaPresets).map(([key, persona]) => {
            const isSelected = selectedPerson === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedPerson(key);
                  handleSpeak(persona.germanText);
                }}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 shadow-md scale-102 ring-2 ring-indigo-400'
                    : 'border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-850 hover:border-indigo-300 dark:hover:border-slate-600'
                }`}
              >
                <span className="text-3xl">{persona.avatar}</span>
                <span className="font-black text-sm text-stone-900 dark:text-white">{persona.name}</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                  {key === 'tanja' ? 'Master Slide' : 'Slide ' + (key === 'sabina' ? '42' : key === 'alex' ? '43' : key === 'mona' ? '44' : key === 'caroline' ? '45' : '46')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Spotlight Card */}
        {currentPersona && (
          <div className="bg-gradient-to-r from-indigo-50 to-amber-50 dark:from-slate-850 dark:to-slate-800 p-5 rounded-2xl border-2 border-indigo-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-700 shadow flex items-center justify-center text-4xl shrink-0">
                {currentPersona.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-lg text-stone-900 dark:text-white">
                    {currentPersona.name}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 font-bold">
                    {currentPersona.breakdown}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-black text-indigo-950 dark:text-amber-300 mt-1">
                  "{currentPersona.germanText}"
                </div>
                <div className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 italic">
                  "{currentPersona.englishText}"
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSpeak(currentPersona.germanText)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all hover:scale-105 shrink-0"
            >
              <span>🔊</span>
              <span>Pronounce Sentence</span>
            </button>
          </div>
        )}
      </div>

      {/* Sentence Builder Sandbox */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-6">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>🛠️</span>
            <span>Nuance Sentence Builder (Describe Anyone!)</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Combine names, adverbs, traits, and contrasting conjunctions using the German Slide 47 blueprint
          </p>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Subject */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              1. Person / Name
            </label>
            <input
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              placeholder="e.g. Mein Chef, Sarah"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Adverb 1 */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              2. Adverb 1
            </label>
            <select
              value={customAdverb1}
              onChange={(e) => setCustomAdverb1(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="sehr">sehr (very)</option>
              <option value="ganz">ganz (completely)</option>
              <option value="immer">immer (always)</option>
              <option value="ziemlich">ziemlich (quite)</option>
              <option value="etwas">etwas (somewhat)</option>
              <option value="wirklich">wirklich (really)</option>
            </select>
          </div>

          {/* Trait 1 */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              3. Trait 1
            </label>
            <select
              value={customTrait1}
              onChange={(e) => setCustomTrait1(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="schüchtern">schüchtern (shy)</option>
              <option value="selbstbewusst">selbstbewusst (confident)</option>
              <option value="ruhig">ruhig (calm)</option>
              <option value="unruhig">unruhig (restless)</option>
              <option value="arrogant">arrogant (arrogant)</option>
              <option value="freundlich">freundlich (friendly)</option>
              <option value="höflich">höflich (polite)</option>
              <option value="kreativ">kreativ (creative)</option>
              <option value="begabt">begabt (talented)</option>
              <option value="mutig">mutig (courageous)</option>
              <option value="fleißig">fleißig (hardworking)</option>
              <option value="faul">faul (lazy)</option>
            </select>
          </div>

          {/* Connector */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              4. Connector
            </label>
            <select
              value={customConnector}
              onChange={(e) => setCustomConnector(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="aber">aber (but - contrast)</option>
              <option value="und">und (and)</option>
              <option value="">(None - single trait)</option>
            </select>
          </div>

          {/* Adverb 2 */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              5. Adverb 2
            </label>
            <select
              value={customAdverb2}
              onChange={(e) => setCustomAdverb2(e.target.value)}
              disabled={!customConnector}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 disabled:opacity-40"
            >
              <option value="immer">immer (always)</option>
              <option value="sehr">sehr (very)</option>
              <option value="absolut">absolut (absolutely)</option>
              <option value="ziemlich">ziemlich (quite)</option>
              <option value="oft">oft (often)</option>
            </select>
          </div>

          {/* Trait 2 */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              6. Trait 2
            </label>
            <select
              value={customTrait2}
              onChange={(e) => setCustomTrait2(e.target.value)}
              disabled={!customConnector}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 disabled:opacity-40"
            >
              <option value="zuverlässig">zuverlässig (reliable)</option>
              <option value="hilfsbereit">hilfsbereit (helpful)</option>
              <option value="ehrlich">ehrlich (honest)</option>
              <option value="humorvoll">humorvoll (humorous)</option>
              <option value="lieb">lieb (kind)</option>
              <option value="modebewusst">modebewusst (stylish)</option>
              <option value="fleißig">fleißig (hardworking)</option>
            </select>
          </div>
        </div>

        {/* Live Audio Preview Card */}
        <div className="p-5 rounded-2xl bg-indigo-950 text-white border-2 border-indigo-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">
              Generated German Audio Sentence:
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-300">
              "{constructedGerman}"
            </div>
          </div>
          <button
            onClick={() => handleSpeak(constructedGerman)}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>🔊</span>
            <span>Speak Sentence</span>
          </button>
        </div>
      </div>

      {/* Reference Cheatsheet Drawers */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>📚</span>
            <span>Interactive Grammar & Vocabulary Drawers</span>
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveDrawer('opposites')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                activeDrawer === 'opposites'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              🔄 11 Gegenteile Pairs
            </button>
            <button
              onClick={() => setActiveDrawer('adverbs')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                activeDrawer === 'adverbs'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              🎚️ 5 Adverbien Modifiers
            </button>
          </div>
        </div>

        {/* Drawer 1: Gegenteile Opposites */}
        {activeDrawer === 'opposites' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 dark:bg-slate-850 rounded-xl border border-amber-200 dark:border-slate-700 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <span>💡</span>
              <span>
                <strong>Kenyan Memory Tip:</strong> Most German traits take <code className="font-black bg-amber-200 dark:bg-amber-900/60 px-1 rounded">un-</code> (like 'unfriendly'). But watch out for the 3 rebels from slides: <code className="font-bold">fleißig ↔ faul</code>, <code className="font-bold">mutig ↔ ängstlich</code>, and <code className="font-bold">schüchtern ↔ selbstbewusst</code>!
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {A2_CHARAKTER_OPPOSITES_PAIRS.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-50 dark:bg-slate-850 rounded-2xl border border-stone-200 dark:border-slate-700 flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Pair #{idx + 1} • {pair.prefixRule}
                    </span>
                    <button
                      onClick={() => handleSpeak(`${pair.positive} und ${pair.negative}`)}
                      className="text-xs p-1 text-stone-400 hover:text-indigo-600 dark:hover:text-amber-400 cursor-pointer"
                      title="Pronounce Pair"
                    >
                      🔊
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                      <div className="font-black text-emerald-900 dark:text-emerald-300 text-sm">
                        {pair.positive}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-slate-400 italic">
                        {pair.positiveEn}
                      </div>
                    </div>
                    <div className="p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl">
                      <div className="font-black text-rose-900 dark:text-rose-300 text-sm">
                        {pair.negative}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-slate-400 italic">
                        {pair.negativeEn}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drawer 2: Adverbs Modifiers */}
        {activeDrawer === 'adverbs' && (
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 dark:bg-slate-850 rounded-xl border border-indigo-200 dark:border-slate-700 text-xs text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <span>🎚️</span>
              <span>
                <strong>Slide 48 Intensity Ladder:</strong> Place these words directly in front of your adjective to control how intense you want to sound!
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {A2_ADVERBIEN_LIST.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-stone-50 dark:bg-slate-850 rounded-2xl border border-stone-200 dark:border-slate-700 flex flex-col justify-between hover:border-amber-400 transition-all text-center"
                >
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {item.level}
                    </span>
                    <div className="text-xl font-black text-stone-900 dark:text-white mt-1">
                      {item.adverb}
                    </div>
                    <div className="text-xs text-stone-500 dark:text-slate-400 italic mb-3">
                      "{item.english}"
                    </div>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700 text-[11px] font-bold text-stone-700 dark:text-slate-300">
                    <div className="text-indigo-600 dark:text-indigo-300 font-black mb-1">
                      {item.example}
                    </div>
                    <button
                      onClick={() => handleSpeak(item.example)}
                      className="px-2 py-1 bg-stone-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-[10px] font-bold rounded-lg cursor-pointer transition-all inline-flex items-center gap-1"
                    >
                      <span>🔊</span>
                      <span>Play</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
