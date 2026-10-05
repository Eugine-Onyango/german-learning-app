import React, { useState } from 'react';
import { Phone, PhoneCall, PhoneForwarded, PhoneOff, PhoneIncoming, MessageSquare, Mic, Volume2, Sparkles, Check, ArrowRight, UserCheck, AlertCircle, Building, User, Repeat, HelpCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson57TelefonStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('switchboard'); // 'switchboard', 'clarification', 'duet'

  // Tab 1: Switchboard Simulator State
  const [callType, setCallType] = useState('formal'); // 'formal', 'casual'
  const [callStep, setCallStep] = useState(1); // 1: Ring & Answer, 2: Inquire Person, 3: Availability & Connect/Message, 4: Wrap up & Farewell
  const [targetPersonAvailability, setTargetPersonAvailability] = useState('meeting'); // 'available', 'meeting', 'line_busy'
  const [selectedCallerMessage, setSelectedCallerMessage] = useState('callback'); // 'callback', 'sick', 'custom'

  // Tab 2: Clarification & Spelling Tool State
  const [spellingWord, setSpellingWord] = useState('SCHMITZ');
  const [spelledLetters, setSpelledLetters] = useState([]);
  const [activeLetterIndex, setActiveLetterIndex] = useState(null);

  // Tab 3: Business Dialogue Duet State
  const [duetStep, setDuetStep] = useState(0);

  const germanAlphabetPhonetics = {
    'A': { de: 'Ah', word: 'Anton' },
    'B': { de: 'Beh', word: 'Berta' },
    'C': { de: 'Tseh', word: 'Cäsar' },
    'D': { de: 'Deh', word: 'Dora' },
    'E': { de: 'Eh', word: 'Emil' },
    'F': { de: 'Eff', word: 'Friedrich' },
    'G': { de: 'Geh', word: 'Gustav' },
    'H': { de: 'Hah', word: 'Heinrich' },
    'I': { de: 'Ee', word: 'Ida' },
    'J': { de: 'Yott', word: 'Julius' },
    'K': { de: 'Kah', word: 'Kaufmann' },
    'L': { de: 'Ell', word: 'Ludwig' },
    'M': { de: 'Emm', word: 'Martha' },
    'N': { de: 'Enn', word: 'Nordpol' },
    'O': { de: 'Oh', word: 'Otto' },
    'P': { de: 'Peh', word: 'Paula' },
    'Q': { de: 'Koo', word: 'Quelle' },
    'R': { de: 'Err', word: 'Richard' },
    'S': { de: 'Ess', word: 'Samuel' },
    'T': { de: 'Teh', word: 'Theodor' },
    'U': { de: 'Oo', word: 'Ulrich' },
    'V': { de: 'Fow', word: 'Viktor' },
    'W': { de: 'Veh', word: 'Wilhelm' },
    'X': { de: 'Iks', word: 'Xanthippe' },
    'Y': { de: 'Ypsilon', word: 'Ypsilon' },
    'Z': { de: 'Tsett', word: 'Zacharias' },
    'Ä': { de: 'Äh', word: 'Ärger' },
    'Ö': { de: 'Öh', word: 'Ökonom' },
    'Ü': { de: 'Üh', word: 'Übermut' },
    'ß': { de: 'Eszett / scharfes S', word: 'Eszett' }
  };

  const businessDialogue = [
    {
      speaker: "Empfang (Receptionist)",
      name: "Julia Becker",
      org: "Rohrmann GmbH",
      avatar: "👩‍💼",
      german: "Guten Tag. Hier ist Firma Rohrmann GmbH. Sie sprechen mit Julia Becker.",
      english: "Good day. This is Rohrmann GmbH. You are speaking with Julia Becker.",
      tip: "Formal Reception: Company name + Name + 'Sie sprechen mit...'"
    },
    {
      speaker: "Anrufer (Caller)",
      name: "Jonas Müller",
      org: "Müller AG",
      avatar: "👨‍💼",
      german: "Guten Tag Frau Becker. Hier ist Jonas Müller von Müller AG. Kann ich bitte mit Herrn Schmitz sprechen?",
      english: "Good day Ms. Becker. This is Jonas Müller from Müller AG. Can I please speak with Mr. Schmitz?",
      tip: "Caller ID: 'Hier ist [Name] von [Company]. Kann ich bitte mit Herrn [X] sprechen?'"
    },
    {
      speaker: "Empfang (Receptionist)",
      name: "Julia Becker",
      org: "Rohrmann GmbH",
      avatar: "👩‍💼",
      german: "Es tut mir leid, aber er spricht gerade auf der anderen Leitung. Kann ich ihm etwas ausrichten?",
      english: "I am sorry, but he is currently speaking on the other line. Can I take a message for him?",
      tip: "Unreachable: 'spricht auf der anderen Leitung' + 'Kann ich ihm etwas ausrichten?'"
    },
    {
      speaker: "Anrufer (Caller)",
      name: "Jonas Müller",
      org: "Müller AG",
      avatar: "👨‍💼",
      german: "Ja. Könnten Sie ihm bitte sagen, er soll mich heute Nachmittag zurückrufen?",
      english: "Yes. Could you please tell him he should call me back this afternoon?",
      tip: "Message: 'Könnten Sie ihm sagen, er soll mich ... zurückrufen?'"
    },
    {
      speaker: "Empfang (Receptionist)",
      name: "Julia Becker",
      org: "Rohrmann GmbH",
      avatar: "👩‍💼",
      german: "Ja natürlich, mache ich das.",
      english: "Yes of course, I will do that.",
      tip: "Confirmation: 'Ja natürlich mache ich das / Ich werde es ausrichten.'"
    },
    {
      speaker: "Anrufer (Caller)",
      name: "Jonas Müller",
      org: "Müller AG",
      avatar: "👨‍💼",
      german: "Vielen Dank. Ich wünsche Ihnen einen schönen Tag. Auf Wiederhören.",
      english: "Thank you very much. I wish you a nice day. Good-bye (on the phone).",
      tip: "Golden Rule: 'Auf Wiederhören' (hear you again), never 'Auf Wiedersehen'!"
    },
    {
      speaker: "Empfang (Receptionist)",
      name: "Julia Becker",
      org: "Rohrmann GmbH",
      avatar: "👩‍💼",
      german: "Danke. Ihnen auch. Auf Wiederhören.",
      english: "Thank you. Same to you. Good-bye.",
      tip: "Final polite sign-off: 'Ihnen auch. Auf Wiederhören.'"
    }
  ];

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  const spellWordInteractive = (word) => {
    const letters = word.toUpperCase().split('');
    setSpelledLetters(letters);
    
    // Spell sequentially with audio
    let fullSpellingText = letters.map(l => {
      const info = germanAlphabetPhonetics[l];
      return info ? `${l} wie ${info.word}` : l;
    }).join('. ');
    
    speakGerman(`Ich buchstabiere: ${word}. ${letters.join(', ')}.`, isSlowMode);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md text-2xl">
              📞
            </span>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Am Telefon sprechen Studio
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Master German telephone etiquette, switchboard routing, message taking & "Auf Wiederhören"!
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => { setActiveTab('switchboard'); playChime(); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
              activeTab === 'switchboard'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Switchboard Simulator</span>
          </button>
          <button
            onClick={() => { setActiveTab('clarification'); playChime(); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
              activeTab === 'clarification'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Clarification & Speller</span>
          </button>
          <button
            onClick={() => { setActiveTab('duet'); playChime(); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
              activeTab === 'duet'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>Business Duet</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SWITCHBOARD SIMULATOR */}
      {activeTab === 'switchboard' && (
        <div className="space-y-6">
          {/* Call Mode Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => { setCallType('formal'); setCallStep(1); playChime(); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                callType === 'formal'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h4 className="font-bold text-slate-800">Formell: Corporate Office Line</h4>
                    <p className="text-xs text-slate-500">Rohrmann GmbH / Müller AG (Business Etiquette)</p>
                  </div>
                </div>
                {callType === 'formal' && <Check className="w-5 h-5 text-emerald-600" />}
              </div>
            </button>

            <button
              onClick={() => { setCallType('casual'); setCallStep(1); playChime(); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                callType === 'casual'
                  ? 'border-teal-500 bg-teal-50/50 shadow-md ring-2 ring-teal-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏡</span>
                  <div>
                    <h4 className="font-bold text-slate-800">Informell: Friend / Private Call</h4>
                    <p className="text-xs text-slate-500">Hallo Max, hier ist Anna! (Casual)</p>
                  </div>
                </div>
                {callType === 'casual' && <Check className="w-5 h-5 text-teal-600" />}
              </div>
            </button>
          </div>

          {/* Interactive Phone Screen Display */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden border border-slate-700">
            {/* Top Bar on Phone */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <PhoneIncoming className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>ACTIVE CALL - {callType.toUpperCase()} MODE</span>
              </span>
              <span className="font-mono text-emerald-400">00:{callStep * 14}</span>
            </div>

            {/* Step Progress Tracker */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { step: 1, label: '1. Ring & Melden' },
                { step: 2, label: '2. Person Inquiry' },
                { step: 3, label: '3. Status & Message' },
                { step: 4, label: '4. Auf Wiederhören' }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => { setCallStep(s.step); playChime(); }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all ${
                    callStep === s.step
                      ? 'bg-emerald-500 text-white shadow-md'
                      : callStep > s.step
                      ? 'bg-emerald-900/60 text-emerald-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Step 1: Ringing & Answering */}
            {callStep === 1 && (
              <div className="space-y-4">
                <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                    <span>📲 DAS TELEFON KLINGELT</span>
                    <button
                      onClick={() => handleSpeak("Das Telefon klingelt. Ring ring!")}
                      className="p-1 hover:bg-slate-700 rounded-full"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Someone is calling! In German, answering the phone is called <strong className="text-white">"ans Telefon gehen"</strong> or <strong className="text-white">"sich melden"</strong>.
                  </p>
                </div>

                {callType === 'formal' ? (
                  <div className="space-y-3">
                    <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Receptionist (Empfang) Answers:</span>
                          <p className="text-lg font-bold text-emerald-100 mt-1">
                            "Guten Tag, Firma Rohrmann GmbH, Sie sprechen mit Julia Becker. Was kann ich für Sie tun?"
                          </p>
                          <p className="text-xs text-slate-300 mt-1 italic">
                            Good day, Rohrmann GmbH, you are speaking with Julia Becker. What can I do for you?
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak("Guten Tag, Firma Rohrmann GmbH, Sie sprechen mit Julia Becker. Was kann ich für Sie tun?")}
                          className="p-3 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white shadow-lg transition-transform hover:scale-105"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-sky-950/60 border border-sky-500/40 rounded-2xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Caller (Anrufer) Identifies Himself:</span>
                          <p className="text-lg font-bold text-sky-100 mt-1">
                            "Guten Tag Frau Becker. Hier ist Jonas Müller von Müller AG."
                          </p>
                          <p className="text-xs text-slate-300 mt-1 italic">
                            Good day Ms. Becker. This is Jonas Müller from Müller AG.
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak("Guten Tag Frau Becker. Hier ist Jonas Müller von Müller AG.")}
                          className="p-3 bg-sky-500 hover:bg-sky-600 rounded-2xl text-white shadow-lg transition-transform hover:scale-105"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-teal-950/60 border border-teal-500/40 rounded-2xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Casual / Friend Greeting:</span>
                          <p className="text-lg font-bold text-teal-100 mt-1">
                            "Hallo Max, hier ist Anna!" / "Müller."
                          </p>
                          <p className="text-xs text-slate-300 mt-1 italic">
                            Hello Max, this is Anna! (Or simply answering with last name: "Müller.")
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak("Hallo Max, hier ist Anna! Müller.")}
                          className="p-3 bg-teal-500 hover:bg-teal-600 rounded-2xl text-white shadow-lg transition-transform hover:scale-105"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => { setCallStep(2); playChime(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all"
                  >
                    <span>Next: Ask for Person</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Asking for a Person & Connecting */}
            {callStep === 2 && (
              <div className="space-y-4">
                <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700">
                  <span className="text-xs font-semibold text-emerald-400 block mb-1">👥 NACH EINER PERSON FRAGEN (Asking for someone)</span>
                  <p className="text-slate-300 text-sm">
                    In German, when asking to speak with someone, use the polite modal verb <strong className="text-white">"Kann ich bitte mit... sprechen?"</strong> or <strong className="text-white">"Könnten Sie mich verbinden?"</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-sky-950/60 border border-sky-500/40 rounded-2xl p-4 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-sky-400">Option A: Speak with person</span>
                      <p className="text-base font-bold text-white mt-1">"Kann ich bitte mit Herrn Schmitz sprechen?"</p>
                      <p className="text-xs text-slate-300 italic mt-0.5">Can I please speak with Mr. Schmitz?</p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Kann ich bitte mit Herrn Schmitz sprechen?")}
                      className="p-2.5 bg-sky-500 hover:bg-sky-600 rounded-xl text-white shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">Option B: Connect / Transfer line</span>
                      <p className="text-base font-bold text-white mt-1">"Könnten Sie mich mit Herrn Schmitz verbinden?"</p>
                      <p className="text-xs text-slate-300 italic mt-0.5">Could you please connect me with Mr. Schmitz?</p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Könnten Sie mich mit Herrn Schmitz verbinden?")}
                      className="p-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 text-xs text-amber-200">
                  <strong className="text-amber-300">💡 Kenyan Memory Trick:</strong> Notice that 'Herr' gets an extra <strong>'-n'</strong> (<em>mit Herrn Schmitz</em>) because <strong>mit</strong> requires the Dative case! For women it's simply <em>mit Frau Becker</em>.
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => { setCallStep(1); playChime(); }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { setCallStep(3); playChime(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
                  >
                    <span>Next: Check Line Availability</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Availability & Leaving Messages */}
            {callStep === 3 && (
              <div className="space-y-4">
                {/* Availability Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Line Status:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'available', label: '✅ Available (Verbinden)', icon: '🟢' },
                      { key: 'line_busy', label: '📵 Other Line (Besetzt)', icon: '🟡' },
                      { key: 'meeting', label: '🗓️ In Meeting / Travel', icon: '🔴' }
                    ].map((st) => (
                      <button
                        key={st.key}
                        onClick={() => { setTargetPersonAvailability(st.key); playChime(); }}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                          targetPersonAvailability === st.key
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        <div>{st.icon}</div>
                        <div className="mt-1">{st.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scenario Output */}
                {targetPersonAvailability === 'available' ? (
                  <div className="bg-emerald-950/80 border border-emerald-500 rounded-2xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-400">Receptionist connects the line:</span>
                        <p className="text-base font-bold text-emerald-100 mt-1">
                          "Einen Augenblick bitte. Ich verbinde Sie!"
                        </p>
                        <p className="text-xs text-slate-300 italic mt-0.5">One moment please. I will connect you!</p>
                      </div>
                      <button
                        onClick={() => handleSpeak("Einen Augenblick bitte. Ich verbinde Sie!")}
                        className="p-3 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white shadow"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-rose-400">Receptionist Explains Unreachability:</span>
                          <p className="text-base font-bold text-rose-100 mt-1">
                            {targetPersonAvailability === 'line_busy'
                              ? '"Es tut mir leid, aber Herr Schmitz spricht gerade auf der anderen Leitung. Kann ich ihm etwas ausrichten?"'
                              : '"Herr Schmitz ist leider nicht erreichbar. Er ist in einer Besprechung. Möchten Sie eine Nachricht hinterlassen?"'}
                          </p>
                          <p className="text-xs text-slate-300 italic mt-0.5">
                            {targetPersonAvailability === 'line_busy'
                              ? "I'm sorry, but Mr. Schmitz is currently on the other line. Can I take a message for him?"
                              : "Mr. Schmitz is unfortunately not reachable. He is in a meeting. Would you like to leave a message?"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(
                            targetPersonAvailability === 'line_busy'
                              ? "Es tut mir leid, aber Herr Schmitz spricht gerade auf der anderen Leitung. Kann ich ihm etwas ausrichten?"
                              : "Herr Schmitz ist leider nicht erreichbar. Er ist in einer Besprechung. Möchten Sie eine Nachricht hinterlassen?"
                          )}
                          className="p-3 bg-rose-500 hover:bg-rose-600 rounded-2xl text-white shadow"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Caller's Message Request */}
                    <div className="bg-sky-950/80 border border-sky-500/50 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-400">Caller Leaves a Message (etwas ausrichten):</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => { setSelectedCallerMessage('callback'); playChime(); }}
                            className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              selectedCallerMessage === 'callback' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            Callback
                          </button>
                          <button
                            onClick={() => { setSelectedCallerMessage('sick'); playChime(); }}
                            className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              selectedCallerMessage === 'sick' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            Sick / Absence
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between pt-1">
                        <div>
                          <p className="text-base font-bold text-sky-100">
                            {selectedCallerMessage === 'callback'
                              ? '"Ja. Könnten Sie ihm bitte sagen, er soll mich heute Nachmittag zurückrufen?"'
                              : '"Sagen Sie ihr bitte, ich bin heute krank und kann morgen nicht kommen."'}
                          </p>
                          <p className="text-xs text-slate-300 italic">
                            {selectedCallerMessage === 'callback'
                              ? "Yes. Could you please tell him to call me back this afternoon?"
                              : "Please tell her I am sick today and cannot come tomorrow."}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(
                            selectedCallerMessage === 'callback'
                              ? "Ja. Könnten Sie ihm bitte sagen, er soll mich heute Nachmittag zurückrufen?"
                              : "Sagen Sie ihr bitte, ich bin heute krank und kann morgen nicht kommen."
                          )}
                          className="p-3 bg-sky-500 hover:bg-sky-600 rounded-2xl text-white shadow"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Receptionist Confirmation */}
                    <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-400">Receptionist Confirms:</span>
                        <p className="text-sm font-bold text-emerald-100">"Ja natürlich mache ich das. Ich werde es ausrichten."</p>
                      </div>
                      <button
                        onClick={() => handleSpeak("Ja natürlich mache ich das. Ich werde es ausrichten.")}
                        className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => { setCallStep(2); playChime(); }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { setCallStep(4); playChime(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
                  >
                    <span>Next: Ending & Auf Wiederhören</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Ending the Call & The Golden Phone Rule */}
            {callStep === 4 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border-2 border-amber-400/60 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>THE GOLDEN GERMAN PHONE RULE (Auf Wiederhören)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block font-semibold">👀 In Person (Face to Face):</span>
                      <strong className="text-white text-sm">Auf WiederSEHEN!</strong>
                      <p className="text-slate-400 mt-0.5">sehen = to see ("Until we see each other again")</p>
                    </div>
                    <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/60">
                      <span className="text-emerald-400 block font-semibold">📞 On the Telephone:</span>
                      <strong className="text-emerald-200 text-sm">Auf WiederHÖREN!</strong>
                      <p className="text-slate-300 mt-0.5">hören = to hear ("Until we hear each other again")</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-sky-400">Caller Signs Off:</span>
                      <p className="text-base font-bold text-white mt-1">
                        "Vielen Dank für Ihre Hilfe. Ich wünsche Ihnen einen schönen Tag. Auf Wiederhören!"
                      </p>
                      <p className="text-xs text-slate-400 italic">Thank you very much for your help. I wish you a nice day. Good-bye!</p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Vielen Dank für Ihre Hilfe. Ich wünsche Ihnen einen schönen Tag. Auf Wiederhören!")}
                      className="p-3 bg-sky-500 hover:bg-sky-600 rounded-2xl text-white shadow"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-500/50 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">Receptionist Concludes:</span>
                      <p className="text-base font-bold text-emerald-100 mt-1">
                        "Gern geschehen! Danke, Ihnen auch einen schönen Tag. Auf Wiederhören!"
                      </p>
                      <p className="text-xs text-slate-400 italic">You are welcome! Thank you, have a nice day as well. Good-bye!</p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Gern geschehen! Danke, Ihnen auch einen schönen Tag. Auf Wiederhören!")}
                      className="p-3 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white shadow"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => { setCallStep(3); playChime(); }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { setCallStep(1); playChime(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
                  >
                    <Repeat className="w-4 h-4" />
                    <span>Restart Call Simulation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CLARIFICATION & SPELLING RESCUE */}
      {activeTab === 'clarification' && (
        <div className="space-y-8">
          {/* Section A: Pardon & Misunderstandings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">👂</span>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                "I Didn't Catch That" - Clarification Toolkit (Slides 27–28)
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Foreign names or bad audio lines happen every day. Here are the most courteous phrases to slow the speaker down or request repetition:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  german: "Entschuldigung, wie bitte?",
                  english: "Excuse me, pardon? (polite 'come again?')",
                  category: "Polite Pardon",
                  badge: "Standard",
                  icon: "❓"
                },
                {
                  german: "Das habe ich leider nicht verstanden.",
                  english: "I unfortunately did not understand that.",
                  category: "Admit Misunderstanding",
                  badge: "Clear & Polite",
                  icon: "🤷‍♂️"
                },
                {
                  german: "Könnten Sie das bitte noch einmal sagen?",
                  english: "Could you please say that once again?",
                  category: "Repeat Request",
                  badge: "Repetition",
                  icon: "🔁"
                },
                {
                  german: "Könnten Sie bitte etwas langsamer sprechen?",
                  english: "Could you please speak a bit more slowly?",
                  category: "Speed Control",
                  badge: "Slow Down",
                  icon: "🐢"
                },
                {
                  german: "Könnten Sie den Namen bitte wiederholen?",
                  english: "Could you please repeat the name?",
                  category: "Name Clarification",
                  badge: "Name",
                  icon: "👤"
                },
                {
                  german: "Könnten Sie das bitte buchstabieren?",
                  english: "Could you please spell that letter by letter?",
                  category: "Spelling Request",
                  badge: "Spelling",
                  icon: "🔤"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all flex items-start justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{item.icon}</span>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-emerald-900 transition-colors">
                      {item.german}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.english}</p>
                  </div>
                  <button
                    onClick={() => handleSpeak(item.german)}
                    className="p-3 bg-white hover:bg-emerald-600 hover:text-white text-emerald-600 rounded-2xl shadow-sm border border-slate-200 transition-all flex-shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Interactive Buchstabieren (Spelling) Machine */}
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-700/50 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">German Spelling Simulator</span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  "Könnten Sie das bitte buchstabieren?" (Spell It Out!)
                </h3>
              </div>
              <span className="text-3xl">🔤</span>
            </div>

            {/* Quick Word Presets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Choose a German Surname or Word:</span>
              <div className="flex flex-wrap gap-2">
                {['SCHMITZ', 'MÜLLER', 'BECKER', 'ROHRMANN', 'BACHMANN', 'JONAS'].map((w) => (
                  <button
                    key={w}
                    onClick={() => { setSpellingWord(w); spellWordInteractive(w); playChime(); }}
                    className={`px-3 py-1.5 rounded-xl font-mono font-bold text-xs transition-all ${
                      spellingWord === w
                        ? 'bg-emerald-400 text-slate-950 shadow-md font-black'
                        : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-800'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={spellingWord}
                onChange={(e) => setSpellingWord(e.target.value.toUpperCase())}
                placeholder="Type any word or name..."
                className="flex-1 bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-2.5 text-white font-mono uppercase focus:outline-none focus:border-emerald-400 text-sm"
              />
              <button
                onClick={() => { spellWordInteractive(spellingWord); playChime(); }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs md:text-sm transition-all shadow-md flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Spell with Audio</span>
              </button>
            </div>

            {/* Letter Cards Grid */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Letter-by-Letter Phonetic Breakdown:</span>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {spellingWord.split('').map((letter, idx) => {
                  const phon = germanAlphabetPhonetics[letter] || { de: letter, word: letter };
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSpeak(`${letter}, wie ${phon.word}`)}
                      className="bg-slate-800/80 hover:bg-emerald-600/60 p-3 rounded-2xl border border-slate-700 text-center transition-all hover:scale-105 group"
                    >
                      <span className="text-2xl font-black text-emerald-300 block">{letter}</span>
                      <span className="text-xs text-slate-300 block font-mono font-bold mt-1">{phon.de}</span>
                      <span className="text-[10px] text-slate-400 block italic mt-0.5">wie {phon.word}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BUSINESS DIALOGUE DUET */}
      {activeTab === 'duet' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
            <div>
              <h3 className="font-bold text-emerald-950 text-base">
                Business Telephone Dialogue (Slides 33–35)
              </h3>
              <p className="text-xs text-emerald-800">
                Julia Becker (Rohrmann GmbH) & Jonas Müller (Müller AG). Follow the realistic multi-turn office call!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDuetStep(0);
                  const fullText = businessDialogue.map(d => `${d.speaker} ${d.name}: ${d.german}`).join(' ');
                  speakGerman(fullText, isSlowMode);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Full Conversation</span>
              </button>
            </div>
          </div>

          {/* Dialogue Turns */}
          <div className="space-y-4">
            {businessDialogue.map((turn, index) => {
              const isReception = turn.speaker.includes("Empfang");
              return (
                <div
                  key={index}
                  className={`p-5 rounded-3xl border transition-all ${
                    isReception
                      ? 'bg-slate-50 border-slate-200 mr-4 md:mr-12'
                      : 'bg-sky-50/70 border-sky-200 ml-4 md:ml-12'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{turn.avatar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{turn.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isReception ? 'bg-slate-200 text-slate-700' : 'bg-sky-200 text-sky-800'
                          }`}>
                            {turn.org}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{turn.speaker}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(turn.german)}
                      className="p-2.5 bg-white hover:bg-emerald-600 hover:text-white text-emerald-600 rounded-xl shadow-sm border border-slate-200 transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 pl-11">
                    <p className="text-base font-bold text-slate-900">
                      "{turn.german}"
                    </p>
                    <p className="text-xs text-slate-600 font-medium mt-1 italic">
                      {turn.english}
                    </p>
                    <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-100/60 font-semibold px-2.5 py-1 rounded-lg inline-block">
                      💡 {turn.tip}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
