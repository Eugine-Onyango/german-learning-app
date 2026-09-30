import React, { useState } from 'react';
import { Volume2, Sparkles, User, Users, ShieldCheck, AlertCircle, HelpCircle, ArrowRight, Lightbulb, Play, CheckCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson23PossessiveStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedPerson, setSelectedPerson] = useState('ich');

  const PERSONS = [
    {
      id: 'ich',
      pronoun: 'ich',
      en: 'I',
      possessiveBase: 'mein',
      possessiveFem: 'meine',
      avatar: '🙋‍♂️',
      name: 'Peter (Hamburg)',
      intro: 'Hi, ich bin Peter. Ich komme aus Hamburg.',
      question: false,
      color: 'from-amber-500 to-orange-600',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'du',
      pronoun: 'du',
      en: 'you (informal)',
      possessiveBase: 'dein',
      possessiveFem: 'deine',
      avatar: '👉',
      name: 'Freund (Friend)',
      intro: 'Wie heißt du? Woher kommst du?',
      question: true,
      color: 'from-blue-500 to-cyan-600',
      badgeClass: 'bg-blue-100 text-blue-900 border-blue-300'
    },
    {
      id: 'er',
      pronoun: 'er',
      en: 'he',
      possessiveBase: 'sein',
      possessiveFem: 'seine',
      avatar: '👦',
      name: 'Peter (Berlin)',
      intro: 'Das ist Peter. Er kommt aus Berlin.',
      question: false,
      color: 'from-emerald-500 to-teal-600',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      id: 'sie_sing',
      pronoun: 'sie',
      en: 'she',
      possessiveBase: 'ihr',
      possessiveFem: 'ihre',
      avatar: '👩',
      name: 'Julia (Frankfurt)',
      intro: 'Das ist Julia. Sie kommt aus Frankfurt.',
      question: false,
      color: 'from-rose-500 to-pink-600',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300'
    },
    {
      id: 'es',
      pronoun: 'es',
      en: 'it (child/neut)',
      possessiveBase: 'sein',
      possessiveFem: 'seine',
      avatar: '🧒',
      name: 'Ein Kind (5 Jahre alt)',
      intro: 'Das ist ein Kind. Es ist 5 Jahre alt.',
      question: false,
      color: 'from-amber-600 to-yellow-600',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'wir',
      pronoun: 'wir',
      en: 'we',
      possessiveBase: 'unser',
      possessiveFem: 'unsere',
      avatar: '👨‍👩‍👧‍👦',
      name: 'Eine Familie',
      intro: 'Wir sind eine Familie.',
      question: false,
      color: 'from-indigo-500 to-blue-600',
      badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-300'
    },
    {
      id: 'ihr',
      pronoun: 'ihr',
      en: 'you all (informal)',
      possessiveBase: 'euer',
      possessiveFem: 'eure',
      avatar: '👥',
      name: 'Freunde Gruppe',
      intro: 'Wie heißt ihr? Woher kommt ihr?',
      question: true,
      dropE: true,
      color: 'from-purple-500 to-violet-600',
      badgeClass: 'bg-purple-100 text-purple-900 border-purple-300'
    },
    {
      id: 'Sie_formal',
      pronoun: 'Sie',
      en: 'You (formal)',
      possessiveBase: 'Ihr',
      possessiveFem: 'Ihre',
      avatar: '👔',
      name: 'Herr Müller / Team',
      intro: 'Sind Sie Herr Müller? / Sind Sie ein Team?',
      question: true,
      capitalized: true,
      color: 'from-teal-600 to-emerald-700',
      badgeClass: 'bg-teal-100 text-teal-900 border-teal-300'
    },
    {
      id: 'sie_pl',
      pronoun: 'sie (Plural)',
      en: 'they',
      possessiveBase: 'ihr',
      possessiveFem: 'ihre',
      avatar: '👫',
      name: 'Ein Paar',
      intro: 'Das ist ein Paar. Sie wohnen in Deutschland.',
      question: false,
      color: 'from-fuchsia-500 to-rose-600',
      badgeClass: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300'
    }
  ];

  const currentPerson = PERSONS.find(p => p.id === selectedPerson) || PERSONS[0];

  const ANCHOR_NOUNS = [
    {
      key: 'fernseher',
      gender: 'maskulin',
      article: 'der (r)',
      noun: 'Fernseher',
      icon: '📺',
      colorClass: 'border-blue-300 bg-blue-50/70 text-blue-950',
      badgeColor: 'bg-blue-600 text-white',
      rule: 'der = base form (no -e)',
      getSentence: (p) => p.question ? `Ist das ${p.possessiveBase} Fernseher?` : `Das ist ${p.possessiveBase} Fernseher.`,
      getEnSentence: (p) => p.question ? `Is this ${p.en === 'you (informal)' ? 'your' : p.en === 'you all (informal)' ? 'your' : p.en === 'You (formal)' ? 'your' : p.en}'s television?` : `This is ${p.en === 'I' ? 'my' : p.en === 'he' ? 'his' : p.en === 'she' ? 'her' : p.en === 'it (child/neut)' ? 'his/its' : p.en === 'we' ? 'our' : 'their'} television.`
    },
    {
      key: 'auto',
      gender: 'neutral',
      article: 'das (s)',
      noun: 'Auto',
      icon: '🚗',
      colorClass: 'border-emerald-300 bg-emerald-50/70 text-emerald-950',
      badgeColor: 'bg-emerald-600 text-white',
      rule: 'das = base form (no -e)',
      getSentence: (p) => p.question ? `Ist das ${p.possessiveBase} Auto?` : `Das ist ${p.possessiveBase} Auto.`,
      getEnSentence: (p) => p.question ? `Is this ${p.en === 'you (informal)' ? 'your' : p.en === 'you all (informal)' ? 'your' : p.en === 'You (formal)' ? 'your' : p.en}'s car?` : `This is ${p.en === 'I' ? 'my' : p.en === 'he' ? 'his' : p.en === 'she' ? 'her' : p.en === 'it (child/neut)' ? 'his/its' : p.en === 'we' ? 'our' : 'their'} car.`
    },
    {
      key: 'katze',
      gender: 'feminin',
      article: 'die (e)',
      noun: 'Katze',
      icon: '🐱',
      colorClass: 'border-rose-300 bg-rose-50/70 text-rose-950',
      badgeColor: 'bg-rose-600 text-white',
      rule: 'die = ALWAYS add -e!',
      getSentence: (p) => p.question ? `Ist das ${p.possessiveFem} Katze?` : `Das ist ${p.possessiveFem} Katze.`,
      getEnSentence: (p) => p.question ? `Is this ${p.en === 'you (informal)' ? 'your' : p.en === 'you all (informal)' ? 'your' : p.en === 'You (formal)' ? 'your' : p.en}'s cat?` : `This is ${p.en === 'I' ? 'my' : p.en === 'he' ? 'his' : p.en === 'she' ? 'her' : p.en === 'it (child/neut)' ? 'his/its' : p.en === 'we' ? 'our' : 'their'} cat.`
    },
    {
      key: 'buecher',
      gender: 'plural',
      article: 'die (e Plural)',
      noun: 'Bücher',
      icon: '📚',
      colorClass: 'border-purple-300 bg-purple-50/70 text-purple-950',
      badgeColor: 'bg-purple-600 text-white',
      rule: 'die Plural = ALWAYS add -e!',
      getSentence: (p) => p.question ? `Sind das ${p.possessiveFem} Bücher?` : `Das sind ${p.possessiveFem} Bücher.`,
      getEnSentence: (p) => p.question ? `Are these ${p.en === 'you (informal)' ? 'your' : p.en === 'you all (informal)' ? 'your' : p.en === 'You (formal)' ? 'your' : p.en}'s books?` : `These are ${p.en === 'I' ? 'my' : p.en === 'he' ? 'his' : p.en === 'she' ? 'her' : p.en === 'it (child/neut)' ? 'his/its' : p.en === 'we' ? 'our' : 'their'} books.`
    }
  ];

  // Slide 29 Master Matrix Data
  const MASTER_TABLE = [
    { pronoun: 'ich', mask: 'mein', neut: 'mein', fem: 'meine', pl: 'meine', en: 'my' },
    { pronoun: 'du', mask: 'dein', neut: 'dein', fem: 'deine', pl: 'deine', en: 'your (informal)' },
    { pronoun: 'er / es', mask: 'sein', neut: 'sein', fem: 'seine', pl: 'seine', en: 'his / its' },
    { pronoun: 'sie (she)', mask: 'ihr', neut: 'ihr', fem: 'ihre', pl: 'ihre', en: 'her' },
    { pronoun: 'wir', mask: 'unser', neut: 'unser', fem: 'unsere', pl: 'unsere', en: 'our' },
    { pronoun: 'ihr (you all)', mask: 'euer', neut: 'euer', fem: 'eure', pl: 'eure', en: 'your (group)', note: 'euer drops inner e -> eure!' },
    { pronoun: 'Sie / Sie', mask: 'Ihr', neut: 'Ihr', fem: 'Ihre', pl: 'Ihre', en: 'Your (formal)', note: 'Always capitalized I!' },
    { pronoun: 'sie (they)', mask: 'ihr', neut: 'ihr', fem: 'ihre', pl: 'ihre', en: 'their' }
  ];

  const handlePlayAudio = (text) => {
    speakGerman(text, isSlowMode);
    playChime();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-teal-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-teal-500/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-400/40 text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Lesson 23 Interactive Studio
            </span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs px-3 py-1 rounded-full font-semibold">
              Slide 1–29 Complete Matrix
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-100 to-amber-200">
            Possessivartikel im Nominativ
          </h2>
          <p className="text-teal-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Learn how native Germans mark ownership with zero fear! See how all possessives follow the exact same rhythm: <span className="text-amber-300 font-bold">der & das take no ending</span>, while <span className="text-pink-300 font-bold">die & Plural always add -e</span>!
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-teal-500 text-teal-950 shadow-md ring-2 ring-teal-300 scale-105'
                  : 'bg-white/10 text-teal-200 hover:bg-white/20'
              }`}
            >
              <span>👥</span>
              <span>Character & 4-Noun Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'table'
                  ? 'bg-teal-500 text-teal-950 shadow-md ring-2 ring-teal-300 scale-105'
                  : 'bg-white/10 text-teal-200 hover:bg-white/20'
              }`}
            >
              <span>📋</span>
              <span>Slide 29 Master Chalkboard</span>
            </button>
            <button
              onClick={() => setActiveTab('detective')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'detective'
                  ? 'bg-teal-500 text-teal-950 shadow-md ring-2 ring-teal-300 scale-105'
                  : 'bg-white/10 text-teal-200 hover:bg-white/20'
              }`}
            >
              <span>🔍</span>
              <span>The "euer/eure" & "ihr" Detective Lab</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Character & 4-Noun Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Character / Person Selector */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-teal-100">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  Select Person / Pronoun
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Tap any person to see how they introduce their TV, car, cat, and books!
                </p>
              </div>
              <span className="text-xs bg-teal-50 text-teal-800 font-semibold px-2.5 py-1 rounded-full border border-teal-200">
                8 Pronoun Roles
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {PERSONS.map((p) => {
                const isSelected = selectedPerson === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPerson(p.id);
                      handlePlayAudio(p.intro);
                    }}
                    className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all border-2 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 shadow-md ring-2 ring-teal-400/50 scale-105'
                        : 'border-stone-200 bg-stone-50/70 hover:bg-teal-50/50 hover:border-teal-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">{p.avatar}</span>
                    <span className="font-extrabold text-sm text-stone-800">{p.pronoun}</span>
                    <span className="text-[11px] text-teal-700 font-bold">{p.possessiveBase} / {p.possessiveFem}</span>
                    <span className="text-[10px] text-stone-400 mt-0.5">{p.en}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Person Banner */}
          <div className={`rounded-3xl p-5 sm:p-6 text-white shadow-lg bg-gradient-to-r ${currentPerson.color} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className="text-4xl sm:text-5xl bg-white/20 p-3 rounded-2xl backdrop-blur-xs">
                {currentPerson.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {currentPerson.pronoun} ({currentPerson.en})
                  </span>
                  {currentPerson.dropE && (
                    <span className="bg-amber-300 text-stone-900 text-xs font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                      ⚡ Drop 'e' trap: eure!
                    </span>
                  )}
                  {currentPerson.capitalized && (
                    <span className="bg-teal-200 text-teal-950 text-xs font-extrabold px-2 py-0.5 rounded-full">
                      👑 Capital I: Ihr/Ihre!
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black">{currentPerson.name}</h3>
                <p className="text-white/90 text-sm font-medium italic">"{currentPerson.intro}"</p>
              </div>
            </div>

            <button
              onClick={() => handlePlayAudio(currentPerson.intro)}
              className="bg-white text-stone-900 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-amber-100 transition-colors shadow-sm flex items-center gap-2 shrink-0 self-end sm:self-center"
            >
              <Volume2 className="w-4 h-4 text-teal-700" />
              <span>Hear Intro</span>
            </button>
          </div>

          {/* The 4 Anchor Noun Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ANCHOR_NOUNS.map((noun) => {
              const sentence = noun.getSentence(currentPerson);
              const enSentence = noun.getEnSentence(currentPerson);

              return (
                <div
                  key={noun.key}
                  className={`rounded-3xl p-5 border-2 ${noun.colorClass} shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{noun.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${noun.badgeColor}`}>
                            {noun.gender}
                          </span>
                          <span className="text-xs font-semibold text-stone-500">{noun.article}</span>
                        </div>
                        <h4 className="font-black text-lg text-stone-900">{noun.noun}</h4>
                      </div>
                    </div>

                    <span className="text-xs bg-white/80 font-bold px-2.5 py-1 rounded-full border border-stone-200 text-stone-700">
                      {noun.rule}
                    </span>
                  </div>

                  {/* German Sentence Box */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-extrabold text-base sm:text-lg text-stone-900 tracking-wide">
                        {sentence}
                      </p>
                      <button
                        onClick={() => handlePlayAudio(sentence)}
                        className="bg-teal-50 hover:bg-teal-100 text-teal-800 p-2 rounded-xl transition-colors shrink-0"
                        title="Play German audio"
                      >
                        <Volume2 className="w-4 h-4 text-teal-700" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 italic">
                      {enSentence}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick takeaway bar */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Golden Rule Takeaway: </span>
              Whether you say <span className="font-bold text-amber-900">mein, dein, sein, ihr, unser, euer, Ihr</span> — masculine (der Fernseher) and neuter (das Auto) NEVER add an ending. Only feminine (die Katze) and plural (die Bücher) add the <span className="font-extrabold text-pink-700">-e</span> ending!
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Slide 29 Master Chalkboard */}
      {activeTab === 'table' && (
        <div className="space-y-6">
          <div className="bg-[#1e2a22] text-white rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-800/40 relative">
            <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-mono tracking-tight">
                    At a glance (Slide 29 Master Matrix)
                  </h3>
                  <p className="text-xs text-stone-300">
                    Tap any word to hear live German pronunciation!
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full font-bold">
                Chalkboard View
              </span>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="border-b-2 border-white/30 text-amber-200 text-xs sm:text-sm font-mono uppercase tracking-wider">
                    <th className="py-2.5 px-3">Pronomen</th>
                    <th className="py-2.5 px-3 text-blue-300">MASK. (der)</th>
                    <th className="py-2.5 px-3 text-rose-300">FEM. (die)</th>
                    <th className="py-2.5 px-3 text-emerald-300">NEUT. (das)</th>
                    <th className="py-2.5 px-3 text-purple-300">PL. (die)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-sans">
                  {MASTER_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-bold text-amber-100 flex flex-col">
                        <span>{row.pronoun}</span>
                        <span className="text-[10px] text-stone-400 font-normal">{row.en}</span>
                      </td>
                      
                      {/* MASKULIN */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.mask)}
                          className="font-bold text-blue-300 hover:text-white hover:bg-blue-900/50 px-2 py-1 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <span>{row.mask}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>

                      {/* FEMININ */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.fem)}
                          className="font-bold text-rose-300 hover:text-white hover:bg-rose-900/50 px-2 py-1 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <span>{row.fem}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>

                      {/* NEUTRAL */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.neut)}
                          className="font-bold text-emerald-300 hover:text-white hover:bg-emerald-900/50 px-2 py-1 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <span>{row.neut}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>

                      {/* PLURAL */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.pl)}
                          className="font-bold text-purple-300 hover:text-white hover:bg-purple-900/50 px-2 py-1 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <span>{row.pl}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Chalkboard Key */}
            <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between text-xs text-stone-300 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  der / das = no ending
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  die / Plural = -e ending
                </span>
              </div>
              <span className="text-amber-300 italic font-mono">
                Slide 29 Reference Table
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Detective Lab ("euer vs eure" and the 3 "ihr") */}
      {activeTab === 'detective' && (
        <div className="space-y-6">
          {/* Slide 23: The euer -> eure Drop-E Trap */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-purple-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 text-purple-800 rounded-2xl">
                <AlertCircle className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  Slide 23 Special Warning (!)
                </span>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  The "euer" Drop-E Spelling Trap: <span className="text-purple-700">euer vs. eure</span>
                </h3>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              When you address a group of buddies (<span className="font-bold text-stone-900">ihr</span>), the base word is <span className="font-bold text-stone-900">euer</span>. But when adding the <span className="font-bold text-pink-700">-e</span> ending for feminine (die Katze) or plural (die Bücher), Germans <strong>drop the middle 'e'</strong> to make speech smooth!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Correct */}
              <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Correct German
                  </span>
                  <button
                    onClick={() => handlePlayAudio("Ist das eure Katze? Sind das eure Bücher?")}
                    className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-lg font-black text-emerald-950 font-mono">
                  e-u-r-e (eure Katze)
                </div>
                <p className="text-xs text-emerald-800">
                  The inner 'e' disappears completely. Easy to pronounce!
                </p>
              </div>

              {/* Incorrect Trap */}
              <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl space-y-2 opacity-85">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-rose-600 text-white font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    ❌ Never Say This
                  </span>
                </div>
                <div className="text-lg font-black text-rose-950 line-through font-mono">
                  e-u-e-r-e (euere Katze)
                </div>
                <p className="text-xs text-rose-800">
                  Too clunky for German tongues! Always write & say <strong>eure</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* The 3 "ihr" Triplets Decoded */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-teal-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-100 text-teal-800 rounded-2xl">
                <HelpCircle className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <span className="bg-teal-100 text-teal-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  Detective Clue
                </span>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  Decoding the 3 "ihr" Triplets in German
                </h3>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              You will see the word <span className="font-bold text-stone-900">ihr</span> in 3 different roles. Here is the effortless way to tell them apart:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 1. Subject Pronoun */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="text-[10px] uppercase font-extrabold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                  1. Subject Pronoun
                </span>
                <h4 className="font-bold text-stone-900 text-sm">ihr = "you all"</h4>
                <p className="text-xs text-stone-600 font-mono">
                  "Woher kommt ihr?"
                </p>
                <p className="text-[11px] text-stone-500">
                  Acts as the doer in the sentence (Position 1 or 3).
                </p>
              </div>

              {/* 2. Possessive: Her / Their */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="text-[10px] uppercase font-extrabold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-md">
                  2. Possessive (Casual)
                </span>
                <h4 className="font-bold text-stone-900 text-sm">ihr / ihre = "her" or "their"</h4>
                <p className="text-xs text-stone-600 font-mono">
                  "Das ist ihr Auto."
                </p>
                <p className="text-[11px] text-stone-500">
                  Lowercase 'i'. Belongs before a noun to show she/they owns it.
                </p>
              </div>

              {/* 3. Possessive: Formal Your */}
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2">
                <span className="text-[10px] uppercase font-extrabold bg-teal-200 text-teal-900 px-2 py-0.5 rounded-md">
                  3. Possessive (Formal)
                </span>
                <h4 className="font-bold text-stone-900 text-sm">Ihr / Ihre = "Your" (Formal)</h4>
                <p className="text-xs text-stone-600 font-mono">
                  "Ist das Ihr Fernseher?"
                </p>
                <p className="text-[11px] text-stone-500">
                  <strong>Capital 'I'</strong>! Used when talking with respect to Herr Müller or a boss.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
