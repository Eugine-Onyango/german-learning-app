import React, { useState } from 'react';
import { Volume2, Sparkles, Sun, CloudRain, CloudLightning, Wind, Snowflake, CloudFog, Thermometer, ShieldCheck } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson48WetterStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('station'); // 'station', 'transformer', 'dialogue'
  const [temperature, setTemperature] = useState(25);
  const [selectedCondition, setSelectedCondition] = useState('sunny');
  const [selectedTransformerIdx, setSelectedTransformerIdx] = useState(0);
  const [selectedDialogueIdx, setSelectedDialogueIdx] = useState(0);

  // Weather presets with full Slide 1-40 coverage
  const WEATHER_PRESETS = [
    {
      id: 'sunny',
      icon: '☀️',
      label: 'Sonnig & Klar',
      german: 'Es ist sonnig. Die Sonne scheint und der Himmel ist klar!',
      english: 'It is sunny. The sun is shining and the sky is clear!',
      bgClass: 'from-amber-400 via-orange-300 to-sky-300',
      badge: 'Slides 3, 16, 39: Sun & Clear Sky',
      nomen: 'die Sonne',
      adjektiv: 'sonnig',
      verb: 'Die Sonne scheint'
    },
    {
      id: 'dream',
      icon: '🏖️',
      label: 'Traumhaft / Superwetter',
      german: 'Heute ist das Wetter traumhaft! Ein Superwetter haben wir heute!',
      english: 'Today the weather is dreamlike/fantastic! What super weather we have today!',
      bgClass: 'from-yellow-300 via-amber-300 to-sky-400',
      badge: 'Slides 35-38: Dreamlike Weather',
      nomen: 'der Traum',
      adjektiv: 'traumhaft',
      verb: 'Das Wetter genießen'
    },
    {
      id: 'cloudy',
      icon: '⛅',
      label: 'Bewölkt / Bedeckt',
      german: 'Es ist leicht bewölkt. Es ist ziemlich grau und der Himmel ist bedeckt.',
      english: "It is slightly cloudy. It's pretty gray and the sky is overcast.",
      bgClass: 'from-stone-300 via-slate-300 to-sky-200',
      badge: 'Slides 8, 26, 33: Clouds & Overcast',
      nomen: 'die Wolke',
      adjektiv: 'bewölkt / bedeckt',
      verb: 'sich bewölken'
    },
    {
      id: 'rainy',
      icon: '🌧️',
      label: 'Regnerisch & Regen',
      german: 'Es ist regnerisch. Es regnet und nach dem Regen kommt der Regenbogen!',
      english: 'It is rainy. It is raining and after the rain comes the rainbow!',
      bgClass: 'from-blue-400 via-indigo-300 to-slate-400',
      badge: 'Slides 4, 7, 28: Rain & Rainbow',
      nomen: 'der Regen / der Regenbogen',
      adjektiv: 'regnerisch',
      verb: 'Es regnet'
    },
    {
      id: 'storm',
      icon: '⛈️',
      label: 'Gewitter & Sturm',
      german: 'Es blitzt und donnert! Es ist stürmisch und es gibt ein Gewitter.',
      english: "It's lightning and thundering! It is stormy and there is a thunderstorm.",
      bgClass: 'from-slate-700 via-indigo-900 to-stone-800 text-white',
      badge: 'Slides 6, 9, 10, 27, 29, 30: Lightning & Thunder',
      nomen: 'das Gewitter / der Blitz / der Donner',
      adjektiv: 'stürmisch',
      verb: 'Es blitzt und donnert'
    },
    {
      id: 'snow',
      icon: '❄️',
      label: 'Schnee & Schneit',
      german: 'Es gibt Schnee! Es schneit und es ist eisig draußen.',
      english: "There is snow! It is snowing and it's freezing cold outside.",
      bgClass: 'from-cyan-100 via-blue-200 to-indigo-200',
      badge: 'Slides 5, 22, 31: Snow & Freezing',
      nomen: 'der Schnee',
      adjektiv: 'eisig / verschneit',
      verb: 'Es schneit'
    },
    {
      id: 'fog',
      icon: '🌫️',
      label: 'Neblig & Grau',
      german: 'Es ist neblig. Es ist ziemlich grau heute und man sieht fast nichts.',
      english: "It is foggy. It's pretty gray today and you can barely see anything.",
      bgClass: 'from-stone-400 via-stone-300 to-zinc-400',
      badge: 'Slides 31, 33, 40: Fog & Gray',
      nomen: 'der Nebel',
      adjektiv: 'neblig / grau',
      verb: 'im Nebel liegen'
    },
    {
      id: 'windy',
      icon: '💨',
      label: 'Windig & Schwül',
      german: 'Es ist ziemlich windig heute! Vor dem Regen ist es schwül und feucht.',
      english: "It's pretty windy today! Before the rain it is muggy and humid.",
      bgClass: 'from-teal-300 via-cyan-200 to-sky-300',
      badge: 'Slides 11, 18, 19, 27, 34: Wind & Humidity',
      nomen: 'der Wind',
      adjektiv: 'windig / schwül / feucht',
      verb: 'Es weht'
    }
  ];

  // Slide 40 Transformer Table pairs
  const TRANSFORMER_PAIRS = [
    {
      nomen: 'die Sonne',
      nomenPlural: 'die Sonnen',
      adjektiv: 'sonnig',
      verb: 'scheinen (Die Sonne scheint)',
      english: 'the sun ➔ sunny (The sun is shining)',
      icon: '☀️',
      example: 'Die Sonne scheint den ganzen Tag. Heute ist es herrlich sonnig!'
    },
    {
      nomen: 'der Regen',
      nomenPlural: 'die Regen',
      adjektiv: 'regnerisch',
      verb: 'regnen (Es regnet)',
      english: 'the rain ➔ rainy (It is raining)',
      icon: '🌧️',
      example: 'Nimm einen Regenschirm mit! Es ist regnerisch und es regnet ununterbrochen.'
    },
    {
      nomen: 'die Wolke',
      nomenPlural: 'die Wolken',
      adjektiv: 'bewölkt',
      verb: 'bedecken (Der Himmel ist bedeckt)',
      english: 'the cloud ➔ cloudy / overcast',
      icon: '☁️',
      example: 'Am Himmel ist keine Sonne zu sehen. Es ist komplett bewölkt und bedeckt.'
    },
    {
      nomen: 'der Wind',
      nomenPlural: 'die Winde',
      adjektiv: 'windig',
      verb: 'wehen (Der Wind weht)',
      english: 'the wind ➔ windy (The wind is blowing)',
      icon: '💨',
      example: 'Es ist ziemlich windig heute! Der Wind weht sehr stark von Norden.'
    },
    {
      nomen: 'der Sturm',
      nomenPlural: 'die Stürme',
      adjektiv: 'stürmisch',
      verb: 'stürmen (Es stürmt)',
      english: 'the storm ➔ stormy (It is storming)',
      icon: '🌪️',
      example: 'Bleib lieber drinnen! Es ist stürmisch und ein Gewitter zieht auf.'
    },
    {
      nomen: 'der Nebel',
      nomenPlural: 'die Nebel',
      adjektiv: 'neblig',
      verb: 'aufziehen (Nebel zieht auf)',
      english: 'the fog ➔ foggy',
      icon: '🌫️',
      example: 'Fahr bitte langsam mit dem Auto! Es ist extrem neblig auf den Straßen.'
    }
  ];

  // Dialogue Scenarios
  const DIALOGUES = [
    {
      title: '☀️ Dialog 1: Ein Traumwetter! (Dreamlike Sunny Day)',
      subtitle: 'Slides 13, 15, 16, 35, 38, 39',
      lines: [
        { speaker: 'A', text: 'Wie ist das Wetter heute?', trans: 'How is the weather today?' },
        { speaker: 'B', text: 'Heute ist das Wetter traumhaft! Die Sonne scheint und der Himmel ist klar!', trans: 'Today the weather is fantastic! The sun is shining and the sky is clear!' },
        { speaker: 'A', text: 'Ein Superwetter haben wir heute! Es ist so angenehm und schön warm.', trans: 'What super weather we have today! It is so pleasant and nicely warm.' },
        { speaker: 'B', text: 'Ja, es ist 25 Grad. Gehen wir spazieren!', trans: "Yes, it is 25 degrees. Let's go for a walk!" }
      ]
    },
    {
      title: '🌧️ Dialog 2: Schlechtes Wetter & Vergleich mit gestern (Bad Weather & Comparison)',
      subtitle: 'Slides 14, 28, 32, 33, 34',
      lines: [
        { speaker: 'A', text: 'Wie ist das Wetter draußen?', trans: 'How is the weather outside?' },
        { speaker: 'B', text: 'Es ist schreckliches Wetter. Es ist ziemlich grau, windig und regnerisch!', trans: 'It is horrible weather. It is pretty gray, windy and rainy!' },
        { speaker: 'A', text: 'Heute ist es nicht mehr so schön wie gestern!', trans: 'Today it is not as nice as yesterday!' },
        { speaker: 'B', text: 'Stimmt. Gestern schien die Sonne, aber heute regnet es ununterbrochen.', trans: 'True. Yesterday the sun shone, but today it rains non-stop.' }
      ]
    },
    {
      title: '⚡ Dialog 3: Das Sommer-Gewitter (Summer Thunderstorm & Muggy Heat)',
      subtitle: 'Slides 6, 9, 17, 18, 19, 29, 30',
      lines: [
        { speaker: 'A', text: 'Puh, heute ist es extrem heiß, 39 Grad! Es ist so feucht und schwül.', trans: 'Phew, today is extremely hot, 39 degrees! It is so humid and sticky.' },
        { speaker: 'B', text: 'Schau mal nach oben! Die Wolken werden dunkel. Es gibt ein Gewitter.', trans: 'Look up! The clouds are getting dark. There is a thunderstorm brewing.' },
        { speaker: 'A', text: 'Hörst du das? Es blitzt und donnert schon!', trans: 'Do you hear that? It is already lightning and thundering!' },
        { speaker: 'B', text: 'Schnell, lass uns ins Haus gehen!', trans: 'Quick, let us go inside the house!' }
      ]
    },
    {
      title: '❄️ Dialog 4: Eisiger Winter & Frieren (Freezing Cold & Snow)',
      subtitle: 'Slides 5, 20, 21, 22, 24, 31',
      lines: [
        { speaker: 'A', text: 'Brrr! Wie viel Grad haben wir heute?', trans: 'Brrr! How many degrees do we have today?' },
        { speaker: 'B', text: 'Es ist minus 5 Grad. Es ist eisig kalt!', trans: 'It is minus 5 degrees. It is freezing cold!' },
        { speaker: 'A', text: 'Ich friere! Es gibt Schnee und es schneit draußen.', trans: "I'm freezing! There is snow and it's snowing outside." },
        { speaker: 'B', text: 'Zieh deine dicke Winterjacke und Handschuhe an!', trans: 'Put on your thick winter jacket and gloves!' }
      ]
    }
  ];

  // Helper to get temperature status
  const getTempDescription = (temp) => {
    if (temp <= 0) {
      return {
        label: 'Eisig kalt (-Grad)',
        german: `Es ist ${temp} Grad. Es ist eisig! Ich friere.`,
        english: `It is ${temp} degrees. It is freezing! I am freezing.`,
        color: 'text-cyan-600',
        barColor: 'bg-cyan-500'
      };
    }
    if (temp <= 12) {
      return {
        label: 'Kalt / Sehr kalt (1–12°C)',
        german: `Es ist ${temp} Grad. Es ist kalt / sehr kalt.`,
        english: `It is ${temp} degrees. It is cold / very cold.`,
        color: 'text-blue-600',
        barColor: 'bg-blue-500'
      };
    }
    if (temp <= 23) {
      return {
        label: 'Angenehm & Schön (13–23°C)',
        german: `Es ist ${temp} Grad. Es ist angenehm und schön.`,
        english: `It is ${temp} degrees. It is pleasant and nice.`,
        color: 'text-emerald-600',
        barColor: 'bg-emerald-500'
      };
    }
    if (temp <= 30) {
      return {
        label: 'Warm & Sonnig (24–30°C)',
        german: `Es ist ${temp} Grad. Es ist warm. Die Sonne scheint!`,
        english: `It is ${temp} degrees. It is warm. The sun is shining!`,
        color: 'text-amber-600',
        barColor: 'bg-amber-500'
      };
    }
    return {
      label: 'Sehr warm / Heiß & Schwül (31–40°C)',
      german: `Es ist ${temp} Grad! Es ist sehr warm und heiß. Es ist schwül und feucht.`,
      english: `It is ${temp} degrees! It is very warm and hot (39°C). It is muggy and humid.`,
      color: 'text-rose-600',
      barColor: 'bg-rose-500'
    };
  };

  const currentPreset = WEATHER_PRESETS.find(p => p.id === selectedCondition) || WEATHER_PRESETS[0];
  const currentTempInfo = getTempDescription(temperature);

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-sm border border-sky-100 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
            🌦️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Wetter Studio
              </h2>
              <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Lesson 48
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Interactive Thermometer, Noun ➔ Adjective Forge & German Weather Forecast
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl gap-1 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('station');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'station'
                ? 'bg-white text-sky-800 shadow-xs ring-1 ring-sky-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🌡️ Weather Station
          </button>
          <button
            onClick={() => {
              setActiveTab('transformer');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'transformer'
                ? 'bg-white text-sky-800 shadow-xs ring-1 ring-sky-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ⚙️ Noun ➔ Adjective (Slide 40)
          </button>
          <button
            onClick={() => {
              setActiveTab('dialogue');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'dialogue'
                ? 'bg-white text-sky-800 shadow-xs ring-1 ring-sky-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🎙️ Forecast & Chats
          </button>
        </div>
      </div>

      {/* TAB 1: WEATHER STATION & THERMOMETER */}
      {activeTab === 'station' && (
        <div className="space-y-6">
          {/* Main Weather Display Window */}
          <div
            className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${currentPreset.bgClass} shadow-md transition-all duration-300 relative overflow-hidden`}
          >
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-white/80 backdrop-blur-xs text-stone-800 text-xs font-black px-3 py-1 rounded-full shadow-xs">
                  {currentPreset.badge}
                </span>
                <span className="text-4xl sm:text-5xl animate-gentle-bounce">
                  {currentPreset.icon}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                  {currentPreset.german}
                </h3>
                <p className="text-sm sm:text-base text-stone-800 font-medium">
                  {currentPreset.english}
                </p>
              </div>

              {/* Combined Live Sentence with Temperature */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-white/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                    Live Broadcast Status (die Temperatur: {temperature}°C)
                  </div>
                  <div className="text-base sm:text-lg font-black text-stone-900">
                    "{currentTempInfo.german}"
                  </div>
                  <div className="text-xs text-stone-600">
                    {currentTempInfo.english}
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleSpeak(
                      `${currentPreset.german} Die Temperatur beträgt ${temperature} Grad. ${currentTempInfo.german}`
                    )
                  }
                  className="bg-sky-700 hover:bg-sky-800 text-white font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm flex-shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Broadcast Audio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Temperature Slider Control */}
          <div className="bg-sky-50/60 p-5 rounded-2xl border border-sky-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-sky-700" />
                <span className="text-sm font-black text-stone-900">
                  Slide 23–25: Die Temperatur Regler (Temperature Gauge)
                </span>
              </div>
              <span className={`text-lg font-black ${currentTempInfo.color}`}>
                {temperature}°C ({temperature <= 0 ? 'Unter Null / Eisig' : temperature >= 30 ? 'Heiß (39°C)' : 'Grad'})
              </span>
            </div>

            <input
              type="range"
              min="-10"
              max="40"
              step="1"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-stone-500 font-bold px-1">
              <span>-10°C (Eisig / Schnee)</span>
              <span>0°C (Gefrierpunkt)</span>
              <span>10°C (Kalt - Slide 24)</span>
              <span>20°C (Angenehm)</span>
              <span>30°C (Warm)</span>
              <span>39°C (Heiß - Slide 17)</span>
            </div>
          </div>

          {/* Weather Condition Presets */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>🌦️</span> Select Weather Condition Preset (Slides 1–39):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {WEATHER_PRESETS.map((p) => {
                const isSelected = selectedCondition === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedCondition(p.id);
                      handleSpeak(p.german);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300 shadow-xs'
                        : 'bg-white border-stone-200 hover:border-sky-300 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{p.icon}</span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {p.nomen.split(' ')[1] || p.nomen}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-black text-stone-900">{p.label}</div>
                      <div className="text-[10px] text-stone-500 truncate">{p.adjektiv}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NOUN ➔ ADJECTIVE TRANSFORMER (SLIDE 40 MASTER CHART) */}
      {activeTab === 'transformer' && (
        <div className="space-y-6">
          <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-200 text-xs sm:text-sm text-stone-700 space-y-1">
            <p className="font-bold text-sky-950 flex items-center gap-1.5 text-sm sm:text-base">
              <span>⚙️</span> Slide 40 Blueprint: The Golden Weather Transformer Chart
            </p>
            <p className="text-stone-600 leading-relaxed">
              In German, weather nouns transform into adjectives with specific endings like{' '}
              <span className="font-bold text-sky-800">-ig</span> (sonnig, windig, neblig),{' '}
              <span className="font-bold text-sky-800">-isch</span> (regnerisch, stürmisch), or{' '}
              <span className="font-bold text-sky-800">ge-...-t</span> (bewölkt). Tap any pair below to see it live!
            </p>
          </div>

          {/* Pair Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRANSFORMER_PAIRS.map((item, idx) => {
              const isSelected = selectedTransformerIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTransformerIdx(idx);
                    handleSpeak(`${item.nomen}, ${item.adjektiv}. ${item.verb}.`);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-gradient-to-br from-sky-50 to-amber-50 border-sky-500 shadow-md ring-2 ring-sky-300 scale-102'
                      : 'bg-white border-stone-200 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-xs bg-stone-100 text-stone-600 font-bold px-2 py-0.5 rounded-full">
                      Pair #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-stone-900">
                      <span className="text-blue-700">{item.nomen}</span>
                      <span>➔</span>
                      <span className="text-emerald-700">{item.adjektiv}</span>
                    </div>
                    <div className="text-[11px] text-stone-500">{item.english}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Transformer Deep Dive & Sentence Builder */}
          {(() => {
            const activePair = TRANSFORMER_PAIRS[selectedTransformerIdx];
            return (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-sky-300 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{activePair.icon}</span>
                    <div>
                      <h4 className="text-base font-black text-stone-900">
                        {activePair.nomen} ➔ {activePair.adjektiv}
                      </h4>
                      <p className="text-xs text-stone-500">{activePair.english}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSpeak(activePair.example)}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen Example</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  {/* Noun Card */}
                  <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 space-y-1">
                    <span className="text-[10px] font-black text-blue-900 uppercase tracking-wider block">
                      1. Das Nomen (The Noun)
                    </span>
                    <p className="font-black text-blue-950 text-base">{activePair.nomen}</p>
                    <p className="text-stone-600 text-xs">Plural: {activePair.nomenPlural}</p>
                  </div>

                  {/* Adjective Card */}
                  <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-black text-emerald-900 uppercase tracking-wider block">
                      2. Das Adjektiv (The Adjective)
                    </span>
                    <p className="font-black text-emerald-950 text-base">{activePair.adjektiv}</p>
                    <p className="text-stone-600 text-xs">Formula: "Es ist {activePair.adjektiv}."</p>
                  </div>

                  {/* Verb in Action Card */}
                  <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 space-y-1">
                    <span className="text-[10px] font-black text-purple-900 uppercase tracking-wider block">
                      3. Das Verb (Active Action)
                    </span>
                    <p className="font-black text-purple-950 text-base">{activePair.verb}</p>
                    <p className="text-stone-600 text-xs">Describes active happening</p>
                  </div>
                </div>

                {/* Example sentence */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black text-stone-500 uppercase">Live Example Sentence:</span>
                    <p className="text-sm font-black text-stone-900">{activePair.example}</p>
                  </div>
                  <button
                    onClick={() => handleSpeak(activePair.example)}
                    className="p-2 rounded-full bg-white border border-stone-300 text-sky-700 hover:bg-sky-50 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: GERMAN WEATHER FORECAST & CHAT STUDIO */}
      {activeTab === 'dialogue' && (
        <div className="space-y-6">
          {/* Dialogue Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DIALOGUES.map((d, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedDialogueIdx(idx);
                  playChime('click');
                }}
                className={`px-3 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedDialogueIdx === idx
                    ? 'bg-sky-700 text-white shadow-xs scale-102'
                    : 'bg-stone-100 text-stone-700 hover:bg-sky-100'
                }`}
              >
                {d.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Dialogue Script */}
          {(() => {
            const activeD = DIALOGUES[selectedDialogueIdx];
            return (
              <div className="bg-gradient-to-br from-sky-50 via-white to-amber-50 rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-stone-900">
                      {activeD.title}
                    </h3>
                    <p className="text-xs text-stone-500">{activeD.subtitle}</p>
                  </div>

                  <button
                    onClick={() => {
                      const fullText = activeD.lines.map((l) => `${l.speaker === 'A' ? 'Person A:' : 'Person B:'} ${l.text}`).join('. ');
                      handleSpeak(fullText);
                    }}
                    className="bg-sky-700 hover:bg-sky-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Full Conversation 🔊</span>
                  </button>
                </div>

                {/* Conversation bubbles */}
                <div className="space-y-3">
                  {activeD.lines.map((line, lIdx) => {
                    const isA = line.speaker === 'A';
                    return (
                      <div
                        key={lIdx}
                        className={`flex gap-3 items-start ${isA ? 'justify-start' : 'justify-end'}`}
                      >
                        {isA && (
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                            A
                          </div>
                        )}
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm space-y-1 shadow-xs border ${
                            isA
                              ? 'bg-blue-50/90 border-blue-200 text-blue-950 rounded-tl-none'
                              : 'bg-emerald-50/90 border-emerald-200 text-emerald-950 rounded-tr-none'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-black text-[10px] uppercase tracking-wider text-stone-500">
                              {isA ? 'Person A (Frage / Aussage)' : 'Person B (Antwort)'}
                            </span>
                            <button
                              onClick={() => handleSpeak(line.text)}
                              className="p-1 rounded-full hover:bg-white/80 text-stone-700 cursor-pointer"
                              title="Listen to this line"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="font-bold text-sm sm:text-base leading-snug">
                            {line.text}
                          </p>
                          <p className="text-xs text-stone-600 italic">
                            {line.trans}
                          </p>
                        </div>
                        {!isA && (
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                            B
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
