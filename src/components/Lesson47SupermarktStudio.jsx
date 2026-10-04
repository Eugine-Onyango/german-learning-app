import React, { useState } from 'react';

const GROCERY_ITEMS = [
  { id: 'cola', name: 'eine Dose Cola', meaning: 'a can of cola', price: 1.20, category: 'Getränke', aisle: 'bei den Getränken', icon: '🥤' },
  { id: 'cheese', name: 'ein Stück Käse', meaning: 'a piece of cheese', price: 2.80, category: 'Milchprodukte', aisle: 'bei Milch und Milchprodukten', icon: '🧀' },
  { id: 'detergent', name: 'eine Packung Waschmittel', meaning: 'a pack of detergent', price: 4.50, category: 'Waschmittel', aisle: 'beim Waschmittel', icon: '🧼' },
  { id: 'yogurt', name: 'einen Becher Joghurt', meaning: 'a cup of yogurt', price: 0.85, category: 'Milchprodukte', aisle: 'bei Milch und Milchprodukten', icon: '🥣' },
  { id: 'chocolate', name: 'eine Tafel Schokolade', meaning: 'a bar of chocolate', price: 1.49, category: 'Süßwaren', aisle: 'bei den Süßwaren', icon: '🍫' },
  { id: 'oil', name: 'eine Flasche Öl', meaning: 'a bottle of oil', price: 2.99, category: 'Feinkost', aisle: 'bei der Feinkost', icon: '🍾' },
  { id: 'milk', name: 'eine Packung Milch', meaning: 'a carton of milk', price: 1.19, category: 'Milchprodukte', aisle: 'bei Milch und Milchprodukten', icon: '🥛' },
  { id: 'honey', name: 'ein Glas Honig', meaning: 'a jar of honey', price: 3.75, category: 'Süßwaren', aisle: 'bei den Süßwaren', icon: '🍯' },
  { id: 'tomatoes', name: 'ein Kilo Tomaten', meaning: 'a kilo of tomatoes', price: 2.50, category: 'Obst & Gemüse', aisle: 'bei Obst und Gemüse', icon: '🍅' },
  { id: 'rice', name: 'einen Beutel Reis', meaning: 'a bag of rice', price: 1.80, category: 'Getreide', aisle: 'beim Getreide', icon: '🍚' },
  { id: 'apples', name: 'ein halbes Kilo Äpfel (1 Pfund)', meaning: 'half a kilo of apples (1 pound)', price: 1.60, category: 'Obst & Gemüse', aisle: 'bei Obst und Gemüse', icon: '🍎' },
  { id: 'juice', name: 'anderthalb Liter Saft', meaning: '1.5 liters of juice', price: 2.20, category: 'Getränke', aisle: 'bei den Getränken', icon: '🧃' },
  { id: 'chips', name: 'eine Tüte Chips', meaning: 'a bag of chips', price: 1.99, category: 'Knabberzeug', aisle: 'beim Knabberzeug', icon: '🥨' },
  { id: 'bread', name: 'ein frisches Brot', meaning: 'a fresh bread', price: 2.30, category: 'Backwaren', aisle: 'bei den Backwaren', icon: '🥖' },
  { id: 'pizza', name: 'eine Tiefkühlpizza', meaning: 'a frozen pizza', price: 3.20, category: 'Tiefkühlkost', aisle: 'bei der Tiefkühlkost', icon: '🍕' }
];

