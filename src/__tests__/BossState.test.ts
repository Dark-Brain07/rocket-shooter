import{describe,it,expect}from'vitest';import{createBossState}from'../types/BossState';
describe('BossState',()=>{it('creates',()=>{const s=createBossState('t');expect(s.active).toBe(true);});});