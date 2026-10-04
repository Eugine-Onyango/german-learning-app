import React, { useState } from 'react';

const BLUEPRINTS = {
  regular: {
    id: 'regular',
    title: '1. Regular Verbs (Regelmäßige Verben)',
    formula: 'ge- + Verbstamm + -t / -et',
    badge: 'Standard Recipe',
    color: 'emerald',
    description: 'Regular verbs keep their stem vowel unchanged. They attach "ge-" at the front and "-t" at the back. Stems ending in -d/-t add an "-et" breathing cushion.',
    examples: [
      {
        infinitive: 'machen',
        aux: 'hat',
        participle: 'gemacht',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-emerald-600' },
          { text: 'mach', type: 'stem', color: 'bg-emerald-500' },
          { text: '-t', type: 'ending', color: 'bg-emerald-600' }
        ],
        sentence: 'Ich habe die Hausaufgabe gemacht.',
        translation: 'I have done the homework.',
        note: 'Slide 10-11: Classic regular build.'
      },
      {
        infinitive: 'spielen',
        aux: 'hat',
        participle: 'gespielt',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-emerald-600' },
          { text: 'spiel', type: 'stem', color: 'bg-emerald-500' },
          { text: '-t', type: 'ending', color: 'bg-emerald-600' }
        ],
        sentence: 'Wie lange hast du gestern Musik gespielt?',
        translation: 'How long did you play music yesterday?',
        note: 'Slide 12: Music & hobbies.'
      },
      {
        infinitive: 'lernen',
        aux: 'hat',
        participle: 'gelernt',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-emerald-600' },
          { text: 'lern', type: 'stem', color: 'bg-emerald-500' },
          { text: '-t', type: 'ending', color: 'bg-emerald-600' }
        ],
        sentence: 'Ich habe die neuen Wörter schon gelernt.',
        translation: 'I have already learnt the new words.',
        note: 'Slide 13: Vocabulary study.'
      },
      {
        infinitive: 'arbeiten',
        aux: 'hat',
        participle: 'gearbeitet',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-emerald-600' },
          { text: 'arbeit', type: 'stem', color: 'bg-emerald-500' },
          { text: '-et', type: 'cushion', color: 'bg-amber-600' }
        ],
        sentence: 'Ich habe auch am Sonntag gearbeitet.',
        translation: 'I worked on Sunday also.',
        note: 'Slide 14: Breathing cushion -et prevents "arbeit-t" stutter!'
      }
    ]
  },
  ieren: {
    id: 'ieren',
    title: '1b. Verbs Ending in "-ieren" (The VIP Rule)',
    formula: 'Verbstamm + -t (STRICTLY NO "ge-")',
    badge: 'VIP French Exemption',
    color: 'sky',
    description: 'French/Latin-origin verbs ending in "-ieren" refuse to wear the "ge-" prefix! They simply take the stem and snap on "-t".',
    examples: [
      {
        infinitive: 'studieren',
        aux: 'hat',
        participle: 'studiert',
        blocks: [
          { text: 'studier', type: 'stem', color: 'bg-sky-500' },
          { text: '-t', type: 'ending', color: 'bg-sky-600' }
        ],
        sentence: 'Martin hat an der Uni Mathe studiert.',
        translation: 'Martin studied Mathematics at the University.',
        note: 'Slide 15-16: Never say "gestudiert"!'
      },
      {
        infinitive: 'fotografieren',
        aux: 'hat',
        participle: 'fotografiert',
        blocks: [
          { text: 'fotografier', type: 'stem', color: 'bg-sky-500' },
          { text: '-t', type: 'ending', color: 'bg-sky-600' }
        ],
        sentence: 'Wie lange hast du die Touristen fotografiert?',
        translation: 'How long did you photograph the tourists?',
        note: 'Slide 6: Taking photos with zero ge-!'
      }
    ]
  },
  irregular: {
    id: 'irregular',
    title: '2. Irregular Verbs (Unregelmäßige Verben)',
    formula: 'ge- + Verbstamm (mit Vokalwechsel) + -en',
    badge: 'Stem Vowel Shift',
    color: 'purple',
    description: 'Irregular verbs keep "ge-", often flip their stem vowel (e.g., ei ➔ ie, i ➔ u, e ➔ o), and almost always end in "-en".',
    examples: [
      {
        infinitive: 'schreiben',
        aux: 'hat',
        participle: 'geschrieben',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-purple-600' },
          { text: 'schrieb (ei➔ie)', type: 'stem-change', color: 'bg-fuchsia-600' },
          { text: '-en', type: 'ending', color: 'bg-purple-600' }
        ],
        sentence: 'Petra hat mir einen Brief geschrieben.',
        translation: 'Petra has written a letter to me.',
        note: 'Slide 19-20: Vowel flips from ei to ie.'
      },
      {
        infinitive: 'finden',
        aux: 'hat',
        participle: 'gefunden',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-purple-600' },
          { text: 'fund (i➔u)', type: 'stem-change', color: 'bg-fuchsia-600' },
          { text: '-en', type: 'ending', color: 'bg-purple-600' }
        ],
        sentence: 'Wir haben den Film sehr langweilig gefunden.',
        translation: 'We found the movie very boring.',
        note: 'Slide 21: Vowel flips from i to u.'
      },
      {
        infinitive: 'kommen',
        aux: 'ist',
        participle: 'gekommen',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-purple-600' },
          { text: 'komm', type: 'stem', color: 'bg-purple-500' },
          { text: '-en', type: 'ending', color: 'bg-purple-600' }
        ],
        sentence: 'Er ist spät nach Hause gekommen.',
        translation: 'He came home late.',
        note: 'Slide 22: Movement A ➔ B takes "ist"!'
      },
      {
        infinitive: 'denken',
        aux: 'hat',
        participle: 'gedacht',
        blocks: [
          { text: 'ge-', type: 'prefix', color: 'bg-purple-600' },
          { text: 'dach (e➔a)', type: 'mixed', color: 'bg-pink-600' },
          { text: '-t', type: 'ending', color: 'bg-purple-600' }
        ],
        sentence: 'Ich habe an dich gedacht.',
        translation: 'I thought of you.',
        note: 'Slide 18: Mixed verb (vowel flip + regular -t ending).'
      }
    ]
  },
  separable: {
    id: 'separable',
    title: '3. Separable Verbs (The "ge-" Sandwich)',
    formula: 'Präfix + ge- + Verbstamm + -t / -en',
    badge: 'The ge- Sandwich 🥪',
    color: 'rose',
    description: 'In separable verbs, the prefix unclasps and allows "ge-" to jump right into the middle sandwich between the prefix and the root participle!',
    examples: [
      {
        infinitive: 'einkaufen',
        aux: 'hat',
        participle: 'eingekauft',
        blocks: [
          { text: 'ein-', type: 'sep-prefix', color: 'bg-rose-500' },
          { text: 'ge-', type: 'sandwich', color: 'bg-amber-500' },
          { text: 'kauf', type: 'stem', color: 'bg-rose-600' },
          { text: '-t', type: 'ending', color: 'bg-rose-700' }
        ],
        sentence: 'Hast du gestern viel eingekauft?',
        translation: 'Did you shop a lot yesterday?',
        note: 'Slide 25-27: Regular base (kaufen ➔ gekauft ➔ eingekauft).'
      },
      {
        infinitive: 'aufstehen',
        aux: 'ist',
        participle: 'aufgestanden',
        blocks: [
          { text: 'auf-', type: 'sep-prefix', color: 'bg-rose-500' },
          { text: 'ge-', type: 'sandwich', color: 'bg-amber-500' },
          { text: 'stand', type: 'stem-change', color: 'bg-rose-600' },
          { text: '-en', type: 'ending', color: 'bg-rose-700' }
        ],
        sentence: 'Matthias ist heute spät aufgestanden.',
        translation: 'Matthias got up late today.',
        note: 'Slide 28-29: Irregular base + state change takes "ist"!'
      },
      {
        infinitive: 'fernsehen',
        aux: 'hat',
        participle: 'ferngesehen',
        blocks: [
          { text: 'fern-', type: 'sep-prefix', color: 'bg-rose-500' },
          { text: 'ge-', type: 'sandwich', color: 'bg-amber-500' },
          { text: 'seh', type: 'stem', color: 'bg-rose-600' },
          { text: '-en', type: 'ending', color: 'bg-rose-700' }
        ],
        sentence: 'Wir haben gestern fernsehen geschaut / ferngesehen.',
        translation: 'We watched TV yesterday.',
        note: 'Slide 30: fern + gesehen = ferngesehen.'
      }
    ]
  },
  inseparable: {
    id: 'inseparable',
    title: '4. Inseparable Verbs (The Superglue Shield)',
    formula: 'Untrennbares Präfix + Verbstamm + -t / -en (STRICTLY NO "ge-")',
    badge: 'No ge- Allowed 🛡️',
    color: 'indigo',
    description: 'Inseparable bodyguard prefixes (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-) are glued permanently to the verb. They strictly ban "ge-" from entering!',
    examples: [
      {
        infinitive: 'erklären',
        aux: 'hat',
        participle: 'erklärt',
        blocks: [
          { text: 'er-', type: 'insep-prefix', color: 'bg-indigo-600' },
          { text: 'klär', type: 'stem', color: 'bg-indigo-500' },
          { text: '-t', type: 'ending', color: 'bg-indigo-600' }
        ],
        sentence: 'Meine Lehrerin hat das Thema gut erklärt.',
        translation: 'My teacher explained the topic very well.',
        note: 'Slide 33: Bodyguard er- blocks "ge-".'
      },
      {
        infinitive: 'verstehen',
        aux: 'hat',
        participle: 'verstanden',
        blocks: [
          { text: 'ver-', type: 'insep-prefix', color: 'bg-indigo-600' },
          { text: 'stand (e➔a)', type: 'stem-change', color: 'bg-indigo-700' },
          { text: '-en', type: 'ending', color: 'bg-indigo-600' }
        ],
        sentence: 'Ich habe heute alles verstanden.',
        translation: 'Today I have understood everything.',
        note: 'Slide 34: Bodyguard ver- + irregular standen.'
      },
      {
        infinitive: 'bekommen',
        aux: 'hat',
        participle: 'bekommen',
        blocks: [
          { text: 'be-', type: 'insep-prefix', color: 'bg-indigo-600' },
          { text: 'komm', type: 'stem', color: 'bg-indigo-500' },
          { text: '-en', type: 'ending', color: 'bg-indigo-600' }
        ],
        sentence: 'Ich habe eine E-Mail bekommen.',
        translation: 'I received an email.',
        note: 'Slide 35: Infinitive and Partizip II look identical!'
      }
    ]
  }
};

