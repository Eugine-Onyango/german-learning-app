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
import {
  LESSON_1_ITEMS,
  LESSON_2_ITEMS,
  LESSON_3_ITEMS,
  LESSON_4_ITEMS,
  LESSON_5_ITEMS,
  LESSON_6_ITEMS,
  LESSON_7_ITEMS
} from './data/germanLessons';

export default function App() {
  const [currentLesson, setCurrentLesson] = useState(7); // Default to Lesson 7 as requested, easy switch to 1-6
  const [activeTab, setActiveTab] = useState('cards');
  const [isSlowMode, setIsSlowMode] = useState(false);

  let activeItems = LESSON_1_ITEMS;
  if (currentLesson === 2) activeItems = LESSON_2_ITEMS;
  if (currentLesson === 3) activeItems = LESSON_3_ITEMS;
  if (currentLesson === 4) activeItems = LESSON_4_ITEMS;
  if (currentLesson === 5) activeItems = LESSON_5_ITEMS;
  if (currentLesson === 6) activeItems = LESSON_6_ITEMS;
  if (currentLesson === 7) activeItems = LESSON_7_ITEMS;

  const getLessonTitle = () => {
    if (currentLesson === 1) return "Lesson 1: Begrüßungen (Greetings)";
    if (currentLesson === 2) return "Lesson 2: Häufige Redemittel (Common Everyday Phrases)";
    if (currentLesson === 3) return "Lesson 3: Zahlen 0 - 20 & Meine Handynummer (Numbers & Mobile)";
    if (currentLesson === 4) return "Lesson 4: Zahlen 21 - 100 & The Backwards Rule (Numbers 21 to 100)";
    if (currentLesson === 5) return "Lesson 5: Das Alphabet (A bis Z) - The 30 German Characters & Sounds";
    if (currentLesson === 6) return "Lesson 6: Sich vorstellen (Introducing Yourself) - Name, Origin, Job & Family";
    return "Lesson 7: Jemanden kennenlernen (Getting to Know Someone) - Formal 'Sie' vs. Casual 'du'";
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
    return "Asking questions and getting to know someone! Discover the golden rule of German respect: formal 'Sie' (strangers, elders, officials, verb ends in -en) vs. friendly 'du' (friends, family, kids, verb ends in -st), plus 'Ihr' vs. 'dein'!";
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
