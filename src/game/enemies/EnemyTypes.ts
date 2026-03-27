export interface EnemyType { id: string; name: string; hp: number; speed: number; damage: number; score: number; color: string; size: number; behavior: string; }
export const ENEMY_TYPES: Record<string, EnemyType> = {
  basic: { id: 'basic', name: 'Scout', hp: 1, speed: 2, damage: 1, score: 10, color: '#ff4444', size: 20, behavior: 'straight' },
  fast: { id: 'fast', name: 'Interceptor', hp: 1, speed: 4, damage: 1, score: 15, color: '#ffaa00', size: 15, behavior: 'zigzag' },
  tank: { id: 'tank', name: 'Cruiser', hp: 3, speed: 1.5, damage: 2, score: 25, color: '#4444ff', size: 30, behavior: 'straight' },
  shooter: { id: 'shooter', name: 'Gunship', hp: 2, speed: 2, damage: 1, score: 30, color: '#ff44ff', size: 22, behavior: 'shoot' },
  stealth: { id: 'stealth', name: 'Phantom', hp: 1, speed: 3, damage: 1, score: 20, color: '#88888888', size: 18, behavior: 'cloak' },
  elite: { id: 'elite', name: 'Commander', hp: 4, speed: 2.5, damage: 2, score: 50, color: '#ffcc00', size: 25, behavior: 'dodge' }
};
export function getEnemyType(id: string): EnemyType { return ENEMY_TYPES[id] || ENEMY_TYPES.basic; }