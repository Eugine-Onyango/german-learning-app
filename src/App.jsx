import React, { useState } from 'react';
import Header from './components/Header';
import StoryCardList from './components/StoryCardList';
import TimeOfDayExplorer from './components/TimeOfDayExplorer';
import PhoneAndEyesSimulator from './components/PhoneAndEyesSimulator';
import MatatuGame from './components/MatatuGame';
import MatchingGame from './components/MatchingGame';
import AtAGlanceSummary from './components/AtAGlanceSummary';
import Lesson2BitteExplorer from './components/Lesson2BitteExplorer';
import Lesson2Game from './components/Lesson2Game';
import Lesson3NumbersExplorer from './components/Lesson3NumbersExplorer';
import HandynummerDialer from './components/HandynummerDialer';
import Lesson3Game from './components/Lesson3Game';
import Lesson4NumberMachine from './components/Lesson4NumberMachine';
import Lesson4TensLadder from './components/Lesson4TensLadder';
import Lesson4Game from './components/Lesson4Game';
import Lesson5AlphabetSoundboard from './components/Lesson5AlphabetSoundboard';
import Lesson5Game from './components/Lesson5Game';
import Lesson6ProfileBuilder from './components/Lesson6ProfileBuilder';
import Lesson6Game from './components/Lesson6Game';
import Lesson7DialogueExplorer from './components/Lesson7DialogueExplorer';
import Lesson7Game from './components/Lesson7Game';
import Lesson8SentenceMachine from './components/Lesson8SentenceMachine';
import Lesson8Game from './components/Lesson8Game';
import Lesson9ConjugationStudio from './components/Lesson9ConjugationStudio';
import Lesson9Game from './components/Lesson9Game';
import Lesson10PronounFamily from './components/Lesson10PronounFamily';
import Lesson10Game from './components/Lesson10Game';
import Lesson11HabenSeinStudio from './components/Lesson11HabenSeinStudio';
import Lesson11Game from './components/Lesson11Game';
import Lesson12VerbExplorer from './components/Lesson12VerbExplorer';
import Lesson12Game from './components/Lesson12Game';
import Lesson13RegularVerbsStudio from './components/Lesson13RegularVerbsStudio';
import Lesson13Game from './components/Lesson13Game';
import Lesson14IrregularVerbsStudio from './components/Lesson14IrregularVerbsStudio';
import Lesson14Game from './components/Lesson14Game';
import Lesson15NumbersPart3Studio from './components/Lesson15NumbersPart3Studio';
import Lesson15Game from './components/Lesson15Game';
import Lesson16AdjectivesStudio from './components/Lesson16AdjectivesStudio';
import Lesson16Game from './components/Lesson16Game';
import Lesson17IntroduceSomeoneStudio from './components/Lesson17IntroduceSomeoneStudio';
import Lesson17Game from './components/Lesson17Game';
import Lesson18NominativStudio from './components/Lesson18NominativStudio';
import Lesson18Game from './components/Lesson18Game';
import Lesson19IndefiniteArticlesStudio from './components/Lesson19IndefiniteArticlesStudio';
import Lesson19Game from './components/Lesson19Game';
import Lesson20NegativeArticlesStudio from './components/Lesson20NegativeArticlesStudio';
import Lesson20Game from './components/Lesson20Game';
import Lesson21TimeStudio from './components/Lesson21TimeStudio';
import Lesson21Game from './components/Lesson21Game';
import Lesson22InofficialTimeStudio from './components/Lesson22InofficialTimeStudio';
import Lesson22Game from './components/Lesson22Game';
import Lesson23PossessiveStudio from './components/Lesson23PossessiveStudio';
import Lesson23Game from './components/Lesson23Game';
import Lesson24FamilyStudio from './components/Lesson24FamilyStudio';
import Lesson24Game from './components/Lesson24Game';
import Lesson25AkkusativStudio from './components/Lesson25AkkusativStudio';
import Lesson25Game from './components/Lesson25Game';
import Lesson26PossessiveAkkStudio from './components/Lesson26PossessiveAkkStudio';
import Lesson26Game from './components/Lesson26Game';
import Lesson27MoechtenStudio from './components/Lesson27MoechtenStudio';
import Lesson27Game from './components/Lesson27Game';
import Lesson28WFragenStudio from './components/Lesson28WFragenStudio';
import Lesson28Game from './components/Lesson28Game';
import Lesson29RestaurantStudio from './components/Lesson29RestaurantStudio';
import Lesson29Game from './components/Lesson29Game';
import Lesson30PronounStudio from './components/Lesson30PronounStudio';
import Lesson30Game from './components/Lesson30Game';
import Lesson31DativStudio from './components/Lesson31DativStudio';
import Lesson31Game from './components/Lesson31Game';
import Lesson32OrdinalStudio from './components/Lesson32OrdinalStudio';
import Lesson32Game from './components/Lesson32Game';
import Lesson33TimeQuestionsStudio from './components/Lesson33TimeQuestionsStudio';
import Lesson33Game from './components/Lesson33Game';
import Lesson34PossessiveDativStudio from './components/Lesson34PossessiveDativStudio';
import Lesson34Game from './components/Lesson34Game';
import {
  LESSON_1_ITEMS,
  LESSON_2_ITEMS,
  LESSON_3_ITEMS,
  LESSON_4_ITEMS,
  LESSON_5_ITEMS,
  LESSON_6_ITEMS,
  LESSON_7_ITEMS,
  LESSON_8_ITEMS,
  LESSON_9_ITEMS,
  LESSON_10_ITEMS,
  LESSON_11_ITEMS,
  LESSON_12_ITEMS,
  LESSON_13_ITEMS,
  LESSON_14_ITEMS,
  LESSON_15_ITEMS,
  LESSON_16_ITEMS,
  LESSON_17_ITEMS,
  LESSON_18_ITEMS,
  LESSON_19_ITEMS,
  LESSON_20_ITEMS,
  LESSON_21_ITEMS,
  LESSON_22_ITEMS,
  LESSON_23_ITEMS,
  LESSON_24_ITEMS,
  LESSON_25_ITEMS,
  LESSON_26_ITEMS,
  LESSON_27_ITEMS,
  LESSON_28_ITEMS,
  LESSON_29_ITEMS,
  LESSON_30_ITEMS,
  LESSON_31_ITEMS,
  LESSON_32_ITEMS,
  LESSON_33_ITEMS,
  LESSON_34_ITEMS
} from './data/germanLessons';

