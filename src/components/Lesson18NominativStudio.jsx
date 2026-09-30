import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, HelpCircle, Layers, ShieldCheck, RefreshCw, BookOpen } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson18NominativStudio({ isSlowMode }) {
  const [activeGenderTab, setActiveGenderTab] = useState('maskulin'); // 'maskulin', 'feminin', 'neutrum', 'plural'
  const [isPluralMode, setIsPluralMode] = useState(false);

  const GENDER_DATA = {
    maskulin: {
      article: 'der',
      color: 'from-blue-600 to-indigo-700',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
      border: 'border-blue-400',
      name: 'Maskulin (Masculine)',
      soundTrick: "deR Mann -> ending sound '-r'",
      items: [
        {
          noun: 'der Mann',
          plural: 'die Männer',
          icon: '👨 🍺',
          sentence: 'Der Mann ist glücklich.',
          sentencePlural: 'Die Männer sind glücklich.',
          translation: 'The man is happy.',
          translationPlural: 'The men are happy.',
          type: 'Person (Wer?)',
          slide: 'Slide 12 & 21'
        },
        {
          noun: 'der Apfel',
          plural: 'die Äpfel',
          icon: '🍎 🔴',
          sentence: 'Der Apfel ist rot.',
          sentencePlural: 'Die Äpfel sind rot.',
          translation: 'The apple is red.',
          translationPlural: 'The apples are red.',
          type: 'Sache / Thing (Was?)',
          slide: 'Slide 13'
        }
      ]
    },
    feminin: {
      article: 'die',
      color: 'from-rose-600 to-pink-700',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      border: 'border-rose-400',
      name: 'Feminin (Feminine)',
      soundTrick: "diE Frau -> ending sound '-e'",
      items: [
        {
          noun: 'die Frau',
          plural: 'die Frauen',
          icon: '👩 🍷',
          sentence: 'Die Frau trinkt Wein.',
          sentencePlural: 'Die Frauen trinken Wein.',
          translation: 'The woman is drinking wine.',
          translationPlural: 'The women are drinking wine.',
          type: 'Person (Wer?)',
          slide: 'Slide 14 & 21'
        },
        {
          noun: 'die Katze',
          plural: 'die Katzen',
          icon: '🐱 💙',
          sentence: 'Die Katze ist freundlich.',
          sentencePlural: 'Die Katzen sind freundlich.',
          translation: 'The cat is friendly.',
          translationPlural: 'The cats are friendly.',
          type: 'Sache / Animal (Was?)',
          slide: 'Slide 15'
        }
      ]
    },
    neutrum: {
      article: 'das',
      color: 'from-amber-600 to-orange-700',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      border: 'border-amber-400',
      name: 'Neutrum (Neutral)',
      soundTrick: "daS Baby -> ending sound '-s'",
      items: [
        {
          noun: 'das Baby',
          plural: 'die Babys',
          icon: '👶 🍼',
          sentence: 'Das Baby ist süß.',
          sentencePlural: 'Die Babys sind süß.',
          translation: 'The baby is sweet / cute.',
          translationPlural: 'The babies are sweet / cute.',
          type: 'Person (Wer?)',
          slide: 'Slide 16 & 21'
        },
        {
          noun: 'das Haus',
          plural: 'die Häuser',
          icon: '🏠 🏰',
          sentence: 'Das Haus ist groß.',
          sentencePlural: 'Die Häuser sind groß.',
          translation: 'The house is big.',
          translationPlural: 'The houses are big.',
          type: 'Sache / Thing (Was?)',
          slide: 'Slide 17'
        }
      ]
    },
    plural: {
      article: 'die (Plural)',
      color: 'from-emerald-600 to-teal-700',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      border: 'border-emerald-400',
      name: 'Universal Plural (All Genders!)',
      soundTrick: "In Plural, ALL genders take 'die'!",
      items: [
        {
          noun: 'die Kinder',
          plural: 'die Kinder',
          icon: '🧒 ⚽',
          sentence: 'Die Kinder spielen.',
          sentencePlural: 'Die Kinder spielen.',
          translation: 'The children are playing.',
          translationPlural: 'The children are playing.',
          type: 'Plural People (Wer?)',
          slide: 'Slide 18'
        },
        {
          noun: 'die Bücher',
          plural: 'die Bücher',
          icon: '📚 🎨',
          sentence: 'Die Bücher sind bunt.',
          sentencePlural: 'Die Bücher sind bunt.',
          translation: 'The books are colorful.',
          translationPlural: 'The books are colorful.',
          type: 'Plural Things (Was?)',
          slide: 'Slide 19'
        }
      ]
    }
  };

  const currentGender = GENDER_DATA[activeGenderTab];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
              Lesson 18 Studio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              der, die, das • Artikel im Nominativ 🔴 🔵 🟡
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl">
              Master the definite articles ("The") in the Nominative case! Discover why nouns are capitalized, how to spot the Subject with "Wer?" or "Was?", and the Universal Plural rule.
            </p>
          </div>
          <button
            onClick={() => {
              playChime('click');
              speakGerman("Artikel im Nominativ: der Mann, die Frau, das Baby. Und im Plural immer die: die Männer, die Frauen, die Babys.", isSlowMode);
            }}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2.5 rounded-2xl font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Volume2 className="w-5 h-5" />
            <span>Hear Overview</span>
          </button>
        </div>
      </div>

      {/* Gender Category Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => { setActiveGenderTab('maskulin'); playChime('click'); speakGerman("der. Der Mann, der Apfel.", isSlowMode); }}
          className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${
            activeGenderTab === 'maskulin'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102 ring-2 ring-blue-300'
              : 'bg-white text-stone-700 hover:bg-blue-50 border-stone-200'
          }`}
        >
          <span className="text-xl">🔵</span>
          <span>der (Maskulin)</span>
          <span className="text-[10px] opacity-80">der Mann, der Apfel</span>
        </button>

        <button
          onClick={() => { setActiveGenderTab('feminin'); playChime('click'); speakGerman("die. Die Frau, die Katze.", isSlowMode); }}
          className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${
            activeGenderTab === 'feminin'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-102 ring-2 ring-rose-300'
              : 'bg-white text-stone-700 hover:bg-rose-50 border-stone-200'
          }`}
        >
          <span className="text-xl">🔴</span>
          <span>die (Feminin)</span>
          <span className="text-[10px] opacity-80">die Frau, die Katze</span>
        </button>

        <button
          onClick={() => { setActiveGenderTab('neutrum'); playChime('click'); speakGerman("das. Das Baby, das Haus.", isSlowMode); }}
          className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${
            activeGenderTab === 'neutrum'
              ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-102 ring-2 ring-amber-300'
              : 'bg-white text-stone-700 hover:bg-amber-50 border-stone-200'
          }`}
        >
          <span className="text-xl">🟡</span>
          <span>das (Neutrum)</span>
          <span className="text-[10px] opacity-80">das Baby, das Haus</span>
        </button>

        <button
          onClick={() => { setActiveGenderTab('plural'); playChime('click'); speakGerman("die Plural. Die Kinder, die Bücher.", isSlowMode); }}
          className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${
            activeGenderTab === 'plural'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102 ring-2 ring-emerald-300'
              : 'bg-white text-stone-700 hover:bg-emerald-50 border-stone-200'
          }`}
        >
          <span className="text-xl">🟢</span>
          <span>die (Plural)</span>
          <span className="text-[10px] opacity-80">Universal Umbrella!</span>
        </button>
      </div>

      {/* Active Gender Showcase Stage */}
      <div className={`bg-white rounded-3xl p-6 sm:p-8 border-3 ${currentGender.border} shadow-xl space-y-6`}>
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-stone-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-stone-500 tracking-wider">Active Category:</span>
              <span className={`text-xs font-extrabold px-3 py-0.5 rounded-full border ${currentGender.badgeBg}`}>
                {currentGender.name}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1 font-mono">
              Article: <span className="underline decoration-amber-400">{currentGender.article}</span>
            </h3>
          </div>

          {/* Singular / Plural Toggle Switch */}
          {activeGenderTab !== 'plural' && (
            <button
              onClick={() => {
                setIsPluralMode(!isPluralMode);
                playChime('click');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 border-2 border-stone-300 font-black text-xs sm:text-sm transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-stone-600" />
              <span>{isPluralMode ? 'Switch to Singular (der/die/das)' : 'Flip to Plural (die ...)'}</span>
            </button>
          )}
        </div>

        {/* 2 Example Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentGender.items.map((item, idx) => {
            const displayNoun = isPluralMode ? item.plural : item.noun;
            const displaySentence = isPluralMode ? item.sentencePlural : item.sentence;
            const displayTrans = isPluralMode ? item.translationPlural : item.translation;

            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-3xl p-6 border-2 border-stone-200 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl p-2 bg-white rounded-2xl shadow-inner border border-stone-200">
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600">
                      {item.type} • {item.slide}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 uppercase font-black block">Noun:</span>
                    <div className="text-2xl font-black text-stone-900 font-mono">
                      {displayNoun}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-1">
                    <span className="text-[11px] font-black uppercase text-stone-400 block">Example Sentence:</span>
                    <p className="font-extrabold text-base sm:text-lg text-stone-900 font-mono">
                      {displaySentence}
                    </p>
                    <p className="text-xs text-stone-600 italic">
                      ({displayTrans})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman(`${displayNoun}. ${displaySentence}`, isSlowMode);
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-98"
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Listen to "{displayNoun}"</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Acoustic Ending Sound Trick Banner */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="text-white">Acoustic Ending Trick (Slide 22):</strong>{' '}
              <span>{currentGender.soundTrick}</span>
            </div>
          </div>
          <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-amber-200">
            R - E - S Formula
          </span>
        </div>
      </div>

      {/* Nominativ Master Formula & 3 Types of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Box 1: Nominativ Formula */}
        <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-lg">
            <span>🧱</span>
            <h4>The Nominativ Sentence Formula (Slide 6)</h4>
          </div>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-center font-mono text-lg font-black text-indigo-950">
            Satz = Subjekt (Nominativ) + Verb
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            The <strong>Subjekt</strong> is always in the <strong>Nominativ</strong> case. It is the actor or the topic of the sentence. Ask:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block">Wer? (Who?)</strong>
              <span>For people: Sabine ist ledig. Wer ist ledig? Sabine!</span>
            </div>
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block">Was? (What?)</strong>
              <span>For things: Das Haus ist groß. Was ist groß? Das Haus!</span>
            </div>
          </div>
        </div>

        {/* Box 2: 3 Types of Articles */}
        <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-black text-lg">
            <span>📑</span>
            <h4>The 3 Types of Articles (Slide 10)</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl">
              <strong className="text-blue-950">1. Bestimmter Artikel (Definite):</strong>
              <p className="text-stone-700">"The" (specific) $\rightarrow$ <em>der, die, das, die (Plural)</em></p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              <strong className="text-amber-950">2. Unbestimmter Artikel (Indefinite):</strong>
              <p className="text-stone-700">"A / An" (any random one) $\rightarrow$ <em>ein, eine, ein</em></p>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
              <strong className="text-rose-950">3. Negationsartikel (Negative):</strong>
              <p className="text-stone-700">"No / Not any" (negation) $\rightarrow$ <em>kein, keine, kein</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
