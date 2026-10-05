import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson63WohnungStudio({ isSlowMode }) {
  const [activeSubTab, setActiveSubTab] = useState('decoder');

  // Tab 1: Decrypter & Ad Creator State
  const [selectedPreset, setSelectedPreset] = useState('berlin');
  const [activeAcronym, setActiveAcronym] = useState(null);

  // Custom Ad Builder State
  const [adCity, setAdCity] = useState('Berlin/Mitte');
  const [adRooms, setAdRooms] = useState('3');
  const [adBuilding, setAdBuilding] = useState('AB'); // 'AB' (Altbau), 'NB' (Neubau)
  const [adFloor, setAdFloor] = useState('OG'); // 'EG', 'OG', 'DG'
  const [adHasEbk, setAdHasEbk] = useState(true);
  const [adHasBlk, setAdHasBlk] = useState(true);
  const [adSize, setAdSize] = useState('85');
  const [adRent, setAdRent] = useState('770');
  const [adNk, setAdNk] = useState('180');
  const [adKaution, setAdKaution] = useState('2MM');
  const [adPhone, setAdPhone] = useState('0123/456789');

  // Tab 2: Dialogue State
  const [dialogueStep, setDialogueStep] = useState(8); // Show all by default or stepper

  // Tab 3: Rent Math State
  const [kaltmiete, setKaltmiete] = useState(750);
  const [nebenkosten, setNebenkosten] = useState(180);
  const [depositMonths, setDepositMonths] = useState(2);

  const warmmiete = kaltmiete + nebenkosten;
  const kautionTotal = kaltmiete * depositMonths;

  const ACRONYMS_DICT = {
    'AB': { full: 'der Altbau', trans: 'Historic pre-war building (high ceilings, charm)', audio: 'Altbau' },
    'NB': { full: 'der Neubau', trans: 'Modern newly built apartment (insulated, elevator)', audio: 'Neubau' },
    'Whg': { full: 'die Wohnung', trans: 'Apartment / flat', audio: 'Wohnung' },
    'Zi': { full: 'das Zimmer', trans: 'Room(s)', audio: 'Zimmer' },
    '3ZKB': { full: '3 Zimmer, Küche, Bad', trans: '3 rooms + separate kitchen + bathroom', audio: '3 Zimmer, Küche, Bad' },
    '4Zi-Whg': { full: '4-Zimmer-Wohnung', trans: '4-room flat', audio: '4-Zimmer-Wohnung' },
    'BLK': { full: 'der Balkon', trans: 'Balcony', audio: 'Balkon' },
    'Blk.': { full: 'der Balkon', trans: 'Balcony', audio: 'Balkon' },
    'EBK': { full: 'die Einbauküche', trans: 'Fitted modular kitchen (cabinets, stove, sink)', audio: 'Einbauküche' },
    'EG': { full: 'das Erdgeschoss', trans: 'Ground floor (Level 0)', audio: 'Erdgeschoss' },
    'OG': { full: 'das Obergeschoss', trans: 'Upper / First floor', audio: 'Obergeschoss' },
    'DG': { full: 'das Dachgeschoss', trans: 'Attic / Top floor under roof', audio: 'Dachgeschoss' },
    'TG': { full: 'das Tiefgeschoss', trans: 'Deep underground parking / basement', audio: 'Tiefgeschoss' },
    'UG': { full: 'das Untergeschoss', trans: 'Basement level', audio: 'Untergeschoss' },
    'WC': { full: 'die Toilette / Gäste-WC', trans: 'Toilet / Guest WC', audio: 'Toilette' },
    'NK': { full: 'die Nebenkosten', trans: 'Utility service charges (heating, water, trash)', audio: 'Nebenkosten' },
    '+ NK': { full: 'zuzüglich Nebenkosten', trans: 'Plus utility service charges', audio: 'zuzüglich Nebenkosten' },
    'KT: 2MM': { full: 'Kaution: 2 Monatsmieten', trans: 'Security deposit: 2 months of basic rent', audio: 'Kaution: 2 Monatsmieten' },
    '2MM': { full: 'zwei Monatsmieten', trans: 'Two months of basic rent', audio: 'zwei Monatsmieten' },
    'm²': { full: 'Quadratmeter', trans: 'Square meters of living area', audio: 'Quadratmeter' },
    'ca.': { full: 'circa', trans: 'Approximately', audio: 'circa' },
    'inkl.': { full: 'inklusiv', trans: 'Inclusive / all included', audio: 'inklusiv' },
    'WZ': { full: 'das Wohnzimmer', trans: 'Living room', audio: 'Wohnzimmer' },
    'WG': { full: 'die Wohngemeinschaft', trans: 'Shared apartment / Flatshare with roommates', audio: 'Wohngemeinschaft' },
  };

  const PRESET_ADS = {
    berlin: {
      title: 'Slide 35: Berlin/Mitte Altbau-Wohnung',
      raw: 'Berlin/Mitte, schöne AB-Whg., 3ZKB, BLK, ruhige zentrale Lage, ca. 5 Min. zur S-Bahn, Miete: Euro 770,- + NK, KT: 2MM, Tel. 0123/456789',
      tokens: ['Berlin/Mitte', 'schöne', 'AB', '-Whg.,', '3ZKB,', 'BLK,', 'ruhige zentrale Lage, ca. 5 Min. zur S-Bahn,', 'Miete: Euro 770,-', '+ NK,', 'KT: 2MM,', 'Tel. 0123/456789']
    },
    koeln: {
      title: 'Slide 36: Köln Neubau-Wohnung',
      raw: 'Köln, 4Zi-Whg., NB, EG/OG, EBK, Blk., 100m², Miete: Euro 990,- + NK, zu vermieten, ☎ 0987/6543210',
      tokens: ['Köln,', '4Zi-Whg.,', 'NB,', 'EG', '/', 'OG,', 'EBK,', 'Blk.,', '100m²,', 'Miete: Euro 990,-', '+ NK,', 'zu vermieten,', '☎ 0987/6543210']
    },
    muenchen: {
      title: 'München WG-Zimmer im Dachgeschoss',
      raw: 'München, sonniges WG-Zimmer, DG, EBK, WZ, ca. 22m², frei ab sofort, Miete: 520€ inkl. NK, KT: 2MM, Tel. 089/112233',
      tokens: ['München,', 'sonniges', 'WG', '-Zimmer,', 'DG,', 'EBK,', 'WZ,', 'ca. 22m²,', 'frei ab sofort,', 'Miete: 520€', 'inkl.', 'NK,', 'KT: 2MM,', 'Tel. 089/112233']
    }
  };

  const generatedAdText = `${adCity}, schöne ${adBuilding}-Whg., ${adRooms}ZKB, ${adFloor}, ${adHasEbk ? 'EBK, ' : ''}${adHasBlk ? 'BLK, ' : ''}ca. ${adSize}m², Miete: Euro ${adRent},- + NK (${adNk}€), KT: ${adKaution}, Tel. ${adPhone}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 border border-teal-400/40 rounded-full text-teal-300 text-xs font-bold uppercase tracking-wider">
            <span>🏠</span> Lesson 63 Studio: Wohnungssuche
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-tight">
            German Apartment Hunting & Classified Ad Decrypter
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Master the secret language of German classified ads (<em>3ZKB</em>, <em>EBK</em>, <em>BLK</em>, <em>AB/NB</em>, <em>EG/DG</em>, <em>KT: 2MM</em>), roleplay viewing phone calls (<em>Besichtigungstermin</em>), and calculate real German rent math (<em>Kaltmiete</em> + <em>Nebenkosten</em> = <em>Warmmiete</em>)!
          </p>
        </div>

        {/* Sub-tab Navigation Buttons */}
        <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-teal-800/40 relative z-10">
          <button
            onClick={() => setActiveSubTab('decoder')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'decoder'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-teal-950/60 text-teal-200 hover:bg-teal-900/80 border border-teal-700/50'
            }`}
          >
            <span>📰</span> Classified Ad Decrypter & Creator (Anzeigen-Labor)
          </button>
          <button
            onClick={() => setActiveSubTab('phoneCall')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'phoneCall'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-teal-950/60 text-teal-200 hover:bg-teal-900/80 border border-teal-700/50'
            }`}
          >
            <span>📞</span> Viewing Appointment Call (Besichtigungstermin)
          </button>
          <button
            onClick={() => setActiveSubTab('rentMath')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'rentMath'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-teal-950/60 text-teal-200 hover:bg-teal-900/80 border border-teal-700/50'
            }`}
          >
            <span>💶</span> Rent Math & Housing Roles (Miete & Umzug)
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: Classified Ad Decrypter & Creator */}
      {/* ========================================================= */}
      {activeSubTab === 'decoder' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Preset Selector */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <span>📑</span> Select an Exam Classified Ad (Wohnungsanzeige):
              </h3>
              <p className="text-stone-500 text-xs mt-0.5">
                Tap on any highlighted acronym in the newspaper ad to reveal its meaning!
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESET_ADS).map(k => (
                <button
                  key={k}
                  onClick={() => {
                    setSelectedPreset(k);
                    setActiveAcronym(null);
                    playChime('click');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPreset === k
                      ? 'bg-teal-800 text-amber-200 shadow-md'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {PRESET_ADS[k].title.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Newspaper Ad Box */}
            <div className="lg:col-span-7 bg-amber-50/50 p-6 sm:p-8 rounded-3xl border-2 border-stone-300 shadow-md space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-stone-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📰</span>
                    <span className="font-serif font-black text-stone-900 text-sm uppercase tracking-wider">
                      Berliner Morgenpost • Immobilienmarkt
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold">WOHNUNGEN FREI</span>
                </div>

                {/* The Newspaper Classified Clipping */}
                <div className="bg-white p-5 rounded-2xl border border-stone-300 shadow-inner font-serif text-stone-900 text-base sm:text-lg leading-relaxed space-y-3">
                  <h4 className="font-bold text-teal-900 text-sm border-b border-stone-200 pb-1">
                    {PRESET_ADS[selectedPreset].title}
                  </h4>

                  {/* Tokenized Clickable Words */}
                  <div className="flex flex-wrap gap-1.5 items-center font-mono text-sm sm:text-base">
                    {PRESET_ADS[selectedPreset].tokens.map((token, idx) => {
                      const cleanToken = token.replace(/[^a-zA-Z0-9²+-]/g, '');
                      const isAcronym = ACRONYMS_DICT[cleanToken] || ACRONYMS_DICT[token.trim()];
                      const matchingKey = ACRONYMS_DICT[cleanToken] ? cleanToken : token.trim();

                      if (isAcronym) {
                        const isSelected = activeAcronym === matchingKey;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveAcronym(matchingKey);
                              playChime('click');
                              speakGerman(ACRONYMS_DICT[matchingKey].audio, isSlowMode);
                            }}
                            className={`px-2 py-0.5 rounded-md font-bold transition-all border ${
                              isSelected
                                ? 'bg-red-600 text-white border-red-700 ring-2 ring-red-400 scale-105'
                                : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                            }`}
                          >
                            {token}
                          </button>
                        );
                      }

                      return <span key={idx} className="text-stone-800">{token}</span>;
                    })}
                  </div>
                </div>

                {/* Acronym Explanation Banner */}
                {activeAcronym && ACRONYMS_DICT[activeAcronym] && (
                  <div className="bg-teal-900 text-white p-4 rounded-2xl border border-teal-700 shadow-md space-y-1 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-extrabold text-teal-300">
                        Acronym Decoded: [{activeAcronym}]
                      </span>
                      <button
                        onClick={() => speakGerman(ACRONYMS_DICT[activeAcronym].full, isSlowMode)}
                        className="text-amber-300 hover:text-amber-100 font-bold text-xs flex items-center gap-1"
                      >
                        <span>🔊</span> Listen
                      </button>
                    </div>
                    <p className="font-extrabold text-base text-amber-200">
                      {ACRONYMS_DICT[activeAcronym].full}
                    </p>
                    <p className="text-xs text-stone-200">
                      {ACRONYMS_DICT[activeAcronym].trans}
                    </p>
                  </div>
                )}
              </div>

              {/* Full Audio Playback */}
              <button
                onClick={() => speakGerman(PRESET_ADS[selectedPreset].raw, isSlowMode)}
                className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-amber-100 font-extrabold rounded-2xl shadow-sm transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span>🔊</span> Listen to Full German Ad Text
              </button>
            </div>

            {/* Custom Ad Creator Studio */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="pb-2 border-b border-stone-200">
                  <h4 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                    <span>✨</span> Custom Ad Creator (Inserat Erstellen)
                  </h4>
                  <p className="text-stone-500 text-xs">
                    Configure your dream German flat and generate real newspaper code!
                  </p>
                </div>

                {/* City & Rooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">Stadt (City):</label>
                    <select
                      value={adCity}
                      onChange={(e) => setAdCity(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Berlin/Mitte">Berlin/Mitte</option>
                      <option value="Köln/Zentrum">Köln/Zentrum</option>
                      <option value="München/Schwabing">München/Schwabing</option>
                      <option value="Hamburg/Altona">Hamburg/Altona</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">Zimmer (Rooms):</label>
                    <select
                      value={adRooms}
                      onChange={(e) => setAdRooms(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="1">1 Zimmer (Studio)</option>
                      <option value="2">2 Zimmer</option>
                      <option value="3">3 Zimmer</option>
                      <option value="4">4 Zimmer</option>
                    </select>
                  </div>
                </div>

                {/* Building & Floor */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">Gebäude (Building):</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAdBuilding('AB')}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold ${adBuilding === 'AB' ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-700'}`}
                      >
                        AB (Altbau)
                      </button>
                      <button
                        onClick={() => setAdBuilding('NB')}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold ${adBuilding === 'NB' ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-700'}`}
                      >
                        NB (Neubau)
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">Stockwerk (Floor):</label>
                    <select
                      value={adFloor}
                      onChange={(e) => setAdFloor(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="EG">EG (Erdgeschoss)</option>
                      <option value="OG">OG (Obergeschoss)</option>
                      <option value="DG">DG (Dachgeschoss)</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes for EBK & BLK */}
                <div className="flex gap-4 p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs font-bold text-stone-700">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adHasEbk}
                      onChange={(e) => setAdHasEbk(e.target.checked)}
                      className="rounded text-teal-600"
                    />
                    <span>EBK (Einbauküche)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adHasBlk}
                      onChange={(e) => setAdHasBlk(e.target.checked)}
                      className="rounded text-teal-600"
                    />
                    <span>BLK (Balkon)</span>
                  </label>
                </div>

                {/* Generated Preview Box */}
                <div className="bg-stone-900 text-amber-300 p-3.5 rounded-2xl font-mono text-xs leading-relaxed space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Generated Ad String:</span>
                  <p>{generatedAdText}</p>
                </div>
              </div>

              <button
                onClick={() => speakGerman(generatedAdText, isSlowMode)}
                className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-amber-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <span>🔊</span> Speak Custom Ad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: Phone Hotline & Viewing Scheduler */}
      {/* ========================================================= */}
      {activeSubTab === 'phoneCall' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Phone Conversation Dialogue Mockup (Slides 36-45) */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                    Telefonat: Wohnungssuche & Besichtigungstermin
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone-400">Köln Inserat Anruf</span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4 text-xs sm:text-sm font-sans">
                {/* 1. Schmidt */}
                <div className="flex items-start gap-2.5">
                  <span className="text-lg bg-teal-100 p-1.5 rounded-full flex-shrink-0">👨</span>
                  <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-2xl rounded-tl-none space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-teal-800 uppercase">Herr Schmidt (Interessent):</span>
                      <button
                        onClick={() => speakGerman("Guten Tag, mein Name ist Schmidt. Ich finde Ihre Wohnung in Köln interessant. Ist die noch frei?", isSlowMode)}
                        className="text-teal-800 hover:text-teal-950 font-bold text-xs"
                      >
                        🔊 Play
                      </button>
                    </div>
                    <p className="font-bold text-stone-900">
                      "Guten Tag, mein Name ist Schmidt. Ich finde Ihre Wohnung in Köln interessant. Ist die noch frei?"
                    </p>
                  </div>
                </div>

                {/* 2. Landlady */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="bg-stone-900 text-stone-100 p-3.5 rounded-2xl rounded-tr-none space-y-1 flex-1 max-w-lg">
                    <div className="flex items-center justify-between text-amber-300">
                      <span className="text-[10px] font-bold uppercase">Vermieterin:</span>
                      <button
                        onClick={() => speakGerman("Ja, die ist noch frei. Möchten Sie sie besichtigen?", isSlowMode)}
                        className="text-amber-300 hover:text-amber-100 font-bold text-xs"
                      >
                        🔊 Play
                      </button>
                    </div>
                    <p className="font-semibold text-xs leading-relaxed">
                      "Ja, die ist noch frei. Möchten Sie sie besichtigen?"
                    </p>
                  </div>
                  <span className="text-lg bg-stone-800 p-1.5 rounded-full flex-shrink-0">👩</span>
                </div>

                {/* 3. Schmidt asks for viewing */}
                <div className="flex items-start gap-2.5">
                  <span className="text-lg bg-teal-100 p-1.5 rounded-full flex-shrink-0">👨</span>
                  <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-2xl rounded-tl-none space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-teal-800 uppercase">Herr Schmidt:</span>
                      <button
                        onClick={() => speakGerman("Ja, gern. Gibt es denn einen Besichtigungstermin für die Wohnung?", isSlowMode)}
                        className="text-teal-800 hover:text-teal-950 font-bold text-xs"
                      >
                        🔊 Play
                      </button>
                    </div>
                    <p className="font-bold text-stone-900">
                      "Ja, gern. Gibt es denn einen Besichtigungstermin für die Wohnung?"
                    </p>
                  </div>
                </div>

                {/* 4. Landlady sets date */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="bg-stone-900 text-stone-100 p-3.5 rounded-2xl rounded-tr-none space-y-1 flex-1 max-w-lg">
                    <div className="flex items-center justify-between text-amber-300">
                      <span className="text-[10px] font-bold uppercase">Vermieterin:</span>
                      <button
                        onClick={() => speakGerman("Ja, diesen Donnerstag, um 13 Uhr in der Musterstraße 20.", isSlowMode)}
                        className="text-amber-300 hover:text-amber-100 font-bold text-xs"
                      >
                        🔊 Play
                      </button>
                    </div>
                    <p className="font-semibold text-xs leading-relaxed">
                      "Ja, diesen Donnerstag, um 13 Uhr in der Musterstraße 20."
                    </p>
                  </div>
                  <span className="text-lg bg-stone-800 p-1.5 rounded-full flex-shrink-0">👩</span>
                </div>

                {/* 5. Schmidt extra question: Gäste-WC */}
                <div className="flex items-start gap-2.5">
                  <span className="text-lg bg-teal-100 p-1.5 rounded-full flex-shrink-0">👨</span>
                  <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-2xl rounded-tl-none space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-teal-800 uppercase">Herr Schmidt:</span>
                      <button
                        onClick={() => speakGerman("Noch eine Frage: Hat die Wohnung ein Gäste-WC?", isSlowMode)}
                        className="text-teal-800 hover:text-teal-950 font-bold text-xs"
                      >
                        🔊 Play
                      </button>
                    </div>
                    <p className="font-bold text-stone-900">
                      "Noch eine Frage: Hat die Wohnung ein Gäste-WC?"
                    </p>
                  </div>
                </div>

                {/* 6. Landlady confirms */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="bg-stone-900 text-stone-100 p-3.5 rounded-2xl rounded-tr-none space-y-1 flex-1 max-w-lg">
                    <div className="flex items-center justify-between text-amber-300">
                      <span className="text-[10px] font-bold uppercase">Vermieterin:</span>
                      <button
                        onClick={() => speakGerman("Ja, im Erdgeschoss.", isSlowMode)}
                        className="text-amber-300 hover:text-amber-100 font-bold text-xs"
                      >
                        🔊 Play
                      </button>
                    </div>
                    <p className="font-semibold text-xs leading-relaxed">
                      "Ja, im Erdgeschoss."
                    </p>
                  </div>
                  <span className="text-lg bg-stone-800 p-1.5 rounded-full flex-shrink-0">👩</span>
                </div>

                {/* 7. Sign off */}
                <div className="flex items-start gap-2.5">
                  <span className="text-lg bg-teal-100 p-1.5 rounded-full flex-shrink-0">👨</span>
                  <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-2xl rounded-tl-none space-y-1 flex-1">
                    <p className="font-bold text-stone-900">
                      "Vielen Dank für die Auskunft. Bis Donnerstag dann!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Event Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border-2 border-amber-300 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  <h4 className="font-extrabold text-amber-950 text-base">
                    Besichtigungstermin (Confirmed)
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-stone-800">
                  <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Wann (When):</span>
                    <p className="font-extrabold text-sm text-teal-900">Diesen Donnerstag, 13:00 Uhr</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Wo (Where):</span>
                    <p className="font-bold text-stone-900">Musterstraße 20, Köln</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Details:</span>
                    <p className="text-stone-700">4-Zimmer-Wohnung, Neubau, 100m², Gäste-WC im EG</p>
                  </div>
                </div>

                <button
                  onClick={() => speakGerman("Termin notiert: Diesen Donnerstag um 13 Uhr in der Musterstraße 20 zur Wohnungsbesichtigung.", isSlowMode)}
                  className="w-full py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-100 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <span>🔊</span> Termin vorlesen (Read Date)
                </button>
              </div>

              {/* Kenyan Analogy Note */}
              <div className="bg-teal-50 border border-teal-300 p-4 rounded-2xl text-xs text-teal-950 space-y-1">
                <span className="font-black text-teal-900 flex items-center gap-1.5">
                  <span>🇰🇪</span> Viewing Appointments in Germany:
                </span>
                <p className="text-[11px] leading-relaxed">
                  In Germany, viewing slots (<em>Besichtigungstermine</em>) are strictly on schedule! Always arrive 5 minutes early with your file (Schufa credit check, 3 pay slips, ID) ready to impress the landlord!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: Rent Math, Costs & Housing Roles */}
      {/* ========================================================= */}
      {activeSubTab === 'rentMath' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Rent Calculator */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="pb-3 border-b border-stone-200">
              <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
                <span>🧮</span> German Rent Math (Kaltmiete + Nebenkosten = Warmmiete)
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Calculate total monthly payments and security deposit (Kaution) according to Slides 18–21.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kaltmiete Input */}
              <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200 space-y-2">
                <span className="text-xs font-black uppercase text-blue-900 block">1. Die Kaltmiete (Base Rent)</span>
                <input
                  type="number"
                  value={kaltmiete}
                  onChange={(e) => setKaltmiete(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-blue-300 rounded-xl font-bold text-lg text-blue-950 focus:outline-none"
                />
                <p className="text-[11px] text-blue-800">
                  Pure cost of the empty apartment space.
                </p>
              </div>

              {/* Nebenkosten Input */}
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
                <span className="text-xs font-black uppercase text-amber-900 block">2. Nebenkosten / NK (Utilities)</span>
                <input
                  type="number"
                  value={nebenkosten}
                  onChange={(e) => setNebenkosten(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl font-bold text-lg text-amber-950 focus:outline-none"
                />
                <p className="text-[11px] text-amber-800">
                  Heizung (heating), Wasser, Müllabfuhr, Hausmeister.
                </p>
              </div>

              {/* Total Warmmiete */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-md space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold text-emerald-200 block">
                    = Die Warmmiete (Total Monthly)
                  </span>
                  <span className="text-3xl font-black text-amber-200">
                    {warmmiete.toFixed(2)} €
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100">
                  The actual amount you transfer to your landlord every month.
                </p>
              </div>
            </div>

            {/* Deposit Calculation */}
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-extrabold text-stone-900 text-sm block">
                  Die Kaution (KT: {depositMonths} Monatsmieten = {depositMonths}MM)
                </span>
                <p className="text-xs text-stone-500">
                  Refundable security bond held in an escrow account: {kaltmiete} € × {depositMonths} Monate = <strong className="text-teal-900 font-bold">{kautionTotal.toFixed(2)} €</strong>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDepositMonths(2)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${depositMonths === 2 ? 'bg-teal-700 text-white' : 'bg-stone-200 text-stone-700'}`}
                >
                  2MM (Standard)
                </button>
                <button
                  onClick={() => setDepositMonths(3)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${depositMonths === 3 ? 'bg-teal-700 text-white' : 'bg-stone-200 text-stone-700'}`}
                >
                  3MM (Max legal)
                </button>
              </div>
            </div>
          </div>

          {/* Housing Verbs in Perfekt */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
              <span>⚡</span> Housing Verbs in Present & Past (Perfekt)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-teal-950 text-sm block">umziehen ➔ ist umgezogen</span>
                <span className="text-stone-500 block">to relocate / move</span>
                <p className="text-stone-600 text-[11px] italic">"Ich bin nach Berlin umgezogen."</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-teal-950 text-sm block">mieten ➔ hat gemietet</span>
                <span className="text-stone-500 block">to rent (tenant)</span>
                <p className="text-stone-600 text-[11px] italic">"Wir haben eine 3-Zimmer-Wohnung gemietet."</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-teal-950 text-sm block">vermieten ➔ hat vermietet</span>
                <span className="text-stone-500 block">to rent out (landlord)</span>
                <p className="text-stone-600 text-[11px] italic">"Der Vermieter hat die Wohnung vermietet."</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-teal-950 text-sm block">besichtigen ➔ hat besichtigt</span>
                <span className="text-stone-500 block">to inspect / view</span>
                <p className="text-stone-600 text-[11px] italic">"Ich habe die Wohnung gestern besichtigt."</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
