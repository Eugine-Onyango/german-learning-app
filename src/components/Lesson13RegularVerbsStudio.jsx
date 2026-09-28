import React, { useState } from 'react';
import { Volume2, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Zap, Coffee, Music, Phone, HelpCircle, MessageSquare } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson13RegularVerbsStudio({ isSlowMode }) {
  const [selectedCategory, setSelectedCategory] = useState('standard'); // 'standard', 'hiss', 'cushion'
  const [activeVerbId, setActiveVerbId] = useState('wohnen');

  const ALL_VERBS = [
    // Standard Regular Verbs (Slides 6 to 14)
    {
      id: 'wohnen',
      infinitive: 'wohnen',
      meaning: 'to live / reside',
      stem: 'wohn',
      category: 'standard',
      icon: '🏡',
      conjugation: {
        ich: { form: 'wohne', ending: 'e' },
        du: { form: 'wohnst', ending: 'st' },
        Sie_sing: { form: 'wohnen', ending: 'en' },
        er_sie_es: { form: 'wohnt', ending: 't' },
        wir: { form: 'wohnen', ending: 'en' },
        ihr: { form: 'wohnt', ending: 't' },
        Sie_plur: { form: 'wohnen', ending: 'en' },
        sie: { form: 'wohnen', ending: 'en' },
      },
      note: 'Standard rock-solid regular verb! Stem "wohn" + regular endings.'
    },
    {
      id: 'machen',
      infinitive: 'machen',
      meaning: 'to do / make',
      stem: 'mach',
      category: 'standard',
      icon: '🛠️',
      conjugation: {
        ich: { form: 'mache', ending: 'e' },
        du: { form: 'machst', ending: 'st' },
        Sie_sing: { form: 'machen', ending: 'en' },
        er_sie_es: { form: 'macht', ending: 't' },
        wir: { form: 'machen', ending: 'en' },
        ihr: { form: 'macht', ending: 't' },
        Sie_plur: { form: 'machen', ending: 'en' },
        sie: { form: 'machen', ending: 'en' },
      },
      note: 'The ultimate action verb! Was machst du? (What are you doing?)'
    },
    {
      id: 'spielen',
      infinitive: 'spielen',
      meaning: 'to play',
      stem: 'spiel',
      category: 'standard',
      icon: '⚽',
      conjugation: {
        ich: { form: 'spiele', ending: 'e' },
        du: { form: 'spielst', ending: 'st' },
        Sie_sing: { form: 'spielen', ending: 'en' },
        er_sie_es: { form: 'spielt', ending: 't' },
        wir: { form: 'spielen', ending: 'en' },
        ihr: { form: 'spielt', ending: 't' },
        Sie_plur: { form: 'spielen', ending: 'en' },
        sie: { form: 'spielen', ending: 'en' },
      },
      note: 'Fun & sports: Ich spiele Fußball (I play football)!'
    },
    {
      id: 'studieren',
      infinitive: 'studieren',
      meaning: 'to study (at college/university)',
      stem: 'studier',
      category: 'standard',
      icon: '🎓',
      conjugation: {
        ich: { form: 'studiere', ending: 'e' },
        du: { form: 'studierst', ending: 'st' },
        Sie_sing: { form: 'studieren', ending: 'en' },
        er_sie_es: { form: 'studiert', ending: 't' },
        wir: { form: 'studieren', ending: 'en' },
        ihr: { form: 'studiert', ending: 't' },
        Sie_plur: { form: 'studieren', ending: 'en' },
        sie: { form: 'studieren', ending: 'en' },
      },
      note: 'Verbs ending in -ieren are regular and never drop their root!'
    },
    {
      id: 'lernen',
      infinitive: 'lernen',
      meaning: 'to learn',
      stem: 'lern',
      category: 'standard',
      icon: '📖',
      conjugation: {
        ich: { form: 'lerne', ending: 'e' },
        du: { form: 'lernst', ending: 'st' },
        Sie_sing: { form: 'lernen', ending: 'en' },
        er_sie_es: { form: 'lernt', ending: 't' },
        wir: { form: 'lernen', ending: 'en' },
        ihr: { form: 'lernt', ending: 't' },
        Sie_plur: { form: 'lernen', ending: 'en' },
        sie: { form: 'lernen', ending: 'en' },
      },
      note: 'Notice Slide 10: wir lernen = Sie lernen = sie lernen (100% identical)!'
    },
    {
      id: 'hoeren',
      infinitive: 'hören',
      meaning: 'to hear / listen',
      stem: 'hör',
      category: 'standard',
      icon: '🎧',
      conjugation: {
        ich: { form: 'höre', ending: 'e' },
        du: { form: 'hörst', ending: 'st' },
        Sie_sing: { form: 'hören', ending: 'en' },
        er_sie_es: { form: 'hört', ending: 't' },
        wir: { form: 'hören', ending: 'en' },
        ihr: { form: 'hört', ending: 't' },
        Sie_plur: { form: 'hören', ending: 'en' },
        sie: { form: 'hören', ending: 'en' },
      },
      note: 'Umlaut "ö" stays untouched throughout all persons!'
    },
    {
      id: 'telefonieren',
      infinitive: 'telefonieren',
      meaning: 'to telephone / call',
      stem: 'telefonier',
      category: 'standard',
      icon: '📱',
      conjugation: {
        ich: { form: 'telefoniere', ending: 'e' },
        du: { form: 'telefonierst', ending: 'st' },
        Sie_sing: { form: 'telefonieren', ending: 'en' },
        er_sie_es: { form: 'telefoniert', ending: 't' },
        wir: { form: 'telefonieren', ending: 'en' },
        ihr: { form: 'telefoniert', ending: 't' },
        Sie_plur: { form: 'telefonieren', ending: 'en' },
        sie: { form: 'telefonieren', ending: 'en' },
      },
      note: 'Long word, but completely obedient to regular rules!'
    },
    {
      id: 'fragen',
      infinitive: 'fragen',
      meaning: 'to ask / question',
      stem: 'frag',
      category: 'standard',
      icon: '❓',
      conjugation: {
        ich: { form: 'frage', ending: 'e' },
        du: { form: 'fragst', ending: 'st' },
        Sie_sing: { form: 'fragen', ending: 'en' },
        er_sie_es: { form: 'fragt', ending: 't' },
        wir: { form: 'fragen', ending: 'en' },
        ihr: { form: 'fragt', ending: 't' },
        Sie_plur: { form: 'fragen', ending: 'en' },
        sie: { form: 'fragen', ending: 'en' },
      },
      note: 'Ich frage, du fragst. Asking polite questions in German.'
    },
    {
      id: 'sagen',
      infinitive: 'sagen',
      meaning: 'to say / tell',
      stem: 'sag',
      category: 'standard',
      icon: '💬',
      conjugation: {
        ich: { form: 'sage', ending: 'e' },
        du: { form: 'sagst', ending: 'st' },
        Sie_sing: { form: 'sagen', ending: 'en' },
        er_sie_es: { form: 'sagt', ending: 't' },
        wir: { form: 'sagen', ending: 'en' },
        ihr: { form: 'sagt', ending: 't' },
        Sie_plur: { form: 'sagen', ending: 'en' },
        sie: { form: 'sagen', ending: 'en' },
      },
      note: 'Was sagst du? (What are you saying?)'
    },

    // Special Case 1: Hissing Sound Rule (-s, -ß, -z) (Slides 15-17)
    {
      id: 'reisen',
      infinitive: 'reisen',
      meaning: 'to travel',
      stem: 'reis',
      category: 'hiss',
      icon: '✈️',
      conjugation: {
        ich: { form: 'reise', ending: 'e' },
        du: { form: 'reist', ending: 't', isWarning: true, reason: 'Stem ends in -s, so "-st" drops the extra "s" to avoid double hiss!' },
        Sie_sing: { form: 'reisen', ending: 'en' },
        er_sie_es: { form: 'reist', ending: 't' },
        wir: { form: 'reisen', ending: 'en' },
        ihr: { form: 'reist', ending: 't' },
        Sie_plur: { form: 'reisen', ending: 'en' },
        sie: { form: 'reisen', ending: 'en' },
      },
      note: 'Slide 16: du reist! (Not "du reis-st"!).'
    },
    {
      id: 'tanzen',
      infinitive: 'tanzen',
      meaning: 'to dance',
      stem: 'tanz',
      category: 'hiss',
      icon: '💃',
      conjugation: {
        ich: { form: 'tanze', ending: 'e' },
        du: { form: 'tanzt', ending: 't', isWarning: true, reason: 'Stem ends in -z (sounds like ts), so "-st" drops the extra "s"!' },
        Sie_sing: { form: 'tanzen', ending: 'en' },
        er_sie_es: { form: 'tanzt', ending: 't' },
        wir: { form: 'tanzen', ending: 'en' },
        ihr: { form: 'tanzt', ending: 't' },
        Sie_plur: { form: 'tanzen', ending: 'en' },
        sie: { form: 'tanzen', ending: 'en' },
      },
      note: 'Slide 17: du tanzt! (Not "du tanz-st"!).'
    },

    // Special Case 2: Breathing Cushion -e- Rule (-d or -t) (Slides 18-21)
    {
      id: 'arbeiten',
      infinitive: 'arbeiten',
      meaning: 'to work',
      stem: 'arbeit',
      category: 'cushion',
      icon: '💼',
      conjugation: {
        ich: { form: 'arbeite', ending: 'e' },
        du: { form: 'arbeitest', ending: 'est', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" prevents choking: arbeit-e-st!' },
        Sie_sing: { form: 'arbeiten', ending: 'en' },
        er_sie_es: { form: 'arbeitet', ending: 'et', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: arbeit-e-t!' },
        wir: { form: 'arbeiten', ending: 'en' },
        ihr: { form: 'arbeitet', ending: 'et', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: arbeit-e-t!' },
        Sie_plur: { form: 'arbeiten', ending: 'en' },
        sie: { form: 'arbeiten', ending: 'en' },
      },
      note: 'Slide 19: Cushion "-e-" added for du, er/sie/es, and ihr!'
    },
    {
      id: 'warten',
      infinitive: 'warten',
      meaning: 'to wait',
      stem: 'wart',
      category: 'cushion',
      icon: '⏱️',
      conjugation: {
        ich: { form: 'warte', ending: 'e' },
        du: { form: 'wartest', ending: 'est', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: wart-e-st!' },
        Sie_sing: { form: 'warten', ending: 'en' },
        er_sie_es: { form: 'wartet', ending: 'et', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: wart-e-t!' },
        wir: { form: 'warten', ending: 'en' },
        ihr: { form: 'wartet', ending: 'et', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: wart-e-t!' },
        Sie_plur: { form: 'warten', ending: 'en' },
        sie: { form: 'warten', ending: 'en' },
      },
      note: 'Slide 20: du wartest, er wartet, ihr wartet!'
    },
    {
      id: 'antworten',
      infinitive: 'antworten',
      meaning: 'to answer',
      stem: 'antwort',
      category: 'cushion',
      icon: '✍️',
      conjugation: {
        ich: { form: 'antworte', ending: 'e' },
        du: { form: 'antwortest', ending: 'est', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: antwort-e-st!' },
        Sie_sing: { form: 'antworten', ending: 'en' },
        er_sie_es: { form: 'antwortet', ending: 'et', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: antwort-e-t!' },
        wir: { form: 'antworten', ending: 'en' },
        ihr: { form: 'antwortet', ending: 'et', isWarning: true, reason: 'Stem ends in -t! Cushion "-e-" inserted: antwort-e-t!' },
        Sie_plur: { form: 'antworten', ending: 'en' },
        sie: { form: 'antworten', ending: 'en' },
      },
      note: 'Slide 21: du antwortest, er antwortet, ihr antwortet!'
    }
  ];

  const currentVerb = ALL_VERBS.find(v => v.id === activeVerbId) || ALL_VERBS[0];
  const filteredVerbs = ALL_VERBS.filter(v => v.category === selectedCategory);

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
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Lesson 13: Regular Verbs & The 2 Golden Exceptions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Regelmäßige Verben im Präsens 🧩✨
            </h2>
            <p className="text-white/90 text-xs sm:text-sm font-medium max-w-xl">
              Conjugate with 100% confidence! Master the rock-solid endings (<strong>-e, -st, -t, -en, -t, -en</strong>), plus the two life-saving pronunciation rules: <strong>No Double Snake Hiss</strong> and the <strong>Breathing Cushion -e-</strong>!
            </p>
          </div>
          <button
            onClick={speakFullVerb}
            className="flex items-center gap-2 bg-white text-stone-900 hover:bg-amber-100 px-5 py-3 rounded-2xl font-black text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-emerald-600" />
            <span>Hear Active Verb</span>
          </button>
        </div>
      </div>

      {/* Category Tabs: Standard vs Hiss vs Cushion */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300">
        <button
          onClick={() => {
            setSelectedCategory('standard');
            setActiveVerbId('wohnen');
            playChime('click');
          }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            selectedCategory === 'standard'
              ? 'bg-white text-emerald-950 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>🟢 1. Standard Regular (9 Verbs)</span>
        </button>
        <button
          onClick={() => {
            setSelectedCategory('hiss');
            setActiveVerbId('reisen');
            playChime('click');
          }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            selectedCategory === 'hiss'
              ? 'bg-white text-rose-950 shadow-md ring-2 ring-rose-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>🐍 2. No Double Hiss (-s, -ß, -z)</span>
        </button>
        <button
          onClick={() => {
            setSelectedCategory('cushion');
            setActiveVerbId('arbeiten');
            playChime('click');
          }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            selectedCategory === 'cushion'
              ? 'bg-white text-amber-950 shadow-md ring-2 ring-amber-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>🛋️ 3. Cushion -e- (-d, -t)</span>
        </button>
      </div>

      {/* Sub-Verb Selector Chips */}
      <div className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
          <span>Choose a Verb to Inspect:</span>
          <span className="text-emerald-700 font-black">{filteredVerbs.length} verbs in this group</span>
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

      {/* Master Chalkboard Conjugation View (Matches Slide 5-21 Chalkboard Aesthetics) */}
      <div className="bg-[#21292d] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-800/60 shadow-2xl space-y-6 relative overflow-hidden font-sans">
        {/* Subtle chalkboard top indicator */}
        <div className="flex items-center justify-between border-b border-stone-700/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentVerb.icon}</span>
            <div>
              <div className="text-amber-400 font-mono text-2xl sm:text-3xl font-black tracking-wide">
                {currentVerb.infinitive}
              </div>
              <div className="text-stone-300 text-xs sm:text-sm italic">
                {currentVerb.meaning} • Verbstamm: <span className="text-emerald-300 font-mono font-bold">{currentVerb.stem}</span>
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

        {/* 2-Column Split: Singular vs Plural (Directly matching Slide 5 & Slides 6-21) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-700/80">
          {/* Column 1: Singular */}
          <div className="space-y-3.5 pr-0 md:pr-4">
            <div className="text-amber-400 font-black text-sm uppercase tracking-widest flex items-center justify-between">
              <span>Singular (1 Person)</span>
              <span className="text-[11px] text-stone-400 font-normal">Tap any row to speak</span>
            </div>

            {/* ich */}
            <div
              onClick={() => speakConjugationRow('ich', currentVerb.conjugation.ich.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border border-stone-700 flex items-center justify-between cursor-pointer transition-all hover:border-amber-400/50"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">ich</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.stem}<span className="text-cyan-400">-{currentVerb.conjugation.ich.ending}</span>
                </span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* du */}
            <div
              onClick={() => speakConjugationRow('du', currentVerb.conjugation.du.form)}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                currentVerb.conjugation.du.isWarning
                  ? 'bg-rose-950/40 border-rose-500/80 text-rose-100 hover:border-rose-400'
                  : 'bg-stone-800/80 border-stone-700 text-white hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">du</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.stem}<span className={currentVerb.conjugation.du.isWarning ? "text-rose-400 font-extrabold" : "text-cyan-400"}>
                    -{currentVerb.conjugation.du.ending}
                  </span>
                </span>
                {currentVerb.conjugation.du.isWarning && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-rose-900/80 text-rose-200 px-2 py-0.5 rounded-md border border-rose-500">
                    <AlertTriangle className="w-3 h-3 text-rose-300" />
                    <span>⚠️ Slide Rule</span>
                  </span>
                )}
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* Sie (Singular formal) */}
            <div
              onClick={() => speakConjugationRow('Sie', currentVerb.conjugation.Sie_sing.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border border-stone-700 flex items-center justify-between cursor-pointer transition-all hover:border-amber-400/50"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">Sie</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.stem}<span className="text-cyan-400">-{currentVerb.conjugation.Sie_sing.ending}</span>
                </span>
                <span className="text-[10px] text-stone-400 font-bold">(formal you)</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* er / sie / es */}
            <div
              onClick={() => speakConjugationRow('er, sie, es', currentVerb.conjugation.er_sie_es.form)}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                currentVerb.conjugation.er_sie_es.isWarning
                  ? 'bg-rose-950/40 border-rose-500/80 text-rose-100 hover:border-rose-400'
                  : 'bg-stone-800/80 border-stone-700 text-white hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs font-black text-stone-400">er/sie/es</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.stem}<span className={currentVerb.conjugation.er_sie_es.isWarning ? "text-rose-400 font-extrabold" : "text-cyan-400"}>
                    -{currentVerb.conjugation.er_sie_es.ending}
                  </span>
                </span>
                {currentVerb.conjugation.er_sie_es.isWarning && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-rose-900/80 text-rose-200 px-2 py-0.5 rounded-md border border-rose-500">
                    <AlertTriangle className="w-3 h-3 text-rose-300" />
                    <span>⚠️ Cushion -e-</span>
                  </span>
                )}
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>
          </div>

          {/* Column 2: Plural */}
          <div className="space-y-3.5 pt-4 md:pt-0 pl-0 md:pl-4">
            <div className="text-amber-400 font-black text-sm uppercase tracking-widest flex items-center justify-between">
              <span>Plural (Group / Multi)</span>
              <span className="text-[11px] text-emerald-400 font-bold">Slide 10 Identical Trio!</span>
            </div>

            {/* wir */}
            <div
              onClick={() => speakConjugationRow('wir', currentVerb.conjugation.wir.form)}
              className="p-3 bg-stone-800/80 hover:bg-stone-750 rounded-2xl border-2 border-emerald-500/60 flex items-center justify-between cursor-pointer transition-all hover:border-emerald-400"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">wir</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.stem}<span className="text-emerald-400 font-bold">-{currentVerb.conjugation.wir.ending}</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">✓ like infinitive</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>

            {/* ihr */}
            <div
              onClick={() => speakConjugationRow('ihr', currentVerb.conjugation.ihr.form)}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                currentVerb.conjugation.ihr.isWarning
                  ? 'bg-rose-950/40 border-rose-500/80 text-rose-100 hover:border-rose-400'
                  : 'bg-stone-800/80 border-stone-700 text-white hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-black text-stone-400">ihr</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">
                  {currentVerb.stem}<span className={currentVerb.conjugation.ihr.isWarning ? "text-rose-400 font-extrabold" : "text-cyan-400"}>
                    -{currentVerb.conjugation.ihr.ending}
                  </span>
                </span>
                {currentVerb.conjugation.ihr.isWarning && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-rose-900/80 text-rose-200 px-2 py-0.5 rounded-md border border-rose-500">
                    <AlertTriangle className="w-3 h-3 text-rose-300" />
                    <span>⚠️ Cushion -e-</span>
                  </span>
                )}
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
                  {currentVerb.stem}<span className="text-emerald-400 font-bold">-{currentVerb.conjugation.Sie_plur.ending}</span>
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
                  {currentVerb.stem}<span className="text-emerald-400 font-bold">-{currentVerb.conjugation.sie.ending}</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">✓ like infinitive</span>
              </div>
              <Volume2 className="w-4 h-4 text-stone-400" />
            </div>
          </div>
        </div>

        {/* Chalkboard Teacher Note */}
        <div className="bg-stone-800/90 rounded-2xl p-4 border border-stone-600/70 text-xs sm:text-sm text-stone-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-black text-amber-300">Teacher's Note for {currentVerb.infinitive}:</div>
            <p className="mt-0.5 leading-relaxed">{currentVerb.note}</p>
          </div>
        </div>
      </div>

      {/* Golden Rules Deep Dive (Slides 15 & 18) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Special Case 1 */}
        <div className="bg-rose-50 rounded-3xl p-5 sm:p-6 border-3 border-rose-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-rose-800 tracking-wider">Slide 15 Rule</span>
            <span className="text-2xl">🐍 🚫</span>
          </div>
          <h4 className="text-lg font-black text-rose-950">
            Special Case 1: Hissing Stems (-s, -ß, -z)
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            If the stem ends in <strong>-s</strong>, <strong>-ß</strong>, or <strong>-z</strong> (e.g., <em>reisen, tanzen</em>), the <strong>-st</strong> ending drops the extra <strong>s</strong>!
          </p>
          <div className="bg-white p-3 rounded-2xl border border-rose-200 text-xs font-mono font-bold text-rose-950 space-y-1">
            <div>• du reisen $\rightarrow$ du <strong className="text-rose-600 underline">reist</strong> (Not reis-st!)</div>
            <div>• du tanzen $\rightarrow$ du <strong className="text-rose-600 underline">tanzt</strong> (Not tanz-st!)</div>
          </div>
        </div>

        {/* Special Case 2 */}
        <div className="bg-amber-50 rounded-3xl p-5 sm:p-6 border-3 border-amber-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-800 tracking-wider">Slide 18 Rule</span>
            <span className="text-2xl">🛋️ 💨</span>
          </div>
          <h4 className="text-lg font-black text-amber-950">
            Special Case 2: Tongue Cushion -e- (-d, -t)
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            If the stem ends in <strong>-d</strong> or <strong>-t</strong> (e.g., <em>arbeiten, warten, antworten</em>), we insert a cushion <strong>-e-</strong> so your tongue doesn't stumble!
          </p>
          <div className="bg-white p-3 rounded-2xl border border-amber-200 text-xs font-mono font-bold text-amber-950 space-y-1">
            <div>• du $\rightarrow$ <strong className="text-amber-700 underline">arbeitest</strong> / <strong className="text-amber-700 underline">wartest</strong></div>
            <div>• er/sie/es & ihr $\rightarrow$ <strong className="text-amber-700 underline">arbeitet</strong> / <strong className="text-amber-700 underline">wartet</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
