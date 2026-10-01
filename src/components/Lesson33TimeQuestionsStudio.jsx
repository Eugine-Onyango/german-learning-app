import React, { useState } from 'react';
import { 
  Volume2, Sparkles, Clock, Calendar, Compass, ArrowRight, Zap, RefreshCw, 
  HelpCircle, CheckCircle2, ChevronRight, Hash, Star, Timer, Repeat, Hourglass, 
  Play, ShieldAlert, Award, MessageSquare, Layers, Sun, Moon
} from 'lucide-react';
import { LESSON_33_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson33TimeQuestionsStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('soundboard'); // 'soundboard' | 'prepositions' | 'dialogues'

  // TAB 1: 9 Question Keys State
  const [selectedKeyId, setSelectedKeyId] = useState('wann');

  const questionKeys = [
    {
      id: 'wann',
      num: 1,
      german: 'Wann?',
      english: 'When?',
      category: 'Moment / Date',
      icon: '🗓️',
      color: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300',
      analogy: 'The universal detective asking for any moment, day, or season!',
      sampleQ: 'Wann hast du Geburtstag?',
      sampleQEn: 'When is your birthday?',
      sampleA: 'Ich habe am 6. November Geburtstag. / Im Sommer. / Nächste Woche.',
      sampleAEn: 'My birthday is on November 6th. / In summer. / Next week.',
      prepositionsUsed: 'am (dates/days), im (months/seasons), heute, morgen',
      audioPrompt: 'Wann? Wann hast du Geburtstag? Ich habe am sechsten November Geburtstag.'
    },
    {
      id: 'bis-wann',
      num: 2,
      german: 'Bis wann?',
      english: 'Until when?',
      category: 'Deadline / Finish Line',
      icon: '🛑',
      color: 'from-rose-500 to-red-600',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300',
      analogy: 'The finish line or stop sign! Where does the time stop?',
      sampleQ: 'Bis wann schläfst du? / Bis wann bleibst du in Paris?',
      sampleQEn: 'Until when do you sleep? / Until when are you staying in Paris?',
      sampleA: 'Ich schlafe bis 12 Uhr. / Ich bleibe bis Sonntag in Paris.',
      sampleAEn: 'I sleep till 12:00. / I stay in Paris till Sunday.',
      prepositionsUsed: 'bis + clock / day / month / next week',
      audioPrompt: 'Bis wann? Bis wann schläfst du? Ich schlafe bis zwölf Uhr.'
    },
    {
      id: 'seit-wann',
      num: 3,
      german: 'Seit wann?',
      english: 'Since when?',
      category: 'Past Start ➔ Ongoing Now',
      icon: '⏳',
      color: 'from-amber-500 to-yellow-600',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300',
      analogy: 'Something started in the past and is STILL continuing right now!',
      sampleQ: 'Seit wann lernst du Deutsch?',
      sampleQEn: 'Since when / For how long have you been learning German?',
      sampleA: 'Ich lerne Deutsch seit 2 Jahren. / Seit letzter Woche.',
      sampleAEn: 'I have been learning German for 2 years. / Since last week.',
      prepositionsUsed: 'seit + Dativ (seit 2 Jahren, seit einem Monat)',
      audioPrompt: 'Seit wann? Seit wann lernst du Deutsch? Ich lerne Deutsch seit zwei Jahren.'
    },
    {
      id: 'ab-wann',
      num: 4,
      german: 'Ab wann?',
      english: 'From when? (Future Start)',
      category: 'Future Kickoff',
      icon: '🚀',
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300',
      analogy: 'The launchpad! When will the new event kick off in the future?',
      sampleQ: 'Ab wann machst du Urlaub?',
      sampleQEn: 'From when are you on holiday?',
      sampleA: 'Ab nächster Woche mache ich Urlaub. / Ab morgen.',
      sampleAEn: 'Starting next week I take vacation. / Starting tomorrow.',
      prepositionsUsed: 'ab + future time (ab nächster Woche, ab morgen)',
      audioPrompt: 'Ab wann? Ab wann machst du Urlaub? Ab nächster Woche mache ich Urlaub.'
    },
    {
      id: 'von-wann-bis-wann',
      num: 5,
      german: 'Von wann bis wann?',
      english: 'From when until when?',
      category: 'Time Span / Shift',
      icon: '↔️',
      color: 'from-purple-500 to-violet-600',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300',
      analogy: 'The complete bridge connecting the start point and the end point!',
      sampleQ: 'Von wann bis wann arbeitest du?',
      sampleQEn: 'From when to when do you work?',
      sampleA: 'Von Montag bis Freitag, von 8:30 bis 18 Uhr.',
      sampleAEn: 'From Monday to Friday, from 8:30 to 18:00.',
      prepositionsUsed: 'von [Start] bis [Ende]',
      audioPrompt: 'Von wann bis wann? Von wann bis wann arbeitest du? Ich arbeite von Montag bis Freitag von acht Uhr dreißig bis achtzehn Uhr.'
    },
    {
      id: 'um-wie-viel-uhr',
      num: 6,
      german: 'Um wie viel Uhr?',
      english: 'At what time?',
      category: 'Exact Clock Needle',
      icon: '🎯',
      color: 'from-cyan-500 to-blue-600',
      badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-300',
      analogy: 'Pinpoints the exact needle on the clock face! Always answered with "um"!',
      sampleQ: 'Um wie viel Uhr kommst du?',
      sampleQEn: 'At what time are you arriving?',
      sampleA: 'Ich komme um 21 Uhr.',
      sampleAEn: 'I am coming at 21:00 (9:00 p.m.).',
      prepositionsUsed: 'um + [Clock number] Uhr (um 6 Uhr, um 21 Uhr)',
      audioPrompt: 'Um wie viel Uhr? Um wie viel Uhr kommst du? Ich komme um einundzwanzig Uhr.'
    },
    {
      id: 'wie-spaet',
      num: 7,
      german: 'Wie spät? / Wie viel Uhr?',
      english: 'What time is it now?',
      category: 'Current Clock Time',
      icon: '⌚',
      color: 'from-fuchsia-500 to-pink-600',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
      analogy: 'Asking a passerby for the current time on their wristwatch!',
      sampleQ: 'Wie spät ist es jetzt? / Wie viel Uhr ist es?',
      sampleQEn: 'What time is it now?',
      sampleA: 'Es ist genau 11 Uhr. / Es ist kurz vor halb sechs.',
      sampleAEn: 'It is exactly 11:00. / It is shortly before 5:30.',
      prepositionsUsed: 'Es ist + [exact or modified time]',
      audioPrompt: 'Wie spät ist es jetzt? Wie viel Uhr ist es jetzt? Es ist genau elf Uhr.'
    },
    {
      id: 'wie-lange',
      num: 8,
      german: 'Wie lange?',
      english: 'How long? (Duration)',
      category: 'Duration / Verb dauern',
      icon: '⏱️',
      color: 'from-orange-500 to-amber-600',
      badgeBg: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300',
      analogy: 'Measures the stretch of time! Pairs famously with "dauern" (to take/last)!',
      sampleQ: 'Wie lange dauert der Film? / Wie lange bleibst du?',
      sampleQEn: 'How long does the film last? / How long are you staying?',
      sampleA: 'Der Film dauert 2 Stunden. / Ich bleibe 5 Tage.',
      sampleAEn: 'The movie lasts 2 hours. / I am staying for 5 days.',
      prepositionsUsed: '[Number] Minuten / Stunden / Tage / Wochen',
      audioPrompt: 'Wie lange? Wie lange dauert der Film? Der Film dauert zwei Stunden.'
    },
    {
      id: 'wie-oft',
      num: 9,
      german: 'Wie oft?',
      english: 'How often? (Frequency)',
      category: 'Frequency Ladder',
      icon: '🔄',
      color: 'from-lime-500 to-green-600',
      badgeBg: 'bg-lime-100 text-lime-800 border-lime-300 dark:bg-lime-900/40 dark:text-lime-300',
      analogy: 'Counts the repeats! Answer using the 100% to 0% frequency ladder!',
      sampleQ: 'Wie oft gehst du ins Kino?',
      sampleQEn: 'How often do you go to the cinema?',
      sampleA: 'Ich gehe manchmal ins Kino. / Jeden Tag. / Nie.',
      sampleAEn: 'I sometimes go to the cinema. / Every day. / Never.',
      prepositionsUsed: 'immer, meistens, oft, manchmal, selten, nie, ab und zu',
      audioPrompt: 'Wie oft? Wie oft gehst du ins Kino? Ich gehe manchmal ins Kino.'
    }
  ];

  const activeKeyObj = questionKeys.find(k => k.id === selectedKeyId) || questionKeys[0];

  // TAB 2: Frequency & Prepositions State
  const [selectedFreqPercent, setSelectedFreqPercent] = useState(60);

  const frequencyLadder = [
    { percent: 100, word: 'immer', en: 'always (100%)', example: 'Ich lerne immer Deutsch.', icon: '🌟' },
    { percent: 80, word: 'meistens', en: 'mostly / usually (80%)', example: 'Ich stehe meistens um 7 Uhr auf.', icon: '🌤️' },
    { percent: 60, word: 'oft', en: 'often (60%)', example: 'Wir gehen oft ins Kino.', icon: '🎬' },
    { percent: 40, word: 'manchmal', en: 'sometimes (40%)', example: 'Ich trinke manchmal Kaffee.', icon: '☕' },
    { percent: 15, word: 'selten', en: 'rarely / seldom (15%)', example: 'Er isst selten Fleisch.', icon: '🥗' },
    { percent: 0, word: 'nie', en: 'never (0%)', example: 'Ich rauche nie.', icon: '🚫' }
  ];

  const currentFreqObj = frequencyLadder.find(f => f.percent === selectedFreqPercent) || frequencyLadder[2];

  // TAB 3: Interactive Dialogue Simulator State
  const [selectedDialogueIdx, setSelectedDialogueIdx] = useState(0);

  const realLifeDialogues = [
    {
      title: '🎂 Birthday Inquiry',
      qKey: 'Wann?',
      qPerson: 'Lisa',
      qGerman: 'Wann hast du Geburtstag?',
      qEnglish: 'When is your birthday?',
      aPerson: 'Klaus',
      aGerman: 'Ich habe am 6. November Geburtstag. Und du?',
      aEnglish: 'My birthday is on November 6th. And you?',
      explanation: 'Dates use the preposition "am" (am 6. November = am sechsten November).'
    },
    {
      title: '🛑 Weekend Sleep Routine',
      qKey: 'Bis wann?',
      qPerson: 'Mama',
      qGerman: 'Bis wann schläfst du am Sonntag?',
      qEnglish: 'Until when do you sleep on Sunday?',
      aPerson: 'David',
      aGerman: 'Ich schlafe am Sonntag bis 12 Uhr!',
      aEnglish: 'I sleep on Sunday until 12 noon!',
      explanation: '"Bis" marks the exact cutoff limit or wake-up deadline.'
    },
    {
      title: '⏳ German Learning Timeline',
      qKey: 'Seit wann?',
      qPerson: 'Teacher Anna',
      qGerman: 'Seit wann lernst du Deutsch?',
      qEnglish: 'Since when have you been learning German?',
      aPerson: 'Samuel',
      aGerman: 'Ich lerne Deutsch seit 2 Jahren.',
      aEnglish: 'I have been learning German for 2 years (and I still do!).',
      explanation: '"Seit" means the action started 2 years ago and is continuing today.'
    },
    {
      title: '🚀 Vacation Starting Point',
      qKey: 'Ab wann?',
      qPerson: 'Colleague',
      qGerman: 'Ab wann machst du Urlaub?',
      qEnglish: 'Starting when are you on vacation?',
      aPerson: 'Maria',
      aGerman: 'Ab nächster Woche mache ich zwei Wochen Urlaub!',
      aEnglish: 'Starting next week I take two weeks vacation!',
      explanation: '"Ab" sets the future kickoff starting block.'
    },
    {
      title: '↔️ Daily Work Shift Span',
      qKey: 'Von wann bis wann?',
      qPerson: 'Boss',
      qGerman: 'Von wann bis wann arbeitest du?',
      qEnglish: 'From when until when do you work?',
      aPerson: 'Stefan',
      aGerman: 'Ich arbeite von Montag bis Freitag, von 8:30 bis 18 Uhr.',
      aEnglish: 'I work from Monday to Friday, from 8:30 to 18:00.',
      explanation: '"Von...bis..." spans the full schedule bridge from start to end.'
    },
    {
      title: '🎯 Party Arrival Needle',
      qKey: 'Um wie viel Uhr?',
      qPerson: 'Friend',
      qGerman: 'Um wie viel Uhr kommst du zur Party?',
      qEnglish: 'At what time are you coming to the party?',
      aPerson: 'Felix',
      aGerman: 'Ich komme genau um 21 Uhr.',
      aEnglish: 'I will arrive exactly at 21:00 (9:00 p.m.).',
      explanation: '"Um" is the only preposition for exact clock times.'
    },
    {
      title: '⌚ Street Time Check',
      qKey: 'Wie spät?',
      qPerson: 'Passerby',
      qGerman: 'Entschuldigung, wie spät ist es jetzt?',
      qEnglish: 'Excuse me, what time is it now?',
      aPerson: 'Local',
      aGerman: 'Es ist kurz vor halb sechs.',
      aEnglish: 'It is shortly before 5:30.',
      explanation: '"kurz vor" means just a few minutes before the designated time.'
    },
    {
      title: '⏱️ Cinema Duration Check',
      qKey: 'Wie lange?',
      qPerson: 'Tom',
      qGerman: 'Wie lange dauert der neue Film?',
      qEnglish: 'How long does the new movie last?',
      aPerson: 'Emma',
      aGerman: 'Der Film dauert genau 2 Stunden und 15 Minuten.',
      aEnglish: 'The film lasts exactly 2 hours and 15 minutes.',
      explanation: '"Wie lange" paired with verb "dauern" measures duration.'
    },
    {
      title: '🔄 Cinema Frequency Check',
      qKey: 'Wie oft?',
      qPerson: 'Sarah',
      qGerman: 'Wie oft gehst du eigentlich ins Kino?',
      qEnglish: 'How often do you actually go to the cinema?',
      aPerson: 'Alex',
      aGerman: 'Ich gehe ab und zu ins Kino, aber meistens schaue ich zu Hause Filme.',
      aEnglish: 'I go to the cinema now and then, but mostly I watch movies at home.',
      explanation: '"ab und zu" = now and then, "meistens" = usually (80%).'
    }
  ];

  const currentDialogue = realLifeDialogues[selectedDialogueIdx];

  const playFullDialogue = () => {
    playChime('pop');
    speakGerman(`${currentDialogue.qGerman} ... ${currentDialogue.aGerman}`, isSlowMode);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600 text-white p-6 md:p-8 rounded-3xl shadow-xl border-4 border-indigo-400/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
              <Clock className="w-4 h-4 text-cyan-200" />
              Lesson 33 Interactive Studio • Zeit-Fragewörter
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">
              The 9 German Time Keys & Prepositions ⏰
            </h1>
            <p className="text-indigo-100 text-xs md:text-sm max-w-2xl leading-relaxed">
              Master every question relating to time: <strong>Wann</strong> (When), <strong>Bis wann</strong> (Until when), 
              <strong>Seit wann</strong> (Since when), <strong>Ab wann</strong> (Future kickoff), <strong>Von wann bis wann</strong> (Shift span), 
              <strong>Um wie viel Uhr / Wie spät</strong> (Clock needles), <strong>Wie lange</strong> (Duration), and <strong>Wie oft</strong> (Frequency scale)!
            </p>
          </div>
          <button
            onClick={() => {
              playChime('click');
              speakGerman("Zeit-Fragewörter. Wann? Bis wann? Seit wann? Ab wann? Von wann bis wann? Um wie viel Uhr? Wie spät ist es? Wie lange? Wie oft?", isSlowMode);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-white text-indigo-700 rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-50 active:scale-95 transition shrink-0"
          >
            <Volume2 className="w-5 h-5 text-indigo-600" />
            Hear All 9 Keys
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={() => { playChime('click'); setActiveTab('soundboard'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'soundboard'
                ? 'bg-white text-indigo-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            🧭 The 9 Time Keys Soundboard
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('prepositions'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'prepositions'
                ? 'bg-white text-indigo-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            📊 Prepositions Trio & Frequency Scale
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('dialogues'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'dialogues'
                ? 'bg-white text-indigo-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            💬 Real-Life Dialogue Simulator
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: The 9 Time Question Keys Soundboard */}
      {/* ========================================================================= */}
      {activeTab === 'soundboard' && (
        <div className="space-y-6">
          {/* Key Selection Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3">
            {questionKeys.map(k => {
              const isSelected = k.id === selectedKeyId;
              return (
                <button
                  key={k.id}
                  onClick={() => {
                    playChime('click');
                    setSelectedKeyId(k.id);
                    speakGerman(k.audioPrompt, isSlowMode);
                  }}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-1 relative overflow-hidden ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg scale-105 ring-2 ring-indigo-300'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border-stone-200 dark:border-stone-700 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <span className="text-xl md:text-2xl">{k.icon}</span>
                  <div className="font-black text-xs md:text-sm tracking-tight">{k.german}</div>
                  <div className={`text-[10px] font-bold ${isSelected ? 'text-indigo-200' : 'text-stone-400 dark:text-stone-500'}`}>
                    {k.english}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Key Deep Dive Card */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-indigo-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="text-4xl p-3 bg-indigo-50 dark:bg-stone-700 rounded-2xl border border-indigo-100 dark:border-stone-600">
                  {activeKeyObj.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                      Key #{activeKeyObj.num} • {activeKeyObj.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white mt-1">
                    {activeKeyObj.german} <span className="text-lg text-stone-400 font-normal">({activeKeyObj.english})</span>
                  </h2>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime('pop');
                  speakGerman(activeKeyObj.audioPrompt, isSlowMode);
                }}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-black text-sm shadow-md hover:from-indigo-700 hover:to-blue-700 active:scale-95 transition"
              >
                <Volume2 className="w-5 h-5" />
                Listen to Key #{activeKeyObj.num}
              </button>
            </div>

            {/* Analogy Box */}
            <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs md:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed font-medium">
                <strong>Everyday Life Secret:</strong> {activeKeyObj.analogy}
              </div>
            </div>

            {/* Q&A Interactive Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question Box */}
              <div className="p-5 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    The Question (Die Frage)
                  </span>
                  <button
                    onClick={() => speakGerman(activeKeyObj.sampleQ, isSlowMode)}
                    className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 text-indigo-700 dark:text-indigo-300 rounded-xl transition"
                    title="Hear Question"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-lg md:text-xl font-black text-indigo-700 dark:text-indigo-400">
                  {activeKeyObj.sampleQ}
                </div>
                <div className="text-xs md:text-sm text-stone-500 dark:text-stone-400 italic">
                  "{activeKeyObj.sampleQEn}"
                </div>
              </div>

              {/* Answer Box */}
              <div className="p-5 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    The Natural Answer (Die Antwort)
                  </span>
                  <button
                    onClick={() => speakGerman(activeKeyObj.sampleA, isSlowMode)}
                    className="p-1.5 bg-emerald-100 dark:bg-emerald-900/50 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-300 rounded-xl transition"
                    title="Hear Answer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-lg md:text-xl font-black text-emerald-700 dark:text-emerald-400">
                  {activeKeyObj.sampleA}
                </div>
                <div className="text-xs md:text-sm text-stone-500 dark:text-stone-400 italic">
                  "{activeKeyObj.sampleAEn}"
                </div>
              </div>
            </div>

            {/* Preposition Rules Attachment */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                    Typical Matching Prepositions / Structure
                  </div>
                  <div className="text-xs md:text-sm font-bold text-stone-800 dark:text-stone-200">
                    {activeKeyObj.prepositionsUsed}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  setActiveTab('prepositions');
                }}
                className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 dark:bg-amber-800 dark:hover:bg-amber-700 text-amber-900 dark:text-amber-100 rounded-xl text-xs font-bold transition shrink-0"
              >
                View Preposition Hub ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: Prepositions Trio & Frequency Scale */}
      {/* ========================================================================= */}
      {activeTab === 'prepositions' && (
        <div className="space-y-6">
          {/* Preposition Matrix: Slide 8 & 14 & 18 & 22 */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-indigo-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-black uppercase">
                <Layers className="w-3.5 h-3.5" />
                Slides 8, 14, 18, 22 • The Core Preposition Trio
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
                um • am • im & Time Connectors
              </h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
                Tap each card to hear correct native pronunciation and train your ear to automatically pick the right preposition!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* UM Card */}
              <div 
                onClick={() => {
                  playChime('click');
                  speakGerman("um. um sechs Uhr. um einundzwanzig Uhr. um wie viel Uhr?", isSlowMode);
                }}
                className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/40 rounded-2xl border-2 border-cyan-300 dark:border-cyan-800 hover:scale-[1.02] transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🎯</span>
                  <span className="px-2.5 py-0.5 bg-cyan-200 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 text-xs font-black rounded-full uppercase">
                    Exact Clock Time
                  </span>
                </div>
                <div className="text-2xl font-black text-cyan-800 dark:text-cyan-300">
                  um <span className="text-base font-bold text-cyan-600">(at ...)</span>
                </div>
                <div className="space-y-1 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                  <div>• <strong>um 6 Uhr</strong> (at 6:00)</div>
                  <div>• <strong>um 21 Uhr</strong> (at 21:00 / 9 pm)</div>
                  <div>• <strong>um wie viel Uhr?</strong> (at what time?)</div>
                </div>
                <div className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 pt-2 border-t border-cyan-200 dark:border-cyan-800">
                  Golden Rule: Only for clock needles!
                </div>
              </div>

              {/* AM Card */}
              <div 
                onClick={() => {
                  playChime('click');
                  speakGerman("am. am Abend. am Donnerstag. am sechsten November.", isSlowMode);
                }}
                className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 hover:scale-[1.02] transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🌅</span>
                  <span className="px-2.5 py-0.5 bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100 text-xs font-black rounded-full uppercase">
                    Days & Day-Parts
                  </span>
                </div>
                <div className="text-2xl font-black text-indigo-800 dark:text-indigo-300">
                  am <span className="text-base font-bold text-indigo-600">(on / in the ...)</span>
                </div>
                <div className="space-y-1 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                  <div>• <strong>am Abend</strong> (in the evening)</div>
                  <div>• <strong>am Donnerstag</strong> (on Thursday)</div>
                  <div>• <strong>am 6. November</strong> (on Nov 6th)</div>
                </div>
                <div className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 pt-2 border-t border-indigo-200 dark:border-indigo-800">
                  Golden Rule: Days, dates, mornings/evenings!
                </div>
              </div>

              {/* IM Card */}
              <div 
                onClick={() => {
                  playChime('click');
                  speakGerman("im. im Sommer. im Winter. im August. im November.", isSlowMode);
                }}
                className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-2xl border-2 border-amber-300 dark:border-amber-800 hover:scale-[1.02] transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🍂</span>
                  <span className="px-2.5 py-0.5 bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-xs font-black rounded-full uppercase">
                    Months & Seasons
                  </span>
                </div>
                <div className="text-2xl font-black text-amber-800 dark:text-amber-300">
                  im <span className="text-base font-bold text-amber-600">(in ...)</span>
                </div>
                <div className="space-y-1 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                  <div>• <strong>im August</strong> (in August)</div>
                  <div>• <strong>im Sommer</strong> (in summer)</div>
                  <div>• <strong>im Winter</strong> (in winter)</div>
                </div>
                <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 pt-2 border-t border-amber-200 dark:border-amber-800">
                  Golden Rule: Big chunks (Months & Seasons)!
                </div>
              </div>

              {/* SEIT Card */}
              <div 
                onClick={() => {
                  playChime('click');
                  speakGerman("seit. seit zwei Jahren. seit letzter Woche. seit gestern.", isSlowMode);
                }}
                className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 hover:scale-[1.02] transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">⏳</span>
                  <span className="px-2.5 py-0.5 bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-xs font-black rounded-full uppercase">
                    Past ➔ Ongoing
                  </span>
                </div>
                <div className="text-2xl font-black text-emerald-800 dark:text-emerald-300">
                  seit <span className="text-base font-bold text-emerald-600">(since / for ...)</span>
                </div>
                <div className="space-y-1 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                  <div>• <strong>seit 2 Jahren</strong> (for 2 years)</div>
                  <div>• <strong>seit letzter Woche</strong> (since last week)</div>
                  <div>• <strong>seit gestern</strong> (since yesterday)</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 pt-2 border-t border-emerald-200 dark:border-emerald-800">
                  Golden Rule: Started before + still happening!
                </div>
              </div>

              {/* AB Card */}
              <div 
                onClick={() => {
                  playChime('click');
                  speakGerman("ab. ab nächster Woche. ab morgen. ab sechs Uhr.", isSlowMode);
                }}
                className="p-5 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 rounded-2xl border-2 border-rose-300 dark:border-rose-800 hover:scale-[1.02] transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🚀</span>
                  <span className="px-2.5 py-0.5 bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100 text-xs font-black rounded-full uppercase">
                    Future Starting Block
                  </span>
                </div>
                <div className="text-2xl font-black text-rose-800 dark:text-rose-300">
                  ab <span className="text-base font-bold text-rose-600">(from / starting ...)</span>
                </div>
                <div className="space-y-1 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                  <div>• <strong>ab nächster Woche</strong> (from next week)</div>
                  <div>• <strong>ab morgen</strong> (starting tomorrow)</div>
                  <div>• <strong>ab 6 Uhr</strong> (starting at 6)</div>
                </div>
                <div className="text-[11px] font-bold text-rose-700 dark:text-rose-400 pt-2 border-t border-rose-200 dark:border-rose-800">
                  Golden Rule: Kickoff point in the future!
                </div>
              </div>

              {/* VON...BIS Card */}
              <div 
                onClick={() => {
                  playChime('click');
                  speakGerman("von ... bis ... von Montag bis Freitag. von acht Uhr dreißig bis achtzehn Uhr.", isSlowMode);
                }}
                className="p-5 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/40 rounded-2xl border-2 border-violet-300 dark:border-violet-800 hover:scale-[1.02] transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">↔️</span>
                  <span className="px-2.5 py-0.5 bg-violet-200 dark:bg-violet-800 text-violet-900 dark:text-violet-100 text-xs font-black rounded-full uppercase">
                    Time Span Bridge
                  </span>
                </div>
                <div className="text-2xl font-black text-violet-800 dark:text-violet-300">
                  von ... bis ... <span className="text-base font-bold text-violet-600">(from ... till ...)</span>
                </div>
                <div className="space-y-1 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                  <div>• <strong>von Montag bis Freitag</strong></div>
                  <div>• <strong>von 8:30 bis 18 Uhr</strong></div>
                  <div>• <strong>von Sommer bis Winter</strong></div>
                </div>
                <div className="text-[11px] font-bold text-violet-700 dark:text-violet-400 pt-2 border-t border-violet-200 dark:border-violet-800">
                  Golden Rule: Complete start-to-finish range!
                </div>
              </div>
            </div>
          </div>

          {/* Frequency Ladder (Slide 42) */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-indigo-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-100 dark:bg-lime-900/50 text-lime-800 dark:text-lime-300 rounded-full text-xs font-black uppercase">
                <Repeat className="w-3.5 h-3.5" />
                Slide 42 • Die Häufigkeits-Skala (The Frequency Ladder)
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
                How Often? From 100% (immer) to 0% (nie)
              </h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
                Use these words when answering <strong>"Wie oft?"</strong> (How often?). Click on any rung to test!
              </p>
            </div>

            {/* Interactive Ladder Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {frequencyLadder.map(f => {
                const isSelected = f.percent === selectedFreqPercent;
                return (
                  <button
                    key={f.percent}
                    onClick={() => {
                      playChime('click');
                      setSelectedFreqPercent(f.percent);
                      speakGerman(`${f.word}. ${f.example}`, isSlowMode);
                    }}
                    className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-b from-lime-500 to-green-600 text-white border-lime-300 shadow-lg scale-105 ring-2 ring-lime-300'
                        : 'bg-stone-50 dark:bg-stone-900/60 text-stone-800 dark:text-stone-100 border-stone-200 dark:border-stone-700 hover:border-lime-400'
                    }`}
                  >
                    <span className="text-2xl">{f.icon}</span>
                    <div className="font-black text-sm md:text-base">{f.word}</div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                    }`}>
                      {f.percent}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Frequency Deep Dive */}
            <div className="p-5 bg-gradient-to-r from-lime-50 to-emerald-50 dark:from-lime-950/40 dark:to-emerald-950/40 rounded-2xl border-2 border-lime-300 dark:border-lime-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-black uppercase tracking-wider text-lime-800 dark:text-lime-400">
                  {currentFreqObj.percent}% Frequency • {currentFreqObj.en}
                </div>
                <div className="text-xl md:text-2xl font-black text-stone-900 dark:text-white">
                  {currentFreqObj.example}
                </div>
              </div>
              <button
                onClick={() => {
                  playChime('pop');
                  speakGerman(currentFreqObj.example, isSlowMode);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-lime-600 hover:bg-lime-700 text-white rounded-xl font-black text-xs shadow-md shrink-0 transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                Hear Sentence
              </button>
            </div>

            {/* Bonus Idiom Rungs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div 
                onClick={() => speakGerman("ab und zu. Ich gehe ab und zu ins Kino.", isSlowMode)}
                className="p-4 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-lime-300 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-black text-sm text-stone-900 dark:text-white">ab und zu</div>
                  <div className="text-xs text-stone-500">now and then / occasionally</div>
                </div>
                <Volume2 className="w-4 h-4 text-lime-600 shrink-0" />
              </div>

              <div 
                onClick={() => speakGerman("jeden Tag. Ich lerne jeden Tag Deutsch.", isSlowMode)}
                className="p-4 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-lime-300 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-black text-sm text-stone-900 dark:text-white">jeden Tag / jeden Montag</div>
                  <div className="text-xs text-stone-500">every day / every Monday</div>
                </div>
                <Volume2 className="w-4 h-4 text-lime-600 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: Real-Life Dialogue Simulator */}
      {/* ========================================================================= */}
      {activeTab === 'dialogues' && (
        <div className="space-y-6">
          {/* Dialogue Picker Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {realLifeDialogues.map((d, idx) => {
              const isSelected = idx === selectedDialogueIdx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    playChime('click');
                    setSelectedDialogueIdx(idx);
                  }}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-indigo-50'
                  }`}
                >
                  <span>{d.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Dialogue Chat View */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-indigo-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-700">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                  Time Key: {currentDialogue.qKey}
                </span>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                  {currentDialogue.title}
                </h2>
              </div>
              <button
                onClick={playFullDialogue}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-black text-xs md:text-sm shadow-md hover:from-indigo-700 hover:to-blue-700 active:scale-95 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                Play Full Dialogue
              </button>
            </div>

            {/* Chat Bubble Simulation */}
            <div className="space-y-4 max-w-2xl mx-auto py-4">
              {/* Question Bubble */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  {currentDialogue.qPerson[0]}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="text-xs font-bold text-stone-400">{currentDialogue.qPerson}</div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl rounded-tl-none border border-indigo-200 dark:border-indigo-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-base md:text-lg font-black text-indigo-900 dark:text-indigo-100">
                        {currentDialogue.qGerman}
                      </div>
                      <button
                        onClick={() => speakGerman(currentDialogue.qGerman, isSlowMode)}
                        className="p-1 hover:bg-indigo-200 rounded-lg transition"
                      >
                        <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </button>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                      "{currentDialogue.qEnglish}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Answer Bubble */}
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 space-y-1 text-right">
                  <div className="text-xs font-bold text-stone-400">{currentDialogue.aPerson}</div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl rounded-tr-none border border-emerald-200 dark:border-emerald-800 space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <div className="text-base md:text-lg font-black text-emerald-900 dark:text-emerald-100">
                        {currentDialogue.aGerman}
                      </div>
                      <button
                        onClick={() => speakGerman(currentDialogue.aGerman, isSlowMode)}
                        className="p-1 hover:bg-emerald-200 rounded-lg transition"
                      >
                        <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </button>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                      "{currentDialogue.aEnglish}"
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  {currentDialogue.aPerson[0]}
                </div>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="p-4 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
              <div className="text-xs md:text-sm text-stone-700 dark:text-stone-300 font-medium">
                <strong>Grammar Insight:</strong> {currentDialogue.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
