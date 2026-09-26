import React, { useState } from 'react';
import { Volume2, Sparkles, ChevronLeft, ChevronRight, AlertCircle, Phone, Info } from 'lucide-react';
import { LESSON_3_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson3NumbersExplorer({ isSlowMode }) {
  const [selectedNumber, setSelectedNumber] = useState(0);

  // Find item for selected number (0-20)
  const currentItem = LESSON_3_ITEMS.find(item => item.number === selectedNumber) || LESSON_3_ITEMS[0];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  const handleNext = () => {
    if (selectedNumber < 20) {
      const next = selectedNumber + 1;
      setSelectedNumber(next);
      const item = LESSON_3_ITEMS.find(i => i.number === next);
      if (item) handleSpeak(item.audioText);
    }
  };

  const handlePrev = () => {
    if (selectedNumber > 0) {
      const prev = selectedNumber - 1;
      setSelectedNumber(prev);
      const item = LESSON_3_ITEMS.find(i => i.number === prev);
      if (item) handleSpeak(item.audioText);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🔢 ✨</div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
          Lesson 3: Zahlen (Numbers 0 - 20)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          In German: <strong>Zahl</strong> = single number, <strong>Zahlen</strong> = numbers!  
          Counting is as easy as building blocks. Tap any number or use the arrows to count step-by-step!
        </p>
      </div>

      {/* Number Buttons Bar (0 to 20) */}
      <div className="bg-white rounded-3xl p-4 border-3 border-stone-200 shadow-md">
        <div className="flex items-center justify-between text-xs font-black uppercase text-stone-400 mb-2 px-1">
          <span>Tap any number to jump:</span>
          <span className="text-amber-700">Currently: {selectedNumber}</span>
        </div>
        <div className="grid grid-cols-7 sm:grid-cols-11 gap-1.5 sm:gap-2">
          {LESSON_3_ITEMS.filter(i => i.number <= 20).map((item) => {
            const isSelected = item.number === selectedNumber;
            const isSpecial = item.number === 16 || item.number === 17;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedNumber(item.number);
                  handleSpeak(item.audioText);
                }}
                className={`py-2 rounded-xl font-mono font-black text-sm sm:text-base transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-amber-500 text-white scale-110 shadow-lg ring-3 ring-amber-300 z-10'
                    : isSpecial
                    ? 'bg-amber-100 text-amber-950 border border-amber-400 hover:bg-amber-200'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {item.number}
                {isSpecial && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Big Counter Stage */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border-4 border-stone-800 shadow-2xl relative overflow-hidden text-center">
        {/* Navigation arrows */}
        <div className="flex items-center justify-between max-w-xl mx-auto mb-4">
          <button
            onClick={handlePrev}
            disabled={selectedNumber === 0}
            className={`p-3 rounded-full border border-stone-700 text-white transition-all cursor-pointer ${
              selectedNumber === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-800 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-stone-400 text-xs font-mono uppercase tracking-widest">
            Number {selectedNumber} of 20
          </div>

          <button
            onClick={handleNext}
            disabled={selectedNumber === 20}
            className={`p-3 rounded-full border border-stone-700 text-white transition-all cursor-pointer ${
              selectedNumber === 20 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-800 active:scale-95'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Big Giant Digit */}
        <div className="text-7xl sm:text-9xl font-black text-amber-400 font-mono tracking-tight drop-shadow-md my-2 animate-gentle-bounce">
          {selectedNumber}
        </div>

        {/* German Word */}
        <div className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-wide">
          {currentItem.german.split(' - ')[1] || currentItem.german}
        </div>

        {/* Pronunciation guide */}
        <div className="mt-2 text-sm sm:text-base text-amber-200 font-sans">
          🗣️ Pronounce like: <span className="underline font-bold text-white bg-stone-800 px-2 py-0.5 rounded">{currentItem.pronunciation}</span>
        </div>

        {/* Listen Button */}
        <button
          onClick={() => handleSpeak(currentItem.audioText)}
          className="mt-5 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm rounded-full inline-flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Listen to "{currentItem.audioText}"</span>
        </button>

        {/* Visual dots counter (like counting coins or fingers) */}
        <div className="mt-6 pt-6 border-t border-stone-800 flex flex-wrap justify-center gap-1.5 max-w-md mx-auto">
          {Array.from({ length: selectedNumber }).map((_, idx) => (
            <span
              key={idx}
              className="w-4 h-4 rounded-full bg-amber-400 shadow-xs inline-block animate-pulse"
              style={{ animationDelay: `${idx * 40}ms` }}
            ></span>
          ))}
          {selectedNumber === 0 && (
            <span className="text-xs text-stone-500 italic">Zero items (null)</span>
          )}
        </div>
      </div>

      {/* 4 Critical Sound Secrets from the Slides */}
      <div className="bg-amber-50 border-3 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h3 className="text-lg font-black text-amber-950">
            4 Golden Sound Secrets (Direct from the Classroom Slides)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Rule 1: Z = TS */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 space-y-1">
            <span className="bg-amber-500 text-white font-mono font-black text-xs px-2 py-0.5 rounded">
              Z = TS
            </span>
            <h4 className="font-black text-stone-900 text-sm">zwei, zehn, zwanzig</h4>
            <p className="text-xs text-stone-600 leading-snug">
              Like in ma<strong>ts</strong>, po<strong>ts</strong>, bi<strong>ts</strong>! Never pronounce 'Z' like a buzzing bee. Always "TS"!
            </p>
          </div>

          {/* Rule 2: V = F */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 space-y-1">
            <span className="bg-amber-500 text-white font-mono font-black text-xs px-2 py-0.5 rounded">
              V = F
            </span>
            <h4 className="font-black text-stone-900 text-sm">vier, vierzehn</h4>
            <p className="text-xs text-stone-600 leading-snug">
              German 'V' sounds like an English 'F'. So <strong>vier</strong> sounds just like "FEER"!
            </p>
          </div>

          {/* Rule 3: EU = OI */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 space-y-1">
            <span className="bg-amber-500 text-white font-mono font-black text-xs px-2 py-0.5 rounded">
              EU = OI
            </span>
            <h4 className="font-black text-stone-900 text-sm">neun, neunzehn</h4>
            <p className="text-xs text-stone-600 leading-snug">
              Sounds like <strong>oil</strong>, coin, boy! So <strong>neun</strong> (9) sounds like "NOYN"!
            </p>
          </div>

          {/* Rule 4: -IG = -ICH */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 space-y-1">
            <span className="bg-amber-500 text-white font-mono font-black text-xs px-2 py-0.5 rounded">
              -IG = -ICH
            </span>
            <h4 className="font-black text-stone-900 text-sm">zwanzig (20)</h4>
            <p className="text-xs text-stone-600 leading-snug">
              At the end of numbers, '-ig' sounds soft like '-ich' ("TSVAN-tsikh")!
            </p>
          </div>
        </div>
      </div>

      {/* The 2 Sneaky Numbers: 16 and 17 Lego Blocks */}
      <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧱</span>
          <h3 className="text-lg font-black text-stone-900">
            How Teens (13 - 19) Are Built: Like Lego Blocks!
          </h3>
        </div>
        <p className="text-xs text-stone-600">
          In German, teen numbers are made by putting the single digit in front of <strong>zehn (10)</strong>:  
          <span className="font-mono bg-stone-100 px-2 py-0.5 rounded ml-1">3 (drei) + 10 (zehn) = 13 (dreizehn)</span>
        </p>

        {/* Watch out for 16 and 17 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* 16 */}
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-rose-900 text-sm">16: sechzehn (!)</span>
              <span className="text-xs font-bold bg-rose-200 text-rose-950 px-2 py-0.5 rounded-full">
                Drop the 's'
              </span>
            </div>
            <div className="font-mono text-base font-black text-stone-800 my-1">
              sech<span className="line-through text-rose-600 font-extrabold">s</span> + zehn = <span className="text-emerald-700">sechzehn</span>
            </div>
            <p className="text-xs text-stone-600">
              The number 6 is <em>sechs</em>. But when joining 10, the letter <strong>'s'</strong> takes a holiday! Say "ZEKH-tsayn".
            </p>
          </div>

          {/* 17 */}
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-rose-900 text-sm">17: siebzehn (!)</span>
              <span className="text-xs font-bold bg-rose-200 text-rose-950 px-2 py-0.5 rounded-full">
                Drop the 'en'
              </span>
            </div>
            <div className="font-mono text-base font-black text-stone-800 my-1">
              sieb<span className="line-through text-rose-600 font-extrabold">en</span> + zehn = <span className="text-emerald-700">siebzehn</span>
            </div>
            <p className="text-xs text-stone-600">
              The number 7 is <em>sieben</em>. But for 17, the <strong>'en'</strong> drops off! Say "ZEEP-tsayn".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
