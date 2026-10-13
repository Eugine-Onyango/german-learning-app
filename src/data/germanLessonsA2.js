// German Lessons Data: Level A2
// A2 Lektion 1: Sich vorstellen (Introducing Yourself)
// Based on official A2 curriculum slides and worksheet: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys, Merkzettel

export const A2_LESSON_1_ITEMS = [
  // 1. NAME
  {
    id: "a2-l1-name-wie-heisst-du",
    german: "Wie heißt du? / Wie ist dein Name?",
    english: "What is your name?",
    pronunciation: "VEE hy-st doo? / VEE ist dyn NAH-meh?",
    audioText: "Wie heißt du? Wie ist dein Name?",
    category: "name",
    badge: "Name Question",
    icon: "🏷️",
    kenyanAnalogy: "Like asking someone at the bus stage or tea gathering: 'What's your name?' Short, direct, and friendly.",
    memoryTrick: "Wie = How / What; heißen = to be called; dein Name = your name.",
    imageType: "name-tag"
  },
  {
    id: "a2-l1-name-vorname-nachname",
    german: "Mein Vorname ist Sam und Familienname ist Müller.",
    english: "My first name is Sam and my surname is Müller.",
    pronunciation: "Myn FOR-nah-meh ist Sam oont fah-MEE-lyen-nah-meh ist MEW-ler.",
    audioText: "Mein Vorname ist Sam und Familienname ist Müller.",
    category: "name",
    badge: "Official & Clear",
    icon: "📝",
    kenyanAnalogy: "Just like filling out an ID or bank form at Safaricom: 'Vorname' is the name in front (First Name), and 'Familienname' is your family clan surname!",
    memoryTrick: "Vor = In front (First); Familie = Family; Name = Name!",
    imageType: "id-card"
  },
  {
    id: "a2-l1-name-drei-formeln",
    german: "Ich heiße Sam Müller. / Ich bin Sam Müller. / Mein Name ist Sam Müller.",
    english: "I am called Sam Müller. / I am Sam Müller. / My name is Sam Müller.",
    pronunciation: "Ikh HY-seh Sam Mew-ler / Ikh bin Sam Mew-ler / Myn NAH-meh ist Sam Mew-ler.",
    audioText: "Ich heiße Sam Müller. Ich bin Sam Müller. Mein Name ist Sam Müller.",
    category: "name",
    badge: "3 Core Formulas",
    icon: "🤝",
    kenyanAnalogy: "The 3 gold standards of introducing yourself in Germany. All three are 100% natural and interchangeable!",
    memoryTrick: "Choose whichever rolls off your tongue easiest: 'Ich bin...' is the fastest!",
    imageType: "handshake"
  },

  // 2. ALTER (Age)
  {
    id: "a2-l1-alter-25-jahre",
    german: "Ich bin 25. / Ich bin 25 Jahre alt.",
    english: "I am 25. / I am 25 years old.",
    pronunciation: "Ikh bin foonf-oont-TSVAHN-tsikh. / Ikh bin foonf-oont-TSVAHN-tsikh YAH-reh ahlt.",
    audioText: "Ich bin fünfundzwanzig. Ich bin fünfundzwanzig Jahre alt.",
    category: "alter",
    badge: "Age Statement",
    icon: "🎂",
    kenyanAnalogy: "Just like saying 'I'm 25' or 'I am 25 years old'. Note that in German we use 'bin' (am), NEVER 'have'!",
    memoryTrick: "German uses 'sein' (to be) for age: 'Ich bin...', never 'ich habe'!",
    imageType: "birthday-cake"
  },
  {
    id: "a2-l1-alter-geboren-jahr",
    german: "Ich bin im Jahr 1992 geboren. / Ich bin 1992 geboren.",
    english: "I was born in the year 1992. / I was born in 1992.",
    pronunciation: "Ikh bin im Yahr noyn-tsehn-hoon-dert-tsvy-oont-NOYN-tsikh geh-BOH-ren.",
    audioText: "Ich bin im Jahr neunzehnhundertzweiundneunzig geboren. Ich bin neunzehnhundertzweiundneunzig geboren.",
    category: "alter",
    badge: "Birth Year Master",
    icon: "🍼",
    kenyanAnalogy: "Slide 7 rule: You can say 'im Jahr 1992' OR just '1992'. But NEVER say 'in 1992' (English trap)!",
    memoryTrick: "Say either 'im Jahr [Year]' or jump straight into '[Year]'. Don't say 'in [Year]' alone!",
    imageType: "calendar"
  },

  // 3. LAND (Country / Origin)
  {
    id: "a2-l1-land-herkunft",
    german: "Ich komme aus Deutschland. / Ich komme aus Kenia.",
    english: "I come from Germany. / I come from Kenya.",
    pronunciation: "Ikh KOH-meh ows DOYTSH-lahnt. / Ikh KOH-meh ows KEH-nya.",
    audioText: "Ich komme aus Deutschland. Ich komme aus Kenia.",
    category: "land",
    badge: "Country Origin",
    icon: "🌍",
    kenyanAnalogy: "Standard origin: 90% of countries use pure 'aus' with no article (aus Kenia, aus Deutschland, aus Spanien).",
    memoryTrick: "aus + [Country name] for normal countries!",
    imageType: "globe"
  },
  {
    id: "a2-l1-land-rebels",
    german: "Ich komme aus der Schweiz. / Ich komme aus den USA. / Ich komme aus der Türkei.",
    english: "I come from Switzerland. / I come from the USA. / I come from Turkey.",
    pronunciation: "Ikh KOH-meh ows dair SHVYE-ts. / Ikh KOH-meh ows dain oo-ess-AH.",
    audioText: "Ich komme aus der Schweiz. Ich komme aus den USA. Ich komme aus der Türkei.",
    category: "land",
    badge: "Grammar Rebels!",
    icon: "🇨🇭",
    kenyanAnalogy: "Rebel alert: Switzerland and Turkey are feminine ('aus der Schweiz', 'aus der Türkei'). The USA is plural ('aus den USA')!",
    memoryTrick: "Switzerland & Turkey = 'aus der'; USA = 'aus den'!",
    imageType: "passport"
  },

  // 4. WOHNORT (Living City & Setup)
  {
    id: "a2-l1-wohnort-setup",
    german: "Ich wohne in Berlin mit meiner Familie. / Ich wohne in einer WG.",
    english: "I live in Berlin with my family. / I live in a shared flat (WG).",
    pronunciation: "Ikh VOH-neh in bair-LEEN mit MY-nair fah-MEE-lyeh. / Ikh VOH-neh in EYE-nair VEH-GEH.",
    audioText: "Ich wohne in Berlin mit meiner Familie. Ich wohne in einer WG.",
    category: "wohnort",
    badge: "Living Setup",
    icon: "🏠",
    kenyanAnalogy: "WG = 'Wohngemeinschaft' (a shared student house/apartment where roommates split rent and cooking, like college hostels or shared Nairobi bedsitters)!",
    memoryTrick: "WG stands for Wohn (Living) + Gemeinschaft (Community)!",
    imageType: "apartment"
  },

  // 5. SPRACHEN (Languages)
  {
    id: "a2-l1-sprachen-levels",
    german: "Meine Muttersprache ist Swahili. Ich spreche sehr gut Englisch und etwas Deutsch.",
    english: "My mother tongue is Swahili. I speak English very well and a bit of German.",
    pronunciation: "MY-neh MOO-ter-shpra-kheh ist Swahili. Ikh SHPREH-kheh zayr goot ENG-lish oont ET-vahs DOYTSH.",
    audioText: "Meine Muttersprache ist Swahili. Ich spreche sehr gut Englisch und etwas Deutsch.",
    category: "sprachen",
    badge: "Language Fluency",
    icon: "🗣️",
    kenyanAnalogy: "Muttersprache = Mother tongue. 'Sehr gut' = Very well. 'Etwas Deutsch' / 'ein wenig Deutsch' = a little bit / kidogo tu!",
    memoryTrick: "Mutter (Mother) + Sprache (Language) = Native language!",
    imageType: "speech-bubbles"
  },

  // 6. BERUF (Job & Profession)
  {
    id: "a2-l1-beruf-gender-rule",
    german: "Ich bin Lehrer. / Ich bin Lehrerin. / Ich arbeite als Lehrerin.",
    english: "I am a teacher (male). / I am a teacher (female). / I work as a teacher.",
    pronunciation: "Ikh bin LAY-rer. / Ikh bin LAY-reh-rin. / Ikh AHR-by-teh ahls LAY-reh-rin.",
    audioText: "Ich bin Lehrer. Ich bin Lehrerin. Ich arbeite als Lehrerin.",
    category: "beruf",
    badge: "The -in Rule",
    icon: "👨‍🏫",
    kenyanAnalogy: "The legendary German job rule: Add '-in' for female professionals! Lehrer ➔ Lehrerin, Arzt ➔ Ärztin, Student ➔ Studentin.",
    memoryTrick: "Job title: Male = base word, Female = base + in!",
    imageType: "graduation-cap"
  },
  {
    id: "a2-l1-beruf-firma-status",
    german: "Ich arbeite bei Deutsche Bahn in München. / Ich arbeite Teilzeit.",
    english: "I work at Deutsche Bahn in Munich. / I work part-time.",
    pronunciation: "Ikh AHR-by-teh by DOYTSH-eh BAHN in MEWN-khen. / Ikh AHR-by-teh TYLE-tsyt.",
    audioText: "Ich arbeite bei Deutsche Bahn in München. Ich arbeite Teilzeit.",
    category: "beruf",
    badge: "Company & Hours",
    icon: "💼",
    kenyanAnalogy: "When stating where you work: Use 'bei + [Company Name]' (bei Safaricom, bei BMW, bei Deutsche Bahn). 'Teilzeit' = part-time!",
    memoryTrick: "bei = at / with (for employers). Teilzeit = Part time!",
    imageType: "office-building"
  },

  // 7. HOBBY (Free Time & Hobbies)
  {
    id: "a2-l1-hobby-formeln",
    german: "Meine Hobbys sind fernsehen und Gitarre spielen. In meiner Freizeit lese ich gern.",
    english: "My hobbies are watching TV and playing guitar. In my free time I like to read.",
    pronunciation: "MY-neh HOB-bees zint FAIRN-zay-hen oont gee-TAH-reh SHPEE-len. In MY-nair FRY-tsyt LAY-zeh ikh gairn.",
    audioText: "Meine Hobbys sind fernsehen und Gitarre spielen. In meiner Freizeit lese ich gern.",
    category: "hobby",
    badge: "Free Time Expression",
    icon: "🎸",
    kenyanAnalogy: "Plural hobbies use 'Meine Hobbys sind...'. When starting with 'In meiner Freizeit...' (Position 1), the verb 'lese' jumps straight to Position 2!",
    memoryTrick: "Hobbys sind [A] und [B]. In meiner Freizeit [Verb] ich...",
    imageType: "guitar"
  }
];

export const A2_LESSON_1_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    germanStart: "1. Hallo, ich",
    gapPlaceholder: "____",
    germanEnd: "Martin Müller.",
    correctAnswer: "bin",
    acceptableAnswers: ["bin", "heiße"],
    english: "Hello, I am Martin Müller.",
    hint: "From Worksheet #1: 'Hallo, ich bin Martin Müller.'",
    audioText: "Hallo, ich bin Martin Müller."
  },
  {
    id: 2,
    germanStart: "2. Ich komme",
    gapPlaceholder: "____",
    germanEnd: "Mailand.",
    correctAnswer: "aus",
    acceptableAnswers: ["aus"],
    english: "I come from Milan.",
    hint: "Preposition of origin: 'aus' (from)!",
    audioText: "Ich komme aus Mailand."
  },
  {
    id: 3,
    germanStart: "3. Ich",
    gapPlaceholder: "____",
    germanEnd: "etwas Deutsch.",
    correctAnswer: "spreche",
    acceptableAnswers: ["spreche"],
    english: "I speak some German.",
    hint: "Conjugation of sprechen for 'ich': 'spreche'!",
    audioText: "Ich spreche etwas Deutsch."
  },
  {
    id: 4,
    germanStart: "4. Ich arbeite",
    gapPlaceholder: "____",
    germanEnd: "Deutsche Bahn in München.",
    correctAnswer: "bei",
    acceptableAnswers: ["bei"],
    english: "I work at Deutsche Bahn in Munich.",
    hint: "Company preposition: 'bei' + Firma!",
    audioText: "Ich arbeite bei Deutsche Bahn in München."
  },
  {
    id: 5,
    germanStart: "5. Meine Hobbys",
    gapPlaceholder: "____",
    germanEnd: "fernsehen und Gitarre spielen.",
    correctAnswer: "sind",
    acceptableAnswers: ["sind"],
    english: "My hobbies are watching TV and playing guitar.",
    hint: "Plural form of sein: 'sind' (are)!",
    audioText: "Meine Hobbys sind fernsehen und Gitarre spielen."
  }
];

export const A2_PROFESSIONS_LIST = [
  { male: "der Lehrer", female: "die Lehrerin", english: "Teacher" },
  { male: "der Arzt", female: "die Ärztin", english: "Doctor" },
  { male: "der Pilot", female: "die Pilotin", english: "Pilot" },
  { male: "der Architekt", female: "die Architektin", english: "Architect" },
  { male: "der Programmierer", female: "die Programmiererin", english: "Programmer / Software Developer" },
  { male: "der Student", female: "die Studentin", english: "College / University Student" },
  { male: "der Fotograf", female: "die Fotografin", english: "Photographer" },
  { male: "der Polizist", female: "die Polizistin", english: "Police Officer" },
  { male: "der Journalist", female: "die Journalistin", english: "Journalist / Reporter" },
  { male: "der Sänger", female: "die Sängerin", english: "Singer" },
  { male: "der Tänzer", female: "die Tänzerin", english: "Dancer" },
  { male: "der Manager", female: "die Managerin", english: "Manager" },
  { male: "der Buchhalter", female: "die Buchhalterin", english: "Accountant / Bookkeeper" },
  { male: "der Kunstmaler", female: "die Kunstmalerin", english: "Painter / Artist" },
  { male: "der Dolmetscher", female: "die Dolmetscherin", english: "Interpreter / Translator" },
  { male: "der Koch", female: "die Köchin", english: "Chef / Cook" }
];

