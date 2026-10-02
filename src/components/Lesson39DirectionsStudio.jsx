import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson39DirectionsStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('navigator');
  const [selectedDirection, setSelectedDirection] = useState(0);
  const [questionType, setQuestionType] = useState('wie-komme-ich'); // 'wie-komme-ich' or 'wie-weit'
  const [selectedLandmark, setSelectedLandmark] = useState('bahnhof');
  const [activeDialogue, setActiveDialogue] = useState(0);

  const DIRECTIONS_DATA = [
    {
      id: 'geradeaus',
      title: 'Gehen Sie geradeaus!',
      altTitle: 'Fahren Sie geradeaus!',
      english: 'Go straight ahead! / Keep straight on!',
      icon: '⬆️',
      color: 'from-blue-500 to-indigo-600',
      badge: 'Slide 4: Straight Ahead',
      rule: 'Sentence starts with Verb (Pos. 1) + Sie + geradeaus! Exclamation mark at the end.',
      audio: 'Gehen Sie geradeaus! Fahren Sie geradeaus! Gehen Sie immer geradeaus!',
      visual: '🛣️ Main Road Forward'
    },
    {
      id: 'links-abbiegen',
      title: 'Biegen Sie links ab!',
      altTitle: 'Gehen Sie links in die Goethestraße!',
      english: 'Turn left! / Turn left into Goethestraße!',
      icon: '⬅️',
      color: 'from-amber-500 to-orange-600',
      badge: 'Slide 5: Turn Left',
      rule: 'abbiegen is separable: "Biegen Sie..." + direction + "...ab!" (or: Fahren Sie nach links!).',
      audio: 'Biegen Sie links ab! Fahren Sie nach links! Gehen Sie links in die Goethestraße!',
      visual: '↩️ Left Turn at Corner'
    },
    {
      id: 'rechts-abbiegen',
      title: 'Biegen Sie rechts ab!',
      altTitle: 'Gehen Sie rechts in die Schillerstraße!',
      english: 'Turn right! / Turn right into Schillerstraße!',
      icon: '➡️',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Slide 6: Turn Right',
      rule: 'abbiegen is separable: "Biegen Sie..." + direction + "...ab!" (or: Fahren Sie nach rechts!).',
      audio: 'Biegen Sie rechts ab! Fahren Sie nach rechts! Gehen Sie rechts in die Schillerstraße!',
      visual: '↪️ Right Turn at Corner'
    },
    {
      id: 'bis-zur-kreuzung',
      title: 'Gehen Sie bis zur Kreuzung!',
      altTitle: 'die Kreuzung ➔ bis zur Kreuzung',
      english: 'Walk down to the intersection!',
      icon: '🚦',
      color: 'from-purple-500 to-violet-600',
      badge: 'Slide 7: Intersections',
      rule: 'die Kreuzung (feminine) combines with "bis zu + der" ➔ "bis zur Kreuzung" (to the junction).',
      audio: 'Gehen Sie bis zur Kreuzung! Fahren Sie bis zur nächsten Kreuzung!',
      visual: '➕ 4-Way Intersection'
    },
    {
      id: 'an-der-kirche-vorbei',
      title: 'Gehen Sie an der Kirche vorbei!',
      altTitle: 'an + [Dativ] + vorbei',
      english: 'Pass by the church! / Walk past the church!',
      icon: '⛪',
      color: 'from-rose-500 to-pink-600',
      badge: 'Slides 8 & 9: Passing Landmarks',
      rule: 'vorbeigehen takes "an + Dativ": die Kirche ➔ an DER Kirche vorbei. das Rathaus ➔ an DEM Rathaus vorbei.',
      audio: 'Gehen Sie an der Kirche vorbei! Gehen Sie am Rathaus vorbei!',
      visual: '🚶 Passing Landmark'
    },
    {
      id: 'zweite-strasse-links',
      title: 'Nehmen Sie die zweite Straße links!',
      altTitle: 'Nehmen Sie die erste Straße rechts!',
      english: 'Take the second street on the left! / Take the first street on the right!',
      icon: '🔢',
      color: 'from-cyan-500 to-blue-600',
      badge: 'Slide 10: Street Counting',
      rule: 'Uses Ordinal numbers (Lesson 32): die erste (1st), die zweite (2nd), die dritte (3rd) + Straße + links/rechts!',
      audio: 'Nehmen Sie die erste Straße links! Nehmen Sie die zweite Straße links! Nehmen Sie die dritte Straße rechts!',
      visual: '📍 Counting Side Streets'
    },
    {
      id: 'an-der-ampel',
      title: 'Überqueren Sie an der Ampel!',
      altTitle: 'die Ampel ➔ an der Ampel',
      english: 'Cross the street at the traffic light!',
      icon: '🚥',
      color: 'from-red-500 to-amber-600',
      badge: 'Slide 11: Zebra & Lights',
      rule: 'überqueren (to cross). die Ampel (feminine) ➔ an der Ampel (at the traffic light).',
      audio: 'Überqueren Sie an der Ampel! Gehen Sie über die Straße!',
      visual: '🚶 Pedestrian Green Light'
    },
    {
      id: 'strasse-entlang',
      title: 'Gehen Sie die Straße entlang!',
      altTitle: 'entlang = along',
      english: 'Walk along the street!',
      icon: '🛣️',
      color: 'from-teal-500 to-emerald-600',
      badge: 'Slide 12: Along the Road',
      rule: 'entlang placed after the noun (postposition): "die Straße entlang" = along the street.',
      audio: 'Gehen Sie die Straße entlang! Fahren Sie diesen Weg entlang!',
      visual: '〰️ Following Winding Road'
    },
    {
      id: 'kreisverkehr',
      title: 'Nehmen Sie die erste Ausfahrt im Kreisverkehr.',
      altTitle: 'der Kreisverkehr ➔ im Kreisverkehr',
      english: 'Take the first exit on the roundabout.',
      icon: '⭕',
      color: 'from-fuchsia-500 to-purple-600',
      badge: 'Slide 13: The Roundabout',
      rule: 'der Kreisverkehr (roundabout) ➔ im Kreisverkehr. die Ausfahrt (exit) ➔ die erste/zweite Ausfahrt.',
      audio: 'Nehmen Sie die erste Ausfahrt im Kreisverkehr. Nehmen Sie die zweite Ausfahrt im Kreisverkehr.',
      visual: '🚗 Roundabout Exit'
    }
  ];

  const LANDMARKS = [
    // zum (der/das)
    { id: 'bahnhof', german: 'der Bahnhof', type: 'masculine', article: 'der', prep: 'zum', prepFull: 'zu dem', meaning: 'Train station', icon: '🚉' },
    { id: 'rathaus', german: 'das Rathaus', type: 'neuter', article: 'das', prep: 'zum', prepFull: 'zu dem', meaning: 'Town hall', icon: '🏛️' },
    { id: 'tierpark', german: 'der Tierpark', type: 'masculine', article: 'der', prep: 'zum', prepFull: 'zu dem', meaning: 'Zoo / Animal park', icon: '🦒' },
    { id: 'krankenhaus', german: 'das Krankenhaus', type: 'neuter', article: 'das', prep: 'zum', prepFull: 'zu dem', meaning: 'Hospital', icon: '🏥' },
    { id: 'reisebuero', german: 'das Reisebüro', type: 'neuter', article: 'das', prep: 'zum', prepFull: 'zu dem', meaning: 'Travel agency', icon: '✈️' },
    { id: 'alexanderplatz', german: 'der Alexanderplatz', type: 'masculine', article: 'der', prep: 'zum', prepFull: 'zu dem', meaning: 'Alexander Square', icon: '🏙️' },
    
    // zur (die)
    { id: 'apotheke', german: 'die Apotheke', type: 'feminine', article: 'die', prep: 'zur', prepFull: 'zu der', meaning: 'Pharmacy', icon: '💊' },
    { id: 'baeckerei', german: 'die Bäckerei', type: 'feminine', article: 'die', prep: 'zur', prepFull: 'zu der', meaning: 'Bakery', icon: '🥐' },
    { id: 'bank', german: 'die Bank', type: 'feminine', article: 'die', prep: 'zur', prepFull: 'zu der', meaning: 'Bank', icon: '🏦' },
    { id: 'post', german: 'die Post', type: 'feminine', article: 'die', prep: 'zur', prepFull: 'zu der', meaning: 'Post office', icon: '✉️' },
    { id: 'kirche', german: 'die Kirche', type: 'feminine', article: 'die', prep: 'zur', prepFull: 'zu der', meaning: 'Church', icon: '⛪' },
    { id: 'buecherei', german: 'die Bücherei', type: 'feminine', article: 'die', prep: 'zur', prepFull: 'zu der', meaning: 'Library', icon: '📚' },
    { id: 'schule', german: 'die Schule', type: 'feminine', article: 'die', prep: 'zur', prepFull: 'zu der', meaning: 'School', icon: '🏫' }
  ];

  const DIALOGUES = [
    {
      id: 'dialogue-1',
      title: 'Dialogue 1: Central Station Directions (Slide 17 & 18)',
      context: 'Tourist asking for directions to the main railway station',
      lines: [
        {
          speaker: 'Person A (Tourist)',
          german: 'Entschuldigung, wie komme ich zum Hauptbahnhof?',
          english: 'Excuse me, how can I get to the central station?',
          audio: 'Entschuldigung, wie komme ich zum Hauptbahnhof?'
        },
        {
          speaker: 'Person B (Local)',
          german: 'Das ist ganz einfach. Nehmen Sie die erste Straße links und dann gehen Sie bis zur Kreuzung. Der Hauptbahnhof ist an der Ecke.',
          english: "That's very simple. Take the first street left and then walk down to the intersection. The central station is at the corner.",
          audio: 'Das ist ganz einfach. Nehmen Sie die erste Straße links und dann gehen Sie bis zur Kreuzung. Der Hauptbahnhof ist an der Ecke.'
        },
        {
          speaker: 'Person A (Tourist)',
          german: 'Danke!',
          english: 'Thanks!',
          audio: 'Danke!'
        },
        {
          speaker: 'Person B (Local)',
          german: 'Bitte!',
          english: 'You are welcome!',
          audio: 'Bitte!'
        }
      ]
    },
    {
      id: 'dialogue-2',
      title: 'Dialogue 2: Distance to Town Hall (Slide 20)',
      context: 'Asking how far a landmark is and walking time',
      lines: [
        {
          speaker: 'Person A (Tourist)',
          german: 'Entschuldigen Sie, wie weit ist es zum Rathaus?',
          english: 'Excuse me, how far is it to the town hall?',
          audio: 'Entschuldigen Sie, wie weit ist es zum Rathaus?'
        },
        {
          speaker: 'Person B (Local)',
          german: 'Das ist ganz in der Nähe. Sie können 10 Minuten zu Fuß laufen.',
          english: 'That is very close. You can reach in 10 minutes on foot.',
          audio: 'Das ist ganz in der Nähe. Sie können 10 Minuten zu Fuß laufen.'
        }
      ]
    },
    {
      id: 'dialogue-3',
      title: 'Dialogue 3: Finding a Nearby Restaurant (Slide 21)',
      context: 'Checking for nearby amenities and opposite landmarks',
      lines: [
        {
          speaker: 'Person A (Tourist)',
          german: 'Entschuldigen Sie, wissen Sie, ob es in der Nähe ein Restaurant gibt?',
          english: 'Excuse me, do you know if there is a restaurant in the vicinity?',
          audio: 'Entschuldigen Sie, wissen Sie, ob es in der Nähe ein Restaurant gibt?'
        },
        {
          speaker: 'Person B (Local)',
          german: 'Ja, es ist der Kirche gegenüber.',
          english: 'Yes, it is opposite the church.',
          audio: 'Ja, es ist der Kirche gegenüber.'
        }
      ]
    },
    {
      id: 'dialogue-4',
      title: 'Dialogue 4: Public Transit to Alexanderplatz (Slide 16 & 22)',
      context: 'Asking for public transit options when it is further away',
      lines: [
        {
          speaker: 'Person A (Tourist)',
          german: 'Entschuldigen Sie bitte, wie komme ich zum Alexanderplatz?',
          english: 'Excuse me please, how can I get to Alexanderplatz?',
          audio: 'Entschuldigen Sie bitte, wie komme ich zum Alexanderplatz?'
        },
        {
          speaker: 'Person B (Local)',
          german: 'Da nehmen Sie am besten den Bus oder die U-Bahn.',
          english: 'The best would be to take the bus or the subway (U-Bahn).',
          audio: 'Da nehmen Sie am besten den Bus oder die U-Bahn.'
        }
      ]
    },
    {
      id: 'dialogue-5',
      title: 'Dialogue 5: Polite "I Don\'t Know" (Slide 23)',
      context: 'Gracefully replying when you are also a visitor or do not know the way',
      lines: [
        {
          speaker: 'Person A (Tourist)',
          german: 'Entschuldigen Sie bitte, wo finde ich hier eine Apotheke?',
          english: 'Excuse me please, where can I find a pharmacy here?',
          audio: 'Entschuldigen Sie bitte, wo finde ich hier eine Apotheke?'
        },
        {
          speaker: 'Person B (Local / Stranger)',
          german: 'Es tut mir leid. Ich weiß es leider auch nicht.',
          english: "I am sorry, unfortunately even I don't know.",
          audio: 'Es tut mir leid. Ich weiß es leider auch nicht.'
        }
      ]
    }
  ];

  const currentDir = DIRECTIONS_DATA[selectedDirection];
  const activeLandmarkObj = LANDMARKS.find(l => l.id === selectedLandmark) || LANDMARKS[0];
  const activeDialogueObj = DIALOGUES[activeDialogue];

  const constructedQuestionGerman = questionType === 'wie-komme-ich'
    ? `Wie komme ich ${activeLandmarkObj.prep} ${activeLandmarkObj.german.split(' ')[1]}?`
    : `Wie weit ist es ${activeLandmarkObj.prep} ${activeLandmarkObj.german.split(' ')[1]}?`;

  const constructedQuestionEnglish = questionType === 'wie-komme-ich'
    ? `How do I get to the ${activeLandmarkObj.meaning}?`
    : `How far is it to the ${activeLandmarkObj.meaning}?`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 text-9xl transform translate-x-8 -translate-y-8 select-none">
          🧭
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <span>🗺️ Lesson 39 Interactive Studio</span>
            <span>•</span>
            <span>Wegbeschreibung</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Giving & Asking for Directions in German
          </h1>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            Navigate German towns with complete confidence! Master the 3 compass arrows (<strong>links</strong>, <strong>geradeaus</strong>, <strong>rechts</strong>), the golden <strong>zum vs. zur</strong> rule, landmark prepositions (<strong>an der Ecke</strong>, <strong>dem Rathaus gegenüber</strong>), and real-world street conversations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/20">
          <button
            onClick={() => setActiveTab('navigator')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'navigator'
                ? 'bg-white text-blue-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🗺️</span>
            <span>City GPS Navigator</span>
          </button>
          <button
            onClick={() => setActiveTab('compass')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'compass'
                ? 'bg-white text-blue-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🧭</span>
            <span>The "zum" vs. "zur" Compass</span>
          </button>
          <button
            onClick={() => setActiveTab('dialogues')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'dialogues'
                ? 'bg-white text-blue-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🗣️</span>
            <span>Street Roleplay Dialogues</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CITY GPS NAVIGATOR */}
      {activeTab === 'navigator' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Explanation Card */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-amber-900 flex items-start gap-4">
            <span className="text-3xl">🧭</span>
            <div className="space-y-1">
              <h3 className="font-bold text-base">The 3 Compass Foundations (Slide 3)</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                German commands use the <strong>Imperativ with formal "Sie"</strong> (Position 1 verb + Sie): 
                <span className="font-mono bg-amber-100 px-1.5 py-0.5 rounded mx-1 font-bold">Gehen Sie geradeaus!</span> (Straight),
                <span className="font-mono bg-amber-100 px-1.5 py-0.5 rounded mx-1 font-bold">Biegen Sie links ab!</span> (Left), and
                <span className="font-mono bg-amber-100 px-1.5 py-0.5 rounded mx-1 font-bold">Biegen Sie rechts ab!</span> (Right).
              </p>
            </div>
          </div>

          {/* Direction Maneuver Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {DIRECTIONS_DATA.map((dir, idx) => (
              <button
                key={dir.id}
                onClick={() => setSelectedDirection(idx)}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  selectedDirection === idx
                    ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-300 scale-105'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="text-2xl">{dir.icon}</span>
                <span className="text-xs font-bold line-clamp-1">{dir.title.split(' ')[0]} {dir.title.split(' ')[2] || ''}</span>
              </button>
            ))}
          </div>

          {/* Active Maneuver Showcase */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-blue-100 text-blue-800 rounded-2xl text-3xl">
                  {currentDir.icon}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {currentDir.badge}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-stone-900">
                    {currentDir.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => speakGerman(currentDir.audio, isSlowMode)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow transition-all flex items-center gap-2 text-sm"
              >
                <span>🔊</span>
                <span>Listen Audio</span>
              </button>
            </div>

            {/* Translation & Alt Version */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">English Meaning</span>
                <p className="text-lg font-bold text-stone-800">{currentDir.english}</p>
                <p className="text-xs text-stone-500 font-medium">{currentDir.visual}</p>
              </div>
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Alternative Expression / Note</span>
                <p className="text-lg font-bold text-blue-950 font-mono">{currentDir.altTitle}</p>
                <p className="text-xs text-blue-700">Native conversational variant</p>
              </div>
            </div>

            {/* Layman Grammar Rule Explanation */}
            <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-900 text-sm">
                <span>💡</span>
                <span>How This Works in German (Zero Jargon):</span>
              </div>
              <p className="text-sm text-indigo-800 leading-relaxed font-medium">
                {currentDir.rule}
              </p>
            </div>

            {/* Live Practice Sandbox */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                🗣️ Practice Speaking Out Loud:
              </span>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xl md:text-2xl font-mono font-bold text-amber-300">
                  "{currentDir.title}"
                </p>
                <button
                  onClick={() => speakGerman(currentDir.title, isSlowMode)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl text-xs font-bold border border-stone-700 flex items-center gap-1.5 shrink-0"
                >
                  <span>🔊</span>
                  <span>Repeat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE "ZUM" VS. "ZUR" COMPASS */}
      {activeTab === 'compass' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Rule Formula Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">👑</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">The Golden Destination Secret (Slide 19)</span>
                <h2 className="text-2xl md:text-3xl font-black">Contracting "zu + dem" vs. "zu + der"</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
              When asking directions to a place, German always uses the preposition <strong>zu</strong> (which requires Dative). Native speakers never say <em>zu dem</em> or <em>zu der</em> — they contract them into magic one-syllable words!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-200">Masculine & Neuter (der & das)</span>
                  <span className="text-xs font-mono bg-emerald-800/60 px-2 py-0.5 rounded">zu + dem</span>
                </div>
                <p className="text-3xl font-black text-amber-300">zum</p>
                <p className="text-xs text-emerald-100">zum Bahnhof (der), zum Rathaus (das), zum Tierpark (der), zum Krankenhaus (das)</p>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-200">Feminine (die)</span>
                  <span className="text-xs font-mono bg-emerald-800/60 px-2 py-0.5 rounded">zu + der</span>
                </div>
                <p className="text-3xl font-black text-pink-300">zur</p>
                <p className="text-xs text-emerald-100">zur Apotheke (die), zur Bäckerei (die), zur Bank (die), zur Kirche (die), zur Post (die)</p>
              </div>
            </div>
          </div>

          {/* Interactive Question Builder */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Step 1: Choose Your Question Type</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setQuestionType('wie-komme-ich')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    questionType === 'wie-komme-ich'
                      ? 'border-blue-600 bg-blue-50/80 shadow-sm ring-2 ring-blue-200'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <p className="font-bold text-blue-900">Wie komme ich ...?</p>
                  <p className="text-xs text-stone-500">"How do I get to...?" (Slide 17)</p>
                </button>
                <button
                  onClick={() => setQuestionType('wie-weit')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    questionType === 'wie-weit'
                      ? 'border-blue-600 bg-blue-50/80 shadow-sm ring-2 ring-blue-200'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <p className="font-bold text-blue-900">Wie weit ist es ...?</p>
                  <p className="text-xs text-stone-500">"How far is it to...?" (Slide 20)</p>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Landmark */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Step 2: Choose Destination Landmark (Slide 2 & 19)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {LANDMARKS.map(item => {
                  const isSelected = selectedLandmark === item.id;
                  const isMascNeut = item.prep === 'zum';
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLandmark(item.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? isMascNeut
                            ? 'border-amber-500 bg-amber-50/80 shadow ring-2 ring-amber-200'
                            : 'border-pink-500 bg-pink-50/80 shadow ring-2 ring-pink-200'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{item.icon}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isMascNeut ? 'bg-amber-100 text-amber-900' : 'bg-pink-100 text-pink-900'
                        }`}>
                          {item.prep} ({item.article})
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-stone-900">{item.german}</p>
                        <p className="text-xs text-stone-500">{item.meaning}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Constructed Output */}
            <div className="bg-stone-900 rounded-3xl p-6 md:p-8 text-white space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  🎯 Perfectly Formulated German Question:
                </span>
                <button
                  onClick={() => speakGerman(constructedQuestionGerman, isSlowMode)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <span>🔊</span>
                  <span>Listen Audio</span>
                </button>
              </div>

              <p className="text-2xl md:text-3xl font-black text-amber-300 font-mono">
                "{constructedQuestionGerman}"
              </p>
              <p className="text-stone-300 text-sm italic">
                "{constructedQuestionEnglish}"
              </p>

              {/* Formula Breakdown */}
              <div className="pt-4 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-800 rounded-xl">
                  <span className="text-stone-400 block font-medium">Original Article:</span>
                  <span className="text-white font-bold text-sm">{activeLandmarkObj.german}</span>
                </div>
                <div className="p-3 bg-stone-800 rounded-xl">
                  <span className="text-stone-400 block font-medium">Contracted Preposition:</span>
                  <span className="text-amber-400 font-black text-sm">{activeLandmarkObj.prep} ({activeLandmarkObj.prepFull})</span>
                </div>
                <div className="p-3 bg-stone-800 rounded-xl">
                  <span className="text-stone-400 block font-medium">Why?</span>
                  <span className="text-emerald-300 font-semibold">
                    {activeLandmarkObj.type === 'feminine' ? 'die changes to der ➔ zur' : 'der/das change to dem ➔ zum'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-WORLD STREET DIALOGUES */}
      {activeTab === 'dialogues' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Dialogue Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {DIALOGUES.map((dlg, idx) => (
              <button
                key={dlg.id}
                onClick={() => setActiveDialogue(idx)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-1.5 ${
                  activeDialogue === idx
                    ? 'border-indigo-600 bg-indigo-50/80 shadow ring-2 ring-indigo-200'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="text-xs font-bold text-indigo-600">Scene {idx + 1}</span>
                <p className="text-xs font-bold text-stone-900 line-clamp-2">{dlg.title.split(':')[1] || dlg.title}</p>
              </button>
            ))}
          </div>

          {/* Active Dialogue Playboard */}
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {activeDialogueObj.title}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-stone-900">
                {activeDialogueObj.context}
              </h2>
            </div>

            {/* Conversation Bubbles */}
            <div className="space-y-4">
              {activeDialogueObj.lines.map((line, lIdx) => {
                const isPersonA = line.speaker.includes('Person A');
                return (
                  <div
                    key={lIdx}
                    className={`flex flex-col ${isPersonA ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-xs font-bold text-stone-500">{line.speaker}</span>
                    </div>
                    <div
                      className={`max-w-xl p-4 md:p-5 rounded-3xl space-y-2 border-2 ${
                        isPersonA
                          ? 'bg-blue-50/80 border-blue-200 text-blue-950 rounded-tl-sm'
                          : 'bg-emerald-50/80 border-emerald-200 text-emerald-950 rounded-tr-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-base md:text-lg font-bold font-sans">
                          {line.german}
                        </p>
                        <button
                          onClick={() => speakGerman(line.audio, isSlowMode)}
                          className={`p-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                            isPersonA
                              ? 'bg-blue-200 hover:bg-blue-300 text-blue-900'
                              : 'bg-emerald-200 hover:bg-emerald-300 text-emerald-900'
                          }`}
                          title="Listen to this line"
                        >
                          🔊
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-stone-600 italic">
                        "{line.english}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Play All Button */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                💡 Tap individual speaker bubbles to listen to each turn
              </span>
              <button
                onClick={() => {
                  const fullText = activeDialogueObj.lines.map(l => l.german).join(' ... ');
                  speakGerman(fullText, isSlowMode);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow flex items-center gap-2"
              >
                <span>🔊</span>
                <span>Play Entire Conversation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
