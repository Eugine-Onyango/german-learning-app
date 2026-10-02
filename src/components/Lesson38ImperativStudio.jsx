import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson38ImperativStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('factory'); // 'factory' | 'rebels' | 'soundboard'
  const [selectedVerbKey, setSelectedVerbKey] = useState('kommen');
  const [toneFilter, setToneFilter] = useState('all');

  const FACTORY_VERBS = [
    {
      key: 'kommen',
      infinitive: 'kommen',
      meaning: 'to come',
      icon: '🚶‍♂️',
      type: 'regular',
      duStandard: 'du kommst',
      duImperativ: 'Komm!',
      duAudio: 'Komm!',
      duEn: 'Come! (to 1 friend)',
      duNote: 'Drop "du" and drop "-st"',
      ihrStandard: 'ihr kommt',
      ihrImperativ: 'Kommt!',
      ihrAudio: 'Kommt!',
      ihrEn: 'Come! (to you all)',
      ihrNote: 'Drop "ihr", keep "-t"',
      sieStandard: 'Sie kommen',
      sieImperativ: 'Kommen Sie!',
      sieAudio: 'Kommen Sie bitte!',
      sieEn: 'Please come! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Komm schnell!',
      exampleEn: 'Come quickly!'
    },
    {
      key: 'lernen',
      infinitive: 'lernen',
      meaning: 'to learn / study',
      icon: '📚',
      type: 'regular',
      duStandard: 'du lernst',
      duImperativ: 'Lern!',
      duAudio: 'Lern Deutsch!',
      duEn: 'Learn! (1 friend)',
      duNote: 'Drop "du" and drop "-st"',
      ihrStandard: 'ihr lernt',
      ihrImperativ: 'Lernt!',
      ihrAudio: 'Lernt fleißig!',
      ihrEn: 'Learn! (you all)',
      ihrNote: 'Drop "ihr", keep "-t"',
      sieStandard: 'Sie lernen',
      sieImperativ: 'Lernen Sie!',
      sieAudio: 'Lernen Sie Deutsch!',
      sieEn: 'Please learn! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Lern regelmäßig Deutsch!',
      exampleEn: 'Study German regularly!'
    },
    {
      key: 'fahren',
      infinitive: 'fahren',
      meaning: 'to drive / ride',
      icon: '🚗',
      type: 'umlaut-drop',
      duStandard: 'du fährst (ä!)',
      duImperativ: 'Fahr! (No dots!)',
      duAudio: 'Fahr doch jetzt!',
      duEn: 'Drive! (1 friend)',
      duNote: '⚠️ Umlaut Drop Trap: "ä" drops back to plain "a"!',
      ihrStandard: 'ihr fahrt',
      ihrImperativ: 'Fahrt!',
      ihrAudio: 'Fahrt vorsichtig!',
      ihrEn: 'Drive! (you all)',
      ihrNote: 'Drop "ihr", keep "-t"',
      sieStandard: 'Sie fahren',
      sieImperativ: 'Fahren Sie!',
      sieAudio: 'Fahren Sie bitte vorsichtig!',
      sieEn: 'Please drive carefully! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Fahr doch jetzt!',
      exampleEn: 'Drive now!'
    },
    {
      key: 'geben',
      infinitive: 'geben',
      meaning: 'to give',
      icon: '🎁',
      type: 'vowel-change',
      duStandard: 'du gibst (i!)',
      duImperativ: 'Gib!',
      duAudio: 'Gib mir das Buch!',
      duEn: 'Give! (1 friend)',
      duNote: 'e ➔ i vowel change is PRESERVED!',
      ihrStandard: 'ihr gebt',
      ihrImperativ: 'Gebt!',
      ihrAudio: 'Gebt mir die Hand!',
      ihrEn: 'Give! (you all)',
      ihrNote: 'Drop "ihr", keep "-t"',
      sieStandard: 'Sie geben',
      sieImperativ: 'Geben Sie!',
      sieAudio: 'Geben Sie mir bitte das Buch!',
      sieEn: 'Please give! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Gib mir bitte deine Hand!',
      exampleEn: 'Please give me your hand!'
    },
    {
      key: 'arbeiten',
      infinitive: 'arbeiten',
      meaning: 'to work',
      icon: '💼',
      type: 'breathing-e',
      duStandard: 'du arbeitest',
      duImperativ: 'Arbeite!',
      duAudio: 'Arbeite fleißig!',
      duEn: 'Work! (1 friend)',
      duNote: '🌬️ Breathing Cushion: -t stem keeps "-e"!',
      ihrStandard: 'ihr arbeitet',
      ihrImperativ: 'Arbeitet!',
      ihrAudio: 'Arbeitet zusammen!',
      ihrEn: 'Work! (you all)',
      ihrNote: 'Drop "ihr", keep "-et"',
      sieStandard: 'Sie arbeiten',
      sieImperativ: 'Arbeiten Sie!',
      sieAudio: 'Arbeiten Sie gut!',
      sieEn: 'Please work! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Arbeite nicht zu viel!',
      exampleEn: 'Don\'t work too much!'
    },
    {
      key: 'warten',
      infinitive: 'warten',
      meaning: 'to wait',
      icon: '⏳',
      type: 'breathing-e',
      duStandard: 'du wartest',
      duImperativ: 'Warte!',
      duAudio: 'Warte auf mich!',
      duEn: 'Wait! (1 friend)',
      duNote: '🌬️ Breathing Cushion: -t stem keeps "-e"!',
      ihrStandard: 'ihr wartet',
      ihrImperativ: 'Wartet!',
      ihrAudio: 'Wartet hier!',
      ihrEn: 'Wait! (you all)',
      ihrNote: 'Drop "ihr", keep "-et"',
      sieStandard: 'Sie warten',
      sieImperativ: 'Warten Sie!',
      sieAudio: 'Warten Sie bitte einen Moment!',
      sieEn: 'Please wait a moment! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Warte kurz auf mich!',
      exampleEn: 'Wait a short moment for me!'
    },
    {
      key: 'lesen',
      infinitive: 'lesen',
      meaning: 'to read',
      icon: '📖',
      type: 'vowel-change',
      duStandard: 'du liest (ie!)',
      duImperativ: 'Lies!',
      duAudio: 'Lies das Buch!',
      duEn: 'Read! (1 friend)',
      duNote: 'e ➔ ie vowel shift is PRESERVED!',
      ihrStandard: 'ihr lest',
      ihrImperativ: 'Lest!',
      ihrAudio: 'Lest den Text!',
      ihrEn: 'Read! (you all)',
      ihrNote: 'Drop "ihr", keep "-t"',
      sieStandard: 'Sie lesen',
      sieImperativ: 'Lesen Sie!',
      sieAudio: 'Lesen Sie bitte den Text!',
      sieEn: 'Please read! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Lies den Satz laut vor!',
      exampleEn: 'Read the sentence out loud!'
    },
    {
      key: 'essen',
      infinitive: 'essen',
      meaning: 'to eat',
      icon: '🍏',
      type: 'vowel-change',
      duStandard: 'du isst (i!)',
      duImperativ: 'Iss!',
      duAudio: 'Iss dein Gemüse!',
      duEn: 'Eat! (1 friend)',
      duNote: 'e ➔ i vowel change is PRESERVED!',
      ihrStandard: 'ihr esst',
      ihrImperativ: 'Esst!',
      ihrAudio: 'Esst euer Essen!',
      ihrEn: 'Eat! (you all)',
      ihrNote: 'Drop "ihr", keep "-t"',
      sieStandard: 'Sie essen',
      sieImperativ: 'Essen Sie!',
      sieAudio: 'Essen Sie bitte etwas!',
      sieEn: 'Please eat something! (formal)',
      sieNote: 'Invert Verb + Sie',
      exampleSentence: 'Iss den Apfel!',
      exampleEn: 'Eat the apple!'
    },
    {
      key: 'aufmachen',
      infinitive: 'aufmachen',
      meaning: 'to open',
      icon: '🪟',
      type: 'separable',
      duStandard: 'du machst auf',
      duImperativ: 'Mach auf!',
      duAudio: 'Mach das Fenster auf!',
      duEn: 'Open! (1 friend)',
      duNote: 'Prefix "auf" flies to the very end!',
      ihrStandard: 'ihr macht auf',
      ihrImperativ: 'Macht auf!',
      ihrAudio: 'Macht die Tür auf!',
      ihrEn: 'Open! (you all)',
      ihrNote: 'Drop "ihr", prefix at end',
      sieStandard: 'Sie machen auf',
      sieImperativ: 'Machen Sie auf!',
      sieAudio: 'Machen Sie bitte das Fenster auf!',
      sieEn: 'Please open! (formal)',
      sieNote: 'Invert Verb + Sie, prefix at end',
      exampleSentence: 'Mach bitte das Fenster auf!',
      exampleEn: 'Please open the window!'
    },
    {
      key: 'zuhoeren',
      infinitive: 'zuhören',
      meaning: 'to listen',
      icon: '👂',
      type: 'separable',
      duStandard: 'du hörst zu',
      duImperativ: 'Hör zu!',
      duAudio: 'Hör mir gut zu!',
      duEn: 'Listen! (1 friend)',
      duNote: 'Prefix "zu" sits at the end!',
      ihrStandard: 'ihr hört zu',
      ihrImperativ: 'Hört zu!',
      ihrAudio: 'Hört gut zu!',
      ihrEn: 'Listen! (you all)',
      ihrNote: 'Drop "ihr", prefix at end',
      sieStandard: 'Sie hören zu',
      sieImperativ: 'Hören Sie zu!',
      sieAudio: 'Hören Sie bitte zu!',
      sieEn: 'Please listen! (formal)',
      sieNote: 'Invert Verb + Sie, prefix at end',
      exampleSentence: 'Hör mir bitte gut zu!',
      exampleEn: 'Please listen to me carefully!'
    }
  ];

  const currentVerb = FACTORY_VERBS.find((v) => v.key === selectedVerbKey) || FACTORY_VERBS[0];

  const REBEL_VERBS = [
    {
      verb: 'sein',
      meaning: 'to be',
      icon: '👑',
      badge: 'King of Exceptions',
      forms: {
        du: { form: 'Sei!', example: 'Sei leise! / Sei froh! / Sei pünktlich!', audio: 'Sei leise! Sei froh!', en: 'Be quiet! / Be glad!' },
        ihr: { form: 'Seid!', example: 'Seid leise! / Seid vorsichtig!', audio: 'Seid leise!', en: 'Be quiet, you all!' },
        sie: { form: 'Seien Sie!', example: 'Seien Sie bitte leise! / Seien Sie vorsichtig!', audio: 'Seien Sie bitte leise!', en: 'Please be quiet! (formal)' }
      },
      tip: 'Notice: for Sie it is "Seien Sie" (NOT "Sind Sie")! For du it is "Sei" (NOT "Bist").'
    },
    {
      verb: 'haben',
      meaning: 'to have',
      icon: '⏳',
      badge: 'Patience & Courage',
      forms: {
        du: { form: 'Hab! / Habe!', example: 'Hab Geduld! / Hab keine Angst!', audio: 'Hab Geduld! Hab keine Angst!', en: 'Have patience! / Don\'t be afraid!' },
        ihr: { form: 'Habt!', example: 'Habt Geduld! / Habt Spaß!', audio: 'Habt Geduld!', en: 'Have patience, you guys!' },
        sie: { form: 'Haben Sie!', example: 'Haben Sie bitte Geduld!', audio: 'Haben Sie bitte Geduld!', en: 'Please have some patience! (formal)' }
      },
      tip: '"Hab Geduld!" (Slide 24) is the quintessential German encouragement to stay patient!'
    },
    {
      verb: 'werden',
      meaning: 'to become / get',
      icon: '🩹',
      badge: 'Get Well Wishes',
      forms: {
        du: { form: 'Werde!', example: 'Werde schnell gesund!', audio: 'Werde gesund!', en: 'Get well soon! (1 friend)' },
        ihr: { form: 'Werdet!', example: 'Werdet gesund!', audio: 'Werdet gesund!', en: 'Get well soon, you all!' },
        sie: { form: 'Werden Sie!', example: 'Werden Sie bitte schnell gesund!', audio: 'Werden Sie gesund!', en: 'Get well soon! (formal)' }
      },
      tip: '"Werde gesund!" (Slide 25) is how Germans wish someone a recovery when they are sick!'
    }
  ];

  const SOUNDBOARD_ITEMS = [
    {
      category: 'befehl',
      catLabel: '🛑 Commands (Befehle & Aufforderungen)',
      german: 'Fahr doch jetzt!',
      english: 'Drive now!',
      audio: 'Fahr doch jetzt!',
      target: 'du (1 person)',
      slide: 'Slide 5'
    },
    {
      category: 'befehl',
      catLabel: '🛑 Commands (Befehle & Aufforderungen)',
      german: 'Geh sofort nach Hause!',
      english: 'Go home immediately!',
      audio: 'Geh sofort nach Hause!',
      target: 'du (1 person)',
      slide: 'Slide 6'
    },
    {
      category: 'rat',
      catLabel: '💡 Advice (Rat & Empfehlungen)',
      german: 'Bitte trinken Sie mehr Wasser!',
      english: 'Please drink more water!',
      audio: 'Bitte trinken Sie mehr Wasser!',
      target: 'Sie (formal)',
      slide: 'Slide 7'
    },
    {
      category: 'rat',
      catLabel: '💡 Advice (Rat & Empfehlungen)',
      german: 'Mach regelmäßig die Hausaufgabe!',
      english: 'Do your homework regularly!',
      audio: 'Mach regelmäßig die Hausaufgabe!',
      target: 'du (1 person)',
      slide: 'Slide 8'
    },
    {
      category: 'bitte',
      catLabel: '🙏 Polite Requests (Bitten)',
      german: 'Haben Sie bitte Geduld!',
      english: 'Please have some patience!',
      audio: 'Haben Sie bitte Geduld!',
      target: 'Sie (formal)',
      slide: 'Slide 3'
    },
    {
      category: 'bitte',
      catLabel: '🙏 Polite Requests (Bitten)',
      german: 'Seien Sie bitte leise!',
      english: 'Please be quiet!',
      audio: 'Seien Sie bitte leise!',
      target: 'Sie (formal)',
      slide: 'Slide 4'
    },
    {
      category: 'separable',
      catLabel: '🚀 Separable Verbs (Trennbare Imperative)',
      german: 'Mach das Fenster auf!',
      english: 'Open the window!',
      audio: 'Mach das Fenster auf!',
      target: 'du (1 person)',
      slide: 'Slide 17'
    },
    {
      category: 'separable',
      catLabel: '🚀 Separable Verbs (Trennbare Imperative)',
      german: 'Hör bitte gut zu!',
      english: 'Please listen carefully!',
      audio: 'Hör bitte gut zu!',
      target: 'du (1 person)',
      slide: 'Slide 17'
    },
    {
      category: 'separable',
      catLabel: '🚀 Separable Verbs (Trennbare Imperative)',
      german: 'Steh bitte auf!',
      english: 'Please stand up / get up!',
      audio: 'Steh bitte auf!',
      target: 'du (1 person)',
      slide: 'Daily Life'
    }
  ];

  const filteredSoundboard = toneFilter === 'all'
    ? SOUNDBOARD_ITEMS
    : SOUNDBOARD_ITEMS.filter((item) => item.category === toneFilter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-800 via-rose-800 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-rose-500/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600/50 backdrop-blur rounded-full text-xs font-bold text-rose-200 uppercase tracking-widest border border-rose-400/30">
              <span>📣 Slide 1–26 Master Studio</span>
              <span>•</span>
              <span>Der Imperativ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Commands, Requests & Advice (Imperativ)
            </h1>
            <p className="text-rose-100 text-sm sm:text-base max-w-xl">
              Give orders, offer warm advice, or ask politely! The verb leaps to <span className="text-amber-300 font-bold">Position 1</span>. Master the 3 lanes (<strong className="text-amber-200">du</strong>, <strong className="text-amber-200">ihr</strong>, <strong className="text-amber-200">Sie</strong>) and the 3 royal rebels (<strong className="text-pink-300">sein</strong>, <strong className="text-pink-300">haben</strong>, <strong className="text-pink-300">werden</strong>).
            </p>
          </div>

          <button
            onClick={() => speakGerman('Der Imperativ: Komm! Kommt! Kommen Sie bitte! Haben Sie bitte Geduld! Seien Sie bitte leise! Fahr doch jetzt!', isSlowMode)}
            className="flex items-center gap-3 px-6 py-4 bg-amber-400 hover:bg-amber-300 active:scale-95 text-red-950 font-black rounded-2xl shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
          >
            <span className="text-2xl">🔊</span>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-red-900">Audio Guide</div>
              <div className="text-sm font-bold">Listen to Commands</div>
            </div>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-rose-600/50">
          <button
            onClick={() => setActiveTab('factory')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'factory'
                ? 'bg-amber-400 text-red-950 shadow-md scale-105'
                : 'bg-rose-950/50 hover:bg-rose-900 text-rose-200 border border-rose-700/50'
            }`}
          >
            <span>🎯</span>
            <span>1. The 3-Lane Factory (du / ihr / Sie)</span>
          </button>
          <button
            onClick={() => setActiveTab('rebels')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'rebels'
                ? 'bg-amber-400 text-red-950 shadow-md scale-105'
                : 'bg-rose-950/50 hover:bg-rose-900 text-rose-200 border border-rose-700/50'
            }`}
          >
            <span>👑</span>
            <span>2. The 3 Royal Rebels (sein, haben, werden)</span>
          </button>
          <button
            onClick={() => setActiveTab('soundboard')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'soundboard'
                ? 'bg-amber-400 text-red-950 shadow-md scale-105'
                : 'bg-rose-950/50 hover:bg-rose-900 text-rose-200 border border-rose-700/50'
            }`}
          >
            <span>📣</span>
            <span>3. Commands, Advice & Requests Hub</span>
          </button>
        </div>
      </div>

      {/* TAB 1: The 3-Lane Factory */}
      {activeTab === 'factory' && (
        <div className="space-y-8">
          {/* Verb Selector Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="text-xs font-black text-stone-500 uppercase tracking-wider">
              Select a Verb to Inspect its 3-Lane Transformation:
            </div>
            <div className="flex flex-wrap gap-2">
              {FACTORY_VERBS.map((v) => (
                <button
                  key={v.key}
                  onClick={() => {
                    setSelectedVerbKey(v.key);
                    speakGerman(v.duImperativ, isSlowMode);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    selectedVerbKey === v.key
                      ? 'bg-red-700 text-white shadow-md scale-105 ring-2 ring-red-300'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{v.icon}</span>
                  <span>{v.infinitive}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3-Lane Interactive Factory Inspector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-red-500 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-4">
                <span className="text-5xl p-3 bg-red-50 rounded-2xl border border-red-200 shadow-sm">{currentVerb.icon}</span>
                <div>
                  <span className="px-3 py-1 bg-red-100 text-red-900 rounded-full text-xs font-black uppercase tracking-wider">
                    Transformation Factory • {currentVerb.type}
                  </span>
                  <h2 className="text-3xl font-black text-stone-900 mt-1">
                    Verb: {currentVerb.infinitive} <span className="text-stone-400 text-lg font-normal">({currentVerb.meaning})</span>
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm">Example: <em>"{currentVerb.exampleSentence}"</em> ({currentVerb.exampleEn})</p>
                </div>
              </div>

              <button
                onClick={() => speakGerman(`${currentVerb.duImperativ} ${currentVerb.ihrImperativ} ${currentVerb.sieImperativ}`, isSlowMode)}
                className="px-5 py-3 bg-red-700 hover:bg-red-800 text-white font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow"
              >
                <span>🔊</span> Listen to All 3 Forms
              </button>
            </div>

            {/* 3 Columns for du, ihr, Sie */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Lane 1: du (1 friend) */}
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full text-[10px] font-black uppercase">
                      👦 1. Person: du
                    </span>
                    <span className="text-xs text-amber-800 font-bold">1 Friend / Child</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-white/80 rounded-xl text-xs text-stone-600 border border-amber-200 space-y-1">
                    <div>Standard: <strong className="text-stone-800">{currentVerb.duStandard}</strong></div>
                    <div className="text-[11px] text-amber-800 font-medium">✂️ Formula: {currentVerb.duNote}</div>
                  </div>

                  <div className="my-4 text-center py-3 bg-amber-500 text-white rounded-2xl shadow-sm space-y-0.5">
                    <div className="text-[10px] font-bold text-amber-100 uppercase">Imperativ Form</div>
                    <div className="text-2xl sm:text-3xl font-black">{currentVerb.duImperativ}</div>
                  </div>

                  <p className="text-xs text-stone-600 italic text-center">
                    "{currentVerb.duEn}"
                  </p>
                </div>

                <button
                  onClick={() => speakGerman(currentVerb.duAudio, isSlowMode)}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer shadow"
                >
                  <span>🔊</span> Listen: "{currentVerb.duAudio}"
                </button>
              </div>

              {/* Lane 2: ihr (group of friends) */}
              <div className="p-5 rounded-2xl bg-teal-50 border-2 border-teal-300 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-teal-200 text-teal-900 rounded-full text-[10px] font-black uppercase">
                      👥 2. Person: ihr
                    </span>
                    <span className="text-xs text-teal-800 font-bold">You All / Group</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-white/80 rounded-xl text-xs text-stone-600 border border-teal-200 space-y-1">
                    <div>Standard: <strong className="text-stone-800">{currentVerb.ihrStandard}</strong></div>
                    <div className="text-[11px] text-teal-800 font-medium">✂️ Formula: {currentVerb.ihrNote}</div>
                  </div>

                  <div className="my-4 text-center py-3 bg-teal-600 text-white rounded-2xl shadow-sm space-y-0.5">
                    <div className="text-[10px] font-bold text-teal-100 uppercase">Imperativ Form</div>
                    <div className="text-2xl sm:text-3xl font-black">{currentVerb.ihrImperativ}</div>
                  </div>

                  <p className="text-xs text-stone-600 italic text-center">
                    "{currentVerb.ihrEn}"
                  </p>
                </div>

                <button
                  onClick={() => speakGerman(currentVerb.ihrAudio, isSlowMode)}
                  className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer shadow"
                >
                  <span>🔊</span> Listen: "{currentVerb.ihrAudio}"
                </button>
              </div>

              {/* Lane 3: Sie (formal) */}
              <div className="p-5 rounded-2xl bg-purple-50 border-2 border-purple-300 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-purple-200 text-purple-900 rounded-full text-[10px] font-black uppercase">
                      👔 3. Person: Sie
                    </span>
                    <span className="text-xs text-purple-800 font-bold">Formal / Elder</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-white/80 rounded-xl text-xs text-stone-600 border border-purple-200 space-y-1">
                    <div>Standard: <strong className="text-stone-800">{currentVerb.sieStandard}</strong></div>
                    <div className="text-[11px] text-purple-800 font-medium">🔄 Formula: {currentVerb.sieNote}</div>
                  </div>

                  <div className="my-4 text-center py-3 bg-purple-700 text-white rounded-2xl shadow-sm space-y-0.5">
                    <div className="text-[10px] font-bold text-purple-200 uppercase">Imperativ Form</div>
                    <div className="text-2xl sm:text-3xl font-black">{currentVerb.sieImperativ}</div>
                  </div>

                  <p className="text-xs text-stone-600 italic text-center">
                    "{currentVerb.sieEn}"
                  </p>
                </div>

                <button
                  onClick={() => speakGerman(currentVerb.sieAudio, isSlowMode)}
                  className="w-full py-2 bg-purple-800 hover:bg-purple-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer shadow"
                >
                  <span>🔊</span> Listen: "{currentVerb.sieAudio}"
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: The 3 Royal Rebels */}
      {activeTab === 'rebels' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
              Slides 23–26: The Superhero Exceptions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Special Imperative Forms: sein, haben, werden
            </h2>
            <p className="text-stone-600 text-sm">
              These 3 verbs have unique command stems that you must remember by heart!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REBEL_VERBS.map((rebel) => (
              <div
                key={rebel.verb}
                className="bg-white rounded-3xl p-6 shadow-md border-2 border-stone-200 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-3 bg-amber-50 rounded-2xl border border-amber-200">{rebel.icon}</span>
                    <div>
                      <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-md text-[10px] font-black uppercase">
                        {rebel.badge}
                      </span>
                      <h3 className="text-2xl font-black text-stone-900 mt-0.5">
                        {rebel.verb} <span className="text-xs text-stone-500 font-normal">({rebel.meaning})</span>
                      </h3>
                    </div>
                  </div>

                  {/* Forms Grid */}
                  <div className="space-y-2">
                    {/* du */}
                    <div
                      onClick={() => speakGerman(rebel.forms.du.audio, isSlowMode)}
                      className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition cursor-pointer space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-900">du (1 person):</span>
                        <span className="font-black text-amber-950 text-base">{rebel.forms.du.form}</span>
                      </div>
                      <div className="text-[11px] text-stone-600 font-medium">{rebel.forms.du.example}</div>
                      <div className="text-[10px] text-stone-400 italic">{rebel.forms.du.en}</div>
                    </div>

                    {/* ihr */}
                    <div
                      onClick={() => speakGerman(rebel.forms.ihr.audio, isSlowMode)}
                      className="p-3 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition cursor-pointer space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-teal-900">ihr (you all):</span>
                        <span className="font-black text-teal-950 text-base">{rebel.forms.ihr.form}</span>
                      </div>
                      <div className="text-[11px] text-stone-600 font-medium">{rebel.forms.ihr.example}</div>
                      <div className="text-[10px] text-stone-400 italic">{rebel.forms.ihr.en}</div>
                    </div>

                    {/* Sie */}
                    <div
                      onClick={() => speakGerman(rebel.forms.sie.audio, isSlowMode)}
                      className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition cursor-pointer space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-purple-900">Sie (formal):</span>
                        <span className="font-black text-purple-950 text-base">{rebel.forms.sie.form}</span>
                      </div>
                      <div className="text-[11px] text-stone-600 font-medium">{rebel.forms.sie.example}</div>
                      <div className="text-[10px] text-stone-400 italic">{rebel.forms.sie.en}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
                  💡 <strong>Tip:</strong> {rebel.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Commands, Advice & Requests Hub */}
      {activeTab === 'soundboard' && (
        <div className="space-y-6">
          {/* Tone Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase">Tone Filter:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Hits 🌟' },
                  { id: 'befehl', label: '🛑 Commands' },
                  { id: 'rat', label: '💡 Advice' },
                  { id: 'bitte', label: '🙏 Requests' },
                  { id: 'separable', label: '🚀 Separable' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setToneFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      toneFilter === f.id
                        ? 'bg-red-700 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-stone-500">
              Showing <strong>{filteredSoundboard.length}</strong> phrases
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSoundboard.map((item, idx) => (
              <div
                key={idx}
                onClick={() => speakGerman(item.audio, isSlowMode)}
                className="p-5 rounded-2xl bg-white hover:bg-red-50/50 border-2 border-stone-200 hover:border-red-300 transition-all cursor-pointer shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md text-[10px] font-bold">
                      {item.slide}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md text-[10px] font-bold">
                      Target: {item.target}
                    </span>
                  </div>

                  <div className="text-xl font-black text-stone-900">
                    "{item.german}"
                  </div>

                  <div className="text-xs text-stone-500 italic">
                    {item.english}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-red-700 font-bold pt-2 border-t border-stone-100">
                  <span>{item.catLabel.split(' ')[1]}</span>
                  <span>🔊 Tap to listen</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
