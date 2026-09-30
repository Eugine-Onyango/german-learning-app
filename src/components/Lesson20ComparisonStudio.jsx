import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson20ComparisonStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('übung');
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const EXERCISES = [
    {
      id: "tasche",
      slide: "Slide 9",
      definite: "die Tasche",
      gender: "feminin",
      color: "rose",
      emoji: "👜",
      rule: "die → eine",
      sentence: "Das ist eine Tasche.",
      english: "This is a bag / handbag.",
      pronunciation: "dahs ist EYE-neh TAH-sheh",
      why: "Because 'Tasche' is feminine (die Tasche), the indefinite article becomes 'eine'. Both end in the letter -e!"
    },
    {
      id: "buch",
      slide: "Slide 10",
      definite: "das Buch",
      gender: "neutral",
      color: "amber",
      emoji: "📖",
      rule: "das → ein",
      sentence: "Das ist ein Buch.",
      english: "This is a book.",
      pronunciation: "dahs ist EYN BOOKH",
      why: "Because 'Buch' is neutral (das Buch), it takes 'ein'. Neuter and masculine are identical twins in the singular indefinite!"
    },
    {
      id: "elefant",
      slide: "Slide 11",
      definite: "der Elefant",
      gender: "maskulin",
      color: "blue",
      emoji: "🐘",
      rule: "der → ein",
      sentence: "Das ist ein Elefant.",
      english: "This is an elephant.",
      pronunciation: "dahs ist EYN eh-leh-FAHNT",
      why: "Because 'Elefant' is masculine (der Elefant), it takes 'ein'. No -e ending is added for masculine!"
    },
    {
      id: "tisch",
      slide: "Classroom Drill",
      definite: "der Tisch",
      gender: "maskulin",
      color: "blue",
      emoji: "🪵",
      rule: "der → ein",
      sentence: "Das ist ein Tisch.",
      english: "This is a table.",
      pronunciation: "dahs ist EYN TISH",
      why: "'der Tisch' is masculine, so 'der' changes into 'ein'."
    },
    {
      id: "lampe",
      slide: "Classroom Drill",
      definite: "die Lampe",
      gender: "feminin",
      color: "rose",
      emoji: "💡",
      rule: "die → eine",
      sentence: "Das ist eine Lampe.",
      english: "This is a lamp.",
      pronunciation: "dahs ist EYE-neh LAHM-peh",
      why: "'die Lampe' is feminine, so 'die' changes into 'eine'. Matching -e sound!"
    },
    {
      id: "auto",
      slide: "Classroom Drill",
      definite: "das Auto",
      gender: "neutral",
      color: "amber",
      emoji: "🚗",
      rule: "das → ein",
      sentence: "Das ist ein Auto.",
      english: "This is a car.",
      pronunciation: "dahs ist EYN OW-toh",
      why: "'das Auto' is neutral, so 'das' changes into 'ein'."
    },
    {
      id: "kinder",
      slide: "Classroom Drill (Plural)",
      definite: "die Kinder",
      gender: "Plural",
      color: "emerald",
      emoji: "🧒",
      rule: "die → (kein Artikel)",
      sentence: "Das sind Kinder.",
      english: "These are children.",
      pronunciation: "dahs zint KIN-dair",
      why: "Plural warning: In German, plural indefinite has NO article at all! Just say 'Das sind Kinder.'"
    }
  ];

  const TABLE_ROWS = [
    {
      gender: "maskulin",
      label: "Masculine (der Mann, der Apfel, der Elefant)",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      definite: "der",
      indefinite: "ein",
      exampleDef: "Der Mann wohnt in Paris.",
      exampleIndef: "Das ist ein Mann.",
      audioText: "Maskulin: der wird zu ein. Das ist ein Mann. Der Mann wohnt in Paris."
    },
    {
      gender: "feminin",
      label: "Feminine (die Frau, die Tasche, die Blume)",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      definite: "die",
      indefinite: "eine",
      exampleDef: "Die Frau hört Musik.",
      exampleIndef: "Das ist eine Frau.",
      audioText: "Feminin: die wird zu eine. Das ist eine Frau. Die Frau hört Musik."
    },
    {
      gender: "neutral",
      label: "Neutral (das Mädchen, das Buch, das Kind)",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      definite: "das",
      indefinite: "ein",
      exampleDef: "Das Mädchen tanzt.",
      exampleIndef: "Das ist ein Mädchen.",
      audioText: "Neutral: das wird zu ein. Das ist ein Mädchen. Das Mädchen tanzt."
    },
    {
      gender: "Plural (m / f / n)",
      label: "Plural (die Blumen, die Bücher, die Männer)",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      definite: "die",
      indefinite: "— (kein Artikel)",
      exampleDef: "Die Blumen sind schön.",
      exampleIndef: "Das sind Blumen.",
      audioText: "Plural: die wird zu kein Artikel. Das sind Blumen. Die Blumen sind schön."
    }
  ];

  const currEx = EXERCISES[selectedExercise];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-700/80 rounded-full text-xs font-semibold text-teal-200 mb-3 border border-teal-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lesson 20: Übungen & Vergleich Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            bestimmte vs. unbestimmte Artikel (im Nominativ)
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Slide 8-11 Classroom Exercises (die Tasche, das Buch, der Elefant) and the Slide 12 Master Comparison Blackboard. Tap any word to hear crystal-clear native pronunciation!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-teal-700/60">
          <button
            onClick={() => { setActiveTab('übung'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'übung'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-teal-900/60 text-teal-100 hover:bg-teal-900'
            }`}
          >
            ✏️ Classroom Übung (Slides 8-11)
          </button>
          <button
            onClick={() => { setActiveTab('table'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'table'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-teal-900/60 text-teal-100 hover:bg-teal-900'
            }`}
          >
            📋 Master Comparison Blackboard (Slide 12)
          </button>
          <button
            onClick={() => { setActiveTab('analogy'); playChime('click'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeTab === 'analogy'
                ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                : 'bg-teal-900/60 text-teal-100 hover:bg-teal-900'
            }`}
          >
            🔦 Flashlight vs Laser Pointer
          </button>
        </div>
      </div>

      {/* TAB 1: CLASSROOM ÜBUNG */}
      {activeTab === 'übung' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Classroom Exercise: From "The" to "A / An"
            </h3>
            <p className="text-stone-600 text-sm">
              In Slides 8 to 11, the teacher writes the definite noun with its gender. Your task is to turn it into a sentence using "Das ist ein..." or "Das ist eine..."!
            </p>
          </div>

          {/* Exercise Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {EXERCISES.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExercise(idx);
                  setRevealed(false);
                  playChime('click');
                }}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  selectedExercise === idx
                    ? 'bg-stone-900 text-amber-300 ring-2 ring-amber-400 shadow-md scale-105'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{ex.emoji}</span>
                <span>{ex.definite}</span>
              </button>
            ))}
          </div>

          {/* Active Exercise Stage */}
          <div className="bg-stone-900 border-4 border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white max-w-3xl mx-auto relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider mb-6">
              <span>{currEx.slide}</span>
              <span className={`px-2.5 py-0.5 rounded-full ${
                currEx.gender === 'maskulin' ? 'bg-blue-900/70 text-blue-300 border border-blue-700' :
                currEx.gender === 'feminin' ? 'bg-rose-900/70 text-rose-300 border border-rose-700' :
                currEx.gender === 'neutral' ? 'bg-amber-900/70 text-amber-300 border border-amber-700' :
                'bg-emerald-900/70 text-emerald-300 border border-emerald-700'
              }`}>
                {currEx.gender}
              </span>
            </div>

            {/* Blackboard Chalk Prompt */}
            <div className="text-center py-4 space-y-4">
              <div className="text-5xl sm:text-6xl animate-bounce">{currEx.emoji}</div>
              <div className="text-amber-300 font-serif text-3xl sm:text-4xl font-bold tracking-wide">
                {currEx.definite}
              </div>
              <p className="text-stone-300 text-sm italic">
                Rule formula: <span className="font-bold text-amber-200 underline">{currEx.rule}</span>
              </p>
            </div>

            {/* Answer Reveal Button / Content */}
            <div className="mt-8 pt-6 border-t border-stone-700 text-center">
              {!revealed ? (
                <button
                  onClick={() => {
                    setRevealed(true);
                    playChime('success');
                    speakGerman(currEx.sentence, isSlowMode);
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold px-6 py-3 rounded-2xl shadow-lg transition-transform active:scale-95 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Reveal Sentence: "Das ist..."</span>
                </button>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div
                    onClick={() => speakGerman(currEx.sentence, isSlowMode)}
                    className="cursor-pointer bg-stone-800/80 hover:bg-stone-800 p-4 rounded-2xl border-2 border-amber-400/80 transition-all group"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 group-hover:scale-105 transition-transform flex items-center justify-center gap-3">
                      <span>{currEx.sentence}</span>
                      <Volume2 className="w-6 h-6 text-amber-400 group-hover:animate-pulse" />
                    </div>
                    <div className="text-stone-300 text-sm mt-1">{currEx.english}</div>
                    <div className="text-xs text-amber-200/70 mt-0.5 font-mono">{currEx.pronunciation}</div>
                  </div>

                  <div className="bg-stone-800/50 p-4 rounded-xl text-left border border-stone-700/60 text-xs sm:text-sm text-stone-300 space-y-1">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" />
                      <span>Why this article?</span>
                    </div>
                    <p>{currEx.why}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER COMPARISON TABLE (SLIDE 12) */}
      {activeTab === 'table' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Slide 12: At a Glance (bestimmte vs. unbestimmte Artikel)
            </h3>
            <p className="text-stone-600 text-sm">
              Tap any row or audio icon on this blackboard to hear the full German transformation formula!
            </p>
          </div>

          {/* Blackboard Styled Comparison Table */}
          <div className="bg-stone-900 border-8 border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-w-4xl mx-auto font-sans">
            <div className="text-center border-b-2 border-stone-700 pb-4 mb-6">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">Original Slide 12 Matrix</span>
              <h4 className="text-2xl sm:text-3xl font-bold text-amber-300 font-serif">
                bestimmte vs. unbestimmte Artikel (im Nominativ)
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {TABLE_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  onClick={() => speakGerman(row.audioText, isSlowMode)}
                  className="bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer group shadow-md hover:border-amber-400/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="font-bold text-stone-200 text-sm sm:text-base flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                      {row.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakGerman(row.audioText, isSlowMode);
                      }}
                      className="px-3 py-1 bg-stone-700 group-hover:bg-amber-400 group-hover:text-stone-900 rounded-lg text-xs font-bold text-amber-300 transition-colors flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Formula</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center sm:text-left">
                    {/* Definite Column */}
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-700">
                      <div className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-1">
                        bestimmte (The)
                      </div>
                      <div className="text-2xl font-extrabold text-blue-300 mb-1">{row.definite}</div>
                      <div className="text-xs text-stone-300 italic">{row.exampleDef}</div>
                    </div>

                    {/* Indefinite Column */}
                    <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-700">
                      <div className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-1">
                        unbestimmte (A / An)
                      </div>
                      <div className="text-2xl font-extrabold text-amber-300 mb-1">{row.indefinite}</div>
                      <div className="text-xs text-stone-300 italic">{row.exampleIndef}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Blackboard Golden Note */}
            <div className="mt-6 pt-4 border-t border-stone-700 flex items-start gap-3 text-stone-300 text-xs sm:text-sm">
              <span className="text-xl">💡</span>
              <p>
                <strong className="text-amber-300">Memory Key:</strong> Masculine and Neutral are identical twins in the indefinite singular (both take <em className="text-white">ein</em>). Feminine always matches its definite partner ending in <em className="text-white">-e</em> (<em className="text-white">die → eine</em>). Plural indefinite has <em className="text-white">NO article at all (-)</em>!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FLASHLIGHT VS LASER POINTER ANALOGY */}
      {activeTab === 'analogy' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              The Flashlight vs. Laser Pointer Analogy
            </h3>
            <p className="text-stone-600 text-sm">
              How elders, beginners, and children easily understand when to pick "ein/eine" and when to switch to "der/die/das".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Flashlight */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🔦</span>
                <div>
                  <h4 className="text-lg font-bold text-amber-950">Step 1: The Flashlight</h4>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full">
                    unbestimmter Artikel (ein / eine)
                  </span>
                </div>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                When you enter a dark room and shine a broad flashlight, you spot something for the first time. You don't know its story yet. You simply announce:
              </p>
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200 text-center font-bold text-amber-900 space-y-1">
                <div>"Das ist ein Mann." / "Das ist eine Frau."</div>
                <div className="text-xs text-stone-500 font-normal">("That is a man." / "That is a woman.")</div>
              </div>
              <p className="text-xs text-stone-600">
                ⭐ Used whenever you introduce a noun into the conversation for the first time.
              </p>
            </div>

            {/* The Laser Pointer */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🎯</span>
                <div>
                  <h4 className="text-lg font-bold text-blue-950">Step 2: The Laser Pointer</h4>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full">
                    bestimmter Artikel (der / die / das)
                  </span>
                </div>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Now both you and the listener know what was introduced! You aim a precise laser pointer to tell something specific about that exact person or object:
              </p>
              <div className="bg-white p-3.5 rounded-2xl border border-blue-200 text-center font-bold text-blue-900 space-y-1">
                <div>"Der Mann wohnt in Paris." / "Die Frau hört Musik."</div>
                <div className="text-xs text-stone-500 font-normal">("The man lives in Paris." / "The woman hears music.")</div>
              </div>
              <p className="text-xs text-stone-600">
                ⭐ Used in the second sentence because the noun is now specific and identified!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