export const A2_COUNTRIES_LIST = [
  { german: "Deutschland", english: "Germany", prep: "aus Deutschland" },
  { german: "Spanien", english: "Spain", prep: "aus Spanien" },
  { german: "Frankreich", english: "France", prep: "aus Frankreich" },
  { german: "Österreich", english: "Austria", prep: "aus Österreich" },
  { german: "Polen", english: "Poland", prep: "aus Polen" },
  { german: "die USA", english: "United States", prep: "aus den USA (Plural Rebel!)" },
  { german: "Tschechien", english: "Czech Republic", prep: "aus Tschechien" },
  { german: "England", english: "England", prep: "aus England" },
  { german: "Italien", english: "Italy", prep: "aus Italien" },
  { german: "Holland", english: "Netherlands", prep: "aus Holland" },
  { german: "Portugal", english: "Portugal", prep: "aus Portugal" },
  { german: "Griechenland", english: "Greece", prep: "aus Griechenland" },
  { german: "Ungarn", english: "Hungary", prep: "aus Ungarn" },
  { german: "Russland", english: "Russia", prep: "aus Russland" },
  { german: "Schweden", english: "Sweden", prep: "aus Schweden" },
  { german: "Dänemark", english: "Denmark", prep: "aus Dänemark" },
  { german: "Japan", english: "Japan", prep: "aus Japan" },
  { german: "Indien", english: "India", prep: "aus Indien" },
  { german: "China", english: "China", prep: "aus China" },
  { german: "die Türkei", english: "Turkey", prep: "aus der Türkei (Feminine Rebel!)" },
  { german: "Thailand", english: "Thailand", prep: "aus Thailand" },
  { german: "Kenia", english: "Kenya", prep: "aus Kenia" }
];

export const A2_HOBBIES_LIST = [
  { german: "essen gehen", english: "dining out / going to eat" },
  { german: "fernsehen", english: "watching television" },
  { german: "malen", english: "painting / drawing" },
  { german: "kochen", english: "cooking meals" },
  { german: "ins Fitnessstudio gehen", english: "going to the gym" },
  { german: "laufen", english: "running / jogging" },
  { german: "Skifahren", english: "skiing on snow" },
  { german: "tanzen", english: "dancing" },
  { german: "wandern", english: "hiking in nature" },
  { german: "Musik hören", english: "listening to music" },
  { german: "einkaufen", english: "shopping" },
  { german: "lesen", english: "reading books" },
  { german: "am Computer spielen", english: "playing computer games" },
  { german: "Karten spielen", english: "playing cards" },
  { german: "basteln", english: "crafting / DIY handiwork" },
  { german: "ins Kino gehen", english: "going to the movies" }
];

// =========================================================================
// A2 LEKTION 2: CHARAKTEREIGENSCHAFTEN (CHARACTER TRAITS & OPPOSITES)
// Based on official A2 curriculum slides (48 pages) & worksheet:
// 21 core character traits, 11 exact Gegenteile (opposites),
// 5 Adverbien modifiers (sehr, ganz, immer, ziemlich, etwas) & example personas!
// =========================================================================

export const A2_LESSON_2_ITEMS = [
  {
    id: "a2-l2-charaktereigenschaft-intro",
    german: "die Eigenschaft / Charaktereigenschaften",
    english: "trait / characteristic / character traits",
    pronunciation: "dee EYE-gen-shahft / kah-rahk-TAYR-eye-gen-shahf-ten",
    audioText: "die Eigenschaft. Charaktereigenschaften.",
    category: "traits",
    badge: "Key Vocab",
    icon: "🌟",
    kenyanAnalogy: "Like talking about someone's tabia (personal traits or nature) in Sheng or Swahili. 'Eigenschaft' is the trait itself!",
    memoryTrick: "eigen (own) + schaft (ship/quality) = one's own quality / trait!",
    imageType: "character-portrait"
  },
  {
    id: "a2-l2-freundlich-unfreundlich",
    german: "freundlich ↔ unfreundlich",
    english: "friendly ↔ unfriendly",
    pronunciation: "FROYNT-likh ↔ OON-froynt-likh",
    audioText: "freundlich und unfreundlich",
    category: "opposites",
    badge: "Opposite Pair #1",
    icon: "😊",
    kenyanAnalogy: "Like a matatu conductor who greets you with a warm smile versus one who barks at passengers on a rainy Monday!",
    memoryTrick: "Freund (friend) + lich = friendly. Add 'un-' for the negative!",
    imageType: "smiling-face"
  },
  {
    id: "a2-l2-lieb-lieblos",
    german: "lieb ↔ lieblos",
    english: "kind / nice ↔ unkind / loveless / uncaring",
    pronunciation: "LEEP ↔ LEEP-lohs",
    audioText: "lieb und lieblos",
    category: "opposites",
    badge: "Opposite Pair #2",
    icon: "💖",
    kenyanAnalogy: "Lieb is someone who serves you chai with deep genuine warmth; lieblos is handing you cold food without caring.",
    memoryTrick: "Liebe = love. Lieb = kind. '-los' = '-less' (without love / loveless)!",
    imageType: "heart"
  },
  {
    id: "a2-l2-ruhig-unruhig",
    german: "ruhig ↔ unruhig",
    english: "calm / quiet ↔ restless / agitated / fidgety",
    pronunciation: "ROO-ikh ↔ OON-roo-ikh",
    audioText: "ruhig und unruhig",
    category: "opposites",
    badge: "Opposite Pair #3",
    icon: "🧘",
    kenyanAnalogy: "Ruhig is sitting coolly by the lake sipping soda; unruhig is pacing around checking your phone every 5 seconds waiting for exam results!",
    memoryTrick: "Ruhe = peace/quiet. unruhig = restless/not at peace.",
    imageType: "meditation"
  },
  {
    id: "a2-l2-hoeflich-unhoeflich",
    german: "höflich ↔ unhöflich",
    english: "polite ↔ impolite / rude",
    pronunciation: "HERF-likh ↔ OON-herf-likh",
    audioText: "höflich und unhöflich",
    category: "opposites",
    badge: "Opposite Pair #4",
    icon: "🎩",
    kenyanAnalogy: "Höflich says 'bitte', holds the door, and respects elders; unhöflich cuts the queue without saying excuse me.",
    memoryTrick: "Hof = royal court (courtly manners). Höflich = polite!",
    imageType: "bowing"
  },
  {
    id: "a2-l2-humorvoll-humorlos",
    german: "humorvoll ↔ humorlos",
    english: "humorous / witty ↔ humorless / serious",
    pronunciation: "hoo-MOR-fawl ↔ hoo-MOR-lohs",
    audioText: "humorvoll und humorlos",
    category: "opposites",
    badge: "Opposite Pair #5",
    icon: "😂",
    kenyanAnalogy: "Humorvoll is the friend cracking hilarious jokes at the dinner table; humorlos never laughs even when Churchill Show is on!",
    memoryTrick: "-voll = full of (humorous), -los = without (humorless)!",
    imageType: "laughing-face"
  },
  {
    id: "a2-l2-kreativ-unkreativ",
    german: "kreativ ↔ unkreativ",
    english: "creative ↔ uncreative",
    pronunciation: "kray-ah-TEEF ↔ OON-kray-ah-teef",
    audioText: "kreativ und unkreativ",
    category: "opposites",
    badge: "Opposite Pair #6",
    icon: "🎨",
    kenyanAnalogy: "An artist painting magnificent safari wildlife or writing songs is kreativ; doing plain copy-paste is unkreativ.",
    memoryTrick: "Direct cognate with English creative, opposite simply takes 'un-'!",
    imageType: "paint-palette"
  },
  {
    id: "a2-l2-begabt-unbegabt",
    german: "begabt ↔ unbegabt",
    english: "talented / gifted ↔ untalented / ungifted",
    pronunciation: "beh-GAHPT ↔ OON-beh-gahpt",
    audioText: "begabt und unbegabt",
    category: "opposites",
    badge: "Opposite Pair #7",
    icon: "🏆",
    kenyanAnalogy: "Begabt has natural kipaji (talent) like a gifted runner or musician. Unbegabt struggles even after hours of practice.",
    memoryTrick: "Gabe = a gift. Begabt = gifted / talented!",
    imageType: "trophy"
  },
  {
    id: "a2-l2-bekannt-unbekannt",
    german: "bekannt ↔ unbekannt",
    english: "famous / well-known ↔ unknown / unfamiliar",
    pronunciation: "beh-KAHNT ↔ OON-beh-kahnt",
    audioText: "bekannt und unbekannt",
    category: "opposites",
    badge: "Opposite Pair #8",
    icon: "📸",
    kenyanAnalogy: "Eliud Kipchoge or Lupita Nyong'o is weltbekannt (world famous); someone totally anonymous is unbekannt.",
    memoryTrick: "kennen = to know. bekannt = known/famous!",
    imageType: "star"
  },
  {
    id: "a2-l2-fleissig-faul",
    german: "fleißig ↔ faul",
    english: "diligent / hard-working ↔ lazy",
    pronunciation: "FLY-sikh ↔ FOWL",
    audioText: "fleißig und faul",
    category: "opposites",
    badge: "Opposite Pair #9",
    icon: "🐝",
    kenyanAnalogy: "Fleißig is waking up at 5:00 AM every single morning to hustle; faul is lying on the couch sleeping through noon!",
    memoryTrick: "Fleiß = diligence (busy bee). Faul = lazy / rotten!",
    imageType: "honeybee"
  },
  {
    id: "a2-l2-mutig-aengstlich",
    german: "mutig ↔ ängstlich",
    english: "courageous / brave ↔ scared / timid / anxious",
    pronunciation: "MOO-tikh ↔ ENGST-likh",
    audioText: "mutig und ängstlich",
    category: "opposites",
    badge: "Opposite Pair #10",
    icon: "🦁",
    kenyanAnalogy: "Mutig has heart like a lion facing challenges head on; ängstlich jumps back at every little sound or lizard!",
    memoryTrick: "Mut = courage. Angst = fear/anxiety. ängstlich = fearful/scared!",
    imageType: "lion"
  },
  {
    id: "a2-l2-ehrlich-unehrlich",
    german: "ehrlich ↔ unehrlich",
    english: "honest / sincere ↔ dishonest / deceitful",
    pronunciation: "AYR-likh ↔ OON-ayr-likh",
    audioText: "ehrlich und unehrlich",
    category: "opposites",
    badge: "Opposite Pair #11",
    icon: "⚖️",
    kenyanAnalogy: "Ehrlich returns extra change given by mistake at the shop; unehrlich keeps quiet and pockets it.",
    memoryTrick: "Ehre = honor. Ehrlich = honorable / honest!",
    imageType: "balance-scale"
  },
  {
    id: "a2-l2-zuverlaessig-unzuverlaessig",
    german: "zuverlässig ↔ unzuverlässig",
    english: "reliable / dependable ↔ unreliable / flaky",
    pronunciation: "TSOO-fair-leh-sikh ↔ OON-tsoo-fair-leh-sikh",
    audioText: "zuverlässig und unzuverlässig",
    category: "opposites",
    badge: "Opposite Pair #12",
    icon: "⏰",
    kenyanAnalogy: "Worksheet #1 question! Zuverlässig always keeps their word and arrives on time; unzuverlässig cancels at the last minute.",
    memoryTrick: "sich verlassen auf = to rely on. zuverlässig = reliable!",
    imageType: "clock"
  },
  {
    id: "a2-l2-schuechtern-selbstbewusst",
    german: "schüchtern ↔ selbstbewusst",
    english: "shy / timid ↔ confident / self-assured",
    pronunciation: "SHEWKH-tairn ↔ ZELPST-beh-voost",
    audioText: "schüchtern und selbstbewusst",
    category: "opposites",
    badge: "Opposite Pair #13",
    icon: "🦚",
    kenyanAnalogy: "Worksheet #5 question! Schüchtern blushes and looks down when spoken to; selbstbewusst stands tall, speaks clearly, and owns the room!",
    memoryTrick: "selbst (self) + bewusst (aware/conscious) = self-assured / confident!",
    imageType: "confidence"
  },
  {
    id: "a2-l2-schoen-huebsch-attraktiv",
    german: "schön / hübsch / attraktiv",
    english: "beautiful / handsome / attractive",
    pronunciation: "SHURN / HEWPSH / ah-trak-TEEF",
    audioText: "schön, hübsch, attraktiv. Sabina ist sehr schön.",
    category: "appearance",
    badge: "Aesthetics Trio",
    icon: "💎",
    kenyanAnalogy: "Three classic complimentary adjectives from Slides 6, 7 & 20. Schön is beautiful, hübsch is pretty/handsome, attraktiv is attractive!",
    memoryTrick: "Used with 'sein': 'Sie ist sehr hübsch', 'Er ist attraktiv'.",
    imageType: "sparkles"
  },
  {
    id: "a2-l2-hilfsbereit-liebevoll-modebewusst",
    german: "hilfsbereit / liebevoll / modebewusst",
    english: "helpful / affectionate / fashion-conscious",
    pronunciation: "HILFS-beh-ryt / LEE-beh-fawl / MOH-deh-beh-voost",
    audioText: "hilfsbereit, liebevoll, modebewusst. Boris ist immer hilfsbereit.",
    category: "traits",
    badge: "Special Compound Traits",
    icon: "🤝",
    kenyanAnalogy: "Hilfsbereit (ready to help a neighbor), liebevoll (full of affectionate care), modebewusst (sharp dresser who knows modern style)!",
    memoryTrick: "Hilfe + bereit (ready to help); Mode + bewusst (style conscious)!",
    imageType: "helping-hand"
  },
  {
    id: "a2-l2-adverbien-graduierer",
    german: "sehr / ganz / immer / ziemlich / etwas",
    english: "very / completely / always / quite / somewhat",
    pronunciation: "ZAYR / GAHNTS / IM-mair / TSEEM-likh / ET-vahs",
    audioText: "sehr, ganz, immer, ziemlich, etwas. Adverbien für Charaktereigenschaften.",
    category: "adverbien",
    badge: "Intensity Modifiers",
    icon: "🎚️",
    kenyanAnalogy: "From Slide 48: The 5 magic sliders to dial up or soften any description! 'sehr schön' (very), 'ganz anders' (completely), 'immer zuverlässig' (always), 'ziemlich ruhig' (quite), 'etwas schüchtern' (somewhat)!",
    memoryTrick: "Place directly BEFORE the adjective: etwas arrogant, ziemlich ruhig, immer hilfsbereit!",
    imageType: "sliders"
  },
  {
    id: "a2-l2-beispiel-saetze",
    german: "Tanja ist etwas arrogant, aber immer zuverlässig.",
    english: "Tanja is somewhat arrogant, but always reliable.",
    pronunciation: "TAHN-yah ist ET-vahs ah-roh-GAHNT, AH-bair IM-mair TSOO-fair-leh-sikh.",
    audioText: "Tanja ist etwas arrogant, aber immer zuverlässig. Alex ist ganz anders. Mona ist etwas schüchtern.",
    category: "dialogue",
    badge: "Slide 47 Master Sentence",
    icon: "💬",
    kenyanAnalogy: "The perfect real-life balance! You can combine a mild critique with 'etwas' and a big virtue with 'immer' using 'aber' (but).",
    memoryTrick: "[Name] ist [Adverb] [Adjektiv], aber [Adverb] [Adjektiv]!",
    imageType: "speaking-pair"
  }
];

