import{describe,it,expect}from'vitest';import{STXTransfer}from'../chain/STXTransfer';
describe('STXTransfer',()=>{it('defaults mainnet',()=>expect(new STXTransfer().getNet()).toBe('mainnet'));});