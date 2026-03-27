export class ApiCache {
  private cache = new Map<string, { data: any; exp: number }>();
  private ttl: number;
  constructor(ttl = 30000) { this.ttl = ttl; }
  get<T>(k: string): T | null { const e = this.cache.get(k); if (!e || Date.now() > e.exp) { this.cache.delete(k); return null; } return e.data; }
  set<T>(k: string, d: T, ttl?: number): void { this.cache.set(k, { data: d, exp: Date.now() + (ttl || this.ttl) }); }
  has(k: string): boolean { return this.get(k) !== null; }
  clear(): void { this.cache.clear(); }
  size(): number { return this.cache.size; }
}
export const cache = new ApiCache();