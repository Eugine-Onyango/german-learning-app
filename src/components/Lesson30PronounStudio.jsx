import React, { useState } from 'react';
import { Volume2, Sparkles, User, Users, ArrowRight, Lightbulb, CheckCircle, RefreshCw, Eye, EyeOff, ShieldCheck, Zap, MessageSquare, BookOpen } from 'lucide-react';
import { LESSON_30_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson30PronounStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('stories');

  // TAB 1: Selected story
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const stories = [
    {
      id: 'michael-architect',
      slides: 'Slide 2, 3, 10, 11',
      title: 'Michael the Architect',
      gender: '3rd Person Masculine',
      nominativ: 'er',
      akkusativ: 'ihn',
      nomMeaning: 'he',
      akkMeaning: 'him',
      icon: '👨‍💼',
      color: 'blue',
      context: 'Michael lives in London and works as an architect. When talking about him, "er" becomes "ihn"!',
      introGerman: 'Das ist Michael. Er ist Architekt und er wohnt in London.',
      introEnglish: 'This is Michael. He is an architect and he lives in London.',
      examples: [
        {
          german: 'Ich finde ihn nett.',
          english: 'I find him nice.',
          subject: 'Ich (Nom)',
          verb: 'finde',
          object: 'ihn (Akk)',
          audio: 'Ich finde ihn nett.'
        },
        {
          german: 'Ich kenne ihn.',
          english: 'I know him.',
          subject: 'Ich (Nom)',
          verb: 'kenne',
          object: 'ihn (Akk)',
          audio: 'Ich kenne ihn.'
        }
      ],
      rule: 'Masculine rule: Just like "der" ➔ "den", the pronoun "er" ➔ "ihn" (always gains the accusative "-n")!'
    },
    {
      id: 'maria-greeting',
      slides: 'Slide 4, 5',
      title: 'Maria Introducing Herself',
      gender: '1st Person Singular',
      nominativ: 'ich',
      akkusativ: 'mich',
      nomMeaning: 'I',
      akkMeaning: 'me',
      icon: '🙋‍♀️',
      color: 'emerald',
      context: 'Maria meets someone new. When she is the target receiving the question, "ich" becomes "mich"!',
      introGerman: 'Hi. Ich bin Maria.',
      introEnglish: 'Hi. I am Maria.',
      examples: [
        {
          german: 'Kennst du mich?',
          english: 'Do you know me?',
          subject: 'du (Nom)',
          verb: 'Kennst',
          object: 'mich (Akk)',
          audio: 'Kennst du mich?'
        },
        {
          german: 'Entschuldigen Sie mich, bitte!',
          english: 'Excuse me, please!',
          subject: 'Sie (Nom)',
          verb: 'Entschuldigen',
          object: 'mich (Akk)',
          audio: 'Entschuldigen Sie mich, bitte!'
        }
      ],
      rule: '1st Person Singular: "ich" (I) transforms into "mich" (me).'
    },
    {
      id: 'stranger-informal',
      slides: 'Slide 6, 7',
      title: 'The Unfamiliar Person',
      gender: '2nd Person Singular (Informal)',
      nominativ: 'du',
      akkusativ: 'dich',
      nomMeaning: 'you',
      akkMeaning: 'you',
      icon: '👉',
      color: 'indigo',
      context: 'You meet a stranger at a casual gathering. When they receive your action, "du" becomes "dich"!',
      introGerman: 'Wer bist du?',
      introEnglish: 'Who are you?',
      examples: [
        {
          german: 'Ich kenne dich nicht.',
          english: 'I do not know you.',
          subject: 'Ich (Nom)',
          verb: 'kenne',
          object: 'dich (Akk)',
          audio: 'Ich kenne dich nicht.'
        },
        {
          german: 'Ich sehe dich.',
          english: 'I see you.',
          subject: 'Ich (Nom)',
          verb: 'sehe',
          object: 'dich (Akk)',
          audio: 'Ich sehe dich.'
        },
        {
          german: 'Ich mag dich.',
          english: 'I like you.',
          subject: 'Ich (Nom)',
          verb: 'mag',
          object: 'dich (Akk)',
          audio: 'Ich mag dich.'
        }
      ],
      rule: 'Informal singular: "du" (you doer) transforms into "dich" (you receiver).'
    },
    {
      id: 'herr-schmidt-formal',
      slides: 'Slide 8, 9',
      title: 'Mr. Schmidt (Formal Singular)',
      gender: '2nd Person Singular (Formal)',
      nominativ: 'Sie',
      akkusativ: 'Sie',
      nomMeaning: 'You',
      akkMeaning: 'You',
      icon: '👔',
      color: 'amber',
      context: 'You are looking for your distinguished boss Mr. Schmidt in the office hallway.',
      introGerman: 'Herr Schmidt, wo sind Sie?',
      introEnglish: 'Mr. Schmidt, where are you?',
      examples: [
        {
          german: 'Ich suche Sie.',
          english: 'I am looking for you.',
          subject: 'Ich (Nom)',
          verb: 'suche',
          object: 'Sie (Akk)',
          audio: 'Herr Schmidt, wo sind Sie? Ich suche Sie.'
        }
      ],
      rule: 'Polite Formal "Sie" NEVER changes! It is always "Sie" with a capital S in both Nominativ & Akkusativ.'
    },
    {
      id: 'michaela-student',
      slides: 'Slide 12, 13',
      title: 'Michaela the Student',
      gender: '3rd Person Feminine',
      nominativ: 'sie',
      akkusativ: 'sie',
      nomMeaning: 'she',
      akkMeaning: 'her',
      icon: '👩‍🎓',
      color: 'rose',
      context: 'Michaela is studying diligently with her books. When referring to her as the object, "sie" stays "sie"!',
      introGerman: 'Das ist Michaela. Sie studiert.',
      introEnglish: 'This is Michaela. She is studying.',
      examples: [
        {
          german: 'Ich finde sie sehr schön.',
          english: 'I find her very beautiful.',
          subject: 'Ich (Nom)',
          verb: 'finde',
          object: 'sie (Akk)',
          audio: 'Das ist Michaela. Sie studiert. Ich finde sie sehr schön.'
        }
      ],
      rule: 'Feminine singular: "sie" (she) stays identical as "sie" (her) in Akkusativ!'
    },
    {
      id: 'old-book',
      slides: 'Slide 14, 15',
      title: 'The Interesting Book',
      gender: '3rd Person Neuter',
      nominativ: 'es',
      akkusativ: 'es',
      nomMeaning: 'it',
      akkMeaning: 'it',
      icon: '📖',
      color: 'teal',
      context: 'An old leather-bound book on the table. In Akkusativ, neuter "es" never changes.',
      introGerman: 'Das ist mein Buch. Es ist alt.',
      introEnglish: 'This is my book. It is old.',
      examples: [
        {
          german: 'Ich finde es sehr interessant.',
          english: 'I find it very interesting.',
          subject: 'Ich (Nom)',
          verb: 'finde',
          object: 'es (Akk)',
          audio: 'Das ist mein Buch. Es ist alt. Ich finde es sehr interessant.'
        }
      ],
      rule: 'Neuter singular: "es" (it) stays identical as "es" (it) in Akkusativ!'
    },
    {
      id: 'samantha-mike',
      slides: 'Slide 16, 17',
      title: 'Samantha & Mike (Musicians)',
      gender: '1st Person Plural',
      nominativ: 'wir',
      akkusativ: 'uns',
      nomMeaning: 'we',
      akkMeaning: 'us',
      icon: '👫 🎸',
      color: 'purple',
      context: 'Samantha and Mike are playing guitar on stage and greeting the audience.',
      introGerman: 'Wir sind Samantha und Mike.',
      introEnglish: 'We are Samantha and Mike.',
      examples: [
        {
          german: 'Kennst du uns?',
          english: 'Do you know us?',
          subject: 'du (Nom)',
          verb: 'Kennst',
          object: 'uns (Akk)',
          audio: 'Wir sind Samantha und Mike. Kennst du uns?'
        }
      ],
      rule: '1st Person Plural: "wir" (we) transforms into "uns" (us).'
    },
    {
      id: 'youth-group',
      slides: 'Slide 18, 19',
      title: 'The Group of Friends',
      gender: '2nd Person Plural (Informal)',
      nominativ: 'ihr',
      akkusativ: 'euch',
      nomMeaning: 'you all',
      akkMeaning: 'you all',
      icon: '👥',
      color: 'orange',
      context: 'A group of friends walking in hooded jackets. When addressing them as the object, "ihr" becomes "euch"!',
      introGerman: 'Wer seid ihr?',
      introEnglish: 'Who are you (all)?',
      examples: [
        {
          german: 'Ich kenne euch nicht.',
          english: 'I do not know you (all).',
          subject: 'Ich (Nom)',
          verb: 'kenne',
          object: 'euch (Akk)',
          audio: 'Wer seid ihr? Ich kenne euch nicht.'
        }
      ],
      rule: 'Informal Plural: "ihr" (you all) transforms into "euch" (pronounced "oysh")!'
    },
    {
      id: 'mueller-couple',
      slides: 'Slide 20, 21',
      title: 'Mr. & Mrs. Müller (Formal Plural)',
      gender: '2nd Person Plural (Formal)',
      nominativ: 'Sie',
      akkusativ: 'Sie',
      nomMeaning: 'you all (formal)',
      akkMeaning: 'you all (formal)',
      icon: '👵👴',
      color: 'sky',
      context: 'An elderly couple resting on a park bench. When addressing both formally as objects, "Sie" stays "Sie"!',
      introGerman: 'Herr und Frau Müller, wo sind Sie?',
      introEnglish: 'Mr. and Mrs. Müller, where are you?',
      examples: [
        {
          german: 'Ich suche Sie.',
          english: 'I am looking for you.',
          subject: 'Ich (Nom)',
          verb: 'suche',
          object: 'Sie (Akk)',
          audio: 'Herr und Frau Müller, wo sind Sie? Ich suche Sie.'
        }
      ],
      rule: 'Formal Plural: Just like formal singular, "Sie" stays identical in Akkusativ!'
    },
    {
      id: 'petra-juergen',
      slides: 'Slide 22, 23',
      title: 'Petra & Jürgen (They/Them)',
      gender: '3rd Person Plural',
      nominativ: 'sie',
      akkusativ: 'sie',
      nomMeaning: 'they',
      akkMeaning: 'them',
      icon: '💑',
      color: 'pink',
      context: 'Petra and Jürgen hugging happily. When referring to them in 3rd person plural, "sie" stays "sie"!',
      introGerman: 'Das sind Petra und Jürgen.',
      introEnglish: 'This is Petra and Jürgen.',
      examples: [
        {
          german: 'Ich kenne sie.',
          english: 'I know them.',
          subject: 'Ich (Nom)',
          verb: 'kenne',
          object: 'sie (Akk)',
          audio: 'Das sind Petra und Jürgen. Ich kenne sie.'
        }
      ],
      rule: '3rd Person Plural: "sie" (they) stays identical as "sie" (them) in Akkusativ!'
    }
  ];

  const currentStory = stories[selectedStoryIndex];

  // TAB 2: Matrix & Flashcard Reveal state
  const [revealedPronouns, setRevealedPronouns] = useState({});

  const matrixData = [
    { nom: 'ich', akk: 'mich', enNom: 'I', enAkk: 'me', type: 'changed', badge: '5 Changers ⚡', example: 'Kennst du mich?' },
    { nom: 'du', akk: 'dich', enNom: 'you', enAkk: 'you', type: 'changed', badge: '5 Changers ⚡', example: 'Ich liebe/mag dich.' },
    { nom: 'er', akk: 'ihn', enNom: 'he', enAkk: 'him', type: 'changed', badge: '5 Changers ⚡ (Masc -n)', example: 'Ich kenne ihn.' },
    { nom: 'wir', akk: 'uns', enNom: 'we', enAkk: 'us', type: 'changed', badge: '5 Changers ⚡', example: 'Kennst du uns?' },
    { nom: 'ihr', akk: 'euch', enNom: 'you all', enAkk: 'you all', type: 'changed', badge: '5 Changers ⚡', example: 'Ich kenne euch nicht.' },
    { nom: 'sie (fem)', akk: 'sie', enNom: 'she', enAkk: 'her', type: 'identical', badge: '3 Twins 🛡️', example: 'Ich finde sie schön.' },
    { nom: 'es (neut)', akk: 'es', enNom: 'it', enAkk: 'it', type: 'identical', badge: '3 Twins 🛡️', example: 'Ich finde es interessant.' },
    { nom: 'Sie (formal)', akk: 'Sie', enNom: 'you (formal)', enAkk: 'you (formal)', type: 'identical', badge: '3 Twins 🛡️', example: 'Ich suche Sie.' },
    { nom: 'sie (pl)', akk: 'sie', enNom: 'they', enAkk: 'them', type: 'identical', badge: '3 Twins 🛡️', example: 'Ich kenne sie.' }
  ];

  const toggleReveal = (nom) => {
    setRevealedPronouns(prev => ({ ...prev, [nom]: !prev[nom] }));
  };

  const revealAll = () => {
    const all = {};
    matrixData.forEach(item => { all[item.nom] = true; });
    setRevealedPronouns(all);
    playChime();
  };

  const hideAll = () => {
    setRevealedPronouns({});
  };

  // TAB 3: Sentence Builder Lab
  const [labSubject, setLabSubject] = useState('Ich');
  const [labVerb, setLabVerb] = useState('mag');
  const [labObject, setLabObject] = useState('dich');

  const labSubjects = [
    { label: 'Ich (I)', val: 'Ich' },
    { label: 'Du (You)', val: 'Du' },
    { label: 'Er (He)', val: 'Er' },
    { label: 'Sie (She)', val: 'Sie (sie)' },
    { label: 'Wir (We)', val: 'Wir' },
    { label: 'Ihr (You all)', val: 'Ihr' },
    { label: 'Sie (Formal You)', val: 'Sie' }
  ];

  const labVerbs = [
    {
      id: 'sehen',
      name: 'sehen (to see)',
      conjugations: { 'Ich': 'sehe', 'Du': 'siehst', 'Er': 'sieht', 'Sie (sie)': 'sieht', 'Wir': 'sehen', 'Ihr': 'seht', 'Sie': 'sehen' },
      meaning: 'see/sees'
    },
    {
      id: 'moegen',
      name: 'mögen (to like)',
      conjugations: { 'Ich': 'mag', 'Du': 'magst', 'Er': 'mag', 'Sie (sie)': 'mag', 'Wir': 'mögen', 'Ihr': 'mögt', 'Sie': 'mögen' },
      meaning: 'like/likes'
    },
    {
      id: 'kennen',
      name: 'kennen (to know someone)',
      conjugations: { 'Ich': 'kenne', 'Du': 'kennst', 'Er': 'kennt', 'Sie (sie)': 'kennt', 'Wir': 'kennen', 'Ihr': 'kennt', 'Sie': 'kennen' },
      meaning: 'know/knows'
    },
    {
      id: 'suchen',
      name: 'suchen (to look for)',
      conjugations: { 'Ich': 'suche', 'Du': 'suchst', 'Er': 'sucht', 'Sie (sie)': 'sucht', 'Wir': 'suchen', 'Ihr': 'sucht', 'Sie': 'suchen' },
      meaning: 'look/looks for'
    },
    {
      id: 'besuchen',
      name: 'besuchen (to visit)',
      conjugations: { 'Ich': 'besuche', 'Du': 'besuchst', 'Er': 'besucht', 'Sie (sie)': 'besucht', 'Wir': 'besuchen', 'Ihr': 'besucht', 'Sie': 'besuchen' },
      meaning: 'visit/visits'
    },
    {
      id: 'anrufen',
      name: 'anrufen (to call - separable!)',
      conjugations: { 'Ich': 'rufe', 'Du': 'rufst', 'Er': 'ruft', 'Sie (sie)': 'ruft', 'Wir': 'rufen', 'Ihr': 'ruft', 'Sie': 'rufen' },
      isSeparable: true,
      suffix: 'später an',
      meaning: 'call/calls (later)'
    }
  ];

  const selectedVerbObj = labVerbs.find(v => v.conjugations[labSubject] === labVerb) || labVerbs[1];
  const activeConjugatedVerb = selectedVerbObj.conjugations[labSubject] || 'mag';

  const labObjects = [
    { label: 'mich (me)', val: 'mich', meaning: 'me' },
    { label: 'dich (you)', val: 'dich', meaning: 'you' },
    { label: 'ihn (him)', val: 'ihn', meaning: 'him' },
    { label: 'sie (her)', val: 'sie', meaning: 'her' },
    { label: 'es (it)', val: 'es', meaning: 'it' },
    { label: 'uns (us)', val: 'uns', meaning: 'us' },
    { label: 'euch (you all)', val: 'euch', meaning: 'you all' },
    { label: 'Sie (you formal)', val: 'Sie', meaning: 'you (formal)' }
  ];

  const constructedGerman = selectedVerbObj.isSeparable
    ? `${labSubject === 'Sie (sie)' ? 'Sie' : labSubject} ${activeConjugatedVerb} ${labObject} ${selectedVerbObj.suffix}!`
    : `${labSubject === 'Sie (sie)' ? 'Sie' : labSubject} ${activeConjugatedVerb} ${labObject}.`;

  const selectedObjItem = labObjects.find(o => o.val === labObject) || labObjects[1];
  const constructedEnglish = `${labSubject === 'Sie (sie)' ? 'She' : labSubject === 'Sie' ? 'You' : labSubject} ${selectedVerbObj.meaning} ${selectedObjItem.meaning}.`;

  return (
    <div className="space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 rounded-3xl shadow-xl border-4 border-emerald-400/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Lesson 30 Interactive Studio • Slides 1–25
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
              <span>Personalpronomen im Akkusativ</span>
              <span className="text-2xl">🔄</span>
            </h2>
            <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
              When a person or thing is the <strong>direct target/receiver</strong> of an action, their pronoun transforms! Master the <strong>5 Changers</strong> and the <strong>3 Unchanging Twins</strong> with zero headache.
            </p>
          </div>
          <button
            onClick={() => speakGerman("Personalpronomen im Akkusativ. ich wird mich, du wird dich, er wird ihn, wir wird uns, ihr wird euch. sie, es und Sie bleiben gleich.", isSlowMode)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 font-bold rounded-2xl shadow-lg transition-all"
          >
            <Volume2 className="w-5 h-5 text-emerald-600" />
            <span>Hear Overview</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
        <button
          onClick={() => setActiveTab('stories')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'stories'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Character Stories (Slides 2–23)</span>
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'matrix'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>2. At a Glance Matrix (Slide 24)</span>
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'builder'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>3. Hit Phrases & Sentence Lab (Slide 25)</span>
        </button>
      </div>

      {/* TAB 1: CHARACTER STORIES */}
      {activeTab === 'stories' && (
        <div className="space-y-6 animate-fade-in">
          {/* Quick Select Carousel */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {stories.map((story, idx) => {
              const isSelected = selectedStoryIndex === idx;
              return (
                <button
                  key={story.id}
                  onClick={() => {
                    setSelectedStoryIndex(idx);
                    speakGerman(story.introGerman + " " + story.examples[0].german, isSlowMode);
                  }}
                  className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-105 ring-2 ring-emerald-400'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-emerald-50 dark:hover:bg-stone-700'
                  }`}
                >
                  <span className="text-2xl">{story.icon.split(' ')[0]}</span>
                  <span className="text-[11px] font-black truncate w-full">{story.nominativ} ➔ {story.akkusativ}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-100 dark:bg-stone-700 text-stone-500'
                  }`}>
                    {story.gender.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Story Spotlight Card */}
          <div className="p-6 md:p-8 bg-white dark:bg-stone-800 rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-3xl shadow-inner">
                  {currentStory.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {currentStory.slides}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 font-semibold">
                      {currentStory.gender}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-stone-900 dark:text-white">
                    {currentStory.title}
                  </h3>
                </div>
              </div>

              {/* Transformation Badge */}
              <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-700/60 px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-600">
                <div className="text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Nominativ (Doer)</div>
                  <div className="text-lg font-black text-stone-800 dark:text-stone-200">{currentStory.nominativ}</div>
                  <div className="text-[10px] text-stone-500">({currentStory.nomMeaning})</div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-500 font-bold" />
                <div className="text-center">
                  <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Akkusativ (Receiver)</div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{currentStory.akkusativ}</div>
                  <div className="text-[10px] text-emerald-600/80">({currentStory.akkMeaning})</div>
                </div>
              </div>
            </div>

            {/* Introduction Sentence */}
            <div
              onClick={() => speakGerman(currentStory.introGerman, isSlowMode)}
              className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 cursor-pointer hover:bg-emerald-100/70 transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Context Introduction (Tap to listen)</div>
                <div className="text-lg font-bold text-stone-800 dark:text-stone-100">{currentStory.introGerman}</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 italic">{currentStory.introEnglish}</div>
              </div>
              <Volume2 className="w-6 h-6 text-emerald-600" />
            </div>

            {/* Sentence Breakdown Cards */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Action Sentences with Akkusativ Object:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStory.examples.map((ex, eIdx) => (
                  <div
                    key={eIdx}
                    onClick={() => speakGerman(ex.audio, isSlowMode)}
                    className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-2xl border border-stone-200 dark:border-stone-600 hover:border-emerald-400 cursor-pointer transition-all space-y-3 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                        <span>{ex.german}</span>
                      </div>
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                      "{ex.english}"
                    </div>

                    {/* Grammatical Parts Badge */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-stone-200 dark:border-stone-600 text-center text-[10px]">
                      <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 font-bold">
                        {ex.subject}
                      </div>
                      <div className="p-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-bold">
                        Verb: {ex.verb}
                      </div>
                      <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 font-bold">
                        {ex.object}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Layman Pro-Tip Box */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Memory Secret:</strong> {currentStory.rule}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AT A GLANCE MATRIX & MEMORY DETECTIVE */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Bar */}
          <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Slide 24 Full Matrix • Test Your Reflexes!</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={revealAll}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reveal All</span>
              </button>
              <button
                onClick={hideAll}
                className="px-3.5 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide (Practice Mode)</span>
              </button>
            </div>
          </div>

          {/* Group 1: The 5 Changers */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-black uppercase rounded-full shadow-sm">
                ⚡ The 5 Changers (Action Shifts Form)
              </span>
              <span className="text-xs text-stone-500">Only these 5 pronouns change their letters in Akkusativ!</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {matrixData.filter(d => d.type === 'changed').map((item) => {
                const isRevealed = revealedPronouns[item.nom];
                return (
                  <div
                    key={item.nom}
                    className="p-4 bg-white dark:bg-stone-800 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-700 pb-2">
                      <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Nominativ (Subject)</div>
                        <div className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-1.5">
                          <span>{item.nom}</span>
                          <span className="text-xs font-normal text-stone-400">({item.enNom})</span>
                        </div>
                      </div>
                      <button
                        onClick={() => speakGerman(`${item.nom} wird zu ${item.akk}. Beispiel: ${item.example}`, isSlowMode)}
                        className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 hover:bg-amber-100 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Akkusativ (Object)</div>
                        {isRevealed ? (
                          <div className="text-xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5 animate-scale-in">
                            <span>{item.akk}</span>
                            <span className="text-xs font-normal text-amber-500/80">({item.enAkk})</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleReveal(item.nom)}
                            className="text-xs px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold rounded-lg hover:bg-amber-200"
                          >
                            ❓ Tap to Reveal
                          </button>
                        )}
                      </div>
                      <span className="text-xs font-mono text-stone-400 italic">
                        "{item.example}"
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 2: The 3 Unchanging Twins */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-teal-600 text-white text-xs font-black uppercase rounded-full shadow-sm">
                🛡️ The 3 Unchanging Twins (Stay 100% Identical)
              </span>
              <span className="text-xs text-stone-500">Zero changes to memorize — identical in Nominativ & Akkusativ!</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {matrixData.filter(d => d.type === 'identical').map((item) => {
                const isRevealed = revealedPronouns[item.nom];
                return (
                  <div
                    key={item.nom}
                    className="p-4 bg-white dark:bg-stone-800 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-700 pb-2">
                      <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Nominativ</div>
                        <div className="text-lg font-black text-stone-900 dark:text-white">
                          {item.nom}
                        </div>
                      </div>
                      <button
                        onClick={() => speakGerman(`${item.nom} bleibt ${item.akk}. Beispiel: ${item.example}`, isSlowMode)}
                        className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 hover:bg-teal-100 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase">Akkusativ</div>
                        {isRevealed ? (
                          <div className="text-lg font-black text-teal-600 dark:text-teal-400 flex items-center gap-1 animate-scale-in">
                            <span>{item.akk}</span>
                            <span className="text-[10px] bg-teal-100 dark:bg-teal-900 px-1.5 py-0.5 rounded text-teal-800 dark:text-teal-200 font-bold">Same!</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleReveal(item.nom)}
                            className="text-xs px-2.5 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-bold rounded-lg hover:bg-teal-200"
                          >
                            ❓ Tap to Reveal
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-stone-400 italic">
                        "{item.example}"
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIT PHRASES & DYNAMIC SENTENCE LAB */}
      {activeTab === 'builder' && (
        <div className="space-y-8 animate-fade-in">
          {/* Slide 25 Common Sentences Wall */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Slide 25 Hit Phrases (High-Frequency Daily Sentences):</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { german: "Ich sehe dich.", english: "I see you.", icon: "👀", highlight: "dich (you)" },
                { german: "Ich mag dich.", english: "I like you.", icon: "❤️", highlight: "dich (you)" },
                { german: "Sie besucht ihn.", english: "She visits him.", icon: "🏡", highlight: "ihn (him)" },
                { german: "Entschuldigen Sie mich, bitte!", english: "Excuse me, please!", icon: "🙏", highlight: "mich (me)" },
                { german: "Ich rufe dich später an!", english: "I will call you later!", icon: "📞", highlight: "dich (separable anrufen)" }
              ].map((phrase, pIdx) => (
                <div
                  key={pIdx}
                  onClick={() => speakGerman(phrase.german, isSlowMode)}
                  className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-emerald-500 hover:shadow-lg cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{phrase.icon}</span>
                    <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <div className="text-base font-black text-stone-900 dark:text-white">
                    {phrase.german}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                    "{phrase.english}"
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                    Target: {phrase.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Interactive Sentence Generator */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl shadow-2xl border-4 border-emerald-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-700 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Interactive Grammar Lab</span>
                <h3 className="text-xl md:text-2xl font-black">Build Any Accusative Sentence</h3>
              </div>
              <button
                onClick={() => {
                  setLabSubject('Ich');
                  setLabVerb('mag');
                  setLabObject('dich');
                }}
                className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* 3 Selection Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Subject (Nominativ) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-300 uppercase">1. Subject (The Doer):</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {labSubjects.map((s) => (
                    <button
                      key={s.val}
                      onClick={() => setLabSubject(s.val)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        labSubject === s.val
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Verb */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-300 uppercase">2. Verb (The Action):</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {labVerbs.map((v) => {
                    const isSelected = selectedVerbObj.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setLabVerb(v.conjugations[labSubject] || 'mag')}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Object (Akkusativ Pronoun) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-300 uppercase">3. Object (The Receiver):</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {labObjects.map((o) => (
                    <button
                      key={o.val}
                      onClick={() => setLabObject(o.val)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        labObject === o.val
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Result Generator Bar */}
            <div
              onClick={() => speakGerman(constructedGerman, isSlowMode)}
              className="p-5 bg-stone-800/90 rounded-2xl border-2 border-emerald-400 cursor-pointer hover:bg-stone-800 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg group"
            >
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Your Generated German Sentence (Tap to Listen):
                </div>
                <div className="text-xl md:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                  {constructedGerman}
                </div>
                <div className="text-xs text-stone-400 italic">
                  "{constructedEnglish}"
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 group-hover:bg-emerald-500 rounded-xl font-bold text-xs shadow-md transition-all shrink-0">
                <Volume2 className="w-4 h-4" />
                <span>Hear Sentence</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
