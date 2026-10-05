import React, { useState } from 'react';
import { Volume2, Sparkles, Check, ArrowRight, Grid, HelpCircle, ShoppingBag, Eye, Shirt, Layers } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson53DiesStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix', 'boutique', 'duet'

  // Tab 1: Matrix State
  const [selectedCase, setSelectedCase] = useState('nominativ'); // 'nominativ', 'akkusativ', 'dativ'
  const [selectedGender, setSelectedGender] = useState('maskulin'); // 'maskulin', 'feminin', 'neutrum', 'plural'

  // Tab 2: Boutique Simulator State
  const [boutiqueItem, setBoutiqueItem] = useState('pullover'); // 'pullover', 'bluse', 'auto', 'kleid', 'schuhe', 'kinder'
  const [boutiqueCase, setBoutiqueCase] = useState('nom'); // 'nom', 'akk', 'dat'

  const matrixData = {
    nominativ: {
      label: "Nominativ (Subject / Who or What?)",
      color: "blue",
      maskulin: { article: "der", dies: "dieser", welch: "welcher", example: "Was kostet dieser Pullover?", en: "How much is this sweater?" },
      feminin: { article: "die", dies: "diese", welch: "welche", example: "Diese Bluse ist wunderschön.", en: "This blouse is beautiful." },
      neutrum: { article: "das", dies: "dieses", welch: "welches", example: "Dieses Auto gefällt mir.", en: "I like this car." },
      plural: { article: "die", dies: "diese", welch: "welche", example: "Was kosten diese Schuhe?", en: "What do these shoes cost?" }
    },
    akkusativ: {
      label: "Akkusativ (Direct Object / Whom or What?)",
      color: "emerald",
      maskulin: { article: "den", dies: "diesen", welch: "welchen", example: "Wie finden Sie diesen Pullover?", en: "How do you like this sweater?" },
      feminin: { article: "die", dies: "diese", welch: "welche", example: "Wie findest du diese Bluse?", en: "How do you like this blouse?" },
      neutrum: { article: "das", dies: "dieses", welch: "welches", example: "Wie findest du dieses Auto?", en: "How do you like this car?" },
      plural: { article: "die", dies: "diese", welch: "welche", example: "Kaufst du diese Schuhe?", en: "Are you buying these shoes?" }
    },
    dativ: {
      label: "Dativ (Preposition / zu, mit, in, von)",
      color: "purple",
      maskulin: { article: "dem", dies: "diesem", welch: "welchem", example: "Was passt zu diesem Pullover?", en: "What matches with this sweater?" },
      feminin: { article: "der", dies: "dieser", welch: "welcher", example: "Was passt zu dieser Bluse?", en: "What matches with this blouse?" },
      neutrum: { article: "dem", dies: "diesem", welch: "welchem", example: "Willst du mit diesem Auto fahren?", en: "Do you want to drive this car?" },
      plural: { article: "den (+n)", dies: "diesen (+n)", welch: "welchen (+n)", example: "In diesen Schuhen siehst du elegant aus!", en: "In these shoes you look elegant!" }
    }
  };

  const boutiqueConfig = {
    pullover: {
      name: "der Pullover",
      gender: "Maskulin (der)",
      icon: "🧥",
      nom: { de: "Was kostet dieser Pullover?", en: "How much is this sweater?", rule: "der Pullover ➔ dies-ER Pullover" },
      akk: { de: "Wie finden Sie diesen Pullover?", en: "How do you like this sweater?", rule: "den Pullover ➔ dies-EN Pullover" },
      dat: { de: "Was passt zu diesem Pullover?", en: "What matches with this sweater?", rule: "dem Pullover ➔ zu dies-EM Pullover" }
    },
    bluse: {
      name: "die Bluse",
      gender: "Feminin (die)",
      icon: "👚",
      nom: { de: "Diese Bluse ist wunderschön.", en: "This blouse is beautiful.", rule: "die Bluse ➔ dies-E Bluse" },
      akk: { de: "Wie findest du diese Bluse?", en: "How do you like this blouse?", rule: "die Bluse ➔ dies-E Bluse" },
      dat: { de: "Was passt zu dieser Bluse?", en: "What matches with this blouse?", rule: "der Bluse ➔ zu dies-ER Bluse" }
    },
    auto: {
      name: "das Auto",
      gender: "Neutrum (das)",
      icon: "🚗",
      nom: { de: "Dieses Auto gefällt mir.", en: "I like this car.", rule: "das Auto ➔ dies-ES Auto" },
      akk: { de: "Wie findest du dieses Auto?", en: "How do you like this car?", rule: "das Auto ➔ dies-ES Auto" },
      dat: { de: "Willst du mit diesem Auto fahren?", en: "Do you want to drive this car?", rule: "dem Auto ➔ mit dies-EM Auto" }
    },
    kleid: {
      name: "das Kleid",
      gender: "Neutrum (das)",
      icon: "👗",
      nom: { de: "Dieses Kleid ist sehr elegant.", en: "This dress is very elegant.", rule: "das Kleid ➔ dies-ES Kleid" },
      akk: { de: "Ich finde dieses Kleid sehr schön.", en: "I find this dress very pretty.", rule: "das Kleid ➔ dies-ES Kleid" },
      dat: { de: "In diesem Kleid gehst du zur Party?", en: "In this dress you are going to the party?", rule: "dem Kleid ➔ in dies-EM Kleid" }
    },
    schuhe: {
      name: "die Schuhe",
      gender: "Plural (die)",
      icon: "👠",
      nom: { de: "Was kosten diese Schuhe?", en: "What do these shoes cost?", rule: "die Schuhe ➔ dies-E Schuhe" },
      akk: { de: "Kaufst du diese Schuhe?", en: "Are you buying these shoes?", rule: "die Schuhe ➔ dies-E Schuhe" },
      dat: { de: "In diesen Schuhen siehst du elegant aus!", en: "In these shoes you look elegant!", rule: "den Schuhen ➔ in dies-EN Schuhen (+n)" }
    },
    kinder: {
      name: "die Kinder",
      gender: "Plural (die)",
      icon: "🧸",
      nom: { de: "Diese Kinder sind sehr fröhlich.", en: "These children are very cheerful.", rule: "die Kinder ➔ dies-E Kinder" },
      akk: { de: "Kennst du diese Kinder?", en: "Do you know these children?", rule: "die Kinder ➔ dies-E Kinder" },
      dat: { de: "Mit diesen Kindern spiele ich gern.", en: "I like playing with these children.", rule: "den Kindern ➔ mit dies-EN Kindern (+n)" }
    }
  };

  const duetPairs = [
    {
      q: "Welchen Pullover nimmst du?",
      qEn: "Which sweater are you taking?",
      a: "Diesen Pullover nehme ich!",
      aEn: "I am taking THIS sweater!",
      badge: "Maskulin Akkusativ",
      icon: "🧥"
    },
    {
      q: "Zu welcher Bluse passt der Rock?",
      qEn: "Which blouse does the skirt match with?",
      a: "Zu dieser Bluse passt der Rock.",
      aEn: "The skirt matches with THIS blouse.",
      badge: "Feminin Dativ",
      icon: "👚"
    },
    {
      q: "Welches Auto möchtest du kaufen?",
      qEn: "Which car would you like to buy?",
      a: "Dieses Auto gefällt mir am besten!",
      aEn: "I like THIS car the best!",
      badge: "Neutrum Akkusativ / Nom",
      icon: "🚗"
    },
    {
      q: "Von welchen Blumen sprichst du?",
      qEn: "Which flowers are you talking about?",
      a: "Von diesen Blumen spreche ich!",
      aEn: "I am talking about THESE flowers!",
      badge: "Plural Dativ",
      icon: "💐"
    }
  ];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  const activeMatrixCell = matrixData[selectedCase][selectedGender];
  const activeBoutique = boutiqueConfig[boutiqueItem];
  const activeBoutiqueScenario = activeBoutique[boutiqueCase];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Interactive Studio • Lesson 53
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Demonstrativartikel "dies-" Studio
          </h2>
          <p className="text-amber-100 text-sm sm:text-base max-w-2xl">
            Point with 100% confidence to <span className="font-bold text-yellow-300">this sweater, this blouse, this car, and these shoes</span> across all cases!
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-3">
            <button
              onClick={() => { setActiveTab('matrix'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-white text-rose-700 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>📊</span> 1. Slide 24 Master Matrix
            </button>
            <button
              onClick={() => { setActiveTab('boutique'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'boutique'
                  ? 'bg-white text-rose-700 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🛍️</span> 2. Boutique & Item Simulator
            </button>
            <button
              onClick={() => { setActiveTab('duet'); playChime('click'); }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'duet'
                  ? 'bg-white text-rose-700 shadow-lg scale-105 ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🤝</span> 3. "Welch-" vs "Dies-" Duet
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Master Matrix (Slide 24) */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-rose-100 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  The Complete "dies-" Master Matrix (Slide 24)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Click any cell to compare the definite article, "welch-", and "dies-"!
                </p>
              </div>
              <button
                onClick={() => handleSpeak("Nominativ: dieser, diese, dieses, diese. Akkusativ: diesen, diese, dieses, diese. Dativ: diesem, dieser, diesem, diesen.")}
                className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" /> Read Full Table
              </button>
            </div>

            {/* Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b-2 border-rose-100">
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
                                speakGerman(`${cell.dies}. ${cell.example}`, isSlowMode);
                              }}
                              className={`w-full p-2.5 rounded-xl border transition-all text-left ${
                                isSelected
                                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300 font-bold scale-102 border-transparent'
                                  : 'bg-gray-50/70 hover:bg-gray-100 border-gray-200 text-gray-900'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-extrabold">{cell.dies}</span>
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

            {/* Inspector Box */}
            <div className="bg-gradient-to-br from-slate-900 to-rose-950 rounded-2xl p-5 sm:p-6 text-white space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                  <span>🔎 Inspector:</span>
                  <span className="text-white capitalize">{selectedGender}</span> • <span className="text-yellow-300 capitalize">{selectedCase}</span>
                </div>
                <button
                  onClick={() => handleSpeak(activeMatrixCell.example)}
                  className="px-3 py-1 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Play Example
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block mb-1">Definite Article</span>
                  <p className="text-lg font-black text-amber-300">{activeMatrixCell.article}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block mb-1">Question (Welch-)</span>
                  <p className="text-lg font-black text-teal-300">{activeMatrixCell.welch}</p>
                </div>
                <div className="bg-rose-500/30 border border-rose-400/40 p-3 rounded-xl">
                  <span className="text-[10px] text-rose-200 uppercase font-bold block mb-1">Demonstrative (Dies-)</span>
                  <p className="text-lg font-black text-white">{activeMatrixCell.dies}</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
                <p className="text-base sm:text-lg font-bold text-white">
                  "{activeMatrixCell.example}"
                </p>
                <p className="text-xs text-rose-200">
                  {activeMatrixCell.en}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Boutique & Item Simulator */}
      {activeTab === 'boutique' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-rose-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>1️⃣</span> Step 1: Select Item to Point At
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {Object.entries(boutiqueConfig).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => { setBoutiqueItem(key); playChime('click'); }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                      boutiqueItem === key
                        ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.name}</p>
                      <p className="text-[11px] text-gray-500">{item.gender}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>2️⃣</span> Step 2: Choose Sentence Role / Case
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                {[
                  { id: 'nom', label: 'Nominativ (Subject)', desc: 'This item is / costs...' },
                  { id: 'akk', label: 'Akkusativ (Direct Object)', desc: 'How do you like / find this item...' },
                  { id: 'dat', label: 'Dativ (Preposition zu / mit / in)', desc: 'What matches with / drive with this...' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setBoutiqueCase(c.id); playChime('click'); }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      boutiqueCase === c.id
                        ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-200 shadow-sm'
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

          {/* Boutique Showcase Card */}
          <div className="bg-gradient-to-br from-rose-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" /> Live Boutique Sentence
              </div>
              <button
                onClick={() => handleSpeak(activeBoutiqueScenario.de)}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Volume2 className="w-4 h-4" /> Listen to Sentence
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center space-y-3">
              <span className="text-5xl inline-block mb-1">{activeBoutique.icon}</span>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                "{activeBoutiqueScenario.de}"
              </h4>
              <p className="text-sm sm:text-base text-rose-200 font-semibold">
                "{activeBoutiqueScenario.en}"
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3 text-xs text-slate-300">
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Grammar Blueprint: </span>
                <span className="text-amber-300 font-bold">{activeBoutiqueScenario.rule}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Welch- vs. Dies- Duet */}
      {activeTab === 'duet' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-rose-100 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                The Natural German "Welch-" & "Dies-" Dialogue Duet
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Notice how the question with <span className="font-bold text-indigo-600">welch-</span> and the answer with <span className="font-bold text-rose-600">dies-</span> share the exact same ending rhythm!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {duetPairs.map((pair, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-br from-slate-50 to-rose-50/40 rounded-2xl border border-rose-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[11px] font-bold rounded-full">
                      {pair.badge}
                    </span>
                    <button
                      onClick={() => handleSpeak(`${pair.q} ${pair.a}`)}
                      className="p-1.5 hover:bg-rose-200 rounded-lg text-rose-700 transition-colors"
                      title="Play dialogue"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-indigo-700">❓ {pair.q}</p>
                    <p className="text-[11px] text-gray-500 italic">{pair.qEn}</p>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-rose-100">
                    <p className="text-xs font-bold text-rose-700">👉 {pair.a}</p>
                    <p className="text-[11px] text-gray-500 italic">{pair.aEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
