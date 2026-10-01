import React, { useState } from 'react';
import { Volume2, Sparkles, Calendar, Cake, Home, Heart, Award, ArrowRight, Zap, RefreshCw, Eye, EyeOff, ShieldCheck, CheckCircle2, ChevronRight, Hash, Star } from 'lucide-react';
import { LESSON_32_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson32OrdinalStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('calendar');

  // TAB 1: Calendar Date Builder State
  const [selectedDay, setSelectedDay] = useState(6);
  const [selectedMonth, setSelectedMonth] = useState(4); // 4 = April (1-indexed)
  const [dateSentenceMode, setDateSentenceMode] = useState('am-date'); // 'subject' | 'am-date' | 'birthday' | 'numeric'

  const months = [
    { num: 1, name: 'Januar', ordinalM: 'Ersten', en: 'January' },
    { num: 2, name: 'Februar', ordinalM: 'Zweiten', en: 'February' },
    { num: 3, name: 'März', ordinalM: 'Dritten', en: 'March' },
    { num: 4, name: 'April', ordinalM: 'Vierten', en: 'April' },
    { num: 5, name: 'Mai', ordinalM: 'Fünften', en: 'May' },
    { num: 6, name: 'Juni', ordinalM: 'Sechsten', en: 'June' },
    { num: 7, name: 'Juli', ordinalM: 'Siebten', en: 'July' },
    { num: 8, name: 'August', ordinalM: 'Achten', en: 'August' },
    { num: 9, name: 'September', ordinalM: 'Neunten', en: 'September' },
    { num: 10, name: 'Oktober', ordinalM: 'Zehnten', en: 'October' },
    { num: 11, name: 'November', ordinalM: 'Elften', en: 'November' },
    { num: 12, name: 'Dezember', ordinalM: 'Zwölften', en: 'December' }
  ];

  // Helper to get ordinal word for day 1-31
  const getOrdinalWord = (day, isAm) => {
    // 4 Rebels
    if (day === 1) return isAm ? 'ersten' : 'erste';
    if (day === 3) return isAm ? 'dritten' : 'dritte';
    if (day === 7) return isAm ? 'siebten' : 'siebte';
    if (day === 8) return isAm ? 'achten' : 'achte';

    // 1-19 (regular)
    const base1to19 = {
      2: 'zweit', 4: 'viert', 5: 'fünft', 6: 'sechst', 9: 'neunt',
      10: 'zehnt', 11: 'elft', 12: 'zwölft', 13: 'dreizehnt', 14: 'vierzehnt',
      15: 'fünfzehnt', 16: 'sechzehnt', 17: 'siebzehnt', 18: 'achtzehnt', 19: 'neunzehnt'
    };

    if (day <= 19) {
      const stem = base1to19[day] || `${day}t`;
      return isAm ? `${stem}en` : `${stem}e`;
    }

    // 20-31 (adds -ste / -sten)
    const base20to31 = {
      20: 'zwanzig', 21: 'einundzwanzig', 22: 'zweiundzwanzig', 23: 'dreiundzwanzig',
      24: 'vierundzwanzig', 25: 'fünfundzwanzig', 26: 'sechsundzwanzig', 27: 'siebenundzwanzig',
      28: 'achtundzwanzig', 29: 'neunundzwanzig', 30: 'dreißig', 31: 'einunddreißig'
    };

    const stem = base20to31[day] || `${day}`;
    return isAm ? `${stem}sten` : `${stem}ste`;
  };

  const currentMonthObj = months.find(m => m.num === selectedMonth) || months[3];
  const dayOrdinalSubject = getOrdinalWord(selectedDay, false);
  const dayOrdinalAm = getOrdinalWord(selectedDay, true);

  let generatedGerman = "";
  let generatedEnglish = "";

  if (dateSentenceMode === 'subject') {
    generatedGerman = `Heute ist der ${selectedDay}. (${dayOrdinalSubject}) ${currentMonthObj.name}.`;
    generatedEnglish = `Today is the ${selectedDay}${selectedDay === 1 ? 'st' : selectedDay === 2 ? 'nd' : selectedDay === 3 ? 'rd' : 'th'} of ${currentMonthObj.en}.`;
  } else if (dateSentenceMode === 'am-date') {
    generatedGerman = `Sie kommt am ${selectedDay}. (${dayOrdinalAm}) ${currentMonthObj.name}.`;
    generatedEnglish = `She will come on the ${selectedDay}${selectedDay === 1 ? 'st' : selectedDay === 2 ? 'nd' : selectedDay === 3 ? 'rd' : 'th'} of ${currentMonthObj.en}.`;
  } else if (dateSentenceMode === 'birthday') {
    generatedGerman = `Ich habe am ${selectedDay}. (${dayOrdinalAm}) ${currentMonthObj.name} Geburtstag.`;
    generatedEnglish = `My birthday is on the ${selectedDay}${selectedDay === 1 ? 'st' : selectedDay === 2 ? 'nd' : selectedDay === 3 ? 'rd' : 'th'} of ${currentMonthObj.en}.`;
  } else {
    // numeric style (Slide 3)
    const dayPadded = String(selectedDay).padStart(2, '0');
    const monthPadded = String(selectedMonth).padStart(2, '0');
    generatedGerman = `Ich wurde am ${dayPadded}.${monthPadded}. (${dayOrdinalAm} ${currentMonthObj.ordinalM}) geboren.`;
    generatedEnglish = `I was born on ${dayPadded}.${monthPadded}. (${dayOrdinalAm} of the ${selectedMonth}${selectedMonth === 1 ? 'st' : selectedMonth === 2 ? 'nd' : selectedMonth === 3 ? 'rd' : 'th'} month).`;
  }

  // TAB 2: Numbers Ladder Data
  const [filterCategory, setFilterCategory] = useState('all');

  const ladderNumbers = [
    { num: 1, der: 'erste', am: 'am ersten', isRebel: true, note: 'eins ➔ erste (NOT einste!)' },
    { num: 2, der: 'zweite', am: 'am zweiten', isRebel: false, note: 'zwei ➔ zweite' },
    { num: 3, der: 'dritte', am: 'am dritten', isRebel: true, note: 'drei ➔ dritte (NOT dreite!)' },
    { num: 4, der: 'vierte', am: 'am vierten', isRebel: false, note: 'vier ➔ vierte' },
    { num: 5, der: 'fünfte', am: 'am fünften', isRebel: false, note: 'fünf ➔ fünfte' },
    { num: 6, der: 'sechste', am: 'am sechsten', isRebel: false, note: 'sechs ➔ sechste' },
    { num: 7, der: 'siebte', am: 'am siebten', isRebel: true, note: 'sieben ➔ siebte (drops -en!)' },
    { num: 8, der: 'achte', am: 'am achten', isRebel: true, note: 'acht ➔ achte (already has t!)' },
    { num: 9, der: 'neunte', am: 'am neunten', isRebel: false, note: 'neun ➔ neunte' },
    { num: 10, der: 'zehnte', am: 'am zehnten', isRebel: false, note: 'zehn ➔ zehnte' },
    { num: 11, der: 'elfte', am: 'am elften', isRebel: false, note: 'elf ➔ elfte' },
    { num: 12, der: 'zwölfte', am: 'am zwölften', isRebel: false, note: 'zwölf ➔ zwölfte' },
    { num: 13, der: 'dreizehnte', am: 'am dreizehnten', isRebel: false, note: '13-19 take -te / -ten' },
    { num: 14, der: 'vierzehnte', am: 'am vierzehnten', isRebel: false, note: '13-19 take -te / -ten' },
    { num: 15, der: 'fünfzehnte', am: 'am fünfzehnten', isRebel: false, note: '13-19 take -te / -ten' },
    { num: 16, der: 'sechzehnte', am: 'am sechzehnten', isRebel: false, note: '13-19 take -te / -ten' },
    { num: 17, der: 'siebzehnte', am: 'am siebzehnten', isRebel: false, note: '13-19 take -te / -ten' },
    { num: 18, der: 'achtzehnte', am: 'am achtzehnten', isRebel: false, note: '13-19 take -te / -ten' },
    { num: 19, der: 'neunzehnte', am: 'am neunzehnten', isRebel: false, note: '13-19 take -te / -ten' },
    { num: 20, der: 'zwanzigste', am: 'am zwanzigsten', isRebel: false, is20Plus: true, note: 'From 20+: adds -ste / -sten!' },
    { num: 21, der: 'einundzwanzigste', am: 'am einundzwanzigsten', isRebel: false, is20Plus: true, note: 'Only last word takes ending' },
    { num: 30, der: 'dreißigste', am: 'am dreißigsten', isRebel: false, is20Plus: true, note: 'dreißig + ste' },
    { num: 40, der: 'vierzigste', am: 'am vierzigsten', isRebel: false, is20Plus: true, note: 'vierzig + ste' },
    { num: 50, der: 'fünfzigste', am: 'am fünfzigsten', isRebel: false, is20Plus: true, note: 'fünfzig + ste' },
    { num: 60, der: 'sechzigste', am: 'am sechzigsten', isRebel: false, is20Plus: true, note: 'sechzig + ste' },
    { num: 70, der: 'siebzigste', am: 'am siebzigsten', isRebel: false, is20Plus: true, note: 'siebzig + ste' },
    { num: 80, der: 'achtzigste', am: 'am achtzigsten', isRebel: false, is20Plus: true, note: 'achtzig + ste' },
    { num: 90, der: 'neunzigste', am: 'am neunzigsten', isRebel: false, is20Plus: true, note: 'neunzig + ste' },
    { num: 100, der: 'hundertste', am: 'am hundertsten', isRebel: false, is20Plus: true, note: 'hundert + ste' },
    { num: 101, der: 'einhunderterste', am: 'am einhundertersten', isRebel: true, is20Plus: true, note: '101 = einhundert + erste!' },
    { num: 102, der: 'einhundertzweite', am: 'am einhundertzweiten', isRebel: false, is20Plus: true, note: '102 = einhundert + zweite' },
    { num: 1000, der: 'tausendste', am: 'am tausendsten', isRebel: false, is20Plus: true, note: 'tausend + ste' }
  ];

  const filteredLadder = ladderNumbers.filter(item => {
    if (filterCategory === 'rebels') return item.isRebel;
    if (filterCategory === '1to19') return item.num <= 19;
    if (filterCategory === '20plus') return item.num >= 20;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white p-6 rounded-3xl shadow-xl border-4 border-amber-300/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              Lesson 32 Interactive Studio • Slides 1–46
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
              <span>Ordinalzahlen (The 1st, 2nd, 3rd... Numbers)</span>
              <span className="text-2xl">🥇</span>
            </h2>
            <p className="text-amber-100 text-sm max-w-2xl leading-relaxed">
              Express dates, birthdays, floor levels, rankings, and directions like a native! Master the two core endings: <strong>-te</strong> (with der/die/das) and <strong>-ten</strong> (with am).
            </p>
          </div>
          <button
            onClick={() => speakGerman("Ordinalzahlen. erste, zweite, dritte, vierte. Heute ist der sechste April. Ich habe am sechsten April Geburtstag.", isSlowMode)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-amber-900 hover:bg-amber-50 active:scale-95 font-bold rounded-2xl shadow-lg transition-all"
          >
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>Hear Overview</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'calendar'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>1. Calendar & Birthday Date Builder (Slides 2–5)</span>
        </button>
        <button
          onClick={() => setActiveTab('ladder')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'ladder'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>2. The 1 to 1000 Ladder & 4 Rebels (Slides 7–45)</span>
        </button>
        <button
          onClick={() => setActiveTab('life')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'life'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>3. Everyday Life Milestones (Slides 2, 42–44)</span>
        </button>
      </div>

      {/* TAB 1: CALENDAR & BIRTHDAY BUILDER */}
      {activeTab === 'calendar' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sentence Mode Picker */}
          <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm space-y-2">
            <div className="text-xs font-bold text-stone-500 uppercase">Select Sentence Formula:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'am-date', label: '📅 Sie kommt am ...', sub: 'Event on Date (-ten)' },
                { id: 'birthday', label: '🎂 Ich habe Geburtstag am ...', sub: 'My Birthday (-ten)' },
                { id: 'subject', label: '☀️ Heute ist der ...', sub: 'Today is... (-te)' },
                { id: 'numeric', label: '👶 Geboren am 06.04.', sub: 'Slide 3 Style' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setDateSentenceMode(mode.id);
                    playChime('click');
                  }}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    dateSentenceMode === mode.id
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-stone-50 dark:bg-stone-700/50 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-600 hover:bg-amber-50'
                  }`}
                >
                  <div className="text-xs font-black">{mode.label}</div>
                  <div className={`text-[10px] ${dateSentenceMode === mode.id ? 'text-amber-100' : 'text-stone-400'}`}>{mode.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Date Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Day Selector (1 to 31) */}
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500 uppercase">Pick Day of Month:</span>
                <span className="text-sm font-black text-amber-600 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-full">
                  Day {selectedDay}. ({dateSentenceMode === 'subject' ? dayOrdinalSubject : dayOrdinalAm})
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(dayNum => {
                  const isSelected = selectedDay === dayNum;
                  const isRebel = [1, 3, 7, 8].includes(dayNum);
                  return (
                    <button
                      key={dayNum}
                      onClick={() => {
                        setSelectedDay(dayNum);
                        speakGerman(getOrdinalWord(dayNum, dateSentenceMode !== 'subject'), isSlowMode);
                      }}
                      className={`p-2.5 rounded-xl font-black text-xs transition-all relative ${
                        isSelected
                          ? 'bg-amber-500 text-white shadow-md scale-105'
                          : 'bg-stone-50 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-amber-100'
                      }`}
                    >
                      <span>{dayNum}.</span>
                      {isRebel && (
                        <span className="absolute top-0.5 right-0.5 text-[8px]">⭐</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="text-[10px] text-stone-400 italic">
                ⭐ = Irregular rebel (1. erste, 3. dritte, 7. siebte, 8. achte)
              </div>
            </div>

            {/* 2. Month Selector (Januar to Dezember) */}
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500 uppercase">Pick Month:</span>
                <span className="text-sm font-black text-amber-600 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-full">
                  {currentMonthObj.name} ({currentMonthObj.num}. Monat)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {months.map(m => {
                  const isSelected = selectedMonth === m.num;
                  return (
                    <button
                      key={m.num}
                      onClick={() => {
                        setSelectedMonth(m.num);
                        speakGerman(m.name, isSlowMode);
                      }}
                      className={`p-2.5 rounded-xl font-bold text-xs transition-all text-left ${
                        isSelected
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-stone-50 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-amber-100'
                      }`}
                    >
                      <div className="text-[10px] opacity-80">{m.num}.</div>
                      <div className="font-black text-xs truncate">{m.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Generated Result Card */}
          <div
            onClick={() => speakGerman(generatedGerman, isSlowMode)}
            className="p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white rounded-3xl shadow-xl cursor-pointer hover:shadow-2xl transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group"
          >
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="text-xs font-bold text-amber-200 uppercase flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Spoken German Sentence (Tap to Listen):</span>
              </div>
              <div className="text-xl md:text-3xl font-black group-hover:scale-[1.01] transition-transform">
                {generatedGerman}
              </div>
              <div className="text-xs md:text-sm text-amber-100 italic">
                "{generatedEnglish}"
              </div>
            </div>
            <div className="p-4 bg-white text-amber-900 rounded-2xl shadow-lg shrink-0 flex items-center gap-2 font-bold text-sm">
              <Volume2 className="w-5 h-5 text-amber-600" />
              <span>Hear Sentence</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LADDER 1 TO 1000 & 4 REBELS */}
      {activeTab === 'ladder' && (
        <div className="space-y-6 animate-fade-in">
          {/* Spotlight on 4 Rebels */}
          <div className="p-6 bg-amber-50 dark:bg-amber-950/30 rounded-3xl border-2 border-amber-300 dark:border-amber-800 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-black text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                The 4 Irregular Rebels to Watch (Slide Rule):
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { num: '1.', nom: 'der erste', am: 'am ersten', note: 'NOT einste! (eins ➔ erste)' },
                { num: '3.', nom: 'der dritte', am: 'am dritten', note: 'NOT dreite! (drei ➔ dritte)' },
                { num: '7.', nom: 'der siebte', am: 'am siebten', note: 'Drops "-en"! (sieben ➔ siebte)' },
                { num: '8.', nom: 'der achte', am: 'am achten', note: 'Already has "t" (acht ➔ achte)' }
              ].map((reb) => (
                <div
                  key={reb.num}
                  onClick={() => speakGerman(`${reb.num} ${reb.nom}, ${reb.am}`, isSlowMode)}
                  className="p-4 bg-white dark:bg-stone-800 rounded-2xl border-2 border-amber-400 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-1"
                >
                  <div className="text-xl font-black text-amber-600">{reb.num}</div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">{reb.nom}</div>
                  <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">{reb.am}</div>
                  <div className="text-[10px] text-stone-500 italic pt-1">{reb.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Numbers (1 to 1000) 📋' },
              { id: 'rebels', label: '⭐ The 4 Rebels Only' },
              { id: '1to19', label: '🪜 1 to 19 Zone (-te / -ten)' },
              { id: '20plus', label: '🚀 20+ Zone (-ste / -sten)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterCategory(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === f.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid of Ladder Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredLadder.map(item => (
              <div
                key={item.num}
                onClick={() => speakGerman(`${item.num}. der ${item.der}, ${item.am}`, isSlowMode)}
                className={`p-4 rounded-2xl border cursor-pointer hover:shadow-lg transition-all space-y-2 ${
                  item.isRebel
                    ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700'
                    : item.is20Plus
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-amber-600">{item.num}.</span>
                  <Volume2 className="w-4 h-4 text-stone-400 hover:text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500">der/die/das:</div>
                  <div className="text-base font-black text-stone-900 dark:text-white">{item.der}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500">am:</div>
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{item.am}</div>
                </div>
                <div className="text-[10px] text-stone-400 italic pt-1 border-t border-stone-100 dark:border-stone-700">
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REAL WORLD MILESTONES & DIRECTIONS */}
      {activeTab === 'life' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'house',
                slide: 'Slide 2',
                title: 'The Third House from the Left',
                german: 'Das dritte Haus von links ist mein Haus.',
                english: 'The third house from the left is my house.',
                icon: '🏡',
                highlight: 'dritte (das Haus ➔ das dritte Haus)',
                explain: 'Pointing out directions on a street!'
              },
              {
                id: 'love',
                slide: 'Slide 42',
                title: 'The First Love',
                german: 'Die erste Liebe.',
                english: 'The first love.',
                icon: '❤️',
                highlight: 'erste (die Liebe ➔ die erste Liebe)',
                explain: 'Romantic life milestone (feminine).'
              },
              {
                id: 'child',
                slide: 'Slide 43',
                title: 'The First Child',
                german: 'Das erste Kind.',
                english: 'The first child.',
                icon: '👧',
                highlight: 'erste (das Kind ➔ das erste Kind)',
                explain: 'Family milestone (neuter).'
              },
              {
                id: 'july',
                slide: 'Slide 44',
                title: 'The First of July',
                german: 'Der erste Juli.',
                english: 'The first of July.',
                icon: '🗓️',
                highlight: 'erste (der Monat ➔ der erste Juli)',
                explain: 'Calendar dates with masculine month names!'
              },
              {
                id: 'guest',
                slide: 'Slide 9, 101',
                title: 'The 101st Guest',
                german: 'Der einhunderterste Gast.',
                english: 'The 101st guest.',
                icon: '🤵',
                highlight: 'einhunderterste (101.)',
                explain: 'Compound big numbers: only the last word "erste" changes!'
              },
              {
                id: 'thousand',
                slide: 'Slide 7, 1000',
                title: 'The 1000th Car',
                german: 'Das tausendste Auto.',
                english: 'The 1000th car.',
                icon: '🚗',
                highlight: 'tausendste (1000.)',
                explain: '1000 adds "-ste" in subject position!'
              }
            ].map(card => (
              <div
                key={card.id}
                onClick={() => speakGerman(card.german, isSlowMode)}
                className="p-6 bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 hover:border-amber-400 shadow-md hover:shadow-xl cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{card.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">{card.slide}</span>
                      <h4 className="text-lg font-black text-stone-900 dark:text-white">{card.title}</h4>
                    </div>
                  </div>
                  <Volume2 className="w-5 h-5 text-stone-400 group-hover:text-amber-600" />
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <div className="text-base font-black text-amber-900 dark:text-amber-100">{card.german}</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 italic">"{card.english}"</div>
                </div>

                <div className="text-xs font-bold text-stone-600 dark:text-stone-300">
                  Target Form: <span className="text-amber-600 dark:text-amber-400 font-black">{card.highlight}</span>
                </div>
                <div className="text-[11px] text-stone-400">
                  {card.explain}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
