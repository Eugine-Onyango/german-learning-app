import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  Stethoscope, 
  Volume2, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  Thermometer, 
  ShieldAlert, 
  Bandage, 
  Coffee, 
  BedDouble, 
  Smile, 
  ArrowRight,
  Pill
} from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson42HealthStudio({ isSlowMode }) {
  const [activeSubTab, setActiveSubTab] = useState('symptoms');
  const [symptomFilter, setSymptomFilter] = useState('all');
  const [selectedBodyPart, setSelectedBodyPart] = useState('kopf');
  const [activeConsultation, setActiveConsultation] = useState(0);

  // Body Parts Data for Pain Formulas
  const BODY_PARTS = [
    {
      id: 'kopf',
      name: 'der Kopf (head)',
      gender: 'masculine (der)',
      icon: '🤯',
      schmerzenWord: 'die Kopfschmerzen',
      schmerzenSentence: 'Ich habe Kopfschmerzen.',
      schmerzenTrans: 'I have a headache.',
      wehtunSentence: 'Mir tut der Kopf weh.',
      wehtunTrans: 'My head hurts (headache).',
      wehtunForm: 'tut... weh (Singular)',
      injurySentence: 'Ich habe mich am Kopf verletzt.',
      injuryTrans: 'I hurt my head.',
      prep: 'am (an dem)',
      tip: 'der Kopf + die Schmerzen = die Kopfschmerzen'
    },
    {
      id: 'ruecken',
      name: 'der Rücken (back)',
      gender: 'masculine (der)',
      icon: '🧍‍♂️',
      schmerzenWord: 'die Rückenschmerzen',
      schmerzenSentence: 'Ich habe Rückenschmerzen.',
      schmerzenTrans: 'I have a backache.',
      wehtunSentence: 'Mir tut der Rücken weh.',
      wehtunTrans: 'My back hurts.',
      wehtunForm: 'tut... weh (Singular)',
      injurySentence: 'Ich habe mich am Rücken verletzt.',
      injuryTrans: 'I hurt my back.',
      prep: 'am (an dem)',
      tip: 'der Rücken + die Schmerzen = die Rückenschmerzen'
    },
    {
      id: 'zahn',
      name: 'der Zahn / die Zähne (teeth)',
      gender: 'masculine / plural',
      icon: '🦷',
      schmerzenWord: 'die Zahnschmerzen',
      schmerzenSentence: 'Ich habe Zahnschmerzen.',
      schmerzenTrans: 'I have a toothache.',
      wehtunSentence: 'Mir tut der Zahn weh. / Mir tun die Zähne weh.',
      wehtunTrans: 'My tooth hurts / My teeth hurt.',
      wehtunForm: 'tut... weh (1 tooth) / tun... weh (teeth)',
      injurySentence: 'Ich habe mich am Zahn verletzt.',
      injuryTrans: 'I injured my tooth.',
      prep: 'am (an dem)',
      tip: 'der Zahn + die Schmerzen = die Zahnschmerzen'
    },
    {
      id: 'bauch',
      name: 'der Bauch (stomach/belly)',
      gender: 'masculine (der)',
      icon: '🤢',
      schmerzenWord: 'die Bauchschmerzen',
      schmerzenSentence: 'Ich habe Bauchschmerzen.',
      schmerzenTrans: 'I have a stomach ache.',
      wehtunSentence: 'Mir tut der Bauch weh.',
      wehtunTrans: 'My stomach hurts.',
      wehtunForm: 'tut... weh (Singular)',
      injurySentence: 'Ich habe mich am Bauch verletzt.',
      injuryTrans: 'I injured my stomach.',
      prep: 'am (an dem)',
      tip: 'der Bauch + die Schmerzen = die Bauchschmerzen'
    },
    {
      id: 'ohren',
      name: 'die Ohren (ears - Plural)',
      gender: 'plural (die)',
      icon: '👂',
      schmerzenWord: 'die Ohrenschmerzen',
      schmerzenSentence: 'Ich habe Ohrenschmerzen.',
      schmerzenTrans: 'I have an earache.',
      wehtunSentence: 'Mir tun die Ohren weh.',
      wehtunTrans: 'My ears hurt (Plural: tun... weh!).',
      wehtunForm: 'tun... weh (Plural!)',
      injurySentence: 'Ich habe mich am Ohr verletzt.',
      injuryTrans: 'I hurt my ear.',
      prep: 'am (an dem)',
      tip: 'Plural body parts take "tun... weh"!'
    },
    {
      id: 'hals',
      name: 'der Hals (throat/neck)',
      gender: 'masculine (der)',
      icon: '🧣',
      schmerzenWord: 'die Halsschmerzen',
      schmerzenSentence: 'Ich habe Halsschmerzen.',
      schmerzenTrans: 'I have a sore throat.',
      wehtunSentence: 'Mir tut der Hals weh.',
      wehtunTrans: 'My throat hurts.',
      wehtunForm: 'tut... weh (Singular)',
      injurySentence: 'Ich habe mich am Hals verletzt.',
      injuryTrans: 'I hurt my neck/throat.',
      prep: 'am (an dem)',
      tip: 'der Hals + die Schmerzen = die Halsschmerzen'
    },
    {
      id: 'nacken',
      name: 'der Nacken (back of neck)',
      gender: 'masculine (der)',
      icon: '💆‍♂️',
      schmerzenWord: 'die Nackenschmerzen',
      schmerzenSentence: 'Ich habe Nackenschmerzen.',
      schmerzenTrans: 'I have neck pain / stiff neck.',
      wehtunSentence: 'Mir tut der Nacken weh.',
      wehtunTrans: 'My neck hurts.',
      wehtunForm: 'tut... weh (Singular)',
      injurySentence: 'Ich habe mich am Nacken verletzt.',
      injuryTrans: 'I injured my neck.',
      prep: 'am (an dem)',
      tip: 'der Nacken + die Schmerzen = die Nackenschmerzen'
    },
    {
      id: 'bein',
      name: 'das Bein (leg)',
      gender: 'neuter (das)',
      icon: '🦵',
      schmerzenWord: 'die Beinschmerzen',
      schmerzenSentence: 'Ich habe Beinschmerzen.',
      schmerzenTrans: 'I have leg pain.',
      wehtunSentence: 'Mir tut das Bein weh. / Mir tun die Beine weh.',
      wehtunTrans: 'My leg hurts / My legs hurt.',
      wehtunForm: 'tut... weh / tun... weh',
      injurySentence: 'Ich habe mich am Bein verletzt.',
      injuryTrans: 'I hurt my leg (Slide 23!).',
      prep: 'am (an dem)',
      tip: 'das Bein ➔ am Bein (an dem Bein) verletzt'
    },
    {
      id: 'hand',
      name: 'die Hand (hand)',
      gender: 'feminine (die)',
      icon: '✋',
      schmerzenWord: 'die Handschmerzen',
      schmerzenSentence: 'Ich habe Handschmerzen.',
      schmerzenTrans: 'I have hand pain.',
      wehtunSentence: 'Mir tut die Hand weh.',
      wehtunTrans: 'My hand hurts.',
      wehtunForm: 'tut... weh (Singular)',
      injurySentence: 'Ich habe mich an der Hand verletzt.',
      injuryTrans: 'I hurt my hand (Slide 23!).',
      prep: 'an der (Feminine Dative)',
      tip: 'die Hand ➔ an der Hand (feminine Dativ!)'
    },
    {
      id: 'augen',
      name: 'die Augen (eyes - Plural)',
      gender: 'plural (die)',
      icon: '👀',
      schmerzenWord: 'die Augenschmerzen',
      schmerzenSentence: 'Ich habe Augenschmerzen.',
      schmerzenTrans: 'I have eye pain / sore eyes.',
      wehtunSentence: 'Mir tun die Augen weh.',
      wehtunTrans: 'My eyes hurt (Plural!).',
      wehtunForm: 'tun... weh (Plural!)',
      injurySentence: 'Ich habe mich am Auge verletzt.',
      injuryTrans: 'I injured my eye.',
      prep: 'am (an dem)',
      tip: 'Plural eyes: "Mir tun die Augen weh"!'
    }
  ];

  // All 16 Core Slide Symptoms & Illnesses
  const ALL_SYMPTOMS = [
    {
      id: 'krank-allg',
      type: 'state',
      german: 'Ich bin krank.',
      trans: 'I am ill / sick.',
      icon: '🤒',
      category: 'General State',
      slide: 'Slide 1 & 4',
      analogy: 'General declaration that you are sick in bed.'
    },
    {
      id: 'unwohl',
      type: 'state',
      german: 'Ich fühle mich nicht wohl.',
      trans: 'I am not feeling well.',
      icon: '🤢',
      category: 'General State',
      slide: 'Slide 4',
      analogy: 'Reflexive feeling when your body feels queasy or weak.'
    },
    {
      id: 'nicht-gut',
      type: 'state',
      german: 'Mir geht es nicht gut.',
      trans: "I'm not doing well / Things aren't good.",
      icon: '😔',
      category: 'General State',
      slide: 'Slide 4',
      analogy: 'Polite Dative reply to "Wie geht es Ihnen?" when ill.'
    },
    {
      id: 'kopfschmerz',
      type: 'schmerz',
      german: 'die Kopfschmerzen (Pl.)',
      trans: 'headache',
      icon: '🤯',
      category: 'Body Pain',
      slide: 'Slide 5 & 9',
      analogy: 'der Kopf + die Schmerzen = die Kopfschmerzen'
    },
    {
      id: 'rueckenschmerz',
      type: 'schmerz',
      german: 'die Rückenschmerzen (Pl.)',
      trans: 'backache',
      icon: '🧍‍♂️',
      category: 'Body Pain',
      slide: 'Slide 6',
      analogy: 'der Rücken + die Schmerzen = die Rückenschmerzen'
    },
    {
      id: 'zahnschmerz',
      type: 'schmerz',
      german: 'die Zahnschmerzen (Pl.)',
      trans: 'toothache',
      icon: '🦷',
      category: 'Body Pain',
      slide: 'Slide 7',
      analogy: 'der Zahn + die Schmerzen = die Zahnschmerzen'
    },
    {
      id: 'bauchschmerz',
      type: 'schmerz',
      german: 'die Bauchschmerzen (Pl.)',
      trans: 'stomach ache',
      icon: '🤢',
      category: 'Body Pain',
      slide: 'Slide 8',
      analogy: 'der Bauch + die Schmerzen = die Bauchschmerzen'
    },
    {
      id: 'ohrenschmerz',
      type: 'schmerz',
      german: 'die Ohrenschmerzen (Pl.)',
      trans: 'earache',
      icon: '👂',
      category: 'Body Pain',
      slide: 'Slide 8',
      analogy: 'die Ohren + die Schmerzen = die Ohrenschmerzen'
    },
    {
      id: 'halsschmerz',
      type: 'schmerz',
      german: 'die Halsschmerzen (Pl.)',
      trans: 'sore throat',
      icon: '🧣',
      category: 'Body Pain',
      slide: 'Slide 8',
      analogy: 'der Hals + die Schmerzen = die Halsschmerzen'
    },
    {
      id: 'nackenschmerz',
      type: 'schmerz',
      german: 'die Nackenschmerzen (Pl.)',
      trans: 'neck pain',
      icon: '💆‍♂️',
      category: 'Body Pain',
      slide: 'Slide 8',
      analogy: 'der Nacken + die Schmerzen = die Nackenschmerzen'
    },
    {
      id: 'fieber',
      type: 'illness',
      german: 'das Fieber / Ich habe Fieber.',
      trans: 'fever / I have a fever.',
      icon: '🌡️',
      category: 'Common Illness',
      slide: 'Slide 12 & 18',
      analogy: 'das Fieber (neuter). High temperature above 38°C.'
    },
    {
      id: 'grippe',
      type: 'illness',
      german: 'die Grippe / Ich habe eine Grippe.',
      trans: 'flu (influenza) / I have the flu.',
      icon: '🦠',
      category: 'Common Illness',
      slide: 'Slide 13 & 18',
      analogy: 'die Grippe (feminine). Full viral influenza.'
    },
    {
      id: 'erkaeltung',
      type: 'illness',
      german: 'die Erkältung / Ich habe eine Erkältung.',
      trans: 'the cold / I have a cold.',
      icon: '🤧',
      category: 'Common Illness',
      slide: 'Slide 14 & 19',
      analogy: 'die Erkältung (from kalt = cold). Common head cold.'
    },
    {
      id: 'schnupfen',
      type: 'illness',
      german: 'der Schnupfen / Ich habe Schnupfen.',
      trans: 'runny nose / head cold.',
      icon: '👃',
      category: 'Common Illness',
      slide: 'Slide 14 & 19',
      analogy: 'der Schnupfen (masculine). Constant sniffling.'
    },
    {
      id: 'husten',
      type: 'illness',
      german: 'der Husten / Ich habe Husten.',
      trans: 'the cough / I have a cough.',
      icon: '🗣️',
      category: 'Common Illness',
      slide: 'Slide 15',
      analogy: 'der Husten (masculine). Dry or chesty cough.'
    },
    {
      id: 'asthma',
      type: 'illness',
      german: 'das Asthma / Ich habe Asthma.',
      trans: 'asthma / I have asthma.',
      icon: '🫁',
      category: 'Common Illness',
      slide: 'Slide 16',
      analogy: 'das Asthma (neuter). Inhaler pump needed.'
    },
    {
      id: 'durchfall',
      type: 'illness',
      german: 'der Durchfall / Ich habe Durchfall.',
      trans: 'diarrhea / loose stomach.',
      icon: '🚽',
      category: 'Common Illness',
      slide: 'Slide 17',
      analogy: 'durch (through) + fall (fall) = der Durchfall.'
    },
    {
      id: 'blutdruck',
      type: 'condition',
      german: 'Ich habe hohen Blutdruck.',
      trans: 'I have high blood pressure.',
      icon: '💓',
      category: 'Health Condition',
      slide: 'Slide 20',
      analogy: 'das Blut (blood) + der Druck (pressure) = der Blutdruck.'
    },
    {
      id: 'uebergewicht',
      type: 'condition',
      german: 'Ich habe Übergewicht.',
      trans: 'I am overweight.',
      icon: '⚖️',
      category: 'Health Condition',
      slide: 'Slide 21',
      analogy: 'über (over) + das Gewicht (weight) = das Übergewicht.'
    },
    {
      id: 'verletzung',
      type: 'injury',
      german: 'Ich habe mich am Bein / an der Hand verletzt.',
      trans: 'I hurt my leg / my hand.',
      icon: '🩹',
      category: 'Injury',
      slide: 'Slide 22 & 23',
      analogy: 'sich verletzen: am Bein (neuter/masc) vs. an der Hand (fem).'
    }
  ];

  // Doctor Consultation Cases
  const CLINIC_CASES = [
    {
      title: 'Case 1: Flu & Fever 🤒',
      patientDesc: 'Patient feels awful, has high temperature and a scratchy throat.',
      patientGerman: 'Guten Tag, Herr Doktor. Ich fühle mich nicht wohl. Mir tut der Hals weh und ich habe hohes Fieber.',
      patientTrans: 'Good day doctor. I am not feeling well. My throat hurts and I have a high fever.',
      doctorGerman: 'Sie haben eine Grippe. Trinken Sie viel warmen Tee, bleiben Sie im Bett und ruhen Sie sich aus. Gute Besserung!',
      doctorTrans: 'You have the flu. Drink lots of warm tea, stay in bed, and rest. Get well soon!',
      adviceBullets: [
        'Trinken Sie viel Tee! (Drink plenty of tea)',
        'Bleiben Sie im Bett! (Stay in bed)',
        'Ruhen Sie sich aus! (Rest well)',
        'Gute Besserung! (Get well soon!)'
      ],
      icon: '🫖'
    },
    {
      title: 'Case 2: Sports Injury ⚽',
      patientDesc: 'Patient tripped on the football pitch and hurt their leg.',
      patientGerman: 'Frau Doktor, ich habe mich beim Sport am Bein verletzt. Das Bein tut sehr weh.',
      patientTrans: 'Doctor, I hurt myself at sports on my leg. The leg hurts very much.',
      doctorGerman: 'Das Bein ist geprellt. Kühlen Sie das Bein mit Eis, machen Sie eine Pause und laufen Sie vorsichtig. Gute Besserung!',
      doctorTrans: 'The leg is bruised. Cool the leg with ice, take a break, and walk carefully. Get well soon!',
      adviceBullets: [
        'Kühlen Sie das Bein! (Cool the leg with ice)',
        'Machen Sie eine Sportpause! (Take a break from sports)',
        'Schonen Sie das Knie! (Protect the knee)'
      ],
      icon: '🧊'
    },
    {
      title: 'Case 3: Severe Toothache 🦷',
      patientDesc: 'Patient cannot chew food due to throbbing toothache.',
      patientGerman: 'Herr Doktor, ich habe starke Zahnschmerzen. Mir tun die Zähne auf der rechten Seite weh.',
      patientTrans: 'Doctor, I have severe toothaches. My teeth on the right side hurt.',
      doctorGerman: 'Ich werde Ihren Zahn untersuchen. Essen Sie keine harten Speisen und spülen Sie mit Kamillentee.',
      doctorTrans: 'I will examine your tooth. Do not eat hard foods and rinse with chamomile tea.',
      adviceBullets: [
        'Gehen Sie zum Zahnarzt! (Visit the dentist)',
        'Essen Sie keine harten Speisen! (No hard foods)',
        'Spülen Sie den Mund! (Rinse your mouth)'
      ],
      icon: '🪥'
    },
    {
      title: 'Case 4: High Blood Pressure & Headaches 💓',
      patientDesc: 'Patient suffers from frequent headaches and dizziness at work.',
      patientGerman: 'Frau Doktor, ich habe oft Kopfschmerzen und fühle mich gestresst. Ist mein Blutdruck in Ordnung?',
      patientTrans: 'Doctor, I often have headaches and feel stressed. Is my blood pressure okay?',
      doctorGerman: 'Sie haben hohen Blutdruck. Vermeiden Sie Stress, spazieren Sie täglich an der frischen Luft und essen Sie gesund.',
      doctorTrans: 'You have high blood pressure. Avoid stress, walk daily in fresh air, and eat healthy.',
      adviceBullets: [
        'Vermeiden Sie Stress! (Avoid stress)',
        'Spazieren Sie täglich! (Walk daily in fresh air)',
        'Essen Sie weniger Salz! (Eat less salt)'
      ],
      icon: '🥗'
    }
  ];

  const currentPart = BODY_PARTS.find(p => p.id === selectedBodyPart) || BODY_PARTS[0];

  const filteredSymptoms = ALL_SYMPTOMS.filter(item => {
    if (symptomFilter === 'all') return true;
    if (symptomFilter === 'schmerzen') return item.type === 'schmerz';
    if (symptomFilter === 'illness') return item.type === 'illness';
    if (symptomFilter === 'condition') return item.type === 'condition' || item.type === 'injury';
    if (symptomFilter === 'state') return item.type === 'state';
    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-red-600 to-pink-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-rose-300/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            <HeartPulse className="w-4 h-4 text-rose-200" />
            Lesson 42 Interactive Studio • krank sein
          </div>
          <button
            onClick={() => speakGerman("krank sein: Ich bin krank. Ich fühle mich nicht wohl. Mir geht es nicht gut. Ich habe Kopfschmerzen. Mir tut der Kopf weh. Gute Besserung!", isSlowMode)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-rose-800 font-bold rounded-xl text-xs shadow-md hover:bg-rose-50 transition-transform active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            Play Lesson Audio Intro
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            The German Health & Illness Studio 🏥
          </h2>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed max-w-3xl">
            Learn how to express your health conditions without fear! Master the <strong>3 Pain Formulas</strong> (<em>Ich habe Kopfschmerzen</em> vs. <em>Mir tut der Kopf weh</em>), common illnesses (<em>Fieber, Grippe, Erkältung</em>), injuries (<em>sich verletzen</em>), and caring doctor advice (<em>Gute Besserung!</em>).
          </p>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-rose-400/40">
          <button
            onClick={() => { playChime('click'); setActiveSubTab('symptoms'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'symptoms'
                ? 'bg-white text-rose-900 shadow-lg scale-105'
                : 'bg-rose-800/60 text-rose-100 hover:bg-rose-700'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            1. All Symptoms & Illnesses ({ALL_SYMPTOMS.length})
          </button>

          <button
            onClick={() => { playChime('click'); setActiveSubTab('painFormulas'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'painFormulas'
                ? 'bg-white text-rose-900 shadow-lg scale-105'
                : 'bg-rose-800/60 text-rose-100 hover:bg-rose-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            2. The 3 Pain Formulas Simulator ⚡
          </button>

          <button
            onClick={() => { playChime('click'); setActiveSubTab('clinic'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'clinic'
                ? 'bg-white text-rose-900 shadow-lg scale-105'
                : 'bg-rose-800/60 text-rose-100 hover:bg-rose-700'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            3. Doctor's Advice & Clinic 🩺
          </button>
        </div>
      </div>

      {/* TAB 1: ALL SYMPTOMS & ILLNESSES EXPLORER */}
      {activeSubTab === 'symptoms' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Category Filter Bar */}
          <div className="bg-white dark:bg-stone-800 p-4 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
              <span>Filter Symptoms:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Items (20)' },
                { id: 'state', label: 'General State (3)' },
                { id: 'schmerzen', label: 'Body Pains (7)' },
                { id: 'illness', label: 'Illnesses (7)' },
                { id: 'condition', label: 'Conditions & Injury (3)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { playChime('click'); setSymptomFilter(cat.id); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    symptomFilter === cat.id
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSymptoms.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-full border border-rose-200 dark:border-rose-800">
                      {item.slide}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {item.german}
                    </h3>
                    <p className="text-xs text-rose-700 dark:text-rose-400 font-semibold">
                      {item.trans}
                    </p>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-medium bg-stone-50 dark:bg-stone-750 p-2.5 rounded-xl">
                    💡 {item.analogy}
                  </p>
                </div>

                <button
                  onClick={() => speakGerman(item.german, isSlowMode)}
                  className="w-full py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen Audio
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: THE 3 PAIN FORMULAS SIMULATOR */}
      {activeSubTab === 'painFormulas' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Explanation Banner */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-black text-amber-900 dark:text-amber-200">
                The 3 Core Ways Germans Describe Pain & Injury (Slides 5, 10, 23)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-700 dark:text-stone-300">
              <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-amber-100 dark:border-amber-900/50 space-y-1">
                <div className="font-black text-rose-700 dark:text-rose-400">1. haben + [X]schmerzen</div>
                <p>Combines body part with plural <em>die Schmerzen</em>: <strong>Ich habe Kopfschmerzen.</strong></p>
              </div>
              <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-amber-100 dark:border-amber-900/50 space-y-1">
                <div className="font-black text-blue-700 dark:text-blue-400">2. Mir tut / tun [X] weh</div>
                <p>Separable verb <em>wehtun</em>: Singular = <strong>tut... weh</strong>, Plural = <strong>tun... weh</strong>!</p>
              </div>
              <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-amber-100 dark:border-amber-900/50 space-y-1">
                <div className="font-black text-emerald-700 dark:text-emerald-400">3. sich verletzen (Injury)</div>
                <p>Reflexive past: <strong>Ich habe mich am Bein / an der Hand verletzt.</strong></p>
              </div>
            </div>
          </div>

          {/* Interactive Body Part Selector */}
          <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Select a Body Part to Test All 3 Formulas:
              </h4>
              <span className="text-xs font-bold text-rose-600">Selected: {currentPart.name}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {BODY_PARTS.map(part => (
                <button
                  key={part.id}
                  onClick={() => { playChime('click'); setSelectedBodyPart(part.id); }}
                  className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col items-center text-center gap-1.5 ${
                    selectedBodyPart === part.id
                      ? 'bg-rose-600 text-white border-rose-700 shadow-lg scale-105'
                      : 'bg-stone-50 dark:bg-stone-750 hover:bg-stone-100 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-2xl">{part.icon}</span>
                  <span className="text-xs font-bold leading-tight">{part.name.split(' ')[0]} {part.name.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic 3-Formula Showcase Card */}
          <div className="bg-white dark:bg-stone-800 p-6 md:p-8 rounded-3xl border-2 border-rose-300 dark:border-rose-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-700 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentPart.icon}</span>
                <div>
                  <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
                    {currentPart.name}
                  </h3>
                  <span className="text-xs font-bold text-stone-500">
                    Gender: {currentPart.gender} • {currentPart.tip}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Formula 1 */}
              <div className="p-5 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="inline-block px-2 py-0.5 bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 rounded-md text-[10px] font-black uppercase">
                    Method 1: Compound Pain
                  </div>
                  <div className="text-lg font-black text-stone-900 dark:text-stone-100">
                    {currentPart.schmerzenSentence}
                  </div>
                  <div className="text-xs text-rose-700 dark:text-rose-400 font-bold">
                    {currentPart.schmerzenTrans}
                  </div>
                </div>
                <button
                  onClick={() => speakGerman(currentPart.schmerzenSentence, isSlowMode)}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen
                </button>
              </div>

              {/* Formula 2 */}
              <div className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="inline-block px-2 py-0.5 bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-[10px] font-black uppercase">
                    Method 2: wehtun (Separable)
                  </div>
                  <div className="text-lg font-black text-stone-900 dark:text-stone-100">
                    {currentPart.wehtunSentence}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-400 font-bold">
                    {currentPart.wehtunTrans}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    Verb form: <span className="font-bold text-blue-700 dark:text-blue-300">{currentPart.wehtunForm}</span>
                  </div>
                </div>
                <button
                  onClick={() => speakGerman(currentPart.wehtunSentence, isSlowMode)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen
                </button>
              </div>

              {/* Formula 3 */}
              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="inline-block px-2 py-0.5 bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-md text-[10px] font-black uppercase">
                    Method 3: sich verletzen (Injury)
                  </div>
                  <div className="text-lg font-black text-stone-900 dark:text-stone-100">
                    {currentPart.injurySentence}
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                    {currentPart.injuryTrans}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    Preposition: <span className="font-bold text-emerald-700 dark:text-emerald-300">{currentPart.prep}</span>
                  </div>
                </div>
                <button
                  onClick={() => speakGerman(currentPart.injurySentence, isSlowMode)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DOCTOR'S CLINIC & ADVICE */}
      {activeSubTab === 'clinic' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Clinic Case Selector */}
          <div className="flex flex-wrap gap-2">
            {CLINIC_CASES.map((c, idx) => (
              <button
                key={idx}
                onClick={() => { playChime('click'); setActiveConsultation(idx); }}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeConsultation === idx
                    ? 'bg-rose-600 text-white shadow-md scale-105'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.title}</span>
              </button>
            ))}
          </div>

          {/* Active Case Simulation Box */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-700 pb-4">
              <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
                {CLINIC_CASES[activeConsultation].title}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {CLINIC_CASES[activeConsultation].patientDesc}
              </p>
            </div>

            {/* Dialogue Bubble: Patient */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-700 dark:text-rose-400">
                <Smile className="w-4 h-4" /> Patient (Patient / Patientin):
              </div>
              <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200 dark:border-rose-800 space-y-2">
                <p className="text-base font-bold text-stone-900 dark:text-stone-100">
                  "{CLINIC_CASES[activeConsultation].patientGerman}"
                </p>
                <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                  {CLINIC_CASES[activeConsultation].patientTrans}
                </p>
                <button
                  onClick={() => speakGerman(CLINIC_CASES[activeConsultation].patientGerman, isSlowMode)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 hover:underline pt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen to Patient
                </button>
              </div>
            </div>

            {/* Dialogue Bubble: Doctor */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-700 dark:text-emerald-400">
                <Stethoscope className="w-4 h-4" /> Doctor (Arzt / Ärztin):
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                <p className="text-base font-bold text-stone-900 dark:text-stone-100">
                  "{CLINIC_CASES[activeConsultation].doctorGerman}"
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  {CLINIC_CASES[activeConsultation].doctorTrans}
                </p>
                <button
                  onClick={() => speakGerman(CLINIC_CASES[activeConsultation].doctorGerman, isSlowMode)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen to Doctor's Advice
                </button>
              </div>
            </div>

            {/* Advice & Remedy Checklist */}
            <div className="p-4 bg-stone-50 dark:bg-stone-750 rounded-2xl space-y-2 border border-stone-200 dark:border-stone-600">
              <div className="text-xs font-black uppercase text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-rose-600" /> Key German Medical Advice & Imperativs:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200">
                {CLINIC_CASES[activeConsultation].adviceBullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2 bg-white dark:bg-stone-800 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
