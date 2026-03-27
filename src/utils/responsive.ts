export const BREAKPOINTS = { mobile: 480, tablet: 768, desktop: 1024 } as const;
export function isMobile(): boolean { return window.innerWidth <= BREAKPOINTS.mobile; }
export function isDesktop(): boolean { return window.innerWidth > BREAKPOINTS.tablet; }
export function getCanvasScale(): number { const w = window.innerWidth; if (w <= 480) return 0.5; if (w <= 768) return 0.75; return 1.0; }