import{describe,it,expect}from'vitest';import{createGameEvents}from'../types/GameEvents';
describe('GameEvents',()=>{it('creates',()=>{const s=createGameEvents('t');expect(s.active).toBe(true);});});