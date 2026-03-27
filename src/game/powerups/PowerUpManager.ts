export class PowerUpManager {
  private active: Map<string, { expiresAt: number }> = new Map();
  activate(id: string, duration: number): void { this.active.set(id, { expiresAt: Date.now() + duration }); }
  isActive(id: string): boolean { const e = this.active.get(id); if (!e) return false; if (Date.now() > e.expiresAt) { this.active.delete(id); return false; } return true; }
  getActiveIds(): string[] { return Array.from(this.active.keys()).filter(id => this.isActive(id)); }
  getRemaining(id: string): number { const e = this.active.get(id); return e ? Math.max(0, e.expiresAt - Date.now()) : 0; }
  clearAll(): void { this.active.clear(); }
}