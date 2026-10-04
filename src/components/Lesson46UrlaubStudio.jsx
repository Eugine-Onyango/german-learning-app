import React, { useState } from 'react';

const DESTINATIONS = [
  { id: 'es', label: '🇪🇸 in Spanien', german: 'in Spanien', english: 'in Spain', prep: 'in (no article)' },
  { id: 'ch', label: '🇨🇭 in der Schweiz', german: 'in der Schweiz', english: 'in Switzerland', prep: 'in der (fem Dative)' },
  { id: 'ny', label: '🗽 in New York', german: 'in New York', english: 'in New York', prep: 'in (city)' },
  { id: 'island', label: '🏝️ auf einer Insel', german: 'auf einer Insel', english: 'on an island', prep: 'auf (island)' },
  { id: 'sea', label: '🌊 an der Ostsee', german: 'an der Ostsee', english: 'at the Baltic Sea', prep: 'an der (water body)' },
  { id: 'beach', label: '🏖️ am Strand', german: 'am Strand', english: 'at the beach', prep: 'am = an dem' },
  { id: 'parents', label: '🏡 bei meinen Eltern', german: 'bei meinen Eltern', english: 'at my parents’ home', prep: 'bei + Dativ plural' },
  { id: 'home', label: '🛋️ zu Hause', german: 'zu Hause', english: 'at home', prep: 'fixed idiom' }
];

const COMPANIONS = [
  { id: 'alone', label: '👤 allein', german: 'allein unterwegs', english: 'traveling alone' },
  { id: 'fam', label: '👨‍👩‍👧 mit meiner Familie', german: 'mit meiner Familie', english: 'with my family' },
  { id: 'gf', label: '👩 mit meiner Freundin', german: 'mit meiner Freundin', english: 'with my girlfriend' },
  { id: 'hub', label: '👨 mit meinem Mann', german: 'mit meinem Mann', english: 'with my husband' },
  { id: 'friends', label: '🎒 mit Schulfreunden', german: 'mit Schulfreunden', english: 'with school friends' },
  { id: 'relatives', label: '👥 mit meinen Verwandten', german: 'mit meinen Verwandten', english: 'with my relatives' }
];

const LODGINGS = [
  { id: 'hotel', label: '🏨 im Hotel', german: 'im Hotel', english: 'in a hotel' },
  { id: 'hostel', label: '🏢 in einer Jugendherberge', german: 'in einer Jugendherberge', english: 'in a youth hostel' },
  { id: 'tent', label: '⛺ in einem Zelt', german: 'in einem Zelt', english: 'in a tent (camping)' },
  { id: 'hostfam', label: '🏡 bei einer Gastfamilie', german: 'bei einer Gastfamilie', english: 'with a host family' },
  { id: 'friends_place', label: '🛋️ bei Freunden', german: 'bei Freunden', english: 'at friends’ place' }
];

const ACTIVITIES = [
  { id: 'sights', label: '🗽 Sehenswürdigkeiten besichtigt', german: 'Wir haben die Sehenswürdigkeiten besichtigt.', english: 'We visited the sights.', icon: '🏛️' },
  { id: 'stroll', label: '🚶 einen Stadtbummel gemacht', german: 'Wir haben einen Stadtbummel gemacht.', english: 'We strolled through the city.', icon: '🛍️' },
  { id: 'sun', label: '☀️ in die Sonne gelegt & erholt', german: 'Ich habe mich erholt und in die Sonne gelegt.', english: 'I relaxed and sunbathed.', icon: '🏖️' },
  { id: 'mountains', label: '🏔️ in die Berge gefahren & Fotos gemacht', german: 'Ich bin in die Berge gefahren und habe viele Fotos gemacht.', english: 'I went to mountains & took photos.', icon: '📸' },
  { id: 'hiking', label: '🌲 viel gewandert & Natur genossen', german: 'Ich bin viel gewandert und habe die Natur genossen.', english: 'I hiked & enjoyed nature.', icon: '🥾' },
  { id: 'people', label: '🤝 Menschen kennengelernt', german: 'Ich habe viele interessante Menschen kennengelernt.', english: 'I met interesting people.', icon: '👥' },
  { id: 'museum', label: '🏛️ Museum besucht & Neues gelernt', german: 'Ich habe ein Museum besucht und viel Neues gelernt.', english: 'I visited a museum and learned.', icon: '🦕' },
  { id: 'course', label: '📚 einen Sprachkurs gemacht', german: 'Im Urlaub habe ich einen Sprachkurs gemacht.', english: 'I took a language course.', icon: '🇩🇪' },
  { id: 'stayhome', label: '📺 gelesen & Filme geschaut', german: 'Ich bin zu Hause geblieben, habe gelesen und Filme geschaut.', english: 'I stayed home, read & watched movies.', icon: '🍿' }
];

