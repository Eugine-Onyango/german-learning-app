import React, { useState } from 'react';
import { Volume2, Sparkles, ArrowRight, RefreshCw, CheckCircle2, User, Users, BookOpen, Layers } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson10PronounFamily({ isSlowMode }) {
  const [activeCategory, setActiveCategory] = useState('third'); // 'first', 'second', 'third', 'summary'
  const [showStrikethrough, setShowStrikethrough] = useState(true);

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-6">
      {/* Friendly Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-indigo-50 to-pink-100 border-2 border-purple-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">👥 🔄 👨 👩 📖</div>
        <h2 className="text-2xl sm:text-3xl font-black text-purple-950">
          Lesson 10: Personalpronomen (Nominativ) - The Substitute Bench!
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          What are pronouns? They are like <strong>substitute soccer players</strong>!  
          Instead of repeating a person's name over and over, you replace the noun with a friendly short pronoun 
          (<strong className="text-purple-900 font-bold">er, sie, es, wir, ihr, Sie</strong>)!
        </p>
      </div>

      {/* 4 Interactive Category Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'first', label: '1. Person: ich & wir', icon: '👤 👥', sub: 'Me & Us' },
          { id: 'second', label: '2. Person: du, ihr & Sie', icon: '👕 🎩', sub: 'Talking to You' },
          { id: 'third', label: '3. Person: er, sie, es, sie', icon: '👨 👩 📖', sub: 'He, She, It, They' },
          { id: 'summary', label: '📋 Full Family Table', icon: '✨', sub: 'At a Glance' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id);
              playChime('click');
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-purple-700 text-white shadow-lg ring-3 ring-purple-300 scale-102'
                : 'bg-white text-stone-700 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* CATEGORY 1: FIRST PERSON (ICH & WIR) */}
      {activeCategory === 'first' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <span>👤 👥</span>
              <span>First Person (Talking About Yourself & Your Team)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Singular = <strong>ich</strong> (I) | Plural = <strong>wir</strong> (we)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ich Card */}
            <div
              onClick={() => handleSpeak("Ich wohne in New York.")}
              className="p-5 rounded-3xl bg-cyan-50 border-3 border-cyan-300 hover:bg-cyan-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-200/80 px-2 py-0.5 rounded-full">
                  Singular: Just ME
                </span>
                <Volume2 className="w-5 h-5 text-cyan-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-mono text-3xl font-black text-cyan-950">
                ich = I
              </div>
              <div className="p-3 bg-white rounded-2xl border border-cyan-200 text-sm">
                <strong className="text-cyan-900 block font-mono text-base">
                  Ich wohne in New York.
                </strong>
                <span className="text-xs text-stone-500">I live in New York.</span>
              </div>
            </div>

            {/* wir Card */}
            <div
              onClick={() => handleSpeak("Wir wohnen in New York.")}
              className="p-5 rounded-3xl bg-indigo-50 border-3 border-indigo-300 hover:bg-indigo-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-800 bg-indigo-200/80 px-2 py-0.5 rounded-full">
                  Plural: ME + OTHERS
                </span>
                <Volume2 className="w-5 h-5 text-indigo-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-mono text-3xl font-black text-indigo-950">
                wir = we
              </div>
              <div className="p-3 bg-white rounded-2xl border border-indigo-200 text-sm">
                <strong className="text-indigo-900 block font-mono text-base">
                  Wir wohnen in New York.
                </strong>
                <span className="text-xs text-stone-500">We live in New York.</span>
              </div>
            </div>
          </div>

          {/* Maria's Story from Slide 6 */}
          <div
            onClick={() => handleSpeak("Ich heiße Maria. Ich komme aus Spanien. Ich habe ein Kind. Wir wohnen in Berlin.")}
            className="p-5 rounded-3xl bg-stone-900 text-white border-3 border-stone-800 cursor-pointer hover:bg-stone-800 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Slide 6 Story: Maria & Her Child
              </span>
              <Volume2 className="w-5 h-5 text-amber-400" />
            </div>
            <p className="font-mono text-base sm:text-lg text-stone-100 leading-relaxed">
              "Ich heiße Maria. Ich komme aus Spanien. Ich habe ein Kind. <strong className="text-amber-300">Wir wohnen in Berlin.</strong>"
            </p>
            <span className="text-xs text-stone-400 block">
              Meaning: "My name is Maria. I come from Spain. I have one child. We live in Berlin." (Maria + Child = Wir!)
            </span>
          </div>
        </div>
      )}

      {/* CATEGORY 2: SECOND PERSON (DU, IHR, SIE) */}
      {activeCategory === 'second' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <span>👕 🧢 🎩</span>
              <span>Second Person (Talking Directly to Someone)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Notice the contrast: <strong>du</strong> (1 friend) vs <strong>ihr</strong> (group of friends) vs <strong>Sie</strong> (polite elder or group)!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* du (1 friend) */}
            <div
              onClick={() => handleSpeak("Max, wo wohnst du?")}
              className="p-5 rounded-3xl bg-amber-50 border-3 border-amber-300 hover:bg-amber-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                  Informal: 1 Friend
                </span>
                <Volume2 className="w-5 h-5 text-amber-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-2xl font-black text-amber-950">
                du = you
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200 text-sm">
                <strong className="text-amber-900 block font-mono text-base">
                  Max, wo wohnst du?
                </strong>
                <span className="text-xs text-stone-500">Max, where do you live?</span>
              </div>
            </div>

            {/* ihr (you all - buddies) */}
            <div
              onClick={() => handleSpeak("Julia und Peter, wo wohnt ihr?")}
              className="p-5 rounded-3xl bg-orange-50 border-3 border-orange-300 hover:bg-orange-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-800 bg-orange-200 px-2 py-0.5 rounded-full">
                  Informal: 2+ Friends (You All)
                </span>
                <Volume2 className="w-5 h-5 text-orange-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-2xl font-black text-orange-950">
                ihr = you all / you guys
              </div>
              <div className="p-3 bg-white rounded-2xl border border-orange-200 text-sm">
                <strong className="text-orange-900 block font-mono text-base">
                  Julia und Peter, wo wohnt ihr?
                </strong>
                <span className="text-xs text-stone-500">Julia and Peter, where do you (all) live?</span>
              </div>
            </div>

            {/* Sie (Formal Singular) */}
            <div
              onClick={() => handleSpeak("Herr Müller, wo wohnen Sie?")}
              className="p-5 rounded-3xl bg-teal-50 border-3 border-teal-300 hover:bg-teal-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-200 px-2 py-0.5 rounded-full">
                  Formal: 1 Respected Person
                </span>
                <Volume2 className="w-5 h-5 text-teal-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-2xl font-black text-teal-950">
                Sie = you (formal)
              </div>
              <div className="p-3 bg-white rounded-2xl border border-teal-200 text-sm">
                <strong className="text-teal-900 block font-mono text-base">
                  Herr Müller, wo wohnen Sie?
                </strong>
                <span className="text-xs text-stone-500">Mr. Müller, where do you live?</span>
              </div>
            </div>

            {/* Sie (Formal Plural - Couple / Group) */}
            <div
              onClick={() => handleSpeak("Herr und Frau Müller, wo wohnen Sie?")}
              className="p-5 rounded-3xl bg-emerald-50 border-3 border-emerald-300 hover:bg-emerald-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full">
                  Formal: Respected Group / Couple
                </span>
                <Volume2 className="w-5 h-5 text-emerald-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-2xl font-black text-emerald-950">
                Sie = you all (formal)
              </div>
              <div className="p-3 bg-white rounded-2xl border border-emerald-200 text-sm">
                <strong className="text-emerald-900 block font-mono text-base">
                  Herr und Frau Müller, wo wohnen Sie?
                </strong>
                <span className="text-xs text-stone-500">Mr. and Mrs. Müller, where do you (both) live?</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 3: THIRD PERSON (ER, SIE, ES, SIE) - THE SUBSTITUTE BENCH */}
      {activeCategory === 'third' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <span>👨 👩 📖 👫</span>
                <span>Third Person: The Substitute Bench</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Watch how the pronoun replaces the repeated name!
              </p>
            </div>

            <button
              onClick={() => {
                setShowStrikethrough(!showStrikethrough);
                playChime('click');
              }}
              className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Toggle Strikethrough Effect</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. er (Michael) */}
            <div
              onClick={() => handleSpeak("Das ist Michael. Er wohnt in London.")}
              className="p-5 rounded-3xl bg-blue-50 border-3 border-blue-300 hover:bg-blue-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-800 bg-blue-200 px-2 py-0.5 rounded-full">
                  Maskulin: er (he)
                </span>
                <Volume2 className="w-5 h-5 text-blue-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-xl font-bold text-stone-800">
                Das ist Michael.
              </div>
              <div className="p-3 bg-white rounded-2xl border border-blue-200 text-sm">
                <div className="font-mono text-lg font-black text-blue-900 flex items-center gap-1">
                  {showStrikethrough && (
                    <span className="line-through text-stone-400 mr-1">Michael</span>
                  )}
                  <span className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg">Er</span>
                  <span>wohnt in London.</span>
                </div>
                <span className="text-xs text-stone-500">He lives in London.</span>
              </div>
            </div>

            {/* 2. sie (Michaela) */}
            <div
              onClick={() => handleSpeak("Das ist Michaela. Sie wohnt in Paris.")}
              className="p-5 rounded-3xl bg-rose-50 border-3 border-rose-300 hover:bg-rose-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-800 bg-rose-200 px-2 py-0.5 rounded-full">
                  Feminin: sie (she)
                </span>
                <Volume2 className="w-5 h-5 text-rose-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-xl font-bold text-stone-800">
                Das ist Michaela.
              </div>
              <div className="p-3 bg-white rounded-2xl border border-rose-200 text-sm">
                <div className="font-mono text-lg font-black text-rose-900 flex items-center gap-1">
                  {showStrikethrough && (
                    <span className="line-through text-stone-400 mr-1">Michaela</span>
                  )}
                  <span className="text-rose-600 bg-rose-100 px-2 py-0.5 rounded-lg">Sie</span>
                  <span>wohnt in Paris.</span>
                </div>
                <span className="text-xs text-stone-500">She lives in Paris. (Verb ends in -t: wohnt!)</span>
              </div>
            </div>

            {/* 3. es (Das Buch) */}
            <div
              onClick={() => handleSpeak("Das ist mein Buch. Es ist alt.")}
              className="p-5 rounded-3xl bg-amber-50 border-3 border-amber-300 hover:bg-amber-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                  Neutrum: es (it)
                </span>
                <Volume2 className="w-5 h-5 text-amber-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-xl font-bold text-stone-800">
                Das ist mein Buch.
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200 text-sm">
                <div className="font-mono text-lg font-black text-amber-900 flex items-center gap-1">
                  {showStrikethrough && (
                    <span className="line-through text-stone-400 mr-1">Das Buch</span>
                  )}
                  <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded-lg">Es</span>
                  <span>ist alt.</span>
                </div>
                <span className="text-xs text-stone-500">It is old.</span>
              </div>
            </div>

            {/* 4. sie (Petra und Jürgen - Plural) */}
            <div
              onClick={() => handleSpeak("Das sind Petra und Jürgen. Sie wohnen in Hamburg.")}
              className="p-5 rounded-3xl bg-purple-50 border-3 border-purple-300 hover:bg-purple-100/70 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-800 bg-purple-200 px-2 py-0.5 rounded-full">
                  Plural: sie (they)
                </span>
                <Volume2 className="w-5 h-5 text-purple-700 group-hover:scale-110" />
              </div>
              <div className="font-mono text-xl font-bold text-stone-800">
                Das sind Petra und Jürgen.
              </div>
              <div className="p-3 bg-white rounded-2xl border border-purple-200 text-sm">
                <div className="font-mono text-lg font-black text-purple-900 flex items-center gap-1">
                  {showStrikethrough && (
                    <span className="line-through text-stone-400 mr-1">Petra und Jürgen</span>
                  )}
                  <span className="text-purple-600 bg-purple-100 px-2 py-0.5 rounded-lg">Sie</span>
                  <span>wohnen in Hamburg.</span>
                </div>
                <span className="text-xs text-stone-500">They live in Hamburg. (Verb ends in -en: wohnen!)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 4: SUMMARY TABLE (DIRECT FROM SLIDE 16) */}
      {activeCategory === 'summary' && (
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border-4 border-stone-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <h3 className="font-mono font-black text-amber-400 text-lg uppercase tracking-wider">
                Personalpronomen (Nominativ) - At a Glance
              </h3>
            </div>
            <span className="text-xs text-stone-400">Slide 16 Reference</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead>
                <tr className="border-b border-stone-700 text-stone-400 uppercase text-[11px]">
                  <th className="py-2.5 px-3">Person</th>
                  <th className="py-2.5 px-3">Singular (One)</th>
                  <th className="py-2.5 px-3">Plural (Many)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 font-mono">
                <tr>
                  <td className="py-3 px-3 font-sans font-bold text-stone-300">First person (yourself)</td>
                  <td className="py-3 px-3">
                    <span className="text-cyan-400 font-bold">ich</span> <span className="text-stone-400 font-sans text-xs">(I)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-indigo-400 font-bold">wir</span> <span className="text-stone-400 font-sans text-xs">(we)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-sans font-bold text-stone-300">Second person (to someone)</td>
                  <td className="py-3 px-3 space-y-1">
                    <div>
                      <span className="text-amber-400 font-bold">du</span> <span className="text-stone-400 font-sans text-xs">(you, informal)</span>
                    </div>
                    <div>
                      <span className="text-teal-400 font-bold">Sie</span> <span className="text-stone-400 font-sans text-xs">(You, formal)</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 space-y-1">
                    <div>
                      <span className="text-orange-400 font-bold">ihr</span> <span className="text-stone-400 font-sans text-xs">(you all, informal)</span>
                    </div>
                    <div>
                      <span className="text-teal-400 font-bold">Sie</span> <span className="text-stone-400 font-sans text-xs">(You all, formal)</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-sans font-bold text-stone-300">Third person (about someone/something)</td>
                  <td className="py-3 px-3 space-y-1">
                    <div>
                      <span className="text-blue-400 font-bold">er</span> <span className="text-stone-400 font-sans text-xs">(he, maskulin)</span>
                    </div>
                    <div>
                      <span className="text-rose-400 font-bold">sie</span> <span className="text-stone-400 font-sans text-xs">(she, feminin)</span>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold">es</span> <span className="text-stone-400 font-sans text-xs">(it, neutrum)</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-purple-400 font-bold">sie</span> <span className="text-stone-400 font-sans text-xs">(they)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
