import React, { useState } from 'react';
import { Volume2, Sparkles, UserCheck, Users, HelpCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson7DialogueExplorer({ isSlowMode }) {
  const [mode, setMode] = useState('formal'); // 'formal' or 'informal'
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const dialogueList = [
    {
      id: 'name',
      topic: '1. Name',
      icon: '🏷️',
      formalQ: 'Wie heißen Sie?',
      informalQ: 'Wie heißt du?',
      meaningQ: 'What is your name?',
      formalBreakdown: 'heißen + Sie (polite -en ending)',
      informalBreakdown: 'heißt + du (friendly -t ending)',
      answer: 'Ich heiße Monika.',
      answerMeaning: 'I am called Monika.'
    },
    {
      id: 'family-name',
      topic: '2. Last Name / Surname',
      icon: '📜',
      formalQ: 'Wie ist Ihr Familienname?',
      informalQ: 'Wie ist dein Familienname?',
      meaningQ: 'What is your last name?',
      formalBreakdown: 'Ihr = Your (capital I, formal respect)',
      informalBreakdown: 'dein = your (casual & friendly)',
      answer: 'Mein Familienname ist Schmidt.',
      answerMeaning: 'My family name is Schmidt.'
    },
    {
      id: 'origin',
      topic: '3. Country of Origin',
      icon: '🌍',
      formalQ: 'Woher kommen Sie?',
      informalQ: 'Woher kommst du?',
      meaningQ: 'Where are you from?',
      formalBreakdown: 'kommen + Sie (smooth -en)',
      informalBreakdown: 'kommst + du (adds spicy -st)',
      answer: 'Ich komme aus Deutschland.',
      answerMeaning: 'I come from Germany.'
    },
    {
      id: 'residence',
      topic: '4. City of Residence',
      icon: '🏡',
      formalQ: 'Wo wohnen Sie?',
      informalQ: 'Wo wohnst du?',
      meaningQ: 'Where do you live?',
      formalBreakdown: 'wohnen + Sie (smooth -en)',
      informalBreakdown: 'wohnst + du (adds spicy -st)',
      answer: 'Ich wohne in Berlin.',
      answerMeaning: 'I live in Berlin.'
    },
    {
      id: 'age',
      topic: '5. Age',
      icon: '🎂',
      formalQ: 'Wie alt sind Sie?',
      informalQ: 'Wie alt bist du?',
      meaningQ: 'How old are you?',
      formalBreakdown: 'sind + Sie (are you - formal)',
      informalBreakdown: 'bist + du (are you - friendly)',
      answer: 'Ich bin 23 Jahre alt.',
      answerMeaning: 'I am 23 years old.'
    },
    {
      id: 'languages',
      topic: '6. Languages Spoken',
      icon: '🗣️',
      formalQ: 'Welche Sprachen sprechen Sie?',
      informalQ: 'Welche Sprachen sprichst du?',
      meaningQ: 'Which languages do you speak?',
      formalBreakdown: 'sprechen + Sie (standard verb)',
      informalBreakdown: 'sprichst + du (vowel shift e -> i + st)',
      answer: 'Ich spreche Deutsch und Englisch.',
      answerMeaning: 'I speak German and English.'
    },
    {
      id: 'job',
      topic: '7. Profession / Career',
      icon: '💼',
      formalQ: 'Was machen Sie beruflich?',
      informalQ: 'Was machst du beruflich?',
      meaningQ: 'What do you do for a living?',
      formalBreakdown: 'machen + Sie (standard verb)',
      informalBreakdown: 'machst + du (adds spicy -st)',
      answer: 'Ich bin Lehrerin.',
      answerMeaning: 'I am a teacher (female).'
    },
    {
      id: 'hobbies',
      topic: '8. Free Time / Hobbies',
      icon: '📺 🎵',
      formalQ: 'Was sind Ihre Hobbys?',
      informalQ: 'Was sind deine Hobbys?',
      meaningQ: 'What are your hobbies?',
      formalBreakdown: 'Ihre = Your formal (plural Hobbys)',
      informalBreakdown: 'deine = your friendly (plural Hobbys)',
      answer: 'Meine Hobbys sind fernsehen und Musik hören.',
      answerMeaning: 'My hobbies are watching TV and listening to music.'
    },
    {
      id: 'marriage',
      topic: '9. Marital Status',
      icon: '💍',
      formalQ: 'Sind Sie verheiratet?',
      informalQ: 'Bist du verheiratet?',
      meaningQ: 'Are you married?',
      formalBreakdown: 'Sind Sie (formal)',
      informalBreakdown: 'Bist du (friendly)',
      answer: 'Ja, ich bin verheiratet. / Nein, ich bin nicht verheiratet.',
      answerMeaning: 'Yes, I am married. / No, I am not married.'
    },
    {
      id: 'children',
      topic: '10. Children',
      icon: '👶 👶',
      formalQ: 'Haben Sie Kinder?',
      informalQ: 'Hast du Kinder?',
      meaningQ: 'Do you have children?',
      formalBreakdown: 'Haben Sie (formal full verb)',
      informalBreakdown: 'Hast du (casual short form)',
      answer: 'Ja, ich habe zwei Kinder. / Nein, ich habe keine Kinder.',
      answerMeaning: 'Yes, I have two children. / No, I have no children.'
    }
  ];

  const currentDialogue = dialogueList[activeItemIndex];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-6">
      {/* Friendly Banner */}
      <div className="bg-gradient-to-r from-teal-100 via-emerald-50 to-cyan-100 border-2 border-teal-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🤝 💬 🎩 👕</div>
        <h2 className="text-2xl sm:text-3xl font-black text-teal-950">
          Lesson 7: Jemanden kennenlernen (Getting to Know Someone)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          Learn how to ask questions and have a real German conversation! Discover the golden secret of German respect:  
          when to use <strong className="text-teal-900 font-bold">"Sie" (Formal: Strangers & Officials)</strong> versus <strong className="text-orange-900 font-bold">"du" (Informal: Friends & Family)</strong>.
        </p>
      </div>

      {/* Mode Switcher: Formal vs Informal */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-stone-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-stone-500 uppercase tracking-wider">
              Choose Who You Are Talking To:
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setMode('formal');
                playChime('click');
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'formal'
                  ? 'bg-teal-700 text-white shadow-lg ring-3 ring-teal-300 scale-102'
                  : 'bg-stone-100 text-stone-700 hover:bg-teal-100'
              }`}
            >
              <span>🎩</span>
              <span>Formal "Sie" (Strangers & Elders)</span>
            </button>

            <button
              onClick={() => {
                setMode('informal');
                playChime('click');
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'informal'
                  ? 'bg-amber-600 text-white shadow-lg ring-3 ring-amber-300 scale-102'
                  : 'bg-stone-100 text-stone-700 hover:bg-amber-100'
              }`}
            >
              <span>👕</span>
              <span>Casual "du" (Friends & Family)</span>
            </button>
          </div>
        </div>

        {/* Explain the active mode simply */}
        <div className={`mt-3 p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-colors ${
          mode === 'formal'
            ? 'bg-teal-50 border-teal-200 text-teal-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          <span className="text-2xl flex-shrink-0">
            {mode === 'formal' ? '🎩' : '👕'}
          </span>
          <div>
            <strong className="block font-black text-sm">
              {mode === 'formal' ? 'Formal "Sie" Mode Active (Strangers & Official Situations)' : 'Informal "du" Mode Active (Friends, Family & Kids)'}
            </strong>
            <p className="mt-0.5 text-stone-700">
              {mode === 'formal'
                ? 'Use "Sie" when speaking to people you do not know yet, elders, bosses, bank staff, doctors, or police. The verb ends cleanly in "-en" (heißen Sie, kommen Sie, wohnen Sie)!'
                : 'Use "du" when chatting with your close pals, brothers, sisters, classmates, or little children. The verb takes the snappy "-st" ending (heißt du, kommst du, wohnst du)!'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Dialogue Card & Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Topic Selector Buttons */}
        <div className="lg:col-span-4 space-y-1.5">
          <div className="text-xs font-black uppercase text-stone-500 tracking-wider px-2 pb-1">
            Pick a Conversation Topic:
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
            {dialogueList.map((item, index) => {
              const isSelected = activeItemIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItemIndex(index);
                    playChime('click');
                  }}
                  className={`p-3 rounded-2xl text-left transition-all border-2 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? mode === 'formal'
                        ? 'bg-teal-800 text-white border-teal-900 shadow-md scale-101'
                        : 'bg-amber-600 text-white border-amber-700 shadow-md scale-101'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs sm:text-sm font-bold">{item.topic}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-20'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Live Interactive Speech Bubble Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-stone-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentDialogue.icon}</span>
                <h3 className="text-lg font-black text-stone-900">
                  {currentDialogue.topic}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                mode === 'formal'
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {mode === 'formal' ? 'Formal "Sie"' : 'Informal "du"'}
              </span>
            </div>

            {/* Question Speech Bubble (Person Asking) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                {mode === 'formal' ? '👔 Question to a Stranger / Elder:' : '🧢 Question to a Friend / Pal:'}
              </span>

              <div
                onClick={() => handleSpeak(mode === 'formal' ? currentDialogue.formalQ : currentDialogue.informalQ)}
                className={`p-5 rounded-3xl border-3 cursor-pointer transition-all hover:shadow-md flex items-center justify-between group ${
                  mode === 'formal'
                    ? 'bg-teal-50 border-teal-300 hover:bg-teal-100/70'
                    : 'bg-amber-50 border-amber-300 hover:bg-amber-100/70'
                }`}
              >
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-stone-900 group-hover:text-teal-900 flex items-center gap-2">
                    <span>{mode === 'formal' ? currentDialogue.formalQ : currentDialogue.informalQ}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-600 mt-1">
                    Meaning: "{currentDialogue.meaningQ}"
                  </div>
                  <div className="text-[11px] font-bold text-stone-500 mt-1 italic">
                    💡 Rule: {mode === 'formal' ? currentDialogue.formalBreakdown : currentDialogue.informalBreakdown}
                  </div>
                </div>

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs flex-shrink-0 ml-3 transition-transform group-hover:scale-110 ${
                  mode === 'formal' ? 'bg-teal-700 text-white' : 'bg-amber-600 text-white'
                }`}>
                  <Volume2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Answer Speech Bubble (Person Responding) */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                🗣️ The Natural German Answer:
              </span>

              <div
                onClick={() => handleSpeak(currentDialogue.answer)}
                className="p-5 rounded-3xl bg-stone-900 text-white border-3 border-stone-800 cursor-pointer transition-all hover:bg-stone-800 hover:shadow-md flex items-center justify-between group"
              >
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-amber-300 group-hover:text-amber-200">
                    {currentDialogue.answer}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-300 mt-1">
                    Meaning: "{currentDialogue.answerMeaning}"
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-xs flex-shrink-0 ml-3 transition-transform group-hover:scale-110">
                  <Volume2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Side-by-Side Quick Flip Comparison */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-700">Quick Compare:</span>
                <span className="font-mono text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-bold">
                  {currentDialogue.formalQ}
                </span>
                <span className="text-stone-400">vs</span>
                <span className="font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                  {currentDialogue.informalQ}
                </span>
              </div>

              <button
                onClick={() => {
                  setMode(mode === 'formal' ? 'informal' : 'formal');
                  playChime('click');
                }}
                className="text-xs font-black text-indigo-700 hover:text-indigo-800 cursor-pointer underline flex-shrink-0"
              >
                Switch to {mode === 'formal' ? '"du"' : '"Sie"'} Mode 🔄
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 13 Exact Rule Summary Chalkboard */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 border-4 border-stone-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h4 className="font-mono font-black text-amber-400 text-base uppercase tracking-wider">
              Exact Slide Rule: "Sie" vs "du"
            </h4>
          </div>
          <span className="text-xs text-stone-400 font-mono">Slide 13 Reference</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sie Box */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎩</span>
              <div>
                <span className="font-mono font-black text-teal-300 text-lg">Sie</span>
                <span className="text-stone-400 text-xs block">You (formal)</span>
              </div>
            </div>
            <ul className="text-xs sm:text-sm text-stone-200 space-y-1.5 pt-2 list-disc list-inside">
              <li><strong className="text-white">Strangers</strong> (people you don't know)</li>
              <li><strong className="text-white">Official situations</strong> (offices, doctors, banks, police)</li>
              <li>Verb ending is usually smooth <strong className="text-teal-300">-en</strong> (heißen Sie, kommen Sie, wohnen Sie)</li>
              <li>Your = <strong className="text-teal-300">Ihr / Ihre</strong></li>
            </ul>
          </div>

          {/* du Box */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👕</span>
              <div>
                <span className="font-mono font-black text-amber-300 text-lg">du</span>
                <span className="text-stone-400 text-xs block">You (informal)</span>
              </div>
            </div>
            <ul className="text-xs sm:text-sm text-stone-200 space-y-1.5 pt-2 list-disc list-inside">
              <li><strong className="text-white">Friends</strong> (classmates, pals)</li>
              <li><strong className="text-white">Family</strong> (parents, siblings)</li>
              <li><strong className="text-white">Acquaintances & Children</strong></li>
              <li>Verb ending is usually spicy <strong className="text-amber-300">-st</strong> (heißt du, kommst du, wohnst du)</li>
              <li>Your = <strong className="text-amber-300">dein / deine</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
