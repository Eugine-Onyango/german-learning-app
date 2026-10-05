import React, { useState } from 'react';
import { playChime, speakGerman } from '../utils/sound';

export default function Lesson64BahnStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('fahrplan'); // 'fahrplan', 'schalter', 'guide'
  const [selectedRouteId, setSelectedRouteId] = useState('frankfurt-muenchen');
  const [expandedDetails, setExpandedDetails] = useState(true);
  const [ticketChoice, setTicketChoice] = useState({
    type: 'einfach', // 'einfach' or 'hin-zurueck'
    seatReservation: false,
    fareType: 'spar' // 'spar' or 'flex'
  });
  const [currentStep, setCurrentStep] = useState(0);

  const speak = (text) => {
    speakGerman(text, isSlowMode);
  };

  // Timetable Routes Data (Slide 20-32)
  const routes = [
    {
      id: 'frankfurt-muenchen',
      from: 'Frankfurt(Main)Hbf',
      to: 'München Hbf',
      depTime: '16:21',
      arrTime: '20:00',
      duration: '3 Std. 39 Min.',
      transfers: 1,
      products: 'ICE',
      sparpreis: 73.90,
      flexpreis: 105.00,
      legs: [
        {
          train: 'ICE 229',
          direction: 'Richtung: Wien Hbf',
          depStation: 'Frankfurt(Main)Hbf',
          depTime: '16:21',
          depGleis: 'Gleis 4',
          arrStation: 'Nürnberg Hbf',
          arrTime: '18:27',
          arrGleis: 'Gleis 8',
          transferDuration: 'Umsteigezeit 23 Min.'
        },
        {
          train: 'ICE 881',
          direction: 'Richtung: München Hbf',
          depStation: 'Nürnberg Hbf',
          depTime: '18:50',
          depGleis: 'Gleis 9',
          arrStation: 'München Hbf',
          arrTime: '20:00',
          arrGleis: 'Gleis 19'
        }
      ]
    },
    {
      id: 'berlin-koeln',
      from: 'Berlin Hbf',
      to: 'Köln Hbf',
      depTime: '08:30',
      arrTime: '12:45',
      duration: '4 Std. 15 Min.',
      transfers: 0,
      products: 'ICE',
      sparpreis: 49.90,
      flexpreis: 98.00,
      legs: [
        {
          train: 'ICE 548',
          direction: 'Richtung: Köln Hbf',
          depStation: 'Berlin Hbf',
          depTime: '08:30',
          depGleis: 'Gleis 7',
          arrStation: 'Köln Hbf',
          arrTime: '12:45',
          arrGleis: 'Gleis 2',
          transferDuration: 'Direktzug (Kein Umstieg)'
        }
      ]
    },
    {
      id: 'hamburg-stuttgart',
      from: 'Hamburg Hbf',
      to: 'Stuttgart Hbf',
      depTime: '10:15',
      arrTime: '16:08',
      duration: '5 Std. 53 Min.',
      transfers: 1,
      products: 'ICE / IC',
      sparpreis: 65.00,
      flexpreis: 119.00,
      legs: [
        {
          train: 'ICE 672',
          direction: 'Richtung: Basel SBB',
          depStation: 'Hamburg Hbf',
          depTime: '10:15',
          depGleis: 'Gleis 12',
          arrStation: 'Hannover Hbf',
          arrTime: '11:38',
          arrGleis: 'Gleis 3',
          transferDuration: 'Umsteigezeit 18 Min.'
        },
        {
          train: 'ICE 791',
          direction: 'Richtung: Stuttgart Hbf',
          depStation: 'Hannover Hbf',
          depTime: '11:56',
          depGleis: 'Gleis 4',
          arrStation: 'Stuttgart Hbf',
          arrTime: '16:08',
          arrGleis: 'Gleis 5'
        }
      ]
    }
  ];

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  // Full Slides 35-46 Dialogue
  const dialogueSteps = [
    {
      speaker: 'Clerk',
      role: 'Schalterbeamter (Ticket Clerk)',
      avatar: '👨‍💼',
      german: 'Guten Tag, wie kann ich Ihnen helfen?',
      phonetic: 'GOO-ten tahk, vee kahn ikh EE-nen HEL-fen?',
      english: 'Hello, how can I help you?',
      explanation: 'Standard polite greeting from the DB ticket service desk.'
    },
    {
      speaker: 'Passenger',
      role: 'Reisende (Passenger)',
      avatar: '👩',
      german: 'Guten Tag, ich brauche eine Fahrkarte nach München bitte!',
      phonetic: 'GOO-ten tahk, ikh BROW-khuh EYE-nuh FAHR-kar-tuh nahkh MYOON-khen BIT-tuh!',
      english: 'Hello, I need a ticket to Munich please!',
      explanation: 'Stating your destination clearly with polite "bitte".'
    },
    {
      speaker: 'Clerk',
      role: 'Schalterbeamter (Ticket Clerk)',
      avatar: '👨‍💼',
      german: 'Einfach oder hin und zurück?',
      phonetic: 'EYEN-fakh OH-der hin oont tsoo-RYOOK?',
      english: 'One-way or return?',
      explanation: 'The classic ticketing question: single outward trip vs round-trip.'
    },
    {
      speaker: 'Passenger',
      role: 'Reisende (Passenger)',
      avatar: '👩',
      german: 'Nur Hinfahrt, bitte!',
      phonetic: 'NOOR HIN-fahrt, BIT-tuh!',
      english: 'Only outward journey, please! (One-way)',
      explanation: '"Nur Hinfahrt" is synonymous with "einfach".'
    },
    {
      speaker: 'Clerk',
      role: 'Schalterbeamter (Ticket Clerk)',
      avatar: '👨‍💼',
      german: 'Wann wollen Sie fahren?',
      phonetic: 'vahn VOL-len zee FAH-ren?',
      english: 'When do you want to travel?',
      explanation: 'Asking for departure time preferences.'
    },
    {
      speaker: 'Passenger',
      role: 'Reisende (Passenger)',
      avatar: '👩',
      german: 'Mit dem nächsten Zug. Wann fährt der?',
      phonetic: 'mit daym NAYKH-sten tsook. vahn fehrt dair?',
      english: 'With the next train. When does it leave?',
      explanation: 'Asking for the very next train departure.'
    },
    {
      speaker: 'Clerk',
      role: 'Schalterbeamter (Ticket Clerk)',
      avatar: '👨‍💼',
      german: 'In 20 Minuten. Um 16.30 Uhr.',
      phonetic: 'in TSVAHN-tsikh mee-NOO-ten. oom ZEHKH-tsehn OOR DRY-sikh.',
      english: 'In 20 minutes. At 16:30.',
      explanation: 'Giving exact time and duration until departure.'
    },
    {
      speaker: 'Passenger',
      role: 'Reisende (Passenger)',
      avatar: '👩',
      german: 'Auf welchem Gleis fährt der Zug ab? Und muss ich umsteigen?',
      phonetic: 'owf VEL-khem glyse fehrt dair tsook ahp? oont moos ikh OOM-shty-gen?',
      english: 'On which track does the train leave? And do I have to change?',
      explanation: 'Two critical German railway questions: Track number (Gleis) and Transfer (umsteigen).'
    },
    {
      speaker: 'Clerk',
      role: 'Schalterbeamter (Ticket Clerk)',
      avatar: '👨‍💼',
      german: 'Auf Gleis 4 und Sie müssen nicht umsteigen.',
      phonetic: 'owf glyse feer oont zee MYOO-sen nikht OOM-shty-gen.',
      english: 'On track 4 and you do not have to change.',
      explanation: 'Direct train (Direktzug) reassurance!'
    },
    {
      speaker: 'Passenger',
      role: 'Reisende (Passenger)',
      avatar: '👩',
      german: 'Wann kommt der Zug in München an? Und was kostet die Fahrkarte?',
      phonetic: 'vahn komt dair tsook in MYOON-khen ahn? oont vahs KOS-tet dee FAHR-kar-tuh?',
      english: 'When does the train arrive in Munich? And how much does the ticket cost?',
      explanation: 'Arrival time (ankommen) and total ticket price inquiry.'
    },
    {
      speaker: 'Clerk',
      role: 'Schalterbeamter (Ticket Clerk)',
      avatar: '👨‍💼',
      german: 'Um 19.45 Uhr. Die Fahrkarte kostet 58 Euro. Mit Sitzplatzreservierung 62,50 Euro.',
      phonetic: 'oom NOYN-tsehn OOR FYOONF-oont-VEER-tsikh. dee FAHR-kar-tuh KOS-tet AKHT-oont-FYOONF-tsikh OY-ro. mit ZITS-plahts-reh-zehr-VEER-oong TSVAY-oont-ZEKH-tsikh OY-ro FYOONF-tsikh.',
      english: 'At 19:45. The ticket costs 58 euros. With seat reservation 62.50 euros.',
      explanation: 'Standard ticket price + optional reserved seat upgrade (+€4.50).'
    },
    {
      speaker: 'Passenger',
      role: 'Reisende (Passenger)',
      avatar: '👩',
      german: 'Ohne Reservierung, hier 58 Euro bitte!',
      phonetic: 'OH-nuh reh-zehr-VEER-oong, heer AKHT-oont-FYOONF-tsikh OY-ro BIT-tuh!',
      english: 'Without reservation, here is 58 euros please!',
      explanation: 'Confirming choice and handing over payment.'
    },
    {
      speaker: 'Clerk',
      role: 'Schalterbeamter (Ticket Clerk)',
      avatar: '👨‍💼',
      german: 'Alles klar. Und hier ist Ihre Fahrkarte. Gute Reise!',
      phonetic: 'AHL-les klahr. oont heer ist EE-ruh FAHR-kar-tuh. GOO-tuh RYE-zuh!',
      english: 'All right. And here is your ticket. Have a nice trip!',
      explanation: '"Gute Reise!" is the universal German wish for safe travels (like Safari Njema in Swahili!).'
    },
    {
      speaker: 'Passenger',
      role: 'Reisende (Passenger)',
      avatar: '👩',
      german: 'Danke schön! Auf Wiedersehen!',
      phonetic: 'DAHN-kuh shurn! owf VEE-der-zay-en!',
      english: 'Thank you very much! Goodbye!',
      explanation: 'Polite farewell sign-off.'
    }
  ];

  // Helper calculation for custom ticket price
  const basePrice = ticketChoice.fareType === 'spar' ? selectedRoute.sparpreis : selectedRoute.flexpreis;
  const multiplier = ticketChoice.type === 'hin-zurueck' ? 1.85 : 1.0;
  const reservationFee = ticketChoice.seatReservation ? (ticketChoice.type === 'hin-zurueck' ? 9.00 : 4.50) : 0;
  const calculatedTotal = (basePrice * multiplier + reservationFee).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden mb-8">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-rose-700 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm mb-2">
              <span>🚆</span> Lesson 64 Master Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Eine Fahrkarte kaufen & DB-Fahrplan
            </h2>
            <p className="text-amber-100 text-sm mt-1 max-w-2xl">
              Decode real German train timetables, read track & transfer details, master one-way vs. round-trip, and roleplay authentic ticket counter conversations!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-xl backdrop-blur-sm">
            <button
              onClick={() => {
                playChime('click');
                speak('Eine Fahrkarte nach München bitte!');
              }}
              className="px-3 py-1.5 bg-white text-red-700 hover:bg-amber-50 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>🔊</span> Hear Key Ticket Phrase
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-1 border-b border-white/20">
          <button
            onClick={() => { playChime('click'); setActiveTab('fahrplan'); }}
            className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'fahrplan'
                ? 'bg-white text-red-700 shadow-md'
                : 'text-amber-100 hover:bg-white/10'
            }`}
          >
            <span>📋</span> 1. DB Timetable & Trip Inspector
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('schalter'); }}
            className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'schalter'
                ? 'bg-white text-red-700 shadow-md'
                : 'text-amber-100 hover:bg-white/10'
            }`}
          >
            <span>👨‍💼</span> 2. Counter Ticket Roleplay Duet
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('guide'); }}
            className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'bg-white text-red-700 shadow-md'
                : 'text-amber-100 hover:bg-white/10'
            }`}
          >
            <span>🚇</span> 3. Transit Types & Buying Channels
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-amber-50/40">
        {/* ========================================================================= */}
        {/* TAB 1: DB FAHRPLAN & TRIP INSPECTOR (SLIDES 19-32) */}
        {/* ========================================================================= */}
        {activeTab === 'fahrplan' && (
          <div className="space-y-6">
            {/* Intro banner */}
            <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm flex items-start gap-3">
              <span className="text-3xl">🇩🇪</span>
              <div className="text-xs sm:text-sm text-stone-700">
                <p className="font-bold text-red-900 mb-1">
                  How German Train Schedules (Fahrpläne) Work (Slides 19–32):
                </p>
                <p>
                  Deutsche Bahn timetables clearly display departure time (<strong>Abfahrt</strong>), arrival time (<strong>Ankunft</strong>), duration (<strong>Dauer</strong>), number of transfers (<strong>Umstiege / Umst.</strong>), train category (<strong>Produkte: ICE</strong>), discounted saver prices (<strong>Sparangebote</strong>), and flexible tickets (<strong>Flexpreis</strong>).
                </p>
              </div>
            </div>

            {/* Route Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {routes.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    playChime('click');
                    setSelectedRouteId(r.id);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border ${
                    selectedRouteId === r.id
                      ? 'bg-red-600 text-white border-red-700 shadow-md'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-red-300'
                  }`}
                >
                  <span>🚆</span>
                  <span>{r.from} ➔ {r.to}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedRouteId === r.id ? 'bg-red-800 text-white' : 'bg-stone-100 text-stone-600'}`}>
                    {r.products}
                  </span>
                </button>
              ))}
            </div>

            {/* Realistic Timetable Box */}
            <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-md overflow-hidden">
              <div className="bg-stone-100 px-4 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-extrabold text-sm">DB BAHN</span>
                  <span>|</span>
                  <span>Fahrplan & Reiseauskunft</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Pünktlich (On Time)</span>
                  <span>Verbindung für heute</span>
                </div>
              </div>

              {/* Main Timetable Row */}
              <div className="p-4 sm:p-6 border-b border-stone-200 bg-gradient-to-r from-stone-50 to-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Station & Times */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => speak(`Abfahrt von ${selectedRoute.from} um ${selectedRoute.depTime} Uhr`)}
                          className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center hover:bg-red-200 text-xs"
                          title="Listen"
                        >
                          🔊
                        </button>
                        <div>
                          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Abfahrt</p>
                          <p className="text-base font-black text-stone-900">{selectedRoute.from}</p>
                        </div>
                      </div>
                      <span className="text-lg font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                        {selectedRoute.depTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => speak(`Ankunft in ${selectedRoute.to} um ${selectedRoute.arrTime} Uhr`)}
                          className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center hover:bg-emerald-200 text-xs"
                          title="Listen"
                        >
                          🔊
                        </button>
                        <div>
                          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Ankunft</p>
                          <p className="text-base font-black text-stone-900">{selectedRoute.to}</p>
                        </div>
                      </div>
                      <span className="text-lg font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {selectedRoute.arrTime}
                      </span>
                    </div>
                  </div>

                  {/* Trip Stats */}
                  <div className="md:col-span-4 grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                    <div>
                      <p className="text-[10px] text-stone-500 font-bold uppercase">Dauer (Duration)</p>
                      <p className="text-xs font-black text-stone-800 mt-0.5">{selectedRoute.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-500 font-bold uppercase">Umst. (Transfers)</p>
                      <p className={`text-xs font-black mt-0.5 ${selectedRoute.transfers === 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {selectedRoute.transfers === 0 ? '0 (Direkt)' : `${selectedRoute.transfers}x Umstieg`}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-500 font-bold uppercase">Produkte</p>
                      <p className="text-xs font-black text-red-700 mt-0.5">{selectedRoute.products}</p>
                    </div>
                  </div>

                  {/* Pricing Offers */}
                  <div className="md:col-span-4 flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 bg-amber-50 border border-amber-300 p-2.5 rounded-xl text-center">
                      <p className="text-[10px] font-extrabold text-amber-900 uppercase">Sparangebot</p>
                      <p className="text-base font-black text-amber-800">€{selectedRoute.sparpreis.toFixed(2)}</p>
                      <p className="text-[10px] text-amber-700">Zugbindung (Fixed train)</p>
                    </div>
                    <div className="flex-1 bg-stone-100 border border-stone-300 p-2.5 rounded-xl text-center">
                      <p className="text-[10px] font-extrabold text-stone-700 uppercase">Flexpreis</p>
                      <p className="text-base font-black text-stone-900">€{selectedRoute.flexpreis.toFixed(2)}</p>
                      <p className="text-[10px] text-stone-600">Volle Flexibilität</p>
                    </div>
                  </div>
                </div>

                {/* Details Toggle */}
                <div className="mt-4 pt-3 border-t border-stone-200 flex justify-between items-center">
                  <button
                    onClick={() => {
                      playChime('click');
                      setExpandedDetails(!expandedDetails);
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <span>{expandedDetails ? '▼ Details verbergen' : '▶ Details einblenden (Tracks & Transfers)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      playChime('click');
                      speak(`Wann fährt der Zug ab? Um ${selectedRoute.depTime} Uhr. Wann kommt er an? Um ${selectedRoute.arrTime} Uhr. Wie lange dauert die Fahrt? ${selectedRoute.duration}.`);
                    }}
                    className="text-xs bg-red-100 hover:bg-red-200 text-red-800 font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition-all"
                  >
                    <span>🔊</span> Timetable Audio Summary
                  </button>
                </div>
              </div>

              {/* Expanded Segment Detail Cards (Slides 28-32) */}
              {expandedDetails && (
                <div className="p-4 sm:p-6 bg-stone-50/70 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Reiseabschnitte & Umstiege (Train Legs, Tracks & Transfer Times):
                  </h4>

                  {selectedRoute.legs.map((leg, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded">
                            {leg.train}
                          </span>
                          <span className="text-xs font-semibold text-stone-600">{leg.direction}</span>
                        </div>
                        <span className="text-xs text-stone-500 font-mono">Bordrestaurant • WLAN • Steckdosen</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {/* Departure sub-leg */}
                        <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                          <span className="text-red-600 font-bold">Ab:</span>
                          <div>
                            <p className="font-bold text-stone-900">{leg.depStation}</p>
                            <p className="text-stone-600 font-semibold">{leg.depTime} Uhr ➔ <strong className="text-red-700 bg-red-100 px-1.5 py-0.5 rounded font-black">{leg.depGleis}</strong></p>
                          </div>
                        </div>

                        {/* Arrival sub-leg */}
                        <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                          <span className="text-emerald-700 font-bold">An:</span>
                          <div>
                            <p className="font-bold text-stone-900">{leg.arrStation}</p>
                            <p className="text-stone-600 font-semibold">{leg.arrTime} Uhr ➔ <strong className="text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-black">{leg.arrGleis}</strong></p>
                          </div>
                        </div>
                      </div>

                      {leg.transferDuration && (
                        <div className="bg-amber-100/70 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                          <span>🔄</span>
                          <span>{leg.transferDuration} (Slide 32: transfer buffer to switch platforms)</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Timetable Q&A Decoder (Slide 21-31) */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
              <h3 className="text-base font-black text-amber-950 mb-3 flex items-center gap-2">
                <span>💡</span> 5 Essential Timetable Questions & Answers (Slide 21–31)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  onClick={() => {
                    playChime('click');
                    speak(`Wann fährt der Zug von ${selectedRoute.from} ab? Um ${selectedRoute.depTime} Uhr.`);
                  }}
                  className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 cursor-pointer hover:bg-amber-100/60 transition-all"
                >
                  <p className="text-xs font-bold text-red-700">1. Wann fährt der Zug von {selectedRoute.from} ab?</p>
                  <p className="text-xs text-stone-500">When does the train depart from {selectedRoute.from}?</p>
                  <p className="text-sm font-black text-stone-900 mt-1">➔ Um {selectedRoute.depTime} Uhr</p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak(`Wann kommt der Zug in ${selectedRoute.to} an? Um ${selectedRoute.arrTime} Uhr.`);
                  }}
                  className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 cursor-pointer hover:bg-amber-100/60 transition-all"
                >
                  <p className="text-xs font-bold text-red-700">2. Wann kommt der Zug in {selectedRoute.to} an?</p>
                  <p className="text-xs text-stone-500">When does the train arrive in {selectedRoute.to}?</p>
                  <p className="text-sm font-black text-stone-900 mt-1">➔ Um {selectedRoute.arrTime} Uhr</p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak(`Muss man umsteigen? ${selectedRoute.transfers === 0 ? 'Nein, es ist ein direkter Zug.' : 'Ja, einmal in ' + selectedRoute.legs[0].arrStation + '.'}`);
                  }}
                  className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 cursor-pointer hover:bg-amber-100/60 transition-all"
                >
                  <p className="text-xs font-bold text-red-700">3. Muss man umsteigen? (Do you have to transfer?)</p>
                  <p className="text-xs text-stone-500">Do I have to change trains along the way?</p>
                  <p className="text-sm font-black text-stone-900 mt-1">
                    ➔ {selectedRoute.transfers === 0 ? 'Nein. Es ist ein Direktzug.' : `Ja. Einmal in ${selectedRoute.legs[0].arrStation}.`}
                  </p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak(`Auf welchem Gleis fährt der Zug ab? Auf ${selectedRoute.legs[0].depGleis}.`);
                  }}
                  className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 cursor-pointer hover:bg-amber-100/60 transition-all"
                >
                  <p className="text-xs font-bold text-red-700">4. Auf welchem Gleis fährt der Zug ab?</p>
                  <p className="text-xs text-stone-500">On which track does the train depart?</p>
                  <p className="text-sm font-black text-stone-900 mt-1">➔ Auf {selectedRoute.legs[0].depGleis}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SCHALTER ROLEPLAY DUET (SLIDES 35-46) */}
        {/* ========================================================================= */}
        {activeTab === 'schalter' && (
          <div className="space-y-6">
            {/* Context bar */}
            <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs uppercase font-bold text-red-700">Am Fahrkartenschalter (Slide 35–46)</p>
                <h3 className="text-base font-black text-stone-900">
                  Buying a Ticket to Munich In-Person at the DB Counter
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    playChime('click');
                    setCurrentStep(Math.max(0, currentStep - 1));
                  }}
                  disabled={currentStep === 0}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-lg text-xs font-bold text-stone-700"
                >
                  ◀ Previous
                </button>
                <button
                  onClick={() => {
                    playChime('click');
                    const next = Math.min(dialogueSteps.length - 1, currentStep + 1);
                    setCurrentStep(next);
                    speak(dialogueSteps[next].german);
                  }}
                  disabled={currentStep === dialogueSteps.length - 1}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 rounded-lg text-xs font-bold text-white shadow-sm"
                >
                  Next Line ▶
                </button>
              </div>
            </div>

            {/* Interactive Dialogue Stage */}
            <div className="space-y-3">
              {dialogueSteps.map((step, idx) => {
                const isCurrent = idx === currentStep;
                const isPast = idx < currentStep;
                const isClerk = step.speaker === 'Clerk';

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      playChime('click');
                      setCurrentStep(idx);
                      speak(step.german);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isCurrent
                        ? isClerk
                          ? 'bg-red-50 border-red-500 shadow-md ring-2 ring-red-300'
                          : 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300'
                        : isPast
                        ? 'bg-white border-stone-200 opacity-90'
                        : 'bg-stone-50/60 border-dashed border-stone-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{step.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-black uppercase tracking-wider ${isClerk ? 'text-red-700' : 'text-amber-800'}`}>
                            {step.role}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">Step {idx + 1} of {dialogueSteps.length}</span>
                        </div>

                        <p className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                          <span>{step.german}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speak(step.german);
                            }}
                            className="w-6 h-6 rounded-full bg-stone-100 hover:bg-red-100 text-stone-700 hover:text-red-700 flex items-center justify-center text-xs"
                          >
                            🔊
                          </button>
                        </p>

                        <p className="text-xs text-stone-500 font-medium italic mt-0.5">
                          {step.phonetic}
                        </p>
                        <p className="text-xs text-stone-700 font-semibold mt-1">
                          "{step.english}"
                        </p>
                        <p className="text-[11px] text-amber-900 bg-white/70 px-2 py-0.5 rounded mt-2 border border-stone-100">
                          💡 <strong>Key takeaway:</strong> {step.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Ticket Pricing Simulator */}
            <div className="bg-white p-5 rounded-2xl border-2 border-stone-200 shadow-md space-y-4">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>🧮</span> Interactive Ticket Builder & Fare Calculator
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* One-way vs Round-trip */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <label className="block text-xs font-bold text-stone-600 uppercase mb-2">
                    Fahrt-Art (Direction)
                  </label>
                  <div className="space-y-1.5 text-xs">
                    <button
                      onClick={() => {
                        playChime('click');
                        setTicketChoice({ ...ticketChoice, type: 'einfach' });
                        speak('Nur Hinfahrt, einfach bitte.');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        ticketChoice.type === 'einfach'
                          ? 'bg-red-600 text-white border-red-700'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Einfach (Nur Hinfahrt)
                    </button>
                    <button
                      onClick={() => {
                        playChime('click');
                        setTicketChoice({ ...ticketChoice, type: 'hin-zurueck' });
                        speak('Hin und zurück bitte.');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        ticketChoice.type === 'hin-zurueck'
                          ? 'bg-red-600 text-white border-red-700'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Hin und zurück (Round trip)
                    </button>
                  </div>
                </div>

                {/* Sparpreis vs Flexpreis */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <label className="block text-xs font-bold text-stone-600 uppercase mb-2">
                    Tarif-Typ (Fare Plan)
                  </label>
                  <div className="space-y-1.5 text-xs">
                    <button
                      onClick={() => {
                        playChime('click');
                        setTicketChoice({ ...ticketChoice, fareType: 'spar' });
                        speak('Im Sparangebot.');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        ticketChoice.fareType === 'spar'
                          ? 'bg-amber-600 text-white border-amber-700'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Sparangebot (€{selectedRoute.sparpreis.toFixed(2)})
                    </button>
                    <button
                      onClick={() => {
                        playChime('click');
                        setTicketChoice({ ...ticketChoice, fareType: 'flex' });
                        speak('Zum Flexpreis.');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        ticketChoice.fareType === 'flex'
                          ? 'bg-amber-600 text-white border-amber-700'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Flexpreis (€{selectedRoute.flexpreis.toFixed(2)})
                    </button>
                  </div>
                </div>

                {/* Seat Reservation */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <label className="block text-xs font-bold text-stone-600 uppercase mb-2">
                    Sitzplatzreservierung (Slide 43)
                  </label>
                  <div className="space-y-1.5 text-xs">
                    <button
                      onClick={() => {
                        playChime('click');
                        setTicketChoice({ ...ticketChoice, seatReservation: false });
                        speak('Ohne Reservierung.');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        !ticketChoice.seatReservation
                          ? 'bg-stone-800 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Ohne Reservierung (+€0.00)
                    </button>
                    <button
                      onClick={() => {
                        playChime('click');
                        setTicketChoice({ ...ticketChoice, seatReservation: true });
                        speak('Mit Sitzplatzreservierung bitte.');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        ticketChoice.seatReservation
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Mit Reservierung (+€{ticketChoice.type === 'hin-zurueck' ? '9.00' : '4.50'})
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Summary Box */}
              <div className="bg-gradient-to-r from-red-600 to-amber-600 p-4 rounded-xl text-white flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-amber-100 font-bold uppercase">Gesamtpreis (Total Fare):</p>
                  <p className="text-2xl font-black">€{calculatedTotal} Euro</p>
                  <p className="text-xs text-white/80">
                    {selectedRoute.from} ➔ {selectedRoute.to} • {ticketChoice.type === 'einfach' ? 'Einfach' : 'Hin & Zurück'} • {ticketChoice.seatReservation ? 'Mit Sitzplatz' : 'Ohne Sitzplatz'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    playChime('success');
                    speak(`Die Fahrkarte kostet ${calculatedTotal} Euro. Gute Reise!`);
                  }}
                  className="px-4 py-2 bg-white text-red-700 font-black rounded-xl hover:bg-amber-50 text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>🎫</span> Print / Announce Fare
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TRANSIT TYPES & BUYING CHANNELS (SLIDES 2, 7, 8, 34) */}
        {/* ========================================================================= */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            {/* Transit Categories (Slide 2) */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>🚆</span> 4 Train & Transit Categories in Germany (Slide 2)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => {
                    playChime('click');
                    speak('Der ICE, InterCity Express. Der schnellste Zug in Deutschland.');
                  }}
                  className="p-4 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded">ICE</span>
                    <span className="font-black text-stone-900 text-sm">InterCity Express (High-Speed Bullet)</span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1">
                    Germany's flagship high-speed train reaching up to <strong>300 km/h</strong>. Connects major cities (Berlin, Munich, Frankfurt, Hamburg) and international capitals (Paris, Zurich, Vienna).
                  </p>
                  <p className="text-[11px] text-red-800 font-semibold mt-2">
                    🇰🇪 <em>Kenyan Analogy:</em> Like the high-speed SGR express non-stop from Nairobi to Mombasa.
                  </p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak('Die Regionalbahn, RB. Sie hält an vielen kleineren Bahnhöfen.');
                  }}
                  className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-600 text-white font-black text-xs px-2 py-0.5 rounded">RB / RE</span>
                    <span className="font-black text-stone-900 text-sm">Regionalbahn & Regional-Express</span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1">
                    Regional trains that serve smaller towns and regional counties within each federal state (Bundesland). Ideal for scenic hops and day trips.
                  </p>
                  <p className="text-[11px] text-blue-800 font-semibold mt-2">
                    🇰🇪 <em>Kenyan Analogy:</em> Like the inter-county train stopping at Athi River, Emali, Kibwezi, and Voi.
                  </p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak('Die S-Bahn, Stadtschnellbahn. Schneller Zug für die Vororte.');
                  }}
                  className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded">S-Bahn</span>
                    <span className="font-black text-stone-900 text-sm">Stadtschnellbahn (Suburban Rail)</span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1">
                    Above-ground suburban commuter trains connecting the city centre with surrounding suburbs, universities, and airports.
                  </p>
                  <p className="text-[11px] text-emerald-800 font-semibold mt-2">
                    🇰🇪 <em>Kenyan Analogy:</em> Like the Nairobi commuter rail connecting Syokimau, Kikuyu, and Ruiru to CBD.
                  </p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak('Die U-Bahn, Untergrundbahn. Die Metro unter der Stadt.');
                  }}
                  className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded">U-Bahn</span>
                    <span className="font-black text-stone-900 text-sm">Untergrundbahn (City Subway / Metro)</span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1">
                    Underground metro lines running entirely within dense city centers (Berlin, Munich, Hamburg, Frankfurt) every 3–5 minutes.
                  </p>
                  <p className="text-[11px] text-indigo-800 font-semibold mt-2">
                    🇰🇪 <em>Kenyan Analogy:</em> Like an underground subway system whisking passengers between Westlands, Upper Hill, and CBD.
                  </p>
                </div>
              </div>
            </div>

            {/* Where to buy tickets (Slide 34) */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>📍</span> Wo kann man ein Ticket kaufen? (Slide 34)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div
                  onClick={() => {
                    playChime('click');
                    speak('Am Fahrkartenschalter im Reisezentrum.');
                  }}
                  className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer transition-all"
                >
                  <span className="text-2xl">👨‍💼</span>
                  <p className="text-xs font-black text-stone-900 mt-1">am Fahrkartenschalter</p>
                  <p className="text-[11px] text-stone-500">at the ticket counter</p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak('Am Fahrkartenautomaten am Bahnsteig.');
                  }}
                  className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer transition-all"
                >
                  <span className="text-2xl">🏧</span>
                  <p className="text-xs font-black text-stone-900 mt-1">am Fahrkartenautomaten</p>
                  <p className="text-[11px] text-stone-500">at the ticket machine</p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak('In einer App, wie DB Navigator.');
                  }}
                  className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer transition-all"
                >
                  <span className="text-2xl">📱</span>
                  <p className="text-xs font-black text-stone-900 mt-1">in einer App (DB Navigator)</p>
                  <p className="text-[11px] text-stone-500">on smartphone app</p>
                </div>

                <div
                  onClick={() => {
                    playChime('click');
                    speak('Online auf www.db.de.');
                  }}
                  className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 cursor-pointer transition-all"
                >
                  <span className="text-2xl">💻</span>
                  <p className="text-xs font-black text-stone-900 mt-1">online (www.db.de)</p>
                  <p className="text-[11px] text-stone-500">online on the web</p>
                </div>
              </div>
            </div>

            {/* German Railway Movement & Past Tense Verbs with 'sein' */}
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-300">
              <h4 className="text-sm font-black text-amber-950 mb-2 flex items-center gap-2">
                <span>⚠️</span> The Golden Transit Grammar Rule: Movement Verbs take "sein"!
              </h4>
              <p className="text-xs text-amber-900 mb-3">
                All German transit verbs involving physical travel or position change use the auxiliary verb <strong>sein</strong> in the Perfekt past tense:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <p className="font-bold text-red-700">abfahren ➔ ist abgefahren</p>
                  <p className="text-stone-600">Der Zug <strong>ist</strong> pünktlich abgefahren.</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <p className="font-bold text-emerald-700">ankommen ➔ ist angekommen</p>
                  <p className="text-stone-600">Der Zug <strong>ist</strong> um 20 Uhr angekommen.</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <p className="font-bold text-blue-700">umsteigen ➔ ist umgestiegen</p>
                  <p className="text-stone-600">Ich <strong>bin</strong> in Nürnberg umgestiegen.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
