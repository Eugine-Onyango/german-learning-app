import React, { useState } from 'react';
import { Volume2, Sparkles, Calendar, Layers, Hash, ArrowRight, CheckCircle2, Clock, Cake, Building, Coins } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson15NumbersPart3Studio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('combinations'); // 'combinations', 'years', 'chalkboard'
  const [selectedComboIdx, setSelectedComboIdx] = useState(0);
  const [inputYear, setInputYear] = useState(1990);

  const SLIDE_COMBINATIONS = [
    {
      number: '101',
      german: 'einhunderteins',
      breakdown: [
        { label: '100', text: 'einhundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '1', text: 'eins', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      ],
      slide: 'Slide 21',
      analogy: '100 + 1. Direct and clean!'
    },
    {
      number: '110',
      german: 'einhundertzehn',
      breakdown: [
        { label: '100', text: 'einhundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '10', text: 'zehn', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      ],
      slide: 'Slide 22',
      analogy: '100 + 10. Just snap together!'
    },
    {
      number: '111',
      german: 'einhundertelf',
      breakdown: [
        { label: '100', text: 'einhundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '11', text: 'elf', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      ],
      slide: 'Slide 23',
      analogy: '100 + 11. Three ones standing side-by-side!'
    },
    {
      number: '121',
      german: 'einhunderteinundzwanzig',
      breakdown: [
        { label: '100', text: 'einhundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '21 (1-and-20)', text: 'einundzwanzig', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
      ],
      slide: 'Slide 24',
      analogy: '100 + the backwards 1-and-20 rule from Lesson 4!'
    },
    {
      number: '634',
      german: 'sechshundertvierunddreißig',
      breakdown: [
        { label: '600', text: 'sechshundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '34 (4-and-30)', text: 'vierunddreißig', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      ],
      slide: 'Slide 25',
      analogy: 'Slide 25 feature: Hundreds first, then backwards tens!'
    },
    {
      number: '987',
      german: 'neunhundertsiebenundachtzig',
      breakdown: [
        { label: '900', text: 'neunhundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '87 (7-and-80)', text: 'siebenundachtzig', color: 'bg-purple-100 text-purple-900 border-purple-300' }
      ],
      slide: 'Slide 26',
      analogy: 'Countdown 9-8-7: 900 + 7-and-80!'
    },
    {
      number: '2.458',
      german: 'zweitausendvierhundertachtundfünfzig',
      breakdown: [
        { label: '2.000', text: 'zweitausend', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
        { label: '400', text: 'vierhundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '58 (8-and-50)', text: 'achtundfünfzig', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      ],
      slide: 'Slide 29',
      analogy: 'Slide 29: Thousands + Hundreds + Backwards tens as one long single word!'
    },
    {
      number: '3.945',
      german: 'dreitausendneunhundertfünfundvierzig',
      breakdown: [
        { label: '3.000', text: 'dreitausend', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
        { label: '900', text: 'neunhundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '45 (5-and-40)', text: 'fünfundvierzig', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      ],
      slide: 'Slide 30',
      analogy: 'Slide 30: 3000 + 900 + 5-and-40!'
    },
    {
      number: '13.236',
      german: 'dreizehntausendzweihundertsechsunddreißig',
      breakdown: [
        { label: '13.000', text: 'dreizehntausend', color: 'bg-teal-100 text-teal-900 border-teal-300' },
        { label: '200', text: 'zweihundert', color: 'bg-blue-100 text-blue-900 border-blue-300' },
        { label: '36 (6-and-30)', text: 'sechsunddreißig', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      ],
      slide: 'Slide 31',
      analogy: 'Slide 31: 13 Thousand + 200 + 6-and-30!'
    }
  ];

  // Quick year helper
  const getGermanYear = (year) => {
    const y = parseInt(year, 10);
    if (isNaN(y)) return '';
    if (y >= 1900 && y < 2000) {
      const rest = y - 1900;
      if (rest === 0) return 'neunzehnhundert';
      if (rest === 75) return 'neunzehnhundertfünfundsiebzig';
      if (rest === 90) return 'neunzehnhundertneunzig';
      if (rest === 99) return 'neunzehnhundertneunundneunzig';
      return `neunzehnhundert...`;
    }
    if (y >= 2000) {
      const rest = y - 2000;
      if (rest === 0) return 'zweitausend';
      if (rest === 17) return 'zweitausendsiebzehn';
      if (rest === 24) return 'zweitausendvierundzwanzig';
      if (rest === 26) return 'zweitausendsechsundzwanzig';
      return `zweitausend...`;
    }
    return 'Jahr';
  };

  const currentCombo = SLIDE_COMBINATIONS[selectedComboIdx];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Hash className="w-4 h-4 text-amber-200" />
              <span>Lesson 15: Big Numbers, Combinations & Historical Years</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Zahlen (Teil 3) 💯 🏦 🎂
            </h2>
            <p className="text-white/90 text-xs sm:text-sm font-medium max-w-xl">
              Count up to <strong>1 Billion (eine Milliarde)</strong>! Build complex numbers like Lego bricks and discover the special German <strong>century split for calendar years</strong> (1975 = <em>neunzehnhundertfünfundsiebzig</em>)!
            </p>
          </div>
          <button
            onClick={() => {
              playChime('click');
              speakGerman("Zahlen Teil drei: einhundert, eintausend, eine Million, eine Milliarde. Neunzehnhundertfünfundsiebzig!", isSlowMode);
            }}
            className="flex items-center gap-2 bg-white text-stone-900 hover:bg-amber-100 px-5 py-3 rounded-2xl font-black text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>Hear Overview Audio</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300">
        <button
          onClick={() => { setActiveTab('combinations'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'combinations'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-amber-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-600" />
          <span>1. Lego Brick Combinations (Slide 20-31)</span>
        </button>
        <button
          onClick={() => { setActiveTab('years'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'years'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>2. Calendar Years (1975 vs 2017)</span>
        </button>
        <button
          onClick={() => { setActiveTab('chalkboard'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'chalkboard'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-blue-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Building className="w-4 h-4 text-blue-600" />
          <span>3. Master Scale: 100 to 1 Billion</span>
        </button>
      </div>

      {/* TAB 1: Lego Brick Combinations */}
      {activeTab === 'combinations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">Interactive Number Builder</span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                How German Assembles Big Numbers 🧱
              </h3>
            </div>
            <span className="text-2xl">🧩 🔢</span>
          </div>

          {/* Quick selection chips for slide numbers */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Pick a number from the slides:</span>
            <div className="flex flex-wrap gap-2">
              {SLIDE_COMBINATIONS.map((c, idx) => (
                <button
                  key={c.number}
                  onClick={() => {
                    setSelectedComboIdx(idx);
                    playChime('click');
                    speakGerman(c.german, isSlowMode);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedComboIdx === idx
                      ? 'bg-stone-900 text-amber-300 shadow-md scale-105 ring-2 ring-amber-400'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  <span>{c.number}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Big Visual Lego Breakdown Card */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 rounded-3xl p-6 sm:p-8 border-3 border-amber-300 text-center space-y-6 shadow-inner">
            <div className="flex items-center justify-between max-w-sm mx-auto">
              <span className="text-xs font-bold bg-amber-200/60 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                {currentCombo.slide}
              </span>
              <span className="text-xs text-stone-500 italic">No spaces in German!</span>
            </div>

            {/* Giant Digits */}
            <div className="text-4xl sm:text-6xl font-black text-stone-900 tracking-wider font-mono">
              {currentCombo.number}
            </div>

            {/* Lego Bricks Flow */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {currentCombo.breakdown.map((b, i) => (
                <React.Fragment key={i}>
                  <div className={`p-4 rounded-2xl border-2 shadow-sm ${b.color}`}>
                    <div className="text-[11px] font-black uppercase opacity-75">{b.label}</div>
                    <div className="text-lg sm:text-xl font-black mt-0.5 font-mono">{b.text}</div>
                  </div>
                  {i < currentCombo.breakdown.length - 1 && (
                    <div className="text-xl font-black text-stone-400">+</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Full German Word Banner */}
            <div className="bg-white rounded-2xl p-5 border-2 border-amber-400 shadow-md max-w-xl mx-auto space-y-2">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Full German Compound Word:</div>
              <div className="text-xl sm:text-2xl font-black text-amber-950 font-mono break-all">
                {currentCombo.german}
              </div>
              <button
                onClick={() => {
                  speakGerman(currentCombo.german, isSlowMode);
                  playChime('click');
                }}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer mt-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Pronunciation</span>
              </button>
            </div>

            <div className="text-xs text-stone-600 italic">
              💡 {currentCombo.analogy}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Calendar Years (1975 vs 2017) */}
      {activeTab === 'years' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">Slides 32 - 36 System</span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Jahreszahlen: The Golden Calendar Year Rule 🕰️
              </h3>
            </div>
            <span className="text-2xl">📅 🎂</span>
          </div>

          {/* 2-Way Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rule 1: Before 2000 */}
            <div className="bg-amber-50 rounded-3xl p-5 sm:p-6 border-3 border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-800 tracking-wider">Slide 33: Years BEFORE 2000</span>
                <span className="text-2xl">🕰️</span>
              </div>
              <h4 className="text-lg font-black text-amber-950">
                Counted in "Hundreds" (19-hundert)
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                In English, we say <em>"nineteen seventy-five"</em>. German splits it into <strong>19 hundred</strong> + <strong>75</strong>:
              </p>
              <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 text-center space-y-1">
                <div className="text-2xl font-black text-stone-900 font-mono">1975</div>
                <div className="text-sm font-black text-amber-800 font-mono">neunzehnhundertfünfundsiebzig</div>
                <div className="text-[11px] text-stone-500">(1900 + 75)</div>
                <button
                  onClick={() => {
                    speakGerman("neunzehnhundertfünfundsiebzig. 1975.", isSlowMode);
                    playChime('click');
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
            </div>

            {/* Rule 2: 2000 and After */}
            <div className="bg-emerald-50 rounded-3xl p-5 sm:p-6 border-3 border-emerald-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">Slide 34: Years 2000 & AFTER</span>
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg font-black text-emerald-950">
                Counted as Normal Thousands (zweitausend)
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                From the millennium onward, simply say <strong>zweitausend</strong> + the number:
              </p>
              <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 text-center space-y-1">
                <div className="text-2xl font-black text-stone-900 font-mono">2017</div>
                <div className="text-sm font-black text-emerald-800 font-mono">zweitausendsiebzehn</div>
                <div className="text-[11px] text-stone-500">(2000 + 17)</div>
                <button
                  onClick={() => {
                    speakGerman("zweitausendsiebzehn. 2017.", isSlowMode);
                    playChime('click');
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Birthday Simulator (Slide 35 & 36) */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border-3 border-purple-200 space-y-4">
            <div className="flex items-center gap-2">
              <Cake className="w-5 h-5 text-purple-600" />
              <h4 className="text-base sm:text-lg font-black text-purple-950">
                Slide 35 & 36: "Wann bist du geboren?" (When were you born?)
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-stone-600">
              Pick popular birth years to hear how you answer in official German interviews:
            </p>

            <div className="flex flex-wrap gap-2">
              {[1975, 1985, 1990, 1995, 1999, 2000, 2005, 2017].map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    setInputYear(yr);
                    playChime('click');
                    speakGerman(`Wann bist du geboren? Ich bin im Jahr ${yr} geboren.`, isSlowMode);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inputYear === yr
                      ? 'bg-purple-700 text-white shadow-md scale-105'
                      : 'bg-white text-stone-700 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 border border-purple-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div>
                <div className="text-[11px] font-bold text-stone-500 uppercase">German Answer:</div>
                <div className="text-base sm:text-lg font-black text-purple-950 font-mono">
                  Ich bin im Jahr {inputYear} geboren.
                </div>
              </div>
              <button
                onClick={() => {
                  speakGerman(`Ich bin im Jahr ${inputYear} geboren.`, isSlowMode);
                  playChime('click');
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear My Birth Year</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Master Scale: 100 to 1 Billion (Slide 1-19 & Summary) */}
      {activeTab === 'chalkboard' && (
        <div className="bg-[#21292d] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-800/60 shadow-2xl space-y-6 relative overflow-hidden font-sans">
          <div className="flex items-center justify-between border-b border-stone-700/80 pb-4">
            <div>
              <div className="text-amber-400 font-mono text-2xl sm:text-3xl font-black tracking-wide">
                Zahlen von 100 bis 1 Milliarde 📋
              </div>
              <div className="text-stone-300 text-xs sm:text-sm italic">
                Exact chalkboard comparison from the lesson summary
              </div>
            </div>
            <Coins className="w-6 h-6 text-amber-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-700/80">
            {/* Left: Hundreds */}
            <div className="space-y-2 pr-0 md:pr-4">
              <div className="text-amber-400 font-black text-sm uppercase tracking-widest pb-1 border-b border-stone-700">
                Die Hunderter (100 - 900)
              </div>
              {[
                { n: '100', g: '(ein)hundert' },
                { n: '200', g: 'zweihundert' },
                { n: '300', g: 'dreihundert' },
                { n: '400', g: 'vierhundert' },
                { n: '500', g: 'fünfhundert' },
                { n: '600', g: 'sechshundert' },
                { n: '700', g: 'siebenhundert' },
                { n: '800', g: 'achthundert' },
                { n: '900', g: 'neunhundert' },
              ].map((row) => (
                <div
                  key={row.n}
                  onClick={() => {
                    speakGerman(`${row.n}. ${row.g}`, isSlowMode);
                    playChime('click');
                  }}
                  className="p-2.5 bg-stone-800/70 hover:bg-stone-750 rounded-xl flex items-center justify-between cursor-pointer border border-stone-700/60"
                >
                  <span className="font-mono font-black text-amber-300 text-base">{row.n}</span>
                  <span className="font-mono text-white text-sm">{row.g}</span>
                  <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                </div>
              ))}
            </div>

            {/* Right: Thousands, Millions & Billions */}
            <div className="space-y-2 pt-4 md:pt-0 pl-0 md:pl-4">
              <div className="text-emerald-400 font-black text-sm uppercase tracking-widest pb-1 border-b border-stone-700">
                Tausender, Millionen & Milliarden
              </div>
              {[
                { n: '1.000', g: '(ein)tausend' },
                { n: '2.000', g: 'zweitausend' },
                { n: '10.000', g: 'zehntausend' },
                { n: '11.000', g: 'elftausend' },
                { n: '100.000', g: '(ein)hunderttausend' },
                { n: '200.000', g: 'zweihunderttausend' },
                { n: '1.000.000', g: 'eine Million 👑' },
                { n: '2.000.000', g: 'zwei Millionen' },
                { n: '1.000.000.000', g: 'eine Milliarde 💎' },
              ].map((row) => (
                <div
                  key={row.n}
                  onClick={() => {
                    speakGerman(`${row.n}. ${row.g}`, isSlowMode);
                    playChime('click');
                  }}
                  className="p-2.5 bg-stone-800/70 hover:bg-stone-750 rounded-xl flex items-center justify-between cursor-pointer border border-stone-700/60"
                >
                  <span className="font-mono font-black text-emerald-300 text-base">{row.n}</span>
                  <span className="font-mono text-white text-sm">{row.g}</span>
                  <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
