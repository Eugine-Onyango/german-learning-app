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
import Lesson35DativPronounStudio from './components/Lesson35DativPronounStudio';
import Lesson35Game from './components/Lesson35Game';
import Lesson36SeparableVerbsStudio from './components/Lesson36SeparableVerbsStudio';
import Lesson36Game from './components/Lesson36Game';
import Lesson37DailyRoutineStudio from './components/Lesson37DailyRoutineStudio';
import Lesson37Game from './components/Lesson37Game';
import Lesson38ImperativStudio from './components/Lesson38ImperativStudio';
import Lesson38Game from './components/Lesson38Game';
import Lesson39DirectionsStudio from './components/Lesson39DirectionsStudio';
import Lesson39Game from './components/Lesson39Game';
import Lesson40WarHatteStudio from './components/Lesson40WarHatteStudio';
import Lesson40Game from './components/Lesson40Game';
import Lesson41InseparableStudio from './components/Lesson41InseparableStudio';
import Lesson41Game from './components/Lesson41Game';
import Lesson42HealthStudio from './components/Lesson42HealthStudio';
import Lesson42Game from './components/Lesson42Game';
import Lesson43PerfektStudio from './components/Lesson43PerfektStudio';
import Lesson43Game from './components/Lesson43Game';
import Lesson44HabenSeinStudio from './components/Lesson44HabenSeinStudio';
import Lesson44Game from './components/Lesson44Game';
import Lesson45PartizipStudio from './components/Lesson45PartizipStudio';
import Lesson45Game from './components/Lesson45Game';
import Lesson46UrlaubStudio from './components/Lesson46UrlaubStudio';
import Lesson46Game from './components/Lesson46Game';
import Lesson47SupermarktStudio from './components/Lesson47SupermarktStudio';
import Lesson47Game from './components/Lesson47Game';
import Lesson48WetterStudio from './components/Lesson48WetterStudio';
import Lesson48Game from './components/Lesson48Game';
import Lesson49VerabredungStudio from './components/Lesson49VerabredungStudio';
import Lesson49Game from './components/Lesson49Game';
import Lesson50EinladungStudio from './components/Lesson50EinladungStudio';
import Lesson50Game from './components/Lesson50Game';
import Lesson51FashionOpinionStudio from './components/Lesson51FashionOpinionStudio';
import Lesson51Game from './components/Lesson51Game';
import Lesson52WelchStudio from './components/Lesson52WelchStudio';
import Lesson52Game from './components/Lesson52Game';
import Lesson53DiesStudio from './components/Lesson53DiesStudio';
import Lesson53Game from './components/Lesson53Game';
import Lesson54KaufhausStudio from './components/Lesson54KaufhausStudio';
import Lesson54Game from './components/Lesson54Game';
import Lesson55TaxiStudio from './components/Lesson55TaxiStudio';
import Lesson55Game from './components/Lesson55Game';
import Lesson56ZeitadverbienStudio from './components/Lesson56ZeitadverbienStudio';
import Lesson56Game from './components/Lesson56Game';
import Lesson57TelefonStudio from './components/Lesson57TelefonStudio';
import Lesson57Game from './components/Lesson57Game';
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
  LESSON_34_ITEMS,
  LESSON_35_ITEMS,
  LESSON_36_ITEMS,
  LESSON_37_ITEMS,
  LESSON_38_ITEMS,
  LESSON_39_ITEMS,
  LESSON_40_ITEMS,
  LESSON_41_ITEMS,
  LESSON_42_ITEMS,
  LESSON_43_ITEMS,
  LESSON_44_ITEMS,
  LESSON_45_ITEMS,
  LESSON_46_ITEMS,
  LESSON_47_ITEMS,
  LESSON_48_ITEMS,
  LESSON_49_ITEMS,
  LESSON_50_ITEMS,
  LESSON_51_ITEMS,
  LESSON_52_ITEMS,
  LESSON_53_ITEMS,
  LESSON_54_ITEMS,
  LESSON_55_ITEMS,
  LESSON_56_ITEMS,
  LESSON_57_ITEMS
} from './data/germanLessons';

