import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson41InseparableStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('bodyguards'); // 'bodyguards' | 'contrast' | 'forge'
  const [selectedPrefix, setSelectedPrefix] = useState('all');
  const [selectedVerbKey, setSelectedVerbKey] = useState('verstehen');
  const [selectedPronoun, setSelectedPronoun] = useState('ich');
  const [contrastMode, setContrastMode] = useState('statement'); // 'statement' | 'w-frage' | 'ja-nein' | 'modal'

  const PREFIXES = [
    { key: 'all', label: 'All 8 Bodyguards', count: 16, icon: '🛡️' },
    { key: 'be', label: 'be-', count: 2, example: 'bekommen, bezahlen', icon: '💳' },
    { key: 'emp', label: 'emp-', count: 2, example: 'empfehlen, empfangen', icon: '🍽️' },
    { key: 'ent', label: 'ent-', count: 2, example: 'entdecken, entleeren', icon: '🔍' },
    { key: 'er', label: 'er-', count: 2, example: 'erzählen, erkennen', icon: '👴' },
    { key: 'ge', label: 'ge-', count: 2, example: 'gehören, gefallen', icon: '⌚' },
    { key: 'miss', label: 'miss-', count: 2, example: 'missbrauchen, missverstehen', icon: '🤝' },
    { key: 'ver', label: 'ver-', count: 3, example: 'verkaufen, verlieren, verstehen', icon: '🏡' },
    { key: 'zer', label: 'zer-', count: 2, example: 'zerkleinern, zerstören', icon: '🥕' }
  ];

  const INSEPARABLE_VERBS = [
    {
      id: 'bekommen',
      prefix: 'be',
      infinitive: 'bekommen',
      meaning: 'to get / receive',
      icon: '👩‍🏫',
      sentence: 'Wir bekommen bald eine neue Lehrerin.',
      english: 'Soon we will get a new teacher.',
      slide: 'Slide 8',
      explanation: 'Notice how "be-" stays permanently attached to "kommen". It never separates into "kommen... be"!'
    },
    {
      id: 'bezahlen',
      prefix: 'be',
      infinitive: 'bezahlen',
      meaning: 'to pay',
      icon: '💳',
      sentence: 'Kannst du bitte heute bezahlen? Ich habe kein Geld.',
      english: 'Can you pay today please? I have no money.',
      slide: 'Slide 9',
      explanation: 'Used every day in shops and restaurants: "Ich bezahle die Rechnung" (I pay the bill).'
    },
    {
      id: 'empfehlen',
      prefix: 'emp',
      infinitive: 'empfehlen',
      meaning: 'to recommend',
      icon: '🍽️',
      sentence: 'Herr Ober, was empfehlen Sie mir heute?',
      english: 'Waiter, what would you recommend me today?',
      slide: 'Slide 10',
      explanation: '"empfehlen" has a vowel shift in present (du empfiehlst / er empfiehlt) but "emp-" never detaches!'
    },
    {
      id: 'empfangen',
      prefix: 'emp',
      infinitive: 'empfangen',
      meaning: 'to receive / welcome',
      icon: '🤝',
      sentence: 'Der Schulleiter empfängt seine Gäste herzlich.',
      english: 'The school principal receives his guests warmly.',
      slide: 'Slide 11',
      explanation: 'Vowel shift: "er empfängt" (with umlaut ä). The prefix "emp-" stays glued in Position 2.'
    },
    {
      id: 'entdecken',
      prefix: 'ent',
      infinitive: 'entdecken',
      meaning: 'to discover',
      icon: '🔍',
      sentence: 'Mein Sohn entdeckt jeden Tag etwas Neues.',
      english: 'My son discovers something new everyday.',
      slide: 'Slide 12',
      explanation: '"entdecken" = to uncover / discover. "Er entdeckt" (never "Er deckt... ent").'
    },
    {
      id: 'entleeren',
      prefix: 'ent',
      infinitive: 'entleeren',
      meaning: 'to empty',
      icon: '🗑️',
      sentence: 'Am Montag müssen wir die Mülltonne entleeren.',
      english: 'On Monday we have to empty the garbage bin.',
      slide: 'Slide 13',
      explanation: 'Built from "leer" (empty) + prefix "ent-". Modal verb puts the whole infinitive at the end.'
    },
    {
      id: 'erzaehlen',
      prefix: 'er',
      infinitive: 'erzählen',
      meaning: 'to tell / narrate',
      icon: '👴',
      sentence: 'Mein Großvater erzählt interessante Geschichten.',
      english: 'My grandfather tells interesting stories.',
      slide: 'Slide 14',
      explanation: '"erzählen" = narrating a story. The prefix "er-" never leaves the verb.'
    },
    {
      id: 'erkennen',
      prefix: 'er',
      infinitive: 'erkennen',
      meaning: 'to recognize',
      icon: '🖼️',
      sentence: 'Kannst du mich auf diesem Foto erkennen?',
      english: 'Can you recognize me in this photo?',
      slide: 'Slide 15',
      explanation: '"kennen" = to know people, "erkennen" = to recognize someone from sight or sound.'
    },
    {
      id: 'gehoeren',
      prefix: 'ge',
      infinitive: 'gehören',
      meaning: 'to belong to (+ Dativ)',
      icon: '⌚',
      sentence: 'Die Uhr gehört mir.',
      english: 'The watch belongs to me.',
      slide: 'Slide 16',
      explanation: '"gehören" is a pure Dative verb: "gehört mir" (belongs to me), "gehört dir" (belongs to you).'
    },
    {
      id: 'gefallen',
      prefix: 'ge',
      infinitive: 'gefallen',
      meaning: 'to please / appeal to (+ Dativ)',
      icon: '🏡',
      sentence: 'Mir gefällt dein neues Haus.',
      english: 'I like your new house (Your new house pleases me).',
      slide: 'Slide 17',
      explanation: '"gefallen" takes Dative: "Mir gefällt..." (du gefällst / er gefällt). "ge-" stays fixed!'
    },
    {
      id: 'missbrauchen',
      prefix: 'miss',
      infinitive: 'missbrauchen',
      meaning: 'to misuse / betray',
      icon: '🚫',
      sentence: 'Tom kann nie mein Vertrauen missbrauchen.',
      english: 'Tom can never betray my trust.',
      slide: 'Slide 18',
      explanation: '"miss-" means bad or wrong (like English "mis-"). "missbrauchen" = misuse / abuse.'
    },
    {
      id: 'missverstehen',
      prefix: 'miss',
      infinitive: 'missverstehen',
      meaning: 'to misunderstand',
      icon: '🤷‍♂️',
      sentence: 'Im Unterricht kann man die Anweisungen manchmal missverstehen.',
      english: 'Sometimes one can misunderstand the instructions in the class.',
      slide: 'Slide 19',
      explanation: 'Contains TWO inseparable prefixes (miss- + ver-)! Both stay welded forever.'
    },
    {
      id: 'verkaufen',
      prefix: 'ver',
      infinitive: 'verkaufen',
      meaning: 'to sell',
      icon: '🏷️',
      sentence: 'Er verkauft sein altes Haus.',
      english: 'He is selling his old house.',
      slide: 'Slide 20',
      explanation: 'Opposite of "kaufen" (to buy). "Er verkauft" stays together in Position 2.'
    },
    {
      id: 'verlieren',
      prefix: 'ver',
      infinitive: 'verlieren',
      meaning: 'to lose',
      icon: '♟️',
      sentence: 'Wenn ich Schach spiele, verliere ich immer.',
      english: 'I always lose when I play chess.',
      slide: 'Slide 21',
      explanation: '"verlieren" = to lose a game or object. "ver-" never separates.'
    },
    {
      id: 'verstehen',
      prefix: 'ver',
      infinitive: 'verstehen',
      meaning: 'to understand',
      icon: '🧠',
      sentence: 'Er versteht mich gut.',
      english: 'He understands me well.',
      slide: 'Slide 4',
      explanation: 'The classic hallmark of inseparable verbs: "ich verstehe, du verstehst, er versteht".'
    },
    {
      id: 'zerkleinern',
      prefix: 'zer',
      infinitive: 'zerkleinern',
      meaning: 'to chop / crush / shred',
      icon: '🥕',
      sentence: 'Man zerkleinert erstmal alle Gemüsesorten.',
      english: 'Firstly one shreds all sorts of vegetables.',
      slide: 'Slide 22',
      explanation: '"zer-" means into pieces. "zerkleinern" = to chop into small pieces.'
    },
    {
      id: 'zerstoeren',
      prefix: 'zer',
      infinitive: 'zerstören',
      meaning: 'to destroy',
      icon: '💥',
      sentence: 'Der Sturm zerstört das alte Dach.',
      english: 'The storm destroys the old roof.',
      slide: 'Slide 24 Table',
      explanation: '"zerstören" = to destroy / smash to pieces. "zer-" never separates.'
    }
  ];

  const FORGE_VERBS = {
    verstehen: {
      name: 'verstehen',
      meaning: 'to understand',
      prefix: 'ver-',
      table: [
        { pronoun: 'ich', form: 'verstehe', ending: '-e', sentence: 'Ich verstehe alles.', en: 'I understand everything.' },
        { pronoun: 'du', form: 'verstehst', ending: '-st', sentence: 'Verstehst du mich?', en: 'Do you understand me?' },
        { pronoun: 'er/sie/es', form: 'versteht', ending: '-t', sentence: 'Er versteht mich gut.', en: 'He understands me well.' },
        { pronoun: 'wir', form: 'verstehen', ending: '-en', sentence: 'Wir verstehen die Grammatik.', en: 'We understand the grammar.' },
        { pronoun: 'ihr', form: 'versteht', ending: '-t', sentence: 'Versteht ihr die Aufgabe?', en: 'Do you guys understand the task?' },
        { pronoun: 'Sie/sie', form: 'verstehen', ending: '-en', sentence: 'Sie verstehen sehr schnell.', en: 'You understand very quickly.' }
      ]
    },
    bekommen: {
      name: 'bekommen',
      meaning: 'to get / receive',
      prefix: 'be-',
      table: [
        { pronoun: 'ich', form: 'bekomme', ending: '-e', sentence: 'Ich bekomme ein Geschenk.', en: 'I get a gift.' },
        { pronoun: 'du', form: 'bekommst', ending: '-st', sentence: 'Was bekommst du zum Geburtstag?', en: 'What do you get for your birthday?' },
        { pronoun: 'er/sie/es', form: 'bekommt', ending: '-t', sentence: 'Er bekommt eine gute Note.', en: 'He gets a good grade.' },
        { pronoun: 'wir', form: 'bekommen', ending: '-en', sentence: 'Wir bekommen bald Besuch.', en: 'We are getting visitors soon.' },
        { pronoun: 'ihr', form: 'bekommt', ending: '-t', sentence: 'Bekommt ihr Taschengeld?', en: 'Do you guys get pocket money?' },
        { pronoun: 'Sie/sie', form: 'bekommen', ending: '-en', sentence: 'Sie bekommen eine Antwort.', en: 'They get an answer.' }
      ]
    },
    verkaufen: {
      name: 'verkaufen',
      meaning: 'to sell',
      prefix: 'ver-',
      table: [
        { pronoun: 'ich', form: 'verkaufe', ending: '-e', sentence: 'Ich verkaufe mein altes Auto.', en: 'I am selling my old car.' },
        { pronoun: 'du', form: 'verkaufst', ending: '-st', sentence: 'Verkaufst du dein Fahrrad?', en: 'Are you selling your bicycle?' },
        { pronoun: 'er/sie/es', form: 'verkauft', ending: '-t', sentence: 'Er verkauft sein Haus.', en: 'He is selling his house.' },
        { pronoun: 'wir', form: 'verkaufen', ending: '-en', sentence: 'Wir verkaufen frisches Obst.', en: 'We sell fresh fruit.' },
        { pronoun: 'ihr', form: 'verkauft', ending: '-t', sentence: 'Was verkauft ihr auf dem Markt?', en: 'What are you guys selling at the market?' },
        { pronoun: 'Sie/sie', form: 'verkaufen', ending: '-en', sentence: 'Sie verkaufen Bücher.', en: 'They sell books.' }
      ]
    },
    erzaehlen: {
      name: 'erzählen',
      meaning: 'to tell / narrate',
      prefix: 'er-',
      table: [
        { pronoun: 'ich', form: 'erzähle', ending: '-e', sentence: 'Ich erzähle dir ein Geheimnis.', en: 'I tell you a secret.' },
        { pronoun: 'du', form: 'erzählst', ending: '-st', sentence: 'Was erzählst du da?', en: 'What are you saying there?' },
        { pronoun: 'er/sie/es', form: 'erzählt', ending: '-t', sentence: 'Opa erzählt eine Geschichte.', en: 'Grandpa tells a story.' },
        { pronoun: 'wir', form: 'erzählen', ending: '-en', sentence: 'Wir erzählen vom Urlaub.', en: 'We tell about vacation.' },
        { pronoun: 'ihr', form: 'erzählt', ending: '-t', sentence: 'Erzählt ihr Witze?', en: 'Are you guys telling jokes?' },
        { pronoun: 'Sie/sie', form: 'erzählen', ending: '-en', sentence: 'Sie erzählen die Wahrheit.', en: 'They tell the truth.' }
      ]
    }
  };

  const filteredVerbs = selectedPrefix === 'all'
    ? INSEPARABLE_VERBS
    : INSEPARABLE_VERBS.filter(v => v.prefix === selectedPrefix);

  const activeForgeObj = FORGE_VERBS[selectedVerbKey] || FORGE_VERBS.verstehen;
  const activeForgeRow = activeForgeObj.table.find(r => r.pronoun === selectedPronoun) || activeForgeObj.table[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 text-9xl transform translate-x-8 -translate-y-8 select-none">
          🛡️
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <span>🛡️ Lesson 41 Interactive Studio</span>
            <span>•</span>
            <span>Untrennbare Verben</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            The 8 Superglue Bodyguards
          </h1>
          <p className="text-teal-100 text-sm md:text-base leading-relaxed">
            Unlike separable verbs that split apart across the sentence, <strong>untrennbare Verben</strong> are welded together forever! Master the famous 8 inseparable prefixes (<em>be-emp-ent-er, ge-miss-ver-zer</em>), explore all 17 core verbs, and test your sentence mastery.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/20">
          <button
            onClick={() => setActiveTab('bodyguards')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'bodyguards'
                ? 'bg-white text-teal-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🛡️</span>
            <span>The 8 Bodyguards</span>
          </button>
          <button
            onClick={() => setActiveTab('contrast')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'contrast'
                ? 'bg-white text-teal-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>⚖️</span>
            <span>Rocket vs. Superglue</span>
          </button>
          <button
            onClick={() => setActiveTab('forge')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'forge'
                ? 'bg-white text-teal-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🧩</span>
            <span>Conjugation Forge</span>
          </button>
        </div>
      </div>

      {/* TAB 1: THE 8 BODYGUARDS */}
      {activeTab === 'bodyguards' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Mnemonic Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 shadow-md flex items-start gap-4 border-2 border-emerald-500/30">
            <span className="text-4xl">🎵</span>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                The Golden Mnemonic Rhyme (Slide 24)
              </span>
              <h3 className="text-xl md:text-2xl font-black font-mono text-emerald-100">
                "be - emp - ent - er, ge - miss - ver - zer!"
              </h3>
              <p className="text-xs md:text-sm text-teal-200">
                Whenever you see a verb starting with one of these 8 prefixes, the prefix <strong>NEVER</strong> leaves the verb in statements, questions, or subordinate clauses!
              </p>
            </div>
          </div>

          {/* Prefix Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PREFIXES.map(p => (
              <button
                key={p.key}
                onClick={() => setSelectedPrefix(p.key)}
                className={`px-4 py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedPrefix === p.key
                    ? 'bg-teal-700 text-white shadow-md ring-2 ring-teal-300 scale-105'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
                <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full text-[10px]">
                  {p.count}
                </span>
              </button>
            ))}
          </div>

          {/* Verbs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVerbs.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-stone-200 p-5 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl p-2 bg-teal-50 rounded-2xl border border-teal-100">
                      {item.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 bg-teal-100 text-teal-900 rounded-full font-mono">
                          {item.prefix}-
                        </span>
                        <span className="text-xs text-stone-400 font-medium">{item.slide}</span>
                      </div>
                      <h3 className="text-lg font-black text-stone-900 font-sans mt-0.5">
                        {item.infinitive}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => speakGerman(item.sentence, isSlowMode)}
                    className="p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow transition-all"
                    title="Listen sentence"
                  >
                    🔊
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                    Meaning: {item.meaning}
                  </span>
                  <p className="text-base font-bold text-stone-900 font-sans">
                    "{item.sentence}"
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    "{item.english}"
                  </p>
                </div>

                <p className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100 leading-relaxed">
                  💡 {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ROCKET VS SUPERGLUE */}
      {activeTab === 'contrast' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Explanation */}
          <div className="bg-stone-900 rounded-3xl p-6 md:p-8 text-white space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Slide 3 Core Distinction: Separable vs. Non-Separable
              </span>
              <span className="text-xs text-stone-400">Rocket vs. Superglue</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-5 bg-gradient-to-br from-purple-950 to-stone-900 rounded-2xl border-2 border-purple-500/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🚀</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-purple-600 text-white rounded-full">
                    Trennbar (Lesson 36)
                  </span>
                </div>
                <h4 className="font-black text-lg text-purple-200">aufstehen (to get up)</h4>
                <p className="text-xs text-stone-300">
                  Separable prefixes (<em>ab, an, auf, aus, ein, mit, vor, zu</em>) blast off to the very end of the sentence like a booster rocket!
                </p>
                <div className="p-2.5 bg-stone-900 rounded-xl font-mono text-xs text-amber-300 border border-purple-800/40">
                  Ich <span className="underline font-bold text-white">stehe</span> um 6 Uhr <span className="underline font-bold text-purple-400">auf</span>.
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-teal-950 to-stone-900 rounded-2xl border-2 border-teal-500/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-teal-600 text-white rounded-full">
                    Untrennbar (Lesson 41)
                  </span>
                </div>
                <h4 className="font-black text-lg text-teal-200">verstehen (to understand)</h4>
                <p className="text-xs text-stone-300">
                  Inseparable prefixes (<em>be, emp, ent, er, ge, miss, ver, zer</em>) are permanently welded to the verb trunk with superglue!
                </p>
                <div className="p-2.5 bg-stone-900 rounded-xl font-mono text-xs text-emerald-300 border border-teal-800/40">
                  Er <span className="underline font-bold text-teal-400">versteht</span> mich gut.
                </div>
              </div>
            </div>
          </div>

          {/* Sentence Structure Mode Selector (Slides 4-6) */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Choose a Sentence Architecture to Test (Slides 4–6)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'statement', label: '1. Statement (Pos. 2)', slide: 'Slide 4' },
                  { id: 'w-frage', label: '2. W-Frage (Pos. 2)', slide: 'Slide 5' },
                  { id: 'ja-nein', label: '3. Ja/Nein (Pos. 1)', slide: 'Slide 5' },
                  { id: 'modal', label: '4. Modal Bracket (End)', slide: 'Slide 6' }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setContrastMode(m.id)}
                    className={`p-3 rounded-2xl border-2 text-center transition-all ${
                      contrastMode === m.id
                        ? 'border-teal-600 bg-teal-50 shadow ring-2 ring-teal-300 scale-102 font-bold text-teal-950'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <p className="text-xs font-bold">{m.label}</p>
                    <span className="text-[10px] text-stone-400">{m.slide}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Comparison Display */}
            {contrastMode === 'statement' && (
              <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                    Slide 4: Statement as Main Verb (Als Vollverb)
                  </span>
                  <button
                    onClick={() => speakGerman('Er versteht mich gut.', isSlowMode)}
                    className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold"
                  >
                    🔊 Listen
                  </button>
                </div>
                <p className="text-2xl font-black text-stone-900 font-mono">
                  Er <span className="bg-teal-200 px-2 py-0.5 rounded text-teal-950">versteht</span> mich gut.
                </p>
                <p className="text-xs text-teal-700 font-medium">
                  • <strong>Position 1:</strong> Er (Subject) | <strong>Position 2:</strong> versteht (Verb stays whole!) | <strong>End:</strong> mich gut.
                </p>
              </div>
            )}

            {contrastMode === 'w-frage' && (
              <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                    Slide 5: W-Frage (Question Word)
                  </span>
                  <button
                    onClick={() => speakGerman('Warum verstehst du mich nicht?', isSlowMode)}
                    className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold"
                  >
                    🔊 Listen
                  </button>
                </div>
                <p className="text-2xl font-black text-stone-900 font-mono">
                  Warum <span className="bg-teal-200 px-2 py-0.5 rounded text-teal-950">verstehst</span> du mich nicht?
                </p>
                <p className="text-xs text-teal-700 font-medium">
                  • <strong>Position 1:</strong> Warum (Question word) | <strong>Position 2:</strong> verstehst (Whole verb) | <strong>Position 3:</strong> du (Subject).
                </p>
              </div>
            )}

            {contrastMode === 'ja-nein' && (
              <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                    Slide 5: Ja-Nein-Frage (Yes/No Question)
                  </span>
                  <button
                    onClick={() => speakGerman('Verstehst du mich?', isSlowMode)}
                    className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold"
                  >
                    🔊 Listen
                  </button>
                </div>
                <p className="text-2xl font-black text-stone-900 font-mono">
                  <span className="bg-teal-200 px-2 py-0.5 rounded text-teal-950">Verstehst</span> du mich?
                </p>
                <p className="text-xs text-teal-700 font-medium">
                  • <strong>Position 1:</strong> Verstehst (Whole verb leaps to the front!) | <strong>Position 2:</strong> du (Subject).
                </p>
              </div>
            )}

            {contrastMode === 'modal' && (
              <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                    Slide 6: With Modal Verb (Mit Modalverb)
                  </span>
                  <button
                    onClick={() => speakGerman('Ich kann dich verstehen.', isSlowMode)}
                    className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold"
                  >
                    🔊 Listen
                  </button>
                </div>
                <p className="text-2xl font-black text-stone-900 font-mono">
                  Ich <span className="bg-amber-200 px-2 py-0.5 rounded text-amber-950">kann</span> dich{' '}
                  <span className="bg-teal-200 px-2 py-0.5 rounded text-teal-950">verstehen</span>.
                </p>
                <p className="text-xs text-teal-700 font-medium">
                  • <strong>Position 2:</strong> kann (Conjugated modal) | <strong>Satzende:</strong> verstehen (Inseparable infinitive stays 100% whole at the end).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CONJUGATION FORGE */}
      {activeTab === 'forge' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Verb Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(FORGE_VERBS).map(k => {
              const obj = FORGE_VERBS[k];
              const isSelected = selectedVerbKey === k;
              return (
                <button
                  key={k}
                  onClick={() => {
                    setSelectedVerbKey(k);
                    setSelectedPronoun('ich');
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/90 shadow ring-2 ring-teal-300 scale-105'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span className="text-xs font-bold text-teal-700 font-mono">{obj.prefix}</span>
                  <h4 className="font-black text-stone-900 text-base">{obj.name}</h4>
                  <p className="text-xs text-stone-500">{obj.meaning}</p>
                </button>
              );
            })}
          </div>

          {/* Conjugator Box */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Slide 7: Full Conjugation Table
              </span>
              <h2 className="text-2xl font-black text-stone-900">
                {activeForgeObj.name} ({activeForgeObj.meaning})
              </h2>
            </div>

            {/* Pronoun Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {activeForgeObj.table.map(row => {
                const isSelected = selectedPronoun === row.pronoun;
                return (
                  <button
                    key={row.pronoun}
                    onClick={() => setSelectedPronoun(row.pronoun)}
                    className={`p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 shadow ring-2 ring-teal-300 scale-105'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span className="text-xs font-bold text-stone-500 uppercase">{row.pronoun}</span>
                    <span className="text-lg font-black text-teal-950 font-mono">{row.form}</span>
                    <span className="text-[10px] text-teal-600 font-mono font-bold">{row.ending}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Example Output */}
            <div className="bg-stone-900 rounded-3xl p-6 md:p-8 text-white space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-teal-500 text-stone-900 font-black rounded-full text-xs">
                    {activeForgeRow.pronoun}
                  </span>
                  <span className="text-xl md:text-2xl font-mono font-bold text-teal-300">
                    ➔ {activeForgeRow.form}
                  </span>
                </div>
                <button
                  onClick={() => speakGerman(activeForgeRow.sentence, isSlowMode)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <span>🔊</span>
                  <span>Listen Example</span>
                </button>
              </div>

              <div className="p-4 bg-stone-800 rounded-2xl space-y-1">
                <span className="text-xs text-stone-400 uppercase tracking-wider block font-medium">Real-World Sentence:</span>
                <p className="text-xl font-bold text-white font-sans">
                  "{activeForgeRow.sentence}"
                </p>
                <p className="text-xs text-stone-300 italic">
                  "{activeForgeRow.en}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