const AISLES = [
  { id: 'snacks', name: 'beim Knabberzeug', label: 'Snacks & Chips', prep: 'beim (das Knabberzeug)', items: 'Chips, Nüsse, Salzstangen, Popcorn', icon: '🥨' },
  { id: 'drinks', name: 'bei den Getränken', label: 'Beverages', prep: 'bei den (die Getränke Plural)', items: 'Mineralwasser, Cola, Saft, Bier', icon: '🥤' },
  { id: 'produce', name: 'bei Obst und Gemüse', label: 'Produce (Fruit & Veg)', prep: 'bei (Plural/Collective)', items: 'Äpfel, Bananen, Tomaten, Salat', icon: '🍎' },
  { id: 'dairy', name: 'bei Milch und Milchprodukten', label: 'Dairy Section', prep: 'bei (Collective)', items: 'Milch, Butter, Käse, Joghurt, Sahne', icon: '🥛' },
  { id: 'cereal', name: 'beim Getreide', label: 'Cereals & Grains', prep: 'beim (das Getreide)', items: 'Reis, Nudeln, Haferflocken, Müsli', icon: '🌾' },
  { id: 'meat_counter', name: 'bei der Fleischtheke', label: 'Meat Counter', prep: 'bei der (die Fleischtheke)', items: 'Rindfleisch, Hähnchen, Bratwurst', icon: '🥩' },
  { id: 'cleaning', name: 'beim Waschmittel', label: 'Cleaning & Detergent', prep: 'beim (das Waschmittel)', items: 'Waschpulver, Weichspüler, Spülmittel', icon: '🧼' },
  { id: 'bakery', name: 'bei den Backwaren', label: 'Bakery Section', prep: 'bei den (die Backwaren Plural)', items: 'Brot, Brötchen, Brezeln, Croissants', icon: '🥖' },
  { id: 'sweets', name: 'bei den Süßwaren', label: 'Confectionery & Sweets', prep: 'bei den (die Süßwaren Plural)', items: 'Schokolade, Gummibärchen, Kekse', icon: '🍫' },
  { id: 'frozen', name: 'bei der Tiefkühlkost', label: 'Frozen Items', prep: 'bei der (die Tiefkühlkost)', items: 'Tiefkühlpizza, Eiscreme, Erbsen', icon: '🧊' },
  { id: 'spices', name: 'bei den Gewürzen', label: 'Spices Section', prep: 'bei den (die Gewürze Plural)', items: 'Pfeffer, Salz, Paprika, Curry, Oregano', icon: '🧂' },
  { id: 'drogerie', name: 'bei der Drogerie', label: 'Health & Beauty', prep: 'bei der (die Drogerie)', items: 'Shampoo, Zahnpasta, Duschgel, Seife', icon: '🧴' }
];

