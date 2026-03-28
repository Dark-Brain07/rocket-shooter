import{describe,it,expect}from'vitest';import{FTHandler}from'../chain/FTHandler';
describe('FTHandler',()=>{it('defaults mainnet',()=>expect(new FTHandler().getNet()).toBe('mainnet'));});