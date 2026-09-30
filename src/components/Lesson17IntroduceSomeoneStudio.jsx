import React, { useState } from 'react';
import { Volume2, Sparkles, User, Users, Baby, HelpCircle, CheckCircle2, ChevronRight, Briefcase, MapPin, Globe, Heart, Building2 } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson17IntroduceSomeoneStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('profiles'); // 'profiles', 'questions', 'spotlight'
  const [selectedProfileId, setSelectedProfileId] = useState('peter');
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);

  const PROFILES = [
    {
      id: 'peter',
      name: 'Peter',
      type: 'Male (er)',
      pronoun: 'er',
      possessive: 'seine',
      avatar: '👨',
      badge: 'Slide 4 & 5',
      flag: '🇪🇸',
      leadSentence: 'Das ist Peter.',
      origin: 'Er kommt aus Spanien.',
      city: 'Er wohnt in Frankfurt.',
      age: 'Er ist 30 Jahre alt.',
      learning: 'Er lernt Deutsch.',
      company: 'Er arbeitet bei Siemens.',
      job: 'Er ist Analyst.',
      languages: 'Er spricht Spanisch und Englisch.',
      hobbies: 'Seine Hobbys sind Musik hören und Lesen.',
      highlight: "Notice: 'seine Hobbys' (his hobbies) and 'bei Siemens' (working at a company)!"
    },
    {
      id: 'martina',
      name: 'Martina',
      type: 'Female (sie)',
      pronoun: 'sie',
      possessive: 'ihre',
      avatar: '👩',
      badge: 'Slide 6 & 7',
      flag: '🇨🇭',
      leadSentence: 'Das ist Martina.',
      origin: 'Sie kommt aus der Schweiz.',
      city: 'Sie wohnt in Leipzig.',
      age: 'Sie ist 28 Jahre alt.',
      learning: 'Sie lernt Französisch.',
      company: 'Sie arbeitet bei Lufthansa.',
      job: 'Sie ist Flugbegleiterin.',
      languages: 'Sie spricht Deutsch und Englisch.',
      hobbies: 'Ihre Hobbys sind Tanzen und Reisen.',
      highlight: "Notice: 'aus DER Schweiz' (Switzerland takes 'der'), job has '-in' (Flugbegleiterin), and 'ihre Hobbys'!"
    },
    {
      id: 'baby',
      name: 'Das Kind (Baby)',
      type: 'Child / Neuter (es)',
      pronoun: 'es',
      possessive: 'seine',
      avatar: '👶',
      badge: 'Slide 8 & 9',
      flag: '🇩🇪',
      leadSentence: 'Das ist ein Kind.',
      origin: 'Es kommt aus Deutschland.',
      city: 'Es wohnt in Berlin.',
      age: 'Es ist 1 Jahr alt.',
      learning: 'Es lernt die Welt kennen.',
      company: 'Keine Arbeit (Baby!)',
      job: 'Baby sein',
      languages: 'Es gluckst und lacht.',
      hobbies: 'Es trinkt Milch.',
      highlight: "Notice: 'das Kind' takes pronoun 'es' (it), and 1 year is singular '1 Jahr alt' (not Jahre)!"
    },
    {
      id: 'couple',
      name: 'Laura und Antonio',
      type: 'Group / Couple (sie Plural)',
      pronoun: 'sie (Plural)',
      possessive: 'ihre',
      avatar: '👫',
      badge: 'Slide 10 & 11',
      flag: '🇮🇹',
      leadSentence: 'Das sind Laura und Antonio.',
      origin: 'Sie kommen aus Italien.',
      city: 'Sie wohnen in München.',
      age: 'Sie sind 30 Jahre alt.',
      learning: 'Sie lernen Deutsch.',
      company: 'Sie arbeiten bei BMW.',
      job: 'Sie sind Ingenieure.',
      languages: 'Sie sprechen Deutsch und Italienisch.',
      hobbies: 'Ihre Hobbys sind Karten spielen und Essen gehen.',
      highlight: "Notice: 'Das SIND...' (These are), verbs end in '-en' (sie kommen, sie wohnen), and job is plural 'Ingenieure'!"
    },
    {
      id: 'sofia',
      name: 'Sofia',
      type: 'Slide 1 Host (sie)',
      pronoun: 'sie',
      possessive: 'ihre',
      avatar: '👩‍💼',
      badge: 'Slide 1 Starter',
      flag: '🇸🇰',
      leadSentence: 'Das ist Sofia.',
      origin: 'Sie kommt aus Slowakei.',
      city: 'Sie wohnt in Berlin.',
      age: 'Erwachsen',
      learning: 'Sie spricht 3 Sprachen.',
      company: 'Im Management',
      job: 'Sie ist Managerin von Beruf.',
      languages: 'Sie spricht Deutsch, Englisch und Slowakisch.',
      hobbies: 'Reisen und Sprachen.',
      highlight: "Notice: 'von Beruf' means 'by profession' (Managerin von Beruf)!"
    }
  ];

  const currentProfile = PROFILES.find(p => p.id === selectedProfileId) || PROFILES[0];

  const QUESTIONS_LIST = [
    {
      qHe: 'Wer ist das?',
      qShe: 'Wer ist das?',
      qThey: 'Wer sind sie?',
      meaning: 'Who is this? / Who are they?',
      answerPeter: 'Das ist Peter.',
      answerMartina: 'Das ist Martina.',
      answerBaby: 'Das ist ein Kind.',
      answerCouple: 'Das sind Laura und Antonio.'
    },
    {
      qHe: 'Woher kommt er?',
      qShe: 'Woher kommt sie?',
      qThey: 'Woher kommen sie?',
      meaning: 'Where does he/she come from? / Where do they come from?',
      answerPeter: 'Er kommt aus Spanien.',
      answerMartina: 'Sie kommt aus der Schweiz.',
      answerBaby: 'Es kommt aus Deutschland.',
      answerCouple: 'Sie kommen aus Italien.'
    },
    {
      qHe: 'Wo wohnt er?',
      qShe: 'Wo wohnt sie?',
      qThey: 'Wo wohnen sie?',
      meaning: 'Where does he/she live? / Where do they live?',
      answerPeter: 'Er wohnt in Frankfurt.',
      answerMartina: 'Sie wohnt in Leipzig.',
      answerBaby: 'Es wohnt in Berlin.',
      answerCouple: 'Sie wohnen in München.'
    },
    {
      qHe: 'Wie alt ist er?',
      qShe: 'Wie alt ist sie?',
      qThey: 'Wie alt sind sie?',
      meaning: 'How old is he/she? / How old are they?',
      answerPeter: 'Er ist 30 Jahre alt.',
      answerMartina: 'Sie ist 28 Jahre alt.',
      answerBaby: 'Es ist 1 Jahr alt.',
      answerCouple: 'Sie sind 30 Jahre alt.'
    },
    {
      qHe: 'Wo arbeitet er?',
      qShe: 'Wo arbeitet sie?',
      qThey: 'Wo arbeiten sie?',
      meaning: 'Where does he/she work? / Where do they work?',
      answerPeter: 'Er arbeitet bei Siemens.',
      answerMartina: 'Sie arbeitet bei Lufthansa.',
      answerBaby: 'Es ist ein Baby (keine Arbeit).',
      answerCouple: 'Sie arbeiten bei BMW.'
    },
    {
      qHe: 'Was ist er von Beruf?',
      qShe: 'Was ist sie von Beruf?',
      qThey: 'Was sind sie von Beruf?',
      meaning: 'What is his/her profession? / What are they by profession?',
      answerPeter: 'Er ist Analyst.',
      answerMartina: 'Sie ist Flugbegleiterin.',
      answerBaby: 'Es ist ein Kind.',
      answerCouple: 'Sie sind Ingenieure.'
    },
    {
      qHe: 'Welche Sprachen spricht er?',
      qShe: 'Welche Sprachen spricht sie?',
      qThey: 'Welche Sprachen sprechen sie?',
      meaning: 'Which languages does he/she speak? / Which languages do they speak?',
      answerPeter: 'Er spricht Spanisch und Englisch.',
      answerMartina: 'Sie spricht Deutsch und Englisch.',
      answerBaby: 'Es lernt sprechen.',
      answerCouple: 'Sie sprechen Deutsch und Italienisch.'
    },
    {
      qHe: 'Was sind seine Hobbys?',
      qShe: 'Was sind ihre Hobbys?',
      qThey: 'Was sind ihre Hobbys?',
      meaning: 'What are his/her/their hobbies?',
      answerPeter: 'Seine Hobbys sind Musik hören und Lesen.',
      answerMartina: 'Ihre Hobbys sind Tanzen und Reisen.',
      answerBaby: 'Es trinkt Milch.',
      answerCouple: 'Ihre Hobbys sind Karten spielen und Essen gehen.'
    },
    {
      qHe: 'Was lernt er?',
      qShe: 'Was lernt sie?',
      qThey: 'Was lernen sie?',
      meaning: 'What is he/she learning? / What are they learning?',
      answerPeter: 'Er lernt Deutsch.',
      answerMartina: 'Sie lernt Französisch.',
      answerBaby: 'Es lernt laufen.',
      answerCouple: 'Sie lernen Deutsch.'
    }
  ];

  const currentQ = QUESTIONS_LIST[selectedQuestionIdx];

  const getActiveQuestionText = () => {
    if (currentProfile.id === 'peter') return currentQ.qHe;
    if (currentProfile.id === 'martina' || currentProfile.id === 'sofia') return currentQ.qShe;
    if (currentProfile.id === 'couple') return currentQ.qThey;
    return currentQ.qHe.replace('er', 'es');
  };

  const getActiveAnswerText = () => {
    if (currentProfile.id === 'peter') return currentQ.answerPeter;
    if (currentProfile.id === 'martina' || currentProfile.id === 'sofia') return currentQ.answerMartina;
    if (currentProfile.id === 'couple') return currentQ.answerCouple;
    return currentQ.answerBaby;
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
              Lesson 17 Studio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              jemanden vorstellen 👥
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl">
              Learn how to introduce any friend, colleague, child, or couple in German with the 9 core questions and natural speech!
            </p>
          </div>
          <button
            onClick={() => {
              playChime('click');
              speakGerman("jemanden vorstellen: Das ist Peter. Das ist Martina. Das ist ein Kind. Das sind Laura und Antonio.", isSlowMode);
            }}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2.5 rounded-2xl font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Volume2 className="w-5 h-5" />
            <span>Hear Overview</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-stone-200/80 p-1.5 rounded-2xl">
        <button
          onClick={() => { setActiveTab('profiles'); playChime('click'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'profiles'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <User className="w-4 h-4 text-emerald-600" />
          <span>1. Profile Showcase (Slide 5, 7, 9, 11)</span>
        </button>
        <button
          onClick={() => { setActiveTab('questions'); playChime('click'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'questions'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-indigo-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>2. The 9 Core Questions (W-Fragen)</span>
        </button>
        <button
          onClick={() => { setActiveTab('spotlight'); playChime('click'); }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'spotlight'
              ? 'bg-white text-stone-900 shadow-md ring-2 ring-amber-500'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>3. Golden Rules Spotlight</span>
        </button>
      </div>

      {/* TAB 1: Profile Showcase */}
      {activeTab === 'profiles' && (
        <div className="space-y-6">
          {/* Character Selector Pills */}
          <div className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-2">
            <span className="text-xs font-black text-stone-500 uppercase tracking-wider">Select Person to Introduce:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none flex-nowrap sm:flex-wrap">
              {PROFILES.map((p) => {
                const isSelected = selectedProfileId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProfileId(p.id);
                      playChime('click');
                      speakGerman(`${p.leadSentence} ${p.origin} ${p.city}`, isSlowMode);
                    }}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isSelected
                        ? 'bg-stone-900 text-amber-300 shadow-lg scale-102 ring-2 ring-amber-400'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                    }`}
                  >
                    <span className="text-lg">{p.avatar}</span>
                    <span>{p.name}</span>
                    <span className="text-[10px] opacity-80">({p.type})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-teal-300 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-stone-200 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center text-4xl shadow-inner border border-teal-300">
                  {currentProfile.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-stone-900">{currentProfile.name}</h3>
                    <span className="text-xl">{currentProfile.flag}</span>
                  </div>
                  <span className="inline-block bg-teal-100 text-teal-900 text-xs font-bold px-2.5 py-0.5 rounded-full mt-1">
                    {currentProfile.type} • {currentProfile.badge}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime('click');
                  const fullText = `${currentProfile.leadSentence} ${currentProfile.origin} ${currentProfile.city} ${currentProfile.age} ${currentProfile.job} ${currentProfile.company} ${currentProfile.languages} ${currentProfile.hobbies}`;
                  speakGerman(fullText, isSlowMode);
                }}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Full Profile</span>
              </button>
            </div>

            {/* Profile Grid Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Introduction */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.leadSentence, isSlowMode); }}
                className="bg-stone-50 hover:bg-amber-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Name Introduction</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-amber-800">{currentProfile.leadSentence}</p>
                <span className="text-xs text-stone-500 italic">Tap to listen 🔊</span>
              </div>

              {/* Origin */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.origin, isSlowMode); }}
                className="bg-stone-50 hover:bg-teal-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Origin (Woher?)</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-teal-800">{currentProfile.origin}</p>
                <span className="text-xs text-stone-500 italic">Tap to listen 🔊</span>
              </div>

              {/* City */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.city, isSlowMode); }}
                className="bg-stone-50 hover:bg-sky-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Residence (Wo?)</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-sky-800">{currentProfile.city}</p>
                <span className="text-xs text-stone-500 italic">Tap to listen 🔊</span>
              </div>

              {/* Age */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.age, isSlowMode); }}
                className="bg-stone-50 hover:bg-rose-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Age (Wie alt?)</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-rose-800">{currentProfile.age}</p>
                <span className="text-xs text-stone-500 italic">Tap to listen 🔊</span>
              </div>

              {/* Profession */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.job, isSlowMode); }}
                className="bg-stone-50 hover:bg-purple-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Job (Was von Beruf?)</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-purple-800">{currentProfile.job}</p>
                <span className="text-xs text-stone-500 italic">Tap to listen 🔊</span>
              </div>

              {/* Company */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.company, isSlowMode); }}
                className="bg-stone-50 hover:bg-indigo-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Company (Wo arbeitet...?)</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-indigo-800">{currentProfile.company}</p>
                <span className="text-xs text-stone-500 italic">Preposition: bei [Firma] 🏢</span>
              </div>

              {/* Languages */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.languages, isSlowMode); }}
                className="bg-stone-50 hover:bg-emerald-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Languages (Sprachen)</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-emerald-800">{currentProfile.languages}</p>
                <span className="text-xs text-stone-500 italic">Tap to listen 🔊</span>
              </div>

              {/* Hobbies */}
              <div
                onClick={() => { playChime('click'); speakGerman(currentProfile.hobbies, isSlowMode); }}
                className="bg-stone-50 hover:bg-amber-50/70 p-4 rounded-2xl border border-stone-200 transition-all cursor-pointer group sm:col-span-2"
              >
                <span className="text-[11px] font-black uppercase text-stone-400 block mb-1">Hobbies (Was sind ... Hobbys?)</span>
                <p className="font-extrabold text-base text-stone-900 group-hover:text-amber-800">{currentProfile.hobbies}</p>
                <span className="text-xs text-stone-500 italic">{currentProfile.possessive} Hobbys sind... 🎵</span>
              </div>
            </div>

            {/* Teacher's Note / Highlight */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-4 text-xs sm:text-sm text-teal-950 font-medium flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-black text-teal-900">Grammar Spotlight for this Profile:</strong>
                <p className="mt-0.5 text-stone-700">{currentProfile.highlight}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: The 9 Core Questions */}
      {activeTab === 'questions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-indigo-200 shadow-xl space-y-6">
          <div className="border-b pb-4 border-stone-200">
            <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider">Interactive Dialogue Bubbles</span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              The 9 W-Fragen for Introducing Anyone ❓
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Click any question below to see how it shifts between a Man (er), a Woman (sie), and a Group (sie Plural), and hear how {currentProfile.name} answers!
            </p>
          </div>

          {/* Question Bubbles Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {QUESTIONS_LIST.map((q, idx) => {
              const isSelected = selectedQuestionIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuestionIdx(idx);
                    playChime('click');
                    const qText = currentProfile.id === 'peter' ? q.qHe : currentProfile.id === 'couple' ? q.qThey : q.qShe;
                    speakGerman(qText, isSlowMode);
                  }}
                  className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-900 text-white border-indigo-950 shadow-md scale-102 font-bold'
                      : 'bg-stone-50 hover:bg-indigo-50/60 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-black uppercase mb-1 opacity-70">
                    <span>Question {idx + 1}</span>
                    <span>{isSelected ? '🔊 Active' : ''}</span>
                  </div>
                  <div className="font-black text-sm">{q.qHe} / {q.qShe}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">{q.meaning}</div>
                </button>
              );
            })}
          </div>

          {/* Interactive Question & Answer Stage */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-stone-50 rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 space-y-5 text-center">
            {/* The Question */}
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-800">
                You ask about {currentProfile.name}:
              </span>
              <div className="text-2xl sm:text-3xl font-black text-indigo-950 font-mono">
                "{getActiveQuestionText()}"
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic">({currentQ.meaning})</p>
              <button
                onClick={() => {
                  playChime('click');
                  speakGerman(getActiveQuestionText(), isSlowMode);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-200/80 text-indigo-900 text-xs font-bold mt-1 hover:bg-indigo-300"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Question</span>
              </button>
            </div>

            {/* Answer Arrow */}
            <div className="flex items-center justify-center gap-2 text-stone-400 font-bold text-xs uppercase">
              <span>⬇️ Response for {currentProfile.name} ⬇️</span>
            </div>

            {/* The Answer */}
            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-400 shadow-md max-w-lg mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
                Introduction Statement:
              </span>
              <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                {getActiveAnswerText()}
              </div>
              <button
                onClick={() => {
                  playChime('click');
                  speakGerman(getActiveAnswerText(), isSlowMode);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold hover:bg-emerald-200 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Response</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Golden Rules Spotlight */}
      {activeTab === 'spotlight' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Possessives */}
          <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-black">
                🎸
              </div>
              <h4 className="text-lg font-black text-stone-900">
                1. "seine" vs "ihre" Hobbys
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                When talking about someone's hobbies:
              </p>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs space-y-1.5">
                <div>
                  <strong className="text-amber-950">For a Man (er):</strong><br />
                  <span className="font-mono font-bold text-amber-900">Seine Hobbys sind...</span> (His hobbies)
                </div>
                <div className="border-t border-amber-200 pt-1">
                  <strong className="text-amber-950">For a Woman (sie) & Couple (sie):</strong><br />
                  <span className="font-mono font-bold text-amber-900">Ihre Hobbys sind...</span> (Her/Their hobbies)
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                playChime('click');
                speakGerman("Seine Hobbys sind Musik hören und Lesen. Ihre Hobbys sind Tanzen und Reisen.", isSlowMode);
              }}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Both Examples</span>
            </button>
          </div>

          {/* Card 2: Company Preposition 'bei' */}
          <div className="bg-white rounded-3xl p-6 border-3 border-indigo-300 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center text-2xl font-black">
                🏢
              </div>
              <h4 className="text-lg font-black text-stone-900">
                2. Working at a Company: "bei"
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                In German, you never say "in Siemens" or "at Siemens" with English prepositions. Employment at a company always takes <strong>bei</strong>:
              </p>
              <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-200 text-xs space-y-1.5 font-mono">
                <div>• Er arbeitet <strong>bei Siemens</strong>.</div>
                <div>• Sie arbeitet <strong>bei Lufthansa</strong>.</div>
                <div>• Sie arbeiten <strong>bei BMW</strong>.</div>
              </div>
            </div>
            <button
              onClick={() => {
                playChime('click');
                speakGerman("Er arbeitet bei Siemens. Sie arbeitet bei Lufthansa. Sie arbeiten bei BMW.", isSlowMode);
              }}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Company Sentences</span>
            </button>
          </div>

          {/* Card 3: Switzerland & Baby Rule */}
          <div className="bg-white rounded-3xl p-6 border-3 border-emerald-300 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-2xl font-black">
                🇨🇭
              </div>
              <h4 className="text-lg font-black text-stone-900">
                3. Switzerland & 1 Jahr
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Two special slide gems to watch out for:
              </p>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs space-y-2">
                <div>
                  <strong className="text-emerald-950">Switzerland is Feminine:</strong><br />
                  <span>Always say: <strong className="font-mono text-emerald-900">aus der Schweiz</strong>!</span>
                </div>
                <div className="border-t border-emerald-200 pt-1">
                  <strong className="text-emerald-950">Baby is 1 Year (Singular):</strong><br />
                  <span>Say: <strong className="font-mono text-emerald-900">1 Jahr alt</strong> (no plural -e!).</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                playChime('click');
                speakGerman("Sie kommt aus der Schweiz. Das Kind ist ein Jahr alt.", isSlowMode);
              }}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Switzerland & Baby</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
