import React, { useState } from 'react';
import { 
  Volume2, Sparkles, Heart, Gift, Users, ArrowRight, Zap, RefreshCw, 
  HelpCircle, CheckCircle2, ChevronRight, Hash, Star, User, Coffee, 
  Layers, Smile, ShieldCheck, Flame, Play, Info, ThumbsUp, MessageSquare
} from 'lucide-react';
import { LESSON_35_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson35DativPronounStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('stories'); // 'stories' | 'matrix' | 'hitphrases'

  // TAB 1: 10 Character Story Cards State (Slides 2–23)
  const [selectedCharIdx, setSelectedCharIdx] = useState(0);

  const characterCards = [
    {
      id: 'maria',
      personName: 'Maria',
      role: '1st Person Singular',
      nom: 'ich (I)',
      dat: 'mir (to me)',
      sentence1: 'Hi. Ich bin Maria.',
      sentence1En: 'Hi. I am Maria.',
      sentence2: 'Gibst du mir ein Geschenk?',
      sentence2En: 'Will you give me a gift?',
      icon: '🙋‍♀️',
      themeColor: 'from-pink-500 to-rose-600',
      badgeBg: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
      dativeTarget: 'mir'
    },
    {
      id: 'anna',
      personName: 'Anna',
      role: '2nd Person Singular (informal)',
      nom: 'du (you)',
      dat: 'dir (to you)',
      sentence1: 'Anna, du bist nett.',
      sentence1En: 'Anna, you are nice.',
      sentence2: 'Ich gebe dir ein Geschenk.',
      sentence2En: 'I am giving you a gift.',
      icon: '👧',
      themeColor: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      dativeTarget: 'dir'
    },
    {
      id: 'schmidt',
      personName: 'Herr Schmidt',
      role: '2nd Person Singular (formal)',
      nom: 'Sie (You - formal)',
      dat: 'Ihnen (to You)',
      sentence1: 'Herr Schmidt, Sie sind nett.',
      sentence1En: 'Mr. Schmidt, you are nice.',
      sentence2: 'Ich gebe Ihnen ein Geschenk.',
      sentence2En: 'I am giving You a gift.',
      icon: '🎩',
      themeColor: 'from-blue-600 to-indigo-700',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      dativeTarget: 'Ihnen'
    },
    {
      id: 'michael',
      personName: 'Michael',
      role: '3rd Person Masculine',
      nom: 'er (he)',
      dat: 'ihm (to him)',
      sentence1: 'Das ist Michael. Er ist Architekt.',
      sentence1En: 'This is Michael. He is an architect.',
      sentence2: 'Ich gebe ihm ein Geschenk.',
      sentence2En: 'I am giving him a gift.',
      icon: '👨‍💼',
      themeColor: 'from-cyan-500 to-blue-600',
      badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
      dativeTarget: 'ihm'
    },
    {
      id: 'michaela',
      personName: 'Michaela',
      role: '3rd Person Feminine',
      nom: 'sie (she)',
      dat: 'ihr (to her)',
      sentence1: 'Das ist Michaela. Sie ist Studentin.',
      sentence1En: 'This is Michaela. She is a student.',
      sentence2: 'Ich gebe ihr ein Geschenk.',
      sentence2En: 'I am giving her a gift.',
      icon: '👩‍🎓',
      themeColor: 'from-fuchsia-500 to-pink-600',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
      dativeTarget: 'ihr'
    },
    {
      id: 'kind',
      personName: 'Das Kind (Neuter Twin!)',
      role: '3rd Person Neuter',
      nom: 'es (it)',
      dat: 'ihm (to it/him)',
      sentence1: 'Das ist ein Kind. Es ist süß.',
      sentence1En: 'This is a child. It is sweet.',
      sentence2: 'Ich gebe ihm ein Geschenk.',
      sentence2En: 'I am giving him/it a gift.',
      icon: '👶',
      themeColor: 'from-teal-500 to-emerald-600',
      badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
      dativeTarget: 'ihm'
    },
    {
      id: 'samantha-mike',
      personName: 'Samantha & Mike',
      role: '1st Person Plural',
      nom: 'wir (we)',
      dat: 'uns (to us)',
      sentence1: 'Wir sind Samantha und Mike.',
      sentence1En: 'We are Samantha and Mike.',
      sentence2: 'Gibst du uns ein Geschenk?',
      sentence2En: 'Will you give us a gift?',
      icon: '👫',
      themeColor: 'from-purple-500 to-indigo-600',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      dativeTarget: 'uns'
    },
    {
      id: 'marie-tobi',
      personName: 'Marie & Tobi',
      role: '2nd Person Plural (informal)',
      nom: 'ihr (you all)',
      dat: 'euch (to you all)',
      sentence1: 'Marie und Tobi, ihr seid nett.',
      sentence1En: 'Marie and Tobi, you are nice.',
      sentence2: 'Ich gebe euch ein Geschenk.',
      sentence2En: 'I am giving you all a gift.',
      icon: '🧒👧',
      themeColor: 'from-orange-500 to-amber-600',
      badgeBg: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
      dativeTarget: 'euch'
    },
    {
      id: 'mueller',
      personName: 'Herr & Frau Müller',
      role: '2nd Person Plural (formal)',
      nom: 'Sie (you all - formal)',
      dat: 'Ihnen (to you all)',
      sentence1: 'Herr und Frau Müller, Sie sind nett.',
      sentence1En: 'Mr. and Mrs. Müller, you are nice.',
      sentence2: 'Ich gebe Ihnen ein Geschenk.',
      sentence2En: 'I am giving you all a gift.',
      icon: '👵👴',
      themeColor: 'from-indigo-600 to-purple-700',
      badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
      dativeTarget: 'Ihnen'
    },
    {
      id: 'petra-juergen',
      personName: 'Petra & Jürgen',
      role: '3rd Person Plural',
      nom: 'sie (they)',
      dat: 'ihnen (to them)',
      sentence1: 'Das sind Petra und Jürgen. Sie sind nett.',
      sentence1En: 'This is Petra and Jürgen. They are nice.',
      sentence2: 'Ich gebe ihnen ein Geschenk.',
      sentence2En: 'I am giving them a gift.',
      icon: '👥',
      themeColor: 'from-emerald-600 to-teal-700',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      dativeTarget: 'ihnen'
    }
  ];

  const currentChar = characterCards[selectedCharIdx];

  // TAB 2: Master Transformation Matrix State (Slide 26)
  const [selectedMatrixRow, setSelectedMatrixRow] = useState('ich');

  const fullComparisonMatrix = [
    { person: '1st Sing. (I)', nom: 'ich', akk: 'mich', dat: 'mir', isTwin: false, note: 'ich ➔ mich (Akk) ➔ mir (Dat)', example: 'Kannst du mir bitte helfen?' },
    { person: '2nd Sing. inf. (you)', nom: 'du', akk: 'dich', dat: 'dir', isTwin: false, note: 'du ➔ dich (Akk) ➔ dir (Dat)', example: 'Ich gebe dir ein Geschenk.' },
    { person: '2nd Sing. form. (You)', nom: 'Sie', akk: 'Sie', dat: 'Ihnen', isTwin: false, note: 'Sie ➔ Sie (Akk) ➔ Ihnen (Dat)', example: 'Wie geht es Ihnen?' },
    { person: '3rd Sing. masc. (he)', nom: 'er', akk: 'ihn', dat: 'ihm', isTwin: false, note: 'er ➔ ihn (Akk) ➔ ihm (Dat)', example: 'Wir gratulieren ihm zum Geburtstag.' },
    { person: '3rd Sing. fem. (she)', nom: 'sie', akk: 'sie', dat: 'ihr', isTwin: false, note: 'sie ➔ sie (Akk) ➔ ihr (Dat)', example: 'Die Tasche gehört ihr.' },
    { person: '3rd Sing. neut. (it)', nom: 'es', akk: 'es', dat: 'ihm', isTwin: false, note: 'es ➔ es (Akk) ➔ ihm (Dat twin with er!)', example: 'Das Kind weint, ich helfe ihm.' },
    { person: '1st Plural (we)', nom: 'wir', akk: 'uns', dat: 'uns', isTwin: true, note: 'wir ➔ uns (Akk) ➔ uns (Dat identical!)', example: 'Das Auto gefällt uns.' },
    { person: '2nd Plural inf. (you all)', nom: 'ihr', akk: 'euch', dat: 'euch', isTwin: true, note: 'ihr ➔ euch (Akk) ➔ euch (Dat identical!)', example: 'Ich danke euch für das Geschenk.' },
    { person: '2nd Plural form. (You all)', nom: 'Sie', akk: 'Sie', dat: 'Ihnen', isTwin: false, note: 'Sie ➔ Sie (Akk) ➔ Ihnen (Dat)', example: 'Ich antworte Ihnen sofort.' },
    { person: '3rd Plural (they)', nom: 'sie', akk: 'sie', dat: 'ihnen', isTwin: false, note: 'sie ➔ sie (Akk) ➔ ihnen (Dat)', example: 'Ich gebe ihnen ein Geschenk.' }
  ];

  const activeMatrixObj = fullComparisonMatrix.find(r => r.nom === selectedMatrixRow) || fullComparisonMatrix[0];

  // TAB 3: 10 Everyday Hit Phrases (Slide 25)
  const [selectedPhraseIdx, setSelectedPhraseIdx] = useState(0);

  const hitPhrases = [
    {
      num: 1,
      german: 'Das Essen schmeckt mir sehr gut.',
      english: 'The food tastes very good to me.',
      pronoun: 'mir (to me)',
      verb: 'schmecken (to taste to)',
      icon: '🍲',
      reason: 'In German, food does not just "taste good"; it "tastes good TO someone" (schmeckt mir)!'
    },
    {
      num: 2,
      german: 'Ich helfe dir gerne.',
      english: 'I will gladly help you.',
      pronoun: 'dir (to you)',
      verb: 'helfen (to help)',
      icon: '🤝',
      reason: 'The verb "helfen" ALWAYS commands Dativ! You give your help TO someone (helfe dir).'
    },
    {
      num: 3,
      german: 'Wir gratulieren ihm zum Geburtstag.',
      english: 'We congratulate him on his birthday.',
      pronoun: 'ihm (to him)',
      verb: 'gratulieren (to congratulate)',
      icon: '🎂',
      reason: '"gratulieren" delivers congratulations TO a person in Dativ (gratulieren ihm).'
    },
    {
      num: 4,
      german: 'Die Tasche gehört ihr.',
      english: 'The bag belongs to her.',
      pronoun: 'ihr (to her)',
      verb: 'gehören (to belong to)',
      icon: '👜',
      reason: 'Belonging is a direct Dative relationship: the bag belongs TO her (gehört ihr).'
    },
    {
      num: 5,
      german: 'Das Auto gefällt uns.',
      english: 'We like the car. (The car pleases us.)',
      pronoun: 'uns (to us)',
      verb: 'gefallen (to please / appeal to)',
      icon: '🚗',
      reason: 'German flips the perspective: The car is pleasing TO us (gefällt uns)!'
    },
    {
      num: 6,
      german: 'Ich danke euch für das Geschenk.',
      english: 'I thank you all for the gift.',
      pronoun: 'euch (to you all)',
      verb: 'danken (to thank)',
      icon: '🎁',
      reason: '"danken" sends thanks TO someone in Dative: "Ich danke euch".'
    },
    {
      num: 7,
      german: 'Wie geht es Ihnen?',
      english: 'How are you doing? (formal)',
      pronoun: 'Ihnen (to You)',
      verb: 'gehen (how it goes for)',
      icon: '🎩',
      reason: 'Literally: "How is it going with You?" Always requires Dative (Ihnen / dir).'
    },
    {
      num: 8,
      german: 'Ich antworte Ihnen sofort, Herr Müller.',
      english: 'I will answer you immediately, Mr. Müller.',
      pronoun: 'Ihnen (to You)',
      verb: 'antworten (to answer / reply to)',
      icon: '💬',
      reason: '"antworten" sends a reply TO a person in Dativ: "Ich antworte Ihnen".'
    },
    {
      num: 9,
      german: 'Ich kaufe dir einen Kaffee.',
      english: 'I will buy you a coffee.',
      pronoun: 'dir (to you)',
      verb: 'kaufen (to buy for)',
      icon: '☕',
      reason: 'The buyer is Nom (Ich), the receiver of coffee is Dativ (dir), the coffee is Akk (einen Kaffee).'
    },
    {
      num: 10,
      german: 'Kannst du mir bitte helfen?',
      english: 'Can you please help me?',
      pronoun: 'mir (to me)',
      verb: 'helfen (to help)',
      icon: '🆘',
      reason: 'Asking for help: "helfen" requires Dativ, so "help me" is ALWAYS "helfen mir" (never mich)!'
    }
  ];

  const currentHitPhrase = hitPhrases[selectedPhraseIdx];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-700 text-white p-6 md:p-8 rounded-3xl shadow-xl border-4 border-teal-300/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
              <Gift className="w-4 h-4 text-teal-200" />
              Lesson 35 Interactive Studio • Personalpronomen im Dativ
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">
              Personal Pronouns in the Dative Case 🎁
            </h1>
            <p className="text-teal-100 text-xs md:text-sm max-w-2xl leading-relaxed">
              Master the German receiver pronouns: <strong>mir</strong> (to me), <strong>dir</strong> (to you), 
              <strong>ihm</strong> (to him/it), <strong>ihr</strong> (to her), <strong>uns</strong> (to us), 
              <strong>euch</strong> (to you all), <strong>Ihnen</strong> (formal You), and <strong>ihnen</strong> (to them)!
            </p>
          </div>

          <button
            onClick={() => {
              playChime('click');
              speakGerman("Personalpronomen im Dativ: mir, dir, ihm, ihr, ihm, uns, euch, Ihnen, ihnen!", isSlowMode);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-white text-teal-800 rounded-2xl font-black text-sm shadow-lg hover:bg-teal-50 active:scale-95 transition shrink-0"
          >
            <Volume2 className="w-5 h-5 text-teal-600" />
            Hear All Dativ Pronouns
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={() => { playChime('click'); setActiveTab('stories'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'stories'
                ? 'bg-white text-teal-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Users className="w-4 h-4 text-teal-600" />
            👥 10 Character Story Cards
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('matrix'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'matrix'
                ? 'bg-white text-teal-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            📊 Master Transformation Matrix (Slide 26)
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('hitphrases'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'hitphrases'
                ? 'bg-white text-teal-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            🌟 10 Everyday Hit Phrases Hub (Slide 25)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 10 Character Story Cards (Slides 2–23) */}
      {/* ========================================================================= */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          {/* Character Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 md:gap-3">
            {characterCards.map((char, idx) => {
              const isSelected = idx === selectedCharIdx;
              return (
                <button
                  key={char.id}
                  onClick={() => {
                    playChime('click');
                    setSelectedCharIdx(idx);
                    speakGerman(`${char.sentence1} ${char.sentence2}`, isSlowMode);
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-between gap-1 ${
                    isSelected
                      ? 'bg-gradient-to-br from-teal-600 to-emerald-700 text-white border-teal-300 shadow-lg scale-105 ring-2 ring-teal-300'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border-stone-200 dark:border-stone-700 hover:border-teal-300 hover:bg-teal-50/40'
                  }`}
                >
                  <span className="text-2xl md:text-3xl">{char.icon}</span>
                  <div className="font-black text-xs md:text-sm truncate w-full">{char.personName}</div>
                  <div className={`text-[10px] font-bold ${isSelected ? 'text-teal-200' : 'text-stone-400'}`}>
                    {char.nom} ➔ <span className="underline font-black">{char.dat}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Character Showcase Card */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-teal-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="text-4xl p-3 bg-teal-50 dark:bg-stone-700 rounded-2xl border border-teal-100 dark:border-stone-600">
                  {currentChar.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300">
                      {currentChar.role}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                    {currentChar.personName} • {currentChar.nom} ➔ <span className="text-teal-600 dark:text-teal-400">{currentChar.dat}</span>
                  </h2>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime('pop');
                  speakGerman(`${currentChar.sentence1} ${currentChar.sentence2}`, isSlowMode);
                }}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl font-black text-sm shadow-md hover:from-teal-700 hover:to-emerald-700 active:scale-95 transition"
              >
                <Volume2 className="w-5 h-5" />
                Listen to Story
              </button>
            </div>

            {/* Slide Sentences Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Introduction Sentence */}
              <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-stone-400">
                    Step 1: Introduction (Nominativ)
                  </span>
                  <button
                    onClick={() => speakGerman(currentChar.sentence1, isSlowMode)}
                    className="p-1 hover:bg-stone-200 rounded-lg transition"
                  >
                    <Volume2 className="w-4 h-4 text-teal-600" />
                  </button>
                </div>
                <div className="text-lg font-black text-stone-800 dark:text-stone-100">
                  {currentChar.sentence1}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                  "{currentChar.sentence1En}"
                </div>
              </div>

              {/* Dative Gift Action Sentence */}
              <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 rounded-2xl border-2 border-teal-300 dark:border-teal-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300">
                    Step 2: Dative Gift Action
                  </span>
                  <button
                    onClick={() => speakGerman(currentChar.sentence2, isSlowMode)}
                    className="p-1 hover:bg-teal-200 rounded-lg transition"
                  >
                    <Volume2 className="w-4 h-4 text-teal-600" />
                  </button>
                </div>
                <div className="text-lg font-black text-teal-900 dark:text-teal-200">
                  {currentChar.sentence2}
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 italic">
                  "{currentChar.sentence2En}"
                </div>
              </div>
            </div>

            {/* Sentence Anatomy Breakdown (Slide 3 Replica) */}
            <div className="p-5 bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl space-y-3 border border-stone-700">
              <div className="text-xs font-black uppercase tracking-wider text-teal-400">
                Slide 3 • Sentence Architecture Inspector
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <div className="text-[10px] text-blue-300 font-bold uppercase">1. Subjekt (Nom)</div>
                  <div className="text-base font-black text-white">Ich / Du</div>
                </div>
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <div className="text-[10px] text-amber-300 font-bold uppercase">2. Verb (Action)</div>
                  <div className="text-base font-black text-white">gebe / gibst</div>
                </div>
                <div className="p-2.5 bg-teal-500/30 rounded-xl border border-teal-400">
                  <div className="text-[10px] text-teal-300 font-bold uppercase">3. Dativ-Objekt</div>
                  <div className="text-lg font-black text-yellow-300">{currentChar.dativeTarget}</div>
                </div>
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase">4. Akkusativ-Objekt</div>
                  <div className="text-base font-black text-white">ein Geschenk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: Master Transformation Matrix (Slide 26) */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-teal-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded-full text-xs font-black uppercase">
                <Layers className="w-3.5 h-3.5" />
                Slide 26 • At a Glance Master Comparison
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
                Nominativ ➔ Akkusativ ➔ Dativ Transformation
              </h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
                Compare how German pronouns dress across all three cases! Tap any row to hear audio.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border-2 border-stone-200 dark:border-stone-700">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-900 text-white font-black">
                    <th className="p-3 md:p-4">Person</th>
                    <th className="p-3 md:p-4 text-blue-300">Nominativ (Subject)</th>
                    <th className="p-3 md:p-4 text-pink-300">Akkusativ (Direct)</th>
                    <th className="p-3 md:p-4 text-teal-300">Dativ (Receiver)</th>
                    <th className="p-3 md:p-4 text-amber-300">Transformation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                  {fullComparisonMatrix.map((row, idx) => {
                    const isSelected = activeMatrixObj.nom === row.nom;
                    return (
                      <tr
                        key={idx}
                        onClick={() => {
                          playChime('click');
                          setSelectedMatrixRow(row.nom);
                          speakGerman(`${row.nom}, ${row.akk}, ${row.dat}. ${row.example}`, isSlowMode);
                        }}
                        className={`transition cursor-pointer ${
                          isSelected 
                            ? 'bg-teal-100 dark:bg-teal-950/60 font-bold' 
                            : 'hover:bg-stone-50 dark:hover:bg-stone-700/50'
                        }`}
                      >
                        <td className="p-3 md:p-4 font-black text-stone-900 dark:text-white">
                          {row.person}
                        </td>
                        <td className="p-3 md:p-4 text-blue-700 dark:text-blue-300 font-bold">
                          {row.nom}
                        </td>
                        <td className="p-3 md:p-4 text-pink-700 dark:text-pink-300 font-bold">
                          {row.akk}
                        </td>
                        <td className="p-3 md:p-4 text-teal-700 dark:text-teal-300 font-black text-base">
                          {row.dat}
                        </td>
                        <td className="p-3 md:p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            row.isTwin
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                          }`}>
                            {row.isTwin ? 'Twin: Akk = Dat' : 'Changes to ' + row.dat}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Active Row Deep Dive Banner */}
            <div className="p-5 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 rounded-2xl border-2 border-teal-300 dark:border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  {activeMatrixObj.person} • {activeMatrixObj.note}
                </div>
                <div className="text-base md:text-lg font-black text-stone-900 dark:text-white">
                  "{activeMatrixObj.example}"
                </div>
              </div>
              <button
                onClick={() => {
                  playChime('pop');
                  speakGerman(activeMatrixObj.example, isSlowMode);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black text-xs shadow-md shrink-0 transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                Hear Sentence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 10 Everyday Hit Phrases Hub (Slide 25) */}
      {/* ========================================================================= */}
      {activeTab === 'hitphrases' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-teal-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Slide 25 • Alltagssätze (Everyday Dative Hit Phrases)
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
                The 10 Must-Know Dative Sentences
              </h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
                These verbs naturally connect with Dative pronouns in daily German conversations!
              </p>
            </div>

            {/* Hit Phrases 1-10 List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hitPhrases.map((phrase, idx) => {
                const isSelected = idx === selectedPhraseIdx;
                return (
                  <div
                    key={phrase.num}
                    onClick={() => {
                      playChime('click');
                      setSelectedPhraseIdx(idx);
                      speakGerman(phrase.german, isSlowMode);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-400 ring-2 ring-teal-300 shadow-md scale-[1.02]'
                        : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-700 hover:border-teal-300 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{phrase.icon}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-teal-700 dark:text-teal-400">
                          #{phrase.num} • {phrase.verb}
                        </span>
                        <Volume2 className="w-4 h-4 text-teal-600 shrink-0" />
                      </div>
                      <div className="font-black text-sm md:text-base text-stone-900 dark:text-white">
                        {phrase.german}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                        "{phrase.english}"
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Phrase Detailed Insight */}
            <div className="p-5 bg-gradient-to-r from-teal-900 via-emerald-900 to-stone-900 text-white rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-teal-300">
                  Detailed Grammar Insight • Phrase #{currentHitPhrase.num}
                </span>
                <span className="text-xs text-yellow-300 font-bold">
                  Dativ Pronoun: {currentHitPhrase.pronoun}
                </span>
              </div>
              <div className="text-lg md:text-xl font-black text-white">
                {currentHitPhrase.german}
              </div>
              <div className="text-xs md:text-sm text-stone-300">
                <strong>Why Dative?</strong> {currentHitPhrase.reason}
              </div>
              <button
                onClick={() => {
                  playChime('pop');
                  speakGerman(currentHitPhrase.german, isSlowMode);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-black text-xs shadow-md transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                Listen Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
