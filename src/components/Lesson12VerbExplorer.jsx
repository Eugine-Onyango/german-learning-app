import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, Split, Layers, TreeDeciduous, Dumbbell } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson12VerbExplorer({ isSlowMode }) {
  const [activeMode, setActiveMode] = useState('tree'); // 'tree', 'conjugate', 'compare'
  const [selectedVerbIdx, setSelectedVerbIdx] = useState(0);
  const [selectedPronoun, setSelectedPronoun] = useState('ich');

  const STEM_VERBS = [
    { infinitive: 'lernen', stem: 'lern', ending: 'en', meaning: 'to learn', icon: '📖', example: 'Ich lerne Deutsch.' },
    { infinitive: 'wohnen', stem: 'wohn', ending: 'en', meaning: 'to live', icon: '🏡', example: 'Ich wohne in Berlin.' },
    { infinitive: 'machen', stem: 'mach', ending: 'en', meaning: 'to do / make', icon: '🛠️', example: 'Was machst du?' },
    { infinitive: 'spielen', stem: 'spiel', ending: 'en', meaning: 'to play', icon: '⚽', example: 'Ich spiele Fußball.' },
    { infinitive: 'hören', stem: 'hör', ending: 'en', meaning: 'to hear / listen', icon: '🎧', example: 'Ich höre Musik.' },
    { infinitive: 'kommen', stem: 'komm', ending: 'en', meaning: 'to come', icon: '✈️', example: 'Ich komme aus Kenia.' },
  ];

  const REGULAR_VERBS = [
    { infinitive: 'heißen', stem: 'heiß', du: 'heißt', er: 'heißt', meaning: 'to be called', note: 'Stem ends in ß, so du takes -t instead of -st' },
    { infinitive: 'wohnen', stem: 'wohn', du: 'wohnst', er: 'wohnt', meaning: 'to live', note: 'Standard -st / -t endings' },
    { infinitive: 'machen', stem: 'mach', du: 'machst', er: 'macht', meaning: 'to do / make', note: 'Standard -st / -t endings' },
    { infinitive: 'spielen', stem: 'spiel', du: 'spielst', er: 'spielt', meaning: 'to play', note: 'Standard -st / -t endings' },
    { infinitive: 'studieren', stem: 'studier', du: 'studierst', er: 'studiert', meaning: 'to study', note: 'Standard -st / -t endings' },
    { infinitive: 'arbeiten', stem: 'arbeit', du: 'arbeitest', er: 'arbeitet', meaning: 'to work', note: 'Stem ends in -t, adds friendly -e- (arbeitest)' }
  ];

  const IRREGULAR_VERBS = [
    { infinitive: 'schlafen', stemChange: 'a -> ä', du: 'schläfst', er: 'schläft', meaning: 'to sleep', flipDesc: 'Vowel "a" grows dots into "ä"!' },
    { infinitive: 'essen', stemChange: 'e -> i', du: 'isst', er: 'isst', meaning: 'to eat', flipDesc: 'Vowel "e" turns into "i" with double s (isst)!' },
    { infinitive: 'sehen', stemChange: 'e -> ie', du: 'siehst', er: 'sieht', meaning: 'to see', flipDesc: 'Vowel "e" stretches into long "ie" (siehst)!' },
    { infinitive: 'nehmen', stemChange: 'e -> i(mm)', du: 'nimmst', er: 'nimmt', meaning: 'to take', flipDesc: 'Vowel "e" turns into "i" with double m (nimmst)!' },
    { infinitive: 'treffen', stemChange: 'e -> i', du: 'triffst', er: 'trifft', meaning: 'to meet', flipDesc: 'Vowel "e" changes into short sharp "i" (triffst)!' },
    { infinitive: 'fahren', stemChange: 'a -> ä', du: 'fährst', er: 'fährt', meaning: 'to drive', flipDesc: 'Vowel "a" takes an umlaut into "ä" (fährst)!' }
  ];

  const PRONOUNS = [
    { id: 'ich', label: 'ich (I)', person: '1. Person Singular', ending: '-e', exampleVerb: 'komme', fullSentence: 'Ich komme aus China.', flag: '🇨🇳' },
    { id: 'du', label: 'du (you)', person: '2. Person Singular', ending: '-st', exampleVerb: 'kommst', fullSentence: 'Kommst du aus Kenia?', flag: '🇰🇪' },
    { id: 'er', label: 'er / sie / es (he/she/it)', person: '3. Person Singular', ending: '-t', exampleVerb: 'kommt', fullSentence: 'Er kommt aus Deutschland.', flag: '🇩🇪' },
    { id: 'wir', label: 'wir (we)', person: '1. Person Plural', ending: '-en', exampleVerb: 'kommen', fullSentence: 'Wir kommen zusammen.', flag: '🤝' },
    { id: 'ihr', label: 'ihr (you all)', person: '2. Person Plural', ending: '-t', exampleVerb: 'kommt', fullSentence: 'Kommt ihr aus Japan?', flag: '🇯🇵' },
    { id: 'sie', label: 'sie / Sie (they/You formal)', person: '3. Person Plural / Formal', ending: '-en', exampleVerb: 'kommen', fullSentence: 'Kommen Sie bitte herein.', flag: '🎩' }
  ];

  const currentStemVerb = STEM_VERBS[selectedVerbIdx];
  const currentPronounObj = PRONOUNS.find(p => p.id === selectedPronoun) || PRONOUNS[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <TreeDeciduous className="w-4 h-4 text-emerald-200" />
              <span>Lesson 12: Verb Structure & Conjugation Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Was ist ein Verb? (The Sentence Engine) 🚗⚡
            </h2>
            <p className="text-white/90 text-xs sm:text-sm font-medium max-w-xl">
              Every sentence needs an action engine. Discover how verbs are built like trees (<strong>Verbstamm</strong> trunk + <strong>Endung</strong> leaves), and see the battle between obedient <strong>regular verbs</strong> and superhero <strong>irregular verbs</strong>!
            </p>
          </div>
          <button
            onClick={() => {
              playChime('click');
              speakGerman("Was ist ein Verb? Ein Verb beschreibt eine Handlung. Ich spiele Fußball.", isSlowMode);
            }}
            className="flex items-center gap-2 bg-white text-stone-900 hover:bg-amber-100 px-5 py-3 rounded-2xl font-black text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>Hear Lesson Audio</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/70 rounded-2xl border border-stone-300">
        <button
          onClick={() => { setActiveMode('tree'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeMode === 'tree'
              ? 'bg-white text-emerald-950 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <TreeDeciduous className="w-4 h-4 text-emerald-600" />
          <span>1. Tree Structure (Stem & Ending)</span>
        </button>
        <button
          onClick={() => { setActiveMode('conjugate'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeMode === 'conjugate'
              ? 'bg-white text-blue-950 shadow-md ring-2 ring-blue-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-4 h-4 text-blue-600" />
          <span>2. Conjugation & Persons</span>
        </button>
        <button
          onClick={() => { setActiveMode('compare'); playChime('click'); }}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeMode === 'compare'
              ? 'bg-white text-amber-950 shadow-md ring-2 ring-amber-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Dumbbell className="w-4 h-4 text-amber-600" />
          <span>3. Regular vs Irregular (Slide 11)</span>
        </button>
      </div>

      {/* MODE 1: Tree Structure (Stem & Ending) */}
      {activeMode === 'tree' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">Slide 4 Interactive Architecture</span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Infinitiv = Verbstamm (Stem) + Endung (Ending)
              </h3>
            </div>
            <span className="text-2xl">🪵 🍃</span>
          </div>

          {/* Quick verb selector chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Pick a verb to disassemble:</span>
            <div className="flex flex-wrap gap-2">
              {STEM_VERBS.map((v, idx) => (
                <button
                  key={v.infinitive}
                  onClick={() => {
                    setSelectedVerbIdx(idx);
                    playChime('click');
                    speakGerman(v.infinitive, isSlowMode);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedVerbIdx === idx
                      ? 'bg-emerald-600 text-white shadow-md scale-105'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  <span>{v.icon}</span>
                  <span>{v.infinitive}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Big Visual Tree / Engine Disassembly Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-50 rounded-3xl p-6 sm:p-8 border-3 border-emerald-300 text-center space-y-6 shadow-inner">
            <div className="text-sm font-extrabold text-stone-600 flex items-center justify-center gap-2">
              <span>Full Dictionary Form (Infinitiv):</span>
              <span className="text-emerald-900 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-xs font-black text-lg">
                {currentStemVerb.infinitive}
              </span>
              <span className="text-stone-400">({currentStemVerb.meaning})</span>
            </div>

            {/* Split Visual */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
              {/* Verbstamm */}
              <div className="bg-white rounded-2xl p-5 border-3 border-amber-400 shadow-lg min-w-[140px] sm:min-w-[180px]">
                <div className="text-xs font-black text-amber-700 uppercase tracking-wide">Verbstamm (Stem)</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-950 my-1 font-mono">
                  {currentStemVerb.stem}
                </div>
                <div className="text-[11px] font-bold text-stone-500">
                  🪵 The Solid Trunk (Doesn't change in regular verbs!)
                </div>
              </div>

              <div className="text-2xl font-black text-stone-400">+</div>

              {/* Endung */}
              <div className="bg-white rounded-2xl p-5 border-3 border-emerald-400 shadow-lg min-w-[140px] sm:min-w-[180px]">
                <div className="text-xs font-black text-emerald-700 uppercase tracking-wide">Endung (Ending)</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-700 my-1 font-mono">
                  -{currentStemVerb.ending}
                </div>
                <div className="text-[11px] font-bold text-stone-500">
                  🍃 The Seasonal Leaf (-en / -n swap)
                </div>
              </div>
            </div>

            {/* Example sentence */}
            <div className="bg-white/90 rounded-2xl p-4 border border-emerald-200 max-w-md mx-auto flex items-center justify-between gap-3 shadow-xs">
              <div className="text-left">
                <div className="text-[11px] font-bold text-stone-500 uppercase">Slide 3 & 4 Example in Action:</div>
                <div className="text-base sm:text-lg font-black text-stone-900">{currentStemVerb.example}</div>
              </div>
              <button
                onClick={() => {
                  speakGerman(currentStemVerb.example, isSlowMode);
                  playChime('click');
                }}
                className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer flex-shrink-0"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Layman Analogy Card */}
          <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-300 text-xs sm:text-sm text-stone-800 space-y-1.5">
            <h4 className="font-black text-amber-950 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              The Relatable Layman Tree Analogy:
            </h4>
            <p className="leading-relaxed">
              Never be intimidated by grammar terms! A tree trunk (<strong>Verbstamm</strong>) is planted deep in the ground—it stays firm. The seasonal leaves (<strong>Endung</strong>) come and go depending on who is talking. For dictionary base verbs, the ending is almost always <strong>-en</strong> or <strong>-n</strong>!
            </p>
          </div>
        </div>
      )}

      {/* MODE 2: Verbkonjugation & Persons (Slides 6 & 7) */}
      {activeMode === 'conjugate' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">Slides 6 & 7 System Matrix</span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Verbkonjugation: Who is Driving the Verb?
              </h3>
            </div>
            <span className="text-2xl">🇨🇳 🇯🇵</span>
          </div>

          {/* Pronoun Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {PRONOUNS.map((p) => {
              const isSelected = selectedPronoun === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPronoun(p.id);
                    playChime('click');
                    speakGerman(p.fullSentence, isSlowMode);
                  }}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 shadow-lg scale-102 ring-2 ring-blue-300'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold opacity-80">{p.person}</span>
                    <span className="text-lg">{p.flag}</span>
                  </div>
                  <div className="text-base sm:text-lg font-black mt-1">{p.label}</div>
                  <div className={`text-xs font-bold mt-1 ${isSelected ? 'text-blue-100' : 'text-blue-700'}`}>
                    Ending: {p.ending}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Conjugation Spotlight */}
          <div className="bg-blue-50/80 rounded-3xl p-6 border-3 border-blue-300 space-y-4 text-center">
            <div className="text-xs font-black text-blue-900 uppercase tracking-widest">
              Live Sentence Showcase (From Slide 6)
            </div>

            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              {currentPronounObj.fullSentence}
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="bg-white px-3 py-1 rounded-full border border-blue-200 text-xs font-bold text-stone-600">
                Driver (Subject): <strong className="text-blue-800">{currentPronounObj.label}</strong>
              </span>
              <span className="bg-white px-3 py-1 rounded-full border border-blue-200 text-xs font-bold text-stone-600">
                Verb Outfit: <strong className="text-emerald-700">{currentPronounObj.ending}</strong>
              </span>
            </div>

            <button
              onClick={() => {
                speakGerman(currentPronounObj.fullSentence, isSlowMode);
                playChime('click');
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>Hear Sentence Audio</span>
            </button>
          </div>

          {/* Person Breakdown (Slide 7 Table) */}
          <div className="overflow-x-auto rounded-2xl border-2 border-stone-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100 text-stone-700 uppercase font-black">
                <tr>
                  <th className="p-3">Grammar Person</th>
                  <th className="p-3">Singular (1 Person)</th>
                  <th className="p-3">Plural (Multiple People)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-blue-900">1. Person (Speaker)</td>
                  <td className="p-3"><strong>ich</strong> (I) $\rightarrow$ -e</td>
                  <td className="p-3"><strong>wir</strong> (we) $\rightarrow$ -en</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-blue-900">2. Person (Listener)</td>
                  <td className="p-3"><strong>du</strong> (you) $\rightarrow$ -st</td>
                  <td className="p-3"><strong>ihr</strong> (you all) $\rightarrow$ -t</td>
                </tr>
                <tr className="hover:bg-blue-50/40">
                  <td className="p-3 font-bold text-blue-900">3. Person (Talked About)</td>
                  <td className="p-3"><strong>er / sie / es</strong> $\rightarrow$ -t</td>
                  <td className="p-3"><strong>sie / Sie</strong> $\rightarrow$ -en</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODE 3: Regular vs Irregular (Slide 11 Master Showcase) */}
      {activeMode === 'compare' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">Slide 11 Direct Comparison</span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Regelmäßige Verben (Weak) vs. Unregelmäßige Verben (Strong)
              </h3>
            </div>
            <span className="text-2xl">🛡️ ⚡</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Regular Verbs (Schwache Verben) */}
            <div className="bg-emerald-50/70 rounded-3xl p-5 border-3 border-emerald-300 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-emerald-800 tracking-wide">
                    regelmäßige Verben
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    "Schwache Verben" (Obedient Verbs)
                  </div>
                </div>
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-200 text-xs text-stone-600">
                <strong>Superpower:</strong> The <em>Verbstamm</em> <strong>never changes</strong> its letters! (e.g., <em>lernen $\rightarrow$ du lernst</em>).
              </div>

              <div className="space-y-2">
                {REGULAR_VERBS.map((v) => (
                  <div
                    key={v.infinitive}
                    onClick={() => {
                      speakGerman(`${v.infinitive}. du ${v.du}. er ${v.er}.`, isSlowMode);
                      playChime('click');
                    }}
                    className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-emerald-950 text-base">{v.infinitive}</span>
                        <span className="text-xs text-stone-500">({v.meaning})</span>
                      </div>
                      <div className="text-xs font-bold text-stone-700 mt-0.5">
                        du <span className="text-emerald-700 font-extrabold">{v.du}</span> • er <span className="text-emerald-700 font-extrabold">{v.er}</span>
                      </div>
                    </div>
                    <button className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Irregular Verbs (Starke Verben) */}
            <div className="bg-amber-50/70 rounded-3xl p-5 border-3 border-amber-300 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-amber-800 tracking-wide">
                    unregelmäßige Verben
                  </div>
                  <div className="text-lg font-black text-stone-900">
                    "Starke Verben" (Superhero Verbs)
                  </div>
                </div>
                <span className="text-2xl">🦸‍♂️⚡</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-xs text-stone-600">
                <strong>Superpower:</strong> The <em>Verbstamm</em> <strong>flexes and shifts</strong> its internal vowel (e.g., <em>sprechen $\rightarrow$ du sprichst</em>)!
              </div>

              <div className="space-y-2">
                {IRREGULAR_VERBS.map((v) => (
                  <div
                    key={v.infinitive}
                    onClick={() => {
                      speakGerman(`${v.infinitive}. du ${v.du}. er ${v.er}.`, isSlowMode);
                      playChime('click');
                    }}
                    className="bg-white p-3 rounded-2xl border border-amber-200 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-amber-950 text-base">{v.infinitive}</span>
                        <span className="text-xs text-stone-500">({v.meaning})</span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                          {v.stemChange}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-stone-700 mt-0.5">
                        du <span className="text-rose-600 font-extrabold">{v.du}</span> • er <span className="text-rose-600 font-extrabold">{v.er}</span>
                      </div>
                      <div className="text-[10px] text-amber-700 font-medium italic">
                        {v.flipDesc}
                      </div>
                    </div>
                    <button className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
