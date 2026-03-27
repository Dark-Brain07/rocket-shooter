export interface Shortcut { key: string; ctrl?: boolean; shift?: boolean; description: string; handler: () => void; }
export class ShortcutManager {
  private shortcuts: Shortcut[] = []; private on = true;
  register(s: Shortcut): void { this.shortcuts.push(s); }
  unregister(key: string): void { this.shortcuts = this.shortcuts.filter(s => s.key !== key); }
  enable(): void { this.on = true; }
  disable(): void { this.on = false; }
  handleKeyDown(e: KeyboardEvent): void { if (!this.on) return; for (const s of this.shortcuts) { if (e.key === s.key && !!e.ctrlKey === !!s.ctrl) { e.preventDefault(); s.handler(); return; } } }
  getAll(): Shortcut[] { return [...this.shortcuts]; }
}
export const shortcuts = new ShortcutManager();