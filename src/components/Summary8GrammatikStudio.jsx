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
  Bus,
  Plane,
  Train,
  Building2,
  Phone,
  CloudRain,
  Sun,
  ShieldCheck,
  Zap,
  Layers,
  MapPin,
  Hotel
} from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary8GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('werden_perfekt'); // 'werden_perfekt', 'partizip_satzklammer', 'mit_zu_dativ', 'nach_bei_von', 'comic_redemittel'

  // Station 1 state
  const [selectedWerdenPerson, setSelectedWerdenPerson] = useState('du'); // 'ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'
  const [selectedPerfektVerb, setSelectedPerfektVerb] = useState('gesagt'); // 'gesagt', 'gesehen', 'gebracht', 'gearbeitet'

  // Station 2 state
  const [selectedBlueprintCategory, setSelectedBlueprintCategory] = useState('regelmaessig'); // 'regelmaessig', 'unregelmaessig', 'mischverben'

  // Station 3 state
  const [selectedTransportGender, setSelectedTransportGender] = useState('bus'); // 'bus', 'taxi', 'tram', 'trams'
  const [selectedZuDestination, setSelectedZuDestination] = useState('flughafen'); // 'flughafen', 'sportgeschaeft', 'apotheke', 'parkplaetze', 'julia'

  // Station 4 state
  const [activeLocationMode, setActiveLocationMode] = useState('nach'); // 'nach', 'bei', 'von', 'route'

  // Station 5 state
  const [activeRedemittelTab, setActiveRedemittelTab] = useState('hotel'); // 'hotel', 'travel', 'weather', 'tasks', 'phone'

  // Station 1 Data: Verb werden & Perfekt mit haben (Page 1)
  const werdenParadigm = {
    ich: { form: 'werde', note: 'I become / get', vowelChange: false },
    du: { form: 'wirst', note: 'you become (e ➔ i vowel shift!)', vowelChange: true },
    er_sie_es: { form: 'wird', note: 'he/she/it becomes (e ➔ i shift!)', vowelChange: true },
    wir: { form: 'werden', note: 'we become', vowelChange: false },
    ihr: { form: 'werdet', note: 'you all become', vowelChange: false },
    sie_Sie: { form: 'werden', note: 'they / You become', vowelChange: false }
  };

  const perfektHabenData = {
    gesagt: { verb: 'sagen ➔ gesagt', phrase: 'Ich habe die Wahrheit gesagt.', en: 'I said the truth.', sound: 'Ich habe gesagt.' },
    gesehen: { verb: 'sehen ➔ gesehen', phrase: 'Wir haben den Kölner Dom gesehen.', en: 'We saw the Cologne Cathedral.', sound: 'Wir haben den Kölner Dom gesehen.' },
    gebracht: { verb: 'bringen ➔ gebracht', phrase: 'Er hat seiner Mutter Blumen gebracht.', en: 'He brought flowers to his mother.', sound: 'Er hat Blumen gebracht.' },
    gearbeitet: { verb: 'arbeiten ➔ gearbeitet', phrase: 'Sie haben gestern lange gearbeitet.', en: 'They worked for a long time yesterday.', sound: 'Sie haben gestern gearbeitet.' }
  };

  // Station 2 Data: 3 Partizip II Blueprints (Pages 2 & 3)
  const partizipBlueprints = {
    regelmaessig: {
      title: '1. Regelmäßige Verben (Weak / Regular Verbs)',
      formula: 'ge- + Verbstamm + -(e)t',
      badge: 'ge-...-(e)t',
      verbs: [
        { inf: 'machen', part: 'gemacht', note: 'Standard ge- + mach + -t' },
        { inf: 'arbeiten', part: 'gearbeitet', note: 'Stem ends in -t ➔ cushion -et!' },
        { inf: 'fragen', part: 'gefragt', note: 'Standard ge- + frag + -t' },
        { inf: 'warten', part: 'gewartet', note: 'Stem ends in -t ➔ cushion -et!' }
      ],
      sound: 'machen - gemacht, arbeiten - gearbeitet, fragen - gefragt, warten - gewartet.'
    },
    unregelmaessig: {
      title: '2. Unregelmäßige Verben (Strong / Irregular Verbs)',
      formula: 'ge- + veränderter Stamm + -en',
      badge: 'ge-...-en (Vokalwechsel)',
      verbs: [
        { inf: 'trinken', part: 'getrunken', note: 'i ➔ u vowel shift + -en' },
        { inf: 'nehmen', part: 'genommen', note: 'e ➔ o + double m + -en' },
        { inf: 'treffen', part: 'getroffen', note: 'e ➔ o + double f + -en' },
        { inf: 'sehen', part: 'gesehen', note: 'e stays + -en ending' }
      ],
      sound: 'trinken - getrunken, nehmen - genommen, treffen - getroffen, sehen - gesehen.'
    },
    mischverben: {
      title: '3. Mischverben (Hybrid / Mixed Verbs)',
      formula: 'ge- + veränderter Stamm + -t',
      badge: 'ge-...-t (Hybrid)',
      verbs: [
        { inf: 'bringen', part: 'gebracht', note: 'i ➔ a + ch + regular -t ending!' },
        { inf: 'denken', part: 'gedacht', note: 'e ➔ a + ch + regular -t ending!' }
      ],
      sound: 'bringen - gebracht, denken - gedacht.'
    }
  };

  // Station 3 Data: mit + Dativ & zu + Dativ (Pages 4 & 5)
  const transportData = {
    bus: { target: 'mit dem Bus', gender: 'Maskulin (der Bus)', icon: '🚌', example: 'Ich fahre jeden Morgen mit dem Bus zur Schule.', sound: 'mit dem Bus. Ich fahre mit dem Bus.' },
    taxi: { target: 'mit dem Taxi', gender: 'Neutrum (das Taxi)', icon: '🚕', example: 'Wir fahren schnell mit dem Taxi zum Flughafen.', sound: 'mit dem Taxi. Wir fahren mit dem Taxi.' },
    tram: { target: 'mit der Straßenbahn', gender: 'Feminin (die Straßenbahn)', icon: '🚋', example: 'Sie fährt mit der Straßenbahn ins Zentrum.', sound: 'mit der Straßenbahn. Sie fährt mit der Straßenbahn.' },
    trams: { target: 'mit den Straßenbahnen', gender: 'Plural (die Straßenbahnen)', icon: '🚊', example: 'In Berlin fährt man bequem mit den Straßenbahnen.', sound: 'mit den Straßenbahnen. Man fährt mit den Straßenbahnen.' }
  };

  const zuDestinationData = {
    flughafen: { target: 'zum Flughafen', contraction: 'zu + dem = zum', gender: 'Maskulin (der Flughafen)', sound: 'zum Flughafen. Wir fahren zum Flughafen.' },
    sportgeschaeft: { target: 'zum Sportgeschäft', contraction: 'zu + dem = zum', gender: 'Neutrum (das Sportgeschäft)', sound: 'zum Sportgeschäft. Ich gehe zum Sportgeschäft.' },
    apotheke: { target: 'zur Apotheke', contraction: 'zu + der = zur', gender: 'Feminin (die Apotheke)', sound: 'zur Apotheke. Gehst du bitte zur Apotheke?' },
    parkplaetze: { target: 'zu den Parkplätzen', contraction: 'zu + den (Plural)', gender: 'Plural (die Parkplätze)', sound: 'zu den Parkplätzen. Er fährt zu den Parkplätzen.' },
    julia: { target: 'zu Julia', contraction: 'zu + Name (ohne Artikel)', gender: 'Person / Name', sound: 'zu Julia. Ich gehe heute Abend zu Julia.' }
  };

  // Station 4 Data: nach, bei + Dativ, von + Dativ (Pages 6 & 7)
  const locationCards = {
    nach: {
      title: '✈️ nach (wohin? - Geographical Targets & Directions)',
      rule: 'Used for cities, countries without articles, continents, and compass turns:',
      examples: [
        { de: 'nach Mannheim / nach Nairobi', en: 'to Mannheim / to Nairobi (Cities)' },
        { de: 'nach Deutschland / nach Kenia', en: 'to Germany / to Kenya (Countries without article)' },
        { de: 'nach Europa / nach Afrika', en: 'to Europe / to Africa (Continents)' },
        { de: 'nach Norden / nach Süden', en: 'to the north / to the south (Compass directions)' },
        { de: 'nach links / nach rechts', en: 'to the left / to the right (Turn directions)' }
      ],
      sound: 'nach Mannheim, nach Deutschland, nach Europa, nach Norden, nach links, nach rechts.'
    },
    bei: {
      title: '📍 bei + Dativ (wo? - Location at Person / Doctor / Company)',
      rule: 'Used to express where you currently are (at someone’s place, doctor, or company):',
      examples: [
        { de: 'beim (bei dem) Arzt / Friseur', en: 'at the male doctor’s / barber’s (Maskulin)' },
        { de: 'beim (bei dem) Kind', en: 'with the child (Neutrum)' },
        { de: 'bei der Ärztin / bei der Lehrerin', en: 'at the female doctor’s (Feminin)' },
        { de: 'bei den Freunden', en: 'at friends’ place (Plural)' },
        { de: 'bei Julia / bei Siemens / bei BMW', en: 'at Julia’s / at Siemens / at BMW (Names & Companies without article)' }
      ],
      sound: 'beim Arzt, beim Kind, bei der Ärztin, bei den Freunden, bei Julia, bei Siemens.'
    },
    von: {
      title: '🛣️ von + Dativ (woher? - Origin Point)',
      rule: 'Used to express where you are coming from:',
      examples: [
        { de: 'vom (von dem) Flughafen', en: 'from the airport (Maskulin)' },
        { de: 'vom (von dem) Sportgeschäft', en: 'from the sports shop (Neutrum)' },
        { de: 'von der Apotheke', en: 'from the pharmacy (Feminin)' },
        { de: 'von den Parkplätzen', en: 'from the parking lots (Plural)' },
        { de: 'auch: aus dem Flughafen / aus der Türkei', en: 'also: out of the airport / out of Turkey (enclosed/article countries)' }
      ],
      sound: 'vom Flughafen, vom Sportgeschäft, von der Apotheke, von den Parkplätzen, aus der Türkei.'
    },
    route: {
      title: '🗺️ von ... zu / nach (Complete Routes)',
      rule: 'Combines starting point (von) with local destination (zu) or city destination (nach):',
      examples: [
        { de: 'vom Flughafen zum Parkplatz', en: 'from the airport to the parking lot (local to local)' },
        { de: 'vom Flughafen nach München', en: 'from the airport to Munich (local to city)' },
        { de: 'von der Apotheke nach Hause', en: 'from the pharmacy to home' },
        { de: 'vom Arzt zu Julia', en: 'from the doctor to Julia’s place' }
      ],
      sound: 'vom Flughafen zum Parkplatz. vom Flughafen nach München. vom Arzt zu Julia.'
    }
  };

  // Station 5 Data: Redemittel Categories (Page 8)
  const redemittelCategories = {
    hotel: {
      title: '🏨 Zimmerreservierung (Hotel Booking)',
      badge: 'Reception & Check-in',
      phrases: [
        { de: 'Möchten Sie ein Einzel- oder ein Doppelzimmer?', en: 'Would you like a single or a double room?', sound: 'Möchten Sie ein Einzel- oder ein Doppelzimmer?' },
        { de: 'Mit Bad oder ohne Bad?', en: 'With bathroom or without bathroom?', sound: 'Mit Bad oder ohne Bad?' },
        { de: 'Wie lange möchten Sie bleiben?', en: 'How long would you like to stay?', sound: 'Wie lange möchten Sie bleiben?' },
        { de: 'Möchten Sie das Zimmer mit Frühstück?', en: 'Would you like the room with breakfast?', sound: 'Möchten Sie das Zimmer mit Frühstück?' },
        { de: 'Können Sie noch einmal Ihren Namen sagen?', en: 'Could you please say your name once again?', sound: 'Können Sie noch einmal Ihren Namen sagen?' },
        { de: 'Zahlen Sie mit Karte oder bar?', en: 'Are you paying by card or in cash?', sound: 'Zahlen Sie mit Karte oder bar?' }
      ]
    },
    travel: {
      title: '🚆 Fahrplanauskunft & Reisen (Transit)',
      badge: 'Train & Airport',
      phrases: [
        { de: 'Ich möchte mit dem Zug nach München fahren.', en: 'I would like to travel to Munich by train.', sound: 'Ich möchte mit dem Zug nach München fahren.' },
        { de: 'Ich möchte nach Frankfurt fliegen.', en: 'I would like to fly to Frankfurt.', sound: 'Ich möchte nach Frankfurt fliegen.' },
        { de: 'Wann fährt der Zug ab?', en: 'When does the train depart?', sound: 'Wann fährt der Zug ab?' },
        { de: 'Wann kommt das Flugzeug an?', en: 'When does the airplane arrive?', sound: 'Wann kommt das Flugzeug an?' },
        { de: 'Wie lange dauert die Bahnfahrt / der Flug?', en: 'How long does the train ride / flight take?', sound: 'Wie lange dauert die Bahnfahrt?' },
        { de: 'Wie viel kostet die Bahnfahrt?', en: 'How much does the train ticket cost?', sound: 'Wie viel kostet die Bahnfahrt?' }
      ]
    },
    weather: {
      title: '⛅ über das Wetter sprechen (Weather)',
      badge: 'Forecast & Degrees',
      phrases: [
        { de: 'Wie ist / wird das Wetter morgen?', en: 'How is / will the weather be tomorrow?', sound: 'Wie wird das Wetter morgen?' },
        { de: 'Wie wird das Wetter morgen in Berlin?', en: 'How will the weather be in Berlin tomorrow?', sound: 'Wie wird das Wetter morgen in Berlin?' },
        { de: 'Es sind 25 Grad. Es regnet stark.', en: 'It is 25 degrees. It is raining heavily.', sound: 'Es sind 25 Grad. Es regnet stark.' },
        { de: 'Es ist warm. Die Sonne scheint.', en: 'It is warm. The sun is shining.', sound: 'Es ist warm. Die Sonne scheint.' }
      ]
    },
    tasks: {
      title: '🛒 über Aufgaben & Verabredungen sprechen (Errands & Meetups)',
      badge: 'Chores & Timing',
      phrases: [
        { de: 'Wir müssen noch einkaufen.', en: 'We still need to go shopping.', sound: 'Wir müssen noch einkaufen.' },
        { de: 'Gehst du bitte zum Supermarkt / zur Apotheke?', en: 'Are you going to the supermarket / pharmacy please?', sound: 'Gehst du bitte zur Apotheke?' },
        { de: 'Kannst du das machen? - Ja, das kann ich machen.', en: 'Can you do that? - Yes, I can do that.', sound: 'Kannst du das machen? Ja, das kann ich machen.' },
        { de: 'Nein, ich habe leider keine Zeit.', en: 'No, unfortunately I have no time.', sound: 'Nein, ich habe leider keine Zeit.' },
        { de: 'Ich bin beim Arzt. Und wo bist du?', en: 'I am at the doctor’s. And where are you?', sound: 'Ich bin beim Arzt. Und wo bist du?' },
        { de: 'Ich warte schon eine Stunde!', en: 'I have already been waiting for an hour!', sound: 'Ich warte schon eine Stunde!' },
        { de: 'Ich komme sofort. Vom Flughafen brauche ich nur 20 Minuten.', en: 'I’m coming right away. From the airport I only need 20 minutes.', sound: 'Ich komme sofort. Vom Flughafen brauche ich nur 20 Minuten.' }
      ]
    },
    phone: {
      title: '📞 Nützliche Sätze am Telefon (Phone Etiquette)',
      badge: 'Professional Calls',
      phrases: [
        { de: 'Guten Tag, Firma Rohrmann GmbH. Was kann ich für Sie tun?', en: 'Hello, Rohrmann Company. What can I do for you?', sound: 'Guten Tag, Firma Rohrmann GmbH. Was kann ich für Sie tun?' },
        { de: 'Guten Tag / Hallo, hier spricht Alex Becker.', en: 'Hello, Alex Becker speaking here.', sound: 'Guten Tag, hier spricht Alex Becker.' },
        { de: 'Auf Wiederhören!', en: 'Goodbye! (On the telephone)', sound: 'Auf Wiederhören!' }
      ]
    }
  };

  const handlePlaySound = (text) => {
    playChime();
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8 transition-all">
      {/* Studio Banner Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-900 text-white p-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-400/90 text-amber-950 font-black text-xs uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Summary 8 Grammatik Studio
              </span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                A1.2 Master Review
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              werden, Perfekt mit haben, 3 Partizip Baupläne & Spatial Prepositions
            </h2>
            <p className="text-teal-100 text-sm mt-1 max-w-2xl">
              Master the chameleon verb <em>werden</em>, past tense Satzklammer, regular/irregular/mixed Partizip II formulas, transit prepositions (<em>mit, zu, nach, bei, von</em>), and full travel Redemittel!
            </p>
          </div>

          <button
            onClick={() =>
              handlePlaySound(
                'Willkommen im Grammatik Studio für Zusammenfassung 8! Lerne das Verb werden, das Perfekt mit haben, die 3 Partizip-Baupläne, die Präpositionen mit, zu, nach, bei und von sowie das Reise-Toolkit.'
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
              setActiveStation('werden_perfekt');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'werden_perfekt'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            1. werden & Perfekt
          </button>

          <button
            onClick={() => {
              setActiveStation('partizip_satzklammer');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'partizip_satzklammer'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. 3 Partizip Baupläne
          </button>

          <button
            onClick={() => {
              setActiveStation('mit_zu_dativ');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'mit_zu_dativ'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bus className="w-4 h-4" />
            3. mit & zu + Dativ
          </button>

          <button
            onClick={() => {
              setActiveStation('nach_bei_von');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'nach_bei_von'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Navigation className="w-4 h-4" />
            4. nach, bei & von
          </button>

          <button
            onClick={() => {
              setActiveStation('comic_redemittel');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm col-span-2 md:col-span-1 ${
              activeStation === 'comic_redemittel'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Hotel className="w-4 h-4" />
            5. Comic & Redemittel
          </button>
        </div>
      </div>

      {/* Main Studio Interactive Content */}
      <div className="p-6 md:p-8 bg-slate-50/50">
        {/* =========================================================================
            STATION 1: WERDEN & PERFEKT MIT HABEN (Page 1)
            ========================================================================= */}
        {activeStation === 'werden_perfekt' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Page 1 • Verb: Präsens werden & Perfekt mit haben
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  The Chameleon Verb <em>werden</em> & The <em>haben</em> Past Tense
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                <em>werden</em> means "to become" and features a sneaky $e \rightarrow i$ vowel shift in the 2nd and 3rd person singular (<em>du wirst</em>, <em>er wird</em>)!
              </p>
            </div>

            {/* Verb "werden" Conjugation Matrix */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">
                    Konjugation: <em>werden</em> (Präsens)
                  </h4>
                  <p className="text-xs text-slate-500">
                    ⚡ Watch out for the irregular vowel shift for <strong>du</strong> and <strong>er/es/sie</strong>!
                  </p>
                </div>
                <button
                  onClick={() =>
                    handlePlaySound(
                      'werden: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.'
                    )
                  }
                  className="flex items-center gap-1.5 text-xs font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition"
                >
                  <Volume2 className="w-4 h-4" /> Listen to All 6 Forms
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(werdenParadigm).map((key) => {
                  const p = werdenParadigm[key];
                  const isShift = p.vowelChange;
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        setSelectedWerdenPerson(key);
                        handlePlaySound(`${key.replace('_', ' ')} ${p.form}`);
                      }}
                      className={`p-3.5 rounded-xl border transition cursor-pointer ${
                        isShift
                          ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>{key.replace('_', ' / ')}</span>
                        {isShift && (
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded">
                            e ➔ i SHIFT!
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-black text-slate-900 mt-1 flex items-center justify-between">
                        <span className={isShift ? 'text-amber-800' : 'text-slate-900'}>
                          {p.form}
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">{p.note}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Perfekt mit haben Showcase */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase">
                    Page 1 • Perfekt mit haben
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    Helping Verb "haben" + Partizip II
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.keys(perfektHabenData).map((vKey) => {
                  const item = perfektHabenData[vKey];
                  const isSelected = selectedPerfektVerb === vKey;
                  return (
                    <button
                      key={vKey}
                      onClick={() => {
                        setSelectedPerfektVerb(vKey);
                        playChime();
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-700 font-bold shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                      }`}
                    >
                      <div className="text-xs font-mono">{item.verb}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Perfekt Card */}
              {(() => {
                const curP = perfektHabenData[selectedPerfektVerb];
                return (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-indigo-900 uppercase">
                        Sample Sentence:
                      </div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        "{curP.phrase}"
                      </div>
                      <div className="text-xs text-slate-600 italic mt-0.5">{curP.en}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curP.phrase)}
                      className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow transition flex-shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 2: 3 PARTIZIP II BAUPLÄNE & SATZKLAMMER (Pages 2 & 3)
            ========================================================================= */}
        {activeStation === 'partizip_satzklammer' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  Pages 2 & 3 • Die 3 Partizip II Baupläne & Satzklammer
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Regular (Weak), Irregular (Strong) & Mixed (Hybrid) Blueprints
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Master how German creates past participles: <em>ge-...-t</em> vs <em>ge-...-en</em> vs <em>ge-...-t with vowel change</em>!
              </p>
            </div>

            {/* Blueprint Category Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setSelectedBlueprintCategory('regelmaessig');
                  playChime();
                }}
                className={`p-4 rounded-xl text-left border transition ${
                  selectedBlueprintCategory === 'regelmaessig'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">1. Regelmäßig</div>
                <div className="text-base font-extrabold mt-1">ge- ... -(e)t</div>
                <div className={`text-xs mt-1 ${selectedBlueprintCategory === 'regelmaessig' ? 'text-emerald-100' : 'text-slate-500'}`}>
                  machen ➔ gemacht, arbeiten ➔ gearbeitet
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedBlueprintCategory('unregelmaessig');
                  playChime();
                }}
                className={`p-4 rounded-xl text-left border transition ${
                  selectedBlueprintCategory === 'unregelmaessig'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">2. Unregelmäßig</div>
                <div className="text-base font-extrabold mt-1">ge- ... -en</div>
                <div className={`text-xs mt-1 ${selectedBlueprintCategory === 'unregelmaessig' ? 'text-blue-100' : 'text-slate-500'}`}>
                  trinken ➔ getrunken, nehmen ➔ genommen
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedBlueprintCategory('mischverben');
                  playChime();
                }}
                className={`p-4 rounded-xl text-left border transition ${
                  selectedBlueprintCategory === 'mischverben'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">3. Mischverben</div>
                <div className="text-base font-extrabold mt-1">ge- ... -t (Vokalwechsel)</div>
                <div className={`text-xs mt-1 ${selectedBlueprintCategory === 'mischverben' ? 'text-purple-100' : 'text-slate-500'}`}>
                  bringen ➔ gebracht, denken ➔ gedacht
                </div>
              </button>
            </div>

            {/* Active Category Breakdown */}
            {(() => {
              const bCat = partizipBlueprints[selectedBlueprintCategory];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{bCat.title}</h4>
                      <span className="inline-block mt-1 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                        Formula: {bCat.formula}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePlaySound(bCat.sound)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm transition"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" /> Listen to Group Verbs
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {bCat.verbs.map((v, idx) => (
                      <div
                        key={idx}
                        onClick={() => handlePlaySound(`${v.inf} wird ${v.part}`)}
                        className="p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition cursor-pointer"
                      >
                        <div className="text-xs font-mono text-slate-500">Inf: {v.inf}</div>
                        <div className="text-lg font-black text-slate-900 mt-1 flex items-center justify-between">
                          <span>{v.part}</span>
                          <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">{v.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Page 3: Satzklammer Visualizer */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Page 3 • Satzklammer im Perfekt (The Sentence Bracket)
                </span>
                <span className="text-xs font-mono text-slate-400">Position 2 ➔ Ende</span>
              </div>

              <p className="text-xs text-slate-300">
                In German main clauses, the conjugated auxiliary verb sits in <strong>Position 2</strong>, and the Partizip II locks the sentence at the <strong>very end</strong>!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Position 1 (Subject)</div>
                  <div className="text-base font-black text-white mt-1">Ich</div>
                </div>

                <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg ring-2 ring-emerald-400 text-center">
                  <div className="text-[10px] uppercase text-emerald-100">Position 2 (HILFSVERB)</div>
                  <div className="text-base font-black mt-1">habe</div>
                </div>

                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Mittelfeld (Object)</div>
                  <div className="text-base font-black text-slate-200 mt-1">den Dom</div>
                </div>

                <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-lg ring-2 ring-amber-300 text-center">
                  <div className="text-[10px] uppercase text-amber-950 font-bold">Ende (PARTIZIP II)</div>
                  <div className="text-base font-black mt-1">gesehen.</div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handlePlaySound('Ich habe gestern den Dom gesehen.')}
                  className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow transition"
                >
                  <Volume2 className="w-4 h-4" /> Listen: "Ich habe den Dom gesehen"
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 3: PRÄPOSITIONEN: MIT & ZU + DATIV (Pages 4 & 5)
            ========================================================================= */}
        {activeStation === 'mit_zu_dativ' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Pages 4 & 5 • Präpositionen: mit (wie?) & zu (wohin?) + Dativ
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Means of Transport (<em>mit dem Bus</em>) & Destinations (<em>zum Flughafen</em>)
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Both <strong>mit</strong> (by/with) and <strong>zu</strong> (to) command the <strong>DATIVE</strong> case without exception!
              </p>
            </div>

            {/* Page 4: mit + Dativ */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 uppercase">
                    Page 4 • modal (wie?) - mit + Dativ
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    How do you travel? (Means of Transportation)
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.keys(transportData).map((key) => {
                  const item = transportData[key];
                  const isSelected = selectedTransportGender === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedTransportGender(key);
                        playChime();
                      }}
                      className={`p-3.5 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-700 shadow-md font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                      }`}
                    >
                      <div className="text-xl">{item.icon}</div>
                      <div className="text-xs font-mono mt-1">{item.gender}</div>
                      <div className="text-sm font-extrabold mt-0.5">{item.target}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Transport Example */}
              {(() => {
                const curT = transportData[selectedTransportGender];
                return (
                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-teal-900 uppercase">Example:</div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        "{curT.example}"
                      </div>
                      <div className="text-xs text-slate-600 italic mt-0.5">{curT.sound}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curT.example)}
                      className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow transition flex-shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Page 5: zu + Dativ */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 uppercase">
                    Page 5 • lokal (wohin?) - zu + Dativ
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    Where are you heading to? (Local targets & persons)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Contractions: <strong>zu + dem = zum</strong> • <strong>zu + der = zur</strong>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.keys(zuDestinationData).map((key) => {
                  const item = zuDestinationData[key];
                  const isSelected = selectedZuDestination === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedZuDestination(key);
                        playChime();
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-cyan-700 text-white border-cyan-800 shadow-md font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-cyan-50'
                      }`}
                    >
                      <div className="text-[10px] font-mono">{item.contraction}</div>
                      <div className="text-xs font-extrabold mt-0.5 truncate">{item.target}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Zu Destination Playback */}
              {(() => {
                const curZu = zuDestinationData[selectedZuDestination];
                return (
                  <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-cyan-900 uppercase">
                        {curZu.gender}:
                      </div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        {curZu.target} ({curZu.contraction})
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curZu.sound)}
                      className="p-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl shadow transition flex-shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 4: NACH, BEI + DATIV & VON + DATIV (Pages 6 & 7)
            ========================================================================= */}
        {activeStation === 'nach_bei_von' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                  Pages 6 & 7 • nach (wohin?) vs bei (wo?) vs von (woher?)
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Destination, Location & Origin Matrix
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Understand the 3 directions: <strong>nach</strong> for cities/countries, <strong>bei</strong> for where you are, and <strong>von</strong> for where you came from!
              </p>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setActiveLocationMode('nach');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  activeLocationMode === 'nach'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">wohin?</div>
                <div className="text-sm font-extrabold">1. nach (Cities/Countries)</div>
              </button>

              <button
                onClick={() => {
                  setActiveLocationMode('bei');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  activeLocationMode === 'bei'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">wo?</div>
                <div className="text-sm font-extrabold">2. bei + Dativ (At person/co)</div>
              </button>

              <button
                onClick={() => {
                  setActiveLocationMode('von');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  activeLocationMode === 'von'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">woher?</div>
                <div className="text-sm font-extrabold">3. von + Dativ (From)</div>
              </button>

              <button
                onClick={() => {
                  setActiveLocationMode('route');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  activeLocationMode === 'route'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Route</div>
                <div className="text-sm font-extrabold">4. von ... zu / nach</div>
              </button>
            </div>

            {/* Active Card Content */}
            {(() => {
              const card = locationCards[activeLocationMode];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{card.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{card.rule}</p>
                    </div>
                    <button
                      onClick={() => handlePlaySound(card.sound)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm transition flex-shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" /> Listen to All Examples
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {card.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between gap-4 transition"
                      >
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">{ex.de}</div>
                          <div className="text-xs text-slate-500 italic mt-0.5">{ex.en}</div>
                        </div>
                        <button
                          onClick={() => handlePlaySound(ex.de)}
                          className="p-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition flex-shrink-0 shadow-sm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            STATION 5: CARTOON COMIC & COMPLETE REDEMITTEL TOOLKIT (Pages 8 & 9)
            ========================================================================= */}
        {activeStation === 'comic_redemittel' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Pages 8 & 9 • Comic & Practical REDEMITTEL Toolkit
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  11-Day Rain Vacation Joke & The Complete Travel Toolkit
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Everything you need for booking hotels, train timetables, weather discussions, office tasks, and telephone etiquette!
              </p>
            </div>

            {/* Page 9: Cartoon Comic Spotlight */}
            <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-black/20 text-white text-xs font-black uppercase rounded-lg">
                  Page 9 Cartoon Comic • Vacation Rain Joke
                </span>
                <span className="text-2xl">☕🌧️☕</span>
              </div>

              <div className="bg-white rounded-xl p-4 space-y-2 text-slate-900 shadow">
                <div className="flex items-start gap-2">
                  <span className="font-black text-amber-800 text-xs uppercase bg-amber-100 px-2 py-0.5 rounded flex-shrink-0">
                    Man 1 (Curious):
                  </span>
                  <span className="font-extrabold text-sm">
                    "Wie oft hat es in Ihrem Urlaub geregnet?"
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-black text-blue-800 text-xs uppercase bg-blue-100 px-2 py-0.5 rounded flex-shrink-0">
                    Man 2 (Deadpan):
                  </span>
                  <span className="font-extrabold text-sm">
                    "Nur zweimal, einmal fünf und einmal sechs Tage lang."
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic border-t pt-2 mt-2">
                  💡 <strong>The Joke:</strong> He says it only rained "twice" (nur zweimal), but the first rain lasted 5 days and the second lasted 6 days — meaning 11 consecutive days of rain ruined his entire holiday!
                </p>
              </div>

              <button
                onClick={() =>
                  handlePlaySound(
                    'Wie oft hat es in Ihrem Urlaub geregnet? Nur zweimal, einmal fünf und einmal sechs Tage lang!'
                  )
                }
                className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition"
              >
                <Volume2 className="w-4 h-4 text-amber-400" /> Listen to the Comic Dialogue
              </button>
            </div>

            {/* Page 8: REDEMITTEL Tabs */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 uppercase">
                    Page 8 • Complete REDEMITTEL Toolkit
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    5 Practical Communication Categories
                  </h4>
                </div>
              </div>

              {/* Category Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.keys(redemittelCategories).map((catKey) => {
                  const cat = redemittelCategories[catKey];
                  const isSelected = activeRedemittelTab === catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => {
                        setActiveRedemittelTab(catKey);
                        playChime();
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-700 font-bold shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono opacity-80">{cat.badge}</div>
                      <div className="text-xs font-extrabold mt-0.5 truncate">{cat.title.split(' ')[1] || cat.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Category Phrases */}
              {(() => {
                const curCat = redemittelCategories[activeRedemittelTab];
                return (
                  <div className="space-y-2.5 pt-2">
                    {curCat.phrases.map((phrase, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 bg-slate-50 hover:bg-teal-50/50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 transition"
                      >
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">{phrase.de}</div>
                          <div className="text-xs text-slate-500 italic mt-0.5">{phrase.en}</div>
                        </div>
                        <button
                          onClick={() => handlePlaySound(phrase.sound)}
                          className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition flex-shrink-0 shadow-sm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
