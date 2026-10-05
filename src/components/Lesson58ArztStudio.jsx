import React, { useState } from 'react';
import { Stethoscope, PhoneCall, FileText, Pill, Activity, Thermometer, Heart, AlertCircle, CheckCircle2, User, Clock, Calendar, Volume2, Sparkles, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson58ArztStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('booking'); // 'booking', 'exam', 'prescription', 'duet'

  // Tab 1: Booking State
  const [selectedSymptom, setSelectedSymptom] = useState('ruecken_husten');
  const [bookingTime, setBookingTime] = useState('16:00');
  const [bookingStep, setBookingStep] = useState(1);

  // Tab 2: Examination & Vitals State
  const [examAction, setExamAction] = useState('mouth'); // 'mouth', 'cough', 'inspect'
  const [bloodPressureStatus, setBloodPressureStatus] = useState('normal'); // 'normal', 'high', 'low'
  const [tempStatus, setTempStatus] = useState('high'); // 'normal', 'slight', 'high'

  // Tab 3: Prescription & AU-Bescheinigung State
  const [selectedMedType, setSelectedMedType] = useState('tablette'); // 'tablette', 'kapsel', 'tropfen', 'salbe'
  const [sickDays, setSickDays] = useState(3);

  const fullConsultationDuet = [
    {
      speaker: "Ärztin (Doctor)",
      name: "Frau Dr. Lampert",
      avatar: "👩‍⚕️",
      german: "Guten Tag, Herr Müller. Was fehlt Ihnen denn? Wie fühlen Sie sich heute?",
      english: "Good day, Mr. Müller. What's troubling you? How do you feel today?",
      tip: "Doctor's greeting: 'Was fehlt Ihnen denn?' (What's wrong?)"
    },
    {
      speaker: "Patient",
      name: "Florian Müller",
      avatar: "🤒",
      german: "Guten Tag Frau Doktor. Ich fühle mich seit gestern nicht wohl. Ich habe Rückenschmerzen, Husten und Fieber.",
      english: "Good day Doctor. I haven't been feeling well since yesterday. I have back pain, cough and fever.",
      tip: "Patient symptoms: 'Ich fühle mich seit gestern nicht wohl. Ich habe...'"
    },
    {
      speaker: "Ärztin (Doctor)",
      name: "Frau Dr. Lampert",
      avatar: "👩‍⚕️",
      german: "Wie lange fühlen Sie schon so? Seit wann haben Sie diese Schmerzen?",
      english: "How long have you been feeling like this? Since when do you have this pain?",
      tip: "Duration question: 'Wie lange...?' / 'Seit wann...?'"
    },
    {
      speaker: "Patient",
      name: "Florian Müller",
      avatar: "🤒",
      german: "Seit zwei Tagen. Ich fühle mich auch sehr schwach.",
      english: "Since two days. I also feel very weak.",
      tip: "Timeline answer: 'Seit zwei Tagen' (since 2 days)"
    },
    {
      speaker: "Ärztin (Doctor)",
      name: "Frau Dr. Lampert",
      avatar: "👩‍⚕️",
      german: "Darf ich mir das mal ansehen? Machen Sie bitte den Mund auf und sagen Sie aaaaa! Bitte husten Sie!",
      english: "May I take a look at this? Please open your mouth and say aaaaa! Please cough!",
      tip: "Examination orders: 'Mund aufmachen', 'husten', 'aaaaa sagen'"
    },
    {
      speaker: "Ärztin (Doctor)",
      name: "Frau Dr. Lampert",
      avatar: "👩‍⚕️",
      german: "Ich werde Ihren Blutdruck und Ihre Temperatur messen. Ihr Blutdruck ist normal, aber die Temperatur ist ziemlich hoch. Sie haben eine Grippe.",
      english: "I will measure your blood pressure and temperature. Blood pressure is normal, but temperature is quite high. You have the flu.",
      tip: "Diagnosis: 'Der Arzt misst den Blutdruck' + 'Sie haben eine Grippe'"
    },
    {
      speaker: "Patient",
      name: "Florian Müller",
      avatar: "🤒",
      german: "Was soll ich tun? Kann ich arbeiten?",
      english: "What should I do? Can I work?",
      tip: "Patient question: 'Was soll ich tun? Kann ich arbeiten?'"
    },
    {
      speaker: "Ärztin (Doctor)",
      name: "Frau Dr. Lampert",
      avatar: "👩‍⚕️",
      german: "Nein, Sie dürfen nicht zur Arbeit gehen! Sie müssen im Bett bleiben. Trinken Sie viel Kräutertee und essen Sie Obst!",
      english: "No, you must not go to work! You have to stay in bed. Drink lots of herbal tea and eat fruits!",
      tip: "Work ban & medical order: 'dürfen nicht arbeiten' + 'müssen im Bett bleiben'"
    },
    {
      speaker: "Ärztin (Doctor)",
      name: "Frau Dr. Lampert",
      avatar: "👩‍⚕️",
      german: "Ich schreibe Ihnen ein Rezept für Tabletten und schreibe Sie drei Tage krank. Hier ist Ihre Arbeitsunfähigkeitsbescheinigung.",
      english: "I'll write you a prescription for tablets and sign you off sick for 3 days. Here is your certificate of incapacity for work.",
      tip: "Sacred German Sick Note: 'die Arbeitsunfähigkeitsbescheinigung'"
    },
    {
      speaker: "Patient",
      name: "Florian Müller",
      avatar: "🤒",
      german: "Vielen Dank, Frau Doktor. Auf Wiedersehen!",
      english: "Thank you very much, Doctor. Good-bye!",
      tip: "Farewell in person: 'Auf Wiedersehen!'"
    },
    {
      speaker: "Ärztin (Doctor)",
      name: "Frau Dr. Lampert",
      avatar: "👩‍⚕️",
      german: "Bitte sehr, auf Wiedersehen und gute Besserung!",
      english: "You're welcome, goodbye and get well soon!",
      tip: "Essential German well-wish: 'Gute Besserung!'"
    }
  ];

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl shadow-md text-2xl">
              🩺
            </span>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Beim Arzt Studio (Doctor & Clinic Mastery)
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Master booking clinic visits, describing symptoms, vitals checkup, and official German sick notes (AU)!
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('booking'); playChime(); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
              activeTab === 'booking'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>1. Booking & Reception</span>
          </button>

          <button
            onClick={() => { setActiveTab('exam'); playChime(); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
              activeTab === 'exam'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>2. Exam & Vitals Cockpit</span>
          </button>

          <button
            onClick={() => { setActiveTab('prescription'); playChime(); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
              activeTab === 'prescription'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>3. Prescription & AU-Note</span>
          </button>

          <button
            onClick={() => { setActiveTab('duet'); playChime(); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
              activeTab === 'duet'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>4. Consultation Duet</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BOOKING & RECEPTION (Slides 19–23) */}
      {activeTab === 'booking' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-rose-900/50 space-y-6">
            <div className="flex items-center justify-between border-b border-rose-800/40 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-rose-600/40 rounded-xl text-2xl">🏥</span>
                <div>
                  <h3 className="text-lg font-black text-white">Praxis Dr. Lampert (Hotline Booking)</h3>
                  <p className="text-xs text-rose-200">"Ich möchte gern einen Termin beim Arzt vereinbaren."</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-rose-500/30 text-rose-300 text-xs font-mono font-bold rounded-full border border-rose-500/40">
                Step {bookingStep} of 3
              </span>
            </div>

            {/* Step 1: Initial Call & Symptom Inquiry */}
            {bookingStep === 1 && (
              <div className="space-y-4">
                <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Receptionist:</span>
                      <p className="text-base font-bold text-white mt-1">"Praxis Dr. Lampert, guten Tag. Was kann ich für Sie tun?"</p>
                      <p className="text-xs text-slate-300 italic">Practice Dr. Lampert, good day. What can I do for you?</p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Praxis Dr. Lampert, guten Tag. Was kann ich für Sie tun?")}
                      className="p-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl text-white shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-start justify-between pt-2 border-t border-slate-700">
                    <div>
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Patient (Florian Müller):</span>
                      <p className="text-base font-bold text-sky-100 mt-1">"Guten Tag. Florian Müller hier. Ich möchte gern einen Termin beim Arzt vereinbaren."</p>
                      <p className="text-xs text-slate-300 italic">Good day. Florian Müller here. I would like to make an appointment with the doctor.</p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Guten Tag. Florian Müller hier. Ich möchte gern einen Termin beim Arzt vereinbaren.")}
                      className="p-2.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-white shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Symptom Selection */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Receptionist Asks: "Was haben Sie für Beschwerden? Haben Sie auch Fieber?"
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {[
                      { key: 'ruecken_husten', label: 'Rückenschmerzen & Husten', icon: '🤧', de: 'Ich habe Rückenschmerzen und Husten. Ja, auch Fieber seit gestern.' },
                      { key: 'bauch_schwach', label: 'Bauchschmerzen & Schwach', icon: '🤢', de: 'Ich fühle mich sehr schwach und habe starke Bauchschmerzen.' },
                      { key: 'kopf_fieber', label: 'Kopfschmerzen & Hohes Fieber', icon: '🤒', de: 'Mir geht es schlecht. Ich habe Kopfschmerzen und hohes Fieber.' }
                    ].map((sym) => (
                      <button
                        key={sym.key}
                        onClick={() => { setSelectedSymptom(sym.key); playChime(); }}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedSymptom === sym.key
                            ? 'bg-rose-600/40 border-rose-400 ring-2 ring-rose-400 text-white shadow-md'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        <div className="text-xl mb-1">{sym.icon}</div>
                        <div className="font-bold text-sm">{sym.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => { setBookingStep(2); playChime(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
                  >
                    <span>Next: Choose Appointment Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Appointment Time Slot */}
            {bookingStep === 2 && (
              <div className="space-y-4">
                <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Receptionist Offers Time:</span>
                      <p className="text-base font-bold text-white mt-1">
                        "Können Sie dann heute Nachmittag kommen, um {bookingTime} Uhr?"
                      </p>
                      <p className="text-xs text-slate-300 italic">Can you come in this afternoon, at {bookingTime}?</p>
                    </div>
                    <button
                      onClick={() => handleSpeak(`Können Sie dann heute Nachmittag kommen, um ${bookingTime.replace(':', ' Uhr ')}?`)}
                      className="p-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl text-white shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Time Picker */}
                  <div className="flex gap-2 pt-1">
                    {['14:30', '16:00', '17:15'].map((t) => (
                      <button
                        key={t}
                        onClick={() => { setBookingTime(t); playChime(); }}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                          bookingTime === t ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {t} Uhr
                      </button>
                    ))}
                  </div>

                  <div className="flex items-start justify-between pt-2 border-t border-slate-700">
                    <div>
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Patient Accepts:</span>
                      <p className="text-base font-bold text-sky-100 mt-1">"Ja, das passt. Vielen Dank!"</p>
                      <p className="text-xs text-slate-300 italic">Yes, that suits me. Thank you very much!</p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Ja, das passt. Vielen Dank!")}
                      className="p-2.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-white shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => { setBookingStep(1); playChime(); }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { setBookingStep(3); playChime(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
                  >
                    <span>Next: The Insurance Card Rule</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: The Golden Insurance Card Rule */}
            {bookingStep === 3 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-amber-500/30 via-rose-500/20 to-emerald-500/20 border-2 border-amber-400/60 rounded-3xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <span>GOLDEN GERMAN CLINIC RULE: DIE VERSICHERUNGSKARTE</span>
                  </div>
                  <div className="bg-slate-900/90 rounded-2xl p-4 border border-amber-400/40 flex items-start justify-between">
                    <div>
                      <p className="text-base font-bold text-white">
                        "Vergessen Sie bitte Ihre Versicherungskarte nicht!"
                      </p>
                      <p className="text-xs text-slate-300 italic mt-0.5">
                        Please do not forget your health insurance card!
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeak("Vergessen Sie bitte Ihre Versicherungskarte nicht!")}
                      className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-amber-200 leading-relaxed">
                    💡 <strong>Kenyan Layman Analogy:</strong> Just like walking into Aga Khan or Nairobi Hospital with your SHA/NHIF card: In Germany, every patient has a microchipped <em>Versicherungskarte</em>. The receptionist swipes it at the desk before the doctor will see you!
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => { setBookingStep(2); playChime(); }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { setBookingStep(1); playChime(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
                  >
                    <span>Start New Booking 🔄</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: EXAMINATION & VITALS COCKPIT (Slides 14–17, 24–29) */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          {/* Action Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: 'mouth',
                title: 'Mund aufmachen (Open Mouth)',
                icon: '👅',
                de: 'Machen Sie bitte den Mund auf und sagen Sie aaaaa!',
                en: 'Please open your mouth and say aaaaa!'
              },
              {
                id: 'cough',
                title: 'Husten (Cough Check)',
                icon: '🫁',
                de: 'Bitte husten Sie einmal kräftig!',
                en: 'Please cough firmly once!'
              },
              {
                id: 'inspect',
                title: 'Untersuchen (Inspection)',
                icon: '👀',
                de: 'Darf ich mir mal das ansehen? Wo tut es weh?',
                en: 'May I take a look at this? Where does it hurt?'
              }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setExamAction(item.id); playChime(); }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  examAction === item.id
                    ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1 italic">{item.en}</p>
              </button>
            ))}
          </div>

          {/* Active Doctor Command Display */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-start justify-between gap-4 border border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Doctor Instruction to Patient:</span>
              <h3 className="text-lg md:text-xl font-black text-white mt-1">
                {examAction === 'mouth' && '"Machen Sie bitte den Mund auf. Sagen Sie aaaaa!"'}
                {examAction === 'cough' && '"Bitte husten Sie einmal kräftig!"'}
                {examAction === 'inspect' && '"Darf ich mir mal das ansehen? Wo tut es weh?"'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 italic">
                {examAction === 'mouth' && 'Please open your mouth. Say aaaaa!'}
                {examAction === 'cough' && 'Please cough once firmly!'}
                {examAction === 'inspect' && 'May I take a look at this? Where does it hurt?'}
              </p>
            </div>
            <button
              onClick={() => handleSpeak(
                examAction === 'mouth' ? "Machen Sie bitte den Mund auf. Sagen Sie aaaaa!"
                : examAction === 'cough' ? "Bitte husten Sie einmal kräftig!"
                : "Darf ich mir mal das ansehen? Wo tut es weh?"
              )}
              className="p-4 bg-rose-500 hover:bg-rose-600 rounded-2xl text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Vitals Measurement Station */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blood Pressure (Blutdruck) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h4 className="font-black text-slate-900">den Blutdruck messen</h4>
                </div>
                <button
                  onClick={() => handleSpeak(`Der Arzt misst den Blutdruck. Ihr Blutdruck ist ${bloodPressureStatus === 'normal' ? 'normal' : bloodPressureStatus === 'high' ? 'hoch' : 'niedrig'}.`)}
                  className="p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2">
                {[
                  { key: 'normal', label: 'Normal (120/80)', de: 'normal' },
                  { key: 'high', label: 'Hoch (160/100)', de: 'hoch' },
                  { key: 'low', label: 'Niedrig (90/60)', de: 'niedrig' }
                ].map((bp) => (
                  <button
                    key={bp.key}
                    onClick={() => { setBloodPressureStatus(bp.key); playChime(); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      bloodPressureStatus === bp.key
                        ? 'bg-rose-600 text-white border-rose-600 shadow'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {bp.label}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="font-semibold text-slate-700 block">Doctor's statement:</span>
                <p className="font-bold text-rose-900 text-sm mt-0.5">
                  "Ihr Blutdruck ist {bloodPressureStatus === 'normal' ? 'normal.' : bloodPressureStatus === 'high' ? 'ziemlich hoch.' : 'etwas niedrig.'}"
                </p>
              </div>
            </div>

            {/* Temperature (Temperatur / Fieber) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-amber-500" />
                  <h4 className="font-black text-slate-900">die Temperatur messen</h4>
                </div>
                <button
                  onClick={() => handleSpeak(`Ich werde Ihre Temperatur messen. Ihre Temperatur ist ${tempStatus === 'normal' ? 'normal' : tempStatus === 'slight' ? 'leicht erhöht' : 'ziemlich hoch'}.`)}
                  className="p-2 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2">
                {[
                  { key: 'normal', label: 'Normal (36.8°C)', de: 'normal' },
                  { key: 'slight', label: 'Erhöht (38.0°C)', de: 'leicht erhöht' },
                  { key: 'high', label: 'Hohes Fieber (39.5°C)', de: 'hoch' }
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => { setTempStatus(t.key); playChime(); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      tempStatus === t.key
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-500 shadow'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="font-semibold text-slate-700 block">Doctor's statement:</span>
                <p className="font-bold text-amber-900 text-sm mt-0.5">
                  "Ihre Temperatur ist {tempStatus === 'normal' ? 'normal.' : tempStatus === 'slight' ? 'etwas erhöht (leichtes Fieber).' : 'sehr hoch! Sie haben Fieber.'}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRESCRIPTION & AU-NOTE (Slides 7–13, 18, 30–32) */}
      {activeTab === 'prescription' && (
        <div className="space-y-8">
          {/* Section A: Medication Types & 'einnehmen' */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💊</span>
              <h3 className="text-lg font-black text-slate-900">
                Medikamente verschreiben (Prescriptions & Forms)
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { key: 'tablette', icon: '💊', de: 'die Tablette (die Tabletten)', verb: 'einnehmen', usage: '2x täglich einnehmen' },
                { key: 'kapsel', icon: '💊', de: 'die Kapsel (die Kapseln)', verb: 'einnehmen', usage: 'vor dem Essen einnehmen' },
                { key: 'tropfen', icon: '💧', de: 'die Tropfen (Plural)', verb: 'einnehmen', usage: '20 Tropfen in Wasser' },
                { key: 'salbe', icon: '🧴', de: 'die Salbe (die Salben)', verb: 'auftragen', usage: 'auf die Haut auftragen' }
              ].map((med) => (
                <button
                  key={med.key}
                  onClick={() => {
                    setSelectedMedType(med.key);
                    handleSpeak(`${med.de}. ${med.usage}.`);
                    playChime();
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    selectedMedType === med.key
                      ? 'border-rose-500 bg-rose-50/70 shadow-md ring-2 ring-rose-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-3xl mb-1">{med.icon}</div>
                  <h4 className="font-bold text-xs text-slate-800">{med.de}</h4>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-md">
                    {med.usage}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section B: The Sacred German Sick Note (Die Arbeitsunfähigkeitsbescheinigung) */}
          <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 rounded-3xl p-6 md:p-8 border-2 border-amber-300 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-200 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                  OFFICIAL GERMAN SICK LEAVE DOCUMENT
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                  die Arbeitsunfähigkeitsbescheinigung (AU-Bescheinigung)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Days of Sick Leave:</span>
                {[3, 5, 7].map((d) => (
                  <button
                    key={d}
                    onClick={() => { setSickDays(d); playChime(); }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      sickDays === d ? 'bg-rose-600 text-white shadow' : 'bg-white border border-slate-200'
                    }`}
                  >
                    {d} Tage
                  </button>
                ))}
              </div>
            </div>

            {/* Note Preview */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400">Doctor Prescription Slip:</span>
                  <p className="text-base md:text-lg font-black text-slate-900 mt-0.5">
                    "Ich schreibe Sie {sickDays} Tage krank! Sie dürfen nicht zur Arbeit gehen."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    I am writing you off sick for {sickDays} days! You are not allowed to go to work.
                  </p>
                </div>
                <button
                  onClick={() => handleSpeak(`Ich schreibe Sie ${sickDays} Tage krank! Sie dürfen nicht zur Arbeit gehen. Sie müssen im Bett bleiben.`)}
                  className="p-3 bg-rose-500 hover:bg-rose-600 rounded-2xl text-white shadow"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <strong className="text-rose-900 block font-bold">⛔ Was Sie NICHT tun dürfen:</strong>
                  <p className="text-rose-700 mt-0.5">"Sie dürfen nicht zur Arbeit gehen." (Work prohibited)</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <strong className="text-emerald-900 block font-bold">✅ Was Sie tun MÜSSEN:</strong>
                  <p className="text-emerald-700 mt-0.5">"Bleiben Sie im Bett, trinken Sie Kräutertee!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONSULTATION DUET (Slides 24–32) */}
      {activeTab === 'duet' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-rose-50 rounded-2xl p-4 border border-rose-200">
            <div>
              <h3 className="font-bold text-rose-950 text-base">
                Full Medical Consultation Roleplay (Slides 24–32)
              </h3>
              <p className="text-xs text-rose-800">
                Frau Dr. Lampert & Florian Müller. Follow the complete clinic visit from symptom inquiry to Gute Besserung!
              </p>
            </div>

            <button
              onClick={() => {
                const fullText = fullConsultationDuet.map(d => `${d.speaker} ${d.name}: ${d.german}`).join(' ');
                speakGerman(fullText, isSlowMode);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Play Full Consultation</span>
            </button>
          </div>

          <div className="space-y-3">
            {fullConsultationDuet.map((turn, index) => {
              const isDoctor = turn.speaker.includes("Ärztin");
              return (
                <div
                  key={index}
                  className={`p-4 md:p-5 rounded-3xl border transition-all ${
                    isDoctor
                      ? 'bg-slate-50 border-slate-200 mr-4 md:mr-12'
                      : 'bg-rose-50/70 border-rose-200 ml-4 md:ml-12'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{turn.avatar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{turn.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isDoctor ? 'bg-slate-200 text-slate-700' : 'bg-rose-200 text-rose-800'
                          }`}>
                            {turn.speaker}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(turn.german)}
                      className="p-2 bg-white hover:bg-rose-600 hover:text-white text-rose-600 rounded-xl shadow-sm border border-slate-200 transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2.5 pl-11">
                    <p className="text-base font-bold text-slate-900">
                      "{turn.german}"
                    </p>
                    <p className="text-xs text-slate-600 font-medium mt-0.5 italic">
                      {turn.english}
                    </p>
                    <div className="mt-2 text-[11px] text-rose-700 bg-rose-100/60 font-semibold px-2.5 py-0.5 rounded-lg inline-block">
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
