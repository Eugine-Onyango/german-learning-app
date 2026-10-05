import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson62BankStudio({ isSlowMode }) {
  const [activeSubTab, setActiveSubTab] = useState('atm');

  // ATM Simulator State
  const [atmScreen, setAtmScreen] = useState('insertCard'); // 'insertCard', 'enterPin', 'menu', 'withdraw', 'deposit', 'balance', 'statement', 'cashDispensed'
  const [enteredPin, setEnteredPin] = useState('');
  const [balance, setBalance] = useState(1450.00);
  const [lastWithdrawn, setLastWithdrawn] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [pinError, setPinError] = useState(false);
  const [statementPrinted, setStatementPrinted] = useState(false);

  // Transfer Slip State
  const [transfer, setTransfer] = useState({
    empfaenger: 'Vermieter Schmidt Immobilien GmbH',
    iban: 'DE11 5500 5500 1234 5678 90',
    bic: 'POBA DE33 XXX',
    betrag: '650.00',
    verwendungszweck: 'Miete Oktober 2026',
    ausgefuehrt: false
  });

  const CORRECT_PIN = '1234';

  // ATM Handlers
  const handleInsertCard = () => {
    setAtmScreen('enterPin');
    setEnteredPin('');
    setPinError(false);
    playChime('click');
    speakGerman("Girokarte eingeführt. Bitte geben Sie Ihre Geheimzahl ein.", isSlowMode);
  };

  const handlePinDigit = (digit) => {
    if (enteredPin.length < 4) {
      const nextPin = enteredPin + digit;
      setEnteredPin(nextPin);
      playChime('click');
      if (nextPin.length === 4) {
        if (nextPin === CORRECT_PIN) {
          setTimeout(() => {
            setAtmScreen('menu');
            speakGerman("PIN korrekt. Wie kann ich Ihnen helfen?", isSlowMode);
          }, 400);
        } else {
          setPinError(true);
          speakGerman("Falsche Geheimzahl. Bitte versuchen Sie es noch einmal.", isSlowMode);
          setTimeout(() => {
            setEnteredPin('');
            setPinError(false);
          }, 1200);
        }
      }
    }
  };

  const handleWithdraw = (amount) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setLastWithdrawn(amount);
      setAtmScreen('cashDispensed');
      playChime('click');
      speakGerman(`Bitte entnehmen Sie Ihr Geld. ${amount} Euro ausgezahlt.`, isSlowMode);
    } else {
      alert("Nicht genügend Guthaben auf dem Konto!");
    }
  };

  const handleDeposit = (amount) => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      setBalance(prev => prev + num);
      playChime('click');
      speakGerman(`${num} Euro auf Ihr Konto eingezahlt.`, isSlowMode);
      setAtmScreen('menu');
    }
  };

  const handleExecuteTransfer = () => {
    const num = parseFloat(transfer.betrag);
    if (!isNaN(num) && num > 0 && balance >= num) {
      setBalance(prev => prev - num);
      setTransfer(prev => ({ ...prev, ausgefuehrt: true }));
      playChime('click');
      speakGerman(`Überweisung von ${num} Euro an ${transfer.empfaenger} erfolgreich ausgeführt.`, isSlowMode);
    } else {
      alert("Überweisung fehlgeschlagen! Bitte Betrag prüfen.");
    }
  };

  const handleCardBlock = () => {
    playChime('click');
    speakGerman("Notruf 116 116. Ihre Girokarte und Kreditkarte wurden sofort gesperrt!", isSlowMode);
    alert("🚨 Sperr-Notruf 116 116: Ihre Karte wurde erfolgreich gesperrt!");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-400/40 rounded-full text-red-300 text-xs font-bold uppercase tracking-wider">
            <span>🏦</span> Lesson 62 Studio: Die Bank & Geld
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-tight">
            German Banking, ATMs & Money Master Cockpit
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Operate a German ATM (<em>Geldautomat</em>), withdraw cash (<em>Geld abheben</em>), deposit savings (<em>einzahlen</em>), execute SEPA bank transfers (<em>Überweisungen</em>), manage your account balance (<em>Kontostand & Saldo</em>), and learn emergency card blocking (<em>Karte sperren lassen</em>)!
          </p>
        </div>

        {/* Sub-tab Navigation Buttons */}
        <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-red-800/40 relative z-10">
          <button
            onClick={() => setActiveSubTab('atm')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'atm'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-red-950/60 text-red-200 hover:bg-red-900/80 border border-red-700/50'
            }`}
          >
            <span>🏧</span> Interactive ATM Simulator (Geldautomat)
          </button>
          <button
            onClick={() => setActiveSubTab('transfer')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'transfer'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-red-950/60 text-red-200 hover:bg-red-900/80 border border-red-700/50'
            }`}
          >
            <span>📲</span> Bank Transfer & Account Desk (Überweisung)
          </button>
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              activeSubTab === 'matrix'
                ? 'bg-amber-400 text-stone-900 shadow-amber-400/30 font-extrabold scale-105'
                : 'bg-red-950/60 text-red-200 hover:bg-red-900/80 border border-red-700/50'
            }`}
          >
            <span>📊</span> Banking Vocabulary & Cash Culture
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: Interactive German ATM (Geldautomat) */}
      {/* ========================================================= */}
      {activeSubTab === 'atm' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ATM Console Mockup */}
            <div className="lg:col-span-8 bg-gradient-to-b from-stone-800 to-stone-950 p-6 sm:p-8 rounded-3xl border-4 border-stone-700 shadow-2xl space-y-6 text-white font-mono relative">
              {/* Bank Header on ATM */}
              <div className="flex items-center justify-between border-b border-stone-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white font-sans text-xl shadow-sm">
                    S
                  </div>
                  <div>
                    <h4 className="font-sans font-black text-white text-base tracking-wider">
                      SPARKASSE GELDLAUTOMAT
                    </h4>
                    <p className="text-[10px] text-stone-400 font-sans">
                      24h Bargeld-Service & Kontoführung
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-stone-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Bereit (Online)</span>
                </div>
              </div>

              {/* The Blue/Green ATM Screen */}
              <div className="bg-gradient-to-b from-cyan-950 to-slate-900 border-2 border-cyan-500/40 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between shadow-inner text-cyan-100">
                {/* Screen State: Insert Card */}
                {atmScreen === 'insertCard' && (
                  <div className="text-center space-y-4 my-auto animate-fadeIn">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center text-3xl mx-auto border border-cyan-400/40">
                      💳
                    </div>
                    <div>
                      <h5 className="font-sans text-xl font-bold text-cyan-200">
                        Willkommen! Bitte EC-Karte / Girokarte einführen.
                      </h5>
                      <p className="text-xs text-cyan-400 font-sans mt-1">
                        Insert your Girocard to begin banking operations.
                      </p>
                    </div>
                    <button
                      onClick={handleInsertCard}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-xs rounded-xl shadow-lg transition-all"
                    >
                      💳 [Karte einführen / Insert Card]
                    </button>
                  </div>
                )}

                {/* Screen State: Enter PIN */}
                {atmScreen === 'enterPin' && (
                  <div className="text-center space-y-4 my-auto animate-fadeIn">
                    <span className="text-xs text-cyan-400 font-sans uppercase tracking-wider block">
                      Sicherheitsabfrage
                    </span>
                    <h5 className="font-sans text-lg sm:text-xl font-bold text-cyan-100">
                      Bitte Geheimzahl (PIN) eingeben:
                    </h5>
                    <div className="flex justify-center gap-3 text-2xl font-mono tracking-widest text-amber-400 py-2">
                      {[0, 1, 2, 3].map(i => (
                        <span key={i} className="w-8 h-10 border-b-2 border-cyan-400 flex items-center justify-center">
                          {enteredPin.length > i ? '●' : '_'}
                        </span>
                      ))}
                    </div>
                    {pinError ? (
                      <p className="text-xs text-rose-400 font-sans font-bold animate-shake">
                        ❌ Falsche PIN! Test-PIN ist: 1234
                      </p>
                    ) : (
                      <p className="text-[11px] text-cyan-400 font-sans">
                        💡 <em>Tipp: Test-PIN ist <strong>1234</strong> (Unten eintippen)</em>
                      </p>
                    )}
                  </div>
                )}

                {/* Screen State: Main Menu */}
                {atmScreen === 'menu' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-cyan-800/60 pb-2">
                      <span className="text-xs font-sans text-cyan-300 font-bold">
                        Girokonto • Max Mustermann
                      </span>
                      <span className="text-xs font-mono text-amber-300 font-bold">
                        Saldo: {balance.toFixed(2)} €
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <button
                        onClick={() => {
                          setAtmScreen('withdraw');
                          playChime('click');
                          speakGerman("Wählen Sie den gewünschten Betrag zum Abheben.", isSlowMode);
                        }}
                        className="p-3.5 bg-cyan-900/60 hover:bg-cyan-800 text-left rounded-xl border border-cyan-600/40 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>💵 Geld abheben</span>
                        <span>➔</span>
                      </button>

                      <button
                        onClick={() => {
                          setAtmScreen('deposit');
                          playChime('click');
                          speakGerman("Geben Sie den Betrag zum Einzahlen ein.", isSlowMode);
                        }}
                        className="p-3.5 bg-cyan-900/60 hover:bg-cyan-800 text-left rounded-xl border border-cyan-600/40 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>📥 Geld einzahlen</span>
                        <span>➔</span>
                      </button>

                      <button
                        onClick={() => {
                          setAtmScreen('balance');
                          playChime('click');
                          speakGerman(`Ihr aktueller Kontostand beträgt ${balance.toFixed(2)} Euro.`, isSlowMode);
                        }}
                        className="p-3.5 bg-cyan-900/60 hover:bg-cyan-800 text-left rounded-xl border border-cyan-600/40 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>📊 Kontostand & Saldo</span>
                        <span>➔</span>
                      </button>

                      <button
                        onClick={() => {
                          setAtmScreen('statement');
                          setStatementPrinted(true);
                          playChime('click');
                          speakGerman("Kontoauszug wird gedruckt.", isSlowMode);
                        }}
                        className="p-3.5 bg-cyan-900/60 hover:bg-cyan-800 text-left rounded-xl border border-cyan-600/40 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>📄 Kontoauszug drucken</span>
                        <span>➔</span>
                      </button>
                    </div>

                    <div className="text-right pt-2 border-t border-cyan-800/60">
                      <button
                        onClick={() => {
                          setAtmScreen('insertCard');
                          playChime('click');
                          speakGerman("Vielen Dank! Bitte entnehmen Sie Ihre Karte.", isSlowMode);
                        }}
                        className="text-xs text-rose-300 hover:text-rose-100 font-sans font-bold"
                      >
                        [Karte auswerfen / Exit]
                      </button>
                    </div>
                  </div>
                )}

                {/* Screen State: Withdraw */}
                {atmScreen === 'withdraw' && (
                  <div className="space-y-4 animate-fadeIn font-sans">
                    <div className="flex justify-between items-center border-b border-cyan-800/60 pb-2">
                      <span className="text-xs text-cyan-300 font-bold">Geld abheben (Bargeldausgabe)</span>
                      <button onClick={() => setAtmScreen('menu')} className="text-xs text-cyan-400 hover:underline">Zurück</button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[20, 50, 100, 200].map(amt => (
                        <button
                          key={amt}
                          onClick={() => handleWithdraw(amt)}
                          className="py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-black rounded-xl text-sm shadow-md transition-all"
                        >
                          {amt} €
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 flex gap-2">
                      <input
                        type="number"
                        placeholder="Anderer Betrag (€)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="flex-1 px-3 py-2 bg-cyan-950/80 border border-cyan-500/50 rounded-xl text-xs text-white placeholder-cyan-400 font-mono focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (customAmount) handleWithdraw(parseFloat(customAmount));
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                      >
                        Auszahlen
                      </button>
                    </div>
                  </div>
                )}

                {/* Screen State: Deposit */}
                {atmScreen === 'deposit' && (
                  <div className="space-y-4 animate-fadeIn font-sans">
                    <div className="flex justify-between items-center border-b border-cyan-800/60 pb-2">
                      <span className="text-xs text-cyan-300 font-bold">Geld einzahlen (Einzahlung)</span>
                      <button onClick={() => setAtmScreen('menu')} className="text-xs text-cyan-400 hover:underline">Zurück</button>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-cyan-200">
                        Wie viel Bargeld möchten Sie auf Ihr Girokonto einzahlen?
                      </p>
                      <div className="flex gap-2">
                        {[50, 100, 250, 500].map(amt => (
                          <button
                            key={amt}
                            onClick={() => handleDeposit(amt)}
                            className="flex-1 py-2.5 bg-cyan-800 hover:bg-cyan-700 text-cyan-100 font-bold rounded-xl text-xs border border-cyan-600/40"
                          >
                            +{amt} €
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen State: Balance */}
                {atmScreen === 'balance' && (
                  <div className="space-y-4 animate-fadeIn font-sans text-center my-auto">
                    <span className="text-xs text-cyan-400 uppercase tracking-wider block">
                      Kontostand & Saldo
                    </span>
                    <h4 className="text-3xl font-mono font-black text-amber-300">
                      {balance.toFixed(2)} €
                    </h4>
                    <p className="text-xs text-cyan-300">
                      Verfügbarer Betrag auf Ihrem Girokonto (Haben-Saldo).
                    </p>
                    <button
                      onClick={() => setAtmScreen('menu')}
                      className="px-5 py-2 bg-cyan-800 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl"
                    >
                      Zurück zum Hauptmenü
                    </button>
                  </div>
                )}

                {/* Screen State: Cash Dispensed */}
                {atmScreen === 'cashDispensed' && (
                  <div className="text-center space-y-4 my-auto animate-fadeIn font-sans">
                    <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center text-3xl mx-auto border border-amber-400/40">
                      💵
                    </div>
                    <h5 className="text-lg font-bold text-amber-300">
                      {lastWithdrawn} Euro ausgezahlt!
                    </h5>
                    <p className="text-xs text-cyan-200">
                      Bitte entnehmen Sie Ihr Bargeld und Ihre Karte.
                    </p>
                    <button
                      onClick={() => setAtmScreen('menu')}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                    >
                      Weiter / Next
                    </button>
                  </div>
                )}

                {/* Screen State: Statement */}
                {atmScreen === 'statement' && (
                  <div className="space-y-3 animate-fadeIn font-sans">
                    <div className="flex justify-between items-center border-b border-cyan-800/60 pb-2">
                      <span className="text-xs text-cyan-300 font-bold">Kontoauszug (Auszug Nr. 10/2026)</span>
                      <button onClick={() => setAtmScreen('menu')} className="text-xs text-cyan-400 hover:underline">Zurück</button>
                    </div>

                    <div className="bg-cyan-900/40 p-3 rounded-xl border border-cyan-700/30 text-xs font-mono space-y-1 text-cyan-200">
                      <div className="flex justify-between text-emerald-400">
                        <span>+ Gehalt / Einnahme</span>
                        <span>+2.450,00 €</span>
                      </div>
                      <div className="flex justify-between text-rose-400">
                        <span>- Miete Wohnung / Ausgabe</span>
                        <span>-650,00 €</span>
                      </div>
                      <div className="flex justify-between text-rose-400">
                        <span>- Supermarkt Einkauf</span>
                        <span>-85,40 €</span>
                      </div>
                      <div className="flex justify-between text-amber-300 font-bold pt-1 border-t border-cyan-700/50">
                        <span>= Kontostand (Saldo)</span>
                        <span>{balance.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Physical Keypad Simulation */}
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                <div className="grid grid-cols-3 gap-2 w-full sm:w-60">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((k, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (typeof k === 'number') {
                          handlePinDigit(k.toString());
                        } else if (k === 'C') {
                          setEnteredPin('');
                          playChime('click');
                        }
                      }}
                      className="py-2.5 bg-stone-800 hover:bg-stone-700 active:scale-95 text-white font-bold rounded-xl text-sm border border-stone-600 transition-all text-center"
                    >
                      {k}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-stone-400 space-y-1 text-center sm:text-right">
                  <span className="font-bold text-stone-200 block">Zahlenfeld (PIN-Pad)</span>
                  <p className="text-[11px]">Tippen Sie Ihre 4-stellige PIN ein.</p>
                  <button
                    onClick={() => speakGerman("Bitte geben Sie Ihre Geheimzahl ein.", isSlowMode)}
                    className="text-amber-400 hover:underline font-bold text-[11px] block mt-1"
                  >
                    🔊 Audio-Anweisung
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Banking Cheat-Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h4 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                  <span>💡</span> German Banking Rules
                </h4>

                <ul className="text-xs text-stone-700 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">1.</span>
                    <span><strong>Die Girokarte (EC-Karte):</strong> Essential in Germany. Linked directly to your checking account.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">2.</span>
                    <span><strong>Geld abheben:</strong> Free of charge at your own bank's ATM group (Sparkasse, Cash Group).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">3.</span>
                    <span><strong>Sperr-Notruf 116 116:</strong> Universal 24/7 hotline to block lost/stolen bank cards immediately.</span>
                  </li>
                </ul>

                <button
                  onClick={handleCardBlock}
                  className="w-full py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>🚨</span> Test: Karte sperren lassen (116 116)
                </button>
              </div>

              {/* Kenyan Analogy Box */}
              <div className="bg-amber-100/70 border border-amber-300 p-4 rounded-2xl text-xs text-amber-950 space-y-1">
                <span className="font-black text-amber-900 flex items-center gap-1.5">
                  <span>🇰🇪</span> M-Pesa vs. German Girokonto:
                </span>
                <p className="text-[11px] leading-relaxed">
                  While Kenya runs primarily on M-Pesa mobile money, Germany runs on <em>Girokonten</em> (checking accounts), <em>SEPA-Überweisungen</em> (bank transfers for rent/bills), and physical <em>Bargeld</em> (cash in euro banknotes and coins)!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: Bank Transfer & Account Opening Desk */}
      {/* ========================================================= */}
      {activeSubTab === 'transfer' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SEPA Transfer Form Slip */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                    <span>📝</span> SEPA-Überweisung (Bank Wire Transfer Slip)
                  </h3>
                  <p className="text-stone-500 text-xs mt-0.5">
                    Fill out a German standard bank transfer slip (Überweisungsträger).
                  </p>
                </div>
                <button
                  onClick={() => speakGerman("Eine Überweisung auf ein anderes Konto ausführen.", isSlowMode)}
                  className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <span>🔊</span> "Überweisung"
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Name des Empfängers (Recipient Name / Kontoinhaber):
                  </label>
                  <input
                    type="text"
                    value={transfer.empfaenger}
                    onChange={(e) => setTransfer({ ...transfer, empfaenger: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                    <span>IBAN (International Bank Account Number):</span>
                    <span className="text-[10px] text-stone-400 font-mono">Starts with DE</span>
                  </label>
                  <input
                    type="text"
                    value={transfer.iban}
                    onChange={(e) => setTransfer({ ...transfer, iban: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:ring-2 focus:ring-red-500 focus:outline-none tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      BIC (Bank Identifier Code):
                    </label>
                    <input
                      type="text"
                      value={transfer.bic}
                      onChange={(e) => setTransfer({ ...transfer, bic: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Betrag in Euro (€):
                    </label>
                    <input
                      type="text"
                      value={transfer.betrag}
                      onChange={(e) => setTransfer({ ...transfer, betrag: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-bold text-red-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Verwendungszweck (Payment Reference / Purpose):
                  </label>
                  <input
                    type="text"
                    value={transfer.verwendungszweck}
                    onChange={(e) => setTransfer({ ...transfer, verwendungszweck: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleExecuteTransfer}
                  className="w-full py-3.5 bg-red-700 hover:bg-red-800 text-white font-extrabold rounded-2xl shadow-md transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <span>💸</span> Überweisung jetzt ausführen ({transfer.betrag} €)
                </button>
              </div>
            </div>

            {/* Account Type Explorer */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
              <h4 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <span>📂</span> German Account Types (Kontoarten)
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-red-50 rounded-2xl border border-red-200 space-y-1">
                  <span className="font-bold text-red-900 text-sm block">1. das Girokonto</span>
                  <span className="text-stone-600 block">Current / Checking account</span>
                  <p className="text-stone-500 text-[11px]">
                    Used for salary payouts (<em>Gehalt</em>), rent transfers, ATM withdrawals, and daily shopping with your Girocard.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">2. das Sparkonto</span>
                  <span className="text-stone-600 block">Traditional Savings account</span>
                  <p className="text-stone-500 text-[11px]">
                    Used for long-term saving with interest (<em>Zinsen</em>). No direct card purchases.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
                  <span className="font-bold text-blue-900 text-sm block">3. das Tagesgeldkonto</span>
                  <span className="text-stone-600 block">Daily Call / High-yield savings</span>
                  <p className="text-stone-500 text-[11px]">
                    Flexible savings account where money can be transferred back to your Girokonto anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: Banking Vocabulary & Verb Matrix */}
      {/* ========================================================= */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 1: Core Action Verbs */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
              <span>⚡</span> Key Banking Verbs in Present & Past (Perfekt)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {[
                { verb: 'einzahlen', past: 'hat eingezahlt', mean: 'to deposit money', ex: 'Ich habe 100€ auf mein Konto eingezahlt.' },
                { verb: 'abheben', past: 'hat abgehoben', mean: 'to withdraw cash', ex: 'Ich habe 50€ am Geldautomaten abgehoben.' },
                { verb: 'überweisen', past: 'hat überwiesen', mean: 'to transfer money', ex: 'Er hat die Miete pünktlich überwiesen.' },
                { verb: 'sparen', past: 'hat gespart', mean: 'to save money', ex: 'Sie hat schon 500 Euro gespart.' },
                { verb: 'anlegen', past: 'hat angelegt', mean: 'to invest money', ex: 'Er hat sein Geld in Aktien angelegt.' },
                { verb: 'eröffnen', past: 'hat eröffnet', mean: 'to open an account', ex: 'Ich habe ein neues Girokonto eröffnet.' },
              ].map((v, idx) => (
                <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-red-900 text-sm">{v.verb}</span>
                    <button onClick={() => speakGerman(`${v.verb}, ${v.past}`, isSlowMode)} className="text-red-700 hover:text-red-900 font-bold text-xs">🔊 Audio</button>
                  </div>
                  <span className="font-mono font-bold text-stone-700 block text-[11px]">{v.past}</span>
                  <span className="text-stone-500 block">{v.mean}</span>
                  <p className="text-stone-600 text-[11px] italic pt-1 border-t border-stone-200">{v.ex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Regional Terms & Movement vs Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <span>🌍</span> Regional German ATM Names (DACH)
              </h4>
              <ul className="text-xs text-stone-700 space-y-2 font-medium">
                <li>• 🇩🇪 <strong>Deutschland:</strong> der Geldautomat</li>
                <li>• 🇦🇹 <strong>Österreich:</strong> der Bankomat</li>
                <li>• 🇨🇭 <strong>Schweiz:</strong> der Bancomat</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <span>🚶</span> Movement vs. Location
              </h4>
              <ul className="text-xs text-stone-700 space-y-2">
                <li>• <strong>Wohin gehst du?</strong> ➔ Ich gehe <em>zur Bank</em>. (Movement / Direction)</li>
                <li>• <strong>Wo bist du?</strong> ➔ Ich bin <em>in / bei / auf der Bank</em>. (Stationary Location)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
