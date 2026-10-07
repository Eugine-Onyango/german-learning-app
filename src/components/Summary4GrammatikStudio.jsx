import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen, ShieldCheck, Heart, Coffee, Utensils, Clock, ShoppingCart, Award, AlertCircle, Layers } from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary4GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('verbs'); // 'verbs', 'akkusativ', 'pronouns', 'timefood', 'comic'

  // Station 1: Besondere Verben & Vokalwechsel
  const [selectedVerb, setSelectedVerb] = useState('moegen'); // 'moegen', 'moechten', 'lesen', 'essen', 'nehmen', 'treffen'
  const [selectedPronoun, setSelectedPronoun] = useState('du');

  // Station 2: Akkusativ & Plural Nullartikel
  const [selectedGender, setSelectedGender] = useState('masculine'); // 'masculine', 'neuter', 'feminine', 'plural'
  const [selectedArticleType, setSelectedArticleType] = useState('indefinite'); // 'definite', 'indefinite', 'negative', 'possessive'

  // Station 3: Pronoun Replacement & Akkusativ Verbs
  const [selectedNounObj, setSelectedNounObj] = useState('stuhl'); // 'stuhl', 'buch', 'gitarre', 'stuehle'
  const [selectedAkkVerb, setSelectedAkkVerb] = useState('brauchen'); // 'brauchen', 'haben', 'nehmen', 'kaufen', 'suchen', 'moechten'

  // Station 4: Food Nullartikel & Time Prepositions
  const [selectedFood, setSelectedFood] = useState('kuchen'); // 'kuchen', 'reis', 'tee', 'kaffee', 'milch', 'kaese'
  const [timeMode, setTimeMode] = useState('exact'); // 'exact' (um), 'span' (von...bis)
  const [exactTime, setExactTime] = useState('08:30'); // '07:30', '08:30', '14:40', '20:15'
  const [spanTime, setSpanTime] = useState('morning'); // 'morning', 'afternoon', 'day'

  // Station 1 Verbs Data (Pages 1 & 2)
  const verbsData = {
    moegen: {
      infinitive: 'mögen (to like / fancy)',
      type: 'Modal-style (No ending for ich/er & ö ➔ a)',
      rule: 'Vowel shifts ö ➔ a in singular! "ich" and "er/es/sie" have NO endings (mag)!',
      forms: {
        ich: { form: 'mag', note: 'Zero ending & ö ➔ a!', full: 'ich mag', highlight: true },
        du: { form: 'magst', note: 'ö ➔ a + -st', full: 'du magst', highlight: true },
        'er/es/sie': { form: 'mag', note: 'Zero ending & ö ➔ a!', full: 'er/es/sie mag', highlight: true },
        wir: { form: 'mögen', note: 'regular -en with ö', full: 'wir mögen' },
        ihr: { form: 'mögt', note: 'regular -t with ö', full: 'ihr mögt' },
        'sie/Sie': { form: 'mögen', note: 'regular -en with ö', full: 'sie/Sie mögen' }
      },
      example: 'Ich mag Schokoladenkuchen, aber mein Freund mag Tee.'
    },
    moechten: {
      infinitive: 'möchten (would like to)',
      type: 'Polite Wish / Order verb',
      rule: '"ich" & "er/es/sie" are identical (möchte). "du" adds extra -e- cushion (möchtest)!',
      forms: {
        ich: { form: 'möchte', note: 'Standard polite form', full: 'ich möchte' },
        du: { form: 'möchtest', note: 'extra -e- cushion before -st!', full: 'du möchtest', highlight: true },
        'er/es/sie': { form: 'möchte', note: 'Identical to ich!', full: 'er/es/sie möchte' },
        wir: { form: 'möchten', note: 'regular -en', full: 'wir möchten' },
        ihr: { form: 'möchtet', note: 'extra -e- cushion before -t!', full: 'ihr möchtet', highlight: true },
        'sie/Sie': { form: 'möchten', note: 'regular -en', full: 'sie/Sie möchten' }
      },
      example: 'Wir möchten bitte zwei Kaffee und bezahlen.'
    },
    lesen: {
      infinitive: 'lesen (to read)',
      type: 'Vowel shift: e ➔ ie',
      rule: 'Vowel shifts ONLY in du and er/es/sie (du liest, er liest)!',
      forms: {
        ich: { form: 'lese', note: 'regular e', full: 'ich lese' },
        du: { form: 'liest', note: 'e ➔ ie (adds -t because stem ends in s)', full: 'du liest', highlight: true },
        'er/es/sie': { form: 'liest', note: 'e ➔ ie + -t', full: 'er/es/sie liest', highlight: true },
        wir: { form: 'lesen', note: 'regular e + -en', full: 'wir lesen' },
        ihr: { form: 'lest', note: 'regular e + -t', full: 'ihr lest' },
        'sie/Sie': { form: 'lesen', note: 'regular e + -en', full: 'sie/Sie lesen' }
      },
      example: 'Liest du gern Bücher? - Ja, ich lese jeden Abend.'
    },
    essen: {
      infinitive: 'essen (to eat)',
      type: 'Vowel shift: e ➔ i',
      rule: 'Vowel shifts ONLY in du and er/es/sie (du isst, er isst)!',
      forms: {
        ich: { form: 'esse', note: 'regular e', full: 'ich esse' },
        du: { form: 'isst', note: 'e ➔ i (double s + t)', full: 'du isst', highlight: true },
        'er/es/sie': { form: 'isst', note: 'e ➔ i + -t', full: 'er/es/sie isst', highlight: true },
        wir: { form: 'essen', note: 'regular e + -en', full: 'wir essen' },
        ihr: { form: 'esst', note: 'regular e + -t', full: 'ihr esst' },
        'sie/Sie': { form: 'essen', note: 'regular e + -en', full: 'sie/Sie essen' }
      },
      example: 'Was isst du gern? - Ich esse gern Salat und Reis.'
    },
    nehmen: {
      infinitive: 'nehmen (to take / order)',
      type: 'Vowel shift: e ➔ imm',
      rule: 'e ➔ i AND h ➔ mm for du and er/es/sie (du nimmst, er nimmt)!',
      forms: {
        ich: { form: 'nehme', note: 'regular e + -e', full: 'ich nehme' },
        du: { form: 'nimmst', note: 'e ➔ imm + -st!', full: 'du nimmst', highlight: true },
        'er/es/sie': { form: 'nimmt', note: 'e ➔ imm + -t!', full: 'er/es/sie nimmt', highlight: true },
        wir: { form: 'nehmen', note: 'regular e + -en', full: 'wir nehmen' },
        ihr: { form: 'nehmt', note: 'regular e + -t', full: 'ihr nehmt' },
        'sie/Sie': { form: 'nehmen', note: 'regular e + -en', full: 'sie/Sie nehmen' }
      },
      example: 'Was nimmst du? - Ich nehme den Fisch mit Gemüse.'
    },
    treffen: {
      infinitive: 'treffen (to meet)',
      type: 'Vowel shift: e ➔ iff',
      rule: 'e ➔ i for du and er/es/sie (du triffst, er trifft)!',
      forms: {
        ich: { form: 'treffe', note: 'regular e + -e', full: 'ich treffe' },
        du: { form: 'triffst', note: 'e ➔ i + -st!', full: 'du triffst', highlight: true },
        'er/es/sie': { form: 'trifft', note: 'e ➔ i + -t!', full: 'er/es/sie trifft', highlight: true },
        wir: { form: 'treffen', note: 'regular e + -en', full: 'wir treffen' },
        ihr: { form: 'trefft', note: 'regular e + -t', full: 'ihr trefft' },
        'sie/Sie': { form: 'treffen', note: 'regular e + -en', full: 'sie/Sie treffen' }
      },
      example: 'Er trifft seine Freunde um 19 Uhr im Restaurant.'
    }
  };

  // Station 2 Akkusativ & Plural Matrix Data (Pages 3 & 4)
  const akkusativData = {
    masculine: {
      gender: 'Maskulin (der)',
      noun: 'Stuhl (chair)',
      changed: true,
      definite: { nom: 'der Stuhl', akk: 'den Stuhl', change: 'der ➔ den' },
      indefinite: { nom: 'ein Stuhl', akk: 'einen Stuhl', change: 'ein ➔ einen' },
      negative: { nom: 'kein Stuhl', akk: 'keinen Stuhl', change: 'kein ➔ keinen' },
      possessive: { nom: 'mein Stuhl', akk: 'meinen Stuhl', change: 'mein ➔ meinen' },
      note: '🚨 THE ONLY GENDER THAT CHANGES! Everything gets the "-en" ending!'
    },
    neuter: {
      gender: 'Neutrum (das)',
      noun: 'Buch (book)',
      changed: false,
      definite: { nom: 'das Buch', akk: 'das Buch', change: 'das = das (NO CHANGE)' },
      indefinite: { nom: 'ein Buch', akk: 'ein Buch', change: 'ein = ein (NO CHANGE)' },
      negative: { nom: 'kein Buch', akk: 'kein Buch', change: 'kein = kein (NO CHANGE)' },
      possessive: { nom: 'mein Buch', akk: 'mein Buch', change: 'mein = mein (NO CHANGE)' },
      note: '✅ 100% Identical! Neuter never changes in Akkusativ.'
    },
    feminine: {
      gender: 'Feminin (die)',
      noun: 'Gitarre (guitar)',
      changed: false,
      definite: { nom: 'die Gitarre', akk: 'die Gitarre', change: 'die = die (NO CHANGE)' },
      indefinite: { nom: 'eine Gitarre', akk: 'eine Gitarre', change: 'eine = eine (NO CHANGE)' },
      negative: { nom: 'keine Gitarre', akk: 'keine Gitarre', change: 'keine = keine (NO CHANGE)' },
      possessive: { nom: 'meine Gitarre', akk: 'meine Gitarre', change: 'meine = meine (NO CHANGE)' },
      note: '✅ 100% Identical! Feminine keeps its "-e" shape in Akkusativ.'
    },
    plural: {
      gender: 'Plural (die)',
      noun: 'Stühle / Bücher / Gitarren',
      changed: false,
      definite: { nom: 'die Stühle', akk: 'die Stühle', change: 'die = die (NO CHANGE)' },
      indefinite: { nom: '- Stühle (Nullartikel)', akk: '- Stühle (Nullartikel)', change: 'No "ein" in plural!' },
      negative: { nom: 'keine Stühle', akk: 'keine Stühle', change: 'keine = keine (NO CHANGE)' },
      possessive: { nom: 'meine Stühle', akk: 'meine Stühle', change: 'meine = meine (NO CHANGE)' },
      note: '⚡ Plural Golden Rule: Indefinite plural has NO article (Nullartikel: "Stühle"), negative uses "keine"!'
    }
  };

  // Station 3 Nouns & Pronouns Data (Pages 5 & 6)
  const nounPronounData = {
    stuhl: {
      noun: 'der Stuhl',
      gender: 'Maskulin (der)',
      pronoun: 'er',
      price: '50 Euro',
      question: 'Wie viel kostet der Stuhl?',
      answer: 'Er kostet 50 Euro.',
      audioText: 'Wie viel kostet der Stuhl? Er kostet fünfzig Euro.'
    },
    buch: {
      noun: 'das Buch',
      gender: 'Neutrum (das)',
      pronoun: 'es',
      price: '15 Euro',
      question: 'Wie viel kostet das Buch?',
      answer: 'Es kostet 15 Euro.',
      audioText: 'Wie viel kostet das Buch? Es kostet fünfzehn Euro.'
    },
    gitarre: {
      noun: 'die Gitarre',
      gender: 'Feminin (die)',
      pronoun: 'sie',
      price: '120 Euro',
      question: 'Wie viel kostet die Gitarre?',
      answer: 'Sie kostet 120 Euro.',
      audioText: 'Wie viel kostet die Gitarre? Sie kostet einhundertzwanzig Euro.'
    },
    stuehle: {
      noun: 'die Stühle (Plural)',
      gender: 'Plural (die)',
      pronoun: 'sie (they)',
      price: '100 Euro',
      question: 'Was kosten die Stühle?',
      answer: 'Sie kosten 100 Euro.',
      audioText: 'Was kosten die Stühle? Sie kosten einhundert Euro.'
    }
  };

  // Station 4 Food Items & Time Data (Pages 7 & 8)
  const foodData = {
    kuchen: { name: 'Schokoladenkuchen', translation: 'Chocolate cake', icon: '🍰', sound: 'Es gibt Schokoladenkuchen. Ich mag Schokoladenkuchen.' },
    reis: { name: 'Reis', translation: 'Rice', icon: '🍚', sound: 'Es gibt Reis. Ich esse gern Reis.' },
    tee: { name: 'Tee', translation: 'Tea', icon: '🍵', sound: 'Es gibt Tee. Ich trinke gern Tee.' },
    kaffee: { name: 'Kaffee', translation: 'Coffee', icon: '☕', sound: 'Es gibt Kaffee. Ich mag Kaffee.' },
    milch: { name: 'Milch', translation: 'Milk', icon: '🥛', sound: 'Es gibt Milch. Ich trinke gern Milch.' },
    kaese: { name: 'Käse', translation: 'Cheese', icon: '🧀', sound: 'Es gibt Käse. Ich esse gern Käse.' }
  };

  const exactTimes = [
    { label: '07:30 (halb acht)', german: 'um halb acht', english: 'at 7:30', sound: 'Der Kurs beginnt um halb acht.' },
    { label: '08:45 (Viertel vor neun)', german: 'um Viertel vor neun', english: 'at quarter to nine', sound: 'Wir treffen uns um Viertel vor neun.' },
    { label: '14:40 (14 Uhr 40)', german: 'um 14:40 Uhr', english: 'at 14:40', sound: 'Der Zug fährt um 14 Uhr 40 ab.' },
    { label: '20:15 (Viertel nach acht)', german: 'um Viertel nach acht', english: 'at quarter past eight', sound: 'Der Film beginnt um Viertel nach acht.' }
  ];

  const spanTimes = [
    { label: 'Morning Period', german: 'von zwei Uhr bis drei Uhr', english: 'from 2:00 to 3:00', sound: 'Die Besprechung dauert von zwei Uhr bis drei Uhr.' },
    { label: 'Afternoon Period', german: 'von halb drei bis Viertel vor vier', english: 'from 2:30 to 3:45', sound: 'Der Workshop ist von halb drei bis Viertel vor vier.' },
    { label: 'Business Hours', german: 'von 8 Uhr bis 18 Uhr', english: 'from 8:00 AM to 6:00 PM', sound: 'Das Büro ist von 8 Uhr bis 18 Uhr geöffnet.' }
  ];

  // Station 5 Redemittel Soundboard Data (Page 10)
  const redemittelCategories = [
    {
      title: '🏷️ Nach Preisen fragen & bewerten',
      phrases: [
        { de: 'Wie viel kostet der Stuhl?', en: 'How much does the chair cost?', audio: 'Wie viel kostet der Stuhl?' },
        { de: 'Er kostet nur 10 Cent!', en: 'It costs only 10 cents!', audio: 'Er kostet nur zehn Cent!' },
        { de: 'Das ist wirklich sehr billig.', en: 'That is really very cheap.', audio: 'Das ist wirklich sehr billig.' },
        { de: 'Das ist aber ziemlich teuer!', en: 'That is quite expensive!', audio: 'Das ist aber ziemlich teuer!' }
      ]
    },
    {
      title: '🍽️ Vorlieben & Essgewohnheiten',
      phrases: [
        { de: 'Isst du gern Salat?', en: 'Do you like eating salad?', audio: 'Isst du gern Salat?' },
        { de: 'Ich esse oft Fisch und Reis.', en: 'I often eat fish and rice.', audio: 'Ich esse oft Fisch und Reis.' },
        { de: 'Ich habe keinen Hunger.', en: 'I am not hungry.', audio: 'Ich habe keinen Hunger.' },
        { de: 'Ich habe keinen Durst.', en: 'I am not thirsty.', audio: 'Ich habe keinen Durst.' }
      ]
    },
    {
      title: '💳 Bestellen, Zahlen & Trinkgeld',
      phrases: [
        { de: 'Ich möchte bitte einen Kaffee.', en: 'I would like a coffee, please.', audio: 'Ich möchte bitte einen Kaffee.' },
        { de: 'Wir möchten bitte bezahlen.', en: 'We would like to pay, please.', audio: 'Wir möchten bitte bezahlen.' },
        { de: 'Zusammen oder getrennt?', en: 'Together or separate bills?', audio: 'Zusammen oder getrennt?' },
        { de: 'Das macht 18 Euro. - Stimmt so!', en: 'That comes to 18 Euro. - Keep the change!', audio: 'Das macht 18 Euro. Stimmt so!' }
      ]
    },
    {
      title: '✨ Höflichkeit & Wohlbefinden',
      phrases: [
        { de: 'Ja, sehr gern! Vielen Dank.', en: 'Yes, with pleasure! Many thanks.', audio: 'Ja, sehr gern! Vielen Dank.' },
        { de: 'Guten Appetit! - Danke gleichfalls!', en: 'Enjoy your meal! - Thanks, you too!', audio: 'Guten Appetit! Danke gleichfalls!' },
        { de: 'Bitte schön! Gern geschehen.', en: 'Here you go! You are very welcome.', audio: 'Bitte schön! Gern geschehen.' }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-6">
          <Layers className="w-80 h-80" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur-md px-3 py-1.5 rounded-full text-emerald-100 text-xs font-semibold tracking-wide border border-emerald-300/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Summary 4 • Complete 10-Page Visual Guide</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Visual Grammatik & Redemittel Studio IV 🎨
          </h1>
          <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Master <span className="text-amber-300 font-bold">mögen & möchten</span>, stem-changing verbs (<span className="text-amber-300 font-bold">lesen, essen, nehmen, treffen</span>), the single Akkusativ changer (<span className="text-amber-300 font-bold">den/einen Stuhl</span>), food Nullartikel, time prepositions (<span className="text-amber-300 font-bold">um vs. von...bis</span>), and the famous supermarket salad bargain comic!
          </p>
        </div>
      </div>

      {/* Station Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100/80 backdrop-blur-sm rounded-2xl border border-stone-200 shadow-inner">
        {[
          { id: 'verbs', label: '1. Besondere Verben & Vokalwechsel', icon: '⚡', color: 'emerald' },
          { id: 'akkusativ', label: '2. Akkusativ & Plural-Nullartikel', icon: '🎯', color: 'teal' },
          { id: 'pronouns', label: '3. Pronomen & Akkusativ-Verben', icon: '🔄', color: 'cyan' },
          { id: 'timefood', label: '4. Nullartikel & Zeit (um / von...bis)', icon: '⏰', color: 'amber' },
          { id: 'comic', label: '5. Salat-Comic & Restaurant Redemittel', icon: '🥗', color: 'rose' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playChime();
              setActiveStation(tab.id);
            }}
            className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              activeStation === tab.id
                ? 'bg-white text-stone-900 shadow-md border border-stone-200 ring-2 ring-emerald-500/20 scale-[1.01]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* STATION 1: Besondere Verben & Vokalwechsel */}
      {activeStation === 'verbs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Pages 1 & 2 Blueprint
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                  Besondere Verben & Der Vokalwechsel (e ➔ ie / i)
                </h2>
                <p className="text-stone-600 text-sm mt-1">
                  Rule: Modal-style <strong className="text-emerald-800">mögen</strong> has zero ending for <em>ich</em> & <em>er</em>. For stem-changing verbs, the vowel shifts <strong className="text-rose-700 underline">ONLY in du and er/es/sie</strong>!
                </p>
              </div>
            </div>

            {/* Verb Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {Object.keys(verbsData).map((vKey) => {
                const verb = verbsData[vKey];
                const isSelected = selectedVerb === vKey;
                return (
                  <button
                    key={vKey}
                    onClick={() => {
                      playChime();
                      setSelectedVerb(vKey);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-md scale-[1.02]'
                        : 'bg-stone-50 hover:bg-emerald-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="text-xs opacity-75 font-mono">{vKey.toUpperCase()}</div>
                    <div className="font-bold text-sm truncate">{verb.infinitive.split(' ')[0]}</div>
                    <div className={`text-[10px] mt-1 truncate ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>
                      {verb.type.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Verb Overview Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl p-5 border border-emerald-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                    <span>{verbsData[selectedVerb].infinitive}</span>
                    <button
                      onClick={() => speakGerman(verbsData[selectedVerb].infinitive, isSlowMode)}
                      className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-emerald-700 shadow-sm border border-emerald-200"
                      title="Listen to infinitive"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">{verbsData[selectedVerb].rule}</p>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 shadow-sm self-start">
                  {verbsData[selectedVerb].type}
                </div>
              </div>

              {/* Conjugation Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {Object.entries(verbsData[selectedVerb].forms).map(([pronoun, data]) => {
                  const isHighlighted = data.highlight;
                  return (
                    <div
                      key={pronoun}
                      onClick={() => {
                        setSelectedPronoun(pronoun);
                        speakGerman(data.full, isSlowMode);
                      }}
                      className={`p-3.5 rounded-xl cursor-pointer border transition-all flex flex-col justify-between ${
                        isHighlighted
                          ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/30 hover:bg-amber-100/80 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-stone-500 uppercase">{pronoun}</span>
                        {isHighlighted && (
                          <span className="text-[10px] font-extrabold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                            VOKALWECHSEL!
                          </span>
                        )}
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span className="text-base font-extrabold text-stone-900">
                          {pronoun} <span className={isHighlighted ? 'text-rose-700 underline' : 'text-emerald-700'}>{data.form}</span>
                        </span>
                        <Volume2 className="w-4 h-4 text-stone-400 hover:text-emerald-700" />
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium">{data.note}</div>
                    </div>
                  );
                })}
              </div>

              {/* Example sentence */}
              <div className="bg-white rounded-xl p-4 border border-emerald-200/80 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Real-life sentence</span>
                  <span className="text-sm md:text-base font-bold text-emerald-950">{verbsData[selectedVerb].example}</span>
                </div>
                <button
                  onClick={() => speakGerman(verbsData[selectedVerb].example, isSlowMode)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex-shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Golden Rule Callout */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>The Golden Anchor Rule: Vokalwechsel happens ONLY in du & er/es/sie!</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs text-stone-300">
                <div className="bg-stone-800 p-2.5 rounded-xl">
                  <div className="font-bold text-white">lesen (e ➔ ie)</div>
                  <div className="text-emerald-400">du liest • er liest</div>
                  <div className="text-stone-400 text-[10px]">wir lesen • ihr lest</div>
                </div>
                <div className="bg-stone-800 p-2.5 rounded-xl">
                  <div className="font-bold text-white">essen (e ➔ i)</div>
                  <div className="text-emerald-400">du isst • er isst</div>
                  <div className="text-stone-400 text-[10px]">wir essen • ihr esst</div>
                </div>
                <div className="bg-stone-800 p-2.5 rounded-xl">
                  <div className="font-bold text-white">nehmen (e ➔ imm)</div>
                  <div className="text-emerald-400">du nimmst • er nimmt</div>
                  <div className="text-stone-400 text-[10px]">wir nehmen • ihr nehmt</div>
                </div>
                <div className="bg-stone-800 p-2.5 rounded-xl">
                  <div className="font-bold text-white">treffen (e ➔ iff)</div>
                  <div className="text-emerald-400">du triffst • er trifft</div>
                  <div className="text-stone-400 text-[10px]">wir treffen • ihr trefft</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 2: Akkusativ & Plural Nullartikel */}
      {activeStation === 'akkusativ' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Pages 3 & 4 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Nomen: Akkusativ Transformation & Plural-Nullartikel
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Discover the fundamental law of German cases: <strong className="text-rose-700">Masculine is the ONLY gender that changes in Akkusativ</strong>!
              </p>
            </div>

            {/* Gender Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'masculine', label: 'Maskulin (der Stuhl)', icon: '🪑', badge: 'CHANGES! (der ➔ den)' },
                { key: 'neuter', label: 'Neutrum (das Buch)', icon: '📖', badge: 'STAYS SAME (das = das)' },
                { key: 'feminine', label: 'Feminin (die Gitarre)', icon: '🎸', badge: 'STAYS SAME (die = die)' },
                { key: 'plural', label: 'Plural (die Stühle)', icon: '👥', badge: 'NULLARTIKEL / keine' }
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => {
                    playChime();
                    setSelectedGender(g.key);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    selectedGender === g.key
                      ? 'bg-teal-700 text-white border-teal-800 shadow-lg scale-[1.02]'
                      : 'bg-stone-50 hover:bg-teal-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="text-2xl mb-1">{g.icon}</div>
                  <div className="font-bold text-sm">{g.label}</div>
                  <div className={`text-[10px] mt-1 font-semibold ${selectedGender === g.key ? 'text-teal-200' : 'text-teal-700'}`}>
                    {g.badge}
                  </div>
                </button>
              ))}
            </div>

            {/* Case Transformation Matrix */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">
                    {akkusativData[selectedGender].gender}: <span className="text-teal-700">{akkusativData[selectedGender].noun}</span>
                  </h3>
                  <p className="text-xs text-stone-500">{akkusativData[selectedGender].note}</p>
                </div>
                <button
                  onClick={() => speakGerman(`Nominativ: ${akkusativData[selectedGender].definite.nom}. Akkusativ: ${akkusativData[selectedGender].definite.akk}.`, isSlowMode)}
                  className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                  title="Listen to comparison"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Article Types Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Definite Article */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="text-xs font-bold text-stone-500 uppercase">Bestimmter Artikel (The)</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Nominativ:</span>
                    <span className="font-mono font-bold text-stone-800">{akkusativData[selectedGender].definite.nom}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1 border-t border-stone-100">
                    <span className="text-teal-700 font-bold">Akkusativ:</span>
                    <span className={`font-mono font-extrabold ${selectedGender === 'masculine' ? 'text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200' : 'text-teal-900'}`}>
                      {akkusativData[selectedGender].definite.akk}
                    </span>
                  </div>
                </div>

                {/* Indefinite Article */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="text-xs font-bold text-stone-500 uppercase">Unbestimmter Artikel (A / An)</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Nominativ:</span>
                    <span className="font-mono font-bold text-stone-800">{akkusativData[selectedGender].indefinite.nom}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1 border-t border-stone-100">
                    <span className="text-teal-700 font-bold">Akkusativ:</span>
                    <span className={`font-mono font-extrabold ${selectedGender === 'masculine' ? 'text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200' : 'text-teal-900'}`}>
                      {akkusativData[selectedGender].indefinite.akk}
                    </span>
                  </div>
                </div>

                {/* Negative Article */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="text-xs font-bold text-stone-500 uppercase">Negativartikel (No / Not a)</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Nominativ:</span>
                    <span className="font-mono font-bold text-stone-800">{akkusativData[selectedGender].negative.nom}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1 border-t border-stone-100">
                    <span className="text-teal-700 font-bold">Akkusativ:</span>
                    <span className={`font-mono font-extrabold ${selectedGender === 'masculine' ? 'text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200' : 'text-teal-900'}`}>
                      {akkusativData[selectedGender].negative.akk}
                    </span>
                  </div>
                </div>

                {/* Possessive Article */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="text-xs font-bold text-stone-500 uppercase">Possessivartikel (My)</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Nominativ:</span>
                    <span className="font-mono font-bold text-stone-800">{akkusativData[selectedGender].possessive.nom}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1 border-t border-stone-100">
                    <span className="text-teal-700 font-bold">Akkusativ:</span>
                    <span className={`font-mono font-extrabold ${selectedGender === 'masculine' ? 'text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200' : 'text-teal-900'}`}>
                      {akkusativData[selectedGender].possessive.akk}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Sentence Builder Demo */}
              <div className="bg-teal-900 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                <div className="text-sm">
                  <span className="text-teal-300 font-bold block text-xs uppercase">Action Sentence (Ich brauche...)</span>
                  <span className="font-mono font-bold text-base md:text-lg">
                    Ich brauche <span className="text-amber-300 underline">{akkusativData[selectedGender].definite.akk}</span>.
                  </span>
                </div>
                <button
                  onClick={() => speakGerman(`Ich brauche ${akkusativData[selectedGender].definite.akk}`, isSlowMode)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md flex-shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen Sentence</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 3: Pronomen & Akkusativ-Verben */}
      {activeStation === 'pronouns' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                Pages 5 & 6 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Personalpronomen für Nomen (er/es/sie) & Akkusativ-Verben
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                German pronouns replace nouns based on their <strong className="text-cyan-800">Grammatical Gender</strong>: <span className="font-mono text-cyan-900">der ➔ er</span>, <span className="font-mono text-cyan-900">das ➔ es</span>, <span className="font-mono text-cyan-900">die ➔ sie</span>, <span className="font-mono text-cyan-900">Plural ➔ sie</span>!
              </p>
            </div>

            {/* Interactive Pronoun Replacer */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {Object.entries(nounPronounData).map(([key, data]) => {
                const isSelected = selectedNounObj === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      playChime();
                      setSelectedNounObj(key);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-cyan-700 text-white border-cyan-800 shadow-md scale-[1.02]'
                        : 'bg-stone-50 hover:bg-cyan-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="font-bold text-base">{data.noun}</div>
                    <div className={`text-xs mt-1 ${isSelected ? 'text-cyan-200' : 'text-stone-500'}`}>{data.gender}</div>
                    <div className="mt-3 flex items-center justify-between border-t border-cyan-600/30 pt-2">
                      <span className="text-xs font-mono font-bold">Pronoun:</span>
                      <span className={`text-sm font-extrabold px-2 py-0.5 rounded ${isSelected ? 'bg-amber-400 text-cyan-950' : 'bg-cyan-100 text-cyan-900'}`}>
                        {data.pronoun}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pronoun Dialogue Preview Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-6 border border-cyan-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Price Inquiry Dialogue</span>
                <button
                  onClick={() => speakGerman(nounPronounData[selectedNounObj].audioText, isSlowMode)}
                  className="p-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white shadow-sm flex items-center gap-1.5 text-xs font-bold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Play Dialogue</span>
                </button>
              </div>

              <div className="space-y-3 font-sans">
                <div className="bg-white p-3.5 rounded-xl border border-cyan-100 flex items-start gap-3 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    Q
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Customer asks:</div>
                    <div className="font-bold text-stone-900 text-base">{nounPronounData[selectedNounObj].question}</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-cyan-100 flex items-start gap-3 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    A
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Seller replies (Notice the pronoun!):</div>
                    <div className="font-bold text-cyan-950 text-base">
                      <span className="text-rose-700 underline font-extrabold">{nounPronounData[selectedNounObj].pronoun}</span>{' '}
                      {nounPronounData[selectedNounObj].answer.slice(nounPronounData[selectedNounObj].pronoun.length)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Akkusativ Verbs Lab */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
                <span>🧲 Direct Object Verbs (brauchen, haben, nehmen, kaufen, suchen, möchten)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {[
                  { verb: 'brauchen', de: 'brauche', label: 'to need' },
                  { verb: 'haben', de: 'habe', label: 'to have' },
                  { verb: 'nehmen', de: 'nehme', label: 'to take' },
                  { verb: 'kaufen', de: 'kaufe', label: 'to buy' },
                  { verb: 'suchen', de: 'suche', label: 'to look for' },
                  { verb: 'möchten', de: 'möchte', label: 'would like' }
                ].map((v) => (
                  <button
                    key={v.verb}
                    onClick={() => {
                      playChime();
                      setSelectedAkkVerb(v.verb);
                      speakGerman(`Ich ${v.de} den Stuhl und das Buch.`, isSlowMode);
                    }}
                    className={`p-3 rounded-xl text-center border transition-all ${
                      selectedAkkVerb === v.verb
                        ? 'bg-cyan-800 text-white border-cyan-900 shadow-md font-bold'
                        : 'bg-stone-50 hover:bg-cyan-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="text-xs font-mono">{v.verb}</div>
                    <div className="text-[10px] opacity-75">{v.label}</div>
                  </button>
                ))}
              </div>
              <div className="bg-stone-900 text-white p-3.5 rounded-xl text-xs flex items-center justify-between font-mono">
                <span>Sentence: Ich {selectedAkkVerb === 'möchten' ? 'möchte' : selectedAkkVerb === 'haben' ? 'habe' : selectedAkkVerb === 'nehmen' ? 'nehme' : selectedAkkVerb + 'e'} <strong className="text-amber-400">den</strong> Stuhl (m), <strong className="text-cyan-300">das</strong> Buch (n), <strong className="text-rose-300">die</strong> Gitarre (f).</span>
                <Volume2
                  onClick={() => speakGerman(`Ich ${selectedAkkVerb === 'möchten' ? 'möchte' : selectedAkkVerb === 'haben' ? 'habe' : selectedAkkVerb === 'nehmen' ? 'nehme' : selectedAkkVerb + 'e'} den Stuhl, das Buch und die Gitarre.`, isSlowMode)}
                  className="w-4 h-4 text-amber-400 cursor-pointer flex-shrink-0 ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 4: Nullartikel & Zeit-Präpositionen */}
      {activeStation === 'timefood' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Pages 7 & 8 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Nullartikel bei Lebensmitteln & Präpositionen der Zeit (um vs. von...bis)
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Uncountable food substances take <strong className="text-amber-900">Zero Article (Nullartikel)</strong>. For clock times: <strong className="text-amber-900">um</strong> = exact point, <strong className="text-amber-900">von ... bis</strong> = duration span!
              </p>
            </div>

            {/* Food Nullartikel Showcase */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-sm md:text-base flex items-center gap-2">
                  <span>🍰 Food & Drink Nullartikel Pantry</span>
                  <span className="text-xs font-normal text-stone-500">(After 'es gibt' & 'mögen')</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Object.entries(foodData).map(([fKey, data]) => {
                  const isSelected = selectedFood === fKey;
                  return (
                    <div
                      key={fKey}
                      onClick={() => {
                        setSelectedFood(fKey);
                        speakGerman(data.sound, isSlowMode);
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer text-center transition-all ${
                        isSelected
                          ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-400/40 shadow-md scale-[1.03]'
                          : 'bg-stone-50 hover:bg-amber-50/60 border-stone-200'
                      }`}
                    >
                      <div className="text-3xl mb-1">{data.icon}</div>
                      <div className="font-bold text-sm text-stone-900">{data.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{data.translation}</div>
                      <div className="mt-2 text-[10px] font-mono font-bold text-amber-800 bg-amber-200/60 py-0.5 rounded">
                        Nullartikel (-)
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-center justify-between">
                <div className="text-xs md:text-sm text-amber-950 font-medium">
                  <strong>Example:</strong> "Es gibt <span className="underline font-bold text-amber-900">{foodData[selectedFood].name}</span>" • "Ich mag <span className="underline font-bold text-amber-900">{foodData[selectedFood].name}</span>"
                </div>
                <button
                  onClick={() => speakGerman(`Es gibt ${foodData[selectedFood].name}. Ich mag ${foodData[selectedFood].name}.`, isSlowMode)}
                  className="p-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex-shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Time Prepositions Simulator (um vs von...bis) */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-sm md:text-base flex items-center gap-2">
                  <span>⏰ Temporal Prepositions: Wann? (When?)</span>
                </h3>
                <div className="flex gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <button
                    onClick={() => {
                      playChime();
                      setTimeMode('exact');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      timeMode === 'exact' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    um (Exact Time)
                  </button>
                  <button
                    onClick={() => {
                      playChime();
                      setTimeMode('span');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      timeMode === 'span' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    von ... bis (Span)
                  </button>
                </div>
              </div>

              {timeMode === 'exact' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exactTimes.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => speakGerman(item.sound, isSlowMode)}
                      className="bg-white p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition-all shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-amber-800 uppercase">{item.label}</div>
                        <div className="text-base font-extrabold text-stone-900 mt-1">{item.german}</div>
                        <div className="text-xs text-stone-500">{item.english}</div>
                      </div>
                      <Volume2 className="w-5 h-5 text-stone-400 hover:text-amber-700" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {spanTimes.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => speakGerman(item.sound, isSlowMode)}
                      className="bg-white p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition-all shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-amber-800 uppercase">{item.label}</div>
                        <div className="text-sm font-extrabold text-stone-900 mt-1">{item.german}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{item.english}</div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-amber-900 font-bold">
                        <span>Tap to listen</span>
                        <Volume2 className="w-4 h-4 text-amber-700" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STATION 5: Salat-Comic & Restaurant Soundboard */}
      {activeStation === 'comic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Pages 9 & 10 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Supermarkt Salat Comic & Restaurant Redemittel Toolkit
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Explore the humorous 10-Cent Salad cartoon and practice all key phrases for ordering, rating, asking prices, and tipping in Germany!
              </p>
            </div>

            {/* Page 9 Comic Strip */}
            <div className="bg-gradient-to-br from-amber-50 via-rose-50/40 to-stone-50 rounded-2xl p-6 border-2 border-rose-200 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🥗</span>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Der 0,10 € Salat Comic (Page 9)</h3>
                    <p className="text-xs text-stone-500">Supermarket bargain hunter at the cash register</p>
                  </div>
                </div>
                <button
                  onClick={() => speakGerman("Sie mögen doch keinen Salat. Aber er ist heute so billig! Nur zehn Cent!", isSlowMode)}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Play Comic Audio</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Speech Bubble 1 */}
                <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-md relative">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                    <span>👩 Skeptical Friend:</span>
                    <Volume2
                      onClick={() => speakGerman("Sie mögen doch keinen Salat!", isSlowMode)}
                      className="w-4 h-4 cursor-pointer text-amber-700"
                    />
                  </div>
                  <div className="text-base font-extrabold text-stone-900">
                    "Sie mögen doch <span className="text-rose-700 underline">keinen Salat</span>!"
                  </div>
                  <div className="text-xs text-stone-500 mt-1">"You don't even like salad!"</div>
                  <div className="text-[11px] text-amber-900 mt-2 bg-amber-50 p-2 rounded-lg font-medium border border-amber-200">
                    💡 <strong>Grammar:</strong> 'der Salat' becomes 'keinen Salat' (Masculine Akkusativ)!
                  </div>
                </div>

                {/* Speech Bubble 2 */}
                <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-md relative">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                    <span>🛒 Bargain Hunter:</span>
                    <Volume2
                      onClick={() => speakGerman("Aber er ist heute so billig! Nur 10 Cent!", isSlowMode)}
                      className="w-4 h-4 cursor-pointer text-emerald-700"
                    />
                  </div>
                  <div className="text-base font-extrabold text-stone-900">
                    "Aber <span className="text-emerald-700 underline">er</span> ist heute so billig (0,10 €)!"
                  </div>
                  <div className="text-xs text-stone-500 mt-1">"But it is so cheap today (only 10 cents)!"</div>
                  <div className="text-[11px] text-emerald-900 mt-2 bg-emerald-50 p-2 rounded-lg font-medium border border-emerald-200">
                    💡 <strong>Grammar:</strong> 'der Salat' is replaced by masculine pronoun 'er'!
                  </div>
                </div>
              </div>
            </div>

            {/* Page 10 Redemittel Categories */}
            <div className="space-y-6 pt-2">
              <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                <span>📋 Essential Speaking Toolkit (Page 10 Redemittel)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {redemittelCategories.map((cat, cIdx) => (
                  <div key={cIdx} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                    <h4 className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">{cat.title}</h4>
                    <div className="space-y-2.5">
                      {cat.phrases.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => speakGerman(p.audio, isSlowMode)}
                          className="bg-white p-3 rounded-xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50/40 cursor-pointer transition-all shadow-sm flex items-center justify-between group"
                        >
                          <div>
                            <div className="text-sm font-bold text-stone-900 group-hover:text-rose-900">{p.de}</div>
                            <div className="text-xs text-stone-500">{p.en}</div>
                          </div>
                          <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-rose-700 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
