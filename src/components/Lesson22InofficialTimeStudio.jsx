import React, { useState } from 'react';
import { Volume2, Sparkles, Clock, Compass, HelpCircle, ArrowRight, Lightbulb, Play, RotateCcw } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson22InofficialTimeStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('wheel');
  const [baseHour, setBaseHour] = useState(1);
  const [selectedSector, setSelectedSector] = useState('00');

  // Clock Wheel Sectors (Slide 31)
  const CLOCK_SECTORS = [
    { id: '00', label: "Full Hour", badge: "... (Uhr)", expr: (h) => `Es ist ${h === 1 ? 'eins' : getHourWord(h)}.`, sub: "Full hour (casual: drop Uhr!)" },
    { id: '05', label: "5 past", badge: "5 nach...", expr: (h) => `Es ist fünf nach ${h === 1 ? 'eins' : getHourWord(h)}.`, sub: "Right side of clock: nach" },
    { id: '10', label: "10 past", badge: "10 nach...", expr: (h) => `Es ist zehn nach ${h === 1 ? 'eins' : getHourWord(h)}.`, sub: "Right side of clock: nach" },
    { id: '15', label: "Quarter past", badge: "Viertel nach...", expr: (h) => `Es ist Viertel nach ${h === 1 ? 'eins' : getHourWord(h)}.`, sub: "15 mins past" },
    { id: '20', label: "20 past", badge: "20 nach...", expr: (h) => `Es ist zwanzig nach ${h === 1 ? 'eins' : getHourWord(h)}.`, sub: "20 mins past" },
    { id: '25', label: "25 past", badge: "5 vor halb...", expr: (h) => `Es ist fünf vor halb ${getHourWord(nextH(h))}.`, sub: "5 mins BEFORE half!" },
    { id: '30', label: "Half past", badge: "halb...", expr: (h) => `Es ist halb ${getHourWord(nextH(h))}.`, sub: "THE TRAP: look forward!" },
    { id: '35', label: "25 to", badge: "5 nach halb...", expr: (h) => `Es ist fünf nach halb ${getHourWord(nextH(h))}.`, sub: "5 mins AFTER half!" },
    { id: '40', label: "20 to", badge: "20 vor...", expr: (h) => `Es ist zwanzig vor ${getHourWord(nextH(h))}.`, sub: "Left side of clock: vor" },
    { id: '45', label: "Quarter to", badge: "Viertel vor...", expr: (h) => `Es ist Viertel vor ${getHourWord(nextH(h))}.`, sub: "15 mins to next hour" },
    { id: '50', label: "10 to", badge: "10 vor...", expr: (h) => `Es ist zehn vor ${getHourWord(nextH(h))}.`, sub: "Left side of clock: vor" },
    { id: '55', label: "5 to", badge: "5 vor...", expr: (h) => `Es ist fünf vor ${getHourWord(nextH(h))}.`, sub: "Almost next hour!" }
  ];

  function getHourWord(h) {
    const words = ["zwölf", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
    return words[h] || `${h}`;
  }

  function nextH(h) {
    return h === 12 ? 1 : h + 1;
  }

  const activeSectorObj = CLOCK_SECTORS.find(s => s.id === selectedSector) || CLOCK_SECTORS[0];
  const activeGermanPhrase = activeSectorObj.expr(baseHour);

  const EXERCISES = [
    {
      time: "20:45",
      slide: "Slide 33",
      german: "Es ist Viertel vor neun.",
      en: "It is quarter to nine (8:45 p.m.).",
      why: "In 12-hour casual German, 20:45 is 15 minutes before 9: 'Viertel vor neun'."
    },
    {
      time: "10:20",
      slide: "Slide 34",
      german: "Es ist zwanzig nach zehn.",
      en: "It is twenty past ten.",
      why: "10:20 is on the right side of the clock: 'zwanzig nach zehn'."
    },
    {
      time: "22:28",
      slide: "Slide 35",
      german: "Es ist kurz vor halb elf.",
      en: "It is just before 10:30 p.m.",
      why: "22:28 is 2 minutes before 22:30 (halb elf). So use 'kurz vor'!"
    },
    {
      time: "11:30",
      slide: "Slide 2",
      german: "Es ist halb zwölf.",
      en: "It is half past eleven.",
      why: "Look forward! 11:30 means half of the 12th hour has arrived: 'halb zwölf'!"
    },
    {
      time: "14:05",
      slide: "Slide 3",
      german: "Es ist fünf nach zwei.",
      en: "It is five past two.",
      why: "14:05 is 2:05 in the afternoon: 'fünf nach zwei'."
    },
    {
      time: "15:35",
      slide: "Slide 4",
      german: "Es ist fünf nach halb vier.",
      en: "It is 25 to 4 / 5 past half 4.",
      why: "15:30 is 'halb vier', so 15:35 is 5 minutes past half four: 'fünf nach halb vier'."
    }
  ];

  const [activeExIdx, setActiveExIdx] = useState(0);
  const [exRevealed, setExRevealed] = useState(false);
  const currEx = EXERCISES[activeExIdx];

  const APPROX_WORDS = [
    {
      term: "kurz vor",
      meaning: "just before",
      example: "Es ist kurz vor fünf. (04:58)",
      audio: "Es ist kurz vor fünf.",
      tip: "Used 1 to 3 minutes before an hour or half hour."
    },
    {
      term: "kurz nach",
      meaning: "just after",
      example: "Es ist kurz nach fünf. (05:03)",
      audio: "Es ist kurz nach fünf.",
      tip: "Used 1 to 3 minutes after an hour or half hour."
    },
    {
      term: "gleich",
      meaning: "about to be / shortly",
      example: "Es ist gleich fünf. (04:58)",
      audio: "Es ist gleich fünf.",
      tip: "Points forward to an impending hour."
    },
    {
      term: "fast",
      meaning: "almost",
      example: "Es ist fast fünf. (04:58)",
      audio: "Es ist fast fünf.",
      tip: "Very close to the full hour."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-700/80 rounded-full text-xs font-semibold text-teal-200 mb-3 border border-teal-500/40">
            <Clock className="w-3.5 h-3.5" />
            <span>Lesson 22: Inoffizielle Zeit Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Zeit in Umgangssprache (Everyday Casual Time)
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            How native Germans actually tell the time with friends and family! Master the <strong>Clock Wheel (Slide 31)</strong>, the <strong>"Halb" forward rule</strong>, and everyday approximations like <em>kurz vor</em> and <em>kurz nach</em>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-teal-800/60">
          <button
            onClick={() => { setActiveTab('wheel'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'wheel'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-teal-950/70 text-teal-100 hover:bg-teal-900'
            }`}
          >
            🧭 Slide 31 Master Clock Wheel
          </button>
          <button
            onClick={() => { setActiveTab('halbLab'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'halbLab'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-teal-950/70 text-teal-100 hover:bg-teal-900'
            }`}
          >
            ⚖️ The "Halb" Trap &amp; Orbit Lab
          </button>
          <button
            onClick={() => { setActiveTab('uebung'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'uebung'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-teal-950/70 text-teal-100 hover:bg-teal-900'
            }`}
          >
            🎯 Classroom Übung (Slides 32-35)
          </button>
        </div>
      </div>

      {/* TAB 1: SLIDE 31 MASTER CLOCK WHEEL */}
      {activeTab === 'wheel' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Slide 31: The Master Clock Circle
            </h3>
            <p className="text-stone-600 text-sm">
              Right side of the clock uses <strong>nach</strong> (past). Left side uses <strong>vor</strong> (to). And the bottom orbits around <strong>halb</strong>!
            </p>
          </div>

          {/* Hour Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto bg-stone-100 p-2 rounded-2xl border border-stone-200">
            <span className="text-xs font-bold text-stone-600 px-2">Set Base Hour:</span>
            {[1, 2, 4, 7, 10, 11].map(h => (
              <button
                key={h}
                onClick={() => {
                  setBaseHour(h);
                  playChime('click');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  baseHour === h
                    ? 'bg-stone-900 text-amber-300 shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-200'
                }`}
              >
                {h}:00
              </button>
            ))}
          </div>

          {/* Interactive Clock Wheel Display */}
          <div className="bg-stone-900 border-4 border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-w-3xl mx-auto">
            {/* Live Spoken Output Box */}
            <div
              onClick={() => speakGerman(activeGermanPhrase, isSlowMode)}
              className="bg-stone-800/90 hover:bg-stone-800 border-2 border-amber-400 p-5 rounded-2xl cursor-pointer group transition-all text-center mb-6"
            >
              <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">
                Time: {String(baseHour).padStart(2, '0')}:{selectedSector}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 group-hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <span>"{activeGermanPhrase}"</span>
                <Volume2 className="w-6 h-6 text-amber-400 group-hover:animate-pulse shrink-0" />
              </div>
              <div className="text-xs text-stone-300 mt-1">
                {activeSectorObj.sub} • Tap anywhere to listen
              </div>
            </div>

            {/* 12 Sectors Grid (Matching Slide 31) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CLOCK_SECTORS.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setSelectedSector(sec.id);
                    playChime('click');
                    speakGerman(sec.expr(baseHour), isSlowMode);
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedSector === sec.id
                      ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-lg scale-105 font-bold'
                      : 'bg-stone-800/70 hover:bg-stone-800 text-stone-200 border-stone-700'
                  }`}
                >
                  <div className="text-xs font-mono opacity-80">:{sec.id}</div>
                  <div className="text-sm font-black mt-0.5">{sec.badge}</div>
                  <div className="text-[11px] opacity-75 truncate">{sec.label}</div>
                </button>
              ))}
            </div>

            {/* Legend / Key Insight */}
            <div className="mt-6 pt-4 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300 text-center">
              <div className="bg-stone-800/50 p-2.5 rounded-xl border border-stone-700">
                <span className="text-teal-300 font-bold block mb-0.5">Right Half (:01 - :20)</span>
                Uses <strong>nach</strong> (past)
              </div>
              <div className="bg-stone-800/50 p-2.5 rounded-xl border border-stone-700">
                <span className="text-amber-300 font-bold block mb-0.5">Bottom Half (:25 - :35)</span>
                Orbits <strong>halb [next hour]</strong>
              </div>
              <div className="bg-stone-800/50 p-2.5 rounded-xl border border-stone-700">
                <span className="text-rose-300 font-bold block mb-0.5">Left Half (:40 - :59)</span>
                Uses <strong>vor</strong> (to)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE HALB TRAP & APPROXIMATION LAB */}
      {activeTab === 'halbLab' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              The "Halb" Trap &amp; Orbit
            </h3>
            <p className="text-stone-600 text-sm">
              The #1 mistake English speakers make in German: in English, "half past one" looks back at 1. In German, <strong>halb zwei</strong> looks forward to 2!
            </p>
          </div>

          {/* Visual Seesaw Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* English Thinking */}
            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <span className="text-xl">🇬🇧</span>
                <span>English Logic (Looks Backward)</span>
              </div>
              <div className="text-3xl font-black text-rose-950">"Half past one" (1:30)</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                English speakers stand at 1:00 and look behind them, saying "30 minutes have passed since 1".
              </p>
            </div>

            {/* German Thinking */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <span className="text-xl">🇩🇪</span>
                <span>German Logic (Looks Forward!)</span>
              </div>
              <div className="text-3xl font-black text-emerald-950">"Halb zwei" (1:30)</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                German speakers look ahead to 2:00, saying "We are already halfway towards 2 o'clock!"
              </p>
            </div>
          </div>

          {/* The Orbit around Halb */}
          <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-4 shadow-sm">
            <h4 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <span>🪐</span>
              <span>The Orbit Around "Halb" (Slides 23 &amp; 24)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div
                onClick={() => speakGerman("Es ist fünf vor halb zwei.", isSlowMode)}
                className="bg-stone-50 hover:bg-amber-50 p-4 rounded-2xl border border-stone-200 cursor-pointer transition-all group"
              >
                <div className="text-xs font-mono text-stone-500">01:25 / 13:25</div>
                <div className="text-lg font-black text-stone-900 mt-1">fünf vor halb zwei</div>
                <div className="text-xs text-stone-500 mt-0.5">5 mins before 1:30</div>
                <Volume2 className="w-4 h-4 mx-auto mt-2 text-stone-400 group-hover:text-amber-600" />
              </div>

              <div
                onClick={() => speakGerman("Es ist halb zwei.", isSlowMode)}
                className="bg-amber-100/70 hover:bg-amber-100 p-4 rounded-2xl border-2 border-amber-400 cursor-pointer transition-all group"
              >
                <div className="text-xs font-mono text-amber-800">01:30 / 13:30</div>
                <div className="text-lg font-black text-amber-950 mt-1">halb zwei</div>
                <div className="text-xs text-amber-800 mt-0.5">The exact half hour</div>
                <Volume2 className="w-4 h-4 mx-auto mt-2 text-amber-600 group-hover:animate-pulse" />
              </div>

              <div
                onClick={() => speakGerman("Es ist fünf nach halb zwei.", isSlowMode)}
                className="bg-stone-50 hover:bg-amber-50 p-4 rounded-2xl border border-stone-200 cursor-pointer transition-all group"
              >
                <div className="text-xs font-mono text-stone-500">01:35 / 13:35</div>
                <div className="text-lg font-black text-stone-900 mt-1">fünf nach halb zwei</div>
                <div className="text-xs text-stone-500 mt-0.5">5 mins after 1:30</div>
                <Volume2 className="w-4 h-4 mx-auto mt-2 text-stone-400 group-hover:text-amber-600" />
              </div>
            </div>
          </div>

          {/* Everyday Approximation Words */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-4 shadow-xl">
            <h4 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>⏳</span>
              <span>Everyday Approximation Words (Slides 25-30)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {APPROX_WORDS.map((w, idx) => (
                <div
                  key={idx}
                  onClick={() => speakGerman(w.audio, isSlowMode)}
                  className="bg-stone-800/80 hover:bg-stone-800 p-4 rounded-2xl border border-stone-700 hover:border-amber-400 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-black text-base">{w.term}</span>
                    <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-400" />
                  </div>
                  <div className="text-xs text-stone-400">{w.meaning}</div>
                  <div className="text-sm font-bold text-white mt-1">"{w.example}"</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{w.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLASSROOM ÜBUNG */}
      {activeTab === 'uebung' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Classroom Übung (Slides 32 to 35)
            </h3>
            <p className="text-stone-600 text-sm">
              Practice reading inofficial conversational time. Guess first, then tap Reveal to listen!
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {EXERCISES.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveExIdx(idx);
                  setExRevealed(false);
                  playChime('click');
                }}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  activeExIdx === idx
                    ? 'bg-stone-900 text-amber-300 ring-2 ring-amber-400 shadow-md scale-105'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {ex.time} ({ex.slide})
              </button>
            ))}
          </div>

          {/* Active Exercise Card */}
          <div className="bg-stone-900 border-4 border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
              <span>{currEx.slide} Challenge</span>
              <span className="text-amber-400">Wie spät ist es?</span>
            </div>

            {/* Big Clock Display */}
            <div className="bg-black/90 px-8 py-6 rounded-2xl border-2 border-stone-700 inline-block shadow-inner font-mono text-6xl sm:text-7xl font-bold text-amber-400">
              {currEx.time}
            </div>

            {/* Reveal Button / Content */}
            <div className="pt-4 border-t border-stone-800">
              {!exRevealed ? (
                <button
                  onClick={() => {
                    setExRevealed(true);
                    playChime('success');
                    speakGerman(currEx.german, isSlowMode);
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black px-6 py-3 rounded-2xl shadow-lg transition-transform active:scale-95 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Reveal Conversational German Answer</span>
                </button>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div
                    onClick={() => speakGerman(currEx.german, isSlowMode)}
                    className="bg-stone-800 p-4 rounded-2xl border-2 border-amber-400 cursor-pointer group transition-all"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 group-hover:scale-105 transition-transform flex items-center justify-center gap-3">
                      <span>"{currEx.german}"</span>
                      <Volume2 className="w-6 h-6 text-amber-400 group-hover:animate-pulse" />
                    </div>
                    <div className="text-stone-300 text-sm mt-1">{currEx.en}</div>
                  </div>

                  <div className="bg-stone-800/50 p-3 rounded-xl border border-stone-700 text-xs text-stone-300">
                    💡 <strong>Conversational Rationale:</strong> {currEx.why}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
