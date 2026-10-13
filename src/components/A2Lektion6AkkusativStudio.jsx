import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_AKKUSATIV_MASTER_MATRIX } from '../data/germanLessonsA2';

export default function A2Lektion6AkkusativStudio({ isSlowMode = false }) {
  const [selectedGender, setSelectedGender] = useState('maskulin'); // 'maskulin', 'feminin', 'neutral', 'plural'
  const [selectedArticleType, setSelectedArticleType] = useState('bestimmt'); // 'bestimmt', 'unbestimmt', 'negativ', 'possessiv', 'ohne'
  const [selectedAdjective, setSelectedAdjective] = useState('groß');

  const nounData = {
    maskulin: { noun: "Hund", articleBestimmt: "den", articleUnbestimmt: "einen", articleNeg: "keinen", articlePoss: "meinen", genderLabel: "der Hund ➔ den Hund (Masculine)" },
    feminin: { noun: "Katze", articleBestimmt: "die", articleUnbestimmt: "eine", articleNeg: "keine", articlePoss: "meine", genderLabel: "die Katze (Feminine)" },
    neutral: { noun: "Auto", articleBestimmt: "das", articleUnbestimmt: "ein", articleNeg: "kein", articlePoss: "mein", genderLabel: "das Auto (Neuter)" },
    plural: { noun: "Schuhe", articleBestimmt: "die", articleUnbestimmt: "", articleNeg: "keine", articlePoss: "meine", genderLabel: "die Schuhe (Plural)" }
  };

  const currentNoun = nounData[selectedGender];

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
      base = 'hoh';
    } else if (adj === 'rosa' || adj === 'lila') {
      return { base: adj, ending: '', full: adj, isException: true };
    }

    let ending = 'e';

    if (gender === 'maskulin') {
      // In Akkusativ, masculine is 100% universal -en across ALL article types!
      ending = 'en';
    } else if (gender === 'feminin') {
      // Feminine is 100% universal -e across ALL article types!
      ending = 'e';
    } else if (gender === 'neutral') {
      if (articleType === 'bestimmt') ending = 'e';
      else ending = 'es';
    } else if (gender === 'plural') {
      if (articleType === 'ohne') ending = 'e'; // Nullartikel plural takes -e!
      else ending = 'en';
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

  const fullSentenceExample = `Ich sehe ${constructedPhrase.toLowerCase()}.`;

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Banner */}
      <div className="bg-gradient-to-br from-rose-900 via-pink-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-rose-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-black uppercase tracking-wider border border-rose-400/30">
              <span>🎯</span>
              <span>Direct Object Mastery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
              Adjektivdeklination im Akkusativ Studio
            </h2>
            <p className="text-sm sm:text-base text-rose-100/90 max-w-2xl leading-relaxed">
              Master adjective endings for direct objects in German! Discover the famous <strong>Golden Masculine Rule</strong>: in Akkusativ, the masculine article shifts to <code className="text-amber-300 font-bold">den / einen / meinen</code> and the adjective takes an unwavering <code className="text-amber-300 font-bold">-en</code> ending every single time!
            </p>
          </div>

          <button
            onClick={() => handleSpeak("Im Akkusativ ist nur der Maskulin-Artikel anders! Ich habe einen großen Hund, eine schwarze Katze und ein schickes Auto.")}
            className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm shrink-0"
          >
            <span>🔊</span>
            <span>Listen to Golden Rule</span>
          </button>
        </div>
      </div>

      {/* Nominativ vs Akkusativ Comparison Card (Slide 11 Core Secret) */}
      <div className="bg-amber-50 dark:bg-slate-850 p-5 rounded-3xl border-2 border-amber-300 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow shrink-0">
            💡
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-400">
              The Slide 11 Secret Key
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              "Im Akkusativ, nur der Maskulin-Artikel ist anders!"
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300">
              Feminine, Neuter, and Plural keep their identical endings from Nominativ! ONLY masculine changes to <strong>-en</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSpeak("Im Akkusativ, nur der Maskulin-Artikel ist anders.")}
          className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 text-stone-900 dark:text-white font-bold rounded-xl text-xs border border-amber-300 dark:border-slate-600 cursor-pointer transition-all shrink-0"
        >
          🔊 Hear Insight
        </button>
      </div>

      {/* Interactive Adjective Lab */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-6">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>⚙️</span>
            <span>Interactive Akkusativ Declension Generator</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Select the direct object gender, article category, and adjective to inspect endings
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Gender */}
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              1. Direct Object Gender
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
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <option value="maskulin">Maskulin (den / einen Hund) ➔ -EN!</option>
              <option value="feminin">Feminin (die / eine Katze) ➔ -e</option>
              <option value="neutral">Neutral (das / ein Auto) ➔ -e / -es</option>
              <option value="plural">Plural (die Schuhe) ➔ -en / -e</option>
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
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <option value="bestimmt">Bestimmt (den / die / das / die)</option>
              {selectedGender !== 'plural' && (
                <option value="unbestimmt">Unbestimmt (einen / eine / ein)</option>
              )}
              <option value="negativ">Negativ (keinen / keine / kein / keine)</option>
              <option value="possessiv">Possessiv (meinen / meine / mein / meine)</option>
              <option value="ohne">Ohne Artikel (Nullartikel)</option>
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
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <option value="groß">groß (big)</option>
              <option value="klein">klein (small)</option>
              <option value="neu">neu (new)</option>
              <option value="schwarz">schwarz (black)</option>
              <option value="schick">schick (fancy / chic)</option>
              <option value="alt">alt (old)</option>
              <option value="jung">jung (young)</option>
              <option value="teuer">⭐ teuer (drops inner 'e'!)</option>
              <option value="dunkel">⭐ dunkel (drops inner 'e'!)</option>
              <option value="hoch">⭐ hoch (drops the 'c'!)</option>
            </select>
          </div>
        </div>

        {/* Live Result Display */}
        <div className="p-5 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border-2 border-rose-500/40">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
              Constructed Akkusativ Object Phrase:
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 flex items-center gap-2 flex-wrap">
              {articleWord && <span className="text-rose-300">{articleWord}</span>}
              <span className="underline decoration-amber-400 decoration-4">
                {result.base}
                <span className="text-emerald-400">{result.ending}</span>
              </span>
              <span>{currentNoun.noun}</span>
            </div>
            <div className="text-xs text-stone-400">
              Full Sentence: <span className="italic text-stone-200 font-bold">"{fullSentenceExample}"</span>
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

      {/* Slide 31 Master Chalkboard Matrix */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>📋</span>
            <span>The Slide 31 Akkusativ Master Matrix</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Compare all 4 article types in Akkusativ side-by-side
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-rose-200 dark:border-slate-700 bg-rose-50/50 dark:bg-slate-850">
                <th className="p-3 font-black text-stone-900 dark:text-white">Gender</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Bestimmt (den/die/das)</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Unbestimmt (einen/eine/ein)</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Negativ / Possessiv</th>
                <th className="p-3 font-black text-stone-900 dark:text-white">Ohne Artikel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-slate-700">
              {A2_AKKUSATIV_MASTER_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-rose-50/30 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-3 font-black text-rose-900 dark:text-rose-300">
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
