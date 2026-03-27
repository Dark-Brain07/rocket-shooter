import{describe,it,expect}from'vitest';import{createWaveState}from'../types/WaveState';
describe('WaveState',()=>{it('creates',()=>{const s=createWaveState('t');expect(s.active).toBe(true);});});