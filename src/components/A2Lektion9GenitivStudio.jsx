import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_GENITIV_MASTER_MATRIX } from '../data/germanLessonsA2';

export default function A2Lektion9GenitivStudio({ isSlowMode }) {
  const [selectedGender, setSelectedGender] = useState('maskulin'); // 'maskulin', 'feminin', 'neutral', 'plural'
  const [selectedArticleType, setSelectedArticleType] = useState('definite'); // 'definite', 'indefinite', 'possessive'
  const [selectedOwnerPronoun, setSelectedOwnerPronoun] = useState('mein'); // 'mein', 'dein', 'sein', 'ihr', 'unser', 'euer'
  const [suffixTesterWord, setSuffixTesterWord] = useState('Mann');

  // Play audio helper
  const playAudio = (text) => {
    speakGerman(text, isSlowMode);
  };

  // Preset scenarios from slides & worksheet
  const possessionPresets = [
    {
      id: "mann-auto",
      noun1: "Das Auto",
      ownerGender: "maskulin",
      ownerBase: "Mann",
      definiteGen: "des Mannes",
      indefiniteGen: "eines Mannes",
      possessiveGen: "meines Mannes",
      spokenDativ: "von dem Mann",
      english: "The man's car / The car of the man",
      note: "1-syllable noun adds -es: der Mann ➔ des Mannes (Slide 16)"
    },
    {
      id: "frau-kleid",
      noun1: "Das Kleid",
      ownerGender: "feminin",
      ownerBase: "Frau",
      definiteGen: "der Frau",
      indefiniteGen: "einer Frau",
      possessiveGen: "meiner Frau",
      spokenDativ: "von der Frau",
      english: "The woman's dress / The dress of the woman",
      note: "Feminine nouns never add an -s suffix: die Frau ➔ der Frau (Slide 20)"
    },
    {
      id: "kind-augen",
      noun1: "Die Augen",
      ownerGender: "neutral",
      ownerBase: "Kind",
      definiteGen: "des Kindes",
      indefiniteGen: "eines Kindes",
      possessiveGen: "meines Kindes",
      spokenDativ: "von dem Kind",
      english: "The child's eyes / The eyes of the child",
      note: "Neuter acts like masculine: das Kind ➔ des Kindes (Slide 22)"
    },
    {
      id: "kinder-eltern",
      noun1: "Die Eltern",
      ownerGender: "plural",
      ownerBase: "Kinder",
      definiteGen: "der Kinder",
      indefiniteGen: "—",
      possessiveGen: "meiner Kinder",
      spokenDativ: "von den Kindern",
      english: "The children's parents / The parents of the children",
      note: "Plural article becomes 'der', noun has no -s: die Kinder ➔ der Kinder (Slide 23)"
    },
    {
      id: "bruder-haus",
      noun1: "Das Haus",
      ownerGender: "maskulin",
      ownerBase: "Bruder",
      definiteGen: "des Bruders",
      indefiniteGen: "eines Bruders",
      possessiveGen: "meines Bruders",
      spokenDativ: "von meinem Bruder",
      english: "My brother's house",
      note: "Multi-syllable noun ending in -er adds only -s: des Bruders (Slide 3-6)"
    },
    {
      id: "nachbarin-hund",
      noun1: "Der Hund",
      ownerGender: "feminin",
      ownerBase: "Nachbarin",
      definiteGen: "der Nachbarin",
      indefiniteGen: "einer Nachbarin",
      possessiveGen: "unserer Nachbarin",
      spokenDativ: "von unserer Nachbarin",
      english: "Our neighbor's dog",
      note: "Worksheet Question 3: die Nachbarin ➔ unserer Nachbarin"
    }
  ];

  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const currentPreset = possessionPresets[activePresetIndex];

  // Compute live sentence for active preset
  let currentGenPhrase = currentPreset.definiteGen;
  if (selectedArticleType === 'indefinite') {
    currentGenPhrase = currentPreset.indefiniteGen === '—' ? currentPreset.definiteGen : currentPreset.indefiniteGen;
  } else if (selectedArticleType === 'possessive') {
    currentGenPhrase = currentPreset.possessiveGen;
  }

  const liveFullSentence = `${currentPreset.noun1} ${currentGenPhrase} ist groß.`;
  const liveSpokenAlternative = `${currentPreset.noun1} ${currentPreset.spokenDativ} ist groß.`;

  // Syllable tester words
  const testerWords = [
    { word: "Mann", gender: "m", syllables: 1, ending: "-es", result: "des Mannes", reason: "1-silbig (monosyllabic)" },
    { word: "Buch", gender: "n", syllables: 1, ending: "-es", result: "des Buches", reason: "1-silbig (monosyllabic)" },
    { word: "Kind", gender: "n", syllables: 1, ending: "-es", result: "des Kindes", reason: "1-silbig (monosyllabic)" },
    { word: "Haus", gender: "n", syllables: 1, ending: "-es", result: "des Hauses", reason: "Ends in 's' + 1-silbig" },
    { word: "Film", gender: "m", syllables: 1, ending: "-es", result: "des Filmes", reason: "1-silbig (monosyllabic)" },
    { word: "Vater", gender: "m", syllables: 2, ending: "-s", result: "des Vaters", reason: "Mehrsilbig (ends in -er)" },
    { word: "Onkel", gender: "m", syllables: 2, ending: "-s", result: "des Onkels", reason: "Mehrsilbig (ends in -el)" },
    { word: "Leben", gender: "n", syllables: 2, ending: "-s", result: "des Lebens", reason: "Mehrsilbig (ends in -en)" },
    { word: "Computer", gender: "m", syllables: 3, ending: "-s", result: "des Computers", reason: "Mehrsilbig (ends in -er)" }
  ];

  const activeTester = testerWords.find(t => t.word === suffixTesterWord) || testerWords[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-850 to-purple-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-indigo-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-400/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-400/30">
            <span>⚡ Level A2 Lektion 9</span>
            <span>•</span>
            <span>Genitiv Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Der Genitiv: Zugehörigkeit & Wessen?
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-2xl leading-relaxed">
            The Genitive case answers <strong>„Wessen?“ (Whose?)</strong> and connects two nouns to show possession or belonging:
            <strong> Nomen 1 (What is owned) + Nomen 2 (The owner in Genitiv)</strong>.
            Learn the famous <em>Double-S Rule</em> for masculine & neuter, the peaceful <em>der</em> for feminine & plural, and how Germans talk on the street using <em>von + Dativ</em>!
          </p>
        </div>
      </div>

      {/* Interactive Possession Machine */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-indigo-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-850 dark:text-white flex items-center gap-2">
              <span>🔑</span>
              <span>Die Besitz-Maschine (Possession Connector)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
              Select an owner scenario and article type to see how Genitive connects both nouns!
            </p>
          </div>

          {/* Article Type Selector */}
          <div className="inline-flex bg-slate-100 dark:bg-slate-700 p-1 rounded-2xl border border-slate-300 dark:border-slate-600">
            <button
              onClick={() => setSelectedArticleType('definite')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedArticleType === 'definite'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-indigo-600'
              }`}
            >
              Bestimmt (des/der)
            </button>
            <button
              onClick={() => setSelectedArticleType('indefinite')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedArticleType === 'indefinite'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-purple-600'
              }`}
            >
              Unbestimmt (eines/einer)
            </button>
            <button
              onClick={() => setSelectedArticleType('possessive')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedArticleType === 'possessive'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-amber-600'
              }`}
            >
              Possessiv (mein-/unser-)
            </button>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {possessionPresets.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activePresetIndex === idx
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 border-2 border-indigo-500 shadow-xs'
                  : 'bg-stone-50 dark:bg-slate-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-650'
              }`}
            >
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-200 dark:bg-slate-600 uppercase">
                {preset.ownerGender}
              </span>
              <span>{preset.noun1} + {preset.ownerBase}</span>
            </button>
          ))}
        </div>

        {/* Live Sentence Blackboard */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-indigo-500/40 shadow-inner mb-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-400">
              📐 Genitive Construction (Nomen 1 + Nomen 2)
            </span>
            <button
              onClick={() => playAudio(liveFullSentence)}
              className="px-3.5 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-all hover:scale-105"
            >
              <span>🔊 Listen</span>
            </button>
          </div>

          {/* Visual Sentence Block */}
          <div className="text-2xl sm:text-3xl font-black tracking-wide leading-relaxed flex flex-wrap items-center gap-3">
            {/* Nomen 1 */}
            <span className="px-3.5 py-1.5 bg-blue-500/20 text-blue-300 rounded-2xl border border-blue-400/30">
              {currentPreset.noun1}
            </span>

            {/* Genitiv Connector (Article + Noun) */}
            <span className="px-4 py-1.5 bg-indigo-500/30 text-indigo-200 rounded-2xl border-2 border-indigo-400 font-extrabold ring-2 ring-indigo-400/30">
              {currentGenPhrase}
            </span>

            {/* Rest */}
            <span className="text-slate-400 text-xl font-normal">
              ist groß / neu / teuer.
            </span>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-stone-400 block mb-1">1. Was wird besessen? (Nomen 1):</span>
              <strong className="text-blue-300 font-mono text-sm">{currentPreset.noun1}</strong>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-stone-400 block mb-1">2. Wer ist der Besitzer? (Genitiv):</span>
              <strong className="text-indigo-300 font-mono text-sm">{currentGenPhrase}</strong>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-stone-400 block mb-1">3. Die Kontrollfrage (Question):</span>
              <strong className="text-amber-300 font-mono text-sm">Wessen {currentPreset.noun1.toLowerCase()}?</strong>
            </div>
          </div>

          {/* Spoken Language Comparison (Slide 40-41) */}
          <div className="p-4 bg-purple-950/40 border border-purple-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-black text-purple-300 block mb-0.5">🗣️ Umgangssprache (Street German / Spoken Alternative):</span>
              <span className="text-slate-300">
                Instead of Genitiv, Germans often say: <strong className="text-white">„{liveSpokenAlternative}“</strong>
              </span>
            </div>
            <button
              onClick={() => playAudio(liveSpokenAlternative)}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
            >
              🔊 Listen Spoken
            </button>
          </div>
        </div>

        {/* Teacher Note */}
        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800/40 rounded-2xl text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <strong className="font-black text-indigo-950 dark:text-indigo-100">Slide Rule to Remember:</strong>
            <p className="mt-0.5">{currentPreset.note}</p>
          </div>
        </div>
      </div>

      {/* Slide 25-29: The Suffix Decision Tree (-es vs -s) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-purple-200 dark:border-slate-700">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded-full text-xs font-black uppercase mb-1">
            <span>Slide 25-29 Diagnostic Tool</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-850 dark:text-white flex items-center gap-2">
            <span>📏</span>
            <span>Nomen-Endungen bei Maskulin & Neutrum: -es oder -s?</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Feminine and plural nouns NEVER get an -s. But masculine and neuter nouns always add either <em>-es</em> or <em>-s</em>!
          </p>
        </div>

        {/* Word Selector Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {testerWords.map((t) => (
            <button
              key={t.word}
              onClick={() => setSuffixTesterWord(t.word)}
              className={`px-3 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                suffixTesterWord === t.word
                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-slate-650'
              }`}
            >
              {t.word} ({t.gender === 'm' ? 'der' : 'das'})
            </button>
          ))}
        </div>

        {/* Live Suffix Result Card */}
        <div className="p-6 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-purple-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Selected Noun: {activeTester.gender === 'm' ? 'der' : 'das'} {activeTester.word} ({activeTester.syllables} {activeTester.syllables === 1 ? 'Silbe' : 'Silben'})
            </div>
            <div className="text-2xl font-black text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <span>{activeTester.result}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
                Endung: {activeTester.ending}
              </span>
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300">
              <strong>Grammar Rationale:</strong> {activeTester.reason}.
            </div>
          </div>

          <button
            onClick={() => playAudio(activeTester.result)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all hover:scale-105"
          >
            <span>🔊 Pronounce</span>
          </button>
        </div>
      </div>

      {/* Slide 24 Master Chalkboard Matrix */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-stone-200 dark:border-slate-700">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 rounded-full text-xs font-black uppercase mb-1">
            <span>Slide 24 & 33 Master Matrix</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-850 dark:text-white flex items-center gap-2">
            <span>📋</span>
            <span>Die Genitiv-Matrix auf einen Blick</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
            Compare all 4 grammatical genders across definite, indefinite, and possessive articles!
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-stone-300 dark:border-slate-700 text-stone-600 dark:text-stone-300 font-black">
                <th className="py-3 px-4">Geschlecht (Gender)</th>
                <th className="py-3 px-4">Bestimmt</th>
                <th className="py-3 px-4">Unbestimmt</th>
                <th className="py-3 px-4">Possessiv (mein)</th>
                <th className="py-3 px-4">Nomen-Endung</th>
                <th className="py-3 px-4">Golden Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-slate-700 font-medium">
              {A2_GENITIV_MASTER_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-slate-750 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{idx === 0 ? '👨' : idx === 1 ? '👩' : idx === 2 ? '👶' : '👨‍👩‍👧‍👦'}</span>
                    <span>{row.gender}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {row.definite}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                    {row.indefinite}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                    {row.possessive}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-700 font-mono text-xs font-bold text-stone-700 dark:text-stone-200">
                      {row.nounSuffix}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-stone-500 dark:text-slate-400">
                    {row.rule}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
