import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, Clock, HelpCircle, MessageSquare, ShieldCheck, RefreshCw, Layers, BookOpen, AlertTriangle } from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary2GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('verbs'); // 'verbs', 'articles', 'satzbau', 'negation', 'redemittel'

  // Station 1: Verb Matrix State
  const [selectedVerb, setSelectedVerb] = useState('kommen'); // 'kommen', 'heissen', 'sein', 'haben'
  const [selectedPronoun, setSelectedPronoun] = useState('ich');

  // Station 2: Article Scanner State
  const [selectedNoun, setSelectedNoun] = useState('bleistift'); // 'bleistift', 'heft', 'lampe'
  const [selectedArticleType, setSelectedArticleType] = useState('bestimmt'); // 'bestimmt', 'unbestimmt', 'negativ'

  // Station 3: Satzbau Machine State
  const [satzType, setSatzType] = useState('aussage'); // 'aussage', 'inversion', 'wfrage', 'janein'

  // Station 4: Doch Simulator State
  const [dochScenario, setDochScenario] = useState('bus'); // 'bus', 'frei', 'heft', 'zeit'
  const [userDochReply, setUserDochReply] = useState(null);

  // Verb Conjugation Table Data (Pages 1 & 2)
  const verbData = {
    kommen: {
      name: 'kommen (to come)',
      type: 'Regular Verb',
      note: 'Regular verb blueprint: stem "komm-" + endings (-e, -st, -t, -en, -t, -en).',
      conjugations: {
        ich: { form: 'komme', ending: '-e', full: 'ich komme' },
        du: { form: 'kommst', ending: '-st', full: 'du kommst' },
        'er/es/sie': { form: 'kommt', ending: '-t', full: 'er/es/sie kommt' },
        wir: { form: 'kommen', ending: '-en', full: 'wir kommen' },
        ihr: { form: 'kommt', ending: '-t', full: 'ihr kommt' },
        'sie/Sie': { form: 'kommen', ending: '-en', full: 'sie/Sie kommen' }
      }
    },
    heissen: {
      name: 'heißen (to be named)',
      type: 'Special Stem Rule (-ß)',
      note: 'CRITICAL: The stem "heiß-" ends in "ß" (sharp s), so "du" adds ONLY "-t" (du heißt), not "-st"!',
      conjugations: {
        ich: { form: 'heiße', ending: '-e', full: 'ich heiße' },
        du: { form: 'heißt', ending: '-t (!)', full: 'du heißt' },
        'er/es/sie': { form: 'heißt', ending: '-t', full: 'er/es/sie heißt' },
        wir: { form: 'heißen', ending: '-en', full: 'wir heißen' },
        ihr: { form: 'heißt', ending: '-t', full: 'ihr heißt' },
        'sie/Sie': { form: 'heißen', ending: '-en', full: 'sie/Sie heißen' }
      }
    },
    sein: {
      name: 'sein (to be)',
      type: 'King of Irregular Verbs',
      note: 'Completely unique forms! Essential for identity, location, and clock time.',
      conjugations: {
        ich: { form: 'bin', ending: 'irregular', full: 'ich bin' },
        du: { form: 'bist', ending: 'irregular', full: 'du bist' },
        'er/es/sie': { form: 'ist', ending: 'irregular', full: 'er/es/sie ist' },
        wir: { form: 'sind', ending: 'irregular', full: 'wir sind' },
        ihr: { form: 'seid', ending: 'irregular', full: 'ihr seid' },
        'sie/Sie': { form: 'sind', ending: 'irregular', full: 'sie/Sie sind' }
      }
    },
    haben: {
      name: 'haben (to have)',
      type: 'Queen of Possession',
      note: 'Subtle stem drop: "du hast" and "er hat" drop the "b" from the stem "hab-".',
      conjugations: {
        ich: { form: 'habe', ending: '-e', full: 'ich habe' },
        du: { form: 'hast', ending: '-st (drops b)', full: 'du hast' },
        'er/es/sie': { form: 'hat', ending: '-t (drops b)', full: 'er/es/sie hat' },
        wir: { form: 'haben', ending: '-en', full: 'wir haben' },
        ihr: { form: 'habt', ending: '-t', full: 'ihr habt' },
        'sie/Sie': { form: 'haben', ending: '-en', full: 'sie/Sie haben' }
      }
    }
  };

  // Nouns Data (Page 3)
  const nounData = {
    bleistift: {
      gender: 'maskulin (der)',
      noun: 'Bleistift',
      english: 'Pencil',
      icon: '✏️',
      color: 'border-blue-300 bg-blue-50 text-blue-900',
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      bestimmt: { text: 'der Bleistift', eng: 'the pencil' },
      unbestimmt: { text: 'ein Bleistift', eng: 'a pencil' },
      negativ: { text: 'kein Bleistift', eng: 'no pencil / not a pencil' }
    },
    heft: {
      gender: 'neutral (das)',
      noun: 'Heft',
      english: 'Notebook / Exercise Book',
      icon: '📓',
      color: 'border-emerald-300 bg-emerald-50 text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      bestimmt: { text: 'das Heft', eng: 'the notebook' },
      unbestimmt: { text: 'ein Heft', eng: 'a notebook' },
      negativ: { text: 'kein Heft', eng: 'no notebook / not a notebook' }
    },
    lampe: {
      gender: 'feminin (die)',
      noun: 'Lampe',
      english: 'Lamp',
      icon: '💡',
      color: 'border-rose-300 bg-rose-50 text-rose-900',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      bestimmt: { text: 'die Lampe', eng: 'the lamp' },
      unbestimmt: { text: 'eine Lampe', eng: 'a lamp' },
      negativ: { text: 'keine Lampe', eng: 'no lamp / not a lamp' }
    }
  };

  const currentNoun = nounData[selectedNoun];

  return (
    <div className="space-y-6">
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white p-6 rounded-3xl shadow-xl border-4 border-indigo-300 relative overflow-hidden">
        <div className="absolute top-2 right-4 opacity-15 text-8xl select-none pointer-events-none">
          🧩
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-200 border border-indigo-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Visual Summary 2 • GRAMMATIK & REDEMITTEL (Pages 1–8)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
            Grammatik- & Redemittel-Studio
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Master the 5 core grammatical pillars of A1: <strong>Verbkonjugation</strong> (kommen, heißen, sein, haben), <strong>Nomen & Artikel</strong> (der, das, die, ein, kein), <strong>Satzbau & Position 2</strong> (Aussagesatz, Inversion, W-Fragen, Ja/Nein), <strong>Negation & Doch</strong>, and the <strong>Complete Redemittel Toolkit</strong>.
          </p>
        </div>

        {/* 5 Hub Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5">
          {[
            { id: 'verbs', label: '1. Verben & Matrix', icon: '🧩', sub: 'kommen, heißen, sein, haben' },
            { id: 'articles', label: '2. Nomen & Artikel', icon: '🏷️', sub: 'der, das, die / ein, kein' },
            { id: 'satzbau', label: '3. Satzbau & Pos 2', icon: '🚂', sub: 'Aussage, Inversion, Fragen' },
            { id: 'negation', label: '4. Negation & Doch', icon: '🚫', sub: 'nicht vs kein & Doch!' },
            { id: 'redemittel', label: '5. Redemittel & Comic', icon: '💬', sub: 'Dialogues & Cartoon Duet' }
          ].map((tab) => {
            const isActive = activeStation === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveStation(tab.id);
                  playChime('click');
                }}
                className={`flex flex-col items-center text-center p-2.5 rounded-2xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-lg scale-102 ring-2 ring-indigo-300'
                    : 'bg-indigo-950/50 text-indigo-100 hover:bg-indigo-900/60 border border-indigo-500/40'
                }`}
              >
                <span className="text-xl mb-0.5">{tab.icon}</span>
                <span className="text-xs font-black">{tab.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-stone-600' : 'text-indigo-200'}`}>{tab.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* STATION 1: VERBEN & KONJUGATION (PAGES 1 & 2) */}
      {/* ========================================================= */}
      {activeStation === 'verbs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-indigo-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800">
                  <span>Station 1</span> • <span>Präsens & Besondere Verben</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Verb Conjugation Matrix (Pages 1 & 2)
                </h3>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  const currentObj = verbData[selectedVerb];
                  const fullText = Object.values(currentObj.conjugations).map(c => c.full).join('. ');
                  speakGerman(fullText, isSlowMode);
                }}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear All 6 Forms</span>
              </button>
            </div>

            {/* Verb Picker Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.keys(verbData).map((vKey) => {
                const v = verbData[vKey];
                const isSelected = selectedVerb === vKey;
                return (
                  <button
                    key={vKey}
                    onClick={() => {
                      setSelectedVerb(vKey);
                      playChime('click');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300 shadow-sm'
                        : 'bg-stone-50 border-stone-200 hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase text-indigo-700 block">{v.type}</span>
                    <span className="text-sm font-black text-stone-900 block mt-0.5">{v.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Verb Details & Note Card */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
              <div className="p-2 bg-indigo-200 text-indigo-900 rounded-xl text-xl shrink-0">
                💡
              </div>
              <div>
                <span className="text-xs font-black text-indigo-900 uppercase tracking-wide">Key Rule & Memory Trick</span>
                <p className="text-xs text-indigo-950 font-medium mt-0.5 leading-relaxed">
                  {verbData[selectedVerb].note}
                </p>
              </div>
            </div>

            {/* Conjugation Grid (6 Pronouns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(verbData[selectedVerb].conjugations).map(([pronoun, info]) => {
                const isCurrentPronoun = selectedPronoun === pronoun;
                return (
                  <div
                    key={pronoun}
                    onClick={() => {
                      setSelectedPronoun(pronoun);
                      playChime('click');
                      speakGerman(info.full, isSlowMode);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isCurrentPronoun
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102 ring-2 ring-indigo-300'
                        : 'bg-stone-50 text-stone-900 border-stone-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider block ${
                        isCurrentPronoun ? 'text-indigo-200' : 'text-indigo-700'
                      }`}>
                        Pronoun: {pronoun}
                      </span>
                      <div className="text-lg font-black mt-0.5">
                        {info.full}
                      </div>
                      <div className={`text-[11px] font-semibold mt-0.5 ${
                        isCurrentPronoun ? 'text-indigo-100' : 'text-stone-500'
                      }`}>
                        Ending: <span className="font-bold underline">{info.ending}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playChime('click');
                        speakGerman(info.full, isSlowMode);
                      }}
                      className={`p-2 rounded-xl transition-all ${
                        isCurrentPronoun
                          ? 'bg-indigo-500 hover:bg-indigo-400 text-white'
                          : 'bg-white hover:bg-indigo-100 text-indigo-800 border border-stone-200'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 2: NOMEN & ARTIKEL INSPECTOR (PAGE 3) */}
      {/* ========================================================= */}
      {activeStation === 'articles' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-indigo-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800">
                  <span>Station 2</span> • <span>Artikel - Nominativ Singular</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Nouns & Article Inspector (Page 3)
                </h3>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  speakGerman("der Bleistift, ein Bleistift, kein Bleistift. das Heft, ein Heft, kein Heft. die Lampe, eine Lampe, keine Lampe.", isSlowMode);
                }}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear All 3 Sets</span>
              </button>
            </div>

            {/* Select Noun */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(nounData).map(([key, item]) => {
                const isSelected = selectedNoun === key;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedNoun(key);
                      playChime('click');
                      speakGerman(item.bestimmt.text, isSlowMode);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-300 shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${item.badge}`}>
                        {item.gender}
                      </span>
                      <div className="text-base font-black text-stone-900 mt-1">{item.noun}</div>
                      <div className="text-xs text-stone-500">{item.english}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3-Way Article Display for Selected Noun */}
            <div className={`p-6 rounded-3xl border-2 space-y-4 ${currentNoun.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentNoun.icon}</span>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider opacity-75">
                      Selected: {currentNoun.gender}
                    </span>
                    <h4 className="text-xl font-black text-stone-900">
                      {currentNoun.noun} ({currentNoun.english})
                    </h4>
                  </div>
                </div>
              </div>

              {/* 3 Article Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* 1. Bestimmter Artikel (Definite: der/das/die) */}
                <div className="bg-white/95 rounded-2xl p-4 border border-stone-300 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                      1. Bestimmter Artikel (The)
                    </span>
                    <div className="text-lg font-black text-stone-900 mt-2">
                      {currentNoun.bestimmt.text}
                    </div>
                    <div className="text-xs text-stone-600 font-medium">
                      {currentNoun.bestimmt.eng}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman(currentNoun.bestimmt.text, isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak</span>
                  </button>
                </div>

                {/* 2. Unbestimmter Artikel (Indefinite: ein / eine) */}
                <div className="bg-white/95 rounded-2xl p-4 border border-stone-300 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      2. Unbestimmter Artikel (A / An)
                    </span>
                    <div className="text-lg font-black text-stone-900 mt-2">
                      {currentNoun.unbestimmt.text}
                    </div>
                    <div className="text-xs text-stone-600 font-medium">
                      {currentNoun.unbestimmt.eng}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman(currentNoun.unbestimmt.text, isSlowMode);
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak</span>
                  </button>
                </div>

                {/* 3. Negativartikel (Negative: kein / keine) */}
                <div className="bg-white/95 rounded-2xl p-4 border border-stone-300 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                      3. Negativartikel (No / Not a)
                    </span>
                    <div className="text-lg font-black text-stone-900 mt-2">
                      {currentNoun.negativ.text}
                    </div>
                    <div className="text-xs text-stone-600 font-medium">
                      {currentNoun.negativ.eng}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman(currentNoun.negativ.text, isSlowMode);
                    }}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 3: SATZBAU & POSITION 2 MACHINE (PAGES 4 & 5) */}
      {/* ========================================================= */}
      {activeStation === 'satzbau' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-indigo-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800">
                  <span>Station 3</span> • <span>Aussagesatz & Fragesatz</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  The Golden Position 2 Machine (Pages 4 & 5)
                </h3>
              </div>
            </div>

            {/* Satz Type Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'aussage', label: '1. Standard Statement', sub: 'Subject in Pos 1, Verb in Pos 2', icon: '📝' },
                { id: 'inversion', label: '2. Inversion (Time/Place)', sub: 'Place/Time in Pos 1, Verb stays Pos 2!', icon: '🔄' },
                { id: 'wfrage', label: '3. W-Question', sub: 'W-Word in Pos 1, Verb in Pos 2', icon: '❓' },
                { id: 'janein', label: '4. Ja/Nein Question', sub: 'Verb in Position 1 (No W-Word)', icon: '⚡' }
              ].map((s) => {
                const isSelected = satzType === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSatzType(s.id);
                      playChime('click');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300 shadow-sm'
                        : 'bg-stone-50 border-stone-200 hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-lg mb-1 block">{s.icon}</span>
                    <span className="text-xs font-black text-stone-900 block">{s.label}</span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">{s.sub}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Sentence Track Display */}
            <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-inner space-y-6">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-bold border-b border-stone-800 pb-2">
                <span>🚂 German Sentence Locomotive Track</span>
                <span>The conjugated verb anchors the sentence</span>
              </div>

              {/* Position Blocks */}
              {satzType === 'aussage' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 1 (Subject)</span>
                      <div className="text-xl font-black text-white">Ich</div>
                    </div>
                    <div className="bg-indigo-700 p-4 rounded-2xl border-2 border-indigo-400 shadow-md">
                      <span className="text-[10px] font-black text-indigo-200 uppercase block mb-1">Position 2 (VERB ★)</span>
                      <div className="text-xl font-black text-yellow-300">heiße</div>
                    </div>
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 3+ (Rest)</span>
                      <div className="text-xl font-black text-white">Paola Ramoni.</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">Es</div>
                    </div>
                    <div className="bg-indigo-700 p-3 rounded-2xl border-2 border-indigo-400">
                      <div className="text-lg font-black text-yellow-300">ist</div>
                    </div>
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">drei Uhr.</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Ich heiße Paola Ramoni. Es ist drei Uhr.", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Speak Standard Statements</span>
                  </button>
                </div>
              )}

              {satzType === 'inversion' && (
                <div className="space-y-4">
                  <div className="bg-amber-500/20 border border-amber-400/40 rounded-2xl p-3 text-xs text-amber-200">
                    💡 <strong>Inversion Rule:</strong> When a place or time phrase starts at Position 1, the conjugated verb STAYS in Position 2, and the subject flips to Position 3!
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 1 (Place)</span>
                      <div className="text-xl font-black text-white">In Berlin</div>
                    </div>
                    <div className="bg-indigo-700 p-4 rounded-2xl border-2 border-indigo-400 shadow-md">
                      <span className="text-[10px] font-black text-indigo-200 uppercase block mb-1">Position 2 (VERB ★)</span>
                      <div className="text-xl font-black text-yellow-300">ist</div>
                    </div>
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 3 (Subject + Time)</span>
                      <div className="text-xl font-black text-white">es elf Uhr.</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">Am Montag</div>
                    </div>
                    <div className="bg-indigo-700 p-3 rounded-2xl border-2 border-indigo-400">
                      <div className="text-lg font-black text-yellow-300">habe</div>
                    </div>
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">ich frei.</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("In Berlin ist es elf Uhr. Am Montag habe ich frei.", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Speak Inverted Sentences</span>
                  </button>
                </div>
              )}

              {satzType === 'wfrage' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 1 (W-Word)</span>
                      <div className="text-xl font-black text-white">Wie</div>
                    </div>
                    <div className="bg-indigo-700 p-4 rounded-2xl border-2 border-indigo-400 shadow-md">
                      <span className="text-[10px] font-black text-indigo-200 uppercase block mb-1">Position 2 (VERB ★)</span>
                      <div className="text-xl font-black text-yellow-300">heißen</div>
                    </div>
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 3 (Subject)</span>
                      <div className="text-xl font-black text-white">Sie?</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">Woher</div>
                    </div>
                    <div className="bg-indigo-700 p-3 rounded-2xl border-2 border-indigo-400">
                      <div className="text-lg font-black text-yellow-300">kommst</div>
                    </div>
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">du?</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">Wann</div>
                    </div>
                    <div className="bg-indigo-700 p-3 rounded-2xl border-2 border-indigo-400">
                      <div className="text-lg font-black text-yellow-300">hast</div>
                    </div>
                    <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700">
                      <div className="text-lg font-black text-white">du frei?</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Wie heißen Sie? Woher kommst du? Wann hast du frei?", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Speak W-Questions</span>
                  </button>
                </div>
              )}

              {satzType === 'janein' && (
                <div className="space-y-4">
                  <div className="bg-rose-500/20 border border-rose-400/40 rounded-2xl p-3 text-xs text-rose-200">
                    ⚡ <strong>Ja/Nein Rule:</strong> In Yes/No questions, there is no W-word. The verb jumps straight to Position 1!
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-indigo-700 p-4 rounded-2xl border-2 border-indigo-400 shadow-md">
                      <span className="text-[10px] font-black text-indigo-200 uppercase block mb-1">Position 1 (VERB ★)</span>
                      <div className="text-xl font-black text-yellow-300">Hast</div>
                    </div>
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 2 (Subject)</span>
                      <div className="text-xl font-black text-white">du</div>
                    </div>
                    <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700">
                      <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 3 (Rest)</span>
                      <div className="text-xl font-black text-white">am Montag frei?</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Hast du am Montag frei? Ist das ein Heft?", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Speak Ja/Nein Question</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 4: NEGATION & THE MAGIC "DOCH" (PAGE 6) */}
      {/* ========================================================= */}
      {activeStation === 'negation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-indigo-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800">
                  <span>Station 4</span> • <span>Negation & ja / nein / doch</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  nicht vs. kein- & The Superpower Word "DOCH!" (Page 6)
                </h3>
              </div>
            </div>

            {/* Side-by-Side: nicht vs kein- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: nicht */}
              <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                    Negating Verbs / States / Adjectives
                  </span>
                  <span className="text-xl">🚫</span>
                </div>
                <div className="text-sm font-black text-stone-900 mt-2">
                  "Ich habe frei." ➔ "Ich habe <span className="text-rose-600 underline">nicht</span> frei."
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Use <strong>nicht</strong> when you are negating actions, feelings, availability, or adjectives (e.g. <em>nicht frei, nicht richtig, nicht hier</em>).
                </p>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Ich habe frei. Ich habe nicht frei.", isSlowMode);
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear "nicht" example</span>
                </button>
              </div>

              {/* Box 2: kein- */}
              <div className="bg-rose-50 rounded-2xl p-4 border-2 border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-rose-900 bg-rose-200 px-2 py-0.5 rounded-full">
                    Negating Nouns (ein ➔ kein)
                  </span>
                  <span className="text-xl">🚏</span>
                </div>
                <div className="text-sm font-black text-stone-900 mt-2">
                  "Da ist ein Bus." ➔ "Da ist <span className="text-rose-600 underline">kein</span> Bus."
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Use <strong>kein-</strong> when you are negating a NOUN that would normally use <em>ein / eine</em> (e.g. <em>kein Bleistift, kein Heft, keine Lampe</em>).
                </p>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Da ist ein Bus. Da ist kein Bus.", isSlowMode);
                  }}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear "kein" example</span>
                </button>
              </div>
            </div>

            {/* The DOCH Superpower Interactive Sandbox */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-6 border-2 border-purple-300 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 block">
                      The Famous German 3rd Response
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-purple-950">
                      When do you answer "DOCH!"?
                    </h4>
                  </div>
                </div>
                <span className="text-xs font-black bg-purple-200 text-purple-900 px-3 py-1 rounded-full">
                  Contradicting a Negative!
                </span>
              </div>

              {/* Scenario selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'bus', statement: 'Da ist kein Bus.', answer: 'Doch, da ist ein Bus!', icon: '🚌' },
                  { id: 'frei', statement: 'Hast du morgen nicht frei?', answer: 'Doch, ich habe frei!', icon: '🏖️' },
                  { id: 'heft', statement: 'Das ist kein Heft.', answer: 'Doch, das ist ein Heft!', icon: '📓' },
                  { id: 'deutsch', statement: 'Du sprichst kein Deutsch.', answer: 'Doch, ich spreche Deutsch!', icon: '🗣️' }
                ].map((sc) => {
                  const isSelected = dochScenario === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setDochScenario(sc.id);
                        setUserDochReply(null);
                        playChime('click');
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white font-black border-purple-700 shadow-sm'
                          : 'bg-white text-stone-800 border-purple-200 hover:bg-purple-100/50'
                      }`}
                    >
                      <span className="text-lg block mb-0.5">{sc.icon}</span>
                      <span className="text-xs font-bold block">{sc.statement}</span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Reply Simulator */}
              <div className="bg-white rounded-2xl p-5 border-2 border-purple-200 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🗣️</span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-stone-500 block">Negative Statement / Doubt</span>
                    <div className="text-base font-black text-stone-900">
                      {dochScenario === 'bus' && '"Da ist kein Bus." (There is no bus!)'}
                      {dochScenario === 'frei' && '"Hast du morgen nicht frei?" (You\'re not free tomorrow, right?)'}
                      {dochScenario === 'heft' && '"Das ist kein Heft." (That\'s not a notebook!)'}
                      {dochScenario === 'deutsch' && '"Du sprichst kein Deutsch." (You don\'t speak German!)'}
                    </div>
                  </div>
                </div>

                {/* Response Buttons */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-700 block">How do you contradict them to say "YES THERE IS / YES I DO"?</span>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        setUserDochReply('ja');
                        playChime('wrong');
                      }}
                      className={`p-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                        userDochReply === 'ja' ? 'bg-rose-100 border-rose-400 text-rose-900' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      Ja. (Incorrect here)
                    </button>
                    <button
                      onClick={() => {
                        setUserDochReply('nein');
                        playChime('wrong');
                      }}
                      className={`p-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                        userDochReply === 'nein' ? 'bg-rose-100 border-rose-400 text-rose-900' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      Nein. (Agrees with negative)
                    </button>
                    <button
                      onClick={() => {
                        setUserDochReply('doch');
                        playChime('success');
                        const text = dochScenario === 'bus' ? 'Doch, da ist ein Bus!' : dochScenario === 'frei' ? 'Doch, ich habe frei!' : dochScenario === 'heft' ? 'Doch, das ist ein Heft!' : 'Doch, ich spreche Deutsch!';
                        speakGerman(text, isSlowMode);
                      }}
                      className={`p-3 rounded-xl border-2 text-xs font-black transition-all cursor-pointer ${
                        userDochReply === 'doch' ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105' : 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200'
                      }`}
                    >
                      ✨ DOCH! (The Magic Contradiction!)
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                {userDochReply === 'doch' && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-900 font-bold flex items-center justify-between">
                    <div>
                      🎉 <strong>Perfekt!</strong> You used <strong>DOCH</strong> to reverse their negative statement!
                      <div className="text-sm font-black text-emerald-950 mt-1">
                        {dochScenario === 'bus' && '"Doch, da ist ein Bus!"'}
                        {dochScenario === 'frei' && '"Doch, ich habe frei!"'}
                        {dochScenario === 'heft' && '"Doch, das ist ein Heft!"'}
                        {dochScenario === 'deutsch' && '"Doch, ich spreche Deutsch!"'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = dochScenario === 'bus' ? 'Doch, da ist ein Bus!' : dochScenario === 'frei' ? 'Doch, ich habe frei!' : dochScenario === 'heft' ? 'Doch, das ist ein Heft!' : 'Doch, ich spreche Deutsch!';
                        speakGerman(text, isSlowMode);
                      }}
                      className="p-2 rounded-xl bg-emerald-200 text-emerald-900"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 5: REDEMITTEL & CARTOON DUET (PAGES 7 & 8) */}
      {/* ========================================================= */}
      {activeStation === 'redemittel' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-indigo-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800">
                  <span>Station 5</span> • <span>Redemittel & Cartoon Comic</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Everyday Redemittel & The Comic Confusion (Pages 7 & 8)
                </h3>
              </div>
            </div>

            {/* Cartoon Breakdown Card (Page 7) */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-5 border-2 border-amber-300 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                  🎨 Page 7 Cartoon: "Woher kommen sie?" vs "Nicht Sie!"
                </span>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Woher kommen sie? Ich bin aus... Nicht Sie, Herr und Frau Allakallariak!", isSlowMode);
                  }}
                  className="p-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Play Comic Dialogue</span>
                </button>
              </div>

              {/* Comic Strip Simulation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-1">
                  <span className="text-3xl">👈🧔</span>
                  <div className="text-xs font-black text-stone-900">1. Person A Points to the Door:</div>
                  <div className="text-sm font-black text-amber-900">"Woher kommen sie?"</div>
                  <div className="text-[11px] text-stone-500">(Meaning: Where do *they* come from?)</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-1">
                  <span className="text-3xl">😃</span>
                  <div className="text-xs font-black text-stone-900">2. Neighbor Misunderstands:</div>
                  <div className="text-sm font-black text-amber-900">"Ich bin aus..."</div>
                  <div className="text-[11px] text-stone-500">(Thinking he was asked "Where do *You (formal)* come from?")</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-1">
                  <span className="text-3xl">🤦‍♂️</span>
                  <div className="text-xs font-black text-stone-900">3. Person A Clarifies:</div>
                  <div className="text-sm font-black text-amber-900">"Nicht Sie, Herr und Frau Allakallariak!"</div>
                  <div className="text-[11px] text-stone-500">(Not you! I meant the guests!)</div>
                </div>
              </div>

              <p className="text-xs text-amber-900 bg-white p-3 rounded-2xl border border-amber-200 leading-relaxed">
                💡 <strong>Why this happens:</strong> In spoken German, lowercase <strong>sie</strong> (they) and capitalized <strong>Sie</strong> (you formal) share the EXACT same verb ending: <em>"kommen sie / kommen Sie"</em>! Context and pointing make all the difference!
              </p>
            </div>

            {/* Page 8 Redemittel Soundboard Categories */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-stone-900 uppercase tracking-wide">
                Complete Page 8 Redemittel Soundboard
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Andere vorstellen */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">andere vorstellen</span>
                    <span className="text-base">👥</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Das ist Frau Müller / Herr Schmidt.</strong></div>
                    <div>• <strong>Woher kommt er / sie?</strong></div>
                    <div>• <strong>Er / Sie kommt aus Kenia / Deutschland.</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Das ist Frau Müller. Das ist Herr Schmidt. Er kommt aus Kenia. Sie kommt aus Deutschland.", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Intro</span>
                  </button>
                </div>

                {/* 2. Telefonnummer sagen */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">die Telefonnummer sagen</span>
                    <span className="text-base">📞</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Wie ist die Telefonnummer von Maria?</strong></div>
                    <div>• <strong>Die Telefonnummer von Maria ist null sieben eins...</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Wie ist die Telefonnummer von Maria? Die Telefonnummer von Maria ist null sieben eins zwei drei.", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Phone Inquiries</span>
                  </button>
                </div>

                {/* 3. Uhrzeit, Tageszeit, Tag angeben */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">Uhrzeit, Tageszeit, Tag angeben</span>
                    <span className="text-base">⏰</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Wie spät ist es?</strong> - <em>Es ist neun Uhr.</em></div>
                    <div>• <strong>Es ist elf Uhr am Vormittag / in der Nacht.</strong></div>
                    <div>• <strong>Heute ist Montag. Morgen ist Dienstag.</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Wie spät ist es? Es ist neun Uhr. Es ist elf Uhr am Vormittag. Heute ist Montag. Morgen ist Dienstag.", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Time & Days</span>
                  </button>
                </div>

                {/* 4. sagen, wann man frei hat */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">sagen, wann man frei hat</span>
                    <span className="text-base">🏖️</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Wann hast du / habt ihr / haben Sie frei?</strong></div>
                    <div>• <strong>Ja, ich habe am Montag frei.</strong></div>
                    <div>• <strong>Nein, am Montag habe ich nicht frei.</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Wann hast du frei? Ja, ich habe am Montag frei. Nein, am Montag habe ich nicht frei.", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Free Time Schedule</span>
                  </button>
                </div>

                {/* 5. nach der Bedeutung fragen */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">nach der Bedeutung fragen</span>
                    <span className="text-base">🤔</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Wie heißt das auf Deutsch?</strong></div>
                    <div>• <strong>Das Wort kenne ich nicht. Wie schreibt man das?</strong></div>
                    <div>• <strong>Was ist das? - Ich glaube, das ist ein Bleistift.</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Wie heißt das auf Deutsch? Das Wort kenne ich nicht. Wie schreibt man das? Was ist das? Ich glaube, das ist ein Bleistift.", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Meaning Questions</span>
                  </button>
                </div>

                {/* 6. nützliche Sätze */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">nützliche Sätze</span>
                    <span className="text-base">🤝</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Tut mir leid.</strong> <em>(I'm sorry.)</em></div>
                    <div>• <strong>Das ist richtig / falsch.</strong> <em>(That is right / wrong.)</em></div>
                    <div>• <strong>Entschuldigung.</strong> <em>(Excuse me.)</em></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Tut mir leid. Das ist richtig. Das ist falsch. Entschuldigung!", isSlowMode);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Courtesy Phrases</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
