import React from 'react';
import { Volume2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Header({
  currentLesson,
  setCurrentLesson,
  activeTab,
  setActiveTab,
  isSlowMode,
  setIsSlowMode
}) {
  const handleTestAudio = () => {
    playChime('click');
    let msg = "Hallo! Guten Tag!";
    if (currentLesson === 2) msg = "Danke schön! Vielen Dank! Bitte sehr!";
    if (currentLesson === 3) msg = "null, eins, zwei, drei, vier, fünf! Meine Handynummer ist...";
    if (currentLesson === 4) msg = "einundzwanzig, dreißig, sechzig, siebzig, einhundert!";
    if (currentLesson === 5) msg = "Das Alphabet: A, B, C, D, E, F, G! Joghurt, Vogel, Wolke, Fuß!";
    if (currentLesson === 6) msg = "Hallo! Mein Name ist Monika Schmidt. Ich wohne in Berlin und ich spreche Deutsch!";
    speakGerman(msg, isSlowMode);
  };

  const lesson1NavItems = [
    { id: 'cards', label: '📖 Lesson 1 Cards', sub: 'Stories & Everyday Analogies' },
    { id: 'time', label: '☀️ Sun & Moon Clock', sub: 'Morning, Day, Evening, Night' },
    { id: 'phone', label: '👀 Eyes vs 👂 Ears', sub: 'In Person vs On Phone' },
    { id: 'game', label: '🚐 Matatu Greeting Game', sub: 'Passenger Scenario Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson2NavItems = [
    { id: 'cards', label: '📖 Lesson 2 Cards', sub: 'Common Polite Phrases' },
    { id: 'bitte', label: '🪄 The Magic Word "Bitte"', sub: 'Please, Welcome & Traffic Light' },
    { id: 'game2', label: '💬 Polite Situation Game', sub: 'Real Life Practice' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson3NavItems = [
    { id: 'cards', label: '📖 Lesson 3 Cards', sub: 'Numbers 0 - 20 & Handynummer' },
    { id: 'numbers', label: '🔢 Interactive Counter', sub: '0-20 Stepper & Sound Rules' },
    { id: 'dialer', label: '📱 Handynummer Dialpad', sub: 'Mobile Phone Simulator' },
    { id: 'game3', label: '🎮 Numbers Quiz Game', sub: 'Drops & Sound Practice' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson4NavItems = [
    { id: 'cards', label: '📖 Lesson 4 Cards', sub: 'Numbers 21 - 100 Cards' },
    { id: 'machine', label: '🔄 Backwards Machine', sub: 'Interactive Number Generator' },
    { id: 'ladder', label: '🪜 Tens Ladder', sub: '20, 30, 40... up to 100' },
    { id: 'game4', label: '🎮 21-100 Quiz Game', sub: 'Rule Challenges & Shopping' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson5NavItems = [
    { id: 'cards', label: '📖 Lesson 5 Cards', sub: 'All 30 Letters & Words' },
    { id: 'alphabet', label: '🔤 Alphabet Soundboard', sub: '30 Interactive Letter Keys' },
    { id: 'game5', label: '🎮 Alphabet Quiz Game', sub: 'Umlauts & Sound Swaps' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson6NavItems = [
    { id: 'cards', label: '📖 Lesson 6 Cards', sub: 'Name, Origin, Age & Job' },
    { id: 'builder', label: '🆔 Profile Builder', sub: 'Custom German ID & Audio' },
    { id: 'game6', label: '🎮 Intro Quiz Game', sub: 'Self-Introduction Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  let navItems = lesson1NavItems;
  if (currentLesson === 2) navItems = lesson2NavItems;
  if (currentLesson === 3) navItems = lesson3NavItems;
  if (currentLesson === 4) navItems = lesson4NavItems;
  if (currentLesson === 5) navItems = lesson5NavItems;
  if (currentLesson === 6) navItems = lesson6NavItems;

  return (
    <header className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-b-4 border-amber-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        {/* Top bar with reassurance and audio settings */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-gentle-bounce">🇩🇪</span>
            <span className="text-2xl font-bold text-amber-900 tracking-tight">
              German Made Simple
            </span>
            <span className="text-3xl animate-gentle-bounce">🇰🇪</span>
          </div>

          {/* Calming reassurance badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Jargon • Pure Layman Analogies • No Panic</span>
          </div>

          {/* Audio options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsSlowMode(!isSlowMode);
                playChime('click');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isSlowMode
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                  : 'bg-white text-stone-700 border border-amber-300 hover:bg-amber-100'
              }`}
              title="Speak slower so you can hear each syllable clearly"
            >
              <span>🐢</span>
              <span>{isSlowMode ? 'Slow Voice: ON' : 'Slow Voice (Off)'}</span>
            </button>

            <button
              onClick={handleTestAudio}
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
              title="Test pronunciation audio"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Test Audio</span>
            </button>
          </div>
        </div>

        {/* Lesson Switcher Buttons (Lesson 1, 2, 3, 4, 5) */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wide">
              Lesson:
            </span>
            <button
              onClick={() => {
                setCurrentLesson(1);
                setActiveTab('cards');
                playChime('click');
              }}
              className={`px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                currentLesson === 1
                  ? 'bg-amber-600 text-white shadow-md scale-102 ring-2 ring-amber-300'
                  : 'bg-white text-stone-700 hover:bg-amber-200/60 border border-amber-300'
              }`}
            >
              👋 1: Greetings
            </button>
            <button
              onClick={() => {
                setCurrentLesson(2);
                setActiveTab('cards');
                playChime('click');
              }}
              className={`px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                currentLesson === 2
                  ? 'bg-emerald-700 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                  : 'bg-white text-stone-700 hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              💬 2: Phrases
            </button>
            <button
              onClick={() => {
                setCurrentLesson(3);
                setActiveTab('cards');
                playChime('click');
              }}
              className={`px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                currentLesson === 3
                  ? 'bg-indigo-700 text-white shadow-md scale-102 ring-2 ring-indigo-300'
                  : 'bg-white text-stone-700 hover:bg-indigo-100 border border-indigo-300'
              }`}
            >
              🔢 3: 0 - 20 & Handy
            </button>
            <button
              onClick={() => {
                setCurrentLesson(4);
                setActiveTab('cards');
                playChime('click');
              }}
              className={`px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                currentLesson === 4
                  ? 'bg-purple-700 text-white shadow-md scale-102 ring-2 ring-purple-300'
                  : 'bg-white text-stone-700 hover:bg-purple-100 border border-purple-300'
              }`}
            >
              🔄 4: 21 - 100
            </button>
            <button
              onClick={() => {
                setCurrentLesson(5);
                setActiveTab('cards');
                playChime('click');
              }}
              className={`px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                currentLesson === 5
                  ? 'bg-rose-700 text-white shadow-md scale-102 ring-2 ring-rose-300'
                  : 'bg-white text-stone-700 hover:bg-rose-100 border border-rose-300'
              }`}
            >
              🔤 5: Das Alphabet
            </button>
            <button
              onClick={() => {
                setCurrentLesson(6);
                setActiveTab('cards');
                playChime('click');
              }}
              className={`px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                currentLesson === 6
                  ? 'bg-sky-700 text-white shadow-md scale-102 ring-2 ring-sky-300'
                  : 'bg-white text-stone-700 hover:bg-sky-100 border border-sky-300'
              }`}
            >
              🤝 6: Sich Vorstellen
            </button>
          </div>

          <span className="text-[11px] text-stone-500 italic hidden sm:inline">
            💡 Click any speaker icon to hear crystal clear native pronunciation
          </span>
        </div>

        {/* Navigation Tabs for Active Lesson */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  playChime('click');
                }}
                className={`flex-shrink-0 px-3 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-amber-300 shadow-md scale-102 ring-2 ring-amber-400'
                    : 'bg-white/80 text-stone-700 hover:bg-amber-200/60 border border-amber-200'
                }`}
              >
                <div>{item.label}</div>
                <div className={`text-[10px] ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                  {item.sub}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
