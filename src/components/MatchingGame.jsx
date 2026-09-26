import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Volume2, CheckCircle2 } from 'lucide-react';
import { speakGerman, playChime } from '../utils/sound';

export default function MatchingGame({ items, isSlowMode }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);

  // Initialize a round of 5 random pairs
  const initGame = () => {
    const shuffledItems = [...items].sort(() => 0.5 - Math.random()).slice(0, 5);
    const cardDeck = [];

    shuffledItems.forEach((item) => {
      // German Card
      cardDeck.push({
        uid: `${item.id}-de`,
        pairId: item.id,
        type: 'german',
        text: item.german,
        sub: '🇩🇪 German',
        icon: item.icon,
        audioText: item.audioText
      });
      // English Meaning Card
      cardDeck.push({
        uid: `${item.id}-en`,
        pairId: item.id,
        type: 'meaning',
        text: item.english,
        sub: '🇬🇧 Meaning',
        icon: item.icon,
        audioText: item.audioText
      });
    });

    setCards(cardDeck.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchedIds([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, [items]);

  const handleCardClick = (card) => {
    if (matchedIds.includes(card.pairId)) return;
    if (selectedCards.length === 1 && selectedCards[0].uid === card.uid) return;
    if (selectedCards.length >= 2) return;

    playChime('click');
    if (card.audioText) {
      speakGerman(card.audioText, isSlowMode);
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // MATCH!
        playChime('success');
        setMatchedIds(prev => {
          const next = [...prev, first.pairId];
          if (next.length === cards.length / 2) {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 }
            });
          }
          return next;
        });
        setSelectedCards([]);
      } else {
        // No match
        playChime('wrong');
        setTimeout(() => {
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const isComplete = cards.length > 0 && matchedIds.length === cards.length / 2;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-200 rounded-3xl p-5 sm:p-6 border-2 border-emerald-300 text-center">
        <h2 className="text-2xl font-black text-emerald-950 flex items-center justify-center gap-2">
          <span>🃏</span>
          <span>Memory Match Game: Connect the Pairs!</span>
          <span>✨</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 mt-1 max-w-xl mx-auto">
          Match the German phrase with its English meaning! Tap any card to hear the audio.
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs font-bold">
          <span className="bg-white px-3 py-1 rounded-full border border-emerald-300 text-emerald-900">
            Pairs Matched: {matchedIds.length} / {cards.length / 2}
          </span>
          <span className="bg-white px-3 py-1 rounded-full border border-emerald-300 text-stone-700">
            Turns: {moves}
          </span>
        </div>
      </div>

      {/* Cards Deck Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {cards.map((card) => {
          const isMatched = matchedIds.includes(card.pairId);
          const isSelected = selectedCards.some(c => c.uid === card.uid);

          let stateStyle = "bg-white border-stone-200 hover:border-amber-400 hover:scale-102";
          if (isMatched) {
            stateStyle = "bg-emerald-100/90 border-emerald-400 text-emerald-900 opacity-90 scale-98 pointer-events-none";
          } else if (isSelected) {
            stateStyle = "bg-amber-100 border-amber-500 ring-3 ring-amber-300 scale-104 shadow-lg";
          }

          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={`h-36 sm:h-40 rounded-2xl border-3 p-3 flex flex-col justify-between text-left transition-all duration-200 cursor-pointer shadow-sm relative ${stateStyle}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{card.icon}</span>
                {isMatched && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                {isSelected && !isMatched && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                )}
              </div>

              <div>
                <div className="font-black text-sm sm:text-base leading-tight break-words">
                  {card.text}
                </div>
                <div className="text-[10px] text-stone-500 mt-1 font-semibold">
                  {card.sub}
                </div>
              </div>

              <div className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                <span>Tap to listen</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Completed notification */}
      {isComplete && (
        <div className="bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-6 text-center space-y-3 animate-gentle-bounce">
          <div className="text-4xl">🌟 🎊 🏅</div>
          <h3 className="text-xl font-black text-emerald-950">
            Great Job! You Matched All Pairs!
          </h3>
          <p className="text-xs sm:text-sm text-stone-700">
            Completed in {moves} turns. Your memory and pronunciation are super sharp!
          </p>
          <button
            onClick={() => {
              playChime('click');
              initGame();
            }}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-black text-xs sm:text-sm flex items-center gap-2 mx-auto shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again with Fresh Cards</span>
          </button>
        </div>
      )}
    </div>
  );
}
