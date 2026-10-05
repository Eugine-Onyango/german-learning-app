import React, { useState } from 'react';
import { Volume2, Sparkles, Check, ArrowRight, Calendar, Clock, BarChart3, RotateCcw, Layers, Compass, ArrowUpDown, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson56ZeitadverbienStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('routine'); // 'routine', 'timeline', 'frequency'

  // Tab 1: Habitual Routine State
  const [selectedDay, setSelectedDay] = useState('montags');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('abends');
  const [selectedActivity, setSelectedActivity] = useState('spazieren');

  // Tab 2: Timeline & Sequence State
  const [selectedEra, setSelectedEra] = useState('gegenwart'); // 'vergangenheit', 'gegenwart', 'zukunft'
  const [wordOrderMode, setWordOrderMode] = useState('normal'); // 'normal' (Subject Pos 1), 'inverted' (Adverb Pos 1)
  const [sequenceStep, setSequenceStep] = useState(1);

  // Tab 3: Frequency Barometer State
  const [selectedFreqPercent, setSelectedFreqPercent] = useState(80);

  const weekdays = [
    { key: 'montags', de: 'montags', en: 'on Mondays / every Monday', sample: 'Montags beginnt der Unterricht um 15 Uhr.' },
    { key: 'dienstags', de: 'dienstags', en: 'on Tuesdays / every Tuesday', sample: 'Dienstags spiele ich Fußball mit Freunden.' },
    { key: 'mittwochs', de: 'mittwochs', en: 'on Wednesdays / every Wednesday', sample: 'Mittwochs kochen wir zusammen Abendessen.' },
    { key: 'donnerstags', de: 'donnerstags', en: 'on Thursdays / every Thursday', sample: 'Donnerstags habe ich einen Arzttermin.' },
    { key: 'freitags', de: 'freitags', en: 'on Fridays / every Friday', sample: 'Freitags gehen wir gern ins Kino.' },
    { key: 'samstags', de: 'samstags', en: 'on Saturdays / every Saturday', sample: 'Samstags mache ich den großen Einkauf.' },
    { key: 'sonntags', de: 'sonntags', en: 'on Sundays / every Sunday', sample: 'Er arbeitet gern sonntags.' }
  ];

  const timesOfDay = [
    { key: 'morgens', de: 'morgens', en: 'in the morning (habitually)', icon: '🌅', sample: 'Morgens trinke ich immer Kaffee.' },
    { key: 'vormittags', de: 'vormittags', en: 'in the late morning / before noon', icon: '☕', sample: 'Vormittags arbeite ich im Büro.' },
    { key: 'mittags', de: 'mittags', en: 'at noon / lunchtime', icon: '☀️', sample: 'Mittags essen wir in der Kantine.' },
    { key: 'nachmittags', de: 'nachmittags', en: 'in the afternoon', icon: '🌤️', sample: 'Nachmittags mache ich eine kleine Pause.' },
    { key: 'abends', de: 'abends', en: 'in the evening', icon: '🌆', sample: 'Abends gehen wir alle spazieren.' },
    { key: 'nachts', de: 'nachts', en: 'at night', icon: '🌙', sample: 'Nachts schlafen die meisten Menschen.' }
  ];

  const timelineEras = {
    vergangenheit: {
      title: "Vergangenheit (Past)",
      color: "amber",
      icon: "⏮️",
      adverbs: [
        { de: "vorgestern", en: "day before yesterday", ex: "Vorgestern war das Wetter noch schön." },
        { de: "gestern", en: "yesterday", ex: "Gestern hat es bei uns geregnet." },
        { de: "früher", en: "earlier / formerly / in the past", ex: "Früher habe ich kein Gemüse gegessen." },
        { de: "damals", en: "back then / at that time", ex: "Damals war ich ein kleiner Junge." }
      ]
    },
    gegenwart: {
      title: "Gegenwart (Present)",
      color: "emerald",
      icon: "⏱️",
      adverbs: [
        { de: "heute", en: "today", ex: "Heute kocht mein Mann." },
        { de: "jetzt, nun", en: "now", ex: "Jetzt muss ich gehen. (oder: Ich muss jetzt gehen)" },
        { de: "gerade", en: "right now / just at this moment (-ing)", ex: "Sie telefoniert gerade." },
        { de: "sofort", en: "immediately / right away", ex: "Ich bin sofort eingeschlafen." },
        { de: "heutzutage", en: "nowadays", ex: "Heutzutage ist es sehr warm." }
      ]
    },
    zukunft: {
      title: "Zukunft (Future)",
      color: "indigo",
      icon: "⏭️",
      adverbs: [
        { de: "morgen", en: "tomorrow", ex: "Sie muss morgen verreisen." },
        { de: "übermorgen", en: "day after tomorrow", ex: "Übermorgen besuchen wir unsere Großeltern." },
        { de: "bald", en: "soon", ex: "Sie bekommt bald ein Baby." },
        { de: "später", en: "later", ex: "Soll ich dich später anrufen?" }
      ]
    }
  };

  const frequencyLadder = [
    { percent: 100, de: "immer", en: "always (100%)", color: "emerald", ex: "Er kommt immer zu spät.", exEn: "He always comes too late." },
    { percent: 90, de: "fast immer", en: "almost always (~90%)", color: "emerald", ex: "Fast immer nehme ich das Fahrrad zur Arbeit.", exEn: "I almost always take the bicycle to work." },
    { percent: 80, de: "meistens", en: "mostly / usually (~80%)", color: "blue", ex: "Um diese Zeit bin ich meistens schon im Bett.", exEn: "At this time I am usually already in bed." },
    { percent: 70, de: "oft / häufig", en: "often / frequently (~70%)", color: "blue", ex: "Er hat uns oft besucht.", exEn: "He visited us often." },
    { percent: 50, de: "manchmal / ab und zu", en: "sometimes / now & then (~50%)", color: "amber", ex: "Manchmal habe ich Kopfschmerzen.", exEn: "Sometimes I have a headache." },
    { percent: 15, de: "selten", en: "seldom / rarely (~15%)", color: "orange", ex: "Ich trinke selten Kaffee am Abend.", exEn: "I rarely drink coffee in the evening." },
    { percent: 5, de: "fast nie", en: "almost never (~5%)", color: "rose", ex: "Wir sehen fast nie fern.", exEn: "We almost never watch TV." },
    { percent: 0, de: "nie", en: "never (0%)", color: "red", ex: "Ich komme nie unpünktlich zum Unterricht.", exEn: "I never arrive late to class." }
  ];

  const currentFreq = frequencyLadder.find(f => f.percent === selectedFreqPercent) || frequencyLadder[2];

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-indigo-500 to-sky-500 text-white rounded-2xl shadow-md text-2xl">
              ⏰
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                Zeitadverbien — Adverbs of Time Studio
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Master habitual days (-s), 3-era timelines, chronological chains (zuerst ➔ dann), and the 100% to 0% frequency ladder!
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => {
              setActiveTab('routine');
              playChime();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'routine'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            1. Habitual Days (-s)
          </button>
          <button
            onClick={() => {
              setActiveTab('timeline');
              playChime();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. 3-Era Timelines & Sequence
          </button>
          <button
            onClick={() => {
              setActiveTab('frequency');
              playChime();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'frequency'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            3. Frequency Ladder (100% - 0%)
          </button>
        </div>
      </div>

      {/* TAB 1: Habitual Days & Times of Day (-s Rule) */}
      {activeTab === 'routine' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">📅</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                The Golden "-s" Rule for Habitual Days & Times (Slides 6–8)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                When you do something repeatedly every week, add an <strong>"-s"</strong> and write it with a <strong>lowercase letter</strong>: <em>am Montag</em> (on Monday) ➔ <strong>montags</strong> (on Mondays / every Monday)!
              </p>
            </div>
          </div>

          {/* Weekday Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Wochentage (Recurring Days of the Week):</span>
              <span className="text-indigo-600">Tap to hear live German</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {weekdays.map((day) => {
                const isSelected = selectedDay === day.key;
                return (
                  <button
                    key={day.key}
                    onClick={() => {
                      setSelectedDay(day.key);
                      handleSpeak(day.de);
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-center border-2 transition-all flex flex-col justify-between gap-1 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-200 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-black text-sm capitalize">{day.de}</div>
                    <div className="text-[10px] text-slate-500 font-normal truncate">{day.en.split('/')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tageszeiten (Times of Day) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Tageszeiten (Recurring Daily Time Blocks):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {timesOfDay.map((tod) => {
                const isSelected = selectedTimeOfDay === tod.key;
                return (
                  <button
                    key={tod.key}
                    onClick={() => {
                      setSelectedTimeOfDay(tod.key);
                      handleSpeak(tod.de);
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-center border-2 transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-200 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{tod.icon}</span>
                    <div className="font-black text-xs md:text-sm">{tod.de}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{tod.en.split('(')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Sentence Display & Inversion Engine */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h4 className="text-xl font-black text-amber-300">
                  Habitual Sentence Builder with Verb in Position 2
                </h4>
                <p className="text-slate-400 text-xs">Observe how the time adverb sits smoothly at Position 1 or Position 3</p>
              </div>
              <button
                onClick={() => handleSpeak(`${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} ${timesOfDay.find(t => t.key === selectedTimeOfDay)?.de} lernen wir Deutsch.`)}
                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Volume2 className="w-4 h-4" /> Listen to Combined Sentence
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A: Time Adverb at Position 1 */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-full">
                    Position 1 (Time Front)
                  </span>
                  <button
                    onClick={() => handleSpeak(`${weekdays.find(d => d.key === selectedDay)?.sample}`)}
                    className="text-slate-400 hover:text-amber-300"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="font-bold text-white text-base md:text-lg">
                  "{weekdays.find(d => d.key === selectedDay)?.sample}"
                </div>
                <div className="text-xs text-slate-400">
                  Notice: <strong>{selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}</strong> takes Slot 1 ➔ Verb takes Slot 2!
                </div>
              </div>

              {/* Option B: Time of day sample */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 bg-emerald-400/20 text-emerald-300 rounded-full">
                    Daily Block Example
                  </span>
                  <button
                    onClick={() => handleSpeak(`${timesOfDay.find(t => t.key === selectedTimeOfDay)?.sample}`)}
                    className="text-slate-400 hover:text-emerald-300"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="font-bold text-emerald-300 text-base md:text-lg">
                  "{timesOfDay.find(t => t.key === selectedTimeOfDay)?.sample}"
                </div>
                <div className="text-xs text-slate-400">
                  Everyday routine in German: recurring habits always add an <strong>-s</strong>!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 3-Era Timelines & Sequence Train */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">⏳</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                The 3 Timelines (Vergangenheit, Gegenwart, Zukunft) & Chronological Sequence
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                German groups adverbs into the 3 eras of time. Tap an era below to explore its vocabulary, sample sentences from the slides, and practice the sequence chain!
              </p>
            </div>
          </div>

          {/* Era Selector Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {Object.keys(timelineEras).map((eraKey) => {
              const era = timelineEras[eraKey];
              const isSelected = selectedEra === eraKey;
              return (
                <button
                  key={eraKey}
                  onClick={() => {
                    setSelectedEra(eraKey);
                    playChime();
                  }}
                  className={`p-4 rounded-2xl text-center border-2 transition-all flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-200 text-indigo-950'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-3xl">{era.icon}</span>
                  <div className="font-black text-sm md:text-base">{era.title}</div>
                </button>
              );
            })}
          </div>

          {/* Era Adverbs Cards */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h4 className="font-black text-slate-800 text-lg">
                {timelineEras[selectedEra].title} Vocabulary & Examples
              </h4>
              <span className="text-xs text-slate-500">Tap any item to listen</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timelineEras[selectedEra].adverbs.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSpeak(`${item.de}. ${item.ex}`)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-indigo-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                      {item.de}
                    </span>
                    <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                  </div>
                  <div className="text-xs font-semibold text-slate-500">{item.en}</div>
                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs font-medium text-slate-700">
                    "{item.ex}"
                  </div>
                </div>
              ))}
            </div>

            {/* Sequence Train Feature (Die Reihenfolge) */}
            <div className="bg-indigo-950 text-white p-6 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-indigo-900 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚂</span>
                  <span className="font-black text-amber-300 text-base">
                    Die Reihenfolge (Chronological Sequence Chain — Slides 23–27)
                  </span>
                </div>
                <button
                  onClick={() => handleSpeak("Zuerst sollst du lesen und dann übersetzen. Danach gehen wir einkaufen und später essen wir Eis.")}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-indigo-900/70 p-3.5 rounded-2xl border border-indigo-700 space-y-1">
                  <div className="text-[10px] font-black uppercase text-amber-400">Step 1</div>
                  <div className="font-black text-white text-base">zuerst</div>
                  <div className="text-xs text-indigo-200">first of all</div>
                  <div className="text-[11px] text-slate-300 italic pt-1">"Zuerst lesen..."</div>
                </div>

                <div className="bg-indigo-900/70 p-3.5 rounded-2xl border border-indigo-700 space-y-1">
                  <div className="text-[10px] font-black uppercase text-amber-400">Step 2</div>
                  <div className="font-black text-white text-base">dann</div>
                  <div className="text-xs text-indigo-200">then</div>
                  <div className="text-[11px] text-slate-300 italic pt-1">"...dann übersetzen..."</div>
                </div>

                <div className="bg-indigo-900/70 p-3.5 rounded-2xl border border-indigo-700 space-y-1">
                  <div className="text-[10px] font-black uppercase text-amber-400">Step 3</div>
                  <div className="font-black text-white text-base">danach</div>
                  <div className="text-xs text-indigo-200">after that</div>
                  <div className="text-[11px] text-slate-300 italic pt-1">"Danach einkaufen..."</div>
                </div>

                <div className="bg-indigo-900/70 p-3.5 rounded-2xl border border-indigo-700 space-y-1">
                  <div className="text-[10px] font-black uppercase text-amber-400">Step 4</div>
                  <div className="font-black text-white text-base">später</div>
                  <div className="text-xs text-indigo-200">later on</div>
                  <div className="text-[11px] text-slate-300 italic pt-1">"...später Eis essen."</div>
                </div>
              </div>

              <div className="bg-indigo-900/40 p-3 rounded-xl text-xs text-indigo-200 flex items-center gap-2">
                <span>💡</span>
                <span><strong>vorher</strong> = beforehand / before (e.g. <em>"Warum hast du das nicht vorher gesagt?"</em>)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Frequency Ladder & Duration */}
      {activeTab === 'frequency' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">📊</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                The German Frequency Barometer: 100% (immer) down to 0% (nie) (Slides 32–42)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                How often do you do something? (<strong>Wie oft?</strong>). Click each percentage level on the barometer below to master the full scale of German habits!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Frequency Scale Ladder */}
            <div className="lg:col-span-2 space-y-2">
              {frequencyLadder.map((item) => {
                const isSelected = selectedFreqPercent === item.percent;
                return (
                  <button
                    key={item.percent}
                    onClick={() => {
                      setSelectedFreqPercent(item.percent);
                      handleSpeak(`${item.de}. ${item.ex}`);
                      playChime();
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-14 text-center py-1 rounded-xl text-xs font-black shrink-0 ${
                        item.percent >= 80 ? 'bg-emerald-100 text-emerald-800' :
                        item.percent >= 50 ? 'bg-blue-100 text-blue-800' :
                        item.percent >= 15 ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {item.percent}%
                      </span>
                      <div>
                        <div className="font-black text-slate-800 text-sm md:text-base">{item.de}</div>
                        <div className="text-xs text-slate-500">{item.en}</div>
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Col: Selected Item Deep Dive */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span className="font-black text-amber-300 text-base">Active Frequency</span>
                  </div>
                  <span className="text-2xl font-black text-indigo-400">{currentFreq.percent}%</span>
                </div>

                <div className="text-center py-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                  <div className="text-3xl font-black text-amber-300">{currentFreq.de}</div>
                  <div className="text-xs text-slate-300 font-semibold">{currentFreq.en}</div>
                </div>

                <div className="bg-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Sample Sentence (from slide):</div>
                  <div className="font-bold text-white text-base md:text-lg">"{currentFreq.ex}"</div>
                  <div className="text-xs text-slate-400">{currentFreq.exEn}</div>
                </div>

                {/* Duration Callout */}
                <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700 space-y-1 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span>⏳</span>
                    <span>Wie lange? (Duration):</span>
                  </div>
                  <div className="text-slate-300">
                    <strong>schon immer</strong> (since always) • <strong>lange</strong> (for a long time)
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSpeak(currentFreq.ex)}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold rounded-2xl text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Volume2 className="w-4 h-4" /> Listen to Example Audio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
