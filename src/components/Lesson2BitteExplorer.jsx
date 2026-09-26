import React, { useState } from 'react';
import { Volume2, Sparkles, HelpCircle, Check, X, Compass, Smile, HandHeart } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson2BitteExplorer({ isSlowMode }) {
  const [activeBitteScenario, setActiveBitteScenario] = useState('welcome');
  const [trafficLightChoice, setTrafficLightChoice] = useState('ja');

  const bitteScenarios = [
    {
      id: 'welcome',
      title: '1. You Are Welcome!',
      phrase: 'Bitte! / Bitte schön!',
      meaning: 'You are welcome! (After someone thanks you)',
      story: 'When someone says "Danke!" to you, you immediately smile and say "Bitte schön!". It is like saying "Don\'t mention it, my pleasure!"',
      avatar: '🤗'
    },
    {
      id: 'please',
      title: '2. Saying Please!',
      phrase: 'Bitte!',
      meaning: 'Please! (When requesting something)',
      story: 'When ordering tea, asking for directions, or asking someone to pass the salt: "Einen Moment, bitte!" (Just a moment, please!).',
      avatar: '🤲'
    },
    {
      id: 'pardon',
      title: '3. I Beg Your Pardon?',
      phrase: 'Wie bitte?',
      meaning: 'Pardon? What did you say?',
      story: 'When someone speaks too quietly, or the phone network cracks and you need them to repeat: "Wie bitte?" (Literally: "How, please?").',
      avatar: '👂'
    }
  ];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl animate-gentle-bounce mb-1">🪄 ✨</div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
          The Magic Word: "BITTE" (The Swiss Army Knife of German!)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          In German, one single word does 3 huge jobs! You do not need to memorize 10 different phrases. Tap each card below to see how easy it is:
        </p>
      </div>

      {/* Bitte interactive 3-tab explorer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bitteScenarios.map((sc) => {
          const isSelected = activeBitteScenario === sc.id;
          return (
            <div
              key={sc.id}
              onClick={() => {
                setActiveBitteScenario(sc.id);
                handleSpeak(sc.phrase);
              }}
              className={`rounded-3xl p-5 border-3 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-amber-500 shadow-xl scale-102 ring-4 ring-amber-200'
                  : 'bg-white/80 border-stone-200 hover:border-amber-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{sc.avatar}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {sc.title}
                  </span>
                </div>

                <div className="text-xl font-black text-stone-900 font-mono">
                  {sc.phrase}
                </div>
                <div className="text-xs font-bold text-amber-900 mt-1">
                  {sc.meaning}
                </div>

                <p className="text-xs text-stone-600 mt-3 leading-relaxed bg-amber-50/60 p-3 rounded-2xl border border-amber-100">
                  {sc.story}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-400">Click to listen</span>
                <button className="p-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Ja / Nein / Vielleicht (Traffic Light) */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border-4 border-stone-800 shadow-2xl text-center space-y-5">
        <div>
          <span className="text-xs font-black uppercase text-amber-400 tracking-widest block mb-1">
            Interactive Visual
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            The Traffic Light: Ja (Yes), Nein (No), Vielleicht (Maybe)
          </h3>
          <p className="text-xs text-stone-300 max-w-lg mx-auto mt-1">
            Just like traffic lights on the road! Tap any light to see the character react and hear how Germans say it.
          </p>
        </div>

        {/* Traffic Light Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* JA */}
          <button
            onClick={() => {
              setTrafficLightChoice('ja');
              handleSpeak('Ja!');
            }}
            className={`px-6 py-4 rounded-3xl font-black text-base flex items-center gap-3 transition-all cursor-pointer ${
              trafficLightChoice === 'ja'
                ? 'bg-emerald-500 text-white scale-108 shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-300'
                : 'bg-stone-800 text-emerald-400 hover:bg-stone-700 border border-emerald-500/30'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-emerald-400 animate-ping"></span>
            <div className="text-left">
              <div className="text-xl font-mono">Ja!</div>
              <div className="text-[10px] uppercase tracking-wider text-emerald-100">Yes! (Green)</div>
            </div>
          </button>

          {/* NEIN */}
          <button
            onClick={() => {
              setTrafficLightChoice('nein');
              handleSpeak('Nein!');
            }}
            className={`px-6 py-4 rounded-3xl font-black text-base flex items-center gap-3 transition-all cursor-pointer ${
              trafficLightChoice === 'nein'
                ? 'bg-rose-600 text-white scale-108 shadow-lg shadow-rose-600/40 ring-4 ring-rose-300'
                : 'bg-stone-800 text-rose-400 hover:bg-stone-700 border border-rose-500/30'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-rose-400 animate-ping"></span>
            <div className="text-left">
              <div className="text-xl font-mono">Nein!</div>
              <div className="text-[10px] uppercase tracking-wider text-rose-100">No! (Red)</div>
            </div>
          </button>

          {/* VIELLEICHT */}
          <button
            onClick={() => {
              setTrafficLightChoice('vielleicht');
              handleSpeak('Vielleicht');
            }}
            className={`px-6 py-4 rounded-3xl font-black text-base flex items-center gap-3 transition-all cursor-pointer ${
              trafficLightChoice === 'vielleicht'
                ? 'bg-amber-400 text-stone-900 scale-108 shadow-lg shadow-amber-400/40 ring-4 ring-amber-200'
                : 'bg-stone-800 text-amber-300 hover:bg-stone-700 border border-amber-400/30'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-amber-400 animate-ping"></span>
            <div className="text-left">
              <div className="text-xl font-mono">Vielleicht</div>
              <div className="text-[10px] uppercase tracking-wider text-stone-900">Maybe (Yellow)</div>
            </div>
          </button>
        </div>

        {/* Reaction stage */}
        <div className="bg-stone-800/80 p-5 rounded-2xl max-w-md mx-auto border border-stone-700 flex items-center justify-center gap-4">
          <div className="text-5xl animate-bounce">
            {trafficLightChoice === 'ja' && '✅ 🧑‍💼'}
            {trafficLightChoice === 'nein' && '❌ 🙅'}
            {trafficLightChoice === 'vielleicht' && '🤔 🤷'}
          </div>
          <div className="text-left">
            <div className="text-xs text-stone-400 font-mono">Pronunciation:</div>
            <div className="text-lg font-bold text-amber-300 font-mono">
              {trafficLightChoice === 'ja' && 'Sounds like "Yah!"'}
              {trafficLightChoice === 'nein' && 'Sounds like "Nine"'}
              {trafficLightChoice === 'vielleicht' && 'Sounds like "Fee-LYKHT"'}
            </div>
          </div>
        </div>
      </div>

      {/* Formal vs Informal Apologies breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 border-3 border-stone-200 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎩</span>
            <h4 className="font-black text-stone-900 text-base">
              Entschuldigen Sie, bitte!
            </h4>
          </div>
          <span className="inline-block bg-indigo-100 text-indigo-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase mb-2">
            Formal (Respectful)
          </span>
          <p className="text-xs text-stone-600 leading-relaxed">
            Notice the word <strong>"Sie"</strong> in the middle! Use this when addressing someone you want to show polite respect to (like asking an officer or elder for help).
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border-3 border-stone-200 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🚶</span>
            <h4 className="font-black text-stone-900 text-base">
              Entschuldigung, bitte!
            </h4>
          </div>
          <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase mb-2">
            Informal (Street / Bumping into someone)
          </span>
          <p className="text-xs text-stone-600 leading-relaxed">
            Notice it ends in <strong>"-ung"</strong>. Quick and easy! Use this when squeezing past someone in a crowded street or supermarket aisle.
          </p>
        </div>
      </div>
    </div>
  );
}