const COMPOUND_STORIES = [
  {
    title: 'The Mountain Explorer',
    badge: 'Slide 30',
    german: 'Ich bin in die Berge gefahren und habe viele Fotos gemacht.',
    english: 'I went to the mountains and took many photos.',
    breakdown: 'Movement (sein: bin gefahren) + Action (haben: habe gemacht)',
    icon: '🏔️'
  },
  {
    title: 'The Nature Trekker',
    badge: 'Slide 29',
    german: 'Ich bin viel gewandert und habe die Natur genossen.',
    english: 'I went hiking a lot and enjoyed nature.',
    breakdown: 'Movement (sein: bin gewandert) + Savoring (haben: habe genossen)',
    icon: '🌲'
  },
  {
    title: 'The Cozy Staycationer',
    badge: 'Slide 28',
    german: 'Ich bin zu Hause geblieben, habe gelesen und Filme geschaut.',
    english: 'I stayed at home, read, and watched movies.',
    breakdown: 'Exception (sein: bin geblieben) + Actions (haben: habe gelesen & geschaut)',
    icon: '🛋️'
  },
  {
    title: 'The Culture & Mindmap Duo',
    badge: 'Slide 31 & 32',
    german: 'Ich habe viele interessante Menschen kennengelernt und ein Museum besucht.',
    english: 'I met many interesting people and visited a museum.',
    breakdown: 'Separable (kennengelernt) + Inseparable (besucht)',
    icon: '🏛️'
  }
];

