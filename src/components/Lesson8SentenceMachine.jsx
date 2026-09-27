import React, { useState } from 'react';
import { Volume2, Sparkles, ArrowRight, Zap, RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson8SentenceMachine({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('statement'); // 'statement', 'w-frage', 'ja-nein'
  const [statementVariant, setStatementVariant] = useState('normal'); // 'normal' (Ich wohne in Berlin) or 'heute' (Heute bin ich in Berlin)
  const [selectedWWord, setSelectedWWord] = useState('wo');
  const [selectedJaNeinIndex, setSelectedJaNeinIndex] = useState(0);

  const wQuestions = [
    {
      id: 'wo',
      word: 'Wo?',
      meaning: 'Where?',
      example: 'Wo wohnen Sie?',
      pos1: 'Wo',
      pos2: 'wohnen',
      pos3: 'Sie?',
      meaningFull: 'Where do you live?'
    },
    {
      id: 'woher',
      word: 'Woher?',
      meaning: 'Where from?',
      example: 'Woher kommst du?',
      pos1: 'Woher',
      pos2: 'kommst',
      pos3: 'du?',
      meaningFull: 'Where are you from?'
    },
    {
      id: 'wie',
      word: 'Wie?',
      meaning: 'How / What?',
      example: 'Wie heißen Sie?',
      pos1: 'Wie',
      pos2: 'heißen',
      pos3: 'Sie?',
      meaningFull: 'What are you called / What is your name?'
    },
    {
      id: 'wie-alt',
      word: 'Wie alt?',
      meaning: 'How old?',
      example: 'Wie alt sind Sie?',
      pos1: 'Wie alt',
      pos2: 'sind',
      pos3: 'Sie?',
      meaningFull: 'How old are you?'
    },
    {
      id: 'was',
      word: 'Was?',
      meaning: 'What?',
      example: 'Was sind deine Hobbys?',
      pos1: 'Was',
      pos2: 'sind',
      pos3: 'deine Hobbys?',
      meaningFull: 'What are your hobbies?'
    },
    {
      id: 'welche',
      word: 'Welche?',
      meaning: 'Which?',
      example: 'Welche Sprachen sprechen Sie?',
      pos1: 'Welche Sprachen',
      pos2: 'sprechen',
      pos3: 'Sie?',
      meaningFull: 'Which languages do you speak?'
    },
    {
      id: 'wie-viel',
      word: 'Wie viel?',
      meaning: 'How much / How many?',
      example: 'Wie viel kostet das?',
      pos1: 'Wie viel',
      pos2: 'kostet',
      pos3: 'das?',
      meaningFull: 'How much does that cost?'
    }
  ];

  const jaNeinQuestions = [
    {
      q: 'Haben Sie Kinder?',
      verb: 'Haben',
      subject: 'Sie',
      rest: 'Kinder?',
      meaning: 'Do you have children?',
      answer: 'Ja, ich habe zwei Kinder. / Nein, ich habe keine Kinder.'
    },
    {
      q: 'Sind Sie verheiratet?',
      verb: 'Sind',
      subject: 'Sie',
      rest: 'verheiratet?',
      meaning: 'Are you married?',
      answer: 'Ja, ich bin verheiratet. / Nein, ich bin nicht verheiratet.'
    },
    {
      q: 'Wohnst du in München?',
      verb: 'Wohnst',
      subject: 'du',
      rest: 'in München?',
      meaning: 'Do you live in Munich?',
      answer: 'Ja, ich wohne in München. / Nein, ich wohne in Berlin.'
    },
    {
      q: 'Kommen Sie aus Deutschland?',
      verb: 'Kommen',
      subject: 'Sie',
      rest: 'aus Deutschland?',
      meaning: 'Are you from Germany?',
      answer: 'Ja, ich komme aus Deutschland.'
    },
    {
      q: 'Wohnen Sie in Indonesien?',
      verb: 'Wohnen',
      subject: 'Sie',
      rest: 'in Indonesien?',
      meaning: 'Do you live in Indonesia?',
      answer: 'Nein, ich wohne in Deutschland.'
    },
    {
      q: 'Spielen Sie Fußball?',
      verb: 'Spielen',
      subject: 'Sie',
      rest: 'Fußball?',
      meaning: 'Do you play football / soccer?',
      answer: 'Ja, ich spiele Fußball!'
    },
    {
      q: 'Sprechen Sie Italienisch?',
      verb: 'Sprechen',
      subject: 'Sie',
      rest: 'Italienisch?',
      meaning: 'Do you speak Italian?',
      answer: 'Nein, ich spreche Englisch und Deutsch.'
    },
    {
      q: 'Verstehen Sie mich?',
      verb: 'Verstehen',
      subject: 'Sie',
      rest: 'mich?',
      meaning: 'Do you understand me?',
      answer: 'Ja, ich verstehe Sie gut!'
    },
    {
      q: 'Sind Sie 30 Jahre alt?',
      verb: 'Sind',
      subject: 'Sie',
      rest: '30 Jahre alt?',
      meaning: 'Are you 30 years old?',
      answer: 'Nein, ich bin 23 Jahre alt.'
    },
    {
      q: 'Haben Sie Zeit?',
      verb: 'Haben',
      subject: 'Sie',
      rest: 'Zeit?',
      meaning: 'Do you have time?',
      answer: 'Ja, ich habe Zeit!'
    }
  ];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  const currentW = wQuestions.find(item => item.id === selectedWWord) || wQuestions[0];
  const currentJaNein = jaNeinQuestions[selectedJaNeinIndex];

  return (
    <div className="space-y-6">
      {/* Friendly Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🚂 ⚓ 1️⃣ 2️⃣ 3️⃣</div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
          Lesson 8: Satzstruktur (German Sentence Structure)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          Think of a German sentence like a passenger train:  
          <strong className="text-amber-900 font-bold"> The VERB is the engine!</strong> In normal sentences and W-questions, the verb is firmly anchored in 
          <strong className="text-amber-900 font-bold"> Seat #2</strong>. In Yes/No questions, the verb leaps right to <strong className="text-rose-900 font-bold">Seat #1 at the front</strong>!
        </p>
      </div>

      {/* 3 Interactive Mode Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => {
            setActiveTab('statement');
            playChime('click');
          }}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'statement'
              ? 'bg-amber-600 text-white shadow-lg ring-3 ring-amber-300 scale-102'
              : 'bg-white text-stone-700 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span>🚂 Mode 1: Statements (Verb in Position 2)</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('w-frage');
            playChime('click');
          }}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'w-frage'
              ? 'bg-blue-600 text-white shadow-lg ring-3 ring-blue-300 scale-102'
              : 'bg-white text-stone-700 hover:bg-blue-100 border border-blue-200'
          }`}
        >
          <span>❓ Mode 2: W-Fragen (W-Questions)</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('ja-nein');
            playChime('click');
          }}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'ja-nein'
              ? 'bg-rose-600 text-white shadow-lg ring-3 ring-rose-300 scale-102'
              : 'bg-white text-stone-700 hover:bg-rose-100 border border-rose-200'
          }`}
        >
          <span>⚡ Mode 3: Ja/Nein Fragen (Verb Jumps to Pos 1!)</span>
        </button>
      </div>

      {/* MODE 1: STATEMENTS (POSITION 2 ANCHOR) */}
      {activeTab === 'statement' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <span>⚓</span>
                <span>The Golden Anchor Rule: Verb is ALWAYS in Position 2</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                No matter who sits in Position 1, the verb refuses to move from Position 2!
              </p>
            </div>

            {/* Flip button */}
            <button
              onClick={() => {
                setStatementVariant(statementVariant === 'normal' ? 'heute' : 'normal');
                playChime('click');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl text-xs font-black transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Flip with "Heute" (Today)!</span>
            </button>
          </div>

          {/* Visual Train Wagons for Statement */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block text-center">
              Look at the Position Wagons:
            </span>

            {statementVariant === 'normal' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                {/* Pos 1 */}
                <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    Position 1 (Subject)
                  </span>
                  <div className="font-mono text-2xl font-black text-sky-950">
                    Ich
                  </div>
                  <span className="text-xs text-stone-500">I (Who)</span>
                </div>

                {/* Pos 2 (VERB) */}
                <div className="p-4 rounded-2xl bg-amber-100 border-3 border-amber-500 shadow-md space-y-1 ring-2 ring-amber-300">
                  <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full flex items-center justify-center gap-1">
                    <span>⚓ Position 2 (VERB)</span>
                  </span>
                  <div className="font-mono text-2xl font-black text-amber-950">
                    wohne
                  </div>
                  <span className="text-xs font-bold text-amber-800">live (The Action)</span>
                </div>

                {/* Pos 3 */}
                <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-300 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                    Position 3 (Location)
                  </span>
                  <div className="font-mono text-2xl font-black text-stone-900">
                    in Berlin.
                  </div>
                  <span className="text-xs text-stone-500">in Berlin (Where)</span>
                </div>
              </div>
            ) : (
              /* Flipped with Heute */
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                {/* Pos 1: Heute */}
                <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-300 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    Position 1 (Time)
                  </span>
                  <div className="font-mono text-2xl font-black text-purple-950">
                    Heute
                  </div>
                  <span className="text-xs text-stone-500">Today</span>
                </div>

                {/* Pos 2: Verb */}
                <div className="p-4 rounded-2xl bg-amber-100 border-3 border-amber-500 shadow-md space-y-1 ring-2 ring-amber-300">
                  <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full flex items-center justify-center gap-1">
                    <span>⚓ Position 2 (VERB)</span>
                  </span>
                  <div className="font-mono text-2xl font-black text-amber-950">
                    bin
                  </div>
                  <span className="text-xs font-bold text-amber-800">am (STILL Pos 2!)</span>
                </div>

                {/* Pos 3: Subject */}
                <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    Position 3 (Subject)
                  </span>
                  <div className="font-mono text-2xl font-black text-sky-950">
                    ich
                  </div>
                  <span className="text-xs text-stone-500">I (moved behind verb)</span>
                </div>

                {/* Pos 4: Location */}
                <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-300 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                    Position 4 (Location)
                  </span>
                  <div className="font-mono text-2xl font-black text-stone-900">
                    in Berlin.
                  </div>
                  <span className="text-xs text-stone-500">in Berlin</span>
                </div>
              </div>
            )}

            {/* Click to listen bar */}
            <div
              onClick={() => handleSpeak(statementVariant === 'normal' ? 'Ich wohne in Berlin.' : 'Heute bin ich in Berlin.')}
              className="p-4 rounded-2xl bg-stone-900 text-white cursor-pointer hover:bg-stone-800 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-stone-400 block">Tap to Listen:</span>
                <span className="font-mono text-lg font-bold text-amber-300">
                  {statementVariant === 'normal' ? 'Ich wohne in Berlin.' : 'Heute bin ich in Berlin.'}
                </span>
                <span className="text-xs text-stone-300 block">
                  {statementVariant === 'normal' ? 'Meaning: "I live in Berlin."' : 'Meaning: "Today I am in Berlin."'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
            </div>

            {/* Another slide example: Ich bin müde */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-stone-700">Slide 5 Example: </span>
                <span className="font-mono text-stone-900 font-bold">Ich</span> (Subject) + <span className="font-mono text-amber-700 font-bold">bin</span> (Verb, Pos 2) + <span className="font-mono text-stone-800 font-bold">müde</span> (Tired) = <span className="italic">"Ich bin müde." (I am tired) 😴</span>
              </div>
              <button
                onClick={() => handleSpeak("Ich bin müde.")}
                className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg font-bold hover:bg-stone-100 flex items-center gap-1 cursor-pointer flex-shrink-0"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: W-FRAGEN (W-QUESTIONS) */}
      {activeTab === 'w-frage' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <span>❓</span>
              <span>W-Fragen: The 6 Question Detectives</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Formula: <strong>W-Word (Pos 1) + Verb (Pos 2) + Subject (Pos 3)</strong>! The verb stays in Position 2!
            </p>
          </div>

          {/* 6 W-Word Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {wQuestions.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedWWord(item.id);
                  playChime('click');
                }}
                className={`p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer ${
                  selectedWWord === item.id
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102 font-black'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-blue-50 font-bold'
                }`}
              >
                <div className="font-mono text-sm">{item.word}</div>
                <div className={`text-[10px] ${selectedWWord === item.id ? 'text-blue-100' : 'text-stone-400'}`}>
                  {item.meaning}
                </div>
              </button>
            ))}
          </div>

          {/* Visual 1-2-3 Breakdown */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block text-center">
              W-Question Train Wagons:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              {/* Pos 1 */}
              <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-300 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Position 1 (W-Word)
                </span>
                <div className="font-mono text-2xl font-black text-blue-950">
                  {currentW.pos1}
                </div>
                <span className="text-xs text-stone-500">{currentW.meaning}</span>
              </div>

              {/* Pos 2 (VERB) */}
              <div className="p-4 rounded-2xl bg-amber-100 border-3 border-amber-500 shadow-md space-y-1 ring-2 ring-amber-300">
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                  ⚓ Position 2 (VERB)
                </span>
                <div className="font-mono text-2xl font-black text-amber-950">
                  {currentW.pos2}
                </div>
                <span className="text-xs font-bold text-amber-800">Verb stays in Slot 2!</span>
              </div>

              {/* Pos 3 (Subject) */}
              <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300 space-y-1">
                <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Position 3 (Subject)
                </span>
                <div className="font-mono text-2xl font-black text-sky-950">
                  {currentW.pos3}
                </div>
                <span className="text-xs text-stone-500">Person being asked</span>
              </div>
            </div>

            {/* Click to listen bar */}
            <div
              onClick={() => handleSpeak(currentW.example)}
              className="p-4 rounded-2xl bg-stone-900 text-white cursor-pointer hover:bg-stone-800 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-stone-400 block">Tap to Listen:</span>
                <span className="font-mono text-xl font-bold text-blue-300">
                  {currentW.example}
                </span>
                <span className="text-xs text-stone-300 block">
                  Meaning: "{currentW.meaningFull}"
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: JA/NEIN FRAGEN (VERB LEAPS TO POSITION 1!) */}
      {activeTab === 'ja-nein' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-lg font-black text-rose-950 flex items-center gap-2">
              <span>⚡</span>
              <span>Ja/Nein - Fragen: The Verb Jumps to Position 1!</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Whenever a question expects a <strong>YES (Ja)</strong> or <strong>NO (Nein)</strong> answer, the verb leaps straight to the front of the line!
            </p>
          </div>

          {/* Question Picker List */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {jaNeinQuestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedJaNeinIndex(idx);
                  playChime('click');
                }}
                className={`p-2 rounded-xl text-center border-2 transition-all cursor-pointer ${
                  selectedJaNeinIndex === idx
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-rose-50 text-xs font-semibold'
                }`}
              >
                <div className="font-mono truncate">{item.verb} {item.subject}...</div>
              </button>
            ))}
          </div>

          {/* Visual 1-2-3 Breakdown for Ja/Nein */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block text-center animate-pulse">
              ⚡ Look: The Verb Leapt to Position 1!
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              {/* Pos 1 (VERB) */}
              <div className="p-4 rounded-2xl bg-rose-100 border-3 border-rose-500 shadow-lg space-y-1 ring-2 ring-rose-300">
                <span className="text-[10px] font-mono font-bold text-rose-900 bg-rose-200 px-2 py-0.5 rounded-full">
                  ⚡ Position 1 (VERB!)
                </span>
                <div className="font-mono text-2xl font-black text-rose-950">
                  {currentJaNein.verb}
                </div>
                <span className="text-xs font-bold text-rose-800">Leading the Question!</span>
              </div>

              {/* Pos 2 (Subject) */}
              <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300 space-y-1">
                <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Position 2 (Subject)
                </span>
                <div className="font-mono text-2xl font-black text-sky-950">
                  {currentJaNein.subject}
                </div>
                <span className="text-xs text-stone-500">Person</span>
              </div>

              {/* Pos 3 (Rest) */}
              <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-300 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                  Position 3 (The Object / Rest)
                </span>
                <div className="font-mono text-2xl font-black text-stone-900">
                  {currentJaNein.rest}
                </div>
                <span className="text-xs text-stone-500">Topic</span>
              </div>
            </div>

            {/* Click to listen question */}
            <div
              onClick={() => handleSpeak(currentJaNein.q)}
              className="p-4 rounded-2xl bg-stone-900 text-white cursor-pointer hover:bg-stone-800 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-stone-400 block">Question (Tap to Listen):</span>
                <span className="font-mono text-xl font-bold text-rose-300">
                  {currentJaNein.q}
                </span>
                <span className="text-xs text-stone-300 block">
                  Meaning: "{currentJaNein.meaning}"
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
            </div>

            {/* Natural Answer */}
            <div
              onClick={() => handleSpeak(currentJaNein.answer)}
              className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 cursor-pointer hover:bg-emerald-100 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-emerald-700 block">Natural Answer (Ja/Nein):</span>
                <span className="font-mono font-bold text-sm sm:text-base">
                  {currentJaNein.answer}
                </span>
              </div>
              <Volume2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            </div>
          </div>
        </div>
      )}

      {/* Slide Summary Rule Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 border-4 border-stone-800 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
          <span className="text-xl">📋</span>
          <h4 className="font-mono font-black text-amber-400 text-sm sm:text-base uppercase tracking-wider">
            Lesson 8: At a Glance Summary (Slide Reference)
          </h4>
        </div>
        <ul className="text-xs sm:text-sm text-stone-200 space-y-2 list-disc list-inside">
          <li>
            <strong className="text-amber-300">The subject conjugates the verb:</strong> The ending of the verb changes to match the person (*Ich wohne, du wohnst, Sie wohnen*).
          </li>
          <li>
            <strong className="text-amber-300">The verb is mostly in the second position:</strong> In normal statements (*Ich wohne in Berlin*) and when flipped (*Heute bin ich in Berlin*), the verb stays locked in Spot #2!
          </li>
          <li>
            <strong className="text-blue-300">Questions beginning with W-Words (Wo, Woher, Was, etc.) are W-Fragen:</strong> Here the verb is in the <strong>second place</strong> (*Wo wohnen Sie?*).
          </li>
          <li>
            <strong className="text-rose-300">Questions with answer "ja" or "nein" are Ja/Nein-Fragen:</strong> Here the verb leaps to the <strong>first place</strong> (*Haben Sie Kinder?*, *Haben Sie Zeit?*)!
          </li>
        </ul>
      </div>
    </div>
  );
}
