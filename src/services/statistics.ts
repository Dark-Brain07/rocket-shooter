export interface GameStats { totalGames: number; totalScore: number; avgScore: number; bestScore: number; totalKills: number; highestWave: number; }
const SK = 'rs-stats';
function loadRaw(): any { try { return JSON.parse(localStorage.getItem(SK) || '{}'); } catch { return {}; } }
export function recordGame(score: number, kills: number, wave: number): void { const r = loadRaw(); if (!r.scores) r.scores = []; r.scores.push(score); r.kills = (r.kills || 0) + kills; r.maxWave = Math.max(r.maxWave || 0, wave); localStorage.setItem(SK, JSON.stringify(r)); }
export function getStats(): GameStats { const r = loadRaw(); const sc = r.scores || []; return { totalGames: sc.length, totalScore: sc.reduce((a:number,b:number) => a+b, 0), avgScore: sc.length ? Math.round(sc.reduce((a:number,b:number) => a+b, 0) / sc.length) : 0, bestScore: sc.length ? Math.max(...sc) : 0, totalKills: r.kills || 0, highestWave: r.maxWave || 0 }; }
export function resetStats(): void { localStorage.removeItem(SK); }