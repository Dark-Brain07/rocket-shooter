export interface Migration { version: number; name: string; up: () => void; }
const MIGRATIONS: Migration[] = [
  { version: 1, name: 'init', up: () => {} },
  { version: 2, name: 'add-stats', up: () => { if (!localStorage.getItem('rs-stats')) localStorage.setItem('rs-stats', '{}'); } }
];
const VK = 'rs-db-version';
export function getVersion(): number { return parseInt(localStorage.getItem(VK) || '0'); }
export function runMigrations(): string[] { const cur = getVersion(); const p = MIGRATIONS.filter(m => m.version > cur); const a: string[] = []; for (const m of p) { m.up(); localStorage.setItem(VK, String(m.version)); a.push(m.name); } return a; }