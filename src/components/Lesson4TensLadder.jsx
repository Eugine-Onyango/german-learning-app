import React from 'react';
import { Volume2, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson4TensLadder({ isSlowMode }) {
  const tensList = [
    { num: 20, word: 'zwanzig', note: 'Base 20', special: false, sound: 'TSVAN-tsikh' },
    { num: 30, word: 'dreißig', note: 'Rebel: ends in -ßig!', special: true, sound: 'DRY-sikh' },
    { num: 40, word: 'vierzig', note: 'vier + zig (V = F)', special: false, sound: 'FEER-tsikh' },
    { num: 50, word: 'fünfzig', note: 'fünf + zig', special: false, sound: 'FEWNF-tsikh' },
    { num: 60, word: 'sechzig', note: 'sech<s> + zig (drop "s")', special: true, sound: 'ZEKH-tsikh' },
    { num: 70, word: 'siebzig', note: 'sieb<en> + zig (drop "en")', special: true, sound: 'ZEEP-tsikh' },
    { num: 80, word: 'achtzig', note: 'acht + zig', special: false, sound: 'AHKHT-tsikh' },
    { num: 90, word: 'neunzig', note: 'neun + zig (EU = OI)', special: false, sound: 'NOYN-tsikh' },
    { num: 100, word: '(ein)hundert', note: 'A hundred / one hundred', special: false, sound: 'AYN-hoon-dert' },
  ];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-200 border-2 border-indigo-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🪜 📈</div>
        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950">
          The Tens Ladder: 20 to 100
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto mt-2 leading-relaxed">
          Climb up by tens! Notice how all of them end in <strong>-zig</strong>, except the rebel <strong>30 (dreißig)</strong> which uses <strong>-ßig</strong>!
        </p>
      </div>

      {/* Ladder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tensList.map((item) => (
          <div
            key={item.num}
            onClick={() => handleSpeak(item.word)}
            className={`p-4 rounded-3xl border-3 transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow-md ${
              item.special
                ? 'bg-amber-50 border-amber-400 hover:border-amber-500'
                : item.num === 100
                ? 'bg-emerald-50 border-emerald-400 hover:border-emerald-500 sm:col-span-3'
                : 'bg-white border-stone-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-lg ${
                item.special ? 'bg-amber-200 text-amber-950' : item.num === 100 ? 'bg-emerald-200 text-emerald-950' : 'bg-indigo-100 text-indigo-950'
              }`}>
                {item.num}
              </span>

              <div>
                <div className="text-lg font-black font-mono text-stone-900">
                  {item.word}
                </div>
                <div className="text-xs text-stone-500">
                  Pronounce: <strong className="text-stone-700">{item.sound}</strong>
                </div>
                <div className="text-[11px] font-bold text-amber-800 mt-0.5">
                  {item.note}
                </div>
              </div>
            </div>

            <button
              className="p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer"
              title="Listen"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
