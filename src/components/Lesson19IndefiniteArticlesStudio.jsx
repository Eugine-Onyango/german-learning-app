import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, RefreshCw, AlertCircle, BookOpen, Layers, HelpCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson19IndefiniteArticlesStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('stories'); // 'stories', 'exercises', 'table'
  const [selectedStoryIdx, setSelectedStoryIdx] = useState(0);
  const [exerciseRevealed, setExerciseRevealed] = useState({});

  const STORIES = [
    {
      id: 'apfel',
      title: 'Der Apfel (The Apple)',
      gender: 'Maskulin (der -> ein)',
      icon: '🍎 😋',
      color: 'border-red-400 bg-red-50/50',
      badge: 'Slide 1',
      firstMention: 'Das ist ein Apfel.',
      firstTrans: 'This is an apple.',
      firstArticle: 'ein',
      secondMention: 'Der Apfel ist süß.',
      secondTrans: 'The apple is sweet.',
      secondArticle: 'Der',
      ruleTip: "Maskulin: 'der' becomes 'ein' on first mention!"
    },
    {
      id: 'mann',
      title: 'Der Mann (The Man)',
      gender: 'Maskulin (der -> ein)',
      icon: '👨 🗼',
      color: 'border-blue-400 bg-blue-50/50',
      badge: 'Slide 3',
      firstMention: 'Das ist ein Mann.',
      firstTrans: 'This is a man.',
      firstArticle: 'ein',
      secondMention: 'Der Mann wohnt in Paris.',
      secondTrans: 'The man lives in Paris.',
      secondArticle: 'Der',
      ruleTip: "Male person: 'der Mann' -> 'ein Mann'!"
    },
    {
      id: 'frau',
      title: 'Die Frau (The Woman)',
      gender: 'Feminin (die -> eine)',
      icon: '👩 🎧',
      color: 'border-rose-400 bg-rose-50/50',
      badge: 'Slide 4',
      firstMention: 'Das ist eine Frau.',
      firstTrans: 'This is a woman.',
      firstArticle: 'eine',
      secondMention: 'Die Frau hört Musik.',
      secondTrans: 'The woman is listening to music.',
      secondArticle: 'Die',
      ruleTip: "Notice the -e match: 'die' ends in -e, so its partner is 'eine'!"
    },
    {
      id: 'maedchen',
      title: 'Das Mädchen (The Girl)',
      gender: 'Neutral (das -> ein)',
      icon: '👧 🩰',
      color: 'border-amber-400 bg-amber-50/50',
      badge: 'Slide 5',
      firstMention: 'Das ist ein Mädchen.',
      firstTrans: 'This is a girl.',
      firstArticle: 'ein',
      secondMention: 'Das Mädchen tanzt.',
      secondTrans: 'The girl is dancing.',
      secondArticle: 'Das',
      ruleTip: "Diminutive '-chen' is always neutral: 'das Mädchen' -> 'ein Mädchen'!"
    },
    {
      id: 'blumen',
      title: 'Die Blumen (The Flowers)',
      gender: 'Plural (die -> NO ARTICLE!)',
      icon: '💐 🌹',
      color: 'border-emerald-400 bg-emerald-50/50',
      badge: 'Slide 6 (!)',
      firstMention: 'Das sind Blumen.',
      firstTrans: 'These are flowers.',
      firstArticle: '— (No Article)',
      secondMention: 'Die Blumen sind schön.',
      secondTrans: 'The flowers are pretty.',
      secondArticle: 'Die',
      ruleTip: "WARNING (!): Plural has NO 'ein'! Say 'Das sind Blumen', then 'Die Blumen sind schön'!"
    }
  ];

  const EXERCISES = [
    {
      id: 'tasche',
      definite: 'die Tasche',
      translation: 'the bag',
      indefinite: 'Das ist eine Tasche.',
      indefTranslation: 'This is a bag.',
      icon: '👜',
      slide: 'Slide 9',
      gender: 'Feminin: die -> eine'
    },
    {
      id: 'buch',
      definite: 'das Buch',
      translation: 'the book',
      indefinite: 'Das ist ein Buch.',
      indefTranslation: 'This is a book.',
      icon: '📖',
      slide: 'Slide 10',
      gender: 'Neutral: das -> ein'
    },
    {
      id: 'elefant',
      definite: 'der Elefant',
      translation: 'the elephant',
      indefinite: 'Das ist ein Elefant.',
      indefTranslation: 'This is an elephant.',
      icon: '🐘',
      slide: 'Slide 11',
      gender: 'Maskulin: der -> ein'
    }
  ];

  const currentStory = STORIES[selectedStoryIdx];

  const toggleReveal = (id) => {
    playChime('click');
    setExerciseRevealed(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
              Lesson 19 Studio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              unbestimmte Artikel • ein, eine, ein ✨
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl">
              Master how to say "A" or "An" in German! Learn the storytelling sequence (introduce with <em>ein/eine</em>, describe with <em>der/die/das</em>) and the golden rule: plural has no article!
            </p>
          </div>
          <button
            onClick={() => {
              playChime('click');
              speakGerman("unbestimmte Artikel: ein Apfel, ein Mann, eine Frau, ein Mädchen, und Blumen im Plural!", isSlowMode);
            }}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2.5 rounded-2xl font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Volume2 className="w-5 h-5" />
            <span>Hear Overview</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-stone-200/80 p-1.5 rounded-2xl">
        <button
          onClick={() => { setActiveTab('stories'); playChime('click'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'stories'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>1. The 5 Slide Stories (Slide 1, 3, 4, 5, 6)</span>
        </button>
        <button
          onClick={() => { setActiveTab('exercises'); playChime('click'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'exercises'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-indigo-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>2. Interactive Übung (Slide 8-11)</span>
        </button>
        <button
          onClick={() => { setActiveTab('table'); playChime('click'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'table'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-amber-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-600" />
          <span>3. Master Comparison Table (Slide 12)</span>
        </button>
      </div>

      {/* TAB 1: Stories */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          {/* Story Selector Pills */}
          <div className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-2">
            <span className="text-xs font-black text-stone-500 uppercase tracking-wider">Select a Slide Story:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none flex-nowrap sm:flex-wrap">
              {STORIES.map((s, idx) => {
                const isSelected = selectedStoryIdx === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStoryIdx(idx);
                      playChime('click');
                      speakGerman(`${s.firstMention} ${s.secondMention}`, isSlowMode);
                    }}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isSelected
                        ? 'bg-stone-900 text-amber-300 shadow-lg scale-102 ring-2 ring-amber-400'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                    }`}
                  >
                    <span>{s.icon.split(' ')[0]}</span>
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Story Stage */}
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border-3 shadow-xl space-y-6 ${currentStory.color.split(' ')[0]}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-stone-200 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{currentStory.icon}</span>
                  <div>
                    <h3 className="text-2xl font-black text-stone-900">{currentStory.title}</h3>
                    <span className="inline-block text-xs font-bold text-stone-500">
                      {currentStory.gender} • {currentStory.badge}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime('click');
                  speakGerman(`${currentStory.firstMention} ${currentStory.secondMention}`, isSlowMode);
                }}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Story</span>
              </button>
            </div>

            {/* The 2-Step Evolution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Step 1: First Mention (Unbestimmt / Indefinite) */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentStory.firstMention, isSlowMode); }}
                className="bg-stone-50 hover:bg-amber-50/70 p-6 rounded-3xl border-2 border-amber-300 transition-all cursor-pointer shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-amber-200/80 text-amber-950 px-3 py-1 rounded-full">
                    Step 1: First Mention (A / An)
                  </span>
                  <span className="text-xs text-amber-800 font-bold font-mono">
                    Article: {currentStory.firstArticle}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
                  {currentStory.firstMention}
                </div>
                <p className="text-sm text-stone-600 italic">
                  ({currentStory.firstTrans})
                </p>
                <div className="text-xs text-amber-900 font-medium pt-1 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tap to listen to Step 1</span>
                </div>
              </div>

              {/* Step 2: Specific Mention (Bestimmt / Definite) */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentStory.secondMention, isSlowMode); }}
                className="bg-stone-50 hover:bg-teal-50/70 p-6 rounded-3xl border-2 border-teal-400 transition-all cursor-pointer shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-teal-200/80 text-teal-950 px-3 py-1 rounded-full">
                    Step 2: Specific Mention (The)
                  </span>
                  <span className="text-xs text-teal-800 font-bold font-mono">
                    Article: {currentStory.secondArticle}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
                  {currentStory.secondMention}
                </div>
                <p className="text-sm text-stone-600 italic">
                  ({currentStory.secondTrans})
                </p>
                <div className="text-xs text-teal-900 font-medium pt-1 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Tap to listen to Step 2</span>
                </div>
              </div>
            </div>

            {/* Rule Tip Banner */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 font-medium flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-black text-emerald-900">Story Key Takeaway:</strong>
                <p className="mt-0.5 text-stone-700">{currentStory.ruleTip}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Exercises */}
      {activeTab === 'exercises' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-indigo-200 shadow-xl space-y-6">
          <div className="border-b pb-4 border-stone-200">
            <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider">Classroom Practice (Slide 8-11)</span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Übung: From Definite to Indefinite 👜 📖 🐘
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Tap each flashcard to reveal how the definite noun turns into an indefinite sentence ("This is a..."), and hear natural German audio!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EXERCISES.map((ex) => {
              const isRevealed = exerciseRevealed[ex.id];

              return (
                <div
                  key={ex.id}
                  className="bg-stone-50 rounded-3xl p-6 border-2 border-stone-200 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-5xl">{ex.icon}</span>
                      <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                        {ex.slide}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-black uppercase text-stone-400 block">Definite Noun:</span>
                      <div className="text-2xl font-black text-stone-900 font-mono">{ex.definite}</div>
                      <p className="text-xs text-stone-500 italic">({ex.translation})</p>
                    </div>

                    <div className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-xl">
                      {ex.gender}
                    </div>

                    {isRevealed && (
                      <div className="bg-white rounded-2xl p-4 border-2 border-emerald-400 animate-fadeIn space-y-1">
                        <span className="text-[11px] font-black uppercase text-emerald-800 block">Indefinite Sentence:</span>
                        <div className="text-lg font-black text-stone-900 font-mono">{ex.indefinite}</div>
                        <p className="text-xs text-stone-600 italic">({ex.indefTranslation})</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => toggleReveal(ex.id)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>{isRevealed ? 'Hide Sentence' : 'Reveal: "Das ist..."'}</span>
                    </button>

                    {isRevealed && (
                      <button
                        onClick={() => {
                          playChime('click');
                          speakGerman(`${ex.definite}. ${ex.indefinite}`, isSlowMode);
                        }}
                        className="w-full py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Hear Native Audio</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Master Table */}
      {activeTab === 'table' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="border-b pb-4 border-stone-200">
            <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">Slide 12 Master Chalkboard</span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              At a glance: bestimmte vs. unbestimmte Artikel 📋
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Exact replica of the classroom chalkboard summary. Tap any row to hear both articles side by side!
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-900 text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                  <th className="p-4 rounded-tl-2xl">Gender</th>
                  <th className="p-4">Bestimmte ("The")</th>
                  <th className="p-4">Unbestimmte ("A / An")</th>
                  <th className="p-4 rounded-tr-2xl text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs sm:text-sm font-bold text-stone-800">
                {/* Maskulin */}
                <tr
                  onClick={() => { playChime('click'); speakGerman("Maskulin: der Mann, ein Mann. Der Apfel, ein Apfel.", isSlowMode); }}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-mono text-blue-900 flex items-center gap-2">
                    <span>🔵</span>
                    <span>maskulin (Singular)</span>
                  </td>
                  <td className="p-4 font-mono font-black text-base text-blue-700">der</td>
                  <td className="p-4 font-mono font-black text-base text-stone-900">ein</td>
                  <td className="p-4 text-center">
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl cursor-pointer">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                {/* Feminin */}
                <tr
                  onClick={() => { playChime('click'); speakGerman("Feminin: die Frau, eine Frau. Die Tasche, eine Tasche.", isSlowMode); }}
                  className="hover:bg-rose-50/50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-mono text-rose-900 flex items-center gap-2">
                    <span>🔴</span>
                    <span>feminin (Singular)</span>
                  </td>
                  <td className="p-4 font-mono font-black text-base text-rose-700">die</td>
                  <td className="p-4 font-mono font-black text-base text-stone-900">eine</td>
                  <td className="p-4 text-center">
                    <button className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl cursor-pointer">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                {/* Neutral */}
                <tr
                  onClick={() => { playChime('click'); speakGerman("Neutral: das Mädchen, ein Mädchen. Das Buch, ein Buch.", isSlowMode); }}
                  className="hover:bg-amber-50/50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-mono text-amber-900 flex items-center gap-2">
                    <span>🟡</span>
                    <span>neutral (Singular)</span>
                  </td>
                  <td className="p-4 font-mono font-black text-base text-amber-700">das</td>
                  <td className="p-4 font-mono font-black text-base text-stone-900">ein</td>
                  <td className="p-4 text-center">
                    <button className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl cursor-pointer">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                {/* Plural */}
                <tr
                  onClick={() => { playChime('click'); speakGerman("Plural: die Blumen. Im Plural gibt es keinen unbestimmten Artikel.", isSlowMode); }}
                  className="hover:bg-emerald-50/50 cursor-pointer transition-colors bg-emerald-50/30"
                >
                  <td className="p-4 font-mono text-emerald-900 flex items-center gap-2">
                    <span>🟢</span>
                    <span>Plural (m / f / n)</span>
                  </td>
                  <td className="p-4 font-mono font-black text-base text-emerald-700">die</td>
                  <td className="p-4 font-mono font-black text-base text-stone-400 italic">— (No Article)</td>
                  <td className="p-4 text-center">
                    <button className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl cursor-pointer">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-stone-700">
            <strong className="text-amber-950 block mb-1">💡 The Twin Secret:</strong>
            Notice that <strong>maskulin</strong> (<em>ein</em>) and <strong>neutral</strong> (<em>ein</em>) are identical twins! Only <strong>feminin</strong> adds the <em>-e</em> ending (<em>eine</em>), exactly like <em>die</em>!
          </div>
        </div>
      )}
    </div>
  );
}
