import { SOUND_EFFECTS, SoundName } from './sounds'; import { playTone } from './synthesizer';
let muted = false; let volume = 1.0;
export function playSfx(name: SoundName): void { if (muted) return; const s = SOUND_EFFECTS[name]; playTone(s.frequency, s.duration, s.type, s.volume * volume); }
export function setMuted(m: boolean): void { muted = m; }
export function isMuted(): boolean { return muted; }
export function setMasterVolume(v: number): void { volume = Math.max(0, Math.min(1, v)); }