export default function Lesson47SupermarktStudio({ isSlowMode }) {
  const [activeTab, setActiveTab] = useState('cart'); // 'cart' | 'aisles' | 'checkout'
  
  // Cart state
  const [cartMode, setCartMode] = useState('trolley'); // 'trolley' | 'basket'
  const [cartItems, setCartItems] = useState([
    GROCERY_ITEMS[0], // cola
    GROCERY_ITEMS[1], // cheese
    GROCERY_ITEMS[8]  // tomatoes
  ]);

  // Aisle search state
  const [selectedAisle, setSelectedAisle] = useState(AISLES[0]);

  // Checkout dialogue step state
  const [checkoutStep, setCheckoutStep] = useState(0);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = isSlowMode ? 0.7 : 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    speakText(`Ich kaufe ${item.name}`);
  };

  const removeFromCart = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  const CHECKOUT_DIALOGUE = [
    {
      speaker: 'Kassierer(in)',
      role: 'cashier',
      german: 'Guten Tag!',
      english: 'Good day / Hello!',
      avatar: '🧑‍💼'
    },
    {
      speaker: 'Kunde / Kundin',
      role: 'customer',
      german: 'Hallo!',
      english: 'Hello!',
      avatar: '🧑'
    },
    {
      speaker: 'Kassierer(in)',
      role: 'cashier',
      german: `Das macht €${totalPrice.toFixed(2).replace('.', ',')} bitte!`,
      english: `That comes to €${totalPrice.toFixed(2).replace('.', ',')} please!`,
      avatar: '🧑‍💼'
    },
    {
      speaker: 'Kunde / Kundin',
      role: 'customer',
      german: 'Hier bitte!',
      english: 'Here you go!',
      avatar: '🧑'
    },
    {
      speaker: 'Kassierer(in)',
      role: 'cashier',
      german: 'Danke! Einen schönen Tag!',
      english: 'Thank you! Have a nice day!',
      avatar: '🧑‍💼'
    },
    {
      speaker: 'Kunde / Kundin',
      role: 'customer',
      german: 'Danke, ebenso!',
      english: 'Thank you, same to you (likewise)!',
      avatar: '🧑'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-amber-400/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full border border-emerald-300 text-emerald-200 text-xs font-black uppercase tracking-wider">
              <span>🛒 Lesson 47 Studio</span>
              <span>•</span>
              <span>Grocery Shopping & Checkout</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Im Supermarkt Studio
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Master shopping lists (<code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-300">die Einkaufsliste</code>), packaging (<code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-300">eine Dose Cola / ein Glas Honig</code>), aisle prepositions (<code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-300">beim Knabberzeug / bei der Fleischtheke</code>), and real checkout dialogues!
            </p>
          </div>
          <button
            onClick={() => speakText("Im Supermarkt: Ich gehe zum Supermarkt, kaufe ein Kilo Äpfel, eine Flasche Öl und bezahle an der Kasse. Das macht fünfundzwanzig Euro zehn bitte!")}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-2xl shadow-lg hover:scale-105 transition-all text-sm whitespace-nowrap"
          >
            <span>🔊</span>
            <span>Listen Overview</span>
          </button>
        </div>
      </div>

      {/* Preposition Compass Pill Box */}
      <div className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧭</span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
              The 3-Step Supermarket Compass (Slides 10–12)
            </span>
            <div className="font-extrabold text-stone-900 text-sm">
              Direction: <span className="text-emerald-700">zum Supermarkt</span> ➔ Inside: <span className="text-teal-700">im Supermarkt</span> ➔ Returning: <span className="text-amber-800">vom Supermarkt</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => speakText("Ich gehe zum Supermarkt. Ich bin im Supermarkt. Ich komme vom Supermarkt.")}
          className="px-3.5 py-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-800 font-bold text-xs rounded-xl border border-stone-300 transition-all flex items-center gap-1.5"
        >
          <span>🔊</span>
          <span>Listen Compass</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/80 rounded-2xl">
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'cart'
              ? 'bg-white text-emerald-900 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>🛒</span>
          <span>1. Shopping Cart & List</span>
        </button>
        <button
          onClick={() => setActiveTab('aisles')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'aisles'
              ? 'bg-white text-emerald-900 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>🏪</span>
          <span>2. Aisles & Departments</span>
        </button>
        <button
          onClick={() => setActiveTab('checkout')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'checkout'
              ? 'bg-white text-emerald-900 shadow-md ring-2 ring-emerald-500'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
          }`}
        >
          <span>💶</span>
          <span>3. Checkout at the Kasse</span>
        </button>
      </div>

      {/* TAB 1: SHOPPING CART & LIST */}
      {activeTab === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Grocery Shelves (Select to add) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-xl font-black text-stone-900">
                  Supermarket Grocery Shelves (Regale)
                </h3>
                <p className="text-xs text-stone-500">
                  Tap any item to add it to your cart and listen to the exact German packaging unit!
                </p>
              </div>
              {/* Trolley vs Basket Switcher */}
              <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
                <button
                  onClick={() => {
                    setCartMode('trolley');
                    speakText("der Einkaufswagen");
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    cartMode === 'trolley' ? 'bg-emerald-700 text-white shadow' : 'text-stone-600'
                  }`}
                >
                  🛒 Einkaufswagen
                </button>
                <button
                  onClick={() => {
                    setCartMode('basket');
                    speakText("der Einkaufskorb");
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    cartMode === 'basket' ? 'bg-emerald-700 text-white shadow' : 'text-stone-600'
                  }`}
                >
                  🧺 Einkaufskorb
                </button>
              </div>
            </div>

            {/* Grid of grocery products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GROCERY_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="p-3 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-200 hover:border-emerald-400 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <div className="font-extrabold text-stone-900 text-xs sm:text-sm">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {item.meaning}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black text-emerald-800 text-xs sm:text-sm">
                      €{item.price.toFixed(2).replace('.', ',')}
                    </span>
                    <div className="text-[10px] text-emerald-600 font-bold group-hover:underline">
                      + Add
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Cart & Shopping List Receipt */}
          <div className="bg-stone-50 rounded-3xl p-6 border-2 border-stone-300 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{cartMode === 'trolley' ? '🛒' : '🧺'}</span>
                  <div>
                    <h4 className="font-black text-stone-900 text-base">
                      {cartMode === 'trolley' ? 'Mein Einkaufswagen' : 'Mein Einkaufskorb'}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-bold">
                      {cartItems.length} {cartItems.length === 1 ? 'Artikel' : 'Artikel'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setCartItems([])}
                  className="text-xs text-red-600 hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>

              {/* Items in cart */}
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs italic">
                    Your {cartMode === 'trolley' ? 'cart' : 'basket'} is empty.<br />Tap items on the left to fill it!
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="font-bold text-stone-800 truncate max-w-[140px]">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-900">
                          €{item.price.toFixed(2).replace('.', ',')}
                        </span>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-stone-400 hover:text-red-600 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total & Audio readout */}
            <div className="pt-4 border-t-2 border-dashed border-stone-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-600 text-xs uppercase tracking-wider">
                  Gesamtsumme (Total):
                </span>
                <span className="font-mono font-black text-xl text-emerald-900">
                  €{totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  const itemsSummary = cartItems.map(i => i.name).join(', ');
                  speakText(`Ich kaufe ${itemsSummary}. Das macht ${totalPrice.toFixed(2).replace('.', ',')} Euro.`);
                }}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-extrabold rounded-xl shadow transition-all text-xs flex items-center justify-center gap-2"
              >
                <span>🔊</span>
                <span>Read Full Shopping Sentence</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AISLES & DEPARTMENTS */}
      {activeTab === 'aisles' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-6 animate-fadeIn">
          <div className="pb-4 border-b border-stone-200 space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Supermarket Aisles & Department Radar (Slides 8, 18–23)
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm">
              Discover which preposition to use: <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">beim</code> (das), <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">bei der</code> (die), or <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">bei den</code> (Plural)!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {AISLES.map((a) => (
              <div
                key={a.id}
                onClick={() => {
                  setSelectedAisle(a);
                  speakText(`Entschuldigen Sie, wo finde ich ${a.label}? ${a.label} finden Sie ${a.name}.`);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                  selectedAisle.id === a.id
                    ? 'bg-emerald-50 border-emerald-500 shadow-md scale-102 ring-2 ring-emerald-300'
                    : 'bg-stone-50 border-stone-200 hover:border-emerald-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-xs text-stone-400 font-mono font-bold">
                    🔊 Tap
                  </span>
                </div>
                <div>
                  <div className="font-black text-emerald-950 text-sm">
                    🇩🇪 {a.name}
                  </div>
                  <div className="text-xs font-semibold text-stone-600">
                    🇬🇧 {a.label}
                  </div>
                </div>
                <div className="text-[11px] text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded font-mono font-bold">
                  {a.prep}
                </div>
                <div className="text-[11px] text-stone-500 italic">
                  Typical items: {a.items}
                </div>
              </div>
            ))}
          </div>

          {/* Active Dialog Example */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-emerald-800">
                Live Asking for Directions:
              </span>
              <div className="text-sm sm:text-base font-extrabold text-stone-900">
                🗣️ Customer: "Entschuldigen Sie, wo finde ich {selectedAisle.label}?"
              </div>
              <div className="text-sm sm:text-base font-extrabold text-emerald-900">
                🧑‍💼 Worker: "{selectedAisle.label} finden Sie <span className="underline decoration-amber-500 decoration-2">{selectedAisle.name}</span>."
              </div>
            </div>
            <button
              onClick={() => speakText(`Entschuldigen Sie, wo finde ich ${selectedAisle.label}? ${selectedAisle.label} finden Sie ${selectedAisle.name}.`)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs whitespace-nowrap shadow"
            >
              🔊 Listen Full Dialogue
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: CHECKOUT DIALOGUE (AN DER KASSE) */}
      {activeTab === 'checkout' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800">
                An der Kasse (At the Checkout) • Slides 24–26
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Step-by-Step Checkout Roleplay
              </h3>
            </div>
            <button
              onClick={() => {
                const fullConv = CHECKOUT_DIALOGUE.map(d => `${d.speaker}: ${d.german}`).join('. ');
                speakText(fullConv);
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <span>🔊</span>
              <span>Listen Full Checkout</span>
            </button>
          </div>

          {/* Dialogue Steps */}
          <div className="space-y-3">
            {CHECKOUT_DIALOGUE.map((d, idx) => (
              <div
                key={idx}
                onClick={() => speakText(d.german)}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-4 cursor-pointer hover:scale-101 ${
                  d.role === 'cashier'
                    ? 'bg-emerald-50/60 border-emerald-200 ml-0 mr-6 sm:mr-16'
                    : 'bg-amber-50/60 border-amber-200 ml-6 sm:ml-16 mr-0'
                }`}
              >
                <div className="text-3xl p-2 bg-white rounded-2xl shadow-sm">
                  {d.avatar}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                      {d.speaker}
                    </span>
                    <span className="text-xs text-stone-400">🔊 Tap</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-stone-900">
                    🇩🇪 "{d.german}"
                  </div>
                  <div className="text-xs sm:text-sm text-stone-600 italic">
                    🇬🇧 "{d.english}"
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Kassenbon Receipt Visual */}
          <div className="max-w-md mx-auto bg-stone-50 p-6 rounded-3xl border-2 border-dashed border-stone-300 shadow-inner font-mono text-xs space-y-2 text-stone-800">
            <div className="text-center font-bold text-sm border-b border-stone-300 pb-2">
              🧾 SUPERMARKT KASSENBON
            </div>
            <div className="flex justify-between">
              <span>Datum: 04.10.2026</span>
              <span>Kasse 03</span>
            </div>
            <div className="border-b border-stone-300 py-2 space-y-1">
              <div className="flex justify-between">
                <span>1x Dose Cola</span>
                <span>€1,20</span>
              </div>
              <div className="flex justify-between">
                <span>1x Stück Käse</span>
                <span>€2,80</span>
              </div>
              <div className="flex justify-between">
                <span>1x Kilo Tomaten</span>
                <span>€2,50</span>
              </div>
            </div>
            <div className="flex justify-between font-black text-sm pt-1 text-emerald-900">
              <span>GESAMTBETRAG:</span>
              <span>€25,10</span>
            </div>
            <div className="text-center text-[11px] text-stone-500 pt-2">
              Vielen Dank für Ihren Einkauf! Einen schönen Tag!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
