import React, { useState } from 'react';
import { Volume2, Sparkles, Heart, Users, ShieldCheck, Zap, ArrowRight, HelpCircle, CheckCircle2, RotateCcw, Lightbulb } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson26PossessiveAkkStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('characters');
  const [selectedChar, setSelectedChar] = useState('julia');
  const [selectedDogIdx, setSelectedDogIdx] = useState(0);

  // Exercise states
  const [exAnswers, setExAnswers] = useState({});
  const [exFeedback, setExFeedback] = useState({});

  const handlePlayAudio = (text) => {
    speakGerman(text, isSlowMode);
    playChime();
  };

  const CHARACTERS = [
    {
      id: 'julia',
      name: 'Julia (ich)',
      avatar: '👩',
      badge: 'Slides 2–7 (Verb: lieben)',
      theme: 'from-pink-600 to-rose-700',
      intro: 'Hi! Ich bin Julia.',
      verb: 'lieben (to love)',
      items: [
        {
          gender: 'Maskulin (der)',
          nom: 'Das ist mein Mann.',
          akk: 'Ich liebe meinen Mann.',
          en: 'This is my husband. I love my husband.',
          icon: '👨 💍',
          badgeColor: 'bg-amber-500 text-stone-950 font-black',
          isTransformed: true,
          note: 'der Mann -> MEINEN Mann (-en!)'
        },
        {
          gender: 'Neutral (das)',
          nom: 'Das ist mein Auto.',
          akk: 'Ich liebe mein Auto.',
          en: 'This is my car. I love my car.',
          icon: '🚗 🏎️',
          badgeColor: 'bg-emerald-600 text-white font-bold',
          isTransformed: false,
          note: 'das Auto -> mein Auto (unchanged)'
        },
        {
          gender: 'Feminin (die)',
          nom: 'Das ist meine Katze.',
          akk: 'Ich liebe meine Katze.',
          en: 'This is my cat. I love my cat.',
          icon: '🐱 🐾',
          badgeColor: 'bg-rose-600 text-white font-bold',
          isTransformed: false,
          note: 'die Katze -> meine Katze (unchanged)'
        },
        {
          gender: 'Plural (die)',
          nom: 'Das sind meine Kinder.',
          akk: 'Ich liebe meine Kinder.',
          en: 'These are my children. I love my children.',
          icon: '👧👦 ❤️',
          badgeColor: 'bg-purple-600 text-white font-bold',
          isTransformed: false,
          note: 'die Kinder -> meine Kinder (unchanged)'
        }
      ]
    },
    {
      id: 'alex',
      name: 'Alex (er)',
      avatar: '👦',
      badge: 'Slides 8–12 (Verb: mögen / mag)',
      theme: 'from-blue-600 to-indigo-700',
      intro: 'Das ist Alex.',
      verb: 'mögen (to like -> er mag)',
      items: [
        {
          gender: 'Maskulin (der)',
          nom: 'Das ist sein Hund.',
          akk: 'Er mag seinen Hund.',
          en: 'This is his dog. He likes his dog.',
          icon: '🐕 🦮',
          badgeColor: 'bg-amber-500 text-stone-950 font-black',
          isTransformed: true,
          note: 'der Hund -> SEINEN Hund (-en!)'
        },
        {
          gender: 'Neutral (das)',
          nom: 'Das ist sein Motorrad.',
          akk: 'Er mag sein Motorrad.',
          en: 'This is his bike. He likes his bike.',
          icon: '🏍️ 💨',
          badgeColor: 'bg-emerald-600 text-white font-bold',
          isTransformed: false,
          note: 'das Motorrad -> sein Motorrad (unchanged)'
        },
        {
          gender: 'Feminin (die)',
          nom: 'Das ist seine Freundin.',
          akk: 'Er mag seine Freundin.',
          en: 'This is his girlfriend. He likes his girlfriend.',
          icon: '👱‍♀️ 💖',
          badgeColor: 'bg-rose-600 text-white font-bold',
          isTransformed: false,
          note: 'die Freundin -> seine Freundin (unchanged)'
        },
        {
          gender: 'Plural (die)',
          nom: 'Das sind seine Freunde.',
          akk: 'Er mag seine Freunde.',
          en: 'These are his friends. He likes his friends.',
          icon: '👥 🤝',
          badgeColor: 'bg-purple-600 text-white font-bold',
          isTransformed: false,
          note: 'die Freunde -> seine Freunde (unchanged)'
        }
      ]
    },
    {
      id: 'sabrina',
      name: 'Sabrina (sie)',
      avatar: '👱‍♀️',
      badge: 'Slides 13–17 (Verb: finden / findet)',
      theme: 'from-teal-600 to-emerald-700',
      intro: 'Das ist Sabrina.',
      verb: 'finden (to find / think of -> sie findet)',
      items: [
        {
          gender: 'Maskulin (der)',
          nom: 'Das ist ihr Freund.',
          akk: 'Sie findet ihren Freund nett.',
          en: 'This is her boyfriend. She finds her boyfriend nice.',
          icon: '👱‍♂️ 🎧',
          badgeColor: 'bg-amber-500 text-stone-950 font-black',
          isTransformed: true,
          note: 'der Freund -> IHREN Freund (-en!)'
        },
        {
          gender: 'Neutral (das)',
          nom: 'Das ist ihr Haus.',
          akk: 'Sie findet ihr Haus schön.',
          en: 'This is her house. She finds her house beautiful.',
          icon: '🏡 🌳',
          badgeColor: 'bg-emerald-600 text-white font-bold',
          isTransformed: false,
          note: 'das Haus -> ihr Haus (unchanged)'
        },
        {
          gender: 'Feminin (die)',
          nom: 'Das ist ihre Gitarre.',
          akk: 'Sie findet ihre Gitarre super.',
          en: 'This is her guitar. She finds her guitar great.',
          icon: '🎸 🎶',
          badgeColor: 'bg-rose-600 text-white font-bold',
          isTransformed: false,
          note: 'die Gitarre -> ihre Gitarre (unchanged)'
        },
        {
          gender: 'Plural (die)',
          nom: 'Das sind ihre Nachbarn.',
          akk: 'Sie findet ihre Nachbarn freundlich.',
          en: 'These are her neighbors. She finds her neighbors friendly.',
          icon: '👫 🏡',
          badgeColor: 'bg-purple-600 text-white font-bold',
          isTransformed: false,
          note: 'die Nachbarn -> ihre Nachbarn (unchanged)'
        }
      ]
    }
  ];

  const currentChar = CHARACTERS.find(c => c.id === selectedChar) || CHARACTERS[0];

  // Slide 20 Dog Drill Data
  const DOG_DRILL = [
    { num: 1, avatar: '👩', text: 'Ich bin Maria und ich liebe meinen Hund.', en: 'I am Maria and I love my dog.', maskulinWord: 'meinen Hund' },
    { num: 2, avatar: '👦', text: 'Bist du Martin? Liebst du deinen Hund?', en: 'Are you Martin? Do you love your dog?', maskulinWord: 'deinen Hund' },
    { num: 3, avatar: '👧', text: 'Das ist Sofia. Sie liebt ihren Hund.', en: 'This is Sofia. She loves her dog.', maskulinWord: 'ihren Hund' },
    { num: 4, avatar: '👨', text: 'Das ist Peter. Er liebt seinen Hund.', en: 'This is Peter. He loves his dog.', maskulinWord: 'seinen Hund' },
    { num: 5, avatar: '👔', text: 'Sind Sie Herr Müller? Lieben Sie Ihren Hund?', en: 'Are you Herr Müller? Do you love your dog?', maskulinWord: 'Ihren Hund' },
    { num: 6, avatar: '👫', text: 'Das sind Leni und Max. Sie lieben ihren Hund.', en: 'These are Leni and Max. They love their dog.', maskulinWord: 'ihren Hund' },
    { num: 7, avatar: '👨‍👩‍👧‍👦', text: 'Wir sind die Müllers. Wir lieben unseren Hund.', en: 'We are the Müllers. We love our dog.', maskulinWord: 'unseren Hund' },
    { num: 8, avatar: '👥', text: 'Seid ihr Jonah und Ida? Liebt ihr euren Hund?', en: 'Are you Jonah and Ida? Do you love your dog?', maskulinWord: 'euren Hund' },
    { num: 9, avatar: '💼', text: 'Sind Sie Frau und Herr Schumacher? Lieben Sie Ihren Hund?', en: 'Are you Mrs. and Mr. Schumacher? Do you love your dog?', maskulinWord: 'Ihren Hund' },
  ];

  // Slide 19 Master Blackboard Table
  const MASTER_TABLE = [
    { pronoun: 'ich', mask: 'meinen', fem: 'meine', neut: 'mein', pl: 'meine', en: 'my' },
    { pronoun: 'du', mask: 'deinen', fem: 'deine', neut: 'dein', pl: 'deine', en: 'your (informal)' },
    { pronoun: 'er / es', mask: 'seinen', fem: 'seine', neut: 'sein', pl: 'seine', en: 'his / its' },
    { pronoun: 'sie (she)', mask: 'ihren', fem: 'ihre', neut: 'ihr', pl: 'ihre', en: 'her' },
    { pronoun: 'wir', mask: 'unseren', fem: 'unsere', neut: 'unser', pl: 'unsere', en: 'our' },
    { pronoun: 'ihr (you all)', mask: 'euren', fem: 'eure', neut: 'euer', pl: 'eure', en: 'your (group)', note: 'euer drops inner e -> euren!' },
    { pronoun: 'Sie / Sie', mask: 'Ihren', fem: 'Ihre', neut: 'Ihr', pl: 'Ihre', en: 'Your (formal)', note: 'Capitalized I!' },
    { pronoun: 'sie (they)', mask: 'ihren', fem: 'ihre', neut: 'ihr', pl: 'ihre', en: 'their' }
  ];

  // Classroom Exercises (Slides 21–29)
  const EXERCISES = [
    {
      id: 'ex1',
      slide: 'Slides 22–23',
      prompt: 'Er liebt ______ Eltern.',
      options: ['sein', 'seine', 'seinen'],
      correct: 'seine',
      noun: 'Eltern (die / Plural)',
      rule: 'Plural (die Eltern) always takes "-e" -> seine Eltern!',
      fullSentence: 'Er liebt seine Eltern.'
    },
    {
      id: 'ex2',
      slide: 'Slides 24–25',
      prompt: 'Heute besuchen wir ______ Opa.',
      options: ['unser', 'unsere', 'unseren'],
      correct: 'unseren',
      noun: 'Opa (der / Maskulin)',
      rule: 'Masculine object of "besuchen" (Akkusativ) takes "-en" -> unseren Opa!',
      fullSentence: 'Heute besuchen wir unseren Opa.'
    },
    {
      id: 'ex3',
      slide: 'Slides 26–27',
      prompt: 'Wie findet ihr ______ Lehrer?',
      options: ['euer', 'eure', 'euren'],
      correct: 'euren',
      noun: 'Lehrer (der / Maskulin)',
      rule: 'For "ihr", masculine Akkusativ drops inner "e" and takes "-en" -> euren Lehrer!',
      fullSentence: 'Wie findet ihr euren Lehrer?'
    },
    {
      id: 'ex4',
      slide: 'Slides 28–29',
      prompt: 'Bitte geben Sie ______ Adresse!',
      options: ['Ihr', 'Ihre', 'Ihren'],
      correct: 'Ihre',
      noun: 'Adresse (die / Feminin)',
      rule: 'Feminine object (die Adresse) takes "-e" and formal "Sie" takes capital "I" -> Ihre Adresse!',
      fullSentence: 'Bitte geben Sie Ihre Adresse!'
    }
  ];

  const handleExerciseChoice = (exId, choice, correct, sentence) => {
    setExAnswers(prev => ({ ...prev, [exId]: choice }));
    if (choice === correct) {
      setExFeedback(prev => ({ ...prev, [exId]: 'correct' }));
      playChime('success');
      speakGerman(sentence, isSlowMode);
    } else {
      setExFeedback(prev => ({ ...prev, [exId]: 'wrong' }));
      playChime('wrong');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-rose-500/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-rose-500/20 text-rose-300 border border-rose-400/40 text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              Lesson 26 Interactive Studio
            </span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs px-3 py-1 rounded-full font-semibold">
              Slide 1–29 Possessive Akkusativ
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
            Possessivartikel im Akkusativ
          </h2>
          <p className="text-rose-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Express love, likes, and opinions about your people & belongings! Master the golden rule: <span className="text-amber-300 font-extrabold">ONLY Masculine adds -EN (meinen, seinen, ihren, unseren, euren, Ihren)</span>! Feminine, Neuter, and Plural remain <span className="text-emerald-300 font-extrabold">100% identical to Nominativ</span>!
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('characters')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'characters'
                  ? 'bg-rose-500 text-rose-950 shadow-md ring-2 ring-rose-300 scale-105'
                  : 'bg-white/10 text-rose-200 hover:bg-white/20'
              }`}
            >
              <span>👥</span>
              <span>Julia, Alex & Sabrina Stories</span>
            </button>
            <button
              onClick={() => setActiveTab('dog_drill')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'dog_drill'
                  ? 'bg-rose-500 text-rose-950 shadow-md ring-2 ring-rose-300 scale-105'
                  : 'bg-white/10 text-rose-200 hover:bg-white/20'
              }`}
            >
              <span>🐕</span>
              <span>Slide 20 Dog Drill & Slide 19 Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'exercises'
                  ? 'bg-rose-500 text-rose-950 shadow-md ring-2 ring-rose-300 scale-105'
                  : 'bg-white/10 text-rose-200 hover:bg-white/20'
              }`}
            >
              <span>📝</span>
              <span>Slide 21–29 Classroom Übungen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: 3-Character Story Lab */}
      {activeTab === 'characters' && (
        <div className="space-y-6">
          {/* Character Switcher */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600" />
                  Select Story Character
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  See how each character talks about their 4 items (Masculine, Neuter, Feminine, Plural)!
                </p>
              </div>
              <span className="text-xs bg-rose-50 text-rose-800 font-semibold px-2.5 py-1 rounded-full border border-rose-200">
                3 Slide Characters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CHARACTERS.map((char) => {
                const isSelected = selectedChar === char.id;
                return (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedChar(char.id);
                      handlePlayAudio(char.intro);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 text-left ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50 shadow-md ring-2 ring-rose-400/50 scale-102'
                        : 'border-stone-200 bg-stone-50 hover:bg-rose-50/50'
                    }`}
                  >
                    <span className="text-4xl">{char.avatar}</span>
                    <div>
                      <h4 className="font-extrabold text-base text-stone-900">{char.name}</h4>
                      <p className="text-xs text-rose-700 font-semibold">{char.badge}</p>
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5">Verb: {char.verb}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Character Banner */}
          <div className={`rounded-3xl p-5 sm:p-6 text-white shadow-lg bg-gradient-to-r ${currentChar.theme} flex items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl bg-white/20 p-3 rounded-2xl backdrop-blur-xs">
                {currentChar.avatar}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black">{currentChar.name}</h3>
                <p className="text-white/90 text-sm font-medium italic">"{currentChar.intro}"</p>
              </div>
            </div>

            <button
              onClick={() => handlePlayAudio(currentChar.intro)}
              className="bg-white text-stone-900 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-rose-100 transition-colors shadow-sm flex items-center gap-2 shrink-0"
            >
              <Volume2 className="w-4 h-4 text-rose-700" />
              <span>Listen</span>
            </button>
          </div>

          {/* 4 Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentChar.items.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-5 border-2 shadow-sm space-y-4 transition-all relative overflow-hidden ${
                  item.isTransformed
                    ? 'border-amber-400 bg-amber-50/70 text-amber-950 ring-2 ring-amber-300/40'
                    : 'border-stone-200 bg-white text-stone-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-stone-500">
                        {item.gender}
                      </span>
                      <h4 className="font-black text-lg text-stone-900">{item.note}</h4>
                    </div>
                  </div>

                  {item.isTransformed ? (
                    <span className="text-xs bg-amber-500 text-stone-950 font-black px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      -EN Shift!
                    </span>
                  ) : (
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Unchanged
                    </span>
                  )}
                </div>

                {/* Sentence Comparison Box */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="text-xs font-semibold text-stone-400">
                    Nominativ: <span className="text-stone-700">{item.nom}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                        Akkusativ Object
                      </span>
                      <p className="font-extrabold text-base sm:text-lg text-stone-900 mt-1">
                        {item.akk}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(`${item.nom} ${item.akk}`)}
                      className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl transition-colors shrink-0"
                    >
                      <Volume2 className="w-4 h-4 text-rose-700" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-500 italic">
                    "{item.en}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Slide 20 Dog Drill & Slide 19 Matrix */}
      {activeTab === 'dog_drill' && (
        <div className="space-y-8">
          {/* Slide 20: The Famous Dog Drill */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-amber-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🐕</span>
                <div>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Slide 20 Master Drill
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">
                    The 9-Sentence Dog Workout (der Hund $\rightarrow$ -EN)
                  </h3>
                </div>
              </div>

              <button
                onClick={() => handlePlayAudio("Ich liebe meinen Hund. Liebst du deinen Hund? Sie liebt ihren Hund. Er liebt seinen Hund. Lieben Sie Ihren Hund? Sie lieben ihren Hund. Wir lieben unseren Hund. Liebt ihr euren Hund? Lieben Sie Ihren Hund?")}
                className="bg-amber-500 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-sm flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play All 9 Dogs</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Because <strong>der Hund</strong> is masculine, every single person who loves their dog takes the <span className="font-bold text-amber-900">-en</span> ending in Akkusativ! Tap any sentence below to practice:
            </p>

            {/* 9 Dogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {DOG_DRILL.map((dog, idx) => {
                const isSelected = selectedDogIdx === idx;
                return (
                  <div
                    key={dog.num}
                    onClick={() => {
                      setSelectedDogIdx(idx);
                      handlePlayAudio(dog.text);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-300'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{dog.avatar}</span>
                      <span className="text-[11px] font-mono font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-md">
                        {dog.maskulinWord}
                      </span>
                    </div>

                    <div>
                      <p className="font-extrabold text-xs sm:text-sm text-stone-900 leading-snug">
                        {dog.text}
                      </p>
                      <p className="text-[11px] text-stone-500 italic mt-0.5">
                        {dog.en}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <span className="p-1 text-amber-700">
                        <Volume2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide 19: Blackboard Table */}
          <div className="bg-[#1b261e] text-white rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-900/40 relative">
            <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-mono tracking-tight">
                    Slide 19: At a glance (Possessiv im Akkusativ)
                  </h3>
                  <p className="text-xs text-stone-300">
                    Tap any word below to hear live German pronunciation!
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="border-b-2 border-white/30 text-amber-200 text-xs sm:text-sm font-mono uppercase tracking-wider">
                    <th className="py-2.5 px-3">Pronomen</th>
                    <th className="py-2.5 px-3 text-amber-300 font-black">MASK. (-en)</th>
                    <th className="py-2.5 px-3 text-rose-300">FEM. (-e)</th>
                    <th className="py-2.5 px-3 text-emerald-300">NEUT. (base)</th>
                    <th className="py-2.5 px-3 text-purple-300">PL. (-e)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-sans">
                  {MASTER_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-bold text-amber-100 flex flex-col">
                        <span>{row.pronoun}</span>
                        <span className="text-[10px] text-stone-400 font-normal">{row.en}</span>
                      </td>

                      {/* MASKULIN (-en) */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.mask)}
                          className="font-black text-amber-300 bg-amber-950/60 px-2 py-1 rounded-lg ring-1 ring-amber-400 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <span>{row.mask}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
                        </button>
                      </td>

                      {/* FEMININ */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.fem)}
                          className="font-bold text-rose-300 hover:text-white px-2 py-1 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <span>{row.fem}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>

                      {/* NEUTRAL */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.neut)}
                          className="font-bold text-emerald-300 hover:text-white px-2 py-1 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <span>{row.neut}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>

                      {/* PLURAL */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handlePlayAudio(row.pl)}
                          className="font-bold text-purple-300 hover:text-white px-2 py-1 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <span>{row.pl}</span>
                          <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between text-xs text-stone-300 gap-2">
              <span className="text-amber-300 font-bold">
                ⚡ Only Column 1 (Maskulin) transforms to -EN!
              </span>
              <span className="text-emerald-300">
                ✓ Columns 2, 3, and 4 are 100% identical to Nominativ!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Classroom Übung Lab (Slides 21–29) */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-rose-100 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="bg-rose-100 text-rose-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  Slides 21–29 Classroom Übungen
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  Fill-in-the-Blank Classroom Lab
                </h3>
              </div>
              <span className="text-3xl">📝</span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              Solve the exact 4 test problems from the classroom slides. Choose the correct ending and listen to the full sentence:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXERCISES.map((ex) => {
                const userChoice = exAnswers[ex.id];
                const feedback = exFeedback[ex.id];

                return (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl border-2 border-stone-200 bg-stone-50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-stone-200 text-stone-700 font-bold px-2 py-0.5 rounded">
                        {ex.slide}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        Noun: <strong>{ex.noun}</strong>
                      </span>
                    </div>

                    <h4 className="font-black text-lg text-stone-900">
                      {ex.prompt}
                    </h4>

                    {/* Options */}
                    <div className="flex gap-2">
                      {ex.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleExerciseChoice(ex.id, opt, ex.correct, ex.fullSentence)}
                          className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all border-2 ${
                            userChoice === opt
                              ? opt === ex.correct
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                              : 'bg-white text-stone-800 border-stone-300 hover:border-rose-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {/* Feedback */}
                    {feedback && (
                      <div className={`p-3 rounded-xl text-xs space-y-1 ${
                        feedback === 'correct'
                          ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                          : 'bg-rose-100 text-rose-950 border border-rose-300'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">
                            {feedback === 'correct' ? '✓ Correct!' : '❌ Try again!'}
                          </span>
                          <button
                            onClick={() => handlePlayAudio(ex.fullSentence)}
                            className="p-1 bg-white rounded text-stone-800 shadow-xs"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p>{ex.rule}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
