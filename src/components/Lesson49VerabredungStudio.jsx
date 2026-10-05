import React, { useState } from 'react';
import { Volume2, Sparkles, Calendar, Clock, MapPin, CheckCircle2, XCircle, RotateCcw, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson49VerabredungStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('inviter'); // 'inviter', 'response', 'planner'

  // Tab 1: Interactive Sentence Builder State
  const [selectedStarter, setSelectedStarter] = useState('wollen');
  const [selectedActivity, setSelectedActivity] = useState('kino');
  const [selectedTime, setSelectedTime] = useState('heute');
  const [selectedTag, setSelectedTag] = useState('zeit');

  // Tab 3: Logistics Planner State
  const [selectedPlanTime, setSelectedPlanTime] = useState('um6');
  const [selectedPlanPlace, setSelectedPlanPlace] = useState('beimir');
  const [selectedDialogueIdx, setSelectedDialogueIdx] = useState(0);

  const STARTERS = [
    { id: 'wollen', label: 'Wollen wir zusammen...', text: 'Wollen wir zusammen', eng: 'Do we want to go together...', modal: 'Wollen' },
    { id: 'willst', label: 'Willst du mit mir...', text: 'Willst du mit mir', eng: 'Do you want to come with me...', modal: 'Wollen' },
    { id: 'gehen', label: 'Gehen wir zusammen...', text: 'Gehen wir zusammen', eng: "Shall we / Let's go together...", modal: 'Präsens' },
    { id: 'moechte', label: 'Ich möchte gern...', text: 'Ich möchte gern', eng: 'I would like to...', modal: 'möchten' }
  ];

  const ACTIVITIES = [
    { id: 'kino', label: '🎬 ins Kino gehen', dest: 'ins Kino gehen', eng: 'go to the cinema', gender: 'das Kino (Akk: in das ➔ ins)' },
    { id: 'park', label: '🌳 in den Park gehen', dest: 'in den Park gehen', eng: 'go to the park', gender: 'der Park (Akk: in den Park)' },
    { id: 'zoo', label: '🦁 in den Zoo gehen', dest: 'in den Zoo gehen', eng: 'go to the zoo', gender: 'der Zoo (Akk: in den Zoo)' },
    { id: 'cafe', label: '☕ ins Café gehen', dest: 'ins Café gehen', eng: 'go to the café', gender: 'das Café (Akk: in das ➔ ins)' },
    { id: 'restaurant', label: '🍽️ ins Restaurant gehen', dest: 'ins Restaurant gehen', eng: 'go to the restaurant', gender: 'das Restaurant (Akk: ins)' },
    { id: 'stadt', label: '🏙️ in die Stadt gehen', dest: 'in die Stadt gehen', eng: 'go downtown', gender: 'die Stadt (Akk: in die Stadt)' },
    { id: 'disko', label: '🪩 in die Disko gehen', dest: 'in die Disko gehen', eng: 'go to the disco', gender: 'die Disko (Akk: in die Disko)' },
    { id: 'tennis', label: '🎾 Tennis spielen', dest: 'Tennis spielen', eng: 'play tennis', gender: 'Sport' },
    { id: 'tanzen', label: '💃 tanzen gehen', dest: 'tanzen gehen', eng: 'go dancing', gender: 'Activity' },
    { id: 'essen', label: '🍕 essen gehen', dest: 'essen gehen', eng: 'go out to eat', gender: 'Activity' }
  ];

  const TIMES = [
    { id: 'heute', label: '🌙 heute Abend', text: 'heute Abend', eng: 'this evening' },
    { id: 'morgen', label: '🌅 morgen', text: 'morgen', eng: 'tomorrow' },
    { id: 'wochenende', label: '🏖️ am Wochenende', text: 'am Wochenende', eng: 'on the weekend' },
    { id: 'freitag', label: '📅 am Freitag', text: 'am Freitag', eng: 'on Friday' },
    { id: 'samstag', label: '🎉 am Samstag', text: 'am Samstag', eng: 'on Saturday' }
  ];

  const TAGS = [
    { id: 'zeit', label: 'Hast du Zeit?', text: 'Hast du Zeit?', eng: 'Do you have time?' },
    { id: 'vor', label: 'Hast du etwas vor?', text: 'Hast du etwas vor?', eng: 'Do you have plans?' },
    { id: 'lust', label: 'Hast du Lust?', text: 'Hast du Lust?', eng: 'Do you feel like it?' },
    { id: 'mitkommen', label: 'Willst du mitkommen?', text: 'Willst du vielleicht mitkommen?', eng: 'Want to come along perhaps?' }
  ];

  // Helper to build generated sentence
  const buildSentence = () => {
    const s = STARTERS.find(x => x.id === selectedStarter);
    const a = ACTIVITIES.find(x => x.id === selectedActivity);
    const t = TIMES.find(x => x.id === selectedTime);
    const tag = TAGS.find(x => x.id === selectedTag);

    if (selectedStarter === 'moechte') {
      return {
        german: `Ich möchte gern ${t.text} ${a.dest}. ${tag.text}`,
        english: `I would like to ${a.eng} ${t.eng}. ${tag.eng}`
      };
    }
    if (selectedStarter === 'gehen') {
      return {
        german: `Gehen wir ${t.text} zusammen ${a.dest}?`,
        english: `Shall we ${a.eng} together ${t.eng}?`
      };
    }
    return {
      german: `${s.text} ${t.text} ${a.dest}?`,
      english: `${s.eng.replace('...', '')} ${a.eng} ${t.eng}?`
    };
  };

  const DIALOGUES = [
    {
      title: '🍿 Dialog 1: Kinoverabredung & Abgemacht! (Cinema Meetup - Slide 8-9, 29)',
      subtitle: 'Making proposal, checking availability & sealing the deal',
      lines: [
        { speaker: 'A', text: 'Hallo Ben! Wollen wir zusammen ins Kino gehen?', trans: 'Hello Ben! Do you want to go to the cinema together?' },
        { speaker: 'B', text: 'Ja gern, wann denn? Heute Abend?', trans: 'Sure, when? This evening?' },
        { speaker: 'A', text: 'Nein, heute kann ich leider nicht. Aber morgen?', trans: "No, unfortunately I can't today. But tomorrow?" },
        { speaker: 'B', text: 'Ja, morgen ist gut! Da habe ich Zeit. Wann und wo treffen wir uns?', trans: 'Yes, tomorrow is good! I have time then. When and where do we meet?' },
        { speaker: 'A', text: 'Um sechs Uhr vor dem Kino?', trans: 'At 6 o’clock in front of the cinema?' },
        { speaker: 'B', text: 'Abgemacht! Okay, dann bis morgen! Tschüss!', trans: "It's a deal! Okay, see you tomorrow then! Bye!" }
      ]
    },
    {
      title: '💼 Dialog 2: Höfliche Absage & Ausrede (Polite Rejection & Excuses - Slide 32-44)',
      subtitle: 'Declining with valid reasons and obligations',
      lines: [
        { speaker: 'A', text: 'Hast du am Freitag etwas vor? Wollen wir in die Disko gehen?', trans: 'Do you have plans on Friday? Do you want to go to the disco?' },
        { speaker: 'B', text: 'Tut mir leid, Entschuldigung! Leider kann ich am Freitag nicht.', trans: "I'm sorry, excuse me! Unfortunately I can't on Friday." },
        { speaker: 'A', text: 'Warum denn nicht? Hast du keine Zeit?', trans: "Why not? You don't have time?" },
        { speaker: 'B', text: 'Ich habe viel zu tun und am Freitag einen Tanzkurs. Außerdem muss ich meinen Eltern helfen.', trans: 'I have lots to do and a dance class on Friday. Besides, I have to help my parents.' },
        { speaker: 'A', text: 'Schade! Vielleicht nächste Woche?', trans: 'Too bad! Maybe next week?' },
        { speaker: 'B', text: 'Ja, nächste Woche passt super!', trans: 'Yes, next week fits wonderfully!' }
      ]
    },
    {
      title: '🦁 Dialog 3: Anderer Vorschlag & Termin (Counter-Proposal - Slide 45-56)',
      subtitle: 'Counter-offering with another day and coordinating coordinates',
      lines: [
        { speaker: 'A', text: 'Willst du mit mir am Donnerstag in den Zoo gehen?', trans: 'Do you want to go with me to the zoo on Thursday?' },
        { speaker: 'B', text: 'Donnerstag geht leider nicht... aber Samstag?', trans: "Thursday unfortunately doesn't work... how about Saturday?" },
        { speaker: 'A', text: 'Ja, das ist eine gute Idee! Können wir uns am Samstag um 11 Uhr treffen?', trans: 'Yes, that is a good idea! Can we meet on Saturday at 11 o’clock?' },
        { speaker: 'B', text: 'Perfekt! Bei mir oder vor dem Zoo?', trans: 'Perfect! At my place or in front of the zoo?' },
        { speaker: 'A', text: 'Treffen wir uns vor dem Zoo. Bis dann!', trans: "Let's meet in front of the zoo. See you then!" }
      ]
    }
  ];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  const activeSentence = buildSentence();

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-sm border border-teal-100 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
            🤝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Verabredungen Studio
              </h2>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Lesson 49
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Meetup Invitations, Availability, Polite Excuses, Acceptances & Meeting Logistics
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl gap-1 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('inviter');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'inviter'
                ? 'bg-white text-teal-800 shadow-xs ring-1 ring-teal-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            💌 Invitation Builder
          </button>
          <button
            onClick={() => {
              setActiveTab('response');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'response'
                ? 'bg-white text-teal-800 shadow-xs ring-1 ring-teal-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ⚖️ Accept vs. Decline & Excuses
          </button>
          <button
            onClick={() => {
              setActiveTab('planner');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-white text-teal-800 shadow-xs ring-1 ring-teal-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            📍 Logistics & Dialogues
          </button>
        </div>
      </div>

      {/* TAB 1: INVITATION BUILDER & FORMULA COMPOSER */}
      {activeTab === 'inviter' && (
        <div className="space-y-6">
          {/* Live Invitation Billboard */}
          <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-white/20 backdrop-blur-xs text-xs font-black px-3 py-1 rounded-full">
                💌 Live German Invitation Generator (Slides 12–22)
              </span>
              <span className="text-3xl">🍿</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-3xl font-black leading-snug">
                "{activeSentence.german}"
              </h3>
              <p className="text-xs sm:text-base text-teal-100 font-medium italic">
                {activeSentence.english}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/20">
              <span className="text-xs text-teal-100 font-mono">
                Grammar: Modalverb + Destination / Activity + Infinitiv am Ende
              </span>
              <button
                onClick={() => handleSpeak(activeSentence.german)}
                className="bg-white hover:bg-teal-50 text-teal-900 font-black px-5 py-2.5 rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
              >
                <Volume2 className="w-4 h-4 text-teal-700" />
                <span>Speak Invitation 🔊</span>
              </button>
            </div>
          </div>

          {/* 4 Interactive Selection Wheels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Column 1: Starter */}
            <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200 space-y-2.5">
              <span className="font-black text-teal-900 uppercase tracking-wider block">
                1. Invitation Starter
              </span>
              <div className="space-y-1.5">
                {STARTERS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStarter(s.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedStarter === s.id
                        ? 'bg-teal-700 text-white border-teal-800 font-bold shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-teal-100/50'
                    }`}
                  >
                    <div className="font-bold">{s.label}</div>
                    <div className={`text-[10px] ${selectedStarter === s.id ? 'text-teal-200' : 'text-stone-500'}`}>
                      {s.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Destination / Activity */}
            <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200 space-y-2.5">
              <span className="font-black text-sky-900 uppercase tracking-wider block">
                2. Destination / Activity
              </span>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {ACTIVITIES.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedActivity(a.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedActivity === a.id
                        ? 'bg-sky-700 text-white border-sky-800 font-bold shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-sky-100/50'
                    }`}
                  >
                    <div className="font-bold">{a.label}</div>
                    <div className={`text-[10px] ${selectedActivity === a.id ? 'text-sky-200' : 'text-stone-500'}`}>
                      {a.gender}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Time Slot */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2.5">
              <span className="font-black text-amber-900 uppercase tracking-wider block">
                3. Proposed Time
              </span>
              <div className="space-y-1.5">
                {TIMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTime(t.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedTime === t.id
                        ? 'bg-amber-600 text-white border-amber-700 font-bold shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-100/50'
                    }`}
                  >
                    <div className="font-bold">{t.label}</div>
                    <div className={`text-[10px] ${selectedTime === t.id ? 'text-amber-200' : 'text-stone-500'}`}>
                      {t.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: Follow-up Availability Tag */}
            <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-2.5">
              <span className="font-black text-purple-900 uppercase tracking-wider block">
                4. Availability Check
              </span>
              <div className="space-y-1.5">
                {TAGS.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      setSelectedTag(tag.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedTag === tag.id
                        ? 'bg-purple-700 text-white border-purple-800 font-bold shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-purple-100/50'
                    }`}
                  >
                    <div className="font-bold">{tag.label}</div>
                    <div className={`text-[10px] ${selectedTag === tag.id ? 'text-purple-200' : 'text-stone-500'}`}>
                      {tag.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACCEPT VS. DECLINE & EXCUSES MATRIX */}
      {activeTab === 'response' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zone A: Accepting Suggestions (Slides 23-30) */}
            <div className="bg-emerald-50/70 p-5 rounded-3xl border-2 border-emerald-300 space-y-4">
              <div className="flex items-center gap-2 text-emerald-950 border-b border-emerald-200 pb-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    Den Vorschlag annehmen / zusagen
                  </h3>
                  <p className="text-xs text-stone-600">
                    Accepting with pleasure & free calendar (Slides 23–30)
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { ger: 'Ja gern, das passt!', eng: 'Yes gladly, that works/fits!', note: 'Slide 25' },
                  { ger: 'Ja gern, das geht!', eng: 'Yes gladly, that would work out!', note: 'Slide 25' },
                  { ger: 'Ja, Freitag ist gut! Da habe ich Zeit.', eng: 'Yes, Friday is good! I have time then.', note: 'Slide 26' },
                  { ger: 'Ja, da habe ich nichts vor!', eng: 'Yes, I have nothing planned! (etwas vorhaben)', note: 'Slide 27-28' },
                  { ger: 'Ja, das ist eine gute Idee! Wann denn?', eng: 'Yes, that is a good idea! When?', note: 'Slide 30' },
                  { ger: 'Abgemacht! Freitag um 18 Uhr?', eng: "It's a deal! Friday at 18 o'clock?", note: 'Slide 29' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3 shadow-2xs hover:border-emerald-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-emerald-950 text-sm sm:text-base">
                          {item.ger}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md">
                          {item.note}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600">{item.eng}</div>
                    </div>
                    <button
                      onClick={() => handleSpeak(item.ger)}
                      className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 cursor-pointer flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone B: Declining & Excuses Matrix (Slides 31-44) */}
            <div className="bg-rose-50/70 p-5 rounded-3xl border-2 border-rose-300 space-y-4">
              <div className="flex items-center gap-2 text-rose-950 border-b border-rose-200 pb-3">
                <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    Den Vorschlag ablehnen & Ausreden
                  </h3>
                  <p className="text-xs text-stone-600">
                    Polite apologies & reason formulas (Slides 31–44)
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { ger: 'Tut mir leid / Entschuldigung. Leider kann ich nicht.', eng: "I'm sorry / Excuse me. Unfortunately I can't.", note: 'Slide 33-34' },
                  { ger: 'Ich habe keine Zeit. / Ich habe viel zu tun.', eng: "I don't have time. / I have lots to do.", note: 'Slide 35-37' },
                  { ger: 'Ich habe leider keine Lust.', eng: "I unfortunately don't feel like it.", note: 'Slide 38' },
                  { ger: 'Ich habe am Freitag einen Tanzkurs.', eng: 'On Friday I have dance class.', note: 'Slide 39, 41' },
                  { ger: 'Ich muss viel arbeiten.', eng: 'I have to work a lot.', note: 'Slide 40' },
                  { ger: 'Ich muss meinen Eltern helfen.', eng: 'I have to help my parents (Dativ!).', note: 'Slide 42' },
                  { ger: 'Da kann ich leider nicht. Da bin ich schon verabredet.', eng: 'Unfortunately I cannot then. I am already booked/have plans.', note: 'Slide 43-44' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-2xl border border-rose-200 flex items-center justify-between gap-3 shadow-2xs hover:border-rose-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-rose-950 text-sm sm:text-base">
                          {item.ger}
                        </span>
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded-md">
                          {item.note}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600">{item.eng}</div>
                    </div>
                    <button
                      onClick={() => handleSpeak(item.ger)}
                      className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 cursor-pointer flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zone C: Counter-Proposals (Slides 45-47) */}
          <div className="bg-amber-50/80 p-5 rounded-3xl border-2 border-amber-300 space-y-3">
            <div className="flex items-center gap-2 text-amber-950">
              <RotateCcw className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <h4 className="text-base font-black">
                Einen anderen Vorschlag machen (Counter-Proposals - Slides 45–47)
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center justify-between gap-2">
                <div>
                  <p className="font-black text-stone-900">
                    "Freitag geht leider nicht... aber Samstag?"
                  </p>
                  <p className="text-xs text-stone-600">
                    Unfortunately Friday doesn't work... how about Saturday?
                  </p>
                </div>
                <button
                  onClick={() => handleSpeak('Freitag geht leider nicht... aber Samstag?')}
                  className="p-2 rounded-full bg-amber-100 text-amber-900 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center justify-between gap-2">
                <div>
                  <p className="font-black text-stone-900">
                    "Vielleicht nächste Woche? / Geht es nächste Woche?"
                  </p>
                  <p className="text-xs text-stone-600">
                    Maybe next week? / Would next week work out?
                  </p>
                </div>
                <button
                  onClick={() => handleSpeak('Vielleicht nächste Woche? Geht es nächste Woche?')}
                  className="p-2 rounded-full bg-amber-100 text-amber-900 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOGISTICS & DIALOGUES */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          {/* Time & Place Matrix Selector */}
          <div className="bg-teal-50/70 p-5 rounded-3xl border border-teal-200 space-y-4">
            <div className="flex items-center gap-2 text-teal-950">
              <MapPin className="w-5 h-5 text-teal-700" />
              <h4 className="text-base font-black">
                Slides 48–55: Ort und Zeit festlegen (Fixing Time & Place)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Time Selector */}
              <div className="space-y-2">
                <span className="font-bold text-stone-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  Wann treffen wir uns? (When do we meet?)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'um6', ger: 'Um 6 Uhr?', eng: 'At 6 o’clock?' },
                    { id: 'um11', ger: 'Um 11 Uhr?', eng: 'At 11 o’clock?' },
                    { id: 'abend', ger: 'Am Abend?', eng: 'In the evening?' },
                    { id: 'um20', ger: 'Um 20 Uhr?', eng: 'At 8 PM (20:00)?' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedPlanTime(t.id);
                        handleSpeak(t.ger);
                      }}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedPlanTime === t.id
                          ? 'bg-teal-700 text-white font-bold border-teal-800 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-teal-100/50'
                      }`}
                    >
                      <div className="font-bold">{t.ger}</div>
                      <div className={`text-[10px] ${selectedPlanTime === t.id ? 'text-teal-200' : 'text-stone-500'}`}>
                        {t.eng}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Place Selector */}
              <div className="space-y-2">
                <span className="font-bold text-stone-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  Wo treffen wir uns? (Where do we meet?)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'beimir', ger: 'Bei mir?', eng: 'At my place?' },
                    { id: 'beidir', ger: 'Bei dir?', eng: 'At your place?' },
                    { id: 'kino', ger: 'Vor dem Kino?', eng: 'In front of cinema?' },
                    { id: 'restaurant', ger: 'Im Restaurant?', eng: 'In the restaurant?' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPlanPlace(p.id);
                        handleSpeak(p.ger);
                      }}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedPlanPlace === p.id
                          ? 'bg-teal-700 text-white font-bold border-teal-800 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-teal-100/50'
                      }`}
                    >
                      <div className="font-bold">{p.ger}</div>
                      <div className={`text-[10px] ${selectedPlanPlace === p.id ? 'text-teal-200' : 'text-stone-500'}`}>
                        {p.eng}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dialogue Roleplays */}
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {DIALOGUES.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDialogueIdx(idx);
                    playChime('click');
                  }}
                  className={`px-3 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    selectedDialogueIdx === idx
                      ? 'bg-teal-700 text-white shadow-xs scale-102'
                      : 'bg-stone-100 text-stone-700 hover:bg-teal-100'
                  }`}
                >
                  {d.title.split(':')[0]}
                </button>
              ))}
            </div>

            {(() => {
              const activeD = DIALOGUES[selectedDialogueIdx];
              return (
                <div className="bg-gradient-to-br from-teal-50 via-white to-sky-50 rounded-3xl p-5 sm:p-7 border-2 border-teal-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-stone-900">
                        {activeD.title}
                      </h3>
                      <p className="text-xs text-stone-500">{activeD.subtitle}</p>
                    </div>

                    <button
                      onClick={() => {
                        const fullText = activeD.lines.map((l) => `${l.speaker === 'A' ? 'Person A:' : 'Person B:'} ${l.text}`).join('. ');
                        handleSpeak(fullText);
                      }}
                      className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Full Conversation 🔊</span>
                    </button>
                  </div>

                  {/* Dialogue script bubbles */}
                  <div className="space-y-3">
                    {activeD.lines.map((line, lIdx) => {
                      const isA = line.speaker === 'A';
                      return (
                        <div
                          key={lIdx}
                          className={`flex gap-3 items-start ${isA ? 'justify-start' : 'justify-end'}`}
                        >
                          {isA && (
                            <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                              A
                            </div>
                          )}
                          <div
                            className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm space-y-1 shadow-xs border ${
                              isA
                                ? 'bg-teal-50/90 border-teal-200 text-teal-950 rounded-tl-none'
                                : 'bg-emerald-50/90 border-emerald-200 text-emerald-950 rounded-tr-none'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-black text-[10px] uppercase tracking-wider text-stone-500">
                                {isA ? 'Person A (Vorschlag)' : 'Person B (Antwort)'}
                              </span>
                              <button
                                onClick={() => handleSpeak(line.text)}
                                className="p-1 rounded-full hover:bg-white/80 text-stone-700 cursor-pointer"
                                title="Listen to this line"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="font-bold text-sm sm:text-base leading-snug">
                              {line.text}
                            </p>
                            <p className="text-xs text-stone-600 italic">
                              {line.trans}
                            </p>
                          </div>
                          {!isA && (
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                              B
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
