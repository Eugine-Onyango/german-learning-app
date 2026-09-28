import React, { useState } from 'react';
import { Volume2, Sparkles, Scale, ArrowLeftRight, CheckCircle2, ChevronRight, Split, Heart, Sun, Thermometer, ShieldCheck } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson16AdjectivesStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('seesaw'); // 'seesaw', 'alt_spotlight', 'chalkboard'
  const [selectedPairIdx, setSelectedPairIdx] = useState(0);

  const OPPOSITE_PAIRS = [
    {
      id: 'gross_klein',
      left: { word: 'groß', meaning: 'big', icon: '🐘', item: 'Ein Elefant' },
      right: { word: 'klein', meaning: 'small', icon: '🐱', item: 'eine Katze' },
      sentence: 'Ein Elefant ist groß, aber eine Katze ist klein.',
      translation: 'An elephant is big, but a cat is small.',
      category: 'Size',
      slide: 'Slide 3 & 4'
    },
    {
      id: 'schnell_langsam',
      left: { word: 'schnell', meaning: 'fast', icon: '🚄', item: 'Ein Zug' },
      right: { word: 'langsam', meaning: 'slow', icon: '🚲', item: 'ein Fahrrad' },
      sentence: 'Ein Zug ist schnell, aber ein Fahrrad ist langsam.',
      translation: 'A train is fast, but a bicycle is slow.',
      category: 'Speed',
      slide: 'Slide 5 & 6'
    },
    {
      id: 'dunkel_hell',
      left: { word: 'dunkel', meaning: 'dark', icon: '☕', item: 'Ein Espresso' },
      right: { word: 'hell', meaning: 'light', icon: '🥛', item: 'eine Latte' },
      sentence: 'Ein Espresso ist dunkel, aber eine Latte ist hell.',
      translation: 'An espresso is dark, but a latte is light.',
      category: 'Color / Light',
      slide: 'Slide 7 & 8'
    },
    {
      id: 'gluecklich_traurig',
      left: { word: 'glücklich', meaning: 'happy', icon: '😊', item: 'Paul' },
      right: { word: 'traurig', meaning: 'sad', icon: '😢', item: 'Robert' },
      sentence: 'Paul ist glücklich, aber Robert ist traurig.',
      translation: 'Paul is happy, but Robert is sad.',
      category: 'Emotion',
      slide: 'Slide 9 & 10'
    },
    {
      id: 'lang_kurz',
      left: { word: 'lang', meaning: 'long', icon: '💇‍♀️', item: 'Meine Haare' },
      right: { word: 'kurz', meaning: 'short', icon: '✂️', item: 'deine Haare' },
      sentence: 'Meine Haare sind lang, aber deine Haare sind kurz.',
      translation: 'My hair is long, but your hair is short.',
      category: 'Length',
      slide: 'Slide 11 & 12'
    },
    {
      id: 'warm_kuehl',
      left: { word: 'warm', meaning: 'warm', icon: '☀️', item: 'Im Sommer' },
      right: { word: 'kühl', meaning: 'cool', icon: '❄️', item: 'im Winter' },
      sentence: 'Im Sommer ist es warm, aber im Winter ist es kühl.',
      translation: "In summer it's warm, but in winter it's cool.",
      category: 'Climate',
      slide: 'Slide 13 & 14'
    },
    {
      id: 'heiss_kalt',
      left: { word: 'heiß', meaning: 'hot', icon: '🔥', item: 'Kaffee' },
      right: { word: 'kalt', meaning: 'cold', icon: '🧊', item: 'Limonade' },
      sentence: 'Kaffee trinkt man heiß, aber Limonade kalt.',
      translation: 'One drinks coffee hot, but lemonade cold.',
      category: 'Temperature',
      slide: 'Slide 15 & 16'
    },
    {
      id: 'richtig_falsch',
      left: { word: 'richtig', meaning: 'correct', icon: '✅', item: 'Meine Antwort' },
      right: { word: 'falsch', meaning: 'wrong', icon: '❌', item: 'deine Antwort' },
      sentence: 'Meine Antwort ist richtig, aber deine Antwort ist falsch.',
      translation: 'My answer is correct, but your answer is wrong.',
      category: 'Accuracy',
      slide: 'Slide 17 & 19'
    },
    {
      id: 'dick_duenn',
      left: { word: 'dick', meaning: 'fat / thick', icon: '🍔', item: 'Philipp' },
      right: { word: 'dünn', meaning: 'thin / slim', icon: '🥗', item: 'Maria' },
      sentence: 'Philipp ist dick, aber Maria ist dünn.',
      translation: 'Philipp is chubby, but Maria is thin.',
      category: 'Build',
      slide: 'Slide 20 & 21'
    },
    {
      id: 'alt_neu',
      left: { word: 'alt', meaning: 'old (objects)', icon: '🚙', item: 'Mein Auto' },
      right: { word: 'neu', meaning: 'new', icon: '🏎️', item: 'dein Auto' },
      sentence: 'Mein Auto ist alt, aber dein Auto ist neu.',
      translation: 'My car is old, but your car is new.',
      category: 'Object Age',
      slide: 'Slide 22 & 23'
    },
    {
      id: 'arm_reich',
      left: { word: 'arm', meaning: 'poor', icon: '🪙', item: 'Der Mann' },
      right: { word: 'reich', meaning: 'rich', icon: '👑', item: 'die Frau' },
      sentence: 'Der Mann ist arm, aber die Frau ist reich.',
      translation: 'The man is poor, but the woman is rich.',
      category: 'Wealth',
      slide: 'Slide 24 & 25'
    },
    {
      id: 'doof_intelligent',
      left: { word: 'doof', meaning: 'dumb / silly', icon: '🫏', item: 'Ein Esel' },
      right: { word: 'intelligent', meaning: 'intelligent', icon: '🦊', item: 'ein Fuchs' },
      sentence: 'Ein Esel ist doof, aber ein Fuchs ist intelligent.',
      translation: 'A donkey is silly, but a fox is intelligent.',
      category: 'Mind',
      slide: 'Slide 26 & 27'
    },
    {
      id: 'gut_schlecht',
      left: { word: 'gut', meaning: 'good', icon: '👍', item: 'Lachen' },
      right: { word: 'schlecht', meaning: 'bad', icon: '👎', item: 'Stress' },
      sentence: 'Lachen ist gut, aber Stress ist schlecht.',
      translation: 'Laughter is good, but stress is bad.',
      category: 'Quality',
      slide: 'Slide 28 & 29'
    },
    {
      id: 'schwer_leicht',
      left: { word: 'schwer', meaning: 'heavy / hard', icon: '🧳', item: 'Mein Koffer' },
      right: { word: 'leicht', meaning: 'light / easy', icon: '🛍️', item: 'meine Taschen' },
      sentence: 'Mein Koffer ist schwer, aber meine Taschen sind leicht.',
      translation: 'My suitcase is heavy, but my bags are light.',
      category: 'Weight',
      slide: 'Slide 30 & 31'
    },
    {
      id: 'alt_jung',
      left: { word: 'alt', meaning: 'old (people)', icon: '👵', item: 'Meine Großmutter' },
      right: { word: 'jung', meaning: 'young', icon: '👧', item: 'meine Mutter' },
      sentence: 'Meine Großmutter ist alt, aber meine Mutter ist jung.',
      translation: 'My grandmother is old, but my mother is young.',
      category: 'Person Age',
      slide: 'Slide 32 & 33'
    },
    {
      id: 'teuer_billig',
      left: { word: 'teuer', meaning: 'expensive', icon: '💎', item: 'Ein Sportwagen' },
      right: { word: 'billig', meaning: 'cheap', icon: '🏷️', item: 'ein Fahrrad' },
      sentence: 'Ein Sportwagen ist teuer, aber ein Fahrrad ist billig.',
      translation: 'A sports car is expensive, but a bicycle is cheap.',
      category: 'Price',
      slide: 'Slide 34 & 35'
    }
  ];

  const currentPair = OPPOSITE_PAIRS[selectedPairIdx];

  const playSentenceAudio = () => {
    playChime('click');
    speakGerman(currentPair.sentence, isSlowMode);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Scale className="w-4 h-4 text-emerald-200" />
              <span>Lesson 16: Adjectives & Opposites (Gegenteile)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              das Adjektiv & das Gegenteil 🎨⚖️
            </h2>
            <p className="text-white/90 text-xs sm:text-sm font-medium max-w-xl">
              Add vibrant color to your German! Explore <strong>all 16 opposite pairs</strong> from the slides, bridge contrasting sides with the golden connector <strong>aber (but)</strong>, and master the double life of <strong>alt (neu vs jung)</strong>!
            </p>
          </div>
          <button
            onClick={() => {
              playChime('click');
              speakGerman("Das Adjektiv und das Gegenteil. Ein Elefant ist groß, aber eine Katze ist klein!", isSlowMode);
            }}
            className="flex items-center gap-2 bg-white text-stone-900 hover:bg-emerald-100 px-5 py-3 rounded-2xl font-black text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-emerald-600" />
            <span>Hear Overview Audio</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300">
        <button
          onClick={() => { setActiveTab('seesaw'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'seesaw'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>1. The Opposites Scale (16 Pairs)</span>
        </button>
        <button
          onClick={() => { setActiveTab('alt_spotlight'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'alt_spotlight'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-amber-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>2. The Double Life of 'alt'</span>
        </button>
        <button
          onClick={() => { setActiveTab('chalkboard'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'chalkboard'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-blue-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>📋 3. Master Chalkboard (Slide 36)</span>
        </button>
      </div>

      {/* TAB 1: Opposites Scale (Seesaw) */}
      {activeTab === 'seesaw' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">Interactive Opposites Showcase</span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                16 Visual Pairs with "aber" (but) ⚖️
              </h3>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
              {currentPair.category} • {currentPair.slide}
            </span>
          </div>

          {/* Quick Selection Grid for 16 Pairs */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Pick an opposite pair:</span>
            <div className="flex flex-wrap gap-2">
              {OPPOSITE_PAIRS.map((pair, idx) => (
                <button
                  key={pair.id}
                  onClick={() => {
                    setSelectedPairIdx(idx);
                    playChime('click');
                    speakGerman(`${pair.left.word}. ${pair.right.word}.`, isSlowMode);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedPairIdx === idx
                      ? 'bg-stone-900 text-amber-300 shadow-md scale-105 ring-2 ring-amber-400 font-black'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  <span>{pair.left.icon}</span>
                  <span>{pair.left.word} / {pair.right.word}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Big Visual Scale / Seesaw Box */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-50 rounded-3xl p-6 sm:p-8 border-3 border-emerald-300 text-center space-y-6 shadow-inner">
            {/* The Two Sides Connected with 'aber' */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Left Side */}
              <div
                onClick={() => {
                  speakGerman(currentPair.left.word, isSlowMode);
                  playChime('click');
                }}
                className="bg-white rounded-3xl p-6 border-3 border-amber-400 shadow-md space-y-2 cursor-pointer hover:border-amber-500 transition-all hover:scale-102"
              >
                <div className="text-5xl">{currentPair.left.icon}</div>
                <div className="text-xs font-black text-amber-700 uppercase tracking-wider">{currentPair.left.item}</div>
                <div className="text-3xl font-black text-stone-900 font-mono">{currentPair.left.word}</div>
                <div className="text-xs text-stone-500 italic">({currentPair.left.meaning})</div>
                <button className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                  <Volume2 className="w-3 h-3" />
                  <span>Hear word</span>
                </button>
              </div>

              {/* Center "aber" Connector */}
              <div className="flex flex-col items-center justify-center py-2 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Connector:</span>
                <div className="w-16 h-16 rounded-full bg-stone-900 text-amber-300 font-black text-xl flex items-center justify-center shadow-lg border-2 border-amber-400 animate-gentle-bounce">
                  aber
                </div>
                <span className="text-xs font-bold text-stone-600">(but)</span>
              </div>

              {/* Right Side */}
              <div
                onClick={() => {
                  speakGerman(currentPair.right.word, isSlowMode);
                  playChime('click');
                }}
                className="bg-white rounded-3xl p-6 border-3 border-teal-400 shadow-md space-y-2 cursor-pointer hover:border-teal-500 transition-all hover:scale-102"
              >
                <div className="text-5xl">{currentPair.right.icon}</div>
                <div className="text-xs font-black text-teal-700 uppercase tracking-wider">{currentPair.right.item}</div>
                <div className="text-3xl font-black text-stone-900 font-mono">{currentPair.right.word}</div>
                <div className="text-xs text-stone-500 italic">({currentPair.right.meaning})</div>
                <button className="inline-flex items-center gap-1 text-[11px] text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded-full">
                  <Volume2 className="w-3 h-3" />
                  <span>Hear word</span>
                </button>
              </div>
            </div>

            {/* Complete Example Sentence Banner */}
            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-400 shadow-md max-w-xl mx-auto space-y-2">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Complete Sentence from Slide:</div>
              <div className="text-lg sm:text-xl font-black text-stone-900 font-mono">
                {currentPair.sentence}
              </div>
              <div className="text-xs sm:text-sm text-emerald-800 font-semibold italic">
                "{currentPair.translation}"
              </div>
              <button
                onClick={playSentenceAudio}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer mt-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Full Sentence Audio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: The Double Life of 'alt' */}
      {activeTab === 'alt_spotlight' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">Slides 22 & 32 Golden Rule</span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                The Double Life of "alt" (Old) 🚗 vs 👵
              </h3>
            </div>
            <span className="text-2xl">💡 ⚖️</span>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-300 text-xs sm:text-sm text-stone-800 leading-relaxed space-y-2">
            <h4 className="font-black text-amber-950 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Teacher's Secret: One Word, Two Different Opposites!
            </h4>
            <p>
              In German, the adjective <strong>alt (old)</strong> has two completely different opposites depending on whether you are talking about an <strong>inanimate object</strong> (like a car or smartphone) or a <strong>living being</strong> (like a grandmother or pet)!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1: Objects (alt vs neu) */}
            <div className="bg-blue-50/80 rounded-3xl p-6 border-3 border-blue-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 uppercase tracking-wider">1. For Objects & Items</span>
                <span className="text-3xl">🚗 ✨</span>
              </div>
              <h4 className="text-xl font-black text-blue-950">alt $\longleftrightarrow$ neu (New)</h4>
              <p className="text-xs text-stone-600">
                You would never say an old car is "not young". For cars, houses, and clothes, the opposite is <strong>neu</strong>!
              </p>

              <div className="bg-white p-4 rounded-2xl border border-blue-200 space-y-2 text-center">
                <div className="text-sm font-bold text-stone-900 font-mono">
                  Mein Auto ist alt, aber dein Auto ist neu.
                </div>
                <div className="text-xs text-stone-500 italic">
                  (My car is old, but your car is new.)
                </div>
                <button
                  onClick={() => {
                    speakGerman("Mein Auto ist alt, aber dein Auto ist neu.", isSlowMode);
                    playChime('click');
                  }}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
            </div>

            {/* Case 2: People / Living Beings (alt vs jung) */}
            <div className="bg-emerald-50/80 rounded-3xl p-6 border-3 border-emerald-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">2. For Living People / Animals</span>
                <span className="text-3xl">👵 👧</span>
              </div>
              <h4 className="text-xl font-black text-emerald-950">alt $\longleftrightarrow$ jung (Young)</h4>
              <p className="text-xs text-stone-600">
                You would never call a child a "new person". For humans, animals, and age, the opposite is <strong>jung</strong>!
              </p>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-2 text-center">
                <div className="text-sm font-bold text-stone-900 font-mono">
                  Meine Großmutter ist alt, aber meine Mutter ist jung.
                </div>
                <div className="text-xs text-stone-500 italic">
                  (My grandmother is old, but my mother is young.)
                </div>
                <button
                  onClick={() => {
                    speakGerman("Meine Großmutter ist alt, aber meine Mutter ist jung.", isSlowMode);
                    playChime('click');
                  }}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Master Chalkboard View (Slide 36) */}
      {activeTab === 'chalkboard' && (
        <div className="bg-[#21292d] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-800/60 shadow-2xl space-y-6 relative overflow-hidden font-sans">
          <div className="flex items-center justify-between border-b border-stone-700/80 pb-4">
            <div>
              <div className="text-amber-400 font-mono text-2xl sm:text-3xl font-black tracking-wide">
                16 Gegenteile (At a glance) 📋
              </div>
              <div className="text-stone-300 text-xs sm:text-sm italic">
                Exact two-column master chalkboard from the lesson summary
              </div>
            </div>
            <Scale className="w-6 h-6 text-amber-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-700/80">
            {/* Column 1 (First 8 Pairs) */}
            <div className="space-y-2 pr-0 md:pr-4">
              <div className="text-amber-400 font-black text-xs uppercase tracking-widest pb-1 border-b border-stone-700">
                Spalte 1 (Pairs 1 to 8)
              </div>
              {OPPOSITE_PAIRS.slice(0, 8).map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => {
                    speakGerman(`${pair.left.word} und ${pair.right.word}`, isSlowMode);
                    playChime('click');
                  }}
                  className="p-2.5 bg-stone-800/70 hover:bg-stone-750 rounded-xl flex items-center justify-between cursor-pointer border border-stone-700/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-amber-300 text-base">{pair.left.word}</span>
                    <span className="text-xs text-stone-400">({pair.left.meaning})</span>
                  </div>
                  <span className="text-stone-500 font-bold">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-teal-300 text-base">{pair.right.word}</span>
                    <span className="text-xs text-stone-400">({pair.right.meaning})</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                </div>
              ))}
            </div>

            {/* Column 2 (Second 8 Pairs) */}
            <div className="space-y-2 pt-4 md:pt-0 pl-0 md:pl-4">
              <div className="text-teal-400 font-black text-xs uppercase tracking-widest pb-1 border-b border-stone-700">
                Spalte 2 (Pairs 9 to 16)
              </div>
              {OPPOSITE_PAIRS.slice(8, 16).map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => {
                    speakGerman(`${pair.left.word} und ${pair.right.word}`, isSlowMode);
                    playChime('click');
                  }}
                  className="p-2.5 bg-stone-800/70 hover:bg-stone-750 rounded-xl flex items-center justify-between cursor-pointer border border-stone-700/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-amber-300 text-base">{pair.left.word}</span>
                    <span className="text-xs text-stone-400">({pair.left.meaning})</span>
                  </div>
                  <span className="text-stone-500 font-bold">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-teal-300 text-base">{pair.right.word}</span>
                    <span className="text-xs text-stone-400">({pair.right.meaning})</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
