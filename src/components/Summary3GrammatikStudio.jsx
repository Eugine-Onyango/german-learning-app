import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen, ShieldCheck, Heart, User, Briefcase, Smile, Users, Layers, AlertCircle } from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary3GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('verbs'); // 'verbs', 'plurals', 'possessive', 'inversion', 'redemittel'

  // Station 1: Verbs ending in d/t
  const [selectedVerb, setSelectedVerb] = useState('arbeiten'); // 'arbeiten', 'warten', 'finden'
  const [selectedPronoun, setSelectedPronoun] = useState('du');

  // Station 2: Plural Blueprints
  const [selectedBlueprint, setSelectedBlueprint] = useState(1); // 1 to 5

  // Station 3: Possessives & Family Matrix
  const [selectedOwner, setSelectedOwner] = useState('ich'); // 'ich', 'du', 'er', 'es', 'sie', 'wir', 'ihr', 'sie_pl', 'Sie'
  const [selectedFamilyNoun, setSelectedFamilyNoun] = useState('bruder'); // 'bruder' (mask), 'kind' (neut), 'tante' (fem), 'kinder' (pl)
  const [genitivName, setGenitivName] = useState('Tim');

  // Station 4: Inversion Cross Machine
  const [isInverted, setIsInverted] = useState(false);
  const [inversionTopic, setInversionTopic] = useState('Tennis'); // 'Tennis', 'Mathematik', 'Deutsch', 'Wandern'

  // Verbs ending in d/t data (Page 1)
  const dtVerbsData = {
    arbeiten: {
      infinitive: 'arbeiten (to work)',
      stem: 'arbeit-',
      rule: 'Stem ends in -t. Inserts extra "-e-" cushion before -st and -t!',
      forms: {
        ich: { form: 'arbeite', note: 'regular -e', full: 'ich arbeite' },
        du: { form: 'arbeitest', note: 'extra -e- cushion!', full: 'du arbeitest', highlight: true },
        'er/es/sie': { form: 'arbeitet', note: 'extra -e- cushion!', full: 'er/es/sie arbeitet', highlight: true },
        wir: { form: 'arbeiten', note: 'regular -en', full: 'wir arbeiten' },
        ihr: { form: 'arbeitet', note: 'extra -e- cushion!', full: 'ihr arbeitet', highlight: true },
        'sie/Sie': { form: 'arbeiten', note: 'regular -en', full: 'sie/Sie arbeiten' }
      }
    },
    warten: {
      infinitive: 'warten (to wait)',
      stem: 'wart-',
      rule: 'Stem ends in -t. du wartest, er wartet, ihr wartet.',
      forms: {
        ich: { form: 'warte', note: 'regular -e', full: 'ich warte' },
        du: { form: 'wartest', note: 'extra -e- cushion!', full: 'du wartest', highlight: true },
        'er/es/sie': { form: 'wartet', note: 'extra -e- cushion!', full: 'er/es/sie wartet', highlight: true },
        wir: { form: 'warten', note: 'regular -en', full: 'wir warten' },
        ihr: { form: 'wartet', note: 'extra -e- cushion!', full: 'ihr wartet', highlight: true },
        'sie/Sie': { form: 'warten', note: 'regular -en', full: 'sie/Sie warten' }
      }
    },
    finden: {
      infinitive: 'finden (to find / consider)',
      stem: 'find-',
      rule: 'Stem ends in -d. du findest, er findet, ihr findet.',
      forms: {
        ich: { form: 'finde', note: 'regular -e', full: 'ich finde' },
        du: { form: 'findest', note: 'extra -e- cushion!', full: 'du findest', highlight: true },
        'er/es/sie': { form: 'findet', note: 'extra -e- cushion!', full: 'er/es/sie findet', highlight: true },
        wir: { form: 'finden', note: 'regular -en', full: 'wir finden' },
        ihr: { form: 'findet', note: 'extra -e- cushion!', full: 'ihr findet', highlight: true },
        'sie/Sie': { form: 'finden', note: 'regular -en', full: 'sie/Sie finden' }
      }
    }
  };

  // 5 Plural Blueprints Data (Page 2)
  const pluralBlueprints = [
    {
      id: 1,
      badge: 'Group 1: -(e)n',
      pattern: '-(e)n',
      desc: 'Most feminine nouns & multi-syllable nouns take -(e)n.',
      examples: [
        { sing: 'die Schwester (the sister)', plur: 'die Schwestern (the sisters)', sound: 'die Schwester. die Schwestern.' },
        { sing: 'die Zahl (the number)', plur: 'die Zahlen (the numbers)', sound: 'die Zahl. die Zahlen.' },
        { sing: 'die Lampe (the lamp)', plur: 'die Lampen (the lamps)', sound: 'die Lampe. die Lampen.' }
      ]
    },
    {
      id: 2,
      badge: 'Group 2: -e / ¨-e',
      pattern: '-e / ¨-e',
      desc: 'Many masculine and neuter nouns add -e, often sprouting Umlauts (o ➔ ö, a ➔ ä, u ➔ ü).',
      examples: [
        { sing: 'das Telefon (the phone)', plur: 'die Telefone (the phones)', sound: 'das Telefon. die Telefone.' },
        { sing: 'der Sohn (the son)', plur: 'die Söhne (the sons)', sound: 'der Sohn. die Söhne.' },
        { sing: 'der Tag (the day)', plur: 'die Tage (the days)', sound: 'der Tag. die Tage.' }
      ]
    },
    {
      id: 3,
      badge: 'Group 3: -er / ¨-er',
      pattern: '-er / ¨-er',
      desc: 'Very popular with neuter nouns: adds -er and root vowel receives an Umlaut.',
      examples: [
        { sing: 'das Kind (the child)', plur: 'die Kinder (the children)', sound: 'das Kind. die Kinder.' },
        { sing: 'das Buch (the book)', plur: 'die Bücher (the books)', sound: 'das Buch. die Bücher.' },
        { sing: 'das Bild (the picture)', plur: 'die Bilder (the pictures)', sound: 'das Bild. die Bilder.' }
      ]
    },
    {
      id: 4,
      badge: 'Group 4: - / ¨-',
      pattern: 'Zero / Umlaut only',
      desc: 'Nouns ending in -er, -el, -en often change NOTHING, or only add an Umlaut.',
      examples: [
        { sing: 'das Fenster (the window)', plur: 'die Fenster (the windows)', sound: 'das Fenster. die Fenster.' },
        { sing: 'der Bruder (the brother)', plur: 'die Brüder (the brothers)', sound: 'der Bruder. die Brüder.' },
        { sing: 'der Lehrer (the teacher)', plur: 'die Lehrer (the teachers)', sound: 'der Lehrer. die Lehrer.' }
      ]
    },
    {
      id: 5,
      badge: 'Group 5: -s',
      pattern: '-s (International)',
      desc: 'Loanwords, international words, and words ending in full vowels take -s.',
      examples: [
        { sing: 'der Cousin (the cousin)', plur: 'die Cousins (the cousins)', sound: 'der Cousin. die Cousins.' },
        { sing: 'das Auto (the car)', plur: 'die Autos (the cars)', sound: 'das Auto. die Autos.' },
        { sing: 'das Taxi (the taxi)', plur: 'die Taxis (the taxis)', sound: 'das Taxi. die Taxis.' }
      ]
    }
  ];

  // Possessive Base Mapping (Page 3)
  const possessiveOwners = {
    ich: { base: 'mein', eng: 'my', pronoun: 'ich (I)' },
    du: { base: 'dein', eng: 'your (casual)', pronoun: 'du (you)' },
    er: { base: 'sein', eng: 'his', pronoun: 'er (he)' },
    es: { base: 'sein', eng: 'its', pronoun: 'es (it)' },
    sie: { base: 'ihr', eng: 'her', pronoun: 'sie (she)' },
    wir: { base: 'unser', eng: 'our', pronoun: 'wir (we)' },
    ihr: { base: 'euer', eng: 'your (group)', pronoun: 'ihr (you all)' },
    sie_pl: { base: 'ihr', eng: 'their', pronoun: 'sie (they)' },
    Sie: { base: 'Ihr', eng: 'Your (formal)', pronoun: 'Sie (You formal)' }
  };

  // Possessive Ending Calculator (Page 4)
  const getPossessivePhrase = (ownerKey, nounKey) => {
    const owner = possessiveOwners[ownerKey];
    let word = owner.base;

    // Masculine / Neutral = NO ending
    if (nounKey === 'bruder') return `${word} Bruder`;
    if (nounKey === 'kind') return `${word} Kind`;

    // Feminine / Plural = adds -e (with euer -> eure drop)
    if (ownerKey === 'ihr') {
      // euer + e = eure
      word = 'eure';
    } else {
      word = `${word}e`;
    }

    if (nounKey === 'tante') return `${word} Tante`;
    if (nounKey === 'kinder') return `${word} Kinder`;
    return `${word} Brüder`;
  };

  return (
    <div className="space-y-6">
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white p-6 rounded-3xl shadow-xl border-4 border-teal-300 relative overflow-hidden">
        <div className="absolute top-2 right-4 opacity-15 text-8xl select-none pointer-events-none">
          🛡️
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-900/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-200 border border-teal-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Visual Summary 3 • GRAMMATIK & REDEMITTEL (Pages 1–8)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
            Grammatik- & Redemittel-Studio Teil 2
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Master the 5 essential pillars of Summary 3: <strong>Verben auf d/t</strong> (arbeiten, Extra-E cushion), <strong>Die 5 Plural-Baupläne</strong>, <strong>Possessivartikel & Genitiv-s</strong> (mein/dein/eure & Tims Familie), <strong>Satz-Inversion Cross Machine</strong>, and the <strong>Ski Lift Comic Duet</strong>!
          </p>
        </div>

        {/* 5 Hub Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5">
          {[
            { id: 'verbs', label: '1. Verben auf d/t', icon: '🛡️', sub: 'arbeiten & Extra-E' },
            { id: 'plurals', label: '2. 5 Plural-Baupläne', icon: '📚', sub: '-(e)n, -e, -er, -, -s' },
            { id: 'possessive', label: '3. Possessiv & Genitiv', icon: '🏷️', sub: 'mein, eure, Tims Familie' },
            { id: 'inversion', label: '4. Inversion Cross', icon: '🔄', sub: 'Tennis finde ich...' },
            { id: 'redemittel', label: '5. Redemittel & Comic', icon: '🚡', sub: 'Vorlieben, Berufe & Comic' }
          ].map((tab) => {
            const isActive = activeStation === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveStation(tab.id);
                  playChime('click');
                }}
                className={`flex flex-col items-center text-center p-2.5 rounded-2xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-lg scale-102 ring-2 ring-teal-300'
                    : 'bg-teal-950/50 text-teal-100 hover:bg-teal-900/60 border border-teal-500/40'
                }`}
              >
                <span className="text-xl mb-0.5">{tab.icon}</span>
                <span className="text-xs font-black">{tab.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-stone-600' : 'text-teal-200'}`}>{tab.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* STATION 1: VERBEN AUF D/T & EXTRA-E CUSHION (PAGE 1) */}
      {/* ========================================================= */}
      {activeStation === 'verbs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-teal-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 text-teal-800">
                  <span>Station 1</span> • <span>Präsens - Verben auf d/t</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  The Extra-E Cushion Rule (arbeiten, warten, finden)
                </h3>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  const currentObj = dtVerbsData[selectedVerb];
                  const fullText = Object.values(currentObj.forms).map(c => c.full).join('. ');
                  speakGerman(fullText, isSlowMode);
                }}
                className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear All 6 Forms</span>
              </button>
            </div>

            {/* Verb Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.keys(dtVerbsData).map((vKey) => {
                const v = dtVerbsData[vKey];
                const isSelected = selectedVerb === vKey;
                return (
                  <button
                    key={vKey}
                    onClick={() => {
                      setSelectedVerb(vKey);
                      playChime('click');
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-300 shadow-sm'
                        : 'bg-stone-50 border-stone-200 hover:border-teal-300'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase text-teal-700 block">Stem: {v.stem}</span>
                    <span className="text-base font-black text-stone-900 block mt-0.5">{v.infinitive}</span>
                  </button>
                );
              })}
            </div>

            {/* Rule Explainer Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <div className="p-2 bg-amber-200 text-amber-900 rounded-xl text-xl shrink-0">
                🛡️
              </div>
              <div>
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide">
                  Why the Extra "-e-" is essential
                </span>
                <p className="text-xs text-amber-950 font-medium mt-0.5 leading-relaxed">
                  When a verb stem ends in <strong>-d</strong> or <strong>-t</strong>, saying <em>"du arbeitst"</em> or <em>"er arbeitt"</em> is an impossible tongue twister! German automatically inserts an <strong>-e- cushion</strong>: <strong>du arbeit-e-st</strong>, <strong>er arbeit-e-t</strong>, <strong>ihr arbeit-e-t</strong>!
                </p>
              </div>
            </div>

            {/* 6-Pronoun Conjugation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(dtVerbsData[selectedVerb].forms).map(([pronoun, info]) => {
                const isCurrentPronoun = selectedPronoun === pronoun;
                return (
                  <div
                    key={pronoun}
                    onClick={() => {
                      setSelectedPronoun(pronoun);
                      playChime('click');
                      speakGerman(info.full, isSlowMode);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isCurrentPronoun
                        ? 'bg-teal-700 text-white border-teal-800 shadow-md scale-102 ring-2 ring-teal-300'
                        : info.highlight
                        ? 'bg-amber-50 text-stone-900 border-amber-300 hover:border-teal-400'
                        : 'bg-stone-50 text-stone-900 border-stone-200 hover:border-teal-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-wider block ${
                          isCurrentPronoun ? 'text-teal-200' : 'text-teal-800'
                        }`}>
                          {pronoun}
                        </span>
                        {info.highlight && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                            isCurrentPronoun ? 'bg-amber-400 text-stone-900' : 'bg-amber-200 text-amber-900'
                          }`}>
                            Extra -e-
                          </span>
                        )}
                      </div>
                      <div className="text-lg font-black mt-0.5">
                        {info.full}
                      </div>
                      <div className={`text-[11px] font-semibold mt-0.5 ${
                        isCurrentPronoun ? 'text-teal-100' : 'text-stone-500'
                      }`}>
                        {info.note}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playChime('click');
                        speakGerman(info.full, isSlowMode);
                      }}
                      className={`p-2 rounded-xl transition-all ${
                        isCurrentPronoun
                          ? 'bg-teal-600 hover:bg-teal-500 text-white'
                          : 'bg-white hover:bg-teal-100 text-teal-800 border border-stone-200'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 2: DIE 5 PLURAL-BAUPLÄNE (PAGE 2) */}
      {/* ========================================================= */}
      {activeStation === 'plurals' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-teal-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 text-teal-800">
                  <span>Station 2</span> • <span>Nomen - Nominativ Plural</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  The 5 German Plural Blueprints (Page 2)
                </h3>
              </div>
            </div>

            {/* Blueprint Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {pluralBlueprints.map((bp) => {
                const isSelected = selectedBlueprint === bp.id;
                return (
                  <button
                    key={bp.id}
                    onClick={() => {
                      setSelectedBlueprint(bp.id);
                      playChime('click');
                    }}
                    className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-700 shadow-md ring-2 ring-teal-300'
                        : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-teal-300'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase block opacity-80">Pattern #{bp.id}</span>
                    <span className="text-sm font-black block mt-0.5">{bp.pattern}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Blueprint Display */}
            {(() => {
              const currentBp = pluralBlueprints.find(b => b.id === selectedBlueprint);
              return (
                <div className="bg-teal-50/70 border-2 border-teal-300 rounded-3xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-black bg-teal-200 text-teal-900 px-3 py-1 rounded-full">
                        {currentBp.badge}
                      </span>
                      <h4 className="text-lg font-black text-stone-900 mt-1">
                        {currentBp.desc}
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-teal-800 bg-white px-3 py-1 rounded-xl border border-teal-200">
                      Plural Article is ALWAYS "die"!
                    </span>
                  </div>

                  {/* Examples list */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    {currentBp.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-4 border border-teal-200 shadow-xs space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-stone-500 uppercase">Singular</span>
                          <div className="text-sm font-bold text-stone-700">{ex.sing}</div>
                          <div className="border-t border-stone-100 my-1"></div>
                          <span className="text-[10px] font-black text-teal-800 uppercase">Plural (die)</span>
                          <div className="text-base font-black text-teal-950">{ex.plur}</div>
                        </div>

                        <button
                          onClick={() => {
                            playChime('click');
                            speakGerman(ex.sound, isSlowMode);
                          }}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-1.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Hear Pair</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 3: POSSESSIV & GENITIV MATRIX (PAGES 3, 4 & 5) */}
      {/* ========================================================= */}
      {activeStation === 'possessive' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-teal-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 text-teal-800">
                  <span>Station 3</span> • <span>Possessivartikel, -in & Genitiv-s</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Possessives, Word Formation & Genitiv Names (Pages 3, 4 & 5)
                </h3>
              </div>
            </div>

            {/* Owner Picker */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 block">1. Pick Owner Pronoun:</span>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                {Object.keys(possessiveOwners).map((oKey) => {
                  const o = possessiveOwners[oKey];
                  const isSelected = selectedOwner === oKey;
                  return (
                    <button
                      key={oKey}
                      onClick={() => {
                        setSelectedOwner(oKey);
                        playChime('click');
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-600 text-white font-black border-teal-700 shadow-sm scale-105 ring-2 ring-teal-300'
                          : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-teal-300'
                      }`}
                    >
                      <span className="text-xs font-black block">{oKey}</span>
                      <span className="text-[10px] block opacity-80">➔ {o.base}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Noun Gender Picker */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 block">2. Pick Family Item / Gender:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'bruder', label: 'der Bruder', gender: 'maskulin', ending: 'NO ending', icon: '👦' },
                  { id: 'kind', label: 'das Kind', gender: 'neutral', ending: 'NO ending', icon: '👶' },
                  { id: 'tante', label: 'die Tante', gender: 'feminin', ending: 'adds -e!', icon: '👩' },
                  { id: 'kinder', label: 'die Kinder', gender: 'plural', ending: 'adds -e!', icon: '👨‍👩‍👧‍👦' }
                ].map((n) => {
                  const isSelected = selectedFamilyNoun === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => {
                        setSelectedFamilyNoun(n.id);
                        playChime('click');
                      }}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-300 shadow-sm'
                          : 'bg-stone-50 border-stone-200 hover:border-teal-300'
                      }`}
                    >
                      <span className="text-xl block mb-0.5">{n.icon}</span>
                      <span className="text-xs font-black text-stone-900 block">{n.label}</span>
                      <span className="text-[10px] font-bold text-teal-700 block">{n.gender} ({n.ending})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Generated Possessive Output */}
            {(() => {
              const phrase = getPossessivePhrase(selectedOwner, selectedFamilyNoun);
              return (
                <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-200 block">
                      Generated Possessive Phrase
                    </span>
                    <div className="text-2xl font-black text-yellow-300 mt-0.5">
                      "Das ist {phrase}."
                    </div>
                    <div className="text-xs text-teal-100 mt-0.5">
                      Owner: <strong>{possessiveOwners[selectedOwner].pronoun}</strong> • Meaning: <em>That is {possessiveOwners[selectedOwner].eng} {selectedFamilyNoun}...</em>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman(`Das ist ${phrase}.`, isSlowMode);
                    }}
                    className="bg-white text-teal-950 hover:bg-teal-100 font-bold px-5 py-2.5 rounded-xl shadow-sm text-xs flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Volume2 className="w-4 h-4 text-teal-700" />
                    <span>Speak Phrase</span>
                  </button>
                </div>
              );
            })()}

            {/* Genitiv-s & Wortbildung -in Section (Page 5) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Genitiv-s */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-3">
                <span className="text-xs font-black uppercase text-amber-900 block">
                  📜 Genitiv-s bei Namen (No Apostrophe in German!)
                </span>
                <p className="text-xs text-stone-600">
                  Glue 's' directly to names: <strong>Tims Familie</strong> = <em>die Familie von Tim</em>. <strong>Marias Tante</strong> = <em>die Tante von Maria</em>.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={genitivName}
                    onChange={(e) => setGenitivName(e.target.value)}
                    className="bg-white border border-amber-300 rounded-xl px-3 py-1 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-28"
                    placeholder="Name"
                  />
                  <span className="text-xs font-bold text-amber-900">
                    ➔ <strong>{genitivName.trim() || 'Tim'}s Familie</strong>
                  </span>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman(`${genitivName}s Familie ist die Familie von ${genitivName}.`, isSlowMode);
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Speak Genitiv Example</span>
                </button>
              </div>

              {/* Wortbildung -in */}
              <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 space-y-3">
                <span className="text-xs font-black uppercase text-rose-900 block">
                  🩺 Wortbildung -in (Female Profession Title)
                </span>
                <p className="text-xs text-stone-600">
                  Add <strong>-in</strong> for women + sprout Umlaut if possible: <strong>der Arzt ♂ ➔ die Ärztin ♀</strong>.
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-rose-200 text-xs text-stone-800 font-bold flex justify-between">
                  <span>der Arzt ♂ (Male Doctor)</span>
                  <span>die Ärztin ♀ (Female Doctor)</span>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("der Arzt, die Ärztin. Frau Becker ist Ärztin von Beruf.", isSlowMode);
                  }}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Speak Doctor Example</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 4: INVERSION CROSS MACHINE (PAGE 6) */}
      {/* ========================================================= */}
      {activeStation === 'inversion' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-teal-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 text-teal-800">
                  <span>Station 4</span> • <span>Satz - Inversion (Cross Switch)</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  The Cross-Switch Machine (Page 6)
                </h3>
              </div>
            </div>

            {/* Topic selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-700">Topic:</span>
              {['Tennis', 'Mathematik', 'Deutsch', 'Wandern'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setInversionTopic(t);
                    playChime('click');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inversionTopic === t ? 'bg-teal-600 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Visual Cross Switch Interactive Track */}
            <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-inner space-y-6">
              <div className="flex items-center justify-between text-xs text-teal-300 font-bold border-b border-stone-800 pb-2">
                <span>🔄 Interactive Sentence Inversion Machine</span>
                <span>Verb 'finde' stays locked in Position 2!</span>
              </div>

              {/* The 3-Block Train */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {/* Position 1 */}
                <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 transition-all">
                  <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 1</span>
                  <div className="text-xl font-black text-yellow-300">
                    {isInverted ? inversionTopic : 'Ich'}
                  </div>
                  <span className="text-[10px] text-stone-400 block mt-0.5">
                    {isInverted ? '(Object Topic)' : '(Subject)'}
                  </span>
                </div>

                {/* Position 2 (VERB) */}
                <div className="bg-teal-700 p-4 rounded-2xl border-2 border-teal-400 shadow-md">
                  <span className="text-[10px] font-black text-teal-200 uppercase block mb-1">Position 2 (VERB ★)</span>
                  <div className="text-2xl font-black text-white">
                    finde
                  </div>
                  <span className="text-[10px] text-teal-200 block mt-0.5">
                    (LOCKED #2)
                  </span>
                </div>

                {/* Position 3 */}
                <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 transition-all">
                  <span className="text-[10px] font-black text-amber-300 uppercase block mb-1">Position 3 + Rest</span>
                  <div className="text-xl font-black text-yellow-300">
                    {isInverted ? 'ich interessant.' : `${inversionTopic} interessant.`}
                  </div>
                  <span className="text-[10px] text-stone-400 block mt-0.5">
                    {isInverted ? '(Subject flipped here)' : '(Object)'}
                  </span>
                </div>
              </div>

              {/* Toggle Inversion Switch */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setIsInverted(!isInverted);
                    playChime('click');
                  }}
                  className="bg-teal-500 hover:bg-teal-400 text-stone-950 font-black px-6 py-2.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer scale-105"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{isInverted ? 'Switch to Normal Order (Ich finde...)' : 'Cross-Switch to Inversion (Tennis finde ich...)'}</span>
                </button>
              </div>

              {/* Full sentence spoken */}
              {(() => {
                const sentence = isInverted ? `${inversionTopic} finde ich interessant.` : `Ich finde ${inversionTopic} interessant.`;
                return (
                  <div className="bg-stone-800/90 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Current Full Sentence</span>
                      <div className="text-base font-black text-white mt-0.5">"{sentence}"</div>
                    </div>
                    <button
                      onClick={() => {
                        playChime('click');
                        speakGerman(sentence, isSlowMode);
                      }}
                      className="bg-teal-600 hover:bg-teal-500 text-white p-2 rounded-xl"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 5: REDEMITTEL & SKI LIFT COMIC DUET (PAGES 7 & 8) */}
      {/* ========================================================= */}
      {activeStation === 'redemittel' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-teal-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 text-teal-800">
                  <span>Station 5</span> • <span>Redemittel & Comic Duet</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Hobbies, Professions, Age & The Ski Lift Comic (Pages 7 & 8)
                </h3>
              </div>
            </div>

            {/* Comic Breakdown Card (Page 8) */}
            <div className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-3xl p-5 border-2 border-sky-300 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-900 uppercase tracking-wide flex items-center gap-1.5">
                  🚡 Page 8 Comic: "Wandern Sie gern?" - "Nein, aber mein Mann!"
                </span>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Wandern Sie gern? Nein, aber mein Mann!", isSlowMode);
                  }}
                  className="p-1.5 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Play Comic Dialogue</span>
                </button>
              </div>

              {/* Comic Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-xs space-y-1 text-center">
                  <span className="text-4xl">🚡👩😃</span>
                  <div className="text-xs font-black text-stone-900 mt-1">On the Scenic Ski Lift:</div>
                  <div className="text-sm font-black text-sky-900">"Wandern Sie gern?" - "Nein, aber mein Mann."</div>
                  <div className="text-[11px] text-stone-500">(Relaxing comfortably in the air!)</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-xs space-y-1 text-center">
                  <span className="text-4xl">🏔️🥵🧗‍♂️</span>
                  <div className="text-xs font-black text-stone-900 mt-1">Down on the Trail Below:</div>
                  <div className="text-sm font-black text-teal-900">Her husband is sweating hiking up!</div>
                  <div className="text-[11px] text-stone-500">(Hiking up the steep mountain on foot with sticks!)</div>
                </div>
              </div>
            </div>

            {/* Page 7 Redemittel Grid */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-stone-900 uppercase tracking-wide">
                Complete Page 7 Communication Soundboard
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Vorlieben */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-900">über Vorlieben sprechen (Hobbies & Likes)</span>
                    <span className="text-base">⚽</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Ich koche gern, du auch?</strong> <em>(I like cooking, you too?)</em></div>
                    <div>• <strong>Ja, ich koche auch gern. / Nein, ich koche nicht gern.</strong></div>
                    <div>• <strong>Was ist dein Lieblingssport? - Mein Lieblingssport ist Fußball.</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Ich koche gern, du auch? Ja, ich koche auch gern. Nein, ich koche nicht gern. Mein Lieblingssport ist Fußball.", isSlowMode);
                    }}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Hobbies</span>
                  </button>
                </div>

                {/* 2. Beruf & Selbstständig */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-900">über den Beruf sprechen (Professions)</span>
                    <span className="text-base">💼</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Was bist du von Beruf? / Was sind Sie von Beruf?</strong></div>
                    <div>• <strong>Ich arbeite als Ingenieur / Ich bin Ärztin.</strong></div>
                    <div>• <strong>Ich bin selbstständig.</strong> <em>(I am self-employed / freelance!)</em></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Was bist du von Beruf? Ich arbeite als Ingenieur. Ich bin selbstständig.", isSlowMode);
                    }}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Professions</span>
                  </button>
                </div>

                {/* 3. Alter */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-900">über das Alter sprechen (Age & Birth)</span>
                    <span className="text-base">🎂</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Wie alt bist du? / Wie alt sind Sie?</strong></div>
                    <div>• <strong>Ich bin 25 Jahre alt.</strong></div>
                    <div>• <strong>Wann bist du geboren?</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Wie alt bist du? Ich bin fünfundzwanzig Jahre alt. Wann bist du geboren?", isSlowMode);
                    }}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Age & Birth</span>
                  </button>
                </div>

                {/* 4. Nützliche Sätze */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-900">nützliche Sätze (Classroom & Courtesy)</span>
                    <span className="text-base">🤔</span>
                  </div>
                  <div className="text-xs text-stone-800 space-y-1">
                    <div>• <strong>Wie bitte?</strong> <em>(Pardon? / What did you say?)</em></div>
                    <div>• <strong>Was meinen Sie?</strong> <em>(What do you mean?)</em></div>
                    <div>• <strong>Das weiß ich nicht. / Ja, genau.</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Wie bitte? Was meinen Sie? Das weiß ich nicht. Ja, genau!", isSlowMode);
                    }}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Courtesy Sätze</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