export default function App() {
  const [currentLesson, setCurrentLesson] = useState(57); // Default to Lesson 57 as requested, easy switch to 1-56
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
  if (currentLesson === 35) activeItems = LESSON_35_ITEMS;
  if (currentLesson === 36) activeItems = LESSON_36_ITEMS;
  if (currentLesson === 37) activeItems = LESSON_37_ITEMS;
  if (currentLesson === 38) activeItems = LESSON_38_ITEMS;
  if (currentLesson === 39) activeItems = LESSON_39_ITEMS;
  if (currentLesson === 40) activeItems = LESSON_40_ITEMS;
  if (currentLesson === 41) activeItems = LESSON_41_ITEMS;
  if (currentLesson === 42) activeItems = LESSON_42_ITEMS;
  if (currentLesson === 43) activeItems = LESSON_43_ITEMS;
  if (currentLesson === 44) activeItems = LESSON_44_ITEMS;
  if (currentLesson === 45) activeItems = LESSON_45_ITEMS;
  if (currentLesson === 46) activeItems = LESSON_46_ITEMS;
  if (currentLesson === 47) activeItems = LESSON_47_ITEMS;
  if (currentLesson === 48) activeItems = LESSON_48_ITEMS;
  if (currentLesson === 49) activeItems = LESSON_49_ITEMS;
  if (currentLesson === 50) activeItems = LESSON_50_ITEMS;
  if (currentLesson === 51) activeItems = LESSON_51_ITEMS;
  if (currentLesson === 52) activeItems = LESSON_52_ITEMS;
  if (currentLesson === 53) activeItems = LESSON_53_ITEMS;
  if (currentLesson === 54) activeItems = LESSON_54_ITEMS;
  if (currentLesson === 55) activeItems = LESSON_55_ITEMS;
  if (currentLesson === 56) activeItems = LESSON_56_ITEMS;
  if (currentLesson === 57) activeItems = LESSON_57_ITEMS;

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
    if (currentLesson === 25) return "Lesson 25: Artikel im Akkusativ (Articles in the Akkusativ Case - Direct Object)";
    if (currentLesson === 26) return "Lesson 26: Possessivartikel im Akkusativ (Possessive Articles in the Accusative Case)";
    if (currentLesson === 27) return "Lesson 27: möchten (The Modal Verb 'would like to' & Sentence Brackets)";
    if (currentLesson === 28) return "Lesson 28: W-Fragen (German W-Questions - The 13 Key Question Words)";
    if (currentLesson === 29) return "Lesson 29: im Restaurant & Café bestellen (Ordering in a Restaurant / Café)";
    if (currentLesson === 30) return "Lesson 30: Personalpronomen im Akkusativ (Accusative Personal Pronouns: mich, dich, ihn, uns, euch & The Unchanging Twins)";
    if (currentLesson === 31) return "Lesson 31: Artikel im Dativ (Definite, Indefinite & Negative Articles in the Dative Case - The Gift Receiver)";
    if (currentLesson === 32) return "Lesson 32: Ordinalzahlen (Ordinal Numbers - Dates, Birthdays, Rankings & The 4 Rebels)";
    if (currentLesson === 33) return "Lesson 33: Zeit - Fragewörter (Questions Relating to Time - The 9 Time Keys & Prepositions)";
    if (currentLesson === 34) return "Lesson 34: Possessivartikel im Dativ (Possessive Articles in the Dative Case - The Beneficiary Ownership)";
    if (currentLesson === 35) return "Lesson 35: Personalpronomen im Dativ (Personal Pronouns in the Dative Case - The Gift & Help Receivers)";
    if (currentLesson === 36) return "Lesson 36: Trennbare Verben (German Separable Verbs - The Detachable Rocket Engine & Sentence Positions)";
    if (currentLesson === 37) return "Lesson 37: Der Tagesablauf (German Daily Routine - From Morning Alarm to Sleep & The Inversion Rule)";
    if (currentLesson === 38) return "Lesson 38: Der Imperativ (German Commands, Requests & Advice - du, ihr, Sie & Rebel Verbs)";
    if (currentLesson === 39) return "Lesson 39: Wegbeschreibung (Giving & Asking for Directions - Landmarks, zum vs. zur, Turns & Dialogues)";
    if (currentLesson === 40) return "Lesson 40: war / hatte (Simple Past of sein & haben - The Mirror Twin Rule & Time Travel)";
    if (currentLesson === 41) return "Lesson 41: Untrennbare Verben (German Inseparable Verbs - The 8 Superglue Bodyguards & Sentence Positions)";
    if (currentLesson === 42) return "Lesson 42: krank sein (Health, Illnesses, Pains, wehtun & Medical Advice)";
    if (currentLesson === 43) return "Lesson 43: das Perfekt Teil 1 (Present Perfect Tense - Satzklammer & Partizip II Formations)";
    if (currentLesson === 44) return "Lesson 44: das Perfekt Teil 2 (haben vs. sein Selection Rules, Movement, State Change & Chameleon Verbs)";
    if (currentLesson === 45) return "Lesson 45: das Perfekt Teil 3 (The 4 Partizip II Blueprints - Regular, Irregular, Separable Sandwich & Inseparable Superglue)";
    if (currentLesson === 46) return "Lesson 46: Was hast du im Urlaub gemacht? (Vacation Vocab, Destinations, Lodgings, Activities & Compound Past Stories)";
    if (currentLesson === 47) return "Lesson 47: Im Supermarkt (Supermarket Vocab, Packaging, Measurements, Aisle Navigation & Checkout Dialogue)";
    if (currentLesson === 48) return "Lesson 48: Wie ist das Wetter? (German Weather Vocab, Temperatures, Noun-to-Adjective Blueprints & Forecast Dialogues)";
    if (currentLesson === 49) return "Lesson 49: Verabredungen (Making Meetup Invitations, Availability Checks, Polite Excuses, Acceptances & Meeting Logistics)";
    if (currentLesson === 50) return "Lesson 50: Die Einladung (Writing Invitations, 3-Part Letter Anatomy, RSVPs, Potluck & Polite Declines)";
    if (currentLesson === 51) return "Lesson 51: Gefallen und Missfallen ausdrücken (Expressing Likes & Dislikes / Taste & Opinions)";
    if (currentLesson === 52) return "Lesson 52: Das Fragepronomen \"welch-\" (Which? Across Nominativ, Akkusativ & Dativ)";
    if (currentLesson === 53) return "Lesson 53: Demonstrativartikel \"dies-\" (This / These across Nominativ, Akkusativ & Dativ)";
    if (currentLesson === 54) return "Lesson 54: Im Kaufhaus (In the Department Store - Shopping, Sizing, Fitting Rooms & Slide 36 Pronouns)";
    if (currentLesson === 55) return "Lesson 55: Mit dem Taxi fahren (Taking a Taxi - Booking, Hailing, Cockpit & Fare Tipping)";
    if (currentLesson === 56) return "Lesson 56: Zeitadverbien (Adverbs of Time - Habitual Days, 3-Era Timelines, Sequence & Frequency)";
    return "Lesson 57: Am Telefon sprechen (Telephone Conversations, Greetings, Messages & Clarifications)";
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
    if (currentLesson === 34) {
      return "Master German possessive articles in the Dative case (meinem, meiner, meinem, meinen + n)! Explore 4 character story journeys (Petra giving kisses, Martin buying chocolate, Maria bringing meals, Lukas & Kathrin buying gifts), the Master Slide 23 matrix, sentence anatomy (Nom + Verb + Dativ + Akkusativ), and the Plural +n rule.";
    }
    if (currentLesson === 35) {
      return "Master German personal pronouns in the Dative case (mir, dir, ihm, ihr, ihm, uns, euch, Ihnen, ihnen)! Explore the 10 Character Story Cards, the Nominativ vs. Akkusativ vs. Dativ Master Matrix, and the 10 Everyday Hit Sentences with Dative verbs (schmecken, helfen, gratulieren, gehören, gefallen, danken, antworten).";
    }
    if (currentLesson === 36) {
      return "Master German separable verbs (Trennbare Verben: aufstehen, anrufen, abfahren, einkaufen, fernsehen, zumachen, einladen)! Discover the Detachable Rocket Principle, sentence positions (Pos. 2 + Satzende, Pos. 1 in Yes/No questions, Pos. 2 in W-questions), and the unseparated Modal Verb Superglue Shield (Wann willst du aufstehen?).";
    }
    if (currentLesson === 37) {
      return "Master talking about your entire day in German (Der Tagesablauf: Aufstehen, Zähne putzen, Frühstücken, Pendeln, Arbeiten, Kaffeepause, Freunde treffen, Abendessen & Einschlafen)! Explore the 24-Hour Timeline Journey, the Golden Inversion Engine (Dann/Danach/Um... + Verb in Pos. 2), and the 4 Time-Block Matrix.";
    }
    if (currentLesson === 38) {
      return "Master giving commands, advice, and polite requests in German (Der Imperativ)! Explore the 3-Lane Transformation Factory (du: drop du & -st + drop Umlaut dots; ihr: drop ihr, keep -t; Sie: invert Verb & Sie), the 3 Royal Rebels (sein -> Sei/Seien Sie, haben -> Hab, werden -> Werde), and everyday hit phrases.";
    }
    if (currentLesson === 39) {
      return "Master asking for and giving directions in German (Wegbeschreibung)! Explore the 3 Compass Arrows (links, geradeaus, rechts), the Golden Destination Rule (zum for der/das vs. zur for die), landmark prepositions (an der Ecke, gegenüber + Dativ, an der Kreuzung), and real-world street dialogues.";
    }
    if (currentLesson === 40) {
      return "Master the Simple Past (Präteritum) of sein & haben (war vs. hatte)! Explore the Time-Travel Comparison Machine (Letztes Jahr hatte ich kein Auto ➔ Heute habe ich ein Auto), the Royal Conjugators, the Mirror Twin Rule (ich = er/sie/es), and live chalkboard drills.";
    }
    if (currentLesson === 41) {
      return "Master German non-separable verbs (Untrennbare Verben)! Discover the Superglue Principle (the prefix NEVER detaches!), the 8 Inseparable Bodyguards (be-emp-ent-er, ge-miss-ver-zer!), 17 core verbs, sentence positions, and modal verb brackets.";
    }
    if (currentLesson === 42) {
      return "Master talking about illness and health in German (krank sein)! Discover the 3 Pain Expression Formulas (Ich habe Kopfschmerzen vs. Mir tut der Kopf weh vs. sich verletzen), all 16 core slide symptoms & illnesses (Fieber, Grippe, Erkältung, Husten), and doctor consultation advice (Gute Besserung!).";
    }
    if (currentLesson === 43) {
      return "Master the German spoken past tense (das Perfekt - Teil 1)! Discover the 2-Pillar Sentence Bracket (Satzklammer: Position 2 helping verb + Satzende Partizip II), when to use haben vs. sein (movement from A to B), the 4 Partizip II patterns (gespielt, gegessen, studiert, angerufen), and interactive sentence unscrambler drills.";
    }
    if (currentLesson === 44) {
      return "Master auxiliary verb selection in the German past tense (das Perfekt - Teil 2: haben vs. sein)! Discover the 85% haben majority rule vs. the 3 sein categories (Movement A ➔ B, State Change & 4 Rebel Exceptions: bleiben, sein, passieren, werden), plus the Chameleon 'fahren' rule!";
    }
    if (currentLesson === 45) {
      return "Master the 4 Partizip II blueprints in German (das Perfekt - Teil 3)! Discover the Lego building blocks: Regular (ge-...-t), Irregular (ge-...-en), Separable Sandwich (ein-ge-kauft, auf-ge-standen), and Inseparable Superglue (erklärt, verstanden strictly NO ge-), plus the VIP -ieren rule!";
    }
    if (currentLesson === 46) {
      return "Master talking about vacations, holidays, destinations, accommodations, and activities in German (Was hast du im Urlaub gemacht?)! Explore the 4 Conversation Pillars (Wo warst du? Mit wem? Wo übernachtet? Was gemacht?), compound past stories, and vacation mindmaps!";
    }
    if (currentLesson === 47) {
      return "Master grocery shopping and navigating the German supermarket (Im Supermarkt)! Learn shopping essentials (der Einkaufswagen, der Einkaufszettel), exact packaging units (eine Dose, ein Stück, eine Tafel, ein Glas, ein Becher), metric weight & liquid measurements (das Pfund = 500g, anderthalb Liter), aisle navigation with Dative prepositions (beim, bei der, bei den), and the complete checkout dialogue at the Kasse!";
    }
    if (currentLesson === 48) {
      return "Master talking about the weather and climate in German (Wie ist das Wetter?)! Discover weather nouns & genders (die Sonne, der Regen, der Schnee, das Gewitter, die Wolke), heat & cold scales (warm, heiß 39°C, kalt, eisig, Ich friere), active verbs vs. adjectives (Es regnet vs. Es ist regnerisch), the Slide 40 Noun-to-Adjective Blueprint chart, and realistic weather forecast dialogues!";
    }
    if (currentLesson === 49) {
      return "Master making appointments and arranging social meetups in German (Verabredungen)! Learn key nouns (die Verabredung vs. der Termin), the 5 invitation formulas (Wollen wir zusammen..., Willst du mit mir..., Gehen wir..., Ich möchte gern...), availability checks (Hast du etwas vor?), accepting with enthusiasm (Das passt! Abgemacht!), polite excuses & obligations (Ich habe viel zu tun, Ich muss meinen Eltern helfen), counter-proposals (Freitag geht nicht... aber Samstag?), and coordinating time and place (Wann und wo treffen wir uns?)!";
    }
    if (currentLesson === 50) {
      return "Master writing invitations and RSVPs in German (Die Einladung)! Discover the 3-Part Letter Anatomy (Anrede, Textteil, Grußformel und Unterschrift), party occasions (Geburtstag, Fest, Hochzeitstag, Essen), venue & starting times (Treffpunkt bei uns zu Hause, Party beginnt um 18 Uhr), potluck requests (einen Salat / Kuchen mitbringen), accepting with joy (Zusagen: Ich freue mich auf Samstag) & plus-one requests, and polite declines with well-wishes (Absagen: Es tut mir leid, aber ich kann leider nicht kommen)!";
    }
    if (currentLesson === 51) {
      return "Master expressing your taste, praising style, rating experiences, and voicing dislikes in German (Gefallen und Missfallen ausdrücken)! Discover 'gefallen + Dativ' (Das Auto gefällt mir / Das gefällt mir sehr gut / gar nicht / überhaupt nicht), 'finden + Adjektiv' (Wie findest du mein Kleid? Das/Die finde ich total schön / echt klasse / hässlich / schlecht), event excitement (Ich hatte viel Spaß! Es war super / klasse / toll), and interactive fashion critique dialogues!";
    }
    if (currentLesson === 52) {
      return "Master the interrogative pronoun \"welch-\" (Which?) across all genders and cases in German! Discover the golden secret: \"welch-\" has ZERO new endings to learn because it simply mirrors the definite articles (der ➔ welcher, den ➔ welchen, dem ➔ welchem, die ➔ welche, das ➔ welches)! Explore the Slide 37 Master Matrix, object choosing dialogues (Hüte, Frauen, Bücher, Blumen), and adjective ending response patterns!";
    }
    if (currentLesson === 53) {
      return "Master pointing to specific objects and people in German with the demonstrative article \"dies-\" (This / These)! Learn why \"dies-\" follows the exact same mirror ending rules as \"welch-\" and definite articles (dieser Pullover, diese Bluse, dieses Auto, diese Schuhe, mit diesem Geld, in diesen Schuhen)! Explore the Slide 24 Master Matrix, boutique simulator, and the natural \"welch- vs. dies-\" dialogue duet!";
    }
    if (currentLesson === 54) {
      return "Master shopping in a German department store (Im Kaufhaus)! Explore floor directories (EG, UG, 1. OG, Männer-, Frauen-, Kinderabteilung), 5-stage boutique roleplay dialogues from greeting (Guten Tag, Sie wünschen?) to request (Ich suche / brauche / hätte gern...), size inquiries (Welche Größe haben Sie denn? ➔ Ich trage Größe 38), directions to fitting rooms (die Umkleidekabine, gleich hier um die Ecke), fit checks (passt gut / ist viel zu klein, eine Nummer größer), style critiques (zu altmodisch / zu modern), compliments (steht Ihnen gut), prices (Was kostet sie?), and the Slide 36 Pronoun Master Summary (der/er, die/sie, das/es)!";
    }
    if (currentLesson === 55) {
      return "Master taking a taxi in German (Mit dem Taxi fahren)! Learn essential taxi vocabulary (das Taxi, der Taxistand, die Taxizentrale, der Taxameter, die Quittung), calling dispatch (Ich hätte gern ein Taxi für morgen / sofort ein Taxi / keine Taxis verfügbar / auf dem Weg), hailing on the street (Sind Sie frei? / Könnten Sie mich zum Flughafen bringen?), in-ride controls (Wohin möchten Sie?, Taxameter einschalten, Ich habe es eilig, Fenster auf-/zumachen, Wie lange dauert es?, an der Haltestelle / am Eingang anhalten, da vorn rauslassen), asking fare (Wie viel kostet das? Das macht 15,50 Euro), paying with card (mit der Karte zahlen), requesting receipts (Quittung), and German tipping formulas (Stimmt so! / Rest ist für Sie! / Das passt!)!";
    }
    if (currentLesson === 56) {
      return "Master German Adverbs of Time (Zeitadverbien)! Discover the 3 core time questions (Wann?, Wie lange?, Wie oft?), habitual weekdays & times of day with the lowercase -s rule (montags, freitags, morgens, abends, nachts), the 3-era timelines (Vergangenheit: vorgestern, gestern, früher, damals; Gegenwart: heute, jetzt, gerade, sofort, heutzutage; Zukunft: morgen, übermorgen, bald, später), chronological sequencing (vorher, zuerst ➔ dann ➔ danach ➔ später), duration (schon immer, lange), the 100% to 0% frequency ladder (immer, meistens, oft, manchmal, selten, nie), and the Golden Verb in Position 2 sentence rule (Jetzt muss ich gehen)!";
    }
    return "Master speaking on the telephone in German (Am Telefon sprechen)! Learn answering & identifying yourself (sich melden: Hier ist Anna! / Müller GmbH, Sie sprechen mit Sarah Schmidt), asking for people (Kann ich bitte mit Herrn Schmitz sprechen? / Könnten Sie mich verbinden?), handling unreachability (Er spricht gerade auf der anderen Leitung / ist in einer Besprechung / auf Geschäftsreise), taking & leaving messages (etwas ausrichten: Er soll mich zurückrufen / Ich bin krank / Ich werde es ausrichten), the 'I Didn't Catch That' clarification toolkit (Entschuldigung, wie bitte? / langsamer sprechen / buchstabieren), and the Golden German Phone Rule (Auf Wiederhören vs. Auf Wiedersehen)!";
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

        {/* Lesson 35 Specific Modules */}
        {currentLesson === 35 && activeTab === 'studio35' && (
          <Lesson35DativPronounStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 35 && activeTab === 'game35' && (
          <Lesson35Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 36 Specific Modules */}
        {currentLesson === 36 && activeTab === 'studio36' && (
          <Lesson36SeparableVerbsStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 36 && activeTab === 'game36' && (
          <Lesson36Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 37 Specific Modules */}
        {currentLesson === 37 && activeTab === 'studio37' && (
          <Lesson37DailyRoutineStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 37 && activeTab === 'game37' && (
          <Lesson37Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 38 Specific Modules */}
        {currentLesson === 38 && activeTab === 'studio38' && (
          <Lesson38ImperativStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 38 && activeTab === 'game38' && (
          <Lesson38Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 39 Specific Modules */}
        {currentLesson === 39 && activeTab === 'studio39' && (
          <Lesson39DirectionsStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 39 && activeTab === 'game39' && (
          <Lesson39Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 40 Specific Modules */}
        {currentLesson === 40 && activeTab === 'studio40' && (
          <Lesson40WarHatteStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 40 && activeTab === 'game40' && (
          <Lesson40Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 41 Specific Modules */}
        {currentLesson === 41 && activeTab === 'studio41' && (
          <Lesson41InseparableStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 41 && activeTab === 'game41' && (
          <Lesson41Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 42 Specific Modules */}
        {currentLesson === 42 && activeTab === 'studio42' && (
          <Lesson42HealthStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 42 && activeTab === 'game42' && (
          <Lesson42Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 43 Specific Modules */}
        {currentLesson === 43 && activeTab === 'studio43' && (
          <Lesson43PerfektStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 43 && activeTab === 'game43' && (
          <Lesson43Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 44 Specific Modules */}
        {currentLesson === 44 && activeTab === 'studio44' && (
          <Lesson44HabenSeinStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 44 && activeTab === 'game44' && (
          <Lesson44Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 45 Specific Modules */}
        {currentLesson === 45 && activeTab === 'studio45' && (
          <Lesson45PartizipStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 45 && activeTab === 'game45' && (
          <Lesson45Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 46 Specific Modules */}
        {currentLesson === 46 && activeTab === 'studio46' && (
          <Lesson46UrlaubStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 46 && activeTab === 'game46' && (
          <Lesson46Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 47 Specific Modules */}
        {currentLesson === 47 && activeTab === 'studio47' && (
          <Lesson47SupermarktStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 47 && activeTab === 'game47' && (
          <Lesson47Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 48 Specific Modules */}
        {currentLesson === 48 && activeTab === 'studio48' && (
          <Lesson48WetterStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 48 && activeTab === 'game48' && (
          <Lesson48Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 49 Specific Modules */}
        {currentLesson === 49 && activeTab === 'studio49' && (
          <Lesson49VerabredungStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 49 && activeTab === 'game49' && (
          <Lesson49Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 50 Specific Modules */}
        {currentLesson === 50 && activeTab === 'studio50' && (
          <Lesson50EinladungStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 50 && activeTab === 'game50' && (
          <Lesson50Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 51 Specific Modules */}
        {currentLesson === 51 && activeTab === 'studio51' && (
          <Lesson51FashionOpinionStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 51 && activeTab === 'game51' && (
          <Lesson51Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 52 Specific Modules */}
        {currentLesson === 52 && activeTab === 'studio52' && (
          <Lesson52WelchStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 52 && activeTab === 'game52' && (
          <Lesson52Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 53 Specific Modules */}
        {currentLesson === 53 && activeTab === 'studio53' && (
          <Lesson53DiesStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 53 && activeTab === 'game53' && (
          <Lesson53Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 54 Specific Modules */}
        {currentLesson === 54 && activeTab === 'studio54' && (
          <Lesson54KaufhausStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 54 && activeTab === 'game54' && (
          <Lesson54Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 55 Specific Modules */}
        {currentLesson === 55 && activeTab === 'studio55' && (
          <Lesson55TaxiStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 55 && activeTab === 'game55' && (
          <Lesson55Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 56 Specific Modules */}
        {currentLesson === 56 && activeTab === 'studio56' && (
          <Lesson56ZeitadverbienStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 56 && activeTab === 'game56' && (
          <Lesson56Game isSlowMode={isSlowMode} />
        )}

        {/* Lesson 57 Specific Modules */}
        {currentLesson === 57 && activeTab === 'studio57' && (
          <Lesson57TelefonStudio isSlowMode={isSlowMode} />
        )}

        {currentLesson === 57 && activeTab === 'game57' && (
          <Lesson57Game isSlowMode={isSlowMode} />
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
