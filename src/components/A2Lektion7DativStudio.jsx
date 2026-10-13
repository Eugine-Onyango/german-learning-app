import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_DATIV_MASTER_MATRIX } from '../data/germanLessonsA2';

export default function A2Lektion7DativStudio({ isSlowMode = false }) {
  const [selectedGender, setSelectedGender] = useState('maskulin');
  const [selectedArticleType, setSelectedArticleType] = useState('bestimmt');
  const [selectedAdjective, setSelectedAdjective] = useState('alt');

  const nounData = {
    maskulin: { noun: "Mann", articleBestimmt: "dem", articleUnbestimmt: "einem", articleNeg: "keinem", articlePoss: "meinem", genderLabel: "der Mann ➔ dem Mann (Masculine)" },
    feminin: { noun: "Frau", articleBestimmt: "der", articleUnbestimmt: "einer", articleNeg: "keiner", articlePoss: "meiner", genderLabel: "die Frau ➔ der Frau (Feminine)" },
    neutral: { noun: "Kind", articleBestimmt: "dem", articleUnbestimmt: "einem", articleNeg: "keinem", articlePoss: "meinem", genderLabel: "das Kind ➔ dem Kind (Neuter)" },
    plural: { noun: "Kindern", articleBestimmt: "den", articleUnbestimmt: "", articleNeg: "keinen", articlePoss: "meinen", genderLabel: "die Kinder ➔ den Kindern (+n!) (Plural)" }
  };

  const currentNoun = nounData[selectedGender];

  const getEnding = (gender, articleType, adj) => {
    let base = adj;

    // Special cases
    if (adj === 'teuer') base = 'teur';
    else if (adj === 'dunkel') base = 'dunkl';
    else if (adj === 'hoch') base = 'hoh';
    else if (adj === 'rosa' || adj === 'lila') {
      return { base: adj, ending: '', full: adj, isException: true };
    }

    let ending = 'en';

    if (articleType === 'ohne') {
      if (gender === 'maskulin') ending = 'em'; // from dem
      else if (gender === 'feminin') ending = 'er'; // from der
      else if (gender === 'neutral') ending = 'em'; // from dem
      else if (gender === 'plural') ending = 'en'; // from den
    } else {
      // With ANY article in Dativ, ending is 100% universal -EN!
      ending = 'en';
    }

    return {
      base,
      ending,
      full: `${base}${ending}`
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

  const fullSentenceExample = selectedGender === 'feminin'
    ? `Kannst du bitte ${constructedPhrase.toLowerCase()} helfen?`
    : `Er spricht mit ${constructedPhrase.toLowerCase()}.`;

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Banner */}
      <div className="bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-cyan-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-black uppercase tracking-wider border border-cyan-400/30">
              <span>🎁</span>
              <span>Dative Case Simplicity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
              Adjektivdeklination im Dativ Studio
            </h2>
            <p className="text-sm sm:text-base text-cyan-100/90 max-w-2xl leading-relaxed">
              Discover the easiest case in German adjective declension! When an article is present in Dativ,
              the adjective ending is <strong>100% UNIVERSAL „-EN“</strong> across Masculine, Feminine, Neuter, and Plural!
            </p>
          </div>

          <button
            onClick={() => handleSpeak("Im Dativ bekommen alle Adjektive mit Artikel die Endung e n! Dem alten Mann, der netten Frau, dem kleinen Kind, und den süßen Kindern.")}
            className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm shrink-0"
          >
            <span>🔊</span>
            <span>Listen to Universal Rule</span>
          </button>
        </div>
      </div>

      {/* The Universal -EN Super Secret Card */}
      <div className="bg-cyan-50 dark:bg-slate-850 p-5 rounded-3xl border-2 border-cyan-300 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-3xl shadow shrink-0">
            ✨
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-cyan-900 dark:text-cyan-400">
              The Golden Dativ Secret
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Every single adjective with an article ends in „-en“!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300">
              <code className="font-bold text-cyan-700 dark:text-cyan-300">dem neuen</code>, <code className="font-bold text-cyan-700 dark:text-cyan-300">einer kleinen</code>, <code className="font-bold text-cyan-700 dark:text-cyan-300">der alten</code>, <code className="font-bold text-cyan-700 dark:text-cyan-300">deiner netten</code>, <code className="font-bold text-cyan-700 dark:text-cyan-300">den süßen Kindern</code>!
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSpeak("Er fährt mit seinem neuen Auto. Wir wohnen in einer kleinen Wohnung. Kannst du der alten Frau helfen?")}
          className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-slate-600 text-stone-900 dark:text-white font-bold rounded-xl text-xs border border-cyan-300 dark:border-slate-600 cursor-pointer transition-all shrink-0"
        >
          🔊 Hear 3 Examples
        </button>
      </div>

      {/* Interactive Adjective Lab */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-6">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>⚙️</span>
            <span>Interactive Dativ Ending Calculator</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Select a dative noun recipient, article category, and adjective to test declension
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Gender */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              1. Dative Noun Gender
            </label>
            <select
              value={selectedGender}
              onChange={(e) => {
                const newGender = e.target.value;
                setSelectedGender(newGender);
                if (newGender === 'plural' && selectedArticleType === 'unbestimmt') {
                  setSelectedArticleType('ohne');
                }
              }}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
            >
              <option value="maskulin">Maskulin (dem / einem Mann)</option>
              <option value="feminin">Feminin (der / einer Frau)</option>
              <option value="neutral">Neutral (dem / einem Kind)</option>
              <option value="plural">Plural (den / keinen Kindern +n!)</option>
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
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
            >
              <option value="bestimmt">Bestimmt (dem / der / dem / den)</option>
              {selectedGender !== 'plural' && (
                <option value="unbestimmt">Unbestimmt (einem / einer / einem)</option>
              )}
              <option value="negativ">Negativ (keinem / keiner / keinem / keinen)</option>
              <option value="possessiv">Possessiv (meinem / meiner / meinem / meinen)</option>
              <option value="ohne">Ohne Artikel (Nullartikel - copies dem/der!)</option>
            </select>
          </div>

          {/* Adjective */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              3. Adjective
            </label>
            <select
              value={selectedAdjective}
              onChange={(e) => setSelectedAdjective(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
            >
              <option value="alt">alt (old)</option>
              <option value="nett">nett (nice)</option>
              <option value="klein">klein (small)</option>
              <option value="neu">neu (new)</option>
              <option value="blau">blau (blue)</option>
              <option value="süß">süß (sweet)</option>
              <option value="frech">frech (cheeky / naughty)</option>
              <option value="teuer">⭐ teuer (drops inner 'e'!)</option>
              <option value="dunkel">⭐ dunkel (drops inner 'e'!)</option>
            </select>
          </div>
        </div>

        {/* Live Result Display */}
        <div className="p-5 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border-2 border-cyan-500/40">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
              Constructed Dativ Phrase:
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 flex items-center gap-2 flex-wrap">
              {articleWord && <span className="text-cyan-300">{articleWord}</span>}
              <span className="underline decoration-amber-400 decoration-4">
                {result.base}
                <span className="text-emerald-400">{result.ending}</span>
              </span>
              <span>{currentNoun.noun}</span>
            </div>
            <div className="text-xs text-stone-400">
              Context Example: <span className="italic text-stone-200 font-bold">"{fullSentenceExample}"</span>
            </div>
          </div>

          <button
            onClick={() => handleSpeak(fullSentenceExample)}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>🔊</span>
            <span>Pronounce Sentence</span>
          </button>
        </div>
      </div>

      {/* Slide 37 Master Chalkboard Matrix */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>📋</span>
            <span>The Slide 37 Dativ Master Matrix</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Compare all 4 article types in Dativ side-by-side
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-cyan-200 dark:border-slate-700 bg-cyan-50/50 dark:bg-slate-850">
                <th className="p-3 font-black text-stone-900 dark:text-white">Gender</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Bestimmt (dem/der/dem/den)</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Unbestimmt (einem/einer)</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Negativ / Possessiv</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Ohne Artikel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-slate-700">
              {A2_DATIV_MASTER_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-cyan-50/30 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-3 font-black text-cyan-900 dark:text-cyan-300">
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
