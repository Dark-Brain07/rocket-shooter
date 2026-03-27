import{describe,it,expect}from'vitest';import{createUIState}from'../types/UIState';
describe('UIState',()=>{it('creates',()=>{const s=createUIState('t');expect(s.active).toBe(true);});});