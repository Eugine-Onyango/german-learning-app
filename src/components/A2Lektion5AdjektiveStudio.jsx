import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_NOMINATIV_MASTER_MATRIX } from '../data/germanLessonsA2';

export default function A2Lektion5AdjektiveStudio({ isSlowMode = false }) {
  const [selectedGender, setSelectedGender] = useState('maskulin'); // 'maskulin', 'feminin', 'neutral', 'plural'
  const [selectedArticleType, setSelectedArticleType] = useState('bestimmt'); // 'bestimmt', 'unbestimmt', 'negativ', 'possessiv', 'ohne'
  const [selectedAdjective, setSelectedAdjective] = useState('nett');

  // Interactive noun combos
  const nounData = {
    maskulin: { noun: "Mann", articleBestimmt: "der", articleUnbestimmt: "ein", articleNeg: "kein", articlePoss: "mein", genderLabel: "der Mann (Masculine)" },
    feminin: { noun: "Frau", articleBestimmt: "die", articleUnbestimmt: "eine", articleNeg: "keine", articlePoss: "meine", genderLabel: "die Frau (Feminine)" },
    neutral: { noun: "Kind", articleBestimmt: "das", articleUnbestimmt: "ein", articleNeg: "kein", articlePoss: "mein", genderLabel: "das Kind (Neuter)" },
    plural: { noun: "Kinder", articleBestimmt: "die", articleUnbestimmt: "", articleNeg: "keine", articlePoss: "meine", genderLabel: "die Kinder (Plural)" }
  };

  const currentNoun = nounData[selectedGender];

  // Adjective declension logic
  const getEnding = (gender, articleType, adj) => {
    let base = adj;
    let droppedE = false;

    // Special cases
    if (adj === 'teuer') {
      base = 'teur';
      droppedE = true;
    } else if (adj === 'dunkel') {
      base = 'dunkl';
      droppedE = true;
    } else if (adj === 'hoch') {
      base = 'hoh'; // 'c' drops out
    } else if (adj === 'rosa' || adj === 'lila') {
      return { base: adj, ending: '', full: adj, isException: true };
    }

    let ending = 'e';

    if (articleType === 'bestimmt') {
      if (gender === 'plural') ending = 'en';
      else ending = 'e';
    } else if (articleType === 'unbestimmt' || articleType === 'negativ' || articleType === 'possessiv') {
      if (gender === 'maskulin') ending = 'er';
      else if (gender === 'feminin') ending = 'e';
      else if (gender === 'neutral') ending = 'es';
      else if (gender === 'plural') ending = 'en';
    } else if (articleType === 'ohne') {
      if (gender === 'maskulin') ending = 'er';
      else if (gender === 'feminin') ending = 'e';
      else if (gender === 'neutral') ending = 'es';
      else if (gender === 'plural') ending = 'e'; // Nullartikel plural takes -e!
    }

    return {
      base,
      ending,
      full: `${base}${ending}`,
      droppedE
    };
  };

  const result = getEnding(selectedGender, selectedArticleType, selectedAdjective);

  const getArticleWord = () => {
    if (selectedArticleType === 'bestimmt') return currentNoun.articleBestimmt;
    if (selectedArticleType === 'unbestimmt') return currentNoun.articleUnbestimmt;
    if (selectedArticleType === 'negativ') return currentNoun.articleNeg;
    if (selectedArticleType === 'possessiv') return currentNoun.articlePoss;
    return '';
  };

  const articleWord = getArticleWord();
  const constructedPhrase = articleWord
    ? `${articleWord} ${result.full} ${currentNoun.noun}`
    : `${result.full.charAt(0).toUpperCase() + result.full.slice(1)} ${currentNoun.noun}`;

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Banner */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-purple-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-black uppercase tracking-wider border border-purple-400/30">
              <span>🎨</span>
              <span>A2 Grammar Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
              Adjektivdeklination im Nominativ Studio
            </h2>
            <p className="text-sm sm:text-base text-purple-100/90 max-w-2xl leading-relaxed">
              Crack the German adjective ending code in the subject case (Nominativ)! Understand why Sandra is <code className="text-amber-300 font-bold">schön</code> (behind noun = no ending)
              vs. <code className="text-amber-300 font-bold">eine schöne Frau</code>, explore the 4-article matrix, and master spelling rebels like <code className="text-amber-300 font-bold">teures Buch</code> and <code className="text-amber-300 font-bold">hoher Baum</code>.
            </p>
          </div>

          <button
            onClick={() => handleSpeak("Sandra ist schön. Sandra ist eine schöne Frau. Der nette Mann, die schöne Frau, das kleine Kind, die alten Bücher.")}
            className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm shrink-0"
          >
            <span>🔊</span>
            <span>Listen to Matrix Audio</span>
          </button>
        </div>
      </div>

      {/* Interactive Adjective Lab & declension machine */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-6">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>⚙️</span>
            <span>Interactive Adjective Ending Generator</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Select a noun gender, article category, and adjective to see real-time declension math
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Gender */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              1. Grammatical Gender
            </label>
            <select
              value={selectedGender}
              onChange={(e) => {
                const newGender = e.target.value;
                setSelectedGender(newGender);
                if (newGender === 'plural' && selectedArticleType === 'unbestimmt') {
                  setSelectedArticleType('ohne'); // no plural 'ein'
                }
              }}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="maskulin">Maskulin (der Mann)</option>
              <option value="feminin">Feminin (die Frau)</option>
              <option value="neutral">Neutral (das Kind)</option>
              <option value="plural">Plural (die Kinder)</option>
            </select>
          </div>

          {/* Article Category */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              2. Article Category
            </label>
            <select
              value={selectedArticleType}
              onChange={(e) => setSelectedArticleType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="bestimmt">Bestimmt (der / die / das / die)</option>
              {selectedGender !== 'plural' && (
                <option value="unbestimmt">Unbestimmt (ein / eine / ein)</option>
              )}
              <option value="negativ">Negativ (kein / keine / kein / keine)</option>
              <option value="possessiv">Possessiv (mein / meine / mein / meine)</option>
              <option value="ohne">Ohne Artikel (Nullartikel)</option>
            </select>
          </div>

          {/* Adjective */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              3. Adjective (Including Rebels!)
            </label>
            <select
              value={selectedAdjective}
              onChange={(e) => setSelectedAdjective(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="nett">nett (nice - regular)</option>
              <option value="schön">schön (beautiful - regular)</option>
              <option value="klein">klein (small - regular)</option>
              <option value="grau">grau (gray - regular)</option>
              <option value="intelligent">intelligent (intelligent)</option>
              <option value="teuer">⭐ teuer (drops inner 'e'!)</option>
              <option value="dunkel">⭐ dunkel (drops inner 'e'!)</option>
              <option value="hoch">⭐ hoch (drops the 'c'!)</option>
              <option value="rosa">⭐ rosa (vowel color - no ending!)</option>
              <option value="lila">⭐ lila (vowel color - no ending!)</option>
            </select>
          </div>
        </div>

        {/* Live Result Display */}
        <div className="p-5 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border-2 border-purple-500/40">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
              Constructed Nominativ Phrase:
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 flex items-center gap-2 flex-wrap">
              {articleWord && <span className="text-purple-300">{articleWord}</span>}
              <span className="underline decoration-amber-400 decoration-4">
                {result.base}
                <span className="text-emerald-400">{result.ending}</span>
              </span>
              <span>{currentNoun.noun}</span>
            </div>
            <div className="text-xs text-stone-400">
              Ending applied: <strong className="text-emerald-400">„{result.ending || 'None'}“</strong>
              {result.droppedE && ' • (Internal "e" dropped for pronunciation!)'}
              {selectedAdjective === 'hoch' && ' • (The letter "c" dropped!)'}
            </div>
          </div>

          <button
            onClick={() => handleSpeak(constructedPhrase)}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>🔊</span>
            <span>Pronounce Phrase</span>
          </button>
        </div>
      </div>

      {/* Slide 36 Master Chalkboard Matrix */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>📋</span>
            <span>The Slide 36 Nominativ Master Matrix</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            The exact slide summary table comparing all 4 article types side-by-side
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-purple-200 dark:border-slate-700 bg-purple-50/50 dark:bg-slate-850">
                <th className="p-3 font-black text-stone-900 dark:text-white">Gender</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Bestimmt (der/die/das)</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Unbestimmt (ein)</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Negativ / Possessiv</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Ohne Artikel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-slate-700">
              {A2_NOMINATIV_MASTER_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-purple-50/30 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-3 font-black text-purple-900 dark:text-purple-300">
                    {row.gender}
                  </td>
                  <td className="p-3 font-bold text-stone-800 dark:text-slate-200">
                    {row.bestimmt}
                  </td>
                  <td className="p-3 font-bold text-stone-800 dark:text-slate-200">
                    {row.unbestimmt}
                  </td>
                  <td className="p-3 font-bold text-stone-800 dark:text-slate-200">
                    {row.negativPossessiv}
                  </td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">
                    {row.ohneArtikel}
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
