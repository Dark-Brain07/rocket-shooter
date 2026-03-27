export interface Notification { id: string; type: 'info' | 'success' | 'warning' | 'error'; title: string; message: string; }
let cnt = 0; const queue: Notification[] = []; const subs: Array<(ns: Notification[]) => void> = [];
function emit(): void { subs.forEach(fn => fn([...queue])); }
export function notify(type: Notification['type'], title: string, message: string, dur = 4000): string { const id = 'n-' + (++cnt); queue.push({ id, type, title, message }); if (queue.length > 5) queue.shift(); emit(); setTimeout(() => dismiss(id), dur); return id; }
export function dismiss(id: string): void { const i = queue.findIndex(n => n.id === id); if (i !== -1) { queue.splice(i, 1); emit(); } }
export function subscribe(fn: (ns: Notification[]) => void): () => void { subs.push(fn); return () => { const i = subs.indexOf(fn); if (i !== -1) subs.splice(i, 1); }; }