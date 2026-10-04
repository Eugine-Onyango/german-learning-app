import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Scale, 
  Crown, 
  Plane, 
  Car, 
  Moon, 
  Sun, 
  HeartCrack, 
  AlertCircle, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Layers, 
  Footprints, 
  Coffee, 
  CloudRain, 
  ShoppingBag, 
  Compass,
  HelpCircle,
  Clock
} from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson44HabenSeinStudio({ isSlowMode }) {
  const [activeSubTab, setActiveSubTab] = useState('decisionTree');
  const [filterCategory, setFilterCategory] = useState('all');

  // Drill State for Tab 3
  const [drillAnswers, setDrillAnswers] = useState({});
  const [drillScore, setDrillScore] = useState(null);

  // Verbs Master Data
  const ALL_HABEN_SEIN_VERBS = [
    // HABEN VERBS (Slide 8-12)
    {
      infinitive: 'kaufen',
      aux: 'hat',
      partizip: 'gekauft',
      group: 'haben',
      groupName: 'haben (Action & Objects)',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300',
      example: 'Er hat ein neues Auto gekauft.',
      trans: 'He bought a new car.',
      icon: '🚘',
      rule: 'All verbs involving purchasing or possessing objects take haben.'
    },
    {
      infinitive: 'trinken',
      aux: 'hat',
      partizip: 'getrunken',
      group: 'haben',
      groupName: 'haben (Food & Drink)',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300',
      example: 'Sabine hat heute viel Kaffee getrunken.',
      trans: 'Sabine drank a lot of coffee today.',
      icon: '☕',
      rule: 'Stationary bodily consumption verbs take haben.'
    },
    {
      infinitive: 'regnen',
      aux: 'hat',
      partizip: 'geregnet',
      group: 'haben',
      groupName: 'haben (Weather)',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300',
      example: 'Es hat wieder geregnet.',
      trans: 'It rained again.',
      icon: '🌧️',
      rule: 'Impersonal weather events (regnen, schneien) take haben with "Es".'
    },
    {
      infinitive: 'helfen',
      aux: 'hat',
      partizip: 'geholfen',
      group: 'haben',
      groupName: 'haben (Action)',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300',
      example: 'Maria hat mir viel geholfen.',
      trans: 'Maria helped me a lot.',
      icon: '🤝',
      rule: 'Helping someone (Dative verb) takes haben.'
    },
    {
      infinitive: 'schreiben',
      aux: 'hat',
      partizip: 'geschrieben',
      group: 'haben',
      groupName: 'haben (Activity)',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300',
      example: 'Ich habe einen langen Brief geschrieben.',
      trans: 'I wrote a long letter.',
      icon: '✍️',
      rule: 'Creative/productive actions take haben.'
    },

    // SEIN CATEGORY 1: ORTSVERÄNDERUNG (Movement A -> B, Slide 14-17)
    {
      infinitive: 'fliegen',
      aux: 'ist',
      partizip: 'geflogen',
      group: 'movement',
      groupName: 'sein (Movement A ➔ B)',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300',
      example: 'Meine Eltern sind gestern nach London geflogen.',
      trans: 'My parents flew to London yesterday.',
      icon: '✈️',
      rule: 'Travel by air from Point A to Point B.'
    },
    {
      infinitive: 'fahren',
      aux: 'ist',
      partizip: 'gefahren',
      group: 'movement',
      groupName: 'sein (Movement A ➔ B)',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300',
      example: 'Wir sind nach Berlin gefahren.',
      trans: 'We travelled to Berlin.',
      icon: '🚗',
      rule: 'Travel by vehicle to a destination.'
    },
    {
      infinitive: 'gehen',
      aux: 'ist',
      partizip: 'gegangen',
      group: 'movement',
      groupName: 'sein (Movement A ➔ B)',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300',
      example: 'Er ist mit Miriam ins Kino gegangen.',
      trans: 'He went to the cinema with Miriam.',
      icon: '🚶‍♂️',
      rule: 'Walking / traveling on foot.'
    },
    {
      infinitive: 'kommen',
      aux: 'ist',
      partizip: 'gekommen',
      group: 'movement',
      groupName: 'sein (Movement A ➔ B)',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300',
      example: 'Wann bist du nach Hause gekommen?',
      trans: 'When did you come home?',
      icon: '🏡',
      rule: 'Arriving / coming to a place.'
    },
    {
      infinitive: 'schwimmen',
      aux: 'ist',
      partizip: 'geschwommen',
      group: 'movement',
      groupName: 'sein (Movement A ➔ B)',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300',
      example: 'Wir sind im See geschwommen.',
      trans: 'We swam in the lake.',
      icon: '🏊‍♂️',
      rule: 'Swimming distance across water.'
    },
    {
      infinitive: 'wandern',
      aux: 'ist',
      partizip: 'gewandert',
      group: 'movement',
      groupName: 'sein (Movement A ➔ B)',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300',
      example: 'Wir sind in den Bergen gewandert.',
      trans: 'We hiked in the mountains.',
      icon: '🥾',
      rule: 'Hiking / walking through nature.'
    },
    {
      infinitive: 'laufen',
      aux: 'ist',
      partizip: 'gelaufen',
      group: 'movement',
      groupName: 'sein (Movement A ➔ B)',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300',
      example: 'Er ist schnell zum Bus gelaufen.',
      trans: 'He ran quickly to the bus.',
      icon: '🏃‍♂️',
      rule: 'Running / jogging from place to place.'
    },

    // SEIN CATEGORY 2: ZUSTANDSVERÄNDERUNG (Change of State, Slide 18-21)
    {
      infinitive: 'einschlafen',
      aux: 'ist',
      partizip: 'eingeschlafen',
      group: 'state',
      groupName: 'sein (Change of State)',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border-purple-300',
      example: 'Maria ist im Unterricht eingeschlafen.',
      trans: 'Maria fell asleep in class.',
      icon: '😴',
      rule: 'Transition: Awake ➔ Asleep (einschlafen).'
    },
    {
      infinitive: 'aufwachen',
      aux: 'ist',
      partizip: 'aufgewacht',
      group: 'state',
      groupName: 'sein (Change of State)',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border-purple-300',
      example: 'Ich bin um 6 Uhr aufgewacht.',
      trans: 'I woke up at 6 AM.',
      icon: '⏰',
      rule: 'Transition: Asleep ➔ Awake (aufwachen).'
    },
    {
      infinitive: 'aufstehen',
      aux: 'ist',
      partizip: 'aufgestanden',
      group: 'state',
      groupName: 'sein (Change of State)',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border-purple-300',
      example: 'Heute bin ich spät aufgestanden.',
      trans: 'Today I got up late.',
      icon: '🌅',
      rule: 'Transition: Lying in bed ➔ On your feet.'
    },
    {
      infinitive: 'sterben',
      aux: 'ist',
      partizip: 'gestorben',
      group: 'state',
      groupName: 'sein (Change of State)',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border-purple-300',
      example: 'Letzte Woche ist sein Vater gestorben.',
      trans: 'His father died last week.',
      icon: '🕊️',
      rule: 'Transition: Alive ➔ Dead (permanent state change).'
    },
    {
      infinitive: 'wachsen',
      aux: 'ist',
      partizip: 'gewachsen',
      group: 'state',
      groupName: 'sein (Change of State)',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border-purple-300',
      example: 'Das Kind ist sehr schnell gewachsen.',
      trans: 'The child grew very quickly.',
      icon: '🌱',
      rule: 'Transition: Small ➔ Tall / physical growth.'
    },

    // SEIN CATEGORY 3: SPECIAL EXCEPTIONS (Slide 22-26)
    {
      infinitive: 'bleiben',
      aux: 'ist',
      partizip: 'geblieben',
      group: 'exception',
      groupName: 'sein (Special Exception)',
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300',
      example: 'Ich bin letzte Woche in Spanien geblieben.',
      trans: 'Last week I stayed in Spain.',
      icon: '🏨',
      rule: 'The Famous Rebel: Remaining stationary STILL takes sein!'
    },
    {
      infinitive: 'sein',
      aux: 'ist',
      partizip: 'gewesen',
      group: 'exception',
      groupName: 'sein (Special Exception)',
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300',
      example: 'Wo bist du gestern gewesen?',
      trans: 'Where were you yesterday?',
      icon: '📍',
      rule: 'The verb "sein" uses itself as its auxiliary verb.'
    },
    {
      infinitive: 'passieren',
      aux: 'ist',
      partizip: 'passiert',
      group: 'exception',
      groupName: 'sein (Special Exception)',
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300',
      example: 'Was ist gestern passiert?',
      trans: 'What happened yesterday?',
      icon: '❓',
      rule: 'Events occurring / happening take sein.'
    },
    {
      infinitive: 'werden',
      aux: 'ist',
      partizip: 'geworden',
      group: 'exception',
      groupName: 'sein (Special Exception)',
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300',
      example: 'Oma ist heute 70 Jahre alt geworden.',
      trans: 'Grandma turned 70 years old today.',
      icon: '🎂',
      rule: 'Becoming / turning an age takes sein.'
    }
  ];

  // Side-by-Side Conjugation Data (Slide 5-7)
  const CONJUGATION_ROWS = [
    { pronoun: 'ich', habenForm: 'habe gegessen', seinForm: 'bin gefahren', transH: 'I have eaten', transS: 'I have driven' },
    { pronoun: 'du', habenForm: 'hast gegessen', seinForm: 'bist gefahren', transH: 'you have eaten', transS: 'you have driven' },
    { pronoun: 'er / sie / es', habenForm: 'hat gegessen', seinForm: 'ist gefahren', transH: 'he/she/it has eaten', transS: 'he/she/it has driven' },
    { pronoun: 'wir', habenForm: 'haben gegessen', seinForm: 'sind gefahren', transH: 'we have eaten', transS: 'we have driven' },
    { pronoun: 'ihr', habenForm: 'habt gegessen', seinForm: 'seid gefahren', transH: 'you all have eaten', transS: 'you all have driven' },
    { pronoun: 'Sie / sie', habenForm: 'haben gegessen', seinForm: 'sind gefahren', transH: 'They / Formal You have eaten', transS: 'They / Formal You have driven' }
  ];

  // Practice Drills (Slides 29-32)
  const DRILL_QUESTIONS = [
    {
      id: 1,
      before: 'Maria',
      after: 'mir viel geholfen.',
      translation: 'Maria helped me a lot.',
      correct: 'hat',
      options: ['hat', 'ist', 'habe', 'bin'],
      rule: 'helfen (to help) takes haben: Maria (er/sie/es) ➔ hat.'
    },
    {
      id: 2,
      before: 'Wo',
      after: 'du gestern geblieben?',
      translation: 'Where did you stay yesterday?',
      correct: 'bist',
      options: ['bist', 'hast', 'ist', 'hat'],
      rule: 'bleiben (rebel verb) takes sein: du ➔ bist geblieben.'
    },
    {
      id: 3,
      before: 'Heute',
      after: 'ich spät aufgestanden.',
      translation: 'Today I got up late.',
      correct: 'bin',
      options: ['bin', 'habe', 'ist', 'hat'],
      rule: 'aufstehen (change of state) takes sein: ich ➔ bin aufgestanden.'
    },
    {
      id: 4,
      before: 'Meine Eltern',
      after: 'nach London geflogen.',
      translation: 'My parents flew to London.',
      correct: 'sind',
      options: ['sind', 'haben', 'seid', 'habt'],
      rule: 'fliegen (movement A to B) takes sein: Eltern (Plural) ➔ sind geflogen.'
    },
    {
      id: 5,
      before: 'Sabine',
      after: 'heute viel Kaffee getrunken.',
      translation: 'Sabine drank a lot of coffee today.',
      correct: 'hat',
      options: ['hat', 'ist', 'haben', 'sind'],
      rule: 'trinken (drink) takes haben: Sabine ➔ hat getrunken.'
    },
    {
      id: 6,
      before: 'Was',
      after: 'gestern passiert?',
      translation: 'What happened yesterday?',
      correct: 'ist',
      options: ['ist', 'hat', 'sind', 'haben'],
      rule: 'passieren (special verb) takes sein: Was ➔ ist passiert.'
    }
  ];

  const handleDrillChoice = (qId, choice) => {
    playChime('click');
    setDrillAnswers(prev => ({ ...prev, [qId]: choice }));
  };

  const handleCheckDrills = () => {
    let score = 0;
    DRILL_QUESTIONS.forEach(q => {
      if (drillAnswers[q.id] === q.correct) score++;
    });
    setDrillScore(score);
    if (score === DRILL_QUESTIONS.length) {
      playChime('success');
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } else {
      playChime('wrong');
    }
  };

  const filteredVerbs = ALL_HABEN_SEIN_VERBS.filter(v => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'haben') return v.group === 'haben';
    if (filterCategory === 'movement') return v.group === 'movement';
    if (filterCategory === 'state') return v.group === 'state';
    if (filterCategory === 'exception') return v.group === 'exception';
    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-amber-300/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <Crown className="w-4 h-4 text-amber-200" />
            Lesson 44 Interactive Studio • haben vs. sein im Perfekt
          </div>
          <button
            onClick={() => speakGerman("haben oder sein im Perfekt: Maria hat mir geholfen, aber wir sind nach London geflogen! Wo bist du geblieben? Und was ist passiert?", isSlowMode)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-amber-900 font-bold rounded-xl text-xs shadow-md hover:bg-amber-50 transition-transform active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            Play Audio Intro
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            The "haben" vs. "sein" Decision Throne 👑
          </h2>
          <p className="text-amber-100 text-sm sm:text-base leading-relaxed max-w-3xl">
            Never guess which helping verb to use again! Master the <strong>Movement Rule (A ➔ B)</strong>, the <strong>State Change Rule (Awake ➔ Asleep)</strong>, the <strong>4 Rebel Verbs</strong> (<em>bleiben, sein, passieren, werden</em>), and the <strong>Chameleon "fahren" rule</strong>!
          </p>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-400/40">
          <button
            onClick={() => { playChime('click'); setActiveSubTab('decisionTree'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'decisionTree'
                ? 'bg-white text-amber-900 shadow-lg scale-105'
                : 'bg-amber-800/60 text-amber-100 hover:bg-amber-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            1. The Selection Matrix ({ALL_HABEN_SEIN_VERBS.length} Verbs)
          </button>

          <button
            onClick={() => { playChime('click'); setActiveSubTab('conjugation'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'conjugation'
                ? 'bg-white text-amber-900 shadow-lg scale-105'
                : 'bg-amber-800/60 text-amber-100 hover:bg-amber-700'
            }`}
          >
            <Crown className="w-4 h-4" />
            2. Side-by-Side Conjugation Matrix 👑
          </button>

          <button
            onClick={() => { playChime('click'); setActiveSubTab('drills'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'drills'
                ? 'bg-white text-amber-900 shadow-lg scale-105'
                : 'bg-amber-800/60 text-amber-100 hover:bg-amber-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            3. Chalkboard Drills (Slides 29–32) 🎯
          </button>
        </div>
      </div>

      {/* TAB 1: THE SELECTION MATRIX */}
      {activeSubTab === 'decisionTree' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Chameleon Fahren Special Banner (Slide 28) */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/40 dark:to-emerald-950/40 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">
                The Famous Chameleon "fahren" Rule (Slide 28):
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-blue-200 dark:border-blue-900/50 space-y-2">
                <div className="font-black text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> 1. Destination / Movement ➔ sein
                </div>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  "Ich <span className="text-blue-600 underline">bin</span> nach Köln gefahren."
                </p>
                <p className="text-stone-500 italic">I drove to Cologne (Movement from A to B = sein!).</p>
                <button
                  onClick={() => speakGerman("Ich bin nach Köln gefahren.", isSlowMode)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 hover:underline pt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen
                </button>
              </div>

              <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                <div className="font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4" /> 2. Direct Object (Vehicle) ➔ haben
                </div>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  "Ich <span className="text-emerald-600 underline">habe</span> mein neues Auto gefahren."
                </p>
                <p className="text-stone-500 italic">I drove my new car (Direct object vehicle = haben!).</p>
                <button
                  onClick={() => speakGerman("Ich habe mein neues Auto gefahren.", isSlowMode)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:underline pt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white dark:bg-stone-800 p-4 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-md flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-stone-500">Filter Helping Verb Categories:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Verbs (21)' },
                { id: 'haben', label: '🟢 haben: General (5)' },
                { id: 'movement', label: '🔵 sein: Movement A ➔ B (7)' },
                { id: 'state', label: '🟣 sein: State Change (5)' },
                { id: 'exception', label: '🟡 sein: Special Rebels (4)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { playChime('click'); setFilterCategory(cat.id); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verbs Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVerbs.map((v, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{v.icon}</span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${v.badgeColor}`}>
                      {v.groupName}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500 font-bold">Infinitive: <span className="text-stone-800 dark:text-stone-200">{v.infinitive}</span></div>
                    <div className="text-lg font-black text-amber-900 dark:text-amber-200">
                      <span className="text-amber-600 dark:text-amber-400 font-black">{v.aux}</span> {v.partizip}
                    </div>
                  </div>

                  <div className="p-2.5 bg-stone-50 dark:bg-stone-750 rounded-xl space-y-0.5 text-xs">
                    <div className="font-bold text-stone-800 dark:text-stone-200">"{v.example}"</div>
                    <div className="text-stone-500 italic font-medium">{v.trans}</div>
                  </div>

                  <div className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight">
                    💡 <span className="font-medium">{v.rule}</span>
                  </div>
                </div>

                <button
                  onClick={() => speakGerman(v.example, isSlowMode)}
                  className="w-full py-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen Sentence
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SIDE-BY-SIDE CONJUGATION MATRIX */}
      {activeSubTab === 'conjugation' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-700 pb-4">
              <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
                The Two Royal Conjugation Pillars (Slides 5–7)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Notice how the Partizip II (<em>gegessen / gefahren</em>) stays 100% frozen at the end, while only the helping verbs (<em>haben / sein</em>) conjugate!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* haben Column */}
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center font-black text-emerald-800 dark:text-emerald-200 text-sm sm:text-base flex items-center justify-center gap-2">
                  <span>🍽️</span>
                  <span>haben + gegessen (to eat)</span>
                </div>
                <div className="space-y-2">
                  {CONJUGATION_ROWS.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-stone-50 dark:bg-stone-750 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs sm:text-sm hover:border-emerald-400 transition-colors"
                    >
                      <div className="font-bold text-stone-500 w-24">{row.pronoun}</div>
                      <div className="font-black text-emerald-700 dark:text-emerald-300">
                        {row.pronoun} {row.habenForm}
                      </div>
                      <button
                        onClick={() => speakGerman(`${row.pronoun} ${row.habenForm}`, isSlowMode)}
                        className="p-1.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-lg hover:scale-105"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* sein Column */}
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 text-center font-black text-blue-800 dark:text-blue-200 text-sm sm:text-base flex items-center justify-center gap-2">
                  <span>🚗</span>
                  <span>sein + gefahren (to drive/travel)</span>
                </div>
                <div className="space-y-2">
                  {CONJUGATION_ROWS.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-stone-50 dark:bg-stone-750 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs sm:text-sm hover:border-blue-400 transition-colors"
                    >
                      <div className="font-bold text-stone-500 w-24">{row.pronoun}</div>
                      <div className="font-black text-blue-700 dark:text-blue-300">
                        {row.pronoun} {row.seinForm}
                      </div>
                      <button
                        onClick={() => speakGerman(`${row.pronoun} ${row.seinForm}`, isSlowMode)}
                        className="p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:scale-105"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHALKBOARD DRILLS */}
      {activeSubTab === 'drills' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-stone-800 p-6 md:p-8 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-700 pb-4">
              <span className="text-xs font-black uppercase text-amber-600">Interactive Drill Board</span>
              <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
                Complete the Sentences with the Correct Helping Verb (Slides 29–32)
              </h3>
            </div>

            <div className="space-y-4">
              {DRILL_QUESTIONS.map(q => {
                const userChoice = drillAnswers[q.id];
                const isSubmitted = drillScore !== null;
                const isCorrect = userChoice === q.correct;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300'
                        : 'bg-stone-50 dark:bg-stone-750 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100">
                        <span>{q.before} </span>
                        <span className="inline-block px-3 py-1 bg-white dark:bg-stone-800 border-b-2 border-amber-500 rounded font-black text-amber-700 dark:text-amber-400 min-w-[50px] text-center">
                          {userChoice || '_____'}
                        </span>
                        <span> {q.after}</span>
                      </div>
                      <span className="text-xs text-stone-500 italic font-medium">({q.translation})</span>
                    </div>

                    {/* Options */}
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleDrillChoice(q.id, opt)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            userChoice === opt
                              ? 'bg-amber-600 text-white shadow-md scale-105'
                              : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-amber-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {isSubmitted && (
                      <div className={`text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span>{q.rule}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-stone-700">
              <button
                onClick={handleCheckDrills}
                disabled={Object.keys(drillAnswers).length < DRILL_QUESTIONS.length}
                className={`px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all ${
                  Object.keys(drillAnswers).length === DRILL_QUESTIONS.length
                    ? 'bg-amber-600 hover:bg-amber-700 text-white scale-105'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                Check All Answers
              </button>

              {drillScore !== null && (
                <div className="text-sm font-black text-stone-800 dark:text-stone-200">
                  Score: <span className="text-amber-600 text-lg">{drillScore}</span> / {DRILL_QUESTIONS.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
