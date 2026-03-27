export interface PowerUp { id: string; name: string; duration: number; icon: string; color: string; effect: string; }
export const POWERUPS: PowerUp[] = [
  { id: 'rapidfire', name: 'Rapid Fire', duration: 5000, icon: '🔥', color: '#ff4400', effect: 'Double fire rate' },
  { id: 'shield', name: 'Energy Shield', duration: 6000, icon: '🛡️', color: '#4488ff', effect: 'Absorbs damage' },
  { id: 'trishot', name: 'Tri-Shot', duration: 4000, icon: '🔱', color: '#44ff44', effect: 'Fire 3 projectiles' },
  { id: 'missile', name: 'Homing Missile', duration: 3000, icon: '🚀', color: '#ff8800', effect: 'Auto-targeting missiles' },
  { id: 'emp', name: 'EMP Blast', duration: 2000, icon: '⚡', color: '#ffff00', effect: 'Stuns all enemies' },
  { id: 'repair', name: 'Nano Repair', duration: 1000, icon: '💚', color: '#00ff88', effect: 'Restore 1 life' }
];
export function getPowerUpById(id: string): PowerUp | undefined { return POWERUPS.find(p => p.id === id); }
export function getRandomPowerUp(): PowerUp { return POWERUPS[Math.floor(Math.random() * POWERUPS.length)]; }