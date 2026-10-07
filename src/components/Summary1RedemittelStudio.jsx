import React, { useState } from 'react';
import { Volume2, Sparkles, User, Sun, Moon, Sunrise, Sunset, MessageSquare, SpellCheck, CheckCircle2, Award, Clock, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary1RedemittelStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('vorstellen'); // 'vorstellen', 'begruessen', 'verabschieden', 'nachfragen', 'dialogues'
  
  // Station 1: Custom Name Creator State
  const [firstName, setFirstName] = useState('Dana');
  const [lastName, setLastName] = useState('Sahin');
  const [selectedFormula, setSelectedFormula] = useState('heiße'); // 'heiße', 'name', 'bin'
  const [activeAvatar, setActiveAvatar] = useState('👩‍💼');

  // Station 2: Sun & Time Explorer State
  const [selectedHour, setSelectedHour] = useState(14); // 2:00 PM

  // Station 4: Spelling Machine State
  const [spellingInput, setSpellingInput] = useState('DANA SAHIN');
  const [spelledIndex, setSpelledIndex] = useState(null);

  // Alphabet phonetic lookup for letter-by-letter spelling
  const germanLetterSounds = {
    A: { sound: 'ah', word: 'Anton' },
    B: { sound: 'bay', word: 'Berta' },
    C: { sound: 'tsay', word: 'Cäsar' },
    D: { sound: 'day', word: 'Dora' },
    E: { sound: 'ay', word: 'Emil' },
    F: { sound: 'eff', word: 'Friedrich' },
    G: { sound: 'gay', word: 'Gustav' },
    H: { sound: 'hah', word: 'Heinrich' },
    I: { sound: 'ee', word: 'Ida' },
    J: { sound: 'yott', word: 'Julius' },
    K: { sound: 'kah', word: 'Kaufmann' },
    L: { sound: 'ell', word: 'Ludwig' },
    M: { sound: 'emm', word: 'Martha' },
    N: { sound: 'enn', word: 'Nordpol' },
    O: { sound: 'oh', word: 'Otto' },
    P: { sound: 'pay', word: 'Paula' },
    Q: { sound: 'koo', word: 'Quelle' },
    R: { sound: 'air', word: 'Richard' },
    S: { sound: 'ess', word: 'Samuel' },
    T: { sound: 'tay', word: 'Theodor' },
    U: { sound: 'oo', word: 'Ulrich' },
    V: { sound: 'fow', word: 'Viktor' },
    W: { sound: 'vay', word: 'Wilhelm' },
    X: { sound: 'iks', word: 'Xanthippe' },
    Y: { sound: 'oopsilon', word: 'Ypsilon' },
    Z: { sound: 'tsett', word: 'Zeppelin' },
    Ä: { sound: 'ay-umlaut', word: 'Ärger' },
    Ö: { sound: 'ur-umlaut', word: 'Ökonom' },
    Ü: { sound: 'ew-umlaut', word: 'Übermut' },
    ß: { sound: 'ess-tsett', word: 'Eszett' }
  };

  // Helper for greeting based on hour
  const getGreetingForHour = (hour) => {
    if (hour >= 5 && hour < 11) {
      return {
        german: 'Guten Morgen.',
        english: 'Good morning.',
        swahili: 'Habari za asubuhi.',
        icon: '🌅',
        timeWindow: 'Early morning to ~11:00 AM',
        bg: 'from-amber-400/20 via-orange-300/20 to-amber-100',
        border: 'border-amber-400',
        badge: 'bg-amber-100 text-amber-800'
      };
    } else if (hour >= 11 && hour < 18) {
      return {
        german: 'Guten Tag.',
        english: 'Good day / Hello.',
        swahili: 'Habari za mchana.',
        icon: '☀️',
        timeWindow: '~11:00 AM to ~6:00 PM',
        bg: 'from-sky-400/20 via-blue-300/20 to-sky-100',
        border: 'border-sky-400',
        badge: 'bg-sky-100 text-sky-800'
      };
    } else {
      return {
        german: 'Guten Abend.',
        english: 'Good evening.',
        swahili: 'Habari za jioni.',
        icon: '🌆',
        timeWindow: 'From ~6:00 PM until bedtime',
        bg: 'from-indigo-600/20 via-purple-500/20 to-indigo-100',
        border: 'border-indigo-400',
        badge: 'bg-indigo-100 text-indigo-800'
      };
    }
  };

  const currentGreeting = getGreetingForHour(selectedHour);

  // Compute generated intro phrase
  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || 'Dana Sahin';
  const getIntroPhrase = () => {
    if (selectedFormula === 'heiße') return `Ich heiße ${fullName}.`;
    if (selectedFormula === 'name') return `Mein Name ist ${fullName}.`;
    return `Ich bin ${fullName}.`;
  };

  // Play spelling sequence
  const handleSpellFull = async (text) => {
    playChime('click');
    const letters = text.toUpperCase().split('');
    for (let i = 0; i < letters.length; i++) {
      const char = letters[i];
      if (char.match(/[A-ZÄÖÜß]/i)) {
        setSpelledIndex(i);
        speakGerman(char, true);
        await new Promise((r) => setTimeout(r, 700));
      }
    }
    setSpelledIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner with Visual Redemittel Theme */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 rounded-3xl shadow-xl border-4 border-amber-300 relative overflow-hidden">
        <div className="absolute top-2 right-4 opacity-15 text-8xl select-none pointer-events-none">
          🏷️
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-900/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-200 border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Visual Summary 1 • REDEMITTEL (Everyday Communication Toolkit)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
            Die 4 Redemittel-Stationen
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Master the 4 core pillars of daily German social interaction: <strong>Sich vorstellen</strong> (Introductions), <strong>Sich begrüßen</strong> (Day & Night Greetings), <strong>Sich verabschieden</strong> (Farewells), and <strong>Nachfragen</strong> (Spelling Clarifications).
          </p>
        </div>

        {/* Station Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5">
          {[
            { id: 'vorstellen', label: '1. Sich vorstellen', icon: '🏷️', sub: 'Name & Formulas' },
            { id: 'begruessen', label: '2. Sich begrüßen', icon: '☀️', sub: 'Sun & Clock Greetings' },
            { id: 'verabschieden', label: '3. Sich verabschieden', icon: '👋', sub: 'Day vs Bedtime' },
            { id: 'nachfragen', label: '4. Nachfragen', icon: '🔤', sub: 'Spelling Machine' },
            { id: 'dialogues', label: '5. Roleplay Duet', icon: '💬', sub: 'Live Dialogue Practice' }
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
                    ? 'bg-white text-stone-900 shadow-lg scale-102 ring-2 ring-amber-300'
                    : 'bg-amber-900/50 text-amber-100 hover:bg-amber-800/60 border border-amber-500/40'
                }`}
              >
                <span className="text-xl mb-0.5">{tab.icon}</span>
                <span className="text-xs font-black">{tab.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-stone-600' : 'text-amber-200'}`}>{tab.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* STATION 1: SICH VORSTELLEN (NAME BADGE & FORMULAS) */}
      {/* ========================================================= */}
      {activeStation === 'vorstellen' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                  <span>Station 1</span> • <span>sich vorstellen</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Wie heißen Sie? • State Your Name with Confidence
                </h3>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  speakGerman("Wie heißen Sie? Ich heiße Dana Sahin. Mein Name ist Dana Sahin. Ich bin Dana Sahin.", isSlowMode);
                }}
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear All 3 Formulas</span>
              </button>
            </div>

            {/* Side-by-Side: The 3 Formulas & The Visual Badge Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: The 3 Core Formulas */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>The Formal Question & 3 Valid Answers</span>
                  </div>

                  {/* The Question */}
                  <div className="bg-white rounded-xl p-3.5 border-2 border-amber-300 shadow-xs mb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-700 block">The Formal Question (Sie)</span>
                      <div className="text-base font-black text-stone-900">Wie heißen Sie?</div>
                      <div className="text-xs text-stone-600">What is your name? (Polite)</div>
                    </div>
                    <button
                      onClick={() => {
                        playChime('click');
                        speakGerman("Wie heißen Sie?", isSlowMode);
                      }}
                      className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 3 Answer Formulas Selector */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-stone-700 block">Pick your preferred intro formula:</span>
                    {[
                      { id: 'heiße', german: `Ich heiße ${fullName}.`, label: 'Formula 1: Ich heiße...', note: 'Literally: I am called / named...', sound: `Ich heiße ${fullName}` },
                      { id: 'name', german: `Mein Name ist ${fullName}.`, label: 'Formula 2: Mein Name ist...', note: 'Literally: My name is...', sound: `Mein Name ist ${fullName}` },
                      { id: 'bin', german: `Ich bin ${fullName}.`, label: 'Formula 3: Ich bin...', note: 'Literally: I am...', sound: `Ich bin ${fullName}` }
                    ].map((f) => {
                      const isSelected = selectedFormula === f.id;
                      return (
                        <div
                          key={f.id}
                          onClick={() => {
                            setSelectedFormula(f.id);
                            playChime('click');
                            speakGerman(f.sound, isSlowMode);
                          }}
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-100/90 border-amber-500 shadow-xs ring-2 ring-amber-300'
                              : 'bg-white border-stone-200 hover:border-amber-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">{f.label}</span>
                              {isSelected && <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-full">Active</span>}
                            </div>
                            <div className="text-sm font-black text-stone-900 mt-0.5">{f.german}</div>
                            <div className="text-xs text-stone-500">{f.note}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playChime('click');
                              speakGerman(f.sound, isSlowMode);
                            }}
                            className="p-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Customizer Inputs */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4 text-stone-600" />
                    <span>Customize Your Visual Name Badge</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">First Name (Vorname)</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="e.g. Dana / Eugene"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">Last Name (Familienname)</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="e.g. Sahin / Mwangi"
                      />
                    </div>
                  </div>

                  {/* Avatar Picker */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-stone-600">Avatar:</span>
                    {['👩‍💼', '👨‍💼', '👩‍🎓', '👨‍🎓', '🦁', '⭐'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setActiveAvatar(emoji);
                          playChime('click');
                        }}
                        className={`text-lg p-1 rounded-xl transition-all ${
                          activeAvatar === emoji ? 'bg-amber-300 scale-110 shadow-xs' : 'bg-white hover:bg-stone-200'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Lanyard Name Badge (Replicating Dana Sahin's seminar badge) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                {/* Lanyard Strap */}
                <div className="w-8 h-8 bg-amber-700 rounded-t-lg -mb-2 z-0 shadow-inner flex items-center justify-center text-amber-200 text-[10px] font-black">
                  📎
                </div>

                {/* The Badge Card */}
                <div className="w-full max-w-sm bg-gradient-to-b from-white to-amber-50 rounded-3xl p-5 border-4 border-amber-400 shadow-xl relative z-10 text-center space-y-4">
                  {/* Badge Header */}
                  <div className="border-b-2 border-amber-200 pb-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-amber-800">
                      <span>🇩🇪 Goethe Seminar ID</span>
                      <span>VISITOR PASS</span>
                    </div>
                  </div>

                  {/* Avatar & Name */}
                  <div className="space-y-1">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner">
                      {activeAvatar}
                    </div>
                    <div className="text-xl font-black text-stone-900 tracking-tight">
                      {fullName}
                    </div>
                    <div className="text-xs font-semibold text-amber-800">
                      Teilnehmer / Participant
                    </div>
                  </div>

                  {/* Live Formula Preview Box */}
                  <div className="bg-amber-500/15 border border-amber-300 rounded-2xl p-3 text-left">
                    <span className="text-[10px] font-bold text-amber-900 uppercase block">Speech Output</span>
                    <div className="text-sm font-black text-amber-950 mt-0.5">
                      "{getIntroPhrase()}"
                    </div>
                  </div>

                  {/* Pronounce Badge Button */}
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman(getIntroPhrase(), isSlowMode);
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Speak Intro ("{getIntroPhrase()}")</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 2: SICH BEGRÜßEN (SUN & CLOCK GREETINGS) */}
      {/* ========================================================= */}
      {activeStation === 'begruessen' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                  <span>Station 2</span> • <span>sich begrüßen</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  24-Hour Sun & Time Clock Explorer
                </h3>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  speakGerman("Hallo! Guten Morgen. Guten Tag. Guten Abend.", isSlowMode);
                }}
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear All Greetings</span>
              </button>
            </div>

            {/* 24-Hour Interactive Slider */}
            <div className={`p-6 rounded-3xl border-2 transition-all bg-gradient-to-r ${currentGreeting.bg} ${currentGreeting.border}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-stone-800" />
                  <span className="text-sm font-black text-stone-900">Current Time: {selectedHour}:00</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${currentGreeting.badge}`}>
                    {currentGreeting.timeWindow}
                  </span>
                </div>
                <div className="text-xs font-bold text-stone-600">
                  Slide to change time of day:
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="23"
                value={selectedHour}
                onChange={(e) => setSelectedHour(Number(e.target.value))}
                className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />

              {/* Time markers */}
              <div className="flex justify-between text-[11px] font-bold text-stone-600 mt-2">
                <span>0:00 (Midnight)</span>
                <span>6:00 (Morgen)</span>
                <span>12:00 (Mittag)</span>
                <span>18:00 (Abend)</span>
                <span>23:00 (Nacht)</span>
              </div>

              {/* Active Greeting Card */}
              <div className="mt-5 bg-white/90 backdrop-blur-md rounded-2xl p-5 border-2 border-stone-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="text-5xl">{currentGreeting.icon}</div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">Recommended Greeting for {selectedHour}:00</span>
                    <div className="text-2xl font-black text-stone-900">{currentGreeting.german}</div>
                    <div className="text-xs font-bold text-stone-600">{currentGreeting.english} • Swahili: <em>{currentGreeting.swahili}</em></div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman(currentGreeting.german, isSlowMode);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Speak "{currentGreeting.german}"</span>
                </button>
              </div>
            </div>

            {/* The 4 Standard Greetings Grid (Direct from visual slide) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Hallo! */}
              <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">👋</span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">Anytime</span>
                  </div>
                  <div className="text-lg font-black text-stone-900 mt-2">Hallo!</div>
                  <div className="text-xs text-stone-600 font-semibold">Hello! / Hi!</div>
                  <div className="text-[11px] text-amber-900 bg-white p-2 rounded-xl mt-2 border border-amber-100">
                    <strong>Usage:</strong> Universal casual greeting. Use anytime with friends, classmates, or informal settings!
                  </div>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Hallo!", isSlowMode);
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hallo!</span>
                </button>
              </div>

              {/* 2. Guten Morgen. */}
              <div className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🌅</span>
                    <span className="text-[10px] font-bold bg-orange-200 text-orange-900 px-2 py-0.5 rounded-full">&lt; 11:00 AM</span>
                  </div>
                  <div className="text-lg font-black text-stone-900 mt-2">Guten Morgen.</div>
                  <div className="text-xs text-stone-600 font-semibold">Good morning.</div>
                  <div className="text-[11px] text-orange-900 bg-white p-2 rounded-xl mt-2 border border-orange-100">
                    <strong>Usage:</strong> From wake-up until around 11:00 AM. Like "Habari za asubuhi".
                  </div>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Guten Morgen.", isSlowMode);
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Guten Morgen.</span>
                </button>
              </div>

              {/* 3. Guten Tag. */}
              <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">☀️</span>
                    <span className="text-[10px] font-bold bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full">11:00 - 18:00</span>
                  </div>
                  <div className="text-lg font-black text-stone-900 mt-2">Guten Tag.</div>
                  <div className="text-xs text-stone-600 font-semibold">Good day / Hello.</div>
                  <div className="text-[11px] text-sky-900 bg-white p-2 rounded-xl mt-2 border border-sky-100">
                    <strong>Usage:</strong> The standard polite daytime greeting for shops, embassies, offices, and street encounters.
                  </div>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Guten Tag.", isSlowMode);
                  }}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Guten Tag.</span>
                </button>
              </div>

              {/* 4. Guten Abend. */}
              <div className="bg-indigo-50 rounded-2xl p-4 border-2 border-indigo-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🌆</span>
                    <span className="text-[10px] font-bold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full">18:00+</span>
                  </div>
                  <div className="text-lg font-black text-stone-900 mt-2">Guten Abend.</div>
                  <div className="text-xs text-stone-600 font-semibold">Good evening.</div>
                  <div className="text-[11px] text-indigo-900 bg-white p-2 rounded-xl mt-2 border border-indigo-100">
                    <strong>Usage:</strong> Welcoming people when arriving from around 6:00 PM onwards. (NOT bedtime!).
                  </div>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Guten Abend.", isSlowMode);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Guten Abend.</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 3: SICH VERABSCHIEDEN (DAY VS BEDTIME FAREWELLS) */}
      {/* ========================================================= */}
      {activeStation === 'verabschieden' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                  <span>Station 3</span> • <span>sich verabschieden</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Saying Goodbye: Daytime vs. Sleep Bedtime
                </h3>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  speakGerman("Auf Wiedersehen. Tschüs. Gute Nacht.", isSlowMode);
                }}
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear All 3 Farewells</span>
              </button>
            </div>

            {/* Crucial Warning Card: Gute Nacht vs Guten Abend / Auf Wiedersehen */}
            <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-rose-200 text-rose-800 rounded-2xl text-2xl shrink-0">
                ⚠️
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-rose-900 uppercase tracking-wide">
                  CRITICAL RULE: Never say "Gute Nacht" at 2:00 PM or when arriving at a dinner!
                </h4>
                <p className="text-xs text-rose-800 leading-relaxed">
                  In German, <strong>Gute Nacht</strong> is exclusively a <em>bedtime farewell</em> when you or the other person is literally about to go to sleep (just like Swahili <em>"Lala salama"</em>). If you arrive at an evening restaurant, say <strong>Guten Abend</strong>. If you are parting during the day, say <strong>Auf Wiedersehen</strong> or <strong>Tschüs</strong>!
                </p>
              </div>
            </div>

            {/* 3 Farewell Illustrated Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 1. Auf Wiedersehen */}
              <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-5 border-2 border-amber-300 shadow-md space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🤝</span>
                    <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">Formal Daytime</span>
                  </div>
                  <div className="text-xl font-black text-stone-900">Auf Wiedersehen.</div>
                  <div className="text-xs font-bold text-amber-800">Goodbye (Until we see each other again)</div>
                  <p className="text-xs text-stone-600 bg-white p-3 rounded-2xl border border-stone-200">
                    Used with officials, bosses, shop attendants, and doctors when parting in person.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Auf Wiedersehen.", isSlowMode);
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Auf Wiedersehen.</span>
                </button>
              </div>

              {/* 2. Tschüs */}
              <div className="bg-gradient-to-b from-teal-50 to-white rounded-3xl p-5 border-2 border-teal-300 shadow-md space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">✌️</span>
                    <span className="text-[10px] font-black bg-teal-200 text-teal-900 px-2.5 py-0.5 rounded-full">Casual Friendly</span>
                  </div>
                  <div className="text-xl font-black text-stone-900">Tschüs!</div>
                  <div className="text-xs font-bold text-teal-800">Bye! / Bye-bye!</div>
                  <p className="text-xs text-stone-600 bg-white p-3 rounded-2xl border border-stone-200">
                    The beloved casual wave among friends, family, and peers when leaving a hangout or call.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Tschüs!", isSlowMode);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Tschüs!</span>
                </button>
              </div>

              {/* 3. Gute Nacht */}
              <div className="bg-gradient-to-b from-indigo-50 to-white rounded-3xl p-5 border-2 border-indigo-300 shadow-md space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🌙</span>
                    <span className="text-[10px] font-black bg-indigo-200 text-indigo-900 px-2.5 py-0.5 rounded-full">Bedtime Sleep Only</span>
                  </div>
                  <div className="text-xl font-black text-stone-900">Gute Nacht.</div>
                  <div className="text-xs font-bold text-indigo-800">Good night (Sleep well)</div>
                  <p className="text-xs text-stone-600 bg-white p-3 rounded-2xl border border-stone-200">
                    Said exclusively right before turning off the lights to sleep ("Lala salama").
                  </p>
                </div>
                <button
                  onClick={() => {
                    playChime('click');
                    speakGerman("Gute Nacht.", isSlowMode);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Gute Nacht.</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 4: NACHFRAGEN (THE SPELLING MACHINE) */}
      {/* ========================================================= */}
      {activeStation === 'nachfragen' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                  <span>Station 4</span> • <span>nachfragen</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Buchstabieren Sie bitte! • The Interactive Spelling Machine
                </h3>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  speakGerman("Buchstabieren Sie bitte! Mein Name ist Sahin: S-A-H-I-N.", isSlowMode);
                }}
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Slide Example</span>
              </button>
            </div>

            {/* Top Prompt Card */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-200 text-amber-900 rounded-2xl text-2xl">
                  🔤
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800">The Polite Request Formula</span>
                  <div className="text-base sm:text-lg font-black text-stone-900">
                    "Buchstabieren Sie bitte."
                  </div>
                  <div className="text-xs text-stone-600">
                    "Please spell it." (Used at visa desks, hotels, banks, and customer care).
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSpellingInput('DANA SAHIN');
                    playChime('click');
                  }}
                  className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-amber-900 hover:bg-amber-100 cursor-pointer"
                >
                  Preset: Dana Sahin
                </button>
                <button
                  onClick={() => {
                    setSpellingInput('EUGENE MWANGI');
                    playChime('click');
                  }}
                  className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-amber-900 hover:bg-amber-100 cursor-pointer"
                >
                  Preset: Eugene Mwangi
                </button>
              </div>
            </div>

            {/* Input to spell anything */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={spellingInput}
                  onChange={(e) => setSpellingInput(e.target.value)}
                  className="flex-1 bg-stone-50 border-2 border-amber-300 rounded-2xl px-4 py-3 text-base font-black text-stone-900 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="TYPE ANY NAME OR WORD TO SPELL..."
                />
                <button
                  onClick={() => handleSpellFull(spellingInput)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Spell All Letters Automatically</span>
                </button>
              </div>

              {/* Letter Tiles Display */}
              <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-inner space-y-4">
                <div className="flex items-center justify-between text-xs text-amber-300 font-bold border-b border-stone-800 pb-2">
                  <span>Interactive German Letter Soundboard</span>
                  <span>Tap any letter tile to hear its German name</span>
                </div>

                <div className="flex flex-wrap gap-2.5 justify-center py-2">
                  {spellingInput.split('').map((char, idx) => {
                    const upperChar = char.toUpperCase();
                    const isSpace = char === ' ';
                    const info = germanLetterSounds[upperChar];
                    const isCurrentlySpelling = spelledIndex === idx;

                    if (isSpace) {
                      return (
                        <div key={idx} className="w-8 flex items-center justify-center text-stone-600 font-black">
                          •
                        </div>
                      );
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          playChime('click');
                          speakGerman(upperChar, true);
                        }}
                        className={`w-14 sm:w-16 h-18 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-md ${
                          isCurrentlySpelling
                            ? 'bg-amber-400 text-stone-950 scale-110 ring-4 ring-amber-300 shadow-xl'
                            : 'bg-stone-800 hover:bg-amber-600 text-white border border-stone-700 hover:border-amber-400'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl font-black">{upperChar}</span>
                        <span className="text-[10px] text-amber-200 font-semibold mt-0.5">
                          {info ? `[${info.sound}]` : '-'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STATION 5: ROLEPLAY DUET (LIVE DIALOGUE PRACTICE) */}
      {/* ========================================================= */}
      {activeStation === 'dialogues' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                  <span>Station 5</span> • <span>Live Dialogue Practice</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Redemittel in Real-Life Scenarios
                </h3>
              </div>
            </div>

            {/* 3 Real-Life Mini Dialogues */}
            <div className="space-y-4">
              {/* Dialogue 1: Official Seminar Check-in */}
              <div className="bg-amber-50/70 rounded-3xl p-5 border-2 border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                    🏢 Scenario 1: Seminar Registration Desk (Formal)
                  </span>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Guten Tag! Wie heißen Sie? Guten Tag! Mein Name ist Dana Sahin. Buchstabieren Sie bitte! S-A-H-I-N. Danke schön! Auf Wiedersehen!", isSlowMode);
                    }}
                    className="p-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Dialogue</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-amber-200">
                    <span className="font-black text-amber-900 shrink-0">Receptionist:</span>
                    <span className="text-stone-800">"Guten Tag! Wie heißen Sie?" <em>(Good day! What is your name?)</em></span>
                  </div>
                  <div className="flex items-start gap-2 bg-amber-100/60 p-3 rounded-2xl border border-amber-300">
                    <span className="font-black text-amber-950 shrink-0">Dana:</span>
                    <span className="text-stone-900">"Guten Tag! Mein Name ist Dana Sahin." <em>(Good day! My name is Dana Sahin.)</em></span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-amber-200">
                    <span className="font-black text-amber-900 shrink-0">Receptionist:</span>
                    <span className="text-stone-800">"Buchstabieren Sie bitte!" <em>(Please spell that!)</em></span>
                  </div>
                  <div className="flex items-start gap-2 bg-amber-100/60 p-3 rounded-2xl border border-amber-300">
                    <span className="font-black text-amber-950 shrink-0">Dana:</span>
                    <span className="text-stone-900">"S - A - H - I - N."</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-amber-200">
                    <span className="font-black text-amber-900 shrink-0">Receptionist:</span>
                    <span className="text-stone-800">"Danke schön! Auf Wiedersehen!" <em>(Thank you! Goodbye!)</em></span>
                  </div>
                </div>
              </div>

              {/* Dialogue 2: Casual Afternoon Catchup */}
              <div className="bg-teal-50/70 rounded-3xl p-5 border-2 border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-teal-900 uppercase tracking-wide flex items-center gap-1.5">
                    ☕ Scenario 2: Casual Meetup at the Cafe (Informal)
                  </span>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Hallo Peter! Hallo Sarah! Alles klar? Ja super! Tschüs, bis morgen! Tschüs!", isSlowMode);
                    }}
                    className="p-1.5 rounded-xl bg-teal-200 hover:bg-teal-300 text-teal-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Dialogue</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-teal-200">
                    <span className="font-black text-teal-900 shrink-0">Peter:</span>
                    <span className="text-stone-800">"Hallo Sarah! Wie geht's?" <em>(Hi Sarah! How's it going?)</em></span>
                  </div>
                  <div className="flex items-start gap-2 bg-teal-100/60 p-3 rounded-2xl border border-teal-300">
                    <span className="font-black text-teal-950 shrink-0">Sarah:</span>
                    <span className="text-stone-900">"Hallo Peter! Super, danke! Tschüs, bis bald!" <em>(Hi Peter! Super, thanks! Bye, see you soon!)</em></span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-teal-200">
                    <span className="font-black text-teal-900 shrink-0">Peter:</span>
                    <span className="text-stone-800">"Tschüs!" <em>(Bye!)</em></span>
                  </div>
                </div>
              </div>

              {/* Dialogue 3: Bedtime Farewell */}
              <div className="bg-indigo-50/70 rounded-3xl p-5 border-2 border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
                    🌙 Scenario 3: Saying Good Night at Home
                  </span>
                  <button
                    onClick={() => {
                      playChime('click');
                      speakGerman("Gute Nacht, schlaf gut! Gute Nacht!", isSlowMode);
                    }}
                    className="p-1.5 rounded-xl bg-indigo-200 hover:bg-indigo-300 text-indigo-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Dialogue</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-indigo-200">
                    <span className="font-black text-indigo-900 shrink-0">Mama:</span>
                    <span className="text-stone-800">"Gute Nacht, schlaf gut!" <em>(Good night, sleep well!)</em></span>
                  </div>
                  <div className="flex items-start gap-2 bg-indigo-100/60 p-3 rounded-2xl border border-indigo-300">
                    <span className="font-black text-indigo-950 shrink-0">Kind:</span>
                    <span className="text-stone-900">"Gute Nacht!" <em>(Good night!)</em></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
