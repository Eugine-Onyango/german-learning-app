import React, { useState } from 'react';
import { Volume2, Sparkles, Filter, Info, ShieldCheck, Heart } from 'lucide-react';
import { LESSON_5_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson5AlphabetSoundboard({ isSlowMode }) {
  const [filter, setFilter] = useState('all');
  const [activeLetterId, setActiveLetterId] = useState(null);

  const handleSpeak = (item) => {
    playChime('click');
    setActiveLetterId(item.id);
    speakGerman(item.audioText, isSlowMode, null, () => {
      setActiveLetterId(null);
    });
  };

  const filteredItems = LESSON_5_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'umlauts') return item.category === 'alphabet-umlauts' || item.category === 'alphabet-eszett';
    if (filter === 'special-sound') return item.category === 'alphabet-special-sound';
    if (filter === 'vowels') return item.category === 'alphabet-vowels';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-50 to-amber-100 border-2 border-rose-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🔤 🇩🇪 ✨</div>
        <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
          Lesson 5: Das Alphabet (A bis Z)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          The German alphabet has <strong>30 characters</strong>:  
          The 26 standard English letters + <strong>3 Umlauts (Ä, Ö, Ü)</strong> + <strong>1 Eszett (ß)</strong>!  
          Tap any letter below to hear how Germans pronounce both the letter and its everyday word!
        </p>
      </div>

      {/* The 4 Big Sound Shapeshifters (From the Slide) */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border-4 border-stone-800 shadow-2xl space-y-4">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
            Critical Slide Rules
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            The 4 Sound Shapeshifters & The "ß" Rule
          </h3>
          <p className="text-xs text-stone-300 max-w-lg mx-auto mt-1">
            These are the letters that sound completely different from English. Tap each to hear them!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* J = Y */}
          <div
            onClick={() => handleSpeak("J. Joghurt.")}
            className="bg-stone-800 hover:bg-stone-750 p-4 rounded-2xl border border-stone-700 cursor-pointer transition-all hover:scale-102"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-mono font-black text-amber-300">J = "Y"</span>
              <span className="text-2xl">🥣</span>
            </div>
            <div className="text-sm font-bold text-white">Joghurt (Yoghurt)</div>
            <p className="text-[11px] text-stone-400 mt-1">
              German 'J' sounds like English 'Y'! Letter name: <strong>yott</strong>.
            </p>
          </div>

          {/* V = F */}
          <div
            onClick={() => handleSpeak("V. Vogel.")}
            className="bg-stone-800 hover:bg-stone-750 p-4 rounded-2xl border border-stone-700 cursor-pointer transition-all hover:scale-102"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-mono font-black text-emerald-300">V = "F"</span>
              <span className="text-2xl">🐦</span>
            </div>
            <div className="text-sm font-bold text-white">Vogel (Bird)</div>
            <p className="text-[11px] text-stone-400 mt-1">
              German 'V' sounds like English 'F'! Letter name: <strong>fau</strong>.
            </p>
          </div>

          {/* W = V */}
          <div
            onClick={() => handleSpeak("W. Wolke.")}
            className="bg-stone-800 hover:bg-stone-750 p-4 rounded-2xl border border-stone-700 cursor-pointer transition-all hover:scale-102"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-mono font-black text-sky-300">W = "V"</span>
              <span className="text-2xl">☁️</span>
            </div>
            <div className="text-sm font-bold text-white">Wolke (Cloud)</div>
            <p className="text-[11px] text-stone-400 mt-1">
              German 'W' sounds like English 'V'! Letter name: <strong>way</strong>.
            </p>
          </div>

          {/* ß = Double SS */}
          <div
            onClick={() => handleSpeak("Eszett. Fuß.")}
            className="bg-stone-800 hover:bg-stone-750 p-4 rounded-2xl border border-stone-700 cursor-pointer transition-all hover:scale-102"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-mono font-black text-rose-300">ß = "SS"</span>
              <span className="text-2xl">🦶</span>
            </div>
            <div className="text-sm font-bold text-white">Fuß (Foot)</div>
            <p className="text-[11px] text-stone-400 mt-1">
              No letter begins with 'ß'! Sounds like double 'ss'. Letter: <strong>ess-tset</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border-3 border-stone-200 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
          <Filter className="w-4 h-4 text-amber-600" />
          <span>Filter:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All 30 Letters' },
            { id: 'umlauts', label: '✨ The 4 Special (Ä, Ö, Ü, ß)' },
            { id: 'special-sound', label: '🔄 Tricky Sounds (J, V, W, Z)' },
            { id: 'vowels', label: 'A, E, I, O, U' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => {
                setFilter(pill.id);
                playChime('click');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === pill.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-rose-100'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alphabet Grid (30 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {filteredItems.map((item) => {
          const isSpeaking = activeLetterId === item.id;
          const isSpecial = item.category === 'alphabet-umlauts' || item.category === 'alphabet-eszett';
          const isSoundSwap = item.category === 'alphabet-special-sound';

          let cardStyle = "bg-white border-stone-200 hover:border-amber-400";
          if (isSpecial) {
            cardStyle = "bg-rose-50/70 border-rose-300 hover:border-rose-500";
          } else if (isSoundSwap) {
            cardStyle = "bg-amber-50/70 border-amber-300 hover:border-amber-500";
          }

          if (isSpeaking) {
            cardStyle = "bg-amber-100 border-amber-500 ring-4 ring-amber-200 scale-103 shadow-lg";
          }

          return (
            <div
              key={item.id}
              onClick={() => handleSpeak(item)}
              className={`rounded-3xl border-3 p-4 flex flex-col justify-between transition-all cursor-pointer shadow-sm relative ${cardStyle}`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-black font-mono text-stone-900">
                    {item.letter}
                  </span>
                  <span className="text-2xl">{item.icon}</span>
                </div>

                <div className="mt-2">
                  <div className="text-sm font-black font-mono text-amber-950">
                    {item.german.split(' - ')[1]}
                  </div>
                  <div className="text-xs text-stone-500">
                    {item.english.split(' (')[0]}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-stone-100/80 text-[11px] font-mono text-stone-600">
                  Letter: <strong className="text-amber-800">{item.badge.split(' • ')[1] || item.pronunciation.split(' ')[0]}</strong>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-stone-400">
                <span>Tap to listen</span>
                <Volume2 className={`w-3.5 h-3.5 text-amber-700 ${isSpeaking ? 'animate-bounce' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
