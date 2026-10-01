import React, { useState } from 'react';
import { Volume2, Sparkles, Utensils, Coffee, CreditCard, CheckCircle2, RotateCcw, HelpCircle, ArrowRight, Heart, DollarSign, Users, ShoppingBag, Gift } from 'lucide-react';
import { LESSON_29_ITEMS } from '../data/germanLessons';
import { speakGerman, playChime } from '../utils/sound';

export default function Lesson29RestaurantStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('restaurant');

  // Tab 1: Restaurant Simulator State
  const [restStep, setRestStep] = useState(1);
  const [hasReservation, setHasReservation] = useState(null); // true | false
  const [chosenDrink, setChosenDrink] = useState(null);
  const [chosenFoodFormula, setChosenFoodFormula] = useState('Ich nehme');
  const [chosenFoodItem, setChosenFoodItem] = useState(null);
  const [paymentSplit, setPaymentSplit] = useState(null); // 'zusammen' | 'getrennt'
  const [gaveTip, setGaveTip] = useState(false);

  // Tab 2: Cafe Simulator State
  const [cafeDrink, setCafeDrink] = useState('Einen großen Cappuccino');
  const [cafeLocation, setCafeLocation] = useState('Zum Mitnehmen');
  const [cafePayment, setCafePayment] = useState('mit Karte');

  // Tab 3: Menu Lab State
  const [labFormula, setLabFormula] = useState('Ich hätte gerne');
  const [labCategory, setLabCategory] = useState('drinks');

  const menuDrinks = [
    { name: 'eine Cola', gender: 'feminin', trans: 'a cola', icon: '🥤', note: 'die Cola -> eine Cola' },
    { name: 'eine Limonade', gender: 'feminin', trans: 'a lemonade', icon: '🍋', note: 'die Limonade -> eine Limonade' },
    { name: 'ein Bier', gender: 'neutral', trans: 'a beer', icon: '🍺', note: 'das Bier -> ein Bier' },
    { name: 'ein Wasser', gender: 'neutral', trans: 'a water', icon: '💧', note: 'das Wasser -> ein Wasser' },
    { name: 'einen Wein', gender: 'maskulin', trans: 'a wine', icon: '🍷', note: 'der Wein -> einen Wein (Akkusativ -en!)' },
    { name: 'einen Saft', gender: 'maskulin', trans: 'a juice', icon: '🧃', note: 'der Saft -> einen Saft (Akkusativ -en!)' },
    { name: 'einen Kaffee', gender: 'maskulin', trans: 'a coffee', icon: '☕', note: 'der Kaffee -> einen Kaffee (Akkusativ -en!)' },
    { name: 'einen Tee', gender: 'maskulin', trans: 'a tea', icon: '🍵', note: 'der Tee -> einen Tee (Akkusativ -en!)' }
  ];

  const menuFoods = [
    { name: 'eine Pizza', gender: 'feminin', trans: 'a pizza', icon: '🍕', note: 'die Pizza -> eine Pizza' },
    { name: 'eine Suppe', gender: 'feminin', trans: 'a soup', icon: '🥣', note: 'die Suppe -> eine Suppe' },
    { name: 'ein Sandwich', gender: 'neutral', trans: 'a sandwich', icon: '🥪', note: 'das Sandwich -> ein Sandwich' },
    { name: 'ein Stück Kuchen', gender: 'neutral', trans: 'a piece of cake', icon: '🍰', note: 'das Stück Kuchen -> ein Stück' },
    { name: 'einen Salat', gender: 'maskulin', trans: 'a salad', icon: '🥗', note: 'der Salat -> einen Salat (Akkusativ -en!)' },
    { name: 'einen Burger', gender: 'maskulin', trans: 'a burger', icon: '🍔', note: 'der Burger -> einen Burger (Akkusativ -en!)' },
    { name: 'Pommes', gender: 'plural', trans: 'french fries', icon: '🍟', note: 'die Pommes (Plural - no article)' },
    { name: 'Nudeln', gender: 'plural', trans: 'pasta / noodles', icon: '🍝', note: 'die Nudeln (Plural - no article)' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-orange-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-4 border-amber-500/30">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-amber-500/30 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-amber-400/40">
              <Sparkles className="w-3.5 h-3.5" />
              Lesson 29 Interactive Studio
            </span>
            <button
              onClick={() => speakGerman("Im Restaurant und im Café bestellen: Guten Tag! Wir wollen einen Tisch für zwei Personen. Was möchten Sie trinken? Ich nehme einen Kaffee. Wir möchten zahlen, bitte! Zusammen oder getrennt? Stimmt so!", isSlowMode)}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen to Restaurant Audio</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-200">
            im Restaurant & Café bestellen
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Order food, drinks, coffee, and pay your bill with confidence! Master table booking, the 3 magic ordering formulas, Akkusativ direct objects (*einen Kaffee, einen Burger*), splitting the bill, and the famous tipping phrase <strong>"Stimmt so!"</strong>.
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
        <button
          onClick={() => { playChime('click'); setActiveTab('restaurant'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'restaurant'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>🍽️ 1. Restaurant Simulation</span>
        </button>
        <button
          onClick={() => { playChime('click'); setActiveTab('cafe'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'cafe'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>☕ 2. Café Counter Flow</span>
        </button>
        <button
          onClick={() => { playChime('click'); setActiveTab('menu'); }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'menu'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-600 hover:bg-white/60'
          }`}
        >
          <span>📜 3. Speisekarte & 3 Formulas</span>
        </button>
      </div>

      {/* TAB 1: RESTAURANT SIMULATION */}
      {activeTab === 'restaurant' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-6 animate-fade-in">
          {/* Step Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Restaurant Step {restStep} of 6</span>
              <button
                onClick={() => {
                  playChime('click');
                  setRestStep(1);
                  setHasReservation(null);
                  setChosenDrink(null);
                  setChosenFoodItem(null);
                  setPaymentSplit(null);
                  setGaveTip(false);
                }}
                className="flex items-center gap-1 text-stone-400 hover:text-stone-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(restStep / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: ARRIVAL & TABLE */}
          {restStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="text-xs font-bold uppercase text-amber-800">You (Guest) enter the restaurant:</div>
                <div
                  onClick={() => speakGerman("Guten Tag! Wir wollen einen Tisch für zwei Personen.", isSlowMode)}
                  className="text-lg font-black text-stone-900 cursor-pointer flex items-center justify-between"
                >
                  <span>"Guten Tag! Wir wollen einen Tisch für zwei Personen."</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xs text-stone-500 italic">"Good day! We want a table for two people."</div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="text-xs font-bold uppercase text-stone-600">Hostess asks:</div>
                <div
                  onClick={() => speakGerman("Haben Sie reserviert?", isSlowMode)}
                  className="text-lg font-bold text-stone-900 cursor-pointer flex items-center justify-between"
                >
                  <span>"Haben Sie reserviert?"</span>
                  <Volume2 className="w-4 h-4 text-stone-400" />
                </div>
                <div className="text-xs text-stone-500 italic">"Have you made a reservation?"</div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-stone-600 uppercase">Choose Your Answer:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      playChime('click');
                      setHasReservation(true);
                      speakGerman("Ja, auf den Namen Müller.", isSlowMode);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      hasReservation === true
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300'
                        : 'bg-white border-stone-200 hover:bg-amber-50'
                    }`}
                  >
                    <div className="font-bold">Ja, auf den Namen Müller.</div>
                    <div className="text-xs text-stone-500">"Yes, in the name Müller."</div>
                  </button>
                  <button
                    onClick={() => {
                      playChime('click');
                      setHasReservation(false);
                      speakGerman("Nein, wir haben nicht reserviert.", isSlowMode);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      hasReservation === false
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300'
                        : 'bg-white border-stone-200 hover:bg-amber-50'
                    }`}
                  >
                    <div className="font-bold">Nein, wir haben nicht reserviert.</div>
                    <div className="text-xs text-stone-500">"No, we don't have a reservation."</div>
                  </button>
                </div>
              </div>

              {hasReservation !== null && (
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl space-y-2 animate-fade-in">
                  <div className="text-xs font-bold text-sky-900 uppercase">Hostess leads you to the table:</div>
                  <div
                    onClick={() => speakGerman("Bitte kommen Sie mit! Bitte nehmen Sie Platz! Hier ist die Speisekarte.", isSlowMode)}
                    className="text-base font-bold text-stone-900 cursor-pointer flex items-center justify-between"
                  >
                    <span>"Bitte kommen Sie mit! Bitte nehmen Sie Platz! Hier ist die Speisekarte."</span>
                    <Volume2 className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="text-xs text-stone-500 italic">"Please come along! Please take a seat! Here is the menu."</div>

                  <button
                    onClick={() => { playChime('click'); setRestStep(2); }}
                    className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Drinks Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: DRINKS ORDER */}
          {restStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="text-xs font-bold uppercase text-stone-600">Waiter asks:</div>
                <div
                  onClick={() => speakGerman("Was möchten Sie trinken? Was hätten Sie gern zum Trinken?", isSlowMode)}
                  className="text-lg font-bold text-stone-900 cursor-pointer flex items-center justify-between"
                >
                  <span>"Was möchten Sie trinken?" / "Was hätten Sie gern zum Trinken?"</span>
                  <Volume2 className="w-4 h-4 text-stone-400" />
                </div>
                <div className="text-xs text-stone-500 italic">"What would you like to drink?"</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-600 uppercase">Select Your Drink (Notice Akkusativ):</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {menuDrinks.map((d, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playChime('click');
                        setChosenDrink(d);
                        speakGerman(`Ich hätte gern ${d.name}, bitte.`, isSlowMode);
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        chosenDrink?.name === d.name
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 font-bold'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xl mb-1">{d.icon}</div>
                      <div className="text-xs sm:text-sm font-bold text-stone-900">{d.name}</div>
                      <div className="text-[10px] text-stone-400">{d.trans}</div>
                    </button>
                  ))}
                </div>
              </div>

              {chosenDrink && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-fade-in">
                  <div className="text-xs font-bold text-emerald-900 uppercase">You say & Waiter confirms:</div>
                  <div className="text-sm font-bold text-stone-900">
                    You: "Ich hätte gern <span className="text-amber-800 font-black">{chosenDrink.name}</span>, bitte."
                  </div>
                  <div
                    onClick={() => speakGerman("Ok, kommt sofort!", isSlowMode)}
                    className="text-sm font-bold text-emerald-900 cursor-pointer flex items-center justify-between pt-1"
                  >
                    <span>Waiter: "Ok, kommt sofort! (Coming right away!)"</span>
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </div>

                  <button
                    onClick={() => { playChime('click'); setRestStep(3); }}
                    className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Food Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: FOOD ORDER */}
          {restStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="text-xs font-bold uppercase text-stone-600">Waiter asks for your meal (Slide 14–15):</div>
                <div
                  onClick={() => speakGerman("Was darf's denn sein? Was möchten Sie bestellen?", isSlowMode)}
                  className="text-lg font-bold text-stone-900 cursor-pointer flex items-center justify-between"
                >
                  <span>"Was darf's denn sein?" / "Was möchten Sie bestellen?"</span>
                  <Volume2 className="w-4 h-4 text-stone-400" />
                </div>
                <div className="text-xs text-stone-500 italic">"So what will it be? What would you like to order?"</div>
              </div>

              {/* Formula Picker */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-600 uppercase">1. Pick Customer Formula:</div>
                <div className="flex flex-wrap gap-2">
                  {['Ich hätte gerne', 'Ich nehme', 'Ich möchte'].map((f, idx) => (
                    <button
                      key={idx}
                      onClick={() => { playChime('click'); setChosenFoodFormula(f); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        chosenFoodFormula === f
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {f}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Food Picker */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-600 uppercase">2. Pick Food Item:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {menuFoods.map((f, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playChime('click');
                        setChosenFoodItem(f);
                        speakGerman(`${chosenFoodFormula} ${f.name}, bitte.`, isSlowMode);
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        chosenFoodItem?.name === f.name
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 font-bold'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xl mb-1">{f.icon}</div>
                      <div className="text-xs sm:text-sm font-bold text-stone-900">{f.name}</div>
                      <div className="text-[10px] text-stone-400">{f.trans}</div>
                    </button>
                  ))}
                </div>
              </div>

              {chosenFoodItem && (
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl space-y-2 animate-fade-in">
                  <div className="text-xs font-bold text-sky-900 uppercase">You say to the waiter:</div>
                  <div className="text-base font-black text-stone-900">
                    "{chosenFoodFormula} <span className="text-amber-800">{chosenFoodItem.name}</span>, bitte."
                  </div>
                  <div className="text-xs text-stone-500 italic">
                    Waiter: "Noch einen Wunsch? (Any other wishes?)" | You: "Nein, danke!"
                  </div>

                  <button
                    onClick={() => { playChime('click'); setRestStep(4); }}
                    className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Receive Food & Enjoy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: DELIVERY & TASTE CHECK */}
          {restStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
                    Slide 19: Food Delivery
                  </span>
                  <Utensils className="w-5 h-5 text-amber-700" />
                </div>
                <div
                  onClick={() => speakGerman("Hier einmal das Essen. Guten Appetit!", isSlowMode)}
                  className="text-lg font-black text-stone-900 cursor-pointer flex items-center justify-between"
                >
                  <span>"Hier einmal das Essen. Guten Appetit!"</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xs text-stone-500 italic">"Here is your food. Enjoy your meal!"</div>
              </div>

              <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full">
                    Slide 20–21: Taste Check
                  </span>
                  <Heart className="w-5 h-5 text-emerald-700" />
                </div>
                <div
                  onClick={() => speakGerman("Schmeckt es Ihnen? Ja, danke!", isSlowMode)}
                  className="text-lg font-black text-stone-900 cursor-pointer flex items-center justify-between"
                >
                  <span>Waiter: "Schmeckt es Ihnen?" | You: "Ja, danke!"</span>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xs text-stone-500 italic">"Are you enjoying your meal? | Yes, thank you!"</div>
              </div>

              <button
                onClick={() => { playChime('click'); setRestStep(5); }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>Ask for the Bill (Zahlen bitte!)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 5: BILL & SPLITTING */}
          {restStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="text-xs font-bold uppercase text-amber-800">You call the waiter:</div>
                <div
                  onClick={() => speakGerman("Wir möchten zahlen, bitte!", isSlowMode)}
                  className="text-lg font-black text-stone-900 cursor-pointer flex items-center justify-between"
                >
                  <span>"Wir möchten zahlen, bitte!"</span>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xs text-stone-500 italic">"We would like to pay, please!"</div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="text-xs font-bold uppercase text-stone-600">The Waiter's Classic Question (Slide 22):</div>
                <div
                  onClick={() => speakGerman("Zusammen oder getrennt?", isSlowMode)}
                  className="text-lg font-black text-amber-900 cursor-pointer flex items-center justify-between"
                >
                  <span>"Zusammen oder getrennt?"</span>
                  <Volume2 className="w-4 h-4 text-stone-400" />
                </div>
                <div className="text-xs text-stone-500 italic">"Together (one bill) or separately (split bill)?"</div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    playChime('click');
                    setPaymentSplit('zusammen');
                    speakGerman("Zusammen, bitte!", isSlowMode);
                  }}
                  className={`p-4 rounded-2xl text-center border transition-all ${
                    paymentSplit === 'zusammen'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 font-bold'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-base font-bold text-stone-900">Zusammen, bitte!</div>
                  <div className="text-xs text-stone-500">"Together, please!"</div>
                </button>
                <button
                  onClick={() => {
                    playChime('click');
                    setPaymentSplit('getrennt');
                    speakGerman("Getrennt, bitte!", isSlowMode);
                  }}
                  className={`p-4 rounded-2xl text-center border transition-all ${
                    paymentSplit === 'getrennt'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 font-bold'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-base font-bold text-stone-900">Getrennt, bitte!</div>
                  <div className="text-xs text-stone-500">"Separately, please!"</div>
                </button>
              </div>

              {paymentSplit && (
                <button
                  onClick={() => { playChime('click'); setRestStep(6); }}
                  className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 animate-fade-in"
                >
                  <span>Proceed to Payment & Tipping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* STEP 6: TOTAL & TIPPING (STIMMT SO!) */}
          {restStep === 6 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 bg-stone-900 text-white rounded-2xl border-2 border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase">Slide 23: The Total</span>
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
                <div
                  onClick={() => speakGerman("Das macht zusammen fünfundvierzig Euro.", isSlowMode)}
                  className="text-xl font-black text-amber-200 cursor-pointer flex items-center justify-between"
                >
                  <span>"Das macht zusammen 45 Euro."</span>
                  <Volume2 className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-xs text-stone-400 italic">"That makes a total of forty-five euros."</div>
              </div>

              {/* Tipping Button */}
              <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-3">
                <div className="text-xs font-bold text-amber-900 uppercase">The German Tipping Magic Phrase (das Trinkgeld):</div>
                <p className="text-xs text-stone-600">
                  You give a 50€ bill and want to leave a 5€ tip. Hand the money and say:
                </p>

                <button
                  onClick={() => {
                    playChime('success');
                    setGaveTip(true);
                    speakGerman("Hier bitte! Stimmt so! Vielen Dank! Auf Wiedersehen!", isSlowMode);
                  }}
                  className={`w-full p-4 rounded-2xl text-center transition-all border ${
                    gaveTip
                      ? 'bg-emerald-600 text-white font-black shadow-md ring-2 ring-emerald-300'
                      : 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-sm'
                  }`}
                >
                  <div className="text-lg">"Hier bitte! Stimmt so!" 🪙</div>
                  <div className="text-xs opacity-90">("Here you go! Keep the change!")</div>
                </button>
              </div>

              {gaveTip && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Restaurant Visit Complete!</span>
                  </div>
                  <div
                    onClick={() => speakGerman("Vielen Dank! Auf Wiedersehen!", isSlowMode)}
                    className="text-sm font-bold text-stone-800 cursor-pointer flex items-center justify-between"
                  >
                    <span>Waiter: "Vielen Dank! Auf Wiedersehen!" (Thank you! Goodbye!)</span>
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CAFE COUNTER FLOW */}
      {activeTab === 'cafe' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-stone-200 space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
            <Coffee className="w-5 h-5 text-amber-600" />
            <span>Slides 25–32: The Complete German Café Counter Flow</span>
          </div>

          <div className="space-y-4">
            {/* Step 1: Barista Prompt */}
            <div
              onClick={() => speakGerman("Hallo! Was darf's sein?", isSlowMode)}
              className="p-4 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-amber-50 transition-all space-y-1"
            >
              <div className="text-xs font-bold text-stone-500 uppercase">1. Barista Greets You:</div>
              <div className="text-base font-black text-stone-900 flex items-center justify-between">
                <span>"Hallo! Was darf's sein?"</span>
                <Volume2 className="w-4 h-4 text-stone-400" />
              </div>
              <div className="text-xs text-stone-400 italic">"Hello! What would you like?"</div>
            </div>

            {/* Step 2: Choose Order */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-600 uppercase">2. Your Order:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { text: 'Einen großen Cappuccino, bitte.', trans: 'A large cappuccino, please.' },
                  { text: 'Einen Espresso, bitte.', trans: 'An espresso, please.' },
                  { text: 'Einen Tee mit Zitrone, bitte.', trans: 'A tea with lemon, please.' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playChime('click');
                      setCafeDrink(item.text.replace(', bitte.', ''));
                      speakGerman(item.text, isSlowMode);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      cafeDrink === item.text.replace(', bitte.', '')
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 font-bold'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-900">{item.text}</div>
                    <div className="text-[10px] text-stone-400">{item.trans}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Here or To Go? */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-amber-900 bg-amber-200 px-3 py-0.5 rounded-full">
                  Slide 28–29: The Golden Fork Question
                </span>
                <Volume2
                  onClick={() => speakGerman("Zum hier trinken oder zum Mitnehmen?", isSlowMode)}
                  className="w-4 h-4 text-amber-700 cursor-pointer"
                />
              </div>
              <div className="text-base font-black text-stone-900">
                "Zum hier trinken oder zum Mitnehmen?"
              </div>
              <div className="text-xs text-stone-500 italic">"To drink here or to take away?"</div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    playChime('click');
                    setCafeLocation('Zum hier trinken');
                    speakGerman("Zum hier trinken, bitte.", isSlowMode);
                  }}
                  className={`p-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                    cafeLocation === 'Zum hier trinken'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-amber-100'
                  }`}
                >
                  ☕ Zum hier trinken
                </button>
                <button
                  onClick={() => {
                    playChime('click');
                    setCafeLocation('Zum Mitnehmen');
                    speakGerman("Zum Mitnehmen, bitte.", isSlowMode);
                  }}
                  className={`p-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                    cafeLocation === 'Zum Mitnehmen'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-amber-100'
                  }`}
                >
                  🚶‍♂️ Zum Mitnehmen
                </button>
              </div>
            </div>

            {/* Step 4: Payment */}
            <div
              onClick={() => speakGerman("Okay, das macht vier Euro achtzig. Hier mit Karte, bitte. Danke! Ihr Kaffee kommt gleich.", isSlowMode)}
              className="p-5 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-md cursor-pointer space-y-2"
            >
              <div className="text-xs font-bold text-amber-100 uppercase flex items-center justify-between">
                <span>Slide 31–32: Checkout (Tap to listen)</span>
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-base font-bold">
                Barista: "Das macht 4,80 Euro." ➔ You: "Hier mit Karte, bitte."
              </div>
              <div className="text-xs text-amber-100 italic">
                Barista: "Danke! Ihr Kaffee kommt gleich." (Your coffee will be right up!)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MENU & 3 FORMULAS LAB */}
      {activeTab === 'menu' && (
        <div className="space-y-6 animate-fade-in">
          {/* Formula Builder */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>The 3 Magic Customer Formulas (Die 3 Zauberformeln)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'Ich hätte gerne', de: 'Ich hätte gerne...', en: 'I would gladly have... (Polite gold standard)' },
                { id: 'Ich nehme', de: 'Ich nehme...', en: 'I will take... (Direct & Natural)' },
                { id: 'Ich möchte', de: 'Ich möchte...', en: 'I would like... (Classic polite)' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => { playChime('click'); setLabFormula(f.id); }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    labFormula === f.id
                      ? 'bg-amber-600 text-white font-black shadow-sm ring-2 ring-amber-300'
                      : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 text-xs'
                  }`}
                >
                  <div className="font-bold">{f.de}</div>
                  <div className="text-[10px] opacity-80">{f.en}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => { playChime('click'); setLabCategory('drinks'); }}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                labCategory === 'drinks' ? 'bg-amber-600 text-white shadow-sm' : 'bg-stone-100 text-stone-700'
              }`}
            >
              🥤 Getränke (Drinks)
            </button>
            <button
              onClick={() => { playChime('click'); setLabCategory('food'); }}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                labCategory === 'food' ? 'bg-amber-600 text-white shadow-sm' : 'bg-stone-100 text-stone-700'
              }`}
            >
              🍕 Speisen (Food)
            </button>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(labCategory === 'drinks' ? menuDrinks : menuFoods).map((item, idx) => (
              <div
                key={idx}
                onClick={() => speakGerman(`${labFormula} ${item.name}, bitte.`, isSlowMode)}
                className="p-4 bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{item.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    item.gender === 'maskulin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                    item.gender === 'feminin' ? 'bg-rose-100 text-rose-900 border border-rose-300' :
                    item.gender === 'neutral' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                    'bg-purple-100 text-purple-900 border border-purple-300'
                  }`}>
                    {item.gender}
                  </span>
                </div>
                <div className="text-base font-black text-stone-900 group-hover:text-amber-800">
                  {labFormula} <span className="underline decoration-amber-400">{item.name}</span>, bitte.
                </div>
                <div className="text-xs text-stone-500 italic">{item.trans}</div>
                <div className="text-[11px] text-stone-600 pt-1 border-t border-stone-100">
                  <strong>Grammar:</strong> {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
