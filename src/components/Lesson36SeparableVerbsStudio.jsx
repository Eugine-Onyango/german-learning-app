import React, { useState } from 'react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson36SeparableVerbsStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('rocket'); // 'rocket' | 'verbs' | 'puzzle'
  const [selectedVerbId, setSelectedVerbId] = useState('aufstehen');
  const [sentenceType, setSentenceType] = useState('statement'); // 'statement' | 'wfrage' | 'yesno' | 'modal'
  const [activeFilter, setActiveFilter] = useState('all');

  const VERBS_DATA = [
    {
      id: 'aufstehen',
      prefix: 'auf',
      base: 'stehen',
      infinitive: 'aufstehen',
      meaning: 'to get up / wake up',
      icon: '⏰',
      category: 'routine',
      isIrregular: false,
      example: 'Ich stehe um 6 Uhr auf.',
      exampleEn: 'I get up at 6 o\'clock.',
      modalExample: 'Wann willst du aufstehen?',
      modalExampleEn: 'When do you want to get up?',
      questionExample: 'Stehst du um 6 Uhr auf?',
      questionExampleEn: 'Do you get up at 6 o\'clock?',
      wQuestionExample: 'Wann stehst du auf?',
      wQuestionExampleEn: 'When do you get up?',
      conjugation: {
        ich: 'stehe ... auf',
        du: 'stehst ... auf',
        er_sie_es: 'steht ... auf',
        wir: 'stehen ... auf',
        ihr: 'steht ... auf',
        Sie_sie: 'stehen ... auf'
      },
      tip: 'stehen (to stand) + auf (up) = to stand up / get out of bed in the morning!'
    },
    {
      id: 'losgehen',
      prefix: 'los',
      base: 'gehen',
      infinitive: 'losgehen',
      meaning: 'to set off / get going',
      icon: '🚶‍♂️',
      category: 'movement',
      isIrregular: false,
      example: 'Peter geht um 9 Uhr los.',
      exampleEn: 'Peter sets off at 9 o\'clock.',
      modalExample: 'Wir müssen jetzt losgehen.',
      modalExampleEn: 'We have to set off now.',
      questionExample: 'Geht Peter um 9 Uhr los?',
      questionExampleEn: 'Does Peter set off at 9 o\'clock?',
      wQuestionExample: 'Wann geht Peter los?',
      wQuestionExampleEn: 'When does Peter set off?',
      conjugation: {
        ich: 'gehe ... los',
        du: 'gehst ... los',
        er_sie_es: 'geht ... los',
        wir: 'gehen ... los',
        ihr: 'geht ... los',
        Sie_sie: 'gehen ... los'
      },
      tip: 'gehen (to go) + los (away/off) = to head out or set off on your way!'
    },
    {
      id: 'mitkommen',
      prefix: 'mit',
      base: 'kommen',
      infinitive: 'mitkommen',
      meaning: 'to come along / join',
      icon: '👫',
      category: 'social',
      isIrregular: false,
      example: 'Wir gehen zur Schule. Kommst du mit?',
      exampleEn: 'We are going to school. Are you coming along?',
      modalExample: 'Kannst du heute mitkommen?',
      modalExampleEn: 'Can you come along today?',
      questionExample: 'Kommst du mit?',
      questionExampleEn: 'Are you coming along?',
      wQuestionExample: 'Wer kommt mit?',
      wQuestionExampleEn: 'Who is coming along?',
      conjugation: {
        ich: 'komme ... mit',
        du: 'kommst ... mit',
        er_sie_es: 'kommt ... mit',
        wir: 'kommen ... mit',
        ihr: 'kommt ... mit',
        Sie_sie: 'kommen ... mit'
      },
      tip: 'kommen (come) + mit (with) = come with us / tag along!'
    },
    {
      id: 'abholen',
      prefix: 'ab',
      base: 'holen',
      infinitive: 'abholen',
      meaning: 'to pick someone/something up',
      icon: '🚗',
      category: 'routine',
      isIrregular: false,
      example: 'Ich hole dich um 18 Uhr ab.',
      exampleEn: 'I will pick you up at 6 p.m.',
      modalExample: 'Kannst du mich um 18 Uhr abholen?',
      modalExampleEn: 'Can you pick me up at 6 p.m.?',
      questionExample: 'Holst du mich vom Bahnhof ab?',
      questionExampleEn: 'Are you picking me up from the train station?',
      wQuestionExample: 'Wann holst du mich ab?',
      wQuestionExampleEn: 'When are you picking me up?',
      conjugation: {
        ich: 'hole ... ab',
        du: 'holst ... ab',
        er_sie_es: 'holt ... ab',
        wir: 'holen ... ab',
        ihr: 'holt ... ab',
        Sie_sie: 'holen ... ab'
      },
      tip: 'holen (to fetch) + ab (from a spot) = to pick up a passenger, parcel, or friend!'
    },
    {
      id: 'abfahren',
      prefix: 'ab',
      base: 'fahren',
      infinitive: 'abfahren',
      meaning: 'to depart / leave (vehicle)',
      icon: '🚆',
      category: 'travel',
      isIrregular: true,
      vowelChange: 'a ➔ ä (du fährst, er fährt)',
      example: 'Der Zug fährt um 7 Uhr ab.',
      exampleEn: 'The train leaves at 7 o\'clock.',
      modalExample: 'Der Bus muss pünktlich abfahren.',
      modalExampleEn: 'The bus must depart on time.',
      questionExample: 'Fährt der Zug um 7 Uhr ab?',
      questionExampleEn: 'Does the train leave at 7 o\'clock?',
      wQuestionExample: 'Wann fährt der Bus ab?',
      wQuestionExampleEn: 'When does the bus leave?',
      conjugation: {
        ich: 'fahre ... ab',
        du: 'fährst ... ab (ä!)',
        er_sie_es: 'fährt ... ab (ä!)',
        wir: 'fahren ... ab',
        ihr: 'fahrt ... ab',
        Sie_sie: 'fahren ... ab'
      },
      tip: 'fahren (to drive) + ab (away) = to pull away/depart! Notice the vowel shift: er fährt ab!'
    },
    {
      id: 'ankommen',
      prefix: 'an',
      base: 'kommen',
      infinitive: 'ankommen',
      meaning: 'to arrive',
      icon: '🚏',
      category: 'travel',
      isIrregular: false,
      example: 'Der Bus kommt um 7 Uhr an.',
      exampleEn: 'The bus arrives at 7 o\'clock.',
      modalExample: 'Wir wollen um 12 Uhr ankommen.',
      modalExampleEn: 'We want to arrive at 12 o\'clock.',
      questionExample: 'Kommt der Bus pünktlich an?',
      questionExampleEn: 'Does the bus arrive on time?',
      wQuestionExample: 'Wann kommen wir an?',
      wQuestionExampleEn: 'When do we arrive?',
      conjugation: {
        ich: 'komme ... an',
        du: 'kommst ... an',
        er_sie_es: 'kommt ... an',
        wir: 'kommen ... an',
        ihr: 'kommt ... an',
        Sie_sie: 'kommen ... an'
      },
      tip: 'kommen (come) + an (at destination) = to arrive!'
    },
    {
      id: 'anfangen',
      prefix: 'an',
      base: 'fangen',
      infinitive: 'anfangen',
      meaning: 'to begin / start',
      icon: '🎓',
      category: 'routine',
      isIrregular: true,
      vowelChange: 'a ➔ ä (du fängst, er fängt)',
      example: 'Der Unterricht fängt um 13 Uhr an.',
      exampleEn: 'The class begins at 1 o\'clock.',
      modalExample: 'Wann soll das Spiel anfangen?',
      modalExampleEn: 'When is the match supposed to start?',
      questionExample: 'Fängt der Film jetzt an?',
      questionExampleEn: 'Is the movie starting now?',
      wQuestionExample: 'Wann fängt der Kurs an?',
      wQuestionExampleEn: 'When does the course start?',
      conjugation: {
        ich: 'fange ... an',
        du: 'fängst ... an (ä!)',
        er_sie_es: 'fängt ... an (ä!)',
        wir: 'fangen ... an',
        ihr: 'fangt ... an',
        Sie_sie: 'fangen ... an'
      },
      tip: 'an + fangen = to start/commence! Notice: er fängt an!'
    },
    {
      id: 'einkaufen',
      prefix: 'ein',
      base: 'kaufen',
      infinitive: 'einkaufen',
      meaning: 'to shop (groceries / general shopping)',
      icon: '🛒',
      category: 'shopping',
      isIrregular: false,
      example: 'Am Wochenende kaufen wir in der Stadt ein.',
      exampleEn: 'On the weekend we shop in the city.',
      modalExample: 'Ich möchte heute im Supermarkt einkaufen.',
      modalExampleEn: 'I would like to shop at the supermarket today.',
      questionExample: 'Kaufst du heute ein?',
      questionExampleEn: 'Are you shopping today?',
      wQuestionExample: 'Wo kaufst du ein?',
      wQuestionExampleEn: 'Where do you shop?',
      conjugation: {
        ich: 'kaufe ... ein',
        du: 'kaufst ... ein',
        er_sie_es: 'kauft ... ein',
        wir: 'kaufen ... ein',
        ihr: 'kauft ... ein',
        Sie_sie: 'kaufen ... ein'
      },
      tip: 'kaufen (to buy an item) vs. einkaufen (to go shopping / supermarket run)!'
    },
    {
      id: 'fernsehen',
      prefix: 'fern',
      base: 'sehen',
      infinitive: 'fernsehen',
      meaning: 'to watch TV',
      icon: '📺',
      category: 'leisure',
      isIrregular: true,
      vowelChange: 'e ➔ ie (du siehst, er sieht)',
      example: 'Peter und Maria sehen am Abend immer fern.',
      exampleEn: 'Peter and Maria always watch TV in the evening.',
      modalExample: 'Darf ich heute fernsehen?',
      modalExampleEn: 'May I watch TV today?',
      questionExample: 'Siehst du gern fern?',
      questionExampleEn: 'Do you like watching TV?',
      wQuestionExample: 'Wie oft siehst du fern?',
      wQuestionExampleEn: 'How often do you watch TV?',
      conjugation: {
        ich: 'sehe ... fern',
        du: 'siehst ... fern (ie!)',
        er_sie_es: 'sieht ... fern (ie!)',
        wir: 'sehen ... fern',
        ihr: 'seht ... fern',
        Sie_sie: 'sehen ... fern'
      },
      tip: 'fern (far away) + sehen (to see) = watching television from far away! Notice: du siehst fern!'
    },
    {
      id: 'anrufen',
      prefix: 'an',
      base: 'rufen',
      infinitive: 'anrufen',
      meaning: 'to call on the phone',
      icon: '📞',
      category: 'communication',
      isIrregular: false,
      example: 'Ich rufe dich später an.',
      exampleEn: 'I will call you later.',
      modalExample: 'Kannst du mich heute Abend anrufen?',
      modalExampleEn: 'Can you call me tonight?',
      questionExample: 'Rufst du deine Mutter an?',
      questionExampleEn: 'Are you calling your mother?',
      wQuestionExample: 'Wann rufst du mich an?',
      wQuestionExampleEn: 'When will you call me?',
      conjugation: {
        ich: 'rufe ... an',
        du: 'rufst ... an',
        er_sie_es: 'ruft ... an',
        wir: 'rufen ... an',
        ihr: 'ruft ... an',
        Sie_sie: 'rufen ... an'
      },
      tip: 'rufen (to yell/call out) + an = to place a telephone call!'
    },
    {
      id: 'einladen',
      prefix: 'ein',
      base: 'laden',
      infinitive: 'einladen',
      meaning: 'to invite',
      icon: '💌',
      category: 'social',
      isIrregular: true,
      vowelChange: 'a ➔ ä (du lädst, er lädt)',
      example: 'Lädst du mich zu deiner Hochzeit ein?',
      exampleEn: 'Will you invite me to your wedding?',
      modalExample: 'Ich möchte alle meine Freunde einladen.',
      modalExampleEn: 'I would like to invite all my friends.',
      questionExample: 'Lädst du Peter zur Party ein?',
      questionExampleEn: 'Are you inviting Peter to the party?',
      wQuestionExample: 'Wen lädst du ein?',
      wQuestionExampleEn: 'Whom are you inviting?',
      conjugation: {
        ich: 'lade ... ein',
        du: 'lädst ... ein (ä!)',
        er_sie_es: 'lädt ... ein (ä!)',
        wir: 'laden ... ein',
        ihr: 'ladet ... ein',
        Sie_sie: 'laden ... ein'
      },
      tip: 'ein + laden = to invite someone! Notice: du lädst ein, er lädt ein!'
    },
    {
      id: 'zumachen',
      prefix: 'zu',
      base: 'machen',
      infinitive: 'zumachen',
      meaning: 'to close / shut',
      icon: '🚪',
      category: 'routine',
      isIrregular: false,
      example: 'Mach bitte die Tür zu.',
      exampleEn: 'Please close the door.',
      modalExample: 'Kannst du bitte das Fenster zumachen?',
      modalExampleEn: 'Can you please close the window?',
      questionExample: 'Machst du das Fenster zu?',
      questionExampleEn: 'Are you closing the window?',
      wQuestionExample: 'Warum machst du die Tür zu?',
      wQuestionExampleEn: 'Why are you closing the door?',
      conjugation: {
        ich: 'mache ... zu',
        du: 'machst ... zu',
        er_sie_es: 'macht ... zu',
        wir: 'machen ... zu',
        ihr: 'macht ... zu',
        Sie_sie: 'machen ... zu'
      },
      tip: 'zu (closed) + machen (make) = to shut / close (doors, windows, books, eyes)!'
    },
    {
      id: 'mitbringen',
      prefix: 'mit',
      base: 'bringen',
      infinitive: 'mitbringen',
      meaning: 'to bring along / bring with',
      icon: '🥛',
      category: 'routine',
      isIrregular: false,
      example: 'Bringst du bitte Milch mit?',
      exampleEn: 'Will you please bring milk with you?',
      modalExample: 'Kannst du Kuchen mitbringen?',
      modalExampleEn: 'Can you bring cake along?',
      questionExample: 'Bringst du deine Freunde mit?',
      questionExampleEn: 'Are you bringing your friends along?',
      wQuestionExample: 'Was bringst du mit?',
      wQuestionExampleEn: 'What are you bringing along?',
      conjugation: {
        ich: 'bringe ... mit',
        du: 'bringst ... mit',
        er_sie_es: 'bringt ... mit',
        wir: 'bringen ... mit',
        ihr: 'bringt ... mit',
        Sie_sie: 'bringen ... mit'
      },
      tip: 'bringen (to bring) + mit (along) = to bring along on your return!'
    },
    {
      id: 'anziehen',
      prefix: 'an',
      base: 'ziehen',
      infinitive: 'anziehen',
      meaning: 'to put on (clothes)',
      icon: '🧥',
      category: 'routine',
      isIrregular: false,
      example: 'Ich ziehe mir eine Jacke an.',
      exampleEn: 'I am putting on a jacket.',
      modalExample: 'Du musst warme Kleidung anziehen.',
      modalExampleEn: 'You must put on warm clothes.',
      questionExample: 'Ziehste du die Jacke an?',
      questionExampleEn: 'Are you putting on the jacket?',
      wQuestionExample: 'Was ziehst du an?',
      wQuestionExampleEn: 'What are you putting on?',
      conjugation: {
        ich: 'ziehe ... an',
        du: 'ziehst ... an',
        er_sie_es: 'zieht ... an',
        wir: 'ziehen ... an',
        ihr: 'zieht ... an',
        Sie_sie: 'ziehen ... an'
      },
      tip: 'ziehen (to pull) + an (on) = to dress up / pull clothes onto yourself!'
    },
    {
      id: 'aufraeumen',
      prefix: 'auf',
      base: 'räumen',
      infinitive: 'aufräumen',
      meaning: 'to tidy up / clean up',
      icon: '🧹',
      category: 'routine',
      isIrregular: false,
      example: 'Ich räume schnell die Küche auf.',
      exampleEn: 'I am quickly tidying up the kitchen.',
      modalExample: 'Du musst dein Zimmer aufräumen.',
      modalExampleEn: 'You must tidy up your room.',
      questionExample: 'Räumst du dein Zimmer auf?',
      questionExampleEn: 'Are you tidying up your room?',
      wQuestionExample: 'Wann räumst du auf?',
      wQuestionExampleEn: 'When are you tidying up?',
      conjugation: {
        ich: 'räume ... auf',
        du: 'räumst ... auf',
        er_sie_es: 'räumt ... auf',
        wir: 'räumen ... auf',
        ihr: 'räumt ... auf',
        Sie_sie: 'räumen ... auf'
      },
      tip: 'räumen (to clear space) + auf (up) = to organize and tidy up a room!'
    }
  ];

  const currentVerb = VERBS_DATA.find((v) => v.id === selectedVerbId) || VERBS_DATA[0];

  const filteredVerbs = activeFilter === 'all'
    ? VERBS_DATA
    : VERBS_DATA.filter((v) => v.category === activeFilter || (activeFilter === 'irregular' && v.isIrregular));

  // Puzzle State
  const PUZZLES = [
    {
      id: 1,
      title: 'Slide 22 Classroom Exercise',
      words: ['gern', 'siehst', 'fern', 'du'],
      target: ['Siehst', 'du', 'gern', 'fern?'],
      targetAudio: 'Siehst du gern fern?',
      english: 'Do you like watching TV?',
      hint: 'Ja/Nein-Frage: Verb in Position 1 (Siehst), Subject (du), Adverb (gern), Prefix at end (fern?)'
    },
    {
      id: 2,
      title: 'Slide 23 Classroom Exercise',
      words: ['du', 'mich', 'wann', 'an', 'rufst'],
      target: ['Wann', 'rufst', 'du', 'mich', 'an?'],
      targetAudio: 'Wann rufst du mich an?',
      english: 'When will you call me?',
      hint: 'W-Frage: Question word (Wann), Verb Pos. 2 (rufst), Subject (du), Object (mich), Prefix at end (an?)'
    },
    {
      id: 3,
      title: 'Slide 4 Morning Routine',
      words: ['auf.', 'stehe', 'Ich', 'um 6 Uhr'],
      target: ['Ich', 'stehe', 'um 6 Uhr', 'auf.'],
      targetAudio: 'Ich stehe um 6 Uhr auf.',
      english: 'I get up at 6 o\'clock.',
      hint: 'Statement: Subject (Ich), Verb Pos. 2 (stehe), Time (um 6 Uhr), Prefix at end (auf.)'
    },
    {
      id: 4,
      title: 'Slide 10 Train Departure',
      words: ['ab.', 'fährt', 'Der Zug', 'um 7 Uhr'],
      target: ['Der Zug', 'fährt', 'um 7 Uhr', 'ab.'],
      targetAudio: 'Der Zug fährt um 7 Uhr ab.',
      english: 'The train leaves at 7 o\'clock.',
      hint: 'Statement: Subject (Der Zug), Verb Pos. 2 (fährt), Time (um 7 Uhr), Prefix at end (ab.)'
    },
    {
      id: 5,
      title: 'Slide 6 Modal Verb Shield',
      words: ['aufstehen?', 'willst', 'du', 'Wann'],
      target: ['Wann', 'willst', 'du', 'aufstehen?'],
      targetAudio: 'Wann willst du aufstehen?',
      english: 'When do you want to get up?',
      hint: 'Modal Verb: W-Word (Wann), Modal verb Pos. 2 (willst), Subject (du), Glued verb at end (aufstehen?)'
    },
    {
      id: 6,
      title: 'Slide 19 Quick Shopping',
      words: ['ein.', 'kaufe', 'nur schnell', 'Ich'],
      target: ['Ich', 'kaufe', 'nur schnell', 'ein.'],
      targetAudio: 'Ich kaufe nur schnell ein.',
      english: 'I am just doing some quick shopping.',
      hint: 'Subject (Ich), Verb Pos. 2 (kaufe), Adverb (nur schnell), Prefix at end (ein.)'
    },
    {
      id: 7,
      title: 'Slide 19 Closing the Door',
      words: ['die Tür', 'Mach', 'zu.', 'bitte'],
      target: ['Mach', 'bitte', 'die Tür', 'zu.'],
      targetAudio: 'Mach bitte die Tür zu.',
      english: 'Please close the door.',
      hint: 'Imperative command: Verb (Mach), Politeness (bitte), Object (die Tür), Prefix at end (zu.)'
    },
    {
      id: 8,
      title: 'Slide 19 Kitchen Tidy-Up',
      words: ['schnell', 'Ich', 'auf.', 'die Küche', 'räume'],
      target: ['Ich', 'räume', 'schnell', 'die Küche', 'auf.'],
      targetAudio: 'Ich räume schnell die Küche auf.',
      english: 'I am quickly tidying up the kitchen.',
      hint: 'Subject (Ich), Verb Pos. 2 (räume), Adverb (schnell), Object (die Küche), Prefix at end (auf.)'
    }
  ];

  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const activePuzzle = PUZZLES[currentPuzzleIdx];
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(
    [...activePuzzle.words].sort(() => Math.random() - 0.5)
  );
  const [puzzleResult, setPuzzleResult] = useState(null); // 'correct' | 'wrong' | null

  const handleSelectWord = (word, index) => {
    const nextSelected = [...selectedWords, word];
    const nextAvail = availableWords.filter((_, i) => i !== index);
    setSelectedWords(nextSelected);
    setAvailableWords(nextAvail);

    if (nextAvail.length === 0) {
      // Check result
      const isMatch = nextSelected.join(' ').toLowerCase().replace(/[.?]/g, '') ===
        activePuzzle.target.join(' ').toLowerCase().replace(/[.?]/g, '');
      if (isMatch) {
        setPuzzleResult('correct');
        speakGerman(activePuzzle.targetAudio, isSlowMode);
      } else {
        setPuzzleResult('wrong');
      }
    }
  };

  const handleResetCurrentPuzzle = () => {
    setSelectedWords([]);
    setAvailableWords([...activePuzzle.words].sort(() => Math.random() - 0.5));
    setPuzzleResult(null);
  };

  const handleNextPuzzle = () => {
    const nextIdx = (currentPuzzleIdx + 1) % PUZZLES.length;
    setCurrentPuzzleIdx(nextIdx);
    setSelectedWords([]);
    setAvailableWords([...PUZZLES[nextIdx].words].sort(() => Math.random() - 0.5));
    setPuzzleResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-teal-600/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-600/50 backdrop-blur rounded-full text-xs font-bold text-teal-200 uppercase tracking-widest border border-teal-400/30">
              <span>🚀 Slide 1–23 Master Studio</span>
              <span>•</span>
              <span>Trennbare Verben</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              The Detachable Rocket Verbs
            </h1>
            <p className="text-teal-100 text-sm sm:text-base max-w-xl">
              German separable verbs split like a rocket! The main verb engine sits at <span className="text-amber-300 font-bold">Position 2</span>, and the detachable prefix booster gets catapulted to the <span className="text-pink-300 font-bold">very end of the sentence</span>.
            </p>
          </div>

          <button
            onClick={() => speakGerman('Trennbare Verben: Das Verb teilt sich. Der Verbstamm steht auf Position zwei, und das Präfix steht ganz am Ende: Ich stehe um 6 Uhr auf.', isSlowMode)}
            className="flex items-center gap-3 px-6 py-4 bg-amber-400 hover:bg-amber-300 active:scale-95 text-teal-950 font-black rounded-2xl shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
          >
            <span className="text-2xl">🔊</span>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-teal-900">Audio Guide</div>
              <div className="text-sm font-bold">Listen to Rule</div>
            </div>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-teal-700/60">
          <button
            onClick={() => setActiveTab('rocket')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'rocket'
                ? 'bg-amber-400 text-teal-950 shadow-md scale-105'
                : 'bg-teal-950/50 hover:bg-teal-900 text-teal-200 border border-teal-700/50'
            }`}
          >
            <span>🚀</span>
            <span>1. The Rocket & 4 Sentence Slots</span>
          </button>
          <button
            onClick={() => setActiveTab('verbs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'verbs'
                ? 'bg-amber-400 text-teal-950 shadow-md scale-105'
                : 'bg-teal-950/50 hover:bg-teal-900 text-teal-200 border border-teal-700/50'
            }`}
          >
            <span>📚</span>
            <span>2. 15 Core Verbs & Conjugation</span>
          </button>
          <button
            onClick={() => setActiveTab('puzzle')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'puzzle'
                ? 'bg-amber-400 text-teal-950 shadow-md scale-105'
                : 'bg-teal-950/50 hover:bg-teal-900 text-teal-200 border border-teal-700/50'
            }`}
          >
            <span>🧩</span>
            <span>3. Word Tile Sentence Builder</span>
          </button>
        </div>
      </div>

      {/* TAB 1: The Rocket & 4 Sentence Positions */}
      {activeTab === 'rocket' && (
        <div className="space-y-8">
          {/* Big Intuition Visual Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
                Slides 3 & 4: The Rocket Engine Analogy
              </span>
              <h2 className="text-2xl font-black text-stone-900">
                How <span className="text-teal-700">auf</span><span className="text-amber-600">stehen</span> Splits Apart
              </h2>
              <p className="text-stone-600 text-sm">
                In the dictionary, the verb is whole: <strong className="text-teal-800">aufstehen</strong> (to get up). But in a spoken sentence, the prefix detaches and flies all the way to the end!
              </p>
            </div>

            {/* Split Visualization Diagram */}
            <div className="bg-gradient-to-r from-stone-50 via-teal-50 to-stone-50 rounded-2xl p-6 border-2 border-dashed border-teal-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center items-center">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
                  <div className="text-xs font-bold text-stone-500 uppercase">Position 1</div>
                  <div className="text-xl font-black text-stone-800 mt-1">Ich</div>
                  <div className="text-xs text-stone-500">Subject (I)</div>
                </div>

                <div className="bg-teal-600 text-white p-4 rounded-xl shadow-md border-2 border-teal-400 ring-2 ring-teal-200 animate-pulse">
                  <div className="text-xs font-bold text-teal-200 uppercase">Position 2 (Verb Engine)</div>
                  <div className="text-2xl font-black mt-1">stehe</div>
                  <div className="text-xs text-teal-200">Verbstamm mit Endung</div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
                  <div className="text-xs font-bold text-stone-500 uppercase">Middle Details</div>
                  <div className="text-xl font-black text-stone-800 mt-1">um 6 Uhr</div>
                  <div className="text-xs text-stone-500">Time (at 6 o'clock)</div>
                </div>

                <div className="bg-amber-500 text-stone-900 p-4 rounded-xl shadow-md border-2 border-amber-300 ring-2 ring-amber-200">
                  <div className="text-xs font-bold text-amber-900 uppercase">Satzende (Rocket Booster)</div>
                  <div className="text-2xl font-black mt-1">auf.</div>
                  <div className="text-xs text-amber-950 font-bold">Präfix (Detached!)</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-stone-700">
                  🔊 <strong>Full Sentence:</strong> <span className="font-bold text-teal-900">"Ich stehe um 6 Uhr auf."</span> <em>(I get up at 6 o'clock.)</em>
                </div>
                <button
                  onClick={() => speakGerman('Ich stehe um 6 Uhr auf.', isSlowMode)}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow"
                >
                  <span>🔊</span> Listen
                </button>
              </div>
            </div>
          </div>

          {/* Interactive 4 Sentence Modes Tester */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-stone-900">
                  Interactive Sentence Positions Tester (Slides 4–6)
                </h3>
                <p className="text-sm text-stone-600">
                  See how the detachable prefix behaves in all 4 sentence formats!
                </p>
              </div>

              {/* Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSentenceType('statement')}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    sentenceType === 'statement'
                      ? 'bg-teal-700 text-white shadow'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  1. Statement (Aussage)
                </button>
                <button
                  onClick={() => setSentenceType('wfrage')}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    sentenceType === 'wfrage'
                      ? 'bg-teal-700 text-white shadow'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  2. W-Frage
                </button>
                <button
                  onClick={() => setSentenceType('yesno')}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    sentenceType === 'yesno'
                      ? 'bg-teal-700 text-white shadow'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  3. Ja/Nein-Frage
                </button>
                <button
                  onClick={() => setSentenceType('modal')}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    sentenceType === 'modal'
                      ? 'bg-purple-700 text-white shadow ring-2 ring-purple-300'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  4. Modalverb 🛡️
                </button>
              </div>
            </div>

            {/* Mode Display Box */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              {sentenceType === 'statement' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <span>📌</span>
                    <span>Rule: Verb stem takes Position 2, Prefix goes to the very END!</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                      <div className="text-xs font-bold text-teal-700">Slide 4 Example 1:</div>
                      <div className="text-lg font-bold text-stone-900">
                        Ich <span className="text-teal-600 underline">stehe</span> um 6 Uhr <span className="text-amber-600 underline">auf</span>.
                      </div>
                      <div className="text-xs text-stone-500">"I get up at 6 o'clock."</div>
                      <button
                        onClick={() => speakGerman('Ich stehe um 6 Uhr auf.', isSlowMode)}
                        className="mt-2 text-xs text-teal-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                      <div className="text-xs font-bold text-teal-700">Slide 4 Example 2:</div>
                      <div className="text-lg font-bold text-stone-900">
                        Peter <span className="text-teal-600 underline">geht</span> um 9 Uhr <span className="text-amber-600 underline">los</span>.
                      </div>
                      <div className="text-xs text-stone-500">"Peter sets off at 9 o'clock."</div>
                      <button
                        onClick={() => speakGerman('Peter geht um 9 Uhr los.', isSlowMode)}
                        className="mt-2 text-xs text-teal-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {sentenceType === 'wfrage' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <span>❓</span>
                    <span>Rule: W-Word at Pos. 1 + Verb stem at Pos. 2 + Prefix at the very END!</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                      <div className="text-xs font-bold text-teal-700">Slide 5: W-Frage (aufstehen)</div>
                      <div className="text-lg font-bold text-stone-900">
                        Wann <span className="text-teal-600 underline">stehst</span> du <span className="text-amber-600 underline">auf</span>?
                      </div>
                      <div className="text-xs text-stone-500">"When do you get up?"</div>
                      <button
                        onClick={() => speakGerman('Wann stehst du auf?', isSlowMode)}
                        className="mt-2 text-xs text-teal-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                      <div className="text-xs font-bold text-teal-700">Slide 23: W-Frage (anrufen)</div>
                      <div className="text-lg font-bold text-stone-900">
                        Wann <span className="text-teal-600 underline">rufst</span> du mich <span className="text-amber-600 underline">an</span>?
                      </div>
                      <div className="text-xs text-stone-500">"When will you call me?"</div>
                      <button
                        onClick={() => speakGerman('Wann rufst du mich an?', isSlowMode)}
                        className="mt-2 text-xs text-teal-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {sentenceType === 'yesno' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <span>🙋‍♂️</span>
                    <span>Rule: Verb leaps to Position 1 + Subject at Pos. 2 + Prefix at the END!</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                      <div className="text-xs font-bold text-teal-700">Slide 5: Ja-Nein-Frage (aufstehen)</div>
                      <div className="text-lg font-bold text-stone-900">
                        <span className="text-teal-600 underline">Stehst</span> du um 6 Uhr <span className="text-amber-600 underline">auf</span>?
                      </div>
                      <div className="text-xs text-stone-500">"Do you get up at 6 o'clock?"</div>
                      <button
                        onClick={() => speakGerman('Stehst du um 6 Uhr auf?', isSlowMode)}
                        className="mt-2 text-xs text-teal-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                      <div className="text-xs font-bold text-teal-700">Slide 22: Ja-Nein-Frage (fernsehen)</div>
                      <div className="text-lg font-bold text-stone-900">
                        <span className="text-teal-600 underline">Siehst</span> du gern <span className="text-amber-600 underline">fern</span>?
                      </div>
                      <div className="text-xs text-stone-500">"Do you like watching TV?"</div>
                      <button
                        onClick={() => speakGerman('Siehst du gern fern?', isSlowMode)}
                        className="mt-2 text-xs text-teal-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {sentenceType === 'modal' && (
                <div className="space-y-4">
                  <div className="p-3 bg-purple-100 border border-purple-300 rounded-xl text-purple-900 font-bold text-sm flex items-center gap-2">
                    <span>🛡️</span>
                    <span>The Modal Verb "Superglue Shield" (Slide 6): The modal verb conjugates at Pos. 2, and the separable verb stays 100% glued together in infinitive at the end!</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border-2 border-purple-200 space-y-2">
                      <div className="text-xs font-bold text-purple-700">Slide 6: With 'wollen' (want)</div>
                      <div className="text-lg font-bold text-stone-900">
                        Wann <span className="text-purple-600 underline">willst</span> du <span className="text-emerald-700 font-black bg-emerald-100 px-2 py-0.5 rounded">aufstehen</span>?
                      </div>
                      <div className="text-xs text-stone-500">"When do you want to get up?" (No separation!)</div>
                      <button
                        onClick={() => speakGerman('Wann willst du aufstehen?', isSlowMode)}
                        className="mt-2 text-xs text-purple-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-xl border-2 border-purple-200 space-y-2">
                      <div className="text-xs font-bold text-purple-700">Slide 9: With 'können' (can)</div>
                      <div className="text-lg font-bold text-stone-900">
                        <span className="text-purple-600 underline">Kannst</span> du mich um 18 Uhr <span className="text-emerald-700 font-black bg-emerald-100 px-2 py-0.5 rounded">abholen</span>?
                      </div>
                      <div className="text-xs text-stone-500">"Can you pick me up at 6 p.m.?" (No separation!)</div>
                      <button
                        onClick={() => speakGerman('Kannst du mich um 18 Uhr abholen?', isSlowMode)}
                        className="mt-2 text-xs text-purple-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 15 Core Verbs & Full Conjugation */}
      {activeTab === 'verbs' && (
        <div className="space-y-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase">Filter Category:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All 15 Verbs 🌟' },
                  { id: 'routine', label: 'Daily Routine ⏰' },
                  { id: 'travel', label: 'Travel & Movement 🚆' },
                  { id: 'social', label: 'Social & Invites 💌' },
                  { id: 'irregular', label: 'Vowel Changers (ä/ie) ⚡' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeFilter === f.id
                        ? 'bg-teal-700 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-stone-500">
              Showing <strong>{filteredVerbs.length}</strong> verbs
            </div>
          </div>

          {/* Grid of Verbs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVerbs.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  setSelectedVerbId(v.id);
                  speakGerman(v.example, isSlowMode);
                }}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left space-y-3 relative overflow-hidden ${
                  selectedVerbId === v.id
                    ? 'bg-teal-50 border-teal-500 shadow-lg scale-[1.02] ring-2 ring-teal-300'
                    : 'bg-white hover:bg-stone-50 border-stone-200 shadow-sm'
                }`}
              >
                {v.isIrregular && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md text-[10px] font-black uppercase tracking-wider">
                    ⚡ {v.vowelChange}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-white rounded-xl shadow-sm border border-stone-100">{v.icon}</span>
                  <div>
                    <div className="text-lg font-black text-stone-900">
                      <span className="text-amber-600">{v.prefix}</span>
                      <span className="text-teal-800">{v.base}</span>
                    </div>
                    <div className="text-xs text-stone-500 font-medium">{v.meaning}</div>
                  </div>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-800">
                    {v.example}
                  </div>
                  <div className="text-stone-500 italic">{v.exampleEn}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-teal-700 font-bold pt-1">
                  <span>Conjugation: er {v.conjugation.er_sie_es}</span>
                  <span>🔊 Tap to listen</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Verb Detail & Full Slide 7 Conjugation Table */}
          {currentVerb && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-teal-500 space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-4">
                  <span className="text-5xl p-3 bg-teal-50 rounded-2xl border border-teal-200">{currentVerb.icon}</span>
                  <div>
                    <span className="px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-black uppercase tracking-wider">
                      Full Conjugation Inspector
                    </span>
                    <h3 className="text-3xl font-extrabold text-stone-900 mt-1">
                      <span className="text-amber-600">{currentVerb.prefix}</span>
                      <span className="text-teal-800">{currentVerb.base}</span>
                    </h3>
                    <p className="text-stone-600 text-sm">{currentVerb.meaning} • {currentVerb.tip}</p>
                  </div>
                </div>

                <button
                  onClick={() => speakGerman(
                    `Verb ${currentVerb.infinitive}: ich ${currentVerb.conjugation.ich}, du ${currentVerb.conjugation.du}, er ${currentVerb.conjugation.er_sie_es}, wir ${currentVerb.conjugation.wir}, ihr ${currentVerb.conjugation.ihr}, sie ${currentVerb.conjugation.Sie_sie}.`,
                    isSlowMode
                  )}
                  className="px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-black rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow"
                >
                  <span>🔊</span> Listen to Conjugation
                </button>
              </div>

              {/* Conjugation Grid (Slide 7 Format) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Singular Column */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                  <div className="text-xs font-black text-stone-500 uppercase tracking-wider">Singular</div>
                  
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">ich (I)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.ich}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">du (you casual)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.du}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">er / sie / es (he/she/it)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.er_sie_es}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">Sie (You formal)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.Sie_sie}</span>
                  </div>
                </div>

                {/* Plural Column */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                  <div className="text-xs font-black text-stone-500 uppercase tracking-wider">Plural</div>
                  
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">wir (we)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.wir}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">ihr (you all)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.ihr}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">Sie (You formal all)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.Sie_sie}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-sm">
                    <span className="font-bold text-stone-600">sie (they)</span>
                    <span className="font-black text-teal-800">{currentVerb.conjugation.Sie_sie}</span>
                  </div>
                </div>
              </div>

              {/* 3 Real Life Example Showcases */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-stone-200">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-teal-700 uppercase">Statement</span>
                  <div className="text-xs font-bold text-stone-800">{currentVerb.example}</div>
                  <div className="text-[11px] text-stone-500 italic">{currentVerb.exampleEn}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-teal-700 uppercase">Question</span>
                  <div className="text-xs font-bold text-stone-800">{currentVerb.questionExample}</div>
                  <div className="text-[11px] text-stone-500 italic">{currentVerb.questionExampleEn}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-purple-700 uppercase">Modal Glued</span>
                  <div className="text-xs font-bold text-stone-800">{currentVerb.modalExample}</div>
                  <div className="text-[11px] text-stone-500 italic">{currentVerb.modalExampleEn}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Sentence Puzzle Studio (Slides 20-23 & Everyday Life) */}
      {activeTab === 'puzzle' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
                Slides 20–23: Bilde Sätze! (Make Sentences!)
              </span>
              <h2 className="text-2xl font-black text-stone-900 mt-1">
                Puzzle {currentPuzzleIdx + 1} of {PUZZLES.length}: {activePuzzle.title}
              </h2>
              <p className="text-stone-600 text-sm">
                Target Meaning: <strong className="text-teal-900">"{activePuzzle.english}"</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCurrentPuzzle}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                🔄 Reset Words
              </button>
              <button
                onClick={handleNextPuzzle}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow"
              >
                Next Puzzle ➔
              </button>
            </div>
          </div>

          {/* Puzzle Construction Area */}
          <div className="space-y-6">
            {/* Target Slots Area */}
            <div className="p-6 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 min-h-[100px] flex flex-wrap items-center justify-center gap-3">
              {selectedWords.length === 0 ? (
                <div className="text-stone-400 text-sm italic">
                  Tap the scrambled word tiles below in the correct order to build the sentence...
                </div>
              ) : (
                selectedWords.map((w, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2.5 bg-teal-700 text-white rounded-xl font-bold text-base shadow-sm animate-bounce"
                  >
                    {w}
                  </span>
                ))
              )}
            </div>

            {/* Available Word Tiles */}
            <div className="space-y-2 text-center">
              <div className="text-xs font-bold text-stone-500 uppercase">Available Word Tiles (Tap to place):</div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {availableWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectWord(word, idx)}
                    className="px-5 py-3 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-950 font-black rounded-2xl border-2 border-amber-300 text-base shadow transition cursor-pointer"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            {/* Hint Box */}
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-xs text-teal-900 flex items-center gap-2">
              <span>💡</span>
              <span><strong>Grammar Hint:</strong> {activePuzzle.hint}</span>
            </div>

            {/* Result Banner */}
            {puzzleResult === 'correct' && (
              <div className="p-6 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-950 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-lg font-black">
                  <span>🎉</span>
                  <span>Wunderbar! Perfect Sentence Order!</span>
                </div>
                <p className="text-sm">
                  Full German: <strong className="text-emerald-900">{activePuzzle.target.join(' ')}</strong>
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => speakGerman(activePuzzle.targetAudio, isSlowMode)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer shadow"
                  >
                    <span>🔊</span> Hear Sentence
                  </button>
                  <button
                    onClick={handleNextPuzzle}
                    className="px-4 py-2 bg-teal-900 hover:bg-teal-950 text-white font-bold rounded-xl text-xs cursor-pointer shadow"
                  >
                    Try Next Puzzle ➔
                  </button>
                </div>
              </div>
            )}

            {puzzleResult === 'wrong' && (
              <div className="p-5 bg-rose-100 border-2 border-rose-300 rounded-2xl text-rose-950 space-y-2 animate-shake">
                <div className="font-black text-sm flex items-center gap-2">
                  <span>❌</span>
                  <span>Not quite! Check the verb position and the detached prefix.</span>
                </div>
                <p className="text-xs text-rose-800">
                  Tap 'Reset Words' to try again or remember: conjugated verb stays at Position 2 (or Pos. 1 for Yes/No questions), and prefix flies to the very end!
                </p>
                <button
                  onClick={handleResetCurrentPuzzle}
                  className="mt-2 px-4 py-1.5 bg-rose-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  🔄 Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
