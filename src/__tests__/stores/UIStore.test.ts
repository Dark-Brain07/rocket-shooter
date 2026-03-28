import{describe,it,expect}from'vitest';import{UIStore}from'../stores/UIStore';
describe('UIStore',()=>{it('stores data',()=>{const x=new UIStore();x.set('a',1);expect(x.get('a')).toBe(1);});});