import React, { useState } from 'react';
import { Volume2, Sparkles, ThumbsUp, ThumbsDown, Heart, Star, Sparkle, Shirt, Footprints, Car, Film, Music, Utensils, MessageSquare, Check, HelpCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson51FashionOpinionStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('fashion'); // 'fashion', 'rating', 'review'

  // Tab 1: Fashion & Outfit Critique State (Slide 9 Dialogue)
  const [selectedItem, setSelectedItem] = useState('kleid'); // 'kleid', 'schuhe', 'jacke', 'auto', 'hemd', 'brille'
  const [fashionVerdict, setFashionVerdict] = useState('echt-schoen'); // 'echt-schoen', 'total-schoen', 'echt-klasse', 'wirklich-super', 'nicht-so-gut', 'haesslich', 'schlecht'

  const itemsConfig = {
    kleid: {
      name: "das Kleid",
      gender: "neuter",
      pronoun: "Das",
      english: "the dress",
      icon: "👗",
      question: "Hi Tom! Wie findest du mein Kleid?",
      questionEn: "Hi Tom! How do you like my dress?"
    },
    schuhe: {
      name: "die Schuhe",
      gender: "plural",
      pronoun: "Die",
      english: "the shoes",
      icon: "👠",
      question: "Und meine Schuhe?",
      questionEn: "And my shoes?"
    },
    jacke: {
      name: "die Jacke",
      gender: "feminine",
      pronoun: "Die",
      english: "the jacket",
      icon: "🧥",
      question: "Wie findest du meine Jacke?",
      questionEn: "How do you like my jacket?"
    },
    auto: {
      name: "das Auto",
      gender: "neuter",
      pronoun: "Das",
      english: "the car",
      icon: "🚗",
      question: "Wie findest du das Auto?",
      questionEn: "How do you like the car?"
    },
    hemd: {
      name: "das Hemd",
      gender: "neuter",
      pronoun: "Das",
      english: "the shirt",
      icon: "👔",
      question: "Wie findest du mein Hemd?",
      questionEn: "How do you like my shirt?"
    },
    brille: {
      name: "die Sonnenbrille",
      gender: "feminine",
      pronoun: "Die",
      english: "the sunglasses",
      icon: "🕶️",
      question: "Wie findest du meine Sonnenbrille?",
      questionEn: "How do you like my sunglasses?"
    }
  };

  const verdictsConfig = {
    'echt-schoen': {
      label: "Echt schön! (Really nice)",
      germanTail: "finde ich echt schön!",
      type: "positive",
      stars: 5,
      badge: "Compliment",
      vibe: "Warm & Sincere"
    },
    'total-schoen': {
      label: "Total schön! (Totally beautiful)",
      germanTail: "finde ich total schön!",
      type: "positive",
      stars: 5,
      badge: "High Praise",
      vibe: "Stunning"
    },
    'echt-klasse': {
      label: "Echt klasse! (Really terrific)",
      germanTail: "finde ich echt klasse!",
      type: "positive",
      stars: 5,
      badge: "Top Class",
      vibe: "Super Stylish"
    },
    'wirklich-super': {
      label: "Wirklich super! (Really awesome)",
      germanTail: "finde ich wirklich super!",
      type: "positive",
      stars: 5,
      badge: "Awesome",
      vibe: "Top Tier"
    },
    'nicht-so-gut': {
      label: "Nicht so gut (Not so good)",
      germanTail: "finde ich nicht so gut.",
      type: "mild-negative",
      stars: 2,
      badge: "Diplomatic",
      vibe: "Average / Meh"
    },
    'haesslich': {
      label: "Hässlich (Ugly)",
      germanTail: "finde ich hässlich.",
      type: "negative",
      stars: 1,
      badge: "Blunt Critique",
      vibe: "Unflattering"
    },
    'schlecht': {
      label: "Schlecht (Bad / Poor)",
      germanTail: "finde ich schlecht.",
      type: "negative",
      stars: 1,
      badge: "Critical",
      vibe: "Poor Quality"
    }
  };

  const currentItem = itemsConfig[selectedItem];
  const currentVerdict = verdictsConfig[fashionVerdict];
  const fashionAnswerGerman = `${currentItem.pronoun} ${currentVerdict.germanTail}`;

  // Tab 2: Gefallen Scale State (Slides 4, 5, 11, 12, 13)
  const [scaleSubject, setScaleSubject] = useState('auto'); // 'auto', 'film', 'essen', 'musik', 'er', 'party'
  const [ratingLevel, setRatingLevel] = useState(5); // 5 to 1

  const scaleSubjects = {
    auto: { german: "Das Auto", english: "The car", icon: "🚗" },
    film: { german: "Der Film", english: "The movie", icon: "🎬" },
    essen: { german: "Das Essen", english: "The food", icon: "🍲" },
    musik: { german: "Die Musik", english: "The music", icon: "🎵" },
    party: { german: "Die Party", english: "The party", icon: "🎉" },
    er: { german: "Er", english: "He / Him", icon: "🕺" }
  };

  const scaleRatings = {
    5: {
      formula: "gefällt mir sehr gut!",
      english: "appeals to me very much! / I like it very much!",
      badge: "⭐⭐⭐⭐⭐ Top Favorite",
      color: "from-emerald-500 to-teal-600",
      bgSoft: "bg-emerald-50 border-emerald-300 text-emerald-900"
    },
    4: {
      formula: "gefällt mir.",
      english: "appeals to me. / I like it.",
      badge: "⭐⭐⭐⭐ Good",
      color: "from-blue-500 to-indigo-600",
      bgSoft: "bg-blue-50 border-blue-300 text-blue-900"
    },
    3: {
      formula: "gefällt mir nicht so gut.",
      english: "doesn't really appeal to me that much.",
      badge: "⭐⭐⭐ Neutral / Mild",
      color: "from-amber-500 to-orange-600",
      bgSoft: "bg-amber-50 border-amber-300 text-amber-900"
    },
    2: {
      formula: "gefällt mir gar nicht!",
      english: "doesn't appeal to me at all! / I don't like it at all!",
      badge: "⭐⭐ Dislike",
      color: "from-rose-500 to-pink-600",
      bgSoft: "bg-rose-50 border-rose-300 text-rose-900"
    },
    1: {
      formula: "gefällt mir überhaupt nicht!",
      english: "does not appeal to me in the slightest! (Zero!)",
      badge: "⭐ Total Rejection",
      color: "from-red-600 to-rose-700",
      bgSoft: "bg-red-50 border-red-300 text-red-900"
    }
  };

  const currentScaleObj = scaleSubjects[scaleSubject];
  const currentScaleRating = scaleRatings[ratingLevel];
  const fullGefallenSentence = `${currentScaleObj.german} ${currentScaleRating.formula}`;
  const fullGefallenEn = `I like ${currentScaleObj.english.toLowerCase()} (${currentScaleRating.english})`;

  // Tab 3: Event & Fun Reviewer (Slide 6, 7, 8)
  const [eventTopic, setEventTopic] = useState('party'); // 'party', 'konzert', 'urlaub', 'abend'
  const [praiseAdjective, setPraiseAdjective] = useState('super'); // 'toll', 'klasse', 'super', 'ganz-toll'
  const [includeFunNote, setIncludeFunNote] = useState(true);

  const eventTopics = {
    party: { german: "Die Party", english: "The party", icon: "🥳" },
    konzert: { german: "Das Konzert", english: "The concert", icon: "🎸" },
    urlaub: { german: "Der Urlaub", english: "The vacation / trip", icon: "🏖️" },
    abend: { german: "Der Abend", english: "The evening", icon: "🌆" }
  };

  const praiseAdjectives = {
    toll: { german: "Es war toll!", english: "It was great!", badge: "Great" },
    klasse: { german: "Es war klasse!", english: "It was terrific / top class!", badge: "Terrific" },
    super: { german: "Es war super!", english: "It was awesome!", badge: "Awesome" },
    'ganz-toll': { german: "Das war ganz toll!", english: "That was truly wonderful!", badge: "Really Great" }
  };

  const currentEvent = eventTopics[eventTopic];
  const currentPraise = praiseAdjectives[praiseAdjective];

  const fullEventReviewGerman = `${includeFunNote ? "Ich hatte viel Spaß! " : ""}${currentPraise.german} Ich finde das wirklich super!`;
  const fullEventReviewEn = `${includeFunNote ? "I had a lot of fun! " : ""}${currentPraise.english} I think that's really awesome!`;

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Interactive Studio • Lesson 51
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gefallen & Missfallen Studio
          </h2>
          <p className="text-rose-100 text-sm sm:text-base max-w-2xl">
            Master the art of complimenting outfits, rating experiences, and expressing honest likes and dislikes with German precision and warmth!
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-3">
            <button
              onClick={() => { setActiveTab('fashion'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'fashion'
                  ? 'bg-white text-rose-700 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>👗</span> 1. Outfit & Style Dialogue (Slide 9)
            </button>
            <button
              onClick={() => { setActiveTab('rating'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'rating'
                  ? 'bg-white text-rose-700 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>⭐</span> 2. Gefallen Rating Scale (1 to 5 Stars)
            </button>
            <button
              onClick={() => { setActiveTab('review'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'review'
                  ? 'bg-white text-rose-700 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🥳</span> 3. Event & Experience Review (Slide 6-8)
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Fashion & Outfit Critique */}
      {activeTab === 'fashion' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-rose-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>1️⃣</span> Step 1: Select What Your Friend Is Asking About
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Notice how the question and reply pronouns adapt dynamically (*Das* vs. *Die* for plural shoes).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {Object.entries(itemsConfig).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => { setSelectedItem(key); playChime('click'); }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                      selectedItem === key
                        ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {item.gender}
                      </p>
                      <p className="text-sm font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.english}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>2️⃣</span> Step 2: Choose Your Opinion / Verdict
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                From high praise (*total schön / echt klasse*) to blunt critique (*hässlich / schlecht*).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                {Object.entries(verdictsConfig).map(([key, v]) => (
                  <button
                    key={key}
                    onClick={() => { setFashionVerdict(key); playChime('click'); }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                      fashionVerdict === key
                        ? v.type === 'positive'
                          ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                          : v.type === 'mild-negative'
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : 'border-rose-500 bg-rose-50 ring-2 ring-rose-200'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        v.type === 'positive' ? 'bg-emerald-200 text-emerald-800' : v.type === 'mild-negative' ? 'bg-amber-200 text-amber-800' : 'bg-rose-200 text-rose-800'
                      }`}>
                        {v.badge}
                      </span>
                      <p className="text-sm font-bold text-gray-900">{v.label}</p>
                    </div>
                    <span className="text-xs text-gray-400 italic">{v.vibe}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dialogue Visual Stage */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                Live Dialogue Preview (Slide 9)
              </div>
              <button
                onClick={() => handleSpeak(`${currentItem.question} ${fashionAnswerGerman}`)}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg transition-all text-xs active:scale-95"
              >
                <Volume2 className="w-4 h-4" /> Play Both Lines
              </button>
            </div>

            {/* Bubble 1: Question */}
            <div className="flex items-start gap-3 max-w-lg">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-xl shrink-0">
                👩
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-none p-4 border border-white/15 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-rose-300">Friend Asking:</span>
                  <button
                    onClick={() => handleSpeak(currentItem.question)}
                    className="p-1 hover:bg-white/20 rounded-lg text-rose-200 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                  "{currentItem.question}"
                </p>
                <p className="text-xs text-slate-300">
                  {currentItem.questionEn}
                </p>
              </div>
            </div>

            {/* Bubble 2: Tom's Verdict */}
            <div className="flex items-start gap-3 max-w-lg ml-auto flex-row-reverse">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-xl shrink-0">
                🧑
              </div>
              <div className="bg-gradient-to-br from-rose-600/40 to-purple-600/40 backdrop-blur-md rounded-2xl rounded-tr-none p-4 border border-rose-400/30 space-y-1 text-right">
                <div className="flex items-center justify-between gap-3 flex-row-reverse">
                  <span className="text-xs font-bold text-emerald-300">Your Verdict:</span>
                  <button
                    onClick={() => handleSpeak(fashionAnswerGerman)}
                    className="p-1 hover:bg-white/20 rounded-lg text-emerald-200 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
                  "{fashionAnswerGerman}"
                </p>
                <p className="text-xs text-rose-200">
                  I think {currentItem.gender === 'plural' ? 'they are' : 'that is'} {currentVerdict.label.toLowerCase()}
                </p>
              </div>
            </div>

            {/* Golden Rule Tip */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-start gap-3 text-xs text-slate-300">
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white mb-0.5">The German Pronoun Flip Trick:</p>
                <p>
                  When replying to <span className="text-amber-300 font-bold">das Kleid</span>, say <span className="text-amber-300 font-bold">"Das finde ich..."</span>.
                  When replying to plural <span className="text-cyan-300 font-bold">die Schuhe</span>, say <span className="text-cyan-300 font-bold">"Die finde ich..."</span>!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Gefallen Rating Scale (1 to 5 Stars) */}
      {activeTab === 'rating' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-rose-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>1️⃣</span> Step 1: Select Subject to Rate
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {Object.entries(scaleSubjects).map(([key, s]) => (
                  <button
                    key={key}
                    onClick={() => { setScaleSubject(key); playChime('click'); }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                      scaleSubject === key
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{s.german}</p>
                      <p className="text-xs text-gray-500">{s.english}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>2️⃣</span> Step 2: Rate Your Liking (5 Stars to 1 Star)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3">
                {[5, 4, 3, 2, 1].map((lvl) => {
                  const rating = scaleRatings[lvl];
                  return (
                    <button
                      key={lvl}
                      onClick={() => { setRatingLevel(lvl); playChime('click'); }}
                      className={`p-3 rounded-2xl border-2 text-center transition-all ${
                        ratingLevel === lvl
                          ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-300 scale-105 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="text-sm font-black text-rose-600 mb-1">
                        {'★'.repeat(lvl)}{'☆'.repeat(5 - lvl)}
                      </div>
                      <p className="text-xs font-bold text-gray-800 line-clamp-1">{rating.formula.split(' ')[0]}...</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{lvl === 5 ? 'Love it' : lvl === 1 ? 'Hate it' : lvl === 3 ? 'So-so' : lvl === 4 ? 'Like it' : 'Dislike'}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scale Display Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-rose-200 space-y-5">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${currentScaleRating.bgSoft}`}>
                {currentScaleRating.badge}
              </span>
              <button
                onClick={() => handleSpeak(fullGefallenSentence)}
                className="px-4 py-2 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-md transition-all text-xs active:scale-95"
              >
                <Volume2 className="w-4 h-4" /> Listen to Sentence
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-4xl inline-block mb-1">{currentScaleObj.icon}</span>
              <h4 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                "{fullGefallenSentence}"
              </h4>
              <p className="text-sm sm:text-base font-semibold text-rose-600">
                {fullGefallenEn}
              </p>
            </div>

            {/* Grammar Deep Dive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900 block mb-1">Subject (The Thing):</span>
                <p className="text-blue-800 font-semibold">{currentScaleObj.german}</p>
                <p className="text-blue-600 text-[11px]">The object that causes the feeling.</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <span className="font-bold text-purple-900 block mb-1">Verb:</span>
                <p className="text-purple-800 font-semibold">gefällt (pleases)</p>
                <p className="text-purple-600 text-[11px]">3rd person singular form of gefallen.</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-1">Dative Object (Recipient):</span>
                <p className="text-emerald-800 font-semibold">mir (to me)</p>
                <p className="text-emerald-600 text-[11px]">Receives the like or dislike!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Event & Fun Reviewer */}
      {activeTab === 'review' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-rose-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>1️⃣</span> Step 1: Select Event / Occasion
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {Object.entries(eventTopics).map(([key, ev]) => (
                  <button
                    key={key}
                    onClick={() => { setEventTopic(key); playChime('click'); }}
                    className={`p-3 rounded-2xl border-2 text-center transition-all ${
                      eventTopic === key
                        ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-3xl block mb-1">{ev.icon}</span>
                    <p className="text-xs font-bold text-gray-900">{ev.german}</p>
                    <p className="text-[10px] text-gray-500">{ev.english}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>2️⃣</span> Step 2: Choose Your High-Energy Praise Adjective
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                {Object.entries(praiseAdjectives).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => { setPraiseAdjective(key); playChime('click'); }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      praiseAdjective === key
                        ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md block w-max mb-1">
                      {p.badge}
                    </span>
                    <p className="text-sm font-bold text-gray-900">{p.german}</p>
                    <p className="text-xs text-gray-500">{p.english}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <input
                type="checkbox"
                id="funNote"
                checked={includeFunNote}
                onChange={(e) => setIncludeFunNote(e.target.checked)}
                className="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
              />
              <label htmlFor="funNote" className="text-sm font-semibold text-gray-800 cursor-pointer">
                Include <span className="text-rose-600 font-bold">"Ich hatte viel Spaß!"</span> (I had a lot of fun - Slide 6)
              </label>
            </div>
          </div>

          {/* Review Card */}
          <div className="bg-gradient-to-r from-purple-700 via-rose-600 to-amber-600 p-1 rounded-3xl shadow-xl">
            <div className="bg-white rounded-[22px] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentEvent.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-gray-900">{currentEvent.german} Review</h4>
                    <p className="text-xs text-gray-500">Post-event feedback message</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSpeak(fullEventReviewGerman)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-md transition-all text-xs active:scale-95"
                >
                  <Volume2 className="w-4 h-4" /> Listen to Review
                </button>
              </div>

              <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                <p className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                  "{fullEventReviewGerman}"
                </p>
                <p className="text-xs sm:text-sm text-gray-600 italic">
                  "{fullEventReviewEn}"
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="text-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-gray-400 font-semibold">Toll</p>
                  <p className="text-xs font-bold text-gray-800">Great</p>
                </div>
                <div className="text-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-gray-400 font-semibold">Klasse</p>
                  <p className="text-xs font-bold text-gray-800">Terrific</p>
                </div>
                <div className="text-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-gray-400 font-semibold">Super</p>
                  <p className="text-xs font-bold text-gray-800">Awesome</p>
                </div>
                <div className="text-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-gray-400 font-semibold">Ganz toll</p>
                  <p className="text-xs font-bold text-gray-800">Really Great</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
