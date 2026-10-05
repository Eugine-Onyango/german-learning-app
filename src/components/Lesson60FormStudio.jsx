import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson60FormStudio({ isSlowMode }) {
  const [activeSubTab, setActiveSubTab] = useState('formsLab');

  // Form Simulator State (Defaulting to Slide 26 Hotel Winter Berlin)
  const [formData, setFormData] = useState({
    preset: 'hotelWinter',
    vorname: 'Anja',
    nachname: 'Möller',
    strasse: 'Schillerstraße',
    hausnummer: '2',
    plz: '12345',
    ort: 'München',
    land: 'Deutschland',
    email: 'anja.moeller@example.de',
    telefon: '+49 89 1234567',
    handy: '+49 171 9876543',
    muttersprache: 'Deutsch',
    staatsangehoerigkeit: 'Deutsch',
    alter: '36',
    geburtsdatum: '1988-04-15',
    geburtsort: 'München',
    geburtsland: 'Deutschland',
    familienstand: 'verheiratet',
    geschlecht: 'weiblich',
    beruf: 'Lehrerin',
    anzahlGaeste: '3',
    anreise: '2018-09-23',
    abreise: '2018-09-26',
    zimmerTyp: 'Doppelzimmer',
    verpflegung: 'mit Frühstück',
    sonderwuensche: 'Ein Extrabett für unseren Sohn',
    zahlungsart: 'Kreditkarte',
    kursbeginn: '2018-09-30',
    pruefungstermin: '2018-09-25',
    unterschriftOrt: 'München',
    unterschriftDatum: '2018-09-07'
  });

  const [copied, setCopied] = useState(false);

  // Tourist Info Letter Generator State
  const [city, setCity] = useState('Wien');
  const [travelCompanion, setTravelCompanion] = useState('mit meinem Mann');
  const [travelMonth, setTravelMonth] = useState('im August');
  const [roomChoice, setRoomChoice] = useState('ein Doppelzimmer');
  const [includeHotelRec, setIncludeHotelRec] = useState(true);
  const [includeMap, setIncludeMap] = useState(true);
  const [includeCulture, setIncludeCulture] = useState(true);
  const [includeSights, setIncludeSights] = useState(true);
  const [senderName, setSenderName] = useState('Emma Braun');

  const applyPreset = (presetKey) => {
    if (presetKey === 'hotelWinter') {
      setFormData({
        preset: 'hotelWinter',
        vorname: 'Anja',
        nachname: 'Möller',
        strasse: 'Schillerstraße',
        hausnummer: '2',
        plz: '12345',
        ort: 'München',
        land: 'Deutschland',
        email: 'anja.moeller@web.de',
        telefon: '+49 89 554433',
        handy: '+49 171 1234567',
        muttersprache: 'Deutsch',
        staatsangehoerigkeit: 'Deutsch',
        alter: '38',
        geburtsdatum: '1986-06-12',
        geburtsort: 'München',
        geburtsland: 'Deutschland',
        familienstand: 'verheiratet',
        geschlecht: 'weiblich',
        beruf: 'Ärztin',
        anzahlGaeste: '3',
        anreise: '2018-09-23',
        abreise: '2018-09-26',
        zimmerTyp: 'Doppelzimmer',
        verpflegung: 'mit Frühstück',
        sonderwuensche: 'Ein Extrabett',
        zahlungsart: 'Kreditkarte',
        kursbeginn: '',
        pruefungstermin: '',
        unterschriftOrt: 'München',
        unterschriftDatum: '2018-09-05'
      });
    } else if (presetKey === 'goetheCourse') {
      setFormData({
        preset: 'goetheCourse',
        vorname: 'David',
        nachname: 'Schmidt',
        strasse: 'Goethestraße',
        hausnummer: '10',
        plz: '12345',
        ort: 'Berlin',
        land: 'Deutschland',
        email: 'davidschmidt@abc.com',
        telefon: '033-1234567',
        handy: '1512345678',
        muttersprache: 'Englisch',
        staatsangehoerigkeit: 'Deutsch',
        alter: '33',
        geburtsdatum: '1985-04-28',
        geburtsort: 'London',
        geburtsland: 'Großbritannien',
        familienstand: 'ledig',
        geschlecht: 'männlich',
        beruf: 'Zahnarzt',
        anzahlGaeste: '1',
        anreise: '2018-09-20',
        abreise: '2018-12-15',
        zimmerTyp: 'Einzelzimmer',
        verpflegung: 'mit Frühstück',
        sonderwuensche: 'Gitarre spielen, Fußball spielen (Hobbys)',
        zahlungsart: 'Überweisung',
        kursbeginn: '2018-09-30',
        pruefungstermin: '2018-09-25',
        unterschriftOrt: 'Berlin',
        unterschriftDatum: '2018-09-07'
      });
    } else if (presetKey === 'nairobiTraveler') {
      setFormData({
        preset: 'nairobiTraveler',
        vorname: 'Brian',
        nachname: 'Otieno',
        strasse: 'Harambee Avenue',
        hausnummer: '45',
        plz: '00100',
        ort: 'Nairobi',
        land: 'Kenia',
        email: 'brian.otieno@safari.co.ke',
        telefon: '+254 20 223344',
        handy: '+254 712 345678',
        muttersprache: 'Englisch / Swahili',
        staatsangehoerigkeit: 'Kenianisch',
        alter: '29',
        geburtsdatum: '1995-11-20',
        geburtsort: 'Nairobi',
        geburtsland: 'Kenia',
        familienstand: 'ledig',
        geschlecht: 'männlich',
        beruf: 'Software-Ingenieur',
        anzahlGaeste: '2',
        anreise: '2026-11-10',
        abreise: '2026-11-20',
        zimmerTyp: 'Doppelzimmer',
        verpflegung: 'Halbpension',
        sonderwuensche: 'Flughafen-Abholung und Zimmer im oberen Stockwerk',
        zahlungsart: 'Kreditkarte',
        kursbeginn: '2026-11-15',
        pruefungstermin: '2026-11-18',
        unterschriftOrt: 'Nairobi',
        unterschriftDatum: '2026-10-15'
      });
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate Letter Text
  const generatedLetter = `Sehr geehrte Damen und Herren,

ich möchte ${travelMonth} ${travelCompanion} nach ${city} reisen. Wir möchten ${roomChoice} reservieren.${includeHotelRec ? ' Können Sie uns gute Hotels empfehlen?' : ''}

${includeMap && includeCulture ? 'Schicken Sie uns auch bitte einen Stadtplan und ein Kulturprogramm.' : includeMap ? 'Schicken Sie uns bitte einen Stadtplan.' : includeCulture ? 'Schicken Sie uns bitte ein Kulturprogramm.' : ''}${includeSights ? ' Wir freuen uns auch über Informationen zu den wichtigsten Sehenswürdigkeiten.' : ''}

Vielen Dank. Mit freundlichen Grüßen
${senderName}`;

  const copyLetter = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span>📝</span> Lesson 60 Studio: Touristeninfo & Formulare
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-tight">
            German Form Mastery & Tourist Information Desk
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Fill out official German registration sheets (<em>Anmeldeformulare</em>), decode German civil bureaucracy (<em>Familienstand</em>, <em>PLZ</em>, <em>Geburtsort</em>, <em>Geschlecht</em>), draft polite letters to city tourism offices (<em>Wien</em>, <em>Berlin</em>), and master travel noun-verb pairs!
          </p>
        </div>

        {/* Sub-tab Navigation Buttons */}
        <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-emerald-700/40 relative z-10">
          <button
            onClick={() => setActiveSubTab('formsLab')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'formsLab'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-700/50'
            }`}
          >
            <span>📋</span> Interactive Form Simulator (Formular-Labor)
          </button>
          <button
            onClick={() => setActiveSubTab('letterStudio')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'letterStudio'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-700/50'
            }`}
          >
            <span>🗺️</span> Tourist Info Letter Studio (Touristeninfo)
          </button>
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'matrix'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-700/50'
            }`}
          >
            <span>📊</span> Officialese Cheat-Sheet & Travel Verbs
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: Interactive Form Simulator (Formular-Labor) */}
      {/* ========================================================= */}
      {activeSubTab === 'formsLab' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Preset Selector Bar */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <span>📑</span> Choose a Scenario Preset:
              </h3>
              <p className="text-stone-500 text-xs mt-0.5">
                Practice filling official German forms with real exam tasks and customizable fields.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset('hotelWinter')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  formData.preset === 'hotelWinter'
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                🏨 Slide 26: Hotel Winter Berlin
              </button>
              <button
                onClick={() => applyPreset('goetheCourse')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  formData.preset === 'goetheCourse'
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                🎓 Goethe Course Registration (David)
              </button>
              <button
                onClick={() => applyPreset('nairobiTraveler')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  formData.preset === 'nairobiTraveler'
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                🇰🇪 Nairobi Traveler (Brian)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Input Fields Panel */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <h4 className="font-extrabold text-stone-900 text-base uppercase tracking-wider">
                    Official Form Editor (Formular-Eingabe)
                  </h4>
                </div>
                <button
                  onClick={() => speakGerman('das Anmeldeformular ausfüllen', isSlowMode)}
                  className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>🔊</span> Listen: "Formular ausfüllen"
                </button>
              </div>

              {/* SECTION 1: Personal Data */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-teal-800 uppercase tracking-wider bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
                  <span>👤</span> 1. Angaben zur Person (Personal Details)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        Nachname / Familienname <button onClick={() => speakGerman('der Nachname oder Familienname', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                      </span>
                      <span className="text-[10px] text-stone-500 font-normal">Surname</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nachname}
                      onChange={(e) => handleFieldChange('nachname', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        Vorname <button onClick={() => speakGerman('der Vorname', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                      </span>
                      <span className="text-[10px] text-stone-500 font-normal">First name</span>
                    </label>
                    <input
                      type="text"
                      value={formData.vorname}
                      onChange={(e) => handleFieldChange('vorname', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Gender & Marital Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        Geschlecht <button onClick={() => speakGerman('das Geschlecht: männlich oder weiblich', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                      </span>
                      <span className="text-[10px] text-stone-500 font-normal">Gender</span>
                    </label>
                    <div className="flex gap-4 p-2 bg-stone-50 rounded-xl border border-stone-200">
                      <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-stone-700">
                        <input
                          type="radio"
                          name="geschlecht"
                          value="weiblich"
                          checked={formData.geschlecht === 'weiblich'}
                          onChange={() => handleFieldChange('geschlecht', 'weiblich')}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span>weiblich (w)</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-stone-700">
                        <input
                          type="radio"
                          name="geschlecht"
                          value="männlich"
                          checked={formData.geschlecht === 'männlich'}
                          onChange={() => handleFieldChange('geschlecht', 'männlich')}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span>männlich (m)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        Familienstand <button onClick={() => speakGerman('der Familienstand: ledig, verheiratet, verwitwet, geschieden', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                      </span>
                      <span className="text-[10px] text-stone-500 font-normal">Civil status</span>
                    </label>
                    <select
                      value={formData.familienstand}
                      onChange={(e) => handleFieldChange('familienstand', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                    >
                      <option value="ledig">ledig (single)</option>
                      <option value="verheiratet">verheiratet (married)</option>
                      <option value="geschieden">geschieden (divorced)</option>
                      <option value="verwitwet">verwitwet (widowed)</option>
                    </select>
                  </div>
                </div>

                {/* Birth details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Geburtsdatum <button onClick={() => speakGerman('das Geburtsdatum', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="date"
                      value={formData.geburtsdatum}
                      onChange={(e) => handleFieldChange('geburtsdatum', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Geburtsort <button onClick={() => speakGerman('der Geburtsort', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.geburtsort}
                      onChange={(e) => handleFieldChange('geburtsort', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Staatsangehörigkeit <button onClick={() => speakGerman('die Staatsangehörigkeit', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.staatsangehoerigkeit}
                      onChange={(e) => handleFieldChange('staatsangehoerigkeit', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Address & Contact */}
              <div className="space-y-4 pt-2 border-t border-stone-200">
                <div className="flex items-center gap-2 text-xs font-extrabold text-teal-800 uppercase tracking-wider bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
                  <span>📮</span> 2. Adresse & Kontaktdaten (Address & Contact)
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  <div className="col-span-2 sm:col-span-3">
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Straße <button onClick={() => speakGerman('die Straße', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.strasse}
                      onChange={(e) => handleFieldChange('strasse', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Hausnummer <button onClick={() => speakGerman('die Hausnummer', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.hausnummer}
                      onChange={(e) => handleFieldChange('hausnummer', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      PLZ (Postleitzahl) <button onClick={() => speakGerman('die Postleitzahl', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.plz}
                      onChange={(e) => handleFieldChange('plz', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Ort (Stadt) <button onClick={() => speakGerman('der Ort', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.ort}
                      onChange={(e) => handleFieldChange('ort', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Land <button onClick={() => speakGerman('das Land', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.land}
                      onChange={(e) => handleFieldChange('land', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      E-Mail-Adresse <button onClick={() => speakGerman('die E-Mail-Adresse', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Telefon / Handy <button onClick={() => speakGerman('die Telefonnummer und Handynummer', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.handy}
                      onChange={(e) => handleFieldChange('handy', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Booking / Travel Options */}
              <div className="space-y-4 pt-2 border-t border-stone-200">
                <div className="flex items-center gap-2 text-xs font-extrabold text-teal-800 uppercase tracking-wider bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
                  <span>🏨</span> 3. Buchungsdetails & Sonderwünsche (Booking & Stay)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Anzahl der Gäste <button onClick={() => speakGerman('die Anzahl der Gäste', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="number"
                      value={formData.anzahlGaeste}
                      onChange={(e) => handleFieldChange('anzahlGaeste', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Anreisedatum <button onClick={() => speakGerman('das Anreisedatum', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="date"
                      value={formData.anreise}
                      onChange={(e) => handleFieldChange('anreise', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Abreisedatum <button onClick={() => speakGerman('das Abreisedatum', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="date"
                      value={formData.abreise}
                      onChange={(e) => handleFieldChange('abreise', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Art der Zimmer
                    </label>
                    <select
                      value={formData.zimmerTyp}
                      onChange={(e) => handleFieldChange('zimmerTyp', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                    >
                      <option value="Einzelzimmer">Einzelzimmer (EZ)</option>
                      <option value="Doppelzimmer">Doppelzimmer (DZ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Verpflegung
                    </label>
                    <select
                      value={formData.verpflegung}
                      onChange={(e) => handleFieldChange('verpflegung', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                    >
                      <option value="mit Frühstück">mit Frühstück</option>
                      <option value="Halbpension">Halbpension (HP)</option>
                      <option value="Vollpension">Vollpension (VP)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Sonderwünsche <button onClick={() => speakGerman('die Sonderwünsche', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <input
                      type="text"
                      value={formData.sonderwuensche}
                      onChange={(e) => handleFieldChange('sonderwuensche', e.target.value)}
                      placeholder="z.B. Ein Extrabett, Ruhiges Zimmer"
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      Zahlungsart <button onClick={() => playLessonAudio('die Zahlungsart: Kreditkarte oder bar', isSlowMode)} className="text-teal-600 hover:text-teal-800">🔊</button>
                    </label>
                    <div className="flex gap-4 p-2 bg-stone-50 rounded-xl border border-stone-200">
                      <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-stone-700">
                        <input
                          type="radio"
                          name="zahlungsart"
                          value="Kreditkarte"
                          checked={formData.zahlungsart === 'Kreditkarte'}
                          onChange={() => handleFieldChange('zahlungsart', 'Kreditkarte')}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span>Kreditkarte</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-stone-700">
                        <input
                          type="radio"
                          name="zahlungsart"
                          value="bar"
                          checked={formData.zahlungsart === 'bar'}
                          onChange={() => handleFieldChange('zahlungsart', 'bar')}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span>bar (cash)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Signature Footer */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div className="flex items-center gap-2 text-xs font-extrabold text-teal-800 uppercase tracking-wider bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
                  <span>✍️</span> 4. Ort, Datum & Unterschrift (Document Validation)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Ort des Ausfüllens
                    </label>
                    <input
                      type="text"
                      value={formData.unterschriftOrt}
                      onChange={(e) => handleFieldChange('unterschriftOrt', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Datum des Ausfüllens
                    </label>
                    <input
                      type="date"
                      value={formData.unterschriftDatum}
                      onChange={(e) => handleFieldChange('unterschriftDatum', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Form Preview (Official Document Mockup) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-stone-50 to-amber-50/40 p-6 rounded-3xl border-2 border-stone-300 shadow-lg space-y-5 relative">
              <div className="flex items-center justify-between border-b-2 border-stone-800 pb-3">
                <div>
                  <h4 className="font-serif font-black text-stone-900 text-lg uppercase tracking-wider">
                    {formData.preset === 'hotelWinter'
                      ? 'HOTEL WINTER BERLIN'
                      : formData.preset === 'goetheCourse'
                      ? 'GOETHE-INSTITUT ANMELDUNG'
                      : 'ANMELDEFORMULAR'}
                  </h4>
                  <p className="text-[11px] font-mono text-stone-600">
                    Amtliches Dokument / Offizieller Anmeldebogen
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-stone-400 flex items-center justify-center text-stone-500 text-xs font-bold rotate-12">
                  STAMP
                </div>
              </div>

              {/* Form Grid Presentation */}
              <div className="space-y-3 text-xs bg-white p-4 rounded-2xl border border-stone-200 shadow-inner">
                <div className="grid grid-cols-2 gap-2 border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Name, Vorname:</span>
                    <span className="font-extrabold text-stone-900">{formData.nachname}, {formData.vorname}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Geschlecht:</span>
                    <span className="font-extrabold text-stone-900">{formData.geschlecht === 'weiblich' ? '[X] weiblich' : '[X] männlich'}</span>
                  </div>
                </div>

                <div className="border-b border-stone-100 pb-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Straße, Hausnummer:</span>
                  <span className="font-bold text-stone-800">{formData.strasse} {formData.hausnummer}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">PLZ, Ort:</span>
                    <span className="font-bold text-stone-800">{formData.plz}, {formData.ort}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Land:</span>
                    <span className="font-bold text-stone-800">{formData.land}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Familienstand:</span>
                    <span className="font-bold text-stone-800">{formData.familienstand}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Staatsangehörigkeit:</span>
                    <span className="font-bold text-stone-800">{formData.staatsangehoerigkeit}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Gäste:</span>
                    <span className="font-bold text-stone-800">{formData.anzahlGaeste}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Anreise:</span>
                    <span className="font-bold text-stone-800">{formData.anreise}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Abreise:</span>
                    <span className="font-bold text-stone-800">{formData.abreise}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Zimmertyp:</span>
                    <span className="font-extrabold text-teal-700">{formData.zimmerTyp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Verpflegung:</span>
                    <span className="font-extrabold text-teal-700">{formData.verpflegung}</span>
                  </div>
                </div>

                <div className="border-b border-stone-100 pb-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Sonderwünsche:</span>
                  <span className="font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded block mt-0.5">
                    {formData.sonderwuensche || 'Keine Sonderwünsche'}
                  </span>
                </div>

                <div className="border-b border-stone-100 pb-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Zahlungsart:</span>
                  <span className="font-bold text-stone-800">[X] {formData.zahlungsart}</span>
                </div>

                {/* Validation line */}
                <div className="pt-2 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Ort, Datum:</span>
                    <span className="font-serif italic text-stone-800">{formData.unterschriftOrt}, {formData.unterschriftDatum}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Unterschrift:</span>
                    <span className="font-serif text-base italic text-teal-900 underline decoration-teal-500 font-black">
                      {formData.vorname} {formData.nachname}
                    </span>
                  </div>
                </div>
              </div>

              {/* Read Aloud Summary Button */}
              <button
                onClick={() => playLessonAudio(
                  `Name: ${formData.nachname}, Vorname: ${formData.vorname}. Adresse: ${formData.strasse} ${formData.hausnummer}, ${formData.plz} ${formData.ort}. Anreise am ${formData.anreise}, Abreise am ${formData.abreise}. Zimmer: ${formData.zimmerTyp} ${formData.verpflegung}. Sonderwünsche: ${formData.sonderwuensche}. Zahlungsart: ${formData.zahlungsart}.`,
                  isSlowMode
                )}
                className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-amber-200 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all text-xs sm:text-sm"
              >
                <span>🔊</span> Listen to Form Data in German
              </button>

              {/* Kenyan Analogy Note */}
              <div className="bg-amber-100/70 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950 space-y-1">
                <span className="font-extrabold flex items-center gap-1.5 text-amber-900">
                  <span>🇰🇪</span> Kenyan Real-World Parallel:
                </span>
                <p className="text-[11px] leading-relaxed">
                  Filling German forms is identical to booking a Maasai Mara safari lodge or submitting eCitizen paperwork. Always check if a field says <em>(keine Pflichtangabe)</em>—that means optional!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: Tourist Info Letter Studio (Touristeninfo) */}
      {/* ========================================================= */}
      {activeSubTab === 'letterStudio' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Configuration Controls */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
              <div className="pb-3 border-b border-stone-200">
                <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                  <span>✉️</span> Tourist Info Email Generator
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  Recreate Emma Braun's famous letter to the Vienna Tourist Board (Slide 2–4).
                </p>
              </div>

              {/* Destination City */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Destination City (Reiseziel)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Wien', 'Berlin', 'München', 'Hamburg', 'Köln', 'Zürich'].map(c => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        city === c
                          ? 'bg-teal-700 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Companions */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Who is traveling with you?
                </label>
                <select
                  value={travelCompanion}
                  onChange={(e) => setTravelCompanion(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="mit meinem Mann">mit meinem Mann (with my husband)</option>
                  <option value="mit meiner Frau">mit meiner Frau (with my wife)</option>
                  <option value="mit meiner Familie">mit meiner Familie (with my family)</option>
                  <option value="mit Freunden">mit Freunden (with friends)</option>
                  <option value="allein">allein (alone)</option>
                </select>
              </div>

              {/* Month */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Travel Timing
                </label>
                <select
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="im August">im August (in August)</option>
                  <option value="im Juli">im Juli (in July)</option>
                  <option value="im Dezember">im Dezember (in December)</option>
                  <option value="nächste Woche">nächste Woche (next week)</option>
                  <option value="im Sommer">im Sommer (in the summer)</option>
                </select>
              </div>

              {/* Room Wish */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Desired Room
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setRoomChoice('ein Doppelzimmer')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      roomChoice === 'ein Doppelzimmer'
                        ? 'bg-teal-700 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Doppelzimmer (DZ)
                  </button>
                  <button
                    onClick={() => setRoomChoice('ein Einzelzimmer')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      roomChoice === 'ein Einzelzimmer'
                        ? 'bg-teal-700 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Einzelzimmer (EZ)
                  </button>
                </div>
              </div>

              {/* Inquiry Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Information to Request (Slide 2-4):
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeHotelRec}
                    onChange={(e) => setIncludeHotelRec(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>Gute Hotels empfehlen (Hotel recommendations)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMap}
                    onChange={(e) => setIncludeMap(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>Einen Stadtplan schicken (City map)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCulture}
                    onChange={(e) => setIncludeCulture(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>Ein Kulturprogramm schicken (Cultural program)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSights}
                    onChange={(e) => setIncludeSights(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>Sehenswürdigkeiten (Tourist sight info)</span>
                </label>
              </div>

              {/* Sender Name */}
              <div className="pt-2 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Signature Name:
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Rendered Email Presentation */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="font-bold text-stone-700 text-xs sm:text-sm">
                      An: Touristeninformation {city} (info@{city.toLowerCase()}-tourismus.at)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">Betreff: Reiseanfrage & Informationen</span>
                </div>

                {/* Email Body Card */}
                <div className="bg-stone-50/80 p-5 rounded-2xl border border-stone-200 space-y-4 font-sans text-sm sm:text-base leading-relaxed text-stone-800">
                  <p className="font-bold text-stone-900 border-b border-stone-200 pb-2">
                    Sehr geehrte Damen und Herren,
                  </p>

                  <p>
                    ich möchte {travelMonth} {travelCompanion} nach {city} reisen. Wir möchten {roomChoice} reservieren.
                    {includeHotelRec && (
                      <span className="bg-amber-100 px-1 py-0.5 rounded font-medium text-amber-950 ml-1">
                        Können Sie uns gute Hotels empfehlen?
                      </span>
                    )}
                  </p>

                  {(includeMap || includeCulture || includeSights) && (
                    <p>
                      {includeMap && includeCulture ? (
                        <span className="bg-teal-50 px-1 py-0.5 rounded font-medium text-teal-950">
                          Schicken Sie uns auch bitte einen Stadtplan und ein Kulturprogramm.
                        </span>
                      ) : includeMap ? (
                        <span className="bg-teal-50 px-1 py-0.5 rounded font-medium text-teal-950">
                          Schicken Sie uns bitte einen Stadtplan.
                        </span>
                      ) : includeCulture ? (
                        <span className="bg-teal-50 px-1 py-0.5 rounded font-medium text-teal-950">
                          Schicken Sie uns bitte ein Kulturprogramm.
                        </span>
                      ) : null}
                      {includeSights && (
                        <span className="ml-1">
                          Wir freuen uns auch über Informationen zu den wichtigsten Sehenswürdigkeiten.
                        </span>
                      )}
                    </p>
                  )}

                  <div className="pt-2">
                    <p>Vielen Dank.</p>
                    <p className="font-bold">Mit freundlichen Grüßen</p>
                    <p className="font-serif italic font-black text-teal-900 text-lg mt-1">{senderName}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => playLessonAudio(generatedLetter, isSlowMode)}
                  className="flex-1 py-3 bg-teal-800 hover:bg-teal-900 text-amber-200 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all text-xs sm:text-sm"
                >
                  <span>🔊</span> Listen to Full German Letter
                </button>
                <button
                  onClick={copyLetter}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-2xl border border-stone-300 flex items-center justify-center gap-2 transition-all text-xs sm:text-sm"
                >
                  <span>{copied ? '✅' : '📋'}</span> {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: Officialese Cheat-Sheet & Travel Verbs */}
      {/* ========================================================= */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 1: Travel Noun-Verb Transformations (Slide 16-21) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
                  <span>✈️</span> Travel Nouns & Their Matching Verbs (Substantive & Verben)
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  In German, every major travel noun has an exact verb counterpart (Slides 16–21).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Abflug / abfliegen */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 p-5 rounded-2xl border border-teal-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🛫</span>
                  <button onClick={() => playLessonAudio('der Abflug ist gleich abfliegen', isSlowMode)} className="text-teal-700 hover:text-teal-900 text-xs font-bold">🔊 Audio</button>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase block tracking-wider">Airplane Departure</span>
                  <p className="font-black text-stone-900 text-base">der Abflug = abfliegen</p>
                  <p className="text-stone-600 text-xs mt-1">
                    <em>"Das Flugzeug fliegt um 10 Uhr ab."</em> (The plane departs at 10 AM).
                  </p>
                </div>
              </div>

              {/* Card 2: Abreise & Abfahrt */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50/50 p-5 rounded-2xl border border-amber-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🚆</span>
                  <button onClick={() => playLessonAudio('die Abreise ist gleich abreisen, die Abfahrt ist gleich abfahren', isSlowMode)} className="text-amber-800 hover:text-amber-950 text-xs font-bold">🔊 Audio</button>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase block tracking-wider">General Departure / Train Departure</span>
                  <p className="font-black text-stone-900 text-base">die Abreise = abreisen</p>
                  <p className="font-black text-stone-900 text-base">die Abfahrt = abfahren</p>
                  <p className="text-stone-600 text-xs mt-1">
                    <em>"Wir reisen morgen ab. Der Zug fährt ab."</em>
                  </p>
                </div>
              </div>

              {/* Card 3: Ankunft & Anreise */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🛬</span>
                  <button onClick={() => playLessonAudio('die Ankunft ist gleich ankommen, die Anreise ist gleich anreisen', isSlowMode)} className="text-blue-700 hover:text-blue-900 text-xs font-bold">🔊 Audio</button>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase block tracking-wider">Arrival at Destination</span>
                  <p className="font-black text-stone-900 text-base">die Ankunft = ankommen</p>
                  <p className="font-black text-stone-900 text-base">die Anreise = anreisen</p>
                  <p className="text-stone-600 text-xs mt-1">
                    <em>"Wir kommen um 18 Uhr an. Die Anreise ist am 20. September."</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Form Terminology Cheat-Sheet Grid */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
              <span>📚</span> Official Bureaucracy & Form Glossary (Glossar der Amtssprache)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <span className="font-extrabold text-teal-800 text-sm block">der Familienstand</span>
                <span className="text-stone-500 block">Civil / Marital Status</span>
                <ul className="text-stone-700 space-y-1 pt-1 font-medium">
                  <li>• <strong>ledig</strong> = Single</li>
                  <li>• <strong>verheiratet</strong> = Married</li>
                  <li>• <strong>geschieden</strong> = Divorced</li>
                  <li>• <strong>verwitwet</strong> = Widowed</li>
                </ul>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <span className="font-extrabold text-teal-800 text-sm block">die Adresse</span>
                <span className="text-stone-500 block">Address Breakdown</span>
                <ul className="text-stone-700 space-y-1 pt-1 font-medium">
                  <li>• <strong>die Straße</strong> = Street</li>
                  <li>• <strong>die Hausnr.</strong> = House #</li>
                  <li>• <strong>PLZ</strong> = Postleitzahl (00100)</li>
                  <li>• <strong>der Ort</strong> = City / Town</li>
                  <li>• <strong>c/o</strong> = Care of / bei</li>
                </ul>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <span className="font-extrabold text-teal-800 text-sm block">die Geburt</span>
                <span className="text-stone-500 block">Birth Details</span>
                <ul className="text-stone-700 space-y-1 pt-1 font-medium">
                  <li>• <strong>das Geburtsdatum</strong> = DOB</li>
                  <li>• <strong>der Geburtsort</strong> = City of birth</li>
                  <li>• <strong>das Geburtsland</strong> = Country</li>
                  <li>• <strong>das Alter</strong> = Age in years</li>
                </ul>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <span className="font-extrabold text-teal-800 text-sm block">Reise & Kurs</span>
                <span className="text-stone-500 block">Travel & Course Forms</span>
                <ul className="text-stone-700 space-y-1 pt-1 font-medium">
                  <li>• <strong>das Reiseziel</strong> = Destination</li>
                  <li>• <strong>der Kursbeginn</strong> = Start date</li>
                  <li>• <strong>der Prüfungstermin</strong> = Exam</li>
                  <li>• <strong>die Unterschrift</strong> = Signature</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
