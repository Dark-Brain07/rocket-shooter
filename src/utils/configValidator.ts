export interface AppConfig { apiUrl: string; network: 'mainnet' | 'testnet'; maxRetries: number; }
export const DEFAULTS: AppConfig = { apiUrl: 'https://api.hiro.so', network: 'mainnet', maxRetries: 3 };
export function validate(c: Partial<AppConfig>): { valid: boolean; errors: string[] } { const e: string[] = []; if (c.network && !['mainnet','testnet'].includes(c.network)) e.push('bad network'); return { valid: !e.length, errors: e }; }
export function merge(o: Partial<AppConfig>): AppConfig { return { ...DEFAULTS, ...o }; }