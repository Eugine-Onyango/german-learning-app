// Audio Synthesizer, Web Speech API, and Google TTS for German pronunciation

let audioCtx = null;
let currentAudio = null;
let currentPlaybackSession = 0; // Incremented on stop to cancel pending chunks
let cachedVoices = [];

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound effects using Web Audio API
export function playChime(type = 'success') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'wrong') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(220, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'ring') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(480, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    console.warn("Audio effect error:", e);
  }
}

let currentVoiceGender = typeof window !== 'undefined'
  ? (localStorage.getItem('german-karibu-voice-gender') || 'male')
  : 'male';

// Pre-fetch and cache speech synthesis voices
function populateVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const v = window.speechSynthesis.getVoices();
    if (v && v.length > 0) {
      cachedVoices = v;
    }
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  populateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }
}

export function setVoiceGender(gender) {
  currentVoiceGender = gender;
  if (typeof window !== 'undefined') {
    localStorage.setItem('german-karibu-voice-gender', gender);
  }
}

export function getVoiceGender() {
  return currentVoiceGender;
}

export function stopCurrentAudio() {
  currentPlaybackSession++;
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      // Ignore pause errors
    }
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Find a genuine German Web Speech voice
function findGermanVoice(gender = 'male') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const deVoices = voices.filter(v => {
    const lang = (v.lang || '').toLowerCase();
    return lang.startsWith('de') || lang.includes('de-') || lang.includes('de_');
  });

  if (deVoices.length === 0) return null;

  const maleKeywords = ['stefan', 'conrad', 'hans', 'markus', 'martin', 'yannick', 'florian', 'bernd', 'christoph', 'daniel', 'klaus', 'thorsten', 'werner', 'male'];
  const femaleKeywords = ['katja', 'hedda', 'anna', 'marlene', 'vicki', 'petra', 'klara', 'gudrun', 'helena', 'gisela', 'steffi', 'amala', 'elke', 'birgit', 'louisa', 'meryem', 'female'];

  if (gender === 'male') {
    const explicitMale = deVoices.find(v => {
      const name = v.name.toLowerCase();
      return maleKeywords.some(k => name.includes(k));
    });
    if (explicitMale) return explicitMale;

    const nonFemale = deVoices.find(v => {
      const name = v.name.toLowerCase();
      return !femaleKeywords.some(k => name.includes(k));
    });
    if (nonFemale) return nonFemale;
  } else {
    const explicitFemale = deVoices.find(v => {
      const name = v.name.toLowerCase();
      return femaleKeywords.some(k => name.includes(k));
    });
    if (explicitFemale) return explicitFemale;
  }

  // Fallback to first German voice
  return deVoices[0];
}

// Split long German text into natural chunks (<= 80 chars) to prevent Google TTS 400 errors
function splitTextForTts(text, maxLen = 80) {
  const cleaned = text.trim();
  if (cleaned.length <= maxLen) return [cleaned];

  const parts = [];
  // Split on sentence punctuation: . ! ? ; or commas
  const sentences = cleaned.split(/(?<=[.!?।,;:])\s+/);
  let current = '';

  for (const s of sentences) {
    if (!s) continue;
    if ((current + ' ' + s).trim().length <= maxLen) {
      current = (current + ' ' + s).trim();
    } else {
      if (current) parts.push(current);
      if (s.length <= maxLen) {
        current = s;
      } else {
        // Split long clause by individual words
        const words = s.split(/\s+/);
        current = '';
        for (const w of words) {
          if ((current + ' ' + w).trim().length <= maxLen) {
            current = (current + ' ' + w).trim();
          } else {
            if (current) parts.push(current);
            current = w;
          }
        }
      }
    }
  }
  if (current) parts.push(current);
  return parts.filter(p => p.length > 0);
}

// Play single chunk with Google TTS
function playTtsChunk(chunkText, isSlow = false) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(chunkText);
    const url = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=de&q=${encoded}`;
    const audio = new Audio(url);
    audio.volume = 0.95;
    audio.playbackRate = isSlow ? 0.75 : 1.0;
    if ('preservesPitch' in audio) {
      audio.preservesPitch = true;
    }

    currentAudio = audio;

    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };

    audio.onerror = (e) => {
      if (currentAudio === audio) currentAudio = null;
      reject(e);
    };

    audio.play().catch(reject);
  });
}

// Play German text in the natural Google TTS female voice with chunking for all sentence lengths
async function speakFemaleWithGtts(cleanText, isSlow, onStart, onEnd) {
  const sessionId = currentPlaybackSession;
  const chunks = splitTextForTts(cleanText, 80);

  if (onStart) onStart();

  try {
    for (let i = 0; i < chunks.length; i++) {
      if (currentPlaybackSession !== sessionId) {
        // Playback was cancelled by a new click
        return;
      }
      await playTtsChunk(chunks[i], isSlow);
    }
    if (currentPlaybackSession === sessionId && onEnd) {
      onEnd();
    }
  } catch (err) {
    console.warn("Google TTS chunk playback error, falling back to Web Speech:", err);
    if (currentPlaybackSession === sessionId) {
      speakWithWebSpeech(cleanText, isSlow, null, onEnd, 'female');
    }
  }
}

// Speak using Web Speech API with verified German voice
function speakWithWebSpeech(cleanText, isSlow, onStart, onEnd, activeGender) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  const germanVoice = findGermanVoice(activeGender);

  // If no German voice exists on the user's PC (which would cause English voice to say "wee" for "Wie"),
  // use Google's native German TTS so pronunciation is 100% authentically German!
  if (!germanVoice) {
    speakFemaleWithGtts(cleanText, isSlow, onStart, onEnd);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.voice = germanVoice;
  utterance.lang = 'de-DE';
  utterance.rate = isSlow ? 0.68 : 0.88; // Clear, comfortable speed
  utterance.pitch = activeGender === 'female' ? 1.18 : 1.0; // Natural, non-distorted pitch

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = (e) => {
    console.warn("Web Speech error:", e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

// Main speak German function
export function speakGerman(text, isSlow = false, onStart, onEnd, customGender) {
  if (typeof window === 'undefined') return;

  // Stop any currently playing audio or speech
  stopCurrentAudio();

  const activeGender = customGender || (typeof window !== 'undefined'
    ? (localStorage.getItem('german-karibu-voice-gender') || currentVoiceGender)
    : currentVoiceGender);

  // Clean the text
  const cleanText = text.replace(/[/()]/g, ' ').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  // Female voice uses the natural Google TTS female voice (with full sentence chunking)
  if (activeGender === 'female') {
    speakFemaleWithGtts(cleanText, isSlow, onStart, onEnd);
    return;
  }

  // Male voice uses Web Speech API with natural pitch & German voice verification
  speakWithWebSpeech(cleanText, isSlow, onStart, onEnd, 'male');
}