export const A2_LESSON_2_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    germanStart: "1. zuverlässig x",
    gapPlaceholder: "___________",
    germanEnd: "",
    correctAnswer: "unzuverlässig",
    acceptableAnswers: ["unzuverlässig", "unzuverlaessig"],
    english: "reliable x unreliable",
    hint: "Add the negative prefix 'un-' to zuverlässig!",
    audioText: "zuverlässig und unzuverlässig"
  },
  {
    id: 2,
    germanStart: "2. ruhig x",
    gapPlaceholder: "___________",
    germanEnd: "",
    correctAnswer: "unruhig",
    acceptableAnswers: ["unruhig"],
    english: "calm x restless",
    hint: "Add the negative prefix 'un-' to ruhig!",
    audioText: "ruhig und unruhig"
  },
  {
    id: 3,
    germanStart: "3. begabt x",
    gapPlaceholder: "___________",
    germanEnd: "",
    correctAnswer: "unbegabt",
    acceptableAnswers: ["unbegabt"],
    english: "talented x untalented",
    hint: "Add the negative prefix 'un-' to begabt!",
    audioText: "begabt und unbegabt"
  },
  {
    id: 4,
    germanStart: "4. mutig x",
    gapPlaceholder: "__________",
    germanEnd: "",
    correctAnswer: "ängstlich",
    acceptableAnswers: ["ängstlich", "aengstlich"],
    english: "courageous x scared",
    hint: "The opposite of mutig is not 'unmutig', but fear-filled: 'ängstlich'!",
    audioText: "mutig und ängstlich"
  },
  {
    id: 5,
    germanStart: "5. schüchtern x",
    gapPlaceholder: "__________",
    germanEnd: "",
    correctAnswer: "selbstbewusst",
    acceptableAnswers: ["selbstbewusst"],
    english: "shy x confident",
    hint: "Compound adjective: selbst (self) + bewusst (aware/confident)!",
    audioText: "schüchtern und selbstbewusst"
  }
];

export const A2_CHARAKTER_OPPOSITES_PAIRS = [
  { positive: "freundlich", positiveEn: "friendly", negative: "unfreundlich", negativeEn: "unfriendly", prefixRule: "un-" },
  { positive: "lieb", positiveEn: "kind / nice", negative: "lieblos", negativeEn: "unkind / loveless", prefixRule: "-los" },
  { positive: "ruhig", positiveEn: "calm", negative: "unruhig", negativeEn: "restless", prefixRule: "un-" },
  { positive: "höflich", positiveEn: "polite", negative: "unhöflich", negativeEn: "impolite", prefixRule: "un-" },
  { positive: "humorvoll", positiveEn: "humorous", negative: "humorlos", negativeEn: "humorless", prefixRule: "-voll / -los" },
  { positive: "kreativ", positiveEn: "creative", negative: "unkreativ", negativeEn: "uncreative", prefixRule: "un-" },
  { positive: "begabt", positiveEn: "talented", negative: "unbegabt", negativeEn: "untalented", prefixRule: "un-" },
  { positive: "bekannt", positiveEn: "famous / known", negative: "unbekannt", negativeEn: "unknown", prefixRule: "un-" },
  { positive: "fleißig", positiveEn: "hard-working", negative: "faul", negativeEn: "lazy", prefixRule: "Unique Root" },
  { positive: "mutig", positiveEn: "courageous", negative: "ängstlich", negativeEn: "scared / timid", prefixRule: "Unique Root" },
  { positive: "ehrlich", positiveEn: "honest", negative: "unehrlich", negativeEn: "dishonest", prefixRule: "un-" },
  { positive: "zuverlässig", positiveEn: "reliable", negative: "unzuverlässig", negativeEn: "unreliable", prefixRule: "un-" },
  { positive: "schüchtern", positiveEn: "shy", negative: "selbstbewusst", negativeEn: "confident", prefixRule: "Unique Root" }
];

export const A2_ADVERBIEN_LIST = [
  { adverb: "sehr", english: "very", example: "Sabina ist sehr schön.", level: "High Intensity" },
  { adverb: "ganz", english: "completely / entirely", example: "Alex ist ganz anders.", level: "Totality" },
  { adverb: "immer", english: "always", example: "Boris ist immer hilfsbereit.", level: "Frequency / Permanent" },
  { adverb: "ziemlich", english: "quite / pretty", example: "Caroline ist ziemlich ruhig.", level: "Moderate High" },
  { adverb: "etwas", english: "somewhat / a bit", example: "Mona ist etwas schüchtern.", level: "Mild / Softener" }
];


// =========================================================================
// A2 LEKTION 3: NEBENSÄTZE MIT „DASS“ (SUBORDINATE CLAUSES WITH "THAT")
// Based on official A2 curriculum slides (20 pages) & worksheet:
// Hauptsatz (Position 2) + Komma + dass + Nebensatz (KICK VERB TO THE VERY END!)
// Covers regular verbs, modal verbs, auxiliary/Perfekt (haben/sein), and separable verbs!
// =========================================================================

export const A2_LESSON_3_ITEMS = [
  {
    id: "a2-l3-dass-golden-rule",
    german: "Es ist wichtig, dass du jeden Tag Deutsch lernst.",
    english: "It is important that you learn German every day.",
    pronunciation: "Es ist VIKH-tikh, dahss doo YAY-den tahk DOYTSH LAIRNST.",
    audioText: "Es ist wichtig, dass du jeden Tag Deutsch lernst.",
    category: "structure",
    badge: "The Golden Rule",
    icon: "⚽",
    kenyanAnalogy: "Like a goalkeeper kicking the football straight from the goal line right out to the far end of the pitch! In German, as soon as 'dass' appears, the conjugated verb gets booted straight to the very end of the clause!",
    memoryTrick: "Hauptsatz (Verb Pos 2) + , (comma) + dass + Subject + ... + [VERB AM ENDE]!",
    imageType: "football-kick"
  },
  {
    id: "a2-l3-komma-rule",
    german: "Hauptsatz, dass Nebensatz.",
    english: "Main clause, that subordinate clause.",
    pronunciation: "HOWPT-zahts, dahss NAY-ben-zahts.",
    audioText: "Hauptsatz, dass Nebensatz.",
    category: "structure",
    badge: "Strict Punctuation",
    icon: "🖊️",
    kenyanAnalogy: "Slide 5 rule: In German, a comma before 'dass' is 100% mandatory! Think of the comma as a checkpoint gate where the verb gets redirected to the back of the queue.",
    memoryTrick: "Always write a comma before 'dass': '..., dass ...'!",
    imageType: "comma"
  },
  {
    id: "a2-l3-perfekt-rule",
    german: "Es ist schön, dass du die Prüfung bestanden hast.",
    english: "It is nice that you have passed the examination.",
    pronunciation: "Es ist shurn, dahss doo dee PREW-foong beh-SHTAHN-den hahst.",
    audioText: "Es ist schön, dass du die Prüfung bestanden hast.",
    category: "perfekt",
    badge: "Perfekt Verb Kick",
    icon: "🎓",
    kenyanAnalogy: "Slide 6 rule: In Perfekt, you have TWO verbs: Partizip II (bestanden) and the helping verb (hast). The conjugated helper 'hast' is the one that gets kicked to the very end!",
    memoryTrick: "Partizip II stays first, helping verb (hast / ist) takes the final anchor spot!",
    imageType: "exam"
  },
  {
    id: "a2-l3-trennbar-rule",
    german: "Ich finde es gut, dass du um 6 Uhr aufstehst.",
    english: "I find it good that you get up at 6 o'clock.",
    pronunciation: "Ikh FIN-deh es goot, dahss doo oom zeks oor OWF-shtayst.",
    audioText: "Ich finde es gut, dass du um 6 Uhr aufstehst.",
    category: "trennbar",
    badge: "Separable Re-Glued!",
    icon: "⏰",
    kenyanAnalogy: "Slide 7 rule: In normal sentences, separable verbs break apart (Ich stehe um 6 Uhr auf). But inside a 'dass' clause, the prefix and stem RE-GLUE together at the end as one word ('aufstehst')!",
    memoryTrick: "'dass' heals the separated verb: 'aufstehst' stays joined at the end!",
    imageType: "alarm-clock"
  },
  {
    id: "a2-l3-modal-rule",
    german: "Ich bin mir sicher, dass du besser schreiben kannst.",
    english: "I am sure that you can write better.",
    pronunciation: "Ikh bin meer ZIKH-er, dahss doo BES-ser SHRY-ben kahnst.",
    audioText: "Ich bin mir sicher, dass du besser schreiben kannst.",
    category: "modal",
    badge: "Modalverb am Ende",
    icon: "✍️",
    kenyanAnalogy: "Slide 8 rule: When you have an infinitive (schreiben) and a modal verb (kannst), the conjugated modal verb 'kannst' stands at the very end after the infinitive!",
    memoryTrick: "Infinitive + conjugated Modalverb am Ende: '... schreiben kannst'!",
    imageType: "fountain-pen"
  },
  {
    id: "a2-l3-beispiel-bananen",
    german: "Ich habe gelesen, dass Bananen gesund sind.",
    english: "I have read that bananas are healthy.",
    pronunciation: "Ikh HAH-beh geh-LAY-zen, dahss bah-NAH-nen geh-ZOONT zint.",
    audioText: "Ich habe gelesen. Bananen sind gesund. Ich habe gelesen, dass Bananen gesund sind.",
    category: "transformation",
    badge: "Slide 9 Transformation",
    icon: "🍌",
    kenyanAnalogy: "Direct slide 9 example: Step 1: 'Bananen SIND gesund' (Verb is in pos 2). Step 2: Add 'dass' ➔ 'sind' flies all the way to the end!",
    memoryTrick: "Bananen sind gesund ➔ ..., dass Bananen gesund SIND.",
    imageType: "banana"
  },
  {
    id: "a2-l3-beispiel-peter",
    german: "Ich glaube, dass Peter mich liebt.",
    english: "I believe that Peter loves me.",
    pronunciation: "Ikh GLOW-beh, dahss PAY-ter mikh leept.",
    audioText: "Ich glaube. Peter liebt mich. Ich glaube, dass Peter mich liebt.",
    category: "transformation",
    badge: "Slide 10 Romance",
    icon: "💘",
    kenyanAnalogy: "Direct slide 10 example: Two simple sentences: 'Ich glaube.' + 'Peter liebt mich.' Combined with dass: 'Ich glaube, dass Peter mich liebt!'",
    memoryTrick: "Peter liebt mich ➔ ..., dass Peter mich LIEBT.",
    imageType: "heart"
  },
  {
    id: "a2-l3-beispiel-sonne",
    german: "Ich finde es schön, dass morgen die Sonne scheint.",
    english: "I find it nice that the sun will shine tomorrow.",
    pronunciation: "Ikh FIN-deh es shurn, dahss MOR-gen dee ZON-neh shynt.",
    audioText: "Ich finde es schön. Morgen scheint die Sonne. Ich finde es schön, dass morgen die Sonne scheint.",
    category: "transformation",
    badge: "Slide 12 Exercise",
    icon: "☀️",
    kenyanAnalogy: "Direct slide 12 example: 'Morgen scheint die Sonne' ➔ 'Ich finde es schön, dass morgen die Sonne scheint.' Notice how 'scheint' travels to the end!",
    memoryTrick: "scheint moves after die Sonne!",
    imageType: "sun"
  },
  {
    id: "a2-l3-beispiel-ernaehrung",
    german: "Es ist wichtig, dass du dich gut ernährst.",
    english: "It is important that you eat well / nourish yourself well.",
    pronunciation: "Es ist VIKH-tikh, dahss doo dikh goot air-NAYHRST.",
    audioText: "Es ist wichtig. Du ernährst dich gut. Es ist wichtig, dass du dich gut ernährst.",
    category: "transformation",
    badge: "Slide 14 Nutrition",
    icon: "🥗",
    kenyanAnalogy: "Direct slide 14 example: Reflexive verb 'sich ernähren' (to nourish oneself). The pronoun 'dich' stays near the subject 'du', while the verb 'ernährst' hits the finish line!",
    memoryTrick: "... dass du dich gut ernährst.",
    imageType: "salad"
  },
  {
    id: "a2-l3-beispiel-deutsch-einfach",
    german: "Ich denke, dass Deutsch einfach ist.",
    english: "I think that German is easy.",
    pronunciation: "Ikh DENG-keh, dahss DOYTSH EYN-fahkh ist.",
    audioText: "Ich denke. Deutsch ist einfach. Ich denke, dass Deutsch einfach ist.",
    category: "transformation",
    badge: "Slide 15 Motivation",
    icon: "💡",
    kenyanAnalogy: "Direct slide 15 example: 'Deutsch ist einfach' ➔ 'Ich denke, dass Deutsch einfach ist.' With these easy visual patterns, German truly is simple!",
    memoryTrick: "Deutsch ist einfach ➔ ..., dass Deutsch einfach IST.",
    imageType: "lightbulb"
  },
  {
    id: "a2-l3-beispiel-montag-frei",
    german: "Ich habe gehört, dass wir am Montag frei haben.",
    english: "I have heard that we have off on Monday.",
    pronunciation: "Ikh HAH-beh geh-HURT, dahss veer ahm MOHN-tahk FRY HAH-ben.",
    audioText: "Ich habe gehört, dass wir am Montag frei haben.",
    category: "trigger",
    badge: "Slide 18 Good News",
    icon: "🏖️",
    kenyanAnalogy: "Slide 18 example: Talking about an upcoming holiday or day off! 'frei haben' places 'haben' at the back.",
    memoryTrick: "frei haben ➔ ..., dass wir am Montag frei HABEN.",
    imageType: "beach-umbrella"
  },
  {
    id: "a2-l3-starter-phrases",
    german: "Ich weiß, dass ... / Ich habe gehört, dass ... / Ich glaube, dass ...",
    english: "I know that ... / I have heard that ... / I believe that ...",
    pronunciation: "Ikh vyss, dahss ... / Ikh HAH-beh geh-HURT, dahss ... / Ikh GLOW-beh, dahss ...",
    audioText: "Ich weiß, dass. Ich habe gehört, dass. Ich glaube, dass. Es ist wichtig, dass. Es ist schön, dass.",
    category: "triggers",
    badge: "5 Essential Triggers",
    icon: "🔑",
    kenyanAnalogy: "Slides 17-20 show the 5 most common conversational starters for 'dass': 1. Ich habe gehört, dass... 2. Es ist wichtig, dass... 3. Ich weiß, dass... 4. Ich glaube, dass... 5. Es ist schön, dass...",
    memoryTrick: "Memorize these 5 starters and you can express opinions, news, facts, and advice anytime!",
    imageType: "key"
  }
];