const MASTER_VERBS = [
  // Regular
  { inf: 'kochen', aux: 'hat', part: 'gekocht', type: 'regular', meaning: 'to cook', example: 'Ich habe gestern lange gekocht.', slide: 4 },
  { inf: 'machen', aux: 'hat', part: 'gemacht', type: 'regular', meaning: 'to do / make', example: 'Ich habe die Hausaufgabe gemacht.', slide: 10 },
  { inf: 'spielen', aux: 'hat', part: 'gespielt', type: 'regular', meaning: 'to play', example: 'Wie lange hast du gestern Musik gespielt?', slide: 12 },
  { inf: 'lernen', aux: 'hat', part: 'gelernt', type: 'regular', meaning: 'to learn', example: 'Ich habe die neuen Wörter schon gelernt.', slide: 13 },
  { inf: 'arbeiten', aux: 'hat', part: 'gearbeitet', type: 'regular', meaning: 'to work', example: 'Ich habe auch am Sonntag gearbeitet.', slide: 14 },
  { inf: 'studieren', aux: 'hat', part: 'studiert', type: 'ieren', meaning: 'to study', example: 'Martin hat an der Uni Mathe studiert.', slide: 16 },
  { inf: 'fotografieren', aux: 'hat', part: 'fotografiert', type: 'ieren', meaning: 'to photograph', example: 'Wie lange hast du die Touristen fotografiert?', slide: 6 },
  // Irregular
  { inf: 'schreiben', aux: 'hat', part: 'geschrieben', type: 'irregular', meaning: 'to write', example: 'Petra hat mir einen Brief geschrieben.', slide: 20 },
  { inf: 'finden', aux: 'hat', part: 'gefunden', type: 'irregular', meaning: 'to find', example: 'Wir haben den Film sehr langweilig gefunden.', slide: 21 },
  { inf: 'kommen', aux: 'ist', part: 'gekommen', type: 'irregular', meaning: 'to come', example: 'Er ist spät nach Hause gekommen.', slide: 22 },
  { inf: 'denken', aux: 'hat', part: 'gedacht', type: 'irregular', meaning: 'to think', example: 'Ich habe an dich gedacht.', slide: 18 },
  { inf: 'bringen', aux: 'hat', part: 'gebracht', type: 'irregular', meaning: 'to bring', example: 'Er hat Pizza mitgebracht / gebracht.', slide: 23 },
  { inf: 'essen', aux: 'hat', part: 'gegessen', type: 'irregular', meaning: 'to eat', example: 'Wir haben eine leckere Pizza gegessen.', slide: 23 },
  { inf: 'fahren', aux: 'ist', part: 'gefahren', type: 'irregular', meaning: 'to drive / travel', example: 'Wir sind gestern in die Innenstadt gefahren.', slide: 5 },
  { inf: 'gehen', aux: 'ist', part: 'gegangen', type: 'irregular', meaning: 'to go / walk', example: 'Sie sind in den Park gegangen.', slide: 23 },
  { inf: 'geben', aux: 'hat', part: 'gegeben', type: 'irregular', meaning: 'to give', example: 'Er hat mir ein Geschenk gegeben.', slide: 23 },
  { inf: 'helfen', aux: 'hat', part: 'geholfen', type: 'irregular', meaning: 'to help', example: 'Maria hat mir gestern geholfen.', slide: 23 },
  { inf: 'trinken', aux: 'hat', part: 'getrunken', type: 'irregular', meaning: 'to drink', example: 'Ich habe frischen Kaffee getrunken.', slide: 23 },
  { inf: 'nehmen', aux: 'hat', part: 'genommen', type: 'irregular', meaning: 'to take', example: 'Er hat den Bus genommen.', slide: 23 },
  // Separable
  { inf: 'einkaufen', aux: 'hat', part: 'eingekauft', type: 'separable', meaning: 'to shop', example: 'Hast du gestern viel eingekauft?', slide: 26 },
  { inf: 'aufstehen', aux: 'ist', part: 'aufgestanden', type: 'separable', meaning: 'to get up / wake', example: 'Matthias ist heute spät aufgestanden.', slide: 29 },
  { inf: 'zumachen', aux: 'hat', part: 'zugemacht', type: 'separable', meaning: 'to close', example: 'Er hat das Fenster zugemacht.', slide: 30 },
  { inf: 'mitkommen', aux: 'ist', part: 'mitgekommen', type: 'separable', meaning: 'to come along', example: 'Wer ist gestern mitgekommen?', slide: 30 },
  { inf: 'fernsehen', aux: 'hat', part: 'ferngesehen', type: 'separable', meaning: 'to watch TV', example: 'Sie hat den ganzen Abend ferngesehen.', slide: 30 },
  { inf: 'anfangen', aux: 'hat', part: 'angefangen', type: 'separable', meaning: 'to begin / start', example: 'Der Deutschkurs hat um 9 Uhr angefangen.', slide: 30 },
  { inf: 'einschlafen', aux: 'ist', part: 'eingeschlafen', type: 'separable', meaning: 'to fall asleep', example: 'Wann bist du gestern eingeschlafen?', slide: 7 },
  // Inseparable
  { inf: 'erklären', aux: 'hat', part: 'erklärt', type: 'inseparable', meaning: 'to explain', example: 'Meine Lehrerin hat das Thema gut erklärt.', slide: 33 },
  { inf: 'verstehen', aux: 'hat', part: 'verstanden', type: 'inseparable', meaning: 'to understand', example: 'Ich habe heute alles verstanden.', slide: 34 },
  { inf: 'bekommen', aux: 'hat', part: 'bekommen', type: 'inseparable', meaning: 'to receive / get', example: 'Ich habe gestern eine Nachricht bekommen.', slide: 35 },
  { inf: 'gefallen', aux: 'hat', part: 'gefallen', type: 'inseparable', meaning: 'to please / like', example: 'Das neue Buch hat mir sehr gefallen.', slide: 35 },
  { inf: 'erzählen', aux: 'hat', part: 'erzählt', type: 'inseparable', meaning: 'to tell / narrate', example: 'Opa hat eine tolle Geschichte erzählt.', slide: 35 },
  { inf: 'entscheiden', aux: 'hat', part: 'entschieden', type: 'inseparable', meaning: 'to decide', example: 'Wir haben uns für den Urlaub entschieden.', slide: 35 }
];

