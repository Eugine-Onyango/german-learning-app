import React, { useState } from 'react';
import { Volume2, Search } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function AtAGlanceSummary({ items, lessonNumber = 1, isSlowMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVoiceId, setActiveVoiceId] = useState(null);
  const [viewMode, setViewMode] = useState('chalkboard'); // 'chalkboard' or 'table'

  const handleSpeak = (item) => {
    playChime('click');
    setActiveVoiceId(item.id);
    speakGerman(item.audioText, isSlowMode, null, () => {
      setActiveVoiceId(null);
    });
  };

  const filtered = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.german.toLowerCase().includes(q) ||
      item.english.toLowerCase().includes(q) ||
      item.pronunciation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-amber-100/90 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-amber-950 flex items-center gap-2">
            <span>📋</span>
            <span>
              {typeof lessonNumber === 'string' && lessonNumber.startsWith('summary-')
                ? `Summary ${lessonNumber.replace('summary-', '')}: "At a glance"`
                : `Lesson ${lessonNumber} Summary: "At a glance"`}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 mt-1">
            Exact slide chalkboard replica. Click any yellow German phrase to hear natural audio pronunciation!
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-2xl border border-amber-200">
          <button
            onClick={() => {
              setViewMode('chalkboard');
              playChime('click');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'chalkboard'
                ? 'bg-stone-900 text-amber-300 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🖍️ Chalkboard Mode
          </button>
          <button
            onClick={() => {
              setViewMode('table');
              playChime('click');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🗂️ Clean Table
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search phrase (e.g., Danke, Bitte, excuse me, no idea)..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none text-sm font-medium bg-white shadow-xs"
        />
      </div>

      {/* Chalkboard Mode (Exact visual match to the classroom blackboard slide!) */}
      {viewMode === 'chalkboard' ? (
        <div className="bg-[#1f2421] text-white rounded-3xl p-6 sm:p-10 border-8 border-stone-800 shadow-2xl relative overflow-hidden font-sans">
          <div className="text-center mb-8 border-b border-stone-700/60 pb-5">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block mb-1">
              Lesson {lessonNumber} • Slide Summary
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-[#f6c85f] tracking-wide font-serif">
              At a glance
            </h3>
            <p className="text-xs text-stone-400 mt-2 italic">
              Tap any yellow phrase to hear audio spoken at a gentle speed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-5xl mx-auto">
            {filtered.map((item) => {
              const isSpeaking = activeVoiceId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSpeak(item)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-amber-950/80 border-[#f6c85f] scale-102 ring-2 ring-amber-300'
                      : 'bg-stone-800/80 border-stone-700/70 hover:border-[#f6c85f]/80 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-lg font-bold text-[#f6c85f] font-mono tracking-wide">
                        {item.german}
                      </div>
                      <div className="text-xs text-stone-300">
                        {item.english}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] text-amber-200/80 bg-stone-900 px-2 py-0.5 rounded-full font-mono">
                      {item.pronunciation}
                    </span>
                    <button
                      className="p-2 rounded-xl bg-amber-400/20 text-[#f6c85f] hover:bg-amber-400/30"
                      title="Listen"
                    >
                      <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-[#f6c85f]' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Clean Light Table Mode */
        <div className="bg-white rounded-3xl border-3 border-stone-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-500 text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                  <th className="p-4">German (Deutsch)</th>
                  <th className="p-4">English Meaning</th>
                  <th className="p-4">Pronunciation</th>
                  <th className="p-4 text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm font-medium text-stone-800">
                {filtered.map((item) => {
                  const isSpeaking = activeVoiceId === item.id;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-amber-50/50 transition-colors ${
                        isSpeaking ? 'bg-amber-100/70 font-bold' : ''
                      }`}
                    >
                      <td className="p-4 font-mono font-bold text-base text-stone-950 flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.german}</span>
                      </td>
                      <td className="p-4 text-stone-700 font-semibold">
                        {item.english}
                      </td>
                      <td className="p-4 font-mono text-amber-900 bg-stone-50 rounded-lg">
                        {item.pronunciation}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleSpeak(item)}
                          className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 cursor-pointer inline-flex items-center gap-1 font-bold text-xs shadow-xs"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Listen</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
