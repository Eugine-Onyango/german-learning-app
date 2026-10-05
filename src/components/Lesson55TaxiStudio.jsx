import React, { useState } from 'react';
import { Volume2, Sparkles, Check, ArrowRight, Phone, Car, Compass, CreditCard, Receipt, Clock, DollarSign, Wind, AlertCircle, ShieldCheck } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson55TaxiStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('booking'); // 'booking', 'inride', 'payment'

  // Tab 1: Booking State
  const [bookingType, setBookingType] = useState('phone'); // 'phone', 'street'
  const [phoneTiming, setPhoneTiming] = useState('tomorrow_16'); // 'tomorrow_16', 'tomorrow_8', 'immediate'
  const [phoneDest, setPhoneDest] = useState('goethe'); // 'goethe', 'airport', 'station'
  const [isAvailable, setIsAvailable] = useState(true);

  // Tab 2: In-Ride Cockpit State
  const [inRideDest, setInRideDest] = useState('flughafen'); // 'flughafen', 'stadtzentrum', 'bahnhof'
  const [meterOn, setMeterOn] = useState(true);
  const [windowState, setWindowState] = useState('closed'); // 'closed', 'open'
  const [isRushed, setIsRushed] = useState(false);
  const [intermediateStop, setIntermediateStop] = useState('none'); // 'none', 'atm', 'kiosk'
  const [dropoffSpot, setDropoffSpot] = useState('haltestelle'); // 'haltestelle', 'eingang', 'davorn'

  // Tab 3: Payment & Tipping State
  const [selectedFare, setSelectedFare] = useState(15.50);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash', 'card'
  const [needReceipt, setNeedReceipt] = useState(true);
  const [tipGiven, setTipGiven] = useState(null); // amount paid e.g. 18, 20

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-amber-500 to-yellow-500 text-white rounded-2xl shadow-md text-2xl">
              🚕
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                Mit dem Taxi fahren — Taxi Ride Studio
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Book a cab by phone, hail on the street, control your ride comfort, and master German fare tipping!
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => {
              setActiveTab('booking');
              playChime();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'booking'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" />
            1. Booking & Hailing
          </button>
          <button
            onClick={() => {
              setActiveTab('inride');
              playChime();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'inride'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            2. In-Ride Cockpit
          </button>
          <button
            onClick={() => {
              setActiveTab('payment');
              playChime();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'payment'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            3. Fare & Tipping
          </button>
        </div>
      </div>

      {/* TAB 1: Booking & Hailing */}
      {activeTab === 'booking' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">📞</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                Ordering a Taxi (Ein Taxi bestellen: Am Telefon & Auf der Straße)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In Germany, you can phone the central dispatch (<strong>die Taxizentrale</strong>) or hail a vacant cab on the street (<strong>Sind Sie frei?</strong>). Switch between the two modes below!
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => {
                setBookingType('phone');
                playChime();
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                bookingType === 'phone'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-4 h-4" />
              Am Telefon (Call Dispatch)
            </button>
            <button
              onClick={() => {
                setBookingType('street');
                playChime();
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                bookingType === 'street'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-4 h-4" />
              Auf der Straße (Street Hail)
            </button>
          </div>

          {/* Mode A: Am Telefon */}
          {bookingType === 'phone' && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg text-sm">Slides 9–15</span>
                  Calling the Dispatch Hotline (die Taxizentrale)
                </h4>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                    isAvailable
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  {isAvailable ? '✅ Taxis Available' : '❌ No Taxis (verfügbar)'}
                </button>
              </div>

              {/* Selector Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Timing */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">When do you need the taxi?</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setPhoneTiming('tomorrow_16');
                        playChime();
                      }}
                      className={`w-full p-3 rounded-2xl text-left border transition-all ${
                        phoneTiming === 'tomorrow_16'
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs md:text-sm text-slate-800">🗓️ Tomorrow at 16:00 (Slide 10)</div>
                      <div className="text-[11px] text-slate-500">"für morgen um 16 Uhr in die Goethestraße 10"</div>
                    </button>

                    <button
                      onClick={() => {
                        setPhoneTiming('tomorrow_8');
                        playChime();
                      }}
                      className={`w-full p-3 rounded-2xl text-left border transition-all ${
                        phoneTiming === 'tomorrow_8'
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs md:text-sm text-slate-800">✈️ Tomorrow morning 8:00 AM (Slide 11)</div>
                      <div className="text-[11px] text-slate-500">"morgen früh um 8 Uhr ein Taxi zum Flughafen"</div>
                    </button>

                    <button
                      onClick={() => {
                        setPhoneTiming('immediate');
                        playChime();
                      }}
                      className={`w-full p-3 rounded-2xl text-left border transition-all ${
                        phoneTiming === 'immediate'
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs md:text-sm text-slate-800">🚨 Immediately / Right Now (Slide 12)</div>
                      <div className="text-[11px] text-slate-500">"Ich brauche bitte sofort ein Taxi..."</div>
                    </button>
                  </div>
                </div>

                {/* Spoken Dialogue Exchange */}
                <div className="space-y-3">
                  {/* Passenger prompt */}
                  <div className="bg-white p-4 rounded-2xl border-l-4 border-amber-500 shadow-sm space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-amber-700 font-bold">
                      <span>🙋‍♂️ Sie als Kunde (Your Spoken Line)</span>
                      <button
                        onClick={() => {
                          if (phoneTiming === 'tomorrow_16') handleSpeak("Ich hätte gern für morgen um 16 Uhr ein Taxi in die Goethestraße 10.");
                          else if (phoneTiming === 'tomorrow_8') handleSpeak("Kann ich morgen früh um 8 Uhr ein Taxi zum Flughafen bestellen?");
                          else handleSpeak("Ich brauche bitte sofort ein Taxi zum Flughafen in die Goethestraße 10.");
                        }}
                        className="px-2.5 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-1 text-xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Listen
                      </button>
                    </div>
                    <div className="font-black text-slate-800 text-sm md:text-base">
                      {phoneTiming === 'tomorrow_16' && '"Ich hätte gern für morgen um 16 Uhr ein Taxi in die Goethestraße 10."'}
                      {phoneTiming === 'tomorrow_8' && '"Kann ich morgen früh um 8 Uhr ein Taxi zum Flughafen bestellen?"'}
                      {phoneTiming === 'immediate' && '"Ich brauche bitte sofort ein Taxi zum Flughafen in die Goethestraße 10."'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {phoneTiming === 'tomorrow_16' && "I'd like a taxi for tomorrow at 16:00 to Goethestraße 10."}
                      {phoneTiming === 'tomorrow_8' && "Can I order a taxi to the airport tomorrow morning at 8 o'clock?"}
                      {phoneTiming === 'immediate' && "I need a taxi to the airport in Goethestraße 10 immediately."}
                    </div>
                  </div>

                  {/* Dispatcher reply */}
                  <div className={`p-4 rounded-2xl border-l-4 shadow-sm space-y-1.5 ${
                    isAvailable ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className={isAvailable ? 'text-emerald-800' : 'text-rose-800'}>
                        🎧 Taxizentrale (Dispatcher)
                      </span>
                      <button
                        onClick={() => {
                          if (isAvailable) handleSpeak("Wie lautet Ihr Name, bitte? Das Taxi ist auf dem Weg.");
                          else handleSpeak("Es tut mir leid, es sind keine Taxis verfügbar.");
                        }}
                        className={`p-1 rounded-lg ${isAvailable ? 'text-emerald-700 hover:text-emerald-900' : 'text-rose-700 hover:text-rose-900'}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={`font-black text-sm md:text-base ${isAvailable ? 'text-emerald-950' : 'text-rose-950'}`}>
                      {isAvailable
                        ? '"Wie lautet Ihr Name, bitte? Das Taxi ist auf dem Weg."'
                        : '"Es tut mir leid, es sind keine Taxis verfügbar."'}
                    </div>
                    <div className={`text-xs ${isAvailable ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isAvailable
                        ? "What is your name, please? The taxi is on the way."
                        : "I'm sorry, there are no taxis available right now. (verfügbar sein)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode B: Auf der Straße */}
          {bookingType === 'street' && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg text-sm">Slides 16–18</span>
                  Hailing on the Street / At a Taxi Rank (Auf der Straße / Taxistand)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Approach 1 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
                      Direct & Friendly (Slide 17)
                    </span>
                    <button
                      onClick={() => handleSpeak("Entschuldigen Sie, sind Sie frei? Können Sie mich zum Bahnhof fahren?")}
                      className="text-amber-600 hover:text-amber-800 flex items-center gap-1 text-xs font-bold"
                    >
                      <Volume2 className="w-4 h-4" /> Listen
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="font-black text-slate-800 text-base">
                      "Entschuldigen Sie, sind Sie frei? Können Sie mich zum Bahnhof fahren?"
                    </div>
                    <div className="text-xs text-slate-500">
                      Excuse me, are you free? Can you drive me to the train station?
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600">
                    💡 <strong>Sind Sie frei?</strong> is the standard phrase to ask if a cab is vacant.
                  </div>
                </div>

                {/* Approach 2 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                      Polite Modal (Slide 18)
                    </span>
                    <button
                      onClick={() => handleSpeak("Entschuldigen Sie, würden Sie mich bitte zum Flughafen bringen? Könnten Sie mich bitte zum Flughafen bringen?")}
                      className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-xs font-bold"
                    >
                      <Volume2 className="w-4 h-4" /> Listen
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="font-black text-slate-800 text-base">
                      "Entschuldigen Sie, würden Sie / könnten Sie mich bitte zum Flughafen bringen?"
                    </div>
                    <div className="text-xs text-slate-500">
                      Excuse me, would you / could you please take me to the airport?
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600">
                    💡 <strong>Würden / Könnten Sie</strong> adds extra polite elegance!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: In-Ride Cockpit */}
      {activeTab === 'inride' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">🚖</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                In-Ride Interactive Passenger Cockpit (Im Taxi)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Experience the ride: state your destination, check the meter, ask duration, manage window ventilation, and request stop locations!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Controls & Dialogues */}
            <div className="lg:col-span-2 space-y-4">
              {/* 1. Destination & Driver Question */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
                  <span>📍 Destination Selection (Slides 20–21)</span>
                  <button
                    onClick={() => handleSpeak(`Wohin möchten Sie? — Ich möchte ${inRideDest === 'flughafen' ? 'zum Flughafen' : inRideDest === 'stadtzentrum' ? 'zum Stadtzentrum' : 'zum Bahnhof'}.`)}
                    className="flex items-center gap-1 text-slate-500 hover:text-indigo-600"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setInRideDest('flughafen');
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-center border text-xs font-bold transition-all ${
                      inRideDest === 'flughafen'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xl">✈️</div>
                    <div>zum Flughafen</div>
                    <div className="text-[10px] text-slate-500 font-normal">to the airport</div>
                  </button>

                  <button
                    onClick={() => {
                      setInRideDest('stadtzentrum');
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-center border text-xs font-bold transition-all ${
                      inRideDest === 'stadtzentrum'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xl">🏙️</div>
                    <div>zum Stadtzentrum</div>
                    <div className="text-[10px] text-slate-500 font-normal">to city centre</div>
                  </button>

                  <button
                    onClick={() => {
                      setInRideDest('bahnhof');
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-center border text-xs font-bold transition-all ${
                      inRideDest === 'bahnhof'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xl">🚆</div>
                    <div>zum Bahnhof</div>
                    <div className="text-[10px] text-slate-500 font-normal">to railway station</div>
                  </button>
                </div>
              </div>

              {/* 2. Interactive Feature Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Taximeter Check */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>📟 Taxameter (Slide 22)</span>
                    <button
                      onClick={() => setMeterOn(!meterOn)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        meterOn ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {meterOn ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <button
                    onClick={() => handleSpeak(meterOn ? "Ist das Taxameter eingeschaltet?" : "Schalten Sie bitte das Taxameter ein!")}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {meterOn ? '"Ist das Taxameter eingeschaltet?"' : '"Schalten Sie bitte das Taxameter ein!"'}
                  </button>
                </div>

                {/* Speed & Rush */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>💨 In a Hurry? (Slide 25–26)</span>
                    <button
                      onClick={() => setIsRushed(!isRushed)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isRushed ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isRushed ? '🔥 Rushed' : 'Normal'}
                    </button>
                  </div>
                  <button
                    onClick={() => handleSpeak("Ich habe es eilig. Könnten Sie bitte schneller fahren?")}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    '"Ich habe es eilig. Schneller fahren?"'
                  </button>
                </div>

                {/* Window Comfort */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>🪟 Fenster (Slide 27)</span>
                    <button
                      onClick={() => setWindowState(windowState === 'closed' ? 'open' : 'closed')}
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800"
                    >
                      {windowState === 'closed' ? 'Closed' : 'Open'}
                    </button>
                  </div>
                  <button
                    onClick={() => handleSpeak(windowState === 'closed' ? "Stört es Sie, wenn ich das Fenster aufmache?" : "Stört es Sie, wenn ich das Fenster zumache?")}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {windowState === 'closed' ? '"Stört es Sie: Fenster aufmache?"' : '"Stört es Sie: Fenster zumache?"'}
                  </button>
                </div>

                {/* Duration & ETA */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-bold text-slate-700">⏳ Duration (Slide 23–24)</div>
                  <button
                    onClick={() => handleSpeak("Wie lange dauert es bis dahin? — Etwa 20 Minuten.")}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    '"Wie lange dauert es? — 20 Min."'
                  </button>
                </div>
              </div>

              {/* 3. Stop & Drop-off Request */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="text-xs font-bold text-slate-700">🛑 Stop & Drop-Off Requests (Slides 28–31)</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setDropoffSpot('haltestelle');
                      handleSpeak("Bitte halten Sie da vorne an der Haltestelle.");
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs font-bold ${
                      dropoffSpot === 'haltestelle' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>🚏 an der Haltestelle</div>
                    <div className="text-[10px] text-slate-500">at the bus stop</div>
                  </button>

                  <button
                    onClick={() => {
                      setDropoffSpot('eingang');
                      handleSpeak("Bitte halten Sie am Eingang.");
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs font-bold ${
                      dropoffSpot === 'eingang' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>🚪 am Eingang</div>
                    <div className="text-[10px] text-slate-500">at the main entrance</div>
                  </button>

                  <button
                    onClick={() => {
                      setDropoffSpot('davorn');
                      handleSpeak("Können Sie mich bitte da vorn rauslassen?");
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs font-bold ${
                      dropoffSpot === 'davorn' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>📍 da vorn rauslassen</div>
                    <div className="text-[10px] text-slate-500">drop me out right there</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col: Live Ride Dashboard Display */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📟</span>
                    <span className="font-black text-amber-400 text-base">Taxameter Display</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    meterOn ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {meterOn ? 'RUNNING' : 'STOPPED'}
                  </span>
                </div>

                <div className="text-center py-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs text-slate-400 font-semibold">CURRENT FARE (FAHRPREIS)</div>
                  <div className="text-4xl font-black text-amber-300 tracking-tight">15,50 €</div>
                  <div className="text-[11px] text-slate-400">ETA: ~20 Min • {inRideDest.toUpperCase()}</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Destination:</span>
                    <span className="font-bold text-white capitalize">{inRideDest}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Window Status:</span>
                    <span className="font-bold text-white capitalize">{windowState}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Speed Request:</span>
                    <span className="font-bold text-white">{isRushed ? 'Schneller fahren!' : 'Standard'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveTab('payment');
                  playChime();
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-2xl text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                Arrive & Pay (zahlen) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Fare & Tipping */}
      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">💶</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                Paying the Fare & Tipping (Zahlen, Quittung & Trinkgeld)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In Germany, you can ask for the price, pay with card or cash, request an official receipt (<strong>Quittung</strong>), and tip with classic formulas like <strong>"Stimmt so!"</strong> or <strong>"Rest ist für Sie!"</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fare Breakdown & Dialogue */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 className="font-black text-slate-800 text-base">1. Asking the Fare (Slides 33–34)</h4>
                <button
                  onClick={() => handleSpeak("Wie viel kostet das? — Das macht dann fünfzehn Euro fünfzig bitte.")}
                  className="text-amber-600 hover:text-amber-800 flex items-center gap-1 text-xs font-bold"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Passenger Asks:</span>
                  <span className="text-xs text-indigo-600 font-bold">"Wie viel kostet das?"</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-2">
                  <span className="text-xs text-slate-500 font-bold">Driver Responds:</span>
                  <span className="text-xs md:text-sm font-black text-slate-800">"Das macht dann 15,50 Euro bitte."</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700">Choose Payment Method (Slide 35):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setPaymentMethod('cash');
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-left border text-xs font-bold flex items-center gap-2 ${
                      paymentMethod === 'cash'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span>💵</span>
                    <span>Bar zahlen (Cash)</span>
                  </button>

                  <button
                    onClick={() => {
                      setPaymentMethod('card');
                      playChime();
                      handleSpeak("Kann ich mit der Karte zahlen?");
                    }}
                    className={`p-3 rounded-2xl text-left border text-xs font-bold flex items-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span>💳</span>
                    <span>Mit der Karte zahlen</span>
                  </button>
                </div>
              </div>

              {/* Receipt Selector */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Receipt Dialogue (Slides 36–37)</span>
                  <button
                    onClick={() => handleSpeak("Kann ich bitte eine Quittung haben? — Ja natürlich, hier ist Ihre Quittung.")}
                    className="text-slate-400 hover:text-indigo-600"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs space-y-1">
                  <div className="font-bold text-amber-950">"Kann ich bitte eine Quittung haben?"</div>
                  <div className="text-amber-700">Can I please have a receipt? (die Quittung)</div>
                </div>
              </div>
            </div>

            {/* German Tipping Factory */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-7 space-y-5 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🪙</span>
                    <span className="font-black text-amber-400 text-base">German Tipping Formulas</span>
                  </div>
                  <span className="text-xs text-slate-400">Slides 38–39</span>
                </div>

                <div className="bg-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="text-xs text-slate-400">Meter Bill: 15,50 €</div>
                  <div className="text-xs text-amber-300 font-semibold">Select how much cash you hand the driver:</div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {[17, 18, 20].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setTipGiven(amt);
                          playChime();
                        }}
                        className={`py-2 rounded-xl text-xs font-black transition-all ${
                          tipGiven === amt
                            ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                      >
                        Hand {amt},00 €
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tipping Formula Phrases */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300">Say one of these 3 phrases to leave the change:</div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSpeak("Danke, Rest ist für Sie!")}
                      className="w-full p-3 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-2xl text-left flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="font-black text-amber-300 text-sm group-hover:text-amber-200">
                          "Danke, Rest ist für Sie!"
                        </div>
                        <div className="text-[11px] text-slate-400">Thanks, the rest is for you!</div>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-300" />
                    </button>

                    <button
                      onClick={() => handleSpeak("Stimmt so!")}
                      className="w-full p-3 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-2xl text-left flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="font-black text-emerald-300 text-sm group-hover:text-emerald-200">
                          "Stimmt so!"
                        </div>
                        <div className="text-[11px] text-slate-400">Keep the change! (It is correct like this)</div>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-300" />
                    </button>

                    <button
                      onClick={() => handleSpeak("Das passt!")}
                      className="w-full p-3 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-2xl text-left flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="font-black text-sky-300 text-sm group-hover:text-sky-200">
                          "Das passt!"
                        </div>
                        <div className="text-[11px] text-slate-400">That's fine / perfect!</div>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Driver Thank You */}
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-2xl flex items-center justify-between text-xs">
                <span className="text-emerald-200 font-semibold">👨‍✈️ Driver: "Vielen Dank! Schönen Tag noch!"</span>
                <button
                  onClick={() => handleSpeak("Vielen Dank! Schönen Tag noch! Auf Wiedersehen!")}
                  className="text-emerald-400 hover:text-emerald-200"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