const BRACKET_DRILLS = [
  {
    id: 'drill-1',
    english: 'Yesterday I cooked for a long time.',
    scrambled: ['gekocht', 'lange', 'habe', 'Ich', 'gestern'],
    correct: ['Ich', 'habe', 'gestern', 'lange', 'gekocht'],
    rule: 'Pos 2: habe (Auxiliary) | Satzende: gekocht (Partizip II regular).'
  },
  {
    id: 'drill-2',
    english: 'We drove to downtown yesterday.',
    scrambled: ['in die Innenstadt', 'gefahren', 'sind', 'Wir', 'gestern'],
    correct: ['Wir', 'sind', 'gestern', 'in die Innenstadt', 'gefahren'],
    rule: 'Pos 2: sind (Movement takes sein) | Satzende: gefahren (Partizip II irregular).'
  },
  {
    id: 'drill-3',
    english: 'Petra has written a letter to me.',
    scrambled: ['geschrieben', 'hat', 'Petra', 'einen Brief', 'mir'],
    correct: ['Petra', 'hat', 'mir', 'einen Brief', 'geschrieben'],
    rule: 'Pos 2: hat | Middle: mir (Dativ) einen Brief (Akkusativ) | Satzende: geschrieben (irregular ei➔ie).'
  },
  {
    id: 'drill-4',
    english: 'Matthias got up late today.',
    scrambled: ['aufgestanden', 'ist', 'Matthias', 'spät', 'heute'],
    correct: ['Matthias', 'ist', 'heute', 'spät', 'aufgestanden'],
    rule: 'Pos 2: ist (State change) | Satzende: aufgestanden (separable sandwich).'
  },
  {
    id: 'drill-5',
    english: 'My teacher explained the topic very well.',
    scrambled: ['erklärt', 'hat', 'Meine Lehrerin', 'das Thema', 'gut'],
    correct: ['Meine Lehrerin', 'hat', 'das Thema', 'gut', 'erklärt'],
    rule: 'Pos 2: hat | Satzende: erklärt (inseparable prefix er- blocks ge-).'
  },
  {
    id: 'drill-6',
    english: 'Today I have understood everything.',
    scrambled: ['verstanden', 'habe', 'Ich', 'alles', 'heute'],
    correct: ['Ich', 'habe', 'heute', 'alles', 'verstanden'],
    rule: 'Pos 2: habe | Satzende: verstanden (inseparable bodyguard ver- blocks ge-).'
  }
];

