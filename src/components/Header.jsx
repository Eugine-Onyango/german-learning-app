import React, { useRef, useEffect } from 'react';
import { Volume2, ShieldCheck, Sparkles, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Header({
  currentLesson,
  setCurrentLesson,
  activeTab,
  setActiveTab,
  isSlowMode,
  setIsSlowMode
}) {
  const scrollRef = useRef(null);
  const activeBtnRef = useRef(null);

  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentLesson]);

  const scrollLessons = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

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
    if (currentLesson === 28) msg = "W-Fragen: Was sind Sie von Beruf? Warum bist du traurig? Wann heiratet ihr? Wer spricht gut Deutsch? Wen liebst du? Wo wohnst du? Woher kommst du? Wohin fahrt ihr? Wie viel kostet ein Fahrrad? Wie viele Kinder hast du?";
    if (currentLesson === 29) msg = "Im Restaurant und Café: Guten Tag! Wir wollen einen Tisch für zwei Personen. Was möchten Sie trinken? Ich nehme einen Kaffee und eine Pizza. Wir möchten zahlen, bitte! Zusammen oder getrennt? Stimmt so!";
    if (currentLesson === 30) msg = "Personalpronomen im Akkusativ: Kennst du mich? Ich kenne dich nicht. Herr Schmidt, ich suche Sie! Das ist Michael, ich kenne ihn. Michaela, ich finde sie schön. Mein Buch, ich finde es toll. Samantha und Mike, kennst du uns? Wer seid ihr, ich kenne euch nicht! Petra und Jürgen, ich kenne sie!";
    if (currentLesson === 31) msg = "Artikel im Dativ: Die Mutter kauft der Tochter ein Kleid. Petra kocht dem Mann eine Suppe. Er bringt dem Kind und den Kindern ein Geschenk. Sie dankt dem Mann und er hilft der Frau!";
    if (currentLesson === 32) msg = "Ordinalzahlen: erste, zweite, dritte, vierte, fünfte, sechste. Heute ist der sechste April. Ich habe am sechsten April Geburtstag. Das dritte Haus von links ist mein Haus!";
    if (currentLesson === 33) msg = "Zeit-Fragewörter: Wann hast du Geburtstag? Bis wann bleibst du? Seit wann lernst du Deutsch? Ab wann machst du Urlaub? Von wann bis wann arbeitest du? Um wie viel Uhr kommst du? Wie spät ist es? Wie lange dauert der Film? Wie oft gehst du ins Kino?";
    if (currentLesson === 34) msg = "Possessivartikel im Dativ: Ich gebe meinem Mann einen Kuss, meiner Tochter, meinem Baby, und meinen Kindern! Martin kauft seinem Bruder eine Schokolade, und wir kaufen unserem Vater ein Geschenk.";
    if (currentLesson === 35) msg = "Personalpronomen im Dativ: Gibst du mir ein Geschenk? Ich gebe dir ein Geschenk. Wie geht es Ihnen? Das Essen schmeckt mir sehr gut, und ich helfe dir gerne!";
    if (currentLesson === 36) msg = "Trennbare Verben: Ich stehe um 6 Uhr auf. Wann stehst du auf? Stehst du um 6 Uhr auf? Und mit Modalverb: Wann willst du aufstehen?";
    if (currentLesson === 37) msg = "Der Tagesablauf: Der Wecker klingelt um 6 Uhr. Ich stehe um halb sieben auf. Um 7 Uhr dusche ich und ziehe mich an. Um 13 Uhr esse ich zu Mittag. Und um halb elf gehe ich ins Bett und schlafe ein.";
    if (currentLesson === 38) msg = "Der Imperativ: Komm! Kommt! Kommen Sie bitte! Haben Sie bitte Geduld! Seien Sie bitte leise! Fahr doch jetzt!";
    if (currentLesson === 39) msg = "Wegbeschreibung: Wie komme ich zum Hauptbahnhof? Gehen Sie geradeaus, biegen Sie links ab, und an der Kreuzung ist der Bahnhof an der Ecke!";
    if (currentLesson === 40) msg = "Das Präteritum: Gestern war ich müde, aber heute bin ich munter! Letztes Jahr hatte ich kein Auto, heute habe ich ein Auto. Wir hatten einen Hund und waren im Unterricht!";
    if (currentLesson === 41) msg = "Untrennbare Verben: be-emp-ent-er, ge-miss-ver-zer! Er versteht mich gut. Wir bekommen bald eine neue Lehrerin. Kannst du bezahlen?";
    if (currentLesson === 42) msg = "krank sein: Ich bin krank. Ich fühle mich nicht wohl. Mir geht es nicht gut. Ich habe Kopfschmerzen, Fieber und eine Grippe. Mir tut der Hals weh. Gute Besserung!";
    if (currentLesson === 43) msg = "Das Perfekt: Was hast du gestern gemacht? Ich habe einen Salat gegessen und wir sind nach Paris gefahren. Tanja hat ihren Freund angerufen!";
    if (currentLesson === 44) msg = "haben oder sein im Perfekt: Maria hat mir geholfen, aber wir sind nach London geflogen! Wo bist du geblieben? Und was ist passiert?";
    if (currentLesson === 45) msg = "das Perfekt Teil 3: Die vier Baupläne für das Partizip zwei: regelmäßig, unregelmäßig, trennbar und untrennbar! Ich habe heute alles verstanden!";
    if (currentLesson === 46) msg = "Was hast du im Urlaub gemacht? Im Urlaub war ich in Spanien, habe Sehenswürdigkeiten besichtigt und mich erholt!";
    if (currentLesson === 47) msg = "Im Supermarkt: Ich gehe zum Supermarkt, kaufe ein Kilo Äpfel, eine Flasche Öl und bezahle an der Kasse. Das macht fünfundzwanzig Euro zehn bitte!";
    if (currentLesson === 48) msg = "Wie ist das Wetter? Heute ist das Wetter traumhaft! Die Sonne scheint, der Himmel ist klar und es ist fünfundzwanzig Grad warm!";
    if (currentLesson === 49) msg = "Verabredungen: Wollen wir zusammen ins Kino gehen? Ja gern, das passt! Wann und wo treffen wir uns? Um sechs Uhr vor dem Kino? Abgemacht! Bis dann, tschüss!";
    if (currentLesson === 50) msg = "Einladung: Lieber Boris, ich habe am Samstag Geburtstag und möchte dich herzlich einladen! Die Party beginnt um 18 Uhr bei uns zu Hause. Hoffentlich hast du Zeit! Viele Grüße, Monika.";
    if (currentLesson === 51) msg = "Gefallen und Missfallen: Das Kleid gefällt mir sehr gut! Wie findest du meine Schuhe? Die finde ich total klasse! Das gefällt mir überhaupt nicht.";
    if (currentLesson === 52) msg = "Fragepronomen welch: Welcher Hut ist schicker? Welchen Hut findest du schick? Zu welchem Hut passt meine Jacke? Welche Frau ist deine Kollegin? Welches Buch liest du? Welche Blumen gefallen dir?";
    if (currentLesson === 53) msg = "Demonstrativartikel dies: Was kostet dieser Pullover? Wie finden Sie diesen Pullover? Was passt zu dieser Bluse? Dieses Auto gefällt mir! In diesen Schuhen siehst du elegant aus!";
    if (currentLesson === 54) msg = "Im Kaufhaus: Guten Tag, Sie wünschen? Ich suche eine Hose für das Büro. Welche Größe haben Sie denn? Ich trage Größe 38. Wo ist die Umkleidekabine? Gleich hier um die Ecke! Sie passt genau. Was kostet sie? Sie kostet nur 30 Euro. Auf Wiedersehen!";
    if (currentLesson === 55) msg = "Mit dem Taxi fahren: Entschuldigen Sie, sind Sie frei? Können Sie mich zum Flughafen bringen? Schalten Sie bitte das Taxameter ein! Wie viel kostet das? Fünfzehn Euro fünfzig bitte. Stimmt so, der Rest ist für Sie!";
    if (currentLesson === 56) msg = "Zeitadverbien: Montags beginnt der Unterricht um 15 Uhr. Heute kocht mein Mann. Jetzt muss ich gehen! Zuerst lesen, dann übersetzen, danach einkaufen und später Eis essen. Er kommt immer zu spät!";
    if (currentLesson === 57) msg = "Am Telefon sprechen: Guten Tag, Firma Rohrmann GmbH, Sie sprechen mit Julia Becker. Was kann ich für Sie tun? Kann ich bitte mit Herrn Schmitz sprechen? Einen Augenblick bitte, ich verbinde Sie! Er spricht gerade auf der anderen Leitung. Kann ich ihm etwas ausrichten? Könnten Sie ihm bitte sagen, er soll mich zurückrufen? Auf Wiederhören!";
    if (currentLesson === 58) msg = "Beim Arzt: Praxis Dr. Lampert, guten Tag! Was fehlt Ihnen denn? Ich fühle mich seit gestern nicht wohl, habe Rückenschmerzen, Husten und Fieber. Der Arzt misst den Blutdruck und die Temperatur. Bleiben Sie im Bett, trinken Sie Kräutertee! Hier ist Ihre Arbeitsunfähigkeitsbescheinigung. Gute Besserung!";
    if (currentLesson === 59) msg = "Hotelreservierung: Sehr geehrte Damen und Herren, ich möchte ein Doppelzimmer mit Halbpension für drei Nächte reservieren. Wir kommen am siebten Juli mit dem Zug an. Haben Sie ein Zimmer mit Meeresblick? Sind Hunde erlaubt? Mit freundlichen Grüßen, Maria Schmidt.";
    if (currentLesson === 60) msg = "Touristeninfo und Formulare ausfüllen: Sehr geehrte Damen und Herren, wir möchten nach Wien reisen. Können Sie uns gute Hotels empfehlen? Schicken Sie uns bitte einen Stadtplan und ein Kulturprogramm! Ich fülle das Anmeldeformular aus: Familienstand verheiratet, Staatsangehörigkeit Deutsch, Geburtsdatum, Ort und Unterschrift.";
    if (currentLesson === 61) msg = "Die Post: Guten Tag! Ich möchte gern dieses Paket nach London schicken. Wieviel kostet das und wie lange braucht es? Ich hätte gern auch zwei Briefmarken für Postkarten und möchte diesen Brief per Einschreiben verschicken. Wo ist der Briefkasten?";
    if (currentLesson === 62) msg = "Die Bank: Guten Tag! Ich möchte ein Girokonto eröffnen, 100 Euro einzahlen und etwas Bargeld am Geldautomaten abheben. Bitte geben Sie Ihre Geheimzahl ein! Meine Karte ist weg, bitte sperren Sie sofort meine Karte über die 116 116!";
    if (currentLesson === 63) msg = "Wohnungssuche: Guten Tag! Ich finde Ihre 3-Zimmer-Wohnung in Berlin interessant. Ist die noch frei und gibt es einen Besichtigungstermin? Wie hoch sind die Kaltmiete, die Nebenkosten und die Kaution? Hat die Wohnung eine Einbauküche und einen Balkon?";
    if (currentLesson === 64) msg = "Eine Fahrkarte kaufen: Guten Tag! Ich brauche eine Fahrkarte nach München bitte, einfach mit dem nächsten Zug um 16 Uhr 30 auf Gleis 4. Muss ich umsteigen? Nein, ein direkter ICE ohne Umstieg. Was kostet das? 58 Euro. Gute Reise!";
    if (currentLesson === 65) msg = "Test A1: Guten Tag, ich heiße Alex. Hallo, wie geht es dir? Gut, und dir? Welche Sprachen sprichst du? Am Wochenende kaufen wir ein und ich bin ins Kino gegangen. Max kann sehr gut Deutsch sprechen!";
    if (currentLesson === 'summary-1') msg = "Visual Redemittel: Guten Tag! Wie heißen Sie? Mein Name ist Dana Sahin. Ich heiße Dana Sahin. Ich bin Dana Sahin. Guten Morgen, Guten Tag, Guten Abend, Gute Nacht! Tschüs und auf Wiedersehen! Buchstabieren Sie bitte: S-A-H-I-N.";
    if (currentLesson === 'summary-2') msg = "Visual Grammatik: ich komme, du kommst, du heißt! ich bin, du bist, er ist, wir sind, ihr seid. der Bleistift, das Heft, die Lampe. In Berlin ist es elf Uhr. Da ist kein Bus. Doch, da ist ein Bus! Wie heißt das auf Deutsch?";
    speakGerman(msg, isSlowMode);
  };

  const summary1NavItems = [
    { id: 'cards', label: '📖 Summary 1 Cards', sub: 'Visual Redemittel Cards' },
    { id: 'summary1Studio', label: '🎨 Redemittel Studio', sub: '4 Visual Stations & Badge Maker' },
    { id: 'summary1Game', label: '🎮 Redemittel Challenge', sub: 'Situations & Spelling Quiz' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Visual Chalkboard' },
  ];

  const summary2NavItems = [
    { id: 'cards', label: '📖 Summary 2 Cards', sub: 'Grammar & Redemittel Cards' },
    { id: 'summary2Studio', label: '🧩 Grammatik Studio', sub: 'Verbs, Articles, Pos 2 & Doch' },
    { id: 'summary2Game', label: '🎮 Grammatik Challenge', sub: 'Grammar & Redemittel Quiz' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Visual Chalkboard' },
  ];

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

  const lesson28NavItems = [
    { id: 'cards', label: '📖 Lesson 28 Cards', sub: '13 W-Fragen & Examples' },
    { id: 'studio28', label: '🧭 W-Fragen Studio', sub: 'Soundboard, Showdowns & Builder' },
    { id: 'game28', label: '🎮 W-Fragen Quiz', sub: '13 Question Keys Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson29NavItems = [
    { id: 'cards', label: '📖 Lesson 29 Cards', sub: 'Restaurant & Café Dialogue' },
    { id: 'studio29', label: '🍽️ Restaurant & Café Studio', sub: 'Dialogue Flow, Counter & Speisekarte' },
    { id: 'game29', label: '🎮 Dining Out Quiz', sub: 'Real Life Ordering Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson30NavItems = [
    { id: 'cards', label: '📖 Lesson 30 Cards', sub: 'mich, dich, ihn, uns, euch & Twins' },
    { id: 'studio30', label: '🔄 Pronouns Akk Studio', sub: '10 Stories, Matrix & Sentence Lab' },
    { id: 'game30', label: '🎮 Pronouns Akk Quiz', sub: 'Object Pronoun Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson31NavItems = [
    { id: 'cards', label: '📖 Lesson 31 Cards', sub: 'dem, der, dem, den (+n) & Verbs' },
    { id: 'studio31', label: '🎁 Dativ Receiver Studio', sub: 'The Gift Flow, M-R-M-N & Builder' },
    { id: 'game31', label: '🎮 Dativ Quiz Challenge', sub: 'Receiver & Beneficiary Quiz' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson32NavItems = [
    { id: 'cards', label: '📖 Lesson 32 Cards', sub: 'erste, zweite, dritte... 1. bis 1000.' },
    { id: 'studio32', label: '🥇 Ordinal Numbers Studio', sub: 'Date Builder, Ladder & Milestones' },
    { id: 'game32', label: '🎮 Ordinal Numbers Quiz', sub: 'Dates, Rebels & Endings Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson33NavItems = [
    { id: 'cards', label: '📖 Lesson 33 Cards', sub: '9 Question Keys & Prepositions' },
    { id: 'studio33', label: '⏰ Time Questions Studio', sub: '9 Keys, Preposition Hub & Dialogues' },
    { id: 'game33', label: '🎮 Time Detective Quiz', sub: 'Wann, Bis wann & Frequency Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson34NavItems = [
    { id: 'cards', label: '📖 Lesson 34 Cards', sub: 'meinem, meiner, unserem, ihren' },
    { id: 'studio34', label: '🎁 Possessive Dativ Studio', sub: '4 Stories, Master Matrix & Builder' },
    { id: 'game34', label: '🎮 Possessive Dativ Quiz', sub: 'Beneficiary & Exercises Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson35NavItems = [
    { id: 'cards', label: '📖 Lesson 35 Cards', sub: 'mir, dir, ihm, ihr, uns, euch' },
    { id: 'studio35', label: '🎁 Dativ Pronoun Studio', sub: '10 Stories, Master Matrix & Hit Verbs' },
    { id: 'game35', label: '🎮 Dativ Pronoun Quiz', sub: 'Pronoun Swap & Sentences Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson36NavItems = [
    { id: 'cards', label: '📖 Lesson 36 Cards', sub: 'aufstehen, anrufen, abfahren...' },
    { id: 'studio36', label: '🚀 Separable Verbs Studio', sub: 'Rocket Slots, 15 Verbs & Puzzles' },
    { id: 'game36', label: '🎮 Separable Verbs Quiz', sub: 'Positions & Modal Glue Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson37NavItems = [
    { id: 'cards', label: '📖 Lesson 37 Cards', sub: 'Tagesablauf & Zeitabläufe' },
    { id: 'studio37', label: '🌅 Daily Routine Studio', sub: '24-Hour Day, Inversion & Blocks' },
    { id: 'game37', label: '🎮 Daily Routine Quiz', sub: 'Routine & Inversion Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson38NavItems = [
    { id: 'cards', label: '📖 Lesson 38 Cards', sub: 'Commands, Requests & Rebels' },
    { id: 'studio38', label: '📣 Imperativ Studio', sub: '3-Lane Factory, Rebels & Hits' },
    { id: 'game38', label: '🎮 Imperativ Quiz', sub: 'Action & Command Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson39NavItems = [
    { id: 'cards', label: '📖 Lesson 39 Cards', sub: 'Landmarks, Arrows & Turns' },
    { id: 'studio39', label: '🗺️ Directions Studio', sub: 'GPS Navigator, zum vs zur & Dialogues' },
    { id: 'game39', label: '🎮 Navigation Quiz', sub: 'Street Challenge Game' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson40NavItems = [
    { id: 'cards', label: '📖 Lesson 40 Cards', sub: 'war vs hatte & Mirror Twins' },
    { id: 'studio40', label: '⏳ Time-Travel Studio', sub: 'Contrast, Conjugator & Drills' },
    { id: 'game40', label: '🎮 Präteritum Quiz', sub: 'Past Tense Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson41NavItems = [
    { id: 'cards', label: '📖 Lesson 41 Cards', sub: 'The 8 Prefixes & Superglue Rule' },
    { id: 'studio41', label: '🛡️ Inseparable Verbs Studio', sub: 'Bodyguards, Rocket Contrast & Forge' },
    { id: 'game41', label: '🎮 Superglue Quiz', sub: 'Prefixes & Positions Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson42NavItems = [
    { id: 'cards', label: '📖 Lesson 42 Cards', sub: 'Symptoms & Illnesses' },
    { id: 'studio42', label: '🏥 Health & Clinic Studio', sub: '3 Formulas, Body Map & Advice' },
    { id: 'game42', label: '🎮 Health & Doctor Quiz', sub: 'Symptoms & wehtun Challenge' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson43NavItems = [
    { id: 'cards', label: '📖 Lesson 43 Cards', sub: 'The Satzklammer & 4 Partizip Types' },
    { id: 'studio43', label: '⏳ Perfekt Studio', sub: 'Bracket Train, Matrix & Puzzles' },
    { id: 'game43', label: '🎮 Perfekt Quiz Challenge', sub: 'haben vs sein & Satzklammer' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson44NavItems = [
    { id: 'cards', label: '📖 Lesson 44 Cards', sub: 'haben vs. sein Selection Rules' },
    { id: 'studio44', label: '👑 Auxiliary Throne', sub: 'Decision Matrix, Matrix & Drills' },
    { id: 'game44', label: '🎮 Auxiliary Quiz Challenge', sub: 'haben vs. sein Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson45NavItems = [
    { id: 'cards', label: '📖 Lesson 45 Cards', sub: 'The 4 Partizip II Blueprints' },
    { id: 'studio45', label: '🧱 Blueprint Studio', sub: 'Lego Assembly, Matrix & Drills' },
    { id: 'game45', label: '🎮 Blueprint Quiz Game', sub: 'Partizip II Formation Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson46NavItems = [
    { id: 'cards', label: '📖 Lesson 46 Cards', sub: 'Vacations & Activities' },
    { id: 'studio46', label: '🏖️ Urlaub Studio', sub: 'Diary Builder, Phraseboard & Forge' },
    { id: 'game46', label: '🎮 Vacation Quiz', sub: 'Travel & Memories Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson47NavItems = [
    { id: 'cards', label: '📖 Lesson 47 Cards', sub: 'Groceries & Aisles' },
    { id: 'studio47', label: '🛒 Supermarkt Studio', sub: 'Cart Simulator, Aisles & Checkout' },
    { id: 'game47', label: '🎮 Supermarkt Quiz', sub: 'Shopping & Checkout Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson48NavItems = [
    { id: 'cards', label: '📖 Lesson 48 Cards', sub: 'Weather Nouns & Adjectives' },
    { id: 'studio48', label: '🌦️ Wetter Studio', sub: 'Station, Thermometer & Forecast' },
    { id: 'game48', label: '🎮 Wetter Quiz', sub: 'Forecast & Weather Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson49NavItems = [
    { id: 'cards', label: '📖 Lesson 49 Cards', sub: 'Meetup Invitations & Excuses' },
    { id: 'studio49', label: '📅 Verabredung Studio', sub: 'Meetup Builder, Excuses & Logistics' },
    { id: 'game49', label: '🎮 Verabredung Quiz', sub: 'Planning & Social Meetup Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson50NavItems = [
    { id: 'cards', label: '📖 Lesson 50 Cards', sub: 'Invitations & Replies' },
    { id: 'studio50', label: '✉️ Einladung Studio', sub: 'Letter Composer, RSVP & Declines' },
    { id: 'game50', label: '🎮 Einladung Quiz', sub: 'Letters, Potluck & RSVP Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson51NavItems = [
    { id: 'cards', label: '📖 Lesson 51 Cards', sub: 'Likes, Dislikes & Opinions' },
    { id: 'studio51', label: '👗 Opinion Studio', sub: 'Outfit Dialogue, Rating Scale & Reviews' },
    { id: 'game51', label: '🎮 Opinion Quiz', sub: 'Likes, Dislikes & Taste Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson52NavItems = [
    { id: 'cards', label: '📖 Lesson 52 Cards', sub: 'Which? Interrogative Pronoun' },
    { id: 'studio52', label: '🎩 Welch- Studio', sub: 'Master Matrix, Object Q&A & Adjectives' },
    { id: 'game52', label: '🎮 Welch- Quiz', sub: 'Cases, Genders & Mirror Endings' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson53NavItems = [
    { id: 'cards', label: '📖 Lesson 53 Cards', sub: 'This & These Demonstratives' },
    { id: 'studio53', label: '🛍️ Dies- Studio', sub: 'Master Matrix, Boutique Simulator & Duet' },
    { id: 'game53', label: '🎮 Dies- Quiz', sub: 'Pointing & Cases Practice' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson54NavItems = [
    { id: 'cards', label: '📖 Lesson 54 Cards', sub: 'Department Store & Shopping' },
    { id: 'studio54', label: '🏬 Kaufhaus Studio', sub: 'Floor Directory, Roleplay & Pronouns' },
    { id: 'game54', label: '🎮 Kaufhaus Quiz', sub: 'Sales & Fitting Room Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson55NavItems = [
    { id: 'cards', label: '📖 Lesson 55 Cards', sub: 'Taxi Vocab & Ride Dialogues' },
    { id: 'studio55', label: '🚕 Taxi Studio', sub: 'Hotline, Ride Cockpit & Tipping' },
    { id: 'game55', label: '🎮 Taxi Quiz', sub: 'Booking, In-Ride & Fare Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson56NavItems = [
    { id: 'cards', label: '📖 Lesson 56 Cards', sub: 'Time Adverbs & Sentence Positions' },
    { id: 'studio56', label: '⏰ Zeit Studio', sub: 'Habitual Days, Timelines & Frequency' },
    { id: 'game56', label: '🎮 Zeit Quiz', sub: 'Timeline & Word Order Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson57NavItems = [
    { id: 'cards', label: '📖 Lesson 57 Cards', sub: 'Phone Vocab & Greetings' },
    { id: 'studio57', label: '📞 Telefon Studio', sub: 'Switchboard, Clarification & Duet' },
    { id: 'game57', label: '🎮 Telefon Quiz', sub: 'Phone Scenarios & Etiquette' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson58NavItems = [
    { id: 'cards', label: '📖 Lesson 58 Cards', sub: 'Doctor Vocab & Vitals' },
    { id: 'studio58', label: '🩺 Arzt Studio', sub: 'Booking, Exam, Vitals & AU-Note' },
    { id: 'game58', label: '🎮 Arzt Quiz', sub: 'Clinic & Diagnosis Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson59NavItems = [
    { id: 'cards', label: '📖 Lesson 59 Cards', sub: 'Hotel Vocab & Boards' },
    { id: 'studio59', label: '🏨 Hotel Studio', sub: 'Room Config & Letter Composer' },
    { id: 'game59', label: '🎮 Hotel Quiz', sub: 'Lodging & Booking Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson60NavItems = [
    { id: 'cards', label: '📖 Lesson 60 Cards', sub: 'Tourist Info & Forms Vocab' },
    { id: 'studio60', label: '📝 Formular Studio', sub: 'Interactive Form & Letter Generator' },
    { id: 'game60', label: '🎮 Formular Quiz', sub: 'Bureaucracy & Travel Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson61NavItems = [
    { id: 'cards', label: '📖 Lesson 61 Cards', sub: 'Post Office & Shipping Vocab' },
    { id: 'studio61', label: '🏤 Post Studio', sub: 'Counter Simulator & Envelope Lab' },
    { id: 'game61', label: '🎮 Post Quiz', sub: 'Postal & Shipping Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson62NavItems = [
    { id: 'cards', label: '📖 Lesson 62 Cards', sub: 'Bank, Money & Accounts Vocab' },
    { id: 'studio62', label: '🏦 Bank Studio', sub: 'ATM Simulator & SEPA Transfers' },
    { id: 'game62', label: '🎮 Bank Quiz', sub: 'Banking & Cash Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson63NavItems = [
    { id: 'cards', label: '📖 Lesson 63 Cards', sub: 'Apartment Hunt & Ads Vocab' },
    { id: 'studio63', label: '🏠 Wohnung Studio', sub: 'Ad Decoder, Viewing & Rent Math' },
    { id: 'game63', label: '🎮 Wohnung Quiz', sub: 'Classifieds & Acronym Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson64NavItems = [
    { id: 'cards', label: '📖 Lesson 64 Cards', sub: 'Train, Station & Transit Vocab' },
    { id: 'studio64', label: '🚆 Fahrkarten Studio', sub: 'DB Timetable, Schalter Roleplay & Guide' },
    { id: 'game64', label: '🎮 Bahn Quiz', sub: 'Timetable, Tracks & Booking Mastery' },
    { id: 'memory', label: '🃏 Memory Match', sub: 'Flip & Match Pairs' },
    { id: 'summary', label: '📋 At a Glance', sub: 'Exact Slide Chalkboard' },
  ];

  const lesson65NavItems = [
    { id: 'cards', label: '📖 Lesson 65 Cards', sub: 'A1 Milestone Question Bank' },
    { id: 'studio65', label: '🎓 Test A1 Studio', sub: '20-Question Exam, Rules & Sandbox' },
    { id: 'game65', label: '🎮 A1 Blitz Quiz', sub: 'Speed Diagnostic Mastery' },
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
  if (currentLesson === 28) navItems = lesson28NavItems;
  if (currentLesson === 29) navItems = lesson29NavItems;
  if (currentLesson === 30) navItems = lesson30NavItems;
  if (currentLesson === 31) navItems = lesson31NavItems;
  if (currentLesson === 32) navItems = lesson32NavItems;
  if (currentLesson === 33) navItems = lesson33NavItems;
  if (currentLesson === 34) navItems = lesson34NavItems;
  if (currentLesson === 35) navItems = lesson35NavItems;
  if (currentLesson === 36) navItems = lesson36NavItems;
  if (currentLesson === 37) navItems = lesson37NavItems;
  if (currentLesson === 38) navItems = lesson38NavItems;
  if (currentLesson === 39) navItems = lesson39NavItems;
  if (currentLesson === 40) navItems = lesson40NavItems;
  if (currentLesson === 41) navItems = lesson41NavItems;
  if (currentLesson === 42) navItems = lesson42NavItems;
  if (currentLesson === 43) navItems = lesson43NavItems;
  if (currentLesson === 44) navItems = lesson44NavItems;
  if (currentLesson === 45) navItems = lesson45NavItems;
  if (currentLesson === 46) navItems = lesson46NavItems;
  if (currentLesson === 47) navItems = lesson47NavItems;
  if (currentLesson === 48) navItems = lesson48NavItems;
  if (currentLesson === 49) navItems = lesson49NavItems;
  if (currentLesson === 50) navItems = lesson50NavItems;
  if (currentLesson === 51) navItems = lesson51NavItems;
  if (currentLesson === 52) navItems = lesson52NavItems;
  if (currentLesson === 53) navItems = lesson53NavItems;
  if (currentLesson === 54) navItems = lesson54NavItems;
  if (currentLesson === 55) navItems = lesson55NavItems;
  if (currentLesson === 56) navItems = lesson56NavItems;
  if (currentLesson === 57) navItems = lesson57NavItems;
  if (currentLesson === 58) navItems = lesson58NavItems;
  if (currentLesson === 59) navItems = lesson59NavItems;
  if (currentLesson === 60) navItems = lesson60NavItems;
  if (currentLesson === 61) navItems = lesson61NavItems;
  if (currentLesson === 62) navItems = lesson62NavItems;
  if (currentLesson === 63) navItems = lesson63NavItems;
  if (currentLesson === 64) navItems = lesson64NavItems;
  if (currentLesson === 65) navItems = lesson65NavItems;
  if (currentLesson === 'summary-1') navItems = summary1NavItems;
  if (currentLesson === 'summary-2') navItems = summary2NavItems;

  const ALL_LESSONS = [
    { num: 'summary-1', label: "📑 Summary 1: Redemittel", activeClass: "bg-amber-600 ring-amber-300", hoverBorder: "hover:bg-amber-200/60 border-amber-300" },
    { num: 'summary-2', label: "📑 Summary 2: Grammatik", activeClass: "bg-indigo-600 ring-indigo-300", hoverBorder: "hover:bg-indigo-200/60 border-indigo-300" },
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
    { num: 14, label: "⚡ 14: Unregelmäßige Verben", activeClass: "bg-purple-700 ring-purple-400", hoverBorder: "hover:bg-purple-100 border-violet-300" },
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
    { num: 28, label: "❓ 28: W-Fragen (W-Questions)", activeClass: "bg-amber-600 ring-amber-300", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 29, label: "🍽️ 29: Restaurant & Café", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 30, label: "🔄 30: Personalpronomen (Akk)", activeClass: "bg-emerald-700 ring-emerald-400", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 31, label: "🎁 31: Artikel im Dativ", activeClass: "bg-purple-700 ring-purple-400", hoverBorder: "hover:bg-purple-100 border-purple-300" },
    { num: 32, label: "🥇 32: Ordinalzahlen", activeClass: "bg-amber-600 ring-amber-300", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 33, label: "⏰ 33: Zeit-Fragewörter", activeClass: "bg-indigo-700 ring-indigo-400", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 34, label: "🎁 34: Possessiv im Dativ", activeClass: "bg-purple-700 ring-purple-400", hoverBorder: "hover:bg-purple-100 border-purple-300" },
    { num: 35, label: "🎁 35: Pronomen im Dativ", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 36, label: "🚀 36: Trennbare Verben", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 37, label: "🌅 37: Der Tagesablauf", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 38, label: "📣 38: Der Imperativ", activeClass: "bg-red-700 ring-red-400", hoverBorder: "hover:bg-red-100 border-red-300" },
    { num: 39, label: "🗺️ 39: Wegbeschreibung", activeClass: "bg-blue-700 ring-blue-400", hoverBorder: "hover:bg-blue-100 border-blue-300" },
    { num: 40, label: "⏳ 40: war / hatte (Past)", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 41, label: "🛡️ 41: Untrennbare Verben", activeClass: "bg-teal-700 ring-teal-400", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 42, label: "🏥 42: krank sein (Health)", activeClass: "bg-rose-700 ring-rose-400", hoverBorder: "hover:bg-rose-100 border-rose-300" },
    { num: 43, label: "⏳ 43: das Perfekt (Teil 1)", activeClass: "bg-indigo-700 ring-indigo-400", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 44, label: "👑 44: haben vs. sein (Perfekt)", activeClass: "bg-amber-700 ring-amber-400", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 45, label: "🏭 45: Partizip II Blueprints", activeClass: "bg-indigo-700 ring-indigo-400", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 46, label: "🏖️ 46: Urlaub & Ferien", activeClass: "bg-amber-600 ring-amber-300", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 47, label: "🛒 47: Im Supermarkt", activeClass: "bg-emerald-700 ring-emerald-300", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 48, label: "🌦️ 48: Wie ist das Wetter?", activeClass: "bg-sky-700 ring-sky-300", hoverBorder: "hover:bg-sky-100 border-sky-300" },
    { num: 49, label: "📅 49: Verabredungen", activeClass: "bg-teal-700 ring-teal-300", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 50, label: "✉️ 50: Die Einladung", activeClass: "bg-rose-700 ring-rose-300", hoverBorder: "hover:bg-rose-100 border-rose-300" },
    { num: 51, label: "👗 51: Gefallen & Missfallen", activeClass: "bg-rose-700 ring-rose-300", hoverBorder: "hover:bg-rose-100 border-rose-300" },
    { num: 52, label: "🎩 52: welch- (Which?)", activeClass: "bg-indigo-700 ring-indigo-300", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 53, label: "👉 53: dies- (This/These)", activeClass: "bg-rose-700 ring-rose-300", hoverBorder: "hover:bg-rose-100 border-rose-300" },
    { num: 54, label: "🏬 54: Im Kaufhaus", activeClass: "bg-indigo-700 ring-indigo-300", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 55, label: "🚕 55: Mit dem Taxi", activeClass: "bg-amber-600 ring-amber-300", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 56, label: "⏰ 56: Zeitadverbien", activeClass: "bg-indigo-700 ring-indigo-300", hoverBorder: "hover:bg-indigo-100 border-indigo-300" },
    { num: 57, label: "📞 57: Am Telefon", activeClass: "bg-emerald-700 ring-emerald-300", hoverBorder: "hover:bg-emerald-100 border-emerald-300" },
    { num: 58, label: "🩺 58: Beim Arzt", activeClass: "bg-rose-700 ring-rose-300", hoverBorder: "hover:bg-rose-100 border-rose-300" },
    { num: 59, label: "🏨 59: Hotelreservierung", activeClass: "bg-amber-700 ring-amber-300", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 60, label: "📝 60: Touristeninfo & Formulare", activeClass: "bg-teal-700 ring-teal-300", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 61, label: "🏤 61: Die Post", activeClass: "bg-amber-700 ring-amber-300", hoverBorder: "hover:bg-amber-100 border-amber-300" },
    { num: 62, label: "🏦 62: Die Bank", activeClass: "bg-red-700 ring-red-300", hoverBorder: "hover:bg-red-100 border-red-300" },
    { num: 63, label: "🏠 63: Wohnungssuche", activeClass: "bg-teal-700 ring-teal-300", hoverBorder: "hover:bg-teal-100 border-teal-300" },
    { num: 64, label: "🚆 64: Fahrkarte kaufen", activeClass: "bg-red-700 ring-red-300", hoverBorder: "hover:bg-red-100 border-red-300" },
    { num: 65, label: "🎓 65: Test A1", activeClass: "bg-teal-700 ring-teal-300", hoverBorder: "hover:bg-teal-100 border-teal-300" },
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

        {/* Lesson Switcher Row - Sleek single horizontal strip with auto-center, quick dropdown selector & scroll buttons */}
        <div className="py-2 flex items-center justify-between gap-2 border-b border-amber-200/70">
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Dropdown Picker for 1-click jump to any lesson or summary */}
            <select
              value={currentLesson}
              onChange={(e) => {
                const val = e.target.value;
                setCurrentLesson(isNaN(Number(val)) ? val : Number(val));
                setActiveTab('cards');
                playChime('click');
              }}
              className="bg-white text-stone-800 border-2 border-amber-300 rounded-xl px-2.5 py-1 text-xs font-black shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 hover:border-amber-400"
              title="Jump directly to any lesson"
            >
              {ALL_LESSONS.map((l) => (
                <option key={l.num} value={l.num}>
                  {l.label}
                </option>
              ))}
            </select>

            {/* Scroll navigation arrows for desktop */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => scrollLessons(-280)}
                className="w-6 h-6 rounded-full bg-white/90 hover:bg-amber-100 border border-amber-300 flex items-center justify-center text-stone-600 transition-all shadow-xs"
                title="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollLessons(280)}
                className="w-6 h-6 rounded-full bg-white/90 hover:bg-amber-100 border border-amber-300 flex items-center justify-center text-stone-600 transition-all shadow-xs"
                title="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Smooth horizontal scroll strip */}
          <div
            ref={scrollRef}
            className="flex items-center gap-1.5 overflow-x-auto pb-0.5 max-w-full scrollbar-none flex-nowrap scroll-smooth"
          >
            {ALL_LESSONS.map((l) => {
              const isCurrent = currentLesson === l.num;
              return (
                <button
                  key={l.num}
                  ref={isCurrent ? activeBtnRef : null}
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

          <span className="text-[11px] text-stone-500 italic hidden 2xl:inline flex-shrink-0">
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
