export interface WaveConfig {
  wave: number; enemies: number; spawnDelay: number; bossWave: boolean;
  enemyTypes: string[]; speed: number; reward: number;
}
export const WAVES: WaveConfig[] = [
  { wave: 1, enemies: 5, spawnDelay: 1500, bossWave: false, enemyTypes: ['basic'], speed: 2, reward: 50 },
  { wave: 2, enemies: 8, spawnDelay: 1200, bossWave: false, enemyTypes: ['basic', 'fast'], speed: 2.5, reward: 80 },
  { wave: 3, enemies: 10, spawnDelay: 1000, bossWave: false, enemyTypes: ['basic', 'fast', 'tank'], speed: 3, reward: 120 },
  { wave: 4, enemies: 12, spawnDelay: 900, bossWave: false, enemyTypes: ['fast', 'tank', 'shooter'], speed: 3.5, reward: 150 },
  { wave: 5, enemies: 1, spawnDelay: 0, bossWave: true, enemyTypes: ['boss-1'], speed: 2, reward: 300 },
  { wave: 6, enemies: 15, spawnDelay: 800, bossWave: false, enemyTypes: ['fast', 'tank', 'shooter', 'stealth'], speed: 4, reward: 200 },
  { wave: 7, enemies: 18, spawnDelay: 700, bossWave: false, enemyTypes: ['tank', 'shooter', 'stealth'], speed: 4.5, reward: 250 },
  { wave: 8, enemies: 20, spawnDelay: 600, bossWave: false, enemyTypes: ['fast', 'tank', 'shooter', 'stealth'], speed: 5, reward: 300 },
  { wave: 9, enemies: 22, spawnDelay: 500, bossWave: false, enemyTypes: ['tank', 'shooter', 'stealth', 'elite'], speed: 5.5, reward: 350 },
  { wave: 10, enemies: 1, spawnDelay: 0, bossWave: true, enemyTypes: ['boss-2'], speed: 3, reward: 500 }
];
export function getWave(n: number): WaveConfig { return n <= WAVES.length ? WAVES[n - 1] : { ...WAVES[WAVES.length - 1], wave: n, enemies: 20 + n, speed: 5 + n * 0.3 }; }