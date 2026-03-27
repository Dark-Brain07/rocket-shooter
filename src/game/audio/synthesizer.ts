let ctx: AudioContext | null = null;
function getCtx(): AudioContext { if (!ctx) ctx = new AudioContext(); return ctx; }
export function playTone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.5): void {
  try { const c = getCtx(); const o = c.createOscillator(); const g = c.createGain(); o.type = type; o.frequency.value = freq; g.gain.setValueAtTime(vol, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur); o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + dur); } catch {}
}