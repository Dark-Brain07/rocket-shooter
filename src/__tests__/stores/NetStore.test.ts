import{describe,it,expect}from'vitest';import{NetStore}from'../stores/NetStore';
describe('NetStore',()=>{it('stores data',()=>{const x=new NetStore();x.set('a',1);expect(x.get('a')).toBe(1);});});