export default function Lesson46UrlaubStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('diary'); // 'diary' | 'phraseboard' | 'compounds'
  
  // Interactive Vacation Diary Builder State
  const [selDest, setSelDest] = useState(DESTINATIONS[0]);
  const [selComp, setSelComp] = useState(COMPANIONS[1]);
  const [selLodge, setSelLodge] = useState(LODGINGS[0]);
  const [selAct, setSelAct] = useState(ACTIVITIES[0]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = isSlowMode ? 0.7 : 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Compile Vacation Story
  const diaryGerman = `Im Urlaub war ich ${selDest.german}. Ich war ${selComp.german}. Ich habe ${selLodge.german} übernachtet. ${selAct.german}`;
  const diaryEnglish = `On vacation I was ${selDest.english}. I was ${selComp.english}. I stayed overnight ${selLodge.english}. ${selAct.english}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-amber-300/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full border border-amber-200 text-amber-100 text-xs font-black uppercase tracking-wider">
              <span>🏖️ Lesson 46 Studio</span>
              <span>•</span>
              <span>Vacations, Activities & Memories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Was hast du im Urlaub gemacht?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Talk fluently about your travels, destinations (<code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-200">in der Schweiz / am Strand</code>), accommodations (<code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-200">im Hotel / im Zelt</code>), and vacation memories in German!
            </p>
          </div>
          <button
            onClick={() => speakText("Was hast du im Urlaub gemacht? Im Urlaub war ich in Spanien, habe Sehenswürdigkeiten besichtigt und mich erholt!")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-amber-100 text-amber-950 font-bold rounded-2xl shadow-lg hover:scale-105 transition-all text-sm whitespace-nowrap"
          >
            <span>🔊</span>
            <span>Listen Greeting</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-2xl">
        <button
          onClick={() => setActiveTab('diary')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'diary'
              ? 'bg-white text-amber-900 shadow-md ring-2 ring-amber-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>🏖️</span>
          <span>1. Vacation Diary Builder</span>
        </button>
        <button
          onClick={() => setActiveTab('phraseboard')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'phraseboard'
              ? 'bg-white text-amber-900 shadow-md ring-2 ring-amber-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>🗺️</span>
          <span>2. 4-Pillar Phraseboards</span>
        </button>
        <button
          onClick={() => setActiveTab('compounds')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'compounds'
              ? 'bg-white text-amber-900 shadow-md ring-2 ring-amber-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>📸</span>
          <span>3. Compound Postcard Forge</span>
        </button>
      </div>

      {/* TAB 1: VACATION DIARY BUILDER */}
      {activeTab === 'diary' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Step Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Destination */}
            <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                  1. Wo warst du? (Destination)
                </span>
                <span className="text-xs text-stone-500">Slide 10</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {DESTINATIONS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelDest(d);
                      speakText(`Im Urlaub war ich ${d.german}`);
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                      selDest.id === d.id
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                        : 'bg-stone-50 text-stone-700 hover:bg-amber-50 border-stone-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Companions */}
            <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                  2. Mit wem warst du? (Companions)
                </span>
                <span className="text-xs text-stone-500">Slide 13</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {COMPANIONS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelComp(c);
                      speakText(`Ich war ${c.german}`);
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                      selComp.id === c.id
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                        : 'bg-stone-50 text-stone-700 hover:bg-amber-50 border-stone-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Lodgings */}
            <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                  3. Wo hast du übernachtet? (Lodging)
                </span>
                <span className="text-xs text-stone-500">Slide 15</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {LODGINGS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelLodge(l);
                      speakText(`Ich habe ${l.german} übernachtet`);
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                      selLodge.id === l.id
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                        : 'bg-stone-50 text-stone-700 hover:bg-amber-50 border-stone-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Activities */}
            <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                  4. Was hast du gemacht? (Activity)
                </span>
                <span className="text-xs text-stone-500">Slides 16-34</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {ACTIVITIES.map(a => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelAct(a);
                      speakText(a.german);
                    }}
                    className={`p-2 rounded-xl text-left text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      selAct.id === a.id
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                        : 'bg-stone-50 text-stone-700 hover:bg-amber-50 border-stone-200'
                    }`}
                  >
                    <span>{a.icon}</span>
                    <span className="truncate">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Postcard Result */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 rounded-3xl border-3 border-amber-300 shadow-lg space-y-4 relative">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/80 rounded-full text-amber-950 font-black text-xs">
                <span>💌 Mein Urlaubstagebuch (My Holiday Postcard)</span>
              </div>
              <button
                onClick={() => speakText(diaryGerman)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow transition-all text-xs flex items-center gap-1.5"
              >
                <span>🔊</span>
                <span>Listen Full Postcard</span>
              </button>
            </div>

            {/* German Story */}
            <div className="space-y-2 bg-white/90 p-5 rounded-2xl border border-amber-200">
              <div className="text-xs font-black uppercase text-amber-700 tracking-wider">
                🇩🇪 German Vacation Story:
              </div>
              <p className="text-stone-900 font-extrabold text-base sm:text-xl leading-relaxed">
                "{diaryGerman}"
              </p>
            </div>

            {/* English Translation */}
            <div className="space-y-1 bg-amber-100/50 p-4 rounded-2xl border border-amber-200/60">
              <div className="text-xs font-black uppercase text-stone-500 tracking-wider">
                🇬🇧 English Meaning:
              </div>
              <p className="text-stone-700 font-semibold text-sm sm:text-base italic">
                "{diaryEnglish}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 4-PILLAR PHRASEBOARDS */}
      {activeTab === 'phraseboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Pillar 1: Wo warst du? */}
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <span className="text-xs font-black text-amber-800 uppercase">Pillar 1</span>
                <h3 className="text-lg font-black text-stone-900">Wo warst du? (Where were you?)</h3>
              </div>
              <span className="text-2xl">🗺️</span>
            </div>
            <div className="space-y-2">
              {DESTINATIONS.map(d => (
                <div
                  key={d.id}
                  onClick={() => speakText(`Im Urlaub war ich ${d.german}`)}
                  className="p-3 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-extrabold text-stone-900 text-sm">{d.label}</div>
                    <div className="text-xs text-stone-500 font-mono">💡 {d.prep}</div>
                  </div>
                  <span className="text-xs text-stone-400">🔊</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: Mit wem warst du? */}
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <span className="text-xs font-black text-amber-800 uppercase">Pillar 2</span>
                <h3 className="text-lg font-black text-stone-900">Mit wem warst du? (With whom?)</h3>
              </div>
              <span className="text-2xl">👥</span>
            </div>
            <div className="space-y-2">
              {COMPANIONS.map(c => (
                <div
                  key={c.id}
                  onClick={() => speakText(`Ich war ${c.german}`)}
                  className="p-3 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-extrabold text-stone-900 text-sm">{c.label}</div>
                    <div className="text-xs text-stone-500">{c.english}</div>
                  </div>
                  <span className="text-xs text-stone-400">🔊</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 3: Wo hast du übernachtet? */}
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <span className="text-xs font-black text-amber-800 uppercase">Pillar 3</span>
                <h3 className="text-lg font-black text-stone-900">Wo hast du übernachtet? (Lodging)</h3>
              </div>
              <span className="text-2xl">🏨</span>
            </div>
            <div className="space-y-2">
              {LODGINGS.map(l => (
                <div
                  key={l.id}
                  onClick={() => speakText(`Ich habe ${l.german} übernachtet`)}
                  className="p-3 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-extrabold text-stone-900 text-sm">{l.label}</div>
                    <div className="text-xs text-stone-500">{l.english}</div>
                  </div>
                  <span className="text-xs text-stone-400">🔊</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 4: Was hast du gemacht? */}
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <span className="text-xs font-black text-amber-800 uppercase">Pillar 4</span>
                <h3 className="text-lg font-black text-stone-900">Was hast du gemacht? (Activities)</h3>
              </div>
              <span className="text-2xl">🏄</span>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {ACTIVITIES.map(a => (
                <div
                  key={a.id}
                  onClick={() => speakText(a.german)}
                  className="p-3 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{a.icon}</span>
                    <div>
                      <div className="font-extrabold text-stone-900 text-xs sm:text-sm">{a.german}</div>
                      <div className="text-[11px] text-stone-500">{a.english}</div>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400">🔊</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPOUND POSTCARD FORGE */}
      {activeTab === 'compounds' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-6 animate-fadeIn">
          <div className="pb-4 border-b border-stone-200 space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Compound Past Sentences (Slides 28–32)
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm">
              See how native Germans chain movement (<code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">sein</code>) and actions (<code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">haben</code>) into fluent compound sentences!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPOUND_STORIES.map((c, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-5 border-2 border-stone-200 hover:border-amber-400 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <h4 className="font-black text-stone-900 text-base">{c.title}</h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => speakText(c.german)}
                    className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-all"
                  >
                    🔊
                  </button>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                  <div className="font-extrabold text-stone-900 text-sm sm:text-base">
                    🇩🇪 "{c.german}"
                  </div>
                  <div className="text-stone-600 text-xs sm:text-sm italic">
                    🇬🇧 "{c.english}"
                  </div>
                </div>

                <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-medium">
                  💡 <strong>Grammar Bridge:</strong> {c.breakdown}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
