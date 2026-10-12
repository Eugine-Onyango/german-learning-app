import React, { useState } from 'react';
import { Volume2, Sparkles, User, Briefcase, Heart, Globe, Home, BookOpen, RotateCcw, CheckCircle2 } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';
import { A2_PROFESSIONS_LIST, A2_COUNTRIES_LIST, A2_HOBBIES_LIST } from '../data/germanLessonsA2';

export default function A2Lektion1ProfileStudio({ isSlowMode }) {
  // Preset profiles
  const profiles = {
    sam: {
      name: "Sam Müller",
      firstName: "Sam",
      lastName: "Müller",
      birthYear: "1992",
      age: "25",
      country: "China",
      countryPrep: "aus China",
      city: "Berlin",
      living: "in einer WG",
      motherTongue: "Englisch",
      secondLanguage: "Spanisch",
      germanLevel: "etwas Deutsch",
      job: "Student",
      jobType: "Teilzeit bei einem Restaurant",
      jobStatus: "angestellt",
      company: "einem Restaurant",
      hobbies: ["Fußball spielen", "fernsehen", "Musik hören"],
      abUndZu: "ins Kino gehen"
    },
    martin: {
      name: "Martin Müller",
      firstName: "Martin",
      lastName: "Müller",
      birthYear: "1988",
      age: "29",
      country: "Italien",
      countryPrep: "aus Mailand",
      city: "München",
      living: "mit meiner Familie",
      motherTongue: "Italienisch",
      secondLanguage: "Englisch",
      germanLevel: "etwas Deutsch",
      job: "Ingenieur",
      jobType: "Vollzeit",
      jobStatus: "angestellt",
      company: "Deutsche Bahn",
      hobbies: ["fernsehen", "Gitarre spielen"],
      abUndZu: "wandern"
    },
    sarah: {
      name: "Sarah Schmidt",
      firstName: "Sarah",
      lastName: "Schmidt",
      birthYear: "1995",
      age: "28",
      country: "die Türkei",
      countryPrep: "aus der Türkei",
      city: "Hamburg",
      living: "alleine",
      motherTongue: "Türkisch",
      secondLanguage: "Englisch",
      germanLevel: "gut Deutsch",
      job: "selbstständig",
      jobType: "selbstständig",
      jobStatus: "selbstständig",
      company: "meiner eigenen Agentur",
      hobbies: ["Musik hören", "kochen", "basteln"],
      abUndZu: "ins Fitnessstudio gehen"
    }
  };

  const [activeProfileKey, setActiveProfileKey] = useState('sam');
  const [profile, setProfile] = useState(profiles.sam);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('profile'); // 'profile', 'professions', 'countries', 'hobbies'

  const handleSelectPreset = (key) => {
    playChime('click');
    setActiveProfileKey(key);
    setProfile(profiles[key]);
  };

  // Generate complete natural A2 German self-introduction paragraph
  const generateIntroduction = () => {
    let p = profile;
    let sentences = [];
    
    // 1. Name
    sentences.push(`Hallo, ich bin ${p.name}. Mein Vorname ist ${p.firstName} und mein Familienname ist ${p.lastName}.`);
    
    // 2. Alter
    sentences.push(`Ich bin ${p.age} Jahre alt und ich bin im Jahr ${p.birthYear} geboren.`);
    
    // 3. Herkunft & Wohnort
    sentences.push(`Ich komme ${p.countryPrep} und ich wohne jetzt in ${p.city} ${p.living.startsWith('in') ? p.living : p.living}.`);
    
    // 4. Sprachen
    sentences.push(`Meine Muttersprache ist ${p.motherTongue}. Ich spreche auch sehr gut ${p.secondLanguage} und ${p.germanLevel}.`);
    
    // 5. Beruf
    if (p.jobStatus === 'selbstständig') {
      sentences.push(`Ich bin selbstständig.`);
    } else if (p.jobStatus === 'arbeitslos') {
      sentences.push(`Im Moment bin ich arbeitslos und suche gerade eine Stelle.`);
    } else if (p.jobType.includes('Teilzeit')) {
      sentences.push(`Ich bin ${p.job} und arbeite Teilzeit bei ${p.company} in ${p.city}.`);
    } else {
      sentences.push(`Ich arbeite als ${p.job} bei ${p.company} in ${p.city}.`);
    }
    
    // 6. Hobbys
    sentences.push(`Meine Hobbys sind ${p.hobbies.join(' und ')}.`);
    if (p.abUndZu) {
      sentences.push(`Für Hobbys habe ich nicht immer viel Zeit, aber ab und zu gehe ich ${p.abUndZu.replace('gehen', '').trim()}.`);
    }

    return sentences.join(' ');
  };

  const handleSpeakFullIntro = () => {
    playChime('click');
    setIsSpeaking(true);
    const text = generateIntroduction();
    speakGerman(text, isSlowMode, null, () => {
      setIsSpeaking(false);
    });
  };

  const handleSpeakPhrase = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>A2 Lektion 1 • Interaktives Profil Studio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Sich vorstellen wie ein Einheimischer
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Move past basic robotic phrases! Master natural A2 self-introductions: birth years, shared living (WG), part-time gigs (Teilzeit), company prepositions (bei BMW), and everyday hobby expressions (ab und zu).
          </p>
        </div>
        <div className="absolute -bottom-8 -right-8 text-9xl opacity-20 pointer-events-none select-none">
          🇩🇪
        </div>
      </div>

      {/* Preset Pickers */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border-2 border-stone-200 dark:border-slate-700 shadow-sm">
        <div className="text-xs font-black text-stone-500 dark:text-slate-400 uppercase tracking-wider">
          Load Authentic Curriculum Profiles:
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSelectPreset('sam')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeProfileKey === 'sam'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-200 hover:bg-stone-200'
            }`}
          >
            👨‍🎓 Sam Müller (Slide Profile)
          </button>
          <button
            onClick={() => handleSelectPreset('martin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeProfileKey === 'martin'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-200 hover:bg-stone-200'
            }`}
          >
            🚆 Martin Müller (Worksheet)
          </button>
          <button
            onClick={() => handleSelectPreset('sarah')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeProfileKey === 'sarah'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-200 hover:bg-stone-200'
            }`}
          >
            💼 Sarah Schmidt (Selbstständig)
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-2 border-b-2 border-stone-200 dark:border-slate-700 pb-2 overflow-x-auto">
        <button
          onClick={() => { setActiveCategoryTab('profile'); playChime('click'); }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeCategoryTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
          }`}
        >
          🎙️ Live Speech Studio
        </button>
        <button
          onClick={() => { setActiveCategoryTab('professions'); playChime('click'); }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeCategoryTab === 'professions'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
          }`}
        >
          👩‍🏫 16 Professions (der / die -in)
        </button>
        <button
          onClick={() => { setActiveCategoryTab('countries'); playChime('click'); }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeCategoryTab === 'countries'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
          }`}
        >
          🌍 22 Countries & Rebel Articles
        </button>
        <button
          onClick={() => { setActiveCategoryTab('hobbies'); playChime('click'); }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeCategoryTab === 'hobbies'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
          }`}
        >
          ⚽ 16 Hobbies & Free Time
        </button>
      </div>

      {/* TAB 1: Live Profile Studio */}
      {activeCategoryTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Form Editor */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-800 dark:text-slate-100 font-black text-lg border-b border-stone-100 dark:border-slate-700 pb-3">
              <User className="w-5 h-5 text-emerald-600" />
              <span>Customize Profile Data</span>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Vorname (First Name)</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value, name: `${e.target.value} ${profile.lastName}` })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Familienname (Surname)</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value, name: `${profile.firstName} ${e.target.value}` })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                />
              </div>
            </div>

            {/* Age & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Alter (Years Old)</label>
                <input
                  type="text"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Geboren (Birth Year)</label>
                <input
                  type="text"
                  value={profile.birthYear}
                  onChange={(e) => setProfile({ ...profile, birthYear: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                />
              </div>
            </div>

            {/* Country & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Land & Herkunft</label>
                <select
                  value={profile.country}
                  onChange={(e) => {
                    const found = A2_COUNTRIES_LIST.find(c => c.german === e.target.value);
                    setProfile({
                      ...profile,
                      country: e.target.value,
                      countryPrep: found ? found.prep.split('(')[0].trim() : `aus ${e.target.value}`
                    });
                  }}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                >
                  {A2_COUNTRIES_LIST.map(c => (
                    <option key={c.german} value={c.german}>{c.german} ({c.english})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Wohnort (City)</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                />
              </div>
            </div>

            {/* Living Arrangement */}
            <div>
              <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Wohnsituation (Living Style)</label>
              <select
                value={profile.living}
                onChange={(e) => setProfile({ ...profile, living: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
              >
                <option value="in einer WG">in einer WG (Shared flat with roommates)</option>
                <option value="mit meiner Familie">mit meiner Familie (With my family)</option>
                <option value="alleine">alleine / allein (Alone in my own place)</option>
              </select>
            </div>

            {/* Employment Status & Company */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Beruf / Job Status</label>
                <select
                  value={profile.jobStatus}
                  onChange={(e) => setProfile({ ...profile, jobStatus: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                >
                  <option value="angestellt">Angestellt (Employed at company)</option>
                  <option value="selbstständig">Selbstständig (Self-employed / Freelancer)</option>
                  <option value="arbeitslos">Arbeitslos (Seeking a job)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-500 dark:text-slate-400">Company (bei...)</label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Spoken Introduction Preview Card */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-6 sm:p-7 rounded-3xl border-3 border-amber-300 dark:border-amber-500/40 shadow-md relative">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  <span className="font-black text-amber-950 dark:text-amber-300 text-lg">
                    Full A2 Monologue Preview
                  </span>
                </div>
                <button
                  onClick={handleSpeakFullIntro}
                  disabled={isSpeaking}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black shadow-md cursor-pointer transition-transform active:scale-95 ${
                    isSpeaking
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isSpeaking ? 'Speaking...' : 'Listen to Full Intro'}</span>
                </button>
              </div>

              {/* Monologue Text */}
              <div className="mt-4 p-4 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-amber-200/60 dark:border-slate-700 space-y-2 text-sm sm:text-base font-medium text-stone-800 dark:text-slate-100 leading-relaxed shadow-inner">
                <p>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">Hallo,</span> ich bin{' '}
                  <span className="underline decoration-emerald-400 font-bold">{profile.name}</span>. Mein Vorname ist{' '}
                  <span className="font-bold">{profile.firstName}</span> und mein Familienname ist{' '}
                  <span className="font-bold">{profile.lastName}</span>.
                </p>
                <p>
                  Ich bin <span className="font-bold">{profile.age} Jahre alt</span> und ich bin im Jahr{' '}
                  <span className="font-bold">{profile.birthYear} geboren</span>.
                </p>
                <p>
                  Ich komme <span className="font-bold text-blue-600 dark:text-blue-400">{profile.countryPrep}</span> und ich wohne in{' '}
                  <span className="font-bold">{profile.city}</span> ({profile.living}).
                </p>
                <p>
                  Meine Muttersprache ist <span className="font-bold">{profile.motherTongue}</span>. Ich spreche auch sehr gut{' '}
                  <span className="font-bold">{profile.secondLanguage}</span> und{' '}
                  <span className="font-bold">{profile.germanLevel}</span>.
                </p>
                <p>
                  {profile.jobStatus === 'selbstständig' && <span>Ich bin <strong>selbstständig</strong>.</span>}
                  {profile.jobStatus === 'arbeitslos' && <span>Ich bin <strong>arbeitslos</strong> und suche gerade eine Stelle.</span>}
                  {profile.jobStatus === 'angestellt' && (
                    <span>
                      Ich arbeite als <strong>{profile.job}</strong> bei <strong>{profile.company}</strong> in <strong>{profile.city}</strong>.
                    </span>
                  )}
                </p>
                <p>
                  Meine Hobbys sind <span className="font-bold">{profile.hobbies.join(' und ')}</span>.
                  {profile.abUndZu && (
                    <span> Ab und zu gehe ich <strong className="text-amber-700 dark:text-amber-300">{profile.abUndZu}</strong>.</span>
                  )}
                </p>
              </div>

              {/* Breakdown Quick Chips */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div
                  onClick={() => handleSpeakPhrase(`Mein Vorname ist ${profile.firstName} und Familienname ist ${profile.lastName}`)}
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 hover:border-emerald-400 cursor-pointer transition-colors shadow-xs"
                >
                  <div className="text-[10px] text-stone-400 font-bold">1. NAME</div>
                  <div className="font-bold truncate text-stone-800 dark:text-slate-100">{profile.firstName} {profile.lastName}</div>
                </div>
                <div
                  onClick={() => handleSpeakPhrase(`Ich bin ${profile.birthYear} geboren`)}
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 hover:border-emerald-400 cursor-pointer transition-colors shadow-xs"
                >
                  <div className="text-[10px] text-stone-400 font-bold">2. ALTER</div>
                  <div className="font-bold truncate text-stone-800 dark:text-slate-100">Geboren {profile.birthYear}</div>
                </div>
                <div
                  onClick={() => handleSpeakPhrase(profile.countryPrep)}
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 hover:border-emerald-400 cursor-pointer transition-colors shadow-xs"
                >
                  <div className="text-[10px] text-stone-400 font-bold">3. LAND</div>
                  <div className="font-bold truncate text-stone-800 dark:text-slate-100">{profile.countryPrep}</div>
                </div>
                <div
                  onClick={() => handleSpeakPhrase(`Ich wohne ${profile.living}`)}
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 hover:border-emerald-400 cursor-pointer transition-colors shadow-xs"
                >
                  <div className="text-[10px] text-stone-400 font-bold">4. WOHNORT</div>
                  <div className="font-bold truncate text-stone-800 dark:text-slate-100">{profile.living}</div>
                </div>
                <div
                  onClick={() => handleSpeakPhrase(`Meine Muttersprache ist ${profile.motherTongue}`)}
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 hover:border-emerald-400 cursor-pointer transition-colors shadow-xs"
                >
                  <div className="text-[10px] text-stone-400 font-bold">5. SPRACHEN</div>
                  <div className="font-bold truncate text-stone-800 dark:text-slate-100">{profile.motherTongue}</div>
                </div>
                <div
                  onClick={() => handleSpeakPhrase(`Ab und zu gehe ich ${profile.abUndZu}`)}
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 hover:border-emerald-400 cursor-pointer transition-colors shadow-xs"
                >
                  <div className="text-[10px] text-stone-400 font-bold">6. HOBBY</div>
                  <div className="font-bold truncate text-stone-800 dark:text-slate-100">ab und zu: {profile.abUndZu}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 16 Professions */}
      {activeCategoryTab === 'professions' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-slate-700 pb-3">
            <div>
              <h3 className="font-black text-xl text-stone-900 dark:text-white">
                Die 16 Berufe (Professions in Male vs. Female Pairs)
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Notice the golden rule: add <strong>-in</strong> for female professionals! Tap any pair to listen.
              </p>
            </div>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-bold">
              16 Core Pairs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {A2_PROFESSIONS_LIST.map((prof, idx) => (
              <div
                key={idx}
                onClick={() => handleSpeakPhrase(`${prof.male}. ${prof.female}.`)}
                className="p-3.5 bg-stone-50 dark:bg-slate-700/60 rounded-2xl border border-stone-200 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-400 cursor-pointer transition-all hover:scale-101 shadow-xs group"
              >
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  {prof.english}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-300">
                      👨 {prof.male}
                    </div>
                    <div className="text-xs font-bold text-rose-600 dark:text-rose-300">
                      👩 {prof.female}
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 22 Countries */}
      {activeCategoryTab === 'countries' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="border-b border-stone-100 dark:border-slate-700 pb-3">
            <h3 className="font-black text-xl text-stone-900 dark:text-white">
              22 Länder & Origin Prepositions
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Most take just <code>aus [Land]</code> without articles. Watch out for <strong>aus den USA</strong> (plural) and <strong>aus der Türkei / Schweiz</strong> (feminine)!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {A2_COUNTRIES_LIST.map((c, idx) => (
              <div
                key={idx}
                onClick={() => handleSpeakPhrase(`Ich komme ${c.prep.split('(')[0].trim()}`)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  c.prep.includes('Rebel')
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                    : 'bg-stone-50 dark:bg-slate-700/60 border-stone-200 dark:border-slate-600 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900 dark:text-white">{c.german}</span>
                  <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <div className="text-xs text-stone-500 dark:text-slate-400">{c.english}</div>
                <div className="mt-1 text-xs font-black text-emerald-700 dark:text-emerald-400">
                  {c.prep}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 16 Hobbies */}
      {activeCategoryTab === 'hobbies' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="border-b border-stone-100 dark:border-slate-700 pb-3">
            <h3 className="font-black text-xl text-stone-900 dark:text-white">
              16 Hobbys & Freizeitaktivitäten
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Practice saying: <em>"Meine Hobbys sind..."</em> or <em>"In meiner Freizeit [Verb in Pos 2] ich..."</em>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {A2_HOBBIES_LIST.map((h, idx) => (
              <div
                key={idx}
                onClick={() => handleSpeakPhrase(`In meiner Freizeit gehe ich gern ${h.german}`)}
                className="p-3.5 bg-stone-50 dark:bg-slate-700/60 rounded-2xl border border-stone-200 dark:border-slate-600 hover:border-emerald-400 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900 dark:text-white">🎮 {h.german}</span>
                  <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <div className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">{h.english}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
