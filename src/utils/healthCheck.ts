export interface HealthStatus { app: boolean; api: boolean; storage: boolean; audio: boolean; }
export async function checkHealth(): Promise<HealthStatus> {
  const s: HealthStatus = { app: true, api: false, storage: false, audio: false };
  try { const r = await fetch('https://api.hiro.so/v2/info'); s.api = r.ok; } catch {}
  try { localStorage.setItem('_hc', '1'); localStorage.removeItem('_hc'); s.storage = true; } catch {}
  try { s.audio = typeof AudioContext !== 'undefined'; } catch {}
  return s;
}