export default function App() {
  const [currentLesson, setCurrentLesson] = useState(34); // Default to Lesson 34 as requested, easy switch to 1-33
  const [activeTab, setActiveTab] = useState('cards');
  const [isSlowMode, setIsSlowMode] = useState(false);

  let activeItems = LESSON_1_ITEMS;
  if (currentLesson === 2) activeItems = LESSON_2_ITEMS;
  if (currentLesson === 3) activeItems = LESSON_3_ITEMS;
  if (currentLesson === 4) activeItems = LESSON_4_ITEMS;
  if (currentLesson === 5) activeItems = LESSON_5_ITEMS;
  if (currentLesson === 6) activeItems = LESSON_6_ITEMS;
  if (currentLesson === 7) activeItems = LESSON_7_ITEMS;
  if (currentLesson === 8) activeItems = LESSON_8_ITEMS;
  if (currentLesson === 9) activeItems = LESSON_9_ITEMS;
  if (currentLesson === 10) activeItems = LESSON_10_ITEMS;
  if (currentLesson === 11) activeItems = LESSON_11_ITEMS;
  if (currentLesson === 12) activeItems = LESSON_12_ITEMS;
  if (currentLesson === 13) activeItems = LESSON_13_ITEMS;
  if (currentLesson === 14) activeItems = LESSON_14_ITEMS;
  if (currentLesson === 15) activeItems = LESSON_15_ITEMS;
  if (currentLesson === 16) activeItems = LESSON_16_ITEMS;
  if (currentLesson === 17) activeItems = LESSON_17_ITEMS;
  if (currentLesson === 18) activeItems = LESSON_18_ITEMS;
  if (currentLesson === 19) activeItems = LESSON_19_ITEMS;
  if (currentLesson === 20) activeItems = LESSON_20_ITEMS;
  if (currentLesson === 21) activeItems = LESSON_21_ITEMS;
  if (currentLesson === 22) activeItems = LESSON_22_ITEMS;
  if (currentLesson === 23) activeItems = LESSON_23_ITEMS;
  if (currentLesson === 24) activeItems = LESSON_24_ITEMS;
  if (currentLesson === 25) activeItems = LESSON_25_ITEMS;
  if (currentLesson === 26) activeItems = LESSON_26_ITEMS;
  if (currentLesson === 27) activeItems = LESSON_27_ITEMS;
  if (currentLesson === 28) activeItems = LESSON_28_ITEMS;
  if (currentLesson === 29) activeItems = LESSON_29_ITEMS;
  if (currentLesson === 30) activeItems = LESSON_30_ITEMS;
  if (currentLesson === 31) activeItems = LESSON_31_ITEMS;
  if (currentLesson === 32) activeItems = LESSON_32_ITEMS;
  if (currentLesson === 33) activeItems = LESSON_33_ITEMS;
  if (currentLesson === 34) activeItems = LESSON_34_ITEMS;

  const getLessonTitle = () => {
    if (currentLesson === 1) return "Lesson 1: Begrüßungen (Greetings)";
    if (currentLesson === 2) return "Lesson 2: Häufige Redemittel (Common Everyday Phrases)";
    if (currentLesson === 3) return "Lesson 3: Zahlen 0 - 20 & Meine Handynummer (Numbers & Mobile)";
    if (currentLesson === 4) return "Lesson 4: Zahlen 21 - 100 & The Backwards Rule (Numbers 21 to 100)";
    if (currentLesson === 5) return "Lesson 5: Das Alphabet (A bis Z) - The 30 German Characters & Sounds";
    if (currentLesson === 6) return "Lesson 6: Sich vorstellen (Introducing Yourself) - Name, Origin, Job & Family";
    if (currentLesson === 7) return "Lesson 7: Jemanden kennenlernen (Getting to Know Someone) - Formal 'Sie' vs. Casual 'du'";
    if (currentLesson === 8) return "Lesson 8: Satzstruktur (German Sentence Structure) - Verb Positions & Question Types";
    if (currentLesson === 9) return "Lesson 9: Satzstruktur Teil 2 (Verb Conjugation) - The Golden Endings (-e, -st, -en)";
    if (currentLesson === 10) return "Lesson 10: Personalpronomen (Nominativ) - The Personal Pronoun Family (er, sie, es, wir, ihr, Sie)";
    if (currentLesson === 11) return "Lesson 11: Verbkonjugation (haben & sein) - The Two Royal Pillar Verbs";
    if (currentLesson === 12) return "Lesson 12: Was ist ein Verb? (Verb Structure & Types) - Stem, Ending & Regular vs. Irregular";
    if (currentLesson === 13) return "Lesson 13: Regelmäßige Verben (Regular Verbs & The 2 Golden Exceptions)";
    if (currentLesson === 14) return "Lesson 14: Unregelmäßige Verben (Irregular Verbs with Vowel Change & The Rebel 'wissen')";
    if (currentLesson === 15) return "Lesson 15: Zahlen Teil 3 (Big Numbers 100 to 1 Billion, Combinations & Historical Years)";
    if (currentLesson === 16) return "Lesson 16: Adjektive & Gegenteile (Adjectives, Opposites & The 'aber' Connector)";
    if (currentLesson === 17) return "Lesson 17: jemanden vorstellen (Introducing Someone Else - He, She, Child & Couples)";
    if (currentLesson === 18) return "Lesson 18: Artikel im Nominativ (Definite Articles: der, die, das & Universal Plural die)";
    if (currentLesson === 19) return "Lesson 19: unbestimmte Artikel (Indefinite Articles: ein, eine, ein & Plural Nullartikel)";
    if (currentLesson === 20) return "Lesson 20: negative Artikel im Nominativ (kein, keine, kein & Plural keine - The Magic 'K' Rule)";
    if (currentLesson === 21) return "Lesson 21: Die Uhrzeit - offizielle Zeit (Telling Time in German - 24-Hour Digital Clock & Time Units)";
    if (currentLesson === 22) return "Lesson 22: Inoffizielle Zeit (Zeit in Umgangssprache - Everyday Conversational Time)";
    if (currentLesson === 23) return "Lesson 23: Possessivartikel im Nominativ (Possessive Articles in the Nominative Case)";
    if (currentLesson === 24) return "Lesson 24: Die Familie (The Family, Relative Pairs & The 3-Generation Family Tree)";
    if (currentLesson === 25) return "Lesson 25: Artikel im Akkusativ (Articles in the Accusative Case - Direct Object)";
    if (currentLesson === 26) return "Lesson 26: Possessivartikel im Akkusativ (Possessive Articles in the Accusative Case)";
    if (currentLesson === 27) return "Lesson 27: möchten (The Modal Verb 'would like to' & Sentence Brackets)";
    if (currentLesson === 28) return "Lesson 28: W-Fragen (German W-Questions - The 13 Key Question Words)";
    if (currentLesson === 29) return "Lesson 29: im Restaurant & Café bestellen (Ordering in a Restaurant / Café)";
    if (currentLesson === 30) return "Lesson 30: Personalpronomen im Akkusativ (Accusative Personal Pronouns: mich, dich, ihn, uns, euch & The Unchanging Twins)";
    if (currentLesson === 31) return "Lesson 31: Artikel im Dativ (Definite, Indefinite & Negative Articles in the Dative Case - The Gift Receiver)";
    if (currentLesson === 32) return "Lesson 32: Ordinalzahlen (Ordinal Numbers - Dates, Birthdays, Rankings & The 4 Rebels)";
    if (currentLesson === 33) return "Lesson 33: Zeit - Fragewörter (Questions Relating to Time - The 9 Time Keys & Prepositions)";
    return "Lesson 34: Possessivartikel im Dativ (Possessive Articles in the Dative Case - The Beneficiary Ownership)";
  };

  const getLessonDesc = () => {
    if (currentLesson === 1) {
      return "German greetings made friendly, colorful, and memorable with everyday analogies. Tap any card to listen!";
    }
    if (currentLesson === 2) {
      return "Polite magic words like 'Danke' (Thanks), 'Bitte' (Please / You're welcome), apologizing, and asking someone to repeat with zero fear!";
    }
    if (currentLesson === 3) {
      return "Counting from 0 to 20, the 4 golden sound rules (Z = TS, V = F, EU = OI, -IG = -ICH), the sneaky 16 and 17 drops, and how to read out your mobile phone number (Handynummer)!";
    }
    if (currentLesson === 4) {
      return "The famous German 'Backwards Rule' (saying ones before tens: 1-and-20), the 30 'dreißig' rebel rule with 'ß', the drops in 60 (sechzig) and 70 (siebzig), and 100 (ein)hundert!";
    }
    if (currentLesson === 5) {
      return "The German alphabet has 30 characters: 26 standard letters + 3 Umlauts (ä, ö, ü) + 1 Eszett (ß). Discover the 4 sound shapeshifters: J = Y, V = F, W = V, and why no letter starts with ß!";
    }
    if (currentLesson === 6) {
      return "Master introducing yourself: 3 ways to say your name (Ich heiße / Ich bin / Mein Name ist), origin (komme aus), residence (wohne in), age (Jahre alt), the '-in' rule for women's professions (Studentin, Lehrerin), marital status (ledig / verheiratet), children (Kind / Kinder), and hobbies!";
    }
    if (currentLesson === 7) {
      return "Asking questions and getting to know someone! Discover the golden rule of German respect: formal 'Sie' (strangers, elders, officials, verb ends in -en) vs. friendly 'du' (friends, family, kids, verb ends in -st), plus 'Ihr' vs. 'dein'!";
    }
    if (currentLesson === 8) {
      return "Master German sentence architecture without tears: The golden anchor rule (the verb ALWAYS sits in Position 2 in statements and W-Fragen), the 'Heute' flip trick, and why the verb leaps to Position 1 in Yes/No questions (Ja/Nein-Fragen)!";
    }
    if (currentLesson === 9) {
      return "Verb conjugation made crystal clear! Learn how verbs dress up: 'ich' takes -e, 'du' takes -st, and 'Sie' takes -en across wohnen, kommen, heißen (du heißt), and sprechen (du sprichst)!";
    }
    if (currentLesson === 10) {
      return "The complete German personal pronoun family: 1st person (ich, wir), 2nd person (du, ihr, Sie), and 3rd person (er, sie, es, sie). Discover how pronouns act as substitute players to make sentences concise without repeating names!";
    }
    if (currentLesson === 11) {
      return "Meet the two royal pillars of German: King 'sein' (to be - identity, condition, who you are) and Queen 'haben' (to have - possessions, family, relations). Master their conjugations across all pronouns, explore all 16 real-life sentences, and pinpoint the Subjekt with ease!";
    }
    if (currentLesson === 12) {
      return "What is a verb? Discover the action engine of every sentence! Learn the tree structure of verbs (Verbstamm trunk + Endung leaves), the 1st/2nd/3rd person system, and the clear difference between obedient regular verbs (schwache Verben) and superhero irregular verbs (starke Verben) with stem vowel flips!";
    }
    if (currentLesson === 13) {
      return "Conjugate regular German verbs with total ease! Learn the standard ending uniform (-e, -st, -t, -en, -t, -en), explore all 14 slide verbs (wohnen, machen, lernen, spielen, studieren, hören, telefonieren, fragen, sagen), and master the 2 golden pronunciation exceptions: No Double Snake Hiss (reisen, tanzen) and the Breathing Cushion -e- (arbeiten, warten, antworten)!";
    }
    if (currentLesson === 14) {
      return "Meet the superhero irregular verbs! Master the golden rule: the vowel shifts ONLY for 'du' and 'er/sie/es'. Explore all 5 vowel transformation patterns (e->i, e->ie, au->äu, a->ä, i->ei) across 13 slide verbs, and discover the famous twin rebel 'wissen'!";
    }
    if (currentLesson === 15) {
      return "Count from 100 all the way to 1 Billion (eine Milliarde)! Build complex compound numbers like Lego bricks (634 = sechshundertvierunddreißig), and discover the historical year rule (1975 = neunzehnhundertfünfundsiebzig) vs 2000+ years (2017 = zweitausendsiebzehn)!";
    }
    if (currentLesson === 16) {
      return "Master German adjectives and opposite pairs (das Gegenteil / die Gegenteile)! Explore all 16 opposite pairs from the lesson, learn how to bridge contrasting sentences using 'aber' (but), and master the special double-life of 'alt': 'alt vs. neu' for objects, and 'alt vs. jung' for people!";
    }
    if (currentLesson === 17) {
      return "Learn how to introduce any friend, colleague, child, or group in German! Master the 9 core questions (Wer ist das? Woher kommt er? Wo wohnt sie? Was sind ihre Hobbys?), company names with 'bei' (bei Siemens, bei BMW), and the special country rule 'aus der Schweiz'!";
    }
    if (currentLesson === 18) {
      return "Master the German definite articles ('The') in the Nominative case! Learn why all German nouns are capitalized, how to spot the Subject with 'Wer?' or 'Was?', the 3 genders (der Mann, die Frau, das Baby), and the golden Universal Plural Umbrella (die)!";
    }
    if (currentLesson === 19) {
      return "Master the German indefinite articles ('A / An') in the Nominative case! Learn the storytelling sequence (introduce with ein/eine, describe with der/die/das), discover why masculine and neuter are identical twins (ein), and why plural has no article (Das sind Blumen)!";
    }
    if (currentLesson === 20) {
      return "Master how to say 'NOT A / NO' in German! Discover the Magic 'K' Rule: simply put a K in front of ein/eine to get kein/keine! Learn the Question-and-Answer formula (Ist das ein Kuli? Nein, das ist kein Kuli!), and master plural negation (keine Sterne)!";
    }
    if (currentLesson === 21) {
      return "Master official German time (offizielle Zeit) and the 24-hour clock! Learn the units of time (Woche, Tag, Stunde, Minute, Sekunde), how to ask the time (Wie spät ist es? / Wie viel Uhr ist es?), the golden formula [Stunde] + Uhr + [Minute], and the drop-s rule for 'ein Uhr'!";
    }
    if (currentLesson === 22) {
      return "Master how native Germans actually tell the time in everyday conversation! Learn the famous 'halb' forward-looking rule (halb zwei = 1:30), the Slide 31 clock circle (nach vs. vor), 'fünf vor/nach halb', and everyday approximations (kurz vor, gleich, fast)!";
    }
    if (currentLesson === 23) {
      return "Master German possessive articles ('my, your, his, her, its, our, your group, formal Your, their')! Learn the golden ending rhythm (der & das take no ending, die & Plural add -e), beware the 'euer -> eure' spelling trap, and decode the 3 'ihr' triplets with ease!";
    }
    if (currentLesson === 24) {
      return "Explore the German family tree (der Familienbaum)! Learn core relatives (Vater, Mutter, Bruder, Schwester, Großvater, Großmutter, Onkel, Tante, Cousin, Cousine), the 3 German collective plurals (die Eltern, die Großeltern, die Geschwister), and affectionate pet names (Opa & Oma)!";
    }
    if (currentLesson === 25) {
      return "Master the German Accusative direct object case (Akkusativ)! Discover the golden relief secret: ONLY masculine transforms (der -> den, ein -> einen, kein -> keinen), while feminine, neuter, and plural stay 100% identical! Learn Wen? vs. Was?, and test the 4 famous apple sentences!";
    }
    if (currentLesson === 26) {
      return "Express love, likes, and opinions about people and things you own! Master the golden rule: ONLY masculine adds -EN (meinen, seinen, ihren, unseren, euren, Ihren), while feminine, neuter, and plural stay 100% identical to Nominativ! Explore Julia, Alex, and Sabrina's stories, the 9-dog drill, and classroom exercises!";
    }
    if (currentLesson === 27) {
      return "Politely express wishes, order food, and make invitations with 'möchten'! Master the German Satzklammer (Verb Bracket: Position 2 helper + End of sentence action infinitive), the Modal Twin Rule (ich möchte = er/sie/es möchte), direct noun orders, and all 5 chalkboard exercises!";
    }
    if (currentLesson === 28) {
      return "Unlock every German conversation with the 13 essential W-Question keys (Was, Warum, Wann, Wer, Wen, Wie, Wo, Woher, Wohin, Wie viel, Wie viele, Wie oft, Welche)! Master Wer vs. Wen (Subject vs. Object), the Location Trio (Wo vs. Woher vs. Wohin), and price vs. quantity inquiries with zero stress!";
    }
    if (currentLesson === 29) {
      return "Master real-world German dining like a native! Learn how to request a table (einen Tisch), order food & drinks using 3 magic customer formulas (Ich hätte gerne, Ich nehme, Ich möchte), navigate Akkusativ menu items, split the bill (Zusammen oder getrennt?), tip like a local ('Stimmt so!'), and order coffee to go (Zum Mitnehmen)!";
    }
    if (currentLesson === 30) {
      return "Master personal pronouns in the accusative case (Personalpronomen im Akkusativ)! Understand how pronouns transform when they are the direct receiver of an action. Master the 5 Changers (ich ➔ mich, du ➔ dich, er ➔ ihn, wir ➔ uns, ihr ➔ euch) and why 'sie', 'es', and formal 'Sie' stay completely identical!";
    }
    if (currentLesson === 31) {
      return "Master the Dative case (Dativ / Indirect Object)! Discover the magic M-R-M-N formula (dem, der, dem, den + n | einem, einer, einem | keinem, keiner, keinem, keinen + n), understand who receives gifts and benefits (Wem?), and practice pure Dative verbs like 'danken' and 'helfen'.";
    }
    if (currentLesson === 32) {
      return "Master German ordinal numbers (Ordinalzahlen: erste, zweite, dritte... 1. bis 1000.)! Learn how to express dates and birthdays (Heute ist der sechste April / Ich habe am sechsten April Geburtstag), conquer the 4 irregular rebels (erste, dritte, siebte, achte), and master the -te vs. -ste rules.";
    }
    if (currentLesson === 33) {
      return "Master how to ask and answer all 9 German time questions (Wann, Bis wann, Seit wann, Ab wann, Von wann bis wann, Um wie viel Uhr, Wie spät, Wie lange, Wie oft)! Explore the preposition trio (um, am, im), ongoing past vs. future kickoff (seit vs. ab), duration with 'dauern', and the complete 100% to 0% frequency ladder.";
    }
    return "Master German possessive articles in the Dative case (meinem, meiner, meinem, meinen + n)! Explore 4 character story journeys (Petra giving kisses, Martin buying chocolate, Maria bringing meals, Lukas & Kathrin buying gifts), the Master Slide 23 matrix, sentence anatomy (Nom + Verb + Dativ + Akkusativ), and the Plural +n rule.";
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Header with 5-Lesson Switcher */}
      <Header
        currentLesson={currentLesson}
        setCurrentLesson={setCurrentLesson}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSlowMode={isSlowMode}
        setIsSlowMode={setIsSlowMode}
      />

      {/* Main Learning Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Story Cards */}
        {activeTab === 'cards' && (
          <StoryCardList
            items={activeItems}
            isSlowMode={isSlowMode}
            lessonTitle={getLessonTitle()}
            lessonDesc={getLessonDesc()}
          />
        )}

        {/* Lesson 1 Specific Modules */}
        {currentLesson === 1 && activeTab === 'time' && (
          <TimeOfDayExplorer isSlowMode={isSlowMode} />
        )}

        {currentLesson === 1 && activeTab === 'phone' && (
          <PhoneAndEyesSimulator isSlowMode={isSlowMode} />
        )}

        {currentLesson === 1 && activeTab === 'game' && (
          <MatatuGame isSlowMode={isSlowMode} />
        )}

        {/* Lesson 2 Specific Modules */}
        {currentLesson === 2 && activeTab === 'bitte' && (
          <Lesson2BitteExplorer isSlowMode={isSlowMode} />
        )}

        {currentLesson === 2 && activeTab === 'game2' && (
          <Lesson2Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 3 Specific Modules */}
        {currentLesson === 3 && activeTab === 'numbers' && (
          <Lesson3NumbersExplorer isSlowMode={isSlowMode} />
        )}

        {currentLesson === 3 && activeTab === 'dialer' && (
          <HandynummerDialer isSlowMode={isSlowMode} />
        )}

        {currentLesson === 3 && activeTab === 'game3' && (
          <Lesson3Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 4 Specific Modules */}
        {currentLesson === 4 && activeTab === 'machine' && (
          <Lesson4NumberMachine isSlowMode={isSlowMode} />
        )}

        {currentLesson === 4 && activeTab === 'ladder' && (
          <Lesson4TensLadder isSlowMode={isSlowMode} />
        )}

        {currentLesson === 4 && activeTab === 'game4' && (
          <Lesson4Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 5 Specific Modules */}
        {currentLesson === 5 && activeTab === 'alphabet' && (
          <Lesson5AlphabetSoundboard isSlowMode={isSlowMode} />
        )}

        {currentLesson === 5 && activeTab === 'game5' && (
          <Lesson5Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 6 Specific Modules */}
        {currentLesson === 6 && activeTab === 'builder' && (
          <Lesson6ProfileBuilder isSlowMode={isSlowMode} />
        )}

        {currentLesson === 6 && activeTab === 'game6' && (
          <Lesson6Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 7 Specific Modules */}
        {currentLesson === 7 && activeTab === 'dialogue' && (
          <Lesson7DialogueExplorer isSlowMode={isSlowMode} />
        )}

        {currentLesson === 7 && activeTab === 'game7' && (
          <Lesson7Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 8 Specific Modules */}
        {currentLesson === 8 && activeTab === 'machine' && (
          <Lesson8SentenceMachine isSlowMode={isSlowMode} />
        )}

        {currentLesson === 8 && activeTab === 'game8' && (
          <Lesson8Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 9 Specific Modules */}
        {currentLesson === 9 && activeTab === 'studio' && (
          <Lesson9ConjugationStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 9 && activeTab === 'game9' && (
          <Lesson9Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 10 Specific Modules */}
        {currentLesson === 10 && activeTab === 'family' && (
          <Lesson10PronounFamily isSlowMode={isSlowMode} />
        )}

        {currentLesson === 10 && activeTab === 'game10' && (
          <Lesson10Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 11 Specific Modules */}
        {currentLesson === 11 && activeTab === 'palace' && (
          <Lesson11HabenSeinStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 11 && activeTab === 'game11' && (
          <Lesson11Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 12 Specific Modules */}
        {currentLesson === 12 && activeTab === 'studio' && (
          <Lesson12VerbExplorer isSlowMode={isSlowMode} />
        )}

        {currentLesson === 12 && activeTab === 'game12' && (
          <Lesson12Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 13 Specific Modules */}
        {currentLesson === 13 && activeTab === 'regular' && (
          <Lesson13RegularVerbsStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 13 && activeTab === 'game13' && (
          <Lesson13Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 14 Specific Modules */}
        {currentLesson === 14 && activeTab === 'vowel' && (
          <Lesson14IrregularVerbsStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 14 && activeTab === 'game14' && (
          <Lesson14Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 15 Specific Modules */}
        {currentLesson === 15 && activeTab === 'numbers3' && (
          <Lesson15NumbersPart3Studio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 15 && activeTab === 'game15' && (
          <Lesson15Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 16 Specific Modules */}
        {currentLesson === 16 && activeTab === 'opposites' && (
          <Lesson16AdjectivesStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 16 && activeTab === 'game16' && (
          <Lesson16Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 17 Specific Modules */}
        {currentLesson === 17 && activeTab === 'studio17' && (
          <Lesson17IntroduceSomeoneStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 17 && activeTab === 'game17' && (
          <Lesson17Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 18 Specific Modules */}
        {currentLesson === 18 && activeTab === 'studio18' && (
          <Lesson18NominativStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 18 && activeTab === 'game18' && (
          <Lesson18Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 19 Specific Modules */}
        {currentLesson === 19 && activeTab === 'studio19' && (
          <Lesson19IndefiniteArticlesStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 19 && activeTab === 'game19' && (
          <Lesson19Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 20 Specific Modules */}
        {currentLesson === 20 && activeTab === 'studio20' && (
          <Lesson20NegativeArticlesStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 20 && activeTab === 'game20' && (
          <Lesson20Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 21 Specific Modules */}
        {currentLesson === 21 && activeTab === 'studio21' && (
          <Lesson21TimeStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 21 && activeTab === 'game21' && (
          <Lesson21Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 22 Specific Modules */}
        {currentLesson === 22 && activeTab === 'studio22' && (
          <Lesson22InofficialTimeStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 22 && activeTab === 'game22' && (
          <Lesson22Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 23 Specific Modules */}
        {currentLesson === 23 && activeTab === 'studio23' && (
          <Lesson23PossessiveStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 23 && activeTab === 'game23' && (
          <Lesson23Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 24 Specific Modules */}
        {currentLesson === 24 && activeTab === 'studio24' && (
          <Lesson24FamilyStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 24 && activeTab === 'game24' && (
          <Lesson24Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 25 Specific Modules */}
        {currentLesson === 25 && activeTab === 'studio25' && (
          <Lesson25AkkusativStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 25 && activeTab === 'game25' && (
          <Lesson25Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 26 Specific Modules */}
        {currentLesson === 26 && activeTab === 'studio26' && (
          <Lesson26PossessiveAkkStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 26 && activeTab === 'game26' && (
          <Lesson26Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 27 Specific Modules */}
        {currentLesson === 27 && activeTab === 'studio27' && (
          <Lesson27MoechtenStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 27 && activeTab === 'game27' && (
          <Lesson27Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 28 Specific Modules */}
        {currentLesson === 28 && activeTab === 'studio28' && (
          <Lesson28WFragenStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 28 && activeTab === 'game28' && (
          <Lesson28Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 29 Specific Modules */}
        {currentLesson === 29 && activeTab === 'studio29' && (
          <Lesson29RestaurantStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 29 && activeTab === 'game29' && (
          <Lesson29Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 30 Specific Modules */}
        {currentLesson === 30 && activeTab === 'studio30' && (
          <Lesson30PronounStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 30 && activeTab === 'game30' && (
          <Lesson30Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 31 Specific Modules */}
        {currentLesson === 31 && activeTab === 'studio31' && (
          <Lesson31DativStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 31 && activeTab === 'game31' && (
          <Lesson31Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 32 Specific Modules */}
        {currentLesson === 32 && activeTab === 'studio32' && (
          <Lesson32OrdinalStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 32 && activeTab === 'game32' && (
          <Lesson32Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 33 Specific Modules */}
        {currentLesson === 33 && activeTab === 'studio33' && (
          <Lesson33TimeQuestionsStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 33 && activeTab === 'game33' && (
          <Lesson33Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 34 Specific Modules */}
        {currentLesson === 34 && activeTab === 'studio34' && (
          <Lesson34PossessiveDativStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 34 && activeTab === 'game34' && (
          <Lesson34Game isSlowMode={isSlowMode} />
        )}

        {/* Shared Interactive Modules */}
        {activeTab === 'memory' && (
          <MatchingGame items={activeItems} isSlowMode={isSlowMode} />
        )}

        {activeTab === 'summary' && (
          <AtAGlanceSummary
            items={activeItems}
            lessonNumber={currentLesson}
            isSlowMode={isSlowMode}
          />
        )}
      </main>

      {/* Reassuring Footer */}
      <footer className="bg-amber-100/60 border-t-2 border-amber-200 py-6 mt-12 text-center text-xs text-stone-600">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <div className="flex items-center justify-center gap-2 font-bold text-amber-900">
            <span>🇰🇪</span>
            <span>German Concepts Explained in Plain Layman Terms with Everyday Relatable Analogies</span>
            <span>🇩🇪</span>
          </div>
          <p className="text-stone-500">
            No scary academic jargon. Designed for kindergarteners, elders, and absolute beginners alike. Tap any word, letter, or number to hear live audio!
          </p>
        </div>
      </footer>
    </div>
  );
}
