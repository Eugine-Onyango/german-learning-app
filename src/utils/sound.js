// Web Speech API + Web Audio Synthesizer for sound effects and German speech

let audioCtx = null;

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

// Cheerful sound effects using Web Audio API
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
      // Ringing phone pulse
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

// Pre-fetch voices on load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
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

function findGermanVoice(gender = 'male') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const deVoices = voices.filter(v => v.lang.startsWith('de') || v.lang.includes('DE'));
  if (deVoices.length === 0) return null;

  const femaleKeywords = ['female', 'hedda', 'katja', 'anna', 'marlene', 'vicki', 'petra', 'klara', 'gudrun', 'helena', 'gisela', 'steffi', 'amala', 'elke', 'birgit', 'louisa', 'meryem', 'google deutsch', 'zira'];
  const maleKeywords = ['male', 'stefan', 'conrad', 'hans', 'markus', 'martin', 'yannick', 'florian', 'bernd', 'christoph', 'daniel', 'klaus', 'thorsten', 'werner', 'david'];

  if (gender === 'male') {
    const maleVoice = deVoices.find(v => {
      const name = v.name.toLowerCase();
      return maleKeywords.some(k => name.includes(k));
    });
    if (maleVoice) return maleVoice;
    const nonFemale = deVoices.find(v => {
      const name = v.name.toLowerCase();
      return !femaleKeywords.some(k => name.includes(k));
    });
    if (nonFemale) return nonFemale;
  } else {
    const femaleVoice = deVoices.find(v => {
      const name = v.name.toLowerCase();
      return femaleKeywords.some(k => name.includes(k));
    });
    if (femaleVoice) return femaleVoice;
  }

  return deVoices[0];
}

// Speak German text clearly with optional slow rate and gender preference
export function speakGerman(text, isSlow = false, onStart, onEnd, customGender) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const activeGender = customGender || (typeof window !== 'undefined' ? (localStorage.getItem('german-karibu-voice-gender') || currentVoiceGender) : currentVoiceGender);

  // Clean the text (remove brackets or exclamation marks for speech)
  const cleanText = text.replace(/[/()]/g, ' ').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Look for preferred German voice
  const germanVoice = findGermanVoice(activeGender);
  if (germanVoice) {
    utterance.voice = germanVoice;
  }
  utterance.lang = 'de-DE';
  utterance.rate = isSlow ? 0.65 : 0.88; // Gentle and friendly speed

  if (activeGender === 'female') {
    utterance.pitch = 1.22; // Melodious and distinct feminine pitch
  } else {
    utterance.pitch = 0.88; // Deep, clear masculine pitch
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = (e) => {
    console.warn("Speech error:", e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}
