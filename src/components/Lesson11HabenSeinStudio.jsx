import React, { useState } from 'react';
import { Volume2, Sparkles, Crown, Diamond, CheckCircle2, User, Users, Heart, Home, Car, Dog, Clock } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson11HabenSeinStudio({ isSlowMode }) {
  const [activeVerbView, setActiveVerbView] = useState('both'); // 'both', 'sein', 'haben'
  const [selectedPronounIndex, setSelectedPronounIndex] = useState(0);

  const conjugationTable = [
    {
      pronoun: 'ich',
      pronounMeaning: 'I',
      sein: 'bin',
      seinAudio: 'ich bin',
      haben: 'habe',
      habenAudio: 'ich habe',
      seinExample: 'Ich bin 23 Jahre alt.',
      habenExample: 'Ich habe ein Haus.'
    },
    {
      pronoun: 'du',
      pronounMeaning: 'you (informal)',
      sein: 'bist',
      seinAudio: 'du bist',
      haben: 'hast',
      habenAudio: 'du hast',
      seinExample: 'Bist du verliebt?',
      habenExample: 'Hast du eine Freundin?'
    },
    {
      pronoun: 'er / sie / es',
      pronounMeaning: 'he / she / it',
      sein: 'ist',
      seinAudio: 'er ist, sie ist, es ist',
      haben: 'hat',
      habenAudio: 'er hat, sie hat, es hat',
      seinExample: 'Er ist verheiratet. / Sabine ist Lehrerin.',
      habenExample: 'Er hat keine Zeit. / Maria hat eine Tochter.'
    },
    {
      pronoun: 'wir',
      pronounMeaning: 'we',
      sein: 'sind',
      seinAudio: 'wir sind',
      haben: 'haben',
      habenAudio: 'wir haben',
      seinExample: 'Wir sind glücklich.',
      habenExample: 'Wir haben ein Auto.'
    },
    {
      pronoun: 'ihr',
      pronounMeaning: 'you all (informal)',
      sein: 'seid',
      seinAudio: 'ihr seid',
      haben: 'habt',
      habenAudio: 'ihr habt',
      seinExample: 'Seid ihr glücklich?',
      habenExample: 'Habt ihr Kinder?'
    },
    {
      pronoun: 'Sie',
      pronounMeaning: 'You (formal)',
      sein: 'sind',
      seinAudio: 'Sie sind',
      haben: 'haben',
      habenAudio: 'Sie haben',
      seinExample: 'Frau Schmidt, sind Sie zu Hause?',
      habenExample: 'Frau Schmidt, haben Sie einen Moment?'
    },
    {
      pronoun: 'sie',
      pronounMeaning: 'they (plural)',
      sein: 'sind',
      seinAudio: 'sie sind',
      haben: 'haben',
      habenAudio: 'sie haben',
      seinExample: 'Meine Nachbarn sind sehr nett.',
      habenExample: 'Meine Eltern haben einen Hund.'
    }
  ];

  const seinSentences = [
    { de: 'Sabine ist Lehrerin.', en: 'Sabine is a teacher.', verb: 'ist', icon: '🧑‍🏫' },
    { de: 'Meine Nachbarn sind sehr nett.', en: 'My neighbors are very nice.', verb: 'sind', icon: '🏡' },
    { de: 'Frau Schmidt, sind Sie zu Hause?', en: 'Frau Schmidt, are you at home?', verb: 'sind', icon: '🚪' },
    { de: 'Er ist verheiratet.', en: 'He is married.', verb: 'ist', icon: '💍' },
    { de: 'Wir sind glücklich.', en: 'We are happy.', verb: 'sind', icon: '😊' },
    { de: 'Seid ihr glücklich?', en: 'Are you all happy?', verb: 'seid', icon: '🎉' },
    { de: 'Ich bin 23 Jahre alt.', en: 'I am 23 years old.', verb: 'bin', icon: '🎂' },
    { de: 'Bist du verliebt?', en: 'Are you in love?', verb: 'bist', icon: '❤️' },
  ];

  const habenSentences = [
    { de: 'Maria hat eine Tochter.', en: 'Marie has a daughter.', verb: 'hat', icon: '👧' },
    { de: 'Meine Eltern haben einen Hund.', en: 'My parents have a dog.', verb: 'haben', icon: '🐕' },
    { de: 'Frau Schmidt, haben Sie einen Moment?', en: 'Frau Schmidt, do you have a moment?', verb: 'haben', icon: '⏱️' },
    { de: 'Er hat keine Zeit.', en: 'He has no time.', verb: 'hat', icon: '⏳' },
    { de: 'Wir haben ein Auto.', en: 'We have a car.', verb: 'haben', icon: '🚗' },
    { de: 'Habt ihr Kinder?', en: 'Do you (all) have children?', verb: 'habt', icon: '👶' },
    { de: 'Ich habe ein Haus.', en: 'I have a house.', verb: 'habe', icon: '🏠' },
    { de: 'Hast du eine Freundin?', en: 'Do you have a girlfriend?', verb: 'hast', icon: '👫' },
  ];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  const activeRow = conjugationTable[selectedPronounIndex];

  return (
    <div className="space-y-6">
      {/* Friendly Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">👑 💎 ⚓ 🤲</div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
          Lesson 11: Hilfsverben — sein (to be) & haben (to have)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          Meet the two Royal Pillar Verbs of the German language:  
          <strong className="text-amber-900 font-bold"> King "sein" (who you are, age, feelings)</strong> and  
          <strong className="text-indigo-900 font-bold"> Queen "haben" (what you have, family, pets, time)</strong>!
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => {
            setActiveVerbView('both');
            playChime('click');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeVerbView === 'both'
              ? 'bg-stone-900 text-amber-300 shadow-md ring-2 ring-amber-400 scale-102'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <span>⚖️ Side-by-Side Comparison</span>
        </button>

        <button
          onClick={() => {
            setActiveVerbView('sein');
            playChime('click');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeVerbView === 'sein'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300 scale-102'
              : 'bg-white text-stone-700 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span>👑 King "sein" (to be)</span>
        </button>

        <button
          onClick={() => {
            setActiveVerbView('haben');
            playChime('click');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeVerbView === 'haben'
              ? 'bg-indigo-700 text-white shadow-md ring-2 ring-indigo-300 scale-102'
              : 'bg-white text-stone-700 hover:bg-indigo-100 border border-indigo-200'
          }`}
        >
          <span>💎 Queen "haben" (to have)</span>
        </button>
      </div>

      {/* Interactive Pronoun Selector & Live Conjugator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md space-y-6">
        <div className="border-b border-stone-100 pb-3">
          <span className="text-xs font-black uppercase text-stone-500 tracking-wider block">
            Step 1: Pick Any Pronoun to Watch Both Verbs Transform:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-2">
            {conjugationTable.map((row, idx) => (
              <button
                key={row.pronoun}
                onClick={() => {
                  setSelectedPronounIndex(idx);
                  playChime('click');
                }}
                className={`p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer ${
                  selectedPronounIndex === idx
                    ? 'bg-stone-900 text-amber-300 border-stone-950 shadow-md font-bold scale-102'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold'
                }`}
              >
                <div className="font-mono text-sm">{row.pronoun}</div>
                <div className="text-[10px] text-stone-400 font-normal">{row.pronounMeaning}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Transformation Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* King sein Card */}
          {(activeVerbView === 'both' || activeVerbView === 'sein') && (
            <div
              onClick={() => handleSpeak(`${activeRow.pronoun} ${activeRow.sein}. ${activeRow.seinExample}`)}
              className="p-6 rounded-3xl bg-amber-50 border-3 border-amber-300 hover:bg-amber-100/70 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>sein (to be)</span>
                </span>
                <Volume2 className="w-5 h-5 text-amber-700 group-hover:scale-110" />
              </div>

              <div className="flex items-baseline gap-2 font-mono text-3xl font-black text-amber-950">
                <span>{activeRow.pronoun}</span>
                <span className="text-amber-600 underline decoration-wavy">{activeRow.sein}</span>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-amber-200 text-xs sm:text-sm">
                <span className="text-[10px] text-stone-400 block">Slide Example:</span>
                <strong className="text-amber-950 font-mono block text-sm sm:text-base">
                  {activeRow.seinExample}
                </strong>
              </div>
            </div>
          )}

          {/* Queen haben Card */}
          {(activeVerbView === 'both' || activeVerbView === 'haben') && (
            <div
              onClick={() => handleSpeak(`${activeRow.pronoun} ${activeRow.haben}. ${activeRow.habenExample}`)}
              className="p-6 rounded-3xl bg-indigo-50 border-3 border-indigo-300 hover:bg-indigo-100/70 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-900 bg-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Diamond className="w-3.5 h-3.5" />
                  <span>haben (to have)</span>
                </span>
                <Volume2 className="w-5 h-5 text-indigo-700 group-hover:scale-110" />
              </div>

              <div className="flex items-baseline gap-2 font-mono text-3xl font-black text-indigo-950">
                <span>{activeRow.pronoun}</span>
                <span className="text-indigo-600 underline decoration-wavy">{activeRow.haben}</span>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-indigo-200 text-xs sm:text-sm">
                <span className="text-[10px] text-stone-400 block">Slide Example:</span>
                <strong className="text-indigo-950 font-mono block text-sm sm:text-base">
                  {activeRow.habenExample}
                </strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complete Tables for Both (Direct from Slides 2 & 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* sein Full Table */}
        <div className="bg-white rounded-3xl p-5 border-3 border-amber-200 shadow-md space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <Crown className="w-5 h-5 text-amber-600" />
            <h4 className="font-mono font-black text-amber-950 text-base">
              Full Table: sein (to be)
            </h4>
          </div>
          <div className="space-y-1 text-xs sm:text-sm font-mono">
            {conjugationTable.map((item) => (
              <div
                key={item.pronoun}
                onClick={() => handleSpeak(`${item.pronoun} ${item.sein}`)}
                className="p-2 rounded-xl bg-amber-50/60 hover:bg-amber-100 border border-amber-200/60 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-stone-500 w-24 text-xs font-sans">{item.pronoun}</span>
                  <span className="text-amber-900 font-black text-base">{item.sein}</span>
                </div>
                <Volume2 className="w-4 h-4 text-amber-600" />
              </div>
            ))}
          </div>
        </div>

        {/* haben Full Table */}
        <div className="bg-white rounded-3xl p-5 border-3 border-indigo-200 shadow-md space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <Diamond className="w-5 h-5 text-indigo-600" />
            <h4 className="font-mono font-black text-indigo-950 text-base">
              Full Table: haben (to have)
            </h4>
          </div>
          <div className="space-y-1 text-xs sm:text-sm font-mono">
            {conjugationTable.map((item) => (
              <div
                key={item.pronoun}
                onClick={() => handleSpeak(`${item.pronoun} ${item.haben}`)}
                className="p-2 rounded-xl bg-indigo-50/60 hover:bg-indigo-100 border border-indigo-200/60 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-stone-500 w-24 text-xs font-sans">{item.pronoun}</span>
                  <span className="text-indigo-900 font-black text-base">{item.haben}</span>
                </div>
                <Volume2 className="w-4 h-4 text-indigo-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-World Slide Sentences Gallery */}
      <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="font-black text-stone-900 text-sm sm:text-base flex items-center gap-2">
            <span>📖</span>
            <span>All 16 Slide Sentences: Tap Any to Listen</span>
          </h3>
          <span className="text-xs text-stone-400">Slides 4-12</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[...seinSentences, ...habenSentences].map((s, idx) => (
            <div
              key={idx}
              onClick={() => handleSpeak(s.de)}
              className="p-3.5 rounded-2xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="font-mono font-bold text-stone-900 text-sm group-hover:text-amber-900">
                    {s.de}
                  </div>
                  <div className="text-[11px] text-stone-500">{s.en}</div>
                </div>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-600 flex-shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Slide 15 Subjekt Spotter Highlight */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 border-4 border-stone-800 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
          <span className="text-xl">🎯</span>
          <h4 className="font-mono font-black text-amber-400 text-sm sm:text-base uppercase tracking-wider">
            Slide 15 Rule: Spotting the Subjekt
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-stone-300">
          The <strong>Subjekt</strong> is the captain who decides the verb form. Always ask: <em>"WHO is doing the action?"</em>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-stone-800 border border-stone-700 space-y-1">
            <span className="font-mono text-base font-bold text-white block">
              <span className="text-cyan-400 underline decoration-2">Ich</span> habe ein Auto.
            </span>
            <span className="text-xs text-stone-400 block">
              👉 <strong>Ich</strong> is the Subjekt! It controls the verb <em>habe</em>.
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-stone-800 border border-stone-700 space-y-1">
            <span className="font-mono text-base font-bold text-white block">
              Sind <span className="text-amber-400 underline decoration-2">Sie</span> verheiratet?
            </span>
            <span className="text-xs text-stone-400 block">
              👉 <strong>Sie</strong> is the Subjekt! It controls the verb <em>sind</em>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
