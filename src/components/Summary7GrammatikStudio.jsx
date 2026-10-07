import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Calendar,
  Clock,
  HeartPulse,
  Activity,
  AlertTriangle,
  FileText,
  Mail,
  Smile,
  ShieldCheck,
  Zap,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary7GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('imperativ'); // 'imperativ', 'praeteritum', 'dativ_body', 'deshalb', 'dates_redemittel'

  // Station 1: Imperativ state
  const [selectedVerbKey, setSelectedVerbKey] = useState('holen'); // 'holen', 'fahren', 'nehmen', 'anrufen', 'trinken', 'schlafen'
  const [selectedImperativMode, setSelectedImperativMode] = useState('du'); // 'du', 'ihr', 'Sie'

  // Station 2: Präteritum state
  const [praeteritumVerb, setPraeteritumVerb] = useState('sein'); // 'sein', 'haben'
  const [selectedPerson, setSelectedPerson] = useState('ich'); // 'ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'
  const [selectedVonTarget, setSelectedVonTarget] = useState('exfreundin'); // 'exfreundin', 'bruder', 'kind', 'freunde'

  // Station 3: Dativ Body Matrix state
  const [selectedBodyGender, setSelectedBodyGender] = useState('masculine'); // 'masculine', 'neuter', 'feminine', 'plural'

  // Station 4: Deshalb state
  const [deshalbSentenceIdx, setDeshalbSentenceIdx] = useState(0);

  // Station 5: Redemittel Tab state
  const [activeRedemittelTab, setActiveRedemittelTab] = useState('health'); // 'health', 'appointments', 'problems', 'letters'

  // Data for Station 1: Imperativ (Page 1)
  const imperativVerbs = {
    holen: {
      infinitive: 'holen (to fetch / get)',
      category: 'Regular Verb',
      du: { command: 'Hol!', formula: 'du holst ➔ drop "du" & drop "-st"', note: 'Regular drop rule: stem only!' },
      ihr: { command: 'Holt!', formula: 'ihr holt ➔ drop "ihr"', note: 'Keep the regular "-t" ending!' },
      Sie: { command: 'Holen Sie!', formula: 'Sie holen ➔ Swap: Verb + Sie!', note: 'Formal respectful command!' },
      example: 'Hol bitte die Medizin aus der Apotheke!',
      sound: 'Hol! Holt! Holen Sie! Hol bitte die Medizin aus der Apotheke!'
    },
    fahren: {
      infinitive: 'fahren (to drive / ride)',
      category: 'a ➔ ä Vowel Change (Umlaut drops!)',
      du: { command: 'Fahr!', formula: 'du fährst ➔ drop "du", "-st" AND drop Umlaut (ä ➔ a)!', note: '🚨 CRITICAL: The umlaut drops off! NOT "Fähr!"' },
      ihr: { command: 'Fahrt!', formula: 'ihr fahrt ➔ drop "ihr"', note: 'ihr form never had an umlaut anyway!' },
      Sie: { command: 'Fahren Sie!', formula: 'Sie fahren ➔ Swap: Verb + Sie!', note: 'Formal polite command!' },
      example: 'Fahr bitte vorsichtig zum Krankenhaus!',
      sound: 'Fahr! Fahrt! Fahren Sie! Fahr bitte vorsichtig zum Krankenhaus!'
    },
    nehmen: {
      infinitive: 'nehmen (to take)',
      category: 'e ➔ i Vowel Shift (Shift stays!)',
      du: { command: 'Nimm!', formula: 'du nimmst ➔ drop "du" & "-st", KEEP "i"!', note: '⚡ Vowel shift from e ➔ i is preserved in du!' },
      ihr: { command: 'Nehmt!', formula: 'ihr nehmt ➔ drop "ihr"', note: 'Regular plural command with "-t"!' },
      Sie: { command: 'Nehmen Sie!', formula: 'Sie nehmen ➔ Swap: Verb + Sie!', note: 'Formal command with infinitive + Sie!' },
      example: 'Nimm die Tabletten dreimal am Tag!',
      sound: 'Nimm! Nehmt! Nehmen Sie! Nimm die Tabletten dreimal am Tag!'
    },
    anrufen: {
      infinitive: 'anrufen (to call - Separable Verb)',
      category: 'Separable Verb (Prefix goes to the end)',
      du: { command: 'Ruf an!', formula: 'du rufst an ➔ drop "du", "-st", prefix "an" at end!', note: 'Prefix splits and lands at the very end!' },
      ihr: { command: 'Ruft an!', formula: 'ihr ruft an ➔ drop "ihr", prefix "an" at end!', note: 'Plural friends command!' },
      Sie: { command: 'Rufen Sie an!', formula: 'Sie rufen an ➔ Swap: Rufen Sie ... an!', note: 'Formal command with prefix at end!' },
      example: 'Ruf bitte heute noch beim Zahnarzt an!',
      sound: 'Ruf an! Ruft an! Rufen Sie an! Ruf bitte heute noch beim Zahnarzt an!'
    },
    trinken: {
      infinitive: 'trinken (to drink)',
      category: 'Regular Verb',
      du: { command: 'Trink!', formula: 'du trinkst ➔ drop "du" & "-st"', note: 'Simple stem command!' },
      ihr: { command: 'Trinkt!', formula: 'ihr trinkt ➔ drop "ihr"', note: 'Plural group command!' },
      Sie: { command: 'Trinken Sie!', formula: 'Sie trinken ➔ Swap: Verb + Sie!', note: 'Doctor recommendation style!' },
      example: 'Trink viel warmen Tee mit Honig!',
      sound: 'Trink! Trinkt! Trinken Sie! Trink viel warmen Tee mit Honig!'
    },
    schlafen: {
      infinitive: 'schlafen (to sleep)',
      category: 'a ➔ ä Vowel Change (Umlaut drops!)',
      du: { command: 'Schlaf!', formula: 'du schläfst ➔ drop "du", "-st" & drop Umlaut!', note: 'No umlaut in du command!' },
      ihr: { command: 'Schlaft!', formula: 'ihr schlaft ➔ drop "ihr"', note: 'Plural group command!' },
      Sie: { command: 'Schlafen Sie!', formula: 'Sie schlafen ➔ Swap: Verb + Sie!', note: 'Doctor advice to a patient!' },
      example: 'Schlaf gut und erhole dich gut!',
      sound: 'Schlaf! Schlaft! Schlafen Sie! Schlaf gut und erhole dich gut!'
    }
  };

  // Data for Station 2: Präteritum & von + Dativ (Pages 2 & 3)
  const praeteritumData = {
    sein: {
      infinitive: 'sein (to be) ➔ Simple Past: war',
      forms: {
        ich: { form: 'war', note: 'I was (Base past stem)' },
        du: { form: 'warst', note: 'you were (adds -st)' },
        er_sie_es: { form: 'war', note: 'he/she/it was (IDENTICAL TWIN with ich! No ending!)' },
        wir: { form: 'waren', note: 'we were (adds -en)' },
        ihr: { form: 'wart', note: 'you all were (adds -t)' },
        sie_Sie: { form: 'waren', note: 'they / You were (adds -en)' }
      },
      example: 'Gestern war ich beim Arzt, weil ich krank war.',
      sound: 'ich war, du warst, er war, wir waren, ihr wart, sie waren. Gestern war ich beim Arzt.'
    },
    haben: {
      infinitive: 'haben (to have) ➔ Simple Past: hatte',
      forms: {
        ich: { form: 'hatte', note: 'I had (Base past stem)' },
        du: { form: 'hattest', note: 'you had (adds -st)' },
        er_sie_es: { form: 'hatte', note: 'he/she/it had (IDENTICAL TWIN with ich! No ending!)' },
        wir: { form: 'hatten', note: 'we had (adds -en)' },
        ihr: { form: 'hattet', note: 'you all had (adds -t)' },
        sie_Sie: { form: 'hatten', note: 'they / You had (adds -en)' }
      },
      example: 'Letzte Woche hatte er starke Zahnschmerzen.',
      sound: 'ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten. Letzte Woche hatte er starke Zahnschmerzen.'
    }
  };

  const vonDativData = {
    exfreundin: {
      target: 'seiner Exfreundin (Feminin)',
      base: 'die Exfreundin',
      formula: 'von + Dativ Feminin ➔ "-er" ending (von seiner Exfreundin)',
      sentence: 'Das ist der Name von seiner Exfreundin.',
      en: 'That is the name of his ex-girlfriend.',
      sound: 'von seiner Exfreundin. Das ist der Name von seiner Exfreundin.'
    },
    bruder: {
      target: 'meinem Bruder (Maskulin)',
      base: 'der Bruder',
      formula: 'von + Dativ Maskulin ➔ "-em" ending (von meinem Bruder)',
      sentence: 'Das ist das Auto von meinem Bruder.',
      en: 'That is the car of my brother.',
      sound: 'von meinem Bruder. Das ist das Auto von meinem Bruder.'
    },
    kind: {
      target: 'dem Kind (Neutrum)',
      base: 'das Kind',
      formula: 'von + Dativ Neutrum ➔ "-em" ending (von dem Kind / von meinem Kind)',
      sentence: 'Das ist das Spielzeug von dem Kind.',
      en: 'That is the toy of the child.',
      sound: 'von dem Kind. Das ist das Spielzeug von dem Kind.'
    },
    freunde: {
      target: 'meinen Freunden (Plural)',
      base: 'die Freunde',
      formula: 'von + Dativ Plural ➔ "-en" ending + "-n" on noun (von meinen Freunden)',
      sentence: 'Das sind die Geschenke von meinen Freunden.',
      en: 'Those are the gifts from my friends.',
      sound: 'von meinen Freunden. Das sind die Geschenke von meinen Freunden.'
    }
  };

  // Data for Station 3: Dativ Body Matrix (Page 4)
  const dativBodyData = {
    masculine: {
      title: 'Maskulin (der Rücken - back / der Kopf - head / der Bauch - stomach)',
      indefinite: 'einem Rücken',
      negative: 'keinem Rücken',
      possessive: 'meinem Rücken / seinem Rücken',
      endingBadge: '-em',
      sampleSentence: 'Die Salbe hilft an meinem Rücken.',
      en: 'The ointment helps on my back.',
      sound: 'einem Rücken, keinem Rücken, meinem Rücken. Die Salbe hilft an meinem Rücken.'
    },
    neuter: {
      title: 'Neutrum (das Gesicht - face / das Bein - leg / das Ohr - ear)',
      indefinite: 'einem Gesicht',
      negative: 'keinem Gesicht',
      possessive: 'meinem Gesicht / ihrem Gesicht',
      endingBadge: '-em (same as Maskulin!)',
      sampleSentence: 'Ich habe einen Ausschlag in meinem Gesicht.',
      en: 'I have a rash on my face.',
      sound: 'einem Gesicht, keinem Gesicht, meinem Gesicht. Ich habe einen Ausschlag in meinem Gesicht.'
    },
    feminine: {
      title: 'Feminin (die Hand - hand / die Nase - nose / die Schulter - shoulder)',
      indefinite: 'einer Hand',
      negative: 'keiner Hand',
      possessive: 'meiner Hand / seiner Hand',
      endingBadge: '-er',
      sampleSentence: 'Ich spüre Schmerzen in meiner Hand.',
      en: 'I feel pain in my hand.',
      sound: 'einer Hand, keiner Hand, meiner Hand. Ich spüre Schmerzen in meiner Hand.'
    },
    plural: {
      title: 'Plural (die Haare - hair / die Augen - eyes / die Ohren - ears / die Fotos)',
      indefinite: '- (no plural article for ein)',
      negative: 'keinen Haaren',
      possessive: 'meinen Haaren / ihren Haaren',
      endingBadge: '-en + extra -n on noun (except -s words: keinen Fotos)',
      sampleSentence: 'Ich habe graue Strähnen in meinen Haaren.',
      en: 'I have grey streaks in my hair.',
      sound: 'keinen Haaren, meinen Haaren, meinen Augen, keinen Fotos. Ich habe graue Strähnen in meinen Haaren.'
    }
  };

  // Data for Station 4: Deshalb & Tattoo Regret (Page 5)
  const deshalbSentences = [
    {
      context: '💉 Tattoo Regret (The PDF Page 5 Story):',
      clause1: 'Ich finde mein Tattoo nicht gut,',
      connector: 'deshalb (Pos 1)',
      verb: 'will (Pos 2 Verb)',
      subject: 'ich (Pos 3 Subject)',
      rest: 'es wegmachen.',
      fullDe: 'Ich finde mein Tattoo nicht gut, deshalb will ich es wegmachen.',
      en: "I don't like my tattoo, therefore I want to remove it.",
      comparisonWithDenn: 'Mit denn (Pos 0): ...denn ich (1) will (2) es wegmachen. Mit deshalb (Pos 1): ...deshalb (1) will (2) ich (3) es wegmachen.'
    },
    {
      context: '🧺 Broken Washing Machine (Page 8):',
      clause1: 'Meine Waschmaschine ist kaputt,',
      connector: 'deshalb (Pos 1)',
      verb: 'muss (Pos 2 Verb)',
      subject: 'ich (Pos 3 Subject)',
      rest: 'eine neue kaufen.',
      fullDe: 'Meine Waschmaschine ist kaputt, deshalb muss ich eine neue kaufen.',
      en: 'My washing machine is broken, therefore I have to buy a new one.',
      comparisonWithDenn: 'Mit denn (Pos 0): ...denn ich muss eine neue kaufen. Mit deshalb (Pos 1): ...deshalb muss ich eine neue kaufen.'
    },
    {
      context: '🩺 Sickness & Doctor Appointment:',
      clause1: 'Ich habe starkes Fieber und Zahnschmerzen,',
      connector: 'deshalb (Pos 1)',
      verb: 'gehe (Pos 2 Verb)',
      subject: 'ich (Pos 3 Subject)',
      rest: 'heute zum Arzt.',
      fullDe: 'Ich habe starkes Fieber und Zahnschmerzen, deshalb gehe ich heute zum Arzt.',
      en: 'I have a high fever and toothache, that is why I am going to the doctor today.',
      comparisonWithDenn: 'Mit denn (Pos 0): ...denn ich gehe heute zum Arzt. Mit deshalb (Pos 1): ...deshalb gehe ich heute zum Arzt.'
    },
    {
      context: '🌧️ Bad Weather & Home Rest:',
      clause1: 'Es regnet den ganzen Tag sehr stark,',
      connector: 'deshalb (Pos 1)',
      verb: 'bleiben (Pos 2 Verb)',
      subject: 'wir (Pos 3 Subject)',
      rest: 'gemütlich zu Hause.',
      fullDe: 'Es regnet den ganzen Tag sehr stark, deshalb bleiben wir gemütlich zu Hause.',
      en: 'It is raining heavily all day, therefore we are staying cozily at home.',
      comparisonWithDenn: 'Mit denn (Pos 0): ...denn wir bleiben zu Hause. Mit deshalb (Pos 1): ...deshalb bleiben wir zu Hause.'
    }
  ];

  // Data for Station 5: Ordinalzahlen & Redemittel (Pages 6, 7 & 8)
  const ordinalNumbersList = [
    { num: '1.', nom: 'der erste', dativ: 'am ersten', note: 'Irregular root: erst-' },
    { num: '2.', nom: 'der zweite', dativ: 'am zweiten', note: 'Standard +te / +ten' },
    { num: '3.', nom: 'der dritte', dativ: 'am dritten', note: 'Irregular root: dritt-' },
    { num: '4.', nom: 'der vierte', dativ: 'am vierten', note: 'Standard +te / +ten' },
    { num: '7.', nom: 'der siebte', dativ: 'am siebten', note: 'Irregular: sieb- (not sieben)' },
    { num: '16.', nom: 'der sechzehnte', dativ: 'am sechzehnten', note: 'Cartoon date: Am 16. 12.' },
    { num: '20.', nom: 'der zwanzigste', dativ: 'am zwanzigsten', note: '20+ takes +ste / +sten!' },
    { num: '21.', nom: 'der einundzwanzigste', dativ: 'am einundzwanzigsten', note: 'Page 6 example: der 21. 4.' },
    { num: '30.', nom: 'der dreißigste', dativ: 'am dreißigsten', note: '20+ takes +ste / +sten!' }
  ];

  const redemittelCategories = {
    health: {
      title: '🩺 Gesundheitsprobleme & Symptome',
      badge: 'At the Clinic',
      phrases: [
        { de: 'Ich bin krank. Ich habe Fieber.', en: 'I am sick. I have a fever.', sound: 'Ich bin krank. Ich habe Fieber.' },
        { de: 'Ich habe starke Zahnschmerzen / Kopfschmerzen.', en: 'I have a severe toothache / headache.', sound: 'Ich habe starke Zahnschmerzen und Kopfschmerzen.' },
        { de: 'Mein Rücken tut weh.', en: 'My back hurts.', sound: 'Mein Rücken tut weh.' },
        { de: 'Ich kann heute leider nicht arbeiten.', en: 'Unfortunately, I cannot work today.', sound: 'Ich kann heute leider nicht arbeiten.' },
        { de: 'Gute Besserung! Hoffentlich geht es dir bald besser.', en: 'Get well soon! Hopefully you will feel better soon.', sound: 'Gute Besserung! Hoffentlich geht es dir bald besser.' }
      ]
    },
    appointments: {
      title: '📅 Termine vereinbaren & verschieben',
      badge: 'Scheduling',
      phrases: [
        { de: 'Ich möchte einen Termin beim Zahnarzt.', en: 'I would like an appointment at the dentist.', sound: 'Ich möchte einen Termin beim Zahnarzt.' },
        { de: 'Geht es am sechzehnten Dezember (am 16. 12.)?', en: 'Is the 16th of December possible?', sound: 'Geht es am sechzehnten Dezember?' },
        { de: 'Ich möchte gern früher / später kommen.', en: 'I would like to come earlier / later.', sound: 'Ich möchte gern früher oder später kommen.' },
        { de: 'Wann ist Ihr Termin? - Am einundzwanzigsten vierten (am 21. 4.).', en: 'When is your appointment? - On April 21st.', sound: 'Wann ist Ihr Termin? Am einundzwanzigsten vierten.' },
        { de: 'Ich muss meinen Termin leider absagen.', en: 'Unfortunately, I have to cancel my appointment.', sound: 'Ich muss meinen Termin leider absagen.' }
      ]
    },
    problems: {
      title: '🧺 Probleme, Schäden & Pannen',
      badge: 'Troubleshooting',
      phrases: [
        { de: 'Meine Waschmaschine ist kaputt.', en: 'My washing machine is broken.', sound: 'Meine Waschmaschine ist kaputt.' },
        { de: 'Ich kann nicht mehr waschen. Ich muss eine neue kaufen.', en: 'I cannot do laundry anymore. I have to buy a new one.', sound: 'Ich kann nicht mehr waschen. Ich muss eine neue kaufen.' },
        { de: 'Das ist doch kein Problem!', en: "That is no problem at all! (Comforting word 'doch')", sound: 'Das ist doch kein Problem!' },
        { de: 'Das macht doch nichts!', en: "It doesn't matter at all! Don't worry!", sound: 'Das macht doch nichts!' },
        { de: 'Der Handwerker kommt morgen früh.', en: 'The repairman is coming tomorrow morning.', sound: 'Der Handwerker kommt morgen früh.' }
      ]
    },
    letters: {
      title: '✉️ Briefe, E-Mails & Höflichkeit',
      badge: 'Formal Correspondence',
      phrases: [
        { de: 'Sehr geehrte Frau Müller,', en: 'Dear Ms. Müller (Formal Greeting - Female)', sound: 'Sehr geehrte Frau Müller,' },
        { de: 'Sehr geehrter Herr Schmidt,', en: 'Dear Mr. Schmidt (Formal Greeting - Male)', sound: 'Sehr geehrter Herr Schmidt,' },
        { de: 'Mit freundlichen Grüßen (MfG)', en: 'With kind regards (Standard formal sign-off)', sound: 'Mit freundlichen Grüßen' },
        { de: 'Liebe Grüße / Herzliche Grüße', en: 'Warm regards / Best wishes (Informal / Friendly)', sound: 'Liebe Grüße, Herzliche Grüße' },
        { de: 'Vielen Dank für Ihre Hilfe und Ihr Verständnis.', en: 'Thank you very much for your help and understanding.', sound: 'Vielen Dank für Ihre Hilfe und Ihr Verständnis.' }
      ]
    }
  };

  const handlePlaySound = (text) => {
    playChime();
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8 transition-all">
      {/* Studio Banner Header */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-indigo-900 text-white p-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-400/90 text-amber-950 font-black text-xs uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Summary 7 Grammatik Studio
              </span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                A1.2 Complete
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Commands, Past Tense, Dativ Body & The "Deshalb" Connector
            </h2>
            <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
              Master the imperative command formulas (<em>du / ihr / Sie</em>), past tense of <em>haben/sein</em>, the Dativ body matrix, consequence logic with <em>deshalb</em>, and calendar date rules!
            </p>
          </div>

          <button
            onClick={() =>
              handlePlaySound(
                'Willkommen im Grammatik Studio für Zusammenfassung 7! Lerne den Imperativ, das Präteritum, den Dativ, deshalb und die Ordinalzahlen.'
              )
            }
            className="self-start md:self-center flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm transition border border-white/20 shadow-md"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            Studio Intro
          </button>
        </div>

        {/* Station Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6 pt-4 border-t border-white/15">
          <button
            onClick={() => {
              setActiveStation('imperativ');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'imperativ'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Zap className="w-4 h-4" />
            1. Imperativ (Commands)
          </button>

          <button
            onClick={() => {
              setActiveStation('praeteritum');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'praeteritum'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            2. Präteritum & von
          </button>

          <button
            onClick={() => {
              setActiveStation('dativ_body');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'dativ_body'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Activity className="w-4 h-4" />
            3. Dativ Body Matrix
          </button>

          <button
            onClick={() => {
              setActiveStation('deshalb');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm ${
              activeStation === 'deshalb'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
            4. deshalb (Pos 1)
          </button>

          <button
            onClick={() => {
              setActiveStation('dates_redemittel');
              playChime();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition shadow-sm col-span-2 md:col-span-1 ${
              activeStation === 'dates_redemittel'
                ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Calendar className="w-4 h-4" />
            5. Dates & Redemittel
          </button>
        </div>
      </div>

      {/* Main Studio Interactive Content */}
      <div className="p-6 md:p-8 bg-slate-50/50">
        {/* =========================================================================
            STATION 1: IMPERATIV STUDIO (Page 1)
            ========================================================================= */}
        {activeStation === 'imperativ' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Page 1 • Verb: Imperativ Formulas
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  How German Commands Work: du vs ihr vs Sie
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Commands change based on who you are commanding: 1 friend (<em>du</em>), multiple friends (<em>ihr</em>), or formal respect (<em>Sie</em>).
              </p>
            </div>

            {/* Verb Selection Grid */}
            <div>
              <label className="text-xs font-black uppercase text-slate-600 mb-2 block">
                Select a Verb to Inspect Command Rules:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {Object.keys(imperativVerbs).map((key) => {
                  const verb = imperativVerbs[key];
                  const isSelected = selectedVerbKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedVerbKey(key);
                        playChime();
                      }}
                      className={`p-3 rounded-xl text-left transition border ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-700 shadow-md font-bold ring-2 ring-teal-300'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/30'
                      }`}
                    >
                      <div className="font-extrabold text-sm">{key}</div>
                      <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                        {verb.category.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Verb Analysis Panel */}
            {(() => {
              const curVerb = imperativVerbs[selectedVerbKey];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  {/* Category Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-teal-50 border border-teal-200 rounded-xl">
                    <div>
                      <span className="text-xs font-bold text-teal-800">Infinitive:</span>{' '}
                      <span className="font-extrabold text-slate-900 text-base">{curVerb.infinitive}</span>
                      <span className="ml-2 inline-block text-xs bg-teal-200 text-teal-900 px-2 py-0.5 rounded font-semibold">
                        {curVerb.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curVerb.sound)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-white hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-300 transition shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen to All 3 Forms
                    </button>
                  </div>

                  {/* 3-Column Command Formula Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* du-Form */}
                    <div
                      onClick={() => setSelectedImperativMode('du')}
                      className={`p-4 rounded-xl border transition cursor-pointer ${
                        selectedImperativMode === 'du'
                          ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400 shadow-sm'
                          : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                          du-Form (1 Friend)
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Singular Informal</span>
                      </div>
                      <div className="text-2xl font-black text-slate-900 my-1 text-amber-700">
                        {curVerb.du.command}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 mt-1">
                        Formula: {curVerb.du.formula}
                      </div>
                      <div className="text-[11px] text-amber-900 mt-2 bg-white/70 p-2 rounded border border-amber-200 font-medium">
                        💡 {curVerb.du.note}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySound(curVerb.du.command);
                        }}
                        className="mt-3 w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Volume2 className="w-3 h-3" /> Speak "{curVerb.du.command}"
                      </button>
                    </div>

                    {/* ihr-Form */}
                    <div
                      onClick={() => setSelectedImperativMode('ihr')}
                      className={`p-4 rounded-xl border transition cursor-pointer ${
                        selectedImperativMode === 'ihr'
                          ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-400 shadow-sm'
                          : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-200 px-2 py-0.5 rounded">
                          ihr-Form (Group of Friends)
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Plural Informal</span>
                      </div>
                      <div className="text-2xl font-black text-blue-700 my-1">
                        {curVerb.ihr.command}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 mt-1">
                        Formula: {curVerb.ihr.formula}
                      </div>
                      <div className="text-[11px] text-blue-900 mt-2 bg-white/70 p-2 rounded border border-blue-200 font-medium">
                        👥 {curVerb.ihr.note}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySound(curVerb.ihr.command);
                        }}
                        className="mt-3 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Volume2 className="w-3 h-3" /> Speak "{curVerb.ihr.command}"
                      </button>
                    </div>

                    {/* Sie-Form */}
                    <div
                      onClick={() => setSelectedImperativMode('Sie')}
                      className={`p-4 rounded-xl border transition cursor-pointer ${
                        selectedImperativMode === 'Sie'
                          ? 'bg-purple-50/80 border-purple-300 ring-2 ring-purple-400 shadow-sm'
                          : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-900 bg-purple-200 px-2 py-0.5 rounded">
                          Sie-Form (Formal Respect)
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Polite / Doctor / Boss</span>
                      </div>
                      <div className="text-2xl font-black text-purple-700 my-1">
                        {curVerb.Sie.command}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 mt-1">
                        Formula: {curVerb.Sie.formula}
                      </div>
                      <div className="text-[11px] text-purple-900 mt-2 bg-white/70 p-2 rounded border border-purple-200 font-medium">
                        👔 {curVerb.Sie.note}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySound(curVerb.Sie.command);
                        }}
                        className="mt-3 w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Volume2 className="w-3 h-3" /> Speak "{curVerb.Sie.command}"
                      </button>
                    </div>
                  </div>

                  {/* Context Sentence Example */}
                  <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                        Real-World Clinic / Daily Life Command:
                      </div>
                      <div className="text-base font-extrabold mt-0.5">{curVerb.example}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curVerb.example)}
                      className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition shadow"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Quick Golden Rules Cheat Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Drop the Umlaut Rule
                </div>
                If a verb adds an umlaut in the present tense (<em>du fährst</em>, <em>du schläfst</em>), the umlaut <strong>DISAPPEARS</strong> in the command: <strong>Fahr!</strong>, <strong>Schlaf!</strong>
              </div>

              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-950">
                <div className="font-bold flex items-center gap-1.5 text-blue-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> 2. Keep the 'e ➔ i' Shift
                </div>
                If a verb changes from 'e' to 'i' (<em>du nimmst</em>, <em>du gibst</em>, <em>du liest</em>), the shift <strong>STAYS</strong> in the command: <strong>Nimm!</strong>, <strong>Gib!</strong>, <strong>Lies!</strong>
              </div>

              <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-950">
                <div className="font-bold flex items-center gap-1.5 text-purple-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" /> 3. Separable Verbs Split
                </div>
                The prefix always catapults to the very end of the sentence: <em>anrufen</em> ➔ <strong>Ruf</strong> mich morgen <strong>an!</strong>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 2: PRÄTERITUM (sein & haben) & von + Dativ (Pages 2 & 3)
            ========================================================================= */}
        {activeStation === 'praeteritum' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                  Pages 2 & 3 • Simple Past (Präteritum) & von + Dativ
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Simple Past of <em>haben</em> & <em>sein</em> + The Ex-Girlfriend Rule
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                In conversational German, <em>war</em> and <em>hatte</em> are used constantly instead of Perfekt. Remember: <strong>ich</strong> and <strong>er/sie/es</strong> are identical twins!
              </p>
            </div>

            {/* Verb Toggle */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPraeteritumVerb('sein');
                  playChime();
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm transition border flex items-center justify-center gap-2 ${
                  praeteritumVerb === 'sein'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50'
                }`}
              >
                <span>sein ➔ war (to be ➔ was/were)</span>
              </button>

              <button
                onClick={() => {
                  setPraeteritumVerb('haben');
                  playChime();
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm transition border flex items-center justify-center gap-2 ${
                  praeteritumVerb === 'haben'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50'
                }`}
              >
                <span>haben ➔ hatte (to have ➔ had)</span>
              </button>
            </div>

            {/* Präteritum Conjugation Grid */}
            {(() => {
              const vData = praeteritumData[praeteritumVerb];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-lg">{vData.infinitive}</h4>
                      <p className="text-xs text-slate-500">
                        ⚡ Rule: 1st person (ich) and 3rd person (er/es/sie) have <strong>zero extra ending</strong> and are identical!
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlaySound(vData.sound)}
                      className="flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition"
                    >
                      <Volume2 className="w-4 h-4" /> Listen to Full Paradigm
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(vData.forms).map((personKey) => {
                      const formObj = vData.forms[personKey];
                      const isTwin = personKey === 'ich' || personKey === 'er_sie_es';
                      return (
                        <div
                          key={personKey}
                          onClick={() => {
                            setSelectedPerson(personKey);
                            handlePlaySound(`${personKey.replace('_', ' ')} ${formObj.form}`);
                          }}
                          className={`p-3.5 rounded-xl border transition cursor-pointer ${
                            isTwin
                              ? 'bg-amber-50/70 border-amber-200 hover:bg-amber-100/70'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                            <span>{personKey.replace('_', ' / ')}</span>
                            {isTwin && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-1.5 py-0.2 rounded">
                                TWIN
                              </span>
                            )}
                          </div>
                          <div className="text-xl font-black text-slate-900 mt-1 flex items-center justify-between">
                            <span>{formObj.form}</span>
                            <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <div className="text-[11px] text-slate-600 mt-1 font-medium">{formObj.note}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sample Sentence */}
                  <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-indigo-300 font-bold uppercase">Example:</span>
                      <p className="font-bold text-sm mt-0.5">{vData.example}</p>
                    </div>
                    <button
                      onClick={() => handlePlaySound(vData.example)}
                      className="p-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Page 3: Präposition von + Dativ (Exfreundin Rule) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">
                    Page 3 • Präposition "von" + Dativ
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    "Von wem?" ➔ The Ex-Girlfriend Tattoo Story
                  </h4>
                  <p className="text-xs text-slate-500">
                    The preposition <strong>von</strong> (of / from) strictly commands the <strong>DATIVE</strong> case!
                  </p>
                </div>
              </div>

              {/* Target Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.keys(vonDativData).map((key) => {
                  const item = vonDativData[key];
                  const isSelected = selectedVonTarget === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedVonTarget(key);
                        playChime();
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-700 font-bold shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50'
                      }`}
                    >
                      <div className="text-xs font-mono">{item.base}</div>
                      <div className="text-sm font-extrabold mt-0.5">{item.target}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Von Rule Card */}
              {(() => {
                const curVon = vonDativData[selectedVonTarget];
                return (
                  <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-rose-900">
                      Formula: {curVon.formula}
                    </div>
                    <div className="text-base font-extrabold text-slate-900">
                      "{curVon.sentence}"
                    </div>
                    <div className="text-xs text-slate-600 italic">
                      English: {curVon.en}
                    </div>
                    <button
                      onClick={() => handlePlaySound(curVon.sound)}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen to Audio
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 3: DATIV BODY MATRIX (Page 4)
            ========================================================================= */}
        {activeStation === 'dativ_body' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Page 4 • Dativ: Nomen, Negation & Possessiv
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Dativ Endings for Body Parts: <em>-em</em>, <em>-er</em>, <em>-en</em> + <em>-n</em>
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                When describing pain or applying cream to body parts in Dativ, the endings follow a crystal-clear pattern!
              </p>
            </div>

            {/* Gender Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setSelectedBodyGender('masculine');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedBodyGender === 'masculine'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Maskulin</div>
                <div className="text-sm font-extrabold">der Rücken (-em)</div>
              </button>

              <button
                onClick={() => {
                  setSelectedBodyGender('neuter');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedBodyGender === 'neuter'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Neutrum</div>
                <div className="text-sm font-extrabold">das Gesicht (-em)</div>
              </button>

              <button
                onClick={() => {
                  setSelectedBodyGender('feminine');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedBodyGender === 'feminine'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Feminin</div>
                <div className="text-sm font-extrabold">die Hand (-er)</div>
              </button>

              <button
                onClick={() => {
                  setSelectedBodyGender('plural');
                  playChime();
                }}
                className={`p-3.5 rounded-xl text-left border transition ${
                  selectedBodyGender === 'plural'
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <div className="text-xs uppercase font-mono">Plural</div>
                <div className="text-sm font-extrabold">die Haare (-en + -n*)</div>
              </button>
            </div>

            {/* Active Gender Dativ Matrix Card */}
            {(() => {
              const bData = dativBodyData[selectedBodyGender];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{bData.title}</h4>
                      <span className="inline-block mt-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        Dative Ending Key: {bData.endingBadge}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePlaySound(bData.sound)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm transition"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" /> Listen to Forms
                    </button>
                  </div>

                  {/* 3 Forms Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        1. Unbestimmter Artikel
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 mt-1">
                        {bData.indefinite}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">"a / one..."</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        2. Negativartikel (kein-)
                      </div>
                      <div className="text-xl font-extrabold text-rose-700 mt-1">
                        {bData.negative}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">"no / not any..."</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        3. Possessivartikel (mein-)
                      </div>
                      <div className="text-xl font-extrabold text-emerald-700 mt-1">
                        {bData.possessive}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">"my / his / her..."</div>
                    </div>
                  </div>

                  {/* Clinical Sample Sentence */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-emerald-900 uppercase">
                        Clinic / Doctor Example:
                      </div>
                      <div className="text-base font-extrabold text-emerald-950 mt-0.5">
                        {bData.sampleSentence}
                      </div>
                      <div className="text-xs text-emerald-700 italic mt-0.5">{bData.en}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(bData.sampleSentence)}
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition shadow"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Plural Double-N Exception Alert */}
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3 text-xs text-amber-950">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Page 4 Plural Special Rule:</strong> In the Dative plural, almost all nouns add an extra <strong>-n</strong> (e.g. <em>den Haaren</em>, <em>den Beinen</em>). The only exception is foreign loanwords ending in <strong>-s</strong> (e.g. <em>keinen Fotos</em>), which do not take another -n!
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATION 4: KONJUNKTION DESHALB (Page 5)
            ========================================================================= */}
        {activeStation === 'deshalb' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Page 5 • Satz: Konjunktion "deshalb"
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  The "Deshalb" Position 1 Rule & The Tattoo Regret Story
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                <em>deshalb</em> means "therefore / that's why". Because it sits in <strong>Position 1</strong>, the conjugated verb immediately follows in <strong>Position 2</strong>!
              </p>
            </div>

            {/* Sentence Switcher */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {deshalbSentences.map((sent, idx) => {
                const isSelected = deshalbSentenceIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setDeshalbSentenceIdx(idx);
                      playChime();
                    }}
                    className={`p-3 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-md font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <div className="text-[11px] font-mono truncate">{sent.context}</div>
                    <div className="text-xs font-extrabold mt-1 truncate">{sent.clause1}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Deshalb Sentence Visualizer */}
            {(() => {
              const curSent = deshalbSentences[deshalbSentenceIdx];
              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {curSent.context}
                  </div>

                  {/* Visual Word Order Train */}
                  <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-4">
                    <div className="text-xs text-amber-400 font-bold">Clause 1 (Reason):</div>
                    <div className="text-lg font-bold text-slate-200 border-b border-slate-700 pb-3">
                      "{curSent.clause1}"
                    </div>

                    <div className="text-xs text-amber-400 font-bold">
                      Clause 2 (Consequence with "deshalb" in Position 1):
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2.5 bg-amber-500 text-slate-950 font-black text-center rounded-xl shadow">
                        <div className="text-[10px] uppercase tracking-wider opacity-80">Position 1</div>
                        <div className="text-sm">deshalb</div>
                      </div>

                      <div className="p-2.5 bg-emerald-500 text-slate-950 font-black text-center rounded-xl shadow ring-2 ring-emerald-300">
                        <div className="text-[10px] uppercase tracking-wider opacity-80">Position 2 (VERB)</div>
                        <div className="text-sm">{curSent.verb.split(' ')[0]}</div>
                      </div>

                      <div className="p-2.5 bg-blue-500 text-white font-black text-center rounded-xl shadow">
                        <div className="text-[10px] uppercase tracking-wider opacity-80">Position 3 (SUBJECT)</div>
                        <div className="text-sm">{curSent.subject.split(' ')[0]}</div>
                      </div>

                      <div className="p-2.5 bg-slate-800 text-slate-300 font-bold text-center rounded-xl border border-slate-700">
                        <div className="text-[10px] uppercase tracking-wider opacity-60">End (Rest)</div>
                        <div className="text-sm truncate">{curSent.rest}</div>
                      </div>
                    </div>
                  </div>

                  {/* Full Sentence Playback */}
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-amber-900 uppercase">Full Sentence:</div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        {curSent.fullDe}
                      </div>
                      <div className="text-xs text-slate-600 italic mt-0.5">{curSent.en}</div>
                    </div>
                    <button
                      onClick={() => handlePlaySound(curSent.fullDe)}
                      className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow transition flex-shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Contrast: deshalb vs denn */}
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      CRITICAL CONTRAST: "deshalb" (Pos 1) vs "denn" (Pos 0)
                    </div>
                    <div className="text-xs text-indigo-950 font-mono bg-white p-2.5 rounded border border-indigo-100 leading-relaxed">
                      {curSent.comparisonWithDenn}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            STATION 5: ORDINALZAHLEN, DENTIST CARTOON & REDEMITTEL (Pages 6, 7 & 8)
            ========================================================================= */}
        {activeStation === 'dates_redemittel' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  Pages 6, 7 & 8 • Ordinalzahlen, Comic & REDEMITTEL Toolkit
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
                  Calendar Dates, The Lazy Soccer Fan & Practical Redemittel
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Learn how to say ordinal numbers (1-19: <em>-te</em>, 20+: <em>-ste</em>), the dentist comic punchline, and essential phrases for clinic visits, appointments, and letters!
              </p>
            </div>

            {/* Page 6: Ordinal Numbers Interactive Grid */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 uppercase">
                    Page 6 • Ordinalzahlen (1st, 2nd, 3rd...)
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    Dates in Nominativ vs Preposition "am" (+ Dativ)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Rule: 1-19 take <em>-te</em> (e.g. <em>der vierte</em>); 20+ take <em>-ste</em> (e.g. <em>der zwanzigste</em>). When preceded by <strong>am</strong> (an + dem), add <strong>-en</strong>!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ordinalNumbersList.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlePlaySound(`${item.nom}. ${item.dativ}.`)}
                    className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 hover:border-purple-300 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                        {item.num}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.note}</span>
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 mt-2">
                      {item.nom}
                    </div>
                    <div className="text-xs font-bold text-purple-900 mt-0.5">
                      📅 {item.dativ}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Date Comparison */}
              <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-purple-900">
                    Nominativ vs Dativ Preposition:
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    "Heute ist <strong>der 21. 4.</strong> (der einundzwanzigste vierte)" ➔ "Ich komme <strong>am 21. 4.</strong> (am einundzwanzigsten vierten)."
                  </div>
                </div>
                <button
                  onClick={() =>
                    handlePlaySound(
                      'Heute ist der einundzwanzigste vierte. Ich komme am einundzwanzigsten vierten.'
                    )
                  }
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex-shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Page 7: Cartoon Comic Spotlight */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-2xl p-6 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-black/20 text-white text-xs font-black uppercase rounded-lg">
                  Page 7 Cartoon Comic • Dentist Appointment Procrastination
                </span>
                <span className="text-2xl">🦷⚽</span>
              </div>

              <div className="bg-white/95 rounded-xl p-4 space-y-2 text-slate-900 shadow">
                <div className="flex items-start gap-2">
                  <span className="font-black text-rose-700 text-xs uppercase bg-rose-100 px-2 py-0.5 rounded flex-shrink-0">
                    Wife (with calendar):
                  </span>
                  <span className="font-extrabold text-sm">
                    "Am 16. 12. hast du deinen Zahnarzttermin. Heute ist der 6."
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-black text-blue-700 text-xs uppercase bg-blue-100 px-2 py-0.5 rounded flex-shrink-0">
                    Husband (on sofa):
                  </span>
                  <span className="font-extrabold text-sm">
                    "Ich gehe aber erst im November!"
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic border-t pt-2 mt-2">
                  💡 <strong>The Joke:</strong> Today is Dec 6th, and his appointment is in 10 days on Dec 16th. But to postpone going to the scary dentist, he hilariously says he will only go next November (11 months later)!
                </p>
              </div>

              <button
                onClick={() =>
                  handlePlaySound(
                    'Am 16. 12. hast du deinen Zahnarzttermin. Heute ist der 6. - Ich gehe aber erst im November!'
                  )
                }
                className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition"
              >
                <Volume2 className="w-4 h-4 text-amber-400" /> Listen to the Comic Dialogue
              </button>
            </div>

            {/* Page 8: REDEMITTEL Toolkit */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 uppercase">
                    Page 8 • Complete REDEMITTEL Toolkit
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg mt-1">
                    Essential Communication Phrases
                  </h4>
                </div>
              </div>

              {/* Redemittel Category Switcher */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.keys(redemittelCategories).map((catKey) => {
                  const cat = redemittelCategories[catKey];
                  const isSelected = activeRedemittelTab === catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => {
                        setActiveRedemittelTab(catKey);
                        playChime();
                      }}
                      className={`p-3 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-700 font-bold shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono opacity-80">{cat.badge}</div>
                      <div className="text-xs font-extrabold mt-0.5 truncate">{cat.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Redemittel List */}
              {(() => {
                const curCat = redemittelCategories[activeRedemittelTab];
                return (
                  <div className="space-y-2.5 pt-2">
                    {curCat.phrases.map((phrase, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 bg-slate-50 hover:bg-teal-50/50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 transition"
                      >
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">{phrase.de}</div>
                          <div className="text-xs text-slate-500 italic mt-0.5">{phrase.en}</div>
                        </div>
                        <button
                          onClick={() => handlePlaySound(phrase.sound)}
                          className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition flex-shrink-0 shadow-sm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
