export const SOUND_EFFECTS = {
  shoot: { frequency: 600, duration: 0.1, type: 'square' as OscillatorType, volume: 0.4 },
  hit: { frequency: 150, duration: 0.2, type: 'sawtooth' as OscillatorType, volume: 0.6 },
  explosion: { frequency: 80, duration: 0.4, type: 'sawtooth' as OscillatorType, volume: 0.7 },
  powerUp: { frequency: 800, duration: 0.2, type: 'sine' as OscillatorType, volume: 0.5 },
  gameOver: { frequency: 200, duration: 0.5, type: 'square' as OscillatorType, volume: 0.8 },
  waveComplete: { frequency: 500, duration: 0.3, type: 'triangle' as OscillatorType, volume: 0.6 },
  bossAlert: { frequency: 300, duration: 0.4, type: 'square' as OscillatorType, volume: 0.7 },
  menuClick: { frequency: 700, duration: 0.05, type: 'sine' as OscillatorType, volume: 0.3 }
} as const;
export type SoundName = keyof typeof SOUND_EFFECTS;