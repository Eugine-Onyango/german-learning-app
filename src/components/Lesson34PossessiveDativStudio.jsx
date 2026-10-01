import React, { useState } from 'react';
import { 
  Volume2, Sparkles, Heart, Gift, Users, ArrowRight, Zap, RefreshCw, 
  HelpCircle, CheckCircle2, ChevronRight, Hash, Star, User, ShoppingBag, 
  Layers, Coffee, BookOpen, ShieldCheck, Flame, Play, Info
} from 'lucide-react';
import { LESSON_34_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson34PossessiveDativStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('stories'); // 'stories' | 'matrix' | 'lab'

  // TAB 1: 4 Character Story Journeys State
  const [selectedCharId, setSelectedCharId] = useState('petra');
  const [selectedMemberIdx, setSelectedMemberIdx] = useState(0);

  const characterStories = [
    {
      id: 'petra',
      name: 'Petra',
      pronoun: 'ich (I)',
      possessiveStem: 'mein- (my)',
      verb: 'gebe (give)',
      giftGerman: 'einen Kuss',
      giftEnglish: 'a kiss',
      giftIcon: '💋',
      themeColor: 'from-pink-500 to-rose-600',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
      introGerman: 'Hi! Ich bin Petra.',
      introEnglish: 'Hi! I am Petra.',
      members: [
        {
          role: 'der Mann (husband)',
          gender: 'Maskulin',
          ending: '-em',
          possessive: 'meinem',
          fullSentence: 'Das ist mein Mann. Ich gebe meinem Mann einen Kuss.',
          sentenceEn: 'This is my husband. I give a kiss to my husband.',
          nounDativ: 'meinem Mann',
          icon: '🧔‍♂️'
        },
        {
          role: 'die Tochter (daughter)',
          gender: 'Feminin',
          ending: '-er',
          possessive: 'meiner',
          fullSentence: 'Das ist meine Tochter. Ich gebe meiner Tochter einen Kuss.',
          sentenceEn: 'This is my daughter. I give a kiss to my daughter.',
          nounDativ: 'meiner Tochter',
          icon: '👧'
        },
        {
          role: 'das Baby (baby)',
          gender: 'Neutral',
          ending: '-em',
          possessive: 'meinem',
          fullSentence: 'Das ist mein Baby. Ich gebe meinem Baby einen Kuss.',
          sentenceEn: 'This is my baby. I give a kiss to my baby.',
          nounDativ: 'meinem Baby',
          icon: '👶'
        },
        {
          role: 'die Kinder (children)',
          gender: 'Plural (+n)',
          ending: '-en + n',
          possessive: 'meinen',
          fullSentence: 'Das sind meine Kinder. Ich gebe meinen Kindern einen Kuss.',
          sentenceEn: 'These are my children. I give a kiss to my children.',
          nounDativ: 'meinen Kindern',
          icon: '👨‍👧‍👦'
        }
      ]
    },
    {
      id: 'martin',
      name: 'Martin',
      pronoun: 'er (he)',
      possessiveStem: 'sein- (his)',
      verb: 'kauft (buys)',
      giftGerman: 'eine Schokolade',
      giftEnglish: 'a chocolate',
      giftIcon: '🍫',
      themeColor: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      introGerman: 'Das ist Martin.',
      introEnglish: 'This is Martin.',
      members: [
        {
          role: 'der Bruder (brother)',
          gender: 'Maskulin',
          ending: '-em',
          possessive: 'seinem',
          fullSentence: 'Das ist sein Bruder. Er kauft seinem Bruder eine Schokolade.',
          sentenceEn: 'This is his brother. He buys a chocolate for his brother.',
          nounDativ: 'seinem Bruder',
          icon: '👱‍♂️'
        },
        {
          role: 'die Frau (wife)',
          gender: 'Feminin',
          ending: '-er',
          possessive: 'seiner',
          fullSentence: 'Das ist seine Frau. Er kauft seiner Frau eine Schokolade.',
          sentenceEn: 'This is his wife. He buys a chocolate for his wife.',
          nounDativ: 'seiner Frau',
          icon: '👩'
        },
        {
          role: 'das Kind (child)',
          gender: 'Neutral',
          ending: '-em',
          possessive: 'seinem',
          fullSentence: 'Das ist sein Kind. Er kauft seinem Kind eine Schokolade.',
          sentenceEn: 'This is his child. He buys a chocolate for his child.',
          nounDativ: 'seinem Kind',
          icon: '👦'
        },
        {
          role: 'die Freunde (friends)',
          gender: 'Plural (+n)',
          ending: '-en + n',
          possessive: 'seinen',
          fullSentence: 'Das sind seine Freunde. Er kauft seinen Freunden Schokoladen.',
          sentenceEn: 'These are his friends. He buys chocolates for his friends.',
          nounDativ: 'seinen Freunden',
          icon: '🕺💃'
        }
      ]
    },
    {
      id: 'maria',
      name: 'Maria',
      pronoun: 'sie (she)',
      possessiveStem: 'ihr- (her)',
      verb: 'bringt (brings)',
      giftGerman: 'das Essen',
      giftEnglish: 'the food / meal',
      giftIcon: '🍲',
      themeColor: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      introGerman: 'Das ist Maria.',
      introEnglish: 'This is Maria.',
      members: [
        {
          role: 'der Freund (boyfriend)',
          gender: 'Maskulin',
          ending: '-em',
          possessive: 'ihrem',
          fullSentence: 'Das ist ihr Freund. Sie bringt ihrem Freund das Essen.',
          sentenceEn: 'This is her boyfriend. She brings food for her boyfriend.',
          nounDativ: 'ihrem Freund',
          icon: '👱‍♂️'
        },
        {
          role: 'die Schwester (sister)',
          gender: 'Feminin',
          ending: '-er',
          possessive: 'ihrer',
          fullSentence: 'Das ist ihre Schwester. Sie bringt ihrer Schwester das Essen.',
          sentenceEn: 'This is her sister. She brings food for her sister.',
          nounDativ: 'ihrer Schwester',
          icon: '👱‍♀️'
        },
        {
          role: 'das Kind (child)',
          gender: 'Neutral',
          ending: '-em',
          possessive: 'ihrem',
          fullSentence: 'Das ist ihr Kind. Sie bringt ihrem Kind das Essen.',
          sentenceEn: 'This is her child. She brings food for her child.',
          nounDativ: 'ihrem Kind',
          icon: '👧'
        },
        {
          role: 'die Nachbarn (neighbors)',
          gender: 'Plural (+n)',
          ending: '-en + n',
          possessive: 'ihren',
          fullSentence: 'Das sind ihre Nachbarn. Sie bringt ihren Nachbarn das Essen.',
          sentenceEn: 'These are her neighbors. She brings food for her neighbors.',
          nounDativ: 'ihren Nachbarn',
          icon: '🏡👥'
        }
      ]
    },
    {
      id: 'lukas-kathrin',
      name: 'Lukas & Kathrin',
      pronoun: 'wir (we)',
      possessiveStem: 'unser- (our)',
      verb: 'kaufen (buy)',
      giftGerman: 'ein Geschenk',
      giftEnglish: 'a gift / present',
      giftIcon: '🎁',
      themeColor: 'from-purple-500 to-indigo-600',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      introGerman: 'Wir sind Lukas und Kathrin.',
      introEnglish: 'We are Lucas and Catharine.',
      members: [
        {
          role: 'der Vater (father)',
          gender: 'Maskulin',
          ending: '-em',
          possessive: 'unserem',
          fullSentence: 'Das ist unser Vater. Wir kaufen unserem Vater ein Geschenk.',
          sentenceEn: 'This is our father. We buy a gift for our father.',
          nounDativ: 'unserem Vater',
          icon: '👨‍💼'
        },
        {
          role: 'die Mutter (mother)',
          gender: 'Feminin',
          ending: '-er',
          possessive: 'unserer',
          fullSentence: 'Das ist unsere Mutter. Wir kaufen unserer Mutter ein Geschenk.',
          sentenceEn: 'This is our mother. We buy a gift for our mother.',
          nounDativ: 'unserer Mutter',
          icon: '👩‍💼'
        },
        {
          role: 'die Großeltern (grandparents)',
          gender: 'Plural (+n)',
          ending: '-en + n',
          possessive: 'unseren',
          fullSentence: 'Das sind unsere Großeltern. Wir kaufen unseren Großeltern ein Geschenk.',
          sentenceEn: 'These are our grandparents. We buy a gift for our grandparents.',
          nounDativ: 'unseren Großeltern',
          icon: '👵👴'
        }
      ]
    }
  ];

  const currentChar = characterStories.find(c => c.id === selectedCharId) || characterStories[0];
  const safeMemberIdx = selectedMemberIdx < currentChar.members.length ? selectedMemberIdx : 0;
  const currentMember = currentChar.members[safeMemberIdx];

  // TAB 2: Master Matrix State (Slide 23)
  const [selectedMatrixRow, setSelectedMatrixRow] = useState('ich');

  const matrixData = [
    { pronoun: 'ich (I)', stem: 'mein-', mask: 'meinem', fem: 'meiner', neut: 'meinem', pl: 'meinen + n', example: 'Ich helfe meinem Vater, meiner Mutter und meinen Freunden.' },
    { pronoun: 'du (you)', stem: 'dein-', mask: 'deinem', fem: 'deiner', neut: 'deinem', pl: 'deinen + n', example: 'Bringst du deinem Vater ein Buch?' },
    { pronoun: 'er / es (he/it)', stem: 'sein-', mask: 'seinem', fem: 'seiner', neut: 'seinem', pl: 'seinen + n', example: 'Er kauft seinem Bruder und seiner Frau eine Schokolade.' },
    { pronoun: 'sie (she)', stem: 'ihr-', mask: 'ihrem', fem: 'ihrer', neut: 'ihrem', pl: 'ihren + n', example: 'Sie bringt ihrem Freund und ihrer Schwester das Essen.' },
    { pronoun: 'wir (we)', stem: 'unser-', mask: 'unserem', fem: 'unserer', neut: 'unserem', pl: 'unseren + n', example: 'Wir bringen unseren Eltern einen Wein.' },
    { pronoun: 'ihr (you all)', stem: 'euer-', mask: 'eurem', fem: 'eurer', neut: 'eurem', pl: 'euren + n', example: 'Helft ihr eurem Vater und eurer Mutter?' },
    { pronoun: 'Sie (formal)', stem: 'Ihr-', mask: 'Ihrem', fem: 'Ihrer', neut: 'Ihrem', pl: 'Ihren + n', example: 'Geben Sie Ihrem Chef und Ihrer Kollegin die Unterlagen?' },
    { pronoun: 'sie (they)', stem: 'ihr-', mask: 'ihrem', fem: 'ihrer', neut: 'ihrem', pl: 'ihren + n', example: 'Sie schenken ihrem Kind und ihren Nachbarn Blumen.' }
  ];

  const activeMatrixRowObj = matrixData.find(r => r.stem.startsWith(selectedMatrixRow)) || matrixData[0];

  // TAB 3: Interactive Lab / Sentence Generator State
  const [labSubject, setLabSubject] = useState({ german: 'Ich', en: 'I', verbEnding: 'e' });
  const [labVerb, setLabVerb] = useState({ stem: 'kauf', inf: 'kaufen', en: 'buy' });
  const [labPossessiveOwner, setLabPossessiveOwner] = useState({ stem: 'mein', en: 'my' });
  const [labReceiverGender, setLabReceiverGender] = useState({ gender: 'mask', noun: 'Vater', en: 'father', article: 'der' });
  const [labGift, setLabGift] = useState({ german: 'ein Buch', en: 'a book', gender: 'neut' });

  const getDativePossessiveEnding = (stem, gender) => {
    let base = stem;
    if (stem === 'euer') {
      if (gender === 'fem') return 'eurer';
      if (gender === 'pl') return 'euren';
      return 'eurem';
    }
    if (gender === 'fem') return `${stem}er`;
    if (gender === 'pl') return `${stem}en`;
    return `${stem}em`; // mask and neut
  };

  const generatedDativPossessive = getDativePossessiveEnding(labPossessiveOwner.stem, labReceiverGender.gender);
  const conjugatedVerb = labSubject.german === 'Ich' ? `${labVerb.stem}e`
    : labSubject.german === 'Du' ? `${labVerb.stem}st`
    : (labSubject.german === 'Er' || labSubject.german === 'Sie (she)') ? `${labVerb.stem}t`
    : labSubject.german === 'Wir' ? `${labVerb.stem}en`
    : labSubject.german === 'Ihr' ? `${labVerb.stem}t`
    : `${labVerb.stem}en`; // Sie (formal)

  const subjectWord = labSubject.german.split(' ')[0];
  const nounWithPluralN = (labReceiverGender.gender === 'pl' && !labReceiverGender.noun.endsWith('n') && !labReceiverGender.noun.endsWith('s'))
    ? `${labReceiverGender.noun}n`
    : labReceiverGender.noun;

  const generatedLabGerman = `${subjectWord} ${conjugatedVerb} ${generatedDativPossessive} ${nounWithPluralN} ${labGift.german}.`;
  const generatedLabEnglish = `${labSubject.en} ${labVerb.en} ${labGift.en} for ${labPossessiveOwner.en} ${labReceiverGender.en}.`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-rose-600 text-white p-6 md:p-8 rounded-3xl shadow-xl border-4 border-purple-300/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
              <Gift className="w-4 h-4 text-pink-200" />
              Lesson 34 Interactive Studio • Possessivartikel im Dativ
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">
              Possessive Articles in the Dative Case 🎁
            </h1>
            <p className="text-purple-100 text-xs md:text-sm max-w-2xl leading-relaxed">
              When giving gifts, buying food, or showing love to family and friends, the possessive words transform: 
              <strong>-em</strong> for Men & Neuter (*meinem Mann, meinem Baby*), 
              <strong>-er</strong> for Women (*meiner Tochter*), and 
              <strong>-en + n</strong> for Plural (*meinen Kindern*)!
            </p>
          </div>

          <button
            onClick={() => {
              playChime('click');
              speakGerman("Possessivartikel im Dativ. Ich gebe meinem Mann einen Kuss, meiner Tochter, meinem Baby, und meinen Kindern!", isSlowMode);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-white text-purple-800 rounded-2xl font-black text-sm shadow-lg hover:bg-purple-50 active:scale-95 transition shrink-0"
          >
            <Volume2 className="w-5 h-5 text-purple-600" />
            Hear Dativ Formula
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={() => { playChime('click'); setActiveTab('stories'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'stories'
                ? 'bg-white text-purple-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            👥 4 Character Story Journeys
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('matrix'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'matrix'
                ? 'bg-white text-purple-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            📊 Master Dativ Matrix (Slide 23)
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('lab'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'lab'
                ? 'bg-white text-purple-900 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            🧪 Sentence Generator & Chalkboard Lab
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 4 Character Story Journeys (Slides 2–22) */}
      {/* ========================================================================= */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          {/* Character Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {characterStories.map(char => {
              const isSelected = char.id === selectedCharId;
              return (
                <button
                  key={char.id}
                  onClick={() => {
                    playChime('click');
                    setSelectedCharId(char.id);
                    setSelectedMemberIdx(0);
                    speakGerman(`${char.introGerman} ${char.members[0].fullSentence}`, isSlowMode);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-purple-300 shadow-lg scale-105 ring-2 ring-purple-300'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border-stone-200 dark:border-stone-700 hover:border-purple-300 hover:bg-purple-50/40'
                  }`}
                >
                  <span className="text-3xl">{char.giftIcon}</span>
                  <div className="font-black text-sm md:text-base">{char.name}</div>
                  <div className={`text-[11px] font-bold ${isSelected ? 'text-purple-200' : 'text-stone-400'}`}>
                    {char.possessiveStem} ({char.giftGerman})
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Story Card */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-purple-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="text-4xl p-3 bg-purple-50 dark:bg-stone-700 rounded-2xl border border-purple-100 dark:border-stone-600">
                  {currentChar.giftIcon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">
                      {currentChar.name}'s Story • {currentChar.pronoun}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                    {currentChar.introGerman} <span className="text-stone-400 text-lg font-normal">({currentChar.introEnglish})</span>
                  </h2>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime('pop');
                  speakGerman(currentMember.fullSentence, isSlowMode);
                }}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-sm shadow-md hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition"
              >
                <Volume2 className="w-5 h-5" />
                Listen to Sentence
              </button>
            </div>

            {/* Recipient Family Member Selector */}
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Choose Recipient in Dativ (Who receives the {currentChar.giftEnglish}?):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentChar.members.map((m, idx) => {
                  const isMemberSelected = idx === safeMemberIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        playChime('click');
                        setSelectedMemberIdx(idx);
                        speakGerman(m.fullSentence, isSlowMode);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                        isMemberSelected
                          ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-400 ring-2 ring-purple-300 shadow-sm'
                          : 'bg-stone-50 dark:bg-stone-900/50 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <div className="overflow-hidden">
                        <div className="font-black text-xs md:text-sm text-stone-800 dark:text-stone-100 truncate">
                          {m.nounDativ}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">
                          {m.gender} ({m.ending})
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sentence Anatomy Breakdown Card (Slide 4 Replica!) */}
            <div className="p-6 bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-3xl shadow-lg space-y-4 border border-stone-700">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full text-xs font-black uppercase tracking-wider">
                  Slide 4 • Sentence Anatomy Breakdown
                </span>
                <span className="text-xs text-stone-400">German Sentence Engine</span>
              </div>

              {/* The German Sentence Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 text-center">
                {/* 1. Nominativ (Subject) */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/20 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-300">
                    1. Nominativ (Subject)
                  </div>
                  <div className="text-lg md:text-xl font-black text-white">
                    {currentChar.id === 'petra' ? 'Ich' : currentChar.id === 'martin' ? 'Er' : currentChar.id === 'maria' ? 'Sie' : 'Wir'}
                  </div>
                  <div className="text-[10px] text-stone-400">Who acts?</div>
                </div>

                {/* 2. Verb */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/20 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    2. Verb (Action)
                  </div>
                  <div className="text-lg md:text-xl font-black text-white">
                    {currentChar.verb}
                  </div>
                  <div className="text-[10px] text-stone-400">Position 2</div>
                </div>

                {/* 3. Dativ (Receiver) */}
                <div className="p-3 bg-purple-500/30 rounded-2xl border-2 border-purple-400 space-y-1 ring-2 ring-purple-400/50">
                  <div className="text-[10px] font-black uppercase tracking-wider text-pink-300">
                    3. Dativ (Receiver)
                  </div>
                  <div className="text-lg md:text-xl font-black text-yellow-300">
                    {currentMember.nounDativ}
                  </div>
                  <div className="text-[10px] text-purple-200">Who gets it? ({currentMember.ending})</div>
                </div>

                {/* 4. Akkusativ (Gift) */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/20 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    4. Akkusativ (Gift)
                  </div>
                  <div className="text-lg md:text-xl font-black text-emerald-300">
                    {currentChar.giftGerman}
                  </div>
                  <div className="text-[10px] text-stone-400">What is given?</div>
                </div>
              </div>

              {/* Full Spoken Sentence Banner */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-base md:text-lg font-bold text-white">
                    {currentMember.fullSentence}
                  </div>
                  <div className="text-xs text-stone-400 italic">
                    "{currentMember.sentenceEn}"
                  </div>
                </div>
                <button
                  onClick={() => speakGerman(currentMember.fullSentence, isSlowMode)}
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shrink-0 transition"
                  title="Hear Sentence"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Visual Gender Ending Card */}
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
                <div className="text-xs md:text-sm text-purple-950 dark:text-purple-200 font-medium">
                  <strong>Gender Rule:</strong> {currentMember.gender} in Dativ takes <strong>{currentMember.ending}</strong> ➔ 
                  <span className="font-bold text-purple-700 dark:text-purple-300 ml-1">{currentMember.nounDativ}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: Master Dativ Matrix (Slide 23 Replica) */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-purple-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full text-xs font-black uppercase">
                <Layers className="w-3.5 h-3.5" />
                Slide 23 • At a Glance Master Chart
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
                The Complete Possessive Dativ Matrix
              </h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
                Notice the universal endings across all 8 pronouns: <strong>MASK. (-em)</strong>, <strong>FEM. (-er)</strong>, <strong>NEUT. (-em)</strong>, and <strong>PL. (-en + n)</strong>!
              </p>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-2xl border-2 border-stone-200 dark:border-stone-700">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-900 text-white font-black">
                    <th className="p-3 md:p-4">Pronoun</th>
                    <th className="p-3 md:p-4 text-blue-300">MASK. (-em)</th>
                    <th className="p-3 md:p-4 text-pink-300">FEM. (-er)</th>
                    <th className="p-3 md:p-4 text-amber-300">NEUT. (-em)</th>
                    <th className="p-3 md:p-4 text-emerald-300">PL. (-en + n)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                  {matrixData.map((row, idx) => {
                    const isSelected = selectedMatrixRow === row.stem.replace('-', '');
                    return (
                      <tr 
                        key={idx}
                        onClick={() => {
                          playChime('click');
                          setSelectedMatrixRow(row.stem.replace('-', ''));
                          speakGerman(`${row.mask}, ${row.fem}, ${row.neut}, ${row.pl}. ${row.example}`, isSlowMode);
                        }}
                        className={`transition cursor-pointer ${
                          isSelected 
                            ? 'bg-purple-100 dark:bg-purple-950/60 font-bold' 
                            : 'hover:bg-stone-50 dark:hover:bg-stone-700/50'
                        }`}
                      >
                        <td className="p-3 md:p-4 font-black text-stone-900 dark:text-white">
                          {row.pronoun}
                        </td>
                        <td className="p-3 md:p-4 text-blue-700 dark:text-blue-300 font-bold">
                          {row.mask}
                        </td>
                        <td className="p-3 md:p-4 text-pink-700 dark:text-pink-300 font-bold">
                          {row.fem}
                        </td>
                        <td className="p-3 md:p-4 text-amber-700 dark:text-amber-300 font-bold">
                          {row.neut}
                        </td>
                        <td className="p-3 md:p-4 text-emerald-700 dark:text-emerald-300 font-bold">
                          {row.pl}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Active Matrix Row Sentence Spotlight */}
            <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 rounded-2xl border-2 border-purple-300 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">
                  Selected Pronoun: {activeMatrixRowObj.pronoun}
                </div>
                <div className="text-base md:text-lg font-black text-stone-900 dark:text-white">
                  {activeMatrixRowObj.example}
                </div>
              </div>
              <button
                onClick={() => {
                  playChime('pop');
                  speakGerman(activeMatrixRowObj.example, isSlowMode);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-black text-xs shadow-md shrink-0 transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                Hear Sentence
              </button>
            </div>

            {/* Special Callout 1: euer spelling trick */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-start gap-3">
              <span className="text-2xl">🪄</span>
              <div className="text-xs md:text-sm text-stone-800 dark:text-stone-200">
                <strong>The "euer" Spelling Secret:</strong> When adding endings to <em>euer</em>, the inner "e" drops out: 
                <span className="font-bold text-amber-800 dark:text-amber-300 ml-1">eurem (Masc/Neut)</span>, 
                <span className="font-bold text-amber-800 dark:text-amber-300 ml-1">eurer (Fem)</span>, and 
                <span className="font-bold text-amber-800 dark:text-amber-300 ml-1">euren (Plural)</span>!
              </div>
            </div>

            {/* Special Callout 2: Plural + n */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <span className="text-2xl">👥</span>
              <div className="text-xs md:text-sm text-stone-800 dark:text-stone-200">
                <strong>The Double "n" Plural Rule:</strong> In Dativ Plural, the possessive gets <em>-en</em> (meinen, seinen, unseren) AND the noun gets an extra <em>-n</em> at the end: 
                <span className="font-bold text-emerald-800 dark:text-emerald-300 ml-1">Kinder ➔ Kindern</span>, 
                <span className="font-bold text-emerald-800 dark:text-emerald-300 ml-1">Freunde ➔ Freunden</span>, 
                <span className="font-bold text-emerald-800 dark:text-emerald-300 ml-1">Eltern (already has n)</span>!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: Sentence Generator & Chalkboard Lab (Slides 24–28) */}
      {/* ========================================================================= */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 md:p-8 border-2 border-purple-200 dark:border-stone-700 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 rounded-full text-xs font-black uppercase">
                <Zap className="w-3.5 h-3.5" />
                Slides 24–28 • Interactive Sentence Builder
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
                Build & Hear Any Dative Possessive Sentence!
              </h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
                Pick your Subject, Verb, Possessive Owner, Recipient Family Member, and Gift to watch the grammar snap into place!
              </p>
            </div>

            {/* Builder Selectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Subject */}
              <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  1. Subject (Nominativ)
                </label>
                <select
                  value={labSubject.german}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Ich') setLabSubject({ german: 'Ich', en: 'I', verbEnding: 'e' });
                    if (val === 'Du') setLabSubject({ german: 'Du', en: 'You', verbEnding: 'st' });
                    if (val === 'Er') setLabSubject({ german: 'Er', en: 'He', verbEnding: 't' });
                    if (val === 'Sie (she)') setLabSubject({ german: 'Sie (she)', en: 'She', verbEnding: 't' });
                    if (val === 'Wir') setLabSubject({ german: 'Wir', en: 'We', verbEnding: 'en' });
                    if (val === 'Ihr') setLabSubject({ german: 'Ihr', en: 'You all', verbEnding: 't' });
                    playChime('click');
                  }}
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border rounded-xl text-sm font-bold"
                >
                  <option value="Ich">Ich (I)</option>
                  <option value="Du">Du (You)</option>
                  <option value="Er">Er (He)</option>
                  <option value="Sie (she)">Sie (She)</option>
                  <option value="Wir">Wir (We)</option>
                  <option value="Ihr">Ihr (You all)</option>
                </select>
              </div>

              {/* 2. Verb */}
              <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  2. Verb (Action)
                </label>
                <select
                  value={labVerb.inf}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'kaufen') setLabVerb({ stem: 'kauf', inf: 'kaufen', en: 'buy' });
                    if (val === 'bringen') setLabVerb({ stem: 'bring', inf: 'bringen', en: 'bring' });
                    if (val === 'geben') setLabVerb({ stem: 'geb', inf: 'geben', en: 'give' });
                    if (val === 'schenken') setLabVerb({ stem: 'schenk', inf: 'schenken', en: 'gift' });
                    playChime('click');
                  }}
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border rounded-xl text-sm font-bold"
                >
                  <option value="kaufen">kaufen (to buy for)</option>
                  <option value="bringen">bringen (to bring to)</option>
                  <option value="geben">geben (to give to)</option>
                  <option value="schenken">schenken (to gift to)</option>
                </select>
              </div>

              {/* 3. Possessive Owner */}
              <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  3. Whose? (Owner)
                </label>
                <select
                  value={labPossessiveOwner.stem}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'mein') setLabPossessiveOwner({ stem: 'mein', en: 'my' });
                    if (val === 'dein') setLabPossessiveOwner({ stem: 'dein', en: 'your' });
                    if (val === 'sein') setLabPossessiveOwner({ stem: 'sein', en: 'his' });
                    if (val === 'ihr') setLabPossessiveOwner({ stem: 'ihr', en: 'her' });
                    if (val === 'unser') setLabPossessiveOwner({ stem: 'unser', en: 'our' });
                    if (val === 'euer') setLabPossessiveOwner({ stem: 'euer', en: 'y’all’s' });
                    playChime('click');
                  }}
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border rounded-xl text-sm font-bold"
                >
                  <option value="mein">mein- (my)</option>
                  <option value="dein">dein- (your)</option>
                  <option value="sein">sein- (his)</option>
                  <option value="ihr">ihr- (her)</option>
                  <option value="unser">unser- (our)</option>
                  <option value="euer">euer- (your/y'all)</option>
                </select>
              </div>

              {/* 4. Recipient Noun */}
              <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-pink-600 dark:text-pink-400">
                  4. Recipient (Gender)
                </label>
                <select
                  value={labReceiverGender.noun}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Vater') setLabReceiverGender({ gender: 'mask', noun: 'Vater', en: 'father', article: 'der' });
                    if (val === 'Mutter') setLabReceiverGender({ gender: 'fem', noun: 'Mutter', en: 'mother', article: 'die' });
                    if (val === 'Freundin') setLabReceiverGender({ gender: 'fem', noun: 'Freundin', en: 'girlfriend', article: 'die' });
                    if (val === 'Kind') setLabReceiverGender({ gender: 'neut', noun: 'Kind', en: 'child', article: 'das' });
                    if (val === 'Baby') setLabReceiverGender({ gender: 'neut', noun: 'Baby', en: 'baby', article: 'das' });
                    if (val === 'Eltern') setLabReceiverGender({ gender: 'pl', noun: 'Eltern', en: 'parents', article: 'die' });
                    if (val === 'Freunde') setLabReceiverGender({ gender: 'pl', noun: 'Freunde', en: 'friends', article: 'die' });
                    playChime('click');
                  }}
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border rounded-xl text-sm font-bold"
                >
                  <option value="Vater">der Vater (Masc ➔ -em)</option>
                  <option value="Mutter">die Mutter (Fem ➔ -er)</option>
                  <option value="Freundin">die Freundin (Fem ➔ -er)</option>
                  <option value="Kind">das Kind (Neut ➔ -em)</option>
                  <option value="Baby">das Baby (Neut ➔ -em)</option>
                  <option value="Eltern">die Eltern (Plural ➔ -en)</option>
                  <option value="Freunde">die Freunde (Plural ➔ -en + n)</option>
                </select>
              </div>
            </div>

            {/* Gift Selector */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-stone-500">Pick Accusative Gift:</span>
              {[
                { german: 'einen Kuss', en: 'a kiss', icon: '💋' },
                { german: 'eine Schokolade', en: 'a chocolate', icon: '🍫' },
                { german: 'das Essen', en: 'the food', icon: '🍲' },
                { german: 'ein Geschenk', en: 'a gift', icon: '🎁' },
                { german: 'einen Wein', en: 'a wine', icon: '🍷' },
                { german: 'einen Ring', en: 'a ring', icon: '💍' },
                { german: 'ein Buch', en: 'a book', icon: '📖' }
              ].map((g, idx) => {
                const isSelected = labGift.german === g.german;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      playChime('click');
                      setLabGift(g);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span>{g.german}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Generated Sentence Display */}
            <div className="p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-stone-900 text-white rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                  Live Generated Sentence (Satz)
                </span>
                <span className="text-xs text-yellow-300 font-bold">
                  Dative Ending: {labReceiverGender.gender === 'fem' ? '-er' : labReceiverGender.gender === 'pl' ? '-en (+n)' : '-em'}
                </span>
              </div>

              <div className="text-xl md:text-2xl font-black text-white leading-relaxed">
                {generatedLabGerman}
              </div>

              <div className="text-xs md:text-sm text-stone-300 italic">
                "{generatedLabEnglish}"
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="text-xs text-stone-400">
                  {labReceiverGender.article} {labReceiverGender.noun} ({labReceiverGender.gender}) ➔ 
                  <span className="text-yellow-300 font-bold ml-1">{generatedDativPossessive} {nounWithPluralN}</span>
                </div>

                <button
                  onClick={() => {
                    playChime('pop');
                    speakGerman(generatedLabGerman, isSlowMode);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-black text-xs shadow-md hover:from-purple-600 hover:to-pink-600 active:scale-95 transition"
                >
                  <Volume2 className="w-4 h-4" />
                  Hear Sentence
                </button>
              </div>
            </div>

            {/* Preset Chalkboard Exercises (Slides 25, 27, 28) */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-black uppercase tracking-wider text-stone-400">
                Quick Test Slides (Slides 25–28):
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    playChime('click');
                    setLabSubject({ german: 'Wir', en: 'We', verbEnding: 'en' });
                    setLabVerb({ stem: 'bring', inf: 'bringen', en: 'bring' });
                    setLabPossessiveOwner({ stem: 'unser', en: 'our' });
                    setLabReceiverGender({ gender: 'pl', noun: 'Eltern', en: 'parents', article: 'die' });
                    setLabGift({ german: 'einen Wein', en: 'a wine', gender: 'mask' });
                    speakGerman("Wir bringen unseren Eltern einen Wein.", isSlowMode);
                  }}
                  className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 text-left hover:border-purple-300 transition"
                >
                  <div className="text-xs font-bold text-purple-600">Slide 25–26</div>
                  <div className="font-black text-sm">Wir bringen unseren Eltern einen Wein.</div>
                  <div className="text-[11px] text-stone-500">unseren (Plural)</div>
                </button>

                <button
                  onClick={() => {
                    playChime('click');
                    setLabSubject({ german: 'Ich', en: 'I', verbEnding: 'e' });
                    setLabVerb({ stem: 'kauf', inf: 'kaufen', en: 'buy' });
                    setLabPossessiveOwner({ stem: 'mein', en: 'my' });
                    setLabReceiverGender({ gender: 'fem', noun: 'Freundin', en: 'girlfriend', article: 'die' });
                    setLabGift({ german: 'einen Ring', en: 'a ring', gender: 'mask' });
                    speakGerman("Ich kaufe meiner Freundin einen Ring.", isSlowMode);
                  }}
                  className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 text-left hover:border-purple-300 transition"
                >
                  <div className="text-xs font-bold text-purple-600">Slide 27</div>
                  <div className="font-black text-sm">Ich kaufe meiner Freundin einen Ring.</div>
                  <div className="text-[11px] text-stone-500">meiner (Feminin)</div>
                </button>

                <button
                  onClick={() => {
                    playChime('click');
                    setLabSubject({ german: 'Du', en: 'You', verbEnding: 'st' });
                    setLabVerb({ stem: 'bring', inf: 'bringen', en: 'bring' });
                    setLabPossessiveOwner({ stem: 'dein', en: 'your' });
                    setLabReceiverGender({ gender: 'mask', noun: 'Vater', en: 'father', article: 'der' });
                    setLabGift({ german: 'ein Buch', en: 'a book', gender: 'neut' });
                    speakGerman("Bringst du deinem Vater ein Buch?", isSlowMode);
                  }}
                  className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-700 text-left hover:border-purple-300 transition"
                >
                  <div className="text-xs font-bold text-purple-600">Slide 28</div>
                  <div className="font-black text-sm">Bringst du deinem Vater ein Buch?</div>
                  <div className="text-[11px] text-stone-500">deinem (Maskulin)</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
