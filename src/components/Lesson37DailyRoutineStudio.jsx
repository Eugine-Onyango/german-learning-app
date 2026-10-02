import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson37DailyRoutineStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'inversion' | 'timeblocks'
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState(0);
  const [inversionStarter, setInversionStarter] = useState('Um 7 Uhr');
  const [inversionActivity, setInversionActivity] = useState('dusche ich und ziehe mich an');
  const [timeBlockFilter, setTimeBlockFilter] = useState('morgen');

  const TIMELINE_EVENTS = [
    {
      time: '06:00',
      timeLabel: 'Um 6 Uhr',
      title: 'Der Wecker klingelt',
      titleEn: 'The alarm clock rings',
      german: 'Der Wecker klingelt um 6 Uhr.',
      english: 'The alarm clock goes off at 6 a.m.',
      icon: '⏰',
      category: 'morning',
      verb: 'klingeln (rings)',
      separable: null,
      tip: 'Der Wecker (alarm clock) sounds off to start the German day!'
    },
    {
      time: '06:30',
      timeLabel: 'Um halb sieben',
      title: 'Aufstehen',
      titleEn: 'Getting out of bed',
      german: 'Ich stehe um halb sieben auf.',
      english: 'I get up at 6:30 a.m.',
      icon: '🛏️',
      category: 'morning',
      verb: 'aufstehen',
      separable: 'stehe ... auf',
      tip: 'Remember: "halb sieben" is halfway to 7 = 6:30! "aufstehen" splits into "stehe ... auf".'
    },
    {
      time: '06:40',
      timeLabel: 'Danach',
      title: 'Badezimmer & Zähne putzen',
      titleEn: 'Bathroom & brushing teeth',
      german: 'Ich gehe ins Badezimmer und putze mir die Zähne.',
      english: 'I go to the bathroom and brush my teeth.',
      icon: '🪥',
      category: 'morning',
      verb: 'Zähne putzen',
      separable: null,
      tip: 'German uses the Dative pronoun "mir": "Ich putze mir die Zähne" (I brush to myself the teeth).'
    },
    {
      time: '06:45',
      timeLabel: 'Dann',
      title: 'Morgen-Jogging',
      titleEn: 'Morning jog',
      german: 'Dann gehe ich eine halbe Stunde joggen.',
      english: 'Then I go jogging for half an hour.',
      icon: '🏃‍♂️',
      category: 'morning',
      verb: 'joggen gehen',
      separable: null,
      tip: 'Inversion in action! "Dann" sits in Position 1, so the verb "gehe" takes Position 2 and "ich" flips to Position 3!'
    },
    {
      time: '07:00',
      timeLabel: 'Um 7 Uhr',
      title: 'Duschen & Anziehen',
      titleEn: 'Showering & dressing up',
      german: 'Um 7 Uhr dusche ich und ziehe mich an.',
      english: 'At 7 a.m. I take a shower and get dressed.',
      icon: '🚿',
      category: 'morning',
      verb: 'sich anziehen',
      separable: 'ziehe mich an',
      tip: '"anziehen" is separable: "ziehe mich an" (put on clothes / dress myself).'
    },
    {
      time: '07:15',
      timeLabel: 'Danach',
      title: 'Frühstück & Zeitung',
      titleEn: 'Breakfast & Newspaper',
      german: 'Ich bereite das Frühstück vor, frühstücke und lese die Zeitung.',
      english: 'I prepare breakfast, eat breakfast, and read the newspaper.',
      icon: '🥐',
      category: 'morning',
      verb: 'vorbereiten & lesen',
      separable: 'bereite ... vor',
      tip: '"vorbereiten" splits into "bereite ... vor". "lesen" has an irregular vowel shift for du/er (du liest / er liest).'
    },
    {
      time: '07:45',
      timeLabel: 'Um 7.45 Uhr',
      title: 'Weg zur Arbeit / Uni',
      titleEn: 'Commute to work / university',
      german: 'Um 7.45 Uhr fahre ich mit dem Bus zur Arbeit.',
      english: 'At 7:45 a.m. I travel by bus to work.',
      icon: '🚌',
      category: 'commute',
      verb: 'fahren mit + Dativ',
      separable: null,
      tip: 'The preposition "mit" takes Dative: "mit dem Bus", "mit der Bahn", "mit dem Auto"!'
    },
    {
      time: '08:30',
      timeLabel: 'Um 8.30 Uhr',
      title: 'Arbeit / Unterricht fängt an',
      titleEn: 'Work & Class kickoff',
      german: 'Der Unterricht fängt um 8.30 Uhr an.',
      english: 'The class begins at 8:30 a.m.',
      icon: '💼',
      category: 'work',
      verb: 'anfangen',
      separable: 'fängt ... an',
      tip: '"anfangen" splits into "fängt ... an" with vowel change: er fängt an!'
    },
    {
      time: '10:30',
      timeLabel: 'Danach',
      title: 'Kleine Pause & Snack',
      titleEn: 'Small break & apple snack',
      german: 'Danach mache ich eine kleine Pause und esse einen Apfel.',
      english: 'After that I take a small break and eat an apple.',
      icon: '🍎',
      category: 'work',
      verb: 'Pause machen & essen',
      separable: null,
      tip: '"einen Apfel" is masculine Accusative (der Apfel ➔ einen Apfel).'
    },
    {
      time: '13:00',
      timeLabel: 'Um 13 Uhr',
      title: 'Mittagspause & Mittagessen',
      titleEn: 'Lunch break & Lunch',
      german: 'Um 13 Uhr ist Mittagspause. Dann esse ich zu Mittag.',
      english: 'At 1 p.m. is lunch break. Then I eat lunch.',
      icon: '🥗',
      category: 'midday',
      verb: 'zu Mittag essen',
      separable: null,
      tip: '"zu Mittag essen" is the standard German phrase for having lunch!'
    },
    {
      time: '14:00',
      timeLabel: 'Um 14 Uhr',
      title: 'Zweite Runde Arbeit',
      titleEn: 'Afternoon work session',
      german: 'Dann beginne ich wieder um 14 Uhr mit der Arbeit.',
      english: 'Then I begin again with work at 2 p.m.',
      icon: '💻',
      category: 'afternoon',
      verb: 'beginnen mit + Dativ',
      separable: null,
      tip: 'Note: "beginnen" is non-separable (prefix be- never splits).'
    },
    {
      time: '16:00',
      timeLabel: 'Um 16 Uhr',
      title: 'Kaffeepause & Feierabend',
      titleEn: 'Coffee break & Drive home',
      german: 'Um 16 Uhr mache ich eine Kaffeepause und fahre nach Hause zurück.',
      english: 'At 4 p.m. I take a coffee break and drive back home.',
      icon: '☕',
      category: 'afternoon',
      verb: 'zurückfahren',
      separable: 'fahre ... zurück',
      tip: '"zurückfahren" (to drive back) separates into "fahre ... zurück".'
    },
    {
      time: '18:00',
      timeLabel: 'Um 18 Uhr',
      title: 'Freunde treffen',
      titleEn: 'Meeting friends',
      german: 'Um 18 Uhr treffe ich meine Freunde.',
      english: 'At 6 p.m. I meet my friends.',
      icon: '👫',
      category: 'evening',
      verb: 'treffen',
      separable: null,
      tip: '"treffen" has an irregular vowel flip: du triffst, er trifft!'
    },
    {
      time: '19:30',
      timeLabel: 'Um 19.30 Uhr',
      title: 'Abendessen zubereiten',
      titleEn: 'Preparing & Eating dinner',
      german: 'Um 19 Uhr bereite ich das Abendessen zu und esse zu Abend.',
      english: 'At 7 p.m. I prepare dinner and eat dinner.',
      icon: '🍲',
      category: 'evening',
      verb: 'zubereiten & zu Abend essen',
      separable: 'bereite ... zu',
      tip: '"zubereiten" (to prepare a meal) splits into "bereite ... zu".'
    },
    {
      time: '22:30',
      timeLabel: 'So um halb elf',
      title: 'Ins Bett gehen & Einschlafen',
      titleEn: 'Going to bed & Falling asleep',
      german: 'So um halb elf gehe ich ins Bett und schlafe ein.',
      english: 'Around 10:30 p.m. I go to bed and fall asleep.',
      icon: '🌙',
      category: 'night',
      verb: 'einschlafen',
      separable: 'schlafe ... ein',
      tip: '"einschlafen" (to drift off to sleep) separates into "schlafe ... ein".'
    }
  ];

  const currentEvent = TIMELINE_EVENTS[selectedTimelineIdx];

  const TIME_BLOCKS = {
    morgen: {
      title: '🌅 Der Morgen (Morning - 06:00 to 11:00)',
      items: [
        { de: 'Ich stehe um 6 Uhr auf.', en: 'I get up at 6 a.m.', audio: 'Ich stehe um 6 Uhr auf.' },
        { de: 'Ich wache um 6 Uhr auf.', en: 'I wake up at 6 a.m.', audio: 'Ich wache um 6 Uhr auf.' },
        { de: 'Ich gehe ins Bad und putze mir die Zähne.', en: 'I go to the bathroom and brush my teeth.', audio: 'Ich gehe ins Bad und putze mir die Zähne.' },
        { de: 'Ich wasche mich und dusche.', en: 'I wash myself and shower.', audio: 'Ich wasche mich und dusche.' },
        { de: 'Ich ziehe mich an.', en: 'I get dressed.', audio: 'Ich ziehe mich an.' },
        { de: 'Dann gehe ich joggen.', en: 'Then I go jogging.', audio: 'Dann gehe ich joggen.' },
        { de: 'Ich mache Yoga.', en: 'I do yoga.', audio: 'Ich mache Yoga.' },
        { de: 'Ich frühstücke und trinke einen Kaffee.', en: 'I eat breakfast and drink a coffee.', audio: 'Ich frühstücke und trinke einen Kaffee.' },
        { de: 'Ich trinke einen Saft oder Tee.', en: 'I drink a juice or tea.', audio: 'Ich trinke einen Saft oder Tee.' }
      ]
    },
    mittag: {
      title: '☀️ Der Mittag & Nachmittag (Midday & Afternoon - 12:00 to 17:00)',
      items: [
        { de: 'Um 12 Uhr lerne und arbeite ich.', en: 'At 12 o\'clock I study and work.', audio: 'Um 12 Uhr lerne und arbeite ich.' },
        { de: 'Um 13 Uhr esse ich zu Mittag.', en: 'At 1 p.m. I eat lunch.', audio: 'Um 13 Uhr esse ich zu Mittag.' },
        { de: 'Ich mache eine Präsentation.', en: 'I give a presentation.', audio: 'Ich mache eine Präsentation.' },
        { de: 'Ich rufe Freunde oder Kunden an.', en: 'I call friends or clients.', audio: 'Ich rufe Freunde oder Kunden an.' },
        { de: 'Ich schreibe viele E-Mails.', en: 'I write many emails.', audio: 'Ich schreibe viele E-Mails.' },
        { de: 'Ich habe einen wichtigen Termin.', en: 'I have an important appointment.', audio: 'Ich habe einen wichtigen Termin.' },
        { de: 'Um 16 Uhr mache ich eine Kaffeepause.', en: 'At 4 p.m. I take a coffee break.', audio: 'Um 16 Uhr mache ich eine Kaffeepause.' },
        { de: 'Um 16 Uhr fahre ich nach Hause zurück.', en: 'At 4 p.m. I drive back home.', audio: 'Um 16 Uhr fahre ich nach Hause zurück.' }
      ]
    },
    abend: {
      title: '🌆 Der Abend (Evening - 18:00 to 21:00)',
      items: [
        { de: 'Um 18 Uhr treffe ich meine Freunde.', en: 'At 6 p.m. I meet my friends.', audio: 'Um 18 Uhr treffe ich meine Freunde.' },
        { de: 'Ich gehe ins Kino oder treibe Sport.', en: 'I go to the cinema or do sports.', audio: 'Ich gehe ins Kino oder treibe Sport.' },
        { de: 'Ich spiele Fußball.', en: 'I play football/soccer.', audio: 'Ich spiele Fußball.' },
        { de: 'Ich gehe im Supermarkt einkaufen.', en: 'I go shopping at the supermarket.', audio: 'Ich gehe im Supermarkt einkaufen.' },
        { de: 'Um 19 Uhr bereite ich das Abendessen zu.', en: 'At 7 p.m. I prepare dinner.', audio: 'Um 19 Uhr bereite ich das Abendessen zu.' },
        { de: 'Um 20 Uhr esse ich zu Abend.', en: 'At 8 p.m. I eat dinner.', audio: 'Um 20 Uhr esse ich zu Abend.' }
      ]
    },
    nacht: {
      title: '🌙 Die Nacht (Night - 21:30 to 06:00)',
      items: [
        { de: 'Danach lese ich ein Buch.', en: 'After that I read a book.', audio: 'Danach lese ich ein Buch.' },
        { de: 'Danach sehe ich fern.', en: 'After that I watch TV.', audio: 'Danach sehe ich fern.' },
        { de: 'Ich beantworte meine letzten E-Mails.', en: 'I answer my final emails.', audio: 'Ich beantworte meine letzten E-Mails.' },
        { de: 'Ich trinke ein Glas Wasser oder Tee.', en: 'I drink a glass of water or tea.', audio: 'Ich trinke ein Glas Wasser oder Tee.' },
        { de: 'Ich ziehe mich aus.', en: 'I undress / change into pajamas.', audio: 'Ich ziehe mich aus.' },
        { de: 'So um halb elf gehe ich ins Bett.', en: 'Around 10:30 p.m. I go to bed.', audio: 'So um halb elf gehe ich ins Bett.' },
        { de: 'Ich schlafe ein und träume schön.', en: 'I fall asleep and dream sweetly.', audio: 'Ich schlafe ein und träume schön.' }
      ]
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-amber-500/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/50 backdrop-blur rounded-full text-xs font-bold text-amber-200 uppercase tracking-widest border border-amber-400/30">
              <span>🌅 Slide 1–33 Master Studio</span>
              <span>•</span>
              <span>der Tagesablauf</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Full Day in German (Daily Routine)
            </h1>
            <p className="text-amber-100 text-sm sm:text-base max-w-xl">
              From the morning alarm clock (*Der Wecker klingelt*) to sweet dreams (*schlafe ein*). Master daily activities, time connectors, and the golden <span className="text-amber-300 font-bold">Inversion Rule</span>!
            </p>
          </div>

          <button
            onClick={() => speakGerman('Der Tagesablauf: Der Wecker klingelt um 6 Uhr. Ich stehe um halb sieben auf. Um 7 Uhr dusche ich und ziehe mich an. Um 13 Uhr esse ich zu Mittag. Und um halb elf gehe ich ins Bett und schlafe ein.', isSlowMode)}
            className="flex items-center gap-3 px-6 py-4 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black rounded-2xl shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
          >
            <span className="text-2xl">🔊</span>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-amber-900">Audio Guide</div>
              <div className="text-sm font-bold">Listen to Full Day</div>
            </div>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-amber-600/50">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                : 'bg-amber-950/50 hover:bg-amber-900 text-amber-200 border border-amber-700/50'
            }`}
          >
            <span>🌅</span>
            <span>1. 24-Hour Timeline Journey</span>
          </button>
          <button
            onClick={() => setActiveTab('inversion')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'inversion'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                : 'bg-amber-950/50 hover:bg-amber-900 text-amber-200 border border-amber-700/50'
            }`}
          >
            <span>🔄</span>
            <span>2. The Golden Inversion Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('timeblocks')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'timeblocks'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                : 'bg-amber-950/50 hover:bg-amber-900 text-amber-200 border border-amber-700/50'
            }`}
          >
            <span>📋</span>
            <span>3. 4 Time-Blocks Matrix</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 24-Hour Timeline Journey */}
      {activeTab === 'timeline' && (
        <div className="space-y-8">
          {/* Active Highlight Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-amber-400 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex items-center gap-4">
                <span className="text-5xl p-4 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">{currentEvent.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
                      {currentEvent.time} • {currentEvent.timeLabel}
                    </span>
                    {currentEvent.separable && (
                      <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-[10px] font-bold">
                        🚀 Separable: {currentEvent.separable}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                    {currentEvent.title}
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm">{currentEvent.titleEn} • {currentEvent.verb}</p>
                </div>
              </div>

              <button
                onClick={() => speakGerman(currentEvent.german, isSlowMode)}
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>🔊</span> Listen to Sentence
              </button>
            </div>

            {/* Sentence Spotlight */}
            <div className="p-6 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-dashed border-amber-300 space-y-2 text-center">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-widest">Spoken German Sentence</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                "{currentEvent.german}"
              </div>
              <div className="text-stone-600 text-sm font-medium italic">
                {currentEvent.english}
              </div>
            </div>

            {/* Layman Tip */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-700 flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <strong className="text-amber-900">Everyday German Secret:</strong> {currentEvent.tip}
              </div>
            </div>
          </div>

          {/* Horizontal Timeline Scroll Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider">
                Select Any Time Slot (15 Routine Moments):
              </h3>
              <span className="text-xs text-stone-500">
                {selectedTimelineIdx + 1} of {TIMELINE_EVENTS.length}
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {TIMELINE_EVENTS.map((ev, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTimelineIdx(idx);
                    speakGerman(ev.german, isSlowMode);
                  }}
                  className={`flex-shrink-0 p-3.5 rounded-2xl border-2 transition-all text-center cursor-pointer min-w-[120px] ${
                    selectedTimelineIdx === idx
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-105'
                      : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{ev.icon}</div>
                  <div className="text-xs font-black">{ev.time}</div>
                  <div className={`text-[10px] truncate max-w-[100px] ${selectedTimelineIdx === idx ? 'text-amber-100' : 'text-stone-500'}`}>
                    {ev.timeLabel}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: The Golden Inversion Engine */}
      {activeTab === 'inversion' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
              Slides 30–33: The Position 2 Anchor
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              The Golden Inversion Rule (Satz-Inversion)
            </h2>
            <p className="text-stone-600 text-sm">
              In German, the verb is the unshakeable King at <strong className="text-amber-800">Position 2</strong>. If you place a time phrase or connector in Position 1, <strong className="text-teal-700">"ich" (I)</strong> flips to <strong className="text-teal-700">Position 3</strong> right behind the verb!
            </p>
          </div>

          {/* Interactive Inversion Builder */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1: Pick Starter */}
              <div className="space-y-3 p-5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-xs font-black text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  <span>Pick Position 1 Starter (Time / Connector):</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Um 6 Uhr',
                    'Um 7 Uhr',
                    'Dann',
                    'Danach',
                    'Zu Mittag',
                    'Am Nachmittag',
                    'Am Abend',
                    'Um 22 Uhr'
                  ].map((starter) => (
                    <button
                      key={starter}
                      onClick={() => setInversionStarter(starter)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                        inversionStarter === starter
                          ? 'bg-amber-600 text-white shadow'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Pick Activity */}
              <div className="space-y-3 p-5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-xs font-black text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  <span>Pick Activity (Verb + Subject + Details):</span>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {[
                    { label: 'stehe ich auf', meaning: 'I get up (aufstehen)' },
                    { label: 'gehe ich joggen', meaning: 'I go jogging' },
                    { label: 'putze ich mir die Zähne', meaning: 'I brush my teeth' },
                    { label: 'dusche ich und ziehe mich an', meaning: 'I shower and dress' },
                    { label: 'frühstücke ich', meaning: 'I eat breakfast' },
                    { label: 'fahre ich zur Arbeit', meaning: 'I drive to work' },
                    { label: 'esse ich zu Mittag', meaning: 'I eat lunch' },
                    { label: 'mache ich eine Kaffeepause', meaning: 'I take a coffee break' },
                    { label: 'treffe ich Freunde', meaning: 'I meet friends' },
                    { label: 'esse ich zu Abend', meaning: 'I eat dinner' },
                    { label: 'sehe ich fern', meaning: 'I watch TV' },
                    { label: 'schlafe ich ein', meaning: 'I fall asleep' }
                  ].map((act) => (
                    <button
                      key={act.label}
                      onClick={() => setInversionActivity(act.label)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer flex items-center justify-between ${
                        inversionActivity === act.label
                          ? 'bg-teal-700 text-white shadow'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      <span>{act.label}</span>
                      <span className={`text-[10px] ${inversionActivity === act.label ? 'text-teal-200' : 'text-stone-400'}`}>
                        {act.meaning}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inverted Result Visual Box */}
            <div className="p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl space-y-4 shadow-xl border-2 border-stone-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                  ✨ Generated German Sentence
                </span>
                <button
                  onClick={() => speakGerman(`${inversionStarter} ${inversionActivity}.`, isSlowMode)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <span>🔊</span> Listen Now
                </button>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-center py-2 text-amber-200">
                "{inversionStarter} {inversionActivity}."
              </div>

              {/* Slot Anatomy Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs">
                <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                  <div className="text-amber-400 font-bold uppercase text-[10px]">Position 1</div>
                  <div className="font-extrabold text-white mt-0.5">{inversionStarter}</div>
                  <div className="text-stone-400 text-[10px]">Time / Connector</div>
                </div>

                <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/40">
                  <div className="text-amber-300 font-bold uppercase text-[10px]">Position 2 (Immovable)</div>
                  <div className="font-extrabold text-amber-200 mt-0.5">{inversionActivity.split(' ')[0]}</div>
                  <div className="text-stone-300 text-[10px]">Conjugated Verb</div>
                </div>

                <div className="bg-teal-500/20 p-3 rounded-xl border border-teal-500/40">
                  <div className="text-teal-300 font-bold uppercase text-[10px]">Position 3 (Flipped)</div>
                  <div className="font-extrabold text-teal-200 mt-0.5">ich</div>
                  <div className="text-stone-300 text-[10px]">Subject</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 4 Time-Blocks Matrix */}
      {activeTab === 'timeblocks' && (
        <div className="space-y-6">
          {/* Time Block Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2.5 rounded-2xl border border-stone-200 shadow-sm">
            {[
              { id: 'morgen', label: '🌅 Morgen (Morning)' },
              { id: 'mittag', label: '☀️ Mittag (Midday)' },
              { id: 'abend', label: '🌆 Abend (Evening)' },
              { id: 'nacht', label: '🌙 Nacht (Night)' }
            ].map((block) => (
              <button
                key={block.id}
                onClick={() => setTimeBlockFilter(block.id)}
                className={`p-3 rounded-xl text-xs font-black transition cursor-pointer text-center ${
                  timeBlockFilter === block.id
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                {block.label}
              </button>
            ))}
          </div>

          {/* Activities List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-4">
            <h3 className="text-xl font-black text-stone-900 border-b border-stone-200 pb-3">
              {TIME_BLOCKS[timeBlockFilter].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIME_BLOCKS[timeBlockFilter].items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => speakGerman(item.audio, isSlowMode)}
                  className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 transition cursor-pointer flex items-center justify-between gap-3 text-left shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="font-black text-stone-900 text-sm">{item.de}</div>
                    <div className="text-stone-500 text-xs italic">{item.en}</div>
                  </div>
                  <span className="text-amber-700 text-sm font-bold shrink-0">🔊</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
