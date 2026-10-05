import React, { useState } from 'react';
import { Volume2, Sparkles, Check, ArrowRight, Building2, ShoppingBag, Eye, Shirt, Compass, Layers, CheckCircle2, RotateCcw } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson54KaufhausStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('directory'); // 'directory', 'dialogue', 'pronouns'

  // Tab 1: Directory State
  const [selectedFloor, setSelectedFloor] = useState('1og');

  // Tab 2: Dialogue Builder State
  const [dialogueStep, setDialogueStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState('hose');
  const [selectedOccasion, setSelectedOccasion] = useState('buero');
  const [selectedFeedback, setSelectedFeedback] = useState('positive');
  const [selectedSize, setSelectedSize] = useState('38');
  const [selectedFit, setSelectedFit] = useState('perfect');

  // Tab 3: Pronoun Trainer State
  const [pronounItemKey, setPronounItemKey] = useState('hose');

  const departmentData = {
    ug: {
      floor: "Untergeschoss (UG)",
      title: "Basement / Lower Level",
      icon: "🛒",
      color: "amber",
      departments: [
        { de: "die Lebensmittelabteilung", en: "Grocery & Gourmet Food section", items: "Kaffee, Schokolade, Käse, Obst" },
        { de: "das Parkhaus", en: "Underground Parking Garage", items: "Parkplätze, Fahrstuhl" }
      ],
      samplePhrase: {
        de: "Wo ist die Lebensmittelabteilung? — Im Untergeschoss!",
        en: "Where is the grocery section? — In the basement!"
      }
    },
    eg: {
      floor: "Erdgeschoss (EG)",
      title: "Ground Floor",
      icon: "💄",
      color: "pink",
      departments: [
        { de: "die Frauenabteilung (Damenmode)", en: "Women's Department", items: "Kleider, Blusen, Röcke, Schals" },
        { de: "die Kosmetikabteilung", en: "Cosmetics & Perfumes", items: "Parfüm, Make-up, Cremes" },
        { de: "die Taschen & Accessoires", en: "Bags & Accessories", items: "Handtaschen, Uhren, Gürtel" }
      ],
      samplePhrase: {
        de: "Guten Tag, wo finde ich Damenmode? — Gleich hier im Erdgeschoss!",
        en: "Hello, where do I find women's fashion? — Right here on the ground floor!"
      }
    },
    '1og': {
      floor: "1. Obergeschoss (1. OG)",
      title: "1st Floor (Men & Shoes)",
      icon: "👔",
      color: "blue",
      departments: [
        { de: "die Männerabteilung (Herrenmode)", en: "Men's Department", items: "Anzüge, Hemden, Hosen, Pullover, Mäntel" },
        { de: "die Schuhabteilung", en: "Shoe Department", items: "Lederschuhe, Sneaker, Stiefel" },
        { de: "die Umkleidekabinen", en: "Fitting Rooms", items: "Spiegel, Vorhänge, Hocker" }
      ],
      samplePhrase: {
        de: "Entschuldigung, wo ist die Männerabteilung? — Im ersten Stock, da hinten rechts.",
        en: "Excuse me, where is the men's department? — On the 1st floor, back there on the right."
      }
    },
    '2og': {
      floor: "2. Obergeschoss (2. OG)",
      title: "2nd Floor (Kids & Toys)",
      icon: "🧸",
      color: "emerald",
      departments: [
        { de: "die Kinderabteilung & Babyabteilung", en: "Children's & Baby Department", items: "Kinderkleidung, Babybodys, Mützen" },
        { de: "die Spielwarenabteilung", en: "Toys & Games", items: "Puzzles, Teddys, Bücher" }
      ],
      samplePhrase: {
        de: "Wo finde ich Kleidung für mein Baby? — In der Babyabteilung im 2. Obergeschoss.",
        en: "Where do I find clothing for my baby? — In the baby section on the 2nd floor."
      }
    }
  };

  const shoppingItems = {
    hose: { name: "eine Hose", gender: "feminin", article: "die Hose", icon: "👖", pronoun: "die / sie", price: "49 Euro" },
    hemd: { name: "ein Hemd", gender: "neutrum", article: "das Hemd", icon: "👔", pronoun: "das / es", price: "39 Euro" },
    mantel: { name: "einen Mantel", gender: "maskulin", article: "der Mantel", icon: "🧥", pronoun: "der / er", price: "89 Euro" },
    tasche: { name: "eine Tasche", gender: "feminin", article: "die Tasche", icon: "👜", pronoun: "die / sie", price: "29 Euro" },
    schuhe: { name: "Schuhe", gender: "plural", article: "die Schuhe", icon: "👞", pronoun: "die / sie", price: "59 Euro" }
  };

  const occasions = {
    buero: { de: "für das Büro", en: "for the office / work" },
    party: { de: "für eine Party", en: "for a party" },
    hochzeit: { de: "für eine Hochzeit", en: "for a wedding" },
    vater: { de: "für meinen Vater", en: "for my father" },
    mich: { de: "für mich", en: "for myself" }
  };

  const pronounMatrixData = {
    hose: {
      item: "die Hose",
      gender: "Feminin (die)",
      icon: "👖",
      questionDe: "Gefällt Ihnen diese Hose hier?",
      questionEn: "Do you like this pair of pants here?",
      replyPosDe: "Ja, die gefällt mir sehr gut! (oder: sie gefällt mir)",
      replyPosEn: "Yes, I like this one / it very much!",
      costDe: "Was kostet sie?",
      costEn: "What does it cost?",
      pronounDemo: "die Hose ➔ diese ➔ die / sie",
      color: "pink"
    },
    pullover: {
      item: "der Pullover",
      gender: "Maskulin (der)",
      icon: "🧥",
      questionDe: "Gefällt Ihnen dieser Pullover hier?",
      questionEn: "Do you like this sweater here?",
      replyPosDe: "Ja, der gefällt mir sehr! (oder: er gefällt mir)",
      replyPosEn: "Yes, I like this one / it very much!",
      costDe: "Was kostet er?",
      costEn: "What does it cost?",
      pronounDemo: "der Pullover ➔ dieser ➔ der / er",
      color: "blue"
    },
    hemd: {
      item: "das Hemd",
      gender: "Neutrum (das)",
      icon: "👔",
      questionDe: "Gefällt Ihnen dieses Hemd hier?",
      questionEn: "Do you like this shirt here?",
      replyPosDe: "Ja, das gefällt mir gut! (oder: es gefällt mir)",
      replyPosEn: "Yes, I like this one / it well!",
      costDe: "Was kostet es?",
      costEn: "What does it cost?",
      pronounDemo: "das Hemd ➔ dieses ➔ das / es",
      color: "emerald"
    },
    schuhe: {
      item: "die Schuhe",
      gender: "Plural (die)",
      icon: "👞",
      questionDe: "Gefallen Ihnen diese Schuhe hier?",
      questionEn: "Do you like these shoes here?",
      replyPosDe: "Ja, die gefallen mir! (oder: sie gefallen mir)",
      replyPosEn: "Yes, I like these / them!",
      costDe: "Was kosten sie?",
      costEn: "What do they cost?",
      pronounDemo: "die Schuhe (pl.) ➔ diese ➔ die / sie (gefallen)",
      color: "purple"
    }
  };

  const handleSpeak = (text) => {
    speakGerman(text, isSlowMode);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-indigo-500 to-sky-500 text-white rounded-2xl shadow-md text-2xl">
              🏬
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                Im Kaufhaus — Department Store Studio
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Master floor directories, customer & sales dialogues, fitting room checks, sizing, and Slide 36 pronouns!
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'directory'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            1. Floor Directory
          </button>
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'dialogue'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            2. Shopping Dialogue
          </button>
          <button
            onClick={() => setActiveTab('pronouns')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'pronouns'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            3. Slide 36 Pronouns
          </button>
        </div>
      </div>

      {/* TAB 1: Department Store Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">🏬</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                The German Department Store (das Kaufhaus / das Warenhaus)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In Germany, department stores are organized by floor levels (<strong>EG</strong> = Erdgeschoss, <strong>UG</strong> = Untergeschoss, <strong>OG</strong> = Obergeschoss / Stock). Click each floor to inspect its departments and listen to how to ask directions!
              </p>
            </div>
          </div>

          {/* Floor Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(departmentData).map((fKey) => {
              const f = departmentData[fKey];
              const isSelected = selectedFloor === fKey;
              return (
                <button
                  key={fKey}
                  onClick={() => {
                    setSelectedFloor(fKey);
                    playChime();
                  }}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{f.icon}</span>
                    <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {fKey.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm md:text-base">{f.floor}</div>
                    <div className="text-xs text-slate-500">{f.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Floor Inspection */}
          {selectedFloor && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{departmentData[selectedFloor].icon}</span>
                  <div>
                    <h4 className="text-xl font-black text-slate-800">
                      {departmentData[selectedFloor].floor} — {departmentData[selectedFloor].title}
                    </h4>
                    <p className="text-slate-500 text-xs">Explore departments and clothing collections on this floor</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSpeak(departmentData[selectedFloor].samplePhrase.de)}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen: Floor Dialogue
                </button>
              </div>

              {/* Department Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentData[selectedFloor].departments.map((dept, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-indigo-300 transition-all cursor-pointer group"
                    onClick={() => handleSpeak(dept.de)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                        {dept.de}
                      </span>
                      <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    </div>
                    <div className="text-xs font-medium text-slate-600">{dept.en}</div>
                    <div className="text-[11px] bg-slate-50 p-2 rounded-lg text-slate-500">
                      <span className="font-semibold text-slate-700">Find here: </span>
                      {dept.items}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dialogue Box */}
              <div className="bg-indigo-900 text-white p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-indigo-200 text-xs font-bold uppercase tracking-wider">
                  <span>How to ask where this is (Wegbeschreibung im Kaufhaus)</span>
                  <button
                    onClick={() => handleSpeak(departmentData[selectedFloor].samplePhrase.de)}
                    className="hover:text-white flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Play Audio
                  </button>
                </div>
                <div className="text-base md:text-lg font-bold text-amber-300">
                  {departmentData[selectedFloor].samplePhrase.de}
                </div>
                <div className="text-xs text-indigo-200">
                  {departmentData[selectedFloor].samplePhrase.en}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Shopping Dialogue Builder */}
      {activeTab === 'dialogue' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">🛍️</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                Interactive Department Store Roleplay Simulator
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Step through a realistic 5-stage boutique dialogue from greeting to fitting room and checkout. Select options below to customize your conversation!
              </p>
            </div>
          </div>

          {/* Stepper Header */}
          <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => {
                  setDialogueStep(stepNum);
                  playChime();
                }}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  dialogueStep === stepNum
                    ? 'bg-indigo-600 text-white shadow-md'
                    : dialogueStep > stepNum
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <span>Stage {stepNum}</span>
                {dialogueStep > stepNum && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            ))}
          </div>

          {/* Dialogue Stage Content */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
            {/* Stage 1: Greeting & Request */}
            {dialogueStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm">Stage 1</span>
                    Greeting & Request (Guten Tag, Sie wünschen?)
                  </h4>
                  <span className="text-xs text-slate-500">Slides 12–21</span>
                </div>

                {/* Salesperson bubble */}
                <div className="bg-white p-4 rounded-2xl border-l-4 border-indigo-500 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-indigo-600 font-bold">
                    <span>👩‍💼 Verkäuferin (Salesperson)</span>
                    <button
                      onClick={() => handleSpeak("Guten Tag, Sie wünschen? Kann ich Ihnen helfen?")}
                      className="text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-base font-bold text-slate-800">
                    "Guten Tag, Sie wünschen? Kann ich Ihnen helfen?"
                  </p>
                  <p className="text-xs text-slate-500">Good day, what would you like? Can I help you?</p>
                </div>

                {/* Customizer Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">What are you looking for?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(shoppingItems).map((key) => {
                        const it = shoppingItems[key];
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setSelectedItem(key);
                              playChime();
                            }}
                            className={`p-2.5 rounded-xl text-left border text-xs font-bold flex items-center gap-2 transition-all ${
                              selectedItem === key
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span>{it.icon}</span>
                            <span>{it.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">For which occasion?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(occasions).map((occKey) => {
                        const occ = occasions[occKey];
                        return (
                          <button
                            key={occKey}
                            onClick={() => {
                              setSelectedOccasion(occKey);
                              playChime();
                            }}
                            className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                              selectedOccasion === occKey
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="truncate">{occ.de}</div>
                            <div className="text-[10px] text-slate-500 font-normal truncate">{occ.en}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Customer Response Preview */}
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-bold">
                    <span>🛍️ Sie als Kunde (Your German Response)</span>
                    <button
                      onClick={() => handleSpeak(`Ich suche ${shoppingItems[selectedItem].name} ${occasions[selectedOccasion].de}.`)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1.5 transition-all text-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                  <div className="text-base md:text-lg font-black text-emerald-950">
                    "Ich suche {shoppingItems[selectedItem].name} {occasions[selectedOccasion].de}."
                  </div>
                  <div className="text-xs text-emerald-700">
                    Also valid: <em>"Ich brauche..."</em> or <em>"Ich hätte gern..."</em>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setDialogueStep(2);
                      playChime();
                    }}
                    className="px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    Next: Sales Suggestion <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 2: Suggestion & Opinion */}
            {dialogueStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm">Stage 2</span>
                    Sales Recommendation & Customer Opinion
                  </h4>
                  <span className="text-xs text-slate-500">Slides 23–29</span>
                </div>

                {/* Salesperson proposal */}
                <div className="bg-white p-4 rounded-2xl border-l-4 border-indigo-500 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-indigo-600 font-bold">
                    <span>👩‍💼 Verkäuferin (Shows you an item)</span>
                    <button
                      onClick={() => handleSpeak(`Gefällt Ihnen diese hier? Wie finden Sie diese ${shoppingItems[selectedItem].article}?`)}
                      className="text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-base font-bold text-slate-800">
                    "Gefällt Ihnen diese hier? Wie finden Sie {shoppingItems[selectedItem].article} hier?"
                  </p>
                  <p className="text-xs text-slate-500">Do you like this one here? How do you like this one?</p>
                </div>

                {/* Pick reaction */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Choose your customer reaction:</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        setSelectedFeedback('positive');
                        playChime();
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        selectedFeedback === 'positive'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-sm text-emerald-700 flex items-center gap-1.5">
                        👍 Positive Fit
                      </div>
                      <div className="text-xs text-slate-600 mt-1">"Diese gefällt mir sehr gut!"</div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFeedback('color');
                        playChime();
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        selectedFeedback === 'color'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-sm text-amber-700 flex items-center gap-1.5">
                        🎨 Wrong Color
                      </div>
                      <div className="text-xs text-slate-600 mt-1">"Die Farbe gefällt mir nicht. Haben Sie eine andere Farbe?"</div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFeedback('style');
                        playChime();
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        selectedFeedback === 'style'
                          ? 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-sm text-rose-700 flex items-center gap-1.5">
                        🕰️ Style Critique
                      </div>
                      <div className="text-xs text-slate-600 mt-1">"Das ist mir leider zu altmodisch / zu modern."</div>
                    </button>
                  </div>
                </div>

                {/* Customer Response Preview */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                    <span>🛍️ Your Spoken Line</span>
                    <button
                      onClick={() => {
                        if (selectedFeedback === 'positive') handleSpeak("Diese gefällt mir sehr gut!");
                        else if (selectedFeedback === 'color') handleSpeak("Die Farbe gefällt mir leider nicht. Haben Sie vielleicht eine andere Farbe?");
                        else handleSpeak("Das ist mir leider etwas zu altmodisch.");
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1.5 transition-all text-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                  <div className="text-base font-bold text-amber-300">
                    {selectedFeedback === 'positive' && '"Diese gefällt mir sehr gut!"'}
                    {selectedFeedback === 'color' && '"Die Farbe gefällt mir leider nicht. Haben Sie vielleicht eine andere Farbe?"'}
                    {selectedFeedback === 'style' && '"Das ist mir leider etwas zu altmodisch."'}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setDialogueStep(1);
                      playChime();
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setDialogueStep(3);
                      playChime();
                    }}
                    className="px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    Next: Size & Fitting Room <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 3: Size & Fitting Room */}
            {dialogueStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm">Stage 3</span>
                    Size Inquiry & Directions to Fitting Room
                  </h4>
                  <span className="text-xs text-slate-500">Slides 30–32</span>
                </div>

                {/* Salesperson asks size */}
                <div className="bg-white p-4 rounded-2xl border-l-4 border-indigo-500 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-indigo-600 font-bold">
                    <span>👩‍💼 Verkäuferin (Asking size)</span>
                    <button
                      onClick={() => handleSpeak("Welche Größe haben Sie denn?")}
                      className="text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-base font-bold text-slate-800">
                    "Welche Größe haben Sie denn?"
                  </p>
                  <p className="text-xs text-slate-500">What size do you have / wear?</p>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Choose your clothing size:</label>
                  <div className="flex flex-wrap gap-2">
                    {['36', '38', '40', '42', '44', '46', 'M', 'L', 'XL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          setSelectedSize(sz);
                          playChime();
                        }}
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                          selectedSize === sz
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Größe {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fitting Room Question and Answer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-indigo-700 font-bold">
                      <span>🛍️ You Ask: Where is the fitting room?</span>
                      <button
                        onClick={() => handleSpeak("Ich trage Größe " + selectedSize + ". Wo ist die Umkleidekabine?")}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-bold text-indigo-950 text-sm">
                      "Ich trage Größe {selectedSize}. Wo ist die Umkleidekabine?"
                    </div>
                    <div className="text-xs text-indigo-700">
                      I wear size {selectedSize}. Where is the fitting room?
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
                      <span>👩‍💼 Salesperson Gives Directions:</span>
                      <button
                        onClick={() => handleSpeak("Gleich hier um die Ecke! / Da hinten rechts.")}
                        className="text-amber-700 hover:text-amber-900"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-bold text-amber-950 text-sm">
                      "Gleich hier um die Ecke! / Da hinten rechts."
                    </div>
                    <div className="text-xs text-amber-700">
                      Right around the corner! / Back there on the right.
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setDialogueStep(2);
                      playChime();
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setDialogueStep(4);
                      playChime();
                    }}
                    className="px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    Next: Fit Check in Fitting Room <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 4: Fit Check in Fitting Room */}
            {dialogueStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm">Stage 4</span>
                    Fit Check & Size Adjustments
                  </h4>
                  <span className="text-xs text-slate-500">Slide 33</span>
                </div>

                {/* Salesperson checking fit */}
                <div className="bg-white p-4 rounded-2xl border-l-4 border-indigo-500 shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs text-indigo-600 font-bold">
                    <span>👩‍💼 Verkäuferin (Checks on you at the fitting cubicle)</span>
                    <button
                      onClick={() => handleSpeak("Und passt die gut? Sitzt die gut? Ist sie bequem?")}
                      className="text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-base font-bold text-slate-800">
                    "Und passt die gut? Sitzt die gut? Ist sie bequem?"
                  </p>
                  <p className="text-xs text-slate-500">And does it fit well? Does it sit well? Is it comfortable?</p>
                </div>

                {/* Fit selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setSelectedFit('perfect');
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      selectedFit === 'perfect'
                        ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-emerald-700">✨ Fits Perfectly!</div>
                    <div className="text-xs text-slate-600 mt-1">"Sie passt gut / genau. Ich nehme diese."</div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFit('toosmall');
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      selectedFit === 'toosmall'
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-amber-700">🤏 Too Small</div>
                    <div className="text-xs text-slate-600 mt-1">"Es ist viel zu klein. Haben Sie eine Nummer größer?"</div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFit('toobig');
                      playChime();
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      selectedFit === 'toobig'
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-blue-700">🧥 Too Big</div>
                    <div className="text-xs text-slate-600 mt-1">"Es ist viel zu groß. Haben Sie eine Nummer kleiner?"</div>
                  </button>
                </div>

                {/* Preview Box */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                    <span>🛍️ Your Feedback to the Salesperson</span>
                    <button
                      onClick={() => {
                        if (selectedFit === 'perfect') handleSpeak("Sie passt genau richtig. Ich nehme diese!");
                        else if (selectedFit === 'toosmall') handleSpeak("Es ist leider viel zu klein. Haben Sie eine Nummer größer?");
                        else handleSpeak("Es ist leider viel zu groß. Haben Sie eine Nummer kleiner?");
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1.5 transition-all text-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                  <div className="text-base font-bold text-amber-300">
                    {selectedFit === 'perfect' && '"Sie passt gut. Ich nehme diese!"'}
                    {selectedFit === 'toosmall' && '"Es ist leider viel zu klein. Haben Sie eine Nummer größer?"'}
                    {selectedFit === 'toobig' && '"Es ist leider viel zu groß. Haben Sie eine Nummer kleiner?"'}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setDialogueStep(3);
                      playChime();
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setDialogueStep(5);
                      playChime();
                    }}
                    className="px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    Next: Price & Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 5: Compliment, Price & Farewell */}
            {dialogueStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm">Stage 5</span>
                    Compliment, Price & Farewell
                  </h4>
                  <span className="text-xs text-slate-500">Slides 34–35</span>
                </div>

                {/* Final Exchange Sequence */}
                <div className="space-y-3">
                  {/* Sales compliment */}
                  <div className="bg-white p-3.5 rounded-2xl border-l-4 border-indigo-500 shadow-sm flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-indigo-600">👩‍💼 Verkäuferin (Compliment)</div>
                      <div className="font-bold text-slate-800 text-sm">
                        "Sehr schön! {shoppingItems[selectedItem].article} steht Ihnen auch ausgezeichnet!"
                      </div>
                      <div className="text-xs text-slate-500">Very beautiful! The item suits you excellently!</div>
                    </div>
                    <button
                      onClick={() => handleSpeak(`${shoppingItems[selectedItem].article} steht Ihnen auch sehr gut!`)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Customer asking price */}
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border-l-4 border-emerald-500 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-emerald-800">🛍️ You (Price Inquiry)</div>
                      <div className="font-bold text-emerald-950 text-sm">
                        "Danke! Was kostet {shoppingItems[selectedItem].gender === 'feminin' || shoppingItems[selectedItem].gender === 'plural' ? 'sie' : shoppingItems[selectedItem].gender === 'maskulin' ? 'er' : 'es'}?"
                      </div>
                      <div className="text-xs text-emerald-700">Thank you! What does it cost?</div>
                    </div>
                    <button
                      onClick={() => handleSpeak(`Danke. Was kostet ${shoppingItems[selectedItem].gender === 'feminin' || shoppingItems[selectedItem].gender === 'plural' ? 'sie' : shoppingItems[selectedItem].gender === 'maskulin' ? 'er' : 'es'}?`)}
                      className="p-1.5 text-emerald-600 hover:text-emerald-800"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sales price */}
                  <div className="bg-white p-3.5 rounded-2xl border-l-4 border-indigo-500 shadow-sm flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-indigo-600">👩‍💼 Verkäuferin (Price & Packaging)</div>
                      <div className="font-bold text-slate-800 text-sm">
                        "Nur {shoppingItems[selectedItem].price}. Ich packe es Ihnen gern ein."
                      </div>
                      <div className="text-xs text-slate-500">Only {shoppingItems[selectedItem].price}. I'll gladly pack it for you.</div>
                    </div>
                    <button
                      onClick={() => handleSpeak(`Nur ${shoppingItems[selectedItem].price}. Ich packe es Ihnen gern ein.`)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Farewell */}
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border-l-4 border-emerald-500 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-emerald-800">🛍️ You (Farewell)</div>
                      <div className="font-bold text-emerald-950 text-sm">
                        "Vielen Dank! Auf Wiedersehen!"
                      </div>
                      <div className="text-xs text-emerald-700">Thank you very much! Goodbye!</div>
                    </div>
                    <button
                      onClick={() => handleSpeak("Vielen Dank! Auf Wiedersehen!")}
                      className="p-1.5 text-emerald-600 hover:text-emerald-800"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => {
                      setDialogueStep(4);
                      playChime();
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setDialogueStep(1);
                      playChime();
                    }}
                    className="px-5 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Start New Shopping Trip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Slide 36 Pronouns */}
      {activeTab === 'pronouns' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4">
            <span className="text-3xl">🌟</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                Slide 36: Shopping Pronouns Summary (der/er, die/sie, das/es)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                When responding to questions like <em>"Gefällt Ihnen dieser Pullover?"</em>, Germans substitute the noun with its exact matching gender pronoun: <strong>der/er</strong> (masculine), <strong>die/sie</strong> (feminine), <strong>das/es</strong> (neuter), and <strong>die/sie</strong> (plural)!
              </p>
            </div>
          </div>

          {/* Master Table Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.keys(pronounMatrixData).map((pKey) => {
              const item = pronounMatrixData[pKey];
              const isSelected = pronounItemKey === pKey;
              return (
                <div
                  key={pKey}
                  onClick={() => {
                    setPronounItemKey(pKey);
                    playChime();
                  }}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{item.icon}</span>
                    <span className="text-xs font-black px-2.5 py-1 bg-slate-100 rounded-full text-slate-700">
                      {item.gender}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-black text-slate-800 text-lg">{item.item}</div>
                    <div className="text-xs font-bold text-indigo-600 bg-indigo-100/70 px-2 py-1 rounded-lg">
                      {item.pronounDemo}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(`${item.questionDe} ${item.replyPosDe}`);
                    }}
                    className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-indigo-700 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Practice Dialogue
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive Pronoun Live Breakdown */}
          {pronounItemKey && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{pronounMatrixData[pronounItemKey].icon}</span>
                  <div>
                    <h4 className="text-xl font-bold text-amber-300">
                      Pronoun In Action: {pronounMatrixData[pronounItemKey].item} ({pronounMatrixData[pronounItemKey].gender})
                    </h4>
                    <p className="text-slate-400 text-xs">How Germans naturalize references in retail dialogue</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSpeak(`${pronounMatrixData[pronounItemKey].questionDe} ${pronounMatrixData[pronounItemKey].replyPosDe} ${pronounMatrixData[pronounItemKey].costDe}`)}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Volume2 className="w-4 h-4" /> Listen to Full Sequence
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Question */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">1. Salesperson Question</div>
                  <div className="font-bold text-white text-base">{pronounMatrixData[pronounItemKey].questionDe}</div>
                  <div className="text-xs text-slate-400">{pronounMatrixData[pronounItemKey].questionEn}</div>
                </div>

                {/* 2. Response */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. Customer Opinion</div>
                  <div className="font-bold text-emerald-300 text-base">{pronounMatrixData[pronounItemKey].replyPosDe}</div>
                  <div className="text-xs text-slate-400">{pronounMatrixData[pronounItemKey].replyPosEn}</div>
                </div>

                {/* 3. Price check */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">3. Price Inquiry</div>
                  <div className="font-bold text-amber-300 text-base">{pronounMatrixData[pronounItemKey].costDe}</div>
                  <div className="text-xs text-slate-400">{pronounMatrixData[pronounItemKey].costEn}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
