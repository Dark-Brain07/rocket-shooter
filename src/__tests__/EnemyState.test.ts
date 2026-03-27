import{describe,it,expect}from'vitest';import{createEnemyState}from'../types/EnemyState';
describe('EnemyState',()=>{it('creates',()=>{const s=createEnemyState('t');expect(s.active).toBe(true);});});