export default function Lesson45PartizipStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('blueprints'); // 'blueprints' | 'matrix' | 'brackets'
  const [selectedBlueprint, setSelectedBlueprint] = useState('regular');
  const [matrixFilter, setMatrixFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sentence Bracket state
  const [activeDrillIndex, setActiveDrillIndex] = useState(0);
  const [userSentence, setUserSentence] = useState([]);
  const [drillStatus, setDrillStatus] = useState(null); // 'correct' | 'wrong' | null

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = isSlowMode ? 0.7 : 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const currentDrill = BRACKET_DRILLS[activeDrillIndex];

  const handleWordClick = (word) => {
    if (drillStatus === 'correct') return;
    setUserSentence([...userSentence, word]);
    speakText(word);
  };

  const handleRemoveWord = (index) => {
    if (drillStatus === 'correct') return;
    const newWords = [...userSentence];
    newWords.splice(index, 1);
    setUserSentence(newWords);
    setDrillStatus(null);
  };

  const checkDrill = () => {
    const isMatch = userSentence.join(' ') === currentDrill.correct.join(' ');
    if (isMatch) {
      setDrillStatus('correct');
      speakText(currentDrill.correct.join(' '));
    } else {
      setDrillStatus('wrong');
    }
  };

  const resetDrill = () => {
    setUserSentence([]);
    setDrillStatus(null);
  };

  const nextDrill = () => {
    const nextIdx = (activeDrillIndex + 1) % BRACKET_DRILLS.length;
    setActiveDrillIndex(nextIdx);
    setUserSentence([]);
    setDrillStatus(null);
  };

  const filteredVerbs = MASTER_VERBS.filter(v => {
    const matchesFilter = matrixFilter === 'all' ? true : v.type === matrixFilter;
    const matchesSearch = v.inf.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.part.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-amber-400/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 rounded-full border border-amber-300 text-amber-300 text-xs font-black uppercase tracking-wider">
              <span>🏭 Lesson 45 Studio</span>
              <span>•</span>
              <span>All 35 Slides Mastered</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              The 4 Partizip II Blueprints Studio
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Snap past participles together like Lego blocks! Discover the 4 formation blueprints: Regular (<code className="bg-black/30 px-1.5 py-0.5 rounded text-emerald-300">ge-...-t</code>), Irregular (<code className="bg-black/30 px-1.5 py-0.5 rounded text-purple-300">ge-...-en</code>), Separable (<code className="bg-black/30 px-1.5 py-0.5 rounded text-rose-300">ein-ge-kauft</code> sandwich), and Inseparable (<code className="bg-black/30 px-1.5 py-0.5 rounded text-indigo-300">verstanden</code> NO-ge shield)!
            </p>
          </div>
          <button
            onClick={() => speakText("Die vier Baupläne für das Partizip zwei: regelmäßig, unregelmäßig, trennbar und untrennbar. Ich habe heute alles verstanden!")}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-2xl shadow-lg hover:scale-105 transition-all text-sm whitespace-nowrap"
          >
            <span>🔊</span>
            <span>Listen Overview</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-2xl">
        <button
          onClick={() => setActiveTab('blueprints')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'blueprints'
              ? 'bg-white text-indigo-900 shadow-md ring-2 ring-indigo-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>🧱</span>
          <span>1. The 4 Blueprints</span>
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'matrix'
              ? 'bg-white text-indigo-900 shadow-md ring-2 ring-indigo-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>📊</span>
          <span>2. Master Verb Matrix (24+)</span>
        </button>
        <button
          onClick={() => setActiveTab('brackets')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'brackets'
              ? 'bg-white text-indigo-900 shadow-md ring-2 ring-indigo-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>🧩</span>
          <span>3. Sentence Bracket Drills</span>
        </button>
      </div>

      {/* TAB 1: THE 4 BLUEPRINTS */}
      {activeTab === 'blueprints' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Blueprint Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'regular', label: '1. Regular', icon: '📝', color: 'emerald' },
              { id: 'ieren', label: '1b. -ieren VIP', icon: '🎓', color: 'sky' },
              { id: 'irregular', label: '2. Irregular', icon: '👑', color: 'purple' },
              { id: 'separable', label: '3. Separable', icon: '🥪', color: 'rose' },
              { id: 'inseparable', label: '4. Inseparable', icon: '🛡️', color: 'indigo' }
            ].map(bp => (
              <button
                key={bp.id}
                onClick={() => setSelectedBlueprint(bp.id)}
                className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all flex flex-col gap-1 ${
                  selectedBlueprint === bp.id
                    ? 'bg-indigo-900 text-white border-amber-400 shadow-lg scale-102'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-indigo-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{bp.icon}</span>
                  {selectedBlueprint === bp.id && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </div>
                <span>{bp.label}</span>
              </button>
            ))}
          </div>

          {/* Active Blueprint Card */}
          {(() => {
            const current = BLUEPRINTS[selectedBlueprint];
            return (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-extrabold mb-1">
                      {current.badge}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                      {current.title}
                    </h3>
                  </div>
                  <div className="bg-amber-100 px-4 py-2 rounded-2xl border border-amber-300 font-mono text-amber-900 font-extrabold text-sm sm:text-base text-center">
                    {current.formula}
                  </div>
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {current.description}
                </p>

                {/* Lego Construction Breakdown for this category */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-500">
                    Live Lego Block Assembly & Slide Examples
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {current.examples.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 hover:border-indigo-300 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 bg-stone-200 rounded font-bold text-stone-700 font-mono">
                              {item.aux}
                            </span>
                            <span className="font-black text-stone-800 text-base">
                              {item.infinitive}
                            </span>
                            <span className="text-stone-400">➔</span>
                            <span className="font-extrabold text-indigo-700 text-base">
                              {item.participle}
                            </span>
                          </div>
                          <button
                            onClick={() => speakText(`${item.infinitive}, ${item.aux} ${item.participle}. ${item.sentence}`)}
                            className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl transition-all"
                            title="Listen"
                          >
                            🔊
                          </button>
                        </div>

                        {/* Lego blocks visual */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {item.blocks.map((b, bIdx) => (
                            <React.Fragment key={bIdx}>
                              <span className={`${b.color} text-white font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded-lg shadow-sm`}>
                                {b.text}
                              </span>
                              {bIdx < item.blocks.length - 1 && (
                                <span className="text-stone-400 font-bold">+</span>
                              )}
                            </React.Fragment>
                          ))}
                          <span className="text-stone-500 font-bold">=</span>
                          <span className="font-mono font-extrabold text-xs sm:text-sm bg-indigo-900 text-amber-300 px-3 py-1 rounded-lg shadow-sm">
                            {item.participle}
                          </span>
                        </div>

                        {/* Real sentence */}
                        <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs sm:text-sm space-y-1">
                          <div className="font-bold text-stone-900">
                            🇩🇪 {item.sentence}
                          </div>
                          <div className="text-stone-600">
                            🇬🇧 {item.translation}
                          </div>
                        </div>

                        <div className="text-[11px] text-amber-800 font-medium bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                          💡 {item.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: MASTER VERB MATRIX */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Master Partizip II Verb Matrix (24+ Core Verbs)
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                Search, filter by blueprint, and click any row or audio icon to listen to perfect German pronunciation.
              </p>
            </div>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search verb, Partizip II, or meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `All (${MASTER_VERBS.length})` },
              { id: 'regular', label: 'Regular (ge-...-t)' },
              { id: 'ieren', label: '-ieren VIP (no ge-)' },
              { id: 'irregular', label: 'Irregular (ge-...-en)' },
              { id: 'separable', label: 'Separable (sandwich)' },
              { id: 'inseparable', label: 'Inseparable (no ge-)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setMatrixFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  matrixFilter === f.id
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100 text-stone-700 font-black border-b border-stone-200">
                <tr>
                  <th className="p-3">Auxiliary</th>
                  <th className="p-3">Infinitive</th>
                  <th className="p-3">Partizip II</th>
                  <th className="p-3">Blueprint</th>
                  <th className="p-3">English Meaning</th>
                  <th className="p-3">Example Sentence</th>
                  <th className="p-3 text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {filteredVerbs.map((v, i) => {
                  const typeColors = {
                    regular: 'bg-emerald-100 text-emerald-900',
                    ieren: 'bg-sky-100 text-sky-900',
                    irregular: 'bg-purple-100 text-purple-900',
                    separable: 'bg-rose-100 text-rose-900',
                    inseparable: 'bg-indigo-100 text-indigo-900'
                  };

                  return (
                    <tr
                      key={i}
                      className="hover:bg-amber-50/50 transition-colors group cursor-pointer"
                      onClick={() => speakText(`${v.inf}, ${v.aux} ${v.part}. ${v.example}`)}
                    >
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-black text-xs ${v.aux === 'ist' ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-800'}`}>
                          {v.aux}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-stone-900">{v.inf}</td>
                      <td className="p-3 font-black text-indigo-800 font-mono">{v.part}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${typeColors[v.type]}`}>
                          {v.type}
                        </span>
                      </td>
                      <td className="p-3 text-stone-600">{v.meaning}</td>
                      <td className="p-3 text-stone-800 text-xs italic">
                        {v.example}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(`${v.inf}, ${v.aux} ${v.part}. ${v.example}`);
                          }}
                          className="p-1.5 hover:bg-amber-200 rounded-lg transition-all"
                        >
                          🔊
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SENTENCE BRACKET DRILLS */}
      {activeTab === 'brackets' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-1">
                Challenge {activeDrillIndex + 1} of {BRACKET_DRILLS.length}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                The German Sentence Bracket (Satzklammer)
              </h3>
            </div>
            <div className="text-xs text-stone-500 font-bold">
              Position 2 Helping Verb ➔ Partizip II at the Sentence Caboose!
            </div>
          </div>

          {/* Drill English Goal */}
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 space-y-1">
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Assemble this German sentence:
            </div>
            <div className="text-base sm:text-lg font-black text-indigo-950">
              🇬🇧 "{currentDrill.english}"
            </div>
          </div>

          {/* Answer Drop Area */}
          <div className="p-5 rounded-2xl min-h-[90px] border-2 border-dashed flex flex-wrap items-center gap-2 bg-stone-50 border-stone-300">
            {userSentence.length === 0 ? (
              <span className="text-stone-400 text-sm italic">
                Tap words below in order to build the sentence...
              </span>
            ) : (
              userSentence.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(idx)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-900 text-white font-bold text-sm shadow hover:bg-red-700 transition-all flex items-center gap-1 group"
                >
                  <span>{word}</span>
                  <span className="text-xs text-indigo-300 group-hover:text-white">✕</span>
                </button>
              ))
            )}
          </div>

          {/* Word Bank */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase text-stone-500">
              Word Bank (Tap to select):
            </div>
            <div className="flex flex-wrap gap-2">
              {currentDrill.scrambled.map((word, idx) => {
                const usedCount = userSentence.filter(w => w === word).length;
                const totalInScramble = currentDrill.scrambled.filter(w => w === word).length;
                const isAllUsed = usedCount >= totalInScramble;

                return (
                  <button
                    key={idx}
                    disabled={isAllUsed}
                    onClick={() => handleWordClick(word)}
                    className={`px-4 py-2 rounded-xl font-extrabold text-sm transition-all ${
                      isAllUsed
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                        : 'bg-white text-stone-800 border-2 border-stone-300 hover:border-indigo-500 hover:bg-indigo-50 shadow-sm'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2">
              <button
                onClick={checkDrill}
                disabled={userSentence.length === 0}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all text-sm"
              >
                ✓ Check Bracket
              </button>
              <button
                onClick={resetDrill}
                className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-xl transition-all text-sm"
              >
                Reset
              </button>
            </div>

            {drillStatus === 'correct' && (
              <div className="flex items-center gap-3 animate-bounce">
                <span className="text-emerald-700 font-black text-sm">
                  🎉 Perfekt! You got the bracket right!
                </span>
                <button
                  onClick={nextDrill}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Next Sentence ➔
                </button>
              </div>
            )}

            {drillStatus === 'wrong' && (
              <span className="text-red-600 font-bold text-sm">
                ❌ Not quite right yet. Remember: Verb in Pos. 2, Partizip II at the very end!
              </span>
            )}
          </div>

          {/* Rule note */}
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
            💡 <strong>Bracket Rule:</strong> {currentDrill.rule}
          </div>
        </div>
      )}
    </div>
  );
}
