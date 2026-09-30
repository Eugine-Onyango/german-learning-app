import React, { useState } from 'react';
import { Volume2, Sparkles, ShieldCheck, Zap, HelpCircle, ArrowRight, Lightbulb, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson25AkkusativStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('transformer');
  const [currentCase, setCurrentCase] = useState('akkusativ'); // 'nominativ' or 'akkusativ'
  const [articleType, setArticleType] = useState('unbestimmt'); // 'bestimmt', 'unbestimmt', 'negativ'
  const [selectedAppleIdx, setSelectedAppleIdx] = useState(0);

  const handlePlayAudio = (text) => {
    speakGerman(text, isSlowMode);
    playChime();
  };

  // Noun data for Transformer
  const TRANSFORMER_NOUNS = [
    {
      key: 'masculine',
      gender: 'Maskulin (der)',
      noun: 'Apfel (Apple)',
      icon: '🍏',
      nom: { bestimmt: 'der Apfel', unbestimmt: 'ein Apfel', negativ: 'kein Apfel' },
      akk: { bestimmt: 'den Apfel', unbestimmt: 'einen Apfel', negativ: 'keinen Apfel' },
      sentences: {
        nom: 'Der Apfel ist lecker. (Nominativ)',
        akk: 'Ich esse einen Apfel. (Akkusativ)'
      },
      changed: true,
      changeNote: 'Transforms into -EN! (der -> den, ein -> einen, kein -> keinen)'
    },
    {
      key: 'feminine',
      gender: 'Feminin (die)',
      noun: 'Katze (Cat)',
      icon: '🐱',
      nom: { bestimmt: 'die Katze', unbestimmt: 'eine Katze', negativ: 'keine Katze' },
      akk: { bestimmt: 'die Katze', unbestimmt: 'eine Katze', negativ: 'keine Katze' },
      sentences: {
        nom: 'Die Katze schläft. (Nominativ)',
        akk: 'Ich habe eine Katze. (Akkusativ)'
      },
      changed: false,
      changeNote: '100% Identical! Zero change from Nominativ.'
    },
    {
      key: 'neuter',
      gender: 'Neutral (das)',
      noun: 'Auto (Car)',
      icon: '🚗',
      nom: { bestimmt: 'das Auto', unbestimmt: 'ein Auto', negativ: 'kein Auto' },
      akk: { bestimmt: 'das Auto', unbestimmt: 'ein Auto', negativ: 'kein Auto' },
      sentences: {
        nom: 'Das Auto ist rot. (Nominativ)',
        akk: 'Ich habe ein Auto. (Akkusativ)'
      },
      changed: false,
      changeNote: '100% Identical! Zero change from Nominativ.'
    },
    {
      key: 'plural',
      gender: 'Plural (die)',
      noun: 'Bücher (Books)',
      icon: '📚',
      nom: { bestimmt: 'die Bücher', unbestimmt: 'Bücher', negativ: 'keine Bücher' },
      akk: { bestimmt: 'die Bücher', unbestimmt: 'Bücher', negativ: 'keine Bücher' },
      sentences: {
        nom: 'Die Bücher sind neu. (Nominativ)',
        akk: 'Wir kaufen Bücher. (Akkusativ)'
      },
      changed: false,
      changeNote: '100% Identical! Zero change from Nominativ.'
    }
  ];

  // Slide 27 Apple Diagnostic Data
  const APPLE_SENTENCES = [
    {
      num: 1,
      german: "Das ist ein Apfel.",
      highlight: "ein",
      role: "Nominativ (Predicate Noun with 'sein')",
      en: "This is an apple.",
      explanation: "After the verb 'sein' (ist), the case is ALWAYS Nominativ! The apple is simply being identified.",
      subjekt: "Das",
      caseType: "Nominativ",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      num: 2,
      german: "Der Apfel ist grün.",
      highlight: "Der",
      role: "Nominativ (Subject of the Sentence)",
      en: "The apple is green.",
      explanation: "Who or what is green? 'Der Apfel'! It is the Subjekt performing the state of being green.",
      subjekt: "Der Apfel",
      caseType: "Nominativ",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      num: 3,
      german: "Ich habe einen Apfel.",
      highlight: "einen",
      role: "Akkusativ (Direct Object of 'haben')",
      en: "I have an apple.",
      explanation: "'Ich' is the Subjekt doing the having. 'einen Apfel' is the direct Objekt receiving the action, so masculine 'ein' becomes 'einen'!",
      subjekt: "Ich",
      objekt: "einen Apfel",
      caseType: "Akkusativ",
      badgeColor: "bg-amber-600 text-white"
    },
    {
      num: 4,
      german: "Den Apfel finde ich süß.",
      highlight: "Den",
      role: "Akkusativ (Direct Object in Position 1!)",
      en: "I find the apple sweet.",
      explanation: "Even though 'Den Apfel' sits in Position 1 for emphasis, 'ich' is still the Subjekt doing the finding! The apple remains the direct Objekt in Akkusativ: 'Den Apfel'!",
      subjekt: "ich",
      objekt: "Den Apfel",
      caseType: "Akkusativ",
      badgeColor: "bg-amber-600 text-white"
    }
  ];

  // Slide 28 Master Chalkboard Matrix
  const MASTER_MATRIX = [
    {
      gender: 'Maskulin (der)',
      icon: '👨 🍏',
      bestimmt: 'den',
      unbestimmt: 'einen',
      negativ: 'keinen',
      highlightRow: true,
      note: '⚡ All end in -EN!'
    },
    {
      gender: 'Feminin (die)',
      icon: '👩 🐱',
      bestimmt: 'die',
      unbestimmt: 'eine',
      negativ: 'keine',
      highlightRow: false,
      note: '✓ Stays exactly like Nominativ'
    },
    {
      gender: 'Neutral (das)',
      icon: '👶 🚗',
      bestimmt: 'das',
      unbestimmt: 'ein',
      negativ: 'kein',
      highlightRow: false,
      note: '✓ Stays exactly like Nominativ'
    },
    {
      gender: 'Plural (die)',
      icon: '👥 📚',
      bestimmt: 'die',
      unbestimmt: '–',
      negativ: 'keine',
      highlightRow: false,
      note: '✓ Stays exactly like Nominativ'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-amber-500/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Lesson 25 Interactive Studio
            </span>
            <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-semibold">
              Slide 1–28 Complete Akkusativ Guide
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-emerald-200">
            Artikel im Akkusativ
          </h2>
          <p className="text-stone-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            The direct object case made completely painless! Experience the golden secret: <span className="text-amber-300 font-extrabold">ONLY Masculine (der $\rightarrow$ den, ein $\rightarrow$ einen, kein $\rightarrow$ keinen) changes!</span> Feminine, Neuter, and Plural are <span className="text-emerald-300 font-extrabold">100% identical to Nominativ</span>!
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('transformer')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'transformer'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300 scale-105'
                  : 'bg-white/10 text-amber-200 hover:bg-white/20'
              }`}
            >
              <span>⚡</span>
              <span>The "Only Masculine Changes!" Machine</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'diagnostic'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300 scale-105'
                  : 'bg-white/10 text-amber-200 hover:bg-white/20'
              }`}
            >
              <span>🍏</span>
              <span>Slide 27 Apple Diagnostic Lab</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300 scale-105'
                  : 'bg-white/10 text-amber-200 hover:bg-white/20'
              }`}
            >
              <span>📋</span>
              <span>Slide 28 Master Blackboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: The "Only Masculine Changes!" Transformer Machine */}
      {activeTab === 'transformer' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600" />
                  Select Case & Article Type
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Toggle between Nominativ (Subject) and Akkusativ (Object) to see the magic transformation!
                </p>
              </div>

              {/* Case Toggle Button */}
              <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
                <button
                  onClick={() => setCurrentCase('nominativ')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentCase === 'nominativ'
                      ? 'bg-blue-600 text-white shadow-sm scale-105'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Nominativ (Subject)
                </button>
                <button
                  onClick={() => setCurrentCase('akkusativ')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentCase === 'akkusativ'
                      ? 'bg-amber-600 text-white shadow-sm scale-105'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Akkusativ (Direct Object)
                </button>
              </div>
            </div>

            {/* Article Type Pills */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-stone-100">
              {[
                { id: 'bestimmt', label: 'Bestimmt (The: der/die/das/den)', icon: '🎯' },
                { id: 'unbestimmt', label: 'Unbestimmt (A/An: ein/eine/einen)', icon: '✨' },
                { id: 'negativ', label: 'Negativ (No/Not a: kein/keine/keinen)', icon: '🚫' }
              ].map(art => (
                <button
                  key={art.id}
                  onClick={() => setArticleType(art.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    articleType === art.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <span>{art.icon}</span>
                  <span>{art.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4 Noun Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRANSFORMER_NOUNS.map((item) => {
              const activeWord = currentCase === 'nominativ' ? item.nom[articleType] : item.akk[articleType];
              const sentence = currentCase === 'nominativ' ? item.sentences.nom : item.sentences.akk;

              return (
                <div
                  key={item.key}
                  className={`rounded-3xl p-5 border-2 shadow-sm space-y-4 transition-all relative overflow-hidden ${
                    item.changed && currentCase === 'akkusativ'
                      ? 'border-amber-400 bg-amber-50/80 text-amber-950 ring-2 ring-amber-300/50'
                      : 'border-stone-200 bg-white text-stone-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-stone-500">
                          {item.gender}
                        </span>
                        <h4 className="font-black text-lg text-stone-900">{item.noun}</h4>
                      </div>
                    </div>

                    {item.changed && currentCase === 'akkusativ' ? (
                      <span className="text-xs bg-amber-500 text-stone-950 font-black px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        Transformed to -EN!
                      </span>
                    ) : (
                      <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        100% Unchanged
                      </span>
                    )}
                  </div>

                  {/* Active Form Display */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500 uppercase">
                        Current Form ({currentCase.toUpperCase()}):
                      </span>
                      <button
                        onClick={() => handlePlayAudio(`${activeWord}. ${sentence}`)}
                        className="p-1.5 bg-white hover:bg-stone-200 text-stone-800 rounded-lg shadow-xs transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-amber-700" />
                      </button>
                    </div>

                    <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-stone-900">
                      {activeWord}
                    </div>

                    <p className="text-xs text-stone-600 italic">
                      Example: "{sentence}"
                    </p>
                  </div>

                  <p className="text-xs text-stone-500 font-medium">
                    {item.changeNote}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Reassuring Big Relief Banner */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">The Golden Relief Rule: </span>
              In Akkusativ, you only have to think about <strong>Masculine (der)</strong>. If a word is feminine (die Katze), neuter (das Auto), or plural (die Bücher), relax! They look 100% identical in both Nominativ and Akkusativ!
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Slide 27 Apple Diagnostic Lab */}
      {activeTab === 'diagnostic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-amber-200 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  Slide 27 Master Exercise
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1 flex items-center gap-2">
                  <span>🍏</span> Akkusativ oder Nominativ? (The 4 Apple Sentences)
                </h3>
              </div>
              <span className="text-4xl">🍏</span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              Slide 27 uses the humble apple (<strong>der Apfel</strong>) to demonstrate exactly when a noun stays in <strong>Nominativ</strong> vs. when it steps into <strong>Akkusativ</strong>:
            </p>

            {/* Interactive Sentence List */}
            <div className="space-y-3">
              {APPLE_SENTENCES.map((item, idx) => {
                const isSelected = selectedAppleIdx === idx;
                return (
                  <div
                    key={item.num}
                    onClick={() => {
                      setSelectedAppleIdx(idx);
                      handlePlayAudio(item.german);
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-300'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                          {item.num}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-stone-900">
                          {item.german}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                          {item.caseType}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(item.german);
                          }}
                          className="p-1.5 bg-white text-stone-700 hover:bg-amber-100 rounded-lg shadow-xs"
                        >
                          <Volume2 className="w-4 h-4 text-amber-700" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 italic pl-10">
                      "{item.en}" • <span className="font-semibold text-stone-700">{item.role}</span>
                    </p>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-amber-200 text-xs text-stone-700 pl-10 space-y-1 animate-fade-in">
                        <p className="font-medium">
                          <strong>Why:</strong> {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Slide 28 Master Blackboard */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-[#1a261e] text-white rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-900/40 relative">
            <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-mono tracking-tight">
                    Slide 28: Artikel im Akkusativ
                  </h3>
                  <p className="text-xs text-stone-300">
                    Tap any cell below to hear the native German pronunciation!
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full font-bold">
                Master Table
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="border-b-2 border-white/30 text-amber-200 text-xs sm:text-sm font-mono uppercase tracking-wider">
                    <th className="py-2.5 px-3">Geschlecht (Gender)</th>
                    <th className="py-2.5 px-3 text-blue-300">bestimmt (The)</th>
                    <th className="py-2.5 px-3 text-emerald-300">unbestimmt (A/An)</th>
                    <th className="py-2.5 px-3 text-rose-300">negativ (No / Not a)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-sans">
                  {MASTER_MATRIX.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        row.highlightRow
                          ? 'bg-amber-500/15 hover:bg-amber-500/25 border-l-4 border-amber-400'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <td className="py-3.5 px-3 font-bold text-amber-100 flex items-center gap-2">
                        <span>{row.icon}</span>
                        <span>{row.gender}</span>
                      </td>

                      {/* Bestimmt */}
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.bestimmt)}
                          className={`font-black px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                            row.highlightRow
                              ? 'text-amber-300 bg-amber-950/60 ring-1 ring-amber-400'
                              : 'text-blue-300 hover:text-white'
                          }`}
                        >
                          <span>{row.bestimmt}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>

                      {/* Unbestimmt */}
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => row.unbestimmt !== '–' && handlePlayAudio(row.unbestimmt)}
                          className={`font-black px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                            row.highlightRow
                              ? 'text-amber-300 bg-amber-950/60 ring-1 ring-amber-400'
                              : 'text-emerald-300 hover:text-white'
                          }`}
                        >
                          <span>{row.unbestimmt}</span>
                          {row.unbestimmt !== '–' && (
                            <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                          )}
                        </button>
                      </td>

                      {/* Negativ */}
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.negativ)}
                          className={`font-black px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                            row.highlightRow
                              ? 'text-amber-300 bg-amber-950/60 ring-1 ring-amber-400'
                              : 'text-rose-300 hover:text-white'
                          }`}
                        >
                          <span>{row.negativ}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Key */}
            <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between text-xs text-stone-300 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Maskulin: den / einen / keinen (-EN ending)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Feminin, Neutral, Plural: identical to Nominativ!
                </span>
              </div>
              <span className="text-amber-300 italic font-mono">
                Slide 28 Reference
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
