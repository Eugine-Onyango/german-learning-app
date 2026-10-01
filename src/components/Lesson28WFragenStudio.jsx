import React, { useState } from 'react';
import { Volume2, Sparkles, Compass, HelpCircle, ArrowRight, Lightbulb, MapPin, Heart, DollarSign, Users, Calendar, Globe, UserCheck, RefreshCw } from 'lucide-react';
import { LESSON_28_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson28WFragenStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('soundboard');

  // Tab 1: Filter state
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All 13 Questions 🧭' },
    { id: 'basics', label: 'Basics (Was, Warum, Wann, Wie, Welche) 💭' },
    { id: 'people', label: 'People (Wer vs. Wen) 👥' },
    { id: 'location', label: 'Location (Wo, Woher, Wohin) 🗺️' },
    { id: 'quantity', label: 'Quantity (Wie viel / viele / oft) 🔢' }
  ];

  const filteredItems = LESSON_28_ITEMS.filter(item => {
    if (item.category === 'overview') return false;
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  // Tab 2: Showdown interactive state
  const [activeShowdown, setActiveShowdown] = useState('wer-wen');

  // Tab 3: Interactive Question Builder Machine
  const scenarios = [
    {
      id: 'job',
      context: "You want to politely ask a professional colleague what their career is (Slide 3):",
      wWord: "Was",
      verb: "sind",
      subject: "Sie",
      rest: "von Beruf?",
      english: "What do you do professionally?",
      icon: "💼",
      optionsW: ["Was", "Wie", "Wer", "Wo"],
      explain: "In German, job inquiries use 'Was sind Sie von Beruf?' (What are you by profession?)."
    },
    {
      id: 'sad',
      context: "A little boy with a scarf is weeping; you want to ask why (Slide 5):",
      wWord: "Warum",
      verb: "bist",
      subject: "du",
      rest: "traurig?",
      english: "Why are you sad?",
      icon: "🥺",
      optionsW: ["Warum", "Wann", "Woher", "Wen"],
      explain: "'Warum' asks for the cause, emotion, or reason ('Why are you sad?')."
    },
    {
      id: 'wedding',
      context: "A happy couple just got engaged; you ask for their wedding date (Slide 7):",
      wWord: "Wann",
      verb: "heiratet",
      subject: "ihr?",
      rest: "",
      english: "When are you getting married?",
      icon: "💍",
      optionsW: ["Wann", "Warum", "Wohin", "Wie viel"],
      explain: "'Wann' asks about time and calendar dates ('When are you getting married?')."
    },
    {
      id: 'love',
      context: "You want to find out who holds someone's heart (direct object, Slide 11):",
      wWord: "Wen",
      verb: "liebst",
      subject: "du?",
      rest: "",
      english: "Whom do you love?",
      icon: "❤️",
      optionsW: ["Wen", "Wer", "Was", "Wie"],
      explain: "'Wen' is the Akkusativ object of love: 'Wen liebst du?' (Whom do you love?)."
    },
    {
      id: 'vacation',
      context: "Your friends packed their car with beach gear and suitcases (Slide 19):",
      wWord: "Wohin",
      verb: "fahrt",
      subject: "ihr",
      rest: "im Urlaub?",
      english: "Where are you going on vacation?",
      icon: "🚗",
      optionsW: ["Wohin", "Wo", "Woher", "Welche"],
      explain: "'Wohin' expresses forward movement to a destination ('Where to?')."
    },
    {
      id: 'bike',
      context: "You are at a bike shop and want to know the price of a bicycle (Slide 21):",
      wWord: "Wie viel",
      verb: "kostet",
      subject: "ein",
      rest: "Fahrrad?",
      english: "How much does a bicycle cost?",
      icon: "🚲",
      optionsW: ["Wie viel", "Wie viele", "Wie oft", "Was"],
      explain: "'Wie viel kostet...' is the standard singular inquiry for prices and costs."
    },
    {
      id: 'kids',
      context: "You ask a parent how many children they have (countable plural, Slide 23):",
      wWord: "Wie viele",
      verb: "Kinder",
      subject: "hast",
      rest: "du?",
      english: "How many children do you have?",
      icon: "👨‍👩‍👧‍👦",
      optionsW: ["Wie viele", "Wie viel", "Wie oft", "Welche"],
      explain: "'Wie viele' is used for countable plural nouns ('Kinder', 'Bücher', etc.)."
    },
    {
      id: 'football',
      context: "You ask a friend about the frequency of their soccer hobby (Slide 26):",
      wWord: "Wie oft",
      verb: "spielst",
      subject: "du",
      rest: "Fußball?",
      english: "How often do you play football?",
      icon: "⚽",
      optionsW: ["Wie oft", "Wie viel", "Wann", "Wo"],
      explain: "'Wie oft' asks about habit frequency (e.g., daily, twice a week, rarely)."
    }
  ];

  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [chosenWWord, setChosenWWord] = useState(null);

  const curScen = scenarios[selectedScenarioIdx];

  const handlePickW = (word) => {
    playChime('click');
    setChosenWWord(word);
    if (word === curScen.wWord) {
      playChime('success');
      const sentence = `${curScen.wWord} ${curScen.verb} ${curScen.subject} ${curScen.rest}`.trim();
      speakGerman(sentence, isSlowMode);
    } else {
      playChime('wrong');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-yellow-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-amber-500/30">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-amber-500/30 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-amber-400/40">
              <Sparkles className="w-3.5 h-3.5" />
              Lesson 28 Interactive Studio
            </span>
            <button
              onClick={() => speakGerman("W-Fragen: Was sind Sie von Beruf? Warum bist du traurig? Wann heiratet ihr? Wer spricht gut Deutsch? Wen liebst du? Wo wohnst du? Woher kommst du? Wohin fahrt ihr? Wie viel kostet ein Fahrrad? Wie viele Kinder hast du? Wie oft spielst du Fußball? Welche Sprachen sprichst du?", isSlowMode)}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen to All 13 Questions</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-100 to-orange-200">
            W-Fragen (W-Questions in German)
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            The 13 curiosity keys to unlock any German conversation! Discover the golden rule: the question word sits in <strong>Position 1</strong>, while the conjugated verb locks into <strong>Position 2</strong>!
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
        <button
          onClick={() => { playChime('click'); setActiveTab('soundboard'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'soundboard'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>🧭 1. 13 W-Keys Soundboard</span>
        </button>
        <button
          onClick={() => { playChime('click'); setActiveTab('showdowns'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'showdowns'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>⚔️ 2. The 3 Big Showdowns</span>
        </button>
        <button
          onClick={() => { playChime('click'); setActiveTab('machine'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'machine'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>🛠️ 3. Question Builder Lab</span>
        </button>
      </div>

      {/* TAB 1: 13 W-KEYS SOUNDBOARD */}
      {activeTab === 'soundboard' && (
        <div className="space-y-6 animate-fade-in">
          {/* Slide 29 At a Glance Master Chalkboard */}
          <div className="bg-stone-900 text-amber-100 rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span className="font-mono text-sm sm:text-base font-bold text-amber-300">
                  Slide 29: "At a glance" Master Table (13 Question Words)
                </span>
              </div>
              <span className="text-xs text-stone-400 font-mono">Tap any row to hear audio</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {/* Left Column */}
              <div className="space-y-1.5 divide-y divide-white/10">
                <div onClick={() => speakGerman("Was? What?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Was?</span>
                  <span className="text-stone-300">What?</span>
                </div>
                <div onClick={() => speakGerman("Warum? Why?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Warum?</span>
                  <span className="text-stone-300">Why?</span>
                </div>
                <div onClick={() => speakGerman("Wann? When?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wann?</span>
                  <span className="text-stone-300">When?</span>
                </div>
                <div onClick={() => speakGerman("Wer? Who?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wer?</span>
                  <span className="text-stone-300">Who? (Subject)</span>
                </div>
                <div onClick={() => speakGerman("Wen? Whom?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wen?</span>
                  <span className="text-stone-300">Whom? (Direct Object)</span>
                </div>
                <div onClick={() => speakGerman("Wie? How?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wie?</span>
                  <span className="text-stone-300">How?</span>
                </div>
                <div onClick={() => speakGerman("Wo? Where?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wo?</span>
                  <span className="text-stone-300">Where? (Location)</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-1.5 divide-y divide-white/10">
                <div onClick={() => speakGerman("Woher? Where from?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Woher?</span>
                  <span className="text-stone-300">Where from? (Origin)</span>
                </div>
                <div onClick={() => speakGerman("Wohin? Where to?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wohin?</span>
                  <span className="text-stone-300">Where to? (Destination)</span>
                </div>
                <div onClick={() => speakGerman("Wie viel? How much?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wie viel?</span>
                  <span className="text-stone-300">How much? (Price/Singular)</span>
                </div>
                <div onClick={() => speakGerman("Wie viele? How many?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wie viele?</span>
                  <span className="text-stone-300">How many? (Plural Countable)</span>
                </div>
                <div onClick={() => speakGerman("Wie oft? How often?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Wie oft?</span>
                  <span className="text-stone-300">How often? (Frequency)</span>
                </div>
                <div onClick={() => speakGerman("Welche? Which?", isSlowMode)} className="pt-1.5 flex justify-between items-center cursor-pointer hover:text-yellow-300">
                  <span className="font-bold text-amber-300">Welche?</span>
                  <span className="text-stone-300">Which? (Selection)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { playChime('click'); setFilterCategory(cat.id); }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-amber-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => speakGerman(item.german, isSlowMode)}
                className="bg-white rounded-3xl p-5 shadow-sm border-2 border-stone-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span>{item.icon}</span>
                    <span>{item.badge}</span>
                  </span>
                  <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-all" />
                </div>

                <div className="space-y-1">
                  <div className="text-lg font-black text-stone-900 leading-snug">
                    {item.german}
                  </div>
                  <div className="text-xs text-stone-500 italic">
                    {item.english}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 text-xs text-stone-600">
                  <span className="font-semibold text-amber-900">💡 Layman Analogy: </span>
                  {item.kenyanAnalogy}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: THE 3 BIG SHOWDOWNS */}
      {activeTab === 'showdowns' && (
        <div className="space-y-6 animate-fade-in">
          {/* Showdown Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => { playChime('click'); setActiveShowdown('wer-wen'); }}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeShowdown === 'wer-wen'
                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-rose-50'
              }`}
            >
              <span>👤 Wer? vs. Wen? ❤️</span>
            </button>
            <button
              onClick={() => { playChime('click'); setActiveShowdown('location'); }}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeShowdown === 'location'
                  ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-sky-50'
              }`}
            >
              <span>🗺️ Wo? / Woher? / Wohin?</span>
            </button>
            <button
              onClick={() => { playChime('click'); setActiveShowdown('quantity'); }}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeShowdown === 'quantity'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-emerald-50'
              }`}
            >
              <span>🔢 Wie viel? vs. Wie viele?</span>
            </button>
          </div>

          {/* Showdown 1: Wer vs. Wen */}
          {activeShowdown === 'wer-wen' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-rose-300 space-y-6">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
                <Heart className="w-5 h-5 text-rose-600" />
                <span>Showdown 1: Wer? (Who = Subject) vs. Wen? (Whom = Direct Object)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wer */}
                <div
                  onClick={() => speakGerman("Wer spricht gut Deutsch?", isSlowMode)}
                  className="p-5 bg-amber-50/70 border-2 border-amber-300 rounded-2xl cursor-pointer hover:bg-amber-100/70 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full uppercase">
                      Wer? = Who (Subjekt)
                    </span>
                    <Volume2 className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    <span className="text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-lg">Wer</span> spricht gut Deutsch?
                  </div>
                  <div className="text-xs text-stone-500 italic">"Who speaks good German?"</div>
                  <div className="text-xs text-stone-600 border-t border-amber-200 pt-2">
                    <strong>Role:</strong> Asking for the <em>actor/doer</em> of the verb (Nominativ).
                  </div>
                </div>

                {/* Wen */}
                <div
                  onClick={() => speakGerman("Wen liebst du?", isSlowMode)}
                  className="p-5 bg-rose-50/70 border-2 border-rose-300 rounded-2xl cursor-pointer hover:bg-rose-100/70 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900 bg-rose-200 px-3 py-1 rounded-full uppercase">
                      Wen? = Whom (Objekt)
                    </span>
                    <Volume2 className="w-4 h-4 text-rose-700" />
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    <span className="text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded-lg">Wen</span> liebst du?
                  </div>
                  <div className="text-xs text-stone-500 italic">"Whom do you love?"</div>
                  <div className="text-xs text-stone-600 border-t border-rose-200 pt-2">
                    <strong>Role:</strong> Asking for the <em>receiver of love or action</em> (Akkusativ - ends in '-en' like <em>den</em>).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Showdown 2: Location Trio */}
          {activeShowdown === 'location' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-sky-300 space-y-6">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-base">
                <MapPin className="w-5 h-5 text-sky-600" />
                <span>Showdown 2: The Location Trio (Wo? vs. Woher? vs. Wohin?)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Wo */}
                <div
                  onClick={() => speakGerman("Wo wohnst du?", isSlowMode)}
                  className="p-4 bg-amber-50/70 border-2 border-amber-300 rounded-2xl cursor-pointer hover:bg-amber-100/70 transition-all space-y-2"
                >
                  <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                    Wo? (Static 📍)
                  </span>
                  <div className="text-base font-black text-stone-900">
                    <span className="text-amber-700">Wo</span> wohnst du?
                  </div>
                  <div className="text-xs text-stone-500 italic">"Where do you live?"</div>
                  <div className="text-[11px] text-stone-600 pt-1">
                    Stationary spot with zero movement.
                  </div>
                </div>

                {/* Woher */}
                <div
                  onClick={() => speakGerman("Woher kommst du?", isSlowMode)}
                  className="p-4 bg-sky-50/70 border-2 border-sky-300 rounded-2xl cursor-pointer hover:bg-sky-100/70 transition-all space-y-2"
                >
                  <span className="text-xs font-bold text-sky-900 bg-sky-200 px-2.5 py-0.5 rounded-full">
                    Woher? (Origin 🛫)
                  </span>
                  <div className="text-base font-black text-stone-900">
                    <span className="text-sky-700">Woher</span> kommst du?
                  </div>
                  <div className="text-xs text-stone-500 italic">"Where are you from?"</div>
                  <div className="text-[11px] text-stone-600 pt-1">
                    Starting point / where you departed from.
                  </div>
                </div>

                {/* Wohin */}
                <div
                  onClick={() => speakGerman("Wohin fahrt ihr im Urlaub?", isSlowMode)}
                  className="p-4 bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl cursor-pointer hover:bg-emerald-100/70 transition-all space-y-2"
                >
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-200 px-2.5 py-0.5 rounded-full">
                    Wohin? (Destination 🚗)
                  </span>
                  <div className="text-base font-black text-stone-900">
                    <span className="text-emerald-700">Wohin</span> fahrt ihr?
                  </div>
                  <div className="text-xs text-stone-500 italic">"Where to on vacation?"</div>
                  <div className="text-[11px] text-stone-600 pt-1">
                    Forward motion traveling to a new target!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Showdown 3: Quantity */}
          {activeShowdown === 'quantity' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-300 space-y-6">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span>Showdown 3: Wie viel? (How Much) vs. Wie viele? (How Many)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wie viel */}
                <div
                  onClick={() => speakGerman("Wie viel kostet ein Fahrrad?", isSlowMode)}
                  className="p-5 bg-amber-50/70 border-2 border-amber-300 rounded-2xl cursor-pointer hover:bg-amber-100/70 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full uppercase">
                      Wie viel? (Price / Singular)
                    </span>
                    <Volume2 className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    <span className="text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-lg">Wie viel</span> kostet ein Fahrrad?
                  </div>
                  <div className="text-xs text-stone-500 italic">"How much does a bicycle cost?"</div>
                  <div className="text-xs text-stone-600 border-t border-amber-200 pt-2">
                    Used for price tags, uncountable items, and mass quantities (no '-e' at end).
                  </div>
                </div>

                {/* Wie viele */}
                <div
                  onClick={() => speakGerman("Wie viele Kinder hast du?", isSlowMode)}
                  className="p-5 bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl cursor-pointer hover:bg-emerald-100/70 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full uppercase">
                      Wie viele? (Plural Countable)
                    </span>
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    <span className="text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded-lg">Wie viele</span> Kinder hast du?
                  </div>
                  <div className="text-xs text-stone-500 italic">"How many children do you have?"</div>
                  <div className="text-xs text-stone-600 border-t border-emerald-200 pt-2">
                    Used when counting individual items/people in plural (adds ending '-e').
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: QUESTION BUILDER LAB */}
      {activeTab === 'machine' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span className="font-bold text-stone-900 text-sm sm:text-base">
                Interactive Question Builder Machine
              </span>
            </div>
            <span className="text-xs text-stone-400">
              Scenario {selectedScenarioIdx + 1} of {scenarios.length}
            </span>
          </div>

          {/* Scenario Carousel Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {scenarios.map((scen, idx) => (
              <button
                key={scen.id}
                onClick={() => {
                  playChime('click');
                  setSelectedScenarioIdx(idx);
                  setChosenWWord(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedScenarioIdx === idx
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{scen.icon}</span>
                <span>{scen.id.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Current Scenario Card */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
            <div className="text-xs text-stone-600 font-medium">
              <strong>Context:</strong> {curScen.context}
            </div>

            {/* Sentence Construction Line */}
            <div className="text-xl sm:text-2xl font-black text-stone-900 flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-xl font-mono ${
                chosenWWord
                  ? chosenWWord === curScen.wWord
                    ? 'bg-emerald-100 text-emerald-950 ring-2 ring-emerald-400'
                    : 'bg-rose-100 text-rose-950 ring-2 ring-rose-400'
                  : 'bg-white border-2 border-dashed border-amber-400 text-stone-400 px-4'
              }`}>
                {chosenWWord || '______?'}
              </span>
              <span className="text-amber-800">{curScen.verb}</span>
              <span>{curScen.subject}</span>
              {curScen.rest && <span>{curScen.rest}</span>}
            </div>
            <div className="text-xs text-stone-500 italic">
              Meaning: "{curScen.english}"
            </div>

            {/* W-Word Choices */}
            <div className="space-y-2 pt-2 border-t border-amber-200/60">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Select the Correct Question Word:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {curScen.optionsW.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handlePickW(opt)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      chosenWWord === opt
                        ? opt === curScen.wWord
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-sm'
                          : 'bg-rose-600 text-white ring-2 ring-rose-300 shadow-sm'
                        : 'bg-white border border-stone-300 text-stone-800 hover:bg-amber-100 hover:border-amber-400'
                    }`}
                  >
                    {opt}?
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation box */}
            {chosenWWord && (
              <div className={`p-3 rounded-xl text-xs ${
                chosenWWord === curScen.wWord
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}>
                <strong>{chosenWWord === curScen.wWord ? '✓ Perfekt! ' : '✗ Try again: '}</strong>
                {curScen.explain}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
