import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson61PostStudio({ isSlowMode }) {
  const [activeSubTab, setActiveSubTab] = useState('counter');

  // Tab 1: Post Counter State
  const [selectedProduct, setSelectedProduct] = useState('paket'); // 'brief', 'postkarte', 'einschreiben', 'paeckchen', 'paket'
  const [destination, setDestination] = useState('London'); // 'Deutschland', 'London', 'Nairobi'
  const [quantity, setQuantity] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);

  // Tab 2: Envelope Lab State
  const [sender, setSender] = useState({
    name: 'Melanie Schmidt',
    strasse: 'Musterstraße 22',
    plz: '12345',
    ort: 'Berlin'
  });

  const [receiver, setReceiver] = useState({
    name: 'Max Mustermann',
    strasse: 'Goethestraße 1',
    plz: '12345',
    ort: 'München'
  });

  const [stampPasted, setStampPasted] = useState(true);
  const [letterInEnvelope, setLetterInEnvelope] = useState(true);
  const [droppedInMailbox, setDroppedInMailbox] = useState(false);

  // Pricing calculation table
  const getProductPrice = () => {
    let base = 0;
    if (selectedProduct === 'postkarte') base = destination === 'Deutschland' ? 0.70 : 0.95;
    else if (selectedProduct === 'brief') base = destination === 'Deutschland' ? 0.85 : 1.10;
    else if (selectedProduct === 'einschreiben') base = destination === 'Deutschland' ? 3.50 : 4.50;
    else if (selectedProduct === 'paeckchen') base = destination === 'Deutschland' ? 3.99 : destination === 'London' ? 9.00 : 16.00;
    else if (selectedProduct === 'paket') base = destination === 'Deutschland' ? 6.99 : destination === 'London' ? 14.99 : 32.99;

    if (isRegistered && selectedProduct !== 'einschreiben') {
      base += 2.65;
    }
    return (base * quantity).toFixed(2);
  };

  const getDeliveryTime = () => {
    if (destination === 'Deutschland') return '1 bis 2 Werktage';
    if (destination === 'London') return '3 bis 5 Werktage';
    return '7 bis 14 Werktage (Luftpost)';
  };

  const handleDropMailbox = () => {
    setDroppedInMailbox(true);
    playChime('click');
    speakGerman("Ich werfe den Brief in den Briefkasten ein. Der Brief ist eingeworfen!", isSlowMode);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-yellow-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>🏤</span> Lesson 61 Studio: Die Post & Versand
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-tight">
            Deutsche Post & DHL Shipping Desk
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Send letters (<em>Briefe</em>), buy stamps (<em>Briefmarken</em>), ship parcels (<em>Pakete & Päckchen</em>), track registered mail (<em>Einschreiben & Sendungsnummer</em>), and master German envelope formatting!
          </p>
        </div>

        {/* Sub-tab Navigation Buttons */}
        <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-amber-700/40 relative z-10">
          <button
            onClick={() => setActiveSubTab('counter')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'counter'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-700/50'
            }`}
          >
            <span>🪟</span> Interactive Postal Counter (Am Schalter)
          </button>
          <button
            onClick={() => setActiveSubTab('envelopeLab')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'envelopeLab'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-700/50'
            }`}
          >
            <span>✉️</span> Envelope & Label Lab (Brief & Paket)
          </button>
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'matrix'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-700/50'
            }`}
          >
            <span>📊</span> Postal Vocabulary & Motion Grammar
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: The Interactive Postal Counter (Am Postschalter) */}
      {/* ========================================================= */}
      {activeSubTab === 'counter' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Postal Product Selection Panel */}
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div className="pb-3 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                    <span>📦</span> Choose Your Postal Item
                  </h3>
                  <p className="text-stone-500 text-xs mt-0.5">
                    Select a shipping format, destination, and quantity.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-yellow-100 text-yellow-900 rounded-lg text-xs font-black">
                  Schalter 3
                </span>
              </div>

              {/* Product Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'brief', name: 'der Brief', sub: 'Standard letter', icon: '✉️' },
                  { id: 'postkarte', name: 'die Postkarte', sub: 'Postcard', icon: '🌄' },
                  { id: 'einschreiben', name: 'das Einschreiben', sub: 'Registered mail', icon: '🔒' },
                  { id: 'paeckchen', name: 'das Päckchen', sub: 'Small box (<2kg)', icon: '📦' },
                  { id: 'paket', name: 'das Paket', sub: 'Parcel (insured)', icon: '📫' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p.id);
                      if (p.id === 'einschreiben') setIsRegistered(true);
                      playChime('click');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedProduct === p.id
                        ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-400 font-extrabold shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <span className="text-xl block">{p.icon}</span>
                    <span className="text-xs font-bold text-stone-900 block mt-1">{p.name}</span>
                    <span className="text-[10px] text-stone-500">{p.sub}</span>
                  </button>
                ))}
              </div>

              {/* Destination Selector */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-700">
                  Destination (Reiseziel / Bestimmungsland)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Deutschland', label: '🇩🇪 Deutschland (Inland)' },
                    { id: 'London', label: '🇬🇧 London (EU/UK)' },
                    { id: 'Nairobi', label: '🇰🇪 Nairobi (Kenia)' }
                  ].map(d => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDestination(d.id);
                        playChime('click');
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all ${
                        destination === d.id
                          ? 'bg-amber-800 text-amber-100 shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Quantity (Anzahl)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-stone-200 text-stone-800 font-bold hover:bg-stone-300"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-sm text-stone-900 px-3">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-stone-200 text-stone-800 font-bold hover:bg-stone-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Special Service (Zusatzservice)
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-stone-800 bg-stone-50 p-2 rounded-xl border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRegistered || selectedProduct === 'einschreiben'}
                      disabled={selectedProduct === 'einschreiben'}
                      onChange={(e) => setIsRegistered(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>per Einschreiben (+2,65 €)</span>
                  </label>
                </div>
              </div>

              {/* Calculated Price & Transit Badge */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-100 p-4 rounded-2xl border border-amber-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-amber-800 block">
                    Gesamtpreis (Total Postage)
                  </span>
                  <span className="text-2xl font-black text-amber-950">
                    {getProductPrice()} €
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-extrabold text-amber-800 block">
                    Lieferzeit (Transit)
                  </span>
                  <span className="text-xs font-bold text-amber-900">
                    ⏱️ {getDeliveryTime()}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Counter Roleplay Simulator */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 animate-ping" />
                    <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
                      Am Postschalter (Counter Dialogue)
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">Deutsche Post Dialog</span>
                </div>

                {/* Chat Bubbles */}
                <div className="space-y-3 font-sans text-xs sm:text-sm">
                  {/* Customer line 1 */}
                  <div className="flex items-start gap-2.5">
                    <span className="text-lg bg-amber-100 p-1.5 rounded-full flex-shrink-0">🙋</span>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl rounded-tl-none space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-800 uppercase">Sie (Kunde):</span>
                        <button
                          onClick={() => speakGerman(
                            selectedProduct === 'brief'
                              ? `Ich möchte gern diesen Brief nach ${destination} schicken.`
                              : selectedProduct === 'postkarte'
                              ? `Ich hätte gern ${quantity} Briefmarken für Postkarten nach ${destination}.`
                              : `Ich möchte gern dieses ${selectedProduct === 'paket' ? 'Paket' : 'Päckchen'} nach ${destination} schicken.`,
                            isSlowMode
                          )}
                          className="text-amber-800 hover:text-amber-950 font-bold text-xs"
                        >
                          🔊 Play
                        </button>
                      </div>
                      <p className="font-bold text-stone-900">
                        {selectedProduct === 'brief'
                          ? `Guten Tag! Ich möchte gern diesen Brief nach ${destination} schicken.`
                          : selectedProduct === 'postkarte'
                          ? `Guten Tag! Ich hätte gern ${quantity} Briefmarke(n) für Postkarten nach ${destination}.`
                          : `Guten Tag! Ich möchte gern dieses ${selectedProduct === 'paket' ? 'Paket' : 'Päckchen'} nach ${destination} schicken.`}
                      </p>
                    </div>
                  </div>

                  {/* Customer line 2 (Price & Duration Inquiries) */}
                  <div className="flex items-start gap-2.5">
                    <span className="text-lg bg-amber-100 p-1.5 rounded-full flex-shrink-0">🙋</span>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl rounded-tl-none space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-800 uppercase">Sie (Fragen):</span>
                        <button
                          onClick={() => speakGerman(
                            `Wieviel kostet dieses ${selectedProduct === 'paket' ? 'Paket' : 'Schreiben'} nach ${destination} und wie lange braucht es?`,
                            isSlowMode
                          )}
                          className="text-amber-800 hover:text-amber-950 font-bold text-xs"
                        >
                          🔊 Play
                        </button>
                      </div>
                      <p className="font-bold text-stone-900">
                        Wieviel kostet das nach {destination} und wie lange braucht es?
                      </p>
                      {(isRegistered || selectedProduct === 'einschreiben') && (
                        <p className="text-amber-900 text-xs italic">
                          "Ich möchte gern diesen Brief per Einschreiben schicken!"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Clerk response */}
                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="bg-stone-900 text-stone-100 p-3.5 rounded-2xl rounded-tr-none space-y-1.5 flex-1 max-w-sm">
                      <div className="flex items-center justify-between text-yellow-300">
                        <span className="text-[10px] font-bold uppercase">Postbeamter (Clerk):</span>
                        <button
                          onClick={() => speakGerman(
                            `Das macht zusammen ${getProductPrice()} Euro. Das Paket braucht etwa ${getDeliveryTime()}. Hier ist Ihre Quittung und Ihre Sendungsnummer.`,
                            isSlowMode
                          )}
                          className="text-yellow-300 hover:text-yellow-100 font-bold text-xs"
                        >
                          🔊 Play
                        </button>
                      </div>
                      <p className="font-semibold text-xs leading-relaxed">
                        "Das macht zusammen <strong className="text-yellow-300">{getProductPrice()} Euro</strong>. Das dauert etwa <strong className="text-yellow-300">{getDeliveryTime()}</strong>."
                      </p>
                      {(isRegistered || selectedProduct === 'paket' || selectedProduct === 'einschreiben') && (
                        <div className="bg-stone-800 p-2 rounded-lg border border-stone-700 text-[11px] space-y-0.5">
                          <span className="text-stone-400 block text-[10px]">Tracking Number:</span>
                          <span className="font-mono text-yellow-400 font-bold">
                            📦 Sendungsnummer: DE-8392-7491-99
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-lg bg-stone-800 p-1.5 rounded-full flex-shrink-0">👨‍💼</span>
                  </div>
                </div>
              </div>

              {/* Full Audio Button */}
              <button
                onClick={() => speakGerman(
                  `Guten Tag! Ich möchte gern dieses Paket nach ${destination} schicken. Wieviel kostet das und wie lange braucht es? Der Postbeamte sagt: Das macht ${getProductPrice()} Euro und dauert ${getDeliveryTime()}. Hier ist Ihre Sendungsnummer.`,
                  isSlowMode
                )}
                className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-amber-100 font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all text-xs sm:text-sm"
              >
                <span>🔊</span> Listen to Full German Counter Conversation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: Interactive Envelope & Parcel Addressing Lab */}
      {/* ========================================================= */}
      {activeSubTab === 'envelopeLab' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
              <div className="pb-3 border-b border-stone-200">
                <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                  <span>📐</span> German Address Layout Rule
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  In Germany, envelope addresses follow a strict standard: Sender (top-left) & Recipient (bottom-right).
                </p>
              </div>

              {/* Sender Details (Absender) */}
              <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📍</span> Der Absender (Sender - Oben Links)
                </span>
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase">Name:</label>
                  <input
                    type="text"
                    value={sender.name}
                    onChange={(e) => setSender({ ...sender, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase">Straße & Hausnummer:</label>
                  <input
                    type="text"
                    value={sender.strasse}
                    onChange={(e) => setSender({ ...sender, strasse: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">PLZ:</label>
                    <input
                      type="text"
                      value={sender.plz}
                      onChange={(e) => setSender({ ...sender, plz: e.target.value })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">Ort:</label>
                    <input
                      type="text"
                      value={sender.ort}
                      onChange={(e) => setSender({ ...sender, ort: e.target.value })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Details (Empfänger) */}
              <div className="space-y-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎯</span> Der Empfänger (Receiver - Unten Rechts)
                </span>
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase">Name:</label>
                  <input
                    type="text"
                    value={receiver.name}
                    onChange={(e) => setReceiver({ ...receiver, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-amber-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase">Straße & Hausnummer:</label>
                  <input
                    type="text"
                    value={receiver.strasse}
                    onChange={(e) => setReceiver({ ...receiver, strasse: e.target.value })}
                    className="w-full px-3 py-1.5 border border-amber-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">PLZ:</label>
                    <input
                      type="text"
                      value={receiver.plz}
                      onChange={(e) => setReceiver({ ...receiver, plz: e.target.value })}
                      className="w-full px-3 py-1.5 border border-amber-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase">Ort:</label>
                    <input
                      type="text"
                      value={receiver.ort}
                      onChange={(e) => setReceiver({ ...receiver, ort: e.target.value })}
                      className="w-full px-3 py-1.5 border border-amber-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Toggles */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-700 block">Envelope Actions:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setStampPasted(!stampPasted);
                      playChime('click');
                      speakGerman(stampPasted ? "Briefmarke entfernt." : "Eine Briefmarke aufkleben. Die Briefmarke ist aufgeklebt!", isSlowMode);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      stampPasted ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {stampPasted ? '✅ Briefmarke aufgeklebt' : '🏷️ Briefmarke aufkleben'}
                  </button>
                  <button
                    onClick={() => {
                      setLetterInEnvelope(!letterInEnvelope);
                      playChime('click');
                      speakGerman(letterInEnvelope ? "Brief herausgenommen." : "Den Brief in den Umschlag tun.", isSlowMode);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      letterInEnvelope ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {letterInEnvelope ? '✅ Brief im Umschlag' : '📄 In Umschlag tun'}
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Envelope Mockup */}
            <div className="lg:col-span-7 bg-stone-100 p-6 sm:p-8 rounded-3xl border-2 border-stone-300 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                    ✉️ Der Briefumschlag (Das Kuvert) - DIN Lang
                  </span>
                  <span className="text-xs text-stone-500 italic">
                    Normgerechte deutsche Briefbeschriftung
                  </span>
                </div>

                {/* The Envelope Graphic */}
                <div className="bg-white rounded-2xl border-2 border-stone-300 shadow-lg p-6 sm:p-8 relative min-h-[260px] flex flex-col justify-between font-sans">
                  {/* Airmail border stripes styling */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-white to-blue-600 rounded-t-xl opacity-80" />

                  {/* Top Row: Sender (Left) & Stamp (Right) */}
                  <div className="flex items-start justify-between">
                    {/* Der Absender */}
                    <div className="space-y-0.5 text-xs text-stone-600 border-l-2 border-stone-300 pl-2">
                      <span className="text-[10px] font-black uppercase text-stone-400 block">
                        Absender (Sender):
                      </span>
                      <p className="font-bold text-stone-800">{sender.name}</p>
                      <p>{sender.strasse}</p>
                      <p>{sender.plz} {sender.ort}</p>
                    </div>

                    {/* Die Briefmarke */}
                    <div className="flex flex-col items-center">
                      {stampPasted ? (
                        <div className="w-16 h-20 bg-gradient-to-br from-amber-100 to-yellow-200 border-2 border-dashed border-amber-600 rounded-lg p-1.5 flex flex-col items-center justify-between shadow-sm rotate-2 animate-fadeIn">
                          <span className="text-lg">🌸</span>
                          <span className="text-[9px] font-bold text-amber-900 font-mono">0,85 €</span>
                          <span className="text-[7px] text-stone-500 uppercase font-bold">DEUTSCHE POST</span>
                        </div>
                      ) : (
                        <div className="w-16 h-20 bg-stone-50 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-center p-1 text-[9px] text-stone-400 font-bold">
                          Hier Briefmarke aufkleben
                        </div>
                      )}
                      <span className="text-[10px] text-stone-400 mt-1 font-bold">Oben rechts</span>
                    </div>
                  </div>

                  {/* Bottom Row: Empfänger (Right aligned) */}
                  <div className="flex justify-end pt-8">
                    <div className="w-64 space-y-0.5 text-xs bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                      <span className="text-[10px] font-black uppercase text-amber-900 block">
                        Empfänger (Receiver):
                      </span>
                      <p className="font-extrabold text-sm text-stone-900">{receiver.name}</p>
                      <p className="font-semibold text-stone-800">{receiver.strasse}</p>
                      <p className="font-extrabold text-stone-900">{receiver.plz} {receiver.ort}</p>
                      <p className="text-[10px] text-stone-500 uppercase font-bold">Deutschland</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action: Einwerfen / Postbox Drop */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center text-2xl shadow-sm">
                    📮
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                      Der Briefkasten (Deutsche Post Mailbox)
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      {droppedInMailbox ? 'Der Brief ist eingeworfen!' : 'Bereit zum Einwerfen.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDropMailbox}
                  className="w-full sm:w-auto px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-black rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>📥</span> {droppedInMailbox ? 'Noch einmal einwerfen' : 'In Briefkasten einwerfen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: Postal Vocabulary & Motion Grammar Matrix */}
      {/* ========================================================= */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 1: Movement (Wohin?) vs Location (Wo?) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="pb-3 border-b border-stone-200">
              <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
                <span>🚶</span> Movement vs. Stationary Location (zur Post vs. in der Post)
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                How Germans change the preposition when moving to the post office versus already being inside (Slides 4–6).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Movement */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
                    Wohin gehst du? (Movement)
                  </span>
                  <button
                    onClick={() => speakGerman("Wohin gehst du? Ich gehe zur Post.", isSlowMode)}
                    className="text-amber-800 hover:text-amber-950 text-xs font-bold"
                  >
                    🔊 Play
                  </button>
                </div>
                <p className="font-black text-stone-900 text-base sm:text-lg">
                  Ich gehe <span className="text-amber-700 underline decoration-amber-500">zur Post</span>.
                </p>
                <p className="text-stone-600 text-xs leading-relaxed">
                  <strong>Grammar breakdown:</strong> 'zur' is the contraction of <em>zu + der Post</em> (Dativ feminine). Used whenever you are traveling / walking towards the post office.
                </p>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-teal-900 bg-teal-200/80 px-2.5 py-1 rounded-full">
                    Wo bist du? (Stationary Location)
                  </span>
                  <button
                    onClick={() => speakGerman("Wo bist du? Ich bin in der Post. Ich bin auf der Post. Ich bin bei der Post.", isSlowMode)}
                    className="text-teal-800 hover:text-teal-950 text-xs font-bold"
                  >
                    🔊 Play
                  </button>
                </div>
                <p className="font-black text-stone-900 text-base sm:text-lg">
                  Ich bin <span className="text-teal-700 underline decoration-teal-500">in / bei / auf der Post</span>.
                </p>
                <p className="text-stone-600 text-xs leading-relaxed">
                  <strong>Grammar breakdown:</strong> When you are physically inside the building, Germans say <em>in der Post</em>, <em>bei der Post</em>, or traditionally <em>auf der Post</em>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Postal Staff Roles (Slide 7) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
              <span>🧑‍💼</span> Postal Roles & Personnel (Die Berufe bei der Post)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {[
                { title: 'der Briefträger', fem: 'die Briefträgerin', sub: 'Postman / Mail carrier', icon: '📬', desc: 'Delivers letters to house letterboxes' },
                { title: 'der Paketbote', fem: 'die Paketbotin', sub: 'Package deliverer / Courier', icon: '🚚', desc: 'Drives the DHL van and delivers parcels' },
                { title: 'der Postbeamte', fem: 'die Postbeamtin', sub: 'Post office clerk', icon: '🪟', desc: 'Serves customers behind the counter' },
                { title: 'der Schalter', fem: 'die Schalter', sub: 'Service counter', icon: '🏢', desc: 'Where you buy stamps and weigh packages' }
              ].map((role, idx) => (
                <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <span className="text-2xl block">{role.icon}</span>
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-amber-900 text-sm block">{role.title}</span>
                    <span className="text-stone-500 font-medium block">{role.fem}</span>
                  </div>
                  <p className="text-stone-600 text-[11px] pt-1 border-t border-stone-200">
                    {role.desc}
                  </p>
                  <button
                    onClick={() => speakGerman(`${role.title}, ${role.fem}`, isSlowMode)}
                    className="text-amber-800 hover:text-amber-950 font-bold text-[10px] flex items-center gap-1"
                  >
                    <span>🔊</span> Pronounce
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Essential Postal Actions in Perfekt */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
              <span>⚡</span> Postal Verbs in Present & Past (Perfekt)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-yellow-50/60 rounded-2xl border border-yellow-200 space-y-1">
                <span className="font-bold text-amber-950 text-sm block">aufkleben ➔ hat aufgeklebt</span>
                <span className="text-stone-600 block">to stick / paste on (a stamp)</span>
                <p className="text-stone-500 text-[11px] italic">"Ich habe die Briefmarke aufgeklebt."</p>
              </div>

              <div className="p-4 bg-yellow-50/60 rounded-2xl border border-yellow-200 space-y-1">
                <span className="font-bold text-amber-950 text-sm block">abschicken ➔ hat abgeschickt</span>
                <span className="text-stone-600 block">to post / mail a letter</span>
                <p className="text-stone-500 text-[11px] italic">"Er hat den Brief gestern abgeschickt."</p>
              </div>

              <div className="p-4 bg-yellow-50/60 rounded-2xl border border-yellow-200 space-y-1">
                <span className="font-bold text-amber-950 text-sm block">einwerfen ➔ hat eingeworfen</span>
                <span className="text-stone-600 block">to drop into the postbox</span>
                <p className="text-stone-500 text-[11px] italic">"Sie hat den Brief eingeworfen."</p>
              </div>

              <div className="p-4 bg-yellow-50/60 rounded-2xl border border-yellow-200 space-y-1">
                <span className="font-bold text-amber-950 text-sm block">packen ➔ hat gepackt</span>
                <span className="text-stone-600 block">to pack a parcel/box</span>
                <p className="text-stone-500 text-[11px] italic">"Wir haben das Paket gepackt."</p>
              </div>

              <div className="p-4 bg-yellow-50/60 rounded-2xl border border-yellow-200 space-y-1">
                <span className="font-bold text-amber-950 text-sm block">verschicken ➔ hat verschickt</span>
                <span className="text-stone-600 block">to dispatch / ship out</span>
                <p className="text-stone-500 text-[11px] italic">"Ich habe das Päckchen verschickt."</p>
              </div>

              <div className="p-4 bg-yellow-50/60 rounded-2xl border border-yellow-200 space-y-1">
                <span className="font-bold text-amber-950 text-sm block">schicken ➔ per Einschreiben</span>
                <span className="text-stone-600 block">to send certified mail</span>
                <p className="text-stone-500 text-[11px] italic">"Ich schicke den Brief per Einschreiben."</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
