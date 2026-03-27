import { WaveConfig, getWave } from './WaveConfig';
export class WaveManager {
  private current = 0;
  private spawned = 0;
  private killed = 0;
  private lastSpawn = 0;
  start(): WaveConfig { this.current = 1; this.spawned = 0; this.killed = 0; return getWave(1); }
  getCurrentWave(): WaveConfig { return getWave(this.current); }
  getWaveNumber(): number { return this.current; }
  shouldSpawn(now: number): boolean { const w = this.getCurrentWave(); if (this.spawned >= w.enemies) return false; return now - this.lastSpawn >= w.spawnDelay; }
  recordSpawn(now: number): void { this.spawned++; this.lastSpawn = now; }
  recordKill(): void { this.killed++; }
  isWaveComplete(): boolean { const w = this.getCurrentWave(); return this.killed >= w.enemies; }
  nextWave(): WaveConfig { this.current++; this.spawned = 0; this.killed = 0; return getWave(this.current); }
  reset(): void { this.current = 0; this.spawned = 0; this.killed = 0; }
}