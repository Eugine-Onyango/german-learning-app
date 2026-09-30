import React, { useState } from 'react';
import { Volume2, Sparkles, Ban, Layers, HelpCircle, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson20NegativeArticlesStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('stories');
  const [selectedStory, setSelectedStory] = useState(0);
  const [magicKActive, setMagicKActive] = useState(false);

  const STORIES = [
    {
      id: "kuli",
      title: "Slide 3: Pen vs Pencil",
      genderBadge: "r Kuli (maskulin) • r Bleistift (maskulin)",
      genderColor: "bg-blue-100 text-blue-900 border-blue-300",
      itemIcon: "✏️",
      mistakenIcon: "🖊️",
      question: "Ist das ein Kuli?",
      questionEn: "Is this a pen?",
      questionPron: "ist dahs eyn KOO-lee?",
      answer: "Nein, das ist kein Kuli. Das ist ein Bleistift.",
      answerEn: "No, this is not a pen. This is a pencil.",
      answerPron: "nine, dahs ist kine KOO-lee. dahs ist eyn BLYE-shtift.",
      rule: "Maskulin: ein Kuli → kein Kuli",
      tip: "Both Kuli and Bleistift are masculine (der). Masculine indefinite 'ein' becomes 'kein'!"
    },
    {
      id: "blume",
      title: "Slide 4: Flower vs Chocolate",
      genderBadge: "e Blume (feminin) • e Schokolade (feminin)",
      genderColor: "bg-rose-100 text-rose-900 border-rose-300",
      itemIcon: "🍫",
      mistakenIcon: "🌸",
      question: "Ist das eine Blume?",
      questionEn: "Is this a flower?",
      questionPron: "ist dahs EYE-neh BLOO-meh?",
      answer: "Nein, das ist keine Blume. Das ist eine Schokolade.",
      answerEn: "No, this is not a flower. This is a chocolate.",
      answerPron: "nine, dahs ist KYE-neh BLOO-meh. dahs ist EYE-neh shoh-koh-LAH-deh.",
      rule: "Feminin: eine Blume → keine Blume",
      tip: "Both Blume and Schokolade are feminine (die). Feminine indefinite 'eine' becomes 'keine'. Both end in -e!"
    },
    {
      id: "buch",
      title: "Slide 5: Book vs Mobile Phone",
      genderBadge: "s Buch (neutral) • s Handy (neutral)",
      genderColor: "bg-amber-100 text-amber-900 border-amber-300",
      itemIcon: "📱",
      mistakenIcon: "📖",
      question: "Ist das ein Buch?",
      questionEn: "Is this a book?",
      questionPron: "ist dahs eyn BOOKH?",
      answer: "Nein, das ist kein Buch. Das ist ein Handy.",
      answerEn: "No, this is not a book. This is a mobile phone.",
      answerPron: "nine, dahs ist kine BOOKH. dahs ist eyn HEN-dee.",
      rule: "Neutral: ein Buch → kein Buch",
      tip: "Both Buch and Handy are neutral (das). Neutral indefinite 'ein' becomes 'kein', identical to masculine!"
    },
    {
      id: "sterne",
      title: "Slide 6: Stars vs Balloons (Plural)",
      genderBadge: "e Sterne (Plural) • e Ballons (Plural)",
      genderColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      itemIcon: "🎈",
      mistakenIcon: "✨",
      question: "Sind das Sterne?",
      questionEn: "Are these stars?",
      questionPron: "zint dahs SHTAIR-neh?",
      answer: "Nein, das sind keine Sterne. Das sind Ballons.",
      answerEn: "No, these are not stars. These are balloons.",
      answerPron: "nine, dahs zint KYE-neh SHTAIR-neh. dahs zint bah-LOHNS.",
      rule: "Plural: — (kein Artikel) → keine Sterne",
      tip: "In the positive plural, there is no article ('Das sind Ballons'). But in the negative, you MUST use 'keine'!"
    },
    {
      id: "apfel",
      title: "Slide 1: Apple vs Pear",
      genderBadge: "r Apfel (maskulin) • e Birne (feminin)",
      genderColor: "bg-teal-100 text-teal-900 border-teal-300",
      itemIcon: "🍐",
      mistakenIcon: "🍎",
      question: "Ist das ein Apfel?",
      questionEn: "Is this an apple?",
      questionPron: "ist dahs eyn AHP-fel?",
      answer: "Das ist kein Apfel. Das ist eine Birne.",
      answerEn: "This is not an apple. This is a pear.",
      answerPron: "dahs ist kine AHP-fel. dahs ist EYE-neh BEER-neh.",
      rule: "Mixed: kein Apfel (maskulin) + eine Birne (feminin)",
      tip: "Slide 1 opener: shows how to deny one noun and introduce the real one in a single sentence!"
    },
    {
      id: "tasche",
      title: "Slide 1: Bag vs Book",
      genderBadge: "e Tasche (feminin) • s Buch (neutral)",
      genderColor: "bg-purple-100 text-purple-900 border-purple-300",
      itemIcon: "📕",
      mistakenIcon: "👜",
      question: "Ist das eine Tasche?",
      questionEn: "Is this a bag?",
      questionPron: "ist dahs EYE-neh TAH-sheh?",
      answer: "Das ist keine Tasche. Das ist ein Buch.",
      answerEn: "This is not a bag. This is a book.",
      answerPron: "dahs ist KYE-neh TAH-sheh. dahs ist eyn BOOKH.",
      rule: "Mixed: keine Tasche (feminin) + ein Buch (neutral)",
      tip: "Slide 1 opener: die Tasche negates to 'keine Tasche', das Buch is introduced with 'ein Buch'."
    }
  ];

  const MAGIC_K_CARDS = [
    {
      gender: "Maskulin",
      article: "der",
      indefinite: "ein",
      negative: "kein",
      noun: "Kuli (pen)",
      examplePos: "Das ist ein Kuli.",
      exampleNeg: "Das ist kein Kuli.",
      color: "border-blue-300 bg-blue-50/70 text-blue-950"
    },
    {
      gender: "Feminin",
      article: "die",
      indefinite: "eine",
      negative: "keine",
      noun: "Blume (flower)",
      examplePos: "Das ist eine Blume.",
      exampleNeg: "Das ist keine Blume.",
      color: "border-rose-300 bg-rose-50/70 text-rose-950"
    },
    {
      gender: "Neutral",
      article: "das",
      indefinite: "ein",
      negative: "kein",
      noun: "Buch (book)",
      examplePos: "Das ist ein Buch.",
      exampleNeg: "Das ist kein Buch.",
      color: "border-amber-300 bg-amber-50/70 text-amber-950"
    },
    {
      gender: "Plural (m/f/n)",
      article: "die",
      indefinite: "— (kein Artikel)",
      negative: "keine",
      noun: "Sterne (stars)",
      examplePos: "Das sind Sterne.",
      exampleNeg: "Das sind keine Sterne.",
      color: "border-emerald-300 bg-emerald-50/70 text-emerald-950"
    }
  ];

  const TABLE_ROWS = [
    {
      gender: "maskulin",
      badge: "bg-blue-100 text-blue-800 border-blue-300",
      indefinite: "ein",
      negative: "kein",
      example: "ein Kuli → kein Kuli",
      audio: "maskulin: ein wird zu kein. Ist das ein Kuli? Nein, das ist kein Kuli!"
    },
    {
      gender: "feminin",
      badge: "bg-rose-100 text-rose-800 border-rose-300",
      indefinite: "eine",
      negative: "keine",
      example: "eine Blume → keine Blume",
      audio: "feminin: eine wird zu keine. Ist das eine Blume? Nein, das ist keine Blume!"
    },
    {
      gender: "neutral",
      badge: "bg-amber-100 text-amber-800 border-amber-300",
      indefinite: "ein",
      negative: "kein",
      example: "ein Buch → kein Buch",
      audio: "neutral: ein wird zu kein. Ist das ein Buch? Nein, das ist kein Buch!"
    },
    {
      gender: "Plural (m / f / n)",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      indefinite: "— (kein Artikel)",
      negative: "keine",
      example: "Sterne → keine Sterne",
      audio: "Plural: ohne Artikel wird zu keine. Sind das Sterne? Nein, das sind keine Sterne!"
    }
  ];

  const curr = STORIES[selectedStory];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700/80 rounded-full text-xs font-semibold text-emerald-200 mb-3 border border-emerald-500/40">
            <Ban className="w-3.5 h-3.5" />
            <span>Lesson 20: Negative Artikel Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            negative Artikel im Nominativ (kein, keine, kein)
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Learn how to say "Not a / No" in German! Discover the <strong>Magic 'K' Rule</strong>, practice the Q&amp;A rebuttals (Ist das ein Kuli? Nein, das ist kein Kuli!), and explore the Slide 8 Master Blackboard.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-emerald-700/60">
          <button
            onClick={() => { setActiveTab('stories'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'stories'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
            }`}
          >
            💬 The 6 Slide Q&amp;A Dialogues
          </button>
          <button
            onClick={() => { setActiveTab('magicK'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'magicK'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
            }`}
          >
            🪄 The Magic "K" Machine
          </button>
          <button
            onClick={() => { setActiveTab('table'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'table'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
            }`}
          >
            📋 Master Blackboard (Slide 8)
          </button>
        </div>
      </div>

      {/* TAB 1: THE 6 SLIDE STORIES */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              The Slide Q&amp;A Rebuttals
            </h3>
            <p className="text-stone-600 text-sm">
              In German, when someone mistakes an object, you answer with <strong>"Nein, das ist kein / keine..."</strong> and then state what it actually is!
            </p>
          </div>

          {/* Story Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {STORIES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedStory(idx);
                  playChime('click');
                }}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  selectedStory === idx
                    ? 'bg-stone-900 text-amber-300 ring-2 ring-amber-400 shadow-md scale-105'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{s.itemIcon}</span>
                <span>{s.title.split(':')[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Story Stage */}
          <div className="bg-stone-900 border-4 border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white max-w-3xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 text-xs">
              <span className="font-mono text-amber-400 uppercase tracking-wider font-bold">
                {curr.title}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${curr.genderColor}`}>
                {curr.genderBadge}
              </span>
            </div>

            {/* Visual Icons Spotlight */}
            <div className="flex items-center justify-center gap-8 py-3 text-5xl sm:text-6xl">
              <div className="relative group text-center">
                <span className="opacity-40 grayscale">{curr.mistakenIcon}</span>
                <span className="absolute -top-2 -right-2 text-2xl text-rose-500 font-extrabold">✕</span>
                <div className="text-xs text-stone-400 mt-1 font-sans">Not this</div>
              </div>
              <ArrowRight className="w-8 h-8 text-amber-400 animate-pulse" />
              <div className="text-center group">
                <span className="animate-bounce inline-block">{curr.itemIcon}</span>
                <div className="text-xs text-emerald-400 mt-1 font-sans font-bold">It is this!</div>
              </div>
            </div>

            {/* Question Box */}
            <div
              onClick={() => speakGerman(curr.question, isSlowMode)}
              className="bg-stone-800/80 hover:bg-stone-800 border-2 border-stone-700 hover:border-amber-400/60 p-4 rounded-2xl transition-all cursor-pointer group space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>The Question</span>
                </span>
                <Volume2 className="w-5 h-5 text-stone-400 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200">
                {curr.question}
              </div>
              <div className="text-stone-300 text-sm">{curr.questionEn}</div>
              <div className="text-xs text-stone-400 font-mono">{curr.questionPron}</div>
            </div>

            {/* Answer Box */}
            <div
              onClick={() => speakGerman(curr.answer, isSlowMode)}
              className="bg-gradient-to-br from-emerald-950/70 to-teal-950/70 border-2 border-emerald-500/80 hover:border-amber-400 p-5 rounded-2xl transition-all cursor-pointer group space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>The Rebuttal &amp; Correction</span>
                </span>
                <Volume2 className="w-5 h-5 text-emerald-400 group-hover:text-amber-300 transition-colors animate-pulse" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-300 group-hover:scale-[1.01] transition-transform">
                {curr.answer}
              </div>
              <div className="text-stone-200 text-sm font-medium">{curr.answerEn}</div>
              <div className="text-xs text-emerald-300/80 font-mono">{curr.answerPron}</div>
            </div>

            {/* Grammar Insight */}
            <div className="bg-stone-800/40 p-4 rounded-xl border border-stone-700/60 text-xs sm:text-sm text-stone-300 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">{curr.rule}:</strong> {curr.tip}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE MAGIC 'K' MACHINE */}
      {activeTab === 'magicK' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              The Magic "K" Machine
            </h3>
            <p className="text-stone-600 text-sm">
              Turning "a / an" into "not a / no" in German is magical and effortless. You just attach the golden letter <strong>K</strong>!
            </p>
          </div>

          {/* Interactive Trigger Button */}
          <div className="text-center">
            <button
              onClick={() => {
                setMagicKActive(prev => !prev);
                playChime('success');
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black px-6 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 inline-flex items-center gap-2 text-base"
            >
              <Sparkles className="w-5 h-5" />
              <span>{magicKActive ? "Remove 'K' (Reset to Positive)" : "Attach Magic 'K' (Transform to Negative!)"}</span>
            </button>
          </div>

          {/* Transformation Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {MAGIC_K_CARDS.map((card, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const speech = magicKActive ? card.exampleNeg : card.examplePos;
                  speakGerman(speech, isSlowMode);
                }}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md ${card.color}`}
              >
                <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                  <span>{card.gender}</span>
                  <span className="font-mono">{card.article} {card.noun}</span>
                </div>

                {/* The Transformation Equation */}
                <div className="bg-white/90 p-4 rounded-2xl border border-stone-200/80 text-center space-y-2">
                  <div className="text-3xl font-black flex items-center justify-center gap-2">
                    {magicKActive ? (
                      <span className="text-rose-600 animate-bounce flex items-center gap-1">
                        <span className="text-amber-500 text-4xl">K</span>
                        <span>{card.indefinite === '— (kein Artikel)' ? 'eine' : card.indefinite}</span>
                        <span className="text-stone-400 text-lg mx-1">=</span>
                        <span className="text-rose-700 underline">{card.negative}</span>
                      </span>
                    ) : (
                      <span className="text-emerald-700">
                        {card.indefinite}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500">
                    {magicKActive ? "Negative Article (No / Not a)" : "Positive Indefinite Article (A / An)"}
                  </div>
                </div>

                {/* Example Sentence Preview */}
                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-bold">
                      {magicKActive ? card.exampleNeg : card.examplePos}
                    </div>
                    <div className="text-xs opacity-75">
                      {magicKActive ? "Negative sentence" : "Positive sentence"}
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 shrink-0 text-stone-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-950 text-center">
            💡 <strong>The Secret:</strong> <em>ein + K = kein</em>. <em>eine + K = keine</em>. And plural simply adopts the feminine <em>-e</em> ending: <em>keine</em>!
          </div>
        </div>
      )}

      {/* TAB 3: MASTER COMPARISON BLACKBOARD (SLIDE 8) */}
      {activeTab === 'table' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Slide 8: At a Glance Matrix
            </h3>
            <p className="text-stone-600 text-sm">
              unbestimmte vs. negative Artikel (im Nominativ). Tap any row to hear the live pronunciation!
            </p>
          </div>

          {/* Blackboard */}
          <div className="bg-stone-900 border-8 border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-w-4xl mx-auto">
            <div className="text-center border-b-2 border-stone-700 pb-4 mb-6">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">Original Slide 8 Blackboard</span>
              <h4 className="text-2xl sm:text-3xl font-bold text-amber-300 font-serif">
                unbestimmte vs. negative Artikel (im Nominativ)
              </h4>
            </div>

            <div className="space-y-3">
              {TABLE_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  onClick={() => speakGerman(row.audio, isSlowMode)}
                  className="bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer group shadow-md hover:border-amber-400/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-bold text-stone-200 text-sm sm:text-base flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                      <span className="capitalize">{row.gender}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakGerman(row.audio, isSlowMode);
                      }}
                      className="px-3 py-1 bg-stone-700 group-hover:bg-amber-400 group-hover:text-stone-900 rounded-lg text-xs font-bold text-amber-300 transition-colors flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Formula</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center sm:text-left">
                    {/* Positive Indefinite Column */}
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-700">
                      <div className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-1">
                        unbestimmte (A / An)
                      </div>
                      <div className="text-2xl font-extrabold text-teal-300 mb-1">{row.indefinite}</div>
                    </div>

                    {/* Negative Column */}
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-700">
                      <div className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-1">
                        negative (No / Not a)
                      </div>
                      <div className="text-2xl font-extrabold text-amber-300 mb-1">{row.negative}</div>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-stone-400 italic text-center sm:text-left">
                    Example: {row.example}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Blackboard Golden Note */}
            <div className="mt-6 pt-4 border-t border-stone-700 flex items-start gap-3 text-stone-300 text-xs sm:text-sm">
              <span className="text-xl">💡</span>
              <p>
                <strong className="text-amber-300">Golden Takeaway:</strong> Masculine and Neutral both take <em className="text-white">kein</em>. Feminine and Plural both take <em className="text-white">keine</em>. In German, there are only two endings to remember: <strong>kein</strong> (zero ending) and <strong>keine</strong> (with -e)!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
