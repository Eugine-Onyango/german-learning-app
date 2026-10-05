import React, { useState } from 'react';
import { Volume2, Sparkles, Mail, Send, CheckCircle2, XCircle, Cake, Wine, Users, Calendar, MapPin, Clock, HeartHandshake } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson50EinladungStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('write'); // 'write', 'accept', 'decline'

  // Tab 1: Letter Composer State
  const [recipient, setRecipient] = useState('boris'); // 'boris', 'julia', 'friends'
  const [occasion, setOccasion] = useState('geburtstag'); // 'geburtstag', 'sohn', 'hochzeit', 'fest', 'essen'
  const [venue, setVenue] = useState('home'); // 'home', 'restaurant', 'park'
  const [startTime, setStartTime] = useState('18uhr'); // '18uhr', '19uhr'
  const [potluck, setPotluck] = useState('bier'); // 'bier', 'salat', 'kuchen'

  // Tab 2: Acceptance Letter State
  const [bringItem, setBringItem] = useState('bier');
  const [includePlusOne, setIncludePlusOne] = useState(true);

  // Tab 3: Decline Letter State
  const [declineReason, setDeclineReason] = useState('pruefung'); // 'pruefung', 'arbeit', 'verabredet', 'zeit'

  // Generate Letter 1: Invitation (Slide 22)
  const getSalutation = () => {
    if (recipient === 'boris') return 'Lieber Boris,';
    if (recipient === 'julia') return 'Liebe Julia,';
    return 'Liebe Freunde,';
  };

  const getOccasionText = () => {
    if (occasion === 'geburtstag') return 'ich habe am Samstag Geburtstag und möchte dich gerne einladen!';
    if (occasion === 'sohn') return 'mein Sohn hat Geburtstag und wir feiern ein schönes Fest!';
    if (occasion === 'hochzeit') return 'wir feiern unseren Hochzeitstag und möchten dich gerne dabei haben!';
    if (occasion === 'fest') return 'wir machen ein Fest und laden dich herzlich ein!';
    return 'ich möchte dich herzlich zum Essen einladen!';
  };

  const getVenueText = () => {
    if (venue === 'home') return 'Der Treffpunkt ist bei uns zu Hause.';
    if (venue === 'restaurant') return 'Wir treffen uns im Restaurant Marienhof.';
    return 'Der Treffpunkt ist im Park am See.';
  };

  const getStartTimeText = () => {
    if (startTime === '18uhr') return 'Die Party beginnt um 18 Uhr.';
    return 'Wir fangen um 19 Uhr an.';
  };

  const getPotluckText = () => {
    if (potluck === 'bier') return 'Kannst du vielleicht Bier mitbringen?';
    if (potluck === 'salat') return 'Kannst du einen leckeren Salat mitbringen?';
    return 'Kannst du einen Kuchen mitbringen?';
  };

  const fullInvitationLetter = `${getSalutation()}\n\n${getOccasionText()} ${getVenueText()} ${getStartTimeText()} ${getPotluckText()} Hoffentlich hast du Zeit!\n\nViele Grüße\nMonika.`;

  // Generate Letter 2: Acceptance (Slide 30)
  const fullAcceptanceLetter = `Liebe Monika,\n\nvielen Dank für deine Einladung. Ich freue mich schon sehr auf Samstag und komme sehr gern. Ich bringe auch ${bringItem === 'bier' ? 'Bier' : bringItem === 'kuchen' ? 'einen Kuchen' : 'einen Salat'} mit. Für wie viele Personen? ${includePlusOne ? 'Kann meine Freundin auch mitkommen?' : 'Ich freue mich auf euch!'}\n\nViele Grüße und bis Samstag,\nBoris.`;

  // Generate Letter 3: Decline (Slide 31-36)
  const getDeclineExcuse = () => {
    if (declineReason === 'pruefung') return 'Ich habe am Montag eine wichtige Prüfung.';
    if (declineReason === 'arbeit') return 'Am Samstag muss ich leider arbeiten.';
    if (declineReason === 'verabredet') return 'Ich bin am Samstag leider schon verabredet.';
    return 'Ich habe leider keine Zeit und viel zu tun.';
  };

  const fullDeclineLetter = `Liebe Monika,\n\nvielen Dank für deine Einladung! Es tut mir sehr leid, aber ich kann leider nicht kommen. ${getDeclineExcuse()} Ich wünsche dir und deinen Gästen viel Spaß auf der Party! Hoffentlich sehen wir uns bald.\n\nViele Grüße und bis bald,\nBoris.`;

  const handleSpeak = (text) => {
    playChime('click');
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-sm border border-rose-100 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
            ✉️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Einladung Studio
              </h2>
              <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Lesson 50
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Compose Invitations (Anrede ➔ Textteil ➔ Grußformel), RSVP Yes with Plus-Ones & Polite Declines
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl gap-1 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('write');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'write'
                ? 'bg-white text-rose-800 shadow-xs ring-1 ring-rose-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ✉️ 1. Write Invitation (Slide 22)
          </button>
          <button
            onClick={() => {
              setActiveTab('accept');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'accept'
                ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🟢 2. Zusagen (Accept - Slide 30)
          </button>
          <button
            onClick={() => {
              setActiveTab('decline');
              playChime('click');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'decline'
                ? 'bg-white text-rose-800 shadow-xs ring-1 ring-rose-300 font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🔴 3. Absagen (Decline - Slide 32)
          </button>
        </div>
      </div>

      {/* TAB 1: WRITE AN INVITATION LETTER */}
      {activeTab === 'write' && (
        <div className="space-y-6">
          {/* Anatomy Blueprint Banner (Slide 6) */}
          <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 text-xs sm:text-sm text-stone-700 flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="font-black text-rose-950 flex items-center gap-1.5">
                <span>📜</span> Slide 6 Brief-Bauplan:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-md">
                  1. Anrede (Lieber Boris,)
                </span>
                <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                  2. Textteil (Occasion, Time, Venue, Potluck)
                </span>
                <span className="bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-md">
                  3. Grußformel & Unterschrift (Viele Grüße, Monika)
                </span>
              </div>
            </div>
            <span className="text-[11px] text-rose-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-rose-200">
              💡 Tip: Lowercase start after comma!
            </span>
          </div>

          {/* Rendered Letter Card */}
          <div className="relative bg-gradient-to-br from-amber-50 via-rose-50/30 to-amber-50/50 p-6 sm:p-8 rounded-3xl border-2 border-rose-200 shadow-md space-y-4 font-serif">
            <div className="flex items-center justify-between border-b border-rose-200 pb-3 font-sans">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💌</span>
                <span className="text-xs font-black uppercase text-rose-900 tracking-wider">
                  Die Einladungskarte (Slide 22 Blueprint)
                </span>
              </div>
              <button
                onClick={() => handleSpeak(fullInvitationLetter)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-sans font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Full Letter 🔊</span>
              </button>
            </div>

            {/* Letter Content Display */}
            <div className="space-y-3 text-stone-800 text-sm sm:text-base leading-relaxed">
              <p className="font-bold text-rose-900 text-lg">{getSalutation()}</p>
              <p>
                {getOccasionText()} {getVenueText()} {getStartTimeText()} {getPotluckText()}{' '}
                <span className="font-bold text-rose-950">Hoffentlich hast du Zeit!</span>
              </p>
              <div className="pt-2 text-stone-700">
                <p>Viele Grüße</p>
                <p className="font-bold text-rose-900 text-lg">Monika.</p>
              </div>
            </div>
          </div>

          {/* Interactive Letter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {/* 1. Recipient */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-black text-stone-700 uppercase block">1. Anrede</span>
              <div className="space-y-1">
                {[
                  { id: 'boris', label: '👨 Lieber Boris,', eng: 'Dear Boris (Male)' },
                  { id: 'julia', label: '👩 Liebe Julia,', eng: 'Dear Julia (Female)' },
                  { id: 'friends', label: '👥 Liebe Freunde,', eng: 'Dear Friends (Plural)' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRecipient(r.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      recipient === r.id
                        ? 'bg-rose-700 text-white font-bold border-rose-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
                    }`}
                  >
                    <div className="font-bold">{r.label}</div>
                    <div className={`text-[10px] ${recipient === r.id ? 'text-rose-200' : 'text-stone-500'}`}>
                      {r.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Occasion */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-black text-stone-700 uppercase block">2. Anlass (Occasion)</span>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {[
                  { id: 'geburtstag', label: '🎂 Geburtstag', eng: 'My birthday' },
                  { id: 'sohn', label: '👶 Sohn hat Geburtstag', eng: "Son's birthday" },
                  { id: 'hochzeit', label: '💍 Hochzeitstag', eng: 'Anniversary' },
                  { id: 'fest', label: '🎉 Ein Fest machen', eng: 'Having a party' },
                  { id: 'essen', label: '🍽️ Zum Essen einladen', eng: 'Invite to dinner' }
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOccasion(o.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      occasion === o.id
                        ? 'bg-rose-700 text-white font-bold border-rose-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
                    }`}
                  >
                    <div className="font-bold">{o.label}</div>
                    <div className={`text-[10px] ${occasion === o.id ? 'text-rose-200' : 'text-stone-500'}`}>
                      {o.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Venue */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-black text-stone-700 uppercase block">3. Treffpunkt (Venue)</span>
              <div className="space-y-1">
                {[
                  { id: 'home', label: '🏡 Zu Hause', eng: 'At our home' },
                  { id: 'restaurant', label: '🍽️ Im Restaurant', eng: 'Restaurant Marienhof' },
                  { id: 'park', label: '🌳 Im Park', eng: 'At the park' }
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setVenue(v.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      venue === v.id
                        ? 'bg-rose-700 text-white font-bold border-rose-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
                    }`}
                  >
                    <div className="font-bold">{v.label}</div>
                    <div className={`text-[10px] ${venue === v.id ? 'text-rose-200' : 'text-stone-500'}`}>
                      {v.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Start Time */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-black text-stone-700 uppercase block">4. Beginn (Time)</span>
              <div className="space-y-1">
                {[
                  { id: '18uhr', label: '⏰ 18:00 Uhr', eng: 'Die Party beginnt um 18' },
                  { id: '19uhr', label: '⏰ 19:00 Uhr', eng: 'Wir fangen um 19 an' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setStartTime(t.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      startTime === t.id
                        ? 'bg-rose-700 text-white font-bold border-rose-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
                    }`}
                  >
                    <div className="font-bold">{t.label}</div>
                    <div className={`text-[10px] ${startTime === t.id ? 'text-rose-200' : 'text-stone-500'}`}>
                      {t.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Potluck Request */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-black text-stone-700 uppercase block">5. Mitbringen?</span>
              <div className="space-y-1">
                {[
                  { id: 'bier', label: '🍺 Bier', eng: 'Bier mitbringen' },
                  { id: 'salat', label: '🥗 Salat', eng: 'Einen Salat mitbringen' },
                  { id: 'kuchen', label: '🍰 Kuchen', eng: 'Einen Kuchen mitbringen' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPotluck(p.id);
                      playChime('click');
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      potluck === p.id
                        ? 'bg-rose-700 text-white font-bold border-rose-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
                    }`}
                  >
                    <div className="font-bold">{p.label}</div>
                    <div className={`text-[10px] ${potluck === p.id ? 'text-rose-200' : 'text-stone-500'}`}>
                      {p.eng}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACCEPTANCE REPLY (SLIDE 30) */}
      {activeTab === 'accept' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-stone-700 space-y-1">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm sm:text-base">
              <span>🟢</span> Slide 30 Master Reply: Zusagen mit Vorfreude & Mitbringsel
            </p>
            <p className="text-stone-600">
              When accepting an invitation in German: 1. Thank the host (<em>Vielen Dank für deine Einladung</em>), 2. Express excitement (<em>Ich freue mich schon auf Samstag</em>), 3. Offer food/drink contribution, 4. Inquire about plus-ones (<em>Kann meine Freundin mitkommen?</em>).
            </p>
          </div>

          {/* Rendered Acceptance Letter */}
          <div className="bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 p-6 sm:p-8 rounded-3xl border-2 border-emerald-300 shadow-md space-y-4 font-serif">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span className="text-xs font-black uppercase text-emerald-900 tracking-wider">
                  Die Zusage (Boris's Acceptance Reply - Slide 30)
                </span>
              </div>
              <button
                onClick={() => handleSpeak(fullAcceptanceLetter)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Acceptance 🔊</span>
              </button>
            </div>

            <div className="space-y-3 text-stone-800 text-sm sm:text-base leading-relaxed">
              <p className="font-bold text-emerald-950 text-lg">Liebe Monika,</p>
              <p>
                vielen Dank für deine Einladung. Ich freue mich schon sehr auf Samstag und komme sehr gern.
                Ich bringe auch <span className="font-bold text-emerald-900">{bringItem === 'bier' ? 'Bier' : bringItem === 'kuchen' ? 'einen Kuchen' : 'einen Salat'}</span> mit. Für wie viele Personen?{' '}
                {includePlusOne && (
                  <span className="font-bold text-emerald-950">Kann meine Freundin auch mitkommen?</span>
                )}
              </p>
              <div className="pt-2 text-stone-700">
                <p>Viele Grüße und bis Samstag,</p>
                <p className="font-bold text-emerald-950 text-lg">Boris.</p>
              </div>
            </div>
          </div>

          {/* Acceptance Customization Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-black text-stone-700 uppercase">Potluck Contribution:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bier', label: '🍺 Bier' },
                  { id: 'kuchen', label: '🍰 Kuchen' },
                  { id: 'salat', label: '🥗 Salat' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setBringItem(item.id);
                      playChime('click');
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                      bringItem === item.id
                        ? 'bg-emerald-700 text-white border-emerald-800'
                        : 'bg-stone-50 border-stone-200 hover:bg-emerald-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-black text-stone-700 uppercase">Companion Query:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIncludePlusOne(true);
                    playChime('click');
                  }}
                  className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                    includePlusOne
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-stone-50 border-stone-200 hover:bg-emerald-50'
                  }`}
                >
                  👫 +1: Kann Freundin mitkommen?
                </button>
                <button
                  onClick={() => {
                    setIncludePlusOne(false);
                    playChime('click');
                  }}
                  className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                    !includePlusOne
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-stone-50 border-stone-200 hover:bg-emerald-50'
                  }`}
                >
                  🙋‍♂️ Solo: Ich freue mich auf euch!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DECLINE REPLY (SLIDES 31-36) */}
      {activeTab === 'decline' && (
        <div className="space-y-6">
          <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-200 text-xs sm:text-sm text-stone-700 space-y-1">
            <p className="font-bold text-rose-950 flex items-center gap-1.5 text-sm sm:text-base">
              <span>🔴</span> Slides 31–36: Höfliche Absage mit guten Wünschen
            </p>
            <p className="text-stone-600">
              When declining in German: 1. Say thank you (<em>Danke für die Einladung</em>), 2. Apologize (<em>Es tut mir sehr leid, aber ich kann leider nicht kommen</em>), 3. State a valid reason, 4. Wish the host a great party (<em>Viel Spaß auf der Party!</em>), 5. Hope to meet soon (<em>Hoffentlich sehen wir uns bald!</em>).
            </p>
          </div>

          {/* Rendered Decline Letter */}
          <div className="bg-gradient-to-br from-rose-50/50 via-white to-amber-50/40 p-6 sm:p-8 rounded-3xl border-2 border-rose-300 shadow-md space-y-4 font-serif">
            <div className="flex items-center justify-between border-b border-rose-200 pb-3 font-sans">
              <div className="flex items-center gap-2">
                <XCircle className="w-6 h-6 text-rose-600" />
                <span className="text-xs font-black uppercase text-rose-900 tracking-wider">
                  Die Absage (Polite Decline - Slides 31–36)
                </span>
              </div>
              <button
                onClick={() => handleSpeak(fullDeclineLetter)}
                className="bg-rose-700 hover:bg-rose-800 text-white font-sans font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Decline 🔊</span>
              </button>
            </div>

            <div className="space-y-3 text-stone-800 text-sm sm:text-base leading-relaxed">
              <p className="font-bold text-rose-950 text-lg">Liebe Monika,</p>
              <p>
                vielen Dank für deine Einladung! Es tut mir sehr leid, aber ich kann leider nicht kommen.{' '}
                <span className="font-bold text-rose-950">{getDeclineExcuse()}</span> Ich wünsche dir und deinen Gästen viel Spaß auf der Party! Hoffentlich sehen wir uns bald.
              </p>
              <div className="pt-2 text-stone-700">
                <p>Viele Grüße und bis bald,</p>
                <p className="font-bold text-rose-950 text-lg">Boris.</p>
              </div>
            </div>
          </div>

          {/* Reason Selector */}
          <div className="space-y-2">
            <span className="text-xs font-black text-stone-700 uppercase tracking-wider block">
              Select Polite Reason / Obligation (Slides 33–34):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs sm:text-sm">
              {[
                { id: 'pruefung', label: '📚 Prüfung am Montag', full: 'Ich habe am Montag eine wichtige Prüfung.' },
                { id: 'arbeit', label: '💼 Muss arbeiten', full: 'Am Samstag muss ich leider arbeiten.' },
                { id: 'verabredet', label: '🔒 Schon verabredet', full: 'Ich bin am Samstag leider schon verabredet.' },
                { id: 'zeit', label: '⏳ Keine Zeit / viel zu tun', full: 'Ich habe leider keine Zeit und viel zu tun.' }
              ].map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => {
                    setDeclineReason(reason.id);
                    playChime('click');
                  }}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    declineReason === reason.id
                      ? 'bg-rose-700 text-white font-bold border-rose-800 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
                  }`}
                >
                  <div className="font-bold">{reason.label}</div>
                  <div className={`text-[11px] mt-1 ${declineReason === reason.id ? 'text-rose-200' : 'text-stone-500'}`}>
                    "{reason.full}"
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
