import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen, ShieldCheck, Heart, Coffee, Utensils, Clock, Compass, Layers, Gift, AlertCircle, MapPin, Smile, Award } from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary6GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('dativ'); // 'dativ', 'akkpronouns', 'prepositions', 'denn', 'comic'

  // Station 1: Dativ Articles
  const [selectedGender, setSelectedGender] = useState('masculine'); // 'masculine', 'neuter', 'feminine', 'plural'

  // Station 2: Personalpronomen Akkusativ & für
  const [selectedAkkPronoun, setSelectedAkkPronoun] = useState('er'); // 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie_pl', 'Sie'
  const [selectedGiftTarget, setSelectedGiftTarget] = useState('mann'); // 'mann', 'schwester', 'kinder', 'du'

  // Station 3: 9 Spatial Prepositions (Wo? + Dativ)
  const [selectedPreposition, setSelectedPreposition] = useState('auf'); // 'in', 'an', 'auf', 'ueber', 'unter', 'vor', 'hinter', 'neben', 'zwischen'
  const [selectedFurniture, setSelectedFurniture] = useState('regal'); // 'schrank', 'regal', 'lampe', 'schraenke'

  // Station 4: denn & Position 0
  const [dennSentenceIdx, setDennSentenceIdx] = useState(0);

  // Station 1 Dativ Articles Data (Pages 1 & 2)
  const dativArticlesData = {
    masculine: {
      gender: 'Maskulin (der Stuhl)',
      nom: 'der Stuhl',
      dativ: 'dem Stuhl',
      ending: '-em',
      note: 'der ➔ dem (takes the "-em" ending)',
      example: 'Das Buch liegt auf dem Stuhl.',
      sound: 'Nominativ: der Stuhl. Dativ: dem Stuhl. Das Buch liegt auf dem Stuhl.'
    },
    neuter: {
      gender: 'Neutrum (das Regal)',
      nom: 'das Regal',
      dativ: 'dem Regal',
      ending: '-em',
      note: 'das ➔ dem (shares "-em" ending with masculine!)',
      example: 'Die Vase steht auf dem Regal.',
      sound: 'Nominativ: das Regal. Dativ: dem Regal. Die Vase steht auf dem Regal.'
    },
    feminine: {
      gender: 'Feminin (die Lampe)',
      nom: 'die Lampe',
      dativ: 'der Lampe',
      ending: '-er',
      note: 'die ➔ der (takes the "-er" ending in Dativ!)',
      example: 'Die Katze schläft unter der Lampe.',
      sound: 'Nominativ: die Lampe. Dativ: der Lampe. Die Katze schläft unter der Lampe.'
    },
    plural: {
      gender: 'Plural (die Stühle / Regale / Lampen)',
      nom: 'die Stühle',
      dativ: 'den Stühlen',
      ending: '-en + -n*',
      note: '⚡ DOUBLE-N RULE: Article becomes "den" AND noun gets extra "-n" (den Stühlen, den Regalen, den Lampen)! *Except words ending in -s: den Fotos.',
      example: 'Die Kissen liegen auf den Stühlen.',
      sound: 'Nominativ: die Stühle. Dativ: den Stühlen, den Regalen, den Lampen, den Fotos.'
    }
  };

  // Station 2 Akkusativ Pronouns Data (Pages 3 & 5)
  const akkPronounsData = {
    ich: { nom: 'ich (I)', akk: 'mich (me)', change: true, example: 'Siehst du mich?', sound: 'ich wird mich. Siehst du mich?' },
    du: { nom: 'du (you)', akk: 'dich (you)', change: true, example: 'Ich liebe dich.', sound: 'du wird dich. Ich liebe dich.' },
    er: { nom: 'er (he)', akk: 'ihn (him)', change: true, highlight: true, example: 'Ich kenne ihn gut.', sound: 'er wird ihn. Ich kenne ihn gut.' },
    sie: { nom: 'sie (she)', akk: 'sie (her)', change: false, example: 'Wir treffen sie morgen.', sound: 'sie bleibt sie. Wir treffen sie morgen.' },
    es: { nom: 'es (it)', akk: 'es (it)', change: false, example: 'Ich kaufe es heute.', sound: 'es bleibt es. Ich kaufe es heute.' },
    wir: { nom: 'wir (we)', akk: 'uns (us)', change: true, example: 'Er besucht uns oft.', sound: 'wir wird uns. Er besucht uns oft.' },
    ihr: { nom: 'ihr (you all)', akk: 'euch (you all)', change: true, example: 'Ich höre euch laut.', sound: 'ihr wird euch. Ich höre euch laut.' },
    sie_pl: { nom: 'sie (they)', akk: 'sie (them)', change: false, example: 'Wir fragen sie gleich.', sound: 'sie bleibt sie. Wir fragen sie gleich.' },
    Sie: { nom: 'Sie (You formal)', akk: 'Sie (You formal)', change: false, example: 'Ich verstehe Sie sehr gut.', sound: 'Sie bleibt Sie. Ich verstehe Sie sehr gut.' }
  };

  const fuerData = {
    mann: { target: 'meinen Mann', pronoun: 'ihn', label: 'für meinen Mann ➔ für ihn', sound: 'Das Geschenk ist für meinen Mann. Das ist für ihn.' },
    schwester: { target: 'meine Schwester', pronoun: 'sie', label: 'für meine Schwester ➔ für sie', sound: 'Das Buch ist für meine Schwester. Das ist für sie.' },
    kinder: { target: 'meine Kinder', pronoun: 'sie', label: 'für meine Kinder ➔ für sie', sound: 'Die Schokolade ist für meine Kinder. Das ist für sie.' },
    du: { target: 'dich', pronoun: 'dich', label: 'für dich (for you)', sound: 'Das ist eine Überraschung für dich!' }
  };

  // Station 3 The 9 Spatial Prepositions Data (Page 4)
  const prepositionsData = {
    in: { prep: 'in', visual: '📦 inside', de: 'im (in dem) Schrank', en: 'inside the wardrobe', sound: 'Der Mantel hängt im Schrank.' },
    an: { prep: 'an', visual: '🖼️ at / on vertical wall', de: 'an der Wand / am Fenster', en: 'on the wall / at the window', sound: 'Das Bild hängt an der Wand.' },
    auf: { prep: 'auf', visual: '📖 on top of (horizontal)', de: 'auf dem Tisch / auf dem Regal', en: 'on top of the table / shelf', sound: 'Das Buch liegt auf dem Tisch.' },
    ueber: { prep: 'über', visual: '💡 above / over', de: 'über dem Tisch', en: 'above the table', sound: 'Die Lampe hängt über dem Tisch.' },
    unter: { prep: 'unter', visual: '🐶 under / underneath', de: 'unter dem Bett', en: 'under the bed', sound: 'Der Hund schläft unter dem Bett.' },
    vor: { prep: 'vor', visual: '🚪 in front of', de: 'vor der Tür', en: 'in front of the door', sound: 'Das Auto steht vor der Tür.' },
    hinter: { prep: 'hinter', visual: '🌲 behind', de: 'hinter dem Haus', en: 'behind the house', sound: 'Der Garten liegt hinter dem Haus.' },
    neben: { prep: 'neben', visual: '🪑 next to / beside', de: 'neben dem Schrank', en: 'next to the wardrobe', sound: 'Der Stuhl steht neben dem Schrank.' },
    zwischen: { prep: 'zwischen', visual: '↔️ between two things', de: 'zwischen dem Schrank und dem Bett', en: 'between the wardrobe and the bed', sound: 'Die Lampe steht zwischen dem Schrank und dem Bett.' }
  };

  // Station 4 denn Sentences Data (Page 6)
  const dennSentences = [
    {
      part1: 'Bea Schröder kann nicht nach Hause fahren,',
      denn: 'denn (Pos 0)',
      subject: 'ihr Fahrrad (Pos 1)',
      verb: 'ist (Pos 2)',
      rest: 'nicht da.',
      full: 'Bea Schröder kann nicht nach Hause fahren, denn ihr Fahrrad ist nicht da.',
      en: "Bea Schröder can't ride home, because her bike is not there."
    },
    {
      part1: 'Ich lerne heute fleißig Deutsch,',
      denn: 'denn (Pos 0)',
      subject: 'ich (Pos 1)',
      verb: 'habe (Pos 2)',
      rest: 'morgen eine Prüfung.',
      full: 'Ich lerne heute fleißig Deutsch, denn ich habe morgen eine Prüfung.',
      en: 'I am studying German diligently today, because I have an exam tomorrow.'
    },
    {
      part1: 'Markus geht heute nicht zur Arbeit,',
      denn: 'denn (Pos 0)',
      subject: 'er (Pos 1)',
      verb: 'ist (Pos 2)',
      rest: 'leider krank.',
      full: 'Markus geht heute nicht zur Arbeit, denn er ist leider krank.',
      en: "Markus is not going to work today, because he is unfortunately sick."
    }
  ];

  // Station 5 Redemittel Data (Page 8)
  const redemittelToolkit = [
    {
      category: '🗺️ einen Weg erklären (Directions)',
      phrases: [
        { de: 'Entschuldigung, wo ist hier eine Apotheke?', en: 'Excuse me, where is a pharmacy around here?', sound: 'Entschuldigung, wo ist hier eine Apotheke?' },
        { de: 'Gehen Sie geradeaus und dann nach links.', en: 'Go straight ahead and then turn left.', sound: 'Gehen Sie geradeaus und dann nach links.' },
        { de: 'Fahren Sie nach rechts und dann geradeaus.', en: 'Drive to the right and then straight ahead.', sound: 'Fahren Sie nach rechts und dann geradeaus.' },
        { de: 'Tut mir leid, das weiß ich nicht. Ich bin nicht von hier.', en: 'Sorry, I don\'t know that. I\'m not from here.', sound: 'Tut mir leid, das weiß ich nicht. Ich bin nicht von hier.' },
        { de: 'Ich bin hier auch fremd. Vielen Dank!', en: 'I am also a stranger here. Many thanks!', sound: 'Ich bin hier auch fremd. Vielen Dank!' }
      ]
    },
    {
      category: '🛋️ die Wohnung & Möbel beschreiben (Apartment Layout)',
      phrases: [
        { de: 'Das ist mein Wohnzimmer.', en: 'This is my living room.', sound: 'Das ist mein Wohnzimmer.' },
        { de: 'Wo ist dein Schrank? - Er steht neben dem Bett.', en: 'Where is your wardrobe? - It stands next to the bed.', sound: 'Wo ist dein Schrank? Er steht neben dem Bett.' },
        { de: 'Das Bild hängt an der Wand.', en: 'The picture hangs on the wall.', sound: 'Das Bild hängt an der Wand.' },
        { de: 'Die Bücher liegen auf dem Tisch.', en: 'The books are lying on the table.', sound: 'Die Bücher liegen auf dem Tisch.' },
        { de: 'Die Schuhe stehen unter dem Regal.', en: 'The shoes are under the shelf.', sound: 'Die Schuhe stehen unter dem Regal.' }
      ]
    },
    {
      category: '⭐ etwas bewerten & Das Zauberwort DOCH (Opinions & Priorities)',
      phrases: [
        { de: 'Für mich ist ein Balkon sehr wichtig.', en: 'A balcony is very important to me.', sound: 'Für mich ist ein Balkon sehr wichtig.' },
        { de: 'Für mich ist ein Garten nicht wichtig.', en: 'A garden is not important to me.', sound: 'Für mich ist ein Garten nicht wichtig.' },
        { de: 'Und für dich? - Für mich auch!', en: 'And for you? - For me too!', sound: 'Und für dich? Für mich auch!' },
        { de: 'Doch, für mich sind viele Zimmer wichtig.', en: 'On the contrary, having many rooms is important to me.', sound: 'Doch, für mich sind viele Zimmer wichtig.' }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-cyan-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-6">
          <Compass className="w-80 h-80" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-teal-500/30 backdrop-blur-md px-3 py-1.5 rounded-full text-teal-100 text-xs font-semibold tracking-wide border border-teal-300/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Summary 6 • Complete 8-Page Visual Guide</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Visual Grammatik & Redemittel Studio VI 🧭
          </h1>
          <p className="text-teal-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Master the <span className="text-amber-300 font-bold">Dativ Articles</span> (dem, dem, der, den...-n), <span className="text-amber-300 font-bold">Akkusativ Pronouns</span> (mich, dich, ihn), the <span className="text-amber-300 font-bold">9 Spatial Prepositions</span> (Wo? + Dativ), the <span className="text-amber-300 font-bold">Position 0 connector "denn"</span>, and the humorous desert directions cartoon!
          </p>
        </div>
      </div>

      {/* Station Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100/80 backdrop-blur-sm rounded-2xl border border-stone-200 shadow-inner">
        {[
          { id: 'dativ', label: '1. Dativ-Artikel & Double-N', icon: '🛡️' },
          { id: 'akkpronouns', label: '2. Akkusativ-Pronomen & für', icon: '🎯' },
          { id: 'prepositions', label: '3. 9 Lokale Präpositionen (Wo?)', icon: '🧭' },
          { id: 'denn', label: '4. Konjunktion denn (Pos 0)', icon: '🚂' },
          { id: 'comic', label: '5. Wüsten-Comic & Redemittel', icon: '🐪' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playChime();
              setActiveStation(tab.id);
            }}
            className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              activeStation === tab.id
                ? 'bg-white text-stone-900 shadow-md border border-stone-200 ring-2 ring-teal-500/20 scale-[1.01]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* STATION 1: Dativ-Artikel & Double-N */}
      {activeStation === 'dativ' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Pages 1 & 2 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Nomen: Bestimmter Artikel im Dativ (dem, dem, der, den...-n)
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Rule: Masculine & Neuter both become <strong className="text-teal-900 font-mono">dem (-em)</strong>, Feminine becomes <strong className="text-teal-900 font-mono">der (-er)</strong>, and Plural becomes <strong className="text-rose-700 font-mono">den + extra "-n" on the noun</strong>!
              </p>
            </div>

            {/* Gender Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'masculine', label: 'Maskulin (der Stuhl)', badge: 'der ➔ dem (-em)', icon: '🪑' },
                { key: 'neuter', label: 'Neutrum (das Regal)', badge: 'das ➔ dem (-em)', icon: '📦' },
                { key: 'feminine', label: 'Feminin (die Lampe)', badge: 'die ➔ der (-er)', icon: '💡' },
                { key: 'plural', label: 'Plural (die Stühle)', badge: 'die ➔ den ...-n', icon: '👥' }
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => {
                    playChime();
                    setSelectedGender(g.key);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    selectedGender === g.key
                      ? 'bg-teal-700 text-white border-teal-800 shadow-lg scale-[1.02]'
                      : 'bg-stone-50 hover:bg-teal-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="text-2xl mb-1">{g.icon}</div>
                  <div className="font-bold text-sm">{g.label}</div>
                  <div className={`text-[10px] mt-1 font-mono font-bold ${selectedGender === g.key ? 'text-amber-300' : 'text-teal-700'}`}>
                    {g.badge}
                  </div>
                </button>
              ))}
            </div>

            {/* Dativ Transformation Card */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border-2 border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-lg">
                    {dativArticlesData[selectedGender].gender}
                  </h3>
                  <p className="text-xs text-stone-500">{dativArticlesData[selectedGender].note}</p>
                </div>
                <button
                  onClick={() => speakGerman(dativArticlesData[selectedGender].sound, isSlowMode)}
                  className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-md"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Nominativ vs Dativ Transformation Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                  <div className="text-xs font-bold text-stone-400 uppercase">Nominativ (Basic Subject)</div>
                  <div className="text-lg font-mono font-bold text-stone-700 mt-1">
                    {dativArticlesData[selectedGender].nom}
                  </div>
                </div>

                <div className="bg-teal-900 text-white p-4 rounded-xl border border-teal-950 shadow-md">
                  <div className="text-xs font-bold text-teal-300 uppercase">Dativ Form (Receiver / Location)</div>
                  <div className="text-lg font-mono font-extrabold text-amber-300 mt-1">
                    {dativArticlesData[selectedGender].dativ}
                  </div>
                </div>
              </div>

              {/* Example sentence */}
              <div className="bg-white p-4 rounded-xl border border-teal-200 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Sample Sentence</span>
                  <span className="text-sm md:text-base font-bold text-teal-950">{dativArticlesData[selectedGender].example}</span>
                </div>
                <button
                  onClick={() => speakGerman(dativArticlesData[selectedGender].example, isSlowMode)}
                  className="p-2 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Plural Double-N Highlight Card */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>The Dativ Plural Double-N Rule (Page 2):</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                In Dativ Plural, you change the article to <strong className="text-teal-300 font-mono">den</strong> AND append an extra <strong className="text-rose-400 font-mono">-n</strong> to the noun: <em>den Stühlen</em>, <em>den Regalen</em>, <em>den Lampen</em>. (Exception: If the plural already ends in -s like <em>den Fotos</em>, do not add an extra -n!).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STATION 2: Akkusativ-Pronomen & für */}
      {activeStation === 'akkpronouns' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                Pages 3 & 5 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Personalpronomen im Akkusativ & "für + Akkusativ"
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Notice: <strong className="text-cyan-900 underline font-mono">er ➔ ihn</strong> is the ONLY 3rd person singular changer! The preposition <strong className="text-rose-700 font-bold">"für" ALWAYS triggers Akkusativ</strong>!
              </p>
            </div>

            {/* Pronoun Selector Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {Object.keys(akkPronounsData).map((pKey) => {
                const item = akkPronounsData[pKey];
                const isSelected = selectedAkkPronoun === pKey;
                return (
                  <button
                    key={pKey}
                    onClick={() => {
                      playChime();
                      setSelectedAkkPronoun(pKey);
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      isSelected
                        ? 'bg-cyan-700 text-white border-cyan-800 shadow-md scale-[1.03]'
                        : 'bg-stone-50 hover:bg-cyan-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="text-xs opacity-75 font-mono">{item.nom.split(' ')[0]}</div>
                    <div className="font-extrabold text-sm text-amber-400 mt-0.5">{item.akk.split(' ')[0]}</div>
                  </button>
                );
              })}
            </div>

            {/* Current Pronoun Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-5 border border-cyan-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-800 uppercase">Transformation</span>
                  <div className="text-lg md:text-xl font-extrabold text-stone-900 mt-0.5">
                    {akkPronounsData[selectedAkkPronoun].nom} ➔ <span className="text-rose-700 underline font-mono">{akkPronounsData[selectedAkkPronoun].akk}</span>
                  </div>
                </div>
                <button
                  onClick={() => speakGerman(akkPronounsData[selectedAkkPronoun].sound, isSlowMode)}
                  className="p-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white shadow-sm"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-cyan-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Example Sentence</span>
                  <span className="text-sm md:text-base font-bold text-cyan-950">{akkPronounsData[selectedAkkPronoun].example}</span>
                </div>
                <Volume2
                  onClick={() => speakGerman(akkPronounsData[selectedAkkPronoun].example, isSlowMode)}
                  className="w-4 h-4 text-cyan-700 cursor-pointer flex-shrink-0"
                />
              </div>
            </div>

            {/* "für + Akkusativ" Gift Lab (Page 5) */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-stone-900 text-sm md:text-base flex items-center gap-2">
                <Gift className="w-4 h-4 text-rose-600" />
                <span>Präposition "für" (für wen? ➔ IMMER AKKUSATIV!)</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.entries(fuerData).map(([key, data]) => {
                  const isSelected = selectedGiftTarget === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        playChime();
                        setSelectedGiftTarget(key);
                        speakGerman(data.sound, isSlowMode);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-rose-700 text-white border-rose-800 shadow-md font-bold'
                          : 'bg-stone-50 hover:bg-rose-50 border-stone-200 text-stone-800'
                      }`}
                    >
                      <div className="text-xs">{data.label}</div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-rose-950 text-white p-3.5 rounded-xl text-xs flex items-center justify-between font-mono">
                <span>Rule: <strong>für</strong> + Maskulin = <em>für meinen Mann / für ihn</em> • Feminin = <em>für meine Schwester / für sie</em></span>
                <Volume2
                  onClick={() => speakGerman("Das Geschenk ist für meinen Mann. Das ist für ihn.", isSlowMode)}
                  className="w-4 h-4 text-rose-300 cursor-pointer flex-shrink-0 ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 3: 9 Lokale Präpositionen (Wo? + Dativ) */}
      {activeStation === 'prepositions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Page 4 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Die 9 Lokalen Präpositionen (Wo? ➔ DATIV)
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Whenever you describe WHERE something is positioned, use <strong className="text-emerald-900">DATIV</strong>: in, an, auf, über, unter, vor, hinter, neben, zwischen!
              </p>
            </div>

            {/* 9 Prepositions 3D Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {Object.keys(prepositionsData).map((pKey) => {
                const item = prepositionsData[pKey];
                const isSelected = selectedPreposition === pKey;
                return (
                  <button
                    key={pKey}
                    onClick={() => {
                      playChime();
                      setSelectedPreposition(pKey);
                      speakGerman(item.sound, isSlowMode);
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-lg scale-[1.05]'
                        : 'bg-stone-50 hover:bg-emerald-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="text-lg">{item.visual.split(' ')[0]}</div>
                    <div className="font-extrabold text-sm font-mono mt-1">{item.prep}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Preposition Spotlight */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Spatial Key</span>
                  <h3 className="text-xl font-black text-stone-900 mt-0.5">
                    {prepositionsData[selectedPreposition].prep} ({prepositionsData[selectedPreposition].visual})
                  </h3>
                </div>
                <button
                  onClick={() => speakGerman(prepositionsData[selectedPreposition].sound, isSlowMode)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
                  <span className="text-xs font-bold text-stone-500 uppercase">German Phrase (Dativ)</span>
                  <div className="text-base font-bold text-emerald-950 mt-1">
                    {prepositionsData[selectedPreposition].de}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
                  <span className="text-xs font-bold text-stone-500 uppercase">Meaning</span>
                  <div className="text-base font-semibold text-stone-700 mt-1">
                    {prepositionsData[selectedPreposition].en}
                  </div>
                </div>
              </div>
            </div>

            {/* Contractions Spotlight (im & am) */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Preposition Contractions: in dem ➔ im • an dem ➔ am</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300 pt-1">
                <div className="bg-stone-800 p-3 rounded-xl">
                  <strong className="text-teal-300">in + dem = im</strong>
                  <div>"im Schrank" (in the wardrobe) • "im Regal" (in the shelf)</div>
                </div>
                <div className="bg-stone-800 p-3 rounded-xl">
                  <strong className="text-teal-300">an + dem = am</strong>
                  <div>"am Fenster" (at the window) • "am Tisch" (at the table)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 4: Konjunktion denn (Pos 0) */}
      {activeStation === 'denn' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                Page 6 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Die Konjunktion "denn" (Position 0 Connector)
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                "denn" explains the reason without disrupting standard word order! It sits comfortably on <strong className="text-indigo-900">Position 0</strong>!
              </p>
            </div>

            {/* Sentence Switcher */}
            <div className="flex gap-2">
              {dennSentences.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playChime();
                    setDennSentenceIdx(idx);
                  }}
                  className={`flex-1 p-3 rounded-xl font-bold text-xs border transition-all ${
                    dennSentenceIdx === idx
                      ? 'bg-indigo-700 text-white border-indigo-800 shadow-md'
                      : 'bg-stone-50 hover:bg-indigo-50 border-stone-200 text-stone-700'
                  }`}
                >
                  Sentence {idx + 1}
                </button>
              ))}
            </div>

            {/* Position 0 Visual Train */}
            <div className="bg-indigo-950 text-white rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Position 0 Train Track Visualizer
                </span>
                <button
                  onClick={() => speakGerman(dennSentences[dennSentenceIdx].full, isSlowMode)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Play Audio</span>
                </button>
              </div>

              <div className="text-sm md:text-base font-bold text-indigo-200 border-b border-indigo-800 pb-2">
                Clause 1: {dennSentences[dennSentenceIdx].part1}
              </div>

              <div className="grid grid-cols-4 gap-2 text-center pt-2 font-mono">
                <div className="bg-amber-400 text-indigo-950 p-3 rounded-xl font-black">
                  <span className="text-[10px] block opacity-75 uppercase">Position 0</span>
                  <span className="text-base md:text-lg">denn</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <span className="text-[10px] text-indigo-300 block uppercase">Position 1 (Subject)</span>
                  <span className="text-sm md:text-base font-bold">{dennSentences[dennSentenceIdx].subject.split(' ')[0]}</span>
                </div>

                <div className="bg-indigo-500/40 p-3 rounded-xl border-2 border-indigo-400">
                  <span className="text-[10px] text-amber-300 block uppercase font-bold">Position 2 (Verb)</span>
                  <span className="text-sm md:text-base font-bold text-amber-300">{dennSentences[dennSentenceIdx].verb.split(' ')[0]}</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <span className="text-[10px] text-indigo-300 block uppercase">Rest</span>
                  <span className="text-sm md:text-base">{dennSentences[dennSentenceIdx].rest}</span>
                </div>
              </div>

              <div className="text-xs text-indigo-200 italic text-center pt-2">
                "{dennSentences[dennSentenceIdx].en}"
              </div>
            </div>

            {/* ADUSO Group Info */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-700">
              <span className="font-bold text-indigo-900 block mb-1">💡 The 4 Position 0 Connectors (ADUSO Group):</span>
              <span><strong>aber</strong> (but), <strong>denn</strong> (because), <strong>und</strong> (and), <strong>oder</strong> (or) all occupy Position 0 and never steal the verb's position!</span>
            </div>
          </div>
        </div>
      )}

      {/* STATION 5: Wüsten-Comic & Redemittel */}
      {activeStation === 'comic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Pages 7 & 8 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Wüsten-Comic & Das Komplette Redemittel Toolkit
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Explore the funny desert directions cartoon and master street directions, room descriptions, and rating priorities with <strong className="text-rose-700">DOCH</strong>!
              </p>
            </div>

            {/* Page 7 Comic Strip */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-stone-50 rounded-2xl p-6 border-2 border-amber-300 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐪</span>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Der Wüsten-Comic (Page 7)</h3>
                    <p className="text-xs text-stone-500">Asking for the nearest city in the middle of nowhere</p>
                  </div>
                </div>
                <button
                  onClick={() => speakGerman("Wo ist hier die nächste Stadt? Zuerst geradeaus, nächste Woche dann nach links.", isSlowMode)}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Play Comic Audio</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Speech Bubble 1 */}
                <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-md">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                    <span>🥵 Thirsty Hiker (with one shoe):</span>
                    <Volume2
                      onClick={() => speakGerman("Wo ist hier die nächste Stadt?", isSlowMode)}
                      className="w-4 h-4 cursor-pointer text-amber-700"
                    />
                  </div>
                  <div className="text-base font-extrabold text-stone-900">
                    "Wo ist hier <span className="text-rose-700 underline">die nächste Stadt</span>?"
                  </div>
                  <div className="text-xs text-stone-500 mt-1">"Where is the nearest city around here?"</div>
                </div>

                {/* Speech Bubble 2 */}
                <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-md">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                    <span>🤵 Smirking Local:</span>
                    <Volume2
                      onClick={() => speakGerman("Zuerst geradeaus, nächste Woche dann nach links.", isSlowMode)}
                      className="w-4 h-4 cursor-pointer text-emerald-700"
                    />
                  </div>
                  <div className="text-base font-extrabold text-stone-900">
                    "Zuerst <span className="text-emerald-700 underline">geradeaus</span>, nächste Woche dann <span className="text-emerald-700 underline">nach links</span>."
                  </div>
                  <div className="text-xs text-stone-500 mt-1">"First straight ahead, next week then turn left."</div>
                </div>
              </div>
            </div>

            {/* Page 8 Redemittel Sections */}
            <div className="space-y-6 pt-2">
              <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                <span>📋 Essential Speaking Toolkit (Page 8 Redemittel)</span>
              </h3>

              <div className="space-y-4">
                {redemittelToolkit.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                    <h4 className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">{sec.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {sec.phrases.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => speakGerman(p.sound, isSlowMode)}
                          className="bg-white p-3 rounded-xl border border-stone-200 hover:border-teal-300 hover:bg-teal-50/40 cursor-pointer transition-all shadow-sm flex items-center justify-between group"
                        >
                          <div>
                            <div className="text-sm font-bold text-stone-900 group-hover:text-teal-900">{p.de}</div>
                            <div className="text-xs text-stone-500 mt-0.5">{p.en}</div>
                          </div>
                          <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-teal-700 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
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
