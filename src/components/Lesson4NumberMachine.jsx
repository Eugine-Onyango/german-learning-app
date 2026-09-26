import React, { useState } from 'react';
import { Volume2, Sparkles, ArrowRight, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson4NumberMachine({ isSlowMode }) {
  const [onesDigit, setOnesDigit] = useState(1); // 1 to 9
  const [tensDigit, setTensDigit] = useState(20); // 20, 30, 40, 50, 60, 70, 80, 90

  const onesData = {
    1: { word: 'ein', label: '1 (eins drops "s" -> ein)', raw: 'ein' },
    2: { word: 'zwei', label: '2 (zwei)', raw: 'zwei' },
    3: { word: 'drei', label: '3 (drei)', raw: 'drei' },
    4: { word: 'vier', label: '4 (vier)', raw: 'vier' },
    5: { word: 'fünf', label: '5 (fünf)', raw: 'fünf' },
    6: { word: 'sechs', label: '6 (sechs)', raw: 'sechs' },
    7: { word: 'sieben', label: '7 (sieben)', raw: 'sieben' },
    8: { word: 'acht', label: '8 (acht)', raw: 'acht' },
    9: { word: 'neun', label: '9 (neun)', raw: 'neun' },
  };

  const tensData = {
    20: { word: 'zwanzig', label: '20 (zwanzig)' },
    30: { word: 'dreißig', label: '30 (dreißig - special "ß"!)' },
    40: { word: 'vierzig', label: '40 (vierzig)' },
    50: { word: 'fünfzig', label: '50 (fünfzig)' },
    60: { word: 'sechzig', label: '60 (sechzig - "s" dropped!)' },
    70: { word: 'siebzig', label: '70 (siebzig - "en" dropped!)' },
    80: { word: 'achtzig', label: '80 (achtzig)' },
    90: { word: 'neunzig', label: '90 (neunzig)' },
  };

  const currentNumber = tensDigit + onesDigit;
  const onesWord = onesData[onesDigit].word;
  const tensWord = tensData[tensDigit].word;
  const germanCombined = `${onesWord}und${tensWord}`;

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🔄 ✨</div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
          The German "Backwards" Number Machine!
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          In English, you say: <strong>Twenty-One (20 then 1)</strong>.  
          In German, they flip it backwards: <strong>One-and-Twenty (ein-und-zwanzig)</strong>!  
          Pick any ones digit and tens digit below to watch the formula build itself live!
        </p>
      </div>

      {/* The Interactive Machine Stage */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border-4 border-stone-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Big Digit Display */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
            Number in Digits
          </span>
          <div className="text-7xl sm:text-9xl font-black text-amber-400 font-mono tracking-tight drop-shadow-md animate-gentle-bounce">
            {currentNumber}
          </div>
        </div>

        {/* Visual Backwards Formula Display with Arrows */}
        <div className="bg-stone-800/90 rounded-2xl p-4 sm:p-6 border border-stone-700 max-w-xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
            Notice the Backwards Reading Order:
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl font-mono font-bold">
            {/* Step 1: Ones Digit */}
            <span className="bg-amber-400 text-stone-950 px-3 py-1.5 rounded-xl shadow-md font-black">
              {onesWord}
            </span>
            <span className="text-stone-400">+</span>
            {/* Step 2: und */}
            <span className="bg-stone-700 text-stone-200 px-3 py-1.5 rounded-xl">
              und
            </span>
            <span className="text-stone-400">+</span>
            {/* Step 3: Tens Digit */}
            <span className="bg-indigo-500 text-white px-3 py-1.5 rounded-xl shadow-md font-black">
              {tensWord}
            </span>
          </div>

          {/* Equal sign and full German word */}
          <div className="pt-2 border-t border-stone-700">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#f6c85f] font-mono tracking-wide">
              = {germanCombined}
            </div>
            <div className="text-xs text-stone-300 mt-1 font-sans">
              Literal Meaning: <em>"{onesDigit} and {tensDigit}"</em> ({currentNumber})
            </div>
          </div>
        </div>

        {/* Listen Button */}
        <div>
          <button
            onClick={() => handleSpeak(germanCombined)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm rounded-full inline-flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Listen to "{germanCombined}"</span>
          </button>
        </div>

        {/* Interactive Selector Dials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto pt-4 border-t border-stone-800 text-left">
          {/* Pick Ones Digit */}
          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
            <label className="text-xs font-bold text-amber-300 block mb-2 uppercase">
              1. Choose Ones Digit (1 - 9):
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setOnesDigit(num);
                    playChime('click');
                  }}
                  className={`py-2 rounded-xl font-mono font-bold text-sm transition-all cursor-pointer ${
                    onesDigit === num
                      ? 'bg-amber-400 text-stone-950 font-black scale-105 shadow-sm'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-stone-400 mt-1.5 block">
              Selected: <strong className="text-white">{onesData[onesDigit].label}</strong>
            </span>
          </div>

          {/* Pick Tens Digit */}
          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
            <label className="text-xs font-bold text-indigo-300 block mb-2 uppercase">
              2. Choose Tens Digit (20 - 90):
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[20, 30, 40, 50, 60, 70, 80, 90].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTensDigit(t);
                    playChime('click');
                  }}
                  className={`py-2 rounded-xl font-mono font-bold text-sm transition-all cursor-pointer ${
                    tensDigit === t
                      ? 'bg-indigo-500 text-white font-black scale-105 shadow-sm'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-stone-400 mt-1.5 block">
              Selected: <strong className="text-white">{tensData[tensDigit].label}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Exceptions Breakdown Cards */}
      <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-lg font-black text-stone-900">
            The 4 Crucial Exceptions in Lesson 4 (Keep an eye on these!)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Exception 1: einund... */}
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-1">
            <span className="bg-amber-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
              21, 31, 41...
            </span>
            <h4 className="font-black text-amber-950 text-sm">ein(s) + und...</h4>
            <p className="text-xs text-stone-600 leading-snug">
              The number 1 is <em>eins</em>, but in compound numbers the <strong>'s' drops off</strong>: <strong>einundzwanzig</strong> (never einsundzwanzig!).
            </p>
          </div>

          {/* Exception 2: 30 dreißig */}
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-300 space-y-1">
            <span className="bg-purple-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
              30 (The Rebel)
            </span>
            <h4 className="font-black text-purple-950 text-sm">dreißig (ß = ss!)</h4>
            <p className="text-xs text-stone-600 leading-snug">
              20 is zwan<strong>zig</strong>, 40 is vier<strong>zig</strong>... but 30 uses <strong>-ßig</strong>! Pronounce it: "DRY-sikh".
            </p>
          </div>

          {/* Exception 3: 60 sechzig */}
          <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-300 space-y-1">
            <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
              60 sechzig
            </span>
            <h4 className="font-black text-rose-950 text-sm">sech(s) + zig</h4>
            <p className="text-xs text-stone-600 leading-snug">
              Just like 16 (sechzehn), 60 drops the <strong>'s'</strong> from <em>sechs</em>. Say: <strong>sechzig</strong>!
            </p>
          </div>

          {/* Exception 4: 70 siebzig */}
          <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-300 space-y-1">
            <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
              70 siebzig
            </span>
            <h4 className="font-black text-rose-950 text-sm">sieb(en) + zig</h4>
            <p className="text-xs text-stone-600 leading-snug">
              Just like 17 (siebzehn), 70 drops the <strong>'en'</strong> from <em>sieben</em>. Say: <strong>siebzig</strong>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