export const A2_LESSON_3_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    prompt: "1. Ich habe gelesen. Morgen regnet es.",
    correctAnswer: "Ich habe gelesen, dass es morgen regnet.",
    acceptableAnswers: [
      "Ich habe gelesen, dass es morgen regnet.",
      "Ich habe gelesen, dass es morgen regnet",
      "ich habe gelesen, dass es morgen regnet."
    ],
    hint: "Move the verb 'regnet' to the end after 'morgen': ..., dass es morgen regnet.",
    english: "I have read that it is raining tomorrow.",
    audioText: "Ich habe gelesen, dass es morgen regnet."
  },
  {
    id: 2,
    prompt: "2. Es ist wichtig. Du machst regelmäßig deine Hausaufgaben.",
    correctAnswer: "Es ist wichtig, dass du regelmäßig deine Hausaufgaben machst.",
    acceptableAnswers: [
      "Es ist wichtig, dass du regelmäßig deine Hausaufgaben machst.",
      "Es ist wichtig, dass du regelmäßig deine Hausaufgaben machst",
      "Es ist wichtig, dass du regelmaessig deine Hausaufgaben machst."
    ],
    hint: "Move the verb 'machst' after 'deine Hausaufgaben'!",
    english: "It is important that you do your homework regularly.",
    audioText: "Es ist wichtig, dass du regelmäßig deine Hausaufgaben machst."
  },
  {
    id: 3,
    prompt: "3. Hast du gehört? Wir haben neue Nachbarn.",
    correctAnswer: "Hast du gehört, dass wir neue Nachbarn haben?",
    acceptableAnswers: [
      "Hast du gehört, dass wir neue Nachbarn haben?",
      "Hast du gehört, dass wir neue Nachbarn haben",
      "Hast du gehoert, dass wir neue Nachbarn haben?"
    ],
    hint: "Move 'haben' to the end: ..., dass wir neue Nachbarn haben?",
    english: "Have you heard that we have new neighbors?",
    audioText: "Hast du gehört, dass wir neue Nachbarn haben?"
  },
  {
    id: 4,
    prompt: "4. Ich glaube. Du solltest dich gesund ernähren.",
    correctAnswer: "Ich glaube, dass du dich gesund ernähren solltest.",
    acceptableAnswers: [
      "Ich glaube, dass du dich gesund ernähren solltest.",
      "Ich glaube, dass du dich gesund ernähren solltest",
      "Ich glaube, dass du dich gesund ernaehren solltest."
    ],
    hint: "Modal verb rule: The conjugated modal 'solltest' moves to the very end after 'ernähren'!",
    english: "I believe that you should eat healthily.",
    audioText: "Ich glaube, dass du dich gesund ernähren solltest."
  },
  {
    id: 5,
    prompt: "5. Es ist schön. Du hast Note 1 bekommen.",
    correctAnswer: "Es ist schön, dass du Note 1 bekommen hast.",
    acceptableAnswers: [
      "Es ist schön, dass du Note 1 bekommen hast.",
      "Es ist schön, dass du Note 1 bekommen hast",
      "Es ist schoen, dass du Note 1 bekommen hast."
    ],
    hint: "Perfekt rule: The helping verb 'hast' moves to the very end after the participle 'bekommen'!",
    english: "It is nice that you received grade 1 (A).",
    audioText: "Es ist schön, dass du Note 1 bekommen hast."
  }
];

export const A2_DASS_TRANSFORM_EXAMPLES = [
  {
    hauptsatz: "Ich habe gelesen",
    originalNebensatz: "Bananen sind gesund.",
    verb: "sind",
    combinedGerman: "Ich habe gelesen, dass Bananen gesund sind.",
    english: "I have read that bananas are healthy.",
    ruleType: "Simple Verb to End",
    slide: "Slide 9"
  },
  {
    hauptsatz: "Ich glaube",
    originalNebensatz: "Peter liebt mich.",
    verb: "liebt",
    combinedGerman: "Ich glaube, dass Peter mich liebt.",
    english: "I believe that Peter loves me.",
    ruleType: "Simple Verb to End",
    slide: "Slide 10"
  },
  {
    hauptsatz: "Ich finde es schön",
    originalNebensatz: "Morgen scheint die Sonne.",
    verb: "scheint",
    combinedGerman: "Ich finde es schön, dass morgen die Sonne scheint.",
    english: "I find it nice that the sun will shine tomorrow.",
    ruleType: "Time Preceded Verb to End",
    slide: "Slide 12"
  },
  {
    hauptsatz: "Es ist wichtig",
    originalNebensatz: "Du ernährst dich gut.",
    verb: "ernährst",
    combinedGerman: "Es ist wichtig, dass du dich gut ernährst.",
    english: "It is important that you eat well.",
    ruleType: "Reflexive Verb to End",
    slide: "Slide 14"
  },
  {
    hauptsatz: "Ich denke",
    originalNebensatz: "Deutsch ist einfach.",
    verb: "ist",
    combinedGerman: "Ich denke, dass Deutsch einfach ist.",
    english: "I think that German is easy.",
    ruleType: "Copula Verb to End",
    slide: "Slide 15"
  },
  {
    hauptsatz: "Es ist schön",
    originalNebensatz: "Du hast die Prüfung bestanden.",
    verb: "hast",
    combinedGerman: "Es ist schön, dass du die Prüfung bestanden hast.",
    english: "It is nice that you passed the exam.",
    ruleType: "Perfekt: Helping Verb 'hast' to End",
    slide: "Slide 6"
  },
  {
    hauptsatz: "Ich finde es gut",
    originalNebensatz: "Du stehst um 6 Uhr auf.",
    verb: "aufstehst",
    combinedGerman: "Ich finde es gut, dass du um 6 Uhr aufstehst.",
    english: "I find it good that you get up at 6 o'clock.",
    ruleType: "Separable Verb Re-Glues am Ende",
    slide: "Slide 7"
  },
  {
    hauptsatz: "Ich bin mir sicher",
    originalNebensatz: "Du kannst besser schreiben.",
    verb: "kannst",
    combinedGerman: "Ich bin mir sicher, dass du besser schreiben kannst.",
    english: "I am sure that you can write better.",
    ruleType: "Modalverb 'kannst' after Infinitive am Ende",
    slide: "Slide 8"
  }
];


// =========================================================================
// A2 LEKTION 4: KAUSALSÄTZE - NEBENSÄTZE MIT „WEIL“ UND „DA“ (REASONS & CAUSES)
// Based on official A2 curriculum slides (25 pages) & worksheet:
// 1. Definition: Kausalsätze geben Grund / Ursache an (Why? Why can't you work?)
// 2. 5 Question Triggers: Warum?, Wieso?, Weshalb?, Weswegen?, Aus welchem Grund?
// 3. Sentence Structure A: Hauptsatz (Pos 2) + Komma + weil/da + Verb am Ende
// 4. Sentence Structure B (Nebensatz first!): Da/Weil ..., [VERB] + Subjekt ... (Verb-Verb Collision!)
// 5. Unterschied "weil" vs. "denn": weil = Verb am Ende, denn = Position 0 (Verb bleibt in Pos 2!)
// 6. Complete Worksheet: 5 sentence transformations with "weil".
// =========================================================================

export const A2_LESSON_4_ITEMS = [
  {
    id: "a2-l4-kausalsatz-definition",
    german: "Kausalsätze sind Nebensätze. Sie geben den Grund oder die Ursache an.",
    english: "Causal clauses are subordinate clauses. They specify the reason or the cause.",
    pronunciation: "Kow-ZAHL-zayt-seh zint NAY-ben-zayt-seh. Zee GAY-ben dain groont OH-dair dee OOR-zah-kheh ahn.",
    audioText: "Kausalsätze sind Nebensätze. Sie geben den Grund oder die Ursache an. Kausalsätze bildet man mit weil oder da.",
    category: "definition",
    badge: "Grammar Core",
    icon: "🎯",
    kenyanAnalogy: "Like explaining to your boss or landlord why you were delayed ('Kwa sababu ya jam'). In German, you give the cause using 'weil' or 'da'!",
    memoryTrick: "Kausal = Cause / Reason. Formed using 'weil' or 'da'!",
    imageType: "question-mark"
  },
  {
    id: "a2-l4-5-fragewoertler",
    german: "Warum? / Wieso? / Weshalb? / Weswegen? / Aus welchem Grund?",
    english: "Why? / How come? / For what reason? / Why? / For what reason?",
    pronunciation: "Vah-ROOM? / Vee-ZOH? / Ves-HAHLP? / Ves-VAY-gen? / Ows VEL-khem groont?",
    audioText: "Warum lernst du Deutsch? Wieso lernst du Deutsch? Weshalb lernst du Deutsch? Weswegen lernst du Deutsch? Aus welchem Grund lernst du Deutsch?",
    category: "triggers",
    badge: "5 'Why' Variations",
    icon: "❓",
    kenyanAnalogy: "Slide 6 shows all 5 ways Germans ask 'Why?': Warum (standard), Wieso (how come / casual), Weshalb & Weswegen (formal why), Aus welchem Grund (official on forms)!",
    memoryTrick: "All 5 question words ask for the reason, and all 5 can be answered with 'weil'!",
    imageType: "speech-bubbles"
  },
  {
    id: "a2-l4-weil-verb-am-ende",
    german: "Ich lerne Deutsch, weil ich in Deutschland studieren will.",
    english: "I am learning German because I want to study in Germany.",
    pronunciation: "Ikh LAIR-neh DOYTSH, vyle ikh in DOYTSH-lahnt shtoo-DEE-ren vil.",
    audioText: "Ich lerne Deutsch, weil ich in Deutschland studieren will.",
    category: "structure-a",
    badge: "Standard Order",
    icon: "🇩🇪",
    kenyanAnalogy: "Slide 4: Hauptsatz first ('Ich lerne Deutsch') ➔ comma ➔ 'weil' ➔ modal verb 'will' flies all the way to the end after 'studieren'!",
    memoryTrick: "Hauptsatz, weil ... [Verb am Ende].",
    imageType: "germany-flag"
  },
  {
    id: "a2-l4-deutsche-freundin",
    german: "Ich lerne Deutsch, weil ich eine deutsche Freundin habe.",
    english: "I am learning German because I have a German girlfriend.",
    pronunciation: "Ikh LAIR-neh DOYTSH, vyle ikh EYE-neh DOY-tsheh FROYN-din HAH-beh.",
    audioText: "Ich lerne Deutsch, weil ich eine deutsche Freundin habe.",
    category: "structure-a",
    badge: "Slide 5 Romance",
    icon: "❤️",
    kenyanAnalogy: "Slide 5: Motivation through love! Notice how 'habe' gets kicked to the end: '... weil ich eine deutsche Freundin HABE.'",
    memoryTrick: "eine deutsche Freundin + habe am Ende!",
    imageType: "heart"
  },
  {
    id: "a2-l4-da-synonym",
    german: "Ich kann nicht arbeiten, da ich krank bin.",
    english: "I cannot work because / since I am unwell.",
    pronunciation: "Ikh kahn nikht AHR-by-ten, dah ikh krahnk bin.",
    audioText: "Ich kann nicht arbeiten, da ich krank bin.",
    category: "da-rule",
    badge: "The 'da' Twin",
    icon: "🩺",
    kenyanAnalogy: "Slide 9: 'da' means exactly the same as 'weil' (since / because). It follows the identical rule: kicks the conjugated verb ('bin') to the end!",
    memoryTrick: "'da' = 'weil' + Verb am Ende!",
    imageType: "thermometer"
  },
  {
    id: "a2-l4-nebensatz-zuerst",
    german: "Weil ich krank bin, kann ich nicht arbeiten. / Da es heute regnet, bleiben wir zu Hause.",
    english: "Because I am sick, I cannot work. / Since it's raining today, we stay home.",
    pronunciation: "Vyle ikh krahnk bin, kahn ikh nikht AHR-by-ten. Dah es HOY-teh REG-net, BLY-ben veer tsoo HOW-zeh.",
    audioText: "Weil ich krank bin, kann ich nicht arbeiten. Da es heute regnet, bleiben wir zu Hause.",
    category: "structure-b",
    badge: "Verb-Verb Collision!",
    icon: "⚡",
    kenyanAnalogy: "Slides 10 & 15 master rule: If you START with 'Weil' or 'Da', the subordinate clause ends with a verb ('bin'), then after the comma, the main clause MUST start with its verb ('kann')! Two verbs touching across the comma!",
    memoryTrick: "Weil ..., [VERB] + Subjekt ... (Verb meets Verb at the comma gate!)",
    imageType: "lightning"
  },
  {
    id: "a2-l4-perfekt-zug",
    german: "Ich bin spät, weil ich den Zug verpasst habe.",
    english: "I am late because I missed the train.",
    pronunciation: "Ikh bin shpayt, vyle ikh dain tsook fair-PAHST HAH-beh.",
    audioText: "Warum bist du spät? Ich bin spät, weil ich den Zug verpasst habe. Weil ich den Zug verpasst habe, bin ich spät.",
    category: "perfekt",
    badge: "Perfekt Reason",
    icon: "🚆",
    kenyanAnalogy: "Slides 12 & 13: In Perfekt, the conjugated helper 'habe' is kicked after 'verpasst'! If you flip it: 'Weil ich den Zug verpasst habe, BIN ich spät.'",
    memoryTrick: "verpasst + habe am Ende. Inverted: ..., bin ich spät!",
    imageType: "train"
  },
  {
    id: "a2-l4-keine-zeit",
    german: "Warum kommt er nicht? - Weil er keine Zeit hat.",
    english: "Why isn't he coming? - Because he has no time.",
    pronunciation: "Vah-ROOM kawmt air nikht? - Vyle air KY-neh tsyt haht.",
    audioText: "Warum kommt er nicht? Weil er keine Zeit hat.",
    category: "dialogue",
    badge: "Quick Answer",
    icon: "⏳",
    kenyanAnalogy: "Slides 16 & 17: In casual German conversation, you can answer a 'Warum?' question directly with just the 'Weil...' clause! Just remember the verb ('hat') still goes to the end!",
    memoryTrick: "Short answer: 'Weil [Subjekt] ... [Verb am Ende]!'",
    imageType: "hourglass"
  },
  {
    id: "a2-l4-weil-vs-denn",
    german: "Martina antwortet nicht, weil sie sauer ist. / Martina antwortet nicht, denn sie ist sauer.",
    english: "Martina is not replying because she is angry (weil). / Martina is not replying, for she is angry (denn).",
    pronunciation: "Mahr-TEE-nah AHNT-vohr-tet nikht, vyle zee ZOW-er ist. / Mahr-TEE-nah AHNT-vohr-tet nikht, den zee ist ZOW-er.",
    audioText: "Martina antwortet nicht, weil sie sauer ist. Martina antwortet nicht, denn sie ist sauer.",
    category: "comparison",
    badge: "The Epic Showdown!",
    icon: "🥊",
    kenyanAnalogy: "Slides 18 & 19: The biggest trap in German grammar! 'weil' kicks the verb to the end ('... weil sie sauer IST'). But 'denn' is a Position 0 conjunction: the verb STAYS in normal Position 2 ('... denn sie IST sauer')!",
    memoryTrick: "weil = Kicks verb to the end! denn = Leaves verb in Position 2!",
    imageType: "balance-scale"
  },
  {
    id: "a2-l4-deutschland-reisen",
    german: "Ich lerne Deutsch, weil ich nach Deutschland reisen möchte.",
    english: "I am learning German because I would like to travel to Germany.",
    pronunciation: "Ikh LAIR-neh DOYTSH, vyle ikh nahkh DOYTSH-lahnt RY-zen MERKH-teh.",
    audioText: "Ich lerne Deutsch, weil ich nach Deutschland reisen möchte.",
    category: "modal",
    badge: "Slide 23 Goal",
    icon: "✈️",
    kenyanAnalogy: "Slide 23 practice: Modal verb 'möchte' goes to the ultimate end after the infinitive 'reisen': '... reisen möchte.'",
    memoryTrick: "nach Deutschland reisen + möchte am Ende!",
    imageType: "airplane"
  }
];

