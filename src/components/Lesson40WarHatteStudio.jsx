import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson40WarHatteStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('timetravel'); // 'timetravel' | 'conjugator' | 'drill'
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [selectedVerb, setSelectedVerb] = useState('haben'); // 'haben' | 'sein'
  const [selectedPronoun, setSelectedPronoun] = useState('ich');
  const [drillAnswers, setDrillAnswers] = useState({});

  const TIMETRAVEL_SCENARIOS = [
    {
      id: 'auto',
      title: 'Car Ownership (Slide 6)',
      icon: '🚗',
      badge: 'haben ➔ hatte',
      past: {
        german: 'Letztes Jahr hatte ich kein Auto.',
        english: 'Last year I did not have a car.',
        timeTrigger: 'Letztes Jahr (Last year)',
        verb: 'hatte',
        tense: 'Präteritum (Past)'
      },
      present: {
        german: 'Heute habe ich ein Auto.',
        english: 'Today I have a car.',
        timeTrigger: 'Heute (Today)',
        verb: 'habe',
        tense: 'Präsens (Present)'
      },
      explanation: 'In the past, "haben" changes to "hatte" for "ich". Notice the verb sits in Position 2 following the time trigger!'
    },
    {
      id: 'geld',
      title: 'Money & Wealth (Slide 7)',
      icon: '💰',
      badge: 'haben ➔ hatten',
      past: {
        german: 'Vor ein paar Jahren hatten wir kein Geld.',
        english: 'A few years ago we did not have money.',
        timeTrigger: 'Vor ein paar Jahren (A few years ago)',
        verb: 'hatten',
        tense: 'Präteritum (Past)'
      },
      present: {
        german: 'Heute haben wir viel Geld.',
        english: 'Today we have a lot of money.',
        timeTrigger: 'Heute (Today)',
        verb: 'haben',
        tense: 'Präsens (Present)'
      },
      explanation: 'With "wir", "haben" in the past becomes "hatten". Both sentences start with a time word and place the verb in Position 2!'
    },
    {
      id: 'zeit',
      title: 'Maria\'s Schedule (Slides 8 & 9)',
      icon: '⏱️',
      badge: 'hat ➔ hatte',
      past: {
        german: 'Gestern hatte Maria keine Zeit.',
        english: 'Yesterday Maria did not have any time.',
        timeTrigger: 'Gestern (Yesterday)',
        verb: 'hatte',
        tense: 'Präteritum (Past)'
      },
      present: {
        german: 'Heute hat sie viel Zeit.',
        english: 'Today she has a lot of time.',
        timeTrigger: 'Heute (Today)',
        verb: 'hat',
        tense: 'Präsens (Present)'
      },
      explanation: 'Maria (sie / 3rd person) takes "hatte" in the past. This is 100% identical to the "ich" form (The Mirror Twin Rule)!'
    },
    {
      id: 'wetter',
      title: 'Weather Condition (Slide 12)',
      icon: '🌤️',
      badge: 'ist ➔ war',
      past: {
        german: 'Gestern war das Wetter schlecht.',
        english: 'The weather was bad yesterday.',
        timeTrigger: 'Gestern (Yesterday)',
        verb: 'war',
        tense: 'Präteritum (Past)'
      },
      present: {
        german: 'Heute ist das Wetter schön.',
        english: 'The weather is beautiful today.',
        timeTrigger: 'Heute (Today)',
        verb: 'ist',
        tense: 'Präsens (Present)'
      },
      explanation: '"sein" in the past changes to "war". For neuter nouns like "das Wetter" (es), the verb form is "war".'
    },
    {
      id: 'energie',
      title: 'Energy & Tiredness (Slide 13)',
      icon: '😃',
      badge: 'ist ➔ war',
      past: {
        german: 'Vorgestern war er müde.',
        english: 'The day before yesterday he was tired.',
        timeTrigger: 'Vorgestern (Day before yesterday)',
        verb: 'war',
        tense: 'Präteritum (Past)'
      },
      present: {
        german: 'Heute ist er munter.',
        english: 'Today he is cheerful / lively.',
        timeTrigger: 'Heute (Today)',
        verb: 'ist',
        tense: 'Präsens (Present)'
      },
      explanation: 'Describing physical states or feelings in the past uses "war". "munter" is the German word for cheerful, awake, and energetic!'
    },
    {
      id: 'ort',
      title: 'Travel & City Location (Slide 14)',
      icon: '✈️',
      badge: 'sind ➔ waren',
      past: {
        german: 'Letzte Woche waren wir in Berlin.',
        english: 'Last week we were in Berlin.',
        timeTrigger: 'Letzte Woche (Last week)',
        verb: 'waren',
        tense: 'Präteritum (Past)'
      },
      present: {
        german: 'Heute sind wir in London.',
        english: 'Today we are in London.',
        timeTrigger: 'Heute (Today)',
        verb: 'sind',
        tense: 'Präsens (Present)'
      },
      explanation: 'Being in a city is a location state (sein). In the past with "wir", "sind" becomes "waren"!'
    },
    {
      id: 'puenktlich',
      title: 'Robert\'s Punctuality (Slides 15 & 16)',
      icon: '⏰',
      badge: 'ist ➔ war',
      past: {
        german: 'Gestern war Robert spät.',
        english: 'Robert was late yesterday.',
        timeTrigger: 'Gestern (Yesterday)',
        verb: 'war',
        tense: 'Präteritum (Past)'
      },
      present: {
        german: 'Heute ist er pünktlich.',
        english: 'Today he is punctual.',
        timeTrigger: 'Heute (Today)',
        verb: 'ist',
        tense: 'Präsens (Present)'
      },
      explanation: 'Being late (spät) or punctual (pünktlich) uses "sein". In the past: "Gestern war Robert spät"!'
    }
  ];

  const CONJUGATION_DATA = {
    haben: {
      infinitive: 'haben',
      meaning: 'to have ➔ had (hatte / hatten)',
      icon: '🧳',
      color: 'amber',
      table: [
        { pronoun: 'ich', past: 'hatte', ending: '-te', note: '⚠️ Twin with er/sie/es', example: 'Ich hatte ein Auto.', exEn: 'I had a car.' },
        { pronoun: 'du', past: 'hattest', ending: '-test', note: 'Standard -st ending', example: 'Du hattest keine Zeit.', exEn: 'You had no time.' },
        { pronoun: 'er/sie/es', past: 'hatte', ending: '-te', note: '⚠️ Twin with ich', example: 'Maria hatte Fieber.', exEn: 'Maria had a fever.' },
        { pronoun: 'wir', past: 'hatten', ending: '-ten', note: 'Plural base form', example: 'Wir hatten einen Hund.', exEn: 'We had a dog.' },
        { pronoun: 'ihr', past: 'hattet', ending: '-tet', note: 'You all had', example: 'Ihr hattet viel Glück.', exEn: 'You guys had a lot of luck.' },
        { pronoun: 'Sie / sie', past: 'hatten', ending: '-ten', note: 'Formal / Plural they', example: 'Sie hatten kein Geld.', exEn: 'They had no money.' }
      ]
    },
    sein: {
      infinitive: 'sein',
      meaning: 'to be ➔ was / were (war / waren)',
      icon: '🏛️',
      color: 'blue',
      table: [
        { pronoun: 'ich', past: 'war', ending: 'zero (stem only)', note: '⚠️ Twin with er/sie/es (no -e!)', example: 'Ich war sehr müde.', exEn: 'I was very tired.' },
        { pronoun: 'du', past: 'warst', ending: '-st', note: 'Adds -st to stem', example: 'Du warst in Berlin.', exEn: 'You were in Berlin.' },
        { pronoun: 'er/sie/es', past: 'war', ending: 'zero (stem only)', note: '⚠️ Twin with ich (no -t!)', example: 'Robert war spät.', exEn: 'Robert was late.' },
        { pronoun: 'wir', past: 'waren', ending: '-en', note: 'Plural base form', example: 'Wir waren im Unterricht.', exEn: 'We were in class.' },
        { pronoun: 'ihr', past: 'wart', ending: '-t', note: 'You all were', example: 'Ihr wart pünktlich.', exEn: 'You guys were punctual.' },
        { pronoun: 'Sie / sie', past: 'waren', ending: '-en', note: 'Formal / Plural they', example: 'Sie waren zu Hause.', exEn: 'They were at home.' }
      ]
    }
  };

  const DRILL_QUESTIONS = [
    {
      id: 'd1',
      slide: 'Slide 20',
      sentenceBefore: 'Wir',
      sentenceAfter: 'einen Hund.',
      correct: 'hatten',
      options: ['hatten', 'waren'],
      meaning: 'We had a dog.',
      hint: 'A dog is a pet/possession ➔ haben in the past (wir hatten).',
      explanation: 'Pets and animals use "haben" (to have). With "wir", the past form is "Wir hatten einen Hund".'
    },
    {
      id: 'd2',
      slide: 'Slide 21',
      sentenceBefore: 'Vorgestern',
      sentenceAfter: 'wir im Unterricht.',
      correct: 'waren',
      options: ['waren', 'hatten'],
      meaning: 'The day before yesterday we were in class.',
      hint: 'Being in class is a location/attendance ➔ sein in the past (wir waren).',
      explanation: 'Being present somewhere uses "sein" (to be). With "wir", the past form is "Vorgestern waren wir im Unterricht".'
    },
    {
      id: 'd3',
      slide: 'Slide 22',
      sentenceBefore: 'Gestern',
      sentenceAfter: 'Peter Fieber.',
      correct: 'hatte',
      options: ['hatte', 'war'],
      meaning: 'Yesterday Peter had a fever.',
      hint: 'In German, you "have" medical symptoms and fever (Fieber haben ➔ hatte).',
      explanation: 'Illnesses and symptoms use "haben". Peter (er) takes "hatte": "Gestern hatte Peter Fieber".'
    },
    {
      id: 'd4',
      slide: 'Slide 23',
      sentenceBefore: 'Letzte Woche',
      sentenceAfter: 'ich sehr müde.',
      correct: 'war',
      options: ['war', 'hatte'],
      meaning: 'Last week I was very tired.',
      hint: 'Being tired is a personal physical condition/state ➔ sein in the past (ich war).',
      explanation: 'Feelings and conditions use "sein". "ich" takes "war": "Letzte Woche war ich sehr müde".'
    },
    {
      id: 'd5',
      slide: 'Slide 7',
      sentenceBefore: 'Vor ein paar Jahren',
      sentenceAfter: 'wir kein Geld.',
      correct: 'hatten',
      options: ['hatten', 'waren'],
      meaning: 'A few years ago we had no money.',
      hint: 'Money is a possession (haben) ➔ wir hatten.',
      explanation: 'Money is owned (haben), so with "wir" the past is "hatten": "Vor ein paar Jahren hatten wir kein Geld".'
    },
    {
      id: 'd6',
      slide: 'Slide 15',
      sentenceBefore: 'Gestern',
      sentenceAfter: 'Robert spät.',
      correct: 'war',
      options: ['war', 'hatte'],
      meaning: 'Yesterday Robert was late.',
      hint: 'Being late/punctual is a state (sein) ➔ er war.',
      explanation: 'Punctuality uses "sein". Robert (er) takes "war": "Gestern war Robert spät".'
    }
  ];

  const handleDrillChoice = (qId, option, isCorrect) => {
    playChime(isCorrect ? 'success' : 'wrong');
    setDrillAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
    if (isCorrect) {
      const q = DRILL_QUESTIONS.find(item => item.id === qId);
      const fullSentence = `${q.sentenceBefore} ${option} ${q.sentenceAfter}`;
      speakGerman(fullSentence, isSlowMode);
    }
  };

  const currentScenario = TIMETRAVEL_SCENARIOS[selectedScenarioIdx];
  const currentConjugation = CONJUGATION_DATA[selectedVerb];
  const activePronounRow = currentConjugation.table.find(r => r.pronoun === selectedPronoun) || currentConjugation.table[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 text-9xl transform translate-x-8 -translate-y-8 select-none">
          ⏳
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <span>⏳ Lesson 40 Interactive Studio</span>
            <span>•</span>
            <span>war & hatte (Simple Past)</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            The Time-Travel Engine: war & hatte
          </h1>
          <p className="text-amber-100 text-sm md:text-base leading-relaxed">
            Travel into the past with total ease! Discover how the two royal pillars <strong>sein</strong> (<em>ich war</em> = was) and <strong>haben</strong> (<em>ich hatte</em> = had) conquer yesterday, last week, and last year. Master the <strong>Mirror Twin Rule</strong> and test your skills with live chalkboard drills!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/20">
          <button
            onClick={() => setActiveTab('timetravel')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'timetravel'
                ? 'bg-white text-amber-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>⏳</span>
            <span>Time-Travel Contrast</span>
          </button>
          <button
            onClick={() => setActiveTab('conjugator')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'conjugator'
                ? 'bg-white text-amber-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>👑</span>
            <span>The Royal Past Conjugator</span>
          </button>
          <button
            onClick={() => setActiveTab('drill')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'drill'
                ? 'bg-white text-amber-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>📝</span>
            <span>Chalkboard Drill: war oder hatte?</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TIME-TRAVEL CONTRAST */}
      {activeTab === 'timetravel' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Time Continuum Banner (Slides 2-4) */}
          <div className="bg-stone-900 rounded-3xl p-6 text-white space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                The German Time Spectrum (Slide 3)
              </span>
              <span className="text-xs text-stone-400">Past ➔ Present ➔ Future</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-amber-950/60 border-2 border-amber-500 rounded-2xl space-y-1">
                <span className="text-2xl">⏳</span>
                <p className="font-black text-amber-400 text-sm md:text-base">Vergangenheit</p>
                <p className="text-xs text-stone-300">Past (gestern, letzte Woche)</p>
                <p className="text-xs font-mono font-bold text-amber-300">war / hatte</p>
              </div>

              <div className="p-4 bg-emerald-950/60 border-2 border-emerald-500 rounded-2xl space-y-1">
                <span className="text-2xl">☀️</span>
                <p className="font-black text-emerald-400 text-sm md:text-base">Gegenwart</p>
                <p className="text-xs text-stone-300">Present (heute, jetzt)</p>
                <p className="text-xs font-mono font-bold text-emerald-300">ist / hat</p>
              </div>

              <div className="p-4 bg-stone-800 border-2 border-stone-700 rounded-2xl space-y-1 opacity-60">
                <span className="text-2xl">🚀</span>
                <p className="font-black text-stone-300 text-sm md:text-base">Zukunft</p>
                <p className="text-xs text-stone-400">Future (morgen, bald)</p>
                <p className="text-xs font-mono text-stone-400">wird...</p>
              </div>
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {TIMETRAVEL_SCENARIOS.map((scen, idx) => (
              <button
                key={scen.id}
                onClick={() => setSelectedScenarioIdx(idx)}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  selectedScenarioIdx === idx
                    ? 'border-amber-600 bg-amber-50/90 shadow-md ring-2 ring-amber-300 scale-105'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="text-2xl">{scen.icon}</span>
                <span className="text-xs font-bold line-clamp-1">{scen.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Scenario Card Showcase */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-100 text-amber-800 rounded-2xl text-3xl">
                  {currentScenario.icon}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    {currentScenario.badge}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-stone-900">
                    {currentScenario.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => {
                  const combined = `${currentScenario.past.german} ... ${currentScenario.present.german}`;
                  speakGerman(combined, isSlowMode);
                }}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow transition-all flex items-center gap-2 text-sm"
              >
                <span>🔊</span>
                <span>Listen Both Sentences</span>
              </button>
            </div>

            {/* Split Screen Comparison: Past vs. Present */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PAST CARD */}
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-300 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-600 text-white font-bold rounded-full text-xs uppercase tracking-wider">
                    ⏳ PAST (Vergangenheit)
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-800">
                    {currentScenario.past.timeTrigger}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xl md:text-2xl font-black text-stone-900 font-sans">
                    {currentScenario.past.german}
                  </p>
                  <p className="text-xs md:text-sm text-stone-600 italic">
                    "{currentScenario.past.english}"
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-amber-200">
                  <span className="text-xs text-amber-900 font-medium">
                    Past Verb: <strong className="text-amber-700 text-sm font-mono">{currentScenario.past.verb}</strong>
                  </span>
                  <button
                    onClick={() => speakGerman(currentScenario.past.german, isSlowMode)}
                    className="p-2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl text-xs font-bold transition-all"
                    title="Listen to Past"
                  >
                    🔊
                  </button>
                </div>
              </div>

              {/* PRESENT CARD */}
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-300 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-full text-xs uppercase tracking-wider">
                    ☀️ PRESENT (Gegenwart)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800">
                    {currentScenario.present.timeTrigger}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xl md:text-2xl font-black text-stone-900 font-sans">
                    {currentScenario.present.german}
                  </p>
                  <p className="text-xs md:text-sm text-stone-600 italic">
                    "{currentScenario.present.english}"
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-emerald-200">
                  <span className="text-xs text-emerald-900 font-medium">
                    Present Verb: <strong className="text-emerald-700 text-sm font-mono">{currentScenario.present.verb}</strong>
                  </span>
                  <button
                    onClick={() => speakGerman(currentScenario.present.german, isSlowMode)}
                    className="p-2 bg-emerald-200 hover:bg-emerald-300 text-emerald-900 rounded-xl text-xs font-bold transition-all"
                    title="Listen to Present"
                  >
                    🔊
                  </button>
                </div>
              </div>
            </div>

            {/* Explanation Callout */}
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide flex items-center gap-1.5">
                <span>💡</span>
                <span>The Golden Inversion & Tense Switch:</span>
              </span>
              <p className="text-sm text-stone-700 font-medium leading-relaxed">
                {currentScenario.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE ROYAL PAST CONJUGATOR */}
      {activeTab === 'conjugator' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Verb Switcher */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setSelectedVerb('haben');
                setSelectedPronoun('ich');
              }}
              className={`px-6 py-3 rounded-2xl font-black text-base transition-all flex items-center gap-2 ${
                selectedVerb === 'haben'
                  ? 'bg-amber-600 text-white shadow-lg ring-4 ring-amber-200 scale-105'
                  : 'bg-white border-2 border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>🧳</span>
              <span>haben ➔ hatte (had)</span>
            </button>
            <button
              onClick={() => {
                setSelectedVerb('sein');
                setSelectedPronoun('ich');
              }}
              className={`px-6 py-3 rounded-2xl font-black text-base transition-all flex items-center gap-2 ${
                selectedVerb === 'sein'
                  ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200 scale-105'
                  : 'bg-white border-2 border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>🏛️</span>
              <span>sein ➔ war (was / were)</span>
            </button>
          </div>

          {/* Mirror Twin Secret Highlight */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-md flex items-start gap-4">
            <span className="text-4xl">🪞</span>
            <div className="space-y-1">
              <h3 className="font-bold text-base md:text-lg">
                The Mirror Twin Rule (Die Zwillings-Regel - Slides 10 & 17)
              </h3>
              <p className="text-sm text-purple-100 leading-relaxed">
                In German Simple Past (<em>Präteritum</em>), <strong>ich</strong> (1st person) and <strong>er/sie/es</strong> (3rd person) are ALWAYS 100% identical!
                <br />
                • For <em>haben</em>: <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">ich hatte = er/sie/es hatte</span>
                <br />
                • For <em>sein</em>: <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">ich war = er/sie/es war</span>
              </p>
            </div>
          </div>

          {/* Conjugation Grid */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Select a Pronoun to Conjugate & Hear Audio
                </span>
                <h2 className="text-2xl font-black text-stone-900">
                  {currentConjugation.infinitive} • {currentConjugation.meaning}
                </h2>
              </div>
            </div>

            {/* Pronoun Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {currentConjugation.table.map((row, idx) => {
                const isSelected = selectedPronoun === row.pronoun;
                const isTwin = row.note.includes('Twin');
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPronoun(row.pronoun)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col justify-between gap-2 relative ${
                      isSelected
                        ? selectedVerb === 'haben'
                          ? 'border-amber-500 bg-amber-50/90 shadow ring-2 ring-amber-300 scale-105'
                          : 'border-blue-500 bg-blue-50/90 shadow ring-2 ring-blue-300 scale-105'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    {isTwin && (
                      <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-full shadow">
                        🪞 Twin
                      </span>
                    )}
                    <div>
                      <p className="text-xs font-bold text-stone-500 uppercase">{row.pronoun}</p>
                      <p className="text-xl font-black text-stone-900 font-mono mt-1">{row.past}</p>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">{row.ending}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Pronoun Showcase Box */}
            <div className="bg-stone-900 rounded-3xl p-6 md:p-8 text-white space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-amber-500 text-stone-900 font-black rounded-full text-xs">
                    {activePronounRow.pronoun}
                  </span>
                  <span className="text-xl md:text-2xl font-mono font-bold text-amber-300">
                    ➔ {activePronounRow.past}
                  </span>
                </div>
                <button
                  onClick={() => speakGerman(`${activePronounRow.pronoun} ${activePronounRow.past}. ${activePronounRow.example}`, isSlowMode)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <span>🔊</span>
                  <span>Listen Audio</span>
                </button>
              </div>

              <div className="p-4 bg-stone-800 rounded-2xl space-y-1">
                <span className="text-xs text-stone-400 uppercase tracking-wider block font-medium">Real-Life Example Sentence:</span>
                <p className="text-xl font-bold text-white font-sans">
                  "{activePronounRow.example}"
                </p>
                <p className="text-xs text-stone-300 italic">
                  "{activePronounRow.exEn}"
                </p>
              </div>

              <p className="text-xs text-stone-400">
                💡 <strong>Note:</strong> {activePronounRow.note}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHALKBOARD DRILL: WAR ODER HATTE? */}
      {activeTab === 'drill' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-3 border-4 border-amber-800/40">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📝</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Slides 18–23 Chalkboard Drill</span>
                <h2 className="text-2xl md:text-3xl font-black">Fill in the Blank: war oder hatte?</h2>
              </div>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              Decide whether each sentence describes a <strong>possession / symptom (hatte/hatten)</strong> or a <strong>location / condition (war/waren)</strong>. Tap your choice to hear live audio verification!
            </p>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DRILL_QUESTIONS.map((q, idx) => {
              const selected = drillAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correct;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border-2 transition-all space-y-4 ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                        : 'bg-rose-50/80 border-rose-300 shadow-sm'
                      : 'bg-white border-stone-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-stone-100 text-stone-600 font-bold rounded-full text-xs">
                      {q.slide} • Exercise {idx + 1}
                    </span>
                    {isAnswered && (
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                      }`}>
                        {isCorrect ? '✓ Richtig!' : '✗ Falsch'}
                      </span>
                    )}
                  </div>

                  {/* Chalkboard Sentence */}
                  <div className="p-4 bg-stone-900 text-white rounded-2xl text-center space-y-1">
                    <p className="text-lg md:text-xl font-bold font-mono">
                      {q.sentenceBefore}{' '}
                      <span className={`underline font-black px-1 ${
                        isAnswered
                          ? isCorrect
                            ? 'text-emerald-400'
                            : 'text-rose-400'
                          : 'text-amber-400'
                      }`}>
                        {isAnswered ? selected : '______'}
                      </span>{' '}
                      {q.sentenceAfter}
                    </p>
                    <p className="text-xs text-stone-400 italic">
                      "{q.meaning}"
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleDrillChoice(q.id, opt, opt === q.correct)}
                        className={`py-2.5 px-4 rounded-xl font-black text-sm transition-all ${
                          selected === opt
                            ? opt === q.correct
                              ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-300'
                              : 'bg-rose-600 text-white shadow ring-2 ring-rose-300'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Hint & Feedback */}
                  {isAnswered ? (
                    <p className={`text-xs font-medium ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {q.explanation}
                    </p>
                  ) : (
                    <p className="text-xs text-stone-500 italic">
                      💡 Hint: {q.hint}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
