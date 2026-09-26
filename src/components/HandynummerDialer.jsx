import React, { useState } from 'react';
import { Phone, PhoneCall, Delete, RotateCcw, Volume2, Sparkles, Smartphone } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function HandynummerDialer({ isSlowMode }) {
  const [dialedNumber, setDialedNumber] = useState('0187632945'); // Default to slide number

  const digitGerman = {
    '0': 'null',
    '1': 'eins',
    '2': 'zwei',
    '3': 'drei',
    '4': 'vier',
    '5': 'fünf',
    '6': 'sechs',
    '7': 'sieben',
    '8': 'acht',
    '9': 'neun'
  };

  const handleDigitPress = (digit) => {
    playChime('click');
    setDialedNumber(prev => prev + digit);
    if (digitGerman[digit]) {
      speakGerman(digitGerman[digit], isSlowMode);
    }
  };

  const handleDelete = () => {
    playChime('click');
    setDialedNumber(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    playChime('click');
    setDialedNumber('');
  };

  const handleSpeakFullNumber = () => {
    playChime('success');
    if (!dialedNumber) return;

    // Convert digits to German words
    const words = dialedNumber
      .split('')
      .map(d => digitGerman[d] || d)
      .join(' - ');

    const fullSpeech = `Meine Handynummer ist: ${words}`;
    speakGerman(fullSpeech, isSlowMode);
  };

  // Format dialed number with dashes like 0187 - 632 - 945
  const formattedDisplay = () => {
    if (!dialedNumber) return 'Enter number...';
    const digits = dialedNumber;
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} - ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} - ${digits.slice(4, 7)} - ${digits.slice(7)}`;
  };

  const keypad = [
    ['1', 'eins'], ['2', 'zwei'], ['3', 'drei'],
    ['4', 'vier'], ['5', 'fünf'], ['6', 'sechs'],
    ['7', 'sieben'], ['8', 'acht'], ['9', 'neun'],
    ['*', 'Stern'], ['0', 'null'], ['#', 'Raute']
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Intro */}
      <div className="bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-200 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">📱 📞</div>
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
          Meine Handynummer ist... (My Mobile Number is...)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto mt-2 leading-relaxed">
          In Germany, a mobile phone is called a <strong>"Handy"</strong> because it is handy and fits right in the palm of your hand!  
          Tap each digit on the dialpad below to hear how to read a phone number digit-by-digit!
        </p>
      </div>

      {/* Mobile Device Simulation Frame */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border-4 border-stone-700 shadow-2xl space-y-5">
        {/* Phone screen display */}
        <div className="bg-stone-800 rounded-2xl p-4 border border-stone-700 text-center">
          <span className="text-[11px] font-mono text-emerald-400 block mb-1 uppercase tracking-wider">
            ● Mobile Number Screen
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-wider min-h-[36px] flex items-center justify-center">
            {formattedDisplay()}
          </div>
          <p className="text-xs text-stone-400 mt-2">
            In German: <em>"Meine Handynummer ist {formattedDisplay()}"</em>
          </p>

          {/* Breakdown of current digits in words */}
          {dialedNumber && (
            <div className="mt-3 pt-3 border-t border-stone-700 flex flex-wrap justify-center gap-1.5 text-[11px] font-mono text-amber-200/90">
              {dialedNumber.split('').map((char, i) => (
                <span key={i} className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {char} = <strong className="text-emerald-300">{digitGerman[char] || char}</strong>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Read Full Number Button */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={handleSpeakFullNumber}
            disabled={!dialedNumber}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-black text-xs sm:text-sm rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Speak Full Number (Meine Handynummer ist...)</span>
          </button>

          <button
            onClick={() => {
              playChime('click');
              setDialedNumber('0187632945');
            }}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 font-bold text-xs rounded-full cursor-pointer"
          >
            Load Slide: 0187-632-945
          </button>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {keypad.map(([digit, germanLabel]) => (
            <button
              key={digit}
              onClick={() => handleDigitPress(digit)}
              className="h-16 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer shadow-sm group"
            >
              <span className="text-xl sm:text-2xl font-mono font-black text-white group-hover:text-amber-300">
                {digit}
              </span>
              <span className="text-[10px] font-bold text-stone-400 group-hover:text-amber-200">
                {germanLabel}
              </span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto pt-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Delete className="w-4 h-4" />
            <span>Backspace</span>
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
}
