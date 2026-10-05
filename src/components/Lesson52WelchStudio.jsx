import React, { useState } from 'react';
import { Volume2, Sparkles, Check, ArrowRight, Grid, HelpCircle, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson52WelchStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix', 'selector', 'adjectives'

  // Tab 1: Matrix State
  const [selectedCase, setSelectedCase] = useState('nominativ'); // 'nominativ', 'akkusativ', 'dativ'
  const [selectedGender, setSelectedGender] = useState('maskulin'); // 'maskulin', 'feminin', 'neutrum', 'plural'

  // Tab 2: Selector State
  const [chosenObject, setChosenObject] = useState('hut'); // 'hut', 'frau', 'buch', 'blumen', 'stift', 'haus'
  const [chosenCase, setChosenCase] = useState('nom'); // 'nom', 'akk', 'dat'

  const matrixData = {
    nominativ: {
      label: "Nominativ (Subject / Who or What?)",
      color: "blue",
      maskulin: { article: "der", welch: "Welcher", example: "Welcher Hut ist schicker?", answer: "Der schwarze Hut." },
      feminin: { article: "die", welch: "Welche", example: "Welche Frau ist deine Kollegin?", answer: "Die linke." },
      neutrum: { article: "das", welch: "Welches", example: "Welches Buch ist interessanter?", answer: "Das blaue." },
      plural: { article: "die", welch: "Welche", example: "Welche Blumen gefallen dir?", answer: "Die gelben Blumen." }
    },
    akkusativ: {
      label: "Akkusativ (Direct Object / Whom or What?)",
      color: "emerald",
      maskulin: { article: "den", welch: "Welchen", example: "Welchen Hut findest du schick?", answer: "Den schwarzen finde ich schick." },
      feminin: { article: "die", welch: "Welche", example: "Welche Frau hast du gesucht?", answer: "Die linke habe ich gesucht." },
      neutrum: { article: "das", welch: "Welches", example: "Welches Buch findest du interessant?", answer: "Das blaue." },
      plural: { article: "die", welch: "Welche", example: "Welche Blumen möchtest du kaufen?", answer: "Die gelben." }
    },
    dativ: {
      label: "Dativ (Preposition / Beneficiary / Receiver)",
      color: "purple",
      maskulin: { article: "dem", welch: "Welchem", example: "Zu welchem Hut passt meine Jacke?", answer: "Zu dem schwarzen." },
      feminin: { article: "der", welch: "Welcher", example: "Mit welcher Frau hast du gesprochen?", answer: "Mit der linken." },
      neutrum: { article: "dem", welch: "Welchem", example: "In welchem Buch kann man das lesen?", answer: "In dem blauen." },
      plural: { article: "den (+n)", welch: "Welchen (+n)", example: "Von welchen Blumen sprichst du?", answer: "Von den gelben." }
    }
  };

  const objectsConfig = {
    hut: {
      name: "der Hut",
      gender: "Maskulin (der)",
      icon: "🎩",
      nom: { q: "Welcher Hut ist schicker?", a: "Der schwarze Hut.", qEn: "Which hat is smarter?", aEn: "The black hat." },
      akk: { q: "Welchen Hut findest du schick?", a: "Den schwarzen finde ich schick.", qEn: "Which hat do you find smart?", aEn: "I find the black one smart." },
      dat: { q: "Zu welchem Hut passt meine Jacke?", a: "Zu dem schwarzen.", qEn: "Which hat does my jacket match?", aEn: "The black one." }
    },
    frau: {
      name: "die Frau",
      gender: "Feminin (die)",
      icon: "👩",
      nom: { q: "Welche Frau ist deine Kollegin?", a: "Die linke.", qEn: "Which woman is your colleague?", aEn: "The left one." },
      akk: { q: "Welche Frau hast du gesucht?", a: "Die linke habe ich gesucht.", qEn: "Which woman were you looking for?", aEn: "I was looking for the left one." },
      dat: { q: "Mit welcher Frau hast du gesprochen?", a: "Mit der linken.", qEn: "With which woman did you speak?", aEn: "With the one on the left." }
    },
    buch: {
      name: "das Buch",
      gender: "Neutrum (das)",
      icon: "📖",
      nom: { q: "Welches Buch ist interessanter?", a: "Das blaue.", qEn: "Which book is more interesting?", aEn: "The blue one." },
      akk: { q: "Welches Buch findest du interessant?", a: "Das blaue.", qEn: "Which book do you find interesting?", aEn: "The blue one." },
      dat: { q: "In welchem Buch kann man über Dinosaurier lesen?", a: "In dem blauen.", qEn: "In which book can you read about dinosaurs?", aEn: "In the blue one." }
    },
    blumen: {
      name: "die Blumen",
      gender: "Plural (die)",
      icon: "💐",
      nom: { q: "Welche Blumen gefallen dir?", a: "Die gelben Blumen.", qEn: "Which flowers do you like?", aEn: "The yellow flowers." },
      akk: { q: "Welche Blumen möchtest du kaufen?", a: "Die gelben.", qEn: "Which flowers do you want to buy?", aEn: "The yellow ones." },
      dat: { q: "Von welchen Blumen sprichst du?", a: "Von den gelben.", qEn: "Which flowers are you talking about?", aEn: "About the yellow ones." }
    },
    stift: {
      name: "der Stift",
      gender: "Maskulin (der)",
      icon: "🖊️",
      nom: { q: "Welcher Stift gehört dir?", a: "Der rote.", qEn: "Which pen is yours?", aEn: "The red one." },
      akk: { q: "Welchen Stift nimmst du?", a: "Den roten.", qEn: "Which pen are you taking?", aEn: "The red one." },
      dat: { q: "Mit welchem Stift schreibst du?", a: "Mit dem roten.", qEn: "With which pen do you write?", aEn: "With the red one." }
    },
    haus: {
      name: "das Haus",
      gender: "Neutrum (das)",
      icon: "🏡",
      nom: { q: "Welches Haus ist schöner?", a: "Das linke.", qEn: "Which house is prettier?", aEn: "The left one." },
      akk: { q: "Welches Haus möchtest du kaufen?", a: "Das linke.", qEn: "Which house do you want to buy?", aEn: "The left one." },
      dat: { q: "In welchem Haus wohnst du?", a: "In dem linken.", qEn: "In which house do you live?", aEn: "In the left one." }
    }
  };

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  const activeMatrixCell = matrixData[selectedCase][selectedGender];
  const activeObj = objectsConfig[chosenObject];
  const activeObjScenario = activeObj[chosenCase];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Interactive Studio • Lesson 52
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Fragepronomen "welch-" Studio
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-2xl">
            Discover the secret of German "Which?" — it has ZERO new endings! It simply mirrors the exact endings of <span className="font-bold text-yellow-300">der, die, das, den, dem</span>!
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-2 pt-3">
            <button
              onClick={() => { setActiveTab('matrix'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-white text-indigo-900 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>📊</span> 1. Slide 37 Master Matrix
            </button>
            <button
              onClick={() => { setActiveTab('selector'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'selector'
                  ? 'bg-white text-indigo-900 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🎩</span> 2. Interactive Object Q&A Selector
            </button>
            <button
              onClick={() => { setActiveTab('adjectives'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'adjectives'
                  ? 'bg-white text-indigo-900 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🎨</span> 3. Adjective Ending Rules
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Master Matrix (Slide 37) */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Matrix Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-indigo-100 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  The Master "welch-" Transformation Matrix (Slide 37)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Tap any cell to listen to the question, answer, and understand the mirror ending!
                </p>
              </div>
              <button
                onClick={() => handleSpeak("Nominativ: welcher, welche, welches, welche. Akkusativ: welchen, welche, welches, welche. Dativ: welchem, welcher, welchem, welchen.")}
                className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" /> Read Whole Table
              </button>
            </div>

            {/* Interactive Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b-2 border-indigo-100">
                    <th className="p-3 text-left text-xs font-black text-gray-400 uppercase">Fall (Case)</th>
                    <th className="p-3 text-xs font-black text-blue-700 uppercase bg-blue-50/50 rounded-t-xl">Maskulin</th>
                    <th className="p-3 text-xs font-black text-rose-700 uppercase bg-rose-50/50 rounded-t-xl">Feminin</th>
                    <th className="p-3 text-xs font-black text-emerald-700 uppercase bg-emerald-50/50 rounded-t-xl">Neutrum</th>
                    <th className="p-3 text-xs font-black text-purple-700 uppercase bg-purple-50/50 rounded-t-xl">Plural</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {Object.entries(matrixData).map(([cKey, cData]) => (
                    <tr key={cKey}>
                      <td className="p-3 text-left font-bold text-gray-800 capitalize">
                        {cKey}
                      </td>
                      {['maskulin', 'feminin', 'neutrum', 'plural'].map((gKey) => {
                        const cell = cData[gKey];
                        const isSelected = selectedCase === cKey && selectedGender === gKey;
                        return (
                          <td key={gKey} className="p-2">
                            <button
                              onClick={() => {
                                setSelectedCase(cKey);
                                setSelectedGender(gKey);
                                playChime('click');
                                speakGerman(`${cell.welch}. ${cell.example}`, isSlowMode);
                              }}
                              className={`w-full p-2.5 rounded-xl border transition-all text-left ${
                                isSelected
                                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 font-bold scale-102 border-transparent'
                                  : 'bg-gray-50/70 hover:bg-gray-100 border-gray-200 text-gray-900'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-extrabold">{cell.welch}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {cell.article}
                                </span>
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detailed Inspector for Selected Cell */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 sm:p-6 text-white space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  <span>🔎 Inspector:</span>
                  <span className="text-white capitalize">{selectedGender}</span> • <span className="text-yellow-300 capitalize">{selectedCase}</span>
                </div>
                <button
                  onClick={() => handleSpeak(`${activeMatrixCell.example} ${activeMatrixCell.answer}`)}
                  className="px-3 py-1 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Play Dialogue
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-xl space-y-1">
                  <span className="text-[11px] text-indigo-200 font-semibold block">Question:</span>
                  <p className="text-base sm:text-lg font-bold text-white">"{activeMatrixCell.example}"</p>
                </div>
                <div className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-xl space-y-1">
                  <span className="text-[11px] text-emerald-300 font-semibold block">Answer:</span>
                  <p className="text-base sm:text-lg font-bold text-white">"{activeMatrixCell.answer}"</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300">
                <span className="text-xl">💡</span>
                <div>
                  <span className="font-bold text-white">Mirror Rule: </span>
                  Article is <span className="text-yellow-300 font-bold">"{activeMatrixCell.article}"</span> ➔ Question word is <span className="text-yellow-300 font-bold">"{activeMatrixCell.welch}"</span>!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Object Q&A Selector */}
      {activeTab === 'selector' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Selector Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-indigo-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>1️⃣</span> Step 1: Choose Object / Person
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {Object.entries(objectsConfig).map(([key, obj]) => (
                  <button
                    key={key}
                    onClick={() => { setChosenObject(key); playChime('click'); }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                      chosenObject === key
                        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-3xl">{obj.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{obj.name}</p>
                      <p className="text-[11px] text-gray-500">{obj.gender}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>2️⃣</span> Step 2: Choose Case (Grammatical Role)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                {[
                  { id: 'nom', label: 'Nominativ (Subject)', desc: 'Which one is... / belongs to...' },
                  { id: 'akk', label: 'Akkusativ (Direct Object)', desc: 'Which one do you find / want...' },
                  { id: 'dat', label: 'Dativ (Preposition / zu, in, von)', desc: 'With / In / To which one...' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setChosenCase(c.id); playChime('click'); }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      chosenCase === c.id
                        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <p className="text-sm font-bold text-gray-900">{c.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dialogue Stage Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
                <span>{activeObj.icon}</span> Live Dialogue Showcase
              </div>
              <button
                onClick={() => handleSpeak(`${activeObjScenario.q} ${activeObjScenario.a}`)}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-extrabold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Volume2 className="w-4 h-4" /> Play Question & Answer
              </button>
            </div>

            {/* Question Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300 uppercase">Question:</span>
                <button
                  onClick={() => handleSpeak(activeObjScenario.q)}
                  className="p-1 hover:bg-white/20 rounded-lg text-teal-200"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                "{activeObjScenario.q}"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {activeObjScenario.qEn}
              </p>
            </div>

            {/* Answer Card */}
            <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase">Answer:</span>
                <button
                  onClick={() => handleSpeak(activeObjScenario.a)}
                  className="p-1 hover:bg-white/20 rounded-lg text-emerald-200"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                "{activeObjScenario.a}"
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200">
                {activeObjScenario.aEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Adjective Ending Rules */}
      {activeTab === 'adjectives' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-indigo-100 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                Short Answer Blueprint: Definite Article + Adjective
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Notice the patterns in how Germans give quick, snappy answers to "Which?" questions!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <span className="px-2.5 py-1 bg-blue-200 text-blue-900 rounded-full text-xs font-bold uppercase">
                  Nominativ (-e)
                </span>
                <p className="text-base font-bold text-gray-900">
                  Der rote. / Die linke. / Das blaue.
                </p>
                <p className="text-xs text-gray-600">
                  In Nominative singular, the adjective ending after der/die/das is always <span className="font-bold text-blue-700">-e</span>!
                </p>
              </div>

              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <span className="px-2.5 py-1 bg-emerald-200 text-emerald-900 rounded-full text-xs font-bold uppercase">
                  Akkusativ Masculine (-en)
                </span>
                <p className="text-base font-bold text-gray-900">
                  Den schwarzen finde ich schick.
                </p>
                <p className="text-xs text-gray-600">
                  Masculine Akkusativ changes <span className="font-bold text-emerald-700">den</span> + adjective ending <span className="font-bold text-emerald-700">-en</span>!
                </p>
              </div>

              <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                <span className="px-2.5 py-1 bg-purple-200 text-purple-900 rounded-full text-xs font-bold uppercase">
                  All Dativ (-en)
                </span>
                <p className="text-base font-bold text-gray-900">
                  Zu dem schwarzen. / Mit der linken. / In dem blauen.
                </p>
                <p className="text-xs text-gray-600">
                  Every single Dativ adjective ending after a definite article ends in <span className="font-bold text-purple-700">-en</span>!
                </p>
              </div>

              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <span className="px-2.5 py-1 bg-amber-200 text-amber-900 rounded-full text-xs font-bold uppercase">
                  Plural All Cases (-en)
                </span>
                <p className="text-base font-bold text-gray-900">
                  Die gelben. / Von den gelben.
                </p>
                <p className="text-xs text-gray-600">
                  Plural adjectives after definite articles always end in <span className="font-bold text-amber-700">-en</span>!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
