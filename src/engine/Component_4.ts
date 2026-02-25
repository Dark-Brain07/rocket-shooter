// Engine sub-system edit seq: 1204
export function detectCollision(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.h + a.y > b.y; }
