import React, { useState } from 'react';
import { Volume2, Sun, Moon, Coffee, Sunset, Sparkles, AlertCircle } from 'lucide-react';
import { TIME_OF_DAY_STAGES } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function TimeOfDayExplorer({ isSlowMode }) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stage = TIME_OF_DAY_STAGES[activeStageIndex];

  const handleSpeak = (text) => {
    playChime('click');
    setIsSpeaking(true);
    speakGerman(text, isSlowMode, null, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <div className="space-y-6">
      {/* Intro title */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 flex items-center justify-center gap-2">
          <span>☀️</span>
          <span>Sun & Moon: Greetings By Time of Day</span>
          <span>🌙</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          Just like greeting someone <span className="font-bold text-amber-900">"Good morning"</span> over hot morning tea, and <span className="font-bold text-amber-900">"Good night"</span> when going to bed—Germans have 4 simple greetings based on the sun and moon!
        </p>
      </div>

      {/* Interactive Stage Picker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {TIME_OF_DAY_STAGES.map((st, idx) => {
          const isSelected = idx === activeStageIndex;
          return (
            <button
              key={st.id}
              onClick={() => {
                setActiveStageIndex(idx);
                playChime('click');
                handleSpeak(st.german);
              }}
              className={`p-3 sm:p-4 rounded-2xl text-left border-3 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-lg scale-103'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{st.icon}</span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-amber-700 text-amber-100' : 'bg-stone-100 text-stone-600'
                }`}>
                  Stage {idx + 1}
                </span>
              </div>
              <div className="mt-2">
                <div className="font-black text-sm sm:text-base leading-tight">
                  {st.german}
                </div>
                <div className={`text-[11px] font-medium mt-0.5 ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                  {st.english}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Animated Canvas Window */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 border-4 border-stone-800 shadow-2xl transition-all duration-700 bg-gradient-to-b ${stage.skyClass}`}>
        {/* Animated Sky Elements */}
        {activeStageIndex === 0 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-amber-300 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-8 right-16 text-5xl animate-bounce">
              🐓
            </div>
            <div className="absolute top-12 left-10 text-4xl animate-cloud">
              ☁️
            </div>
          </div>
        )}

        {activeStageIndex === 1 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-1/4 w-28 h-28 bg-yellow-300 rounded-full blur-2xl opacity-80 animate-spin"></div>
            <div className="absolute top-8 right-1/4 text-6xl animate-pulse">
              ☀️
            </div>
            <div className="absolute top-16 left-12 text-5xl animate-cloud">
              ⛅
            </div>
          </div>
        )}

        {activeStageIndex === 2 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-6 right-1/3 w-36 h-36 bg-orange-500 rounded-full blur-3xl opacity-80"></div>
            <div className="absolute bottom-12 right-1/3 text-6xl">
              🌅
            </div>
            <div className="absolute top-10 left-20 text-3xl opacity-80 animate-gentle-bounce">
              🕊️
            </div>
          </div>
        )}

        {activeStageIndex === 3 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-6 right-16 text-6xl animate-pulse">
              🌙
            </div>
            <div className="absolute top-10 left-12 text-yellow-200 text-2xl animate-ping">✨</div>
            <div className="absolute top-24 left-1/3 text-yellow-100 text-xl animate-pulse">⭐</div>
            <div className="absolute top-8 right-1/3 text-yellow-200 text-2xl animate-pulse">✨</div>
            <div className="absolute bottom-16 right-1/4 text-yellow-100 text-3xl animate-ping">⭐</div>
          </div>
        )}

        {/* Foreground Scene Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          {/* Animated Avatar with Speech Bubble */}
          <div className="flex flex-col items-center text-center">
            {/* Speech bubble */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border-3 border-stone-800 relative mb-4 max-w-xs animate-gentle-bounce">
              <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider block">
                {stage.timeLabel}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono mt-1">
                {stage.german}
              </div>
              <div className="text-sm font-bold text-emerald-700 mt-1">
                "{stage.english}"
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-12 border-t-white"></div>
            </div>

            {/* Cartoon character avatar */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-200 rounded-full border-4 border-stone-800 flex items-center justify-center text-5xl sm:text-6xl shadow-xl">
                {activeStageIndex === 0 && '🧑‍🌾'}
                {activeStageIndex === 1 && '🧑‍💼'}
                {activeStageIndex === 2 && '🧑‍🍳'}
                {activeStageIndex === 3 && '😴'}
              </div>
              <span className="absolute -right-2 top-0 text-3xl animate-wave">
                👋
              </span>
            </div>

            {/* Play Sound Button */}
            <button
              onClick={() => handleSpeak(stage.german)}
              className={`mt-4 px-5 py-2.5 rounded-full font-black text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-stone-900 animate-pulse'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'Speaking...' : `Listen to "${stage.german}"`}</span>
            </button>
          </div>

          {/* Context & Kenyan story box */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-3 border-stone-800 shadow-xl max-w-md w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{stage.icon}</span>
              <h3 className="text-lg font-black text-stone-900">
                {stage.english}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                <strong className="text-amber-950 block mb-1">🇰🇪 Everyday Kenyan Analogy:</strong>
                {stage.kenyanScene}
              </p>

              <div className="bg-stone-100 p-3 rounded-2xl border border-stone-200">
                <strong className="text-stone-900 block mb-1">🗣️ English Meaning:</strong>
                {stage.english}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Golden Layman Rule Box: Guten vs Gute */}
      <div className="bg-amber-50 border-3 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 bg-amber-400 text-stone-900 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
          💡
        </div>
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-black text-amber-950">
            Simple Secret to Remember (Layman Rule): "Guten" vs "Gute"
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Notice carefully: Morning, Daytime, and Evening all start with <span className="font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">Guten</span> (Guten Morgen, Guten Tag, Guten Abend).
            But when tucking into bed, it has NO letter <strong>"n"</strong>! It is <span className="font-black text-emerald-800 bg-emerald-200 px-1.5 py-0.5 rounded">Gute Nacht!</span>.
            Because sweet dreams are peaceful with no sharp endings!
          </p>
        </div>
      </div>
    </div>
  );
}
