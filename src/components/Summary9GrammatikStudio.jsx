import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Calendar,
  Clock,
  Navigation,
  Compass,
  Plane,
  Heart,
  HelpCircle,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  Check,
  Award,
  AlertCircle
} from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary9GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('perfekt_sollen'); // 'perfekt_sollen', 'verben_dativ_pronouns', 'welch_dies', 'temporal_prepositions', 'ohne_gegen'

  // Station 1 state
  const [selectedSeinVerbKey, setSelectedSeinVerbKey] = useState('fahren'); // 'fahren', 'kommen', 'fliegen', 'schwimmen', 'bleiben'
  const [selectedSollenPerson, setSelectedSollenPerson] = useState('ich'); // 'ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'

  // Station 2 state
  const [selectedDativVerb, setSelectedDativVerb] = useState('gefallen'); // 'gefallen', 'gehoeren', 'schmecken', 'passen'
  const [selectedDativPronoun, setSelectedDativPronoun] = useState('mir'); // 'mir', 'dir', 'ihm', 'ihr', 'uns', 'euch', 'ihnen', 'Ihnen'

  // Station 3 state
  const [selectedWelchGender, setSelectedWelchGender] = useState('masculine'); // 'masculine', 'neuter', 'feminine', 'plural'

  // Station 4 state
  const [selectedTemporalPrep, setSelectedTemporalPrep] = useState('seit'); // 'vor', 'nach', 'seit', 'ab'

  // Station 5 state
  const [selectedAkkPrep, setSelectedAkkPrep] = useState('ohne'); // 'ohne', 'gegen'
  const [selectedObjectGender, setSelectedObjectGender] = useState('masculine'); // 'masculine', 'neuter', 'feminine', 'plural'

  // Station 1 Data: Perfekt mit sein & Modalverb sollen (Page 1)
  const seinVerbsData = {
    fahren: {
      inf: 'fahren (to drive / travel)',
      partizip: 'gefahren',
      example: 'Ich bin mit dem Bus nach Berlin gefahren.',
      en: 'I traveled to Berlin by bus.',
      sound: 'fahren - gefahren. Ich bin mit dem Bus nach Berlin gefahren.'
    },
    kommen: {
      inf: 'kommen (to come / arrive)',
      partizip: 'gekommen',
      example: 'Er ist gestern sehr spät nach Hause gekommen.',
      en: 'He came home very late yesterday.',
      sound: 'kommen - gekommen. Er ist gestern sehr spät nach Hause gekommen.'
    },
    fliegen: {
      inf: 'fliegen (to fly)',
      partizip: 'geflogen',
      example: 'Wir sind im Urlaub nach Spanien geflogen.',
      en: 'We flew to Spain on vacation.',
      sound: 'fliegen - geflogen. Wir sind im Urlaub nach Spanien geflogen.'
    },
    schwimmen: {
      inf: 'schwimmen (to swim)',
      partizip: 'geschwommen',
      example: 'Sie ist zwei Stunden im See geschwommen.',
      en: 'She swam in the lake for two hours.',
      sound: 'schwimmen - geschwommen. Sie ist im See geschwommen.'
    },
    bleiben: {
      inf: 'bleiben (to stay / remain - Exception!)',
      partizip: 'geblieben',
      example: 'Am Sonntag bin ich den ganzen Tag zu Hause geblieben.',
      en: 'On Sunday I stayed home all day.',
      sound: 'bleiben - geblieben. Ich bin zu Hause geblieben.'
    }
  };

  const sollenParadigm = {
    ich: { form: 'soll', note: 'I should (Base modal stem, zero ending)', isTwin: true },
    du: { form: 'sollst', note: 'you should (adds -st)', isTwin: false },
    er_sie_es: { form: 'soll', note: 'he/she/it should (IDENTICAL TWIN with ich!)', isTwin: true },
    wir: { form: 'sollen', note: 'we should (adds -en)', isTwin: false },
    ihr: { form: 'sollt', note: 'you all should (adds -t)', isTwin: false },
    sie_Sie: { form: 'sollen', note: 'they / You should (adds -en)', isTwin: false }
  };

  // Station 2 Data: Verben mit Dativ & Personalpronomen (Pages 2 & 5)
  const dativVerbsList = {
    gefallen: {
      verb: 'gefallen (to appeal to / like)',
      sample: 'Der Hut gefällt mir sehr gut.',
      en: 'The hat appeals to me very well (I like the hat).',
      sound: 'Der Hut gefällt mir. Das Kleid gefällt dir.'
    },
    gehoeren: {
      verb: 'gehören (to belong to)',
      sample: 'Das rote Auto gehört ihm.',
      en: 'The red car belongs to him.',
      sound: 'Das Buch gehört ihm. Das Auto gehört ihr.'
    },
    schmecken: {
      verb: 'schmecken (to taste good to)',
      sample: 'Die leckere Pizza schmeckt uns.',
      en: 'The delicious pizza tastes good to us.',
      sound: 'Die Pizza schmeckt uns. Wie schmeckt dir das Essen?'
    },
    passen: {
      verb: 'passen (to fit / suit size)',
      sample: 'Die schwarze Hose passt dir perfekt.',
      en: 'The black trousers fit you perfectly.',
      sound: 'Die Hose passt dir gut. Der Termin passt mir.'
    }
  };

  const dativPronounsData = [
    { nom: 'ich (I)', dat: 'mir', en: 'to/for me', example: 'Der Hut gefällt mir.' },
    { nom: 'du (you)', dat: 'dir', en: 'to/for you', example: 'Wie geht es dir?' },
    { nom: 'er (he)', dat: 'ihm', en: 'to/for him', example: 'Das Buch gehört ihm.' },
    { nom: 'sie (she)', dat: 'ihr', en: 'to/for her', example: 'Ich helfe ihr gern.' },
    { nom: 'es (it)', dat: 'ihm', en: 'to/for it', example: 'Das Kind weint, gib ihm Milch.' },
    { nom: 'wir (we)', dat: 'uns', en: 'to/for us', example: 'Die Suppe schmeckt uns.' },
    { nom: 'ihr (you all)', dat: 'euch', en: 'to/for you all', example: 'Ich danke euch sehr.' },
    { nom: 'sie (they)', dat: 'ihnen', en: 'to/for them', example: 'Das Haus gefällt ihnen.' },
    { nom: 'Sie (You formal)', dat: 'Ihnen', en: 'to/for You (formal)', example: 'Kann ich Ihnen helfen?' }
  ];

  // Station 3 Data: welch- & dies- across Cases (Pages 3 & 4)
  const welchDiesData = {
    masculine: {
      title: 'Maskulin (der Ort - place / der Baum - tree)',
      nom: { welch: 'welcher Ort', dies: 'dieser Baum', ending: '-er', note: 'Subject' },
      akk: { welch: 'welchen Ort', dies: 'diesen Baum', ending: '-en (CHANGES!)', note: 'Direct Object' },
      dat: { welch: 'welchem Ort', dies: 'diesem Baum', ending: '-em', note: 'Location / Dative' },
      sound: 'Nominativ: welcher Ort, dieser Baum. Akkusativ: welchen Ort, diesen Baum. Dativ: welchem Ort, diesem Baum.'
    },
    neuter: {
      title: 'Neutrum (das Hobby / das Auto - car)',
      nom: { welch: 'welches Hobby', dies: 'dieses Auto', ending: '-es', note: 'Subject' },
      akk: { welch: 'welches Hobby', dies: 'dieses Auto', ending: '-es (same as Nom)', note: 'Direct Object' },
      dat: { welch: 'welchem Hobby', dies: 'diesem Auto', ending: '-em (same as Maskulin Dat!)', note: 'Location / Dative' },
      sound: 'Nominativ: welches Hobby, dieses Auto. Akkusativ: welches Hobby, dieses Auto. Dativ: welchem Hobby, diesem Auto.'
    },
    feminine: {
      title: 'Feminin (die CD / die Straße - street)',
      nom: { welch: 'welche CD', dies: 'diese Straße', ending: '-e', note: 'Subject' },
      akk: { welch: 'welche CD', dies: 'diese Straße', ending: '-e (same as Nom)', note: 'Direct Object' },
      dat: { welch: 'welcher CD', dies: 'dieser Straße', ending: '-er', note: 'Location / Dative' },
      sound: 'Nominativ: welche CD, diese Straße. Akkusativ: welche CD, diese Straße. Dativ: welcher CD, dieser Straße.'
    },
    plural: {
      title: 'Plural (die Bücher - books / die Geschichten - stories)',
      nom: { welch: 'welche Bücher', dies: 'diese Geschichten', ending: '-e', note: 'Subject' },
      akk: { welch: 'welche Bücher', dies: 'diese Geschichten', ending: '-e', note: 'Direct Object' },
      dat: { welch: 'welchen Büchern', dies: 'diesen Geschichten', ending: '-en + -n*', note: 'Dativ Double-N Rule!' },
      sound: 'Nominativ: welche Bücher, diese Geschichten. Akkusativ: welche Bücher, diese Geschichten. Dativ: welchen Büchern, diesen Geschichten.'
    }
  };

  // Station 4 Data: Temporal Prepositions (Page 6 & 9)
  const temporalPrepsData = {
    vor: {
      prep: 'vor + Dativ (wann? - Completed Past / Ago)',
      concept: 'Marks an event that happened X time ago in the past:',
      masc: 'vor einem Monat (a month ago)',
      neut: 'vor einem Jahr (a year ago)',
      fem: 'vor einer Woche (a week ago)',
      plur: 'vor zwei Monaten (two months ago)',
      sentence: 'Ich bin vor einem Jahr nach Deutschland gekommen.',
      en: 'I came to Germany one year ago.',
      sound: 'vor einem Monat, vor einem Jahr, vor einer Woche, vor zwei Monaten. Ich bin vor einem Jahr nach Deutschland gekommen.'
    },
    nach: {
      prep: 'nach + Dativ (wann? - After X Time)',
      concept: 'Marks something happening following a period:',
      masc: 'nach einem Monat (after a month)',
      neut: 'nach einem Jahr (after a year)',
      fem: 'nach einer Woche (after a week)',
      plur: 'nach zwei Monaten (after two months)',
      sentence: 'Nach dem Deutschkurs mache ich die B1 Prüfung.',
      en: 'After the German course I will take the B1 exam.',
      sound: 'nach einem Monat, nach einem Jahr, nach einer Woche, nach zwei Monaten. Nach dem Deutschkurs mache ich die Prüfung.'
    },
    seit: {
      prep: 'seit + Dativ (seit wann? - Since / Still Ongoing)',
      concept: '⚡ Started in the past and is STILL CONTINUING today:',
      masc: 'seit einem Monat (for/since a month)',
      neut: 'seit einem Jahr (for/since a year)',
      fem: 'seit einer Woche (for/since a week)',
      plur: 'seit zwei Monaten (for/since two months)',
      sentence: 'Ich wohne seit zwei Jahren in Frankfurt und lerne Deutsch.',
      en: 'I have been living in Frankfurt for two years and am learning German.',
      sound: 'seit einem Monat, seit einem Jahr, seit einer Woche, seit zwei Monaten, seit Mai, seit 1971, seit Montag.'
    },
    ab: {
      prep: 'ab + Dativ (ab wann? - Starting From a Future Point)',
      concept: 'Marks the starting point in time going forward:',
      masc: 'ab nächstem Monat (from next month)',
      neut: 'ab nächstem Jahr (from next year)',
      fem: 'ab nächster Woche (from next week)',
      plur: 'ab zehnten Juni / ab Montag (from June 10th / from Monday)',
      sentence: 'Ab Montag arbeite ich bei Siemens.',
      en: 'Starting Monday, I work at Siemens.',
      sound: 'ab Montag, ab zehnten Juni, ab nächster Woche. Ab Montag arbeite ich bei Siemens.'
    }
  };

  // Station 5 Data: ohne & gegen + Akkusativ (Pages 7 & 8)
  const ohneGegenData = {
    ohne: {
      title: '🎒 modal (wie?) - ohne + Akkusativ (Without)',
      masculine: { form: 'ohne den / einen / deinen Rucksack', ending: '-en (CHANGES!)', sound: 'ohne den Rucksack, ohne einen Rucksack, ohne deinen Rucksack' },
      neuter: { form: 'ohne das / ein / dein Fahrrad', ending: 'das / ein / dein', sound: 'ohne das Fahrrad, ohne ein Fahrrad' },
      feminine: { form: 'ohne die / eine / deine Gitarre', ending: 'die / eine / deine', sound: 'ohne die Gitarre, ohne eine Gitarre' },
      plural: { form: 'ohne die / - / deine Fahrkarten', ending: 'die / deine', sound: 'ohne die Fahrkarten, ohne Fahrkarten' },
      example: 'Er fährt ohne seinen Rucksack und ohne Fahrkarten.',
      en: 'He travels without his backpack and without tickets.'
    },
    gegen: {
      title: '💥 lokal (wohin?) - gegen + Akkusativ (Against / Crashing into)',
      masculine: { form: 'gegen den / einen ... Baum', ending: '-en (CHANGES!)', sound: 'gegen den Baum, gegen einen Baum' },
      neuter: { form: 'gegen das / ein ... Haus', ending: 'das / ein', sound: 'gegen das Haus, gegen ein Haus' },
      feminine: { form: 'gegen die / eine ... Tür', ending: 'die / eine', sound: 'gegen die Tür, gegen eine Tür' },
      plural: { form: 'gegen die / - ... Türen', ending: 'die', sound: 'gegen die Türen' },
      example: 'Das Auto ist gegen den Baum gefahren.',
      en: 'The car crashed against the tree.'
    }
  };

  const handlePlaySound = (text) => {
    playChime();
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8 transition-all">
      {/* Studio Banner Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-teal-900 text-white p-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-400/90 text-amber-950 font-black text-xs uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Summary 9 Grammatik Studio
              </span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                A1 Master Summary
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Perfekt mit <em>sein</em>, Modalverb <em>sollen</em>, <em>welch-/dies-</em> & Time Prepositions
            </h2>
            <p className="text-indigo-100 text-sm mt-1 max-w-2xl">
              Master movement past tense (<em>bin gefahren</em>), doctor's advice (<em>ich soll</em>), Dative verbs (<em>gefällt mir</em>), question & demonstrative articles (<em>welcher / dieser</em>), time prepositions (<em>vor, nach, seit, ab</em>), and <em>ohne / gegen</em> (+ Akkusativ)!
            </p>
          </div>

          <button
            onClick={() =>
              handlePlaySound(
                'Willkommen im Grammatik Studio für Zusammenfassung 9! Lerne das Perfekt mit sein, das Modalverb sollen, Verben mit Dativ, welcher und dieser, die temporalen Präpositionen vor, nach, seit und ab sowie ohne und gegen mit Akkusativ.'
              )
            }
            className="self-start md:self-center flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm transition border border-white/20 shadow-md"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            Studio Intro
          </button>
        </div>

        {/* Station Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6 pt-4 border-t border-white/15">
          <button
            onClick={() => {
              setActiveStation('perfekt_sollen');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'perfekt_sollen'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Zap className="w-4 h-4" />
            1. sein & sollen
          </button>

          <button
            onClick={() => {
              setActiveStation('verben_dativ_pronouns');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'verben_dativ_pronouns'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Heart className="w-4 h-4" />
            2. Verben + Dativ
          </button>

          <button
            onClick={() => {
              setActiveStation('welch_dies');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'welch_dies'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Search className="w-4 h-4" />
            3. welch- & dies-
          </button>

          <button
            onClick={() => {
              setActiveStation('temporal_prepositions');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'temporal_prepositions'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            4. vor, nach, seit, ab
          </button>

          <button
            onClick={() => {
              setActiveStation('ohne_gegen');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm col-span-2 md:col-span-1 ${
              activeStation === 'ohne_gegen'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            5. ohne & gegen (Akk)
          </button>
        </div>
      </div>

      {/* Main Studio Interactive Content */}
      <div className="p-6 md:p-8 bg-slate-50/50">
        {/* =========================================================================
            STATION 1: PERFEKT MIT SEIN & MODALVERB SOLLEN (Page 1)
            ========================================================================= */}
        {activeStation === 'perfekt_sollen' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Page 1 • Perfekt mit sein & Modalverb sollen
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Movement Past Tense & Doctor's Advice Modal
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Verbs of movement take <strong>sein</strong> in the past! <strong>sollen</strong> expresses doctor's orders and advice, sharing identical twin forms for <em>ich</em> & <em>er/es/sie</em>.
              </p>
            </div>

            {/* Perfekt mit sein Verb Selector */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">
                    1. Perfekt mit <em>sein</em> (Movement & State Change)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Formula: <strong>sein (Position 2)</strong> + <strong>Partizip II (Satzende)</strong>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.keys(seinVerbsData).map((key) => {
                  const v = seinVerbsData[key];
                  const isSelected = selectedSeinVerbKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedSeinVerbKey(key);
                        playChime();
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-700 font-bold shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50'
                      }`}
                    >
                      <div className="text-xs font-mono">{key}</div>
                      <div className="text-sm font-extrabold mt-0.5">{v.partizip}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Sein Verb Card */}
              {(() => {
                const curSein = seinVerbsData[selectedSeinVerbKey];
                return (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-blue-900 uppercase">
                        Sample Sentence:
                      </div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        "{curSein.example}"
                      </div>
                      <div className="text-xs text-slate-600 italic mt-0.5">{curSein.en}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curSein.sound)}
                      className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition flex-shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Modalverb "sollen" Paradigm Grid */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">
                    2. Modalverb: <em>sollen</em> (Advice & Doctor's Orders)
                  </h4>
                  <p className="text-xs text-slate-500">
                    ⚡ Notice that <strong>ich soll</strong> and <strong>er/es/sie soll</strong> are identical twins with zero ending!
                  </p>
                </div>
                <button
                  onClick={() =>
                    handlePlaySound(
                      'sollen: ich soll, du sollst, er soll, wir sollen, ihr sollt, sie sollen. Du sollst viel Wasser trinken.'
                    )
                  }
                  className="flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition"
                >
                  <Volume2 className="w-4 h-4" /> Listen to Conjugation
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(sollenParadigm).map((pKey) => {
                  const p = sollenParadigm[pKey];
                  return (
                    <div
                      key={pKey}
                      onClick={() => {
                        setSelectedSollenPerson(pKey);
                        handlePlaySound(`${pKey.replace('_', ' ')} ${p.form}`);
                      }}
                      className={`p-3.5 rounded-xl border transition cursor-pointer ${
                        p.isTwin
                          ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>{pKey.replace('_', ' / ')}</span>
                        {p.isTwin && (
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded">
                            TWIN
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-black text-slate-900 mt-1 flex items-center justify-between">
                        <span className={p.isTwin ? 'text-amber-800' : 'text-slate-900'}>
                          {p.form}
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">{p.note}</div>
                    </div>
                  );
                })}
              </div>

              {/* Doctor Order Example */}
              <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-amber-300 font-bold uppercase">
                    Clinic / Doctor Advice Example:
                  </span>
                  <p className="font-bold text-sm mt-0.5">
                    "Der Arzt sagt, ich soll im Bett bleiben und die Tabletten nehmen."
                  </p>
                </div>
                <button
                  onClick={() =>
                    handlePlaySound(
                      'Der Arzt sagt, ich soll im Bett bleiben und die Tabletten nehmen.'
                    )
                  }
                  className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 2: VERBEN MIT DATIV & PRONOMEN MATRIX (Pages 2 & 5)
            ========================================================================= */}
        {activeStation === 'verben_dativ_pronouns' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  Pages 2 & 5 • Verben mit Dativ & Personalpronomen (Dativ)
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  <em>Der Hut gefällt mir</em> & The Dative Receiver Pronouns
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Special verbs like <em>gefallen, gehören, schmecken, passen</em> require a Dative person!
              </p>
            </div>

            {/* Verbs with Dativ Grid */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">
                    1. Special Verbs that Demand Dative
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.keys(dativVerbsList).map((vKey) => {
                  const v = dativVerbsList[vKey];
                  const isSelected = selectedDativVerb === vKey;
                  return (
                    <button
                      key={vKey}
                      onClick={() => {
                        setSelectedDativVerb(vKey);
                        playChime();
                      }}
                      className={`p-3.5 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-700 font-bold shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50'
                      }`}
                    >
                      <div className="text-xs font-mono">{vKey}</div>
                      <div className="text-xs font-extrabold mt-1 truncate">{v.verb.split(' ')[0]}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Dativ Verb Sample */}
              {(() => {
                const curV = dativVerbsList[selectedDativVerb];
                return (
                  <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-rose-900 uppercase">
                        {curV.verb}:
                      </div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        "{curV.sample}"
                      </div>
                      <div className="text-xs text-slate-600 italic mt-0.5">{curV.en}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curV.sample)}
                      className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow transition flex-shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Page 5: Personalpronomen im Dativ Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase">
                    Page 5 • Personalpronomen im Dativ
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    Nominativ ➔ Dativ Pronoun Transformation
                  </h4>
                </div>
                <button
                  onClick={() =>
                    handlePlaySound(
                      'mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen.'
                    )
                  }
                  className="flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition"
                >
                  <Volume2 className="w-4 h-4" /> Listen to Pronouns
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {dativPronounsData.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlePlaySound(`${p.nom} wird ${p.dat}. ${p.example}`)}
                    className="p-3.5 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-300 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500">{p.nom}</span>
                      <span className="text-xs font-bold text-indigo-600 font-mono">Dativ</span>
                    </div>
                    <div className="text-xl font-black text-indigo-700 mt-1 flex items-center justify-between">
                      <span>➔ {p.dat}</span>
                      <Volume2 className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-xs text-slate-600 mt-1 truncate">{p.example}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 3: FRAGEARTIKEL WELCH- & DIES- MATRIX (Pages 3 & 4)
            ========================================================================= */}
        {activeStation === 'welch_dies' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Pages 3 & 4 • Frageartikel "welch-" & Demonstrativartikel "dies-"
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Which? (<em>welch-</em>) vs This! (<em>dies-</em>) Across Cases
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                <em>welch-</em> and <em>dies-</em> copy the exact same endings as the definite article (<em>der, das, die</em>) across Nominativ, Akkusativ, and Dativ!
              </p>
            </div>

            {/* Gender Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setSelectedWelchGender('masculine');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedWelchGender === 'masculine'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Maskulin</div>
                <div className="text-sm font-extrabold">der Ort / der Baum</div>
              </button>

              <button
                onClick={() => {
                  setSelectedWelchGender('neuter');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedWelchGender === 'neuter'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Neutrum</div>
                <div className="text-sm font-extrabold">das Hobby / das Auto</div>
              </button>

              <button
                onClick={() => {
                  setSelectedWelchGender('feminine');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedWelchGender === 'feminine'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Feminin</div>
                <div className="text-sm font-extrabold">die CD / die Straße</div>
              </button>

              <button
                onClick={() => {
                  setSelectedWelchGender('plural');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedWelchGender === 'plural'
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Plural</div>
                <div className="text-sm font-extrabold">die Bücher / Geschichten</div>
              </button>
            </div>

            {/* Active Gender Comparison Matrix */}
            {(() => {
              const gData = welchDiesData[selectedWelchGender];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{gData.title}</h4>
                    </div>
                    <button
                      onClick={() => handlePlaySound(gData.sound)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm transition"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" /> Listen to 3 Cases
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Nominativ */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                          1. Nominativ (Subject)
                        </span>
                        <span className="text-xs font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">
                          {gData.nom.ending}
                        </span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900">
                        🔍 {gData.nom.welch}
                      </div>
                      <div className="text-base font-extrabold text-blue-700">
                        👉 {gData.nom.dies}
                      </div>
                    </div>

                    {/* Akkusativ */}
                    <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-900 uppercase tracking-wider">
                          2. Akkusativ (Direct Object)
                        </span>
                        <span className="text-xs font-mono bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded font-bold">
                          {gData.akk.ending}
                        </span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900">
                        🔍 {gData.akk.welch}
                      </div>
                      <div className="text-base font-extrabold text-amber-800">
                        👉 {gData.akk.dies}
                      </div>
                    </div>

                    {/* Dativ */}
                    <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-teal-900 uppercase tracking-wider">
                          3. Dativ (Receiver / Location)
                        </span>
                        <span className="text-xs font-mono bg-teal-200 text-teal-950 px-1.5 py-0.5 rounded font-bold">
                          {gData.dat.ending}
                        </span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900">
                        🔍 {gData.dat.welch}
                      </div>
                      <div className="text-base font-extrabold text-teal-800">
                        👉 {gData.dat.dies}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            STATION 4: TEMPORAL-PRÄPOSITIONEN MIT DATIV (Page 6 & 9)
            ========================================================================= */}
        {activeStation === 'temporal_prepositions' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  Page 6 & 9 • Temporale Präpositionen mit Dativ
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  <em>vor</em> (Ago), <em>nach</em> (After), <em>seit</em> (Since), <em>ab</em> (From)
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                All 4 temporal prepositions strictly command the <strong>DATIVE</strong> case!
              </p>
            </div>

            {/* Time Preposition Switcher */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.keys(temporalPrepsData).map((pKey) => {
                const p = temporalPrepsData[pKey];
                const isSelected = selectedTemporalPrep === pKey;
                return (
                  <button
                    key={pKey}
                    onClick={() => {
                      setSelectedTemporalPrep(pKey);
                      playChime();
                    }}
                    className={`p-3.5 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-700 font-bold shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
                    }`}
                  >
                    <div className="text-xs uppercase font-mono">{pKey} + Dativ</div>
                    <div className="text-sm font-extrabold mt-0.5">{p.prep.split(' ')[0]}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Time Preposition Card */}
            {(() => {
              const curP = temporalPrepsData[selectedTemporalPrep];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{curP.prep}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{curP.concept}</p>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curP.sound)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition flex-shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen to Audio
                    </button>
                  </div>

                  {/* 4 Gender Examples */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Maskulin (-em)</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{curP.masc}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Neutrum (-em)</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{curP.neut}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Feminin (-er)</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{curP.fem}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Plural (-en + -n)</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{curP.plur}</div>
                    </div>
                  </div>

                  {/* Sample Sentence */}
                  <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-purple-900 uppercase">Example:</div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        "{curP.sentence}"
                      </div>
                      <div className="text-xs text-slate-600 italic mt-0.5">{curP.en}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curP.sentence)}
                      className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            STATION 5: OHNE & GEGEN + AKKUSATIV (Pages 7 & 8)
            ========================================================================= */}
        {activeStation === 'ohne_gegen' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  Pages 7 & 8 • Präpositionen mit Akkusativ: ohne & gegen
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  <em>ohne</em> (Without) & <em>gegen</em> (Against / Crashing Into)
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Both <strong>ohne</strong> and <strong>gegen</strong> strictly command the <strong>AKKUSATIV</strong> case: masculine nouns change to <strong>-en</strong> (<em>ohne den Rucksack, gegen den Baum</em>)!
              </p>
            </div>

            {/* Preposition Selector */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedAkkPrep('ohne');
                  playChime();
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm transition border flex items-center justify-center gap-2 ${
                  selectedAkkPrep === 'ohne'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                }`}
              >
                <span>🎒 ohne + Akkusativ (without)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedAkkPrep('gegen');
                  playChime();
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm transition border flex items-center justify-center gap-2 ${
                  selectedAkkPrep === 'gegen'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                }`}
              >
                <span>💥 gegen + Akkusativ (against)</span>
              </button>
            </div>

            {/* Active Akk Preposition Breakdown */}
            {(() => {
              const aData = ohneGegenData[selectedAkkPrep];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{aData.title}</h4>
                      <p className="text-xs text-slate-500">
                        ⚡ Masculine is the ONLY gender that changes to <strong>-en</strong> in Akkusativ!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div
                      onClick={() => handlePlaySound(aData.masculine.sound)}
                      className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-300 hover:bg-amber-100 transition cursor-pointer"
                    >
                      <div className="text-[10px] font-mono font-bold text-amber-900 uppercase">
                        Maskulin (-en CHANGER!)
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {aData.masculine.form}
                      </div>
                    </div>

                    <div
                      onClick={() => handlePlaySound(aData.neuter.sound)}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Neutrum (das / ein)</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {aData.neuter.form}
                      </div>
                    </div>

                    <div
                      onClick={() => handlePlaySound(aData.feminine.sound)}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Feminin (die / eine)</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {aData.feminine.form}
                      </div>
                    </div>

                    <div
                      onClick={() => handlePlaySound(aData.plural.sound)}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Plural (die / keine)</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {aData.plural.form}
                      </div>
                    </div>
                  </div>

                  {/* Sample Sentence */}
                  <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-rose-300 uppercase">Example:</div>
                      <div className="text-base font-extrabold mt-0.5">"{aData.example}"</div>
                      <div className="text-xs text-slate-400 italic mt-0.5">{aData.en}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(aData.example)}
                      className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition shadow"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