export const A2_LESSON_4_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    prompt: "1. Ich kann nicht arbeiten. Ich bin krank.",
    correctAnswer: "Ich kann nicht arbeiten, weil ich krank bin.",
    acceptableAnswers: [
      "Ich kann nicht arbeiten, weil ich krank bin.",
      "Ich kann nicht arbeiten, weil ich krank bin",
      "ich kann nicht arbeiten, weil ich krank bin."
    ],
    hint: "Move 'bin' to the end after 'krank': ..., weil ich krank bin.",
    english: "I cannot work because I am sick.",
    audioText: "Ich kann nicht arbeiten, weil ich krank bin."
  },
  {
    id: 2,
    prompt: "2. Sabine fliegt nach Deutschland. Sie will dort studieren.",
    correctAnswer: "Sabine fliegt nach Deutschland, weil sie dort studieren will.",
    acceptableAnswers: [
      "Sabine fliegt nach Deutschland, weil sie dort studieren will.",
      "Sabine fliegt nach Deutschland, weil sie dort studieren will",
      "Sabine fliegt nach Deutschland weil sie dort studieren will."
    ],
    hint: "Modalverb rule: Put the conjugated modal 'will' at the end after 'studieren'!",
    english: "Sabine is flying to Germany because she wants to study there.",
    audioText: "Sabine fliegt nach Deutschland, weil sie dort studieren will."
  },
  {
    id: 3,
    prompt: "3. Ich muss etwas kochen. Ich habe Hunger.",
    correctAnswer: "Ich muss etwas kochen, weil ich Hunger habe.",
    acceptableAnswers: [
      "Ich muss etwas kochen, weil ich Hunger habe.",
      "Ich muss etwas kochen, weil ich Hunger habe",
      "ich muss etwas kochen, weil ich Hunger habe."
    ],
    hint: "Move the verb 'habe' to the end after 'Hunger'!",
    english: "I must cook something because I am hungry.",
    audioText: "Ich muss etwas kochen, weil ich Hunger habe."
  },
  {
    id: 4,
    prompt: "4. Kannst du die Tür aufmachen? Es ist warm.",
    correctAnswer: "Kannst du die Tür aufmachen, weil es warm ist?",
    acceptableAnswers: [
      "Kannst du die Tür aufmachen, weil es warm ist?",
      "Kannst du die Tür aufmachen, weil es warm ist",
      "Kannst du die Tuer aufmachen, weil es warm ist?"
    ],
    hint: "Question with weil: Move 'ist' to the end after 'warm' with a question mark at the end!",
    english: "Can you open the door because it is warm?",
    audioText: "Kannst du die Tür aufmachen, weil es warm ist?"
  },
  {
    id: 5,
    prompt: "5. Ich mag ihn. Er ist humorvoll und nett.",
    correctAnswer: "Ich mag ihn, weil er humorvoll und nett ist.",
    acceptableAnswers: [
      "Ich mag ihn, weil er humorvoll und nett ist.",
      "Ich mag ihn, weil er humorvoll und nett ist",
      "ich mag ihn, weil er humorvoll und nett ist."
    ],
    hint: "Move the verb 'ist' to the end after 'nett'!",
    english: "I like him because he is humorous and nice.",
    audioText: "Ich mag ihn, weil er humorvoll und nett ist."
  }
];

export const A2_WEIL_VS_DENN_PAIRS = [
  {
    topic: "Martina is angry",
    weilVersion: "Martina antwortet nicht, weil sie sauer ist.",
    dennVersion: "Martina antwortet nicht, denn sie ist sauer.",
    verbWeil: "ist (Am Ende)",
    verbDenn: "ist (Position 2)",
    slide: "Slide 19"
  },
  {
    topic: "Cannot work (illness)",
    weilVersion: "Ich kann nicht arbeiten, weil ich krank bin.",
    dennVersion: "Ich kann nicht arbeiten, denn ich bin krank.",
    verbWeil: "bin (Am Ende)",
    verbDenn: "bin (Position 2)",
    slide: "Slide 9"
  },
  {
    topic: "Staying home (rain)",
    weilVersion: "Wir bleiben zu Hause, weil es heute regnet.",
    dennVersion: "Wir bleiben zu Hause, denn es regnet heute.",
    verbWeil: "regnet (Am Ende)",
    verbDenn: "regnet (Position 2)",
    slide: "Slide 14"
  },
  {
    topic: "Learning German (future studies)",
    weilVersion: "Ich lerne Deutsch, weil ich in Deutschland studieren will.",
    dennVersion: "Ich lerne Deutsch, denn ich will in Deutschland studieren.",
    verbWeil: "will (Am Ende nach studieren)",
    verbDenn: "will (Position 2)",
    slide: "Slide 4"
  }
];


// =========================================================================
// A2 LEKTION 5: ADJEKTIVDEKLINATION IM NOMINATIV (ADJECTIVE ENDINGS IN NOMINATIVE)
// Based on official A2 curriculum slides (45 pages) & worksheet:
// 1. Predicative vs. Attributive: "Sandra ist schön" (NO ending) vs. "eine schöne Frau" (gets ending!)
// 2. Bestimmte Artikel (der, die, das, die Plural):
//    - Maskulin: der nette Mann (-e)
//    - Feminin: die schöne Frau (-e)
//    - Neutral: das kleine Kind (-e)
//    - Plural: die roten Rosen / die alten Bücher (-en!)
// 3. Unbestimmte, Negativ- & Possessivartikel (ein/kein/mein):
//    - Maskulin: ein / kein / mein netter Mann (-er)
//    - Feminin: eine / keine / meine schöne Frau (-e)
//    - Neutral: ein / kein / mein kleines Kind (-es)
//    - Plural: keine / meine alten Bücher (-en!)
// 4. Ohne Artikel (Nullartikel):
//    - Maskulin: netter Mann (-er)
//    - Feminin: schöne Frau (-e)
//    - Neutral: kleines Kind (-es)
//    - Plural: alte Bücher / süße Kinder (-e!)
// 5. Besonderheiten & Ausnahmen (Slides 37-45):
//    - -el / -er Drop the internal 'e': teuer ➔ ein teures Buch / ein teurer Wein; dunkel ➔ der dunkle Raum; sauer ➔ der saure Wein; sensibel ➔ ein sensibler Mann.
//    - "hoch" loses the "c": der hohe Baum / ein hoher Baum!
//    - Vowel colors don't decline: der rosa Ballon, der lila Ballon!
// =========================================================================

