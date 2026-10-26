// Google Text-to-Speech (gTTS) endpoint for natural female German voice
// Uses the exact same Google Translate TTS RPC (jQ1olc) as Python's gTTS library

function splitTextIntoChunks(text, maxLen = 180) {
  const cleaned = text.trim();
  if (cleaned.length <= maxLen) return [cleaned];

  const chunks = [];
  const sentences = cleaned.split(/(?<=[.!?।,;:])\s+/);
  let current = '';

  for (const sentence of sentences) {
    if ((current + ' ' + sentence).trim().length <= maxLen) {
      current = (current + ' ' + sentence).trim();
    } else {
      if (current) chunks.push(current);
      if (sentence.length <= maxLen) {
        current = sentence;
      } else {
        // Split long sentence by words
        const words = sentence.split(/\s+/);
        current = '';
        for (const word of words) {
          if ((current + ' ' + word).trim().length <= maxLen) {
            current = (current + ' ' + word).trim();
          } else {
            if (current) chunks.push(current);
            current = word;
          }
        }
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function fetchGttsChunk(textChunk, isSlow = false, lang = 'de') {
  // Primary method: exact gTTS batchexecute RPC (jQ1olc)
  try {
    const speedParam = isSlow ? true : null;
    const parameter = JSON.stringify([textChunk, lang, speedParam, 'null']);
    const rpc = JSON.stringify([[['jQ1olc', parameter, null, 'generic']]]);
    const body = 'f.req=' + encodeURIComponent(rpc) + '&';

    const response = await fetch(
      'https://translate.google.com/_/TranslateWebserverUi/data/batchexecute',
      {
        method: 'POST',
        headers: {
          Referer: 'http://translate.google.com/',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body,
      }
    );

    if (response.ok) {
      const text = await response.text();
      const match = text.match(/jQ1olc","\[\\"(.*?)\\"\]/);
      if (match && match[1]) {
        return Buffer.from(match[1], 'base64');
      }
    }
  } catch (err) {
    // Fall through to secondary Google TTS endpoint
  }

  // Fallback method: translate.googleapis.com/translate_tts
  const ttsSpeed = isSlow ? '0.24' : '1';
  const url = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${encodeURIComponent(
    lang
  )}&ttsspeed=${ttsSpeed}&q=${encodeURIComponent(textChunk)}`;

  const fallbackRes = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  if (!fallbackRes.ok) {
    throw new Error(`Google TTS request failed with status ${fallbackRes.status}`);
  }

  const arrayBuffer = await fallbackRes.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function generateGttsAudioBuffer(text, isSlow = false, lang = 'de') {
  const chunks = splitTextIntoChunks(text, 180);
  const buffers = [];
  for (const chunk of chunks) {
    if (!chunk) continue;
    const buf = await fetchGttsChunk(chunk, isSlow, lang);
    buffers.push(buf);
  }
  return Buffer.concat(buffers);
}

export default async function handler(req, res) {
  try {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const q = urlObj.searchParams.get('q') || '';
    const slow = urlObj.searchParams.get('slow') === '1' || urlObj.searchParams.get('slow') === 'true';
    const lang = urlObj.searchParams.get('tl') || 'de';

    if (!q.trim()) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing text parameter q' }));
      return;
    }

    const audioBuffer = await generateGttsAudioBuffer(q, slow, lang);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.end(audioBuffer);
  } catch (error) {
    console.error('TTS API error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to synthesize speech' }));
  }
}
