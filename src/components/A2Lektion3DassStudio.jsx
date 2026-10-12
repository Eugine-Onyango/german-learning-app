import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_DASS_TRANSFORM_EXAMPLES } from '../data/germanLessonsA2';

export default function A2Lektion3DassStudio({ isSlowMode = false }) {
  const [selectedExampleIdx, setSelectedExampleIdx] = useState(0);
  const [starterPhrase, setStarterPhrase] = useState('Ich weiß');
  const [subjectClause, setSubjectClause] = useState('du');
  const [activityClause, setActivityClause] = useState('Deutsch lernst');
  const [activeVerbType, setActiveVerbType] = useState('all');

  const starters = [
    { de: "Ich weiß", en: "I know" },
    { de: "Ich habe gehört", en: "I have heard" },
    { de: "Ich glaube", en: "I believe" },
    { de: "Es ist wichtig", en: "It is important" },
    { de: "Es ist schön", en: "It is nice" },
    { de: "Ich denke", en: "I think" },
    { de: "Ich finde es gut", en: "I find it good" },
    { de: "Ich bin mir sicher", en: "I am sure" }
  ];

  const presets = [
    { deSubject: "du", dePredicate: "jeden Tag Deutsch lernst", en: "you learn German every day" },
    { deSubject: "Bananen", dePredicate: "gesund sind", en: "bananas are healthy" },
    { deSubject: "Peter", dePredicate: "mich liebt", en: "Peter loves me" },
    { deSubject: "morgen", dePredicate: "die Sonne scheint", en: "the sun will shine tomorrow" },
    { deSubject: "wir", dePredicate: "am Montag frei haben", en: "we have off on Monday" },
    { deSubject: "du", dePredicate: "um 6 Uhr aufstehst", en: "you get up at 6 o'clock (separable!)" },
    { deSubject: "du", dePredicate: "die Prüfung bestanden hast", en: "you passed the exam (Perfekt!)" },
    { deSubject: "du", dePredicate: "besser schreiben kannst", en: "you can write better (Modalverb!)" }
  ];

  const currentConstructedSentence = `${starterPhrase}, dass ${subjectClause} ${activityClause}.`;

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  const filteredExamples = activeVerbType === 'all'
    ? A2_DASS_TRANSFORM_EXAMPLES
    : A2_DASS_TRANSFORM_EXAMPLES.filter(ex => ex.ruleType.toLowerCase().includes(activeVerbType.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-400/30">
              <span>⚽</span>
              <span>A2 Sentence Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
              Nebensätze mit „dass“ Studio
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Master the famous German <strong>"Verb-Kicker"</strong> rule! When you introduce a subordinate clause with <code className="text-amber-300 font-bold">„dass“</code> (that),
              the conjugated verb gets kicked straight out of Position 2 to the very finish line of the sentence.
            </p>
          </div>

          <button
            onClick={() => handleSpeak("Es ist wichtig, dass du jeden Tag Deutsch lernst! Hauptsatz, Komma, dass, und das Verb steht am Ende!")}
            className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm shrink-0"
          >
            <span>🔊</span>
            <span>Listen to Golden Rule</span>
          </button>
        </div>
      </div>

      {/* The 3-Step Visual Blueprint (Slides 3-5) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>📐</span>
            <span>The 3-Step German Subordinate Anatomy</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            See exactly how a main clause connects to a subordinate clause with mandatory punctuation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Step 1: Hauptsatz */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">
                Part 1 • Hauptsatz
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-200 dark:bg-sky-900 font-bold text-sky-900 dark:text-sky-200">
                Verb Pos 2
              </span>
            </div>
            <div className="text-xl font-black text-sky-950 dark:text-sky-100">
              Es <span className="underline decoration-amber-400 decoration-4">ist</span> wichtig
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-300">
              The main clause follows normal Position 2 verb rules. Answers "Was ist wichtig?"
            </p>
          </div>

          {/* Step 2: Komma + dass */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Part 2 • Punctuation & Link
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 font-bold text-amber-900 dark:text-amber-200">
                Mandatory ,
              </span>
            </div>
            <div className="text-xl font-black text-amber-950 dark:text-amber-200">
              <span className="text-rose-500 font-black">,</span> dass
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-300">
              A comma before "dass" is 100% required in German. "dass" triggers the verb-kick alarm!
            </p>
          </div>

          {/* Step 3: Nebensatz (Verb am Ende) */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Part 3 • Nebensatz
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 font-bold text-emerald-900 dark:text-emerald-200">
                Verb Am Ende!
              </span>
            </div>
            <div className="text-xl font-black text-emerald-950 dark:text-emerald-100">
              du jeden Tag Deutsch <span className="underline decoration-emerald-500 decoration-4 text-emerald-600 dark:text-emerald-400">lernst</span>.
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-300">
              Subject ('du') comes right after dass. The conjugated verb ('lernst') stands at the very end!
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Special Verb Classes (Slides 5, 6, 7, 8) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
              <span>🔬</span>
              <span>The 4 Verb Blueprints in a „dass“ Clause</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Regular verbs, Perfekt past tense (haben/sein), Separable verbs (re-glued), and Modal verbs!
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveVerbType('all')}
              className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                activeVerbType === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveVerbType('simple')}
              className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                activeVerbType === 'simple'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300'
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setActiveVerbType('perfekt')}
              className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                activeVerbType === 'perfekt'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300'
              }`}
            >
              Perfekt (hast)
            </button>
            <button
              onClick={() => setActiveVerbType('separable')}
              className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                activeVerbType === 'separable'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300'
              }`}
            >
              Separable
            </button>
            <button
              onClick={() => setActiveVerbType('modal')}
              className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                activeVerbType === 'modal'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300'
              }`}
            >
              Modal (kannst)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-850 border border-stone-200 dark:border-slate-700 flex flex-col justify-between hover:border-emerald-500 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  {ex.slide} • {ex.ruleType}
                </span>
                <button
                  onClick={() => handleSpeak(ex.combinedGerman)}
                  className="text-xs p-1 text-stone-400 hover:text-emerald-600 dark:hover:text-amber-400 cursor-pointer"
                  title="Pronounce Sentence"
                >
                  🔊
                </button>
              </div>

              {/* Transformation breakdown */}
              <div className="space-y-1">
                <div className="text-xs text-stone-500 dark:text-slate-400">
                  <span className="font-bold">Original:</span> {ex.hauptsatz}. <span className="line-through">{ex.originalNebensatz}</span>
                </div>
                <div className="text-base font-black text-stone-900 dark:text-white">
                  "{ex.combinedGerman}"
                </div>
                <div className="text-xs text-stone-600 dark:text-slate-400 italic">
                  "{ex.english}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Sentence Machine (Mix & Match) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-6">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>⚙️</span>
            <span>Interactive „dass“ Sentence Machine</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Combine any starter trigger with a subordinate action and listen to the natural German flow
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              1. Starter Clause (Hauptsatz)
            </label>
            <select
              value={starterPhrase}
              onChange={(e) => setStarterPhrase(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {starters.map((s, i) => (
                <option key={i} value={s.de}>
                  {s.de} ({s.en})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              2. Connector
            </label>
            <div className="w-full px-3 py-2 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl text-sm font-black text-emerald-900 dark:text-emerald-300 text-center">
              , dass (that)
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-slate-400">
              3. Preset Nebensatz Action
            </label>
            <select
              onChange={(e) => {
                const selected = presets[parseInt(e.target.value)];
                setSubjectClause(selected.deSubject);
                setActivityClause(selected.dePredicate);
              }}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-sm font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {presets.map((p, i) => (
                <option key={i} value={i}>
                  {p.deSubject} {p.dePredicate} ({p.en})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Audio Playback Display */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white border-2 border-emerald-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              Generated German Audio Sentence:
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-300">
              "{currentConstructedSentence}"
            </div>
          </div>
          <button
            onClick={() => handleSpeak(currentConstructedSentence)}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>🔊</span>
            <span>Pronounce Sentence</span>
          </button>
        </div>
      </div>
    </div>
  );
}