export const A2_LESSON_5_ITEMS = [
  {
    id: "a2-l5-predicative-vs-attributive",
    german: "Sandra ist schön. ➔ Sandra ist eine schöne Frau.",
    english: "Sandra is beautiful (no ending). ➔ Sandra is a beautiful woman (gets ending -e).",
    pronunciation: "ZAHN-drah ist shurn. ➔ ZAHN-drah ist EYE-neh SHUR-neh frow.",
    audioText: "Sandra ist schön. Sandra ist eine schöne Frau.",
    category: "foundations",
    badge: "The Golden Position Rule",
    icon: "💎",
    kenyanAnalogy: "Slides 2-4: When the adjective stands ALONE after 'ist' ('Sandra ist schön'), it is naked and takes NO endings at all! But when it steps in FRONT of the noun ('eine schöne Frau'), it must put on clothes (an adjective ending)!",
    memoryTrick: "Behind the noun = NO ending. In front of the noun = MUST take an ending!",
    imageType: "woman-portrait"
  },
  {
    id: "a2-l5-bestimmte-artikel-matrix",
    german: "der nette Mann / die schöne Frau / das kleine Kind / die roten Rosen",
    english: "the nice man (-e) / the beautiful woman (-e) / the little child (-e) / the red roses (-en)",
    pronunciation: "dair NET-teh mahn / dee SHUR-neh frow / dahss KLY-neh kint / dee ROH-ten ROH-zen.",
    audioText: "der nette Mann, die schöne Frau, das kleine Kind, die roten Rosen.",
    category: "bestimmt",
    badge: "Definite Matrix (der/die/das)",
    icon: "🎩",
    kenyanAnalogy: "Slide 16: Definite articles already carry the gender badge (der, die, das)! So the singular adjectives relax with a simple '-e' (der nette, die schöne, das kleine). Only the plural takes '-en' (die roten)!",
    memoryTrick: "Singular with der/die/das = always '-e'! Plural = '-en'!",
    imageType: "rose"
  },
  {
    id: "a2-l5-unbestimmte-artikel-matrix",
    german: "ein netter Mann / eine schöne Frau / ein kleines Kind / süße Kinder",
    english: "a nice man (-er) / a beautiful woman (-e) / a small child (-es) / sweet children (-e)",
    pronunciation: "eyn NET-ter mahn / EYE-neh SHUR-neh frow / eyn KLY-nes kint / ZEW-seh KIN-der.",
    audioText: "ein netter Mann, eine schöne Frau, ein kleines Kind. Das sind süße Kinder.",
    category: "unbestimmt",
    badge: "Indefinite Matrix (ein)",
    icon: "👶",
    kenyanAnalogy: "Slide 23 & Worksheet #3: 'ein' doesn't show whether a noun is masculine or neuter. So the adjective HEROICALLY carries the article badge: der ➔ netter (-er), das ➔ kleines (-es), die ➔ schöne (-e)!",
    memoryTrick: "ein Mann ➔ ein nett-ER (from der); ein Kind ➔ ein klein-ES (from das)!",
    imageType: "baby"
  },
  {
    id: "a2-l5-negativ-possessiv-matrix",
    german: "kein netter Mann / mein junger Sohn / meine neue Tasche / mein kleines Baby / meine alten Bücher",
    english: "no nice man / my young son (-er) / my new bag (-e) / my little baby (-es) / my old books (-en)",
    pronunciation: "kyn NET-ter mahn / myn YOONG-er zohn / MY-neh NOY-eh TAH-sheh / myn KLY-nes BAY-bee / MY-neh AHL-ten BEW-kher.",
    audioText: "kein netter Mann, mein junger Sohn, meine neue Tasche, mein kleines Baby, meine alten Bücher.",
    category: "possessiv",
    badge: "kein & mein Follow ein!",
    icon: "👜",
    kenyanAnalogy: "Slides 25-31: Negative articles (kein) and possessives (mein, dein, sein...) follow the EXACT same blueprint as 'ein' in the singular, and take '-en' in the plural (meine alten Bücher)!",
    memoryTrick: "Singular = same as ein. Plural with keine / meine = '-en'!",
    imageType: "handbag"
  },
  {
    id: "a2-l5-nullartikel-matrix",
    german: "netter Mann / schöne Frau / kleines Kind / alte Bücher / süße Kinder",
    english: "nice man (-er) / beautiful woman (-e) / little child (-es) / old books (-e) / sweet children (-e)",
    pronunciation: "NET-ter mahn / SHUR-neh frow / KLY-nes kint / AHL-teh BEW-kher / ZEW-seh KIN-der.",
    audioText: "netter Mann, schöne Frau, kleines Kind, alte Bücher, süße Kinder.",
    category: "nullartikel",
    badge: "Without Article (Nullartikel)",
    icon: "📚",
    kenyanAnalogy: "Slides 34-36: With NO article in front, the adjective itself must carry the full definite article flag: der ➔ netter, die ➔ schöne, das ➔ kleines, die Plural ➔ alte / süße!",
    memoryTrick: "Adjective copies the missing article endings: -er, -e, -es, -e!",
    imageType: "books"
  },
  {
    id: "a2-l5-ausnahme-teuer-dunkel",
    german: "Das ist ein teures Buch. / der dunkle Raum / der saure Wein / ein sensibler Mann",
    english: "This is an expensive book. / the dark room / the sour wine / a sensitive man",
    pronunciation: "Dahss ist eyn TOY-res bookh. / dair DOON-kleh rowm / dair ZOW-reh vyne / eyn zen-ZEE-bler mahn.",
    audioText: "Das ist ein teures Buch. Der dunkle Raum. Der saure Wein. Ein sensibler Mann.",
    category: "exceptions",
    badge: "Drop the 'e' Rule!",
    icon: "💡",
    kenyanAnalogy: "Worksheet #1 & Slides 38-41: When adjectives end in '-el' or '-er' (dunkel, teuer, sauer, sensibel), the internal 'e' DISAPPEARS when declined! teuer ➔ teures, dunkel ➔ dunkle!",
    memoryTrick: "teuer + es = teures (the inner 'e' drops out to make pronunciation smoother)!",
    imageType: "book"
  },
  {
    id: "a2-l5-ausnahme-hoch",
    german: "Der Baum ist hoch. ➔ der hohe Baum / ein hoher Baum",
    english: "The tree is high. ➔ the high tree (c drops out!) / a high tree",
    pronunciation: "dair bowm ist hohkh. ➔ dair HOH-eh bowm / eyn HOH-er bowm.",
    audioText: "Der Baum ist hoch. Das ist ein hoher Baum. Der hohe Baum.",
    category: "exceptions",
    badge: "Drop the 'c' in hoch!",
    icon: "🌲",
    kenyanAnalogy: "Slides 41-43: With 'hoch', the letter 'c' vanishes completely when declined: hoch ➔ der hohe Baum / ein hoher Baum!",
    memoryTrick: "hoch ➔ h-o-h-e! The 'c' goes on holiday!",
    imageType: "tree"
  },
  {
    id: "a2-l5-ausnahme-farben-vokal",
    german: "der rosa Ballon / der lila Ballon",
    english: "the pink balloon / the purple balloon (NO endings!)",
    pronunciation: "dair ROH-zah bah-LOHN / dair LEE-lah bah-LOHN.",
    audioText: "der rosa Ballon, der lila Ballon.",
    category: "exceptions",
    badge: "Vowel Colors Stay Naked!",
    icon: "🎈",
    kenyanAnalogy: "Slides 44-45: Foreign colors that end in a vowel like 'rosa' (pink) and 'lila' (purple) NEVER take adjective endings in standard German! You say 'der rosa Ballon', never 'rosae'!",
    memoryTrick: "Vowel colors (rosa, lila) refuse to change!",
    imageType: "balloon"
  }
];

export const A2_LESSON_5_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    germanStart: "1. Das ist ein teur",
    gapPlaceholder: "___",
    germanEnd: "Buch.",
    correctAnswer: "es",
    acceptableAnswers: ["es"],
    fullWord: "teures",
    fullSentence: "Das ist ein teures Buch.",
    english: "This is an expensive book.",
    hint: "Neuter with 'ein' (das Buch): takes '-es', and note how the internal 'e' in teuer drops: teures!",
    audioText: "Das ist ein teures Buch."
  },
  {
    id: 2,
    germanStart: "2. Sie ist eine nett",
    gapPlaceholder: "___",
    germanEnd: "Frau.",
    correctAnswer: "e",
    acceptableAnswers: ["e"],
    fullWord: "nette",
    fullSentence: "Sie ist eine nette Frau.",
    english: "She is a nice woman.",
    hint: "Feminine with 'eine' (die Frau): takes ending '-e': nette!",
    audioText: "Sie ist eine nette Frau."
  },
  {
    id: 3,
    germanStart: "3. Das sind süß",
    gapPlaceholder: "___",
    germanEnd: "Kinder.",
    correctAnswer: "e",
    acceptableAnswers: ["e"],
    fullWord: "süße",
    fullSentence: "Das sind süße Kinder.",
    english: "Those are sweet children.",
    hint: "Plural with NO article (Nullartikel): copies 'die' ending '-e': süße Kinder!",
    audioText: "Das sind süße Kinder."
  },
  {
    id: 4,
    germanStart: "4. Das grau",
    gapPlaceholder: "___",
    germanEnd: "Haus ist gruselig.",
    correctAnswer: "e",
    acceptableAnswers: ["e"],
    fullWord: "graue",
    fullSentence: "Das graue Haus ist gruselig.",
    english: "The gray house is creepy.",
    hint: "Neuter with definite article 'das' (bestimmt): singular takes simple '-e': graue!",
    audioText: "Das graue Haus ist gruselig."
  },
  {
    id: 5,
    germanStart: "5. Er ist ein intelligent",
    gapPlaceholder: "___",
    germanEnd: "Mann.",
    correctAnswer: "er",
    acceptableAnswers: ["er"],
    fullWord: "intelligenter",
    fullSentence: "Er ist ein intelligenter Mann.",
    english: "He is an intelligent man.",
    hint: "Masculine with 'ein' (der Mann): carries the 'der' flag '-er': intelligenter Mann!",
    audioText: "Er ist ein intelligenter Mann."
  }
];

export const A2_NOMINATIV_MASTER_MATRIX = [
  {
    gender: "Maskulin (der Mann)",
    bestimmt: "der nette Mann (-e)",
    unbestimmt: "ein netter Mann (-er)",
    negativPossessiv: "kein / mein netter Mann (-er)",
    ohneArtikel: "netter Mann (-er)",
    ruleHint: "Carries '-er' whenever 'der' is missing!"
  },
  {
    gender: "Feminin (die Frau)",
    bestimmt: "die schöne Frau (-e)",
    unbestimmt: "eine schöne Frau (-e)",
    negativPossessiv: "keine / meine schöne Frau (-e)",
    ohneArtikel: "schöne Frau (-e)",
    ruleHint: "100% universal '-e' across ALL article types!"
  },
  {
    gender: "Neutral (das Kind)",
    bestimmt: "das kleine Kind (-e)",
    unbestimmt: "ein kleines Kind (-es)",
    negativPossessiv: "kein / mein kleines Kind (-es)",
    ohneArtikel: "kleines Kind (-es)",
    ruleHint: "Carries '-es' whenever 'das' is missing!"
  },
  {
    gender: "Plural (die Bücher / Kinder)",
    bestimmt: "die alten Bücher (-en)",
    unbestimmt: "— (no plural ein)",
    negativPossessiv: "keine / meine alten Bücher (-en)",
    ohneArtikel: "alte Bücher / süße Kinder (-e!)",
    ruleHint: "With article = '-en'; Without article (Nullartikel) = '-e'!"
  }
];


// =========================================================================
// A2 LEKTION 6: ADJEKTIVDEKLINATION IM AKKUSATIV (ADJECTIVE ENDINGS IN ACCUSATIVE)
// Based on official A2 curriculum slides (31 pages) & worksheet:
// 1. Core Rule: Im Akkusativ ist NUR der Maskulin-Artikel anders! (der ➔ den / einen / meinen / keinen)
//    - Maskulin: Adjektiv bekommt IMMER "-en" im Akkusativ!
//      * den großen Hund / einen großen Hund / meinen großen Hund / keinen großen Hund / großen Hund
// 2. Feminin, Neutral & Plural mirror their Nominativ endings:
//    - Feminin (die/eine/meine): die schwarze Katze / eine schwarze Katze / meine schwarze Katze / schwarze Katze (-e)
//    - Neutral (das/ein/mein): das schicke Auto (-e) / ein schickes Auto (-es) / mein schickes Auto (-es) / schickes Auto (-es)
//    - Plural: die neuen Schuhe (-en) / keine neuen Schuhe (-en) / neue Schuhe (ohne Artikel = -e!)
// 3. Complete Worksheet: 5 fill-in-the-blank questions from official PDF.
// =========================================================================

export const A2_LESSON_6_ITEMS = [
  {
    id: "a2-l6-maskulin-en-rule",
    german: "Hast du meinen neuen Computer gesehen? / Wir suchen einen kleinen Hund.",
    english: "Have you seen my new computer? / We are looking for a small dog.",
    pronunciation: "HAHST doo MY-nen NOY-en kawm-PYOO-ter geh-ZAY-en? / Veer ZOO-khen EYE-nen KLY-nen hoont.",
    audioText: "Hast du meinen neuen Computer gesehen? Wir suchen einen kleinen Hund.",
    category: "maskulin",
    badge: "The Golden '-en' Rule",
    icon: "🐕",
    kenyanAnalogy: "Slides 11 & 23: The most famous rule in German! In Akkusativ, the masculine article ALWAYS ends in '-en' (den / einen / meinen / keinen). And like a loyal shadow, the masculine adjective ALWAYS takes '-en' too: einen großen Hund, meinen neuen Computer, den jungen Mann!",
    memoryTrick: "Masculine in Akkusativ = ALWAYS '-en' across the board!",
    imageType: "dog"
  },
  {
    id: "a2-l6-feminin-neutral-mirror",
    german: "Sie ruft eine alte Kundin an. / Wie findest du das große Haus?",
    english: "She calls an old customer. / How do you like the big house?",
    pronunciation: "Zee rooft EYE-neh AHL-teh KOON-din ahn. / VEE FIN-dest doo dahss GROH-seh hows?",
    audioText: "Sie ruft eine alte Kundin an. Wie findest du das große Haus?",
    category: "feminin-neutral",
    badge: "The Calmer Genders",
    icon: "🏡",
    kenyanAnalogy: "Worksheet #4 & #5: Feminine and Neuter do NOT change their basic forms in Akkusativ! Feminine stays '-e' (eine alte Kundin, die schwarze Katze). Neuter with 'das' stays '-e' (das große Haus), and with 'ein' stays '-es' (ein schickes Auto)!",
    memoryTrick: "Only masculine shifts to -en; feminine & neuter mirror Nominativ!",
    imageType: "house"
  },
  {
    id: "a2-l6-bestimmte-artikel-akkusativ",
    german: "den großen Hund / die schwarze Katze / das schicke Auto / die neuen Schuhe",
    english: "the big dog (-en) / the black cat (-e) / the fancy car (-e) / the new shoes (-en)",
    pronunciation: "dain GROH-sen hoont / dee SHVAHR-tseh KAHT-seh / dahss SHIK-keh OW-toh / dee NOY-en SHOO-eh.",
    audioText: "den großen Hund, die schwarze Katze, das schicke Auto, die neuen Schuhe.",
    category: "bestimmt",
    badge: "Definite Akkusativ (den/die/das)",
    icon: "🚗",
    kenyanAnalogy: "Slide 20: With definite articles: Masculine switches to 'den großen' (-en), Plural is 'die neuen' (-en), while Feminine & Neuter stay calm with '-e' (die schwarze, das schicke)!",
    memoryTrick: "den ...-en, die ...-e, das ...-e, die ...-en!",
    imageType: "car"
  },
  {
    id: "a2-l6-unbestimmte-artikel-akkusativ",
    german: "einen großen Hund / eine schwarze Katze / ein schickes Auto",
    english: "a big dog (-en) / a black cat (-e) / a fancy car (-es)",
    pronunciation: "EYE-nen GROH-sen hoont / EYE-neh SHVAHR-tseh KAHT-seh / eyn SHIK-kes OW-toh.",
    audioText: "einen großen Hund, eine schwarze Katze, ein schickes Auto.",
    category: "unbestimmt",
    badge: "Indefinite Akkusativ (einen/eine/ein)",
    icon: "🐈‍⬛",
    kenyanAnalogy: "Slide 10: 'Ich habe einen Hund' ➔ 'Ich habe einen großen Hund'. Masculine takes '-en', feminine takes '-e', and neuter carries the missing 'das' flag with '-es' (ein schickes Auto)!",
    memoryTrick: "einen ...-en, eine ...-e, ein ...-es!",
    imageType: "cat"
  },
  {
    id: "a2-l6-negativ-possessiv-akkusativ",
    german: "keinen großen Hund / mein schickes Auto / meine neuen Schuhe",
    english: "no big dog (-en) / my fancy car (-es) / my new shoes (-en)",
    pronunciation: "KY-nen GROH-sen hoont / myn SHIK-kes OW-toh / MY-neh NOY-en SHOO-eh.",
    audioText: "keinen großen Hund, mein schickes Auto, meine neuen Schuhe.",
    category: "possessiv",
    badge: "kein & mein in Akkusativ",
    icon: "👟",
    kenyanAnalogy: "Slides 14 & 27: Possessives (mein, dein) and negative (kein) match indefinite articles. Plural takes '-en' (keine neuen Schuhe, meine neuen Schuhe)!",
    memoryTrick: "keinen/meinen ...-en, meine ...-en (plural)!",
    imageType: "shoes"
  },
  {
    id: "a2-l6-nullartikel-akkusativ",
    german: "großen Hund / schwarze Katze / schickes Auto / neue Schuhe",
    english: "big dog (-en) / black cat (-e) / fancy car (-es) / new shoes (-e)",
    pronunciation: "GROH-sen hoont / SHVAHR-tseh KAHT-seh / SHIK-kes OW-toh / NOY-eh SHOO-eh.",
    audioText: "großen Hund, schwarze Katze, schickes Auto, neue Schuhe.",
    category: "nullartikel",
    badge: "Without Article (Nullartikel)",
    icon: "👠",
    kenyanAnalogy: "Slides 29-31: When there is NO article: Masculine still takes '-en' (großen Hund from den), feminine takes '-e' (schwarze Katze), neuter takes '-es' (schickes Auto), and plural takes '-e' (neue Schuhe)!",
    memoryTrick: "Plural with NO article = '-e' (neue Schuhe), but with an article = '-en' (die neuen Schuhe)!",
    imageType: "high-heel"
  }
];

