import React from 'react';
import { Volume2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Header({
  currentLesson,
  setCurrentLesson,
  activeTab,
  setActiveTab,
  isSlowMode,
  setIsSlowMode
}) {
  const handleTestAudio = () => {
    playChime('click');
    let msg = "Hallo! Guten Tag!";
    if (currentLesson === 2) msg = "Danke schön! Vielen Dank! Bitte sehr!";
    if (currentLesson === 3) msg = "null, eins, zwei, drei, vier, fünf! Meine Handynummer ist...";
    if (currentLesson === 4) msg = "einundzwanzig, dreißig, sechzig, siebzig, einhundert!";
    if (currentLesson === 5) msg = "Das Alphabet: A, B, C, D, E, F, G! Joghurt, Vogel, Wolke, Fuß!";
    if (currentLesson === 6) msg = "Hallo! Mein Name ist Monika Schmidt. Ich wohne in Berlin und ich spreche Deutsch!";
    if (currentLesson === 7) msg = "Wie heißen Sie? Wie heißt du? Woher kommen Sie? Wo wohnst du?";
    if (currentLesson === 8) msg = "Ich wohne in Berlin. Heute bin ich in Berlin. Haben Sie Zeit? Verstehen Sie mich?";
    if (currentLesson === 9) msg = "ich wohne, du wohnst, Sie wohnen. ich komme, du kommst, Sie kommen. ich heiße, du heißt!";
    if (currentLesson === 10) msg = "Personalpronomen: ich, du, er, sie, es, wir, ihr, Sie! Das ist Michael, er wohnt in London.";
    if (currentLesson === 11) msg = "haben und sein: Ich habe Zeit, du hast Zeit, er hat Zeit. Ich bin glücklich, du bist glücklich, wir sind glücklich!";
    if (currentLesson === 12) msg = "Was ist ein Verb? Ein Verb beschreibt eine Handlung. Verbstamm plus Endung. Regelmäßige und unregelmäßige Verben!";
    if (currentLesson === 13) msg = "Regelmäßige Verben: ich wohne, du wohnst, er wohnt. Du reist, du tanzt. Du arbeitest, er wartet!";
    if (currentLesson === 14) msg = "Unregelmäßige Verben: sprechen wird zu du sprichst, sehen wird zu du siehst, fahren wird zu du fährst, und wissen: ich weiß, er weiß!";
    if (currentLesson === 15) msg = "Zahlen Teil drei: einhundert, eintausend, eine Million, eine Milliarde. Neunzehnhundertfünfundsiebzig und zweitausendsiebzehn!";
    if (currentLesson === 16) msg = "Adjektive und Gegenteile: groß und klein, schnell und langsam, alt und neu, alt und jung! Ein Elefant ist groß, aber eine Katze ist klein.";
    if (currentLesson === 17) msg = "jemanden vorstellen: Das ist Peter, er kommt aus Spanien und arbeitet bei Siemens. Das ist Martina, sie kommt aus der Schweiz. Das ist ein Kind, es ist ein Jahr alt. Das sind Laura und Antonio, sie wohnen in München.";
    if (currentLesson === 18) msg = "Artikel im Nominativ: der Mann, der Apfel. Die Frau, die Katze. Das Baby, das Haus. Und im Plural immer die: die Männer, die Frauen, die Babys!";
    if (currentLesson === 19) msg = "unbestimmte Artikel: ein Apfel, ein Mann, eine Frau, ein Mädchen. Und im Plural: Das sind Blumen, die Blumen sind schön!";
    if (currentLesson === 20) msg = "negative Artikel: Das ist kein Apfel, das ist eine Birne. Ist das ein Kuli? Nein, das ist kein Kuli, das ist ein Bleistift! Und keine Sterne, das sind Ballons!";
    if (currentLesson === 21) msg = "Die Uhrzeit: Wie spät ist es? Wie viel Uhr ist es? Es ist ein Uhr, es ist siebzehn Uhr zweiundvierzig, und es ist null Uhr!";
    if (currentLesson === 22) msg = "Inoffizielle Zeit: Es ist Viertel vor sieben, es ist halb zwei, es ist fünf nach halb vier, und es ist kurz vor fünf!";
    if (currentLesson === 23) msg = "Possessivartikel im Nominativ: Das ist mein Auto, das ist meine Katze. Ist das dein Fernseher? Sind das eure Bücher? Und ist das Ihr Auto, Herr Müller?";
    if (currentLesson === 24) msg = "Die Familie: Das ist mein Vater, das ist meine Mutter, das sind meine Eltern und Geschwister. Mein Opa und meine Oma!";
    if (currentLesson === 25) msg = "Artikel im Akkusativ: Ich esse einen Apfel, ich trinke einen Saft, ich habe eine Katze und ein Auto. Und ich habe keinen Kuli!";
    if (currentLesson === 26) msg = "Possessivartikel im Akkusativ: Ich liebe meinen Mann, er mag seinen Hund, und sie findet ihren Freund nett. Heute besuchen wir unseren Opa!";
    if (currentLesson === 27) msg = "Das Modalverb möchten: Ich möchte Ärztin werden, Peter möchte in England studieren, und Tobi möchte eine Pizza bestellen. Was möchtest du essen?";
    speakGerman(msg, isSlowMode);
  };

  const lesson1NavItems = [
    { id: 'cards', label: '📖 Lesson 1 Cards', sub: 'Stories & Everyday Analogies' },
    { id: 'time', label: '☀️ Sun & Moon Clock', sub: 'Morning, Day, Evening, Night' },
    { id: 'phone', label: '👀 Eyes vs 👂 Ears', sub: 'In Person vs On Phone' },
    { id: 'game', label: '🚐 Matatu Greeting Game', sub: 'Passenger Scenario Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson2NavItems = [
    { id: 'cards', label: '📖 Lesson 2 Cards', sub: 'Common Polite Phrases' },
    { id: 'bitte', label: '🪄 The Magic Word "Bitte"', sub: 'Please, Welcome & Traffic Light' },
    { id: 'game2', label: '💬 Polite Situation Game', sub: 'Real Life Practice' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson3NavItems = [
    { id: 'cards', label: '📖 Lesson 3 Cards', sub: 'Numbers 0 - 20 & Handynummer' },
    { id: 'numbers', label: '🔢 Interactive Counter', sub: '0-20 Stepper & Sound Rules' },
    { id: 'dialer', label: '📱 Handynummer Dialpad', sub: 'Mobile Phone Simulator' },
    { id: 'game3', label: '🎮 Numbers Quiz Game', sub: 'Drops & Sound Practice' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson4NavItems = [
    { id: 'cards', label: '📖 Lesson 4 Cards', sub: 'Numbers 21 - 100 Cards' },
    { id: 'machine', label: '🔄 Backwards Machine', sub: 'Interactive Number Generator' },
    { id: 'ladder', label: '🪜 Tens Ladder', sub: '20, 30, 40... up to 100' },
    { id: 'game4', label: '🎮 21-100 Quiz Game', sub: 'Rule Challenges & Shopping' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson5NavItems = [
    { id: 'cards', label: '📖 Lesson 5 Cards', sub: 'All 30 Letters & Words' },
    { id: 'alphabet', label: '🔤 Alphabet Soundboard', sub: '30 Interactive Letter Keys' },
    { id: 'game5', label: '🎮 Alphabet Quiz Game', sub: 'Umlauts & Sound Swaps' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson6NavItems = [
    { id: 'cards', label: '📖 Lesson 6 Cards', sub: 'Name, Origin, Age & Job' },
    { id: 'builder', label: '🆔 Profile Builder', sub: 'Custom German ID & Audio' },
    { id: 'game6', label: '🎮 Intro Quiz Game', sub: 'Self-Introduction Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson7NavItems = [
    { id: 'cards', label: '📖 Lesson 7 Cards', sub: 'Questions & Answers' },
    { id: 'dialogue', label: '🎩 Sie vs 👕 du', sub: 'Formal vs Casual Dialogue' },
    { id: 'game7', label: '🎮 Conversation Quiz', sub: 'Scenario Practice Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson8NavItems = [
    { id: 'cards', label: '📖 Lesson 8 Cards', sub: 'Sentence Structure & Rules' },
    { id: 'machine', label: '🚂 Sentence Train', sub: 'Positions 1, 2, 3 Machine' },
    { id: 'game8', label: '🎮 Structure Quiz', sub: 'Conductor Scenario Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson9NavItems = [
    { id: 'cards', label: '📖 Lesson 9 Cards', sub: 'Pronouns & Endings' },
    { id: 'studio', label: '👗 Verb Studio', sub: 'Interactive Tail Dressing' },
    { id: 'game9', label: '🎮 Conjugation Quiz', sub: 'Tail Matcher Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson10NavItems = [
    { id: 'cards', label: '📖 Lesson 10 Cards', sub: 'Personal Pronouns Rules' },
    { id: 'family', label: '👥 Pronoun Bench', sub: 'Interactive Substitute Bench' },
    { id: 'game10', label: '🎮 Pronoun Quiz', sub: 'Substitute Master Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson11NavItems = [
    { id: 'cards', label: '📖 Lesson 11 Cards', sub: 'haben & sein Essentials' },
    { id: 'palace', label: '👑 Twin Palace', sub: 'sein & haben Conjugation Studio' },
    { id: 'game11', label: '🎮 Royal Quest Quiz', sub: 'Conjugation & Subjekt Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson12NavItems = [
    { id: 'cards', label: '📖 Lesson 12 Cards', sub: 'Verb Concepts & Types' },
    { id: 'studio', label: '🌳 Stem & Ending Studio', sub: 'Tree Structure & Conjugation' },
    { id: 'game12', label: '🎮 Verb Master Quiz', sub: 'Regular vs Irregular Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson13NavItems = [
    { id: 'cards', label: '📖 Lesson 13 Cards', sub: 'Regular Verbs & Rules' },
    { id: 'regular', label: '🧩 Conjugation Studio', sub: '14 Slide Verbs & 2 Special Cases' },
    { id: 'game13', label: '🎮 Conjugation Quiz', sub: 'Hissing & Cushion Rules Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson14NavItems = [
    { id: 'cards', label: '📖 Lesson 14 Cards', sub: 'Irregular Verbs & 5 Patterns' },
    { id: 'vowel', label: '⚡ Vokalwechsel Studio', sub: '5 Patterns & Rebel wissen' },
    { id: 'game14', label: '🎮 Vokalwechsel Quiz', sub: 'Vowel Shift Challenge Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson15NavItems = [
    { id: 'cards', label: '📖 Lesson 15 Cards', sub: 'Big Numbers & Years' },
    { id: 'numbers3', label: '💯 Number Builder', sub: 'Combinations & Birth Years' },
    { id: 'game15', label: '🎮 Big Number Quiz', sub: 'Compounds & Years Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson16NavItems = [
    { id: 'cards', label: '📖 Lesson 16 Cards', sub: '16 Adjective Pairs & Stories' },
    { id: 'opposites', label: '⚖️ Opposites Studio', sub: 'The Seesaw & "aber" Connector' },
    { id: 'game16', label: '🎮 Opposites Quiz', sub: 'Contrasts & Challenges' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson17NavItems = [
    { id: 'cards', label: '📖 Lesson 17 Cards', sub: 'Profiles & Introduction Stories' },
    { id: 'studio17', label: '👥 Introduction Studio', sub: 'Peter, Martina, Kind & Couple' },
    { id: 'game17', label: '🎮 Introduction Quiz', sub: 'Questions & Grammar Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson18NavItems = [
    { id: 'cards', label: '📖 Lesson 18 Cards', sub: 'der, die, das & Plural Cards' },
    { id: 'studio18', label: '🔴 Nominativ Studio', sub: 'The 3 Genders & Plural Umbrella' },
    { id: 'game18', label: '🎮 Nominativ Quiz', sub: 'Articles & Subjekt Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson19NavItems = [
    { id: 'cards', label: '📖 Lesson 19 Cards', sub: 'ein, eine, ein & Plural Cards' },
    { id: 'studio19', label: '✨ Indefinite Studio', sub: 'The 5 Stories & Exercises' },
    { id: 'game19', label: '🎮 Indefinite Quiz', sub: 'Articles & Story Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson20NavItems = [
    { id: 'cards', label: '📖 Lesson 20 Cards', sub: 'kein, keine, kein & Plural Cards' },
    { id: 'studio20', label: '🚫 Negative Studio', sub: '6 Q&A Stories & Magic K' },
    { id: 'game20', label: '🎮 Negative Quiz', sub: 'Rebuttal & Rules Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson21NavItems = [
    { id: 'cards', label: '📖 Lesson 21 Cards', sub: 'Uhrzeit, Einheiten & Übung' },
    { id: 'studio21', label: '⏰ Time Studio', sub: '24h Clock Simulator & Units' },
    { id: 'game21', label: '🎮 Time Quiz', sub: 'Clock Challenges & Rules' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson22NavItems = [
    { id: 'cards', label: '📖 Lesson 22 Cards', sub: 'halb, vor, nach & Umgangssprache' },
    { id: 'studio22', label: '🕰️ Inofficial Studio', sub: 'Master Clock Wheel & Halb Lab' },
    { id: 'game22', label: '🎮 Inofficial Quiz', sub: 'Conversational Time Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson23NavItems = [
    { id: 'cards', label: '📖 Lesson 23 Cards', sub: 'mein, dein, sein, ihr, euer, Ihr' },
    { id: 'studio23', label: '🏷️ Possessive Studio', sub: '8 Characters & 4 Nouns Matrix' },
    { id: 'game23', label: '🎮 Ownership Quiz', sub: 'euer/eure & Pronoun Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson24NavItems = [
    { id: 'cards', label: '📖 Lesson 24 Cards', sub: 'Vater, Mutter, Geschwister & Baum' },
    { id: 'studio24', label: '🌳 Family Studio', sub: '3-Generation Tree & Builder' },
    { id: 'game24', label: '🎮 Family Quiz', sub: 'Family Tree Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson25NavItems = [
    { id: 'cards', label: '📖 Lesson 25 Cards', sub: 'den, einen, keinen & Wen vs. Was' },
    { id: 'studio25', label: '⚡ Akkusativ Studio', sub: 'Transformer & Apple Diagnostic' },
    { id: 'game25', label: '🎮 Akkusativ Quiz', sub: 'Direct Object Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson26NavItems = [
    { id: 'cards', label: '📖 Lesson 26 Cards', sub: 'meinen, seinen, ihren & Hund Drill' },
    { id: 'studio26', label: '❤️ Possessive Akk Studio', sub: '3 Stories, Dog Drill & Übungen' },
    { id: 'game26', label: '🎮 Possessive Akk Quiz', sub: 'Akkusativ Ownership Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson27NavItems = [
    { id: 'cards', label: '📖 Lesson 27 Cards', sub: 'möchten, Satzklammer & Übungen' },
    { id: 'studio27', label: '🧲 möchten Studio', sub: 'Verb Bracket, Wish Builder & Drills' },
    { id: 'game27', label: '🎮 möchten Quiz', sub: 'Ordering & Sentence Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  let navItems = lesson1NavItems;
  if (currentLesson === 2) navItems = lesson2NavItems;
  if (currentLesson === 3) navItems = lesson3NavItems;
  if (currentLesson === 4) navItems = lesson4NavItems;
  if (currentLesson === 5) navItems = lesson5NavItems;
  if (currentLesson === 6) navItems = lesson6NavItems;
  if (currentLesson === 7) navItems = lesson7NavItems;
  if (currentLesson === 8) navItems = lesson8NavItems;
  if (currentLesson === 9) navItems = lesson9NavItems;
  if (currentLesson === 10) navItems = lesson10NavItems;
  if (currentLesson === 11) navItems = lesson11NavItems;
  if (currentLesson === 12) navItems = lesson12NavItems;
  if (currentLesson === 13) navItems = lesson13NavItems;
  if (currentLesson === 14) navItems = lesson14NavItems;
  if (currentLesson === 15) navItems = lesson15NavItems;
  if (currentLesson === 16) navItems = lesson16NavItems;
  if (currentLesson === 17) navItems = lesson17NavItems;
  if (currentLesson === 18) navItems = lesson18NavItems;
  if (currentLesson === 19) navItems = lesson19NavItems;
  if (currentLesson === 20) navItems = lesson20NavItems;
  if (currentLesson === 21) navItems = lesson21NavItems;
  if (currentLesson === 22) navItems = lesson22NavItems;
  if (currentLesson === 23) navItems = lesson23NavItems;
  if (currentLesson === 24) navItems = lesson24NavItems;
  if (currentLesson === 25) navItems = lesson25NavItems;
  if (currentLesson === 26) navItems = lesson26NavItems;
  if (currentLesson === 27) navItems = lesson27NavItems;

  const ALL_LESSONS = [
    { num: 1, label: "👋 1: Greetings", activeClass: "bg-amber-600 ring-amber-300", hoverBorder: "hover:bg-amber-200/60 border-amber-300" },
    { num: 2, label: "💬 2: Phrases", activeClass: "bg-emerald-700 ring-emerald-300", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 3, label: "🔢 3: 0 - 20 & Handy", activeClass: "bg-indigo-700 ring-indigo-300", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 4, label: "🔄 4: 21 - 100", activeClass: "bg-purple-700 ring-purple-300", hoverBorder: "hover:bg-purple-100 border-purple-300" },
    { num: 5, label: "🔤 5: Das Alphabet", activeClass: "bg-rose-700 ring-rose-300", hoverBorder: "hover:bg-rose-100 border-rose-300" },
    { num: 6, label: "🤝 6: Sich Vorstellen", activeClass: "bg-sky-700 ring-sky-300", hoverBorder: "hover:bg-sky-100 border-sky-300" },
    { num: 7, label: "💬 7: Kennenlernen", activeClass: "bg-teal-700 ring-teal-300", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 8, label: "🚂 8: Satzstruktur", activeClass: "bg-amber-600 ring-amber-300", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 9, label: "👗 9: Verb-Endungen", activeClass: "bg-emerald-600 ring-emerald-300", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 10, label: "👥 10: Pronomen", activeClass: "bg-purple-700 ring-purple-300", hoverBorder: "hover:bg-purple-100 border-purple-300" },
    { num: 11, label: "👑 11: haben & sein", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 12, label: "🌳 12: Was ist ein Verb?", activeClass: "bg-emerald-700 ring-emerald-400", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 13, label: "🧩 13: Regelmäßige Verben", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 14, label: "⚡ 14: Unregelmäßige Verben", activeClass: "bg-purple-700 ring-purple-400", hoverBorder: "hover:bg-purple-100 border-purple-300" },
    { num: 15, label: "💯 15: Zahlen (Teil 3)", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 16, label: "🎨 16: Adjektive & Gegenteile", activeClass: "bg-purple-700 ring-purple-400", hoverBorder: "hover:bg-purple-100 border-purple-300" },
    { num: 17, label: "👥 17: Jemanden vorstellen", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 18, label: "🔴 18: der, die, das (Nominativ)", activeClass: "bg-blue-700 ring-blue-400", hoverBorder: "hover:bg-blue-100 border-blue-300" },
    { num: 19, label: "✨ 19: ein, eine, ein", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 20, label: "🚫 20: kein, keine, kein", activeClass: "bg-emerald-700 ring-emerald-400", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 21, label: "⏰ 21: Die Uhrzeit", activeClass: "bg-indigo-700 ring-indigo-400", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 22, label: "🕰️ 22: Inoffizielle Zeit", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 23, label: "🏷️ 23: Possessivartikel", activeClass: "bg-emerald-700 ring-emerald-400", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 24, label: "👨‍👩‍👦 24: Die Familie", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 25, label: "🎯 25: Artikel im Akkusativ", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 26, label: "❤️ 26: Possessiv im Akkusativ", activeClass: "bg-rose-700 ring-rose-400", hoverBorder: "hover:bg-rose-100 border-rose-300" },
    { num: 27, label: "☕ 27: möchten (would like to)", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
  ];

  return (
    <header className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-b-4 border-amber-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-2 sm:py-3">
        {/* Top bar with reassurance and audio settings */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl animate-gentle-bounce">🇩🇪</span>
            <span className="text-lg sm:text-2xl font-bold text-amber-900 tracking-tight">
              German Made Simple
            </span>
            <span className="text-2xl sm:text-3xl animate-gentle-bounce">🇰🇪</span>
          </div>

          {/* Calming reassurance badge - hidden on phones to conserve screen */}
          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Jargon • Pure Layman Analogies • No Panic</span>
          </div>

          {/* Audio options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsSlowMode(!isSlowMode);
                playChime('click');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isSlowMode
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                  : 'bg-white text-stone-700 border border-amber-300 hover:bg-amber-100'
              }`}
              title="Speak slower so you can hear each syllable clearly"
            >
              <span>🐢</span>
              <span>{isSlowMode ? 'Slow: ON' : 'Slow (Off)'}</span>
            </button>

            <button
              onClick={handleTestAudio}
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
              title="Test pronunciation audio"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Test Audio</span>
            </button>
          </div>
        </div>

        {/* Lesson Switcher Row - Single horizontal thumb swipe on phones, wrapping row on laptops */}
        <div className="py-2 flex items-center justify-between gap-2 border-b border-amber-200/70 overflow-hidden">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none flex-nowrap lg:flex-wrap">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wide flex-shrink-0 mr-1 flex items-center gap-1">
              <span>📚</span>
              <span>Lesson:</span>
            </span>
            {ALL_LESSONS.map((l) => {
              const isCurrent = currentLesson === l.num;
              return (
                <button
                  key={l.num}
                  onClick={() => {
                    setCurrentLesson(l.num);
                    setActiveTab('cards');
                    playChime('click');
                  }}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? `${l.activeClass} text-white shadow-md scale-102 ring-2`
                      : `bg-white text-stone-700 border ${l.hoverBorder}`
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-stone-500 italic hidden xl:inline flex-shrink-0">
            💡 Tap speaker icon for audio
          </span>
        </div>

        {/* Navigation Tabs for Active Lesson - Smooth horizontal swipe */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  playChime('click');
                }}
                className={`flex-shrink-0 px-3 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 text-left cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-900 text-amber-300 shadow-md scale-102 ring-2 ring-amber-400'
                    : 'bg-white/80 text-stone-700 hover:bg-amber-200/60 border border-amber-200'
                }`}
              >
                <div>{item.label}</div>
                <div className={`text-[10px] ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                  {item.sub}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
