import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen, ShieldCheck, Heart, Coffee, Utensils, Clock, Rocket, AlertCircle, Layers, Smile, ShieldAlert, Award, Compass } from 'lucide-react';
import { playChime, speakGerman } from '../utils/sound';

export default function Summary5GrammatikStudio({ isSlowMode }) {
  const [activeStation, setActiveStation] = useState('modals'); // 'modals', 'trennbar', 'satzklammer', 'pronouns', 'redemittel'

  // Station 1: The 4 Modals
  const [selectedModal, setSelectedModal] = useState('muessen'); // 'muessen', 'koennen', 'wollen', 'duerfen'
  const [selectedPronoun, setSelectedPronoun] = useState('du');

  // Station 2: Trennbare Verben
  const [selectedTrennbar, setSelectedTrennbar] = useState('anziehen'); // 'anziehen', 'aufstehen', 'aussehen', 'mitspielen', 'zusehen'

  // Station 3: Satzklammer
  const [satzklammerMode, setSatzklammerMode] = useState('combo'); // 'modal', 'trennbar', 'combo'
  const [sentenceType, setSentenceType] = useState('aussage'); // 'aussage', 'janean', 'wfrage'

  // Station 4: man vs niemand
  const [selectedIndefinit, setSelectedIndefinit] = useState('man'); // 'man', 'niemand'

  // Modals Data (Page 1 & 4)
  const modalsData = {
    muessen: {
      infinitive: 'müssen (must / to have to)',
      concept: 'Obligation / Duty / Necessity (Lazima)',
      vowelShift: 'ü ➔ u in singular',
      rule: 'ich & er/es/sie are identical with NO ending (muss)! Plural keeps ü (müssen).',
      forms: {
        ich: { form: 'muss', note: 'Zero ending + ü ➔ u', full: 'ich muss', highlight: true },
        du: { form: 'musst', note: 'ü ➔ u + -st', full: 'du musst', highlight: true },
        'er/es/sie': { form: 'muss', note: 'Zero ending + ü ➔ u (Twin of ich!)', full: 'er/es/sie muss', highlight: true },
        wir: { form: 'müssen', note: 'regular -en with ü', full: 'wir müssen' },
        ihr: { form: 'müsst', note: 'regular -t with ü', full: 'ihr müsst' },
        'sie/Sie': { form: 'müssen', note: 'regular -en with ü', full: 'sie/Sie müssen' }
      },
      example: 'Karin muss jeden Tag acht Stunden arbeiten.',
      exampleEn: 'Karin has to work eight hours every day.'
    },
    koennen: {
      infinitive: 'können (can / to be able to)',
      concept: 'Ability / Skill / Possibility (Uwezo)',
      vowelShift: 'ö ➔ a in singular',
      rule: 'ich & er/es/sie are identical with NO ending (kann)! Plural keeps ö (können).',
      forms: {
        ich: { form: 'kann', note: 'Zero ending + ö ➔ a', full: 'ich kann', highlight: true },
        du: { form: 'kannst', note: 'ö ➔ a + -st', full: 'du kannst', highlight: true },
        'er/es/sie': { form: 'kann', note: 'Zero ending + ö ➔ a (Twin of ich!)', full: 'er/es/sie kann', highlight: true },
        wir: { form: 'können', note: 'regular -en with ö', full: 'wir können' },
        ihr: { form: 'könnt', note: 'regular -t with ö', full: 'ihr könnt' },
        'sie/Sie': { form: 'können', note: 'regular -en with ö', full: 'sie/Sie können' }
      },
      example: 'Karins Avatar kann Klavier spielen.',
      exampleEn: "Karin's avatar can play the piano."
    },
    wollen: {
      infinitive: 'wollen (to want / intend)',
      concept: 'Desire / Strong Will / Intention (Kutaka)',
      vowelShift: 'o ➔ i in singular',
      rule: 'ich & er/es/sie are identical with NO ending (will)! Plural keeps o (wollen).',
      forms: {
        ich: { form: 'will', note: 'Zero ending + o ➔ i', full: 'ich will', highlight: true },
        du: { form: 'willst', note: 'o ➔ i + -st', full: 'du willst', highlight: true },
        'er/es/sie': { form: 'will', note: 'Zero ending + o ➔ i (Twin of ich!)', full: 'er/es/sie will', highlight: true },
        wir: { form: 'wollen', note: 'regular -en with o', full: 'wir wollen' },
        ihr: { form: 'wollt', note: 'regular -t with o', full: 'ihr wollt' },
        'sie/Sie': { form: 'wollen', note: 'regular -en with o', full: 'sie/Sie wollen' }
      },
      example: 'Jan Schmidt will nicht mehr so viel arbeiten.',
      exampleEn: "Jan Schmidt doesn't want to work so much anymore."
    },
    duerfen: {
      infinitive: 'dürfen (to be allowed to / may)',
      concept: 'Permission / Allowance (Ruhusa)',
      vowelShift: 'ü ➔ a in singular',
      rule: 'ich & er/es/sie are identical with NO ending (darf)! Combined with "nicht", it means FORBIDDEN!',
      forms: {
        ich: { form: 'darf', note: 'Zero ending + ü ➔ a', full: 'ich darf', highlight: true },
        du: { form: 'darfst', note: 'ü ➔ a + -st', full: 'du darfst', highlight: true },
        'er/es/sie': { form: 'darf', note: 'Zero ending + ü ➔ a (Twin of ich!)', full: 'er/es/sie darf', highlight: true },
        wir: { form: 'dürfen', note: 'regular -en with ü', full: 'wir dürfen' },
        ihr: { form: 'dürft', note: 'regular -t with ü', full: 'ihr dürft' },
        'sie/Sie': { form: 'dürfen', note: 'regular -en with ü', full: 'sie/Sie dürfen' }
      },
      example: 'Jan Schmidt darf keinen Urlaub nehmen.',
      exampleEn: 'Jan Schmidt is not allowed to take any vacation.'
    }
  };

  // Trennbare Verben Data (Pages 2 & 3)
  const trennbareData = {
    anziehen: {
      infinitive: 'anziehen (to put on clothes)',
      prefix: 'an',
      stem: 'ziehen',
      object: 'das Trikot',
      fullSentence: 'Ich ziehe das Trikot an.',
      audioText: 'ich ziehe das Trikot an. du ziehst das Trikot an. er zieht das Trikot an. wir ziehen das Trikot an. ihr zieht das Trikot an. sie ziehen das Trikot an.',
      forms: {
        ich: 'ziehe das Trikot an',
        du: 'ziehst das Trikot an',
        'er/es/sie': 'zieht das Trikot an',
        wir: 'ziehen das Trikot an',
        ihr: 'zieht das Trikot an',
        'sie/Sie': 'ziehen das Trikot an'
      }
    },
    aufstehen: {
      infinitive: 'aufstehen (to get up / wake up)',
      prefix: 'auf',
      stem: 'stehen',
      object: 'um fünf Uhr',
      fullSentence: 'Ich stehe um fünf Uhr auf.',
      audioText: 'ich stehe um fünf Uhr auf. du stehst um fünf Uhr auf. er steht um fünf Uhr auf. wir stehen um fünf Uhr auf. ihr steht um fünf Uhr auf. sie stehen um fünf Uhr auf.',
      forms: {
        ich: 'stehe um fünf Uhr auf',
        du: 'stehst um fünf Uhr auf',
        'er/es/sie': 'steht um fünf Uhr auf',
        wir: 'stehen um fünf Uhr auf',
        ihr: 'steht um fünf Uhr auf',
        'sie/Sie': 'stehen um fünf Uhr auf'
      }
    },
    aussehen: {
      infinitive: 'aussehen (to look / appear)',
      prefix: 'aus',
      stem: 'sehen (e ➔ ie!)',
      object: 'gut / super',
      fullSentence: 'Du siehst heute super aus!',
      audioText: 'ich sehe gut aus. du siehst gut aus. er sieht gut aus. wir sehen gut aus. ihr seht gut aus. sie sehen gut aus.',
      forms: {
        ich: 'sehe gut aus',
        du: 'siehst gut aus (e ➔ ie!)',
        'er/es/sie': 'sieht gut aus (e ➔ ie!)',
        wir: 'sehen gut aus',
        ihr: 'seht gut aus',
        'sie/Sie': 'sehen gut aus'
      }
    },
    mitspielen: {
      infinitive: 'mitspielen (to play along / join in)',
      prefix: 'mit',
      stem: 'spielen',
      object: 'Fußball',
      fullSentence: 'Wir spielen gerne mit.',
      audioText: 'ich spiele mit. du spielst mit. er spielt mit. wir spielen mit. ihr spielt mit. sie spielen mit.',
      forms: {
        ich: 'spiele Fußball mit',
        du: 'spielst Fußball mit',
        'er/es/sie': 'spielt Fußball mit',
        wir: 'spielen Fußball mit',
        ihr: 'spielt Fußball mit',
        'sie/Sie': 'spielen Fußball mit'
      }
    },
    zusehen: {
      infinitive: 'zusehen (to watch / observe)',
      prefix: 'zu',
      stem: 'sehen (e ➔ ie!)',
      object: 'beim Spiel',
      fullSentence: 'Sie sieht beim Spiel zu.',
      audioText: 'ich sehe zu. du siehst zu. er sieht zu. wir sehen zu. ihr seht zu. sie sehen zu.',
      forms: {
        ich: 'sehe beim Spiel zu',
        du: 'siehst beim Spiel zu (e ➔ ie!)',
        'er/es/sie': 'sieht beim Spiel zu (e ➔ ie!)',
        wir: 'sehen beim Spiel zu',
        ihr: 'seht beim Spiel zu',
        'sie/Sie': 'sehen beim Spiel zu'
      }
    }
  };

  // Redemittel Categories (Page 9)
  const redemittelSections = [
    {
      title: '⏰ über Notwendigkeiten sprechen (Necessity)',
      icon: '💼',
      phrases: [
        { de: 'Wann musst du aufstehen?', en: 'When do you have to get up?', sound: 'Wann musst du aufstehen?' },
        { de: 'Ich muss um sechs Uhr aufstehen.', en: 'I have to get up at six o\'clock.', sound: 'Ich muss um sechs Uhr aufstehen.' },
        { de: 'Wie lange musst du arbeiten?', en: 'How long do you have to work?', sound: 'Wie lange musst du arbeiten?' },
        { de: 'Ich muss acht Stunden arbeiten.', en: 'I have to work eight hours.', sound: 'Ich muss acht Stunden arbeiten.' },
        { de: 'Musst du am Samstag auch arbeiten?', en: 'Do you also have to work on Saturday?', sound: 'Musst du am Samstag auch arbeiten?' }
      ]
    },
    {
      title: '⭐ über Fähigkeiten sprechen (Skills & Talents)',
      icon: '🎹',
      phrases: [
        { de: 'Kannst du Klavier spielen?', en: 'Can you play piano?', sound: 'Kannst du Klavier spielen?' },
        { de: 'Ja, das kann ich sehr gut!', en: 'Yes, I can do that very well!', sound: 'Ja, das kann ich sehr gut!' },
        { de: 'Ja, aber nicht gut.', en: 'Yes, but not well.', sound: 'Ja, aber nicht gut.' },
        { de: 'Nein, das kann ich nicht so gut.', en: 'No, I can\'t do that so well.', sound: 'Nein, das kann ich nicht so gut.' },
        { de: 'Können Sie Deutsch sprechen?', en: 'Can you speak German?', sound: 'Können Sie Deutsch sprechen?' }
      ]
    },
    {
      title: '😊 über das Befinden sprechen (Feelings & Well-being)',
      icon: '💖',
      phrases: [
        { de: 'Wie geht\'s dir? / Wie geht es Ihnen?', en: 'How are you?', sound: 'Wie geht\'s dir? Wie geht es Ihnen?' },
        { de: 'Gut. Ich bin zufrieden / glücklich.', en: 'Good. I am content / happy.', sound: 'Gut. Ich bin zufrieden. Ich bin glücklich.' },
        { de: 'Ich bin heute etwas nervös.', en: 'I am a bit nervous today.', sound: 'Ich bin heute etwas nervös.' },
        { de: 'Es geht. / Nicht so gut. / Schlecht.', en: 'So-so. / Not so good. / Bad.', sound: 'Es geht. Nicht so gut. Schlecht.' },
        { de: 'Und dir? - Auch gut!', en: 'And you? - Also good!', sound: 'Und dir? Auch gut!' }
      ]
    },
    {
      title: '🎯 Absichten äußern (Intentions & Plans)',
      icon: '🍕',
      phrases: [
        { de: 'Willst du heute mitkommen?', en: 'Do you want to come along today?', sound: 'Willst du heute mitkommen?' },
        { de: 'Ja, sehr gern! Und du?', en: 'Yes, very gladly! And you?', sound: 'Ja, sehr gern! Und du?' },
        { de: 'Ich auch! / Ich auch nicht.', en: 'Me too! / Neither do I.', sound: 'Ich auch! Ich auch nicht.' },
        { de: 'Wollen Sie einen Kaffee trinken?', en: 'Would you like to drink a coffee?', sound: 'Wollen Sie einen Kaffee trinken?' }
      ]
    },
    {
      title: '🛡️ über Gebote & Verbote sprechen (Rules & Permission)',
      icon: '🚭',
      phrases: [
        { de: 'Darf man hier rauchen?', en: 'Is one allowed to smoke here?', sound: 'Darf man hier rauchen?' },
        { de: 'Nein, das darf man nicht!', en: 'No, that is not allowed!', sound: 'Nein, das darf man nicht!' },
        { de: 'Darf ich hier parken?', en: 'May I park here?', sound: 'Darf ich hier parken?' },
        { de: 'Ja, das ist kein Problem.', en: 'Yes, that is no problem.', sound: 'Ja, das ist kein Problem.' }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-6">
          <Layers className="w-80 h-80" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-md px-3 py-1.5 rounded-full text-blue-100 text-xs font-semibold tracking-wide border border-blue-300/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Summary 5 • Complete 9-Page Visual Guide</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Visual Grammatik & Redemittel Studio V 🚀
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Master the 4 Modal Verbs (<span className="text-amber-300 font-bold">müssen, können, wollen, dürfen</span>), Separable Verbs (<span className="text-amber-300 font-bold">anziehen, aufstehen</span>), the legendary <span className="text-amber-300 font-bold">Satzklammer Bracket & Combo</span>, Indefinite Pronouns (<span className="text-amber-300 font-bold">man & niemand</span>), and essential daily Redemittel!
          </p>
        </div>
      </div>

      {/* Station Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100/80 backdrop-blur-sm rounded-2xl border border-stone-200 shadow-inner">
        {[
          { id: 'modals', label: '1. Die 4 Modalverben', icon: '👑', color: 'blue' },
          { id: 'trennbar', label: '2. Trennbare Verben', icon: '🚀', color: 'indigo' },
          { id: 'satzklammer', label: '3. Satzklammer & Combo', icon: '🗂️', color: 'purple' },
          { id: 'pronouns', label: '4. man & niemand', icon: '👥', color: 'teal' },
          { id: 'redemittel', label: '5. Redemittel Toolkit', icon: '💬', color: 'rose' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playChime();
              setActiveStation(tab.id);
            }}
            className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              activeStation === tab.id
                ? 'bg-white text-stone-900 shadow-md border border-stone-200 ring-2 ring-blue-500/20 scale-[1.01]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* STATION 1: Die 4 Modalverben */}
      {activeStation === 'modals' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Pages 1 & 4 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Die 4 Modalverben: müssen, können, wollen, dürfen
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Golden Modal Rule: <strong className="text-blue-800">"ich" and "er/es/sie" are identical twin forms with ZERO endings</strong>, and the vowel shifts in singular!
              </p>
            </div>

            {/* Modal Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.keys(modalsData).map((mKey) => {
                const modal = modalsData[mKey];
                const isSelected = selectedModal === mKey;
                return (
                  <button
                    key={mKey}
                    onClick={() => {
                      playChime();
                      setSelectedModal(mKey);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-blue-700 text-white border-blue-800 shadow-lg scale-[1.02]'
                        : 'bg-stone-50 hover:bg-blue-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="font-extrabold text-base">{modal.infinitive.split(' ')[0]}</div>
                    <div className={`text-xs mt-1 ${isSelected ? 'text-blue-200' : 'text-stone-500'}`}>
                      {modal.concept.split(' ')[0]}
                    </div>
                    <div className="mt-2 text-[10px] font-mono font-bold bg-black/10 px-2 py-0.5 rounded inline-block">
                      {modal.vowelShift}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Modal Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
                    <span>{modalsData[selectedModal].infinitive}</span>
                    <button
                      onClick={() => speakGerman(modalsData[selectedModal].infinitive, isSlowMode)}
                      className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-blue-700 shadow-sm border border-blue-200"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </h3>
                  <p className="text-xs text-blue-800 font-medium mt-0.5">{modalsData[selectedModal].rule}</p>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-bold text-blue-900 shadow-sm self-start">
                  {modalsData[selectedModal].concept}
                </div>
              </div>

              {/* Conjugation Matrix */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {Object.entries(modalsData[selectedModal].forms).map(([pronoun, data]) => {
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
                          : 'bg-white border-stone-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-stone-500 uppercase">{pronoun}</span>
                        {isHighlighted && (
                          <span className="text-[10px] font-extrabold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                            NO ENDING!
                          </span>
                        )}
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span className="text-base font-extrabold text-stone-900">
                          {pronoun} <span className={isHighlighted ? 'text-blue-700 underline' : 'text-stone-800'}>{data.form}</span>
                        </span>
                        <Volume2 className="w-4 h-4 text-stone-400 hover:text-blue-700" />
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium">{data.note}</div>
                    </div>
                  );
                })}
              </div>

              {/* Example sentence from Page 4 */}
              <div className="bg-white rounded-xl p-4 border border-blue-200/80 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Page 4 Real Sentence</span>
                  <span className="text-sm md:text-base font-bold text-blue-950">{modalsData[selectedModal].example}</span>
                  <div className="text-xs text-stone-500 mt-0.5">{modalsData[selectedModal].exampleEn}</div>
                </div>
                <button
                  onClick={() => speakGerman(modalsData[selectedModal].example, isSlowMode)}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md flex-shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 2: Trennbare Verben */}
      {activeStation === 'trennbar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                Pages 2 & 3 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Trennbare Verben: The Detachable Prefix Rocket 🚀
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                When speaking in the present tense, the prefix (<span className="font-mono text-indigo-900 font-bold">an-, auf-, aus-, mit-, zu-</span>) snaps off and flies to the <strong className="text-rose-700 underline">VERY END of the sentence</strong>!
              </p>
            </div>

            {/* Verb Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {Object.keys(trennbareData).map((tKey) => {
                const item = trennbareData[tKey];
                const isSelected = selectedTrennbar === tKey;
                return (
                  <button
                    key={tKey}
                    onClick={() => {
                      playChime();
                      setSelectedTrennbar(tKey);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-indigo-700 text-white border-indigo-800 shadow-md scale-[1.02]'
                        : 'bg-stone-50 hover:bg-indigo-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-amber-400 uppercase">[{item.prefix}-]</div>
                    <div className="font-bold text-sm truncate">{item.infinitive.split(' ')[0]}</div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Rocket Launch Visualizer */}
            <div className="bg-gradient-to-r from-stone-900 via-indigo-950 to-purple-950 text-white rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Rocket Launch Animation: Prefix Flies to the End!
                </span>
                <button
                  onClick={() => speakGerman(trennbareData[selectedTrennbar].fullSentence, isSlowMode)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen Sentence</span>
                </button>
              </div>

              {/* Animated Sentence Display */}
              <div className="grid grid-cols-3 gap-2 text-center pt-3 pb-2 font-mono">
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <span className="text-[10px] text-blue-300 block uppercase font-bold">Position 1 (Subject)</span>
                  <span className="text-lg md:text-2xl font-black text-white">Ich</span>
                </div>

                <div className="bg-indigo-500/30 p-4 rounded-xl border-2 border-indigo-400">
                  <span className="text-[10px] text-indigo-300 block uppercase font-bold">Position 2 (Conjugated Stem)</span>
                  <span className="text-lg md:text-2xl font-black text-amber-300">
                    {trennbareData[selectedTrennbar].forms.ich.split(' ')[0]}
                  </span>
                </div>

                <div className="bg-rose-500/30 p-4 rounded-xl border-2 border-rose-400">
                  <span className="text-[10px] text-rose-300 block uppercase font-bold">Sentence End (Detached Prefix 🚀)</span>
                  <span className="text-lg md:text-2xl font-black text-rose-300 underline">
                    {trennbareData[selectedTrennbar].prefix}
                  </span>
                </div>
              </div>

              <div className="text-center text-xs text-stone-300 font-sans">
                Full sentence: <em>"{trennbareData[selectedTrennbar].fullSentence}"</em>
              </div>
            </div>

            {/* Conjugation Across All Persons Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Conjugation Table ({trennbareData[selectedTrennbar].infinitive})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(trennbareData[selectedTrennbar].forms).map(([pronoun, text]) => (
                  <div
                    key={pronoun}
                    onClick={() => speakGerman(`${pronoun} ${text}`, isSlowMode)}
                    className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-stone-500 uppercase block">{pronoun}</span>
                      <span className="text-sm font-bold text-stone-900">
                        {pronoun} <span className="text-indigo-700">{text}</span>
                      </span>
                    </div>
                    <Volume2 className="w-4 h-4 text-stone-400 hover:text-indigo-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 3: Die Satzklammer & Combo */}
      {activeStation === 'satzklammer' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                Pages 5, 6 & 7 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Die Deutsche Satzklammer (Sentence Brackets & The Ultimate Combo)
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Explore how the verb pieces hug the sentence across Statements, Ja/Nein Questions, and W-Questions — and discover the <strong className="text-purple-800">Combo Superglue Rule</strong> when Modals meet Separables!
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'modal', label: '1. Modalverben Satzklammer (Page 5)', icon: '🗂️' },
                { id: 'trennbar', label: '2. Trennbare Verben (Page 6)', icon: '🔄' },
                { id: 'combo', label: '3. COMBO: Modal + Trennbar (Page 7)', icon: '⚡' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playChime();
                    setSatzklammerMode(m.id);
                  }}
                  className={`flex-1 min-w-[200px] p-3 rounded-xl font-bold text-xs md:text-sm border transition-all ${
                    satzklammerMode === m.id
                      ? 'bg-purple-700 text-white border-purple-800 shadow-md scale-[1.01]'
                      : 'bg-stone-50 hover:bg-purple-50 text-stone-700 border-stone-200'
                  }`}
                >
                  <span className="mr-1">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Sentence Type Selector */}
            <div className="flex gap-2 border-b border-stone-200 pb-3">
              {[
                { key: 'aussage', label: 'Aussage (Statement)' },
                { key: 'janean', label: 'Ja/Nein - Frage' },
                { key: 'wfrage', label: 'W - Frage' }
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    playChime();
                    setSentenceType(t.key);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    sentenceType === t.key
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Dynamic Satzklammer Visualizer */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                  Live Sentence Structure Blueprint
                </span>
                <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-md border border-purple-200 text-purple-900">
                  {satzklammerMode === 'combo' ? 'UNITED INFINITIVE AT END!' : 'BRACKET OPEN ➔ BRACKET CLOSE'}
                </span>
              </div>

              {/* Dynamic Sentence Table */}
              <div className="bg-white rounded-xl border border-purple-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-purple-900 text-white font-mono">
                      <th className="p-3 border-r border-purple-800">Position 1</th>
                      <th className="p-3 border-r border-purple-800 bg-amber-600 text-amber-50">Position 2 (Verb 1)</th>
                      <th className="p-3 border-r border-purple-800">Middle Field</th>
                      <th className="p-3 bg-rose-700 text-rose-50">Satzende (Verb 2 / Prefix)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100 font-sans font-bold text-stone-900">
                    {satzklammerMode === 'modal' && (
                      <>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono">Markus</td>
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">darf</td>
                          <td className="p-3 font-mono">Kavier / nicht Klavier</td>
                          <td className="p-3 font-mono text-rose-700 bg-rose-50/50">spielen.</td>
                        </tr>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">Darf (Pos 1!)</td>
                          <td className="p-3 font-mono">Markus</td>
                          <td className="p-3 font-mono">Klavier</td>
                          <td className="p-3 font-mono text-rose-700 bg-rose-50/50">spielen?</td>
                        </tr>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono">Wann</td>
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">darf</td>
                          <td className="p-3 font-mono">Markus Klavier</td>
                          <td className="p-3 font-mono text-rose-700 bg-rose-50/50">spielen?</td>
                        </tr>
                      </>
                    )}

                    {satzklammerMode === 'trennbar' && (
                      <>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono">Ich</td>
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">stehe</td>
                          <td className="p-3 font-mono">um fünf Uhr</td>
                          <td className="p-3 font-mono text-rose-700 bg-rose-50/50">auf.</td>
                        </tr>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">Stehst (Pos 1!)</td>
                          <td className="p-3 font-mono">du</td>
                          <td className="p-3 font-mono">jetzt</td>
                          <td className="p-3 font-mono text-rose-700 bg-rose-50/50">auf?</td>
                        </tr>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono">Wann</td>
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">stehst</td>
                          <td className="p-3 font-mono">du</td>
                          <td className="p-3 font-mono text-rose-700 bg-rose-50/50">auf?</td>
                        </tr>
                      </>
                    )}

                    {satzklammerMode === 'combo' && (
                      <>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono">Ich</td>
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">will</td>
                          <td className="p-3 font-mono">um fünf Uhr</td>
                          <td className="p-3 font-mono text-purple-900 bg-purple-100 font-extrabold underline">aufstehen.</td>
                        </tr>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">Willst (Pos 1!)</td>
                          <td className="p-3 font-mono">du</td>
                          <td className="p-3 font-mono">um fünf Uhr</td>
                          <td className="p-3 font-mono text-purple-900 bg-purple-100 font-extrabold underline">aufstehen?</td>
                        </tr>
                        <tr className="hover:bg-purple-50/50">
                          <td className="p-3 font-mono">Wann</td>
                          <td className="p-3 font-mono text-amber-700 bg-amber-50/50">willst</td>
                          <td className="p-3 font-mono">du</td>
                          <td className="p-3 font-mono text-purple-900 bg-purple-100 font-extrabold underline">aufstehen?</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Audio Listen Bar */}
              <div className="bg-purple-900 text-white p-4 rounded-xl flex items-center justify-between gap-3 shadow-inner">
                <div className="text-xs md:text-sm font-bold">
                  {satzklammerMode === 'combo' ? (
                    <span>⚡ <strong>Combo Rule:</strong> "Ich will um fünf Uhr <em>aufstehen</em>" (Separable stays united!)</span>
                  ) : satzklammerMode === 'modal' ? (
                    <span>🗂️ <strong>Modal Rule:</strong> "Markus darf Klavier <em>spielen</em>" (Infinitive at end)</span>
                  ) : (
                    <span>🔄 <strong>Separable Rule:</strong> "Ich stehe um fünf Uhr <em>auf</em>" (Prefix at end)</span>
                  )}
                </div>
                <button
                  onClick={() => {
                    const text = satzklammerMode === 'combo'
                      ? 'Ich will um fünf Uhr aufstehen.'
                      : satzklammerMode === 'modal'
                      ? 'Markus darf Klavier spielen.'
                      : 'Ich stehe um fünf Uhr auf.';
                    speakGerman(text, isSlowMode);
                  }}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-purple-950 font-extrabold rounded-lg text-xs shadow-md flex items-center gap-1.5 flex-shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATION 4: man & niemand */}
      {activeStation === 'pronouns' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Page 8 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Indefinitpronomen: "man" (People in general) & "niemand" (Nobody)
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Both <strong className="text-teal-800">man</strong> and <strong className="text-teal-800">niemand</strong> ALWAYS conjugate with the <strong className="text-rose-700 underline">3rd person singular (er/es/sie form)</strong>!
              </p>
            </div>

            {/* Pronoun Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => {
                  setSelectedIndefinit('man');
                  speakGerman('Man darf hier nicht rauchen.', isSlowMode);
                }}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedIndefinit === 'man'
                    ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/30 shadow-md'
                    : 'bg-stone-50 border-stone-200 hover:bg-teal-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold bg-teal-200 text-teal-900 px-2.5 py-0.5 rounded">
                    PRONOMEN 1
                  </span>
                  <Volume2 className="w-4 h-4 text-teal-700" />
                </div>
                <h3 className="text-lg font-black text-stone-900">man (one / people in general)</h3>
                <p className="text-xs text-stone-500 mt-1">General rules, habits, or universal facts.</p>
                <div className="mt-4 bg-white p-3 rounded-xl border border-teal-200">
                  <div className="font-mono font-bold text-teal-950 text-sm">"Man darf hier nicht rauchen."</div>
                  <div className="text-xs text-stone-500 mt-0.5">One is not allowed to smoke here / No smoking.</div>
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectedIndefinit('niemand');
                  speakGerman('Niemand kann einen Handstand machen.', isSlowMode);
                }}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedIndefinit === 'niemand'
                    ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/30 shadow-md'
                    : 'bg-stone-50 border-stone-200 hover:bg-purple-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold bg-purple-200 text-purple-900 px-2.5 py-0.5 rounded">
                    PRONOMEN 2
                  </span>
                  <Volume2 className="w-4 h-4 text-purple-700" />
                </div>
                <h3 className="text-lg font-black text-stone-900">niemand (nobody / no one)</h3>
                <p className="text-xs text-stone-500 mt-1">Zero people / total absence.</p>
                <div className="mt-4 bg-white p-3 rounded-xl border border-purple-200">
                  <div className="font-mono font-bold text-purple-950 text-sm">"Niemand kann einen Handstand machen."</div>
                  <div className="text-xs text-stone-500 mt-0.5">Nobody can do a handstand.</div>
                </div>
              </div>
            </div>

            {/* Golden Rule Summary */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 flex items-center justify-between gap-3 shadow-inner">
              <div className="space-y-1">
                <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Conjugation Rule Reminder:</span>
                </div>
                <div className="text-xs text-stone-300">
                  Both <code className="text-teal-300">man</code> and <code className="text-purple-300">niemand</code> take 3rd Person Singular: <em>man muss</em>, <em>man kann</em>, <em>niemand darf</em>, <em>niemand will</em>!
                </div>
              </div>
              <button
                onClick={() => speakGerman("Hier darf man nicht parken. Niemand ist zu Hause.", isSlowMode)}
                className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Audio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 5: Redemittel Toolkit */}
      {activeStation === 'redemittel' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Page 9 Blueprint
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">
                Das Komplette Redemittel Toolkit (Page 9)
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Practice the 5 daily communication themes: Notwendigkeiten, Fähigkeiten, Befinden, Absichten, and Gebote & Verbote!
              </p>
            </div>

            {/* Redemittel Grid */}
            <div className="space-y-6">
              {redemittelSections.map((sec, sIdx) => (
                <div key={sIdx} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                  <h3 className="font-extrabold text-stone-900 text-sm md:text-base flex items-center gap-2 border-b border-stone-200 pb-2">
                    <span>{sec.icon}</span>
                    <span>{sec.title}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {sec.phrases.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => speakGerman(p.sound, isSlowMode)}
                        className="bg-white p-3 rounded-xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50/40 cursor-pointer transition-all shadow-sm flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-sm font-bold text-stone-900 group-hover:text-rose-900">{p.de}</div>
                          <div className="text-xs text-stone-500 mt-0.5">{p.en}</div>
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
      )}
    </div>
  );
}