export const A2_LESSON_6_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    germanStart: "1. Hast du meinen neu",
    gapPlaceholder: "____",
    germanEnd: "Computer gesehen?",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "neuen",
    fullSentence: "Hast du meinen neuen Computer gesehen?",
    english: "Have you seen my new computer?",
    hint: "Masculine in Akkusativ (der Computer ➔ meinen): adjective ALWAYS takes '-en'!",
    audioText: "Hast du meinen neuen Computer gesehen?"
  },
  {
    id: 2,
    germanStart: "2. Wir suchen einen klein",
    gapPlaceholder: "____",
    germanEnd: "Hund.",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "kleinen",
    fullSentence: "Wir suchen einen kleinen Hund.",
    english: "We are looking for a small dog.",
    hint: "Masculine with 'einen' in Akkusativ (der Hund): adjective takes '-en'!",
    audioText: "Wir suchen einen kleinen Hund."
  },
  {
    id: 3,
    germanStart: "3. Ich frage den jung",
    gapPlaceholder: "____",
    germanEnd: "Mann.",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "jungen",
    fullSentence: "Ich frage den jungen Mann.",
    english: "I ask the young man.",
    hint: "Masculine with 'den' in Akkusativ (der Mann): adjective takes '-en'!",
    audioText: "Ich frage den jungen Mann."
  },
  {
    id: 4,
    germanStart: "4. Sie ruft eine alt",
    gapPlaceholder: "____",
    germanEnd: "Kundin an.",
    correctAnswer: "e",
    acceptableAnswers: ["e"],
    fullWord: "alte",
    fullSentence: "Sie ruft eine alte Kundin an.",
    english: "She calls an old (female) customer.",
    hint: "Feminine with 'eine' (die Kundin): adjective takes '-e'!",
    audioText: "Sie ruft eine alte Kundin an."
  },
  {
    id: 5,
    germanStart: "5. Wie findest du das groß",
    gapPlaceholder: "___",
    germanEnd: "Haus?",
    correctAnswer: "e",
    acceptableAnswers: ["e"],
    fullWord: "große",
    fullSentence: "Wie findest du das große Haus?",
    english: "How do you like the big house?",
    hint: "Neuter with definite article 'das' (das Haus): adjective takes '-e'!",
    audioText: "Wie findest du das große Haus?"
  }
];

export const A2_AKKUSATIV_MASTER_MATRIX = [
  {
    gender: "Maskulin (der Hund)",
    bestimmt: "den großen Hund (-en)",
    unbestimmt: "einen großen Hund (-en)",
    negativPossessiv: "keinen / meinen großen Hund (-en)",
    ohneArtikel: "großen Hund (-en)",
    ruleHint: "100% universal '-en' across ALL article types in Akkusativ!"
  },
  {
    gender: "Feminin (die Katze)",
    bestimmt: "die schwarze Katze (-e)",
    unbestimmt: "eine schwarze Katze (-e)",
    negativPossessiv: "keine / meine schwarze Katze (-e)",
    ohneArtikel: "schwarze Katze (-e)",
    ruleHint: "100% universal '-e' across ALL article types (identical to Nominativ)!"
  },
  {
    gender: "Neutral (das Auto)",
    bestimmt: "das schicke Auto (-e)",
    unbestimmt: "ein schickes Auto (-es)",
    negativPossessiv: "kein / mein schickes Auto (-es)",
    ohneArtikel: "schickes Auto (-es)",
    ruleHint: "With 'das' = '-e'; With 'ein/mein/kein/ohne' = '-es'!"
  },
  {
    gender: "Plural (die Schuhe)",
    bestimmt: "die neuen Schuhe (-en)",
    unbestimmt: "— (no plural ein)",
    negativPossessiv: "keine / meine neuen Schuhe (-en)",
    ohneArtikel: "neue Schuhe (-e!)",
    ruleHint: "With article = '-en'; Without article (Nullartikel) = '-e'!"
  }
];


// =========================================================================
// A2 LEKTION 7: ADJEKTIVDEKLINATION IM DATIV (ADJECTIVE ENDINGS IN DATIVE)
// Based on official A2 curriculum slides (37 pages) & worksheet:
// 1. The Dative Golden Rule (Slides 15, 22, 25, 31):
//    - Whenever an article is present (bestimmt, unbestimmt, negativ, possessiv),
//      the adjective ending in Dativ is ALWAYS "-en" for ALL GENDERS AND PLURAL!
//      * Maskulin: dem alten Mann / einem alten Mann / meinem alten Mann (-en)
//      * Feminin: der netten Frau / einer netten Frau / meiner netten Frau (-en)
//      * Neutral: dem kleinen Kind / einem kleinen Kind / meinem kleinen Kind (-en)
//      * Plural: den süßen Kindern / keinen frechen Kindern / meinen süßen Kindern (-en + Noun 'n'!)
// 2. Ohne Artikel (Nullartikel - Slides 32-37):
//    - Adjective copies the definite article dative ending:
//      * Maskulin: altem Mann (from dem ➔ -em)
//      * Feminin: netter Frau (from der ➔ -er)
//      * Neutral: kleinem Kind (from dem ➔ -em)
//      * Plural: süßen Kindern (from den ➔ -en)
// 3. Dativ Prepositions & Verbs in Action:
//    - mit: Er fährt mit seinem neuen Auto / Er spricht mit einem alten Mann
//    - aus: Was machst du aus dem blauen Stoff?
//    - in: Wir wohnen in einer kleinen Wohnung
//    - zu: Gehst du zu deiner netten Oma?
//    - Dativverb helfen: Kannst du bitte der alten Frau helfen?
// =========================================================================

export const A2_LESSON_7_ITEMS = [
  {
    id: "a2-l7-dative-universal-en",
    german: "Er fährt mit seinem neuen Auto. / Wir wohnen in einer kleinen Wohnung.",
    english: "He drives with his new car (-en). / We live in a small flat (-en).",
    pronunciation: "Air FAYRT mit ZY-nem NOY-en OW-toh. / Veer VOH-nen in EYE-nair KLY-nen VOH-noong.",
    audioText: "Er fährt mit seinem neuen Auto. Wir wohnen in einer kleinen Wohnung.",
    category: "universal-en",
    badge: "The Universal '-en' Secret",
    icon: "🚗",
    kenyanAnalogy: "Slides 15, 22 & 31: Dativ is every German learner's best friend! Whenever there is ANY article in front (dem, der, einem, einer, meinem, seiner, keiner), the adjective ALWAYS takes '-en'! Masculine, Feminine, Neuter, and Plural all get '-en'!",
    memoryTrick: "Has an article in Dativ? The adjective gets '-en' 100% of the time!",
    imageType: "car"
  },
  {
    id: "a2-l7-preposition-aus-dem-stoff",
    german: "Was machst du aus dem blauen Stoff?",
    english: "What are you making out of the blue fabric?",
    pronunciation: "Vahs MAHKHST doo ows daim BLOW-en SHTOFF?",
    audioText: "Was machst du aus dem blauen Stoff?",
    category: "prepositions",
    badge: "Worksheet #2 • aus + dem",
    icon: "🧵",
    kenyanAnalogy: "Like asking a tailor at Gikomba or town what outfit they're sewing from a roll of cloth! 'aus' is a pure dative preposition: aus dem + blauen Stoff (-en)!",
    memoryTrick: "aus + dem [Adjektiv]-en [Nomen]!",
    imageType: "cloth"
  },
  {
    id: "a2-l7-dativverb-helfen",
    german: "Kannst du bitte der alten Frau helfen?",
    english: "Can you please help the old woman?",
    pronunciation: "KAHNST doo BIT-teh dair AHL-ten frow HEL-fen?",
    audioText: "Kannst du bitte der alten Frau helfen?",
    category: "dativverb",
    badge: "Worksheet #4 • helfen + Dativ",
    icon: "👵",
    kenyanAnalogy: "Slides 7-10: In German, the verb 'helfen' (to help) ALWAYS demands a Dativ object! The woman is feminine (die Frau ➔ der Frau in Dativ), and the adjective takes '-en': der alten Frau!",
    memoryTrick: "helfen + der [Adjektiv]-en Frau!",
    imageType: "helping-hand"
  },
  {
    id: "a2-l7-preposition-zu-deiner-oma",
    german: "Gehst du zu deiner netten Oma am Wochenende?",
    english: "Are you going to your nice grandma on the weekend?",
    pronunciation: "GAYST doo tsoo DY-nair NET-ten OH-mah ahm VOH-khen-en-deh?",
    audioText: "Gehst du zu deiner netten Oma am Wochenende?",
    category: "prepositions",
    badge: "Worksheet #5 • zu + Dativ",
    icon: "👵",
    kenyanAnalogy: "Visiting family upcountry over the weekend! 'zu' always triggers Dativ: deiner + netten Oma (-en)!",
    memoryTrick: "zu + deiner + Adjektiv-en!",
    imageType: "family"
  },
  {
    id: "a2-l7-dative-plural-double-n",
    german: "Hilfst du bitte den süßen Kindern da? / mit meinen süßen Kindern",
    english: "Will you please help the sweet children there? / with my sweet children",
    pronunciation: "HILFST doo BIT-teh dain ZEW-sen KIN-dairn dah? / mit MY-nen ZEW-sen KIN-dairn.",
    audioText: "Hilfst du bitte den süßen Kindern da? Er spielt mit keinen frechen Kindern.",
    category: "plural",
    badge: "The Double 'n' Plural Rule",
    icon: "👶",
    kenyanAnalogy: "Slides 13-14: In Dative Plural, both the adjective AND the noun get an extra 'n'! den süßen (-en) Kindern (+n on Kind)! Double 'n' harmony!",
    memoryTrick: "Dativ Plural: Adjektiv gets '-en', Nomen gets extra '-n'!",
    imageType: "children"
  },
  {
    id: "a2-l7-nullartikel-dativ-matrix",
    german: "altem Mann / netter Frau / kleinem Kind / süßen Kindern",
    english: "old man (-em) / nice woman (-er) / small child (-em) / sweet children (-en)",
    pronunciation: "AHL-tem mahn / NET-tair frow / KLY-nem kint / ZEW-sen KIN-dairn.",
    audioText: "altem Mann, netter Frau, kleinem Kind, süßen Kindern.",
    category: "nullartikel",
    badge: "Without Article (Nullartikel)",
    icon: "📋",
    kenyanAnalogy: "Slides 33-37: If there is NO article in front, the adjective steps up to carry the definite article flags: dem ➔ altem / kleinem (-em), der ➔ netter (-er), den ➔ süßen (-en)!",
    memoryTrick: "No article? Adjective copies dem (-em), der (-er), dem (-em), den (-en)!",
    imageType: "clipboard"
  }
];

export const A2_LESSON_7_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    germanStart: "1. Er fährt mit seinem neu",
    gapPlaceholder: "____",
    germanEnd: "Auto.",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "neuen",
    fullSentence: "Er fährt mit seinem neuen Auto.",
    english: "He drives with his new car.",
    hint: "Dative neuter with 'seinem' (mit dem Auto ➔ mit seinem): adjective takes universal '-en'!",
    audioText: "Er fährt mit seinem neuen Auto."
  },
  {
    id: 2,
    germanStart: "2. Was machst du aus dem blau",
    gapPlaceholder: "____",
    germanEnd: "Stoff?",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "blauen",
    fullSentence: "Was machst du aus dem blauen Stoff?",
    english: "What are you making out of the blue fabric?",
    hint: "Dative masculine with definite article 'dem' (aus dem Stoff): adjective takes universal '-en'!",
    audioText: "Was machst du aus dem blauen Stoff?"
  },
  {
    id: 3,
    germanStart: "3. Wir wohnen in einer klein",
    gapPlaceholder: "____",
    germanEnd: "Wohnung.",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "kleinen",
    fullSentence: "Wir wohnen in einer kleinen Wohnung.",
    english: "We live in a small flat.",
    hint: "Dative feminine with 'einer' (in der Wohnung ➔ in einer): adjective takes universal '-en'!",
    audioText: "Wir wohnen in einer kleinen Wohnung."
  },
  {
    id: 4,
    germanStart: "4. Kannst du bitte der alt",
    gapPlaceholder: "____",
    germanEnd: "Frau helfen?",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "alten",
    fullSentence: "Kannst du bitte der alten Frau helfen?",
    english: "Can you please help the old woman?",
    hint: "Dative with verb 'helfen' (der Frau): adjective takes universal '-en'!",
    audioText: "Kannst du bitte der alten Frau helfen?"
  },
  {
    id: 5,
    germanStart: "5. Gehst du zu deiner nett",
    gapPlaceholder: "____",
    germanEnd: "Oma am Wochenende?",
    correctAnswer: "en",
    acceptableAnswers: ["en"],
    fullWord: "netten",
    fullSentence: "Gehst du zu deiner netten Oma am Wochenende?",
    english: "Are you going to your nice grandma on the weekend?",
    hint: "Dative preposition 'zu' + possessive 'deiner' (zu der Oma ➔ deiner): adjective takes universal '-en'!",
    audioText: "Gehst du zu deiner netten Oma am Wochenende?"
  }
];

