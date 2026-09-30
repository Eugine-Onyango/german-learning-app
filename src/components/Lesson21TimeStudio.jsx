import React, { useState } from 'react';
import { Volume2, Sparkles, Clock, Calendar, HelpCircle, ArrowRight, Lightbulb, Play, RotateCcw } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson21TimeStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('simulator');
  const [hour, setHour] = useState(17);
  const [minute, setMinute] = useState(42);

  // Helper to convert numbers 0-59 to German words
  const getGermanHourWord = (h) => {
    const hours = [
      "null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn",
      "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn",
      "neunzehn", "zwanzig", "einundzwanzig", "zweiundzwanzig", "dreiundzwanzig"
    ];
    return hours[h] || `${h}`;
  };

  const getGermanMinuteWord = (m) => {
    if (m === 0) return "";
    const ones = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
    const teens = [
      "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"
    ];
    const tens = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig"];

    if (m < 10) return ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"][m];
    if (m < 20) return teens[m - 10];

    const tenDigit = Math.floor(m / 10);
    const oneDigit = m % 10;
    if (oneDigit === 0) return tens[tenDigit];
    return `${ones[oneDigit]}und${tens[tenDigit]}`;
  };

  const getFullTimeSentence = (h, m) => {
    const hWord = getGermanHourWord(h);
    const mWord = getGermanMinuteWord(m);
    if (m === 0) {
      return `Es ist ${hWord} Uhr.`;
    }
    return `Es ist ${hWord} Uhr ${mWord}.`;
  };

  const currentSentence = getFullTimeSentence(hour, minute);

  const PRESETS = [
    { label: "01:00 (1 a.m.)", h: 1, m: 0, note: "ein Uhr (drop -s!)" },
    { label: "01:15 (1:15 a.m.)", h: 1, m: 15, note: "ein Uhr fünfzehn" },
    { label: "01:30 (1:30 a.m.)", h: 1, m: 30, note: "ein Uhr dreißig" },
    { label: "06:00 (6 a.m.)", h: 6, m: 0, note: "sechs Uhr" },
    { label: "12:00 (Noon)", h: 12, m: 0, note: "zwölf Uhr" },
    { label: "13:00 (1 p.m.)", h: 13, m: 0, note: "dreizehn Uhr" },
    { label: "13:15 (1:15 p.m.)", h: 13, m: 15, note: "dreizehn Uhr fünfzehn" },
    { label: "15:30 (3:30 p.m.)", h: 15, m: 30, note: "fünfzehn Uhr dreißig" },
    { label: "17:42 (Slide 38)", h: 17, m: 42, note: "siebzehn Uhr zweiundvierzig" },
    { label: "20:00 (8 p.m.)", h: 20, m: 0, note: "zwanzig Uhr (News time)" },
    { label: "20:45 (Slide 41)", h: 20, m: 45, note: "zwanzig Uhr fünfundvierzig" },
    { label: "00:00 (Midnight)", h: 0, m: 0, note: "null Uhr" }
  ];

  const UNITS = [
    {
      unit: "die Zeit",
      gender: "feminin",
      color: "bg-indigo-100 text-indigo-900 border-indigo-300",
      emoji: "⌛",
      sentence: "Die Zeit vergeht schnell.",
      en: "Time flies by.",
      note: "General concept of time: die Zeit."
    },
    {
      unit: "die Uhr / die Uhren",
      gender: "feminin",
      color: "bg-amber-100 text-amber-900 border-amber-300",
      emoji: "🕰️",
      sentence: "Die Uhr zeigt die Zeit.",
      en: "The clock shows the time.",
      note: "Means clock/watch, and is also spoken as 'o'clock'."
    },
    {
      unit: "die Woche / die Wochen",
      gender: "feminin",
      color: "bg-rose-100 text-rose-900 border-rose-300",
      emoji: "📅",
      sentence: "Eine Woche hat 7 Tage.",
      en: "A week has 7 days.",
      note: "Slide 4: 7 Tage = eine Woche."
    },
    {
      unit: "der Tag / die Tage",
      gender: "maskulin",
      color: "bg-blue-100 text-blue-900 border-blue-300",
      emoji: "☀️",
      sentence: "Ein Tag hat 24 Stunden.",
      en: "A day has 24 hours.",
      note: "Slide 6: 24 Stunden = ein Tag."
    },
    {
      unit: "die Stunde / die Stunden",
      gender: "feminin",
      color: "bg-teal-100 text-teal-900 border-teal-300",
      emoji: "⏳",
      sentence: "Eine Stunde hat 60 Minuten.",
      en: "An hour has 60 minutes.",
      note: "Slide 7: 60 Minuten = eine Stunde."
    },
    {
      unit: "die Minute / die Minuten",
      gender: "feminin",
      color: "bg-emerald-100 text-emerald-900 border-emerald-300",
      emoji: "⏱️",
      sentence: "Eine Minute hat 60 Sekunden.",
      en: "A minute has 60 seconds.",
      note: "Slide 8: 60 Sekunden = eine Minute."
    },
    {
      unit: "die Sekunde / die Sekunden",
      gender: "feminin",
      color: "bg-purple-100 text-purple-900 border-purple-300",
      emoji: "⚡",
      sentence: "Eine Sekunde ist sehr kurz.",
      en: "A second is very short.",
      note: "Slide 9: The fastest unit of time."
    }
  ];

  const EXERCISES = [
    {
      time: "20:45",
      slide: "Slide 41",
      german: "Es ist zwanzig Uhr fünfundvierzig.",
      english: "It is 20:45 / 8:45 p.m.",
      breakdown: "20 (zwanzig) + Uhr + 45 (fünfundvierzig)"
    },
    {
      time: "11:57",
      slide: "Slide 42",
      german: "Es ist elf Uhr siebenundfünfzig.",
      english: "It is 11:57 a.m.",
      breakdown: "11 (elf) + Uhr + 57 (siebenundfünfzig)"
    },
    {
      time: "22:28",
      slide: "Slide 43",
      german: "Es ist zweiundzwanzig Uhr achtundzwanzig.",
      english: "It is 22:28 / 10:28 p.m.",
      breakdown: "22 (zweiundzwanzig) + Uhr + 28 (achtundzwanzig)"
    },
    {
      time: "13:15",
      slide: "Slide 36",
      german: "Es ist dreizehn Uhr fünfzehn.",
      english: "It is 13:15 / 1:15 p.m.",
      breakdown: "13 (dreizehn) + Uhr + 15 (fünfzehn)"
    },
    {
      time: "15:30",
      slide: "Slide 37",
      german: "Es ist fünfzehn Uhr dreißig.",
      english: "It is 15:30 / 3:30 p.m.",
      breakdown: "15 (fünfzehn) + Uhr + 30 (dreißig)"
    },
    {
      time: "17:42",
      slide: "Slide 38",
      german: "Es ist siebzehn Uhr zweiundvierzig.",
      english: "It is 17:42 / 5:42 p.m.",
      breakdown: "17 (siebzehn) + Uhr + 42 (zweiundvierzig)"
    }
  ];

  const [activeExIdx, setActiveExIdx] = useState(0);
  const [exRevealed, setExRevealed] = useState(false);
  const currEx = EXERCISES[activeExIdx];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-700/80 rounded-full text-xs font-semibold text-indigo-200 mb-3 border border-indigo-500/40">
            <Clock className="w-3.5 h-3.5" />
            <span>Lesson 21: Die Uhrzeit Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            offizielle Zeit (24-Hour Digital Clock)
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Master the official German 24-hour time used in train stations, airports, and work schedules. Formula: <strong>[Stunde] + Uhr + [Minute]</strong>!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-indigo-800/60">
          <button
            onClick={() => { setActiveTab('simulator'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'simulator'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-indigo-950/70 text-indigo-100 hover:bg-indigo-900'
            }`}
          >
            ⏰ 24-Hour Clock Simulator
          </button>
          <button
            onClick={() => { setActiveTab('units'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'units'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-indigo-950/70 text-indigo-100 hover:bg-indigo-900'
            }`}
          >
            ⏳ Units of Time (Slides 2-9)
          </button>
          <button
            onClick={() => { setActiveTab('uebung'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'uebung'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-indigo-950/70 text-indigo-100 hover:bg-indigo-900'
            }`}
          >
            🎯 Classroom Übung (Slides 39-43)
          </button>
        </div>
      </div>

      {/* TAB 1: 24-HOUR CLOCK SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Interactive 24-Hour Clock Simulator
            </h3>
            <p className="text-stone-600 text-sm">
              Adjust the hours and minutes below or tap any preset to hear native German speech!
            </p>
          </div>

          {/* Digital Clock Display Card */}
          <div className="bg-stone-900 border-4 border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white max-w-2xl mx-auto text-center space-y-6">
            <div className="text-xs font-mono text-stone-400 uppercase tracking-widest">
              Digital 24-Hour Display
            </div>

            {/* Glowing Digits */}
            <div className="inline-block bg-black/80 px-8 py-5 rounded-2xl border-2 border-stone-700 shadow-inner font-mono text-5xl sm:text-7xl font-bold text-amber-400 tracking-wider">
              {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
            </div>

            {/* German Spoken Result */}
            <div
              onClick={() => speakGerman(currentSentence, isSlowMode)}
              className="bg-stone-800/90 hover:bg-stone-800 border-2 border-amber-400/80 p-5 rounded-2xl cursor-pointer group transition-all"
            >
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <Volume2 className="w-4 h-4 group-hover:animate-pulse" />
                <span>Tap to Listen</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-200">
                "{currentSentence}"
              </div>
              <div className="text-stone-400 text-xs mt-1">
                Formula: {hour} ({getGermanHourWord(hour)}) + <strong>Uhr</strong> {minute > 0 ? `+ ${minute} (${getGermanMinuteWord(minute)})` : ''}
              </div>
            </div>

            {/* Sliders Area */}
            <div className="space-y-4 pt-4 border-t border-stone-800 text-left">
              <div>
                <div className="flex justify-between text-xs font-bold text-stone-300 mb-1">
                  <span>Hours (Stunden: 0 - 23): {hour}</span>
                  <span className="text-amber-400 font-mono">{getGermanHourWord(hour)} Uhr</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={hour}
                  onChange={(e) => setHour(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-300 mb-1">
                  <span>Minutes (Minuten: 0 - 59): {minute}</span>
                  <span className="text-amber-400 font-mono">{minute > 0 ? getGermanMinuteWord(minute) : "punkt"}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="59"
                  value={minute}
                  onChange={(e) => setMinute(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Presets Grid */}
            <div className="pt-2 text-left">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Slide Example Presets:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setHour(p.h);
                      setMinute(p.m);
                      playChime('click');
                      const s = getFullTimeSentence(p.h, p.m);
                      speakGerman(s, isSlowMode);
                    }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left border ${
                      hour === p.h && minute === p.m
                        ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md scale-105'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
                    }`}
                  >
                    <div>{p.label}</div>
                    <div className="text-[10px] opacity-75 font-normal truncate">{p.note}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Golden One O'Clock Note */}
          <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs sm:text-sm text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>The Golden "1 o'clock" Drop Rule (Slide 14):</span>
            </div>
            <p>
              When saying 1 o'clock, the number <em>eins</em> drops its final <strong>-s</strong> before <em>Uhr</em>: say <strong>"Es ist ein Uhr"</strong>, NEVER <em>"eins Uhr"</em>!
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: UNITS OF TIME */}
      {activeTab === 'units' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              The Building Blocks of Time (Slides 2-9)
            </h3>
            <p className="text-stone-600 text-sm">
              From seconds to weeks: tap any card to hear the full German sentence spoken with correct gender!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {UNITS.map((u, idx) => (
              <div
                key={idx}
                onClick={() => speakGerman(`${u.unit}. ${u.sentence}`, isSlowMode)}
                className="bg-white border-2 border-stone-200 hover:border-amber-400 p-5 rounded-3xl transition-all cursor-pointer shadow-sm hover:shadow-md group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{u.emoji}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${u.color}`}>
                    {u.gender}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-stone-900 group-hover:text-amber-800">
                    {u.unit}
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">{u.note}</p>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 space-y-1">
                  <div className="text-sm font-bold text-stone-800 flex items-center justify-between">
                    <span>"{u.sentence}"</span>
                    <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-600" />
                  </div>
                  <div className="text-xs text-stone-500">{u.en}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Two Ways to Ask the Time */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 shadow-sm">
            <h4 className="font-black text-amber-950 text-base mb-3 flex items-center gap-2">
              <span>🗣️</span>
              <span>The 2 Ways to Ask "What time is it?" (Slides 12 &amp; 13):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => speakGerman("Wie spät ist es?", isSlowMode)}
                className="bg-white p-4 rounded-2xl border border-amber-200 cursor-pointer hover:border-amber-400 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 uppercase">Slide 12 Option 1</span>
                  <Volume2 className="w-4 h-4 text-amber-600 group-hover:animate-pulse" />
                </div>
                <div className="text-xl font-black text-stone-900 mt-1">Wie spät ist es?</div>
                <div className="text-xs text-stone-600 mt-0.5">Literal: "How late is it?"</div>
              </div>

              <div
                onClick={() => speakGerman("Wie viel Uhr ist es?", isSlowMode)}
                className="bg-white p-4 rounded-2xl border border-amber-200 cursor-pointer hover:border-amber-400 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 uppercase">Slide 13 Option 2</span>
                  <Volume2 className="w-4 h-4 text-amber-600 group-hover:animate-pulse" />
                </div>
                <div className="text-xl font-black text-stone-900 mt-1">Wie viel Uhr ist es?</div>
                <div className="text-xs text-stone-600 mt-0.5">Literal: "How much clock is it?"</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLASSROOM ÜBUNG */}
      {activeTab === 'uebung' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Classroom Übung (Slides 39 to 43)
            </h3>
            <p className="text-stone-600 text-sm">
              Practice reading official digital clocks. Try guessing first, then tap Reveal to listen!
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
                  <span>Reveal Official German Answer</span>
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
                    <div className="text-stone-300 text-sm mt-1">{currEx.english}</div>
                  </div>

                  <div className="bg-stone-800/50 p-3 rounded-xl border border-stone-700 text-xs text-stone-300">
                    💡 <strong>Formula Breakdown:</strong> {currEx.breakdown}
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
