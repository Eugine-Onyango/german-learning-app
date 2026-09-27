import React, { useState } from 'react';
import { Volume2, Sparkles, ArrowRight, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson9ConjugationStudio({ isSlowMode }) {
  const [selectedVerbKey, setSelectedVerbKey] = useState('wohnen');
  const [selectedPronoun, setSelectedPronoun] = useState('ich'); // 'ich', 'du', 'Sie'

  const verbsData = {
    wohnen: {
      infinitive: 'wohnen',
      meaning: 'to live',
      stem: 'wohn',
      conjugations: {
        ich: {
          pronoun: 'ich',
          verb: 'wohne',
          ending: '-e',
          color: 'text-cyan-600',
          bgColor: 'bg-cyan-50 border-cyan-300',
          example: 'Ich wohne in Berlin.',
          exampleMeaning: 'I live in Berlin.'
        },
        du: {
          pronoun: 'du',
          verb: 'wohnst',
          ending: '-st',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50 border-amber-300',
          example: 'Wo wohnst du?',
          exampleMeaning: 'Where do you live, pal?'
        },
        Sie: {
          pronoun: 'Sie',
          verb: 'wohnen',
          ending: '-en',
          color: 'text-teal-600',
          bgColor: 'bg-teal-50 border-teal-300',
          example: 'Wo wohnen Sie?',
          exampleMeaning: 'Where do you live, sir/madam?'
        }
      }
    },
    kommen: {
      infinitive: 'kommen',
      meaning: 'to come',
      stem: 'komm',
      conjugations: {
        ich: {
          pronoun: 'ich',
          verb: 'komme',
          ending: '-e',
          color: 'text-cyan-600',
          bgColor: 'bg-cyan-50 border-cyan-300',
          example: 'Ich komme aus Deutschland.',
          exampleMeaning: 'I come from Germany.'
        },
        du: {
          pronoun: 'du',
          verb: 'kommst',
          ending: '-st',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50 border-amber-300',
          example: 'Woher kommst du?',
          exampleMeaning: 'Where do you come from, friend?'
        },
        Sie: {
          pronoun: 'Sie',
          verb: 'kommen',
          ending: '-en',
          color: 'text-teal-600',
          bgColor: 'bg-teal-50 border-teal-300',
          example: 'Woher kommen Sie?',
          exampleMeaning: 'Where do you come from, elder?'
        }
      }
    },
    heissen: {
      infinitive: 'heißen',
      meaning: 'to be called',
      stem: 'heiß',
      specialNote: "Special Rule: 'ß' already sounds like double 'ss', so 'du' only takes '-t' (du heißt) instead of '-st'!",
      conjugations: {
        ich: {
          pronoun: 'ich',
          verb: 'heiße',
          ending: '-e',
          color: 'text-cyan-600',
          bgColor: 'bg-cyan-50 border-cyan-300',
          example: 'Ich heiße Martin.',
          exampleMeaning: 'I am called Martin.'
        },
        du: {
          pronoun: 'du',
          verb: 'heißt',
          ending: '-t (!)',
          color: 'text-rose-600',
          bgColor: 'bg-rose-50 border-rose-300',
          example: 'Wie heißt du?',
          exampleMeaning: 'What is your name, buddy?'
        },
        Sie: {
          pronoun: 'Sie',
          verb: 'heißen',
          ending: '-en',
          color: 'text-teal-600',
          bgColor: 'bg-teal-50 border-teal-300',
          example: 'Wie heißen Sie?',
          exampleMeaning: 'What is your name, sir/madam?'
        }
      }
    },
    sprechen: {
      infinitive: 'sprechen',
      meaning: 'to speak',
      stem: 'sprech',
      specialNote: "Special Rule: Vowel shift! For 'du', the inside letter 'e' changes into an 'i': du sprichst!",
      conjugations: {
        ich: {
          pronoun: 'ich',
          verb: 'spreche',
          ending: '-e',
          color: 'text-cyan-600',
          bgColor: 'bg-cyan-50 border-cyan-300',
          example: 'Ich spreche Deutsch und Englisch.',
          exampleMeaning: 'I speak German and English.'
        },
        du: {
          pronoun: 'du',
          verb: 'sprichst',
          ending: '-st (e -> i)',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50 border-purple-300',
          example: 'Welche Sprachen sprichst du?',
          exampleMeaning: 'Which languages do you speak?'
        },
        Sie: {
          pronoun: 'Sie',
          verb: 'sprechen',
          ending: '-en',
          color: 'text-teal-600',
          bgColor: 'bg-teal-50 border-teal-300',
          example: 'Welche Sprachen sprechen Sie?',
          exampleMeaning: 'Which languages do you speak, formal?'
        }
      }
    }
  };

  const currentVerb = verbsData[selectedVerbKey];
  const activeConj = currentVerb.conjugations[selectedPronoun];

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-6">
      {/* Friendly Banner */}
      <div className="bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🎨 👗 👤 🎩</div>
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
          Lesson 9: Satzstruktur (Teil 2) - The Verb Dressing Studio!
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          In German, verbs put on different tails (endings) depending on who is talking!  
          <strong className="text-cyan-900 font-bold"> "ich" puts on -e</strong>,  
          <strong className="text-amber-900 font-bold"> "du" puts on -st</strong>, and  
          <strong className="text-teal-900 font-bold"> "Sie" puts on -en</strong>!
        </p>
      </div>

      {/* Verb Switcher Buttons */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-stone-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-black uppercase text-stone-500 tracking-wider">
            Choose a Verb from Your Slides:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
            {[
              { id: 'wohnen', label: 'wohnen', sub: 'to live' },
              { id: 'kommen', label: 'kommen', sub: 'to come' },
              { id: 'heissen', label: 'heißen', sub: 'to be called' },
              { id: 'sprechen', label: 'sprechen', sub: 'to speak' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVerbKey(v.id);
                  playChime('click');
                }}
                className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm text-center transition-all cursor-pointer ${
                  selectedVerbKey === v.id
                    ? 'bg-emerald-700 text-white shadow-md ring-3 ring-emerald-300 scale-102'
                    : 'bg-stone-100 text-stone-700 hover:bg-emerald-100'
                }`}
              >
                <div>{v.label}</div>
                <div className={`text-[10px] font-normal ${selectedVerbKey === v.id ? 'text-emerald-100' : 'text-stone-400'}`}>
                  {v.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Dressing Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-lg space-y-6">
        {/* Step 1: Pick the Pronoun */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block text-center">
            Step 1: Pick Who is Doing the Action:
          </span>

          <div className="grid grid-cols-3 gap-3">
            {/* ich */}
            <button
              onClick={() => {
                setSelectedPronoun('ich');
                playChime('click');
              }}
              className={`p-4 rounded-2xl border-3 text-center transition-all cursor-pointer ${
                selectedPronoun === 'ich'
                  ? 'bg-cyan-600 text-white border-cyan-700 shadow-lg ring-3 ring-cyan-300 scale-102 font-black'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-cyan-50 font-bold'
              }`}
            >
              <div className="text-2xl mb-1">👤</div>
              <div className="font-mono text-xl sm:text-2xl">ich</div>
              <div className={`text-xs ${selectedPronoun === 'ich' ? 'text-cyan-100' : 'text-stone-400'}`}>
                I (1st person)
              </div>
              <div className={`mt-2 text-xs font-mono font-bold px-2 py-0.5 rounded-full inline-block ${
                selectedPronoun === 'ich' ? 'bg-cyan-800 text-cyan-200' : 'bg-stone-200 text-stone-600'
              }`}>
                Ending: -e
              </div>
            </button>

            {/* du */}
            <button
              onClick={() => {
                setSelectedPronoun('du');
                playChime('click');
              }}
              className={`p-4 rounded-2xl border-3 text-center transition-all cursor-pointer ${
                selectedPronoun === 'du'
                  ? 'bg-amber-600 text-white border-amber-700 shadow-lg ring-3 ring-amber-300 scale-102 font-black'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50 font-bold'
              }`}
            >
              <div className="text-2xl mb-1">👕</div>
              <div className="font-mono text-xl sm:text-2xl">du</div>
              <div className={`text-xs ${selectedPronoun === 'du' ? 'text-amber-100' : 'text-stone-400'}`}>
                you (friendly)
              </div>
              <div className={`mt-2 text-xs font-mono font-bold px-2 py-0.5 rounded-full inline-block ${
                selectedPronoun === 'du' ? 'bg-amber-800 text-amber-200' : 'bg-stone-200 text-stone-600'
              }`}>
                Ending: -st
              </div>
            </button>

            {/* Sie */}
            <button
              onClick={() => {
                setSelectedPronoun('Sie');
                playChime('click');
              }}
              className={`p-4 rounded-2xl border-3 text-center transition-all cursor-pointer ${
                selectedPronoun === 'Sie'
                  ? 'bg-teal-700 text-white border-teal-800 shadow-lg ring-3 ring-teal-300 scale-102 font-black'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-teal-50 font-bold'
              }`}
            >
              <div className="text-2xl mb-1">🎩</div>
              <div className="font-mono text-xl sm:text-2xl">Sie</div>
              <div className={`text-xs ${selectedPronoun === 'Sie' ? 'text-teal-100' : 'text-stone-400'}`}>
                You (formal)
              </div>
              <div className={`mt-2 text-xs font-mono font-bold px-2 py-0.5 rounded-full inline-block ${
                selectedPronoun === 'Sie' ? 'bg-teal-900 text-teal-200' : 'bg-stone-200 text-stone-600'
              }`}>
                Ending: -en
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: The Live Verb Fusion Wagon */}
        <div className="p-6 rounded-3xl bg-stone-900 text-white border-4 border-stone-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Live Conjugation Fusion
            </span>
            <span className="text-xs text-stone-400">
              Infinitive: <strong className="text-white">{currentVerb.infinitive}</strong> ({currentVerb.meaning})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-2">
            <span className="font-mono text-3xl sm:text-4xl font-black text-white">
              {activeConj.pronoun}
            </span>
            <ArrowRight className="w-6 h-6 text-stone-500 hidden sm:inline" />
            <div className="flex items-baseline gap-1 font-mono text-3xl sm:text-4xl font-black">
              <span className="text-amber-300">
                {selectedVerbKey === 'sprechen' && selectedPronoun === 'du' ? 'sprich' : currentVerb.stem}
              </span>
              <span className="text-cyan-400 underline decoration-wavy decoration-cyan-400">
                {selectedVerbKey === 'heissen' && selectedPronoun === 'du' ? 't' : (
                  selectedPronoun === 'ich' ? 'e' : (selectedPronoun === 'du' ? 'st' : 'en')
                )}
              </span>
            </div>
            <span className="text-stone-400 text-xl font-mono">=</span>
            <span className="font-mono text-3xl sm:text-4xl font-black text-emerald-400">
              {activeConj.verb}
            </span>
          </div>

          {/* Special note if exists */}
          {currentVerb.specialNote && (
            <div className="p-3 bg-amber-950/60 border border-amber-500/50 rounded-2xl flex items-center gap-2 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{currentVerb.specialNote}</span>
            </div>
          )}

          {/* Example Sentence with Audio */}
          <div
            onClick={() => handleSpeak(activeConj.example)}
            className="p-4 rounded-2xl bg-stone-800 hover:bg-stone-700/80 border border-stone-700 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[11px] text-stone-400 block">Slide Example Sentence (Tap to Listen):</span>
              <span className="font-mono text-lg sm:text-xl font-bold text-amber-300 group-hover:text-amber-200">
                {activeConj.example}
              </span>
              <span className="text-xs text-stone-300 block mt-0.5">
                Meaning: "{activeConj.exampleMeaning}"
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center flex-shrink-0 ml-3">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Complete Table for the Active Verb (Matching Slides 6, 7, 8, 9) */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-black uppercase text-stone-600 tracking-wider block">
            Complete Table for "{currentVerb.infinitive}" (Direct from Slide):
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {['ich', 'du', 'Sie'].map((p) => {
              const conj = currentVerb.conjugations[p];
              return (
                <div
                  key={p}
                  onClick={() => handleSpeak(`${conj.pronoun} ${conj.verb}`)}
                  className="p-3.5 rounded-2xl bg-stone-50 border-2 border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-stone-600 w-8">{conj.pronoun}</span>
                    <span className="font-mono text-lg font-black text-stone-900">{conj.verb}</span>
                  </div>
                  <Volume2 className="w-4 h-4 text-stone-400 hover:text-emerald-700 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide Summary Rule Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 border-4 border-stone-800 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
          <span className="text-xl">📋</span>
          <h4 className="font-mono font-black text-amber-400 text-sm sm:text-base uppercase tracking-wider">
            Lesson 9: At a Glance Summary (Slide Reference)
          </h4>
        </div>
        <ul className="text-xs sm:text-sm text-stone-200 space-y-2 list-disc list-inside">
          <li>
            There are various pronouns such as <strong className="text-cyan-300">"ich"</strong>, <strong className="text-amber-300">"du"</strong> and <strong className="text-teal-300">"Sie"</strong>.
          </li>
          <li>
            Verb ending for <strong>"ich"</strong> is <strong className="text-cyan-300">-e</strong> (ich wohne, ich komme, ich heiße, ich spreche).
          </li>
          <li>
            Verb ending for <strong>"du"</strong> is <strong className="text-amber-300">-st</strong> (du wohnst, du kommst).
          </li>
          <li>
            Verb ending for <strong>"Sie"</strong> is <strong className="text-teal-300">-en</strong> (Sie wohnen, Sie kommen, Sie heißen, Sie sprechen).
          </li>
          <li>
            <strong className="text-rose-300">Exceptions:</strong>
            <ul className="pl-6 pt-1 space-y-1 list-circle">
              <li><strong>heißen:</strong> Because 'ß' is already double 'ss', du adds only <strong>-t</strong> (<em>du heißt</em>)!</li>
              <li><strong>sprechen:</strong> Vowel shifts from 'e' to 'i' for du (<em>du sprichst</em>)!</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
