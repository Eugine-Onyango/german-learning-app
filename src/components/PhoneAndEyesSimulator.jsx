import React, { useState } from 'react';
import { Phone, PhoneCall, PhoneOff, Eye, Ear, Volume2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function PhoneAndEyesSimulator({ isSlowMode }) {
  const [callState, setCallState] = useState('idle'); // 'idle', 'ringing', 'connected', 'ended'
  const [eyeState, setEyeState] = useState(false);

  const handleStartCall = () => {
    playChime('ring');
    setCallState('ringing');
    setTimeout(() => {
      setCallState('connected');
      speakGerman("Hallo! Auf Wiederhören!", isSlowMode);
    }, 1200);
  };

  const handleHangUp = () => {
    playChime('click');
    speakGerman("Auf Wiederhören!", isSlowMode);
    setCallState('ended');
    setTimeout(() => setCallState('idle'), 2000);
  };

  const handleSeeFace = () => {
    playChime('success');
    setEyeState(true);
    speakGerman("Auf Wiedersehen!", isSlowMode);
    setTimeout(() => setEyeState(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 flex items-center justify-center gap-2">
          <span>👀</span>
          <span>Eyes vs Ears: The Big German Goodbye Secret!</span>
          <span>👂</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          Many beginners get confused between <span className="font-bold text-indigo-900">Auf Wiedersehen</span> and <span className="font-bold text-indigo-900">Auf Wiederhören</span>.
          Once you link each word to your eyes or ears, you will remember it forever!
        </p>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Wiedersehen (Eyes / Seeing) */}
        <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 hover:border-amber-400 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-400 text-stone-900 font-black text-[11px] px-3 py-1 rounded-bl-2xl uppercase">
            In Person Live 👀
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">
                👀
              </div>
              <div>
                <h3 className="text-xl font-black text-stone-900 font-mono">
                  Auf Wiedersehen!
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  See you again! (Face-to-face)
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs sm:text-sm text-stone-800 space-y-2">
              <p>
                <strong>Why do Germans say this?</strong>
              </p>
              <div className="flex items-center gap-2 font-mono text-xs bg-white p-2.5 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-900">Auf</span> (until) + 
                <span className="font-bold text-amber-900">wieder</span> (again) + 
                <span className="font-bold text-emerald-700 bg-emerald-100 px-1 rounded">sehen</span> (TO SEE with your eyes!)
              </div>
              <p>
                🇰🇪 <strong>Everyday Analogy:</strong> Standing face-to-face with a friend at the bus stop, looking into each other's eyes and waving goodbye: <em>"Until I see you again!"</em>
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">Pronounce: <strong className="text-stone-800">Owf Vee-der-zay-en</strong></span>
            <button
              onClick={handleSeeFace}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{eyeState ? 'Eyes seeing! 👀' : 'Try "Auf Wiedersehen"'}</span>
            </button>
          </div>
        </div>

        {/* Box 2: Wiederhören (Ears / Hearing on Telephone) */}
        <div className="bg-white rounded-3xl p-6 border-3 border-stone-200 hover:border-emerald-400 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white font-black text-[11px] px-3 py-1 rounded-bl-2xl uppercase">
            Telephone Only 📞
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">
                👂
              </div>
              <div>
                <h3 className="text-xl font-black text-stone-900 font-mono">
                  Auf Wiederhören!
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Bye! (Over the telephone)
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs sm:text-sm text-stone-800 space-y-2">
              <p>
                <strong>Why do Germans say this?</strong>
              </p>
              <div className="flex items-center gap-2 font-mono text-xs bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-900">Auf</span> (until) + 
                <span className="font-bold text-emerald-900">wieder</span> (again) + 
                <span className="font-bold text-blue-700 bg-blue-100 px-1 rounded">hören</span> (TO HEAR with your ears!)
              </div>
              <p>
                🇰🇪 <strong>Everyday Analogy:</strong> On a mobile phone call, you cannot see the person with your eyes. You only hear their voice! So Germans say: <em>"Until we hear each other again on the line!"</em>
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">Pronounce: <strong className="text-stone-800">Owf Vee-der-her-en</strong></span>
            <button
              onClick={() => {
                playChime('click');
                speakGerman("Auf Wiederhören!", isSlowMode);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Phone Call Simulator */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-stone-700 max-w-xl mx-auto text-center relative overflow-hidden">
        <div className="w-16 h-16 bg-stone-800 rounded-full mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner">
          📱
        </div>

        <h3 className="text-xl font-black text-amber-300">
          Interactive Phone Call Simulator
        </h3>
        <p className="text-xs text-stone-300 mt-1 mb-5">
          Tap below to make a test call and hear a German speaker end the call with <strong>"Auf Wiederhören!"</strong>
        </p>

        {callState === 'idle' && (
          <button
            onClick={handleStartCall}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-black text-sm flex items-center gap-2 mx-auto shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <span>Make a Test Call (Call)</span>
          </button>
        )}

        {callState === 'ringing' && (
          <div className="space-y-3">
            <div className="text-amber-400 font-mono font-bold animate-pulse text-lg">
              Calling... 🔔 Ringing...
            </div>
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {callState === 'connected' && (
          <div className="space-y-4">
            <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 inline-block">
              <span className="text-xs text-emerald-400 font-bold block mb-1">● Call Connected</span>
              <p className="text-lg font-mono font-bold text-amber-200">
                "Auf Wiederhören!"
              </p>
              <p className="text-xs text-stone-300">
                (Until we hear each other again on the phone!)
              </p>
            </div>
            <div>
              <button
                onClick={handleHangUp}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-black text-sm flex items-center gap-2 mx-auto shadow-lg cursor-pointer active:scale-95"
              >
                <PhoneOff className="w-5 h-5" />
                <span>Hang Up (Auf Wiederhören!)</span>
              </button>
            </div>
          </div>
        )}

        {callState === 'ended' && (
          <div className="text-stone-300 font-bold">
            Call ended! You said: <span className="text-amber-300">Auf Wiederhören! 📞</span>
          </div>
        )}
      </div>

      {/* Bonus Guides: The Letter ß and Sie vs dich */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* The mysterious letter ß */}
        <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-black text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-lg font-mono">
              ß
            </span>
            <h4 className="font-black text-stone-900 text-sm">
              What is this letter 'ß'? No panic!
            </h4>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            It is called <em>Eszett</em>. <strong>It is NOT a letter 'B'!</strong> It is simply a twin <strong className="text-amber-950 font-black">"ss"</strong>.
            So words like <span className="font-mono font-bold">Grüß Gott</span> are pronounced just like <span className="underline font-bold">"Grooss Gott"</span>!
          </p>
        </div>

        {/* Sie vs dich */}
        <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🤝</span>
            <h4 className="font-black text-purple-950 text-sm">
              "Sie" (Respectful) vs "dich" (Casual)
            </h4>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            <strong>Grüß Sie!</strong> = For elders, doctors, or someone you respect. (Note: "Sie" is pronounced like <strong className="text-purple-900 font-black">"Zee"</strong> like Zebra).<br/>
            <strong>Grüß dich!</strong> = For your close buddy, classmate, or friend!
          </p>
        </div>
      </div>
    </div>
  );
}
