import React, { useState } from 'react';
import { speakGerman } from '../utils/sound';
import { A2_WEIL_VS_DENN_PAIRS } from '../data/germanLessonsA2';

export default function A2Lektion4KausalsatzStudio({ isSlowMode = false }) {
  const [selectedStarter, setSelectedStarter] = useState('warum');
  const [sentenceOrder, setSentenceOrder] = useState('normal'); // 'normal' (Hauptsatz + weil) or 'inverted' (Weil/Da + Verb-Verb)
  const [activeReasonIdx, setActiveReasonIdx] = useState(0);

  const whyTriggers = [
    { de: "Warum", en: "Why? (Most common)", example: "Warum lernst du Deutsch?" },
    { de: "Wieso", en: "How come? (Casual & natural)", example: "Wieso lernst du Deutsch?" },
    { de: "Weshalb", en: "Wherefore / For what reason? (Formal)", example: "Weshalb lernst du Deutsch?" },
    { de: "Weswegen", en: "On what account? (Formal)", example: "Weswegen lernst du Deutsch?" },
    { de: "Aus welchem Grund", en: "For what official reason? (Official)", example: "Aus welchem Grund lernst du Deutsch?" }
  ];

  const reasonPresets = [
    {
      actionHaupt: "Ich lerne Deutsch",
      actionInverted: "lerne ich Deutsch",
      connector: "weil",
      subject: "ich",
      subordinateMiddle: "in Deutschland studieren",
      verbEnd: "will",
      fullNormal: "Ich lerne Deutsch, weil ich in Deutschland studieren will.",
      fullInverted: "Weil ich in Deutschland studieren will, lerne ich Deutsch.",
      english: "I am learning German because I want to study in Germany.",
      theme: "🎓 Study in Germany (Slide 4)"
    },
    {
      actionHaupt: "Ich lerne Deutsch",
      actionInverted: "lerne ich Deutsch",
      connector: "weil",
      subject: "ich",
      subordinateMiddle: "eine deutsche Freundin",
      verbEnd: "habe",
      fullNormal: "Ich lerne Deutsch, weil ich eine deutsche Freundin habe.",
      fullInverted: "Weil ich eine deutsche Freundin habe, lerne ich Deutsch.",
      english: "I am learning German because I have a German girlfriend.",
      theme: "❤️ German Girlfriend (Slide 5)"
    },
    {
      actionHaupt: "Ich kann nicht arbeiten",
      actionInverted: "kann ich nicht arbeiten",
      connector: "da",
      subject: "ich",
      subordinateMiddle: "krank",
      verbEnd: "bin",
      fullNormal: "Ich kann nicht arbeiten, da ich krank bin.",
      fullInverted: "Da ich krank bin, kann ich nicht arbeiten.",
      english: "I cannot work because / since I am sick.",
      theme: "🩺 Sick Leave with 'da' (Slide 9 & 10)"
    },
    {
      actionHaupt: "Ich bin spät",
      actionInverted: "bin ich spät",
      connector: "weil",
      subject: "ich",
      subordinateMiddle: "den Zug verpasst",
      verbEnd: "habe",
      fullNormal: "Ich bin spät, weil ich den Zug verpasst habe.",
      fullInverted: "Weil ich den Zug verpasst habe, bin ich spät.",
      english: "I am late because I missed the train.",
      theme: "🚆 Missed Train Perfekt (Slide 12 & 13)"
    },
    {
      actionHaupt: "Wir bleiben zu Hause",
      actionInverted: "bleiben wir zu Hause",
      connector: "da",
      subject: "es",
      subordinateMiddle: "heute",
      verbEnd: "regnet",
      fullNormal: "Wir bleiben zu Hause, weil es heute regnet.",
      fullInverted: "Da es heute regnet, bleiben wir zu Hause.",
      english: "We are staying home because it is raining today.",
      theme: "🌧️ Rainy Day at Home (Slide 14 & 15)"
    }
  ];

  const currentPreset = reasonPresets[activeReasonIdx];
  const activeGermanSentence = sentenceOrder === 'normal' ? currentPreset.fullNormal : currentPreset.fullInverted;

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-orange-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-amber-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <span>🎯</span>
              <span>A2 Causal Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
              Kausalsätze mit „weil“ und „da“ Studio
            </h2>
            <p className="text-sm sm:text-base text-amber-100/90 max-w-2xl leading-relaxed">
              Express causes, justifications, and reasons! Master the 5 question triggers (<code className="text-amber-300 font-bold">Warum, Wieso, Weshalb...</code>),
              the <strong>Verb-Verb Collision rule</strong> when starting with Weil/Da, and the legendary showdown between <code className="text-amber-300 font-bold">weil</code> (Verb am Ende) vs. <code className="text-amber-300 font-bold">denn</code> (Position 0)!
            </p>
          </div>

          <button
            onClick={() => handleSpeak("Kausalsätze sind Nebensätze. Sie geben den Grund oder die Ursache an. Ich lerne Deutsch, weil ich in Deutschland studieren will.")}
            className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm shrink-0"
          >
            <span>🔊</span>
            <span>Listen to Core Rule</span>
          </button>
        </div>
      </div>

      {/* 5 'Why' Questions Selector (Slide 6) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>❓</span>
            <span>The 5 German Ways to Ask "Why?" (Slide 6)</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Click any question trigger to hear its natural rhythm and see its nuance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {whyTriggers.map((trig, idx) => {
            const isSelected = selectedStarter === trig.de.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedStarter(trig.de.toLowerCase());
                  handleSpeak(trig.example);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 shadow-md ring-2 ring-amber-400'
                    : 'border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-850 hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="text-lg font-black text-amber-900 dark:text-amber-300">
                    {trig.de}?
                  </div>
                  <div className="text-xs text-stone-500 dark:text-slate-400 italic">
                    {trig.en}
                  </div>
                </div>
                <div className="mt-3 text-[11px] font-bold text-stone-700 dark:text-slate-300">
                  "{trig.example}"
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Structure Architecture: Normal vs. Inverted Collision (Slides 4 vs 10 & 15) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
              <span>⚡</span>
              <span>Sentence Order Switcher: Normal vs. Inverted Verb Collision</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Switching clause order changes where verbs stand!
            </p>
          </div>

          <div className="flex p-1 bg-stone-100 dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-700">
            <button
              onClick={() => setSentenceOrder('normal')}
              className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                sentenceOrder === 'normal'
                  ? 'bg-amber-500 text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
              }`}
            >
              Order A: Hauptsatz + weil
            </button>
            <button
              onClick={() => setSentenceOrder('inverted')}
              className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                sentenceOrder === 'inverted'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
              }`}
            >
              Order B: Weil/Da first (Verb-Verb Collision!)
            </button>
          </div>
        </div>

        {/* Selected Preset Selector */}
        <div className="flex flex-wrap gap-2">
          {reasonPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActiveReasonIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                activeReasonIdx === idx
                  ? 'bg-stone-900 text-amber-300 dark:bg-white dark:text-stone-900 shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              {p.theme}
            </button>
          ))}
        </div>

        {/* Visual Formula Diagrams */}
        {sentenceOrder === 'normal' ? (
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Formula A: Hauptsatz (Pos 2) + , + weil / da + Verb am Ende
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 font-bold text-amber-900 dark:text-amber-200">
                Slide 4 Blueprint
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-black text-stone-900 dark:text-white">
              <span className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700 text-sky-700 dark:text-sky-300">
                {currentPreset.actionHaupt}
              </span>
              <span className="text-rose-500 font-black text-xl">,</span>
              <span className="px-3 py-1.5 bg-amber-200 dark:bg-amber-900 rounded-xl text-amber-950 dark:text-amber-100">
                {currentPreset.connector}
              </span>
              <span className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700">
                {currentPreset.subject} {currentPreset.subordinateMiddle}
              </span>
              <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/60 rounded-xl border-2 border-emerald-500 text-emerald-950 dark:text-emerald-200">
                {currentPreset.verbEnd} (Ende)
              </span>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-400 dark:border-orange-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-800 dark:text-orange-300">
                Formula B: Weil / Da + Verb am Ende ➔ , ➔ [VERB] + Subjekt (Verb Collision!)
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-200 dark:bg-orange-900 font-bold text-orange-900 dark:text-orange-200">
                Slide 10 & 15 Rule
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-black text-stone-900 dark:text-white">
              <span className="px-3 py-1.5 bg-orange-200 dark:bg-orange-900 rounded-xl text-orange-950 dark:text-orange-100">
                {currentPreset.connector === 'da' ? 'Da' : 'Weil'}
              </span>
              <span className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700">
                {currentPreset.subject} {currentPreset.subordinateMiddle}
              </span>
              <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/60 rounded-xl border-2 border-emerald-500 text-emerald-950 dark:text-emerald-200">
                {currentPreset.verbEnd}
              </span>
              <span className="text-rose-500 font-black text-xl">,</span>
              <span className="px-3 py-1.5 bg-sky-100 dark:bg-sky-900/60 rounded-xl border-2 border-sky-500 text-sky-950 dark:text-sky-200">
                {currentPreset.actionInverted}
              </span>
            </div>
            <p className="text-xs text-orange-900 dark:text-orange-200 font-bold">
              🔥 Kenyan Pro Tip: Notice how the two verbs (<span className="underline">{currentPreset.verbEnd}</span> and <span className="underline">{currentPreset.actionInverted.split(' ')[0]}</span>) sit right next to each other separated only by the comma!
            </p>
          </div>
        )}

        {/* Live Audio Preview */}
        <div className="p-5 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-amber-500/30">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Active Audio Sentence:
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-300">
              "{activeGermanSentence}"
            </div>
            <div className="text-xs text-stone-400 italic">
              "{currentPreset.english}"
            </div>
          </div>
          <button
            onClick={() => handleSpeak(activeGermanSentence)}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>🔊</span>
            <span>Pronounce Sentence</span>
          </button>
        </div>
      </div>

      {/* Epic Showdown: "weil" vs. "denn" (Slides 18 & 19) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-stone-200 dark:border-slate-700 space-y-4">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
            <span>🥊</span>
            <span>The Showdown: „weil“ vs. „denn“ (Slides 18 & 19)</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Both mean "because", but they require completely different word orders!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {A2_WEIL_VS_DENN_PAIRS.map((pair, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-850 border border-stone-200 dark:border-slate-700 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-stone-700 dark:text-slate-300">
                  {pair.topic} • {pair.slide}
                </span>
                <button
                  onClick={() => handleSpeak(`${pair.weilVersion} Aber mit denn: ${pair.dennVersion}`)}
                  className="text-xs p-1 text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
                  title="Compare both pronunciations"
                >
                  🔊 Compare Both
                </button>
              </div>

              {/* weil card */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800">
                <div className="flex items-center justify-between text-xs text-amber-900 dark:text-amber-300 font-bold mb-1">
                  <span>With „weil“ (Subordinate)</span>
                  <span className="bg-amber-200 dark:bg-amber-900 px-1.5 py-0.5 rounded text-[10px]">
                    {pair.verbWeil}
                  </span>
                </div>
                <div className="text-sm font-black text-stone-900 dark:text-white">
                  "{pair.weilVersion}"
                </div>
              </div>

              {/* denn card */}
              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-300 dark:border-sky-800">
                <div className="flex items-center justify-between text-xs text-sky-900 dark:text-sky-300 font-bold mb-1">
                  <span>With „denn“ (Pos 0 Conjunction)</span>
                  <span className="bg-sky-200 dark:bg-sky-900 px-1.5 py-0.5 rounded text-[10px]">
                    {pair.verbDenn}
                  </span>
                </div>
                <div className="text-sm font-black text-stone-900 dark:text-white">
                  "{pair.dennVersion}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
