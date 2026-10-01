import React, { useState } from 'react';
import { Volume2, Sparkles, Gift, Heart, User, Users, ArrowRight, Lightbulb, CheckCircle, RefreshCw, Eye, EyeOff, ShieldCheck, Zap, Handshake, ShoppingBag } from 'lucide-react';
import { LESSON_31_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson31DativStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('stories');

  // TAB 1: Selected Scenario
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  const scenarios = [
    {
      id: 'mother-dress',
      slides: 'Slide 4, 5',
      title: 'Mother Buying a Dress for Daughter',
      gender: 'Feminine Receiver (die ➔ der)',
      icon: '👗 👩‍👧',
      color: 'rose',
      german: 'Die Mutter kauft der Tochter ein Kleid.',
      english: 'The mother buys a dress for the daughter.',
      question: 'Wem kauft die Mutter ein Kleid? ➔ Der Tochter.',
      breakdown: {
        subject: { text: 'Die Mutter', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'kauft', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'der Tochter', role: 'Indirektes Objekt (Dativ - Receiver)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'ein Kleid', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Feminine "die Tochter" flips to "der Tochter" because she is receiving the lovely dress!'
    },
    {
      id: 'petra-soup',
      slides: 'Slide 7',
      title: 'Petra Cooking Soup for Husband',
      gender: 'Masculine Receiver (der ➔ dem)',
      icon: '🍲 👨',
      color: 'blue',
      german: 'Petra kocht dem Mann eine Suppe.',
      english: 'Petra is cooking soup for the husband.',
      question: 'Wem kocht Petra eine Suppe? ➔ Dem Mann.',
      breakdown: {
        subject: { text: 'Petra', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'kocht', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'dem Mann', role: 'Indirektes Objekt (Dativ - Receiver)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'eine Suppe', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Masculine "der Mann" becomes "dem Mann" with the distinctive "-m" ending!'
    },
    {
      id: 'gift-man',
      slides: 'Slide 9',
      title: 'Bringing a Gift to the Man',
      gender: 'Masculine Definite (der ➔ dem)',
      icon: '🎁 👨‍💼',
      color: 'blue',
      german: 'Er bringt dem Mann ein Geschenk.',
      english: 'He brings the man a gift.',
      question: 'Wem bringt er ein Geschenk? ➔ Dem Mann.',
      breakdown: {
        subject: { text: 'Er', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'bringt', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'dem Mann', role: 'Indirektes Objekt (Dativ - Receiver)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'ein Geschenk', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Definite masculine article "der" becomes "dem".'
    },
    {
      id: 'gift-woman',
      slides: 'Slide 10',
      title: 'Bringing a Gift to the Woman',
      gender: 'Feminine Definite (die ➔ der)',
      icon: '🎁 👩‍💼',
      color: 'rose',
      german: 'Er bringt der Frau ein Geschenk.',
      english: 'He brings the woman a gift.',
      question: 'Wem bringt er ein Geschenk? ➔ Der Frau.',
      breakdown: {
        subject: { text: 'Er', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'bringt', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'der Frau', role: 'Indirektes Objekt (Dativ - Receiver)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'ein Geschenk', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Definite feminine article "die" becomes "der".'
    },
    {
      id: 'gift-child',
      slides: 'Slide 11',
      title: 'Bringing a Gift to the Child',
      gender: 'Neuter Definite (das ➔ dem)',
      icon: '🎁 🧒',
      color: 'teal',
      german: 'Er bringt dem Kind ein Geschenk.',
      english: 'He brings the child a gift.',
      question: 'Wem bringt er ein Geschenk? ➔ Dem Kind.',
      breakdown: {
        subject: { text: 'Er', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'bringt', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'dem Kind', role: 'Indirektes Objekt (Dativ - Receiver)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'ein Geschenk', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Neuter "das Kind" is the twin of masculine and becomes "dem Kind"!'
    },
    {
      id: 'gift-children',
      slides: 'Slide 12',
      title: 'Bringing a Gift to the Children',
      gender: 'Plural Definite (die ➔ den + n)',
      icon: '🎁 👶👧',
      color: 'amber',
      german: 'Er bringt den Kindern ein Geschenk.',
      english: 'He brings the children a gift.',
      question: 'Wem bringt er ein Geschenk? ➔ Den Kindern.',
      breakdown: {
        subject: { text: 'Er', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'bringt', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'den Kindern', role: 'Indirektes Objekt (Dativ - Plural +n)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'ein Geschenk', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Plural Dativ: Article changes to "den" AND the noun adds "+n" (die Kinder ➔ den Kindern)!'
    },
    {
      id: 'flowers-guest',
      slides: 'Slide 15',
      title: 'Giving Flowers to a Guest',
      gender: 'Masculine Indefinite (ein ➔ einem)',
      icon: '💐 🤵',
      color: 'indigo',
      german: 'Sie gibt einem Gast Blumen.',
      english: 'She gives a guest flowers.',
      question: 'Wem gibt sie Blumen? ➔ Einem Gast.',
      breakdown: {
        subject: { text: 'Sie', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'gibt', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'einem Gast', role: 'Indirektes Objekt (Dativ - einem)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'Blumen', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Indefinite masculine "ein" becomes "einem" (matches "dem").'
    },
    {
      id: 'flowers-woman',
      slides: 'Slide 16',
      title: 'Giving Flowers to a Woman',
      gender: 'Feminine Indefinite (eine ➔ einer)',
      icon: '💐 👩',
      color: 'rose',
      german: 'Sie gibt einer Frau Blumen.',
      english: 'She gives a woman flowers.',
      question: 'Wem gibt sie Blumen? ➔ Einer Frau.',
      breakdown: {
        subject: { text: 'Sie', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'gibt', role: 'Verb (Action)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'einer Frau', role: 'Indirektes Objekt (Dativ - einer)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: 'Blumen', role: 'Direktes Objekt (Akkusativ - Gift)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' }
      },
      rule: 'Indefinite feminine "eine" becomes "einer" (matches "der").'
    },
    {
      id: 'thanks-man',
      slides: 'Slide 21',
      title: 'Expressing Gratitude to the Man',
      gender: 'Dative Verb (danken + Dativ)',
      icon: '🤝 👨',
      color: 'sky',
      german: 'Sie dankt dem Mann.',
      english: 'She thanks the man.',
      question: 'Wem dankt sie? ➔ Dem Mann.',
      breakdown: {
        subject: { text: 'Sie', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'dankt', role: 'Dativ-Verb (Demands Dativ)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'dem Mann', role: 'Dativ-Objekt (dem Mann)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: '-', role: 'Kein Akkusativ nötig', color: 'bg-stone-100 dark:bg-stone-800 text-stone-400' }
      },
      rule: 'The verb "danken" is a pure Dative verb and always takes Dativ ("Sie dankt dem Mann")!'
    },
    {
      id: 'help-woman',
      slides: 'Slide 22',
      title: 'Helping the Elderly Woman',
      gender: 'Dative Verb (helfen + Dativ)',
      icon: '👵 🚶‍♂️',
      color: 'emerald',
      german: 'Er hilft der Frau.',
      english: 'He helps the woman.',
      question: 'Wem hilft er? ➔ Der Frau.',
      breakdown: {
        subject: { text: 'Er', role: 'Subjekt (Nominativ - Doer)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200' },
        verb: { text: 'hilft', role: 'Dativ-Verb (Demands Dativ)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' },
        dative: { text: 'der Frau', role: 'Dativ-Objekt (der Frau)', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-2 ring-purple-400' },
        accusative: { text: '-', role: 'Kein Akkusativ nötig', color: 'bg-stone-100 dark:bg-stone-800 text-stone-400' }
      },
      rule: 'The verb "helfen" is another classic Dative verb ("Er hilft der Frau")!'
    }
  ];

  const currentScenario = scenarios[selectedScenarioIndex];

  // TAB 2: Master Matrix state
  const [revealedMatrix, setRevealedMatrix] = useState({});

  const matrixRows = [
    { gender: 'Maskulin (der)', def: 'dem', indef: 'einem', neg: 'keinem', ending: '-m', sound: 'deM / eineM / keineM', ex: 'dem Mann / einem Gast / keinem Freund' },
    { gender: 'Feminin (die)', def: 'der', indef: 'einer', neg: 'keiner', ending: '-r', sound: 'deR / eineR / keineR', ex: 'der Frau / einer Tochter / keiner Person' },
    { gender: 'Neutral (das)', def: 'dem', indef: 'einem', neg: 'keinem', ending: '-m', sound: 'deM / eineM / keineM', ex: 'dem Kind / einem Baby / keinem Kind' },
    { gender: 'Plural (die)', def: 'den + n', indef: '- + n', neg: 'keinen + n', ending: '-n (+n)', sound: 'deN / keineN (+n)', ex: 'den Kindern / Blumen / keinen Gästen' }
  ];

  const toggleRow = (idx) => {
    setRevealedMatrix(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const revealAllMatrix = () => {
    const all = {};
    matrixRows.forEach((_, idx) => { all[idx] = true; });
    setRevealedMatrix(all);
    playChime();
  };

  const hideAllMatrix = () => {
    setRevealedMatrix({});
  };

  // TAB 3: Sentence Builder Lab
  const [labSubject, setLabSubject] = useState('Die Mutter');
  const [labVerbType, setLabVerbType] = useState('kaufen');
  const [labReceiver, setLabReceiver] = useState('der Tochter');
  const [labGift, setLabGift] = useState('ein Kleid');

  const labSubjects = [
    'Die Mutter',
    'Petra',
    'Er',
    'Sie',
    'Der Vater',
    'Ich',
    'Wir'
  ];

  const labVerbs = [
    { id: 'kaufen', name: 'kaufen (to buy)', verb: 'kauft', isPureDative: false, meaning: 'buys' },
    { id: 'bringen', name: 'bringen (to bring)', verb: 'bringt', isPureDative: false, meaning: 'brings' },
    { id: 'geben', name: 'geben (to give)', verb: 'gibt', isPureDative: false, meaning: 'gives' },
    { id: 'kochen', name: 'kochen (to cook)', verb: 'kocht', isPureDative: false, meaning: 'cooks' },
    { id: 'danken', name: 'danken (to thank)', verb: 'dankt', isPureDative: true, meaning: 'thanks' },
    { id: 'helfen', name: 'helfen (to help)', verb: 'hilft', isPureDative: true, meaning: 'helps' }
  ];

  const labReceivers = [
    { label: 'dem Mann (the man - Masc)', val: 'dem Mann', meaning: 'the man' },
    { label: 'der Frau (the woman - Fem)', val: 'der Frau', meaning: 'the woman' },
    { label: 'der Tochter (the daughter - Fem)', val: 'der Tochter', meaning: 'the daughter' },
    { label: 'dem Kind (the child - Neut)', val: 'dem Kind', meaning: 'the child' },
    { label: 'den Kindern (the children - Pl)', val: 'den Kindern', meaning: 'the children' },
    { label: 'einem Gast (a guest - Masc)', val: 'einem Gast', meaning: 'a guest' },
    { label: 'einer Freundin (a friend - Fem)', val: 'einer Freundin', meaning: 'a friend' }
  ];

  const labGifts = [
    { label: 'ein Kleid (a dress)', val: 'ein Kleid', meaning: 'a dress' },
    { label: 'ein Geschenk (a gift)', val: 'ein Geschenk', meaning: 'a gift' },
    { label: 'eine Suppe (a soup)', val: 'eine Suppe', meaning: 'a soup' },
    { label: 'Blumen (flowers)', val: 'Blumen', meaning: 'flowers' },
    { label: 'einen Kaffee (a coffee)', val: 'einen Kaffee', meaning: 'a coffee' }
  ];

  const selectedVerbObj = labVerbs.find(v => v.id === labVerbType) || labVerbs[0];
  const constructedSentence = selectedVerbObj.isPureDative
    ? `${labSubject} ${selectedVerbObj.verb} ${labReceiver}.`
    : `${labSubject} ${selectedVerbObj.verb} ${labReceiver} ${labGift}.`;

  const receiverObj = labReceivers.find(r => r.val === labReceiver) || labReceivers[0];
  const giftObj = labGifts.find(g => g.val === labGift) || labGifts[0];
  const constructedEnglish = selectedVerbObj.isPureDative
    ? `${labSubject} ${selectedVerbObj.meaning} ${receiverObj.meaning}.`
    : `${labSubject} ${selectedVerbObj.meaning} ${giftObj.meaning} for ${receiverObj.meaning}.`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 text-white p-6 rounded-3xl shadow-xl border-4 border-purple-400/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Lesson 31 Interactive Studio • Slides 1–23
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
              <span>Artikel im Dativ (The Gift Receiver Case)</span>
              <span className="text-2xl">🎁</span>
            </h2>
            <p className="text-purple-100 text-sm max-w-2xl leading-relaxed">
              Whenever a person receives something (gifts, clothes, help, soup), they enter the <strong>Dative case</strong>! Remember the easy <strong>M-R-M-N</strong> pattern: <em>dem, der, dem, den (+n)</em>!
            </p>
          </div>
          <button
            onClick={() => speakGerman("Artikel im Dativ. dem Mann, der Frau, dem Kind, den Kindern. einem Gast, einer Frau, einem Kind. Die Mutter kauft der Tochter ein Kleid. Petra kocht dem Mann eine Suppe.", isSlowMode)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-purple-900 hover:bg-purple-50 active:scale-95 font-bold rounded-2xl shadow-lg transition-all"
          >
            <Volume2 className="w-5 h-5 text-purple-700" />
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
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>1. The Gift & Receiver Walkthrough (Slides 4–22)</span>
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'matrix'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>2. Master M-R-M-N Matrix (Slide 23)</span>
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'builder'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <Handshake className="w-4 h-4" />
          <span>3. Dativ Sentence Builder & Verb Lab</span>
        </button>
      </div>

      {/* TAB 1: SCENARIO WALKTHROUGH */}
      {activeTab === 'stories' && (
        <div className="space-y-6 animate-fade-in">
          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {scenarios.map((sc, idx) => {
              const isSelected = selectedScenarioIndex === idx;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenarioIndex(idx);
                    speakGerman(sc.german, isSlowMode);
                  }}
                  className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-purple-700 text-white border-purple-800 shadow-md scale-105 ring-2 ring-purple-400'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-purple-50 dark:hover:bg-stone-700'
                  }`}
                >
                  <span className="text-2xl">{sc.icon.split(' ')[0]}</span>
                  <span className="text-[11px] font-bold truncate w-full">{sc.title.split(' ')[0]}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-purple-900 text-purple-100' : 'bg-stone-100 dark:bg-stone-700 text-stone-500'
                  }`}>
                    {sc.gender.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Spotlight Card */}
          <div className="p-6 md:p-8 bg-white dark:bg-stone-800 rounded-3xl border-2 border-purple-200 dark:border-purple-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-3xl shadow-inner">
                  {currentScenario.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      {currentScenario.slides}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 font-semibold">
                      {currentScenario.gender}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-stone-900 dark:text-white">
                    {currentScenario.title}
                  </h3>
                </div>
              </div>

              {/* Question Hook */}
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-900 dark:text-purple-200">
                <span>Frage: </span>
                <span className="text-purple-700 dark:text-purple-300 italic">{currentScenario.question}</span>
              </div>
            </div>

            {/* Clickable Full Sentence */}
            <div
              onClick={() => speakGerman(currentScenario.german, isSlowMode)}
              className="p-5 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-stone-800 dark:to-purple-950/30 rounded-2xl border-2 border-purple-300 dark:border-purple-700 cursor-pointer hover:border-purple-500 transition-all flex items-center justify-between shadow-sm group"
            >
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Full Sentence (Tap to Listen):
                </div>
                <div className="text-xl md:text-2xl font-black text-stone-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {currentScenario.german}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                  "{currentScenario.english}"
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Volume2 className="w-5 h-5" />
              </div>
            </div>

            {/* 4-Box Sentence Dissection */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Grammar Roles Dissection (Slide 5 Architecture):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {/* 1. Subject */}
                <div className={`p-4 rounded-2xl border border-blue-200 dark:border-blue-800 ${currentScenario.breakdown.subject.color} space-y-1 text-center`}>
                  <div className="text-[10px] uppercase font-bold">1. Doer (Subject)</div>
                  <div className="text-lg font-black">{currentScenario.breakdown.subject.text}</div>
                  <div className="text-[10px] opacity-80">Nominativ</div>
                </div>

                {/* 2. Verb */}
                <div className={`p-4 rounded-2xl border border-amber-200 dark:border-amber-800 ${currentScenario.breakdown.verb.color} space-y-1 text-center`}>
                  <div className="text-[10px] uppercase font-bold">2. Action (Verb)</div>
                  <div className="text-lg font-black">{currentScenario.breakdown.verb.text}</div>
                  <div className="text-[10px] opacity-80">Conjugated Verb</div>
                </div>

                {/* 3. Dative Receiver */}
                <div className={`p-4 rounded-2xl border border-purple-300 dark:border-purple-700 ${currentScenario.breakdown.dative.color} space-y-1 text-center shadow-md`}>
                  <div className="text-[10px] uppercase font-black text-purple-700 dark:text-purple-300">3. Receiver (Dativ) 🎁</div>
                  <div className="text-lg font-black text-purple-900 dark:text-purple-100">{currentScenario.breakdown.dative.text}</div>
                  <div className="text-[10px] font-bold opacity-90">Indirektes Objekt</div>
                </div>

                {/* 4. Accusative Gift */}
                <div className={`p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 ${currentScenario.breakdown.accusative.color} space-y-1 text-center`}>
                  <div className="text-[10px] uppercase font-bold">4. The Gift / Thing</div>
                  <div className="text-lg font-black">{currentScenario.breakdown.accusative.text}</div>
                  <div className="text-[10px] opacity-80">Akkusativ Objekt</div>
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-3">
              <Zap className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong>Rule in Plain English:</strong> {currentScenario.rule}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER M-R-M-N MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Bar */}
          <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span>Slide 23 Master Chart • The M - R - M - N Pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={revealAllMatrix}
                className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reveal All</span>
              </button>
              <button
                onClick={hideAllMatrix}
                className="px-3.5 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide (Practice Mode)</span>
              </button>
            </div>
          </div>

          {/* Master Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matrixRows.map((row, rIdx) => {
              const isRevealed = revealedMatrix[rIdx];
              return (
                <div
                  key={row.gender}
                  className="p-5 bg-white dark:bg-stone-800 rounded-2xl border-2 border-purple-200 dark:border-purple-800/80 shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-700 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 text-xs font-black rounded-full">
                        {row.gender}
                      </span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        Ending: {row.ending}
                      </span>
                    </div>
                    <button
                      onClick={() => speakGerman(`${row.gender} im Dativ: ${row.def}, ${row.indef}, ${row.neg}. Beispiel: ${row.ex}`, isSlowMode)}
                      className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 3 Forms Comparison */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {/* Definite */}
                    <div className="p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-200 dark:border-stone-600 space-y-1">
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Definite (the)</div>
                      {isRevealed ? (
                        <div className="text-base font-black text-purple-700 dark:text-purple-300 animate-scale-in">{row.def}</div>
                      ) : (
                        <button onClick={() => toggleRow(rIdx)} className="text-[11px] font-bold text-purple-600 underline">Tap</button>
                      )}
                    </div>

                    {/* Indefinite */}
                    <div className="p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-200 dark:border-stone-600 space-y-1">
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Indefinite (a)</div>
                      {isRevealed ? (
                        <div className="text-base font-black text-indigo-700 dark:text-indigo-300 animate-scale-in">{row.indef}</div>
                      ) : (
                        <button onClick={() => toggleRow(rIdx)} className="text-[11px] font-bold text-indigo-600 underline">Tap</button>
                      )}
                    </div>

                    {/* Negative */}
                    <div className="p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-200 dark:border-stone-600 space-y-1">
                      <div className="text-[10px] font-bold text-stone-400 uppercase">Negative (no)</div>
                      {isRevealed ? (
                        <div className="text-base font-black text-rose-600 dark:text-rose-400 animate-scale-in">{row.neg}</div>
                      ) : (
                        <button onClick={() => toggleRow(rIdx)} className="text-[11px] font-bold text-rose-600 underline">Tap</button>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                    Example: "{row.ex}"
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plural +n Special Rule Callout */}
          <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl shadow-lg flex items-start gap-4">
            <div className="text-3xl">⚠️</div>
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-wider">The Dative Plural "+n" Secret Rule:</h4>
              <p className="text-xs text-amber-100 leading-relaxed">
                In Dative Plural, the article is ALWAYS <strong>den</strong> / <strong>keinen</strong>, AND the noun itself gets an extra <strong>+n</strong> at the end (e.g. <em>die Kinder ➔ den Kinder<strong>n</strong></em>, <em>die Gäste ➔ den Gäste<strong>n</strong></em>), unless the noun already ends in <em>-n</em> or <em>-s</em>!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DATIV SENTENCE BUILDER & VERB LAB */}
      {activeTab === 'builder' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 bg-gradient-to-br from-stone-900 via-stone-800 to-purple-950 text-white rounded-3xl shadow-2xl border-4 border-purple-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-700 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Interactive Grammar Lab</span>
                <h3 className="text-xl md:text-2xl font-black">Build Any Dative Sentence</h3>
              </div>
              <button
                onClick={() => {
                  setLabSubject('Die Mutter');
                  setLabVerbType('kaufen');
                  setLabReceiver('der Tochter');
                  setLabGift('ein Kleid');
                }}
                className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 1. Subject */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-300 uppercase">1. Doer (Subject):</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {labSubjects.map((s) => (
                    <button
                      key={s}
                      onClick={() => setLabSubject(s)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        labSubject === s
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Verb */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-300 uppercase">2. Verb (Action):</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {labVerbs.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setLabVerbType(v.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        labVerbType === v.id
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Dative Receiver */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-300 uppercase">3. Receiver (Dativ):</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {labReceivers.map((r) => (
                    <button
                      key={r.val}
                      onClick={() => setLabReceiver(r.val)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        labReceiver === r.val
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Accusative Gift (Disabled if pure dative verb) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-300 uppercase">
                  4. Gift (Akkusativ):
                </label>
                {selectedVerbObj.isPureDative ? (
                  <div className="p-3 bg-stone-800/50 rounded-xl border border-stone-700 text-xs text-stone-400 italic">
                    "{selectedVerbObj.name}" is a pure Dative verb; no gift object needed!
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {labGifts.map((g) => (
                      <button
                        key={g.val}
                        onClick={() => setLabGift(g.val)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          labGift === g.val
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Generated Output Banner */}
            <div
              onClick={() => speakGerman(constructedSentence, isSlowMode)}
              className="p-5 bg-stone-800/90 rounded-2xl border-2 border-purple-400 cursor-pointer hover:bg-stone-800 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg group"
            >
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Your Generated Dativ Sentence (Tap to Listen):
                </div>
                <div className="text-xl md:text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                  {constructedSentence}
                </div>
                <div className="text-xs text-stone-400 italic">
                  "{constructedEnglish}"
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 group-hover:bg-purple-500 rounded-xl font-bold text-xs shadow-md transition-all shrink-0">
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
