import React, { useState } from 'react';
import { Volume2, Sparkles, AlertTriangle, Zap, CheckCircle2, ChevronRight, Eye, BookOpen, Car, Moon, Coffee } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson14IrregularVerbsStudio({ isSlowMode }) {
  const [selectedPattern, setSelectedPattern] = useState('e_to_i');
  const [activeVerbId, setActiveVerbId] = useState('sprechen');

  const PATTERNS = [
    { id: 'e_to_i', label: '1. e -> i', name: 'Short Sharp i', icon: '🗣️', count: 6 },
    { id: 'e_to_ie', label: '2. e -> ie', name: 'Long Sight ie', icon: '👓', count: 2 },
    { id: 'au_to_aeu', label: '3. au -> äu', name: 'The OI Runner', icon: '🏃', count: 1 },
    { id: 'a_to_ae', label: '4. a -> ä', name: 'Two-Dot Antennae', icon: '🚗', count: 3 },
    { id: 'wissen_rebel', label: '5. i -> ei', name: 'The Rebel "wissen"', icon: '🧠', count: 1 },
  ];

  const ALL_VERBS = [
    // Pattern 1: e -> i (Slides 8 to 13)
    {
      id: 'sprechen',
      infinitive: 'sprechen',
      meaning: 'to speak',
      pattern: 'e_to_i',
      vowelRule: 'e -> i',
      stem: 'sprech',
      changedStem: 'sprich',
      icon: '🗣️',
      conjugation: {
        ich: { form: 'spreche', changed: false },
        du: { form: 'sprichst', changed: true },
        Sie_sing: { form: 'sprechen', changed: false },
        er_sie_es: { form: 'spricht', changed: true },
        wir: { form: 'sprechen', changed: false },
        ihr: { form: 'sprecht', changed: false },
        Sie_plur: { form: 'sprechen', changed: false },
        sie: { form: 'sprechen', changed: false },
      },
      note: 'Notice: ihr sprecht keeps the regular "e"! Only du and er flex the "i"!'
    },
    {
      id: 'nehmen',
      infinitive: 'nehmen',
      meaning: 'to take',
      pattern: 'e_to_i',
      vowelRule: 'e -> i(mm)',
      stem: 'nehm',
      changedStem: 'nimm',
      icon: '🤲',
      conjugation: {
        ich: { form: 'nehme', changed: false },
        du: { form: 'nimmst', changed: true },
        Sie_sing: { form: 'nehmen', changed: false },
        er_sie_es: { form: 'nimmt', changed: true },
        wir: { form: 'nehmen', changed: false },
        ihr: { form: 'nehmt', changed: false },
        Sie_plur: { form: 'nehmen', changed: false },
        sie: { form: 'nehmen', changed: false },
      },
      note: 'The "h" disappears and double "mm" appears: du nimmst, er nimmt!'
    },
    {
      id: 'treffen',
      infinitive: 'treffen',
      meaning: 'to meet',
      pattern: 'e_to_i',
      vowelRule: 'e -> i',
      stem: 'treff',
      changedStem: 'triff',
      icon: '🤝',
      conjugation: {
        ich: { form: 'treffe', changed: false },
        du: { form: 'triffst', changed: true },
        Sie_sing: { form: 'treffen', changed: false },
        er_sie_es: { form: 'trifft', changed: true },
        wir: { form: 'treffen', changed: false },
        ihr: { form: 'trefft', changed: false },
        Sie_plur: { form: 'treffen', changed: false },
        sie: { form: 'treffen', changed: false },
      },
      note: 'Slide 10: Meeting up with friends: du triffst, er trifft!'
    },
    {
      id: 'geben',
      infinitive: 'geben',
      meaning: 'to give',
      pattern: 'e_to_i',
      vowelRule: 'e -> i',
      stem: 'geb',
      changedStem: 'gib',
      icon: '🎁',
      conjugation: {
        ich: { form: 'gebe', changed: false },
        du: { form: 'gibst', changed: true },
        Sie_sing: { form: 'geben', changed: false },
        er_sie_es: { form: 'gibt', changed: true },
        wir: { form: 'geben', changed: false },
        ihr: { form: 'gebt', changed: false },
        Sie_plur: { form: 'geben', changed: false },
        sie: { form: 'geben', changed: false },
      },
      note: 'Slide 11: du gibst, er gibt. Also used in "Es gibt" (There is/are)!'
    },
    {
      id: 'essen',
      infinitive: 'essen',
      meaning: 'to eat',
      pattern: 'e_to_i',
      vowelRule: 'e -> i',
      stem: 'ess',
      changedStem: 'iss',
      icon: '🍲',
      conjugation: {
        ich: { form: 'esse', changed: false },
        du: { form: 'isst', changed: true },
        Sie_sing: { form: 'essen', changed: false },
        er_sie_es: { form: 'isst', changed: true },
        wir: { form: 'essen', changed: false },
        ihr: { form: 'esst', changed: false },
        Sie_plur: { form: 'essen', changed: false },
        sie: { form: 'essen', changed: false },
      },
      note: 'Slide 12: du isst & er isst sound identical to "ist" (is), but spelled with double "s"!'
    },
    {
      id: 'helfen',
      infinitive: 'helfen',
      meaning: 'to help',
      pattern: 'e_to_i',
      vowelRule: 'e -> i',
      stem: 'helf',
      changedStem: 'hilf',
      icon: '🆘',
      conjugation: {
        ich: { form: 'helfe', changed: false },
        du: { form: 'hilfst', changed: true },
        Sie_sing: { form: 'helfen', changed: false },
        er_sie_es: { form: 'hilft', changed: true },
        wir: { form: 'helfen', changed: false },
        ihr: { form: 'helft', changed: false },
        Sie_plur: { form: 'helfen', changed: false },
        sie: { form: 'helfen', changed: false },
      },
      note: 'Slide 13: Hilfst du mir? (Do you help me?) -> du hilfst, er hilft!'
    },

    // Pattern 2: e -> ie (Slides 15-16)
    {
      id: 'lesen',
      infinitive: 'lesen',
      meaning: 'to read',
      pattern: 'e_to_ie',
      vowelRule: 'e -> ie',
      stem: 'les',
      changedStem: 'lies',
      icon: '📖',
      conjugation: {
        ich: { form: 'lese', changed: false },
        du: { form: 'liest', changed: true },
        Sie_sing: { form: 'lesen', changed: false },
        er_sie_es: { form: 'liest', changed: true },
        wir: { form: 'lesen', changed: false },
        ihr: { form: 'lest', changed: false },
        Sie_plur: { form: 'lesen', changed: false },
        sie: { form: 'lesen', changed: false },
      },
      note: 'Slide 15: Notice "du liest" only adds -t because stem ends in -s (no double hiss)!'
    },
    {
      id: 'sehen',
      infinitive: 'sehen',
      meaning: 'to see',
      pattern: 'e_to_ie',
      vowelRule: 'e -> ie',
      stem: 'seh',
      changedStem: 'sieh',
      icon: '👁️',
      conjugation: {
        ich: { form: 'sehe', changed: false },
        du: { form: 'siehst', changed: true },
        Sie_sing: { form: 'sehen', changed: false },
        er_sie_es: { form: 'sieht', changed: true },
        wir: { form: 'sehen', changed: false },
        ihr: { form: 'seht', changed: false },
        Sie_plur: { form: 'sehen', changed: false },
        sie: { form: 'sehen', changed: false },
      },
      note: 'Slide 16: du siehst, er sieht. Long "ee" sound with silent "h"!'
    },

    // Pattern 3: au -> äu (Slide 18)
    {
      id: 'laufen',
      infinitive: 'laufen',
      meaning: 'to walk / run',
      pattern: 'au_to_aeu',
      vowelRule: 'au -> äu',
      stem: 'lauf',
      changedStem: 'läuf',
      icon: '🏃',
      conjugation: {
        ich: { form: 'laufe', changed: false },
        du: { form: 'läufst', changed: true },
        Sie_sing: { form: 'laufen', changed: false },
        er_sie_es: { form: 'läuft', changed: true },
        wir: { form: 'laufen', changed: false },
        ihr: { form: 'lauft', changed: false },
        Sie_plur: { form: 'laufen', changed: false },
        sie: { form: 'laufen', changed: false },
      },
      note: 'Slide 18: "äu" sounds like "oi" (loyfst, loyft)!'
    },

    // Pattern 4: a -> ä (Slides 20-22)
    {
      id: 'fahren',
      infinitive: 'fahren',
      meaning: 'to drive / ride',
      pattern: 'a_to_ae',
      vowelRule: 'a -> ä',
      stem: 'fahr',
      changedStem: 'fähr',
      icon: '🚗',
      conjugation: {
        ich: { form: 'fahre', changed: false },
        du: { form: 'fährst', changed: true },
        Sie_sing: { form: 'fahren', changed: false },
        er_sie_es: { form: 'fährt', changed: true },
        wir: { form: 'fahren', changed: false },
        ihr: { form: 'fahrt', changed: false },
        Sie_plur: { form: 'fahren', changed: false },
        sie: { form: 'fahren', changed: false },
      },
      note: 'Slide 20: du fährst, er fährt. Ihr fahrt keeps normal "a"!'
    },
    {
      id: 'schlafen',
      infinitive: 'schlafen',
      meaning: 'to sleep',
      pattern: 'a_to_ae',
      vowelRule: 'a -> ä',
      stem: 'schlaf',
      changedStem: 'schläf',
      icon: '😴',
      conjugation: {
        ich: { form: 'schlafe', changed: false },
        du: { form: 'schläfst', changed: true },
        Sie_sing: { form: 'schlafen', changed: false },
        er_sie_es: { form: 'schläft', changed: true },
        wir: { form: 'schlafen', changed: false },
        ihr: { form: 'schlaft', changed: false },
        Sie_plur: { form: 'schlafen', changed: false },
        sie: { form: 'schlafen', changed: false },
      },
      note: 'Slide 21: du schläfst, er schläft. Sweet dreams!'
    },
    {
      id: 'waschen',
      infinitive: 'waschen',
      meaning: 'to wash',
      pattern: 'a_to_ae',
      vowelRule: 'a -> ä',
      stem: 'wasch',
      changedStem: 'wäsch',
      icon: '🧼',
      conjugation: {
        ich: { form: 'wasche', changed: false },
        du: { form: 'wäschst', changed: true },
        Sie_sing: { form: 'waschen', changed: false },
        er_sie_es: { form: 'wäscht', changed: true },
        wir: { form: 'waschen', changed: false },
        ihr: { form: 'wascht', changed: false },
        Sie_plur: { form: 'waschen', changed: false },
        sie: { form: 'waschen', changed: false },
      },
      note: 'Slide 22: du wäschst, er wäscht. Washing clothes or hands!'
    },

    // Pattern 5: i -> ei Rebel (Slide 24)
    {
      id: 'wissen',
      infinitive: 'wissen',
      meaning: 'to know (a fact)',
      pattern: 'wissen_rebel',
      vowelRule: 'i -> ei',
      stem: 'wiss',
      changedStem: 'weiß',
      icon: '🧠',
      isRebel: true,
      conjugation: {
        ich: { form: 'weiß', changed: true, isRebelTwin: true },
        du: { form: 'weißt', changed: true },
        Sie_sing: { form: 'wissen', changed: false },
        er_sie_es: { form: 'weiß', changed: true, isRebelTwin: true },
        wir: { form: 'wissen', changed: false },
        ihr: { form: 'wisst', changed: false },
        Sie_plur: { form: 'wissen', changed: false },
        sie: { form: 'wissen', changed: false },
      },
      note: 'Slide 24 REBEL ALERT: "ich weiß" and "er weiß" drop endings and are 100% identical twins!'
    }
  ];

  const currentVerb = ALL_VERBS.find(v => v.id === activeVerbId) || ALL_VERBS[0];
  const filteredVerbs = ALL_VERBS.filter(v => v.pattern === selectedPattern);

  const speakConjugationRow = (pronoun, form) => {
    playChime('click');
    speakGerman(`${pronoun} ${form}`, isSlowMode);
  };

  const speakFullVerb = () => {
    playChime('click');
    const c = currentVerb.conjugation;
    speakGerman(
      `${currentVerb.infinitive}. ich ${c.ich.form}, du ${c.du.form}, er ${c.er_sie_es.form}, wir ${c.wir.form}, ihr ${c.ihr.form}, sie ${c.sie.form}`,
      isSlowMode
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Lesson 14: Irregular Verbs (Vokalwechsel Studio)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Unregelmäßige Verben im Präsens 🦸‍♂️🔄
            </h2>
            <p className="text-white/90 text-xs sm:text-sm font-medium max-w-xl">
              Meet the superhero verbs! Master the <strong>Golden Rule</strong> (vowel shift happens <strong>ONLY for du and er/sie/es</strong>), explore all <strong>5 vowel change patterns</strong>, and discover the famous twin rebel <strong>wissen</strong>!
            </p>
          </div>
          <button
            onClick={speakFullVerb}
            className="flex items-center gap-2 bg-white text-stone-900 hover:bg-amber-100 px-5 py-3 rounded-2xl font-black text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-purple-600" />
            <span>Hear Active Verb</span>
          </button>
        </div>
      </div>

      {/* The 5 Pattern Navigation Buttons */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300">
        {PATTERNS.map((p) => {
          const isSelected = selectedPattern === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPattern(p.id);
                // pick first verb of pattern
                const first = ALL_VERBS.find(v => v.pattern === p.id);
                if (first) setActiveVerbId(first.id);
                playChime('click');
              }}
              className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                isSelected
                  ? 'bg-purple-700 text-white shadow-md ring-2 ring-purple-300 scale-102'
                  : 'bg-white text-stone-700 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </div>
              <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                {p.name} ({p.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Verb Selector Chips for Current Pattern */}
      <div className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
          <span>Choose a Verb to Inspect ({currentVerb.vowelRule}):</span>
          <span className="text-purple-700 font-black">{filteredVerbs.length} verbs in this pattern</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredVerbs.map((v) => {
            const isSelected = activeVerbId === v.id;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVerbId(v.id);
                  playChime('click');
                  speakGerman(v.infinitive, isSlowMode);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-stone-900 text-amber-300 shadow-md scale-105 ring-2 ring-amber-400'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                <span>{v.icon}</span>
                <span>{v.infinitive}</span>
                <span className="text-[10px] opacity-70">({v.meaning})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chalkboard Display (Matching Slides 5 to 24) */}
      <div className="bg-[#21292d] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-800/60 shadow-2xl space-y-6 relative overflow-hidden font-sans">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-stone-700/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentVerb.icon}</span>
            <div>
              <div className="text-amber-400 font-mono text-2xl sm:text-3xl font-black tracking-wide flex items-center gap-2">
                <span>{currentVerb.infinitive}</span>
                <span className="text-xs font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">
                  {currentVerb.vowelRule}
                </span>
              </div>
              <div className="text-stone-300 text-xs sm:text-sm italic">
                {currentVerb.meaning} • Original Stem: <span className="text-cyan-300 font-mono font-bold">{currentVerb.stem}</span>
              </div>
            </div>
          </div>

          <button
            onClick={speakFullVerb}
            className="p-3 bg-stone-700/80 hover:bg-stone-600 rounded-2xl transition-all cursor-pointer shadow-md"
            title="Read whole table"
          >
            <Volume2 className="w-5 h-5 text-amber-300" />
          </button>
        </div>

        {/* 2-Column Split: Singular vs Plural */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-700/80">
          {/* Column 1: Singular (Where the Magic Happens!) */}
          <div className="space-y-3.5 pr-0 md:pr-4">
            <div className="text-amber-400 font-black text-sm uppercase tracking-widest flex items-center justify-between">
              <span>Singular (du & er flex vowels!)</span>
              <span className="text-[11px] text-amber-300/80 font-normal">⚠️ Vowel changes here</span>
            </div>

            {/* ich */}
            <div
              onClick={() => speakConjugationRow('ich', currentVerb.conjugation.ich.form)}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                currentVerb.isRebel
                  ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                  : 'bg-stone-800/80 border-stone-700 text-white hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">ich</span>
                <span className="text-lg sm:text-xl font-mono font-black">
                  {currentVerb.conjugation.ich.form}
                </span>
                {currentVerb.isRebel && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-sm border border-amber-400">
                    Twin 1 (No -e!)
                  </span>
                )}
                {!currentVerb.isRebel && (
                  <span className="text-[10px] text-stone-400 italic">(normal vowel)</span>
                )}
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* du (Vowel shifts!) */}
            <div
              onClick={() => speakConjugationRow('du', currentVerb.conjugation.du.form)}
              className="p-3 bg-amber-950/50 border-2 border-amber-400/90 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:border-amber-300 shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">du</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-amber-300">
                  {currentVerb.conjugation.du.form}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-400 text-stone-900 px-2 py-0.5 rounded-md shadow-xs">
                  <AlertTriangle className="w-3 h-3 text-stone-900" />
                  <span>Vokalwechsel!</span>
                </span>
              </div>
              <Volume2 className="w-4 h-4 text-amber-300" />
            </div>

            {/* Sie (Singular formal - stays normal!) */}
            <div
              onClick={() => speakConjugationRow('Sie', currentVerb.conjugation.Sie_sing.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border border-stone-700 flex items-center justify-between cursor-pointer transition-all hover:border-amber-400/50"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">Sie</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.conjugation.Sie_sing.form}
                </span>
                <span className="text-[10px] text-stone-400 font-bold">(formal - no change)</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* er / sie / es (Vowel shifts!) */}
            <div
              onClick={() => speakConjugationRow('er, sie, es', currentVerb.conjugation.er_sie_es.form)}
              className="p-3 bg-amber-950/50 border-2 border-amber-400/90 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:border-amber-300 shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs font-black text-stone-400">er/sie/es</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-amber-300">
                  {currentVerb.conjugation.er_sie_es.form}
                </span>
                {currentVerb.isRebel ? (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-sm border border-amber-400">
                    Twin 2 (No -t!)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-400 text-stone-900 px-2 py-0.5 rounded-md shadow-xs">
                    <AlertTriangle className="w-3 h-3 text-stone-900" />
                    <span>Vokalwechsel!</span>
                  </span>
                )}
              </div>
              <Volume2 className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {/* Column 2: Plural (NO VOWEL SHIFT! Pure Peace) */}
          <div className="space-y-3.5 pt-4 md:pt-0 pl-0 md:pl-4">
            <div className="text-emerald-400 font-black text-sm uppercase tracking-widest flex items-center justify-between">
              <span>Plural (NO Vowel Change!)</span>
              <span className="text-[11px] text-emerald-300 font-bold">✓ 100% Normal Stems</span>
            </div>

            {/* wir */}
            <div
              onClick={() => speakConjugationRow('wir', currentVerb.conjugation.wir.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border-2 border-emerald-500/60 flex items-center justify-between cursor-pointer transition-all hover:border-emerald-400"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">wir</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.conjugation.wir.form}
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">✓ like infinitive</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* ihr */}
            <div
              onClick={() => speakConjugationRow('ihr', currentVerb.conjugation.ihr.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border border-stone-700 flex items-center justify-between cursor-pointer transition-all hover:border-emerald-400"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">ihr</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.conjugation.ihr.form}
                </span>
                <span className="text-[10px] text-stone-400 italic">✓ original vowel</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* Sie (Plural formal) */}
            <div
              onClick={() => speakConjugationRow('Sie', currentVerb.conjugation.Sie_plur.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border-2 border-emerald-500/60 flex items-center justify-between cursor-pointer transition-all hover:border-emerald-400"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">Sie</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.conjugation.Sie_plur.form}
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">✓ like infinitive</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* sie (they plural) */}
            <div
              onClick={() => speakConjugationRow('sie', currentVerb.conjugation.sie.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border-2 border-emerald-500/60 flex items-center justify-between cursor-pointer transition-all hover:border-emerald-400"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">sie</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.conjugation.sie.form}
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">✓ like infinitive</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>
          </div>
        </div>

        {/* Teacher Note on Chalkboard */}
        <div className="bg-stone-800/90 rounded-2xl p-4 border border-stone-600/70 text-xs sm:text-sm text-stone-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-black text-amber-300">Master Secret for {currentVerb.infinitive}:</div>
            <p className="mt-0.5 leading-relaxed">{currentVerb.note}</p>
          </div>
        </div>
      </div>

      {/* The 5 Pattern Overview Cheat Sheet */}
      <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 shadow-sm space-y-4">
        <h4 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
          <span>📋</span>
          <span>Slide 6: All 5 Vowel Shifts in One Glance</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 space-y-1">
            <span className="font-black text-purple-900">1. e $\rightarrow$ i</span>
            <div className="text-stone-700">sprechen $\rightarrow$ <strong>du sprichst</strong></div>
            <div className="text-[11px] text-stone-500">nehmen, treffen, geben, essen, helfen</div>
          </div>

          <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 space-y-1">
            <span className="font-black text-blue-900">2. e $\rightarrow$ ie</span>
            <div className="text-stone-700">lesen $\rightarrow$ <strong>du liest</strong></div>
            <div className="text-[11px] text-stone-500">sehen $\rightarrow$ du siehst (stretch sound)</div>
          </div>

          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-1">
            <span className="font-black text-amber-900">3. au $\rightarrow$ äu</span>
            <div className="text-stone-700">laufen $\rightarrow$ <strong>du läufst</strong></div>
            <div className="text-[11px] text-stone-500">Sounds like "oi" (loyfst)</div>
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-black text-emerald-900">4. a $\rightarrow$ ä</span>
            <div className="text-stone-700">fahren $\rightarrow$ <strong>du fährst</strong></div>
            <div className="text-[11px] text-stone-500">schlafen $\rightarrow$ schläfst, waschen $\rightarrow$ wäschst</div>
          </div>

          <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 space-y-1 sm:col-span-2 md:col-span-2">
            <span className="font-black text-rose-900">5. i $\rightarrow$ ei (Rebel Verb: wissen)</span>
            <div className="text-stone-700">wissen $\rightarrow$ <strong>ich weiß</strong> & <strong>er weiß</strong></div>
            <div className="text-[11px] text-stone-500">Twin forms with zero endings for 1st & 3rd person!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
