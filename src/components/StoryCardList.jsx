import React, { useState } from 'react';
import { Volume2, Sparkles, Lightbulb } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function StoryCardList({ items, isSlowMode, lessonTitle, lessonDesc }) {
  const [filter, setFilter] = useState('all');
  const [speakingId, setSpeakingId] = useState(null);

  const handleSpeak = (item) => {
    playChime('click');
    setSpeakingId(item.id);
    speakGerman(item.audioText, isSlowMode, null, () => {
      setSpeakingId(null);
    });
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.category.includes(filter);
  });

  return (
    <div className="space-y-6">
      {/* Introduction box */}
      <div className="bg-amber-100/80 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-3xl shadow-inner animate-gentle-bounce flex-shrink-0">
            💡
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-amber-950">
              {lessonTitle || "German Concepts in Layman Terms"}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {lessonDesc || "Broken down into plain, stress-free terms with relatable Kenyan analogies. Click any speaker icon to hear crystal clear native pronunciation!"}
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => {
          const isSpeaking = speakingId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border-3 transition-all duration-200 shadow-md hover:shadow-xl relative flex flex-col justify-between ${
                isSpeaking
                  ? 'border-amber-500 ring-4 ring-amber-200 -translate-y-1'
                  : 'border-stone-200 hover:border-amber-300'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl p-2 bg-amber-50 rounded-2xl border border-amber-100 shadow-inner">
                      {item.icon}
                    </span>
                    <div>
                      <span className="inline-block bg-amber-100 text-amber-900 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wide">
                        {item.badge}
                      </span>
                      <p className="text-xs text-stone-500 font-semibold mt-0.5">
                        Meaning: <span className="text-stone-900 font-bold">{item.english}</span>
                      </p>
                    </div>
                  </div>

                  {/* Play audio button */}
                  <button
                    onClick={() => handleSpeak(item)}
                    className={`p-3 rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer font-bold text-xs ${
                      isSpeaking
                        ? 'bg-amber-500 text-white animate-pulse shadow-md scale-105'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                    }`}
                    title="Click to hear speech"
                  >
                    <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                    <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
                  </button>
                </div>

                {/* Main German Word Banner */}
                <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-amber-300 rounded-2xl p-4 text-center shadow-inner my-2 relative overflow-hidden">
                  <span className="text-xs text-stone-400 block font-medium uppercase tracking-wider mb-1">
                    German (Deutsch)
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-wide font-mono">
                    {item.german}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-stone-200 font-sans">
                    🗣️ Pronounce like: <span className="text-amber-200 font-bold underline decoration-amber-400">{item.pronunciation}</span>
                  </div>
                </div>

                {/* Meaning Banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 my-2 flex items-center gap-2">
                  <span className="text-emerald-700 font-bold text-xs uppercase tracking-wide">
                    Plain Meaning:
                  </span>
                  <span className="text-emerald-950 font-bold text-sm sm:text-base">
                    {item.english}
                  </span>
                </div>

                {/* Kenyan Analogy */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 my-3 text-stone-800 text-xs sm:text-sm leading-relaxed">
                  <div className="flex items-center gap-1 text-amber-900 font-black text-xs uppercase mb-1">
                    <span>🇰🇪</span>
                    <span>Everyday Kenyan Analogy:</span>
                  </div>
                  <p>{item.kenyanAnalogy}</p>
                </div>
              </div>

              {/* Memory Trick Footer */}
              <div className="bg-stone-50 border-t border-stone-100 pt-2.5 mt-2 rounded-xl flex items-start gap-2 text-stone-600 text-xs">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-stone-800">Quick Memory Trick:</strong> {item.memoryTrick}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
