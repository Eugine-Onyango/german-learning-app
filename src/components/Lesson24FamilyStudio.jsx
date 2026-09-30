import React, { useState } from 'react';
import { Volume2, Sparkles, Users, User, Heart, TreePine, ArrowRight, Lightbulb, Play, CheckCircle, Info } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson24FamilyStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('tree');
  const [familySize, setFamilySize] = useState('klein'); // 'klein' or 'gross'
  const [selectedMember, setSelectedMember] = useState(null);

  // Custom family builder state
  const [customMembers, setCustomMembers] = useState({
    vater: true,
    mutter: true,
    bruder: 1,
    schwester: 1,
    opa: true,
    oma: true,
    onkel: false,
    tante: false,
    cousin: false,
    cousine: false,
  });

  const handlePlayAudio = (text) => {
    speakGerman(text, isSlowMode);
    playChime();
  };

  const FAMILY_TREE_NODES = {
    gen1: [
      {
        id: 'grossvater',
        title: 'mein Großvater',
        nickname: 'mein Opa',
        article: 'der (r Großvater)',
        gender: 'maskulin',
        avatar: '👴',
        sentence: 'Das ist mein Großvater. (Das ist mein Opa.)',
        en: 'This is my grandfather (grandpa).',
        badgeColor: 'bg-blue-600 text-white',
        borderClass: 'border-blue-300 bg-blue-50/80 text-blue-950'
      },
      {
        id: 'grossmutter',
        title: 'meine Großmutter',
        nickname: 'meine Oma',
        article: 'die (e Großmutter)',
        gender: 'feminin',
        avatar: '👵',
        sentence: 'Das ist meine Großmutter. (Das ist meine Oma.)',
        en: 'This is my grandmother (grandma).',
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-300 bg-rose-50/80 text-rose-950'
      }
    ],
    gen2_parents: [
      {
        id: 'vater',
        title: 'mein Vater',
        article: 'der (r Vater)',
        gender: 'maskulin',
        avatar: '👨',
        sentence: 'Das ist mein Vater.',
        en: 'This is my father.',
        badgeColor: 'bg-blue-600 text-white',
        borderClass: 'border-blue-300 bg-blue-50/80 text-blue-950'
      },
      {
        id: 'mutter',
        title: 'meine Mutter',
        article: 'die (e Mutter)',
        gender: 'feminin',
        avatar: '👩',
        sentence: 'Das ist meine Mutter.',
        en: 'This is my mother.',
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-300 bg-rose-50/80 text-rose-950'
      }
    ],
    gen2_relatives: [
      {
        id: 'onkel',
        title: 'mein Onkel',
        article: 'der (r Onkel)',
        gender: 'maskulin',
        avatar: '👨‍🦰',
        sentence: 'Das ist mein Onkel.',
        en: 'This is my uncle.',
        badgeColor: 'bg-blue-600 text-white',
        borderClass: 'border-blue-300 bg-blue-50/80 text-blue-950'
      },
      {
        id: 'tante',
        title: 'meine Tante',
        article: 'die (e Tante)',
        gender: 'feminin',
        avatar: '👩‍🦱',
        sentence: 'Das ist meine Tante.',
        en: 'This is my aunt.',
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-300 bg-rose-50/80 text-rose-950'
      }
    ],
    gen3_siblings: [
      {
        id: 'bruder',
        title: 'mein Bruder',
        article: 'der (r Bruder)',
        gender: 'maskulin',
        avatar: '👦',
        sentence: 'Das ist mein Bruder.',
        en: 'This is my brother.',
        badgeColor: 'bg-blue-600 text-white',
        borderClass: 'border-blue-300 bg-blue-50/80 text-blue-950'
      },
      {
        id: 'ich',
        title: 'ich (Me)',
        article: 'ich',
        gender: 'zentrum',
        avatar: '👶',
        sentence: 'Das bin ich.',
        en: 'This is me.',
        badgeColor: 'bg-amber-600 text-white',
        borderClass: 'border-amber-400 bg-amber-100/90 text-amber-950 ring-2 ring-amber-400'
      },
      {
        id: 'schwester',
        title: 'meine Schwester',
        article: 'die (e Schwester)',
        gender: 'feminin',
        avatar: '👧',
        sentence: 'Das ist meine Schwester.',
        en: 'This is my sister.',
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-300 bg-rose-50/80 text-rose-950'
      }
    ],
    gen3_cousins: [
      {
        id: 'cousin',
        title: 'mein Cousin',
        article: 'der (r Cousin)',
        gender: 'maskulin',
        avatar: '👦',
        sentence: 'Das ist mein Cousin.',
        en: 'This is my male cousin.',
        badgeColor: 'bg-blue-600 text-white',
        borderClass: 'border-blue-300 bg-blue-50/80 text-blue-950'
      },
      {
        id: 'cousine',
        title: 'meine Cousine',
        article: 'die (e Cousine)',
        gender: 'feminin',
        avatar: '👧',
        sentence: 'Das ist meine Cousine.',
        en: 'This is my female cousin.',
        badgeColor: 'bg-rose-600 text-white',
        borderClass: 'border-rose-300 bg-rose-50/80 text-rose-950'
      }
    ]
  };

  const COLLECTIVE_PLURALS = [
    {
      group: 'die Großeltern',
      en: 'the grandparents',
      avatar: '👴👵',
      formula: 'mein Großvater + meine Großmutter',
      sentence: 'Das sind meine Großeltern.',
      enSentence: 'These are my grandparents.',
      color: 'from-amber-600 to-orange-700'
    },
    {
      group: 'die Eltern',
      en: 'the parents',
      avatar: '👨👩',
      formula: 'mein Vater + meine Mutter',
      sentence: 'Das sind meine Eltern.',
      enSentence: 'These are my parents.',
      color: 'from-teal-600 to-emerald-700'
    },
    {
      group: 'die Geschwister',
      en: 'the siblings',
      avatar: '👦👶👧',
      formula: 'mein Bruder + meine Schwester',
      sentence: 'Das sind meine Geschwister.',
      enSentence: 'These are my siblings.',
      color: 'from-purple-600 to-indigo-700'
    }
  ];

  // Helper for generating custom family sentence
  const getCustomFamilySentence = () => {
    const parts = [];
    if (customMembers.vater) parts.push("mein Vater");
    if (customMembers.mutter) parts.push("meine Mutter");
    if (customMembers.bruder === 1) parts.push("ein Bruder");
    if (customMembers.bruder > 1) parts.push(`${customMembers.bruder} Brüder`);
    if (customMembers.schwester === 1) parts.push("eine Schwester");
    if (customMembers.schwester > 1) parts.push(`${customMembers.schwester} Schwestern`);
    if (customMembers.opa) parts.push("mein Opa");
    if (customMembers.oma) parts.push("meine Oma");
    if (customMembers.onkel) parts.push("mein Onkel");
    if (customMembers.tante) parts.push("meine Tante");
    if (customMembers.cousin) parts.push("mein Cousin");
    if (customMembers.cousine) parts.push("meine Cousine");

    if (parts.length === 0) return "Meine Familie ist klein. Das bin ich!";
    return `Meine Familie: ${parts.join(', ')}.`;
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-stone-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-emerald-500/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <TreePine className="w-3.5 h-3.5" />
              Lesson 24 Interactive Studio
            </span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs px-3 py-1 rounded-full font-semibold">
              Slide 1–19 Family & Tree Matrix
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200">
            Die Familie & Der Familienbaum
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Discover the warm, vibrant German family tree! Learn the masculine/feminine pairs (<span className="text-blue-300 font-bold">mein Vater</span> vs. <span className="text-pink-300 font-bold">meine Mutter</span>), the 3 special German collective plurals (<span className="text-purple-300 font-bold">Eltern, Großeltern, Geschwister</span>), and affectionate pet names (<span className="text-amber-300 font-bold">Opa & Oma</span>)!
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'tree'
                  ? 'bg-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 scale-105'
                  : 'bg-white/10 text-emerald-200 hover:bg-white/20'
              }`}
            >
              <span>🌳</span>
              <span>Slide 18 Family Tree (Familienbaum)</span>
            </button>
            <button
              onClick={() => setActiveTab('collectives')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'collectives'
                  ? 'bg-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 scale-105'
                  : 'bg-white/10 text-emerald-200 hover:bg-white/20'
              }`}
            >
              <span>👥</span>
              <span>3 Collective Plurals & Pairs</span>
            </button>
            <button
              onClick={() => setActiveTab('size')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'size'
                  ? 'bg-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 scale-105'
                  : 'bg-white/10 text-emerald-200 hover:bg-white/20'
              }`}
            >
              <span>🏠</span>
              <span>Family Size & Custom Builder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Slide 18 3-Generation Family Tree */}
      {activeTab === 'tree' && (
        <div className="space-y-8 bg-[#1f2d24] p-5 sm:p-8 rounded-3xl text-white shadow-2xl border-4 border-amber-900/40 relative">
          <div className="flex flex-wrap items-center justify-between border-b border-white/20 pb-4 gap-2">
            <div>
              <span className="text-xs uppercase font-bold text-amber-300 font-mono tracking-wider">
                Slide 18 Master Chart
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-2">
                <span>🌳</span> der Familienbaum (The Family Tree)
              </h3>
            </div>
            <button
              onClick={() => handlePlayAudio("der Familienbaum: Das ist mein Großvater, meine Großmutter, mein Vater, meine Mutter, mein Onkel, meine Tante, mein Bruder, ich, meine Schwester, mein Cousin, meine Cousine.")}
              className="bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-amber-300 transition-colors shadow-sm flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-stone-900" />
              <span>Tour Whole Tree</span>
            </button>
          </div>

          <p className="text-xs text-stone-300 italic">
            Tap any family member card below to hear their live German introduction and possessive article!
          </p>

          {/* GENERATION 1: Grandparents */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Generation 1: Die Großeltern (Grandparents)
              </span>
            </div>

            <div className="flex justify-center gap-3 sm:gap-6 flex-wrap">
              {FAMILY_TREE_NODES.gen1.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handlePlayAudio(node.sentence)}
                  className={`p-3 sm:p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 shadow-md hover:scale-105 ${node.borderClass}`}
                >
                  <span className="text-3xl sm:text-4xl">{node.avatar}</span>
                  <div>
                    <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${node.badgeColor}`}>
                      {node.article}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-stone-900 mt-0.5">{node.title}</h4>
                    <p className="text-[11px] text-amber-900 font-semibold">{node.nickname}</p>
                  </div>
                  <Volume2 className="w-4 h-4 text-stone-400 ml-1" />
                </button>
              ))}
            </div>

            {/* Tree Branch Connector */}
            <div className="w-0.5 h-6 bg-white/30 mx-auto" />
          </div>

          {/* GENERATION 2: Parents & Uncle/Aunt */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="bg-teal-400/20 text-teal-300 border border-teal-400/40 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Generation 2: Die Eltern & Onkel / Tante
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Branch A: Parents */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">
                  Kernfamilie (Parents)
                </span>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                  {FAMILY_TREE_NODES.gen2_parents.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => handlePlayAudio(node.sentence)}
                      className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 shadow-sm hover:scale-105 ${node.borderClass}`}
                    >
                      <span className="text-2xl sm:text-3xl">{node.avatar}</span>
                      <div>
                        <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${node.badgeColor}`}>
                          {node.article}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900">{node.title}</h4>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch B: Uncle & Aunt */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">
                  Verwandte (Uncle & Aunt)
                </span>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                  {FAMILY_TREE_NODES.gen2_relatives.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => handlePlayAudio(node.sentence)}
                      className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 shadow-sm hover:scale-105 ${node.borderClass}`}
                    >
                      <span className="text-2xl sm:text-3xl">{node.avatar}</span>
                      <div>
                        <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${node.badgeColor}`}>
                          {node.article}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900">{node.title}</h4>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tree Branch Connector */}
            <div className="w-0.5 h-6 bg-white/30 mx-auto" />
          </div>

          {/* GENERATION 3: Siblings & Cousins */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="bg-purple-400/20 text-purple-300 border border-purple-400/40 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Generation 3: Die Geschwister & Cousins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Branch A: Siblings & Me */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">
                  Die Geschwister (Siblings & Me)
                </span>
                <div className="flex justify-center gap-2 flex-wrap">
                  {FAMILY_TREE_NODES.gen3_siblings.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => handlePlayAudio(node.sentence)}
                      className={`p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2 shadow-sm hover:scale-105 ${node.borderClass}`}
                    >
                      <span className="text-2xl">{node.avatar}</span>
                      <div>
                        <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${node.badgeColor}`}>
                          {node.article}
                        </span>
                        <h4 className="font-bold text-xs text-stone-900">{node.title}</h4>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch B: Cousins */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">
                  Die Cousins (Male & Female Cousin)
                </span>
                <div className="flex justify-center gap-2 flex-wrap">
                  {FAMILY_TREE_NODES.gen3_cousins.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => handlePlayAudio(node.sentence)}
                      className={`p-2.5 rounded-2xl border-2 transition-all text-left flex items-center gap-2 shadow-sm hover:scale-105 ${node.borderClass}`}
                    >
                      <span className="text-2xl">{node.avatar}</span>
                      <div>
                        <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${node.badgeColor}`}>
                          {node.article}
                        </span>
                        <h4 className="font-bold text-xs text-stone-900">{node.title}</h4>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 19 Bottom Question */}
          <div className="mt-4 pt-4 border-t border-white/20 text-center space-y-1">
            <p className="text-amber-300 font-mono text-base sm:text-lg font-bold">
              "Und wie sieht dein Familienbaum aus?"
            </p>
            <p className="text-xs text-stone-300">
              (And how does your family tree look like? - Slide 19)
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Collective Plurals & Pairs */}
      {activeTab === 'collectives' && (
        <div className="space-y-6">
          {/* The 3 Collective Plurals */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-emerald-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
                <Users className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  German Collective Super-Words
                </span>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  The 3 Special Plural Groups: <span className="text-emerald-700">Eltern, Großeltern, Geschwister</span>
                </h3>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              German gives you single, convenient words for groups of relatives. Because they are plural, they ALWAYS take <span className="font-bold text-purple-700">"Das sind meine..."</span> with the <span className="font-bold text-pink-700">-e</span> ending!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {COLLECTIVE_PLURALS.map((cp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-4 bg-gradient-to-br from-stone-50 to-emerald-50/40 border-2 border-emerald-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{cp.avatar}</span>
                    <span className="text-[10px] uppercase font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                      Plural (die)
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-stone-900 text-base">{cp.group}</h4>
                    <p className="text-xs text-stone-500 font-medium">{cp.en}</p>
                    <p className="text-[11px] text-emerald-800 mt-1 font-semibold">{cp.formula}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-stone-900">{cp.sentence}</span>
                      <button
                        onClick={() => handlePlayAudio(cp.sentence)}
                        className="p-1 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-emerald-700 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-400 italic">{cp.enSentence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Pairs Comparison (Masculine mein vs Feminine meine) */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-teal-100 space-y-4">
            <h3 className="font-black text-stone-900 text-lg flex items-center gap-2">
              <span>⚖️</span> Masculine (mein) vs. Feminine (meine) Family Pairs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Pair 1: Vater & Mutter */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-stone-500 border-b pb-1">
                  <span>Parents Pair</span>
                  <span>👨 👩</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-blue-900 font-bold">der Vater $\rightarrow$ <strong>mein Vater</strong></p>
                  <p className="text-rose-900 font-bold">die Mutter $\rightarrow$ <strong>meine Mutter</strong></p>
                </div>
              </div>

              {/* Pair 2: Bruder & Schwester */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-stone-500 border-b pb-1">
                  <span>Siblings Pair</span>
                  <span>👦 👧</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-blue-900 font-bold">der Bruder $\rightarrow$ <strong>mein Bruder</strong></p>
                  <p className="text-rose-900 font-bold">die Schwester $\rightarrow$ <strong>meine Schwester</strong></p>
                </div>
              </div>

              {/* Pair 3: Opa & Oma */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-stone-500 border-b pb-1">
                  <span>Grandparents Pair</span>
                  <span>👴 👵</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-blue-900 font-bold">der Opa $\rightarrow$ <strong>mein Opa</strong></p>
                  <p className="text-rose-900 font-bold">die Oma $\rightarrow$ <strong>meine Oma</strong></p>
                </div>
              </div>

              {/* Pair 4: Cousin & Cousine */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-stone-500 border-b pb-1">
                  <span>Cousins Pair</span>
                  <span>👦 👧</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-blue-900 font-bold">der Cousin $\rightarrow$ <strong>mein Cousin</strong></p>
                  <p className="text-rose-900 font-bold">die Cousine $\rightarrow$ <strong>meine Cousine</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Family Size & Custom Builder */}
      {activeTab === 'size' && (
        <div className="space-y-6">
          {/* Slide 1 & 17: Family Size Comparison */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-amber-200 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] bg-amber-100 text-amber-900 uppercase font-bold px-2.5 py-0.5 rounded-full">
                  Slides 1 & 17
                </span>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  Describing Family Size: <span className="text-amber-800">groß vs. klein</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Small Family */}
              <button
                onClick={() => {
                  setFamilySize('klein');
                  handlePlayAudio("Meine Familie ist klein. Wie groß ist deine Familie?");
                }}
                className={`p-5 rounded-2xl border-2 text-left space-y-3 transition-all ${
                  familySize === 'klein'
                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300'
                    : 'border-stone-200 bg-stone-50 hover:bg-emerald-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">👨‍👩‍👦</span>
                  <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                    Slide 1 Example
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-stone-900">Meine Familie ist klein.</h4>
                  <p className="text-xs text-stone-500">My family is small (3 people).</p>
                </div>
                <div className="text-xs text-emerald-800 font-medium">
                  "Wie groß ist deine Familie?" (How big is your family?)
                </div>
              </button>

              {/* Big Family */}
              <button
                onClick={() => {
                  setFamilySize('gross');
                  handlePlayAudio("Meine Familie ist groß. Wir haben viele Geschwister, Onkel, Tanten und Cousins!");
                }}
                className={`p-5 rounded-2xl border-2 text-left space-y-3 transition-all ${
                  familySize === 'gross'
                    ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-300'
                    : 'border-stone-200 bg-stone-50 hover:bg-teal-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">👨‍👩‍👧‍👦👵👴👨‍🦰👩‍🦱</span>
                  <span className="text-xs bg-teal-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                    Slide 17 Example
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-stone-900">Meine Familie ist groß.</h4>
                  <p className="text-xs text-stone-500">My family is big (multigenerational household).</p>
                </div>
                <div className="text-xs text-teal-800 font-medium">
                  "Wir sind eine große Familie!" (We are a big family!)
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Custom Family Builder */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-emerald-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛠️</span>
              <div>
                <h3 className="font-black text-stone-900 text-lg">
                  Build Your Own Family (Familien-Baukasten)
                </h3>
                <p className="text-xs text-stone-500">
                  Toggle your family members below to generate your custom German introduction!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {[
                { key: 'vater', label: 'Vater (Dad)', icon: '👨' },
                { key: 'mutter', label: 'Mutter (Mom)', icon: '👩' },
                { key: 'opa', label: 'Opa (Grandpa)', icon: '👴' },
                { key: 'oma', label: 'Oma (Grandma)', icon: '👵' },
                { key: 'onkel', label: 'Onkel (Uncle)', icon: '👨‍🦰' },
                { key: 'tante', label: 'Tante (Aunt)', icon: '👩‍🦱' },
                { key: 'cousin', label: 'Cousin (Male)', icon: '👦' },
                { key: 'cousine', label: 'Cousine (Female)', icon: '👧' },
              ].map((item) => {
                const isActive = customMembers[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => setCustomMembers(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-400 opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                    <span className="text-[10px] uppercase font-bold">{isActive ? '✓ Included' : '+ Add'}</span>
                  </button>
                );
              })}
            </div>

            {/* Generated Sentence Output */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-emerald-300 font-mono tracking-wider">
                  Your Custom German Family Intro
                </span>
                <button
                  onClick={() => handlePlayAudio(getCustomFamilySentence())}
                  className="bg-amber-400 text-stone-950 px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </button>
              </div>

              <p className="text-lg sm:text-xl font-black text-amber-100">
                "{getCustomFamilySentence()}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
