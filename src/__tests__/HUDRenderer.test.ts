import{describe,it,expect}from'vitest';import{HUDRenderer}from'../game/renderer/HUDRenderer';
describe('HUDRenderer',()=>{it('initializes',()=>expect(new HUDRenderer()).toBeDefined());});