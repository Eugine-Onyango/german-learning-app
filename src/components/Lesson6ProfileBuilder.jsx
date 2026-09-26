import React, { useState } from 'react';
import { Volume2, Sparkles, User, MapPin, Briefcase, Heart, Baby, Tv, CheckCircle2, RotateCcw } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson6ProfileBuilder({ isSlowMode }) {
  const [firstName, setFirstName] = useState('Monika');
  const [surname, setSurname] = useState('Schmidt');
  const [origin, setOrigin] = useState('Deutschland');
  const [residence, setResidence] = useState('Berlin');
  const [age, setAge] = useState(23);
  const [gender, setGender] = useState('female'); // 'male' or 'female'
  const [profession, setProfession] = useState('student'); // 'student', 'lehrer', 'schueler'
  const [maritalStatus, setMaritalStatus] = useState('ledig'); // 'ledig' or 'verheiratet'
  const [children, setChildren] = useState('one'); // 'none', 'one', 'two'
  const [isSpeakingFull, setIsSpeakingFull] = useState(false);

  // Compute job title by gender
  const getJobTitle = () => {
    if (profession === 'student') return gender === 'female' ? 'Studentin' : 'Student';
    if (profession === 'lehrer') return gender === 'female' ? 'Lehrerin' : 'Lehrer';
    return gender === 'female' ? 'Schülerin' : 'Schüler';
  };

  // Compute children text
  const getChildrenText = () => {
    if (children === 'none') return 'Ich habe keine Kinder.';
    if (children === 'one') return 'Ich habe ein Kind.';
    return 'Ich habe zwei Kinder.';
  };

  // Full introduction script
  const fullIntroParagraph = `Hallo! Ich heiße ${firstName} ${surname}. Ich komme aus ${origin}. Ich wohne in ${residence}. Ich spreche Deutsch und Englisch. Ich bin ${age} Jahre alt. Ich bin ${getJobTitle()}. Ich bin ${maritalStatus}. ${getChildrenText()} Meine Hobbys sind fernsehen und Musik hören.`;

  const handleSpeakFull = () => {
    playChime('click');
    setIsSpeakingFull(true);
    speakGerman(fullIntroParagraph, isSlowMode, null, () => {
      setIsSpeakingFull(false);
    });
  };

  const handleSpeakLine = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 border-2 border-sky-300 rounded-3xl p-5 sm:p-6 shadow-xs text-center">
        <div className="text-3xl mb-1 animate-gentle-bounce">🤝 🆔 ✨</div>
        <h2 className="text-2xl sm:text-3xl font-black text-sky-950">
          Lesson 6: Sich Vorstellen (Introducing Yourself)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 leading-relaxed">
          Introduce who you are in German with zero stress!  
          Customize the interactive passport profile below with your own details, watch the fluent German sentence build live, and tap to hear it spoken!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border-3 border-stone-200 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-black text-stone-900 text-sm sm:text-base flex items-center gap-2">
              <span>✍️</span>
              <span>Customize Your Profile</span>
            </h3>
            <button
              onClick={() => {
                setFirstName('Monika');
                setSurname('Schmidt');
                setOrigin('Deutschland');
                setResidence('Berlin');
                setAge(23);
                setGender('female');
                setProfession('student');
                setMaritalStatus('ledig');
                setChildren('one');
                playChime('click');
              }}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Slide Example</span>
            </button>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                First Name (Vorname):
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Surname (Familienname):
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Origin & Residence */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                From (komme aus):
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold outline-none bg-white"
              >
                <option value="Deutschland">Deutschland (Germany)</option>
                <option value="Kenia">Kenia (Kenya)</option>
                <option value="Schweiz">Schweiz (Switzerland)</option>
                <option value="Österreich">Österreich (Austria)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Live in (wohne in):
              </label>
              <select
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold outline-none bg-white"
              >
                <option value="Berlin">Berlin</option>
                <option value="München">München (Munich)</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
              </select>
            </div>
          </div>

          {/* Age Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-stone-600 mb-1">
              <span>Age (Jahre alt):</span>
              <span className="text-amber-800 font-mono font-black">{age} Jahre alt</span>
            </div>
            <input
              type="range"
              min="5"
              max="90"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Gender & Profession (-in Rule!) */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700">Gender & Title Rule:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Women add '-in'!
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gender === 'female'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                👩 Female (-in)
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gender === 'male'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                👨 Male
              </button>
            </div>

            {/* Profession buttons */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[
                { id: 'student', label: gender === 'female' ? 'Studentin' : 'Student', sub: 'College' },
                { id: 'lehrer', label: gender === 'female' ? 'Lehrerin' : 'Lehrer', sub: 'Teacher' },
                { id: 'schueler', label: gender === 'female' ? 'Schülerin' : 'Schüler', sub: 'School' },
              ].map((job) => (
                <button
                  key={job.id}
                  onClick={() => setProfession(job.id)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                    profession === job.id
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <div>{job.label}</div>
                  <div className="text-[10px] text-stone-400 font-normal">{job.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Marital Status & Children */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100">
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Status:
              </label>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setMaritalStatus('ledig')}
                  className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    maritalStatus === 'ledig' ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  ledig (single)
                </button>
                <button
                  onClick={() => setMaritalStatus('verheiratet')}
                  className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    maritalStatus === 'verheiratet' ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  verheiratet
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Children:
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'none', label: 'keine' },
                  { id: 'one', label: '1 Kind' },
                  { id: 'two', label: '2 Kinder' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setChildren(c.id)}
                    className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      children === c.id ? 'bg-indigo-600 text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live German Passport Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="bg-stone-900 text-white rounded-3xl p-6 border-4 border-stone-800 shadow-2xl relative overflow-hidden flex-1">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇩🇪</span>
                <div>
                  <h4 className="font-mono font-black text-amber-400 text-sm tracking-wider uppercase">
                    German Profile Badge (Ausweis)
                  </h4>
                  <span className="text-[10px] text-stone-400">sich vorstellen (introducing yourself)</span>
                </div>
              </div>
              <span className="text-3xl">
                {gender === 'female' ? '👩‍🎓' : '👨‍🎓'}
              </span>
            </div>

            {/* Structured introduction lines with individual audio clickers */}
            <div className="space-y-2.5 text-xs sm:text-sm font-sans">
              <div
                onClick={() => handleSpeakLine(`Ich heiße ${firstName} ${surname}.`)}
                className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">Name (3 ways: Ich heiße / Ich bin / Mein Name ist):</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">
                    Ich heiße {firstName} {surname}.
                  </span>
                </div>
                <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-300 flex-shrink-0" />
              </div>

              <div
                onClick={() => handleSpeakLine(`Ich komme aus ${origin} und ich wohne in ${residence}.`)}
                className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">Origin & Residence:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    Ich komme aus <strong className="text-emerald-400">{origin}</strong>. Ich wohne in <strong className="text-sky-400">{residence}</strong>.
                  </span>
                </div>
                <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-300 flex-shrink-0" />
              </div>

              <div
                onClick={() => handleSpeakLine("Ich spreche Deutsch und Englisch.")}
                className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">Languages:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    Ich spreche Deutsch und Englisch.
                  </span>
                </div>
                <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-300 flex-shrink-0" />
              </div>

              <div
                onClick={() => handleSpeakLine(`Ich bin ${age} Jahre alt und ich bin ${getJobTitle()}.`)}
                className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">Age & Occupation:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    Ich bin {age} Jahre alt. Ich bin <strong className="text-amber-300">{getJobTitle()}</strong>.
                  </span>
                </div>
                <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-300 flex-shrink-0" />
              </div>

              <div
                onClick={() => handleSpeakLine(`Ich bin ${maritalStatus}. ${getChildrenText()}`)}
                className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">Status & Family:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    Ich bin {maritalStatus}. {getChildrenText()}
                  </span>
                </div>
                <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-300 flex-shrink-0" />
              </div>

              <div
                onClick={() => handleSpeakLine("Meine Hobbys sind fernsehen und Musik hören.")}
                className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">Hobbies:</span>
                  <span className="font-mono font-bold text-amber-200 text-sm">
                    Meine Hobbys sind fernsehen und Musik hören.
                  </span>
                </div>
                <Volume2 className="w-4 h-4 text-stone-400 group-hover:text-amber-300 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Master Speak Button */}
          <button
            onClick={handleSpeakFull}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98 ${
              isSpeakingFull
                ? 'bg-amber-400 text-stone-950 animate-pulse ring-4 ring-amber-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>{isSpeakingFull ? 'Speaking Entire Self-Introduction...' : '🗣️ Speak My Complete Introduction in German!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