export const A2_DATIV_MASTER_MATRIX = [
  {
    gender: "Maskulin (der Mann / Stoff)",
    bestimmt: "dem alten Mann (-en)",
    unbestimmt: "einem alten Mann (-en)",
    negativPossessiv: "keinem / meinem alten Mann (-en)",
    ohneArtikel: "altem Mann (-em from dem)",
    ruleHint: "With any article = 100% '-en'!"
  },
  {
    gender: "Feminin (die Frau / Wohnung)",
    bestimmt: "der netten Frau (-en)",
    unbestimmt: "einer netten Frau (-en)",
    negativPossessiv: "keiner / meiner netten Frau (-en)",
    ohneArtikel: "netter Frau (-er from der)",
    ruleHint: "With any article = 100% '-en'!"
  },
  {
    gender: "Neutral (das Kind / Auto)",
    bestimmt: "dem kleinen Kind (-en)",
    unbestimmt: "einem kleinen Kind (-en)",
    negativPossessiv: "keinem / meinem kleinen Kind (-en)",
    ohneArtikel: "kleinem Kind (-em from dem)",
    ruleHint: "With any article = 100% '-en'!"
  },
  {
    gender: "Plural (die Kinder / Rosen)",
    bestimmt: "den süßen Kindern (-en + Noun 'n')",
    unbestimmt: "— (no plural ein)",
    negativPossessiv: "keinen / meinen süßen Kindern (-en + Noun 'n')",
    ohneArtikel: "süßen Kindern (-en from den)",
    ruleHint: "Always '-en' on adjective PLUS extra 'n' on noun!"
  }
];

export const A2_LESSON_8_ITEMS = [
  {
    id: "a2-l8-konditional-grundregel",
    german: "Ich komme nach Hause, wenn ich Zeit habe.",
    english: "I will come home when / if I have time.",
    pronunciation: "Ikh KOH-meh nahkh HOW-zeh, ven ikh TSYTE HAH-beh.",
    audioText: "Ich komme nach Hause, wenn ich Zeit habe. Die Handlung findet nur unter einer Bedingung statt.",
    category: "grammatik",
    badge: "Core Architecture: Handlung + Bedingung",
    icon: "🏠",
    kenyanAnalogy: "Like promising a friend in Nairobi: 'Nitakuja kwako kama nikipata nafasi!' The action ('Ich komme nach Hause') only happens under one strict condition ('wenn ich Zeit habe'). 'Wenn' handles both 'when' and 'if' in everyday German!",
    memoryTrick: "Hauptsatz (Handlung / Verb in Pos 2) + Komma + wenn + Nebensatz (Bedingung / Verb am Ende!)",
    imageType: "homecoming"
  },
  {
    id: "a2-l8-satzstellung-typ-a",
    german: "Ich gehe spielen, wenn das Wetter schön ist.",
    english: "I will go to play when the weather is nice.",
    pronunciation: "Ikh GAY-eh SHPEE-len, ven dahs VET-ter shern ist.",
    audioText: "Ich gehe spielen, wenn das Wetter schön ist. Der Nebensatz beginnt mit wenn und das Verb steht am Ende.",
    category: "grammatik",
    badge: "Order A: Hauptsatz First",
    icon: "☀️",
    kenyanAnalogy: "Order A is relaxed: Start with the main clause in normal sentence order (Ich gehe...), drop a comma, launch 'wenn', and kick the conjugated verb 'ist' all the way to the sentence goal line!",
    memoryTrick: "[Subjekt + Verb 2] , [wenn + Subjekt + ... + VERB AM ENDE].",
    imageType: "sunny-play"
  },
  {
    id: "a2-l8-satzstellung-typ-b-collision",
    german: "Wenn es regnet, bleibe ich zu Hause.",
    english: "When / if it rains, I stay at home.",
    pronunciation: "Ven es REG-net, BLY-beh ikh tsoo HOW-zeh.",
    audioText: "Wenn es regnet, bleibe ich zu Hause. Wenn der Nebensatz zuerst steht, beginnt der Hauptsatz direkt mit dem Verb!",
    category: "grammatik",
    badge: "Order B: Verb-Verb Collision!",
    icon: "🌧️",
    kenyanAnalogy: "The famous German 'Matatu Head-On Collision at the Comma'! When you start with 'Wenn', the subclause ends with a verb ('regnet'), and the main clause MUST start immediately with its verb ('bleibe') right after the comma: '...regnet, bleibe ich...'. Two verbs crashing head-to-head!",
    memoryTrick: "Wenn [Verb am Ende], [Verb in Pos 1] [Subjekt]! Notice: 'regnet, bleibe ich'!",
    imageType: "rainy-day"
  },
  {
    id: "a2-l8-hilfsverb-am-ende",
    german: "Du kannst fernsehen, wenn du deine Hausaufgabe gemacht hast.",
    english: "You can watch TV when you have done your homework.",
    pronunciation: "Doo kahnst FAIRN-zay-en, ven doo DY-neh HOWS-owf-gah-beh geh-MAHKHT hahst.",
    audioText: "Du kannst fernsehen, wenn du deine Hausaufgabe gemacht hast. Das Hilfsverb steht am Ende.",
    category: "grammatik",
    badge: "Slide 14: Perfekt in Nebensatz",
    icon: "📺",
    kenyanAnalogy: "Like a mom setting rules before screen time: 'Utatazama TV ukishamaliza homework!' In Perfekt or compound tenses, the Partizip II ('gemacht') comes first, and the conjugated helper verb ('hast') gets the very last seat at the table!",
    memoryTrick: "In compound tenses: ...[Partizip II] + [konjugiertes Hilfsverb am Ende (hast/bist)]!",
    imageType: "tv-homework"
  },
  {
    id: "a2-l8-wenn-vs-falls",
    german: "Wenn ich komme (sicher) vs. Falls ich komme (wahrscheinlich / in case).",
    english: "When I come (sure event) vs. In case I come (hypothetical / less certain).",
    pronunciation: "Ven ikh KOH-meh vs. Fahls ikh KOH-meh.",
    audioText: "Wenn ich morgen komme, gehen wir einkaufen. Das ist sicher! Falls ich morgen komme, gehen wir einkaufen. Das ist wahrscheinlich.",
    category: "vokabeln",
    badge: "Slide 19-22: Wenn vs. Falls",
    icon: "⚖️",
    kenyanAnalogy: "Think of certainty levels! 'Wenn' is high certainty: 'When I arrive tomorrow' (I have already booked the bus ticket). 'Falls' is 'in case / if by chance' (I might be stuck in traffic or have other plans). Both follow the exact same Nebensatz word order!",
    memoryTrick: "Wenn = 90-100% Sure ('When'). Falls = 50% Uncertain ('In case / Just in case').",
    imageType: "certainty-scale"
  },
  {
    id: "a2-l8-worksheet-meister",
    german: "Wenn er krank ist, bleibt er im Bett. Wenn ich Hunger habe, esse ich eine Pizza.",
    english: "If he is sick, he stays in bed. If I am hungry, I eat a pizza.",
    pronunciation: "Ven air KRAHNK ist, BLYBT air im BET. Ven ikh HOONG-er HAH-beh, EH-seh ikh EYE-neh PEET-sah.",
    audioText: "Wenn er krank ist, bleibt er im Bett. Wenn ich Hunger habe, esse ich eine Pizza. Wenn ich Deutsch lerne, bin ich sehr konzentriert.",
    category: "beispiele",
    badge: "Worksheet Hit Sentences",
    icon: "🍕",
    kenyanAnalogy: "The golden formula from your worksheet: Condition first ➔ Verb-Verb collision ➔ Result! 'Wenn ich Hunger habe (habe), esse (esse) ich eine Pizza.' Easy to remember, smooth to say!",
    memoryTrick: "Wenn [Bedingung, VERB], [VERB Subjekt Rest]!",
    imageType: "pizza-bed"
  }
];

export const A2_LESSON_8_WORKSHEET_QUESTIONS = [
  {
    id: 1,
    conditionClause: "Wenn es regnet,",
    promptSentence: "Ich spiele Klavier.",
    gapPlaceholder: "________________________________",
    correctAnswer: "spiele ich Klavier",
    acceptableAnswers: ["spiele ich Klavier", "spiele ich klavier", "…spiele ich Klavier", "...spiele ich Klavier"],
    fullSentence: "Wenn es regnet, spiele ich Klavier.",
    english: "When it rains, I play piano.",
    verbCollision: "regnet, spiele",
    hint: "Start immediately with the verb: 'spiele ich Klavier'!",
    audioText: "Wenn es regnet, spiele ich Klavier."
  },
  {
    id: 2,
    conditionClause: "Wenn ich zu Hause bin,",
    promptSentence: "Ich sehe fern.",
    gapPlaceholder: "________________________________",
    correctAnswer: "sehe ich fern",
    acceptableAnswers: ["sehe ich fern", "sehe ich Fern", "…sehe ich fern", "...sehe ich fern"],
    fullSentence: "Wenn ich zu Hause bin, sehe ich fern.",
    english: "When I am at home, I watch TV.",
    verbCollision: "bin, sehe",
    hint: "Separable verb: 'sehe' comes right after the comma, 'fern' stays at the end!",
    audioText: "Wenn ich zu Hause bin, sehe ich fern."
  },
  {
    id: 3,
    conditionClause: "Wenn er krank ist,",
    promptSentence: "Er bleibt im Bett.",
    gapPlaceholder: "________________________________",
    correctAnswer: "bleibt er im Bett",
    acceptableAnswers: ["bleibt er im Bett", "bleibt er im bett", "…bleibt er im Bett", "...bleibt er im Bett"],
    fullSentence: "Wenn er krank ist, bleibt er im Bett.",
    english: "When he is sick, he stays in bed.",
    verbCollision: "ist, bleibt",
    hint: "Verb 'bleibt' comes first right after the comma, followed by 'er im Bett'!",
    audioText: "Wenn er krank ist, bleibt er im Bett."
  },
  {
    id: 4,
    conditionClause: "Wenn ich Hunger habe,",
    promptSentence: "Ich esse eine Pizza.",
    gapPlaceholder: "________________________________",
    correctAnswer: "esse ich eine Pizza",
    acceptableAnswers: ["esse ich eine Pizza", "esse ich eine pizza", "…esse ich eine Pizza", "...esse ich eine Pizza"],
    fullSentence: "Wenn ich Hunger habe, esse ich eine Pizza.",
    english: "When I am hungry, I eat a pizza.",
    verbCollision: "habe, esse",
    hint: "Verb 'esse' immediately after comma: 'esse ich eine Pizza'!",
    audioText: "Wenn ich Hunger habe, esse ich eine Pizza."
  },
  {
    id: 5,
    conditionClause: "Wenn ich Deutsch lerne,",
    promptSentence: "Ich bin sehr konzentriert.",
    gapPlaceholder: "________________________________",
    correctAnswer: "bin ich sehr konzentriert",
    acceptableAnswers: ["bin ich sehr konzentriert", "bin ich sehr konzentriert.", "…bin ich sehr konzentriert", "...bin ich sehr konzentriert"],
    fullSentence: "Wenn ich Deutsch lerne, bin ich sehr konzentriert.",
    english: "When I learn German, I am very focused.",
    verbCollision: "lerne, bin",
    hint: "Verb 'bin' immediately after comma: 'bin ich sehr konzentriert'!",
    audioText: "Wenn ich Deutsch lerne, bin ich sehr konzentriert."
  }
];

export const A2_WENN_FALLS_COMPARISONS = [
  {
    id: 1,
    pairTitle: "Shopping Trip (Einkaufen)",
    wennSentence: "Wenn ich morgen komme, gehen wir einkaufen.",
    wennMeaning: "When I come tomorrow, we will go shopping.",
    wennCertainty: "100% Sicher (I will definitely come!)",
    fallsSentence: "Falls ich morgen komme, gehen wir einkaufen.",
    fallsMeaning: "In case I come tomorrow, we will go shopping.",
    fallsCertainty: "50% Wahrscheinlich / Eventuell (Maybe I come, maybe not)",
    ruleNote: "Both 'wenn' and 'falls' kick the conjugated verb to the end: 'komme'!"
  },
  {
    id: 2,
    pairTitle: "Rain & Staying Home (Regen)",
    wennSentence: "Wenn es regnet, bleibe ich zu Hause.",
    wennMeaning: "When it rains, I stay at home.",
    wennCertainty: "Predictable / General habit (Whenever it rains)",
    fallsSentence: "Falls es regnet, bleibe ich zu Hause.",
    fallsMeaning: "In case it rains, I will stay at home.",
    fallsCertainty: "Contingency plan (If it happens to rain today)",
    ruleNote: "Notice the Verb-Verb collision at the comma in both: 'regnet, bleibe ich'!"
  },
  {
    id: 3,
    pairTitle: "Vacation & Time (Urlaub)",
    wennSentence: "Wir machen einen Urlaub, wenn wir Zeit haben.",
    wennMeaning: "We will take a vacation when we have time.",
    wennCertainty: "We plan to do it as soon as time is available",
    fallsSentence: "Wir machen einen Urlaub, falls wir Zeit haben.",
    fallsMeaning: "We will take a vacation in case we have time.",
    fallsCertainty: "Depends on whether time permits",
    ruleNote: "Order A: Hauptsatz first (Wir machen...), Nebensatz second (wenn/falls wir Zeit haben)."
  }
];

