import React, { useState } from 'react';
import { Building2, Bed, Utensils, Mail, Waves, Dog, Bus, PlusCircle, CheckCircle2, Sparkles, Volume2, Check, ArrowRight, ShieldCheck, MapPin, Calendar, CreditCard, RotateCcw } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson59HotelStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('configurator'); // 'configurator', 'composer', 'examples'

  // Tab 1: Room & Board Configurator State
  const [lodgingType, setLodgingType] = useState('hotel'); // 'hotel', 'pension', 'herberge'
  const [roomType, setRoomType] = useState('DZ'); // 'EZ', 'DZ'
  const [boardType, setBoardType] = useState('HP'); // 'fruehstueck', 'HP', 'VP'
  const [roomCount, setRoomCount] = useState(1);
  const [hasSeaView, setHasSeaView] = useState(true);
  const [hasExtraBed, setHasExtraBed] = useState(false);
  const [hasShuttle, setHasShuttle] = useState(false);
  const [hasPets, setHasPets] = useState(false);

  // Tab 2: Letter Composer State
  const [senderName, setSenderName] = useState('Maria Schmidt');
  const [targetCity, setTargetCity] = useState('Stuttgart');
  const [hotelName, setHotelName] = useState('Hotel "Star"');
  const [arrivalDate, setArrivalDate] = useState('04. Juli');
  const [durationNights, setDurationNights] = useState(3);
  const [travelMode, setTravelMode] = useState('train'); // 'train', 'flight', 'car'
  const [closingType, setClosingType] = useState('mfg'); // 'mfg', 'vg'

  const sampleLetters = [
    {
      id: 'maria',
      author: 'Maria Schmidt',
      dest: 'Stuttgart (Hotel "Star")',
      avatar: '👩‍💼',
      salutation: 'Sehr geehrte Damen und Herren,',
      body: 'ich fahre am 04. Juli nach Stuttgart und möchte in Ihrem Hotel "Star" übernachten. Ich hätte gern ein Doppelzimmer mit Frühstück. Wie viel kostet es pro Nacht? Ich möchte drei Nächte bleiben. Können Sie mir auch Information über die Sehenswürdigkeiten schicken?',
      closing: 'Danke und viele Grüße,\nMaria Schmidt.',
      tip: 'City trip booking: Arrival date + Hotel Star + DZ mit Frühstück + Sights info request.'
    },
    {
      id: 'patrick',
      author: 'Patrick Meyer',
      dest: 'Zürich (Familienurlaub)',
      avatar: '👨‍👩‍👧‍👦',
      salutation: 'Sehr geehrte Damen und Herren,',
      body: 'ich komme am 20. August mit meiner Familie in Zürich an. Was kosten zwei Doppelzimmer mit Frühstück? Wir möchten eine Woche bleiben. Sind Hunde erlaubt? Ich bitte um Antwort!',
      closing: 'Danke und mit freundlichen Grüßen,\nPatrick Meyer.',
      tip: 'Family booking: Arrival in Zurich + 2 DZ + Pet dog policy inquiry + "Ich bitte um Antwort!".'
    }
  ];

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  const getBoardLabel = (type) => {
    if (type === 'fruehstueck') return 'mit Frühstück (Bed & Breakfast)';
    if (type === 'HP') return 'mit Halbpension / HP (Breakfast & Dinner)';
    return 'mit Vollpension / VP (All 3 Meals)';
  };

  const generatedSentence = `Ich hätte gern ${roomCount > 1 ? `${roomCount} ` : 'ein '}${roomType === 'EZ' ? 'Einzelzimmer (EZ)' : 'Doppelzimmer (DZ)'} ${
    boardType === 'fruehstueck' ? 'mit Frühstück' : boardType === 'HP' ? 'mit Halbpension (HP)' : 'mit Vollpension (VP)'
  }${hasSeaView ? ' und Meeresblick' : ''}${hasExtraBed ? ' und einem Extrabett' : ''}.`;

  const composedLetterText = `Sehr geehrte Damen und Herren,

ich ${travelMode === 'train' ? 'komme am ' + arrivalDate + ' mit dem Zug an' : travelMode === 'flight' ? 'fliege am ' + arrivalDate + ' nach ' + targetCity : 'fahre am ' + arrivalDate + ' nach ' + targetCity} und möchte in Ihrem ${hotelName} übernachten.

Ich hätte gern ${roomCount > 1 ? roomCount + ' Doppelzimmer' : roomType === 'EZ' ? 'ein Einzelzimmer (EZ)' : 'ein Doppelzimmer (DZ)'} ${boardType === 'fruehstueck' ? 'mit Frühstück' : boardType === 'HP' ? 'mit Halbpension (HP)' : 'mit Vollpension (VP)'}. Ich möchte ${durationNights} Nächte bleiben. Wie viel kostet es pro Nacht?

${hasSeaView ? 'Haben Sie ein Zimmer mit Meeresblick? ' : ''}${hasExtraBed ? 'Was kostet ein Extrabett? ' : ''}${hasShuttle ? 'Können Sie uns vom Bahnhof abholen? ' : ''}${hasPets ? 'Sind Hunde erlaubt? ' : ''}Können Sie mir auch Information über die Sehenswürdigkeiten schicken?

Ich bitte um Antwort!

${closingType === 'mfg' ? 'Mit freundlichen Grüßen' : 'Danke und viele Grüße'},
${senderName}.`;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-md text-2xl">
              🏨
            </span>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Hotelreservierung Studio (Hotel & Lodging)
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Master booking rooms (EZ / DZ), meal plans (HP / VP), arrival dates & formal reservation emails!
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('configurator'); playChime(); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
              activeTab === 'configurator'
                ? 'bg-white text-amber-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bed className="w-4 h-4" />
            <span>1. Room & Board Configurator</span>
          </button>

          <button
            onClick={() => { setActiveTab('composer'); playChime(); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
              activeTab === 'composer'
                ? 'bg-white text-amber-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>2. Booking Letter Composer</span>
          </button>

          <button
            onClick={() => { setActiveTab('examples'); playChime(); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
              activeTab === 'examples'
                ? 'bg-white text-amber-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>3. Sample Letters Duet</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ROOM & BOARD CONFIGURATOR */}
      {activeTab === 'configurator' && (
        <div className="space-y-6">
          {/* Lodging Type Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">1. Choose Lodging Category (Unterkunft):</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { key: 'hotel', label: 'das Hotel (Hotels)', sub: 'Full-service Hotel', icon: '🏨', desc: 'Standard / Luxury lodging' },
                { key: 'pension', label: 'die Pension (Pensionen)', sub: 'Cozy Guesthouse / B&B', icon: '🏡', desc: 'Family-run private inn' },
                { key: 'herberge', label: 'die Jugendherberge', sub: 'Youth Hostel', icon: '🎒', desc: 'Budget dorms & bunk beds' }
              ].map((l) => (
                <button
                  key={l.key}
                  onClick={() => { setLodgingType(l.key); playChime(); }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    lodgingType === l.key
                      ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{l.icon}</div>
                  <h4 className="font-bold text-slate-900 text-sm">{l.label}</h4>
                  <p className="text-xs text-amber-800 font-semibold mt-0.5">{l.sub}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{l.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Room Category & Board Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Category */}
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                2. Room Type (Die Abkürzung):
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setRoomType('EZ'); playChime(); }}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    roomType === 'EZ'
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-3xl mb-1">🛏️</div>
                  <h5 className="font-black text-sm">das Einzelzimmer</h5>
                  <span className={`inline-block mt-1 font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    roomType === 'EZ' ? 'bg-amber-700 text-amber-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Abkürzung: EZ
                  </span>
                  <p className="text-[11px] mt-1 opacity-80">1 person / single bed</p>
                </button>

                <button
                  onClick={() => { setRoomType('DZ'); playChime(); }}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    roomType === 'DZ'
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-3xl mb-1">🛌</div>
                  <h5 className="font-black text-sm">das Doppelzimmer</h5>
                  <span className={`inline-block mt-1 font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    roomType === 'DZ' ? 'bg-amber-700 text-amber-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Abkürzung: DZ
                  </span>
                  <p className="text-[11px] mt-1 opacity-80">2 persons / double bed</p>
                </button>
              </div>
            </div>

            {/* Board / Meal Plan */}
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                3. Meal Package (Die Verpflegung):
              </span>

              <div className="space-y-2">
                {[
                  { key: 'fruehstueck', title: 'mit Frühstück', sub: 'Bed & Breakfast (Morning only)', icon: '☕' },
                  { key: 'HP', title: 'mit Halbpension (HP)', sub: 'Half Board: Breakfast + Dinner (2 meals)', icon: '🥗' },
                  { key: 'VP', title: 'mit Vollpension (VP)', sub: 'Full Board: Breakfast + Lunch + Dinner (3 meals)', icon: '🍽️' }
                ].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => { setBoardType(b.key); playChime(); }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      boardType === b.key
                        ? 'bg-amber-600 text-white border-amber-700 shadow-md font-bold'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{b.icon}</span>
                      <div>
                        <div className="text-sm font-bold">{b.title}</div>
                        <div className={`text-[11px] ${boardType === b.key ? 'text-amber-100' : 'text-slate-400'}`}>
                          {b.sub}
                        </div>
                      </div>
                    </div>
                    {boardType === b.key && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Special Wishes (Sonderwünsche) */}
          <div className="bg-amber-50/60 rounded-3xl p-5 border border-amber-200 space-y-3">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              4. Special Inquiries & Wishes (andere Wünsche - Slides 31–33):
            </span>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => { setHasSeaView(!hasSeaView); playChime(); }}
                className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-2 transition-all ${
                  hasSeaView ? 'bg-sky-600 text-white border-sky-700 shadow' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Waves className="w-4 h-4" />
                <span>Meeresblick 🌊</span>
              </button>

              <button
                onClick={() => { setHasExtraBed(!hasExtraBed); playChime(); }}
                className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-2 transition-all ${
                  hasExtraBed ? 'bg-amber-600 text-white border-amber-700 shadow' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Extrabett 🛏️</span>
              </button>

              <button
                onClick={() => { setHasShuttle(!hasShuttle); playChime(); }}
                className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-2 transition-all ${
                  hasShuttle ? 'bg-emerald-600 text-white border-emerald-700 shadow' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Bus className="w-4 h-4" />
                <span>Bahnhof Abholung 🚐</span>
              </button>

              <button
                onClick={() => { setHasPets(!hasPets); playChime(); }}
                className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-2 transition-all ${
                  hasPets ? 'bg-purple-600 text-white border-purple-700 shadow' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Dog className="w-4 h-4" />
                <span>Hunde erlaubt? 🐶</span>
              </button>
            </div>
          </div>

          {/* Generated German Request Sentence */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-start justify-between gap-4 border border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Generated German Booking Sentence:
              </span>
              <h3 className="text-lg md:text-xl font-black text-white mt-1">
                "{generatedSentence}"
              </h3>
              <p className="text-xs text-slate-300 mt-1 italic">
                I would like to have a {roomType === 'EZ' ? 'single room' : 'double room'} {getBoardLabel(boardType)}
                {hasSeaView ? ' with sea view' : ''}{hasExtraBed ? ' and an extra bed' : ''}.
              </p>
            </div>
            <button
              onClick={() => handleSpeak(generatedSentence)}
              className="p-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-2xl shadow-lg transition-transform hover:scale-105 flex-shrink-0"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKING LETTER COMPOSER */}
      {activeTab === 'composer' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-3xl border border-slate-200 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Name:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Destination City & Hotel:</label>
              <input
                type="text"
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Arrival Date:</label>
              <input
                type="text"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Transport Mode:</label>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-2 py-1.5 font-bold text-slate-800 focus:outline-none"
              >
                <option value="train">Zug (Train - am Bahnhof)</option>
                <option value="flight">Flugzeug (Flight - am Flughafen)</option>
                <option value="car">Auto (Car)</option>
              </select>
            </div>
          </div>

          {/* Letter Sheet Display */}
          <div className="bg-[#fffdfa] rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-xl space-y-4 font-serif">
            {/* Header / Salutation */}
            <div className="border-b border-amber-100 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                  1. ANREDE (Salutation)
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1 font-sans">
                  Sehr geehrte Damen und Herren,
                </h4>
              </div>

              <button
                onClick={() => handleSpeak(composedLetterText)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-xs rounded-xl shadow transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Entire Letter</span>
              </button>
            </div>

            {/* Letter Body */}
            <div className="space-y-3 text-slate-800 leading-relaxed font-sans text-sm md:text-base">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  2. TEXTTEIL (Arrival, Duration, Rooms & Inquiries):
                </span>
                <p className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                  ich {travelMode === 'train' ? `komme am ${arrivalDate} mit dem Zug in ${targetCity} an` : travelMode === 'flight' ? `fliege am ${arrivalDate} nach ${targetCity}` : `fahre am ${arrivalDate} nach ${targetCity}`} und möchte in Ihrem {hotelName} übernachten.
                </p>
              </div>

              <p className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                Ich hätte gern {roomCount > 1 ? `${roomCount} Doppelzimmer` : roomType === 'EZ' ? 'ein Einzelzimmer (EZ)' : 'ein Doppelzimmer (DZ)'} {boardType === 'fruehstueck' ? 'mit Frühstück' : boardType === 'HP' ? 'mit Halbpension (HP)' : 'mit Vollpension (VP)'}. Ich möchte {durationNights} Nächte bleiben. Wie viel kostet es pro Nacht?
              </p>

              {(hasSeaView || hasExtraBed || hasShuttle || hasPets) && (
                <p className="bg-sky-50/60 p-3 rounded-xl border border-sky-100 text-sky-950 font-medium">
                  {hasSeaView && 'Haben Sie ein Zimmer mit Meeresblick? '}
                  {hasExtraBed && 'Was kostet ein Extrabett? '}
                  {hasShuttle && 'Können Sie uns vom Bahnhof abholen? '}
                  {hasPets && 'Sind Hunde erlaubt? '}
                  Können Sie mir auch Information über die Sehenswürdigkeiten schicken?
                </p>
              )}

              <p className="font-semibold text-slate-700">
                Ich bitte um Antwort!
              </p>
            </div>

            {/* Closing */}
            <div className="border-t border-amber-100 pt-3">
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                3. GRUSSFORMEL & UNTERSCHRIFT
              </span>
              <div className="mt-2 font-sans">
                <p className="font-bold text-slate-800">
                  {closingType === 'mfg' ? 'Mit freundlichen Grüßen,' : 'Danke und viele Grüße,'}
                </p>
                <p className="text-slate-900 font-black text-base mt-1">{senderName}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SAMPLE LETTERS DUET (Slides 35–37) */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <h3 className="font-bold text-amber-950 text-base">
              Original Coursebook Reservation Examples (Slides 35–37)
            </h3>
            <p className="text-xs text-amber-800">
              Listen to the standard German hotel reservation letters used in Goethe A1 exams!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleLetters.map((sample) => (
              <div
                key={sample.id}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{sample.avatar}</span>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{sample.author}</h4>
                        <span className="text-xs text-amber-700 font-semibold">{sample.dest}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(`${sample.salutation} ${sample.body} ${sample.closing}`)}
                      className="p-2.5 bg-amber-100 hover:bg-amber-600 hover:text-white text-amber-800 rounded-xl shadow-sm transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs md:text-sm text-slate-800">
                    <p className="font-bold text-slate-900">{sample.salutation}</p>
                    <p className="leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100 font-mono text-xs">
                      {sample.body}
                    </p>
                    <p className="font-bold text-slate-900 whitespace-pre-line">{sample.closing}</p>
                  </div>
                </div>

                <div className="pt-2 border-t text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl">
                  💡 <strong>Exam Tip:</strong> {sample.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
